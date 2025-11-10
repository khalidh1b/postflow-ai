"use client";

import { Badge } from "@/components/ui/badge";

interface ViralityScoreDisplayProps {
  viralityScore: number;
  characterCount: number;
};

export const ViralityScoreDisplay = ({ viralityScore, characterCount }: ViralityScoreDisplayProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "High Viral Potential";
    if (score >= 60) return "Good Engagement Expected";
    return "Needs Optimization";
  };

  return (
    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Virality Score</p>
        <p className={`text-2xl font-bold ${getScoreColor(viralityScore)}`}>
          {viralityScore}/100
        </p>
        <p className="text-xs text-muted-foreground">{getScoreLabel(viralityScore)}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-muted-foreground">Characters</p>
        <p className="text-2xl font-bold">{characterCount}</p>
        <Badge variant={characterCount <= 3000 ? "default" : "destructive"}>
          {characterCount <= 3000 ? "Within limit" : "Too long"}
        </Badge>
      </div>
    </div>
  );
};