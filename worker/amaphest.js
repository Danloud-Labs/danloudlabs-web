// =====================================================================================
// Amaphest: The Amalion Progenitor — pages and routes.
//   /amaphest-amalion-progenitor                       main page
//   /amaphest-amalion-progenitor/characters            all characters
//   /amaphest-amalion-progenitor/characters/<slug>     one character
//   /amaphest-amalion-progenitor/gallery               gallery
//   /amaphest                                          -> main page
// The Worker's fetch() calls handleAmaphest(request) first; it returns null for other paths.
// =====================================================================================

import { AMA, AMA_BASE, AMA_CHARACTERS, AMA_FACTIONS, AMA_GALLERY, AMA_GROUPS, AMA_MANIFEST, AMA_SECTIONS, AMA_UNIVERSE, amaAsset, findCharacter, findFaction } from './amaphest-data.js';
import { AMA_CSS } from './amaphest-styles.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');
const charHref = (c) => `${AMA_BASE}/characters/${c.slug}`;

// Art manifest written by tools/amaphest_assets.py, read live (edge cache 5 min).
async function loadArt() {
    try {
        const res = await fetch(AMA_MANIFEST, { cf: { cacheTtl: 300, cacheEverything: true } });
        if (res.ok) return await res.json();
    } catch (_) { /* pages still render with placeholders */ }
    return { characters: {}, brand: {} };
}

// Resolves a character's art: its forms (with images) and the default form.
function artFor(c, manifest) {
    const a = (manifest.characters || {})[c.art || c.slug] || {};
    const url = (p) => (p ? amaAsset(p) : '');
    let forms = (a.forms || []).map((f) => ({ ...f, profile: url(f.profile), wallpaper: url(f.wallpaper), turnaround: url(f.turnaround), note: (c.forms || {})[f.slug] || '' }));
    if (!forms.length && (a.profile || a.wallpaper || a.turnaround)) {
        forms = [{ slug: 'default', name: '', profile: url(a.profile), wallpaper: url(a.wallpaper), turnaround: url(a.turnaround), note: '' }];
    }
    const def = forms.find((f) => f.slug === c.defaultForm) || forms[0] || null;
    return { forms, def };
}

const initials = (name) => name.replace(/^(Dr\.|General)\s+/, '').split(/\s+/).map((w) => w[0]).slice(0, 2).join('');

function charCard(c, manifest) {
    const { def } = artFor(c, manifest);
    const pic = def && def.profile
        ? `<img src="${def.profile}" alt="${esc(c.alias || c.name)}" loading="lazy">`
        : `<span class="soon">Art coming soon</span><span class="mono">${esc(c.alias ? c.alias.replace(/^AMA-/, '').slice(0, 4) : initials(c.name))}</span>`;
    return `
    <a class="char reveal" href="${charHref(c)}" style="--cc:${c.color}">
        <div class="pic">${pic}</div>
        <div class="meta">${c.alias ? `<small>${esc(c.alias)}</small>` : `<small>${esc((findFaction(c.faction) || {}).name || '')}</small>`}<b>${esc(c.name)}</b><span>${esc(c.role || '')}</span></div>
    </a>`;
}

function amaNav(active, manifest) {
    const logo = manifest.brand && manifest.brand.logo ? `<a href="${AMA_BASE}" style="padding:0;border:0;background:none"><img src="${amaAsset(manifest.brand.logo)}" alt="Amaphest"></a>` : '';
    const links = [['', 'Home'], ...AMA_SECTIONS.map((s) => [s.key, s.name, s.status])];
    return `<div class="ama-nav"><div class="wrap">${logo}${links.map(([k, n, st]) => (st === 'soon' && k !== 'gallery'
        ? `<span>${esc(n)}<small>Soon</small></span>`
        : `<a href="${AMA_BASE}${k ? `/${k}` : ''}"${active === k ? ' class="on"' : ''}>${esc(n)}</a>`)).join('')}</div></div>`;
}

