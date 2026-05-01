# Handoff: ChatQuill Blog

## Overview

ChatQuill is a personal tech blog for **Mohun Shakeel Ahmad** — a software engineer at SharinPix and MSc Data Science graduate based in Mauritius. The blog covers software engineering, data science, AI and beginner-friendly tech topics. The design is dark, minimal and editorial: a serious tech publication that still feels personal and human.

---

## About the Design Files

The file `ChatQuill.html` in this bundle is a **high-fidelity design reference** built as a self-contained HTML prototype. It demonstrates intended look, layout, typography, color, interactions and content — but it is **not production code to copy directly**.

Your task is to **recreate these designs in a real codebase** using appropriate frameworks and patterns. If no codebase exists yet, the recommended stack for this project would be **Next.js + Tailwind CSS** (or any modern React-based framework with a good CMS integration like Contentful, Sanity or MDX for article content).

---

## Fidelity

**High-fidelity.** This is a pixel-precise mockup with final colors, typography, spacing, interactions and copy. Implement it to match as closely as possible using the target environment's patterns.

---

## Screens / Views

### 1. Homepage

**Purpose:** Introduce the blog, surface the featured article prominently, and let readers browse recent posts.

#### Navigation Bar
- **Position:** Sticky, top of viewport. `z-index: 100`
- **Height:** 58px
- **Background:** `rgba(13,17,23,0.92)` with `backdrop-filter: blur(12px)`
- **Border-bottom:** `1px solid #1e2d3d`
- **Padding:** `0 clamp(16px, 5vw, 48px)`
- **Layout:** flex row, space-between, centered vertically
- **Logo:**
  - Font: Playfair Display, 700, 20px
  - Color: `#e4eff8`, the word "quill" portion in accent `#00e5a0`
  - Clicking navigates to homepage
- **Nav links:** AI · Engineering · Data Science · Beginners · All
  - Font: JetBrains Mono, 11px, letter-spacing 0.5px
  - Color default: `#7a90a4` | Hover: `#e4eff8` with `background: #161f2c` | Active: `#00e5a0`
  - Padding: 5px 10px, border-radius 3px
  - Clicking filters the card grid to that category
- **Tweaks toggle button:** (optional in production — remove or replace with dark mode toggle)
  - Font: JetBrains Mono, 11px
  - Border: `1px solid #243447`, border-radius 3px, padding 5px 10px
  - Hover: border-color and text color → `#00e5a0`

#### Hero Section
- **Height:** `clamp(380px, 55vw, 640px)`
- **Overflow:** hidden
- **Cursor:** pointer — clicks through to the featured article
- **Background image:** Full-bleed cover image (1600×840 ratio), `object-fit: cover`
  - In the prototype, a CSS gradient placeholder is used. In production, use a real cover image.
  - Hover: `transform: scale(1.02)` on the image with `transition: 0.6s ease`
- **Gradient overlay:**
  ```css
  background: linear-gradient(
    to bottom,
    transparent 20%,
    rgba(13,17,23,0.4) 50%,
    rgba(13,17,23,0.95) 85%,
    #0d1117 100%
  );
  ```
- **Content block** (absolute, bottom-left, max-width 860px, padding `clamp(20px,4vw,48px)`):
  - **Category tag:** JetBrains Mono, 10px, uppercase, letter-spacing 1.5px. White text on `#00e5a0` background. Padding 3px 8px, border-radius 2px, font-weight 600.
  - **Read time:** JetBrains Mono, 10px, color `#7a90a4`, same row as tag
  - **Title:** Playfair Display, 700, `clamp(22px, 4vw, 44px)`, color `#e4eff8`, line-height 1.2, text-wrap: pretty
  - **Meta row:** JetBrains Mono, 11px, color `#7a90a4` — author · date · read time separated by `·` dots
  - **Read CTA:** JetBrains Mono 11px, color `#00e5a0`, border-bottom `1px solid #00e5a0`. On hero hover, gap between text and arrow increases (transition: gap 0.2s)

#### Section Header (between hero and grid)
- **Padding:** `40px clamp(16px,5vw,48px) 24px`
- **Layout:** flex row, space-between, baseline alignment
- **"Recent Articles" label:** JetBrains Mono, 11px, letter-spacing 2px, uppercase, color `#7a90a4`
- **"View all →" link:** JetBrains Mono, 11px, color `#00e5a0`

