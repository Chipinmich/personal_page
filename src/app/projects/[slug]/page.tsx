import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/layout/BackLink";
import { MDXContent } from "@/components/mdx/MDXContent";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CoverImage } from "@/components/ui/CoverImage";
import { GitHubLink } from "@/components/ui/GitHubLink";
import { SampleNotice } from "@/components/ui/SampleNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { TechList } from "@/components/ui/TechBadge";
import { getProject, getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return buildMetadata({
    title: project.frontmatter.title,
    description: project.frontmatter.description,
    path: `/projects/${slug}`,
    publishedTime: project.frontmatter.date,
    image: project.frontmatter.image,
    type: "article",
  });
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { frontmatter, body } = project;

  return (
    <article>
      <Container size="narrow" className="pt-10 sm:pt-14">
        <BackLink href="/projects" label="All projects" />

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

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {frontmatter.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-secondary">
            {frontmatter.description}
          </p>

          <TechList items={frontmatter.technologies} className="mt-6" />

          {frontmatter.github || frontmatter.demo ? (
            <div className="mt-6 flex flex-wrap gap-2.5">
              <GitHubLink href={frontmatter.github} label="View repository" />
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

        <CoverImage
          src={frontmatter.image}
          alt=""
          seed={slug}
          priority
          sizes="(min-width: 768px) 768px, 100vw"
          className="mt-10 aspect-[16/9] rounded-[var(--radius-card)] border border-border"
        />
      </Container>

      <Container size="narrow" className="py-12 sm:py-14">
        <MDXContent source={body} />
      </Container>
    </article>
  );
}
