import type { Metadata } from "next";
import { Rss } from "lucide-react";

import { WritingCard } from "@/components/cards/WritingCard";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { TechBadge } from "@/components/ui/TechBadge";
import { getWritingPosts, getWritingTags } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Technical posts about machine learning, software engineering and the things I am currently figuring out.",
  path: "/writing",
});

export default function WritingPage() {
  const posts = getWritingPosts();
  const tags = getWritingTags();

  return (
    <>
      <PageHeader
        eyebrow="Writing"
        title="Notes and posts"
        description="Mostly written to force myself to understand something properly. Newest first."
      >
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ButtonAnchor href="/rss.xml" size="sm">
            <Rss aria-hidden="true" className="size-4" />
            RSS feed
          </ButtonAnchor>

          {tags.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {tags.map(({ tag, count }) => (
                <li key={tag}>
                  <TechBadge label={`${tag} (${count})`} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </PageHeader>

      <Container size="wide" className="py-12 sm:py-16">
        {posts.length > 0 ? (
          <div className="max-w-3xl">
            {posts.map((post) => (
              <WritingCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No posts yet"
            description="Add an MDX file to /content/writing to publish the first one."
          />
        )}
      </Container>
    </>
  );
}
