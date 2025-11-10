import { ReactNode } from "react";

interface LoginLayoutProps {
  children: ReactNode;
  className?: string;
  showBackground?: boolean;
}

export const LoginLayout = ({
  children,
  className = "",
}: LoginLayoutProps) => {
  return (
    <div className={`min-h-screen bg-background flex flex-col items-center justify-center p-4 ${className}`}>
      {children}
    </div>
  );
};