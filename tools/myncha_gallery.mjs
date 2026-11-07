// =====================================================================================
// Myncha: Vampires of Exius: builds the Gallery (images + videos) and writes
// assets/projects/myncha/gallery.json, which the Gallery page reads live (no Cloudflare paste).
//
//     cd ~/Developer/danloudlabs-web && node tools/myncha_gallery.mjs
//     git add -A && git commit -m "Myncha gallery" && git push
//
// Source: ~/Developer/Myncha Vampires of Exius/Website Resourses (override: MYNCHA_RESOURCES=…)
//   Images/  -> converted to WebP (1920 px wide) into assets/projects/myncha/gallery/
//   videos/  -> uploaded to Cloudflare R2 (store.danloudlabs.com/myncha/videos/…), with a
//               poster frame in assets/projects/myncha/gallery/posters/
// Images can also be dropped straight into assets/projects/myncha/gallery/.
//
// - Captions come from the file name: "Myncha's_nightmare_43b94054_2K.jpg" -> "Myncha's nightmare".
//   Generic generator names ("change_aspect_ratio…", "re-imagine…", "Character…") get no caption.
//   VIDEO_TITLES below names videos whose file name doesn't say who is in them.
// - Order: file name. Files starting with "_" or "." are skipped in the source folders.
// - Needs ffmpeg (or cwebp) for the images and posters. Videos need this Mac's R2 keys
//   (Aura Theme Studio settings, never in this repo); without them the videos are left as they were.
// =====================================================================================
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets/projects/myncha');
const DIR = join(ROOT, 'gallery');
const POSTERS = join(DIR, 'posters');
const JSON_PATH = join(ROOT, 'gallery.json');
const RESOURCES = process.env.MYNCHA_RESOURCES || join(homedir(), 'Developer/Myncha Vampires of Exius/Website Resourses');
const TS = process.env.THEME_STUDIO || join(homedir(), 'Developer/AuraThemeStudio');
const BUCKET = 'aura-theme-store';
const PUBLIC = 'https://store.danloudlabs.com';

const VIDEO_TITLES = {
    'Wynclaw_transforms_with_wolf': 'Wynclaw’s transformation',
    'Character_transforms_into_werewolf': 'Nightfang’s transformation',
};
const GENERIC = /^(change aspect ratio|re-?imagine|generate|generated|character|woman in|image|untitled)\b/i;

const has = (cmd) => { try { execFileSync('which', [cmd], { stdio: 'ignore' }); return true; } catch { return false; } };
const slug = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const list = (dir, re) => (existsSync(dir) ? readdirSync(dir).filter((f) => re.test(f) && !f.startsWith('.') && !f.startsWith('_')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true })) : []);

/** "Myncha's_nightmare_43b94054_2K" -> { caption: "Myncha's nightmare", id: "43b94054" } */
function parseName(file) {
    const stem = file.normalize('NFC').replace(/\.[^.]+$/, '');
    const match = stem.match(/^(.*?)[_ -]([0-9a-f]{8})(?:[_ -](?:\d+k|\d+p))?$/i);
    const base = (match ? match[1] : stem).replace(/^\d+[\s._-]*/, '').replace(/[_]+/g, ' ').trim();
    const id = match ? match[2].toLowerCase() : slug(stem).slice(-12);
    return { stem, caption: GENERIC.test(base) ? '' : base, id };
}

function toWebp(src, dest, width) {
    if (has('cwebp')) {
        execFileSync('cwebp', ['-quiet', '-q', '82', '-resize', String(width), '0', src, '-o', dest]);
    } else {
        execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', src, '-vf', `scale='min(${width},iw)':-2`, '-c:v', 'libwebp', '-quality', '82', dest]);
    }
}

const previous = existsSync(JSON_PATH) ? JSON.parse(readFileSync(JSON_PATH, 'utf8')) : {};
mkdirSync(DIR, { recursive: true });

// ---------------------------------------------------------------- images
const captions = new Map((previous.images || []).map((i) => [i.src, i.caption]));
for (const file of list(join(RESOURCES, 'Images'), /\.(jpe?g|png|webp|heic)$/i)) {
    const { caption, id } = parseName(file);
    const out = `${caption ? slug(caption) : 'image'}-${id}.webp`;
    const dest = join(DIR, out);
    if (!existsSync(dest)) {
        toWebp(join(RESOURCES, 'Images', file), dest, 1920);
        console.log('image ', out);
    }
    captions.set(`gallery/${encodeURIComponent(out)}`, caption);
}
const images = list(DIR, /\.(webp|jpe?g|png)$/i).map((file) => {
    const src = `gallery/${encodeURIComponent(file.normalize('NFC'))}`;
    return { src, caption: captions.has(src) ? captions.get(src) : parseName(file).caption };
});

// ---------------------------------------------------------------- videos
let s3 = null;
try {
    const require = createRequire(join(TS, 'package.json'));
    const { S3Client } = require('@aws-sdk/client-s3');
    const { getR2Config } = require(join(TS, 'settings_store.js'));
    const r2 = getR2Config();
    if (r2.accessKeyId && r2.secretAccessKey) {
        s3 = { client: new S3Client({ region: 'auto', endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`, credentials: { accessKeyId: r2.accessKeyId, secretAccessKey: r2.secretAccessKey } }), require };
    }
} catch { /* no Theme Studio / keys on this machine */ }

async function upload(path, key) {
    const { PutObjectCommand, HeadObjectCommand } = s3.require('@aws-sdk/client-s3');
    const size = statSync(path).size;
    let same = false;
    try { same = (await s3.client.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))).ContentLength === size; } catch { /* not there yet */ }
    if (same) { console.log(`same   ${key}`); return; }
    process.stdout.write(`upload ${key} (${(size / 1048576).toFixed(1)} MB)… `);
    await s3.client.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: readFileSync(path), ContentType: 'video/mp4', CacheControl: 'public, max-age=31536000, immutable' }));
    console.log('ok');
}

const duration = (file) => { try { return Math.round(parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file], { encoding: 'utf8' }))); } catch { return null; } };

let videos = previous.videos || [];
const sources = list(join(RESOURCES, 'videos'), /\.(mp4|m4v|mov)$/i);
if (sources.length && !s3) {
    console.warn(`\n${sources.length} videos found, but no R2 keys on this machine: videos left as they were.`);
} else if (sources.length) {
    mkdirSync(POSTERS, { recursive: true });
    videos = [];
    for (const file of sources) {
        const path = join(RESOURCES, 'videos', file);
        const { stem, caption, id } = parseName(file);
        const known = Object.keys(VIDEO_TITLES).find((k) => stem.startsWith(k));
        const title = known ? VIDEO_TITLES[known] : caption;
        const name = `${slug(title || 'video')}-${id}`;
        const key = `myncha/videos/${name}.mp4`;
        await upload(path, key);
        const poster = join(POSTERS, `${name}.jpg`);
        if (!existsSync(poster)) {
            execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', '2', '-i', path, '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '4', poster]);
        }
        videos.push({ title, url: `${PUBLIC}/${key}`, poster: `gallery/posters/${name}.jpg`, duration: duration(path) });
    }
}

writeFileSync(JSON_PATH, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), images, videos }, null, 2) + '\n');
console.log(`\n${images.length} images, ${videos.length} videos -> assets/projects/myncha/gallery.json`);
