// =====================================================================================
// Mega Man X9: Apex-Primal (fan-made) — pages and routes.
//   /mmx9-beastwars-fm                       main page (hero, trailer, premise, cast, bosses)
//   /mmx9-beastwars-fm/story                 the fifteen chapters
//   /mmx9-beastwars-fm/characters            Maverick Hunters + factions
//   /mmx9-beastwars-fm/characters/<slug>     one character (bosses show their stats)
//   /mmx9-beastwars-fm/mavericks             the eight Mavericks (boss compendium; /bosses redirects here)
//   /mmx9-beastwars-fm/weapons               special weapons, one tab per character (#x, #zero…)
//   /mmx9-beastwars-fm/universe              the Apex Virus, CFE, Beastroids, Sigma Chip…
//   /mmx9, /megaman-x9                       -> main page
// The Worker's fetch() calls handleMMX9(request) first; it returns null for other paths.
// =====================================================================================

import { MMX, MMX_BASE, MMX_FALLBACK, MMX_GROUPS, MMX_LORE, MMX_MANIFEST, MMX_PREMISE, MMX_SECTIONS, mmxAsset } from './mmx9-data.js';
import { MMX_BOSSES, MMX_CHARACTERS, MMX_FACTIONS, factionMembers, findCharacter, findFaction } from './mmx9-characters.js';
import { MMX_ACTS, MMX_CHAPTERS } from './mmx9-story.js';
import { MMX_CSS } from './mmx9-styles.js';
import { MMX_WEAPON_USERS, weaponOf } from './mmx9-weapons.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');
const charHref = (c) => `${MMX_BASE}/characters/${c.slug}`;

// Art manifest written by tools/mmx9_assets.py, read live (edge cache 1 min).
async function loadArt() {
    try {
        const res = await fetch(`${MMX_MANIFEST}?m=${Math.floor(Date.now() / 60000)}`, { cf: { cacheTtl: 60, cacheEverything: true } });
        if (res.ok) return await res.json();
    } catch (_) { /* pages still render with placeholders */ }
    return { characters: {}, factions: {}, universe: {}, brand: {} };
}

const brandArt = (m) => ({
    logo: m.brand && m.brand.logo ? mmxAsset(m.brand.logo) : MMX_FALLBACK.logo,
    banner: m.brand && m.brand.banner ? mmxAsset(m.brand.banner) : MMX_FALLBACK.banner,
});

// Same slug as tools/mmx9_assets.py: "Cryo Stampede" -> cryo-stampede.
const slugify = (s) => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// A character's art: profile, wallpaper, turnaround (each may be missing), plus its forms
// (iCloud subfolders such as X's armors). The default form leads; cards use the character's
// own art and fall back to the default form's.
function artFor(c, m) {
    const a = (m.characters || {})[c.slug] || {};
    const url = (p) => (p ? mmxAsset(p) : '');
    const pack = (f) => ({ profile: url(f.profile), wallpaper: url(f.wallpaper), turnaround: url(f.turnaround) });
    // Tabs come from the character data (shown even without art); art-only forms are appended.
    const artForms = a.forms || [];
    const listed = (c.forms || []).map((f) => ({ slug: f.slug, name: f.name, note: f.note || '', ...pack(artForms.find((x) => x.slug === f.slug) || {}) }));
    const extra = artForms.filter((x) => !listed.some((f) => f.slug === x.slug)).map((f) => ({ slug: f.slug, name: f.name, note: '', ...pack(f) }));
    let forms = [...listed, ...extra];
    const def = forms.find((f) => f.slug === c.defaultForm) || forms[0];
    if (def) forms = [def, ...forms.filter((f) => f !== def)];
    const own = pack(a);
    const art = def ? { profile: own.profile || def.profile, wallpaper: own.wallpaper || def.wallpaper, turnaround: own.turnaround || def.turnaround } : own;
    return { ...art, forms, def };
}

// Placeholder letters: "Dr. Elaine Clark" -> EC, "Arctic Woolly Mammoth" -> AW, "X" -> X.
const initials = (name) => {
    const words = name.replace(/^Dr\.\s+/, '').split(/\s+/);
    return words.length > 1 ? words.map((w) => w[0]).slice(0, 2).join('') : (words[0].length <= 4 ? words[0] : words[0][0]);
};

