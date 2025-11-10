import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Validate ID parameter
    const { id } = params;
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    const postId = parseInt(id);

    // First, verify the post exists and belongs to the user
    const existingPost = await db.select()
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (existingPost.length === 0) {
      return NextResponse.json({ 
        error: "Post not found",
        code: "POST_NOT_FOUND" 
      }, { status: 404 });
    }

    // Verify ownership
    if (existingPost[0].userId !== userId) {
      return NextResponse.json({ 
        error: "Forbidden: You can only delete your own posts",
        code: "FORBIDDEN" 
      }, { status: 403 });
    }

    // Delete the post with user ownership verification
    const deleted = await db.delete(posts)
      .where(and(eq(posts.id, postId), eq(posts.userId, userId)))
      .returning();

    if (deleted.length === 0) {
      return NextResponse.json({ 
        error: "Failed to delete post",
        code: "DELETE_FAILED" 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      message: "Post deleted successfully",
      id: postId
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown error')
    }, { status: 500 });
  }
};