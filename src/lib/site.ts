/**
 * Central site configuration.
 *
 * Everything that identifies the site or its owner lives here so it can be
 * changed in one place. Nothing below should be duplicated in components.
 *
 * Any social URL left as an empty string is treated as "not configured" and
 * its icon/link is hidden everywhere in the UI.
 */
export const siteConfig = {
  name: "Charles Walsworth",
  monogram: "CW",
  title: "Charles Walsworth",
  description:
    "Computer science student exploring AI, machine learning, robotics, and software engineering. Projects, experiments, writing, and reading notes.",
  tagline: "Computer Science Student",
  focus: "AI · Machine Learning · Robotics · Software Engineering",
  // Used for canonical URLs, Open Graph, sitemap and RSS.
  // On Vercel this is picked up automatically from the deployment URL when
  // NEXT_PUBLIC_SITE_URL is not set.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "en_US",

  school: "University of Michigan",
  location: "Ann Arbor, Michigan",

  githubUsername: "",
  resumePath: "/resume/charles-walsworth-resume.pdf",

  /**
   * Leave a value as "" to hide that social link across the whole site.
   * `email` should be a plain address; it is turned into a mailto: link.
   */
  social: {
    github: "",
    linkedin: "",
    twitter: "",
    snapchat: "",
    email: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL helper for metadata, sitemap and RSS. */
export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, siteConfig.url).toString();
}
