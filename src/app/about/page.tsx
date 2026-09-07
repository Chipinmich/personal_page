import type { Metadata } from "next";
import { GraduationCap, Mail, MapPin } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { MDXContent } from "@/components/mdx/MDXContent";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getAbout } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const about = getAbout();

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    about?.description ||
    `About ${siteConfig.name}, a computer science student at ${siteConfig.school}.`,
  path: "/about",
});

export default function AboutPage() {
  const { social } = siteConfig;

  return (
    <>
      <PageHeader
        eyebrow="About"
        title={about?.title || "About me"}
        description={about?.description}
      >
        <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
          <div className="flex items-center gap-2">
            <dt className="sr-only">School</dt>
            <GraduationCap aria-hidden="true" className="size-4 text-muted" />
            <dd className="text-[0.875rem] text-secondary">{siteConfig.school}</dd>
          </div>
          <div className="flex items-center gap-2">
            <dt className="sr-only">Location</dt>
            <MapPin aria-hidden="true" className="size-4 text-muted" />
            <dd className="text-[0.875rem] text-secondary">{siteConfig.location}</dd>
          </div>
        </dl>
      </PageHeader>

      <Container size="narrow" className="py-12 sm:py-16">
        {about ? (
          <MDXContent source={about.body} />
        ) : (
          <EmptyState
            title="No about content yet"
            description="Create /content/about.mdx to fill this page in."
          />
        )}

        <div className="rule-fade my-12" />

        <section aria-labelledby="contact">
          <h2
            id="contact"
            className="text-xl font-semibold tracking-tight text-foreground"
          >
            Get in touch
          </h2>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-secondary">
            I am always happy to talk about machine learning, robotics, or anything
            somebody is building. The fastest way to reach me is below.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {social.email ? (
              <ButtonAnchor href={`mailto:${social.email}`} variant="primary" size="sm">
                <Mail aria-hidden="true" className="size-4" />
                Email me
              </ButtonAnchor>
            ) : null}
            <ButtonLink href="/resume" size="sm">
              View resume
            </ButtonLink>
          </div>

          <SocialLinks
            variant="labelled"
            size="sm"
            className="mt-6 -ml-2.5"
            ariaLabel="Social links on the about page"
          />
        </section>
      </Container>
    </>
  );
}
