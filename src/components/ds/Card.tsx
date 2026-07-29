import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * One card system for the whole product. Hairline border, near-square
 * corners, whisper shadow on hover, generous internal air.
 */
export function Card({
  className,
  interactive = false,
  tone = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  tone?: "default" | "muted" | "dark";
}) {
  return (
    <div
      className={cn(
        "relative rounded-sm border border-border",
        tone === "default" && "bg-card",
        tone === "muted" && "bg-secondary/40",
        tone === "dark" && "bg-graphite text-ivory border-ivory/12",
        interactive &&
          "group transition-[border-color,box-shadow,transform] duration-[var(--dur-base)] ease-[var(--ease-brand)] hover:border-champagne hover:shadow-[var(--shadow-soft)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("p-6 md:p-8", className)}>{children}</div>;
}

export function CardTitle({ className, children }: { className?: string; children: React.ReactNode }) {
  return <h3 className={cn("type-h3", className)}>{children}</h3>;
}

export function CardText({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn("mt-3 type-small text-muted-foreground", className)}>{children}</p>;
}

/** Icon frame — the single icon treatment used app-wide. */
export function IconFrame({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-sm border border-champagne/45 text-champagne",
        "transition-colors duration-[var(--dur-base)] ease-[var(--ease-brand)] group-hover:border-champagne group-hover:bg-champagne/8",
        size === "sm" ? "h-9 w-9 [&_svg]:size-4" : "h-11 w-11 [&_svg]:size-5",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Feature / value proposition card. */
export function FeatureCard({
  icon,
  title,
  description,
  footer,
  className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card interactive className={cn("h-full", className)}>
      <CardBody>
        {icon && <IconFrame>{icon}</IconFrame>}
        <CardTitle className={icon ? "mt-6" : undefined}>{title}</CardTitle>
        {description && <CardText>{description}</CardText>}
        {footer && <div className="mt-6">{footer}</div>}
      </CardBody>
    </Card>
  );
}

/** Editorial image card used for categories and product lines. */
export function MediaCard({
  image,
  alt,
  title,
  description,
  action,
  ratio = "16/10",
  className,
}: {
  image: string;
  alt: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  ratio?: "16/10" | "4/3" | "1/1";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative block overflow-hidden rounded-sm border border-border bg-card",
        "transition-[border-color,box-shadow] duration-[var(--dur-base)] ease-[var(--ease-brand)] hover:border-champagne hover:shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: ratio.replace("/", " / ") }}
      >
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-brand)] group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/88 via-graphite/25 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 text-ivory">
        <h3 className="type-h3 text-ivory">{title}</h3>
        {description && <p className="mt-3 max-w-md type-small text-ivory/80">{description}</p>}
        {action && <div className="mt-5">{action}</div>}
      </div>
    </div>
  );
}

/** Compact KPI card (admin dashboards + public stats). */
export function StatCard({
  label,
  value,
  icon,
  className,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("group", className)}>
      <div className="p-5 md:p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="type-label text-muted-foreground">{label}</span>
          {icon && <span className="text-champagne [&_svg]:size-4">{icon}</span>}
        </div>
        <div className="mt-5 font-serif text-3xl md:text-4xl tabular-nums">{value}</div>
      </div>
    </Card>
  );
}

/** Document / resource row-card. */
export function ResourceCard({
  icon,
  title,
  meta,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  meta?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card interactive className={cn("h-full", className)}>
      <div className="flex items-start gap-5 p-6">
        {icon && <IconFrame size="sm">{icon}</IconFrame>}
        <div className="min-w-0 flex-1">
          <h3 className="type-h4">{title}</h3>
          {meta && <p className="mt-2 type-small text-muted-foreground">{meta}</p>}
          {action && <div className="mt-5">{action}</div>}
        </div>
      </div>
    </Card>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-sm border border-dashed border-border bg-card/50 px-6 py-16 text-center",
        className,
      )}
    >
      {icon && <IconFrame className="mb-6">{icon}</IconFrame>}
      <h3 className="type-h4">{title}</h3>
      {description && <p className="mt-3 max-w-sm type-small text-muted-foreground">{description}</p>}
      {action && <div className="mt-7">{action}</div>}
    </div>
  );
}
