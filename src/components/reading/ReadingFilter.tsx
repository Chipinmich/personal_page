"use client";

import { useMemo, useState } from "react";

import { ReadingCard, type ReadingCardData } from "@/components/cards/ReadingCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { READING_STATUSES, type ReadingStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

type Filter = "All" | ReadingStatus;

const FILTERS: Filter[] = ["All", ...READING_STATUSES];

/**
 * Client-side filtering so the whole reading list stays statically generated.
 * The full list is in the HTML, which keeps it readable without JavaScript.
 */
export function ReadingFilter({ entries }: { entries: ReadingCardData[] }) {
  const [filter, setFilter] = useState<Filter>("All");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", entries.length]]);
    for (const status of READING_STATUSES) {
      map.set(
        status,
        entries.filter((entry) => entry.frontmatter.status === status).length,
      );
    }
    return map;
  }, [entries]);

  const visible = useMemo(
    () =>
      filter === "All"
        ? entries
        : entries.filter((entry) => entry.frontmatter.status === filter),
    [entries, filter],
  );

  return (
    <div>
      <div
        role="group"
        aria-label="Filter reading list by status"
        className="flex flex-wrap gap-1.5"
      >
        {FILTERS.map((value) => {
          const active = filter === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={active}
              className={cn(
                "inline-flex min-h-9 items-center gap-2 rounded-lg border px-3",
                "text-[0.8125rem] font-medium transition-colors duration-200",
                active
                  ? "border-accent/40 bg-accent/12 text-accent"
                  : "border-border bg-card text-secondary hover:border-border-strong hover:text-foreground",
              )}
            >
              {value}
              <span className="font-mono text-[0.6875rem] text-muted">
                {counts.get(value) ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {visible.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((entry) => (
              <ReadingCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={`Nothing marked "${filter}"`}
            description="Change the status in the frontmatter of a file in /content/reading to move it between these groups."
          />
        )}
      </div>
    </div>
  );
}
