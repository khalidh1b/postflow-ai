import { NextRequest } from 'next/server';
import { FeedbackService } from '../services/feedback.service';
import { validateFeedbackRequest, validateQueryParams } from '../utils/validation';
import { getCurrentUserId, requireAuth } from '../utils/auth';
import { createErrorResponse, createSuccessResponse, createAuthErrorResponse } from '../utils/response';

export class FeedbackController {
  static async createFeedback(request: NextRequest) {
    try {
      const body = await request.json();
      const validatedRequest = validateFeedbackRequest(body);
      
      // Get user ID
      const userId = await getCurrentUserId();
      
      const result = await FeedbackService.createFeedback(validatedRequest, userId || undefined);
      return createSuccessResponse(result, 201);
    } catch (error) {
      return createErrorResponse(error as Error);
    }
  }

  static async getFeedback(request: NextRequest) {
    try {
      // Authentication required for GET endpoint
      try {
        await requireAuth();
      } catch {
        return createAuthErrorResponse();
      }

      const { searchParams } = new URL(request.url);
      const queryParams = validateQueryParams(searchParams);
      
      const results = await FeedbackService.getFeedback(queryParams);
      return createSuccessResponse(results);
    } catch (error) {
      return createErrorResponse(error as Error);
    }
  }
};