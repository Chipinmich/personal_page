import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  className?: string;
}

/** Monospace chip for a technology or tag. */
export function TechBadge({ label, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-surface px-2 py-1",
        "font-mono text-[0.6875rem] leading-none tracking-wide text-secondary",
        className,
      )}
    >
      {label}
    </span>
  );
}

interface TechListProps {
  items: readonly string[];
  className?: string;
  /** Collapse the list past this many items into a "+N" chip. */
  limit?: number;
}

export function TechList({ items, className, limit }: TechListProps) {
  if (items.length === 0) return null;

  const shown = limit ? items.slice(0, limit) : items;
  const overflow = limit ? items.length - shown.length : 0;

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((item) => (
        <li key={item}>
          <TechBadge label={item} />
        </li>
      ))}
      {overflow > 0 ? (
        <li>
          <TechBadge label={`+${overflow}`} />
        </li>
      ) : null}
    </ul>
  );
}
