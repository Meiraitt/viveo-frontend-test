import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  const cardClassName = `rounded-lg border border-border bg-surface/85 shadow-[0_24px_70px_rgba(0,0,0,0.45)] backdrop-blur${
    className ? ` ${className}` : ""
  }`;

  return (
    <div
      className={cardClassName}
      {...props}
    />
  );
}
