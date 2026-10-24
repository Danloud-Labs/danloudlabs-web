// =====================================================================================
// Amaphest: The Universe page (/amaphest-amalion-progenitor/universe).
// Tabs (Hemos, Earth) with a cinematic hero each, then sections of cards. Content lives in
// amaphest-universe-data.js; amaphest.js only routes here and wraps the page.
// =====================================================================================

import { AMA_UNIVERSE_TABS } from './amaphest-universe-data.js';
import { findCharacter } from './amaphest-characters.js';
import { esc } from './site-layout.js';

const slug = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const HERO_NAMES = ['hero', 'background', 'banner', 'wallpaper'];

// Splits a tab's images into: hero, art per card id, and leftover section backgrounds.
function tabArt(tab, manifest, amaAsset) {
    const u = ((manifest.universe || {})[tab.key]) || {};
    const images = u.images || {};
    const order = u.order || Object.keys(images).sort();
    const url = (k) => amaAsset(images[k]);
    const used = new Set();
    const cards = {};
    for (const sec of tab.sections) {
        for (const it of sec.items || []) {
            const keys = [it.id, slug(it.name)].filter(Boolean);
            const hit = keys.find((k) => images[k] && !used.has(k));
            if (hit) { cards[`${sec.id}/${it.id || slug(it.name)}`] = url(hit); used.add(hit); }
        }
    }
    // An image named like a section (its id, eyebrow or title) becomes that section's background.
    const sections = {};
    for (const sec of tab.sections) {
        const keys = [sec.id, slug(sec.eyebrow), slug(sec.title)].filter(Boolean);
        const hit = keys.find((k) => images[k] && !used.has(k));
        if (hit) { sections[sec.id] = url(hit); used.add(hit); }
    }
    let hero = '';
    const heroKey = HERO_NAMES.find((k) => images[k]);
    if (heroKey) { hero = url(heroKey); used.add(heroKey); }
    const rest = order.filter((k) => images[k] && !used.has(k));
    if (!hero && rest.length) hero = url(rest.shift());
    return { hero, cards, sections, bands: rest.map(url), focus: u.focus || '50% 35%' };
}

function charChips(slugs, manifest, amaAsset, base) {
    const list = (slugs || []).map(findCharacter).filter(Boolean);
    if (!list.length) return '';
    return `<div class="u-chars">${list.map((c) => {
        const a = (manifest.characters || {})[c.slug] || {};
        const forms = a.forms || [];
        const f = forms.find((x) => x.slug === c.defaultForm) || forms[0] || a;
        const pic = f && f.profile ? `<img src="${amaAsset(f.profile)}" alt="" loading="lazy">` : `<i>${esc((c.alias && !/\s/.test(c.alias) ? c.alias : c.name.replace(/^(Dr\.|Director|Colonel|Captain|General|S\.A\.)\s+/, '')).slice(0, 1))}</i>`;
        return `<a href="${base}/characters/${c.slug}" style="--cc:${c.color}">${pic}<span>${esc(c.alias && !/\s/.test(c.alias) ? c.alias : c.name)}</span></a>`;
    }).join('')}</div>`;
}

function card(it, sec, art, ctx, wide, placeholder) {
    const img = art.cards[`${sec.id}/${it.id || slug(it.name)}`];
    const facts = (it.facts || []).length ? `<table class="u-facts">${it.facts.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join('')}</table>` : '';
    return `
        <article class="u-card${wide ? ' wide' : ''}${img || placeholder ? ' has-img' : ''} reveal" style="--ic:${it.color || 'var(--uc)'}">
            ${img ? `<div class="u-img" data-zoom="${img}"><img src="${img}" alt="${esc(it.name)}" loading="lazy"></div>` : placeholder ? '<div class="u-img ph" aria-hidden="true"></div>' : ''}
            <div class="u-txt">
                ${it.kicker ? `<small>${esc(it.kicker)}</small>` : ''}
                <h3>${esc(it.name)}</h3>
                <p>${esc(it.text)}</p>
                ${facts}
                ${charChips(it.chars, ctx.manifest, ctx.amaAsset, ctx.base)}
            </div>
        </article>`;
}

