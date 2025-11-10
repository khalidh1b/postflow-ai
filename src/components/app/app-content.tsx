"use client";

import { AppTabs } from "@/components/navigation/app-tabs";
import { GeneratorTab } from "@/components/tabs/generator-tab";
import { LibraryTab } from "@/components/tabs/library-tab";
import { TipsTab } from "@/components/tabs/tips-tab";
import { ExamplesTab } from "@/components/tabs/examples-tab";

export const AppContent = () => {
  return (
    <AppTabs defaultValue="generator">
      <GeneratorTab />
      <LibraryTab />
      <TipsTab />
      <ExamplesTab />
    </AppTabs>
  );
};