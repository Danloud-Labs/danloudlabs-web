// =====================================================================================
// Dark Within Me soundtrack: uploads the MP3s to Cloudflare R2 and writes
// assets/projects/dwm/soundtrack.json, which the Soundtrack page reads live.
//
//     cd ~/Developer/danloudlabs-web && node tools/dwm_soundtrack.mjs
//     git add -A && git commit -m "DWM soundtrack" && git push
//
// - Source: the iCloud "Dark within Me/Music/Original Soundtrack" folder. The files have no
//   numbers, so the album order and the clean titles are set in ORDER below. Files that are not
//   in ORDER are added at the end with a title made from the file name. Files starting with "_"
//   are skipped (not published).
// - Remasters (Suno): put a file with the SAME name in "Dark within Me/Music/Suno Soundtrack".
//   It is uploaded too and the track gets a `remaster` URL; the page then shows an
//   Original / Remaster switch.
// - R2: same bucket and keys as Aura Theme Studio (bucket aura-theme-store, served at
//   store.danloudlabs.com). The keys are read from this Mac's
//   ~/Library/Application Support/AuraThemeStudio/settings.json through Theme Studio's own
//   settings_store.js; they never live in this repo.
// - Tracks already in R2 with the same size are not uploaded again.
// - Durations come from ffprobe (Homebrew ffmpeg) when it is installed.
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

const MUSIC = join(homedir(), 'Library/Mobile Documents/com~apple~CloudDocs/Danloud Labs/Advertisement/Dark within Me/Music');
const SRC = process.argv[2] || join(MUSIC, 'Original Soundtrack');
const SUNO = process.argv[3] || join(MUSIC, 'Suno Soundtrack');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets/projects/dwm/soundtrack.json');
const BUCKET = 'aura-theme-store';
const PREFIX = 'dwm/soundtrack';
const PUBLIC = 'https://store.danloudlabs.com';

// Album order (the story's order) and clean titles. `cover`: 'hero' for the legends,
// otherwise the cover of La Sua Origine is used.
const ORDER = [
    ['MAIN THEME', 'Main Theme', 'hero'],
    ['DARK WITHIN ME', 'Dark Within Me', 'hero'],
    ['VITA V. ERES', 'Vita v. Éres', 'hero'],
    ['BATTLE OF THE KINGS', 'Battle of the Kings', 'hero'],
    ['CITY OF TOSCANA', 'City of Tuscany'],
    ['CITY OF SIENNA', 'City of Siena'],
    ['GIOVANI_S THEME', 'Giovanni’s Theme'],
    ['FUNERAL_S GARDEN', 'Funeral Garden'],
    ['CURSE', 'Curse'],
    ['HENRY BRASCO THEME', 'Henry Brasco’s Theme'],
    ['JOURNEY TO THE WORLD', 'Journey to the World'],
    ['ELIZABETH_S THEME', 'Elizabeth’s Theme'],
    ['A MOMENT OF LOVE', 'A Moment of Love'],
    ['DIONISIO_S THEME', 'Dionisio’s Theme'],
    ['DANGER', 'Danger'],
    ['DARK CONTRACT', 'Dark Contract'],
    ['AZAZEL THEME', 'Azazel’s Theme'],
    ['TRANSFORMATION', 'Transformation'],
    ['FIGHT THE DARKNESS', 'Fight the Darkness'],
    ['EVIL VISIONS (THE DARK SOULS)', 'Evil Visions (The Dark Souls)'],
    ['JAPAN', 'Japan'],
    ['GOLDEN FORTRESS', 'Golden Fortress'],
    ['ODA NOBUNAGA_S BATTLE THEME', 'Oda Nobunaga’s Battle Theme'],
    ['HUNT', 'Hunt'],
    ['ARTEMISE THEME', 'Artemisa’s Theme'],
    ['NEWFOUNDLAND IN FLAMES', 'Newfoundland in Flames'],
    ['ROBERTO SALAZAR_S THEME', 'Roberto Salazar’s Theme'],
    ['QUEEN ANNE_S REVENGE THEME', 'Queen Anne’s Revenge'],
    ['BLACK BEARD BATTLE_S THEME', 'Blackbeard’s Battle Theme'],
    ['HEROICS MOMENTS', 'Heroic Moments'],
    ['SINUHE KINGDOM', 'Sinuhe Kingdom'],
    ['HAGMONI GASSI_S THEME', 'Hacmoni Ghazi’s Theme'],
    ['VENONA BATTLE (TUTMOSIS SERVANT)', 'Venona Battle (Thutmose’s Servant)'],
    ['TUTMOSIS THE 3RD  THEME', 'Thutmose III’s Theme'],
    ['ANUBIS THEME', 'Anubis’s Theme'],
    ['DEAD SWAMP', 'Dead Swamp'],
    ['ASTAROTH THEME', 'Astaroth’s Theme'],
    ['LOST CITY OF BRASOV', 'The Lost City of Brașov'],
    ['FAREMUR_S CATHEDRAL', 'Faremur Cathedral'],
    ['VLAD DRACULEA_S BATTLE THEME', 'Vlad Draculea’s Battle Theme'],
    ['NEW FORM', 'New Form'],
    ['DIONISIO_S BATTLE THEME', 'Dionisio’s Battle Theme'],
    ['FINAL BATTLE (DIONISIOS_THEME)', 'Final Battle (Dionisio’s Theme)'],
    ['ANGEL WINGS (ELIZABETH DEATH)', 'Angel Wings (Elizabeth’s Death)'],
    ['TILL THE END OF TIME', 'Till the End of Time'],
    ['THE END', 'The End'],
];

