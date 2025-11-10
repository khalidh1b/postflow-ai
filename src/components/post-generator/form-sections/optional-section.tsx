"use client";

import { Control } from "react-hook-form";
import { InputField } from "../form-fields/input-field";
import { TextareaField } from "../form-fields/textarea-field";

interface OptionalSectionProps {
  control: Control<any>;
}

export const OptionalSection = ({ control }: OptionalSectionProps) => {
  return (
    <div className="space-y-4">
      <InputField
        control={control}
        name="targetAudience"
        label="Target Audience (Optional)"
        placeholder="e.g., Software engineers, startup founders"
      />

      <TextareaField
        control={control}
        name="keyPoints"
        label="Key Points to Include (Optional)"
        placeholder="Bullet points or key messages you want to include"
        className="min-h-[60px]"
      />
    </div>
  );
};