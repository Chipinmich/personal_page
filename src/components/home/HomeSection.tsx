import type { ReactNode } from "react";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface HomeSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
  className?: string;
  children: ReactNode;
}

/** One consistent wrapper for every block on the homepage. */
export function HomeSection({
  eyebrow,
  title,
  description,
  action,
  className,
  children,
}: HomeSectionProps) {
  return (
    <section className={cn("py-14 sm:py-16", className)}>
      <Container size="wide">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          action={action}
        />
        {children}
      </Container>
    </section>
  );
}
