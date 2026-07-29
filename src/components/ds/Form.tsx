import * as React from "react";
import { cn } from "@/lib/utils";

const controlBase =
  "w-full rounded-sm border bg-background text-foreground font-sans text-sm " +
  "placeholder:text-muted-foreground/70 " +
  "transition-[border-color,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-brand)] " +
  "hover:border-foreground/30 " +
  "focus:outline-none focus-visible:outline-none focus:border-champagne " +
  "focus:shadow-[0_0_0_1px_var(--champagne)] focus-visible:shadow-[0_0_0_1px_var(--champagne)] " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:bg-muted/50";

export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("type-label text-muted-foreground", className)} {...props}>
      {children}
    </label>
  );
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean; success?: boolean }
>(({ className, invalid, success, ...props }, ref) => (
  <input
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(
      controlBase,
      "h-11 px-3.5",
      invalid ? "border-destructive" : success ? "border-forest" : "border-input",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    aria-invalid={invalid || undefined}
    className={cn(controlBase, "min-h-28 p-3.5 leading-relaxed", invalid ? "border-destructive" : "border-input", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(({ className, invalid, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(
        controlBase,
        "h-11 appearance-none pl-3.5 pr-10",
        invalid ? "border-destructive" : "border-input",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
));
Select.displayName = "Select";

/** Label + control + help/error, the only form row pattern in the app. */
export function Field({
  label,
  htmlFor,
  error,
  hint,
  required,
  className,
  children,
}: {
  label?: React.ReactNode;
  htmlFor?: string;
  error?: string;
  hint?: React.ReactNode;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {label && (
        <Label htmlFor={htmlFor}>
          {label}
          {required && <span className="ml-1 text-champagne">*</span>}
        </Label>
      )}
      <div className="mt-2">{children}</div>
      {error ? (
        <p className="mt-2 type-small text-destructive">{error}</p>
      ) : hint ? (
        <p className="mt-2 type-small text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

/** Selectable tile used for radio/checkbox groups. */
export function OptionTile({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-sm border border-input bg-background px-3.5 py-3 text-sm",
        "transition-[border-color,background-color] duration-[var(--dur-fast)] ease-[var(--ease-brand)]",
        "hover:border-champagne has-[:checked]:border-champagne has-[:checked]:bg-champagne/6",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}

export function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        "h-4 w-4 shrink-0 rounded-[2px] border border-input accent-[var(--ocean)] cursor-pointer",
        className,
      )}
      {...props}
    />
  );
}

export function Radio({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="radio"
      className={cn("h-4 w-4 shrink-0 accent-[var(--ocean)] cursor-pointer", className)}
      {...props}
    />
  );
}
