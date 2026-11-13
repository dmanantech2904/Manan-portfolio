// Run with: npm run assets
// Lists which portfolio files are in place and which are still missing.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "lib/projects.json"), "utf8"));
const IMG = ["jpg", "jpeg", "png", "webp", "avif"];
const VID = ["mp4", "webm"];

const has = (dir, slug, exts) =>
  exts.find((e) => fs.existsSync(path.join(root, "public", dir, `${slug}.${e}`)));

let found = 0;
let missing = 0;
const row = (label, ext) => {
  if (ext) {
    found++;
    console.log(`  ✓ ${label}.${ext}`);
  } else {
    missing++;
    console.log(`  ✗ ${label}   (missing)`);
  }
};

console.log("\nImages");
for (const i of data.images) row(`public/${i.dir}/${i.slug}`, has(i.dir, i.slug, IMG));

for (const c of data.categories) {
  console.log(`\n${c.title}`);
  for (const p of c.projects) row(`public/work/${c.id}/${p.slug}`, has(`work/${c.id}`, p.slug, IMG));
}

console.log("\nVideo");
for (const v of data.videos) {
  row(`public/video/${v.slug} (video)`, has("video", v.slug, VID));
  row(`public/video/${v.slug} (poster)`, has("video", v.slug, IMG));
}

console.log(`\n${found} in place, ${missing} missing. Missing items are simply left out of the site.\n`);
