import { ViralityScoreParams } from '../types';

export class ViralityCalculatorService {
  static calculateScore(text: string, params: ViralityScoreParams): number {
    let score = 50;

    score += this.calculateLengthScore(text.length);
    score += this.calculateHookScore(text);
    score += this.calculateEmojiScore(text);
    score += this.calculateFormattingScore(text);
    score += this.calculateHashtagScore(text, params.hashtagStrategy);
    score += this.calculateFormatBonus(text, params.format);
    score += this.calculateToneBonus(params.tone);
    score += this.calculateHookStyleBonus(text, params.hookStyle);

    // Keep score between 0-100
    return Math.min(Math.max(score, 0), 100);
  };

  private static calculateLengthScore(charCount: number): number {
    // Length optimization (medium posts perform best)
    if (charCount >= 300 && charCount <= 1200) {
      return 15;
    } else if (charCount >= 200 && charCount <= 1500) {
      return 10;
    } else if (charCount < 100) {
      return -10;
    };
    return 0;
  };

  // Hook strength (first line analysis)
  private static calculateHookScore(text: string): number {
    let score = 0;
    const firstLine = text.split('\n')[0];

    if (firstLine.length > 10 && firstLine.length < 80) {
      score += 10;
    };
    if (/[?!]/.test(firstLine)) {
      score += 5;
    };

    return score;
  };

  // Emoji usage (1-5 emojis is optimal)
  private static calculateEmojiScore(text: string): number {
    const emojiCount = (text.match(/[\u{1F300};-\u{1F9FF};]/gu) || []).length;
    
    if (emojiCount >= 1 && emojiCount <= 5) {
      return 8;
    } else if (emojiCount > 10) {
      return -5;
    };
    
    return 0;
  };

  // Line breaks for readability
  private static calculateFormattingScore(text: string): number {
    const lineBreaks = (text.match(/\n\n/g) || []).length;
    if (lineBreaks >= 3) {
      return 7;
    };
    return 0;
  };

  private static calculateHashtagScore(text: string, strategy: string): number {
    const hashtagCount = (text.match(/#\w+/g) || []).length;
    
    if (strategy === 'moderate' && hashtagCount >= 3 && hashtagCount <= 5) {
      return 5;
    };
    if (strategy === 'minimal' && hashtagCount >= 1 && hashtagCount <= 2) {
      return 5;
    };
    
    return 0;
  };

  // Format-specific bonuses
  private static calculateFormatBonus(text: string, format: string): number {
    if (format === 'list' && /[0-9]\.|•|-/.test(text)) {
      return 8;
    };
    return 0;
  };

  // Tone authenticity
  private static calculateToneBonus(tone: string): number {
    if (tone === 'authentic' || tone === 'conversational') {
      return 5;
    };
    return 0;
  };

  // Hook style effectiveness
  private static calculateHookStyleBonus(text: string, hookStyle: string): number {
    if (hookStyle === 'question' && text.match(/^(What|How|Why|When|Where)/i)) {
      return 5;
    };
    return 0;
  };
};