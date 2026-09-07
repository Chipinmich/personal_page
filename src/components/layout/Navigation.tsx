"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { isActivePath, navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

/** Desktop navigation. Hidden below the lg breakpoint. */
export function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-0.5">
        {navItems
          .filter((item) => item.href !== "/")
          .map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative inline-flex h-9 items-center rounded-lg px-3 text-sm transition-colors duration-200",
                    active
                      ? "text-foreground"
                      : "text-secondary hover:text-foreground hover:bg-surface",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                    />
                  ) : null}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
