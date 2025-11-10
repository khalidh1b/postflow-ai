import { GeneratePostRequest } from '../types';

export class PromptBuilderService {
  static buildPrompt(request: GeneratePostRequest): string {
    const {
      topic,
      tone,
      length,
      format,
      hookStyle,
      ctaType,
      hashtagStrategy,
      targetAudience,
    } = request;

    return `You are a LinkedIn virality expert. Create a highly engaging LinkedIn post with the following specifications:

TOPIC: ${topic};

TONE: ${tone};
LENGTH: ${length};
FORMAT: ${format};
HOOK STYLE: ${hookStyle};
CALL-TO-ACTION: ${ctaType};
HASHTAG STRATEGY: ${hashtagStrategy};
${targetAudience ? `TARGET AUDIENCE: ${targetAudience}` : ''};

VIRALITY PRINCIPLES TO APPLY:
1. Golden Hour Rule: Optimize for maximum engagement in first hour
2. Dwell Time: Create content that makes people stop and read
3. Strong Hook: Use ${hookStyle}; style to grab attention immediately
4. Storytelling: Use narrative elements and emotional connection
5. Formatting: Use white space, line breaks, and emojis strategically
6. Authenticity: Sound genuine and relatable, not corporate
7. Value-First: Provide actionable insights or unique perspectives
8. Engagement Triggers: Ask questions, create curiosity, or controversial takes

FORMAT GUIDELINES:
- Start with a powerful hook (1-2 lines)
- Use short paragraphs (1-3 lines each)
- Add line breaks for readability
- Include relevant emojis (but don't overdo it)
- ${this.getFormatGuideline(format)};
- End with ${ctaType} style call-to-action

HASHTAG STRATEGY (${hashtagStrategy}):
${this.getHashtagStrategy(hashtagStrategy)};

LENGTH TARGET:
${this.getLengthTarget(length)};

Generate ONLY the post content. Do not include any meta-commentary, explanations, or labels. Write as if you are posting directly to LinkedIn.`;
  };

  private static getFormatGuideline(format: string): string {
    switch (format) {
      case 'list':
        return 'Use numbered or bulleted lists';
      case 'story':
        return 'Tell a compelling story with beginning, middle, end';
      case 'question':
        return 'Start with a thought-provoking question';
      case 'controversial':
        return 'Challenge conventional wisdom';
      default:
        return 'Use engaging and conversational tone';
    };
  };

  private static getHashtagStrategy(strategy: string): string {
    switch (strategy) {
      case 'minimal':
        return '- Add 1-2 highly relevant hashtags at the end';
      case 'moderate':
        return '- Add 3-5 strategic hashtags at the end';
      case 'maximum':
        return '- Add 5-8 targeted hashtags for maximum reach';
      case 'none':
        return '- Do not include any hashtags';
      default:
        return '- Add 3-5 strategic hashtags at the end';
    };
  };

  private static getLengthTarget(length: string): string {
    switch (length) {
      case 'short':
        return '100-300 characters - Quick, punchy, and shareable';
      case 'medium':
        return '300-800 characters - Balanced insight with engagement';
      case 'long':
        return '800-1500 characters - Deep dive with comprehensive value';
      case 'thread':
        return '1500-3000 characters - Multi-part storytelling format';
      default:
        return '300-800 characters - Balanced insight with engagement';
    };
  };
};