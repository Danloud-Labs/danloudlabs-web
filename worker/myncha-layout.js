// =====================================================================================
// Myncha: Vampires of Exius — the shared page shell (sub-nav, page frame, headings, image
// frames), used by myncha.js and myncha-characters.js.
// =====================================================================================

import { MY, MY_BASE, MY_SECTIONS, myAsset } from './myncha-data.js';
import { MY_CSS } from './myncha-styles.js';
import { ICONS, esc, sitePage } from './site-layout.js';

export const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');
export const LOGO = myAsset('brand/logo.webp');

// An image frame: the art when the file exists, a labeled night frame until it does.
// `cls`: wide (16:9) or portrait (3:4).
export const frame = (path, label, cls) => `<figure class="ph ${cls}"><img src="${myAsset(path)}" alt="${esc(label)}" loading="lazy" onerror="this.remove()"><figcaption>${esc(label)}</figcaption></figure>`;

export function myNav(active) {
    const links = [['', 'Home'], ...MY_SECTIONS.map((s) => [s.key, s.nav || s.name])];
    return `<div class="mmx-nav"><div class="wrap"><a href="${MY_BASE}" style="padding:0;border:0;background:none"><img src="${LOGO}" alt="${esc(MY.title)}"></a>${links.map(([k, n]) => `<a href="${MY_BASE}${k ? `/${k}` : ''}"${active === k ? ' class="on"' : ''}>${esc(n)}</a>`).join('')}</div></div>`;
}

export function page({ title, description, path, active, body, css = '', ogImage }) {
    return sitePage({
        title, description, path, ogImage: ogImage || LOGO,
        icon: LOGO,
        active: 'projects',
        back: { href: '/#projects', label: 'Projects' },
        head: `<style>${MY_CSS}${css}</style>`,
        body: `<div class="mmx my">${myNav(active)}${body}<section style="padding-top:0"><div class="wrap"><p class="fan-note">${esc(MY.note)}</p></div></section></div>`,
    });
}

export const head = (eyebrow, title, link) => `<div class="section-head reveal"><div><span class="eyebrow">${esc(eyebrow)}</span><h2>${title}</h2></div>${link ? `<a class="btn btn-ghost btn-sm" href="${link[0]}">${esc(link[1])} ${small(ICONS.arrow)}</a>` : ''}</div>`;
export const pageHead = (eyebrow, h1, lead) => `<section class="page-head"><div class="wrap"><span class="eyebrow">${esc(eyebrow)}</span><h1>${h1}</h1><p class="lead">${lead}</p></div></section>`;

// Text or JSON from assets/projects/myncha, read live from GitHub (cached for a minute).
export async function loadLive(file, json) {
    try {
        const res = await fetch(`${myAsset(file)}?m=${Math.floor(Date.now() / 60000)}`, { cf: { cacheTtl: 60, cacheEverything: true } });
        if (res.ok) return json ? await res.json() : await res.text();
    } catch (_) { /* the page shows what it can without it */ }
    return json ? {} : '';
}
