import { NextRequest, NextResponse } from "next/server";
import { ValidationService } from "./services/validation.service";
import { PromptBuilderService } from "./services/prompt-builder.service";
import { ViralityCalculatorService } from "./services/virality-calculator.service";
import { AiService } from "./services/ai.service";
import { GeneratePostRequest, GeneratePostResponse } from "./types";

export async function POST(request: NextRequest): Promise<NextResponse<GeneratePostResponse | { error: string }>> {
  try {
    // Parse and validate request
    const body = await request.json();
    const validation = ValidationService.validateGeneratePostRequest(body);
    
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error! },
        { status: 400 }
      );
    }

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    const apiKeyValidation = ValidationService.validateApiKey(apiKey);
    
    if (!apiKeyValidation.isValid) {
      return NextResponse.json(
        { error: apiKeyValidation.error! },
        { status: 500 }
      );
    }

    // Extract validated request data
    const requestData: GeneratePostRequest = body;

    // Build prompt for AI
    const prompt = PromptBuilderService.buildPrompt(requestData);

    // Generate content using AI service
    const aiService = new AiService(apiKey!);
    const generatedPost = await aiService.generateContent(prompt);

    // Calculate virality score
    const viralityScore = ViralityCalculatorService.calculateScore(generatedPost, {
      postType: "post",
      tone: requestData.tone,
      format: requestData.format,
      hookStyle: requestData.hookStyle,
      hashtagStrategy: requestData.hashtagStrategy,
    });

    // Return successful response
    return NextResponse.json({
      post: generatedPost,
      viralityScore,
      characterCount: generatedPost.length,
    });
  } catch (error: any) {
    console.error('Error generating post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate post' },
      { status: 500 }
    );
  }
};