"use client";

import { TabsContent } from "@/components/ui/tabs";
import ViralityTips from "@/components/virality-tips";
import PostAnalytics from "@/components/post-analytics";
import { useGeneratedPostContext } from "@/contexts/generated-post-provider";

export const TipsTab = () => {
  const { generatedPost } = useGeneratedPostContext();

  return (
    <TabsContent value="tips" className="grid lg:grid-cols-2 gap-6">
      <ViralityTips />
      <PostAnalytics 
        post={generatedPost?.post} 
        viralityScore={generatedPost?.viralityScore} 
      />
    </TabsContent>
  );
};