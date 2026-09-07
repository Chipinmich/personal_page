import Link from "next/link";
import { ArrowUpRight, NotebookText } from "lucide-react";

import { SampleTag } from "@/components/ui/SampleNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import type { ReadingEntry } from "@/lib/types";

/** Only the fields a card needs, so MDX bodies never reach the client bundle. */
export type ReadingCardData = Pick<ReadingEntry, "slug" | "frontmatter" | "hasBody">;
import { formatList, formatShortDate } from "@/lib/utils";

/**
 * Reading rows read like a technical index rather than a bookshelf: type,
 * authors and status carry the information, and there are no ratings.
 */
export function ReadingCard({ entry }: { entry: ReadingCardData }) {
  const { slug, frontmatter, hasBody } = entry;

  const detailHref = hasBody ? `/reading/${slug}` : undefined;
  const timeline =
    frontmatter.status === "Completed"
      ? formatShortDate(frontmatter.completed ?? frontmatter.started)
      : formatShortDate(frontmatter.started);

  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-card p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_18px_40px_-28px_var(--glow-a)] focus-within:border-accent/50">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
          {frontmatter.type}
        </span>
        {frontmatter.sample ? <SampleTag /> : null}
        <StatusBadge status={frontmatter.status} className="ml-auto" />
      </div>

      <h3 className="text-[0.9375rem] leading-snug font-semibold tracking-tight text-foreground">
        {detailHref ? (
          <Link href={detailHref} className="before:absolute before:inset-0">
            {frontmatter.title}
          </Link>
        ) : (
          frontmatter.title
        )}
      </h3>

      {frontmatter.authors.length > 0 ? (
        <p className="mt-1.5 text-[0.8125rem] text-secondary">
          {formatList(frontmatter.authors)}
        </p>
      ) : null}

      <div className="mt-auto pt-4">
        <TechList items={frontmatter.tags} limit={3} />

        <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
          {timeline ? (
            <span className="font-mono text-[0.6875rem] tracking-wide text-muted">
              {timeline}
            </span>
          ) : null}

          <div className="ml-auto flex items-center gap-3">
            {detailHref ? (
              <span className="inline-flex items-center gap-1 text-[0.75rem] font-medium text-muted transition-colors duration-200 group-hover:text-accent">
                <NotebookText aria-hidden="true" className="size-3.5" />
                Notes
              </span>
            ) : null}

            {frontmatter.url ? (
              <a
                href={frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex items-center gap-1 text-[0.75rem] font-medium text-muted transition-colors duration-200 hover:text-accent"
              >
                Source
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">
                  for {frontmatter.title} (opens in a new tab)
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
