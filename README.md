# Charles Walsworth — Personal Site

A personal site and long-term technical record: projects, lab experiments,
writing, reading notes, and a Now page.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and
**MDX**. Every page is statically generated at build time. There is no database,
no CMS, and no authentication — content lives in Markdown files in this
repository, and deploying is a `git push`.

---

## Table of contents

- [Quick start](#quick-start)
- [Scripts](#scripts)
- [How content works](#how-content-works)
- [Adding a Project](#adding-a-project)
- [Adding a Lab experiment](#adding-a-lab-experiment)
- [Adding a Writing post](#adding-a-writing-post)
- [Adding a Reading item](#adding-a-reading-item)
- [Changing Reading status](#changing-reading-status)
- [Updating the Now page](#updating-the-now-page)
- [Adding images](#adding-images)
- [Adding the resume PDF](#adding-the-resume-pdf)
- [Site configuration](#site-configuration)
- [Social links](#social-links)
- [Colours and theme](#colours-and-theme)
- [MDX features](#mdx-features)
- [Project structure](#project-structure)
- [Deploying to Vercel](#deploying-to-vercel)
- [Things to replace](#things-to-replace)

---

## Quick start

Requires **Node.js 20.9+** (this project was built and verified on Node 24).

```bash
npm install
```

```bash
npm run dev
```

The site runs at <http://localhost:3000>. Content changes are picked up on save.

---

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (statically generates every page) |
| `npm run start` | Serve the production build locally |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

Run `npm run lint && npm run typecheck && npm run build` before pushing anything
you care about.

---

## How content works

All content lives in `/content` as MDX files:

```
content/
├── projects/     → /projects and /projects/[slug]
├── lab/          → /lab and /lab/[slug]
├── writing/      → /writing and /writing/[slug]
├── reading/      → /reading and /reading/[slug] (only entries with notes)
├── now.mdx       → /now
└── about.mdx     → /about
```

Files are **discovered automatically**. There is no index, array, or registry to
update. The workflow for any new content is always the same:

1. Create an MDX file in the right folder.
2. Add the frontmatter.
3. Write the body.
4. Commit.
5. Push to GitHub.
6. Vercel builds and deploys.

The filename becomes the URL slug. `content/writing/my-post.mdx` becomes
`/writing/my-post`. Add a `slug:` field to the frontmatter to override that.

**Required fields are validated at build time.** If a required field is missing,
`npm run build` fails with the filename and the missing field rather than
shipping a broken page.

Set `draft: true` on any entry to keep it visible in `npm run dev` but hidden
from production builds.

---

## Adding a Project

Create `content/projects/my-project.mdx`:

```mdx
---
title: "Training an AI to Race in F-Zero"
description: "Experimenting with machine learning and genetic algorithms to train an AI agent to complete a race in F-Zero."
date: "2026-09-06"
github: "https://github.com/username/repo"
demo: ""
image: "/images/projects/f-zero-ai.svg"
technologies:
  - Python
  - Machine Learning
  - Genetic Algorithms
featured: true
featuredOrder: 1
status: "In Progress"
---

## The Goal

Write the project here.
```

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `description` | yes | Used on cards, in search results and social previews |
| `date` | yes | `YYYY-MM-DD`. Sorts the list newest first |
| `github` | no | The repository button only appears when this has a value |
| `demo` | no | The live demo button only appears when this has a value |
| `image` | no | Falls back to generated artwork if missing |
| `technologies` | no | Rendered as monospace badges |
| `featured` | no | `true` puts it on the homepage |
| `featuredOrder` | no | Lower numbers come first among featured projects. `1` is the large lead card |
| `status` | no | Free text, e.g. `In Progress`, `Planned`, `Completed` |
| `sample` | no | `true` labels the entry as demo content |
| `draft` | no | `true` hides it in production |

---

## Adding a Lab experiment

Lab is for smaller, rougher work — a weekend build, a test, a thing you wanted to
find out. Create `content/lab/my-experiment.mdx`:

```mdx
---
title: "Testing Object Detection on a Raspberry Pi"
description: "Experimenting with real-time object detection on inexpensive hardware."
date: "2026-09-01"
github: ""
image: ""
technologies:
  - Python
  - OpenCV
  - Raspberry Pi
status: "Experiment"
---

## The question

What am I trying to find out?
```

`title`, `description` and `date` are required. `status` defaults to
`Experiment` if omitted.

---

## Adding a Writing post

Create `content/writing/my-post.mdx`:

```mdx
---
title: "What I Learned Building My First Computer Vision Model"
description: "Lessons from training and debugging my first image classifier."
date: "2026-09-06"
github: ""
tags:
  - machine-learning
  - python
  - computer-vision
---

Write the post here.
```

`title`, `description` and `date` are required. Posts sort newest first, reading
time is calculated automatically, and every post is added to `/rss.xml` and the
sitemap on the next build.

Tags are collected into a tag index (`getWritingTags()` in
`src/lib/content.ts`) and shown on the Writing page. The data model already
supports per-tag archive pages if you want to add `/writing/tags/[tag]` later —
`getWritingPostsByTag()` is there for it.

---

## Adding a Reading item

Create `content/reading/my-book.mdx`:

```mdx
---
title: "Attention Is All You Need"
authors:
  - "Ashish Vaswani"
type: "Research Paper"
status: "Reading"
started: "2026-09-01"
completed: ""
url: "https://arxiv.org/abs/1706.03762"
image: ""
tags:
  - transformers
  - machine-learning
featured: true
---

## Key takeaways

Notes are optional.
```

`title`, `type` and `status` are required.

`type` is free text — `Book`, `Research Paper`, `Article`, `Documentation`,
`Course`, or anything else.

**Notes are optional.** An entry with only frontmatter appears in the list but
has no detail page. As soon as you write a body, the card gains a "Notes" link
and `/reading/[slug]` is generated for it. Nothing else needs changing.

---

## Changing Reading status

Edit the `status` field. It must be exactly one of:

- `"Want to Read"`
- `"Reading"`
- `"Completed"`

Anything else fails the build with a clear message, which is deliberate — a typo
should not silently drop an entry out of the filters.

Entries with `status: "Reading"` appear in the **Currently reading** section on
the homepage automatically. When you finish something, change the status to
`Completed` and fill in `completed:` with the date.

---

## Updating the Now page

Edit `content/now.mdx`. The page is intentionally plain — headings and lists.

```mdx
---
title: "What I'm Doing Now"
description: "A snapshot of what I'm learning, building, exploring and reading."
updated: "2026-09-06"
---

## Currently Learning

- Something

## Currently Building

- Something else

## Currently Exploring

- A topic
- Another topic
```

Bump `updated:` when you change it; the date shows on the page.

The **Currently exploring** callout near the bottom of the homepage reads the
list items straight out of the `## Currently Exploring` section of this file, so
there is only ever one copy of that list. Renaming that heading removes the
homepage callout.

---

## Adding images

Drop files into:

```
public/images/projects/
public/images/lab/
public/images/reading/
```

Then reference them from frontmatter with a path from the site root:

```yaml
image: "/images/projects/my-project.png"
```

**A missing image never breaks the page.** The path is checked against disk at
build time; if the file is not there, the card and detail page fall back to
generated abstract artwork seeded from the slug, so the layout is unaffected.
The same applies to images used inside MDX bodies, which render a quiet
placeholder instead of a broken image.

PNG, JPG, WebP, AVIF and SVG all work. Everything goes through `next/image`.

---

## Adding the resume PDF

Put the file at:

```
public/resume/charles-walsworth-resume.pdf
```

The `/resume` page checks for it at build time. If it exists, the page shows
**View resume**, **Download PDF** and an inline preview. If it does not, the page
shows a clean "Resume coming soon" message instead — it never 404s or shows a
dead link.

To use a different filename, change `resumePath` in `src/lib/site.ts`.

---

## Site configuration

Everything identifying the site lives in **`src/lib/site.ts`**. Nothing is
hardcoded in components.

```ts
export const siteConfig = {
  name: "Charles Walsworth",
  monogram: "CW",
  description: "...",
  tagline: "Computer Science Student",
  focus: "AI · Machine Learning · Robotics · Software Engineering",
  url: "...",
  school: "University of Michigan",
  location: "Ann Arbor, Michigan",
  githubUsername: "",
  resumePath: "/resume/charles-walsworth-resume.pdf",
  social: { github: "", linkedin: "", twitter: "", snapchat: "", email: "" },
};
```

### Site URL

`url` drives canonical links, Open Graph tags, the sitemap and RSS.

- On Vercel it resolves automatically from the deployment domain.
- To pin it to a custom domain, set an environment variable:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Locally, copy `.env.example` to `.env.local` if you want to override it.

### Navigation

Edit `src/lib/nav.ts` to add, remove or reorder navigation items. The header,
mobile menu, footer and sitemap all read from that one array.

---

## Social links

Fill in the URLs you want in `siteConfig.social`:

```ts
social: {
  github: "https://github.com/your-username",
  linkedin: "https://www.linkedin.com/in/your-profile",
  twitter: "https://x.com/your-handle",
  snapchat: "https://www.snapchat.com/add/your-username",
  email: "you@example.com",
}
```

- `email` is a plain address, not a `mailto:` URL — the link is built for you.
- **Any value left as `""` is hidden everywhere** — header, footer, hero, About
  page, Resume page. There is nothing else to comment out.
- Icons come from `react-icons/fa6`. All links get accessible labels, hover and
  focus states, and outbound links open in a new tab with
  `rel="noopener noreferrer"`.

If `social.twitter` is set, the handle is also extracted for the Twitter card
metadata.

---

## Colours and theme

Design tokens are CSS custom properties at the top of
**`src/app/globals.css`** — one block for light, one for dark:

```css
.dark {
  --bg: #080a0f;
  --surface: #0d1119;
  --card: #111722;
  --fg: #d8dce7;
  --fg-secondary: #9aa3b5;
  --fg-muted: #768093;
  --border: #273142;
  --accent: #7c8cff;
  --accent-alt: #8b7cff;
  --accent-soft: #68a7ff;
  --mint: #78e6c8;
}
```

These map into Tailwind through `@theme inline`, so `bg-background`,
`text-secondary`, `border-border` and `text-accent` follow the active theme with
no per-component logic. Change a hex value and the whole site follows, including
the generated cover artwork and the hero visual, which are drawn from the same
variables.

> **Note:** `--fg-muted` is slightly lighter in dark mode and slightly darker in
> light mode than the originally specified `#697386`. That value fell below the
> 4.5:1 WCAG AA contrast threshold against the card surface. The current values
> clear it on every background while keeping the same hue.

Dark is the primary experience. The theme follows the operating-system
preference by default and can be overridden with the header toggle
(`next-themes`, no flash on load).

---

## MDX features

Available in every content file:

- GitHub-flavoured Markdown — tables, task lists, strikethrough, autolinks
  (`remark-gfm`)
- Automatic heading IDs and hover anchor links (`rehype-slug`,
  `rehype-autolink-headings`)
- Syntax highlighting via Shiki (`rehype-pretty-code`), rendered at build time
  with **both** light and dark palettes so code recolours instantly with the
  theme — no client-side highlighter ships to the browser
- Code blocks with a language label and a copy button
- Responsive images through `next/image`, with a graceful placeholder when the
  file is missing
- Internal links use the router; external links open in a new tab with a screen
  reader announcement
- A `<Note>` callout component:

````mdx
<Note>
Useful for caveats, attribution, and asides.
</Note>

```python
def fitness(run):
    return run.progress
```
````

To add your own MDX component, export it from
`src/components/mdx/components.tsx` and add it to the `mdxComponents` map.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx            Root layout, metadata defaults, theme provider
│   ├── page.tsx              Homepage
│   ├── projects/             List + [slug]
│   ├── lab/                  List + [slug]
│   ├── writing/              List + [slug]
│   ├── reading/              List + [slug]
│   ├── now/  about/  resume/
│   ├── opengraph-image.tsx   Generated social card
│   ├── rss.xml/route.ts      RSS feed
│   ├── sitemap.ts  robots.ts
│   ├── not-found.tsx
│   └── globals.css           Design tokens and long-form styles
├── components/
│   ├── layout/               Header, Navigation, MobileNavigation, Footer,
│   │                         ThemeToggle, ThemeProvider, PageHeader, BackLink
│   ├── home/                 Hero, HeroVisual, FeaturedProject, HomeSection,
│   │                         CurrentlyExploring
│   ├── cards/                ProjectCard, LabCard, WritingCard, ReadingCard
│   ├── mdx/                  MDXContent, components map, CodeBlock
│   ├── reading/              ReadingFilter
│   └── ui/                   Container, SectionHeading, TechBadge, StatusBadge,
│                             GitHubLink, ExternalLink, Button, SocialLinks,
│                             CoverImage, AbstractCover, EmptyState, SampleNotice
└── lib/
    ├── site.ts               Single source of truth for site identity
    ├── nav.ts                Navigation items
    ├── content.ts            Content discovery, parsing, validation, sorting
    ├── mdx.ts                MDX compilation pipeline
    ├── metadata.ts           Per-page metadata builder
    ├── assets.ts             Build-time file existence checks
    ├── types.ts              Frontmatter types
    └── utils.ts              Dates, slugs, reading time, class names
```

---

## Deploying to Vercel

No database, no external services, nothing to provision.

1. Push this repository to GitHub.

   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. Go to <https://vercel.com/new> and import the repository.

3. Accept the defaults. Vercel detects Next.js, runs `npm install` and
   `npm run build`, and serves the output. No environment variables are
   required.

4. Optional: set `NEXT_PUBLIC_SITE_URL` to your custom domain so canonical URLs,
   Open Graph tags, the sitemap and RSS use it.

From then on, every push to `main` triggers a production deployment, and every
pull request gets a preview URL. Publishing a post is: add an MDX file, commit,
push.

---

## Things to replace

Before this goes anywhere public:

- **`src/lib/site.ts`** — fill in `social.github`, `social.linkedin`,
  `social.twitter`, `social.snapchat` and `social.email`. Confirm `school` and
  `location`.
- **`content/about.mdx`** — placeholder biography.
- **`content/now.mdx`** — placeholder Now page.
- **Sample content** — every seeded entry is marked `sample: true` and labelled
  in the UI. Delete or replace:
  - all three files in `content/lab/`
  - all three files in `content/writing/`
  - all five files in `content/reading/`
- **`content/projects/f-zero-ai.mdx`** — real, but the How It Works and Training
  Progress sections are deliberately empty placeholders. Add the `github` URL
  when the repository is public.
- **`public/resume/charles-walsworth-resume.pdf`** — not present yet.
- **`public/images/projects/f-zero-ai.svg`** — original abstract artwork. Fine to
  keep, or replace with your own visualisation. Do not replace it with game
  screenshots.
- **`src/app/favicon.ico`** — still the Next.js default.
