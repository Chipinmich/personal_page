import Link from "next/link";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Wordmark used in the header. The CW monogram carries the accent so the mark
 * stays quiet while still being recognisable at small sizes.
 */
export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-lg text-sm font-medium",
        className,
      )}
    >
      <Monogram />
      <span className="text-foreground transition-colors duration-200 group-hover:text-accent">
        {siteConfig.name}
      </span>
    </Link>
  );
}

/** Standalone CW mark. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md border border-border bg-surface",
        "font-mono text-[0.625rem] tracking-[0.08em] text-accent",
        "transition-colors duration-200 group-hover:border-accent/40",
        className,
      )}
    >
      {siteConfig.monogram}
    </span>
  );
}
