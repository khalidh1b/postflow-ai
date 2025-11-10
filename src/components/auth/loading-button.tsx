import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  loadingText?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  onClick?: () => void;
}

export const LoadingButton = ({
  isLoading,
  children,
  disabled = false,
  loadingText = "Loading...",
  className = "",
  type = "button",
  variant = "default",
  size = "default",
  onClick,
}: LoadingButtonProps) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={className}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};