"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Lock, Zap } from "lucide-react";
import Link from "next/link";

interface SubscriptionData {
  plan: {
    id: string;
    name: string;
    features: {
      postsPerMonth: number;
    };
  };
  usage: {
    postsGenerated: number;
    limit: number;
    unlimited: boolean;
  };
}

interface UsageAlertProps {
  isAuthenticated: boolean;
  subscriptionData: SubscriptionData | null;
  canGeneratePost: boolean;
}

export const UsageAlert = ({ isAuthenticated, subscriptionData, canGeneratePost }: UsageAlertProps) =>  {
  const getRemainingPosts = () => {
    if (!subscriptionData || subscriptionData.usage.unlimited) return null;
    return subscriptionData.usage.limit - subscriptionData.usage.postsGenerated;
  };

  const getUsagePercentage = () => {
    if (!subscriptionData || subscriptionData.usage.unlimited) return 0;
    return (subscriptionData.usage.postsGenerated / subscriptionData.usage.limit) * 100;
  };

  // Limit Reached Alert
  if (isAuthenticated && !canGeneratePost) {
    return (
      <Alert variant="destructive">
        <Lock className="h-4 w-4" />
        <AlertTitle>Monthly Limit Reached</AlertTitle>
        <AlertDescription className="space-y-2">
          <p>You've used all {subscriptionData?.usage.limit} posts for this month.</p>
          <Button asChild size="sm" className="w-full mt-2">
            <Link href="/pricing">
              <Zap className="w-4 h-4 mr-2" />
              Upgrade to Generate More
            </Link>
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // Usage Alert for Authenticated Users
  if (isAuthenticated && subscriptionData && !subscriptionData.usage.unlimited) {
    const usagePercentage = getUsagePercentage();
    
    return (
      <Alert className={usagePercentage >= 80 ? 'border-destructive' : ''}>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="flex items-center justify-between">
          <span>Monthly Usage</span>
          <Badge variant={usagePercentage >= 100 ? 'destructive' : 'secondary'}>
            {subscriptionData.plan.name}
          </Badge>
        </AlertTitle>
        <AlertDescription className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>{subscriptionData.usage.postsGenerated} / {subscriptionData.usage.limit} posts used</span>
            <span className="font-semibold">
              {getRemainingPosts()} remaining
            </span>
          </div>
          <Progress value={usagePercentage} className="h-2" />
          {usagePercentage >= 80 && (
            <div className="mt-2">
              <Button asChild size="sm" className="w-full">
                <Link href="/pricing">
                  <Zap className="w-4 h-4 mr-2" />
                  Upgrade for More Posts
                </Link>
              </Button>
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  };

  return null;
};