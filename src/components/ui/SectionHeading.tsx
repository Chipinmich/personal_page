import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Small monospace eyebrow above the title. */
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Optional "see all" affordance on the right. */
  action?: { href: string; label: string };
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-8 sm:mb-10", className)}>
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          {eyebrow ? <p className="label-mono mb-2.5">{eyebrow}</p> : null}
          <Tag
            className={cn(
              "font-semibold tracking-tight text-foreground",
              Tag === "h1" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-[1.75rem]",
            )}
          >
            {title}
          </Tag>
        </div>

        {action ? (
          <Link
            href={action.href}
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-medium text-secondary transition-colors hover:text-accent"
          >
            {action.label}
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        ) : null}
      </div>

      {description ? (
        <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-secondary">
          {description}
        </p>
      ) : null}
    </div>
  );
}