#### Article Card Grid
- **Layout:** CSS grid, `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`, gap 24px
- **Padding:** `0 clamp(16px,5vw,48px) 60px`
- **Each card:**
  - Background: `#111820`
  - Border: `1px solid #1e2d3d`, border-radius 4px, overflow hidden
  - Hover: `border-color: #243447`, `transform: translateY(-3px)`, `box-shadow: 0 12px 40px rgba(0,0,0,0.4)`
  - Transition: all 0.2s
- **Card image area:**
  - Aspect ratio: `1600 / 840` (roughly 16:5.25)
  - In production: real cover image, `object-fit: cover`
  - Hover: image scales `1.04` with 0.4s ease transition
- **Card body** (padding 18px 20px 20px, flex column, gap 8px):
  - **Category tag:** JetBrains Mono, 9px, uppercase, letter-spacing 1.5px, color `#00e5a0`, border `1px solid #00e5a0`, padding 2px 7px, border-radius 2px
  - **Title:** Playfair Display, 700, 17px, color `#e4eff8`, line-height 1.35, text-wrap: pretty. On card hover: color → `#00e5a0`
  - **Description:** 13px Lora, color `#7a90a4`, line-height 1.5, 1-line clamp (`-webkit-line-clamp: 1`)
  - **Meta:** JetBrains Mono, 10px, color `#3d5166` — author · date · read time

#### Footer
- **Border-top:** `1px solid #1e2d3d`
- **Padding:** `40px clamp(16px,5vw,48px)`
- **Layout:** flex, space-between, wrap, gap 16px
- **Logo:** Playfair Display, 16px, 700, color `#7a90a4`
- **Copyright:** JetBrains Mono, 10px, color `#3d5166`

---

### 2. Article Page

**Purpose:** Full reading experience for a single article.

#### Cover Image
- **Width:** 100%, **Aspect ratio:** `1600 / 840`
- Full-bleed cover image, `object-fit: cover`, no border-radius
- In production: real cover image per article

#### Article Header
- **Max-width:** 740px, centered (`margin: 0 auto`)
- **Padding:** `36px clamp(16px,5vw,48px) 28px`
- **Tag + meta row** (flex, gap 10px, align center, margin-bottom 16px):
  - **Category tag:** JetBrains Mono, 10px, uppercase, letter-spacing 1.5px, white text on `#00e5a0`, padding 3px 9px, border-radius 2px, font-weight 600
  - **Read time:** JetBrains Mono, 11px, color `#7a90a4`
  - **Date:** JetBrains Mono, 11px, color `#3d5166`
- **Article title:** Playfair Display, 700, `clamp(26px,4vw,42px)`, color `#e4eff8`, line-height 1.2, text-wrap: pretty, margin-bottom 20px
- **Byline** (flex, gap 12px, padding-bottom 24px, border-bottom `1px solid #1e2d3d`):
  - **Avatar:** 40×40px circle, background `#1c2739`, border `1px solid #3d5166`, initials in Playfair Display 14px 700, color `#00e5a0`
  - **Name:** Playfair Display, 14px, 600, color `#e4eff8`
  - **Role:** JetBrains Mono, 10px, color `#7a90a4`, margin-top 2px

#### Article Body
- **Max-width:** 740px, centered, padding `0 clamp(16px,5vw,48px) 80px`
- **Paragraphs:** Lora, 17px, line-height 1.85, color `#b8ccdb`, margin-bottom 22px, text-wrap: pretty
- **H2:** Playfair Display, 700, 24px, color `#e4eff8`, margin `40px 0 16px`, line-height 1.3
- **H3:** Playfair Display, 600, 19px, color `#e4eff8`, margin `32px 0 12px`
- **Strong:** color `#e4eff8`, font-weight 600
- **Links:** color `#00e5a0`, border-bottom `1px solid #00c488`, opacity 0.75 on hover

