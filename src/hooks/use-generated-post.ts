import { useState } from "react";

interface GeneratedPost {
  post: string;
  viralityScore: number;
}

export function useGeneratedPost() {
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);

  const clearGeneratedPost = () => {
    setGeneratedPost(null);
  };

  return {
    generatedPost,
    setGeneratedPost,
    clearGeneratedPost,
  };
}
