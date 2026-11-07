// =====================================================================================
// Myncha: Vampires of Exius — the Characters page (groups as tabs, a card per character) and
// each character's profile page (/characters/<key>): banner, portrait, forms, bio and facts.
// Content lives in myncha-data.js (MY_GROUPS). Art: tools/myncha_assets.py writes
//   characters/<key>.webp (portrait, 3:4) and characters/<key>-banner.webp (16:9),
//   plus one pair per extra form (e.g. wynclaw-beast.webp, myncha-human.webp).
// A missing image falls back to a labeled frame / a colored backdrop.
// =====================================================================================

import { MY, MY_BASE, MY_CHARACTERS, MY_GROUPS, myAsset } from './myncha-data.js';
import { frame, page, pageHead } from './myncha-layout.js';
import { esc } from './site-layout.js';

export const charHref = (c) => `${MY_BASE}/characters/${c.key}`;
const formsOf = (c) => c.forms || [{ suffix: '', name: '' }];
const portraitOf = (c, f = formsOf(c)[0]) => myAsset(`characters/${c.key}${f.suffix}.webp`);
const bannerOf = (c, f = formsOf(c)[0]) => myAsset(`characters/${c.key}${f.suffix}-banner.webp`);

const initials = (name) => name.replace(/^The /, '').split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();

function card(c, color) {
    return `<a class="char reveal" id="${c.key}" href="${charHref(c)}" style="--cc:${color}">
        <span class="pic"><img src="${portraitOf(c)}" alt="${esc(c.name)}" loading="lazy" onerror="this.remove()"><span class="mono">${esc(initials(c.name))}</span></span>
        <span class="meta"><small>${esc(c.role)}</small><b>${esc(c.name)}</b>${c.bio ? '' : '<span>Biography coming soon</span>'}</span>
    </a>`;
}

export function charactersPage() {
    const total = MY_CHARACTERS.length;
    const tabs = MY_GROUPS.map((g, i) => `<button type="button" class="gtab${i === 0 ? ' on' : ''}" data-group="${g.key}" aria-pressed="${i === 0}" style="--gc:${g.color}"><b>${esc(g.name)}</b><small>${g.members.length}</small></button>`).join('');
    const panels = MY_GROUPS.map((g, i) => `
    <div class="gpanel" id="group-${g.key}" style="--gc:${g.color}"${i === 0 ? '' : ' hidden'}>
        <div class="ghead"><h2>${esc(g.name)}</h2><p>${esc(g.text)}</p></div>
        <div class="chars">${g.members.map((c) => card(c, g.color)).join('')}</div>
    </div>`).join('');
    const body = `
${pageHead('Characters', `The people of <span class="grad-bv">Exius</span>`, `${total} characters, and more to come. Myncha is the only one who came from the real world.`)}
<section style="padding-top:24px"><div class="wrap">
    <div class="gtabs" id="gtabs">${tabs}</div>
    ${panels}
</div></section>
<script>
(() => {
    const bar = document.getElementById('gtabs');
    const show = (key) => {
        const btn = bar.querySelector('[data-group="' + key + '"]'); if (!btn) return false;
        bar.querySelectorAll('.gtab').forEach((b) => { const on = b === btn; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
        document.querySelectorAll('.gpanel').forEach((p) => { p.hidden = p.id !== 'group-' + key; if (!p.hidden) p.querySelectorAll('.reveal').forEach((el) => el.classList.add('in')); });
        return true;
    };
    bar.addEventListener('click', (e) => { const b = e.target.closest('[data-group]'); if (!b) return; show(b.dataset.group); history.replaceState(null, '', '#' + b.dataset.group); bar.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    const h = decodeURIComponent(location.hash.slice(1));
    if (h && !show(h)) { const c = document.getElementById(h); const p = c && c.closest('.gpanel'); if (p) { show(p.id.slice(6)); setTimeout(() => c.scrollIntoView({ block: 'center' }), 60); } }
    else if (h) setTimeout(() => bar.scrollIntoView(), 60);
})();
</script>`;
    return page({ title: `Characters · ${MY.title}`, description: `The characters of ${MY.title}: Myncha, Vickie, Rita and the peoples of Exius.`, path: `${MY_BASE}/characters`, active: 'characters', body });
}

