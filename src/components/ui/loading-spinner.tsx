import { FlameKindling } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <FlameKindling className="animate-pulse w-32 h-32 text-red-400 "/>
      </div>
    </div>
  );
};