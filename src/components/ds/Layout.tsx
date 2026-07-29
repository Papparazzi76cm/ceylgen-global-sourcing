import * as React from "react";
import { cn } from "@/lib/utils";

/** Page container — the single horizontal rhythm of the site. */
export function Container({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container-page", className)} {...props}>
      {children}
    </div>
  );
}

/** Vertical section rhythm. tone controls the surface. */
export function Section({
  className,
  children,
  tone = "default",
  size = "md",
  bordered = false,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  tone?: "default" | "muted" | "dark";
  size?: "sm" | "md";
  bordered?: boolean;
}) {
  return (
    <section
      className={cn(
        tone === "muted" && "bg-secondary/50",
        tone === "dark" && "bg-graphite text-ivory",
        bordered && "border-y border-border",
        className,
      )}
      {...props}
    >
      <Container className={size === "sm" ? "section-y-sm" : "section-y"}>{children}</Container>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  onDark,
}: {
  children: React.ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px w-8 bg-champagne" />
      <span className={cn("type-label", onDark ? "text-ivory/70" : "text-muted-foreground")}>
        {children}
      </span>
    </div>
  );
}

export function GoldRule({ className }: { className?: string }) {
  return <div className={cn("gold-line", className)} />;
}

/** Section title block: eyebrow + serif heading + optional lead. */
export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  onDark,
  className,
  as = "h2",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Eyebrow onDark={onDark} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      )}
      <Heading className={cn("mt-5 max-w-3xl", as === "h1" ? "type-h1" : "type-h2", align === "center" && "mx-auto")}>
        {title}
      </Heading>
      {lead && (
        <p
          className={cn(
            "mt-5 max-w-2xl type-lead",
            onDark && "text-ivory/75",
            align === "center" && "mx-auto",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

/** Standard interior page header (every non-home page opens with this). */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-border", className)}>
      <Container className="pt-16 pb-12 md:pt-24 md:pb-16">
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} lead={lead} />
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  );
}

/** Closing call-to-action band, dark surface. */
export function CTASection({
  eyebrow,
  title,
  lead,
  actions,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("bg-graphite text-ivory", className)}>
      <Container className="section-y">
        <div className="max-w-3xl">
          {eyebrow && <Eyebrow onDark>{eyebrow}</Eyebrow>}
          <h2 className="mt-5 type-h2 text-ivory">{title}</h2>
          {lead && <p className="mt-5 max-w-2xl type-lead text-ivory/75">{lead}</p>}
          {actions && <div className="mt-10 flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      </Container>
    </section>
  );
}

/** Uniform grid used for every card collection. */
export function Grid({
  cols = 3,
  className,
  children,
}: {
  cols?: 2 | 3 | 4;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid gap-px bg-border sm:gap-6 sm:bg-transparent",
        cols === 2 && "sm:grid-cols-2",
        cols === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        cols === 4 && "sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
