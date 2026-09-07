import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { CoverImage } from "@/components/ui/CoverImage";
import { GitHubLink } from "@/components/ui/GitHubLink";
import { SampleTag } from "@/components/ui/SampleNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import type { ProjectEntry } from "@/lib/types";
import { formatDate } from "@/lib/utils";

/**
 * The lead project on the homepage. Wider than a card, with room for the
 * status, the stack and direct links to the code and the write-up.
 */
export function FeaturedProject({ project }: { project: ProjectEntry }) {
  const { slug, frontmatter } = project;

  return (
    <article className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-card">
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <CoverImage
          src={frontmatter.image}
          alt=""
          seed={slug}
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="aspect-[16/9] border-b border-border lg:aspect-auto lg:min-h-full lg:border-r lg:border-b-0"
        />

        <div className="flex flex-col p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="label-mono">Featured project</span>
            {frontmatter.status ? (
              <StatusBadge status={frontmatter.status} className="ml-auto" />
            ) : null}
            {frontmatter.sample ? <SampleTag /> : null}
          </div>

          <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            <Link
              href={`/projects/${slug}`}
              className="transition-colors duration-200 hover:text-accent"
            >
              {frontmatter.title}
            </Link>
          </h3>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary">
            {frontmatter.description}
          </p>

          <TechList items={frontmatter.technologies} className="mt-5" />

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <ButtonLink href={`/projects/${slug}`} variant="primary" size="sm">
              Read the write-up
              <ArrowRight aria-hidden="true" className="size-4" />
            </ButtonLink>

            <GitHubLink href={frontmatter.github} />

            {frontmatter.demo ? (
              <ButtonAnchor
                href={frontmatter.demo}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                Live demo
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonAnchor>
            ) : null}
          </div>

          <p className="mt-6 font-mono text-[0.6875rem] tracking-wide text-muted">
            Started {formatDate(frontmatter.date)}
          </p>
        </div>
      </div>
    </article>
  );
}
