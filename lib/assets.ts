import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import data from "./projects.json";

const PUBLIC = path.join(process.cwd(), "public");
const IMG_EXT = ["jpg", "jpeg", "png", "webp", "avif"];
const VIDEO_EXT = ["mp4", "webm"];

export type ImageAsset = { src: string; width: number; height: number };
export type Project = ImageAsset & { slug: string; title: string; category: string };
export type Category = { id: string; title: string; projects: Project[] };
export type VideoItem = {
  slug: string;
  title: string;
  subtitle: string;
  kind: string;
  src?: string;
  poster?: ImageAsset;
};

function exists(rel: string) {
  return fs.existsSync(path.join(PUBLIC, rel));
}

export function findImage(dir: string, slug: string): ImageAsset | null {
  for (const ext of IMG_EXT) {
    const rel = `${dir}/${slug}.${ext}`;
    if (!exists(rel)) continue;
    try {
      const { width, height } = imageSize(fs.readFileSync(path.join(PUBLIC, rel)));
      if (width && height) return { src: `/${rel}`, width, height };
    } catch {
      /* unreadable file: treat as missing */
    }
  }
  return null;
}

function findVideo(slug: string): string | undefined {
  for (const ext of VIDEO_EXT) {
    const rel = `video/${slug}.${ext}`;
    if (exists(rel)) return `/${rel}`;
  }
  return undefined;
}

export function loadPortfolio() {
  const missing: string[] = [];

  const categories: Category[] = data.categories
    .map((c) => {
      const projects: Project[] = [];
      for (const p of c.projects) {
        const img = findImage(`work/${c.id}`, p.slug);
        if (img) projects.push({ ...img, slug: p.slug, title: p.title, category: c.title });
        else missing.push(`public/work/${c.id}/${p.slug}.jpg`);
      }
      return { id: c.id, title: c.title, projects };
    })
    .filter((c) => c.projects.length > 0);

  const videos: VideoItem[] = [];
  for (const v of data.videos) {
    const src = findVideo(v.slug);
    const poster = findImage("video", v.slug) ?? undefined;
    if (src || poster) videos.push({ ...v, src, poster });
    if (!src) missing.push(`public/video/${v.slug}.mp4`);
    if (!poster) missing.push(`public/video/${v.slug}.jpg  (poster)`);
  }

  const portrait = findImage("images", "portrait");
  const aboutImg = findImage("images", "about");
  if (!portrait) missing.push("public/images/portrait.jpg");
  if (!aboutImg) missing.push("public/images/about.jpg");

  return { categories, videos, portrait, aboutImg, missing };
}
