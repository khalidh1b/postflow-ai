import { NextRequest } from 'next/server';
import { PostService } from '../services/post.service';
import { PostQueryParams, CreatePostData } from '../types';
import { PostValidator } from '../utils/validation';
import { ResponseHelper } from '../utils/response';
import { getCurrentUser } from '../utils/auth';

export class PostController {
  static async handleGet(request: NextRequest) {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return ResponseHelper.unauthorized();
      }

      const { searchParams } = new URL(request.url);
      const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
      const offset = parseInt(searchParams.get('offset') ?? '0');
      const search = searchParams.get('search');

      const queryParams: PostQueryParams = {
        limit,
        offset,
        search: search || undefined,
        userId: user.id
      };

      const results = await PostService.getPosts(queryParams);
      return ResponseHelper.success(results);
    } catch (error) {
      return ResponseHelper.serverError(error);
    }
  };

  static async handlePost(request: NextRequest) {
    try {
      const user = await getCurrentUser();
      if (!user) {
        return ResponseHelper.unauthorized();
      }

      const body = await request.json();

      // Validate the request body
      const validation = PostValidator.validateCreatePostData(body);
      if (!validation.isValid) {
        return ResponseHelper.validationError(validation.errors);
      };

      const createData: CreatePostData = {
        postContent: body.postContent,
        viralityScore: body.viralityScore,
        characterCount: body.characterCount,
        postType: body.postType,
        tone: body.tone,
        length: body.length,
        format: body.format,
        hookStyle: body.hookStyle,
        ctaType: body.ctaType,
        hashtagStrategy: body.hashtagStrategy
      };

      const newPost = await PostService.createPost(user.id, createData);
      return ResponseHelper.success(newPost, 201);
    } catch (error) {
      return ResponseHelper.serverError(error);
    }
  }
};