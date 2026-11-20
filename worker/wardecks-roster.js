// =====================================================================================
// Danloud Labs website: the WarDecks: Leagues roster (/ios/wardecks#fighters).
// Built like the game's character select: the chosen fighter stands in a spotlight on the
// left (power pose on their kingdom's crest, six attributes, powers and passive) while the
// 48 fighters wait on the right as framed cards. Filters use the game's own faction crests
// and role icons. On phones the spotlight steps aside and a card opens the fighter sheet.
// =====================================================================================

import { esc } from './site-layout.js';
import { WD_FACTIONS, WD_ROLES, WD_FIGHTERS } from './wardecks-data.js';

const FACTION = Object.fromEntries(WD_FACTIONS.map((f) => [f.key, f]));
const ROLE = Object.fromEntries(WD_ROLES.map((r) => [r.key, r]));
/** The role icons keep the game's file names (Whitemage.webp, Archer.webp…). */
export const roleIconName = (key) => key.charAt(0).toUpperCase() + key.slice(1);
/** The fighter the spotlight opens with. */
export const SPOTLIGHT_START = 'red-pyromaniac';

const card = (img, f) => `
            <button class="wr-card" type="button" data-key="${f.key}" data-faction="${f.faction}" data-role="${f.role}" style="--fc:${FACTION[f.faction].color}" aria-label="${esc(`${f.name}, ${ROLE[f.role].name}`)}">
                <span class="wm" style="background-image:url('${img(`crests/${f.faction}`)}')"></span>
                <img class="art" src="${img(`fighters/${f.key}`)}" alt="" loading="lazy">
                <img class="ri" src="${img(`role-icons/${roleIconName(f.role)}`)}" alt="" loading="lazy">
                <span class="plate"><b>${esc(f.first)}</b><small>${esc(ROLE[f.role].name)}</small></span>
            </button>`;

export const rosterSection = (img, head) => `
<section id="fighters" style="padding-top:20px">
    <div class="wrap">
        ${head('The roster', 'Forty-eight fighters.', 'Every role under all six banners, each with their own stats, Offensive and Defensive powers and passive. Choose one to see them in the spotlight.')}
        <div class="wr">
            <aside class="wr-spot" id="wr-spot" aria-live="polite"></aside>
            <div class="wr-side">
                <div class="wr-filter">
                    <span class="lbl">Kingdom</span>
                    <div class="wr-opts" data-group="faction">
                        <button type="button" class="all on" data-faction="all" title="All kingdoms"><span>All</span></button>
                        ${WD_FACTIONS.map((f) => `<button type="button" class="crest" data-faction="${f.key}" title="${esc(f.title)}" style="--fc:${f.color}"><img src="${img(`crests/${f.key}`)}" alt="${esc(f.title)}" loading="lazy"></button>`).join('')}
                    </div>
                </div>
                <div class="wr-filter">
                    <span class="lbl">Class</span>
                    <div class="wr-opts" data-group="role">
                        <button type="button" class="all on" data-role="all" title="All classes"><span>All</span></button>
                        ${WD_ROLES.map((r) => `<button type="button" class="icon" data-role="${r.key}" title="${esc(r.name)}"><img src="${img(`role-icons/${roleIconName(r.key)}`)}" alt="${esc(r.name)}" loading="lazy"></button>`).join('')}
                    </div>
                </div>
                <p class="wr-count"><b id="wr-count">48</b> <span id="wr-count-label">fighters · all kingdoms · all classes</span></p>
                <div class="wr-grid" id="wd-roster">${WD_FIGHTERS.map((f) => card(img, f)).join('')}</div>
            </div>
        </div>
    </div>
</section>`;

