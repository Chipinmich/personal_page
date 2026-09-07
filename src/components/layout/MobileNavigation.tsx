"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SocialLinks } from "@/components/ui/SocialLinks";
import { isActivePath, navItems } from "@/lib/nav";
import { cn } from "@/lib/utils";

/**
 * Full-width menu panel for small screens. Closes on route change and on
 * Escape, locks background scrolling, and returns focus to the trigger.
 */
export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-lg border border-transparent",
          "text-secondary transition-colors duration-200 hover:border-border hover:bg-surface hover:text-foreground",
        )}
      >
        {open ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          className={cn(
            "fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto",
            "border-t border-border bg-background/98 backdrop-blur-xl",
          )}
        >
          <nav aria-label="Primary" className="px-5 py-6 sm:px-6">
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-14 flex-col justify-center rounded-xl border px-4 py-3 transition-colors duration-200",
                        active
                          ? "border-accent/35 bg-accent/8"
                          : "border-transparent hover:border-border hover:bg-surface",
                      )}
                    >
                      <span
                        className={cn(
                          "text-base font-medium",
                          active ? "text-accent" : "text-foreground",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="mt-0.5 text-[0.8125rem] text-muted">
                        {item.description}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <p className="label-mono mb-3">Elsewhere</p>
              <SocialLinks variant="labelled" ariaLabel="Social links in menu" />
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
