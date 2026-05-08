type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonStyleOptions = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  className?: string;
};

const baseStyles =
  "inline-flex items-center justify-center rounded-md font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-primary/70 bg-primary text-white shadow-[0_0_28px_rgba(168,85,247,0.35)] hover:bg-primary-strong",
  secondary:
    "border border-border bg-surface-strong text-foreground hover:border-primary/70 hover:text-white",
  ghost:
    "border border-transparent bg-transparent text-muted hover:text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const buttonStyles = ({
  variant = "primary",
  size = "md",
  isFullWidth = false,
  className = "",
}: ButtonStyleOptions = {}) =>
  `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}${
    isFullWidth ? " w-full" : ""
  }${className ? ` ${className}` : ""}`;
