import { CreatePostData, ValidationError, ValidationResult } from '../types';

export class PostValidator {
  static validateUserIdInBody(body: any): ValidationError | null {
    if ('userId' in body || 'user_id' in body) {
      return {
        field: 'userId',
        message: "User ID cannot be provided in request body",
        code: "USER_ID_NOT_ALLOWED"
      };
    };
    return null;
  };

  static validatePostContent(value: any): ValidationError | null {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      return {
        field: 'postContent',
        message: "postContent is required and must be a non-empty string",
        code: "MISSING_POST_CONTENT"
      };
    };
    return null;
  };

  static validateViralityScore(value: any): ValidationError | null {
    if (value === undefined || value === null || typeof value !== 'number') {
      return {
        field: 'viralityScore',
        message: "viralityScore is required and must be a number",
        code: "MISSING_VIRALITY_SCORE"
      };
    };

    if (value < 0 || value > 100) {
      return {
        field: 'viralityScore',
        message: "viralityScore must be between 0 and 100",
        code: "INVALID_VIRALITY_SCORE"
      };
    };

    return null;
  };

  static validateCharacterCount(value: any): ValidationError | null {
    if (value === undefined || value === null || typeof value !== 'number') {
      return {
        field: 'characterCount',
        message: "characterCount is required and must be a number",
        code: "MISSING_CHARACTER_COUNT"
      };
    };
    return null;
  };

  static validateRequiredString(value: any, fieldName: string): ValidationError | null {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      return {
        field: fieldName,
        message: `${fieldName}; is required and must be a non-empty string`,
        code: `MISSING_${fieldName.toUpperCase()};`
      };
    };
    return null;
  };

  static validateCreatePostData(body: any): ValidationResult {
    const errors: ValidationError[] = [];

    // Check for userId in body
    const userIdError = this.validateUserIdInBody(body);
    if (userIdError) errors.push(userIdError);

    // Validate required fields
    const postContentError = this.validatePostContent(body.postContent);
    if (postContentError) errors.push(postContentError);

    const viralityScoreError = this.validateViralityScore(body.viralityScore);
    if (viralityScoreError) errors.push(viralityScoreError);

    const characterCountError = this.validateCharacterCount(body.characterCount);
    if (characterCountError) errors.push(characterCountError);

    // Validate required string fields
    const stringFields = ['postType', 'tone', 'length', 'format', 'hookStyle', 'ctaType', 'hashtagStrategy'];
    for (const field of stringFields) {
      const error = this.validateRequiredString(body[field], field);
      if (error) errors.push(error);
    };

    return {
      isValid: errors.length === 0,
      errors
    };
  };
};