#### Pull Quote
```css
margin: 36px 0;
padding: 22px 28px;
border-left: 3px solid #00e5a0;
background: #111820;
border-radius: 0 4px 4px 0;
```
- **Quote text:** Playfair Display, italic, 20px, color `#e4eff8`, line-height 1.5
- **Optional cite:** JetBrains Mono, 11px, color `#7a90a4`, display block, margin-top 10px

#### Code Block
```
Outer border: 1px solid #1e2d3d, border-radius 4px, overflow hidden, margin 32px 0
```
- **Header bar:** background `#161f2c`, padding 8px 16px, border-bottom `1px solid #1e2d3d`
  - **Filename:** JetBrains Mono, 11px, color `#7a90a4`, with a small `#00e5a0` square indicator (8×8px, border-radius 1px, opacity 0.7)
  - **Language label:** JetBrains Mono, 10px, color `#3d5166`, uppercase, letter-spacing 1px
- **Code area:** background `#080d14`, padding 20px, overflow-x auto
  - Font: JetBrains Mono, 13px, line-height 1.7, color `#b8ccdb`
  - **Syntax colors:**
    - Keywords: `#7eb8f7`
    - Functions/accent: `#00e5a0`
    - Strings: `#f7c948`
    - Comments: `#3d5166` italic
    - Built-ins/types: `#e5a0ff`

#### Inline Image
```
margin: 36px 0
```
- **Image:** full width, aspect ratio 16/9, background `#161f2c`, border `1px solid #1e2d3d`, border-radius 4px
- **Caption (figcaption):** Lora italic, 13px, color `#7a90a4`, text-align center, line-height 1.5, margin-top 10px

#### Author Bio
- **Max-width:** 740px, centered, padding `0 clamp(16px,5vw,48px) 80px`
- **Inner card:** background `#111820`, border `1px solid #243447`, border-radius 4px, padding 28px
- **Avatar:** 56×56px circle, background `#1c2739`, border `2px solid #00e5a0`, initials in Playfair Display 20px 700, color `#00e5a0`
- **Name:** Playfair Display, 700, 18px, color `#e4eff8`
- **Role:** JetBrains Mono, 10px, color `#7a90a4`, letter-spacing 0.5px
- **Bio text:** Lora, 14px, color `#7a90a4`, line-height 1.7, margin-bottom 18px
- **Connect button:**
  - JetBrains Mono, 11px, 600, letter-spacing 0.5px
  - Background `#00e5a0`, color `#0d1117`, padding 8px 18px, border-radius 3px
  - Hover: background `#00c488`, `transform: translateY(-1px)`

---

## Interactions & Behavior

| Interaction | Behavior |
|---|---|
| Click nav logo | Navigate to homepage |
| Click hero | Navigate to featured article page |
| Click any card | Navigate to that article page |
| Click category nav link | Filters card grid to that category (show/hide cards); sets link as active |
| Hover hero | Cover image scales to 1.02; read CTA arrow animates right |
| Hover card | Card lifts (translateY -3px), border lightens, image scales 1.04, title turns accent green |
| Hover bio connect button | Background darkens, slight upward nudge |
| Article page footer logo | Navigate back to homepage |
| ⚙ Tweaks button | Opens floating tweaks panel (bottom-right) |
| Page load | Restore last-visited article from localStorage (`cq-page`, `cq-article`) |

### Animations
- Page entry: `fadeIn` — `opacity: 0 → 1` + `translateY(8px → 0)`, duration 0.3s ease
- Hero image hover scale: 0.6s ease
- Card hover: all 0.2s
- Card image scale: 0.4s ease
- Nav link hover: 0.15s
- Bio connect button: 0.15s

### Responsive Breakpoints
| Breakpoint | Changes |
|---|---|
| ≤640px | Card grid → 1 column; nav links spacing tightens; hero height `65vw` min 300px |
| ≤400px | Non-active nav links hidden (overflow) |
| All sizes | Fluid padding via `clamp(16px, 5vw, 48px)` |

---

## State Management

| State | Description |
|---|---|
| `currentPage` | `'home'` or `'article'` |
| `currentArticleId` | Slug of the currently viewed article |
| `activeCategory` | Which nav category filter is selected (`'all'` by default) |
| `localStorage['cq-page']` | Persisted page for session restore |
| `localStorage['cq-article']` | Persisted article slug for session restore |

In production, article content should come from a CMS or MDX files. The prototype uses in-memory article objects with HTML body content.

