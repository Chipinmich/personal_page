import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/layout/BackLink";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Container } from "@/components/ui/Container";
import { GitHubLink } from "@/components/ui/GitHubLink";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { TechList } from "@/components/ui/TechBadge";
import { getWritingPost, getWritingPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getWritingPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/writing/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getWritingPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    path: `/writing/${slug}`,
    publishedTime: post.frontmatter.date,
    tags: post.frontmatter.tags,
    image: post.frontmatter.image,
    type: "article",
  });
}

export default async function WritingPostPage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const post = getWritingPost(slug);
  if (!post) notFound();

  const { frontmatter, body, readingTime } = post;

  // Structured data so search engines treat these as articles rather than
  // generic pages. Every value comes from local MDX frontmatter.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    keywords: frontmatter.tags.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: absoluteUrl(`/writing/${slug}`),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size="narrow" className="py-10 sm:py-14">
        <BackLink href="/writing" label="All writing" />

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
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
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {frontmatter.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-secondary">
            {frontmatter.description}
          </p>

          <TechList items={frontmatter.tags} className="mt-5" />

          {frontmatter.github ? (
            <div className="mt-6">
              <GitHubLink href={frontmatter.github} label="Related repository" />
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
