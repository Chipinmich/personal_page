import { cn } from "@/lib/utils";

type Tone = "accent" | "mint" | "muted";

/** Maps known status words to a tone so colour stays meaningful, not decorative. */
function toneFor(status: string): Tone {
  const value = status.trim().toLowerCase();
  if (value === "completed" || value === "shipped" || value === "complete") return "mint";
  if (value === "want to read" || value === "archived" || value === "paused") return "muted";
  return "accent";
}

const tones: Record<Tone, string> = {
  accent:
    "border-accent/30 bg-accent/10 text-accent [--dot:var(--accent)]",
  mint: "border-mint/30 bg-mint/10 text-mint [--dot:var(--mint)]",
  muted: "border-border bg-surface text-muted [--dot:var(--fg-muted)]",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "font-mono text-[0.6875rem] leading-none tracking-wide whitespace-nowrap",
        tones[toneFor(status)],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-[var(--dot)]"
      />
      {status}
    </span>
  );
}
