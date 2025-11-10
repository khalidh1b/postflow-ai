"use client";

import { Control } from "react-hook-form";
import { SelectField } from "../form-fields/select-field";
import { HOOK_STYLE_OPTIONS, CTA_TYPE_OPTIONS, HASHTAG_STRATEGY_OPTIONS } from "../constants/form-options";

interface EngagementSectionProps {
  control: Control<any>;
}

export const EngagementSection = ({ control }: EngagementSectionProps) => {
  return (
    <div className="space-y-4">
      <SelectField
        control={control}
        name="hookStyle"
        label="Hook Style"
        options={HOOK_STYLE_OPTIONS}
        tooltip="First 2 lines are critical - they determine if people stop scrolling"
      />

      <SelectField
        control={control}
        name="ctaType"
        label="Call-to-Action Type"
        options={CTA_TYPE_OPTIONS}
      />

      <SelectField
        control={control}
        name="hashtagStrategy"
        label="Hashtag Strategy"
        options={HASHTAG_STRATEGY_OPTIONS}
        tooltip="3-5 hashtags typically balance reach and authenticity"
      />
    </div>
  );
};