# Manan Dave — Portfolio

A minimalist, luxury portfolio for Manan Dave, Graphic Designer & Video Editor. The colour identity (forest green, cream, gold) and all copy come from the original Canva portfolio.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · GSAP + ScrollTrigger · Lenis smooth scroll. No other runtime libraries.

## 1. Run locally

Requires Node.js 18.18 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

## 2. Add your artwork (important)

The artwork lives inside Canva, so it could not be copied into this project automatically. Export each piece from Canva (**Share → Download → PNG or JPG**, one project per file) and drop it in the matching path below. Any extension of `jpg`, `jpeg`, `png`, `webp` or `avif` works.

| File | What it is |
|---|---|
| `public/images/portrait.jpg` | Hero portrait, shown in the arch frame (portrait orientation) |
| `public/images/about.jpg` | Full-length photo for the About section |
| `public/work/brand/logo-collection.jpg` | Logo collection (leaf, HPC, Sanatan, P mark, Hyderabad Pharma City seal) |
| `public/work/brand/dice-panel.jpg` | Dice Panel |
| `public/work/brand/150-year-celebration.jpg` | 150 year celebration artwork |
| `public/work/packaging/blunuts-black-raisin.jpg` | Blunuts Black Raisin pack |
| `public/work/packaging/lg-scalgo.jpg` | LG ScaLGo packaging |
| `public/work/packaging/lemona-can.jpg` | Lemona can |
| `public/work/marketing/creative-selects.jpg` | The marketing creatives collage |
| `public/work/marketing/airwave-4d.jpg` | Airwave 4D ad |
| `public/work/marketing/come-to-australia.jpg` | Come to Australia creative |
| `public/work/mockups/bull-short.jpg` | Bull Short bottle mockup |
| `public/work/mockups/chatpata-kurkure.jpg` | Chatpata Kurkure pack |
| `public/work/mockups/green-saunf.jpg` | Green Saunf pack |
| `public/video/sat-score-boost.mp4` + `.jpg` | Video file + thumbnail ("Digital SAT Score Boost #1") |
| `public/video/ugc-content.mp4` + `.jpg` | UGC video file + thumbnail (vertical 9:16 works best) |

Check progress any time:

```bash
npm run assets
```

**Missing files are skipped, never replaced with placeholders.** A section with nothing in it disappears (and its nav link with it). In `npm run dev`, a small panel in the corner lists what is still missing.

Tips
- Images: export at 2000 px on the long edge or larger. Next.js automatically serves optimised AVIF/WebP at the right size, so don't pre-compress.
- Videos: keep under ~15 MB each where possible. Compress with
  `ffmpeg -i in.mp4 -vcodec libx264 -crf 24 -preset slow -movflags +faststart -an out.mp4` (drop `-an` to keep sound).
- Project titles were read from the artwork. To rename, reorder, add or remove projects, edit `lib/projects.json` (a new project is just a new `slug` plus a file with that name).

## 3. Edit content

All copy (about text, experience, tools, contact details) is in `lib/content.ts`.

## 4. Deploy

**Vercel (simplest):** push the folder to GitHub → import the repo at vercel.com → Deploy. Set the environment variable `NEXT_PUBLIC_SITE_URL` to your final address (for example `https://mananDave.com`) so social-share previews resolve correctly. Adding files later = commit and push, and it redeploys.

**Anywhere else (Netlify, VPS):**
```bash
npm run build
npm start          # serves on port 3000
```
Rebuild after adding or changing files in `public/` — the site checks for them at build time.

## Project structure

```
app/            layout (fonts, SEO, JSON-LD), page, favicon, Open Graph image
components/     Loader, Nav, Hero, About (+Expertise), Work + Gallery (lightbox),
                VideoSection, Experience, Contact, Footer, Cursor, SmoothScroll,
                Animations (all scroll reveals), SplitText, Magnetic
lib/            content.ts (copy), projects.json (project list), assets.ts (file detection)
public/         images/, work/<category>/, video/   ← your files go here
scripts/        check-assets.mjs
```

## Behaviour notes

- Respects `prefers-reduced-motion`: no loader, smooth scroll or reveal animations; everything is simply visible.
- Custom cursor and magnetic buttons only run on devices with a fine pointer (not on touch).
- Content is readable without JavaScript.
- Keyboard: the lightbox supports ← → and Esc; the mobile menu closes with Esc; focus returns to where you were.
