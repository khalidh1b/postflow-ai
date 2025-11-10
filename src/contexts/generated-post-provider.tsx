"use client";

import { createContext, useContext, ReactNode } from "react";
import { useGeneratedPost } from "@/hooks/use-generated-post";

const GeneratedPostContext = createContext<ReturnType<typeof useGeneratedPost> | null>(null);

export const GeneratedPostProvider = ({ children }: { children: ReactNode }) => {
  const generatedPostHook = useGeneratedPost();

  return (
    <GeneratedPostContext.Provider value={generatedPostHook}>
      {children}
    </GeneratedPostContext.Provider>
  );
};

export const useGeneratedPostContext = () => {
  const context = useContext(GeneratedPostContext);
  if (!context) {
    throw new Error("useGeneratedPostContext must be used within a GeneratedPostProvider");
  }
  return context;
};