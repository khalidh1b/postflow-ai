"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Eye, Zap, Target, TrendingUp, MessageCircle } from "lucide-react";

const ViralityTips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Virality Principles
        </CardTitle>
        <CardDescription>
          Research-backed strategies to maximize LinkedIn engagement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="golden-hour" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="golden-hour">Golden Hour</TabsTrigger>
            <TabsTrigger value="hooks">Hooks</TabsTrigger>
            <TabsTrigger value="formatting">Format</TabsTrigger>
          </TabsList>

          <TabsContent value="golden-hour" className="space-y-4 pt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">The Golden Hour Rule</h4>
                  <p className="text-sm text-muted-foreground">
                    LinkedIn's algorithm heavily weights engagement in the first 60 minutes. Posts
                    that get early traction get exponentially more reach.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Optimal Posting Times</h4>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <Badge>Tuesday-Thursday</Badge>
                      <span className="text-sm text-muted-foreground">Peak engagement days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge>7-9 AM, 12-1 PM</Badge>
                      <span className="text-sm text-muted-foreground">
                        Best times (local timezone)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Dwell Time Matters</h4>
                  <p className="text-sm text-muted-foreground">
                    Create content that makes people stop and read. The longer they spend on your
                    post, the more LinkedIn promotes it. Aim for 20+ seconds of read time.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hooks" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Hook Types That Work</h4>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">❓ Question Hook</p>
                    <p className="text-xs text-muted-foreground">
                      "What if I told you that 90% of professionals are making this mistake?"
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">💥 Bold Statement</p>
                    <p className="text-xs text-muted-foreground">
                      "Everything you know about networking is wrong."
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">📊 Shocking Stat</p>
                    <p className="text-xs text-muted-foreground">
                      "63% of job offers come from posts like this one."
                    </p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm mb-1">🎯 Pain Point</p>
                    <p className="text-xs text-muted-foreground">
                      "Tired of applying to 100+ jobs with no response?"
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Pro Tip
                </p>
                <p className="text-sm text-muted-foreground">
                  Your first 2 lines are everything. They appear in the feed before "see more".
                  Make them count!
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="formatting" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Formatting Best Practices</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p>
                      <strong>Use white space:</strong> Break paragraphs into 1-3 line chunks for
                      easy scanning
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p>
                      <strong>Emojis (sparingly):</strong> 1-5 emojis add personality. More than 10
                      looks spammy
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p>
                      <strong>Lists work:</strong> Numbered or bulleted lists are easy to consume
                      and share
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p>
                      <strong>Length sweet spot:</strong> 300-800 characters typically perform best
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                    <p>
                      <strong>Hashtags strategy:</strong> 3-5 relevant hashtags at the end (not
                      scattered)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Engagement Hack
                </p>
                <p className="text-sm text-muted-foreground">
                  End with a specific question or ask people to share their experience. Generic
                  "What do you think?" gets less engagement than "What's your biggest challenge
                  with X?"
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ViralityTips;