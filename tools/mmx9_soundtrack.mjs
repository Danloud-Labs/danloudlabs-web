// =====================================================================================
// Mega Man X9: Apex-Primal soundtrack: uploads the MP3s to Cloudflare R2 and writes
// assets/projects/mmx9/soundtrack.json, which the Soundtrack page reads live.
//
//     cd ~/Developer/danloudlabs-web && node tools/mmx9_soundtrack.mjs
//     git add -A && git commit -m "MMX9 soundtrack" && git push
//
// - Source: the iCloud MMX9/Soundtrack folder. Files are "NN. Title.mp3"; files starting
//   with "_" are skipped (not published).
// - R2: same bucket and keys as Aura Theme Studio (bucket aura-theme-store, served at
//   store.danloudlabs.com). The keys are read from this Mac's
//   ~/Library/Application Support/AuraThemeStudio/settings.json through Theme Studio's own
//   settings_store.js; they never live in this repo.
// - Tracks already in R2 with the same size are not uploaded again.
// - Durations come from ffprobe (Homebrew ffmpeg) when it is installed.
// =====================================================================================
import { createRequire } from 'node:module';
import { readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const TS = join(homedir(), 'Developer/AuraThemeStudio');
const require = createRequire(join(TS, 'package.json'));
const { S3Client, PutObjectCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const { getR2Config } = require(join(TS, 'settings_store.js'));

const SRC = process.argv[2] || join(homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Danloud Labs/Cloudflare/Banners/MMX9/Soundtrack');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/projects/mmx9/soundtrack.json');
const BUCKET = 'aura-theme-store';
const PREFIX = 'mmx9/soundtrack';
const PUBLIC = 'https://store.danloudlabs.com';

const slug = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function duration(file) {
    try {
        const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', file], { encoding: 'utf8' });
        return Math.round(parseFloat(out));
    } catch { return null; }
}

const r2 = getR2Config();
if (!r2.accessKeyId || !r2.secretAccessKey) {
    console.error('Missing R2 keys in ~/Library/Application Support/AuraThemeStudio/settings.json (r2AccessKeyId, r2SecretAccessKey).');
    process.exit(1);
}
const s3 = new S3Client({ region: 'auto', endpoint: `https://${r2.accountId}.r2.cloudflarestorage.com`, credentials: { accessKeyId: r2.accessKeyId, secretAccessKey: r2.secretAccessKey } });

const files = readdirSync(SRC).filter((f) => /\.mp3$/i.test(f) && !f.startsWith('_') && !f.startsWith('.')).sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
const tracks = [];
for (const f of files) {
    const m = f.normalize('NFC').match(/^(\d+)\.\s*(.+?)\s*\.mp3$/i);
    if (!m) { console.warn('skip (name is not "NN. Title.mp3"):', f); continue; }
    const n = parseInt(m[1], 10);
    const title = m[2].trim();
    const key = `${PREFIX}/${String(n).padStart(2, '0')}-${slug(title)}.mp3`;
    const path = join(SRC, f);
    const size = statSync(path).size;
    let same = false;
    try { same = (await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))).ContentLength === size; } catch { /* not there yet */ }
    if (!same) {
        process.stdout.write(`upload ${key} (${(size / 1048576).toFixed(1)} MB)… `);
        await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: readFileSync(path), ContentType: 'audio/mpeg', CacheControl: 'public, max-age=31536000, immutable' }));
        console.log('ok');
    } else {
        console.log(`same   ${key}`);
    }
    tracks.push({ n, title, url: `${PUBLIC}/${key}`, duration: duration(path) });
}
writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), tracks }, null, 2) + '\n');
console.log(`\n${tracks.length} tracks -> assets/projects/mmx9/soundtrack.json`);
