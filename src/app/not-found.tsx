import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container size="narrow" className="py-24 text-center sm:py-32">
      <p className="label-mono">Error 404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        This page does not exist
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-secondary">
        The link may be out of date, or the page may have moved. The sections below are a
        good place to pick things back up.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          Back home
        </ButtonLink>
        <ButtonLink href="/projects">Projects</ButtonLink>
        <ButtonLink href="/writing">Writing</ButtonLink>
      </div>
    </Container>
  );
}
