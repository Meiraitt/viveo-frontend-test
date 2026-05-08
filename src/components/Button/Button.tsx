import type { ButtonHTMLAttributes } from "react";
import { buttonStyles } from "./buttonStyles";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isFullWidth?: boolean;
};

export function Button({
  variant,
  size,
  isFullWidth,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, isFullWidth, className })}
      {...props}
    />
  );
}
