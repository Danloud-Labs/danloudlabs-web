// =====================================================================================
// Myncha: Vampires of Exius — pages and routes.
//   /myncha-vampires-of-exius               main page (logo, logline, sections)
//   /myncha-vampires-of-exius/story         the story, act by act (assets/projects/myncha/story.md, read live)
//   /myncha-vampires-of-exius/characters    the characters, by group (#vampires …)
//   /myncha-vampires-of-exius/characters/x  a character's profile (myncha-characters.js)
//   /myncha-vampires-of-exius/curse         the diamond curse, the hunger, the guilt, her powers and arts
//   /myncha-vampires-of-exius/exius         the world beyond the Mirror of Fate
//   /myncha-vampires-of-exius/bestiary      enemies, mini-bosses and bosses
//   /myncha-vampires-of-exius/locations     the places, real world and Exius
//   /myncha-vampires-of-exius/gallery       the art (assets/projects/myncha/gallery.json, read live)
//   /myncha-vampires-of-exius/soundtrack    the music (assets/projects/myncha/soundtrack.json, MP3s in R2)
//   /myncha, /myncha-vampires, /exius        -> main page
// The Worker's fetch() calls handleMyncha(request) first; it returns null for other paths.
// Story format: "## Label: Title" starts an act, *text* is italic, *** is a scene break.
// =====================================================================================

import { MY, MY_ARTS, MY_BASE, MY_BESTIARY, MY_CURSE, MY_EXIUS, MY_POWERS, MY_REGIONS, MY_SECTIONS, findCharacter, myAsset } from './myncha-data.js';
import { LOGO, frame, head, page, pageHead } from './myncha-layout.js';
import { characterPage, charactersPage } from './myncha-characters.js';
import { esc } from './site-layout.js';
import { MMX_SOUNDTRACK_CSS, soundtrackBody } from './mmx9-soundtrack.js';

// Kept so an older worker.js that still imports it keeps deploying; the pages come from handleMyncha.
export const htmlMyncha = '';

async function loadLive(file, json) {
    try {
        const res = await fetch(`${myAsset(file)}?m=${Math.floor(Date.now() / 60000)}`, { cf: { cacheTtl: 60, cacheEverything: true } });
        if (res.ok) return json ? await res.json() : await res.text();
    } catch (_) { /* the page shows what it can without it */ }
    return json ? {} : '';
}

function parseStory(md) {
    const acts = [];
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
            acts.push(cur);
        } else if (line === '***') {
            flush();
            if (cur) cur.html.push('<p class="scene">* * *</p>');
        } else if (line.startsWith('# ') || !line) {
            flush();
        } else if (cur) {
            para.push(line);
        }
    }
    flush();
    return acts;
}

// ---------------------------------------------------------------- main page
function mainPage() {
    const body = `
<section class="my-hero"><div class="wrap">
    <img class="logo" src="${LOGO}" alt="${esc(MY.title)}">
    <p class="lead">${esc(MY.logline)}</p>
    <p class="tag">${esc(MY.tagline)}</p>
    <div class="cta-row"><a class="btn btn-primary" href="${MY_BASE}/story">Read the story</a><a class="btn btn-ghost" href="${MY_BASE}/curse">The curse</a></div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
    ${head('Explore', `The world of <span class="grad-bv">Myncha</span>`)}
    <div class="mmx-sections">${MY_SECTIONS.map((s) => `<a class="mmx-section reveal" href="${MY_BASE}/${s.key}">${frame(`sections/${s.key}.webp`, s.name, 'wide sec-art')}<div class="txt"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="st">Explore</span></div></a>`).join('')}</div>
</div></section>`;
    return page({ title: `${MY.title} · Danloud Labs`, description: MY.logline, path: MY_BASE, active: '', body });
}

