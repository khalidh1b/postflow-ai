'use client';

import { useEffect, useState } from 'react';
import { PricingCard } from '@/components/pricing-card';
import { useSession } from '@/lib/auth-client';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface SubscriptionData {
  subscription: any;
  plan: {
    id: string;
    name: string;
  };
}

export default function PricingPage() {
  const { data: session, isPending } = useSession();
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  const currentPlanId = subscriptionData?.plan?.id || 'free';

  const features = {
    postsPerMonth: currentPlanId === 'free' ? 3000 : -1,
    saveToLibrary: currentPlanId === 'free',
    analytics: currentPlanId === 'free',
    customization: currentPlanId === 'free' ? 'Basic' : 'Full',
    prioritySupport: true,
  }
  return (
    <div className="min-h-screen bg-background">

      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              PostFlow AI
            </Link>
            <Button variant="outline" asChild>
              <Link href="/">Back to App</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate viral LinkedIn posts with AI. Start free, upgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingCard
            name="Support the project"
            price={3}
            features={ features }
            currentPlan={currentPlanId === 'free'}
            isAuthenticated={!!session?.user}
            userEmail={session?.user?.email}
            userId={session?.user?.id}
          />
        </div>

        {!session?.user && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Sign in to subscribe to a plan
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link href="/register">Create Account</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        )}

        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Can I cancel anytime?</h3>
              <p className="text-muted-foreground">
                Yes! You can cancel your subscription at any time from the billing portal. You'll keep access until the end of your billing period.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, debit cards, and PayPal through our secure payment provider Paddle.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-muted-foreground">
                Absolutely! You can change your plan at any time. The changes will be reflected immediately, and billing will be prorated.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-semibold text-lg mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Our Free plan allows you to try the core features with 10 posts per month. No credit card required!
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-16 py-8 bg-card/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Secure payments powered by Paddle • Built with Next.js & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};