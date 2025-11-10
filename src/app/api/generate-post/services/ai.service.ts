import { GoogleGenAI } from "@google/genai";

export class AiService {
  private client: GoogleGenAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenAI({ apiKey });
  };

  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await this.client.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      });

      const text = response.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return text;
    } catch (error: any) {
      console.error('Error generating content with Gemini:', error);
      
      // Handle specific API quota errors
      if (error.status === 429 || error.message?.includes('quota')) {
        throw new Error('API quota exceeded. Please check your billing settings or try again later.');
      }
      
      // Handle API key errors
      if (error.status === 403 || error.message?.includes('API key')) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      
      throw new Error('Failed to generate content with AI service');
    };
  };
};