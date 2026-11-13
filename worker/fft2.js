// =====================================================================================
// Final Fantasy Tactics II: The Moon and the Radiant Sword — pages and routes.
//   /fftii                  main page (logo, trailer, the two paths, sections)
//   /fftii/story            the story, chapter by chapter (assets/projects/fft2/story.md, read live)
//   /fftii/characters       the characters, by house (#bourdeaux …)
//   /fftii/world            Ivalice twenty years later, the five houses, the Leadership Games, the empires
//   /fftii/relics           Aethelgard and Dawnweaver
//   /fftii/jobs             new and classic jobs
//   /fftii/locations        the places, by region
//   /fftii/soundtrack       the music (assets/projects/fft2/soundtrack.json, MP3s in R2)
//   /fft2, /final-fantasy-tactics-ii  -> main page
// The Worker's fetch() calls handleFFT2(request) first; it returns null for other paths.
// Story format: "## Label: Title" starts a chapter, *text* is italic, blank lines split paragraphs.
// =====================================================================================

import { FFT, FFT_BASE, FFT_EMPIRES, FFT_GAMES, FFT_GROUPS, FFT_HOUSES, FFT_JOBS, FFT_MEDIA, FFT_PATHS, FFT_REGIONS, FFT_RELICS, FFT_SECTIONS, FFT_STATE, fftAsset } from './fft2-data.js';
import { FFT_CSS } from './fft2-styles.js';
import { ICONS, esc, sitePage } from './site-layout.js';
import { MMX_SOUNDTRACK_CSS, soundtrackBody } from './mmx9-soundtrack.js';

const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');
const LOGO = fftAsset('brand/logo.webp');
const POSTER = fftAsset('brand/poster.webp');
const OG = fftAsset('characters/lucius.webp');

// An image frame: the art when the file exists, a labeled parchment frame until it does.
// `cls`: wide (16:9), portrait (3:4), square, tall (job sheets); add "fit" to never crop.
const frame = (path, label, cls) => `<figure class="ph ${cls}"><img src="${fftAsset(path)}" alt="${esc(label)}" loading="lazy" onerror="this.remove()"><figcaption>${esc(label)}</figcaption></figure>`;

async function loadLive(file, json) {
    try {
        const res = await fetch(`${fftAsset(file)}?m=${Math.floor(Date.now() / 60000)}`, { cf: { cacheTtl: 60, cacheEverything: true } });
        if (res.ok) return json ? await res.json() : await res.text();
    } catch (_) { /* the page shows what it can without it */ }
    return json ? {} : '';
}

function parseStory(md) {
    const chapters = [];
    let cur = null;
    let para = [];
    const inline = (s) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
    const flush = () => { if (cur && para.length) cur.html.push(`<p>${inline(para.join(' '))}</p>`); para = []; };
    for (const raw of md.replace(/\r/g, '').split('\n')) {
        const line = raw.trim();
        if (line.startsWith('## ')) {
            flush();
            const h = line.slice(3).trim();
            const i = h.indexOf(':');
            cur = { label: i > 0 ? h.slice(0, i).trim() : '', title: i > 0 ? h.slice(i + 1).trim() : h, html: [] };
            chapters.push(cur);
        } else if (line.startsWith('# ') || !line) {
            flush();
        } else {
            para.push(line);
        }
    }
    flush();
    return chapters;
}

function fftNav(active) {
    const links = [['', 'Home'], ...FFT_SECTIONS.filter((s) => s.status === 'live').map((s) => [s.key, s.nav || s.name])];
    return `<div class="mmx-nav"><div class="wrap"><a href="${FFT_BASE}" style="padding:0;border:0;background:none"><img src="${LOGO}" alt="${esc(FFT.title)}"></a>${links.map(([k, n]) => `<a href="${FFT_BASE}${k ? `/${k}` : ''}"${active === k ? ' class="on"' : ''}>${esc(n)}</a>`).join('')}</div></div>`;
}

function page({ title, description, path, active, body, css = '' }) {
    return sitePage({
        title, description, path, ogImage: OG,
        icon: LOGO,
        active: 'projects',
        back: { href: '/#projects', label: 'Projects' },
        head: `<style>${FFT_CSS}${css}</style>`,
        body: `<div class="mmx fft">${fftNav(active)}${body}<section style="padding-top:0"><div class="wrap"><p class="fan-note">${esc(FFT.note)}</p></div></section></div>`,
    });
}

