import "server-only";

import { pathToFileURL } from "node:url";
import type { ComponentType } from "react";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { PluggableList } from "unified";

/**
 * Shiki renders both themes at once. Each token carries `--shiki-light` and
 * `--shiki-dark` CSS variables, and globals.css picks the right one from the
 * active `.dark` class, so code blocks switch instantly with no re-render.
 */
const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "plaintext",
};

const remarkPlugins: PluggableList = [remarkGfm];

const rehypePlugins: PluggableList = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: "append",
      properties: {
        className: ["heading-anchor"],
        "aria-hidden": "true",
        tabIndex: -1,
      },
      content: { type: "text", value: "#" },
    },
  ],
  [rehypePrettyCode, prettyCodeOptions],
];

export type MDXComponentMap = Record<string, ComponentType<Record<string, unknown>>>;

export interface CompiledMDX {
  Content: ComponentType<{ components?: MDXComponentMap }>;
}

/**
 * Compile an MDX string into a React component at build time.
 *
 * Every page that uses this is statically generated, so the compile cost is
 * paid once during `next build` and never at request time.
 */
export async function compileMdx(source: string): Promise<CompiledMDX> {
  const compiled = await evaluate(source, {
    ...runtime,
    baseUrl: pathToFileURL(process.cwd()).href,
    development: false,
    remarkPlugins,
    rehypePlugins,
  });

  return { Content: compiled.default as CompiledMDX["Content"] };
}
