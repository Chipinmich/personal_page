"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

/** The answer never changes after hydration, so there is nothing to subscribe to. */
const subscribeNever = () => () => {};

/**
 * Small icon toggle. Until the theme is known on the client it renders an inert
 * placeholder of the same size, which keeps the header from shifting.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  // Server and first client render both see false, so the markup matches; the
  // real value arrives on hydration.
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  const shared = cn(
    "inline-flex size-9 items-center justify-center rounded-lg border border-transparent",
    "text-muted transition-colors duration-200 hover:border-border hover:bg-surface hover:text-foreground",
    className,
  );

  if (!mounted) {
    return <div aria-hidden="true" className={shared} />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={shared}
    >
      {isDark ? (
        <Sun aria-hidden="true" className="size-[1.125rem]" />
      ) : (
        <Moon aria-hidden="true" className="size-[1.125rem]" />
      )}
    </button>
  );
}
