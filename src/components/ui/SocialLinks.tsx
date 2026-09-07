import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaSnapchat, FaXTwitter } from "react-icons/fa6";
import type { ComponentType } from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

interface SocialLink {
  key: string;
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

/**
 * Builds the list of social links from siteConfig, skipping any entry left as
 * an empty string. Nothing is hardcoded at the call site.
 */
export function getSocialLinks(): SocialLink[] {
  const { social } = siteConfig;

  const candidates: SocialLink[] = [
    { key: "github", label: "GitHub", href: social.github, Icon: FaGithub },
    { key: "linkedin", label: "LinkedIn", href: social.linkedin, Icon: FaLinkedin },
    { key: "twitter", label: "X", href: social.twitter, Icon: FaXTwitter },
    { key: "snapchat", label: "Snapchat", href: social.snapchat, Icon: FaSnapchat },
    {
      key: "email",
      label: "Email",
      href: social.email ? `mailto:${social.email}` : "",
      Icon: Mail,
    },
  ];

  return candidates.filter((link) => link.href.trim() !== "");
}

interface SocialLinksProps {
  /** "icon" for compact icon buttons, "labelled" for icon + text rows. */
  variant?: "icon" | "labelled";
  size?: "sm" | "md";
  className?: string;
  /** Announced by screen readers, e.g. "Social links in footer". */
  ariaLabel?: string;
}

export function SocialLinks({
  variant = "icon",
  size = "md",
  className,
  ariaLabel = "Social links",
}: SocialLinksProps) {
  const links = getSocialLinks();
  if (links.length === 0) return null;

  const iconSize = size === "sm" ? "size-4" : "size-[1.125rem]";

  return (
    <nav aria-label={ariaLabel}>
      <ul className={cn("flex flex-wrap items-center", variant === "icon" ? "gap-1" : "gap-2", className)}>
        {links.map(({ key, label, href, Icon }) => {
          const isExternal = href.startsWith("http");
          return (
            <li key={key}>
              <a
                href={href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "group inline-flex items-center gap-2 rounded-lg text-muted",
                  "transition-colors duration-200 hover:text-accent",
                  variant === "icon"
                    ? cn("justify-center", size === "sm" ? "size-8" : "size-9", "hover:bg-surface")
                    : "px-2.5 py-2 text-sm font-medium hover:bg-surface",
                )}
              >
                <Icon aria-hidden={true} className={iconSize} />
                {variant === "labelled" ? <span>{label}</span> : null}
                <span className="sr-only">
                  {label}
                  {isExternal ? " (opens in a new tab)" : ""}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
