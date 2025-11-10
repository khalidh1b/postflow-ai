"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Copy, Check, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface SavedPost {
  id: number;
  userId: string;
  postContent: string;
  viralityScore: number;
  characterCount: number;
  postType: string;
  tone: string;
  length: string;
  format: string;
  hookStyle: string;
  ctaType: string;
  hashtagStrategy: string;
  createdAt: string;
  updatedAt: string;
}

const PostLibrary = () => {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      setIsLoading(false);
      return;
    }

    if (session?.user) {
      fetchPosts();
    }
  }, [session, isPending]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch("/api/posts", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Please sign in to view your posts");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch posts");
      }

      const posts = await response.json();
      setSavedPosts(posts);
    } catch (error: any) {
      console.error("Error fetching posts:", error);
      toast.error(error.message || "Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: number) => {
    setDeletingId(id);
    try {
      const token = localStorage.getItem("bearer_token");
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete post");
      }

      setSavedPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted successfully");
    } catch (error: any) {
      console.error("Error deleting post:", error);
      toast.error(error.message || "Failed to delete post");
    } finally {
      setDeletingId(null);
    }
  };

  const copyPost = async (post: string, id: number) => {
    try {
      await navigator.clipboard.writeText(post);
      setCopiedId(id);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-yellow-600";
    return "bg-red-600";
  };

  if (isPending || isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Post Library</CardTitle>
          <CardDescription>Loading your saved posts...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!session?.user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Post Library</CardTitle>
          <CardDescription>Your saved posts will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 space-y-4">
            <p className="text-muted-foreground">
              Sign in to save and manage your generated LinkedIn posts
            </p>
            <Button onClick={() => router.push("/login")}>
              Sign in to view library
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (savedPosts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Post Library</CardTitle>
          <CardDescription>Your saved posts will appear here</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No saved posts yet. Generate and save posts to build your library.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post Library</CardTitle>
        <CardDescription>
          {savedPosts.length} saved post{savedPosts.length !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {savedPosts.map((savedPost) => (
          <div
            key={savedPost.id}
            className="border rounded-lg p-4 space-y-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{savedPost.postType}</Badge>
                  <Badge variant="outline">{savedPost.tone}</Badge>
                  <Badge variant="outline">{savedPost.length}</Badge>
                  <div className={`px-2 py-1 rounded text-xs font-semibold text-white ${getScoreColor(savedPost.viralityScore)}`}>
                    {savedPost.viralityScore}/100
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {savedPost.postContent}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(savedPost.createdAt).toLocaleDateString()} at{" "}
                  {new Date(savedPost.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyPost(savedPost.postContent, savedPost.id)}
                  disabled={copiedId === savedPost.id}
                >
                  {copiedId === savedPost.id ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="outline"
                      disabled={deletingId === savedPost.id}
                    >
                      {deletingId === savedPost.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete post?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this saved post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deletePost(savedPost.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PostLibrary;