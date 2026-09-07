import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/PageHeader";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getNow } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { formatDate } from "@/lib/utils";

const now = getNow();

export const metadata: Metadata = buildMetadata({
  title: "Now",
  description:
    now?.description || "What I am learning, building, exploring and reading right now.",
  path: "/now",
});

export default function NowPage() {
  if (!now) {
    return (
      <Container size="narrow" className="py-16">
        <EmptyState
          title="No Now page yet"
          description="Create /content/now.mdx to fill this page in."
        />
      </Container>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Now" title={now.title} description={now.description}>
        {now.updated ? (
          <p className="mt-5 font-mono text-[0.6875rem] tracking-wide text-muted">
            Last updated {formatDate(now.updated)}
          </p>
        ) : null}
      </PageHeader>

      <Container size="narrow" className="py-12 sm:py-16">
        <MDXContent source={now.body} />
      </Container>
    </>
  );
}
