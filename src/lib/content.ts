import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type {
  CollectionName,
  Entry,
  LabEntry,
  LabFrontmatter,
  ProjectEntry,
  ProjectFrontmatter,
  ReadingEntry,
  ReadingFrontmatter,
  ReadingStatus,
  WritingEntry,
  WritingFrontmatter,
} from "@/lib/types";
import { READING_STATUSES } from "@/lib/types";
import { estimateReadingTime, slugify } from "@/lib/utils";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/* ------------------------------------------------------------------ *
 * Low-level file discovery
 * ------------------------------------------------------------------ */

function collectionDir(collection: CollectionName): string {
  return path.join(CONTENT_ROOT, collection);
}

/** All .mdx/.md files in a collection. A missing directory yields []. */
function listFiles(collection: CollectionName): string[] {
  const dir = collectionDir(collection);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((item) => item.isFile() && /\.mdx?$/.test(item.name))
    .map((item) => path.join(dir, item.name))
    .sort();
}

/**
 * Fail the build loudly when frontmatter is missing something a page needs.
 * A typo in an MDX file should be a build error, not a blank page.
 */
function requireFields(
  data: Record<string, unknown>,
  fields: string[],
  source: string,
): void {
  const missing = fields.filter((field) => {
    const value = data[field];
    if (value === undefined || value === null) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0;
    return false;
  });

  if (missing.length > 0) {
    throw new Error(
      `Invalid frontmatter in ${source}: missing required field(s) ${missing.join(", ")}.`,
    );
  }
}

/** Coerce a frontmatter value into a string array. */
function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
  if (typeof value === "string" && value.trim() !== "") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function toOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed === "" ? undefined : trimmed;
}

/** gray-matter may parse dates into Date objects; normalise to ISO days. */
function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string") return value.trim();
  if (typeof value === "number") return String(value);
  return "";
}

function readEntry<T>(
  filePath: string,
  transform: (data: Record<string, unknown>, source: string) => T,
): Entry<T> {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const source = path.relative(process.cwd(), filePath).replace(/\\/g, "/");

  const fileSlug = path.basename(filePath).replace(/\.mdx?$/, "");
  const explicitSlug = toOptionalString(data.slug);
  const slug = slugify(explicitSlug ?? fileSlug) || slugify(String(data.title ?? "entry"));

  const body = content.trim();

  return {
    slug,
    frontmatter: transform(data, source),
    body,
    readingTime: estimateReadingTime(body),
    hasBody: body.length > 0,
  };
}

/** Drafts stay hidden in production but render while running `next dev`. */
function isVisible(frontmatter: { draft?: boolean }): boolean {
  return process.env.NODE_ENV === "development" || frontmatter.draft !== true;
}

/** Newest first; entries without a date sort last. */
function byDateDesc(
  a: { frontmatter: { date?: string } },
  b: { frontmatter: { date?: string } },
): number {
  const left = a.frontmatter.date ?? "";
  const right = b.frontmatter.date ?? "";
  if (left === right) return 0;
  if (!left) return 1;
  if (!right) return -1;
  return left < right ? 1 : -1;
}

/* ------------------------------------------------------------------ *
 * Projects
 * ------------------------------------------------------------------ */

function toProject(data: Record<string, unknown>, source: string): ProjectFrontmatter {
  requireFields(data, ["title", "description", "date"], source);
  return {
    title: String(data.title),
    description: String(data.description),
    date: toDateString(data.date),
    github: toOptionalString(data.github),
    demo: toOptionalString(data.demo),
    image: toOptionalString(data.image),
    technologies: toStringArray(data.technologies),
    featured: data.featured === true,
    featuredOrder:
      typeof data.featuredOrder === "number" ? data.featuredOrder : Number.MAX_SAFE_INTEGER,
    status: toOptionalString(data.status),
    sample: data.sample === true,
    draft: data.draft === true,
  };
}

