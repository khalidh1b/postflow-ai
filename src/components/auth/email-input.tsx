import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmailInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
};

export const EmailInput = ({
  id = "email",
  value,
  onChange,
  disabled = false,
  placeholder = "your.email@example.com",
  className = "",
}: EmailInputProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={id}>Email</Label>
      <Input
        id={id}
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        autoComplete="email"
      />
    </div>
  );
};