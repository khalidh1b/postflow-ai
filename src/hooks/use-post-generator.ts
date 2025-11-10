"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface GeneratedPost {
  post: string;
  viralityScore: number;
  characterCount: number;
}

interface SubscriptionData {
  plan: {
    id: string;
    name: string;
    features: {
      postsPerMonth: number;
    };
  };
  usage: {
    postsGenerated: number;
    limit: number;
    unlimited: boolean;
  };
}

interface UsePostGeneratorProps {
  isAuthenticated: boolean;
  onPostGenerated?: (post: { post: string; viralityScore: number }) => void;
}

export function usePostGenerator({ isAuthenticated, onPostGenerated }: UsePostGeneratorProps) {
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const router = useRouter();


  // Check if user can generate more posts
  const canGeneratePost = () => {
    if (!isAuthenticated) return true; // Allow non-authenticated users to try
    if (!subscriptionData) return true;
    if (subscriptionData.usage.unlimited) return true;
    return subscriptionData.usage.postsGenerated < subscriptionData.usage.limit;
  };

  const generatePost = async (data: any) => {
    
    // Check limit for authenticated users
    if (isAuthenticated && !canGeneratePost()) {
      toast.error('You\'ve reached your monthly limit');
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("/api/generate-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to generate post");
      }

      const result = await response.json();
      setGeneratedPost(result);
      
      // Pass data to parent component for analytics
      if (onPostGenerated) {
        onPostGenerated({
          post: result.post,
          viralityScore: result.viralityScore,
        });
      }
      
      toast.success("Post generated successfully!");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to generate post");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (generatedPost?.post) {
      try {
        await navigator.clipboard.writeText(generatedPost.post);
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        toast.error("Failed to copy to clipboard");
      }
    }
  };

  const saveToLibrary = async (getFormValues: () => any) => {
    if (!isAuthenticated) {
      toast.error("Please sign in to save posts");
      router.push("/login?redirect=/");
      return;
    }

    if (!generatedPost) {
      toast.error("No post to save");
      return;
    }

    setIsSaving(true);
    try {
      const token = localStorage.getItem("bearer_token");
      const formValues = getFormValues();
      
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          postContent: generatedPost.post,
          viralityScore: generatedPost.viralityScore,
          characterCount: generatedPost.characterCount,
          postType: formValues.postType,
          tone: formValues.tone,
          length: formValues.length,
          format: formValues.format,
          hookStyle: formValues.hookStyle,
          ctaType: formValues.ctaType,
          hashtagStrategy: formValues.hashtagStrategy,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save post");
      }

      toast.success("Post saved to library!");
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast.error(error.message || "Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    generatedPost,
    isGenerating,
    isSaving,
    copied,
    subscriptionData,
    loadingSubscription,
    canGeneratePost: canGeneratePost(),
    generatePost,
    copyToClipboard,
    saveToLibrary,
  };
};