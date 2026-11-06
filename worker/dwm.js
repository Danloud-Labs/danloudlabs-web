// =====================================================================================
// Dark Within Me — pages and routes.
//   /dark-within-me-la-sua-origine            main page (logo hero, books, premise, sections)
//   /dark-within-me-la-sua-origine/story      the four books, one tab each (#la-sua-origine …)
//   /dark-within-me, /dwm                     -> main page
// The Worker's fetch() calls handleDarkWithinMe(request) first; it returns null for other paths.
//
// Book text: assets/projects/dwm/story/<book>.md, read live (edge cache 1 min). Format:
//   ## Prologue                          a chapter (the heading is its title)
//   ## Chapter 1: Triangle of Misfortune "Label: Title"
//   ***                                  a scene break
//   *text*                               italics
// Paragraphs are separated by a blank line.
// =====================================================================================

import { DWM, DWM_BASE, DWM_BOOKS, DWM_PREMISE, DWM_SECTIONS, dwmAsset } from './dwm-data.js';
import { DWM_CSS } from './dwm-styles.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');
const LOGO = dwmAsset('brand/logo.webp');
const COVER_OG = dwmAsset('books/la-sua-origine.webp');

async function loadText(file) {
    try {
        const res = await fetch(`${dwmAsset(`story/${file}`)}?m=${Math.floor(Date.now() / 60000)}`, { cf: { cacheTtl: 60, cacheEverything: true } });
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

function dwmNav(active) {
    const links = [['', 'Home'], ...DWM_SECTIONS.filter((s) => s.status === 'live').map((s) => [s.key, s.nav || s.name])];
    return `<div class="mmx-nav"><div class="wrap"><a href="${DWM_BASE}" style="padding:0;border:0;background:none"><img src="${LOGO}" alt="Dark Within Me"></a>${links.map(([k, n]) => `<a href="${DWM_BASE}${k ? `/${k}` : ''}"${active === k ? ' class="on"' : ''}>${esc(n)}</a>`).join('')}</div></div>`;
}

const note = `<section style="padding-top:0"><div class="wrap"><p class="fan-note">${esc(DWM.copyright)}</p></div></section>`;

function page({ title, description, path, active, body, ogImage }) {
    return sitePage({
        title, description, path, ogImage: ogImage || COVER_OG,
        icon: LOGO,
        active: 'projects',
        back: { href: '/#projects', label: 'Projects' },
        head: `<style>${DWM_CSS}</style>`,
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
    <div class="embers">${embers}</div>
    <div class="wrap">
        <img class="logo" src="${LOGO}" alt="Dark Within Me: La Sua Origine">
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
            const art = s.key === 'story' ? `<div class="art" style="background-image:url('${dwmAsset('books/la-sua-origine.webp')}')"></div>` : '<div class="art none"></div>';
            const inner = `${art}<div class="txt"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p><span class="st"${live ? '' : ' style="background:rgba(255,255,255,.08);color:var(--muted)"'}>${live ? 'Explore' : 'Coming soon'}</span></div>`;
            return live ? `<a class="mmx-section reveal" href="${DWM_BASE}/${s.key}">${inner}</a>` : `<div class="mmx-section reveal">${inner}</div>`;
        }).join('')}</div>
    </div>
</section>`;
    return page({ title: `${DWM.title}: La Sua Origine · Danloud Labs`, description: `${DWM.logline} An original saga by ${DWM.author}.`, path: DWM_BASE, active: '', body });
}

// ---------------------------------------------------------------- story
async function storyPage() {
    const texts = await Promise.all(DWM_BOOKS.map((b) => (b.file ? loadText(b.file) : '')));
    const tabs = DWM_BOOKS.map((b, i) => `<button type="button" class="btab${i === 0 ? ' on' : ''}" data-book="${b.key}" aria-pressed="${i === 0}" style="--bc:${b.color}"><small>Book ${b.n}</small><b>${esc(b.title)}</b></button>`).join('');
    const panels = DWM_BOOKS.map((b, i) => {
        const chapters = parseBook(texts[i] || '');
        const id = (k) => `${b.key}-${k}`;
        const toc = chapters.map((c, k) => `<a href="#${id(k)}" data-ch="${id(k)}"><span>${k}</span>${esc(c.title)}</a>`).join('');
        const reader = chapters.length ? `
        <div class="toc-mobile"><select class="tocsel" aria-label="Jump to chapter">${chapters.map((c, k) => `<option value="${id(k)}">${esc(c.label ? `${c.label}: ${c.title}` : c.title)}</option>`).join('')}</select></div>
        <div class="story">
            <nav class="toc" aria-label="Chapters"><h4>Chapters</h4>${toc}</nav>
            <div class="chapters">${chapters.map((c, k) => `
                <article class="chapter" id="${id(k)}">
                    ${c.label ? `<div class="num">${esc(c.label)}</div>` : ''}
                    <h2>${esc(c.title)}</h2>
                    ${c.html.join('\n')}
                </article>`).join('')}
            </div>
        </div>` : '<div class="bsoon">The chapters of this book are on their way.</div>';
        return `
    <div class="bpanel" id="${b.key}" style="--bc:${b.color}"${i === 0 ? '' : ' hidden'}>
        <div class="bcover" style="${coverStyle(b)}"></div>
        <div class="bsyn"><h2><small>Book ${b.n}</small>${esc(b.title)}</h2>${b.synopsis.map((p) => `<p>${esc(p)}</p>`).join('')}</div>
        ${reader}
    </div>`;
    }).join('');
    const body = `
<section class="page-head"><div class="wrap"><span class="eyebrow">The Story</span><h1>The books of <span class="grad-bv">Dark Within Me</span></h1>
<p class="lead">Read the saga in order: La Sua Origine, The Army of Light, Ricardo Monteoro and After Dawn.</p></div></section>
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
        document.querySelectorAll('.bpanel').forEach((p) => { p.hidden = p.id !== key; });
        return true;
    };
    bar.addEventListener('click', (e) => { const b = e.target.closest('[data-book]'); if (!b) return; show(b.dataset.book); history.replaceState(null, '', '#' + b.dataset.book); bar.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    // #book or #book-<chapter>: open that book (and scroll to the chapter).
    const h = decodeURIComponent(location.hash.slice(1));
    if (h) { const key = [...bar.querySelectorAll('[data-book]')].map((b) => b.dataset.book).find((k) => h === k || h.startsWith(k + '-')); if (key) { show(key); const t = document.getElementById(h); t && setTimeout(() => t.scrollIntoView(), 50); } }
    document.querySelectorAll('.tocsel').forEach((sel) => sel.addEventListener('change', () => { const t = document.getElementById(sel.value); t && t.scrollIntoView({ behavior: 'smooth' }); }));
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const panel = e.target.closest('.bpanel'); const id = e.target.id;
        panel.querySelectorAll('.toc a').forEach((a) => a.classList.toggle('on', a.dataset.ch === id));
        const sel = panel.querySelector('.tocsel'); if (sel) sel.value = id;
    }), { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.chapter').forEach((c) => io.observe(c));
})();
</script>`;
    return page({ title: `The Story · ${DWM.title}`, description: `Read Dark Within Me, an original saga by ${DWM.author}: La Sua Origine, The Army of Light, Ricardo Monteoro and After Dawn.`, path: `${DWM_BASE}/story`, active: 'story', body });
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
    return Response.redirect(`${url.origin}${DWM_BASE}`, 302);
}



