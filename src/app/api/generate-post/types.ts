export interface GeneratePostRequest {
  topic: string;
  tone: string;
  length: string;
  format: string;
  hookStyle: string;
  ctaType: string;
  hashtagStrategy: string;
  targetAudience?: string;
};

export interface GeneratePostResponse {
  post: string;
  viralityScore: number;
  characterCount: number;
};

export interface ViralityScoreParams {
  postType: string;
  tone: string;
  format: string;
  hookStyle: string;
  hashtagStrategy: string;
};

export interface PostGenerationError {
  error: string;
};