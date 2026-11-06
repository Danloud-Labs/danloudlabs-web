// =====================================================================================
// Dark Within Me — pages and routes.
//   /dark-within-me-la-sua-origine            main page (logo hero, books, premise, sections)
//   /dark-within-me-la-sua-origine/story      the four books, one tab each (#la-sua-origine …), chapter summaries
//   /dark-within-me-la-sua-origine/universe   how the world works: Prism, gods, demons, ranks, timeline
//   /dark-within-me-la-sua-origine/characters every group and its members (tabs: #main …)
//   /dark-within-me-la-sua-origine/locations  the places of the saga, by region
//   /dark-within-me-la-sua-origine/legends    the legends told before the books
//   /dark-within-me-la-sua-origine/soundtrack the original soundtrack (assets/projects/dwm/soundtrack.json)
//   /dark-within-me, /dwm                     -> main page
// The Worker's fetch() calls handleDarkWithinMe(request) first; it returns null for other paths.
//
// Texts read live (edge cache 1 min): assets/projects/dwm/story/<book>.md (chapter summaries)
// and assets/projects/dwm/legends.md. Format:
//   ## Chapter 1: Triangle of Misfortune "Label: Title" starts a chapter
//   ***                                  a scene break
//   *text*                               italics
// Paragraphs are separated by a blank line. Text before the first ## is a note and is not shown.
// Chapter art, by position (01, 02…): story/<book>/chapter-01.webp, legends/legend-01.webp.
// A missing image shows an empty frame, so art can be added later with a git push.
// =====================================================================================

import { DWM, DWM_BASE, DWM_BOOKS, DWM_PREMISE, DWM_SECTIONS, dwmAsset } from './dwm-data.js';
import { DWM_CSS } from './dwm-styles.js';
import { DWM_GROUPS } from './dwm-characters.js';
import { DWM_REGIONS } from './dwm-locations.js';
import { DWM_COUNT, DWM_DEMON_RANKS, DWM_GOD_RANKS, DWM_LORE, DWM_TIMELINE } from './dwm-universe.js';
import { ICONS, esc, sitePage } from './site-layout.js';
import { MMX_SOUNDTRACK_CSS, soundtrackBody } from './mmx9-soundtrack.js';

const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');

// An image frame: shows the art when the file exists, an empty labeled frame until it does,
// so art can be added later with a git push only. `cls` sets the shape (see dwm-styles.js).
const frame = (path, label, cls) => `<figure class="ph ${cls}"><img src="${dwmAsset(path)}" alt="${esc(label)}" loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()"><figcaption>${esc(label)}</figcaption></figure>`;
const bookTag = (n) => `<span class="btag">${n ? `Book ${n}` : 'Legends'}</span>`;
const LOGO = dwmAsset('brand/logo.webp');
const COVER_OG = dwmAsset('books/la-sua-origine.webp');
const HERO = dwmAsset('brand/hero.webp');

async function loadText(file) {
    try {
        const res = await fetch(`${dwmAsset(file)}?m=${Math.floor(Date.now() / 60000)}`, { cf: { cacheTtl: 60, cacheEverything: true } });
        if (res.ok) return await res.text();
    } catch (_) { /* the book shows its synopsis only */ }
    return '';
}

