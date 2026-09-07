import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium " +
  "transition-[color,background-color,border-color,transform,box-shadow] duration-200 " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border border-accent/40 bg-accent/12 text-accent hover:bg-accent/20 hover:border-accent/60 " +
    "shadow-[0_0_0_1px_transparent] hover:shadow-[0_6px_24px_-12px_var(--accent)]",
  secondary:
    "border border-border bg-card text-foreground hover:border-border-strong hover:bg-surface",
  ghost: "text-secondary hover:text-foreground hover:bg-surface",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-[0.8125rem]",
  md: "h-11 px-4 text-sm",
};

export function buttonClass(variant: Variant = "secondary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

/** Internal navigation styled as a button. */
export function ButtonLink({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClass(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

interface ButtonAnchorProps extends ComponentProps<"a"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

/** Outbound link styled as a button. Callers pass target/rel explicitly. */
export function ButtonAnchor({
  variant = "secondary",
  size = "md",
  className,
  children,
  ...props
}: ButtonAnchorProps) {
  return (
    <a className={buttonClass(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
