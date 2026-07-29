import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  error,
  autoComplete,
}: FormFieldProps) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label
        htmlFor={name}
        className="text-[11px] uppercase tracking-[0.14em] font-semibold text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "mt-1.5 w-full h-11 rounded-sm border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
          error ? "border-destructive" : "border-input",
        )}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
