import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
}

/** Consistent masthead for every top-level section page. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_80%_at_20%_0%,black,transparent)]"
      />
      <Container size="wide" className="relative py-12 sm:py-16">
        <p className="label-mono">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-secondary">
            {description}
          </p>
        ) : null}
        {children}
      </Container>
    </div>
  );
}