function sectionBody(sec, art, ctx) {
    const items = sec.items || [];
    if (sec.layout === 'energies') {
        return `<div class="u-energies">${items.map((it) => {
            const img = art.cards[`${sec.id}/${it.id}`];
            return `<article class="u-energy reveal" style="--ic:${it.color}">${img ? `<img src="${img}" alt="" loading="lazy">` : `<span class="orb${it.orb ? ` ${it.orb}` : ''}"></span>`}<small>${esc(it.kicker || '')}</small><h3>${esc(it.name)}</h3><p>${esc(it.text)}</p></article>`;
        }).join('')}</div>`;
    }
    if (sec.layout === 'timeline') {
        return `<ol class="u-timeline">${items.map((it) => `<li class="reveal"><b>${esc(it.name)}</b><p>${esc(it.text)}</p>${charChips(it.chars, ctx.manifest, ctx.amaAsset, ctx.base)}</li>`).join('')}</ol>`;
    }
    // In a grid where some cards have art, the others get a matching placeholder so rows line up.
    const withArt = items.some((it) => art.cards[`${sec.id}/${it.id || slug(it.name)}`]);
    // Columns that never leave a lonely card: 3 → 3, 6 → 3, 8 → 4; wide cards go 2 or 3 across.
    const n = sec.layout === 'wide' ? items.filter((it) => !art.cards[`${sec.id}/${it.id || slug(it.name)}`]).length : items.length;
    const cols = sec.layout === 'wide' ? (n % 2 === 0 ? 2 : 3) : (n <= 4 ? n : n % 4 === 0 ? 4 : 3);
    return `<div class="u-grid${sec.layout === 'wide' ? ' wide' : ''}" style="--cols:${cols}">${items.map((it) => card(it, sec, art, ctx, sec.layout === 'wide', sec.layout !== 'wide' && withArt)).join('')}</div>`;
}

function tabPanel(tab, manifest, ctx, first) {
    const art = tabArt(tab, manifest, ctx.amaAsset);
    let band = 0;
    const sections = tab.sections.map((sec) => {
        const bg = art.sections[sec.id] || (sec.band && art.bands[band] ? art.bands[band++] : '');
        return `
    <section class="u-sec${sec.band || bg ? ' band' : ''}" id="${tab.key}-${sec.id}">
        ${bg ? `<div class="u-band-bg" style="background-image:url('${bg}')"></div>` : ''}
        <div class="wrap">
            <div class="u-head reveal"><span class="eyebrow">${esc(sec.eyebrow || '')}</span><h2>${esc(sec.title)}</h2>${sec.text ? `<p class="lead">${esc(sec.text)}</p>` : ''}</div>
            ${sectionBody(sec, art, ctx)}
        </div>
    </section>`;
    }).join('');
    const h = tab.hero;
    return `
<div class="u-panel" id="u-${tab.key}" data-tab="${tab.key}" style="--uc:${tab.color};--uc2:${tab.color2}"${first ? '' : ' hidden'}>
    <section class="u-hero">
        <div class="bg ${art.hero ? '' : `sky-${tab.key}`}" style="${art.hero ? `background-image:url('${art.hero}');` : ''}--focus:${art.focus}"></div>
        <div class="wrap">
            <span class="u-kicker">${esc(h.kicker)}</span>
            <h1>${esc(h.title)}</h1>
            <p class="lead">${esc(h.lead)}</p>
            <div class="u-stats">${h.stats.map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>
        </div>
    </section>
    <nav class="u-jump"><div class="wrap">${tab.sections.map((s) => `<a href="#${tab.key}-${s.id}">${esc(s.eyebrow || s.title)}</a>`).join('')}</div></nav>
    ${sections}
</div>`;
}

