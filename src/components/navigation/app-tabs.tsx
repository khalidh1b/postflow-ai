"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Library, TrendingUp, Lightbulb } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AppTabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export const AppTabs = ({ defaultValue, children }: AppTabsProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleAuthRequired = () => {
    toast.error("Please sign in to access this feature");
    router.push("/login?redirect=/");
  };

  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
        <TabsTrigger value="generator" className="flex items-center gap-2">
          <Rocket className="w-4 h-4" />
          <span className="hidden sm:inline">Generator</span>
        </TabsTrigger>
        <TabsTrigger 
          value="library" 
          className="flex items-center gap-2"
          onClick={(e) => {
            if (!session?.user) {
              e.preventDefault();
              handleAuthRequired();
            }
          }}
        >
          <Library className="w-4 h-4" />
          <span className="hidden sm:inline">Library</span>
        </TabsTrigger>
        <TabsTrigger value="tips" className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Tips</span>
        </TabsTrigger>
        <TabsTrigger value="examples" className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4" />
          <span className="hidden sm:inline">Examples</span>
        </TabsTrigger>
      </TabsList>
      
      {children}
    </Tabs>
  );
};