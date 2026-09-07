import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/layout/BackLink";
import { MDXContent } from "@/components/mdx/MDXContent";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import { getReadingEntriesWithNotes, getReadingEntry } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatDate, formatList } from "@/lib/utils";

/** Only entries that carry real notes get a page of their own. */
export function generateStaticParams() {
  return getReadingEntriesWithNotes().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata(
  props: PageProps<"/reading/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const entry = getReadingEntry(slug);
  if (!entry) return {};

  const description =
    entry.frontmatter.authors.length > 0
      ? `Notes on ${entry.frontmatter.title} by ${formatList(entry.frontmatter.authors)}.`
      : `Notes on ${entry.frontmatter.title}.`;

  return buildMetadata({
    title: entry.frontmatter.title,
    description,
    path: `/reading/${slug}`,
    tags: entry.frontmatter.tags,
    image: entry.frontmatter.image,
    type: "article",
  });
}

export default async function ReadingEntryPage(props: PageProps<"/reading/[slug]">) {
  const { slug } = await props.params;
  const entry = getReadingEntry(slug);
  if (!entry || !entry.hasBody) notFound();

  const { frontmatter, body } = entry;

  return (
    <article>
      <Container size="narrow" className="py-10 sm:py-14">
        <BackLink href="/reading" label="Reading list" />

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[0.6875rem] tracking-wide text-muted uppercase">
              {frontmatter.type}
            </span>
            <StatusBadge status={frontmatter.status} />
          </div>

          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {frontmatter.title}
          </h1>

          {frontmatter.authors.length > 0 ? (
            <p className="mt-2 text-[0.9375rem] text-secondary">
              {formatList(frontmatter.authors)}
            </p>
          ) : null}

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-border py-4 sm:grid-cols-3">
            {frontmatter.started ? (
              <div>
                <dt className="label-mono">Started</dt>
                <dd className="mt-1 text-[0.8125rem] text-secondary">
                  {formatDate(frontmatter.started)}
                </dd>
              </div>
            ) : null}
            {frontmatter.completed ? (
              <div>
                <dt className="label-mono">Completed</dt>
                <dd className="mt-1 text-[0.8125rem] text-secondary">
                  {formatDate(frontmatter.completed)}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="label-mono">Type</dt>
              <dd className="mt-1 text-[0.8125rem] text-secondary">{frontmatter.type}</dd>
            </div>
          </dl>

          <TechList items={frontmatter.tags} className="mt-5" />

          {frontmatter.url ? (
            <div className="mt-6">
              <ButtonAnchor
                href={frontmatter.url}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                Open source material
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonAnchor>
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
