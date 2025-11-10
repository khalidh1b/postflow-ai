"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const examplePosts = [
  {
    category: "Story",
    post: `I got rejected from 37 companies.

Today, I turned down a $250K offer.

Here's what changed:

❌ Before: Spray & pray applications
✅ After: Strategic relationship building

❌ Before: Generic resumes  
✅ After: Tailored portfolios

❌ Before: Waiting for opportunities
✅ After: Creating them

The biggest shift?
I stopped looking for jobs.
I started solving problems.

Companies don't hire resumes.
They hire solutions.

What's one thing you changed that transformed your career?

#CareerGrowth #ProfessionalDevelopment #LinkedIn`,
    score: 92,
    type: "Personal Story",
    tone: "Authentic",
  },
  {
    category: "Insight",
    post: `The best developers I've hired all had this in common:

They documented their work obsessively.

Not because they had to.
Because they understood something most don't:

Documentation is:
→ Code for your future self
→ Marketing for your skills  
→ Leverage for your career

Your GitHub README is your resume.
Your technical blog is your portfolio.
Your Stack Overflow answers are your references.

Start documenting today.
Thank yourself in 6 months.

What's your take on technical documentation?

#SoftwareEngineering #TechCareers #Coding`,
    score: 87,
    type: "Insight/Tip",
    tone: "Professional",
  },
  {
    category: "HotTake",
    post: `Unpopular opinion:

"Work-life balance" is a corporate myth designed to make you feel guilty.

You don't need balance.
You need INTEGRATION.

Some weeks I work 60 hours because I'm obsessed with a project.
Some weeks I work 20 because I need to recharge.

The goal isn't 50/50 every week.
It's 100% fulfillment over a lifetime.

Stop trying to balance.
Start trying to build a life you don't need to escape from.

Agree or disagree? 👇

#WorkLifeBalance #Productivity #Leadership`,
    score: 94,
    type: "Controversial",
    tone: "Bold",
  },
];

const ExamplePosts = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyPost = async (post: string, index: number) => {
    await navigator.clipboard.writeText(post);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Example Viral Posts</CardTitle>
        <CardDescription>
          Real examples of high-performing LinkedIn posts to inspire your content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Story" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="Story">Story</TabsTrigger>
            <TabsTrigger value="Insight">Insight</TabsTrigger>
            <TabsTrigger value="HotTake">Hot Take</TabsTrigger>
          </TabsList>

          {examplePosts.map((example, index) => (
            <TabsContent key={index} value={example.category} className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">{example.type}</Badge>
                  <Badge variant="outline">{example.tone}</Badge>
                  <Badge className="bg-green-600">Score: {example.score}/100</Badge>
                </div>

                <div className="p-4 border rounded-lg bg-muted/30 whitespace-pre-wrap text-sm">
                  {example.post}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyPost(example.post, index)}
                    className="w-full"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Example
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 pt-2">
                  <p className="font-semibold">Why this works:</p>
                  {example.category === "Story" && (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Strong contrast (before/after creates curiosity)</li>
                      <li>Specific numbers build credibility</li>
                      <li>Ends with engagement question</li>
                      <li>Uses emojis for visual scanning</li>
                    </ul>
                  )}
                  {example.category === "Insight" && (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Leads with surprising insight</li>
                      <li>Bulleted list for easy consumption</li>
                      <li>Provides actionable takeaway</li>
                      <li>Question drives comments</li>
                    </ul>
                  )}
                  {example.category === "HotTake" && (
                    <ul className="list-disc list-inside space-y-1">
                      <li>Controversial opener stops scrolling</li>
                      <li>Challenges conventional thinking</li>
                      <li>Personal vulnerability creates connection</li>
                      <li>Direct call for debate</li>
                    </ul>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default ExamplePosts;