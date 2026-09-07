import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { EmptyState } from "@/components/ui/EmptyState";
import { getSocialLinks, SocialLinks } from "@/components/ui/SocialLinks";
import { hasResume } from "@/lib/assets";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: `Resume for ${siteConfig.name}, computer science student at ${siteConfig.school}.`,
  path: "/resume",
});

export default function ResumePage() {
  // Checked at build time. A missing PDF degrades to a clear message rather
  // than a broken link.
  const available = hasResume(siteConfig.resumePath);
  const socialLinks = getSocialLinks();

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Resume"
        description={`A one-page summary of what I am studying and building at ${siteConfig.school}.`}
      />

      <Container size="narrow" className="py-12 sm:py-16">
        {available ? (
          <>
            <div className="flex flex-wrap gap-3">
              <ButtonAnchor
                href={siteConfig.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <FileText aria-hidden="true" className="size-4" />
                View resume
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonAnchor>

              <ButtonAnchor href={siteConfig.resumePath} download>
                <Download aria-hidden="true" className="size-4" />
                Download PDF
              </ButtonAnchor>
            </div>

            <div className="mt-10 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
              <object
                data={siteConfig.resumePath}
                type="application/pdf"
                aria-label={`Resume for ${siteConfig.name}`}
                className="h-[70vh] max-h-[860px] w-full"
              >
                <p className="p-8 text-center text-sm text-secondary">
                  Your browser cannot display PDFs inline.{" "}
                  <a
                    href={siteConfig.resumePath}
                    className="text-accent underline underline-offset-4"
                  >
                    Download the resume instead
                  </a>
                  .
                </p>
              </object>
            </div>
          </>
        ) : (
          <EmptyState
            title="Resume coming soon"
            description={
              <>
                The PDF has not been added yet. Once it is dropped in at{" "}
                <code className="mx-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[0.75rem] text-secondary">
                  public{siteConfig.resumePath}
                </code>
                the view and download buttons appear here automatically.
              </>
            }
            action={<ButtonLink href="/about" size="sm">Read the about page</ButtonLink>}
          />
        )}

        {socialLinks.length > 0 ? (
          <>
            <div className="rule-fade my-12" />
            <p className="text-[0.875rem] leading-relaxed text-secondary">
              You can also find me here:
            </p>
            <SocialLinks
              variant="labelled"
              size="sm"
              className="mt-3 -ml-2.5"
              ariaLabel="Social links on the resume page"
            />
          </>
        ) : null}
      </Container>
    </>
  );
}