const norm = (s) => s.normalize('NFC').replace(/\.mp3$/i, '').trim().toUpperCase();
const slug = (s) => s.normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const titleCase = (s) => s.replace(/_S\b/g, '’s').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

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

async function upload(path, key) {
    const size = statSync(path).size;
    let same = false;
    try { same = (await s3.send(new HeadObjectCommand({ Bucket: BUCKET, Key: key }))).ContentLength === size; } catch { /* not there yet */ }
    if (same) { console.log(`same   ${key}`); return; }
    process.stdout.write(`upload ${key} (${(size / 1048576).toFixed(1)} MB)… `);
    await s3.send(new PutObjectCommand({ Bucket: BUCKET, Key: key, Body: readFileSync(path), ContentType: 'audio/mpeg', CacheControl: 'public, max-age=31536000, immutable' }));
    console.log('ok');
}

const mp3s = (dir) => (existsSync(dir) ? readdirSync(dir).filter((f) => /\.mp3$/i.test(f) && !f.startsWith('_') && !f.startsWith('.')) : []);
const files = mp3s(SRC);
const suno = new Map(mp3s(SUNO).map((f) => [norm(f), f]));
const byName = new Map(files.map((f) => [norm(f), f]));

const list = ORDER.filter(([name]) => byName.has(name)).map(([name, title, cover]) => ({ name, title, cover }));
const listed = new Set(list.map((t) => t.name));
for (const f of files.sort()) if (!listed.has(norm(f))) list.push({ name: norm(f), title: titleCase(norm(f)) });
for (const [name] of ORDER) if (!byName.has(name)) console.warn('not found in the folder:', name);

const tracks = [];
for (const [i, t] of list.entries()) {
    const n = i + 1;
    const base = `${String(n).padStart(2, '0')}-${slug(t.title)}`;
    const path = join(SRC, byName.get(t.name));
    await upload(path, `${PREFIX}/${base}.mp3`);
    const track = { n, title: t.title, url: `${PUBLIC}/${PREFIX}/${base}.mp3`, duration: duration(path) };
    if (t.cover) track.cover = t.cover;
    if (suno.has(t.name)) {
        const rpath = join(SUNO, suno.get(t.name));
        await upload(rpath, `${PREFIX}/remaster/${base}.mp3`);
        track.remaster = `${PUBLIC}/${PREFIX}/remaster/${base}.mp3`;
        track.remasterDuration = duration(rpath);
    }
    tracks.push(track);
}
writeFileSync(OUT, JSON.stringify({ updated: new Date().toISOString().slice(0, 10), tracks }, null, 2) + '\n');
console.log(`\n${tracks.length} tracks (${tracks.filter((t) => t.remaster).length} remastered) -> assets/projects/dwm/soundtrack.json`);