// Markdown subset -> [{ label, title, html }]
function parseBook(md) {
    const chapters = [];
    let cur = null;
    let para = [];
    const inline = (s) => esc(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');
    const flush = () => {
        if (cur && para.length) cur.html.push(`<p>${inline(para.join(' '))}</p>`);
        para = [];
    };
    for (const raw of md.replace(/\r/g, '').split('\n')) {
        const line = raw.trim();
        if (line.startsWith('## ')) {
            flush();
            const h = line.slice(3).trim();
            const i = h.indexOf(':');
            cur = { label: i > 0 ? h.slice(0, i).trim() : '', title: i > 0 ? h.slice(i + 1).trim() : h, html: [] };
            chapters.push(cur);
        } else if (line.startsWith('# ')) {
            flush();
        } else if (/^(\*\s*){3}$|^-{3,}$/.test(line)) {
            flush();
            if (cur) cur.html.push('<p class="scene">* * *</p>');
        } else if (!line) {
            flush();
        } else {
            para.push(line);
        }
    }
    flush();
    return chapters;
}

// Chapters with an art frame each, a sticky table of contents and a mobile jump menu.
// `prefix`: anchor prefix; `art(k)`: image URL of chapter k (0-based).
function reader(prefix, chapters, art) {
    const id = (k) => `${prefix}-${k + 1}`;
    const num = (c) => { const w = c.label.split(' ').pop(); return /^(\d+|[IVX]+)$/.test(w) ? w : '·'; };
    const toc = chapters.map((c, k) => `<a href="#${id(k)}" data-ch="${id(k)}"><span>${esc(num(c))}</span>${esc(c.title)}</a>`).join('');
    return `
        <div class="toc-mobile"><select class="tocsel" aria-label="Jump to chapter">${chapters.map((c, k) => `<option value="${id(k)}">${esc(c.label ? `${c.label}: ${c.title}` : c.title)}</option>`).join('')}</select></div>
        <div class="story">
            <nav class="toc" aria-label="Chapters"><h4>Chapters</h4>${toc}</nav>
            <div class="chapters">${chapters.map((c, k) => `
                <article class="chapter" id="${id(k)}">
                    <figure class="ch-art"><img src="${art(k)}" alt="${esc(c.title)}" loading="lazy" onerror="this.parentNode.classList.add('empty');this.remove()"><figcaption>${esc(c.label || c.title)}</figcaption></figure>
                    ${c.label ? `<div class="num">${esc(c.label)}</div>` : ''}
                    <h2>${esc(c.title)}</h2>
                    ${c.html.join('\n')}
                </article>`).join('')}
            </div>
        </div>`;
}

// Keeps the table of contents and the mobile menu in step with the chapter being read.
const READER_JS = `
    document.querySelectorAll('.tocsel').forEach((sel) => sel.addEventListener('change', () => { const t = document.getElementById(sel.value); t && t.scrollIntoView({ behavior: 'smooth' }); }));
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((es) => es.forEach((e) => {
            if (!e.isIntersecting) return;
            const box = e.target.closest('.story').parentNode; const id = e.target.id;
            box.querySelectorAll('.toc a').forEach((a) => a.classList.toggle('on', a.dataset.ch === id));
            const sel = box.querySelector('.tocsel'); if (sel) sel.value = id;
        }), { rootMargin: '-30% 0px -60% 0px' });
        document.querySelectorAll('.chapter').forEach((c) => io.observe(c));
    }`;

function dwmNav(active) {
    const links = [['', 'Home'], ...DWM_SECTIONS.filter((s) => s.status === 'live').map((s) => [s.key, s.nav || s.name])];
    return `<div class="mmx-nav"><div class="wrap"><a href="${DWM_BASE}" style="padding:0;border:0;background:none"><img src="${LOGO}" alt="Dark Within Me"></a>${links.map(([k, n]) => `<a href="${DWM_BASE}${k ? `/${k}` : ''}"${active === k ? ' class="on"' : ''}>${esc(n)}</a>`).join('')}</div></div>`;
}

const note = `<section style="padding-top:0"><div class="wrap"><p class="fan-note">${esc(DWM.copyright)}</p></div></section>`;

function page({ title, description, path, active, body, ogImage, css = '' }) {
    return sitePage({
        title, description, path, ogImage: ogImage || COVER_OG,
        icon: LOGO,
        active: 'projects',
        back: { href: '/#projects', label: 'Projects' },
        head: `<style>${DWM_CSS}${css}</style>`,
        body: `<div class="mmx dwm">${dwmNav(active)}${body}${note}</div>`,
    });
}

const head = (eyebrow, title, link) => `<div class="section-head reveal"><div><span class="eyebrow">${esc(eyebrow)}</span><h2>${title}</h2></div>${link ? `<a class="btn btn-ghost btn-sm" href="${link[0]}">${esc(link[1])} ${small(ICONS.arrow)}</a>` : ''}</div>`;

const coverStyle = (b) => `background-image:url('${dwmAsset(`books/${b.cover}`)}')`;

// ---------------------------------------------------------------- main page
function mainPage() {
    // Embers: fixed positions so the page renders the same everywhere.
    const embers = Array.from({ length: 26 }, (_, i) => `<i style="left:${(i * 37) % 100}%;animation-delay:${((i * 1.7) % 9).toFixed(1)}s;animation-duration:${7 + (i % 5)}s;--dx:${((i % 7) - 3) * 18}px"></i>`).join('');
    const body = `
<section class="dwm-hero">
    <div class="hero-art"><img src="${HERO}" alt="Dark Within Me, by ${esc(DWM.author)}"></div>
    <div class="embers">${embers}</div>
    <div class="wrap">
        <p class="lead">${esc(DWM.logline)}</p>
        <p class="tag">${esc(DWM.tagline)}</p>
        <div class="cta-row"><a class="btn btn-primary" href="${DWM_BASE}/story">Read the story</a></div>
        <p class="credit">An original saga by ${esc(DWM.author)} · since ${DWM.since}</p>
    </div>
</section>

<section>
    <div class="wrap">
        ${head('The Books', 'Four books. <span class="grad-bv">One soul divided.</span>', [`${DWM_BASE}/story`, 'Read the story'])}
        <div class="books">${DWM_BOOKS.map((b) => `<a class="book reveal" href="${DWM_BASE}/story#${b.key}" style="--bc:${b.color}"><div class="cv" style="${coverStyle(b)}"></div><div class="bi"><small>Book ${b.n}</small><b>${esc(b.title)}</b></div></a>`).join('')}</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        ${head('The World', 'Light and darkness <span class="grad-bv">wear human faces.</span>')}
        <div class="trio">${DWM_PREMISE.map((u) => `<div class="card reveal" style="--tc:#e0283f"><div class="txt"><h3>${esc(u.k)}</h3><p>${esc(u.t)}</p></div></div>`).join('')}</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        ${head('Explore', 'The world of Dark Within Me')}
        <div class="mmx-sections">${DWM_SECTIONS.map((s) => {
            const live = s.status === 'live';
            const art = s.key === 'story' ? `<div class="art" style="background-image:url('${dwmAsset('books/la-sua-origine.webp')}')"></div>` : frame(`sections/${s.key}.webp`, s.name, 'wide sec-art');
            const inner = `${art}<div class="txt"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="st"${live ? '' : ' style="background:rgba(255,255,255,.08);color:var(--muted)"'}>${live ? 'Explore' : 'Coming soon'}</span></div>`;
            return live ? `<a class="mmx-section reveal" href="${DWM_BASE}/${s.key}">${inner}</a>` : `<div class="mmx-section reveal">${inner}</div>`;
        }).join('')}</div>
    </div>
</section>`;
    return page({ title: `${DWM.title}: La Sua Origine · Danloud Labs`, description: `${DWM.logline} An original saga by ${DWM.author}.`, path: DWM_BASE, active: '', body });
}

// ---------------------------------------------------------------- story
async function storyPage() {
    const texts = await Promise.all(DWM_BOOKS.map((b) => (b.file ? loadText(`story/${b.file}`) : '')));
    const tabs = DWM_BOOKS.map((b, i) => `<button type="button" class="btab${i === 0 ? ' on' : ''}" data-book="${b.key}" aria-pressed="${i === 0}" style="--bc:${b.color}"><small>Book ${b.n}</small><b>${esc(b.title)}</b></button>`).join('');
    const panels = DWM_BOOKS.map((b, i) => {
        const chapters = parseBook(texts[i] || '');
        const body = chapters.length
            ? reader(b.key, chapters, (k) => dwmAsset(`story/${b.key}/chapter-${String(k + 1).padStart(2, '0')}.webp`))
            : '<div class="bsoon">The chapters of this book are on their way.</div>';
        return `
    <div class="bpanel" id="book-${b.key}" style="--bc:${b.color}"${i === 0 ? '' : ' hidden'}>
        <div class="bcover"><img src="${dwmAsset(`books/${b.cover}`)}" alt="${esc(b.title)}"${i === 0 ? '' : ' loading="lazy"'}></div>
        <div class="bsyn"><h2><small>Book ${b.n}</small>${esc(b.title)}</h2>${b.synopsis.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        ${body}
    </div>`;
    }).join('');
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">The Story</span><h1>The books of <span class="grad-bv">Dark Within Me</span></h1>
<p class="lead">The saga in order, chapter by chapter: La Sua Origine, The Army of Light, Ricardo Monteoro and After Dawn.</p></div></section>
<section style="padding-top:24px"><div class="wrap">
    <div class="btabs" id="btabs">${tabs}</div>
    ${panels}
</div></section>
<script>
(() => {
    const bar = document.getElementById('btabs');
    const show = (key) => {
        const btn = bar.querySelector('[data-book="' + key + '"]'); if (!btn) return false;
        bar.querySelectorAll('.btab').forEach((b) => { const on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
        document.querySelectorAll('.bpanel').forEach((p) => { p.hidden = p.id !== 'book-' + key; });
        return true;
    };
    // The tabs stay in view with the whole cover under them.
    const toTabs = (smooth) => bar.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
    bar.addEventListener('click', (e) => { const b = e.target.closest('[data-book]'); if (!b) return; show(b.dataset.book); history.replaceState(null, '', '#' + b.dataset.book); toTabs(true); });
    // #book opens that book at its tabs; #book-<n> opens it at chapter n.
    const h = decodeURIComponent(location.hash.slice(1));
    if (h) {
        const key = [...bar.querySelectorAll('[data-book]')].map((b) => b.dataset.book).find((k) => h === k || h.startsWith(k + '-'));
        if (key) { show(key); const t = h === key ? null : document.getElementById(h); setTimeout(() => (t ? t.scrollIntoView() : toTabs(false)), 60); }
    }
    ${READER_JS}
})();
</script>`;
    return page({ title: `The Story · ${DWM.title}`, description: `The story of Dark Within Me, an original saga by ${DWM.author}, chapter by chapter: La Sua Origine, The Army of Light, Ricardo Monteoro and After Dawn.`, path: `${DWM_BASE}/story`, active: 'story', body });
}

// ---------------------------------------------------------------- legends
async function legendsPage() {
    const chapters = parseBook(await loadText('legends.md'));
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">The Legends</span><h1>Before the <span class="grad-bv">first book</span></h1>
<p class="lead">How light and darkness were born, why a god has no soul, and how the demons lost their names. The legends every character in the saga grew up with.</p></div></section>
<section style="padding-top:24px"><div class="wrap">
    ${chapters.length ? reader('legend', chapters, (k) => dwmAsset(`legends/legend-${String(k + 1).padStart(2, '0')}.webp`)) : '<div class="bsoon">The legends are on their way.</div>'}
</div></section>
<script>(() => {${READER_JS}
})();</script>`;
    return page({ title: `Legends · ${DWM.title}`, description: `The legends of Dark Within Me: the Prism, Vita and Éres, and the War between Light and Darkness.`, path: `${DWM_BASE}/legends`, active: 'legends', body });
}

// ---------------------------------------------------------------- universe
function universePage() {
    const ranks = (list, side) => `<ol class="ranks ${side === 'god' ? 'light' : 'dark'}">${list.map((r, i) => `<li class="reveal"><div class="rimg">${frame(`universe/ranks/${side}-${r.key}.webp`, r.name, 'square')}<span class="rn">${i + 1}</span></div><div><b>${esc(r.name)}</b><small>${esc(r.n)}</small><p>${esc(r.t)}</p></div></li>`).join('')}</ol>`;
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">The Universe</span><h1>How the world of <span class="grad-bv">Dark Within Me</span> works</h1>
<p class="lead">The Prism, the gods and the demons, the Celestial Union and the Army of Light, the ranks of both sides and the arts they fight with.</p></div></section>
<section style="padding-top:28px"><div class="wrap">
    <div class="lore">${DWM_LORE.map((l) => `
        <div class="card reveal" id="${l.key}" style="--tc:${l.c}">
            ${frame(`universe/${l.key}.webp`, l.name, 'wide')}
            <div class="txt"><h3>${esc(l.name)}</h3>${l.text.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        </div>`).join('')}
    </div>
</div></section>
<section style="padding-top:10px"><div class="wrap">
    ${head('The Ranks', 'Six steps of light, <span class="grad-bv">six of darkness</span>')}
    <div class="rank-cols">
        <div><h3 class="rank-h light">The ranks of the gods</h3>${ranks(DWM_GOD_RANKS, 'god')}</div>
        <div><h3 class="rank-h dark">The ranks of the demons</h3>${ranks(DWM_DEMON_RANKS, 'demon')}<p class="count-note">${esc(DWM_COUNT)}</p></div>
    </div>
</div></section>
<section style="padding-top:10px"><div class="wrap">
    ${head('Timeline', 'From before time <span class="grad-bv">to the Tuscany of 1492</span>')}
    <ol class="timeline">${DWM_TIMELINE.map((e) => `<li class="reveal">${frame(`universe/timeline/${e.key}.webp`, e.y, 'wide tl-art')}<div><b>${esc(e.y)}</b><p>${esc(e.t)}</p></div></li>`).join('')}</ol>
</div></section>`;
    return page({ title: `The Universe · ${DWM.title}`, description: `The world of Dark Within Me: the Prism, gods and demons, the Celestial Union, the Army of Light, the ranks and the timeline.`, path: `${DWM_BASE}/universe`, active: 'universe', body });
}

// ---------------------------------------------------------------- characters
function charactersPage() {
    const total = DWM_GROUPS.reduce((a, g) => a + g.members.length, 0);
    const tabs = DWM_GROUPS.map((g, i) => `<button type="button" class="gtab${i === 0 ? ' on' : ''}" data-group="${g.key}" aria-pressed="${i === 0}" style="--gc:${g.color}"><b>${esc(g.name)}</b><small>${g.members.length}</small></button>`).join('');
    const panels = DWM_GROUPS.map((g, i) => `
    <div class="gpanel" id="group-${g.key}" style="--gc:${g.color}"${i === 0 ? '' : ' hidden'}>
        <div class="ghead">${frame(`characters/groups/${g.key}.webp`, g.name, 'wide')}<div><h2>${esc(g.name)}</h2><p>${esc(g.text)}</p></div></div>
        <div class="people">${g.members.map((c) => `
            <article class="person" id="${c.key}">
                ${frame(`characters/${c.key}.webp`, c.name, 'portrait')}
                <div class="pi">${bookTag(c.book)}<h3>${esc(c.name)}</h3>${c.alias ? `<span class="alias">${esc(c.alias)}</span>` : ''}<small>${esc(c.role)}</small><p>${esc(c.bio)}</p></div>
            </article>`).join('')}
        </div>
    </div>`).join('');
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">Characters</span><h1>The people of <span class="grad-bv">Dark Within Me</span></h1>
<p class="lead">${total} characters in ${DWM_GROUPS.length} groups: the pact and the people it binds, the House of Siena, the gods of the Celestial Union, the demons, the four souls of the list and those who stood beside Cristian.</p></div></section>
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
    // #group opens that group; #character opens its group and scrolls to the card.
    const h = decodeURIComponent(location.hash.slice(1));
    if (h && !show(h)) { const c = document.getElementById(h); const p = c && c.closest('.gpanel'); if (p) { show(p.id.slice(6)); setTimeout(() => c.scrollIntoView({ block: 'center' }), 60); } }
    else if (h) setTimeout(() => bar.scrollIntoView(), 60);
})();
</script>`;
    return page({ title: `Characters · ${DWM.title}`, description: `The characters of Dark Within Me: Cristian, Elizabeth, Dionisio, Azazel, the House of Siena, the Celestial Union, the Demon Union and the Assassination List.`, path: `${DWM_BASE}/characters`, active: 'characters', body });
}

// ---------------------------------------------------------------- locations
function locationsPage() {
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">Locations</span><h1>The places of <span class="grad-bv">Dark Within Me</span></h1>
<p class="lead">From the valleys of Tuscany to the frozen seas, the deserts of Egypt and the lost city of Romania, and the worlds beyond.</p>
<div class="rjump">${DWM_REGIONS.map((g) => `<a href="#${g.key}" style="--rc:${g.color}">${esc(g.name)}</a>`).join('')}</div></div></section>
${DWM_REGIONS.map((g) => `
<section class="region" id="${g.key}" style="--rc:${g.color}"><div class="wrap">
    <h2 class="region-h">${esc(g.name)}<small>${g.places.length} places</small></h2>
    <div class="places">${g.places.map((l) => `
        <article class="place reveal" id="${l.key}">
            ${frame(`locations/${l.key}.webp`, l.name, 'wide')}
            <div class="pi">${bookTag(l.book)}<h3>${esc(l.name)}</h3><small>${esc(l.where)}</small><p>${esc(l.text)}</p></div>
        </article>`).join('')}
    </div>
</div></section>`).join('')}`;
    return page({ title: `Locations · ${DWM.title}`, description: `The locations of Dark Within Me: Tuscany, Siena, London, Owari, Newfoundland, Egypt, the lost city of Brașov, Heaven and the Underworld.`, path: `${DWM_BASE}/locations`, active: 'locations', body });
}

// ---------------------------------------------------------------- soundtrack
// Tracks: assets/projects/dwm/soundtrack.json, written by tools/dwm_soundtrack.mjs (MP3s in R2).
async function soundtrackPage() {
    let tracks = [];
    try {
        const res = await fetch(`${dwmAsset('soundtrack.json')}?m=${Math.floor(Date.now() / 60000)}`, { cf: { cacheTtl: 60, cacheEverything: true } });
        if (res.ok) tracks = (await res.json()).tracks || [];
    } catch (_) { /* the page says the soundtrack is on its way */ }
    const cover = (t) => (t.cover === 'hero' ? HERO : COVER_OG);
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">Soundtrack</span><h1>The music of <span class="grad-bv">Dark Within Me</span></h1>
<p class="lead">The original soundtrack, composed by ${esc(DWM.author)} for the saga since ${DWM.since}: the themes of its characters, its cities and its battles, in the order of the story.</p></div></section>
<section style="padding-top:28px"><div class="wrap">${soundtrackBody({ tracks, cover, artist: DWM.title, album: 'La Sua Origine · Original Soundtrack', note: `Music composed by ${DWM.author}.`, volKey: 'dwm-vol' })}</div></section>`;
    return page({ title: `Soundtrack · ${DWM.title}`, description: `Listen to the original soundtrack of Dark Within Me, composed by ${DWM.author}.`, path: `${DWM_BASE}/soundtrack`, active: 'soundtrack', body, css: MMX_SOUNDTRACK_CSS });
}

// ---------------------------------------------------------------- routes
const html = (body) => new Response(body, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'public, max-age=60' } });

export async function handleDarkWithinMe(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (path === '/dark-within-me' || path === '/dwm' || path === '/darkwithinme') return Response.redirect(`${url.origin}${DWM_BASE}`, 301);
    if (path !== DWM_BASE && !path.startsWith(`${DWM_BASE}/`)) return null;
    const rest = path.slice(DWM_BASE.length);
    if (rest === '') return html(mainPage());
    if (rest === '/story') return html(await storyPage());
    if (rest === '/characters') return html(charactersPage());
    if (rest === '/locations') return html(locationsPage());
    if (rest === '/universe') return html(universePage());
    if (rest === '/legends') return html(await legendsPage());
    if (rest === '/soundtrack') return html(await soundtrackPage());
    return Response.redirect(`${url.origin}${DWM_BASE}`, 302);
}
