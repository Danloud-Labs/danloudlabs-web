// =====================================================================================
// Final Fantasy Tactics II: uploads the trailer and the soundtrack to Cloudflare R2 and writes
// assets/projects/fft2/soundtrack.json, which the Soundtrack page reads live.
//
//     cd ~/Developer/danloudlabs-web && node tools/fft2_media.mjs
//     git add -A && git commit -m "FFT2 media" && git push
//
// - Trailer: "Final Fantasy Tactics II_The Moon and The Radiant Sword.mp4" in the iCloud project
//   folder -> store.danloudlabs.com/fft2/trailer.mp4 (the main page plays it).
// - Soundtrack: every MP3 in the project's "Soundtrack" folder, in name order ("01. Title.mp3";
//   the number is optional), plus "Intro Creation/Music". Files starting with "_" are skipped.
// - R2 keys come from this Mac's Aura Theme Studio settings (never from this repo), exactly
//   like tools/mmx9_soundtrack.mjs. Files already in R2 with the same size are not re-uploaded.
// =====================================================================================
import { createRequire } from 'node:module';
import { existsSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TS = join(homedir(), 'Developer/AuraThemeStudio');
const require = createRequire(join(TS, 'package.json'));
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { getR2Config } = require(join(TS, 'settings_store.js'));

const PROJECT = process.argv[2] || join(homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Danloud Labs/Projects/Final Fantasy Tactics II');
const TRAILER = join(PROJECT, 'Final Fantasy Tactics II_The Moon and The Radiant Sword.mp4');
const MUSIC = [join(PROJECT, 'Intro Creation/Music'), join(PROJECT, 'Soundtrack')];
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets/projects/fft2/soundtrack.json');
const BUCKET = 'aura-theme-store';
const PREFIX = 'fft2';
const PUBLIC = 'https://store.danloudlabs.com';

const slug = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const duration = (file) => { try { return Math.round(parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file], { encoding: 'utf8' }))); } catch { return null; } };

const r2 = getR2Config();
if (!r2.accessKeyId || !r2.secretAccessKey) {
    console.error('Missing R2 keys in ~/Library/Application Support/AuraThemeStudio/settings.json (r2AccessKeyId, r2SecretAccessKey).');
    process.exit(1);
}
const s3 = new S3Client({ region: 'auto', endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`, credentials: { accessKeyId: r2.accessKeyId, secretAccessKey: r2.secretAccessKey } });

async function upload(path, key, type) {
    const size = statSync(path).size;
    let same = false;
    try { same = (await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))).ContentLength === size; } catch { /* not there yet */ }
    if (same) { console.log(`same   ${key}`); return; }
    process.stdout.write(`upload ${key} (${(size / 1048576).toFixed(1)} MB)… `);
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: readFileSync(path), ContentType: type, CacheControl: 'public, max-age=31536000, immutable' }));
    console.log('ok');
}

if (existsSync(TRAILER)) await upload(TRAILER, `${PREFIX}/trailer.mp4`, 'video/mp4');
else console.warn('trailer not found:', TRAILER);

const files = MUSIC.filter(existsSync).flatMap((dir) => readdirSync(dir).filter((f) => /\.mp3$/i.test(f) && !f.startsWith('_') && !f.startsWith('.')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true })).map((f) => join(dir, f)));
const tracks = [];
for (const [i, path] of files.entries()) {
    const n = i + 1;
    const title = path.split('/').pop().normalize('NFC').replace(/\.mp3$/i, '').replace(/^\d+\.\s*/, '').trim();
    const key = `${PREFIX}/soundtrack/${String(n).padStart(2, '0')}-${slug(title)}.mp3`;
    await upload(path, key, 'audio/mpeg');
    tracks.push({ n, title, url: `${PUBLIC}/${key}`, duration: duration(path) });
}
writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), tracks }, null, 2) + '\n');
console.log(`\n${tracks.length} tracks -> assets/projects/fft2/soundtrack.json`);
