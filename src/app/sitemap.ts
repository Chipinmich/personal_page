import type { MetadataRoute } from "next";

import {
  getLabEntries,
  getProjects,
  getReadingEntriesWithNotes,
  getWritingPosts,
} from "@/lib/content";
import { navItems } from "@/lib/nav";
import { absoluteUrl } from "@/lib/site";

/** Every static route plus every piece of content, discovered automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = navItems.map((item) => ({
    url: absoluteUrl(item.href),
    changeFrequency: item.href === "/" ? "weekly" : "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));

  const projects = getProjects().map((entry) => ({
    url: absoluteUrl(`/projects/${entry.slug}`),
    lastModified: entry.frontmatter.date || undefined,
    priority: 0.8,
  }));

  const lab = getLabEntries().map((entry) => ({
    url: absoluteUrl(`/lab/${entry.slug}`),
    lastModified: entry.frontmatter.date || undefined,
    priority: 0.6,
  }));

  const writing = getWritingPosts().map((entry) => ({
    url: absoluteUrl(`/writing/${entry.slug}`),
    lastModified: entry.frontmatter.date || undefined,
    priority: 0.8,
  }));

  const reading = getReadingEntriesWithNotes().map((entry) => ({
    url: absoluteUrl(`/reading/${entry.slug}`),
    lastModified: entry.frontmatter.completed || entry.frontmatter.started || undefined,
    priority: 0.5,
  }));

  return [...staticRoutes, ...projects, ...lab, ...writing, ...reading];
}