export const ROSTER_CSS = `
.wr { display: grid; grid-template-columns: 400px 1fr; gap: 26px; align-items: start; }
.wr-side { min-width: 0; }

/* Spotlight */
.wr-spot { --fc: var(--c); position: sticky; top: 132px; max-height: calc(100vh - 150px); overflow: auto; scrollbar-width: none; border-radius: 26px; border: 1px solid color-mix(in srgb, var(--fc) 40%, var(--line)); background: linear-gradient(180deg, color-mix(in srgb, var(--fc) 10%, #120f17), #0b0910 60%); box-shadow: 0 30px 70px -30px color-mix(in srgb, var(--fc) 60%, transparent), inset 0 1px 0 rgba(255, 255, 255, 0.06); transition: border-color .4s, box-shadow .4s; }
.wr-spot::-webkit-scrollbar { display: none; }
.wr-stage { position: relative; height: 380px; overflow: hidden; border-bottom: 1px solid color-mix(in srgb, var(--fc) 30%, transparent); }
.wr-stage .crest { position: absolute; inset: -10% -20% 0; background-size: cover; background-position: center; opacity: .32; filter: blur(1px) saturate(1.1); -webkit-mask-image: radial-gradient(70% 70% at 50% 40%, #000 30%, transparent 75%); mask-image: radial-gradient(70% 70% at 50% 40%, #000 30%, transparent 75%); }
.wr-stage::before { content: ""; position: absolute; inset: 0; background: radial-gradient(60% 45% at 50% 58%, color-mix(in srgb, var(--fc) 45%, transparent), transparent 70%); }
.wr-stage::after { content: ""; position: absolute; left: 18%; right: 18%; bottom: 14px; height: 34px; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--fc) 55%, transparent), transparent); filter: blur(4px); }
.wr-stage .hero { position: absolute; left: 0; right: 0; bottom: 18px; margin: 0 auto; height: 92%; width: auto; max-width: 96%; object-fit: contain; z-index: 1; filter: drop-shadow(0 0 28px color-mix(in srgb, var(--fc) 50%, transparent)) drop-shadow(0 16px 20px rgba(0, 0, 0, 0.65)); animation: wr-in .5s cubic-bezier(.2, .8, .2, 1); }
@keyframes wr-in { from { opacity: 0; transform: translateY(14px) scale(.97); } to { opacity: 1; transform: none; } }
.wr-stage .badge { position: absolute; top: 14px; left: 14px; z-index: 2; display: flex; align-items: center; gap: 9px; padding: 5px 12px 5px 5px; border-radius: 999px; background: rgba(8, 6, 10, 0.72); border: 1px solid color-mix(in srgb, var(--fc) 45%, transparent); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
.wr-stage .badge img { width: 30px; height: 30px; }
.wr-stage .badge span { font-size: 11px; font-weight: 800; letter-spacing: 1.1px; text-transform: uppercase; color: var(--fc); }
.wr-stage .arrows { position: absolute; z-index: 2; inset: auto 12px 16px; display: flex; justify-content: space-between; pointer-events: none; }
.wr-stage .arrows button { pointer-events: auto; width: 38px; height: 38px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.16); background: rgba(8, 6, 10, 0.6); color: var(--fg); font-size: 17px; cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); transition: background .2s, border-color .2s; }
.wr-stage .arrows button:hover { background: color-mix(in srgb, var(--fc) 30%, rgba(8, 6, 10, 0.6)); border-color: var(--fc); }
.wr-info { padding: 18px 20px 20px; display: grid; gap: 14px; }
.wr-name small { display: block; font-size: 11px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: var(--fc); }
.wr-name h3 { margin: 3px 0 0; font-family: Georgia, "Times New Roman", serif; font-size: 27px; letter-spacing: .4px; line-height: 1.1; }
.wr-name p { margin: 4px 0 0; color: var(--muted); font-size: 14px; display: flex; justify-content: space-between; gap: 10px; }
.wr-name .spd { color: var(--gold); letter-spacing: 2px; white-space: nowrap; }
.wr-name .spd i { font-style: normal; opacity: .22; }
.wr .wd-stats { gap: 7px 16px; }
.wr .wd-pow { padding: 11px 12px; border-radius: 14px; }
.wr .wd-pow .h b { font-size: 14.5px; }
.wr .wd-pow p { font-size: 13px; }

/* Filters */
.wr-filter { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
.wr-filter .lbl { flex: none; width: 66px; font-size: 11px; font-weight: 800; letter-spacing: 1.2px; text-transform: uppercase; color: var(--dim); }
.wr-opts { display: flex; gap: 8px; flex-wrap: wrap; }
.wr-opts button { position: relative; padding: 0; cursor: pointer; border: 0; background: none; color: var(--fg); transition: transform .2s; }
.wr-opts button:hover { transform: translateY(-2px); }
.wr-opts .all { height: 46px; padding: 0 16px; border-radius: 14px; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.04); font: inherit; font-size: 13px; font-weight: 700; color: var(--muted); }
.wr-opts .all.on { color: #1a1005; border-color: transparent; background: linear-gradient(135deg, var(--gold), var(--c)); }
.wr-opts .crest { width: 46px; height: 46px; border-radius: 50%; overflow: hidden; border: 2px solid color-mix(in srgb, var(--fc) 45%, transparent); opacity: .62; filter: saturate(.75); transition: transform .2s, opacity .2s, filter .2s, box-shadow .2s, border-color .2s; }
.wr-opts .crest img { width: 100%; height: 100%; object-fit: cover; transform: scale(1.35); }
.wr-opts .crest:hover, .wr-opts .crest.on { opacity: 1; filter: none; }
.wr-opts .crest.on { border-color: var(--fc); box-shadow: 0 0 0 3px rgba(6, 5, 10, 0.9), 0 0 0 4px var(--fc), 0 0 22px var(--fc); }
.wr-opts .icon { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; border: 1px solid var(--line2); background: radial-gradient(closest-side, rgba(255, 255, 255, 0.06), transparent), rgba(255, 255, 255, 0.02); transition: transform .2s, border-color .2s, background .2s; }
.wr-opts .icon img { width: 34px; height: 34px; filter: grayscale(.55) brightness(.85); transition: filter .2s, transform .2s; }
.wr-opts .icon:hover img, .wr-opts .icon.on img { filter: none; transform: scale(1.08); }
.wr-opts .icon.on { border-color: color-mix(in srgb, var(--c) 70%, transparent); background: radial-gradient(closest-side, color-mix(in srgb, var(--c) 30%, transparent), transparent), rgba(255, 255, 255, 0.03); box-shadow: 0 0 18px -4px var(--c); }
.wr-count { margin: 4px 0 16px; color: var(--dim); font-size: 13px; }
.wr-count b { color: var(--gold); font-size: 15px; }

/* Cards */
.wr-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.wr-card { --fc: var(--c); position: relative; aspect-ratio: 3 / 4.15; padding: 0; cursor: pointer; overflow: hidden; border-radius: 16px; color: inherit; font: inherit; text-align: left;
    border: 1px solid color-mix(in srgb, var(--fc) 34%, #2b2333);
    background: radial-gradient(85% 60% at 50% 62%, color-mix(in srgb, var(--fc) 30%, transparent), transparent 72%), linear-gradient(180deg, #1a1520, #0c0a10);
    box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.9);
    transition: transform .25s cubic-bezier(.2, .8, .2, 1), box-shadow .25s, border-color .25s; }
.wr-card::before { content: ""; position: absolute; inset: 5px; z-index: 3; border-radius: 12px; border: 1px solid rgba(243, 207, 134, 0.18); pointer-events: none; transition: border-color .25s; }
.wr-card .wm { position: absolute; inset: -6% -14% 18%; background-size: cover; background-position: center; opacity: .14; filter: grayscale(.2); -webkit-mask-image: radial-gradient(closest-side, #000 40%, transparent); mask-image: radial-gradient(closest-side, #000 40%, transparent); transition: opacity .3s; }
.wr-card .art { position: absolute; left: 0; right: 0; bottom: 34px; margin: 0 auto; height: 80%; width: auto; max-width: 94%; object-fit: contain; z-index: 1; filter: drop-shadow(0 10px 12px rgba(0, 0, 0, 0.7)); transition: transform .35s cubic-bezier(.2, .8, .2, 1), filter .3s; transform-origin: 50% 100%; }
.wr-card .ri { position: absolute; top: 9px; left: 9px; z-index: 3; width: 28px; height: 28px; padding: 3px; border-radius: 50%; background: rgba(8, 6, 10, 0.75); border: 1px solid color-mix(in srgb, var(--fc) 45%, transparent); }
.wr-card .plate { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding: 22px 8px 9px; text-align: center; background: linear-gradient(0deg, rgba(8, 6, 10, 0.96) 45%, transparent); border-bottom: 2px solid var(--fc); }
.wr-card .plate b { display: block; font-family: Georgia, "Times New Roman", serif; font-size: 13.5px; letter-spacing: 1.3px; text-transform: uppercase; line-height: 1.15; }
.wr-card .plate small { display: block; margin-top: 2px; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: color-mix(in srgb, var(--fc) 75%, #fff); }
.wr-card:hover, .wr-card:focus-visible { transform: translateY(-4px); outline: none; border-color: color-mix(in srgb, var(--fc) 70%, transparent); box-shadow: 0 18px 34px -16px color-mix(in srgb, var(--fc) 80%, transparent); }
.wr-card:hover .art, .wr-card:focus-visible .art { transform: scale(1.06); filter: drop-shadow(0 0 16px color-mix(in srgb, var(--fc) 55%, transparent)) drop-shadow(0 10px 12px rgba(0, 0, 0, 0.7)); }
.wr-card:hover .wm { opacity: .26; }
.wr-card.on { border-color: var(--gold); box-shadow: 0 0 0 1px var(--gold), 0 18px 40px -14px color-mix(in srgb, var(--fc) 90%, transparent); }
.wr-card.on::before { border-color: rgba(243, 207, 134, 0.55); }
.wr-card[hidden] { display: none; }

@media (max-width: 1100px) {
    .wr { grid-template-columns: 340px 1fr; }
    .wr-grid { grid-template-columns: repeat(3, 1fr); }
    .wr-stage { height: 330px; }
}
@media (max-width: 980px) {
    .wr { grid-template-columns: 1fr; }
    .wr-spot { display: none; }
    .wr-grid { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 640px) {
    .wr-filter { flex-direction: column; align-items: flex-start; gap: 7px; }
    .wr-opts { flex-wrap: nowrap; overflow-x: auto; max-width: 100%; padding: 6px 4px 8px; scrollbar-width: none; }
    .wr-opts::-webkit-scrollbar { display: none; }
    .wr-opts button { flex: none; }
    .wr-opts .crest, .wr-opts .icon, .wr-opts .all { width: 42px; height: 42px; }
    .wr-opts .all { width: auto; }
    .wr-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .wr-card .plate b { font-size: 11.5px; letter-spacing: .8px; }
    .wr-card .plate small { font-size: 9px; }
    .wr-card .ri { width: 24px; height: 24px; }
}
`;