const head = (eyebrow, title, link) => `<div class="section-head reveal"><div><span class="eyebrow">${esc(eyebrow)}</span><h2>${title}</h2></div>${link ? `<a class="btn btn-ghost btn-sm" href="${link[0]}">${esc(link[1])} ${small(ICONS.arrow)}</a>` : ''}</div>`;
const pageHead = (eyebrow, h1, lead) => `<section class="page-head"><div class="wrap"><span class="eyebrow">${esc(eyebrow)}</span><h1>${h1}</h1><p class="lead">${lead}</p></div></section>`;
const fullTitle = `${FFT.title}: ${FFT.subtitle}`;

// Main page Explore cards reuse art the site already has (a sections/<key>.webp would need adding here).
const SECTION_ART = { story: 'story/chapter-04.webp', characters: 'story/chapter-06.webp', world: 'locations/the-continent.webp', relics: 'relics/aethelgard.webp', jobs: 'sections/jobs.webp', locations: 'locations/verminhan.webp', soundtrack: 'brand/poster.webp' };

// ---------------------------------------------------------------- main page
function mainPage() {
    const body = `
<section class="fft-hero"><div class="wrap"><div class="parch">
    <img class="logo" src="${LOGO}" alt="${esc(fullTitle)}">
    <p class="lead">${esc(FFT.logline)}</p>
    <p class="tag">${esc(FFT.tagline)}</p>
    <div class="cta-row"><a class="btn btn-primary" href="${FFT_BASE}/story">Read the story</a><a class="btn btn-ghost" href="#trailer">Watch the trailer</a></div>
</div></div></section>

<section id="trailer" style="padding-top:10px;scroll-margin-top:120px"><div class="wrap">
    ${head('Concept Trailer', `<span class="grad-bv">${esc(FFT.subtitle)}</span>`)}
    <div class="trailer"><video controls preload="none" playsinline poster="${POSTER}"><source src="${FFT_MEDIA}/trailer.mp4" type="video/mp4"></video></div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
    ${head('Two Paths', 'Two journeys. <span class="grad-bv">One city.</span>')}
    <div class="paths">${FFT_PATHS.map((p) => `
        <a class="path reveal" href="${FFT_BASE}/characters#${p.key === 'moon' ? 'lucius' : 'aveline'}" style="--pc:${p.color};text-decoration:none;color:inherit">
            ${frame(p.img, p.hero, 'wide')}
            <div><small>${esc(p.name)}</small><h3>${esc(p.hero)}</h3><p>${esc(p.text)}</p></div>
        </a>`).join('')}
    </div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
    ${head('Explore', `The world of <span class="grad-bv">${esc(FFT.subtitle)}</span>`)}
    <div class="mmx-sections">${FFT_SECTIONS.map((s) => `<a class="mmx-section reveal" href="${FFT_BASE}/${s.key}">${frame(SECTION_ART[s.key] || `sections/${s.key}.webp`, s.name, `wide sec-art${/relics/.test(s.key) ? ' fit' : ''}`)}<div class="txt"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="st">Explore</span></div></a>`).join('')}</div>
</div></section>`;
    return page({ title: `${fullTitle} · Danloud Labs`, description: FFT.logline, path: FFT_BASE, active: '', body });
}

