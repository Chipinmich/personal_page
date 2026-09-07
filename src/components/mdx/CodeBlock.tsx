"use client";

import { Check, Copy } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type PreProps = ComponentPropsWithoutRef<"pre"> & {
  "data-language"?: string;
};

/**
 * Replaces <pre> inside MDX. Shiki has already produced the highlighted markup
 * on the server, so this only adds the chrome: a language label and a copy
 * button that reads the rendered text back out of the DOM.
 */
export function CodeBlock({ className, children, ...props }: PreProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const language = props["data-language"];
  const showLanguage = Boolean(language) && language !== "plaintext";

  const copy = useCallback(async () => {
    const text = preRef.current?.innerText ?? "";
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be blocked; failing quietly is better than
      // throwing inside an article.
    }
  }, []);

  return (
    <div className="not-prose my-6 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface">
      <div className="flex h-10 items-center justify-between border-b border-border px-3">
        <span className="label-mono">{showLanguage ? language : "code"}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Code copied" : "Copy code to clipboard"}
          className={cn(
            "inline-flex size-7 items-center justify-center rounded-md border border-transparent",
            "text-muted transition-colors duration-200",
            "hover:border-border hover:bg-card hover:text-foreground",
          )}
        >
          {copied ? (
            <Check aria-hidden="true" className="size-3.5 text-mint" />
          ) : (
            <Copy aria-hidden="true" className="size-3.5" />
          )}
        </button>
      </div>

      <pre ref={preRef} className={cn("py-3.5", className)} {...props}>
        {children}
      </pre>
    </div>
  );
}
