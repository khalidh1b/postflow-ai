"use client";

import { Control } from "react-hook-form";
import { TopicField } from "../form-fields/topic-field";
import { SelectField } from "../form-fields/select-field";
import { POST_TYPE_OPTIONS, TONE_OPTIONS, LENGTH_OPTIONS, FORMAT_OPTIONS } from "../constants/form-options";

interface PostContentSectionProps {
  control: Control<any>;
}

export const PostContentSection = ({ control }: PostContentSectionProps) => {
  return (
    <div className="space-y-4">
      <TopicField control={control} />
      
      <SelectField
        control={control}
        name="postType"
        label="Post Type"
        options={POST_TYPE_OPTIONS}
        tooltip="Different post types optimize for different engagement patterns"
      />

      <SelectField
        control={control}
        name="tone"
        label="Tone"
        options={TONE_OPTIONS}
      />

      <SelectField
        control={control}
        name="length"
        label="Length"
        options={LENGTH_OPTIONS}
        tooltip="Medium posts (300-800 chars) typically perform best"
      />

      <SelectField
        control={control}
        name="format"
        label="Format Style"
        options={FORMAT_OPTIONS}
      />
    </div>
  );
};