// Body of the Universe page. ctx: { manifest, amaAsset, base }.
export function universeBody(ctx) {
    const tabs = AMA_UNIVERSE_TABS;
    return `
<div class="u-tabs"><div class="wrap" role="tablist">${tabs.map((t, i) => `<button type="button" role="tab" data-tab="${t.key}" aria-selected="${i === 0}" style="--uc:${t.color};--uc2:${t.color2}"${i === 0 ? ' class="on"' : ''}><span class="dot"></span><b>${esc(t.name)}</b><small>${esc(t.era)}</small></button>`).join('')}</div></div>
${tabs.map((t, i) => tabPanel(t, ctx.manifest, ctx, i === 0)).join('')}
<script>
(() => {
    const tabs = document.querySelectorAll('.u-tabs [data-tab]');
    const show = (key, push) => {
        const panel = document.getElementById('u-' + key); if (!panel) return false;
        document.querySelectorAll('.u-panel').forEach((p) => { p.hidden = p !== panel; });
        tabs.forEach((b) => { const on = b.dataset.tab === key; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
        panel.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
        if (push) history.replaceState(null, '', '#' + key);
        return true;
    };
    tabs.forEach((b) => b.addEventListener('click', () => { show(b.dataset.tab, true); window.scrollTo({ top: 0, behavior: 'smooth' }); }));
    const h = location.hash.slice(1);
    if (h) { const key = h.split('-')[0]; if (show(key, false) && h !== key) { const t = document.getElementById(h); t && setTimeout(() => t.scrollIntoView(), 50); } }
})();
</script>`;
}

