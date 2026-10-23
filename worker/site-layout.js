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
    camera: stroke('<path d="M4 8h3l1.6-2.2h6.8L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.6"/>'),
    photo: stroke('<rect x="3" y="4.5" width="18" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.7"/><path d="m21 16-5-5-8.5 8.5"/>'),
    calendar: stroke('<rect x="3.5" y="5" width="17" height="15" rx="3"/><path d="M3.5 10h17M8 3v4M16 3v4"/>'),
    check: stroke('<rect x="4" y="4" width="16" height="16" rx="4"/><path d="m8.5 12 2.5 2.5 4.5-5"/>'),
    pin: stroke('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/>'),
    mic: stroke('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/>'),
    bell: stroke('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>'),
    wave: stroke('<path d="M3 12h2M7 8v8M11 5v14M15 8v8M19 10.5v3M21 12h0"/>'),
    lock: stroke('<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>'),
    user: stroke('<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/><path d="M4 4l16 16"/>'),
    eye: stroke('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/><path d="M4 4l16 16"/>'),
    device: stroke('<rect x="6.5" y="2.5" width="11" height="19" rx="2.8"/><path d="m9.5 12 2 2 3.5-4"/>'),
    search: stroke('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
    bag: stroke('<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>'),
    sync: stroke('<path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5"/><path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5"/>'),
    wrench: stroke('<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3.5 17.5a1.4 1.4 0 0 0 2 2l5.8-5.8a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.1-.5-.5-2.1z"/>'),
    flask: stroke('<path d="M9.5 3h5M10 3v6l-5.2 9a1.6 1.6 0 0 0 1.4 2.4h11.6a1.6 1.6 0 0 0 1.4-2.4L14 9V3"/><path d="M7.4 15h9.2"/>'),
    copy: stroke('<rect x="8.5" y="8.5" width="11" height="11" rx="2.2"/><path d="M15.5 8.5V6.2a1.7 1.7 0 0 0-1.7-1.7H6.2a1.7 1.7 0 0 0-1.7 1.7v7.6a1.7 1.7 0 0 0 1.7 1.7h2.3"/>'),
    scan: stroke('<path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/>'),
    diamond: stroke('<path d="M12 2.5 21.5 12 12 21.5 2.5 12z"/><path d="M12 8v5M12 16h0"/>'),
    truck: stroke('<path d="M2.5 7h11v9h-11zM13.5 10h4l3 3v3h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>'),
    book: stroke('<path d="M4 5.5A2 2 0 0 1 6 3.5h5v16H6a2 2 0 0 0-2 2zM20 5.5a2 2 0 0 0-2-2h-5v16h5a2 2 0 0 1 2 2z"/>'),
    call: stroke('<path d="M5 3.5h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.6 6.6l1.4-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z"/>'),
    offline: stroke('<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.5a9.5 9.5 0 0 1 13 0M9 16a4.5 4.5 0 0 1 6 0"/><circle cx="12" cy="19.2" r=".9" fill="currentColor"/><path d="M3 3l18 18"/>'),
    flask2: stroke('<path d="M9.5 3h5M10 3v6l-5.2 9a1.6 1.6 0 0 0 1.4 2.4h11.6a1.6 1.6 0 0 0 1.4-2.4L14 9V3"/><path d="M7.4 15h9.2"/>'),
    apple: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.37 12.63c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.87-.76-1.47.02-2.83.86-3.59 2.18-1.54 2.66-.39 6.59 1.1 8.75.73 1.05 1.6 2.24 2.73 2.2 1.1-.05 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.5zM14.2 6.17c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.64-1.05 1.68-.92 2.67.97.08 1.96-.49 2.56-1.22z"/></svg>',
    shield: stroke('<path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6L12 3z"/><path d="m8.8 12 2.2 2.2 4.4-4.4"/>'),
};

const NAV = [
    ['Apps', '/#apps', 'apps'],
    ['Projects', '/#projects', 'projects'],
    ['Support', '/support', 'support'],
    ['Privacy', '/privacy', 'privacy'],
];

export function sitePage({ title, description, path = '/', ogImage, icon, active = '', back, head = '', body }) {
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
<link rel="icon" type="image/webp" href="${icon || asset('brand/logo-mark.webp')}">
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
