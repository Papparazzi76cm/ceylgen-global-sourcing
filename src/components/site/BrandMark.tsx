import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path
        d="M24 3.5 L42 14 L42 34 L24 44.5 L6 34 L6 14 Z"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M24 12 L34 18 L34 30 L24 36 L14 30 L14 18 Z"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HexIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("shrink-0", className)} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" strokeLinejoin="round" />
    </svg>
  );
}
