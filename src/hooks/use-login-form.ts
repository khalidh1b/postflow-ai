import { useState } from "react";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function useLoginForm(initialData: LoginFormData = {
  email: "",
  password: "",
  rememberMe: false,
}) {
  const [formData, setFormData] = useState<LoginFormData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateEmail = (email: string) => updateField('email', email);
  const updatePassword = (password: string) => updateField('password', password);
  const updateRememberMe = (rememberMe: boolean) => updateField('rememberMe', rememberMe);

  const resetForm = () => {
    setFormData(initialData);
  };

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const isFormValid = formData.email.trim() !== "" && formData.password.trim() !== "";

  return {
    formData,
    isLoading,
    updateEmail,
    updatePassword,
    updateRememberMe,
    resetForm,
    setLoading,
    isFormValid,
  };
};