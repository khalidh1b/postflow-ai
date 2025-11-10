"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Check, Copy, Lock, RefreshCw, Save, Loader2 } from "lucide-react";
import Link from "next/link";

interface PostActionsProps {
  isAuthenticated: boolean;
  isSaving: boolean;
  copied: boolean;
  onCopy: () => void;
  onSave: () => void;
  onRegenerate: () => void;
}

export const PostActions = ({ 
  isAuthenticated, 
  isSaving, 
  copied, 
  onCopy, 
  onSave, 
  onRegenerate 
}: PostActionsProps) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button onClick={onCopy} className="flex-1" variant="outline">
        {copied ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </>
        )}
      </Button>
      
      {isAuthenticated ? (
        <Button
          onClick={onSave}
          className="flex-1"
          variant="default"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save to Library
            </>
          )}
        </Button>
      ) : (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1">
                <Button
                  asChild
                  className="w-full"
                  variant="default"
                >
                  <Link href="/register?redirect=/">
                    <Lock className="mr-2 h-4 w-4" />
                    Sign Up to Save
                  </Link>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Create an account to save posts to your library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <Button
        onClick={onRegenerate}
        variant="outline"
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
    </div>
  );
};