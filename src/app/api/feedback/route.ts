import { NextRequest } from 'next/server';
import { FeedbackController } from './controllers/feedback.controller';

export async function POST(request: NextRequest) {
  return FeedbackController.createFeedback(request);
};

export async function GET(request: NextRequest) {
  return FeedbackController.getFeedback(request);
};