export function getProjects(): ProjectEntry[] {
  return listFiles("projects")
    .map((file) => readEntry(file, toProject))
    .filter((entry) => isVisible(entry.frontmatter))
    .sort(byDateDesc);
}

export function getProject(slug: string): ProjectEntry | undefined {
  return getProjects().find((entry) => entry.slug === slug);
}

/** Featured projects for the homepage, ordered by featuredOrder then date. */
export function getFeaturedProjects(): ProjectEntry[] {
  return getProjects()
    .filter((entry) => entry.frontmatter.featured)
    .sort((a, b) => {
      const order =
        (a.frontmatter.featuredOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.frontmatter.featuredOrder ?? Number.MAX_SAFE_INTEGER);
      return order !== 0 ? order : byDateDesc(a, b);
    });
}

/* ------------------------------------------------------------------ *
 * Lab
 * ------------------------------------------------------------------ */

function toLab(data: Record<string, unknown>, source: string): LabFrontmatter {
  requireFields(data, ["title", "description", "date"], source);
  return {
    title: String(data.title),
    description: String(data.description),
    date: toDateString(data.date),
    github: toOptionalString(data.github),
    demo: toOptionalString(data.demo),
    image: toOptionalString(data.image),
    technologies: toStringArray(data.technologies),
    status: toOptionalString(data.status) ?? "Experiment",
    sample: data.sample === true,
    draft: data.draft === true,
  };
}

export function getLabEntries(): LabEntry[] {
  return listFiles("lab")
    .map((file) => readEntry(file, toLab))
    .filter((entry) => isVisible(entry.frontmatter))
    .sort(byDateDesc);
}

export function getLabEntry(slug: string): LabEntry | undefined {
  return getLabEntries().find((entry) => entry.slug === slug);
}

/* ------------------------------------------------------------------ *
 * Writing
 * ------------------------------------------------------------------ */

function toWriting(data: Record<string, unknown>, source: string): WritingFrontmatter {
  requireFields(data, ["title", "description", "date"], source);
  return {
    title: String(data.title),
    description: String(data.description),
    date: toDateString(data.date),
    github: toOptionalString(data.github),
    image: toOptionalString(data.image),
    tags: toStringArray(data.tags),
    sample: data.sample === true,
    draft: data.draft === true,
  };
}

export function getWritingPosts(): WritingEntry[] {
  return listFiles("writing")
    .map((file) => readEntry(file, toWriting))
    .filter((entry) => isVisible(entry.frontmatter))
    .sort(byDateDesc);
}

export function getWritingPost(slug: string): WritingEntry | undefined {
  return getWritingPosts().find((entry) => entry.slug === slug);
}

/**
 * Tag index for Writing. Already shaped so a /writing/tags/[tag] route can be
 * added later without touching the content layer.
 */
