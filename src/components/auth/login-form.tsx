import { FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EmailInput } from "./email-input";
import { PasswordInput } from "./password-input";
import { RememberMeCheckbox } from "./remember-me-checkbox";
import { LoadingButton } from "./loading-button";
import { LoginFooter } from "./login-footer";
import { useLoginForm, LoginFormData } from "@/hooks/use-login-form";

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => Promise<void>;
  isLoading?: boolean;
  className?: string;
  showRememberMe?: boolean;
  buttonText?: string;
  loadingText?: string;
  footerProps?: {
    registerText?: string;
    registerLinkText?: string;
    registerHref?: string;
  };
}

export const LoginForm = ({
  onSubmit,
  isLoading: externalIsLoading = false,
  className = "",
  showRememberMe = true,
  buttonText = "Sign in",
  loadingText = "Signing in...",
  footerProps = {},
}: LoginFormProps) => {
  const {
    formData,
    isLoading: internalIsLoading,
    updateEmail,
    updatePassword,
    updateRememberMe,
    setLoading,
    isFormValid,
  } = useLoginForm();

  const isLoading = externalIsLoading || internalIsLoading;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;

    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={`w-full max-w-md ${className}`}>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <EmailInput
            value={formData.email}
            onChange={updateEmail}
            disabled={isLoading}
          />

          <PasswordInput
            value={formData.password}
            onChange={updatePassword}
            disabled={isLoading}
          />

          {showRememberMe && (
            <RememberMeCheckbox
              checked={formData.rememberMe}
              onChange={updateRememberMe}
              disabled={isLoading}
            />
          )}

          <LoadingButton
            type="submit"
            className="w-full"
            isLoading={isLoading}
            loadingText={loadingText}
            disabled={!isFormValid}
          >
            {buttonText}
          </LoadingButton>
        </form>

        <LoginFooter {...footerProps} />
      </CardContent>
    </Card>
  );
};