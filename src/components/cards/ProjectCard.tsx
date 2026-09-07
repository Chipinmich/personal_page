import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { CoverImage } from "@/components/ui/CoverImage";
import { SampleTag } from "@/components/ui/SampleNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import type { ProjectEntry } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectEntry;
  /** Skip the cover image in dense grids. */
  showImage?: boolean;
}

export function ProjectCard({ project, showImage = true }: ProjectCardProps) {
  const { slug, frontmatter } = project;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_18px_40px_-28px_var(--glow-a)] focus-within:border-accent/50">
      {showImage ? (
        <CoverImage
          src={frontmatter.image}
          alt=""
          seed={slug}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="aspect-[16/9] border-b border-border"
        />
      ) : null}

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {frontmatter.status ? <StatusBadge status={frontmatter.status} /> : null}
          {frontmatter.sample ? <SampleTag /> : null}
          <span className="ml-auto font-mono text-[0.6875rem] tracking-wide text-muted">
            {formatShortDate(frontmatter.date)}
          </span>
        </div>

        <h3 className="text-base font-semibold tracking-tight text-foreground">
          <Link href={`/projects/${slug}`} className="before:absolute before:inset-0">
            {frontmatter.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-3 text-[0.875rem] leading-relaxed text-secondary">
          {frontmatter.description}
        </p>

        <div className="mt-auto pt-5">
          <TechList items={frontmatter.technologies} limit={4} />
        </div>
      </div>

      <ArrowUpRight
        aria-hidden="true"
        className="pointer-events-none absolute top-5 right-5 size-4 text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
    </article>
  );
}
