import { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { AppFooter } from "./app-footer";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <AppFooter />
    </div>
  );
};