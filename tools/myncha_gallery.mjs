// =====================================================================================
// Myncha: Vampires of Exius: lists the images in assets/projects/myncha/gallery/ and writes
// assets/projects/myncha/gallery.json, which the Gallery page reads live (no Cloudflare paste).
//
//     cd ~/Developer/danloudlabs-web && node tools/myncha_gallery.mjs
//     git add -A && git commit -m "Myncha gallery" && git push
//
// - Order: file name ("01 Myncha at dawn.webp"; the leading number only sorts and is not shown).
// - Caption: the file name without the number, dashes and underscores become spaces.
//   A name starting with "_" shows no caption.
// - Formats: .webp (preferred), .jpg, .jpeg, .png. Keep each image under ~1 MB.
// =====================================================================================
import { existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets/projects/myncha');
const DIR = join(ROOT, 'gallery');

const files = existsSync(DIR)
    ? readdirSync(DIR).filter((f) => /\.(webp|jpe?g|png)$/i.test(f) && !f.startsWith('.')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    : [];
const images = files.map((f) => {
    const name = f.normalize('NFC').replace(/\.[^.]+$/, '');
    const caption = name.startsWith('_') ? '' : name.replace(/^\d+[\s._-]*/, '').replace(/[_-]+/g, ' ').trim();
    return { src: `gallery/${encodeURIComponent(f.normalize('NFC'))}`, caption };
});
writeFileSync(join(ROOT, 'gallery.json'), JSON.stringify({ updated: new Date().toISOString().slice(0, 10), images }, null, 2) + '\n');
console.log(`${images.length} images -> assets/projects/myncha/gallery.json`);