export const AMA_UNIVERSE_CSS = `
.u-tabs { position: sticky; top: 119px; z-index: 39; background: rgba(6, 5, 10, 0.86); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border-bottom: 1px solid var(--line); }
.u-tabs .wrap { display: flex; gap: 10px; padding: 10px 20px; }
.u-tabs button { flex: 1; max-width: 300px; display: grid; grid-template-columns: auto 1fr; column-gap: 12px; align-items: center; text-align: left; padding: 10px 16px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); color: var(--fg); font: inherit; cursor: pointer; transition: border-color .2s, box-shadow .2s, background .2s; }
.u-tabs button .dot { grid-row: span 2; width: 30px; height: 30px; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #fff8, transparent 40%), conic-gradient(from 200deg, var(--uc), var(--uc2), var(--uc)); box-shadow: 0 0 18px color-mix(in srgb, var(--uc) 50%, transparent); }
.u-tabs button b { font-family: var(--round); font-size: 16px; line-height: 1.1; }
.u-tabs button small { color: var(--muted); font-size: 12px; }
.u-tabs button:hover { border-color: color-mix(in srgb, var(--uc) 50%, var(--line)); }
.u-tabs button.on { border-color: var(--uc); background: color-mix(in srgb, var(--uc) 12%, var(--card)); box-shadow: 0 0 0 1px var(--uc), 0 10px 30px -14px var(--uc); }
.u-panel[hidden] { display: none; }

.u-hero { position: relative; overflow: hidden; min-height: min(72vh, 700px); display: flex; align-items: flex-end; background: #000; padding: 0; }
.u-hero > .bg { position: absolute; inset: -4%; background-size: cover; background-position: var(--focus, 50% 35%); transform-origin: var(--focus, 50% 35%); animation: ama-drift 30s ease-in-out infinite alternate; }
.u-hero::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(0deg, var(--bg) 0%, rgba(6, 5, 10, .6) 40%, rgba(6, 5, 10, .1) 75%), linear-gradient(90deg, rgba(6, 5, 10, .8), transparent 65%); }
.u-hero .wrap { position: relative; z-index: 2; padding-top: 120px; padding-bottom: 44px; }
.u-hero h1 { font-size: clamp(36px, 6vw, 68px); line-height: 1.02; max-width: 820px; margin: 6px 0 14px; }
.u-hero .lead { color: #e7e2ee; max-width: 680px; }
.u-kicker { font-size: 12.5px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: color-mix(in srgb, var(--uc) 70%, white); }
.u-stats { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-top: 26px; max-width: 820px; }
.u-stats div { padding: 12px 14px; border-radius: 14px; background: rgba(10, 8, 14, .55); border: 1px solid rgba(255, 255, 255, .08); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.u-stats b { display: block; font-family: var(--round); font-size: 24px; line-height: 1.1; background: linear-gradient(90deg, var(--uc), var(--uc2)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.u-stats span { color: var(--muted); font-size: 12.5px; }
/* Skies drawn in CSS until the art arrives. */
.sky-hemos { background:
    radial-gradient(1.5px 1.5px at 12% 22%, #fff, transparent), radial-gradient(1px 1px at 32% 12%, #fff, transparent), radial-gradient(1.5px 1.5px at 58% 28%, #fff, transparent), radial-gradient(1px 1px at 78% 16%, #fff, transparent), radial-gradient(1px 1px at 88% 40%, #fff, transparent), radial-gradient(1px 1px at 46% 46%, #fff, transparent),
    radial-gradient(70px 70px at 74% 26%, #fff6e0, #ffb46a 30%, transparent 70%), radial-gradient(42px 42px at 84% 44%, #ffe2c8, #ff7a4a 35%, transparent 75%), radial-gradient(28px 28px at 63% 14%, #fff, #9cc8ff 40%, transparent 80%),
    radial-gradient(60% 70% at 18% 70%, rgba(255, 46, 77, .55), transparent 70%), radial-gradient(60% 70% at 85% 80%, rgba(47, 139, 255, .5), transparent 70%), radial-gradient(40% 50% at 50% 60%, rgba(214, 60, 255, .35), transparent 75%), linear-gradient(180deg, #0b0614, #120818 60%, #06050a); }
.sky-earth { background:
    radial-gradient(1px 1px at 10% 15%, #fff, transparent), radial-gradient(1.5px 1.5px at 30% 30%, #fff, transparent), radial-gradient(1px 1px at 55% 10%, #fff, transparent), radial-gradient(1px 1px at 80% 22%, #fff, transparent),
    radial-gradient(46% 70% at 80% 92%, #3b8cff 0%, #1a56b8 38%, #0b2a63 60%, #061433 69%, transparent 70%), radial-gradient(50% 76% at 80% 92%, rgba(120, 200, 255, .55) 66%, transparent 74%),
    radial-gradient(50% 60% at 15% 30%, rgba(214, 60, 255, .3), transparent 70%), linear-gradient(180deg, #04060f, #070a18 60%, #06050a); }

.u-jump { border-bottom: 1px solid var(--line); background: var(--bg); }
.u-jump .wrap { display: flex; gap: 8px; overflow-x: auto; padding: 12px 20px; scrollbar-width: none; }
.u-jump .wrap::-webkit-scrollbar { display: none; }
.u-jump a { flex: none; font-size: 13px; font-weight: 600; color: var(--muted); text-decoration: none; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--line2); }
.u-jump a:hover { color: var(--fg); border-color: color-mix(in srgb, var(--uc) 60%, var(--line2)); }

.u-sec { position: relative; padding: 64px 0; scroll-margin-top: 180px; }
.u-sec.band { background: linear-gradient(180deg, color-mix(in srgb, var(--uc) 6%, transparent), transparent 70%); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); overflow: hidden; }
.u-band-bg { position: absolute; inset: 0; background-size: cover; background-position: center; opacity: .22; filter: saturate(1.1); }
.u-band-bg::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, var(--bg), rgba(6, 5, 10, .55) 30%, rgba(6, 5, 10, .55) 70%, var(--bg)); }
.u-sec .wrap { position: relative; }
.u-head { margin-bottom: 28px; }
.u-head h2 { font-size: clamp(28px, 4vw, 42px); margin: 6px 0 10px; }
.u-head .lead { margin: 0; }

.u-grid { display: grid; grid-template-columns: repeat(var(--cols, 3), minmax(0, 1fr)); gap: 14px; }
.u-grid.wide { grid-auto-flow: dense; align-items: start; }
.u-card { --ic: var(--uc); position: relative; display: flex; flex-direction: column; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: radial-gradient(120% 60% at 0% 0%, color-mix(in srgb, var(--ic) 14%, transparent), transparent 60%), var(--card); transition: transform .25s, border-color .25s; }
.u-card:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--ic) 45%, var(--line)); }
.u-card::before { content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 3px; background: var(--ic); opacity: .8; }
.u-card.has-img::before { display: none; }
.u-grid.wide .u-card.has-img { grid-column: 1 / -1; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); }
.u-grid.wide .u-card.has-img .u-img { aspect-ratio: auto; min-height: 100%; }
.u-grid.wide .u-card.has-img .u-txt { padding: 26px 28px; align-self: center; }
.u-img { aspect-ratio: 16 / 9; overflow: hidden; cursor: zoom-in; background: #000; }
.u-img.ph { cursor: default; background: radial-gradient(60% 90% at 30% 110%, color-mix(in srgb, var(--ic) 45%, transparent), transparent 70%), radial-gradient(50% 80% at 85% -10%, color-mix(in srgb, var(--uc2) 35%, transparent), transparent 70%), repeating-linear-gradient(120deg, rgba(255, 255, 255, .025) 0 2px, transparent 2px 22px), #0d0a12; }
.u-img img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s; }
.u-card:hover .u-img.ph { cursor: default; background: radial-gradient(60% 90% at 30% 110%, color-mix(in srgb, var(--ic) 45%, transparent), transparent 70%), radial-gradient(50% 80% at 85% -10%, color-mix(in srgb, var(--uc2) 35%, transparent), transparent 70%), repeating-linear-gradient(120deg, rgba(255, 255, 255, .025) 0 2px, transparent 2px 22px), #0d0a12; }
.u-img img { transform: scale(1.04); }
.u-txt { padding: 18px 20px 20px; }
.u-txt small { display: block; font-size: 11.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: color-mix(in srgb, var(--ic) 75%, white); margin-bottom: 4px; }
.u-txt h3 { font-size: 19px; margin-bottom: 6px; }
.u-card.wide .u-txt h3 { font-size: 23px; }
.u-txt p { margin: 0; color: var(--muted); font-size: 14.5px; }
.u-facts { width: 100%; border-collapse: collapse; margin-top: 14px; }
.u-facts td { padding: 8px 0; border-top: 1px solid var(--line); font-size: 13.5px; vertical-align: top; }
.u-facts td:first-child { color: var(--dim); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; width: 34%; padding-top: 10px; padding-right: 10px; }

.u-chars { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
.u-chars a { --cc: var(--uc); display: inline-flex; align-items: center; gap: 7px; padding: 3px 11px 3px 3px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--cc) 35%, var(--line2)); background: color-mix(in srgb, var(--cc) 10%, transparent); color: var(--fg); text-decoration: none; font-size: 12.5px; font-weight: 600; transition: border-color .2s, background .2s; }
.u-chars a:hover { border-color: var(--cc); background: color-mix(in srgb, var(--cc) 20%, transparent); }
.u-chars img, .u-chars i { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; object-position: 50% 20%; flex: none; }
.u-chars i { display: grid; place-items: center; font-style: normal; font-size: 11px; font-weight: 800; color: #fff; background: radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--cc) 80%, white), var(--cc)); }

.u-energies { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
.u-energy { --ic: var(--uc); position: relative; padding: 22px; border-radius: 22px; border: 1px solid color-mix(in srgb, var(--ic) 30%, var(--line)); background: radial-gradient(90% 70% at 50% 0%, color-mix(in srgb, var(--ic) 22%, transparent), transparent 70%), var(--card); overflow: hidden; }
.u-energy .orb { display: block; width: 64px; height: 64px; border-radius: 50%; margin-bottom: 16px; background: radial-gradient(circle at 35% 30%, #fff 0%, color-mix(in srgb, var(--ic) 60%, white) 18%, var(--ic) 52%, color-mix(in srgb, var(--ic) 40%, black) 100%); box-shadow: 0 0 30px var(--ic), 0 0 70px color-mix(in srgb, var(--ic) 45%, transparent); animation: u-pulse 4s ease-in-out infinite alternate; }
.u-energy .orb.dual { background: radial-gradient(circle at 35% 30%, #fff 0%, transparent 22%), linear-gradient(105deg, #ff2e4d 0 48%, #ff4fd8 50%, #2f8bff 52% 100%); box-shadow: -14px 0 30px rgba(255, 46, 77, .7), 14px 0 30px rgba(47, 139, 255, .7); }
.u-energy img { width: 100%; aspect-ratio: 1; object-fit: cover; border-radius: 14px; margin-bottom: 14px; }
.u-energy small { display: block; font-size: 11.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: color-mix(in srgb, var(--ic) 75%, white); }
.u-energy h3 { font-size: 24px; margin: 2px 0 8px; }
.u-energy p { margin: 0; color: var(--muted); font-size: 14.5px; }
@keyframes u-pulse { from { transform: scale(1); filter: brightness(1); } to { transform: scale(1.06); filter: brightness(1.2); } }

.u-timeline { list-style: none; margin: 0; padding: 0 0 0 28px; position: relative; max-width: 820px; }
.u-timeline::before { content: ""; position: absolute; left: 8px; top: 6px; bottom: 6px; width: 2px; background: linear-gradient(180deg, var(--uc), var(--uc2)); opacity: .7; border-radius: 2px; }
.u-timeline li { position: relative; padding: 0 0 26px; }
.u-timeline li::before { content: ""; position: absolute; left: -26px; top: 5px; width: 14px; height: 14px; border-radius: 50%; background: var(--bg); border: 3px solid var(--uc); box-shadow: 0 0 14px var(--uc); }
.u-timeline b { font-family: var(--round); font-size: 19px; }
.u-timeline p { margin: 4px 0 0; color: var(--muted); }
.u-timeline .u-chars { margin-top: 10px; }

@media (prefers-reduced-motion: reduce) { .u-hero > .bg, .u-energy .orb { animation: none; } }
@media (max-width: 980px) {
    .u-energies { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .u-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .u-grid.wide { grid-template-columns: 1fr; }
    .u-grid.wide .u-card.has-img { grid-template-columns: 1fr; }
    .u-grid.wide .u-card.has-img .u-img { aspect-ratio: 16 / 9; }
    .u-grid.wide .u-card.has-img .u-txt { padding: 18px 20px 20px; }
}
@media (max-width: 640px) {
    .u-tabs .wrap { padding: 8px 16px; gap: 8px; }
    .u-tabs button { padding: 8px 10px; column-gap: 9px; }
    .u-tabs button .dot { width: 24px; height: 24px; }
    .u-tabs button b { font-size: 15px; }
    .u-hero { min-height: 82vh; }
    .u-hero .wrap { padding-top: 80px; padding-bottom: 30px; }
    .u-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .u-energies { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .u-energy { padding: 14px; border-radius: 18px; }
    .u-energy .orb { width: 44px; height: 44px; margin-bottom: 12px; }
    .u-energy h3 { font-size: 19px; }
    .u-energy p { font-size: 13px; }
    .u-sec { padding: 46px 0; }
    .u-grid { grid-template-columns: 1fr; }
}
`;
