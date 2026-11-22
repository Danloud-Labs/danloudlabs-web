// =====================================================================================
// Danloud Labs website: AuraSign  ->  /ios/aurasign  (also /aurasign)
// AuraSign is in development. When it reaches the App Store, set APP_STORE below:
// the notify button turns into the App Store button on its own.
// Facts come from the app: two engines (AuraSign Engine, Script Fonts, each card labeled),
// Smart Filters (structure, style, flourish), Shuffle vs New Designs, four pens, Steadiness,
// Polish, Practice (trace, Demo, accuracy, Memory Test, 4x Workbook), Sign Doc, Vault.
// Everything runs on the device: no accounts, nothing uploaded.
// =====================================================================================

import { SITE, SITE_APPS, asset } from './site-data.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const APP_STORE = '';   // e.g. 'https://apps.apple.com/app/idXXXXXXXXXX' once AuraSign is live
const app = SITE_APPS.find((a) => a.slug === 'aurasign');
const art = (name) => asset(`apps/aurasign/${name}.webp`);
const shot = (name) => asset(`apps/aurasign/screens/${name}.webp`);
const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');

const NOTIFY_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent('[AuraSign] Keep me posted')}&body=${encodeURIComponent('Hi Danloud Labs,\n\nPlease let me know when AuraSign is available.\n')}`;
const primaryButton = APP_STORE
    ? `<a class="btn btn-store" href="${APP_STORE}" target="_blank" rel="noopener">${ICONS.apple}<span class="two"><small>Download on the</small>App Store</span></a>`
    : `<a class="btn btn-primary" href="${NOTIFY_MAIL}">${ICONS.mail} Get notified at launch</a>`;

const phone = (name, alt, cls = '') => `<span class="phone ${cls}" data-zoom="${shot(name)}" data-caption="${esc(alt)}"><img src="${shot(name)}" alt="${esc(alt)}" loading="lazy"></span>`;

const STATS = [['2', 'signature engines'], ['6', 'designs per tap'], ['4', 'writing styles'], ['4', 'pens'], ['100%', 'on your device']];

// The two engines, said plainly: every card in the app carries one of these two labels.
const ENGINES = [
    {
        label: 'AuraSign', name: 'AuraSign Engine', color: '#8b6bff', img: 'generator-designs',
        title: 'New signatures, written for you.',
        text: 'AuraSign’s own engine writes each design the way a confident hand signs: a dominant capital, the first letters legible, the rest of the surname flowing into a thread, and a paraph drawn in one gesture. Curves stay round, ink follows the pen’s pressure, and no two designs are alike.',
        list: ['Executive, Classic, Swift and Minimal personalities', 'Each card written with its own pen', 'A quality check keeps the cleanest of every two drafts'],
    },
    {
        label: 'Script Font', name: 'Script Fonts', color: '#38d6ff', img: 'generator-script',
        title: 'Your name in classic cursive.',
        text: 'Prefer the look of a timeless script? This engine writes your name in a curated set of free cursive fonts, exactly as each typeface designs it, and adds the flourish you choose. Every card names its font, so you always know what you are getting.',
        list: ['Hand-picked cursive fonts for each style', 'Free fonts under the SIL Open Font License', 'Practice and the stroke Demo work the same'],
    },
];

const BLOCKS = [
    {
        img: 'generator-filters', eyebrow: 'Smart Generator', title: 'Six designs in one tap.',
        text: 'Type your name, pick a structure, a style and a flourish, and AuraSign lays out six designs. New Designs follows your filters; Shuffle lets the app surprise you. Step back through earlier sets and keep your favorites.',
        list: ['Full Name, Initial + Last, Initials or Compact', 'Classic, Executive, Minimal and Swift', 'Underline, Loop, Slash, Double Line or none', 'Sliders for slant and speed when you want control'],
    },
    {
        img: 'studio', eyebrow: 'Signature Studio', title: 'Draw it yourself, beautifully.',
        text: 'Sign with Apple Pencil, your finger or a mouse. Steadiness smoothing calms a shaky hand without killing the flow, and Polish gives a finished signature a professional finish by fixing rough curves and pen lifts.',
        list: ['Fountain, Brush, Ballpoint and Marker pens', 'Natural, Balanced or Steady Pulse smoothing', 'Trace Guide: draw over a design you like', 'Five ink colors and adjustable width'],
        flip: true,
    },
    {
        img: 'practice', eyebrow: 'Practice', title: 'Make it yours, by hand.',
        text: 'A signature only works if you can sign it. The Training Sheet lets you trace over your design, watch the Demo write it stroke by stroke, and get a fair accuracy score on every repetition until it becomes muscle memory.',
        list: ['Trace over a guide with adjustable opacity', 'Demo replays the real stroke order and pace', 'Accuracy and best score for every repetition', 'Memory Test hides the guide; 4x Workbook drills it'],
    },
];

const TOOLS = [
    ['doc', 'Sign Doc', 'Open a PDF or a photo, or scan a document with the camera, then drag your signature into place and save the signed copy.', '#8b6bff'],
    ['lock', 'Vault', 'Every signature you save, ready to practice, export or sign with. Preview it on transparency, ivory paper or dark contrast.', '#38d6ff'],
    ['scan', 'Scan from paper', 'Already have a signature you love on paper? Scan it and AuraSign digitizes the ink into a clean, transparent signature.', '#ff6fb0'],
];

const GALLERY = [
    ['generator-designs', 'AuraSign Engine designs'], ['generator-script', 'Script Fonts designs'], ['generator-filters', 'Smart Filters'],
    ['practice', 'Training Sheet'], ['studio', 'Signature Studio'],
];

const head = (eyebrow, title, lead = '') => `<div class="section-head reveal"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ''}</div></div>`;

const body = `
<main class="product as" style="--c:#8b6bff;--c2:#38d6ff">
<section class="p-hero">
    <div class="bg"></div>
    <div class="wrap">
        <div>
            <div class="who"><img src="${app.icon}" alt="AuraSign icon"><div><b style="font-size:17px">AuraSign</b><small>Signature Studio</small></div></div>
            <h1>Your signature, <span class="hot">designed with intention.</span></h1>
            <p class="lead">AuraSign designs signatures that look like you mean them. Generate executive signatures from your name, draw your own with a pen that feels real, practice until it is second nature, and sign documents right on your iPhone or iPad.</p>
            <div class="badges">
                <span class="hot">In development</span><span>iPhone &amp; iPad</span><span>Apple Pencil</span><span>On-device</span><span>No account</span>
            </div>
            <div class="cta-row" style="margin-top:24px">
                ${primaryButton}
                <a class="btn btn-ghost" href="#engines">Meet the two engines</a>
            </div>
            <p class="note">${APP_STORE ? 'Available on the App Store.' : 'AuraSign is in development and coming to the App Store.'}</p>
        </div>
        <div class="devices" aria-hidden="true">
            ${phone('generator-script', '', 'back')}
            ${phone('generator-designs', '', 'front')}
        </div>
    </div>
    <div class="wrap" style="display:block">
        <div class="p-stats">${STATS.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
    </div>
</section>

<section id="intro">
    <div class="wrap as-intro">
        <div class="vid reveal"><video controls playsinline preload="none" poster="${art('intro-poster')}" aria-label="AuraSign intro"><source src="/media/apps/aurasign/intro.mp4" type="video/mp4"></video></div>
        <div>
            ${head('The intro', 'Every signature starts <span class="hot">with a single stroke.</span>', 'One confident line, a pen that follows it, and a name that becomes a mark. That is the feeling AuraSign is built around, from the first design to the last signed page.')}
            <img class="as-paper reveal" src="${art('logo-paper')}" alt="The AuraSign mark: a brush stroke and a pen on lined paper" loading="lazy">
        </div>
    </div>
</section>

<section id="engines" style="padding-top:20px">
    <div class="wrap">
        ${head('Two engines', 'Choose how your signature is made.', 'The Generator has two engines, and every design says which one made it: an <b style="color:var(--fg)">AuraSign</b> badge or a <b style="color:var(--fg)">Script Font</b> badge.')}
        <div class="as-engines">${ENGINES.map((e) => `
            <article class="as-engine reveal" style="--ec:${e.color}">
                <div class="txt">
                    <span class="as-badge">${esc(e.label)}</span>
                    <h3>${esc(e.name)}</h3>
                    <p class="t">${esc(e.title)}</p>
                    <p>${esc(e.text)}</p>
                    <ul class="checks">${e.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
                </div>
                ${phone(e.img, e.name)}
            </article>`).join('')}
        </div>
    </div>
</section>

<section id="features">
    <div class="wrap">
        ${BLOCKS.map((b) => `
        <div class="split-feature reveal${b.flip ? ' flip' : ''}">
            <div>
                <span class="eyebrow">${esc(b.eyebrow)}</span>
                <h3>${esc(b.title)}</h3>
                <p class="lead">${esc(b.text)}</p>
                <ul class="checks">${b.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
            </div>
            ${phone(b.img, b.eyebrow)}
        </div>`).join('')}
    </div>
</section>

<section id="tools" style="padding-top:20px">
    <div class="wrap">
        ${head('Put it to work', 'From design to signed document.')}
        <div class="tools-grid">${TOOLS.map(([icon, name, text, color]) => `
            <div class="tool reveal" style="--tc:${color}"><span class="ic">${ICONS[icon]}</span><span><b>${esc(name)}</b><p>${esc(text)}</p></span></div>`).join('')}
        </div>
    </div>
</section>

<section id="screens" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head"><div><span class="eyebrow">Screenshots</span><h2>A closer look</h2></div></div>
        <div class="shots phones">${GALLERY.map(([n, cap]) => `<span class="phone" data-zoom="${shot(n)}" data-caption="${esc(cap)}"><img src="${shot(n)}" alt="${esc(cap)}" loading="lazy"></span>`).join('')}</div>
    </div>
</section>

<section>
    <div class="wrap duo">
        <div class="card">
            <span class="eyebrow">Privacy</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Your signature never leaves your device</h3>
            <p style="color:var(--muted);margin:0 0 14px">AuraSign has no accounts and does not upload anything. Your name, your designs, your practice and the documents you sign stay on your iPhone or iPad.</p>
            <a class="btn btn-ghost btn-sm" href="/privacy">Privacy Policy ${small(ICONS.arrow)}</a>
        </div>
        <div class="card">
            <span class="eyebrow">Credits</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Fonts, credited</h3>
            <p style="color:var(--muted);margin:0 0 14px">The Script Fonts engine uses free fonts released under the SIL Open Font License 1.1 (two of them under the Apache License 2.0). Each design names its font, and the licenses ship with the app.</p>
            <a class="btn btn-ghost btn-sm" href="/support">AuraSign support ${small(ICONS.arrow)}</a>
        </div>
    </div>
</section>

<section style="padding-top:0">
    <div class="wrap">
        <div class="disclaimer">${ICONS.diamond}<span>AuraSign is a design and practice tool for your own signature. It does not verify identity or provide legal advice; whether a signature is valid for a given document depends on the rules that apply to it.</span></div>
    </div>
</section>
</main>
<div class="lb" id="lb"><img alt=""></div>`;

const css = `<style>
.as .p-hero .bg { background:
    linear-gradient(180deg, rgba(6,5,10,.35), rgba(6,5,10,.92) 82%, var(--bg)),
    url('${art('hero')}') center 30% / cover no-repeat; opacity: .9; }
.as .p-hero h1 .hot, .as h2 .hot { background: linear-gradient(135deg, #b9a4ff, #8b6bff 45%, #38d6ff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.as .badges span.hot { background: linear-gradient(135deg, #8b6bff, #38a8ff); }
.as-intro { display: grid; grid-template-columns: minmax(240px, 340px) 1fr; gap: 56px; align-items: center; }
.as-intro .vid { aspect-ratio: 9 / 16; border-radius: 28px; overflow: hidden; background: #000; border: 1px solid color-mix(in srgb, #8b6bff 40%, var(--line)); box-shadow: 0 30px 80px -30px rgba(139, 107, 255, 0.55); }
.as-intro video { width: 100%; height: 100%; display: block; object-fit: cover; }
.as-paper { margin-top: 26px; width: min(320px, 100%); border-radius: 22px; border: 1px solid var(--line); box-shadow: 0 24px 60px -30px rgba(56, 214, 255, .45); }
.as-engines { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.as-engine { display: grid; grid-template-columns: 1fr 210px; gap: 22px; align-items: center; padding: 26px; border-radius: var(--radius); border: 1px solid color-mix(in srgb, var(--ec) 35%, var(--line));
    background: radial-gradient(420px 260px at 0% 0%, color-mix(in srgb, var(--ec) 18%, transparent), transparent 70%), var(--card); }
.as-engine h3 { font-size: 24px; margin: 12px 0 4px; }
.as-engine .t { color: var(--fg); font-weight: 600; margin: 0 0 8px; }
.as-engine p { color: var(--muted); margin: 0 0 12px; }
.as-badge { display: inline-block; font-size: 12px; font-weight: 700; letter-spacing: .3px; padding: 5px 11px; border-radius: 999px; color: var(--ec); background: color-mix(in srgb, var(--ec) 16%, transparent); border: 1px solid color-mix(in srgb, var(--ec) 40%, transparent); }
.as-engine .phone { width: 210px; }
@media (max-width: 1020px) { .as-engines { grid-template-columns: 1fr; } }
@media (max-width: 820px) { .as-intro { grid-template-columns: 1fr; gap: 28px; } .as-intro .vid { width: min(340px, 100%); margin: 0 auto; } .as-paper { margin: 22px auto 0; } }
@media (max-width: 560px) { .as-engine { grid-template-columns: 1fr; } .as-engine .phone { width: min(240px, 100%); margin: 0 auto; } }
</style>`;

const script = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const lb = document.getElementById('lb'), img = lb.querySelector('img');
    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-zoom]');
        if (t) { img.src = t.dataset.zoom; img.alt = t.dataset.caption || ''; lb.classList.add('open'); return; }
        if (lb.classList.contains('open')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
});
</script>`;

export const htmlAuraSign = sitePage({
    title: 'AuraSign · Signature Studio',
    description: 'AuraSign for iPhone and iPad: generate executive signatures from your name with two clearly labeled engines (AuraSign Engine and Script Fonts), draw your own with Apple Pencil, practice with a stroke-by-stroke Demo, and sign documents. Everything stays on your device.',
    path: '/ios/aurasign',
    ogImage: app.banner,
    icon: app.icon,
    active: 'apps',
    back: { href: '/ios-apps', label: 'iOS Apps' },
    head: css + script,
    body,
});