// ---------------------------------------------------------------- story
async function storyPage() {
    const chapters = parseStory(await loadLive('story.md'));
    const id = (k) => `chapter-${k + 1}`;
    const num = (c) => { const w = c.label.split(' ').pop(); return /^(\d+|[IVX]+)$/.test(w) ? w : '·'; };
    const reader = chapters.length ? `
    <div class="toc-mobile"><select class="tocsel" aria-label="Jump to chapter">${chapters.map((c, k) => `<option value="${id(k)}">${esc(c.label ? `${c.label}: ${c.title}` : c.title)}</option>`).join('')}</select></div>
    <div class="story">
        <nav class="toc" aria-label="Chapters"><h4>Chapters</h4>${chapters.map((c, k) => `<a href="#${id(k)}" data-ch="${id(k)}"><span>${esc(num(c))}</span>${esc(c.title)}</a>`).join('')}</nav>
        <div class="chapters">${chapters.map((c, k) => `
            <article class="chapter" id="${id(k)}">
                ${frame(`story/chapter-${String(k + 1).padStart(2, '0')}.webp`, c.label || c.title, 'wide ch-art')}
                ${c.label ? `<div class="num">${esc(c.label)}</div>` : ''}
                <h2>${esc(c.title)}</h2>
                ${c.html.join('\n')}
            </article>`).join('')}
        </div>
    </div>` : '<div class="st-empty">The story is on its way.</div>';
    const body = `
${pageHead('The Story', `The story of <span class="grad-bv">${esc(FFT.subtitle)}</span>`, 'From the fall of a king to the roads that lead to Lesalia. Like the first game, the past is revealed little by little.')}
<section style="padding-top:24px"><div class="wrap">${reader}</div></section>
<script>
(() => {
    document.querySelectorAll('.tocsel').forEach((sel) => sel.addEventListener('change', () => { const t = document.getElementById(sel.value); t && t.scrollIntoView({ behavior: 'smooth' }); }));
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        document.querySelectorAll('.toc a').forEach((a) => a.classList.toggle('on', a.dataset.ch === e.target.id));
        const sel = document.querySelector('.tocsel'); if (sel) sel.value = e.target.id;
    }), { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.chapter').forEach((c) => io.observe(c));
})();
</script>`;
    return page({ title: `The Story · ${fullTitle}`, description: `The story of ${fullTitle}, a fan-made sequel concept by ${FFT.author}.`, path: `${FFT_BASE}/story`, active: 'story', body });
}

// ---------------------------------------------------------------- characters
function charactersPage() {
    const total = FFT_GROUPS.reduce((a, g) => a + g.members.length, 0);
    const tabs = FFT_GROUPS.map((g, i) => `<button type="button" class="gtab${i === 0 ? ' on' : ''}" data-group="${g.key}" aria-pressed="${i === 0}" style="--gc:${g.color}"><b>${esc(g.name)}</b><small>${g.members.length}</small></button>`).join('');
    const panels = FFT_GROUPS.map((g, i) => `
    <div class="gpanel" id="group-${g.key}" style="--gc:${g.color}"${i === 0 ? '' : ' hidden'}>
        <div class="ghead"><small>${esc(g.sub)}</small><h2>${esc(g.name)}</h2><p>${esc(g.text)}</p></div>
        <div class="people">${g.members.map((c) => `
            <article class="person" id="${c.key}">
                ${frame(`characters/${c.key}.webp`, c.name, 'portrait fit')}
                <div class="pi"><h3>${esc(c.name)}</h3><small>${esc(c.role)}</small><p>${esc(c.bio)}</p></div>
            </article>`).join('')}
        </div>
    </div>`).join('');
    const body = `
${pageHead('Characters', `The people of <span class="grad-bv">${esc(FFT.subtitle)}</span>`, `${total} characters: the royal family of Ordallia, the Oaks family, the leaders and heirs of the five houses of Ivalice, and the heroes of the War of the Lions.`)}
<section style="padding-top:24px"><div class="wrap">
    <div class="gtabs" id="gtabs">${tabs}</div>
    ${panels}
</div></section>
<script>
(() => {
    const bar = document.getElementById('gtabs');
    const show = (key) => {
        const btn = bar.querySelector('[data-group="' + key + '"]'); if (!btn) return false;
        bar.querySelectorAll('.gtab').forEach((b) => { const on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
        document.querySelectorAll('.gpanel').forEach((p) => { p.hidden = p.id !== 'group-' + key; });
        return true;
    };
    bar.addEventListener('click', (e) => { const b = e.target.closest('[data-group]'); if (!b) return; show(b.dataset.group); history.replaceState(null, '', '#' + b.dataset.group); bar.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    const h = decodeURIComponent(location.hash.slice(1));
    if (h && !show(h)) { const c = document.getElementById(h); const p = c && c.closest('.gpanel'); if (p) { show(p.id.slice(6)); setTimeout(() => c.scrollIntoView({ block: 'center' }), 60); } }
    else if (h) setTimeout(() => bar.scrollIntoView(), 60);
})();
</script>`;
    return page({ title: `Characters · ${fullTitle}`, description: `The characters of ${fullTitle}: Lucius, Aveline, House Bourdeaux and the five houses of Ivalice.`, path: `${FFT_BASE}/characters`, active: 'characters', body });
}

