import type { Metadata } from "next";

import { LabCard } from "@/components/cards/LabCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getLabEntries } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Lab",
  description:
    "Smaller technical experiments: AI tests, computer vision, robotics prototypes and weekend builds.",
  path: "/lab",
});

export default function LabPage() {
  const entries = getLabEntries();

  return (
    <>
      <PageHeader
        eyebrow="Lab"
        title="Experiments in progress"
        description="Short, scoped experiments kept deliberately rough. Some become projects, most stay here as notes on something I wanted to understand."
      />

      <Container size="wide" className="py-12 sm:py-16">
        {entries.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((entry) => (
              <LabCard key={entry.slug} entry={entry} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No experiments logged"
            description="Add an MDX file to /content/lab to record one."
          />
        )}
      </Container>
    </>
  );
}
