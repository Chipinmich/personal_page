import Link from "next/link";

import { SampleTag } from "@/components/ui/SampleNotice";
import { TechList } from "@/components/ui/TechBadge";
import type { WritingEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function WritingCard({ post }: { post: WritingEntry }) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <article className="group relative border-b border-border py-6 transition-colors duration-300 first:pt-0 last:border-b-0 focus-within:border-accent/50">
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <time
          dateTime={frontmatter.date}
          className="font-mono text-[0.6875rem] tracking-wide text-muted"
        >
          {formatDate(frontmatter.date)}
        </time>
        <span aria-hidden="true" className="size-1 rounded-full bg-border-strong" />
        <span className="font-mono text-[0.6875rem] tracking-wide text-muted">
          {readingTime} min read
        </span>
        {frontmatter.sample ? <SampleTag /> : null}
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent">
        <Link href={`/writing/${slug}`} className="before:absolute before:inset-0">
          {frontmatter.title}
        </Link>
      </h3>

      <p className="mt-2 max-w-2xl text-[0.875rem] leading-relaxed text-secondary">
        {frontmatter.description}
      </p>

      <TechList items={frontmatter.tags} limit={4} className="mt-4" />
    </article>
  );
}
