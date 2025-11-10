"use client";

import { useState } from "react";
import { UsageAlert } from "./post-generator/usage-alert";
import { GeneratedPostPreview } from "./post-generator/generated-post-preview";
import { PostConfigurationForm } from "./post-generator/post-configuration-form";
import { usePostGenerator } from "@/hooks/use-post-generator";

interface PostGeneratorProps {
  onPostGenerated?: (post: { post: string; viralityScore: number }) => void;
  isAuthenticated: boolean;
}

const PostGenerator = ({ onPostGenerated, isAuthenticated }: PostGeneratorProps) => {
  const [getFormValues, setGetFormValues] = useState<(() => any) | null>(null);
  const [handleSubmit, setHandleSubmit] = useState<(() => void) | null>(null);
  
  const {
    generatedPost,
    isGenerating,
    isSaving,
    copied,
    subscriptionData,
    loadingSubscription,
    canGeneratePost,
    generatePost,
    copyToClipboard,
    saveToLibrary,
  } = usePostGenerator({ isAuthenticated, onPostGenerated });

  const handleFormReady = (getValues: () => any, submitHandler: () => void) => {
    setGetFormValues(() => getValues);
    setHandleSubmit(() => submitHandler);
  };

  const handleSaveToLibrary = () => {
    if (getFormValues) {
      saveToLibrary(getFormValues);
    }
  };

  const handleRegenerate = () => {
    if (handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">

        <UsageAlert 
          isAuthenticated={isAuthenticated}
          subscriptionData={subscriptionData}
          canGeneratePost={canGeneratePost}
        />

        <PostConfigurationForm
          onSubmit={generatePost}
          isGenerating={isGenerating}
          isAuthenticated={isAuthenticated}
          canGeneratePost={canGeneratePost}
          loadingSubscription={loadingSubscription}
          onFormReady={handleFormReady}
        />
      </div>

      <div className="space-y-6">
        <GeneratedPostPreview
          generatedPost={generatedPost}
          isAuthenticated={isAuthenticated}
          isSaving={isSaving}
          copied={copied}
          onCopy={copyToClipboard}
          onSave={handleSaveToLibrary}
          onRegenerate={handleRegenerate}
        />
      </div>
    </div>
  );
};

export default PostGenerator;