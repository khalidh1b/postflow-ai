import { NextRequest } from 'next/server';
import { PostController } from './controllers/post.controller';

export async function GET(request: NextRequest) {
  return PostController.handleGet(request);
};

export async function POST(request: NextRequest) {
  return PostController.handlePost(request);
};