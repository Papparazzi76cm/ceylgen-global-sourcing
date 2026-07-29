import { cn } from "@/lib/utils";

/**
 * CEYLGEN Isotipo — hexagon frame (graphite) + inner stylized "G"
 * (gold chevron with triangular notch). Two-color by default; use
 * variant="mono-dark" / "mono-light" / "mono-gold" to force a single color
 * (for dark backgrounds, print, or accent usage per brand book).
 */
export function BrandMark({
  className,
  variant = "brand",
}: {
  className?: string;
  variant?: "brand" | "mono-dark" | "mono-light" | "mono-gold";
}) {
  const hexColor =
    variant === "brand"
      ? "var(--graphite)"
      : variant === "mono-light"
      ? "var(--ivory)"
      : variant === "mono-gold"
      ? "var(--champagne)"
      : "var(--graphite)";
  const gColor =
    variant === "brand"
      ? "var(--champagne)"
      : variant === "mono-light"
      ? "var(--ivory)"
      : variant === "mono-gold"
      ? "var(--champagne)"
      : "var(--graphite)";

  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      {/* Hexagon frame — flat top/bottom, pointy left/right */}
      <path
        d="M25 8 L75 8 L96 50 L75 92 L25 92 L4 50 Z"
        fill="none"
        stroke={hexColor}
        strokeWidth="6"
        strokeLinejoin="miter"
      />
      {/* Stylized G — gold chevron/arrow */}
      {/* Outer right-pointing chevron */}
      <path
        d="M32 24 L64 24 L82 50 L64 76 L32 76 L48 50 Z"
        fill={gColor}
      />
      {/* Inner cut-out shaping the "G" — inverse triangle notch */}
      <path
        d="M44 40 L68 40 L56 58 Z"
        fill={hexColor === "var(--graphite)" ? "var(--ivory)" : "var(--graphite)"}
      />
      {/* Small counter to reinforce G opening */}
      <path
        d="M56 58 L72 58 L64 70 Z"
        fill={hexColor === "var(--graphite)" ? "var(--ivory)" : "var(--graphite)"}
      />
    </svg>
  );
}

/** Generic hex icon (kept for existing imports) */
export function HexIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Full horizontal logo lockup: isotipo + wordmark + tagline.
 * Matches the brand book "Logo principal (horizontal)".
 */
export function Wordmark({
  className,
  onDark = false,
  showTagline = true,
  size = "md",
}: {
  className?: string;
  onDark?: boolean;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const markSize = size === "lg" ? "h-12 w-12" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const wordSize = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  const tagSize = size === "lg" ? "text-[11px]" : size === "sm" ? "text-[9px]" : "text-[10px]";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandMark
        variant={onDark ? "mono-light" : "brand"}
        className={markSize}
      />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-sans font-medium tracking-[0.14em]",
            wordSize,
            onDark ? "text-ivory" : "text-graphite",
          )}
        >
          CEYLGEN
        </span>
        {showTagline && (
          <span
            className={cn(
              "mt-1.5 font-sans uppercase tracking-[0.28em] font-medium",
              tagSize,
              "text-champagne",
            )}
          >
            Premium Natural Resources
          </span>
        )}
      </div>
    </div>
  );
}
