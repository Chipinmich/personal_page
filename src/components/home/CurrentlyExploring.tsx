import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getNowSection } from "@/lib/content";

/**
 * Reads straight from the "Currently Exploring" section of /content/now.mdx so
 * the homepage and the Now page never drift apart.
 */
export function CurrentlyExploring() {
  const section = getNowSection("Currently Exploring");
  if (!section || section.items.length === 0) return null;

  return (
    <Container size="wide" className="py-14 sm:py-16">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface/60 px-6 py-7 sm:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 size-56 rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_70%)] blur-2xl"
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <Compass aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
            <div>
              <p className="label-mono">Currently exploring</p>
              <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-card px-3 py-1.5 text-[0.8125rem] text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href="/now"
            className="group inline-flex shrink-0 items-center gap-1 self-start text-sm font-medium text-secondary transition-colors duration-200 hover:text-accent lg:self-center"
          >
            What I am doing now
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>
      </div>
    </Container>
  );
}
