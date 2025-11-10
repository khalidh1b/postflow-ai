"use client";

import { useSession } from "@/lib/auth-client";
import { MainLayout } from "@/components/layout/main-layout";
import { GeneratedPostProvider } from "@/contexts/generated-post-provider";
import { AppContent } from "@/components/app/app-content";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const AppPage = () => {
  const { isPending } = useSession();

  if (isPending) {
    return <LoadingSpinner />;
  };

  return (
    <GeneratedPostProvider>
      <MainLayout>
        <AppContent />
      </MainLayout>
    </GeneratedPostProvider>
  );
};

export default AppPage;