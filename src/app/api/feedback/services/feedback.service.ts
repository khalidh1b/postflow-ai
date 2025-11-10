import { db } from '@/db';
import { userFeedback } from '@/db/schema';
import { eq, like, or, desc, and } from 'drizzle-orm';
import { FeedbackRequest, FeedbackData, FeedbackQueryParams } from '../types';

export class FeedbackService {
  static async createFeedback(request: FeedbackRequest, userId?: string): Promise<any> {
    const feedbackData: FeedbackData = {
      feedbackType: request.feedbackType.trim(),
      message: request.message.trim(),
      createdAt: new Date().toISOString(),
    };

    // todo - 
    if (userId) {
      feedbackData.userId = userId;
    }
    if (request.name && typeof request.name === 'string') {
      feedbackData.name = request.name.trim();
    }
    if (request.email && typeof request.email === 'string') {
      feedbackData.email = request.email.trim().toLowerCase();
    }
    if (request.rating !== undefined && request.rating !== null) {
      feedbackData.rating = parseInt(request.rating.toString());
    }
    if (request.pageUrl && typeof request.pageUrl === 'string') {
      feedbackData.pageUrl = request.pageUrl.trim();
    }

    const newFeedback = await db
      .insert(userFeedback)
      .values(feedbackData)
      .returning();

    return newFeedback[0];
  }

  static async getFeedback(params: FeedbackQueryParams): Promise<any[]> {
    const { limit, offset, search, feedbackTypeFilter } = params;

    // Build query conditions
    const conditions = [];

    if (feedbackTypeFilter) {
      conditions.push(eq(userFeedback.feedbackType, feedbackTypeFilter));
    }

    if (search && search.trim() && search.trim().length > 0) {
      const searchTerm = `%${search.trim()}%`;
      conditions.push(
        or(
          like(userFeedback.message, searchTerm),
          like(userFeedback.name, searchTerm),
          like(userFeedback.email, searchTerm)
        )
      );
    }

    // Execute query with conditional where clause
    const baseQuery = db.select().from(userFeedback);
    const queryWithConditions = conditions.length > 0 
      ? baseQuery.where(and(...conditions))
      : baseQuery;

    const results = await queryWithConditions
      .orderBy(desc(userFeedback.createdAt))
      .limit(limit)
      .offset(offset);

    return results;
  }
};