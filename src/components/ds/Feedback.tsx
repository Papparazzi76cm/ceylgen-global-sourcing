import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------- Badge */
export function Badge({
  className,
  tone = "neutral",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "neutral" | "gold" | "ocean" | "success" | "warning" | "danger";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2.5 py-1 type-label",
        tone === "neutral" && "border-border bg-secondary/60 text-muted-foreground",
        tone === "gold" && "border-champagne/50 bg-champagne/10 text-[color:var(--teak)]",
        tone === "ocean" && "border-ocean/30 bg-ocean/8 text-ocean",
        tone === "success" && "border-forest/35 bg-forest/10 text-forest",
        tone === "warning" && "border-copper/35 bg-copper/10 text-copper",
        tone === "danger" && "border-destructive/35 bg-destructive/8 text-destructive",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Alert */
export function Alert({
  title,
  children,
  tone = "info",
  icon,
  className,
}: {
  title?: React.ReactNode;
  children?: React.ReactNode;
  tone?: "info" | "success" | "warning" | "danger";
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-3.5 rounded-sm border p-4 md:p-5",
        tone === "info" && "border-border bg-secondary/40",
        tone === "success" && "border-forest/30 bg-forest/8",
        tone === "warning" && "border-copper/30 bg-copper/8",
        tone === "danger" && "border-destructive/30 bg-destructive/6",
        className,
      )}
    >
      {icon && <span className="mt-0.5 text-champagne [&_svg]:size-4">{icon}</span>}
      <div className="min-w-0">
        {title && <p className="type-label">{title}</p>}
        {children && <div className={cn("type-small text-muted-foreground", title && "mt-1.5")}>{children}</div>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Table */
export function Table({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-x-auto rounded-sm border border-border bg-card", className)}>
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  );
}

export function THead({ children }: { children: React.ReactNode }) {
  return <thead className="border-b border-border bg-secondary/40">{children}</thead>;
}

export function TBody({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TR({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn(
        "border-b border-border last:border-b-0 transition-colors duration-[var(--dur-fast)] hover:bg-secondary/35",
        className,
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TH({ className, children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={cn("px-5 py-4 type-label text-muted-foreground", className)} {...props}>
      {children}
    </th>
  );
}

export function TD({ className, children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={cn("px-5 py-4 align-middle type-small", className)} {...props}>
      {children}
    </td>
  );
}

/* ---------------------------------------------------------- Spec table */
export function SpecTable({
  rows,
  className,
}: {
  rows: { label: React.ReactNode; value: React.ReactNode; note?: React.ReactNode }[];
  className?: string;
}) {
  return (
    <dl className={cn("divide-y divide-border rounded-sm border border-border bg-card", className)}>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
          <dt className="type-small text-muted-foreground">{r.label}</dt>
          <dd className="type-small font-medium tabular-nums">
            {r.value}
            {r.note && <span className="ml-2 text-muted-foreground">{r.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ----------------------------------------------------------- Breadcrumb */
export function Breadcrumb({
  items,
  className,
}: {
  items: { label: React.ReactNode; node?: React.ReactNode }[];
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex flex-wrap items-center gap-2 type-small text-muted-foreground", className)}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-border">/</span>}
          <span className={i === items.length - 1 ? "text-foreground" : undefined}>
            {it.node ?? it.label}
          </span>
        </React.Fragment>
      ))}
    </nav>
  );
}

/* ----------------------------------------------------------- Pagination */
export function Pagination({
  page,
  pageCount,
  onPage,
  className,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
  className?: string;
}) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const cell =
    "inline-flex h-10 min-w-10 items-center justify-center rounded-sm border px-3 type-label transition-colors duration-[var(--dur-fast)] ease-[var(--ease-brand)] disabled:opacity-35 disabled:pointer-events-none";
  return (
    <nav className={cn("flex items-center justify-center gap-2", className)} aria-label="Pagination">
      <button type="button" className={cn(cell, "border-border hover:border-champagne")} onClick={() => onPage(page - 1)} disabled={page <= 1}>
        ←
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          aria-current={p === page ? "page" : undefined}
          onClick={() => onPage(p)}
          className={cn(
            cell,
            p === page ? "border-champagne bg-champagne/10 text-foreground" : "border-border text-muted-foreground hover:border-champagne",
          )}
        >
          {p}
        </button>
      ))}
      <button type="button" className={cn(cell, "border-border hover:border-champagne")} onClick={() => onPage(page + 1)} disabled={page >= pageCount}>
        →
      </button>
    </nav>
  );
}

/* -------------------------------------------------------------- Spinner */
export function Spinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border border-champagne border-t-transparent align-[-2px]",
        className,
      )}
    />
  );
}

export function LoadingRow({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 px-6 py-14 type-small text-muted-foreground">
      <Spinner /> {label}
    </div>
  );
}