// ---------------------------------------------------------------- story
async function storyPage() {
    const acts = parseStory(await loadLive('story.md'));
    const id = (k) => `act-${k + 1}`;
    const num = (c) => { const w = c.label.split(' ').pop(); return /^(\d+|[IVX]+)$/.test(w) ? w : '·'; };
    const reader = acts.length ? `
    <div class="toc-mobile"><select class="tocsel" aria-label="Jump to act">${acts.map((c, k) => `<option value="${id(k)}">${esc(c.label ? `${c.label}: ${c.title}` : c.title)}</option>`).join('')}</select></div>
    <div class="story">
        <nav class="toc" aria-label="Acts"><h4>Acts</h4>${acts.map((c, k) => `<a href="#${id(k)}" data-ch="${id(k)}"><span>${esc(num(c))}</span>${esc(c.title)}</a>`).join('')}</nav>
        <div class="chapters">${acts.map((c, k) => `
            <article class="chapter" id="${id(k)}">
                ${frame(`story/act-${String(k + 1).padStart(2, '0')}.webp`, c.label || c.title, 'wide ch-art')}
                ${c.label ? `<div class="num">${esc(c.label)}</div>` : ''}
                <h2>${esc(c.title)}</h2>
                ${c.html.join('\n')}
            </article>`).join('')}
            <div class="continues"><h3>The story continues</h3><p>On the other side of the mirror, Myncha will uncover the mysteries of Exius, find allies who were once human like her, and face the seven emissaries of the Church, one by one, on the way to the one she lost. Those chapters are still being written.</p></div>
        </div>
    </div>` : '<div class="st-empty">The story is on its way.</div>';
    const body = `
${pageHead('The Story', `The story of <span class="grad-bv">Myncha</span>`, 'From a night on the dance floor to the other side of the Mirror of Fate.')}
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
    return page({ title: `The Story · ${MY.title}`, description: `The story of ${MY.title}, an original story by ${MY.author}.`, path: `${MY_BASE}/story`, active: 'story', body });
}

// ---------------------------------------------------------------- the curse
function cursePage() {
    const body = `
${pageHead('The Curse', `What it means to be <span class="grad-blood">Myncha</span>`, 'The vampire who remade her left her more than fangs: a body that turns to diamond, a hunger that never sleeps, and a conscience that refuses to die.')}
<section style="padding-top:24px"><div class="wrap">${MY_CURSE.map((c) => `
    <article class="curse reveal" id="${c.key}" style="--cc:${c.color}">
        ${frame(`curse/${c.key}.webp`, c.name, 'wide')}
        <div><h2>${esc(c.name)}</h2>${c.text.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
    </article>`).join('')}
</div></section>
<section style="padding-top:10px" id="powers"><div class="wrap">
    ${head('Her Gifts', 'The powers <span class="grad-bv">of the night</span>')}
    <div class="powers">${MY_POWERS.map((p) => `<div class="power reveal"><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p></div>`).join('')}</div>
</div></section>
<section style="padding-top:10px" id="arts"><div class="wrap">
    ${head('Her Arts', 'How Myncha <span class="grad-bv">fights</span>')}
    <div class="arts">${MY_ARTS.map((a) => `<div class="art"><b>${esc(a.name)}</b><span>${esc(a.text)}</span></div>`).join('')}</div>
</div></section>`;
    return page({ title: `The Curse · ${MY.title}`, description: 'The diamond curse, the hunger for blood, the weight of guilt and the powers of Myncha.', path: `${MY_BASE}/curse`, active: 'curse', body });
}

// ---------------------------------------------------------------- exius
function exiusPage() {
    const body = `
${pageHead('Exius', `The world <span class="grad-bv">beyond the mirror</span>`, 'The same Earth, rolled back into a distant, magical past.')}
<section style="padding-top:24px"><div class="wrap"><div class="lore">${MY_EXIUS.map((e) => `
    <article class="place reveal" id="${e.key}">${frame(`exius/${e.key}.webp`, e.name, 'wide')}<div class="pi"><h3>${esc(e.name)}</h3><p>${esc(e.text)}</p></div></article>`).join('')}
</div></div></section>`;
    return page({ title: `Exius · ${MY.title}`, description: 'Exius, the magical world on the other side of the Mirror of Fate.', path: `${MY_BASE}/exius`, active: 'exius', body });
}

// ---------------------------------------------------------------- bestiary
function bestiaryPage() {
    const body = `
${pageHead('Bestiary', `The creatures <span class="grad-blood">of Exius</span>`, 'What waits in the woods, the ruins and the dark. More entries will be added as the story is told.')}
<section style="padding-top:0"><div class="wrap"><div class="rjump">${MY_BESTIARY.map((g) => `<a href="#${g.key}" style="--rc:${g.color}">${esc(g.name)}</a>`).join('')}</div></div></section>
${MY_BESTIARY.map((g) => `
<section class="region" id="${g.key}" style="--rc:${g.color}"><div class="wrap">
    <h2 class="region-h">${esc(g.name)}</h2>
    <div class="entries">${g.entries.map((e) => `
        <article class="entry reveal" id="${e.key}">${frame(`bestiary/${e.key}.webp`, e.name, 'wide')}<div class="pi"><h3>${esc(e.name)}</h3><p>${esc(e.text)}</p></div></article>`).join('')}
    </div>
</div></section>`).join('')}`;
    return page({ title: `Bestiary · ${MY.title}`, description: `The creatures of ${MY.title}.`, path: `${MY_BASE}/bestiary`, active: 'bestiary', body });
}

// ---------------------------------------------------------------- locations
function locationsPage() {
    const body = `
${pageHead('Locations', `From The Basement <span class="grad-bv">to Exius</span>`, 'The places of the real world where it began, and the places beyond the mirror.')}
<section style="padding-top:0"><div class="wrap"><div class="rjump">${MY_REGIONS.map((g) => `<a href="#${g.key}" style="--rc:${g.color}">${esc(g.name)}</a>`).join('')}</div></div></section>
${MY_REGIONS.map((g) => `
<section class="region" id="${g.key}" style="--rc:${g.color}"><div class="wrap">
    <h2 class="region-h">${esc(g.name)}<small>${g.places.length} places</small></h2>
    <div class="places">${g.places.map((l) => `
        <article class="place reveal" id="${l.key}">${frame(`locations/${l.key}.webp`, l.name, 'wide')}<div class="pi"><h3>${esc(l.name)}</h3><small>${esc(l.where)}</small><p>${esc(l.text)}</p></div></article>`).join('')}
    </div>
</div></section>`).join('')}`;
    return page({ title: `Locations · ${MY.title}`, description: `The locations of ${MY.title}.`, path: `${MY_BASE}/locations`, active: 'locations', body });
}

// ---------------------------------------------------------------- gallery
// Images: assets/projects/myncha/gallery/, listed in gallery.json by tools/myncha_gallery.mjs.
async function galleryPage() {
    const items = (await loadLive('gallery.json', true)).images || [];
    const grid = items.length
        ? `<div class="my-gallery">${items.map((g) => `<figure data-zoom="${myAsset(g.src)}"><img src="${myAsset(g.src)}" alt="${esc(g.caption || MY.title)}" loading="lazy">${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}</figure>`).join('')}</div>`
        : '<div class="gallery-empty"><h3>The gallery opens soon.</h3><p>The art of Myncha and Exius is being created right now.</p></div>';
    const body = `
${pageHead('Gallery', `The art of <span class="grad-bv">Myncha</span>`, 'Concept art, key art and wallpapers. Click an image to see it full size.')}
<section style="padding-top:24px"><div class="wrap">${grid}</div></section>
<div class="lb" id="lb"><img alt=""></div>
<script>
document.addEventListener('click', (e) => {
    const lb = document.getElementById('lb');
    const t = e.target.closest('[data-zoom]');
    if (t) { lb.querySelector('img').src = t.dataset.zoom; lb.classList.add('open'); return; }
    lb.classList.remove('open');
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') document.getElementById('lb').classList.remove('open'); });
</script>`;
    return page({ title: `Gallery · ${MY.title}`, description: `Art from ${MY.title}.`, path: `${MY_BASE}/gallery`, active: 'gallery', body });
}

// ---------------------------------------------------------------- soundtrack
// Tracks: assets/projects/myncha/soundtrack.json, written by tools/myncha_media.mjs (MP3s in R2).
async function soundtrackPage() {
    const tracks = (await loadLive('soundtrack.json', true)).tracks || [];
    const body = `
${pageHead('Soundtrack', `The music of <span class="grad-bv">Myncha</span>`, 'Exius… I will find you.')}
<section style="padding-top:28px"><div class="wrap">${soundtrackBody({ tracks, cover: () => LOGO, artist: MY.title, album: 'Original Soundtrack', note: `Music created by ${MY.author} with Suno.`, volKey: 'myncha-vol' })}</div></section>`;
    return page({ title: `Soundtrack · ${MY.title}`, description: `Listen to the music of ${MY.title}.`, path: `${MY_BASE}/soundtrack`, active: 'soundtrack', body, css: MMX_SOUNDTRACK_CSS });
}

// ---------------------------------------------------------------- routes
const html = (body) => new Response(body, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'public, max-age=60' } });

export async function handleMyncha(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (path === '/myncha' || path === '/myncha-vampires' || path === '/exius') return Response.redirect(`${url.origin}${MY_BASE}`, 301);
    if (path !== MY_BASE && !path.startsWith(`${MY_BASE}/`)) return null;
    const rest = path.slice(MY_BASE.length);
    if (rest === '') return html(mainPage());
    if (rest === '/story') return html(await storyPage());
    if (rest === '/characters') return html(charactersPage());
    if (rest.startsWith('/characters/')) {
        const c = findCharacter(rest.slice('/characters/'.length));
        return c ? html(characterPage(c)) : Response.redirect(`${url.origin}${MY_BASE}/characters`, 302);
    }
    if (rest === '/curse') return html(cursePage());
    if (rest === '/exius') return html(exiusPage());
    if (rest === '/bestiary') return html(bestiaryPage());
    if (rest === '/locations') return html(locationsPage());
    if (rest === '/gallery') return html(await galleryPage());
    if (rest === '/soundtrack') return html(await soundtrackPage());
    return Response.redirect(`${url.origin}${MY_BASE}`, 302);
}
