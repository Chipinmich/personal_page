import { Brand } from "@/components/layout/Monogram";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4">
          <Brand />

          <div className="flex items-center gap-1 sm:gap-2">
            <Navigation />

            <div aria-hidden="true" className="hidden h-5 w-px bg-border lg:block" />

            <SocialLinks
              size="sm"
              className="hidden sm:flex"
              ariaLabel="Social links in header"
            />

            <ThemeToggle />
            <MobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  );
}
