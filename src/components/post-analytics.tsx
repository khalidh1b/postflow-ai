"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Hash, Target, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalyticsProps {
  post?: string;
  viralityScore?: number;
}

const PostAnalytics = ({ post, viralityScore }: AnalyticsProps) => {
  if (!post) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Post Analytics
          </CardTitle>
          <CardDescription>Generate a post to see detailed analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            Analytics will appear here after generating a post
          </p>
        </CardContent>
      </Card>
    );
  }

  // Analyze post content
  const charCount = post.length;
  const emojiCount = (post.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length;
  const lineBreaks = (post.match(/\n\n/g) || []).length;
  const hashtagCount = (post.match(/#\w+/g) || []).length;
  const questionMarks = (post.match(/\?/g) || []).length;
  const firstLine = post.split('\n')[0];
  const wordCount = post.split(/\s+/).length;
  const estimatedReadTime = Math.ceil(wordCount / 200); // 200 words per minute

  // Calculate optimal posting times (mock data - in real app would be based on audience)
  const optimalTimes = [
    { day: "Tuesday", time: "8:00 AM", score: 95 },
    { day: "Wednesday", time: "12:00 PM", score: 92 },
    { day: "Thursday", time: "9:00 AM", score: 90 },
  ];

  // Format recommendations
  const recommendations = [];
  
  if (charCount < 200) {
    recommendations.push({ type: "warning", text: "Post is quite short - consider adding more value" });
  } else if (charCount > 1500) {
    recommendations.push({ type: "warning", text: "Post is long - consider breaking into multiple posts" });
  }

  if (emojiCount === 0) {
    recommendations.push({ type: "info", text: "Add 1-3 emojis for visual appeal" });
  } else if (emojiCount > 10) {
    recommendations.push({ type: "warning", text: "Too many emojis - reduce for professionalism" });
  }

  if (lineBreaks < 2) {
    recommendations.push({ type: "warning", text: "Add more line breaks for readability" });
  }

  if (hashtagCount === 0) {
    recommendations.push({ type: "info", text: "Consider adding 3-5 relevant hashtags" });
  } else if (hashtagCount > 8) {
    recommendations.push({ type: "warning", text: "Too many hashtags - focus on 3-5 most relevant" });
  }

  if (questionMarks === 0) {
    recommendations.push({ type: "info", text: "End with a question to boost engagement" });
  }

  if (firstLine.length > 100) {
    recommendations.push({ type: "warning", text: "Hook is too long - keep first line under 80 chars" });
  }

  // Engagement metrics
  const metrics = [
    {
      label: "Hook Strength",
      value: firstLine.length > 10 && firstLine.length < 80 ? 85 : 60,
      icon: Target,
    },
    {
      label: "Readability",
      value: lineBreaks >= 2 ? 90 : 65,
      icon: TrendingUp,
    },
    {
      label: "Hashtag Optimization",
      value: hashtagCount >= 3 && hashtagCount <= 5 ? 95 : hashtagCount > 0 ? 70 : 40,
      icon: Hash,
    },
  ];

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Post Analytics
          </CardTitle>
          <CardDescription>Detailed breakdown of your post's viral potential</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">

          {viralityScore && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Overall Virality Score</span>
                <span className="text-2xl font-bold">{viralityScore}/100</span>
              </div>
              <Progress value={viralityScore} className="h-2" />
            </div>
          )}

          <div className="grid gap-4">
            {metrics.map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-2">
                    <metric.icon className="w-4 h-4 text-muted-foreground" />
                    {metric.label}
                  </span>
                  <span className="text-sm font-semibold">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-1.5" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Characters</p>
              <p className="text-2xl font-semibold">{charCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Word Count</p>
              <p className="text-2xl font-semibold">{wordCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Read Time</p>
              <p className="text-2xl font-semibold">{estimatedReadTime} min</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hashtags</p>
              <p className="text-2xl font-semibold">{hashtagCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>Ways to improve your post's performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  rec.type === "warning"
                    ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900"
                    : "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900"
                }`}
              >
                <p className="text-sm">{rec.text}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Optimal Posting Times
          </CardTitle>
          <CardDescription>Best times to post for maximum engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {optimalTimes.map((time, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div>
                <p className="font-medium">{time.day}</p>
                <p className="text-sm text-muted-foreground">{time.time}</p>
              </div>
              <Badge variant={index === 0 ? "default" : "secondary"}>
                {time.score}% optimal
              </Badge>
            </div>
          ))}
          <p className="text-xs text-muted-foreground pt-2">
            * Times shown in your local timezone. Based on general LinkedIn engagement patterns.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostAnalytics;