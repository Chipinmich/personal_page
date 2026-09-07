import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { ReadingFilter } from "@/components/reading/ReadingFilter";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getReadingEntries } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Reading",
  description:
    "Books, research papers, articles, documentation and courses I am working through, with notes.",
  path: "/reading",
});

export default function ReadingPage() {
  // Strip the MDX bodies before handing the list to the client filter.
  const entries = getReadingEntries().map(({ slug, frontmatter, hasBody }) => ({
    slug,
    frontmatter,
    hasBody,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Reading"
        title="Books, papers and documentation"
        description="What I am reading and what I have finished. Entries with notes link through to a page of takeaways."
      />

      <Container size="wide" className="py-12 sm:py-16">
        {entries.length > 0 ? (
          <ReadingFilter entries={entries} />
        ) : (
          <EmptyState
            title="Nothing on the list"
            description="Add an MDX file to /content/reading to start tracking what you read."
          />
        )}
      </Container>
    </>
  );
}
