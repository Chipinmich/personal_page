import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Small return affordance at the top of every detail page. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 font-mono text-[0.6875rem] tracking-[0.14em] text-muted uppercase transition-colors duration-200 hover:text-accent"
    >
      <ArrowLeft
        aria-hidden="true"
        className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      {label}
    </Link>
  );
}
