import { ArrowRight, FileText } from "lucide-react";
import { FaGithub } from "react-icons/fa6";

import { HeroVisual } from "@/components/home/HeroVisual";
import { ButtonAnchor, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/lib/site";

const KEYWORDS = ["Build", "Learn", "Experiment", "Improve"];

export function Hero() {
  const { social } = siteConfig;

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Ambient depth: a faint grid that fades out before the content ends. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow-b),transparent_70%)] blur-3xl"
      />

      <Container size="wide" className="relative">
        <div className="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:py-28">
          <div className="rise-in">
            <p className="label-mono flex flex-wrap items-center gap-x-2 gap-y-1">
              {KEYWORDS.map((word, index) => (
                <span key={word} className="flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden="true" className="text-border-strong">
                      &middot;
                    </span>
                  ) : null}
                  {word}
                </span>
              ))}
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>

            <p className="mt-4 text-lg font-medium text-secondary sm:text-xl">
              {siteConfig.tagline}
            </p>

            <p className="mt-2 font-mono text-[0.8125rem] tracking-wide text-accent">
              {siteConfig.focus}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-secondary">
              I am a computer science student who enjoys building, learning, and exploring
              the intersection of AI, robotics, and real-world software.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ButtonLink href="/projects" variant="primary">
                View projects
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>

              {social.github ? (
                <ButtonAnchor
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub aria-hidden="true" className="size-4" />
                  GitHub
                  <span className="sr-only"> profile (opens in a new tab)</span>
                </ButtonAnchor>
              ) : null}

              <ButtonLink href="/resume">
                <FileText aria-hidden="true" className="size-4" />
                Resume
              </ButtonLink>
            </div>

            <SocialLinks
              size="sm"
              className="mt-8 -ml-2"
              ariaLabel="Social links in introduction"
            />
          </div>

          <HeroVisual className="mx-auto hidden aspect-square w-full max-w-lg lg:block" />
        </div>
      </Container>
    </section>
  );
}