const lightbox = `<div class="lb" id="lb"><img alt=""></div>
<script>
document.addEventListener('click', (e) => {
    const lb = document.getElementById('lb'); if (!lb) return;
    const t = e.target.closest('[data-zoom]');
    if (t) { lb.querySelector('img').src = t.dataset.zoom; lb.classList.add('open'); return; }
    if (lb.classList.contains('open')) lb.classList.remove('open');
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { const lb = document.getElementById('lb'); lb && lb.classList.remove('open'); } });
</script>`;

function page({ title, description, path, active, manifest, ogImage, body }) {
    return sitePage({
        title, description, path, ogImage,
        icon: manifest.brand && manifest.brand.logo ? amaAsset(manifest.brand.logo) : undefined,
        active: 'projects',
        back: { href: '/#projects', label: 'Projects' },
        head: `<style>${AMA_CSS}</style>`,
        body: `<div class="ama">${amaNav(active, manifest)}${body}</div>${lightbox}`,
    });
}

// ---------------------------------------------------------------- main page
function mainPage(manifest) {
    const banner = manifest.brand && manifest.brand.banner ? amaAsset(manifest.brand.banner) : '';
    const logo = manifest.brand && manifest.brand.logo ? amaAsset(manifest.brand.logo) : '';
    const featured = AMA_CHARACTERS.filter((c) => c.group === 'main' || c.group === 'pilots');
    const body = `
<section class="cine" style="padding:0">
    <div class="bg" style="background-image:url('${banner}')"></div>
    <div class="sparks"></div>
    <div class="wrap">
        ${logo ? `<img class="logo" src="${logo}" alt="${esc(AMA.title)}: ${esc(AMA.subtitle)}">` : `<h1>${esc(AMA.title)}</h1>`}
        <p class="lead" style="font-size:clamp(17px,2vw,21px)"><b style="color:#fff">${esc(AMA.tagline)}</b> ${esc(AMA.logline)}</p>
        <div class="cta-row" style="justify-content:flex-start">
            <a class="btn btn-primary" href="${AMA_BASE}/characters">Meet the characters</a>
            <a class="btn btn-ghost" href="#universe">The universe</a>
        </div>
        <p class="credit">An original story by ${esc(AMA.creator)} · Danloud Labs</p>
    </div>
</section>

<section id="universe">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">The universe</span><h2>Two energies. <span class="grad-ab">One heart.</span></h2></div></div>
        <div class="trio">${AMA_UNIVERSE.map((u) => `<div class="card reveal" style="--tc:${u.c}"><h3>${esc(u.k)}</h3><p>${esc(u.t)}</p></div>`).join('')}</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        <div class="section-head reveal">
            <div><span class="eyebrow">Characters</span><h2>Who fights for the Amalion.</h2></div>
            <a class="btn btn-ghost btn-sm" href="${AMA_BASE}/characters">All characters ${small(ICONS.arrow)}</a>
        </div>
        <div class="chars">${featured.map((c) => charCard(c, manifest)).join('')}</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Explore</span><h2>The world of Amaphest</h2></div></div>
        <div class="ama-sections">${AMA_SECTIONS.map((s) => (s.status === 'live' || s.key === 'gallery'
        ? `<a class="ama-section reveal" href="${AMA_BASE}/${s.key}"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="st ${s.status}">${s.status === 'live' ? 'Explore' : 'Coming soon'}</span></a>`
        : `<div class="ama-section reveal"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="st soon">Coming soon</span></div>`)).join('')}</div>
    </div>
</section>`;
    return page({ title: `${AMA.title}: ${AMA.subtitle} · Danloud Labs`, description: `${AMA.tagline} ${AMA.logline}`, path: AMA_BASE, active: '', manifest, ogImage: banner, body });
}

