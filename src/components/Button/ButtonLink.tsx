import Link from "next/link";
import type { ComponentProps } from "react";
import { buttonStyles } from "./buttonStyles";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  isFullWidth?: boolean;
  className?: string;
};

export function ButtonLink({
  variant,
  size,
  isFullWidth,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={buttonStyles({ variant, size, isFullWidth, className })}
      {...props}
    />
  );
}
