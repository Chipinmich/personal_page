import Link from "next/link";

import { SampleTag } from "@/components/ui/SampleNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import type { LabEntry } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

/**
 * Deliberately compact. Lab entries are small experiments, so the card stays
 * denser than a project card rather than padding thin content out.
 */
export function LabCard({ entry }: { entry: LabEntry }) {
  const { slug, frontmatter } = entry;

  return (
    <article className="group relative flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-card p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_18px_40px_-28px_var(--glow-a)] focus-within:border-accent/50">
      <div className="mb-3 flex items-center gap-2">
        <span
          aria-hidden="true"
          className="h-px w-6 bg-accent/50 transition-all duration-300 group-hover:w-10"
        />
        <span className="font-mono text-[0.6875rem] tracking-wide text-muted">
          {formatShortDate(frontmatter.date)}
        </span>
        {frontmatter.sample ? <SampleTag className="ml-auto" /> : null}
      </div>

      <h3 className="text-[0.9375rem] font-semibold tracking-tight text-foreground">
        <Link href={`/lab/${slug}`} className="before:absolute before:inset-0">
          {frontmatter.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-secondary">
        {frontmatter.description}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        <TechList items={frontmatter.technologies} limit={3} />
        {frontmatter.status ? (
          <StatusBadge status={frontmatter.status} className="ml-auto" />
        ) : null}
      </div>
    </article>
  );
}
