import { FaGithub } from "react-icons/fa6";

import { ButtonAnchor } from "@/components/ui/Button";

interface GitHubLinkProps {
  /** Repository URL. The component renders nothing when this is empty. */
  href?: string;
  label?: string;
  size?: "sm" | "md";
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

/**
 * Repository button that only appears once a `github` value exists in
 * frontmatter, so unpublished projects never show a dead link.
 */
export function GitHubLink({
  href,
  label = "View code",
  size = "sm",
  variant = "secondary",
  className,
}: GitHubLinkProps) {
  if (!href) return null;

  return (
    <ButtonAnchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
    >
      <FaGithub aria-hidden="true" className="size-4" />
      {label}
      <span className="sr-only"> on GitHub (opens in a new tab)</span>
    </ButtonAnchor>
  );
}