const picOrMono = (c, art, cls = '') => (art.profile
    ? `<img src="${art.profile}" alt="${esc(c.name)}" loading="lazy">`
    : `${cls ? `<span class="${cls}">Art coming soon</span>` : ''}<span class="mono">${esc(initials(c.name))}</span>`);

function charCard(c, m) {
    const art = artFor(c, m);
    const top = c.alias || (findFaction(c.faction) || {}).name || (c.boss ? 'Maverick' : 'Maverick Hunters');
    return `
    <a class="char reveal" href="${charHref(c)}" style="--cc:${c.color}">
        <div class="pic">${picOrMono(c, art, 'soon')}</div>
        <div class="meta"><small>${esc(top)}</small><b>${esc(c.name)}</b><span>${esc(c.role || '')}</span></div>
    </a>`;
}

function bossCard(c, m) {
    const art = artFor(c, m);
    const b = c.boss;
    return `
    <a class="boss reveal" href="${charHref(c)}" style="--cc:${c.color}">
        <div class="pic">${picOrMono(c, art)}</div>
        <div class="info">
            <div><small>${esc(b.element)}</small><b>${esc(c.name)}</b></div>
            <dl>
                <dt>Stage</dt><dd>${esc(b.stage)}</dd>
                <dt>Apex form</dt><dd>${esc(b.mutation)}</dd>
                <dt>Weakness</dt><dd><span class="chip weak">${esc(b.weakness)}</span></dd>
                <dt>X weapon</dt><dd><span class="chip">${esc(weaponOf('x', c.slug) || 'To be revealed')}</span></dd>
            </dl>
        </div>
    </a>`;
}

