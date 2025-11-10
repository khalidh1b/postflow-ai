"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useCallback, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { PostContentSection } from "./form-sections/post-content-section";
import { EngagementSection } from "./form-sections/engagement-section";
import { OptionalSection } from "./form-sections/optional-section";
import { SubmitSection } from "./form-sections/submit-section";

const formSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters"),
  postType: z.string(),
  tone: z.string(),
  length: z.string(),
  format: z.string(),
  hookStyle: z.string(),
  ctaType: z.string(),
  hashtagStrategy: z.string(),
  targetAudience: z.string().optional(),
  keyPoints: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface PostConfigurationFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  isGenerating: boolean;
  isAuthenticated: boolean;
  canGeneratePost: boolean;
  loadingSubscription: boolean;
  onFormReady?: (getValues: () => FormData, handleSubmit: () => void) => void;
}

export const PostConfigurationForm = ({
  onSubmit,
  isGenerating,
  isAuthenticated,
  canGeneratePost,
  loadingSubscription,
  onFormReady
}: PostConfigurationFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      postType: "insight",
      tone: "professional",
      length: "medium",
      format: "standard",
      hookStyle: "question",
      ctaType: "engagement",
      hashtagStrategy: "moderate",
      targetAudience: "",
      keyPoints: "",
    },
  });

  const hasCalledOnFormReady = useRef(false);
  
  // Expose form methods to parent when ready
  useEffect(() => {
    if (onFormReady && !hasCalledOnFormReady.current) {
      hasCalledOnFormReady.current = true;
      onFormReady(
        () => form.getValues(),
        () => form.handleSubmit(handleSubmit)()
      );
    }
  }, [onFormReady]);

  const handleSubmit = async (data: FormData) => {
    await onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Post Configuration
        </CardTitle>
        <CardDescription>
          Customize every aspect of your LinkedIn post for maximum virality
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <PostContentSection control={form.control} />
            <EngagementSection control={form.control} />
            <OptionalSection control={form.control} />
            <SubmitSection
              isGenerating={isGenerating}
              isAuthenticated={isAuthenticated}
              canGeneratePost={canGeneratePost}
              loadingSubscription={loadingSubscription}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};