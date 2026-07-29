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
    "inline-flex items-center justify-center gap-2 whitespace-nowrap select-none",
    "rounded-sm border font-sans font-medium tracking-[0.06em] uppercase",
    "transition-[background-color,border-color,color,box-shadow,transform]",
    "duration-[var(--dur-base)] ease-[var(--ease-brand)] cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[var(--dur-base)]",
    "hover:[&_svg:last-child]:translate-x-0.5",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:border-primary/90",
        gold: "border-champagne bg-champagne text-graphite hover:bg-champagne/90 hover:border-champagne/90",
        secondary:
          "border-border bg-transparent text-foreground hover:border-champagne hover:text-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground hover:text-primary hover:border-transparent",
        inverse:
          "border-ivory/35 bg-ivory/5 text-ivory backdrop-blur hover:bg-ivory/12 hover:border-ivory/60",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "border-transparent px-0 h-auto normal-case tracking-normal text-primary underline underline-offset-4 hover:text-champagne",
      },
      size: {
        sm: "h-9 px-4 text-[11px]",
        md: "h-11 px-6 text-[12px]",
        lg: "h-13 px-8 text-[12px]",
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
