import { db } from '@/db';
import { posts } from '@/db/schema';
import { eq, like, and, desc } from 'drizzle-orm';
import { PostQueryParams, CreatePostData } from '../types';

export class PostService {
  static async getPosts(params: PostQueryParams) {
    const whereConditions = [eq(posts.userId, params.userId)];

    if (params.search) {
      whereConditions.push(like(posts.postContent, `%${params.search}%`));
    }

    return await db.select()
      .from(posts)
      .where(and(...whereConditions))
      .orderBy(desc(posts.createdAt))
      .limit(params.limit)
      .offset(params.offset);
  };

  static async createPost(userId: string, data: CreatePostData) {
    const timestamp = new Date().toISOString();

    const newPost = await db.insert(posts)
      .values({
        userId,
        postContent: data.postContent.trim(),
        viralityScore: data.viralityScore,
        characterCount: data.characterCount,
        postType: data.postType.trim(),
        tone: data.tone.trim(),
        length: data.length.trim(),
        format: data.format.trim(),
        hookStyle: data.hookStyle.trim(),
        ctaType: data.ctaType.trim(),
        hashtagStrategy: data.hashtagStrategy.trim(),
        createdAt: timestamp,
        updatedAt: timestamp
      })
      .returning();

    return newPost[0];
  }
};