import Link from "next/link";

interface LoginFooterProps {
  registerText?: string;
  registerLinkText?: string;
  registerHref?: string;
  className?: string;
}

export const LoginFooter = ({
  registerText = "Don't have an account?",
  registerLinkText = "Create account",
  registerHref = "/register",
  className = "",
}: LoginFooterProps) => {
  return (
    <div className={`mt-6 text-center text-sm ${className}`}>
      <p className="text-muted-foreground">
        {registerText}{" "}
        <Link 
          href={registerHref} 
          className="text-primary hover:underline font-medium"
        >
          {registerLinkText}
        </Link>
      </p>
    </div>
  );
};