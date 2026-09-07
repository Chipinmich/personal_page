/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format an ISO-ish date string for display.
 * Returns the raw input if it cannot be parsed, so bad frontmatter never
 * renders "Invalid Date".
 */
export function formatDate(
  value: string | undefined,
  options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" },
): string {
  if (!value) return "";
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(date);
}

/** Compact form used in dense card metadata rows. */
export function formatShortDate(value: string | undefined): string {
  return formatDate(value, { year: "numeric", month: "short" });
}

/** Turn a title or filename into a URL-safe slug. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Rough reading time in minutes, based on ~200 words per minute. */
export function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Human-readable list: ["a","b","c"] -> "a, b and c". */
export function formatList(items: readonly string[]): string {
  return new Intl.ListFormat("en-US", { style: "long", type: "conjunction" }).format(items);
}