// ---------------------------------------------------------------- world
function worldPage() {
    const body = `
${pageHead('The World', `Ivalice, <span class="grad-bv">twenty years later</span>`, 'A kingdom without a king, five houses that rebuilt it from nothing, a tournament to choose a ruler, and the empires watching from beyond the border.')}
<section style="padding-top:24px"><div class="wrap"><div class="state">${FFT_STATE.map((p) => `<p>${esc(p)}</p>`).join('')}</div></div></section>
<section style="padding-top:10px" id="houses"><div class="wrap">
    ${head('The Five Houses', 'The Grand Coalition <span class="grad-bv">of Ivalice</span>')}
    <div class="houses">${FFT_HOUSES.map((h) => `
        <article class="house reveal" id="house-${h.key}" style="--h1:${h.colors[0]};--h2:${h.colors[1]}">
            <div class="bar"></div>
            ${frame(`world/houses/${h.key}.webp`, h.crest, 'square')}
            <div class="pi"><h3>${esc(h.name)}</h3><span class="crest">${esc(h.crest)}</span>
                <dl><dt>Region</dt><dd>${esc(h.region)}</dd><dt>Colors</dt><dd><span class="sw" style="background:${h.colors[0]}"></span><span class="sw" style="background:${h.colors[1]}"></span>${esc(h.colorNames)}</dd><dt>Leader</dt><dd>${esc(h.leader)}</dd><dt>Heir</dt><dd>${esc(h.heir)}</dd></dl>
                <p>${esc(h.aim)}</p></div>
        </article>`).join('')}
    </div>
</div></section>
<section style="padding-top:10px" id="games"><div class="wrap">
    ${head('The Leadership Games', 'A tournament <span class="grad-bv">to choose a king</span>')}
    <div class="state"><p>${esc(FFT_GAMES.text)}</p></div>
    <div class="trials">${FFT_GAMES.trials.map((t) => `
        <article class="trial reveal">${frame(`world/games/${t.key}.webp`, t.alt, 'wide')}<div class="pi"><span class="n">Trial ${t.n}</span><h3>${esc(t.name)}</h3><small>${esc(t.alt)}</small><p>${esc(t.text)}</p></div></article>`).join('')}
    </div>
</div></section>
<section style="padding-top:10px" id="empires"><div class="wrap">
    ${head('Beyond the Border', 'The empires <span class="grad-bv">that waited</span>')}
    <div class="empires">${FFT_EMPIRES.map((e) => `
        <article class="place reveal">${frame(`world/empires/${e.key}.webp`, e.name, 'wide')}<div class="pi"><h3>${esc(e.name)}</h3><small>${esc(e.where)}</small><p>${esc(e.text)}</p></div></article>`).join('')}
    </div>
</div></section>`;
    return page({ title: `The World · ${fullTitle}`, description: `Ivalice twenty years after the War of the Lions: the five houses, the Leadership Games, Ordallia and Romanda.`, path: `${FFT_BASE}/world`, active: 'world', body });
}

