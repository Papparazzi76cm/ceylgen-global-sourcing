import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export { Eyebrow, GoldRule } from "@/components/ds";

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "rise",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "rise" | "fade" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "-60px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div
      ref={ref}
      className={cn(
        "reveal",
        variant === "fade" && "reveal-fade",
        variant === "left" && "reveal-left",
        variant === "right" && "reveal-right",
        className,
      )}
    >
      {children}
    </div>
  );
}
