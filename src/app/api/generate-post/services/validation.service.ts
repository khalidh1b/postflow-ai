import { GeneratePostRequest } from '../types';

export class ValidationService {
  static validateGeneratePostRequest(body: any): { isValid: boolean; error?: string } {
    if (!body) {
      return { isValid: false, error: 'Request body is required' };;
    };

    const { topic } = body;

    if (!topic) {
      return { isValid: false, error: 'Topic is required' };;
    };

    if (typeof topic !== 'string' || topic.trim().length === 0) {
      return { isValid: false, error: 'Topic must be a non-empty string' };;
    };

    return { isValid: true };;
  };

  static validateApiKey(apiKey: string | undefined): { isValid: boolean; error?: string } {
    if (!apiKey) {
      return { isValid: false, error: 'Gemini API key is not configured' };;
    };

    return { isValid: true };;
  };
};