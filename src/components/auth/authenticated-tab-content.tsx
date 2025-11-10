"use client";

import { useSession } from "@/lib/auth-client";
import { AuthRequiredMessage } from "./auth-required-message";

interface AuthenticatedTabContentProps {
  children: React.ReactNode;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackIcon?: React.ReactNode;
}

export const AuthenticatedTabContent = ({ 
  children, 
  fallbackTitle,
  fallbackDescription,
  fallbackIcon
}: AuthenticatedTabContentProps) => {
  const { data: session } = useSession();

  if (!session?.user) {
    return (
      <AuthRequiredMessage
        title={fallbackTitle}
        description={fallbackDescription}
        icon={fallbackIcon}
      />
    );
  }

  return <>{children}</>;
};