import type { Metadata } from "next";

import { absoluteUrl, siteConfig } from "@/lib/site";

export interface PageMetadataInput {
  title: string;
  description: string;
  /** Route path, e.g. "/projects/f-zero-ai". Used for the canonical URL. */
  path: string;
  /** Publication date for article-style pages. */
  publishedTime?: string;
  tags?: string[];
  /** Site-relative image path; falls back to the generated OG image. */
  image?: string;
  type?: "website" | "article";
}

/**
 * Builds consistent metadata for every page: canonical URL, Open Graph and
 * Twitter cards, all derived from one place so pages stay declarative.
 */
export function buildMetadata({
  title,
  description,
  path,
  publishedTime,
  tags,
  image,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  // When a page has no image of its own, the generated app/opengraph-image is
  // applied automatically by Next, so `images` is left out entirely here.
  const ogImage = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(ogImage ? { images: [{ url: ogImage, alt: title }] } : {}),
      ...(type === "article"
        ? { publishedTime, authors: [siteConfig.name], tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
      ...(siteConfig.social.twitter
        ? { creator: twitterHandle(siteConfig.social.twitter) }
        : {}),
    },
  };
}

/** Extracts "@handle" from a full X/Twitter profile URL. */
export function twitterHandle(url: string): string | undefined {
  const match = url.match(/(?:twitter\.com|x\.com)\/([^/?#]+)/i);
  return match ? `@${match[1]}` : undefined;
}