---

## Design Tokens

### Colors
| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0d1117` | Base background |
| `--bg2` | `#111820` | Card / section background |
| `--bg3` | `#161f2c` | Code header, input bg |
| `--bg4` | `#1c2739` | Avatar background |
| `--border` | `#1e2d3d` | Default borders |
| `--border2` | `#243447` | Hover borders, stronger dividers |
| `--muted` | `#3d5166` | Dots, secondary meta |
| `--dim` | `#7a90a4` | Secondary text, placeholders |
| `--body` | `#b8ccdb` | Body text |
| `--white` | `#e4eff8` | Headings, primary text |
| `--accent` | `#00e5a0` | Primary accent (mint green) |
| `--accent2` | `#00c488` | Accent hover state |
| `--accent-bg` | `rgba(0,229,160,0.08)` | Subtle accent fill |

### Typography
| Role | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Display / Headlines | Playfair Display | clamp(22–44px) hero, 24px h2, 17px card | 700–900 | Italic used for hero title and pull quotes |
| Article title | Playfair Display | clamp(26–42px) | 700 | |
| Body text | Lora | 17px | 400 | line-height 1.85 |
| Body small | Lora | 13–14px | 400 | Captions, bio |
| UI / Meta / Code labels | JetBrains Mono | 9–11px | 400–600 | Tags, dates, nav links, filenames |
| Code | JetBrains Mono | 13px | 400 | line-height 1.7 |

### Spacing Scale (used via clamp)
- Section horizontal padding: `clamp(16px, 5vw, 48px)`
- Hero content padding: `clamp(20px, 4vw, 48px)`
- Article body max-width: `740px`
- Card grid gap: `24px`
- Card body padding: `18px 20px`

### Border Radius
| Element | Radius |
|---|---|
| Cards, code blocks, bio card | `4px` |
| Tags | `2px` |
| Nav links, buttons | `3px` |
| Avatars | `50%` |

### Shadows
| Element | Shadow |
|---|---|
| Card hover | `0 12px 40px rgba(0,0,0,0.4)` |
| Tweaks panel | `0 16px 48px rgba(0,0,0,0.6)` |

---

## Article Content

Three articles are fully written in the prototype:

| Slug | Title | Category | Read Time |
|---|---|---|---|
| `ai-code-review` | AI Code Review: Is It Ready to Replace Your Senior Dev? | AI | 7 min |
| `ml-zero-math` | What Is Machine Learning? Explained With Zero Math | Beginner | 5 min |
| `data-sold` | The Exact Moment Your Data Gets Sold and Who's Buying It | Data Science | 8 min |

In production, move these to a CMS (Sanity, Contentful) or MDX files. Each article needs: `slug`, `tag`, `readtime`, `date`, `title`, `coverImage`, `body`.

Article body supports: `<p>`, `<h2>`, `<h3>`, `<strong>`, `<em>`, `<a>`, pull quote (`<div class="pull-quote">`), code block (`<div class="code-block">`), inline image (`<figure class="inline-img">`).

---

## Assets

| Asset | Status | Notes |
|---|---|---|
| Cover images | **Placeholder** | Gradient blocks with article title overlay. Replace with real 1600×840 images per article. |
| Author photo | **Placeholder** | Avatar circle with initials "M". Replace with real headshot. |
| Logo / wordmark | Text only | "chatquill" in Playfair Display — "quill" in accent color. Could become a real SVG wordmark. |
| Favicon | Not included | Recommend a small "cq" monogram in `#00e5a0` |

---

## Google Fonts

Load in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700&family=Lora:ital,wght@0,400;0,500;1,400;1,500&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

---

## Files in This Package

| File | Description |
|---|---|
| `ChatQuill.html` | Complete high-fidelity prototype — single HTML file with embedded CSS and JS. Open in any browser to interact with it. |
| `README.md` | This document — full implementation spec. |

---

## Suggested Production Stack

If starting fresh:
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (map tokens above to Tailwind config)
- **Content:** MDX files or Sanity CMS
- **Fonts:** next/font with Google Fonts
- **Deployment:** Vercel

If adding to an existing codebase, adapt the design tokens and component structure to whatever is already in place.