// ---------------------------------------------------------------- relics
function relicsPage() {
    const body = `
${pageHead('The Relics', `Two <span class="grad-bv">sovereign blades</span>`, 'One shines with the light of a fallen star. The other carries the moon of House Bourdeaux.')}
<section style="padding-top:24px"><div class="wrap">${FFT_RELICS.map((r) => `
    <article class="relic reveal" id="${r.key}" style="--rc:${r.color}">
        ${frame(`relics/${r.key}.webp`, r.name, 'portrait fit')}
        <div><small>${esc(r.title)}</small><h2>${esc(r.name)}</h2><dl>${r.facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl><p>${esc(r.text)}</p></div>
    </article>`).join('')}
</div></section>`;
    return page({ title: `The Relics · ${fullTitle}`, description: 'Aethelgard, the Sovereign Blade of Light, and Dawnweaver, the Sovereign Blade of the Moon.', path: `${FFT_BASE}/relics`, active: 'relics', body });
}

// ---------------------------------------------------------------- jobs
function jobsPage() {
    const body = `
${pageHead('Jobs', `The jobs of <span class="grad-bv">${esc(FFT.subtitle)}</span>`, `${FFT_JOBS.reduce((a, g) => a + g.jobs.length, 0)} jobs: eight new ones and the classics of Ivalice, each drawn as a pair.`)}
${FFT_JOBS.map((g) => `
<section style="padding-top:20px" id="${g.key}"><div class="wrap">
    ${head(g.name, esc(g.text))}
    <div class="jobs">${g.jobs.map((j) => `
        <article class="job reveal" id="${j.key}">${frame(`jobs/${j.key}.webp`, j.name, 'tall')}<div class="pi"><h3>${esc(j.name)}</h3><small>${esc(j.role)}</small><p>${esc(j.text)}</p></div></article>`).join('')}
    </div>
</div></section>`).join('')}`;
    return page({ title: `Jobs · ${fullTitle}`, description: `The new and classic jobs of ${fullTitle}.`, path: `${FFT_BASE}/jobs`, active: 'jobs', body });
}

// ---------------------------------------------------------------- locations
function locationsPage() {
    const body = `
${pageHead('Locations', `The places of <span class="grad-bv">${esc(FFT.subtitle)}</span>`, 'From the royal city of Verminhan to the ruins of Lesalia and the volcanic valleys of Goug.')}
<section style="padding-top:0"><div class="wrap"><div class="rjump">${FFT_REGIONS.map((g) => `<a href="#${g.key}" style="--rc:${g.color}">${esc(g.name)}</a>`).join('')}</div></div></section>
${FFT_REGIONS.map((g) => `
<section class="region" id="${g.key}" style="--rc:${g.color}"><div class="wrap">
    <h2 class="region-h">${esc(g.name)}<small>${g.places.length} places</small></h2>
    <div class="places">${g.places.map((l) => `
        <article class="place reveal" id="${l.key}">${frame(`locations/${l.key}.webp`, l.name, 'wide')}<div class="pi"><h3>${esc(l.name)}</h3><small>${esc(l.where)}</small><p>${esc(l.text)}</p></div></article>`).join('')}
    </div>
</div></section>`).join('')}`;
    return page({ title: `Locations · ${fullTitle}`, description: `The locations of ${fullTitle}: Verminhan, Lesalia, Goug and the regions of Ivalice.`, path: `${FFT_BASE}/locations`, active: 'locations', body });
}

// ---------------------------------------------------------------- soundtrack
// Tracks: assets/projects/fft2/soundtrack.json, written by tools/fft2_media.mjs (MP3s in R2).
async function soundtrackPage() {
    const tracks = (await loadLive('soundtrack.json', true)).tracks || [];
    const body = `
${pageHead('Soundtrack', `The music of <span class="grad-bv">${esc(FFT.subtitle)}</span>`, 'Dark medieval brass, marching snares, counterpoint strings and solemn organ, echoing a broken land.')}
<section style="padding-top:28px"><div class="wrap">${soundtrackBody({ tracks, cover: () => POSTER, artist: fullTitle, album: 'Original Soundtrack (fan-made)', note: `Music created by ${FFT.author} with Suno.`, volKey: 'fft2-vol' })}</div></section>`;
    return page({ title: `Soundtrack · ${fullTitle}`, description: `Listen to the fan-made soundtrack of ${fullTitle}.`, path: `${FFT_BASE}/soundtrack`, active: 'soundtrack', body, css: MMX_SOUNDTRACK_CSS });
}

// ---------------------------------------------------------------- routes
const html = (body) => new Response(body, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'public, max-age=60' } });

export async function handleFFT2(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (path === '/fft2' || path === '/final-fantasy-tactics-ii' || path === '/fft-ii') return Response.redirect(`${url.origin}${FFT_BASE}`, 301);
    if (path !== FFT_BASE && !path.startsWith(`${FFT_BASE}/`)) return null;
    const rest = path.slice(FFT_BASE.length);
    if (rest === '') return html(mainPage());
    if (rest === '/story') return html(await storyPage());
    if (rest === '/characters') return html(charactersPage());
    if (rest === '/world') return html(worldPage());
    if (rest === '/relics') return html(relicsPage());
    if (rest === '/jobs') return html(jobsPage());
    if (rest === '/locations') return html(locationsPage());
    if (rest === '/soundtrack') return html(await soundtrackPage());
    return Response.redirect(`${url.origin}${FFT_BASE}`, 302);
}
