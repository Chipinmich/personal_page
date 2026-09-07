import { getWritingPosts } from "@/lib/content";
import { absoluteUrl, siteConfig } from "@/lib/site";

// Written once at build time and served as a static file.
export const dynamic = "force-static";

/** Minimal XML escaping for text that ends up inside elements. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(date: string): string {
  const parsed = new Date(date.length === 10 ? `${date}T00:00:00Z` : date);
  return Number.isNaN(parsed.getTime())
    ? new Date().toUTCString()
    : parsed.toUTCString();
}

export function GET(): Response {
  const posts = getWritingPosts();
  const feedUrl = absoluteUrl("/rss.xml");

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/writing/${post.slug}`);
      const categories = post.frontmatter.tags
        .map((tag) => `      <category>${escapeXml(tag)}</category>`)
        .join("\n");

      return [
        "    <item>",
        `      <title>${escapeXml(post.frontmatter.title)}</title>`,
        `      <link>${link}</link>`,
        `      <guid isPermaLink="true">${link}</guid>`,
        `      <pubDate>${toRfc822(post.frontmatter.date)}</pubDate>`,
        `      <description>${escapeXml(post.frontmatter.description)}</description>`,
        categories,
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escapeXml(siteConfig.name)} — Writing</title>`,
    `    <link>${absoluteUrl("/writing")}</link>`,
    `    <description>${escapeXml(siteConfig.description)}</description>`,
    "    <language>en-us</language>",
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    `    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
    items,
    "  </channel>",
    "</rss>",
  ]
    .filter(Boolean)
    .join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
