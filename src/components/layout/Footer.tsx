import Link from "next/link";

import { Monogram } from "@/components/layout/Monogram";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { navItems } from "@/lib/nav";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <Container size="wide">
        <div className="flex flex-col gap-10 py-12 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <Monogram />
              <span className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                {siteConfig.name}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[0.8125rem] leading-relaxed text-muted">
              Curiosity compounds.
            </p>
            <SocialLinks
              size="sm"
              className="mt-4 -ml-2"
              ariaLabel="Social links in footer"
            />
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 sm:grid-cols-4 lg:grid-cols-2 lg:gap-x-14">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.8125rem] text-secondary transition-colors duration-200 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] tracking-wide text-muted">
            &copy; {year} {siteConfig.name}
          </p>
          <p className="font-mono text-[0.6875rem] tracking-wide text-muted">
            Built with Next.js &middot; Deployed on Vercel
          </p>
        </div>
      </Container>
    </footer>
  );
}
