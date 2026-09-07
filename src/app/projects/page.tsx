import type { Metadata } from "next";

import { ProjectCard } from "@/components/cards/ProjectCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getProjects } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Projects I have built, with write-ups covering the goal, the approach and what I learned.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I have built"
        description="Longer-running work, newest first. Each one has a write-up covering the goal, how it works, and what went wrong on the way."
      />

      <Container size="wide" className="py-12 sm:py-16">
        {projects.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No projects yet"
            description="Add an MDX file to /content/projects and it will show up here automatically."
          />
        )}
      </Container>
    </>
  );
}
