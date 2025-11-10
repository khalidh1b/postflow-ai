import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginHeaderProps {
  title?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoSize?: number;
  className?: string;
}

export const LoginHeader = ({
  title = "Welcome back",
  description = "Sign in to your PostFlow AI account",
  logoAlt = "PostFlow AI Logo",
  logoSize = 48,
  className = "flex flex-col items-center justify-center w-full pb-3",
}: LoginHeaderProps) => {
  return (
    <CardHeader className={`space-y-1 ${className}`}>
      <CardTitle className="text-2xl text-center">{title}</CardTitle>
      <CardDescription className="text-center">
        {description}
      </CardDescription>
    </CardHeader>
  );
};