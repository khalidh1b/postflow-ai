"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { LoginLayout } from "@/components/auth/login-layout";
import { LoginHeader } from "@/components/auth/login-header";
import { LoginForm } from "@/components/auth/login-form";
import { LoginFormData } from "@/hooks/use-login-form";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = async (formData: LoginFormData) => {
    try {
      const { data, error } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: "",
        callbackURL: "/",
      });

      if (error?.code) {
        toast.error("Registration failed. Please try again.");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <LoginLayout>
      <LoginHeader
        title="Create your account"
        description="Sign up to get started with PostFlow AI"
      />
      <LoginForm
        onSubmit={handleSubmit}
        buttonText="Create account"
        loadingText="Creating account..."
        footerProps={{
          registerText: "Already have an account?",
          registerLinkText: "Sign in",
          registerHref: "/login"
        }}
      />
    </LoginLayout>
  );
};