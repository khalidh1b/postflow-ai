import { Label } from "@/components/ui/label";

interface RememberMeCheckboxProps {
  id?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
}

export const RememberMeCheckbox = ({
  id = "rememberMe",
  checked,
  onChange,
  disabled = false,
  className = "",
  label = "Remember me",
}: RememberMeCheckboxProps) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="rounded border-input text-primary focus:ring-primary"
        disabled={disabled}
      />
      <Label htmlFor={id} className="text-sm">
        {label}
      </Label>
    </div>
  );
};