import type { InputHTMLAttributes, ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helperText?: string;
  startIcon?: ReactNode;
};

export function Input({
  id,
  label,
  error,
  helperText,
  startIcon,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? props.name;
  const descriptionId =
    (error || helperText) && inputId ? `${inputId}-description` : undefined;
  const wrapperClassName = `relative flex flex-col gap-2 pb-8${
    className ? ` ${className}` : ""
  }`;
  const inputClassName = `h-12 w-full rounded-md border bg-background/70 px-3 text-base text-foreground outline-none transition placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/25 disabled:cursor-not-allowed disabled:opacity-60${
    startIcon ? " pl-10" : ""
  } ${
    error
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : "border-border"
  }`;

  return (
    <div className={wrapperClassName}>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-foreground"
      >
        {label}
      </label>

      <div className="relative">
        {startIcon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-muted">
            {startIcon}
          </span>
        ) : null}

        <input
          id={inputId}
          aria-invalid={Boolean(error)}
          aria-describedby={descriptionId}
          className={inputClassName}
          {...props}
        />

        {error ? (
          <p
            id={descriptionId}
            className="absolute left-0 top-full pt-1 text-sm font-medium leading-4 text-danger"
          >
            {error}
          </p>
        ) : helperText ? (
          <p
            id={descriptionId}
            className="absolute left-0 top-full pt-1 text-sm font-medium leading-4 text-muted"
          >
            {helperText}
          </p>
        ) : null}
      </div>
    </div>
  );
}