export function getWritingTags(): Array<{ tag: string; count: number }> {
  const counts = new Map<string, number>();
  for (const post of getWritingPosts()) {
    for (const tag of post.frontmatter.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getWritingPostsByTag(tag: string): WritingEntry[] {
  const needle = tag.toLowerCase();
  return getWritingPosts().filter((post) =>
    post.frontmatter.tags.some((item) => item.toLowerCase() === needle),
  );
}

/* ------------------------------------------------------------------ *
 * Reading
 * ------------------------------------------------------------------ */

function toReadingStatus(value: unknown, source: string): ReadingStatus {
  const raw = typeof value === "string" ? value.trim() : "";
  const match = READING_STATUSES.find(
    (status) => status.toLowerCase() === raw.toLowerCase(),
  );
  if (!match) {
    throw new Error(
      `Invalid frontmatter in ${source}: status must be one of ${READING_STATUSES.join(", ")} (received ${JSON.stringify(raw)}).`,
    );
  }
  return match;
}

function toReading(data: Record<string, unknown>, source: string): ReadingFrontmatter {
  requireFields(data, ["title", "type", "status"], source);
  return {
    title: String(data.title),
    authors: toStringArray(data.authors),
    type: String(data.type),
    status: toReadingStatus(data.status, source),
    started: toOptionalString(toDateString(data.started)),
    completed: toOptionalString(toDateString(data.completed)),
    url: toOptionalString(data.url),
    image: toOptionalString(data.image),
    tags: toStringArray(data.tags),
    featured: data.featured === true,
    sample: data.sample === true,
    draft: data.draft === true,
  };
}

const READING_STATUS_WEIGHT: Record<ReadingStatus, number> = {
  Reading: 0,
  Completed: 1,
  "Want to Read": 2,
};

export function getReadingEntries(): ReadingEntry[] {
  return listFiles("reading")
    .map((file) => readEntry(file, toReading))
    .filter((entry) => isVisible(entry.frontmatter))
    .sort((a, b) => {
      const weight =
        READING_STATUS_WEIGHT[a.frontmatter.status] -
        READING_STATUS_WEIGHT[b.frontmatter.status];
      if (weight !== 0) return weight;
      const left = a.frontmatter.completed ?? a.frontmatter.started ?? "";
      const right = b.frontmatter.completed ?? b.frontmatter.started ?? "";
      if (left === right) return a.frontmatter.title.localeCompare(b.frontmatter.title);
      if (!left) return 1;
      if (!right) return -1;
      return left < right ? 1 : -1;
    });
}

export function getReadingEntry(slug: string): ReadingEntry | undefined {
  return getReadingEntries().find((entry) => entry.slug === slug);
}

export function getReadingByStatus(status: ReadingStatus): ReadingEntry[] {
  return getReadingEntries().filter((entry) => entry.frontmatter.status === status);
}

/** Only Reading entries with real notes get their own detail page. */
export function getReadingEntriesWithNotes(): ReadingEntry[] {
  return getReadingEntries().filter((entry) => entry.hasBody);
}

/* ------------------------------------------------------------------ *
 * Now
 * ------------------------------------------------------------------ */

export interface NowSection {
  heading: string;
  slug: string;
  /** Raw MDX body of this section, without the heading itself. */
  body: string;
  /** Top-level list items, when the section is a simple list. */
  items: string[];
}

export interface SingletonPage {
  title: string;
  description: string;
  updated: string;
  body: string;
  sections: NowSection[];
}

/** Kept as an alias so the Now page reads naturally at call sites. */
export type NowPage = SingletonPage;

/**
 * Loads a single MDX file from /content (now.mdx, about.mdx) and splits it into
 * its `##` sections, so one section can be reused elsewhere without
 * duplicating the content.
 */
export function getSingletonPage(name: string): SingletonPage | undefined {
  const filePath = path.join(CONTENT_ROOT, `${name}.mdx`);
  if (!fs.existsSync(filePath)) return undefined;

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const body = content.trim();

  const sections: NowSection[] = [];
  const pattern = /^##\s+(.+)$/gm;
  const matches = [...body.matchAll(pattern)];

  matches.forEach((match, index) => {
    const heading = match[1].trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = index + 1 < matches.length ? (matches[index + 1].index ?? body.length) : body.length;
    const sectionBody = body.slice(start, end).trim();
    const items = sectionBody
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => /^[-*]\s+/.test(line))
      .map((line) => line.replace(/^[-*]\s+/, "").trim());

    sections.push({ heading, slug: slugify(heading), body: sectionBody, items });
  });

  return {
    title: toOptionalString(data.title) ?? name,
    description: toOptionalString(data.description) ?? "",
    updated: toDateString(data.updated),
    body,
    sections,
  };
}

export function getNow(): NowPage | undefined {
  return getSingletonPage("now");
}

export function getAbout(): SingletonPage | undefined {
  return getSingletonPage("about");
}

/** Find one Now section by heading, case-insensitively. */
export function getNowSection(heading: string): NowSection | undefined {
  const target = slugify(heading);
  return getNow()?.sections.find((section) => section.slug === target);
}
