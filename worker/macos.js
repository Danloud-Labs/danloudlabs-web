// =====================================================================================
// Danloud Labs website: the macOS apps.
//   /macos-apps          the list (also /macos, /mac-apps)
//   /macos/<slug>        one page per app (cutout-studio, alphacut, yt-converter)
// Content: macos-data.js. While MAC_DRAFT is true the pages are noindex and nothing links to them.
// The Worker's fetch() calls handleMacOS(request); it returns null for other paths.
// =====================================================================================

import { MAC_APPS, MAC_DRAFT, findMacApp } from './macos-data.js';
import { MAC_CSS } from './macos-styles.js';
import { asset } from './site-data.js';
import { ICONS, appCard, esc, sitePage } from './site-layout.js';

const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');
const shot = (a, name) => asset(`apps/${a.slug}/${name}.webp`);
const head = (extra = '') => `${MAC_DRAFT ? '<meta name="robots" content="noindex">' : ''}<style>${MAC_CSS}</style>${extra}`;

// A Mac window with a screenshot; a labeled empty window until the art exists.
const macwin = (a, name, label, zoom = false) => `<figure class="macwin"${zoom ? ` data-zoom="${shot(a, name)}" data-caption="${esc(label)}"` : ''} style="margin:0">
    <div class="bar"><i></i><i></i><i></i><span>${esc(a.name)}</span></div>
    <div class="scr"><figcaption>${esc(label)}</figcaption><img src="${shot(a, name)}" alt="${esc(label)}" loading="lazy" onerror="this.remove()"></div>
</figure>`;

const button = (a) => (a.download
    ? `<a class="btn btn-store" href="${esc(a.download)}">${ICONS.apple}<span class="two"><small>Download for</small>Mac</span></a>`
    : `<span class="btn btn-primary btn-soon">${ICONS.apple} Coming soon to Mac</span>`);

function listPage() {
    const body = `
<main>
<section class="page-head"><div class="wrap">
    <span class="eyebrow">Software &amp; Tools</span>
    <h1>macOS Applications</h1>
    <p class="lead">Creative tools for the Mac by Danloud Labs LLC: native, fast, and private by design.</p>
</div></section>
<section style="padding-top:28px"><div class="wrap"><div class="apps">${MAC_APPS.map(appCard).join('')}</div></div></section>
</main>`;
    return sitePage({
        title: 'macOS Applications · Danloud Labs',
        description: 'Creative tools for the Mac by Danloud Labs: CutOut Studio, AlphaCut and YT Converter.',
        path: '/macos-apps', active: 'apps', back: { href: '/', label: 'Home' }, head: head(), body,
    });
}

function appPage(a) {
    const body = `
<main class="product mac" style="--c:${a.color};--c2:${a.c2}">
<section class="p-hero">
    <div class="bg"></div>
    <div class="wrap">
        <div>
            <div class="who"><img src="${a.icon}" alt="${esc(a.name)} icon" onerror="this.classList.add('noicon')"><div><b style="font-size:17px">${esc(a.name)}</b><small>${esc(a.subtitle)}</small></div></div>
            <h1>${esc(a.title)} <span class="hot" style="background:linear-gradient(135deg,${a.c2},${a.color});-webkit-background-clip:text;background-clip:text">${esc(a.hot)}</span></h1>
            <p class="lead">${esc(a.lead)}</p>
            <div class="badges"><span class="hot">macOS</span>${a.badges.map((b) => `<span>${esc(b)}</span>`).join('')}</div>
            <div class="cta-row" style="margin-top:24px">${button(a)}<a class="btn btn-ghost" href="#features">See what it does</a></div>
        </div>
        ${macwin(a, a.hero, a.name)}
    </div>
    <div class="wrap" style="display:block">
        <div class="p-stats">${a.stats.map(([n, t]) => `<div><b>${esc(n)}</b><span>${esc(t)}</span></div>`).join('')}</div>
    </div>
</section>

<section id="features"><div class="wrap">
    ${a.blocks.map((b) => `
    <div class="split-feature reveal${b.flip ? ' flip' : ''}">
        <div>
            <span class="eyebrow">${esc(b.eyebrow)}</span>
            <h3>${esc(b.title)}</h3>
            <p class="lead">${esc(b.text)}</p>
            <ul class="checks">${b.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
        </div>
        ${macwin(a, b.shot, b.eyebrow)}
    </div>`).join('')}
</div></section>

<section style="padding-top:10px"><div class="wrap">
    <div class="section-head reveal"><div><span class="eyebrow">More</span><h2>Built for the way you work.</h2></div></div>
    <div class="tools-grid">${a.features.map(([icon, name, text]) => `
        <div class="tool reveal"><span class="ic">${ICONS[icon] || ICONS.diamond}</span><span><b>${esc(name)}</b><p>${esc(text)}</p></span></div>`).join('')}
    </div>
</div></section>

<section id="screens" style="padding-top:20px"><div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Screenshots</span><h2>A closer look</h2></div></div>
    <div class="mac-shots">${a.shots.map(([n, cap]) => macwin(a, n, cap, true)).join('')}</div>
</div></section>

${a.notice ? `<section style="padding-top:0"><div class="wrap"><div class="disclaimer">${ICONS.diamond}<span>${esc(a.notice)}</span></div></div></section>` : ''}

<section><div class="wrap duo">
    <div class="card">
        <span class="eyebrow">Requirements</span>
        <h3 style="font-size:22px;margin:8px 0 6px">What you need</h3>
        <ul class="reqs">${a.requirements.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
    </div>
    <div class="card">
        <span class="eyebrow">Privacy</span>
        <h3 style="font-size:22px;margin:8px 0 10px">Stays on your Mac</h3>
        <p style="color:var(--muted);margin:0 0 14px">${esc(a.privacy)}</p>
        <a class="btn btn-ghost btn-sm" href="/privacy">Privacy Policy ${small(ICONS.arrow)}</a>
    </div>
</div></section>
</main>
<div class="lb" id="lb"><img alt=""><figcaption></figcaption></div>`;

    const script = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const lb = document.getElementById('lb');
    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-zoom]');
        if (t && t.querySelector('img')) { lb.querySelector('img').src = t.dataset.zoom; lb.querySelector('figcaption').textContent = t.dataset.caption || ''; lb.classList.add('open'); return; }
        lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
});
</script>`;

    return sitePage({
        title: `${a.name} for Mac · ${a.subtitle}`,
        description: `${a.name} for Mac: ${a.short}`,
        path: a.href, ogImage: a.banner, icon: a.icon, active: 'apps',
        back: { href: '/macos-apps', label: 'macOS Apps' },
        head: head(script), body,
    });
}

const html = (body) => new Response(body, { headers: { 'content-type': 'text/html; charset=UTF-8', 'cache-control': 'public, max-age=300' } });

export async function handleMacOS(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '').toLowerCase();
    if (path === '/macos-apps' || path === '/macos' || path === '/mac-apps') return html(listPage());
    if (path.startsWith('/macos/')) {
        const a = findMacApp(path.slice('/macos/'.length));
        return a ? html(appPage(a)) : Response.redirect(`${url.origin}/macos-apps`, 302);
    }
    if (path === '/cutout-studio' || path === '/alphacut' || path === '/yt-converter') return Response.redirect(`${url.origin}/macos${path}`, 301);
    return null;
}
