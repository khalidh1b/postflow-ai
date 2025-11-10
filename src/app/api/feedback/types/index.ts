export interface FeedbackRequest {
  feedbackType: string;
  message: string;
  name?: string;
  email?: string;
  rating?: number | string;
  pageUrl?: string;
}

export interface FeedbackData {
  feedbackType: string;
  message: string;
  createdAt: string;
  userId?: string;
  name?: string;
  email?: string;
  rating?: number;
  pageUrl?: string;
}

export interface FeedbackQueryParams {
  limit: number;
  offset: number;
  search?: string | null;
  feedbackTypeFilter?: string | null;
}

export interface ApiResponse<T = any> {
  error?: string;
  code?: string;
  data?: T;
}

export type FeedbackType = 'bug' | 'feature' | 'improvement' | 'general';