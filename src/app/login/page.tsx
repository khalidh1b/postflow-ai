"use client";

import { Suspense } from "react";
import { LoginContent } from "./login-content";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;