import { LabCard } from "@/components/cards/LabCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ReadingCard } from "@/components/cards/ReadingCard";
import { WritingCard } from "@/components/cards/WritingCard";
import { CurrentlyExploring } from "@/components/home/CurrentlyExploring";
import { FeaturedProject } from "@/components/home/FeaturedProject";
import { Hero } from "@/components/home/Hero";
import { HomeSection } from "@/components/home/HomeSection";
import { EmptyState } from "@/components/ui/EmptyState";
import {
  getFeaturedProjects,
  getLabEntries,
  getReadingByStatus,
  getWritingPosts,
} from "@/lib/content";

export default function HomePage() {
  const featured = getFeaturedProjects();
  const [lead, ...rest] = featured;
  const labEntries = getLabEntries().slice(0, 3);
  const posts = getWritingPosts().slice(0, 3);
  const reading = getReadingByStatus("Reading").slice(0, 3);

  return (
    <>
      <Hero />

      <HomeSection
        eyebrow="Selected work"
        title="Featured projects"
        description="Things I am building, with write-ups covering what worked and what did not."
        action={{ href: "/projects", label: "All projects" }}
      >
        {lead ? (
          <div className="space-y-6">
            <FeaturedProject project={lead} />

            {rest.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <EmptyState
            title="No featured projects yet"
            description="Add featured: true to a file in /content/projects and it will appear here."
          />
        )}
      </HomeSection>

      <div className="rule-fade mx-auto max-w-6xl" />

      <HomeSection
        eyebrow="Lab"
        title="Latest experiments"
        description="Smaller builds and tests. Some of these grow into full projects; most do not, and that is the point."
        action={{ href: "/lab", label: "All experiments" }}
      >
        {labEntries.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {labEntries.map((entry) => (
              <LabCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="The lab is empty"
            description="Add an MDX file to /content/lab to start logging experiments."
          />
        )}
      </HomeSection>

      <div className="rule-fade mx-auto max-w-6xl" />

      <HomeSection
        eyebrow="Writing"
        title="Latest posts"
        description="Notes on what I am learning, written mostly so I understand it better myself."
        action={{ href: "/writing", label: "All posts" }}
      >
        {posts.length > 0 ? (
          <div className="max-w-3xl">
            {posts.map((post) => (
              <WritingCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing published yet"
            description="Add an MDX file to /content/writing to publish a post."
          />
        )}
      </HomeSection>

      <div className="rule-fade mx-auto max-w-6xl" />

      <HomeSection
        eyebrow="Reading"
        title="Currently reading"
        description="Books, papers and documentation I have open right now."
        action={{ href: "/reading", label: "Reading list" }}
      >
        {reading.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reading.map((entry) => (
              <ReadingCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Nothing in progress"
            description='Set status: "Reading" on an entry in /content/reading to show it here.'
          />
        )}
      </HomeSection>

      <CurrentlyExploring />
    </>
  );
}
