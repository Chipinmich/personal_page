import "server-only";

import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/**
 * Returns the given public path only if the file actually exists on disk.
 *
 * Frontmatter often points at an image before the image has been added. Rather
 * than shipping a broken <Image>, callers fall back to a generated visual.
 */
export function resolvePublicAsset(src: string | undefined): string | undefined {
  if (!src) return undefined;

  // Remote images are passed through untouched; Next handles them via
  // next.config.ts remotePatterns.
  if (/^https?:\/\//i.test(src)) return src;

  const normalised = src.startsWith("/") ? src : `/${src}`;
  const onDisk = path.join(PUBLIC_DIR, normalised.replace(/^\//, "").split("/").join(path.sep));

  // Guard against frontmatter escaping the public directory.
  if (!onDisk.startsWith(PUBLIC_DIR)) return undefined;

  return fs.existsSync(onDisk) ? normalised : undefined;
}

/** True when the resume PDF has been added to /public/resume. */
export function hasResume(resumePath: string): boolean {
  return resolvePublicAsset(resumePath) !== undefined;
}
