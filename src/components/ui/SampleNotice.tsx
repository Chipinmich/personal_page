import { FlaskConical } from "lucide-react";

import { cn } from "@/lib/utils";

interface SampleNoticeProps {
  className?: string;
}

/**
 * Marks seeded demo content. Sample entries exist to show the layout and are
 * never presented as real work.
 */
export function SampleNotice({ className }: SampleNoticeProps) {
  return (
    <p
      className={cn(
        "flex items-start gap-2.5 rounded-lg border border-border bg-surface px-3.5 py-3",
        "text-[0.8125rem] leading-relaxed text-muted",
        className,
      )}
    >
      <FlaskConical aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent/70" />
      <span>
        <strong className="font-medium text-secondary">Sample content.</strong> This entry is
        placeholder material included to demonstrate the layout, not a record of real work.
      </span>
    </p>
  );
}

/** Compact inline marker for cards and list rows. */
export function SampleTag({ className }: SampleNoticeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-border bg-surface px-1.5 py-0.5",
        "font-mono text-[0.625rem] tracking-wider text-muted uppercase",
        className,
      )}
    >
      Sample
    </span>
  );
}
