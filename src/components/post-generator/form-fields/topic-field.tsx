"use client";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";

interface TopicFieldProps {
  control: Control<any>;
}

export const TopicField = ({ control }: TopicFieldProps) => {
  return (
    <FormField
      control={control}
      name="topic"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Topic / Main Idea</FormLabel>
          <FormControl>
            <Textarea
              placeholder="e.g., The importance of work-life balance in tech startups"
              className="min-h-[80px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};