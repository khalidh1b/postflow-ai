"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Atom } from "lucide-react";
import Link from "next/link";

interface SubmitSectionProps {
  isGenerating: boolean;
  isAuthenticated: boolean;
  canGeneratePost: boolean;
  loadingSubscription: boolean;
}

export const SubmitSection = ({ 
  isGenerating, 
  isAuthenticated, 
  canGeneratePost, 
  loadingSubscription 
}: SubmitSectionProps) => {
  return (
    <div className="space-y-4">
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating Post...
          </>
        ) : (
          <>
            <Atom className="mr-2 h-4 w-4" />
            Generate Viral Post
          </>
        )}
      </Button>

      {!isAuthenticated && (
        <p className="text-xs text-center text-muted-foreground">
          <Link href="/register" className="underline hover:text-foreground">
            Sign up
          </Link>
          {' '}to track usage and save posts
        </p>
      )}
    </div>
  );
};