// ---------------------------------------------------------------- characters
function charactersPage(manifest) {
    const groups = AMA_GROUPS.map((g) => {
        const list = AMA_CHARACTERS.filter((c) => c.group === g.key);
        return `<div class="ama-group"><h3>${esc(g.name)}</h3>${g.sub ? `<p>${esc(g.sub)}</p>` : '<p></p>'}<div class="chars${g.key === 'secondary' ? ' sm' : ''}">${list.map((c) => charCard(c, manifest)).join('')}</div></div>`;
    }).join('');
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">Characters</span><h1>The cast of <span class="grad-ab">Amaphest</span></h1>
<p class="lead">Heroes, pilots, scientists and soldiers caught in the war for the Amalion.</p></div></section>
<section style="padding-top:28px"><div class="wrap">${groups}
    <div class="ama-group"><h3>Factions</h3><p>The powers behind every side.</p>
    <div class="facs">${AMA_FACTIONS.map((f) => `<div class="fac reveal" style="--fc:${f.color}"><b>${esc(f.name)}</b><p>${esc(f.text)}</p></div>`).join('')}</div></div>
</div></section>`;
    return page({ title: `Characters · ${AMA.title}`, description: `Meet the characters of ${AMA.title}: ${AMA.subtitle}.`, path: `${AMA_BASE}/characters`, active: 'characters', manifest, body });
}

function characterPage(c, manifest) {
    const { forms, def } = artFor(c, manifest);
    const i = AMA_CHARACTERS.indexOf(c);
    const prev = AMA_CHARACTERS[(i - 1 + AMA_CHARACTERS.length) % AMA_CHARACTERS.length];
    const next = AMA_CHARACTERS[(i + 1) % AMA_CHARACTERS.length];
    const faction = findFaction(c.faction);
    const f0 = def || {};
    const formButtons = forms.length > 1 ? `<div class="forms" id="forms">${forms.map((f) => `<button type="button" data-form='${esc(JSON.stringify({ p: f.profile, w: f.wallpaper, t: f.turnaround, n: f.note }))}'${f === def ? ' class="on"' : ''}>${f.profile ? `<img src="${f.profile}" alt="">` : ''}${esc(f.name)}</button>`).join('')}</div>` : '';
    const facts = [...(c.alias ? [['Alias', c.alias]] : []), ...(c.facts || []), ...(faction ? [['Faction', faction.name]] : [])];
    const body = `
<section class="ch-hero" style="--cc:${c.color};padding:0">
    <div class="stage${f0.wallpaper ? '' : ' empty'}" id="stage">${f0.wallpaper ? `<img class="wp" id="wp" src="${f0.wallpaper}" alt="">` : ''}</div>
    <div class="over"><div class="wrap">
        <div class="avatar" id="avatar">${f0.profile ? `<img src="${f0.profile}" alt="${esc(c.name)}">` : `<div class="char" style="--cc:${c.color};border:0;height:100%;border-radius:0"><div class="pic" style="height:100%"><span class="mono" style="font-size:40px">${esc(initials(c.name))}</span></div></div>`}</div>
        <div>
            ${c.alias ? `<div class="alias">${esc(c.alias)}</div>` : ''}
            <h1>${esc(c.name)}</h1>
            <div class="ch-role">${esc(c.role || '')}</div>
        </div>
    </div></div>
</section>
<section style="--cc:${c.color};padding-top:30px">
    <div class="wrap">
        ${formButtons}
        <div class="ch-body" style="margin-top:18px">
            <div class="bio">
                ${c.bio.map((p) => `<p>${esc(p)}</p>`).join('')}
                <p class="form-note" id="note">${esc(f0.note || '')}</p>
            </div>
            <div class="card"><table class="facts">${facts.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table></div>
        </div>
        <div id="turnwrap" style="margin-top:34px${f0.turnaround ? '' : ';display:none'}">
            <div class="section-head" style="margin-bottom:16px"><div><span class="eyebrow">Character sheet</span><h2 style="font-size:26px">Front &amp; back</h2></div></div>
            <div class="turn" id="turn" data-zoom="${f0.turnaround || ''}"><img id="turnimg" src="${f0.turnaround || ''}" alt="${esc(c.name)} front and back" loading="lazy"></div>
        </div>
        <div class="pn" style="margin-top:44px">
            <a href="${charHref(prev)}"><span>&larr;</span><span><small>Previous</small><b>${esc(prev.alias || prev.name)}</b></span></a>
            <a class="next" href="${charHref(next)}"><span><small>Next</small><b>${esc(next.alias || next.name)}</b></span><span>&rarr;</span></a>
        </div>
        <p style="margin-top:22px"><a class="btn btn-ghost btn-sm" href="${AMA_BASE}/characters">&larr; All characters</a></p>
    </div>
</section>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('forms'); if (!bar) return;
    bar.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        bar.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        const d = JSON.parse(b.dataset.form);
        const stage = document.getElementById('stage');
        let wp = document.getElementById('wp');
        if (d.w) { if (!wp) { wp = document.createElement('img'); wp.id = 'wp'; wp.className = 'wp'; wp.alt = ''; stage.appendChild(wp); } wp.style.opacity = 0; wp.onload = () => { wp.style.opacity = 1; }; wp.src = d.w; stage.classList.remove('empty'); }
        const av = document.querySelector('#avatar img'); if (av && d.p) av.src = d.p;
        document.getElementById('note').textContent = d.n || '';
        const tw = document.getElementById('turnwrap');
        if (d.t) { tw.style.display = ''; document.getElementById('turnimg').src = d.t; document.getElementById('turn').dataset.zoom = d.t; } else { tw.style.display = 'none'; }
    });
});
</script>`;
    return page({
        title: `${c.alias ? `${c.alias} · ` : ''}${c.name} · ${AMA.title}`,
        description: `${c.name}${c.alias ? ` (${c.alias})` : ''}, ${c.role} in ${AMA.title}: ${AMA.subtitle}. ${c.bio[0]}`.slice(0, 300),
        path: charHref(c), active: 'characters', manifest, ogImage: f0.wallpaper || f0.profile, body,
    });
}

function galleryPage(manifest) {
    const items = AMA_GALLERY.map((g) => ({ ...g, src: amaAsset(g.src) }));
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">Gallery</span><h1>Art of <span class="grad-ab">Amaphest</span></h1>
<p class="lead">Key art, concept art and wallpapers from the world of the Amalion Progenitor.</p></div></section>
<section style="padding-top:28px"><div class="wrap">
${items.length ? `<div class="ama-gallery">${items.map((g) => `<figure data-zoom="${g.src}"><img src="${g.src}" alt="${esc(g.caption || '')}" loading="lazy"></figure>`).join('')}</div>`
        : `<div class="gallery-empty"><h3 style="font-size:22px;margin-bottom:6px">The gallery opens soon.</h3><p style="margin:0">New art is being created right now.</p></div>`}
</div></section>`;
    return page({ title: `Gallery · ${AMA.title}`, description: `Art from ${AMA.title}: ${AMA.subtitle}.`, path: `${AMA_BASE}/gallery`, active: 'gallery', manifest, body });
}

// ---------------------------------------------------------------- routes
const html = (body) => new Response(body, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'public, max-age=300' } });

export async function handleAmaphest(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (path === '/amaphest') return Response.redirect(`${url.origin}${AMA_BASE}`, 301);
    if (path !== AMA_BASE && !path.startsWith(`${AMA_BASE}/`)) return null;
    const rest = path.slice(AMA_BASE.length);
    const manifest = await loadArt();
    if (rest === '') return html(mainPage(manifest));
    if (rest === '/characters') return html(charactersPage(manifest));
    if (rest === '/gallery') return html(galleryPage(manifest));
    const m = rest.match(/^\/characters\/([a-z0-9-]+)$/);
    if (m && findCharacter(m[1])) return html(characterPage(findCharacter(m[1]), manifest));
    return Response.redirect(`${url.origin}${AMA_BASE}`, 302);
}

// Kept so the existing `import { htmlAmaphest } from './amaphest.js'` in index.js still loads.
export const htmlAmaphest = '';
