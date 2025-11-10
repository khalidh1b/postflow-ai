import { FeedbackRequest, FeedbackType } from '../types';

export const VALID_FEEDBACK_TYPES: FeedbackType[] = ['bug', 'feature', 'improvement', 'general'];

export class ValidationError extends Error {
  constructor(
    message: string,
    public code: string
  ) {
    super(message);
    this.name = 'ValidationError';
  }
};

export function validateFeedbackRequest(body: any): FeedbackRequest {
  
  // Security check: reject if userId provided in body
  if ('userId' in body || 'user_id' in body) {
    throw new ValidationError(
      'User ID cannot be provided in request body',
      'USER_ID_NOT_ALLOWED'
    );
  };

  // Validate required fields
  if (!body.feedbackType) {
    throw new ValidationError(
      'feedbackType is required',
      'MISSING_FEEDBACK_TYPE'
    );
  };

  if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
    throw new ValidationError(
      'message is required and must be a non-empty string',
      'INVALID_MESSAGE'
    );
  };

  // Validate feedbackType
  if (!VALID_FEEDBACK_TYPES.includes(body.feedbackType)) {
    throw new ValidationError(
      `feedbackType must be one of: ${VALID_FEEDBACK_TYPES.join(', ')}`,
      'INVALID_FEEDBACK_TYPE'
    );
  };

  // Validate rating if provided
  if (body.rating !== undefined && body.rating !== null) {
    const ratingNum = parseInt(body.rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      throw new ValidationError(
        'rating must be between 1 and 5',
        'INVALID_RATING'
      );
    }
  };

  return body as FeedbackRequest;
};

export function validateQueryParams(searchParams: URLSearchParams) {
  const limit = Math.min(
    parseInt(searchParams.get('limit') ?? '50'),
    100
  );
  const offset = parseInt(searchParams.get('offset') ?? '0');
  const search = searchParams.get('search');
  const feedbackTypeFilter = searchParams.get('feedbackType');

  return {
    limit,
    offset,
    search,
    feedbackTypeFilter,
  };
};