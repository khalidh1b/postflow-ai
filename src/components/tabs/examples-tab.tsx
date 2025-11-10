"use client";

import { TabsContent } from "@/components/ui/tabs";
import ExamplePosts from "@/components/example-posts";

export const ExamplesTab = () => {
  return (
    <TabsContent value="examples">
      <ExamplePosts />
    </TabsContent>
  );
};