"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { LoginLayout } from "@/components/auth/login-layout";
import { LoginHeader } from "@/components/auth/login-header";
import { LoginForm } from "@/components/auth/login-form";
import { LoginFormData } from "@/hooks/use-login-form";

export const LoginContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (formData: LoginFormData) => {
    try {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        callbackURL: "/",
      });

      if (error?.code) {
        toast.error("Invalid email or password. Please make sure you have already registered an account and try again.");
        return;
      }

      toast.success("Signed in successfully!");
      const redirect = searchParams.get("redirect") || "/";
      router.push(redirect);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <LoginLayout>
      <LoginHeader />
      <LoginForm onSubmit={handleSubmit} />
    </LoginLayout>
  );
}