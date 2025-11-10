"use client";

import { Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthRequiredMessageProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const AuthRequiredMessage = ({
  title = "Sign in to access this feature",
  description = "Save and manage your generated posts by creating an account",
  icon = <Library className="w-16 h-16 text-muted-foreground" />
}: AuthRequiredMessageProps) => {
  return (
    <div className="text-center py-16">
      <div className="mx-auto mb-4 text-muted-foreground">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <div className="flex items-center gap-3 justify-center">
        <Button asChild>
          <Link href="/register">Create Account</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
};