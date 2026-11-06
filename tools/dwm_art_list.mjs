// Writes assets/projects/dwm/ART.md: every image the Dark Within Me pages have a frame for,
// with its file name, shape and whether it already exists.   node tools/dwm_art_list.mjs
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DWM_GROUPS } from '../worker/dwm-characters.js';
import { DWM_REGIONS } from '../worker/dwm-locations.js';
import { DWM_LORE, DWM_GOD_RANKS, DWM_DEMON_RANKS, DWM_TIMELINE } from '../worker/dwm-universe.js';
import { DWM_SECTIONS } from '../worker/dwm-data.js';

const DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets/projects/dwm');
const out = ['# Dark Within Me: art list', '', 'Every image the pages have a frame for. Drop the file (webp, or send the original to convert) at the path shown and push: it appears in place of the empty frame. ✓ = already there.', ''];
const row = (path, label) => out.push(`- ${existsSync(join(DIR, path)) ? '✓' : '·'} \`${path}\` ${label}`);
const chapters = (file) => (readFileSync(join(DIR, file), 'utf8').match(/^## .+$/gm) || []).map((h) => h.slice(3));

out.push('## Main page: Explore cards (16:9)', '');
DWM_SECTIONS.filter((s) => s.key !== 'story').forEach((s) => row(`sections/${s.key}.webp`, s.name));
out.push('', '## Story: La Sua Origine chapters (16:9)', '');
chapters('story/la-sua-origine.md').forEach((h, i) => row(`story/la-sua-origine/chapter-${String(i + 1).padStart(2, '0')}.webp`, h));
out.push('', '## Legends (16:9)', '');
chapters('legends.md').forEach((h, i) => row(`legends/legend-${String(i + 1).padStart(2, '0')}.webp`, h));
out.push('', '## Characters: group banners (16:9)', '');
DWM_GROUPS.forEach((g) => row(`characters/groups/${g.key}.webp`, g.name));
for (const g of DWM_GROUPS) {
    out.push('', `## Characters: ${g.name} (portraits 3:4)`, '');
    g.members.forEach((c) => row(`characters/${c.key}.webp`, c.name));
}
for (const r of DWM_REGIONS) {
    out.push('', `## Locations: ${r.name} (16:9)`, '');
    r.places.forEach((l) => row(`locations/${l.key}.webp`, l.name));
}
out.push('', '## Universe cards (16:9)', '');
DWM_LORE.forEach((l) => row(`universe/${l.key}.webp`, l.name));
out.push('', '## Universe: ranks of the gods (1:1)', '');
DWM_GOD_RANKS.forEach((r) => row(`universe/ranks/god-${r.key}.webp`, r.name));
out.push('', '## Universe: ranks of the demons (1:1)', '');
DWM_DEMON_RANKS.forEach((r) => row(`universe/ranks/demon-${r.key}.webp`, r.name));
out.push('', '## Universe: timeline (16:9, shown small)', '');
DWM_TIMELINE.forEach((e) => row(`universe/timeline/${e.key}.webp`, `${e.y}: ${e.t}`));
writeFileSync(join(DIR, 'ART.md'), out.join('\n') + '\n');
console.log(`${out.filter((l) => l.startsWith('- ')).length} images -> assets/projects/dwm/ART.md`);
