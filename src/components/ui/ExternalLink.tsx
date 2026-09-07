import { ArrowUpRight } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /** Show the small outbound arrow. Defaults to true. */
  showIcon?: boolean;
}

/**
 * Anchor for links that leave the site. Always uses rel="noopener noreferrer"
 * and announces the new-tab behaviour to screen readers.
 */
export function ExternalLink({
  href,
  children,
  showIcon = true,
  className,
  ...props
}: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("group inline-flex items-baseline gap-0.5", className)}
      {...props}
    >
      {children}
      {showIcon ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 shrink-0 self-center opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        />
      ) : null}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
