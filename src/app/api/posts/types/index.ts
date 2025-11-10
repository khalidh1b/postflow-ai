export interface PostQueryParams {
  limit: number;
  offset: number;
  search?: string;
  userId: string;
};

export interface CreatePostData {
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
};

export interface ValidationError {
  field: string;
  message: string;
  code: string;
};

export interface User {
  id: string;
  email?: string;
  name?: string;
};

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
};