# CLAUDE.md — ChatQuill Blog

## Project overview

ChatQuill is a personal tech blog for Mohun Shakeel Ahmad, a software engineer based in Mauritius. It covers software engineering, data science, AI, and beginner-friendly tech topics. The design is dark-themed, minimal, and editorial in style.

**Stack:** Astro 4.16 · MDX · Tailwind CSS 3 · TypeScript

## Commands

```bash
npm run dev           # Dev server (localhost:4321)
npm run build         # Production build → dist/
npm run preview       # Preview the production build
npm run lint          # ESLint check
npm test              # Unit tests (Vitest)
npm run test:coverage # Unit tests + coverage report
npm run test:e2e      # Playwright E2E tests (auto-starts dev server)
```

## Before pushing

**MANDATORY — always run all three before any `git push`:**

```bash
npm run lint       # Must exit 0
npm test           # All 52 unit tests must pass
npm run test:e2e   # All 36 E2E tests must pass
```

The pre-push git hook (`.githooks/pre-push`) enforces this automatically, but run them manually first to catch failures early. Never skip or bypass the hook (`--no-verify`).

## Project structure

```
src/
├── components/       # Reusable Astro components
├── content/
│   ├── config.ts     # Content collection schema
│   └── blog/         # MDX articles (one file per post)
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro         # Homepage (article grid + sidebar)
│   ├── blog/[slug].astro   # Dynamic article page
│   └── contact.astro       # Author bio / contact
└── styles/
    └── global.css
```

## Content — writing and publishing articles

Articles live in `src/content/blog/` as `.mdx` files.

**Required frontmatter:**
```yaml
---
title: 'Article Title'
description: 'One-line description'
date: 'Month Day, Year'        # e.g. "May 25, 2026"
tags: ['AI']                   # enum: 'AI' | 'Tech' | 'Data Science' | 'Beginner'
readtime: '6 min read'
---
```

**Optional frontmatter:**
```yaml
featured: true                 # Pins to hero section; only one article at a time
coverImage: '/images/foo.png'  # Stored in public/images/
coverGradient: 'linear-gradient(...)'
coverGlow: 'rgba(...)'
```

**MDX components available in articles:**
- `<PullQuote cite="Author">text</PullQuote>` — styled block quote
- `<CodeBlock filename="app.rb" lang="ruby" code="..." />` — syntax-highlighted code
- `<InlineImg src="/images/x.png" caption="Caption" alt="alt text" />` — responsive image with caption

## Components

| File | Purpose |
|---|---|
| `Nav.astro` | Top navbar + collapsible sidebar toggle + mobile hamburger |
| `TopicsSidebar.astro` | Collapsible sidebar with tag filter buttons |
| `HeroSection.astro` | Large featured article card at the top of the homepage |
| `ArticleCard.astro` | Grid card for non-featured articles |
| `AuthorBio.astro` | Author block shown at the bottom of every article |
| `CodeBlock.astro` | Wraps code with filename chip and syntax highlighting |
| `PullQuote.astro` | Editorial pull-quote style block |
| `InlineImg.astro` | Image with optional caption |
| `Footer.astro` | Simple copyright footer |

## Routing

- `/` — homepage; accepts `?cat=<tag>` query param for client-side category filtering
- `/blog/[slug]` — generated at build time via `getStaticPaths()` from the `blog` content collection
- `/contact` — static about/contact page

Category filtering on the homepage uses the browser History API and does not cause a full navigation.

## Styling

Tailwind utility-first with a custom dark palette defined in `tailwind.config.mjs`.

**Color tokens (custom Tailwind classes):**
- Backgrounds: `bg-0d1117`, `bg-111820`, `bg-161f2c`, `bg-1c2739`
- Borders: `border-1e2d3d`, `border-243447`
- Text: `text-b8ccdb` (body), `text-e4eff8` (headings), `text-7a90a4` (dim), `text-3d5166` (muted)
- Accent: `text-accent` / `bg-accent` → `#00e5a0`; hover → `#00c488`

**Typography (loaded via Google Fonts in `BaseLayout.astro`):**
- Headings: Playfair Display (serif)
- Body / article prose: Lora (serif)
- Code / metadata: JetBrains Mono

Fluid sizing uses `clamp()`. Component-scoped styles use `<style>` blocks; cross-component overrides use `:global()`.

## Content schema

Defined in `src/content/config.ts` using Astro's `defineCollection` + Zod. Tags are an enum — only add new values there if introducing a new category.

## Static assets

Images go in `public/images/`. They are referenced as `/images/filename.png` in frontmatter and components (no `src/` prefix needed).

## No environment variables

This project has no `.env` file and requires none to run locally or build.

## Deployment

Standard Astro static output in `dist/`. Compatible with Vercel, Netlify, or any static host. No framework adapter is configured (pure static).
