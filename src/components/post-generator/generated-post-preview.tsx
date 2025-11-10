"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";
import { ViralityScoreDisplay } from "./virality-score-display";
import { PostActions } from "./post-actions";

interface GeneratedPost {
  post: string;
  viralityScore: number;
  characterCount: number;
}

interface GeneratedPostPreviewProps {
  generatedPost: GeneratedPost | null;
  isAuthenticated: boolean;
  isSaving: boolean;
  copied: boolean;
  onCopy: () => void;
  onSave: () => void;
  onRegenerate: () => void;
}

export const GeneratedPostPreview = ({
  generatedPost,
  isAuthenticated,
  isSaving,
  copied,
  onCopy,
  onSave,
  onRegenerate
}: GeneratedPostPreviewProps) => {
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Generated Post</CardTitle>
        <CardDescription>
          Preview and copy your AI-generated LinkedIn post
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {generatedPost ? (
          <>
            <ViralityScoreDisplay 
              viralityScore={generatedPost.viralityScore}
              characterCount={generatedPost.characterCount}
            />

            <div className="relative">
              <div className="min-h-[300px] max-h-[600px] overflow-y-auto p-4 bg-card border rounded-lg whitespace-pre-wrap">
                {generatedPost.post}
              </div>
              <PostActions
                isAuthenticated={isAuthenticated}
                isSaving={isSaving}
                copied={copied}
                onCopy={onCopy}
                onSave={onSave}
                onRegenerate={onRegenerate}
              />
            </div>
          </>
        ) : (
          <div className="min-h-[400px] flex items-center justify-center text-center text-muted-foreground">
            <div>
              <PartyPopper className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Configure your post settings and click "Generate Viral Post"</p>
              <p className="text-sm mt-2">Your AI-generated content will appear here</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};