function mmxNav(active, m) {
    const links = [['', 'Home'], ...MMX_SECTIONS.map((s) => [s.key, s.nav || s.name])];
    return `<div class="mmx-nav"><div class="wrap"><a href="${MMX_BASE}" style="padding:0;border:0;background:none"><img src="${brandArt(m).logo}" alt="Mega Man X9: Apex-Primal"></a>${links.map(([k, n]) => `<a href="${MMX_BASE}${k ? `/${k}` : ''}"${active === k ? ' class="on"' : ''}>${esc(n)}</a>`).join('')}</div></div>`;
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

const fanNote = `<section style="padding-top:0"><div class="wrap"><p class="fan-note">${esc(MMX.disclaimer)}</p></div></section>`;

function page({ title, description, path, active, m, ogImage, body }) {
    return sitePage({
        title, description, path, ogImage: ogImage || brandArt(m).banner,
        icon: MMX_FALLBACK.icon,
        active: 'projects',
        back: { href: '/#projects', label: 'Projects' },
        head: `<style>${MMX_CSS}</style>`,
        body: `<div class="mmx">${mmxNav(active, m)}${body}${fanNote}</div>${lightbox}`,
    });
}

const head = (eyebrow, title, link) => `<div class="section-head reveal"><div><span class="eyebrow">${esc(eyebrow)}</span><h2>${title}</h2></div>${link ? `<a class="btn btn-ghost btn-sm" href="${link[0]}">${esc(link[1])} ${small(ICONS.arrow)}</a>` : ''}</div>`;

// ---------------------------------------------------------------- main page
function mainPage(m) {
    const { banner, logo } = brandArt(m);
    const hunters = MMX_CHARACTERS.filter((c) => c.group === 'main');
    const featured = [...hunters.filter((c) => ['x', 'zero', 'axl'].includes(c.slug)), findCharacter('gamma'), findCharacter('hemma'), findCharacter('dynamo')];
    const body = `
<section class="cine" style="padding:0">
    <div class="bg" style="background-image:url('${banner}');--focus:${MMX.bannerFocus}"></div>
    <div class="scan"></div>
    <div class="wrap">
        <img class="logo" src="${logo}" alt="${esc(MMX.title)}: ${esc(MMX.subtitle)}">
        <p class="lead" style="font-size:clamp(17px,2vw,21px)"><b style="color:#fff">${esc(MMX.tagline)}</b> ${esc(MMX.logline)}</p>
        <div class="cta-row" style="justify-content:flex-start">
            <a class="btn btn-primary" href="${MMX_BASE}/story">Read the story</a>
            <a class="btn btn-ghost" href="${MMX_BASE}/characters">Meet the characters</a>
        </div>
        <p class="credit">A fan-made story by ${esc(MMX.creator)} · Danloud Labs</p>
    </div>
</section>

<section>
    <div class="wrap">
        ${head('Trailer', 'Watch the <span class="grad-bv">Apex-Primal</span> trailer.')}
        <div class="trailer reveal"><iframe src="https://www.youtube-nocookie.com/embed/${MMX.trailer}" title="Mega Man X9: Apex-Primal trailer" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        ${head('The Premise', 'A virus that <span class="grad-bv">sets the beast free.</span>', [`${MMX_BASE}/universe`, 'Explore the Universe'])}
        <div class="trio">${MMX_PREMISE.map((u) => { const img = ((m.universe || {}).images || {})[u.key]; return `<a class="card reveal${img ? ' has-art' : ''}" href="${MMX_BASE}/universe#${u.key}" style="--tc:${u.c}">${img ? `<div class="art" style="background-image:url('${mmxAsset(img)}')"></div>` : ''}<div class="txt"><h3>${esc(u.k)}</h3><p>${esc(u.t)}</p></div></a>`; }).join('')}</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        ${head('Characters', 'Hunters, Beastroids and the man behind the virus.', [`${MMX_BASE}/characters`, 'All characters'])}
        <div class="chars six">${featured.map((c) => charCard(c, m)).join('')}</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        ${head('The Mavericks', 'Eight stations. Eight Apex mutations.', [`${MMX_BASE}/mavericks`, 'All Mavericks'])}
        <div class="strip">${MMX_BOSSES.map((c) => { const art = artFor(c, m); return `<a class="reveal" href="${charHref(c)}" style="--cc:${c.color}"><div class="pic">${picOrMono(c, art)}</div><span>${esc(c.name)}</span></a>`; }).join('')}</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        ${head('Explore', 'The world of Apex-Primal')}
        <div class="mmx-sections">${MMX_SECTIONS.map((s) => { const img = (m.sections || {})[s.key]; return `<a class="mmx-section reveal" href="${MMX_BASE}/${s.key}"><div class="art${img ? '' : ' none'}"${img ? ` style="background-image:url('${mmxAsset(img)}')"` : ''}></div><div class="txt"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="st">Explore</span></div></a>`; }).join('')}</div>
    </div>
</section>`;
    return page({ title: `${MMX.title}: ${MMX.subtitle} (fan-made) · Danloud Labs`, description: `${MMX.tagline} ${MMX.logline}`, path: MMX_BASE, active: '', m, body });
}

// Top of a section page: the plain heading, or a big banner when iCloud Sections/<Key>.jpg exists
// (the same art as that section's tile on the main page). Closed by the page's own </div></section>.
const pageHead = (m, key) => {
    const img = (m.sections || {})[key];
    return img
        ? `<section class="page-head page-hero"><div class="bg" style="background-image:url('${mmxAsset(img)}')"></div><div class="wrap">`
        : '<section class="page-head"><div class="wrap">';
};

// ---------------------------------------------------------------- story
function storyPage(m) {
    const label = (c) => (c.n === 0 ? 'Introduction' : `Chapter ${c.n}`);
    const toc = MMX_ACTS.map((a) => `<h4>${esc(a.name)}</h4>${MMX_CHAPTERS.filter((c) => c.n >= a.from && c.n <= a.to).map((c) => `<a href="#chapter-${c.n}" data-ch="${c.n}"><span>${c.n || '·'}</span>${esc(c.title)}</a>`).join('')}`).join('');
    const body = `
${pageHead(m, 'story')}<span class="eyebrow">The Story</span><h1>The chapters of <span class="grad-bv">Apex-Primal</span></h1>
<p class="lead">From a courtroom in the age of Dr. Light to the birth of Apex Sigma: the full story, in fifteen chapters.</p></div></section>
<section style="padding-top:24px"><div class="wrap">
    <div class="spoiler">${small(ICONS.eye)}<span>This page tells the whole story, ending included. Read the Characters and Universe pages first if you want to avoid spoilers.</span></div>
    <div class="toc-mobile"><select id="tocsel" aria-label="Jump to chapter">${MMX_CHAPTERS.map((c) => `<option value="${c.n}">${esc(label(c))}: ${esc(c.title)}</option>`).join('')}</select></div>
    <div class="story">
        <nav class="toc" id="toc" aria-label="Chapters">${toc}</nav>
        <div class="chapters">${MMX_CHAPTERS.map((c) => `
            <article class="chapter" id="chapter-${c.n}">
                <div class="num">${esc(label(c))}</div>
                <h2>${esc(c.title)}</h2>
                ${c.p.map((p) => `<p>${esc(p)}</p>`).join('')}
                ${c.quote ? `<blockquote>${esc(c.quote.text)}<cite>${esc(c.quote.by)}</cite></blockquote>` : ''}
            </article>`).join('')}
        </div>
    </div>
</div></section>
<script>
(() => {
    const links = [...document.querySelectorAll('#toc a')];
    const sel = document.getElementById('tocsel');
    sel && sel.addEventListener('change', () => { const t = document.getElementById('chapter-' + sel.value); t && t.scrollIntoView({ behavior: 'smooth' }); });
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = e.target.id.replace('chapter-', '');
        links.forEach((a) => a.classList.toggle('on', a.dataset.ch === n));
        if (sel) sel.value = n;
    }), { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.chapter').forEach((c) => io.observe(c));
})();
</script>`;
    return page({ title: `The Story · ${MMX.title}: ${MMX.subtitle}`, description: `All fifteen chapters of ${MMX.title}: ${MMX.subtitle}, a fan-made Mega Man X story.`, path: `${MMX_BASE}/story`, active: 'story', m, body });
}

// ---------------------------------------------------------------- characters
function factionButton(f, m, on) {
    const art = ((m.factions || {})[f.key] || {}).banner;
    const n = factionMembers(f.key).length;
    return `<button type="button" class="fac reveal${on ? ' on' : ''}" data-fac="${f.key}" aria-controls="fac-${f.key}" aria-pressed="${on}" style="--fc:${f.color}">${art ? `<span class="bg" style="background-image:url('${mmxAsset(art)}')"></span>` : ''}<b>${esc(f.name)}</b><small>${n} ${n === 1 ? 'member' : 'members'}</small></button>`;
}

function charactersPage(m) {
    const hunters = MMX_CHARACTERS.filter((c) => c.group === 'main');
    const [gMain, gFac] = MMX_GROUPS;
    const body = `
${pageHead(m, 'characters')}<span class="eyebrow">Characters</span><h1>The cast of <span class="grad-bv">Apex-Primal</span></h1>
<p class="lead">Maverick Hunters, a forgotten scientist and her Beastroids, and the villains behind the Apex Virus.</p></div></section>
<section style="padding-top:28px"><div class="wrap">
    <div class="mmx-group"><h3>${esc(gMain.name)}</h3><p>${esc(gMain.sub)}</p><div class="chars six">${hunters.map((c) => charCard(c, m)).join('')}</div></div>
    <div class="mmx-group" id="factions"><h3>${esc(gFac.name)}</h3><p>${esc(gFac.sub)}</p>
        <div class="facs" id="facs">${MMX_FACTIONS.map((f, i) => factionButton(f, m, i === 0)).join('')}</div>
        ${MMX_FACTIONS.map((f, i) => `
        <div class="fac-panel" id="fac-${f.key}" style="--fc:${f.color}"${i === 0 ? '' : ' hidden'}>
            <h3>${esc(f.name)}</h3><p>${esc(f.text)}</p>
            <div class="chars">${factionMembers(f.key).map((c) => charCard(c, m)).join('')}</div>
        </div>`).join('')}
    </div>
</div></section>
<script>
(() => {
    const bar = document.getElementById('facs'); if (!bar) return;
    const show = (key, scroll) => {
        const btn = bar.querySelector('[data-fac="' + key + '"]'); if (!btn) return;
        bar.querySelectorAll('.fac').forEach((b) => { const on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
        document.querySelectorAll('.fac-panel').forEach((p) => { p.hidden = p.id !== 'fac-' + key; });
        const panel = document.getElementById('fac-' + key);
        panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
        if (scroll) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    bar.addEventListener('click', (e) => { const b = e.target.closest('[data-fac]'); if (!b) return; show(b.dataset.fac, true); history.replaceState(null, '', '#' + b.dataset.fac); });
    const h = location.hash.slice(1); if (h) { show(h, false); const p = document.getElementById('factions'); p && p.scrollIntoView(); }
})();
</script>`;
    return page({ title: `Characters · ${MMX.title}: ${MMX.subtitle}`, description: `Meet the characters of ${MMX.title}: ${MMX.subtitle}: the Maverick Hunters, Dr. Clark’s Beastroids, Dynamo and Sigma.`, path: `${MMX_BASE}/characters`, active: 'characters', m, body });
}

function characterPage(c, m) {
    const art = artFor(c, m);
    const i = MMX_CHARACTERS.indexOf(c);
    const prev = MMX_CHARACTERS[(i - 1 + MMX_CHARACTERS.length) % MMX_CHARACTERS.length];
    const next = MMX_CHARACTERS[(i + 1) % MMX_CHARACTERS.length];
    const faction = findFaction(c.faction);
    const b = c.boss;
    const facLink = faction ? `<a href="${MMX_BASE}/characters#${faction.key}">${esc(faction.name)}</a>` : b ? `<a href="${MMX_BASE}/mavericks">The Mavericks</a>` : `<a href="${MMX_BASE}/characters">Maverick Hunters</a>`;
    const facts = [
        ...(c.alias ? [['Alias', esc(c.alias)]] : []),
        ...(b ? [['Stage', esc(b.stage)], ['Element', esc(b.element)], ['Apex form', esc(b.mutation)], ['Weakness', `<span class="chip weak">${esc(b.weakness)}</span>`]] : []),
        ...(b ? MMX_WEAPON_USERS.filter((u) => weaponOf(u.key, c.slug)).map((u) => [`${u.name} weapon`, `<a href="${MMX_BASE}/weapons#${u.key}">${esc(weaponOf(u.key, c.slug))}</a>`]) : []),
        ...(c.facts || []).map(([k, v]) => [k, esc(v)]),
        ['Faction', facLink],
    ];
    // No wallpaper yet: the profile picture, blurred, fills the stage.
    const stageImg = art.wallpaper || art.profile;
    const stageCls = art.wallpaper ? '' : art.profile ? ' blur' : ' empty';
    const formButtons = art.forms.length > 1 ? `<div class="forms" id="forms">${art.forms.map((f) => `<button type="button" data-form='${esc(JSON.stringify({ p: f.profile, w: f.wallpaper, t: f.turnaround, n: f.note }))}'${f === art.def ? ' class="on"' : ''}>${f.profile ? `<img src="${f.profile}" alt="">` : '<span class="dot"></span>'}${esc(f.name)}</button>`).join('')}</div>` : '';
    const body = `
<section class="ch-hero" style="--cc:${c.color};padding:0">
    <div class="stage${stageCls}" id="stage">${stageImg ? `<img class="wp" id="wp" src="${stageImg}" alt="">` : ''}</div>
    <div class="over"><div class="wrap">
        <div class="avatar" id="avatar" data-mono="${esc(initials(c.name))}"${art.profile ? ` data-zoom="${art.profile}" style="cursor:zoom-in"` : ''}>${art.profile ? `<img src="${art.profile}" alt="${esc(c.name)}">` : `<span class="mono">${esc(initials(c.name))}</span>`}</div>
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
            <div class="bio">${c.bio.map((p) => `<p>${esc(p)}</p>`).join('')}<p class="form-note" id="note">${esc((art.def || {}).note || '')}</p></div>
            <div class="card"><table class="facts">${facts.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join('')}</table></div>
        </div>
        <div id="turnwrap" style="margin-top:34px${art.turnaround ? '' : ';display:none'}">
            <div class="section-head" style="margin-bottom:16px"><div><span class="eyebrow">Character sheet</span><h2 style="font-size:26px">Front &amp; back</h2></div></div>
            <div class="turn" id="turn" data-zoom="${art.turnaround}"><img id="turnimg" src="${art.turnaround}" alt="${esc(c.name)} front and back" loading="lazy"></div>
        </div>
        <div class="pn" style="margin-top:44px">
            <a href="${charHref(prev)}"><span>&larr;</span><span><small>Previous</small><b>${esc(prev.name)}</b></span></a>
            <a class="next" href="${charHref(next)}"><span><small>Next</small><b>${esc(next.name)}</b></span><span>&rarr;</span></a>
        </div>
        <p style="margin-top:22px"><a class="btn btn-ghost btn-sm" href="${MMX_BASE}/characters">&larr; All characters</a>${b ? ` <a class="btn btn-ghost btn-sm" href="${MMX_BASE}/mavericks">All Mavericks</a>` : ''}</p>
    </div>
</section>
<script>
(() => {
    const bar = document.getElementById('forms'); if (!bar) return;
    bar.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        bar.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        const d = JSON.parse(b.dataset.form);
        const stage = document.getElementById('stage');
        const src = d.w || d.p;
        stage.className = 'stage' + (d.w ? '' : d.p ? ' blur' : ' empty');
        let wp = document.getElementById('wp');
        if (src) { if (!wp) { wp = document.createElement('img'); wp.id = 'wp'; wp.className = 'wp'; wp.alt = ''; stage.appendChild(wp); } wp.src = src; } else if (wp) { wp.remove(); }
        const av = document.getElementById('avatar');
        if (d.p) { av.innerHTML = '<img src="' + d.p + '" alt="">'; av.dataset.zoom = d.p; av.style.cursor = 'zoom-in'; }
        else { av.innerHTML = '<span class="mono">' + av.dataset.mono + '</span>'; delete av.dataset.zoom; av.style.cursor = ''; }
        document.getElementById('note').textContent = d.n || '';
        const tw = document.getElementById('turnwrap');
        if (d.t) { tw.style.display = ''; document.getElementById('turnimg').src = d.t; document.getElementById('turn').dataset.zoom = d.t; } else { tw.style.display = 'none'; }
    });
})();
</script>`;
    return page({
        title: `${c.name} · ${MMX.title}: ${MMX.subtitle}`,
        description: `${c.name}, ${c.role} in ${MMX.title}: ${MMX.subtitle}. ${c.bio[0]}`.slice(0, 300),
        path: charHref(c), active: b ? 'mavericks' : 'characters', m, ogImage: art.wallpaper || art.profile, body,
    });
}

// ---------------------------------------------------------------- bosses
function bossesPage(m) {
    const body = `
${pageHead(m, 'mavericks')}<span class="eyebrow">The Mavericks</span><h1>The eight <span class="grad-bv">Mavericks</span></h1>
<p class="lead">Each one infected by the Apex Virus and mutated according to its animal body. Defeat them to take their weapons, and use each weakness against the next.</p></div></section>
<section style="padding-top:28px"><div class="wrap">
    <div class="bosses">${MMX_BOSSES.map((c) => bossCard(c, m)).join('')}</div>
</div></section>`;
    return page({ title: `The Mavericks · ${MMX.title}: ${MMX.subtitle}`, description: `The eight bosses of ${MMX.title}: ${MMX.subtitle}: stages, Apex mutations, weaknesses and weapons.`, path: `${MMX_BASE}/mavericks`, active: 'mavericks', m, body });
}

// ---------------------------------------------------------------- weapons
function weaponsPage(m) {
    const art = m.weapons || {};
    const tabs = MMX_WEAPON_USERS.map((u, i) => {
        const c = findCharacter(u.character);
        const pic = c ? artFor(c, m).profile : '';
        return `<button type="button" class="wtab${i === 0 ? ' on' : ''}" data-user="${u.key}" aria-controls="w-${u.key}" aria-pressed="${i === 0}" style="--cc:${u.color}">${pic ? `<img src="${pic}" alt="">` : `<span class="mono">${esc(u.name[0])}</span>`}${esc(u.name)}</button>`;
    }).join('');
    const panels = MMX_WEAPON_USERS.map((u, i) => {
        const known = MMX_BOSSES.filter((b) => weaponOf(u.key, b.slug)).length;
        return `
        <div class="wpanel${u.art === 'wide' ? ' wide' : ''}" id="w-${u.key}" style="--cc:${u.color}"${i === 0 ? '' : ' hidden'}>
            <div class="wpanel-head"><h3>${esc(u.name)}’s weapons</h3><span>${known} of ${MMX_BOSSES.length} revealed</span></div>
            <div class="weapons">${MMX_BOSSES.map((b) => {
                const name = weaponOf(u.key, b.slug);
                const mine = art[u.key] || {};
                const img = mine[b.slug] || (name && mine[slugify(name)]);
                const bossArt = artFor(b, m).profile;
                return `
                <div class="weapon${name || img ? '' : ' hidden-w'}${name ? '' : ' noname'}" style="--wc:${b.color}">
                    <div class="w-art"${img ? ` data-zoom="${mmxAsset(img)}"` : ''}>${img ? `<img src="${mmxAsset(img)}" alt="${esc(name)}" loading="lazy">` : `<span class="w-glyph">${name ? esc(name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2)) : '?'}</span>`}</div>
                    <div class="w-info">
                        <b>${name ? esc(name) : 'Name to be revealed'}</b>
                        <a class="w-from" href="${charHref(b)}">${bossArt ? `<img src="${bossArt}" alt="">` : ''}<span>From ${esc(b.name)}</span></a>
                        <span class="chip" style="--cc:${b.color}">${esc(b.boss.element)}</span>
                    </div>
                </div>`;
            }).join('')}</div>
        </div>`;
    }).join('');
    const body = `
${pageHead(m, 'weapons')}<span class="eyebrow">Weapons</span><h1>The arsenal of <span class="grad-bv">Apex-Primal</span></h1>
<p class="lead">Every Maverick defeated leaves a power behind. X, Zero, Axl and Gamma each take their own weapon from it.</p></div></section>
<section style="padding-top:28px"><div class="wrap">
    <div class="wtabs" id="wtabs">${tabs}</div>
    ${panels}
</div></section>
<script>
(() => {
    const bar = document.getElementById('wtabs'); if (!bar) return;
    const show = (key) => {
        const btn = bar.querySelector('[data-user="' + key + '"]'); if (!btn) return;
        bar.querySelectorAll('.wtab').forEach((b) => { const on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
        document.querySelectorAll('.wpanel').forEach((p) => { p.hidden = p.id !== 'w-' + key; });
    };
    bar.addEventListener('click', (e) => { const b = e.target.closest('[data-user]'); if (!b) return; show(b.dataset.user); history.replaceState(null, '', '#' + b.dataset.user); });
    const h = location.hash.slice(1); if (h) show(h);
})();
</script>`;
    return page({ title: `Weapons · ${MMX.title}: ${MMX.subtitle}`, description: `The special weapons of X, Zero, Axl and Gamma in ${MMX.title}: ${MMX.subtitle}, one from each Maverick.`, path: `${MMX_BASE}/weapons`, active: 'weapons', m, body });
}

// ---------------------------------------------------------------- universe
function universePage(m) {
    const imgs = (m.universe || {}).images || {};
    const body = `
${pageHead(m, 'universe')}<span class="eyebrow">The Universe</span><h1>The science of <span class="grad-bv">Apex-Primal</span></h1>
<p class="lead">How the Apex Virus works, what Dr. Clark created, and why a dead emperor needs a new body.</p></div></section>
<section style="padding-top:28px"><div class="wrap">
    <div class="lore">${MMX_LORE.map((l) => `
        <div class="card reveal" id="${l.key}" style="--tc:${l.c}">
            ${imgs[l.key] ? `<div class="art" style="background-image:url('${mmxAsset(imgs[l.key])}')" data-zoom="${mmxAsset(imgs[l.key])}"></div>` : ''}
            <div class="txt"><h3>${esc(l.name)}</h3>${l.text.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        </div>`).join('')}
    </div>
</div></section>`;
    return page({ title: `The Universe · ${MMX.title}: ${MMX.subtitle}`, description: `The Apex Virus, the Primal state, Dr. Clark’s CFE Project, Beastroids, Berserker Mode and the Sigma Chip in ${MMX.title}: ${MMX.subtitle}.`, path: `${MMX_BASE}/universe`, active: 'universe', m, body });
}

// ---------------------------------------------------------------- routes
const html = (body) => new Response(body, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'public, max-age=60' } });

export async function handleMMX9(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (path === '/mmx9' || path === '/megaman-x9' || path === '/mega-man-x9') return Response.redirect(`${url.origin}${MMX_BASE}`, 301);
    if (path !== MMX_BASE && !path.startsWith(`${MMX_BASE}/`)) return null;
    const rest = path.slice(MMX_BASE.length);
    const m = await loadArt();
    if (rest === '') return html(mainPage(m));
    if (rest === '/story') return html(storyPage(m));
    if (rest === '/characters') return html(charactersPage(m));
    if (rest === '/mavericks') return html(bossesPage(m));
    if (rest === '/bosses') return Response.redirect(`${url.origin}${MMX_BASE}/mavericks`, 301);
    if (rest === '/weapons') return html(weaponsPage(m));
    if (rest === '/universe') return html(universePage(m));
    const hit = rest.match(/^\/characters\/([a-z0-9-]+)$/);
    if (hit && findCharacter(hit[1])) return html(characterPage(findCharacter(hit[1]), m));
    return Response.redirect(`${url.origin}${MMX_BASE}`, 302);
}

// Kept so an old `import { htmlMegaman } from './mmx9.js'` in worker.js still loads.
export const htmlMegaman = '';
