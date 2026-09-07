/** Content collections stored under /content. */
export type CollectionName = "projects" | "lab" | "writing" | "reading";

export interface ProjectFrontmatter {
  title: string;
  description: string;
  date: string;
  github?: string;
  demo?: string;
  image?: string;
  technologies: string[];
  featured?: boolean;
  featuredOrder?: number;
  status?: string;
  /** Marks demo/sample content so the UI can label it honestly. */
  sample?: boolean;
  draft?: boolean;
}

export interface LabFrontmatter {
  title: string;
  description: string;
  date: string;
  github?: string;
  demo?: string;
  image?: string;
  technologies: string[];
  status?: string;
  sample?: boolean;
  draft?: boolean;
}

export interface WritingFrontmatter {
  title: string;
  description: string;
  date: string;
  github?: string;
  image?: string;
  tags: string[];
  sample?: boolean;
  draft?: boolean;
}

export const READING_STATUSES = ["Reading", "Completed", "Want to Read"] as const;
export type ReadingStatus = (typeof READING_STATUSES)[number];

export interface ReadingFrontmatter {
  title: string;
  authors: string[];
  /** e.g. Book, Research Paper, Article, Documentation, Course. */
  type: string;
  status: ReadingStatus;
  started?: string;
  completed?: string;
  url?: string;
  image?: string;
  tags: string[];
  featured?: boolean;
  sample?: boolean;
  draft?: boolean;
}

/** A parsed MDX file: frontmatter plus the raw body. */
export interface Entry<T> {
  slug: string;
  frontmatter: T;
  body: string;
  /** Estimated reading time in minutes (minimum 1). */
  readingTime: number;
  /** True when the body has prose beyond the frontmatter. */
  hasBody: boolean;
}

export type ProjectEntry = Entry<ProjectFrontmatter>;
export type LabEntry = Entry<LabFrontmatter>;
export type WritingEntry = Entry<WritingFrontmatter>;
export type ReadingEntry = Entry<ReadingFrontmatter>;
