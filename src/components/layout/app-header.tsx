"use client";

import { useSession, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { LogOut, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export const AppHeader = () => {
  const { data: session, refetch } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    const token = localStorage.getItem("bearer_token");
    const { error } = await authClient.signOut({
      fetchOptions: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });
    
    if (error?.code) {
      toast.error(error.code);
    } else {
      localStorage.removeItem("bearer_token");
      refetch();
      toast.success("Signed out successfully");
    }
  };

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold">PostFlow AI</h1>
              <p className="text-sm text-muted-foreground">
                Create viral LinkedIn posts with AI
              </p>
            </div>
          </div>
          
          <div className="md:flex grid items-center gap-2">
            <FeedbackDialog />
            {session?.user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {session.user.name}
                </span>
                <Button variant="outline" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link href="/login">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/register">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};