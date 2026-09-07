import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/layout/BackLink";
import { MDXContent } from "@/components/mdx/MDXContent";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GitHubLink } from "@/components/ui/GitHubLink";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import { getLabEntries, getLabEntry } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getLabEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata(
  props: PageProps<"/lab/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getLabEntry(slug);
  if (!entry) return {};

  return buildMetadata({
    title: entry.frontmatter.title,
    description: entry.frontmatter.description,
    path: `/lab/${slug}`,
    publishedTime: entry.frontmatter.date,
    image: entry.frontmatter.image,
    type: "article",
  });
}

export default async function LabEntryPage(props: PageProps<"/lab/[slug]">) {
  const { slug } = await props.params;
  const entry = getLabEntry(slug);
  if (!entry) notFound();

  const { frontmatter, body } = entry;

  return (
    <article>
      <Container size="narrow" className="py-10 sm:py-14">
        <BackLink href="/lab" label="All experiments" />

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            {frontmatter.status ? <StatusBadge status={frontmatter.status} /> : null}
            <time
              dateTime={frontmatter.date}
              className="font-mono text-[0.6875rem] tracking-wide text-muted"
            >
              {formatDate(frontmatter.date)}
            </time>
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {frontmatter.title}
          </h1>

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-secondary">
            {frontmatter.description}
          </p>

          <TechList items={frontmatter.technologies} className="mt-5" />

          {frontmatter.github || frontmatter.demo ? (
            <div className="mt-6 flex flex-wrap gap-2.5">
              <GitHubLink href={frontmatter.github} label="View code" />
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
          ) : null}

          {frontmatter.sample ? <SampleNotice className="mt-6" /> : null}
        </header>

        <div className="rule-fade my-10" />

        <MDXContent source={body} />
      </Container>
    </article>
  );
}
