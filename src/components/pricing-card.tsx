'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface PricingCardProps {
  name: string;
  price: number;
  priceId?: string;
  features: {
    postsPerMonth: number;
    saveToLibrary: boolean;
    analytics: boolean;
    customization: string;
    prioritySupport?: boolean;
  };
  popular?: boolean;
  currentPlan?: boolean;
  isAuthenticated: boolean;
  userEmail?: string;
  userId?: string;
}

export const PricingCard = ({
  name,
  price,
  priceId,
  features,
  popular = false,
  currentPlan = false,
  isAuthenticated,
  userEmail,
  userId,
}: PricingCardProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <Card className={`relative ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold text-foreground">
            ${price}
          </span>
          {price > 0 && <span className="text-muted-foreground">/month</span>}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span>
              {features.postsPerMonth === -1
                ? 'Unlimited posts per month'
                : `${features.postsPerMonth} posts per month`}
            </span>
          </li>
          
          {features.saveToLibrary && (
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Save posts to library</span>
            </li>
          )}
          
          {features.analytics && (
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Advanced analytics & insights</span>
            </li>
          )}
          
          <li className="flex items-start gap-2">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <span className="capitalize">{features.customization} customization</span>
          </li>
          
          {features.prioritySupport && (
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Priority support</span>
            </li>
          )}
        </ul>
      </CardContent>
      
      <CardFooter>
        {currentPlan ? (
          <Button
            variant="outline"
            className="w-full"
            disabled={loading || name === 'Free'}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : name === 'Free' ? (
              'Current Plan'
            ) : (
              'Manage Subscription'
            )}
          </Button>
        ) : (
          <Button
            className="w-full"
            variant={popular ? 'default' : 'outline'}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Subscribe'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}