/** Runs after the page script, which provides window.WD_openSheet for phones. */
export const ROSTER_SCRIPT = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const D = JSON.parse(document.getElementById('wd-data').textContent);
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const url = (tpl, key) => tpl.replace('KEY', key);
    const grid = document.getElementById('wd-roster'), spot = document.getElementById('wr-spot');
    const count = document.getElementById('wr-count'), countLabel = document.getElementById('wr-count-label');
    const wide = window.matchMedia('(min-width: 981px)');
    const behavior = { streak: 'Streak', decay: 'Decay', persistent: 'Persistent' };
    const filter = { faction: 'all', role: 'all' };
    let current = D.start;

    const visible = () => [...grid.querySelectorAll('.wr-card:not([hidden])')].map((b) => b.dataset.key);
    const power = (cls, label, p) => '<div class="wd-pow"><div class="h"><span class="tag ' + cls + '">' + label + '</span><b>' + esc(p.name) + '</b>'
        + (p.threshold ? '<span class="meta">Charge ' + p.threshold + ' · ' + behavior[p.behavior] + '</span>' : '') + '</div><p>' + esc(p.text) + '</p></div>';

    const show = (key) => {
        const f = D.fighters.find((x) => x.key === key); if (!f) return;
        current = key;
        const fac = D.factions[f.faction];
        spot.style.setProperty('--fc', fac.color);
        spot.innerHTML = '<div class="wr-stage"><span class="crest" style="background-image:url(\\'' + url(D.crest, f.faction) + '\\')"></span>'
            + '<span class="badge"><img src="' + url(D.icon, D.iconNames[f.role]) + '" alt=""><span>' + esc(D.roles[f.role]) + '</span></span>'
            + '<img class="hero" src="' + url(D.art, f.key + '-power') + '" alt="' + esc(f.name) + '">'
            + '<span class="arrows"><button type="button" data-step="-1" aria-label="Previous fighter">&larr;</button><button type="button" data-step="1" aria-label="Next fighter">&rarr;</button></span></div>'
            + '<div class="wr-info"><div class="wr-name"><small>' + esc(fac.title) + '</small><h3>' + esc(f.name) + '</h3><p><span>' + esc(f.title) + '</span><span class="spd" title="Speed rating">' + '★'.repeat(f.spd) + '<i>' + '★'.repeat(5 - f.spd) + '</i></span></p></div>'
            + '<div class="wd-stats">' + D.attrs.map(([k, c], j) => '<div class="wd-stat" style="--ac:' + c + ';--w:' + (f.stats[j] * 10) + '%"><em>' + k + '</em><i></i><span>' + f.stats[j] + '</span></div>').join('') + '</div>'
            + power('o', 'OFF', f.off) + power('d', 'DEF', f.def) + power('p', 'PASSIVE', f.passive) + '</div>';
        spot.scrollTop = 0;
        grid.querySelectorAll('.wr-card').forEach((b) => b.classList.toggle('on', b.dataset.key === key));
    };
    const step = (n) => { const list = visible(); if (!list.length) return; const i = list.indexOf(current); show(list[(i + n + list.length) % list.length]); };

    const apply = () => {
        let n = 0;
        grid.querySelectorAll('.wr-card').forEach((b) => {
            const ok = (filter.faction === 'all' || b.dataset.faction === filter.faction) && (filter.role === 'all' || b.dataset.role === filter.role);
            b.hidden = !ok; if (ok) n++;
        });
        count.textContent = n;
        countLabel.textContent = (n === 1 ? 'fighter' : 'fighters') + ' · ' + (filter.faction === 'all' ? 'all kingdoms' : D.factions[filter.faction].title) + ' · ' + (filter.role === 'all' ? 'all classes' : D.roles[filter.role]);
        const list = visible();
        if (list.length && !list.includes(current)) show(list[0]);
    };
    document.querySelectorAll('.wr-opts').forEach((group) => group.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const kind = group.dataset.group; filter[kind] = b.dataset[kind];
        group.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        apply();
    }));
    grid.addEventListener('click', (e) => {
        const b = e.target.closest('.wr-card'); if (!b) return;
        if (wide.matches) show(b.dataset.key); else if (window.WD_openSheet) window.WD_openSheet(b.dataset.key);
    });
    spot.addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (b) step(Number(b.dataset.step)); });
    document.addEventListener('keydown', (e) => {
        if (!wide.matches || document.querySelector('dialog[open]') || !spot.matches(':hover')) return;
        if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1);
    });
    show(current);
});
</script>`;
