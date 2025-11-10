"use client";

import { TabsContent } from "@/components/ui/tabs";
import PostGenerator from "@/components/post-generator";
import { useSession } from "@/lib/auth-client";
import { useGeneratedPostContext } from "@/contexts/generated-post-provider";

export const GeneratorTab = () => {
  const { data: session } = useSession();
  const { setGeneratedPost } = useGeneratedPostContext();

  return (
    <TabsContent value="generator" className="space-y-6">
      <PostGenerator 
        isAuthenticated={!!session?.user} 
        onPostGenerated={setGeneratedPost}
      />
    </TabsContent>
  );
};