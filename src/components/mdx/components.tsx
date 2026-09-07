import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { CodeBlock } from "@/components/mdx/CodeBlock";
import { resolvePublicAsset } from "@/lib/assets";
import type { MDXComponentMap } from "@/lib/mdx";
import { cn } from "@/lib/utils";

/** Internal links use the router; outbound links open safely in a new tab. */
function MDXLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Images referenced from MDX. A path that does not exist in /public renders a
 * quiet caption instead of a broken image, so a draft never ships a 404.
 */
function MDXImage({
  src,
  alt = "",
  // Markdown never supplies usable intrinsic dimensions, and passing the raw
  // strings through would conflict with the sizes next/image needs.
  width: _width,
  height: _height,
  ...props
}: ComponentPropsWithoutRef<"img">) {
  const resolved = typeof src === "string" ? resolvePublicAsset(src) : undefined;

  if (!resolved) {
    return (
      <span className="my-6 block rounded-[var(--radius-card)] border border-dashed border-border bg-surface px-4 py-8 text-center font-mono text-xs text-muted">
        {alt || "Image not added yet"}
      </span>
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={1600}
      height={900}
      sizes="(min-width: 768px) 720px, 100vw"
      className="h-auto w-full rounded-[var(--radius-card)] border border-border"
      {...props}
    />
  );
}

/** Tables scroll horizontally rather than forcing the page to. */
function MDXTable({ className, ...props }: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 -mx-1 overflow-x-auto px-1">
      <table className={cn("w-full", className)} {...props} />
    </div>
  );
}

function MDXHr(props: ComponentPropsWithoutRef<"hr">) {
  return <hr className="my-10 border-0 rule-fade" {...props} />;
}

/**
 * Callout for asides, caveats and attribution notes. Available in any MDX file
 * as `<Note>...</Note>`.
 */
function Note({ children }: { children?: ReactNode }) {
  return (
    <aside className="not-prose my-6 flex gap-3 rounded-[var(--radius-card)] border border-border bg-surface px-4 py-3.5">
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />
      <div className="text-[0.875rem] leading-relaxed text-secondary [&>p+p]:mt-3">
        {children}
      </div>
    </aside>
  );
}

export const mdxComponents = {
  a: MDXLink,
  img: MDXImage,
  table: MDXTable,
  hr: MDXHr,
  pre: CodeBlock,
  Note,
} as unknown as MDXComponentMap;
