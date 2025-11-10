"use client";

import { TabsContent } from "@/components/ui/tabs";
import { AuthenticatedTabContent } from "@/components/auth/authenticated-tab-content";
import { Library } from "lucide-react";
import PostLibrary from "@/components/post-library";

export const LibraryTab = () => {
  return (
    <TabsContent value="library">
      <AuthenticatedTabContent
        fallbackTitle="Sign in to access your library"
        fallbackDescription="Save and manage your generated posts by creating an account"
        fallbackIcon={<Library className="w-16 h-16 text-muted-foreground" />}
      >
        <PostLibrary />
      </AuthenticatedTabContent>
    </TabsContent>
  );
};