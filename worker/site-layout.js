// =====================================================================================
// Danloud Labs website: the page shell every page shares (head, top bar, footer) and
// the small SVG icons. Pages call sitePage({...}) and export the resulting HTML string.
// =====================================================================================

import { SITE_CSS } from './site-styles.js';
import { SITE, asset } from './site-data.js';

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const stroke = (inner) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;

export const ICONS = {
    arrow: stroke('<path d="M5 12h14M13 6l6 6-6 6"/>'),
    phone: stroke('<rect x="6.5" y="2.5" width="11" height="19" rx="2.8"/><path d="M10.5 18.5h3"/>'),
    android: stroke('<path d="M5.5 10.5h13v7a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2z"/><path d="M5.5 10.5a6.5 6.5 0 0 1 13 0"/><path d="m7.5 4.5 1.6 2.3M16.5 4.5l-1.6 2.3"/><circle cx="9.5" cy="8" r=".6" fill="currentColor"/><circle cx="14.5" cy="8" r=".6" fill="currentColor"/>'),
    tools: stroke('<rect x="2.5" y="4" width="19" height="13" rx="2.5"/><path d="M8 21h8M12 17v4"/><path d="m9.5 8.5-2 2 2 2M14.5 8.5l2 2-2 2"/>'),
    mail: stroke('<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>'),
    help: stroke('<circle cx="12" cy="12" r="9"/><path d="M9.6 9.3a2.5 2.5 0 0 1 4.8 1c0 1.7-2.4 2.1-2.4 3.7"/><circle cx="12" cy="17.2" r=".7" fill="currentColor"/>'),
    shield: stroke('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/>'),
};

const NAV = [
    ['Apps', '/#apps', 'apps'],
    ['Projects', '/#projects', 'projects'],
    ['Support', '/support', 'support'],
    ['Privacy', '/privacy', 'privacy'],
];

export function sitePage({ title, description, path = '/', ogImage, active = '', back, head = '', body }) {
    const url = `https://danloudlabs.com${path}`;
    const nav = NAV.map(([label, href, key]) => `<a href="${href}"${key === active ? ' class="on"' : ''}>${label}</a>`).join('');
    const backBtn = back ? `<a href="${back.href}" class="back-btn">&larr; ${esc(back.label)}</a>` : '';
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/webp" href="${asset('brand/logo-mark.webp')}">
<meta name="theme-color" content="#06050a">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Danloud Labs">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImage || asset('brand/logo-card.webp')}">
<meta name="twitter:card" content="summary_large_image">
<style>${SITE_CSS}</style>
${head}
</head>
<body>
<header class="topbar">
    <div class="wrap">
        ${backBtn}
        <a class="brand" href="/"><img src="${asset('brand/logo-mark.webp')}" alt=""><span>Danloud Labs</span></a>
        <div class="spacer"></div>
        <nav>${nav}</nav>
    </div>
</header>
${body}
<footer>
    <div class="wrap">
        <span>&copy; ${new Date().getFullYear()} ${esc(SITE.name)} &nbsp;|&nbsp; ${esc(SITE.location)}</span>
        <nav>
            <a href="/ios-apps">iOS</a>
            <a href="/android-apps">Android</a>
            <a href="/software-tools">Software</a>
            <a href="/support">Support</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="mailto:${SITE.email}">${SITE.email}</a>
        </nav>
    </div>
</footer>
<script>
(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((e) => io.observe(e));
})();
</script>
</body>
</html>`;
}

// One app card (main page and /ios-apps).
export const appCard = (a) => `
<a class="app-card reveal" href="${a.href}" style="--c:${a.color};--g:${a.glow}">
    <div class="banner"><img src="${a.banner}" alt="" loading="lazy"></div>
    <div class="body">
        <img class="icon" src="${a.icon}" alt="${esc(a.name)} icon" width="64" height="64" loading="lazy">
        <div style="flex:1;min-width:0">
            <h3>${esc(a.name)}</h3>
            <p>${esc(a.short)}</p>
            <div class="meta"><span class="chip">${esc(a.platforms)}</span><span class="go">Learn more ${ICONS.arrow.replace('<svg', '<svg width="15" height="15"')}</span></div>
        </div>
    </div>
</a>`;