export function characterPage(c) {
    const g = c.group;
    const i = MY_CHARACTERS.indexOf(c);
    const prev = MY_CHARACTERS[(i - 1 + MY_CHARACTERS.length) % MY_CHARACTERS.length];
    const next = MY_CHARACTERS[(i + 1) % MY_CHARACTERS.length];
    const forms = formsOf(c);
    const f0 = forms[0];
    const formButtons = forms.length > 1
        ? `<div class="forms" id="forms">${forms.map((f, k) => `<button type="button" data-p="${portraitOf(c, f)}" data-w="${bannerOf(c, f)}"${k === 0 ? ' class="on"' : ''}><img src="${portraitOf(c, f)}" alt="" onerror="this.remove()">${esc(f.name)}</button>`).join('')}</div>`
        : '';
    const facts = [
        ['Group', `<a href="${MY_BASE}/characters#${g.key}">${esc(g.name)}</a>`],
        ['Role', esc(c.role)],
        ...(c.facts || []).map(([k, v]) => [k, esc(v)]),
        ...(forms.length > 1 ? [['Forms', esc(forms.map((f) => f.name).join(' · '))]] : []),
    ];
    const bio = c.bio ? `<p>${esc(c.bio)}</p>` : `<p class="soon">${esc(MY.soon)}</p>`;
    const body = `
<section class="ch-hero" style="--cc:${g.color};padding:0">
    <div class="stage" id="stage"><img class="wp" id="wp" src="${bannerOf(c, f0)}" alt="" onerror="this.remove();document.getElementById('stage').classList.add('empty')"></div>
    <div class="over"><div class="wrap">
        <div class="avatar" id="avatar"><img src="${portraitOf(c, f0)}" alt="${esc(c.name)}" onerror="this.remove()"><span class="mono">${esc(initials(c.name))}</span></div>
        <div>
            <div class="alias">${esc(g.name)}</div>
            <h1>${esc(c.name)}</h1>
            <div class="ch-role">${esc(c.role)}</div>
        </div>
    </div></div>
</section>
<section style="--cc:${g.color};padding-top:30px">
    <div class="wrap">
        ${formButtons}
        <div class="ch-body" style="margin-top:18px">
            <div class="bio">${bio}</div>
            <div class="card"><table class="facts">${facts.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${v}</td></tr>`).join('')}</table></div>
        </div>
        <div class="pn" style="margin-top:44px">
            <a href="${charHref(prev)}"><span>&larr;</span><span><small>Previous</small><b>${esc(prev.name)}</b></span></a>
            <a class="next" href="${charHref(next)}"><span><small>Next</small><b>${esc(next.name)}</b></span><span>&rarr;</span></a>
        </div>
        <p style="margin-top:22px"><a class="btn btn-ghost btn-sm" href="${MY_BASE}/characters#${g.key}">&larr; All characters</a></p>
    </div>
</section>
<script>
(() => {
    const bar = document.getElementById('forms'); if (!bar) return;
    bar.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        bar.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        const stage = document.getElementById('stage');
        let wp = document.getElementById('wp');
        if (!wp) { wp = document.createElement('img'); wp.id = 'wp'; wp.className = 'wp'; wp.alt = ''; stage.appendChild(wp); }
        wp.style.opacity = 0;
        wp.onload = () => { wp.style.opacity = 1; stage.classList.remove('empty'); };
        wp.onerror = () => { wp.remove(); stage.classList.add('empty'); };
        wp.src = b.dataset.w;
        const av = document.querySelector('#avatar img'); if (av) av.src = b.dataset.p;
    });
})();
</script>`;
    return page({
        title: `${c.name} · ${MY.title}`,
        description: `${c.name}, ${c.role} in ${MY.title}. ${c.bio || ''}`.trim().slice(0, 300),
        path: charHref(c), active: 'characters', ogImage: bannerOf(c, f0), body,
    });
}
