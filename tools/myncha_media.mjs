// =====================================================================================
// Myncha: Vampires of Exius: uploads the music to Cloudflare R2 and writes
// assets/projects/myncha/soundtrack.json, which the Soundtrack page reads live.
//
//     cd ~/Developer/danloudlabs-web && node tools/myncha_media.mjs
//     git add -A && git commit -m "Myncha media" && git push
//
// - Music: every MP3 in the project's "MP3" folder, in name order ("01. Title.mp3"; the number is
//   optional). Files starting with "_" are skipped.
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

const PROJECT = process.argv[2] || join(homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/*Myncha - Vampires of Exius');
const MUSIC = join(PROJECT, 'MP3');
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets/projects/myncha/soundtrack.json');
const BUCKET = 'aura-theme-store';
const PREFIX = 'myncha';
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

const files = existsSync(MUSIC) ? readdirSync(MUSIC).filter((f) => /\.mp3$/i.test(f) && !f.startsWith('_') && !f.startsWith('.')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true })) : [];
const tracks = [];
for (const [i, f] of files.entries()) {
    const n = i + 1;
    const title = f.normalize('NFC').replace(/\.mp3$/i, '').replace(/^\d+\.\s*/, '').trim();
    const key = `${PREFIX}/soundtrack/${String(n).padStart(2, '0')}-${slug(title)}.mp3`;
    await upload(join(MUSIC, f), key, 'audio/mpeg');
    tracks.push({ n, title, url: `${PUBLIC}/${key}`, duration: duration(join(MUSIC, f)) });
}
writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), tracks }, null, 2) + '\n');
console.log(`\n${tracks.length} tracks -> assets/projects/myncha/soundtrack.json`);
