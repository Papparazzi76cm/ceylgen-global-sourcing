import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * CEYLGEN Button — one family for the whole app.
 * Same height, tracking, radius, transition; only weight/tone changes.
 */
export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap select-none",
    "rounded-sm border font-sans font-medium tracking-[0.14em] uppercase",
    "transition-[background-color,border-color,color,box-shadow,transform,opacity]",
    "duration-[420ms] ease-[var(--ease-brand)] cursor-pointer",
    "active:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-35 disabled:shadow-none",
    "[&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[420ms] [&_svg]:ease-[var(--ease-brand)]",
    "hover:[&_svg:last-child]:translate-x-1",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border-graphite bg-graphite text-ivory hover:bg-transparent hover:text-graphite hover:border-graphite active:bg-graphite/90 active:text-ivory",
        gold:
          "border-champagne bg-champagne text-graphite hover:bg-transparent hover:text-graphite hover:border-graphite active:bg-champagne/90 active:text-graphite",
        secondary:
          "border-border bg-transparent text-foreground hover:border-graphite active:bg-secondary/60",
        ghost:
          "border-transparent bg-transparent text-foreground/70 hover:text-foreground active:text-foreground",
        inverse:
          "border-ivory/40 bg-transparent text-ivory hover:bg-ivory hover:text-graphite hover:border-ivory active:bg-ivory/90",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-transparent hover:text-destructive",
        link: "border-transparent px-0 h-auto normal-case tracking-[0.14em] text-foreground hover:text-champagne",
      },
      size: {
        sm: "h-9 px-5 text-[10px]",
        md: "h-11 px-7 text-[11px]",
        lg: "h-14 px-10 text-[11px]",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button ref={ref} variant="secondary" {...props} />
));
SecondaryButton.displayName = "SecondaryButton";

export const GhostButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <Button ref={ref} variant="ghost" {...props} />
));
GhostButton.displayName = "GhostButton";

/** Inline text link with the brand underline/arrow behaviour. */
export function TextLink({
  className,
  children,
  onDark,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { onDark?: boolean; asChild?: boolean }) {
  const { asChild, ...rest } = props as { asChild?: boolean };
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      className={cn(
        "group inline-flex items-center gap-1.5 type-label transition-colors duration-[var(--dur-base)] ease-[var(--ease-brand)]",
        onDark ? "text-champagne hover:text-ivory" : "text-primary hover:text-champagne",
        "[&_svg]:size-3.5 [&_svg]:transition-transform hover:[&_svg]:translate-x-1",
        className,
      )}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Comp>
  );
}
