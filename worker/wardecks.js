// =====================================================================================
// Danloud Labs website: WarDecks: Leagues  ->  /ios/wardecks  (also /wardecks)
// Complete editorial showcase grounded 1-to-1 in the live SwiftUI iOS/iPadOS game:
//   - Hero with brand-new clean screenshots + 6 live stats + Sticky sub-nav
//   - Game Modes & Battle Rules (Survival / Endurance / Power Duels)
//   - 4 Alternating Editorial Feature Showcases (Copy + Live iPhone Screenshot pairs)
//   - 8 Roles & Class Passives + Interactive 48-Fighter Roster Explorer (Faction × Role)
//   - 6 Factions
//   - Balanced 3-Band Combat Guide & 28 Status Effects Encyclopedia (100% Vector/3D CSS)
//   - 6 Campaign Heroes, 12 Battlefields, 15 League Ranks & 22-Shot Curated Gallery
// =====================================================================================

import { SITE, SITE_APPS, asset } from './site-data.js';
import { ICONS, esc, sitePage } from './site-layout.js';
import {
    WD_STATS, WD_MODES, WD_RULES, WD_SHOWCASES, WD_FACTIONS, WD_ROLES,
    WD_FIGHTERS, WD_COMBAT_GUIDE, WD_STATUS_EFFECTS, WD_HEROES,
    WD_FIELDS, WD_RANKS, WD_GALLERY,
} from './wardecks-data.js';
import { WARDECKS_CSS } from './wardecks-styles.js';

const APP_STORE = '';
const app = SITE_APPS.find((a) => a.slug === 'wardecks');
const img = (path) => asset(`apps/wardecks/${path}.webp`);
const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');

const FOLLOW_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent('[WarDecks: Leagues] Keep me posted')}&body=${encodeURIComponent('Hi Danloud Labs,\n\nPlease let me know when WarDecks: Leagues is available.\n')}`;
const primaryButton = APP_STORE
    ? `<a class="btn btn-store" href="${APP_STORE}" target="_blank" rel="noopener">${ICONS.apple}<span class="two"><small>Download on the</small>App Store</span></a>`
    : `<a class="btn btn-primary" href="${FOLLOW_MAIL}">${ICONS.mail} Get notified at launch</a>`;

const phone = (name, alt, cls = '') => `<span class="phone ${cls}"><img src="${img(`screens/${name}`)}" alt="${esc(alt)}" loading="lazy"></span>`;
const chevron = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';

const FACTION_MAP = Object.fromEntries(WD_FACTIONS.map((f) => [f.id, f]));
const ROLE_MAP = Object.fromEntries(WD_ROLES.map((r) => [r.id, r]));

const STAT_META = [
    ['ATK', '#ff9838'],
    ['DEF', '#3ddc75'],
    ['CON', '#f57075'],
    ['VIT', '#59e6ad'],
    ['SPD', '#ffd966'],
    ['AGI', '#5fe0ff'],
];

const HL_COLORS = {
    'DEBUFF IMMUNITY': '#59f5b8',
    'ARMOR PIERCING': '#ff9838',
    'MAGIC SHIELD': '#59f5b8',
    'Vital Shatter': '#ff4785',
    'Guard Break': '#ff9838',
    'CONSTITUTION': '#f57075',
    'Offensive': '#ff9838',
    'Defensive': '#3ddc75',
    'OFF-LIMIT': '#b87aff',
    'OFF-GUARD': '#ff4785',
    'DEXTERITY': '#f56ba8',
    'VITALITY': '#59e6ad',
    'STRENGTH': '#6bc7ff',
    'MELTDOWN': '#ff4d2e',
    'REFLECT': '#66ebff',
    'DEFENSE': '#3ddc75',
    'AGILITY': '#5fe0ff',
    'ATTACK': '#ff9838',
    'SEALED': '#ffd966',
    'VOLATILE': '#b87aff',
    'DISPEL': '#c7eb3d',
    'HEATER': '#ffd966',
    'SPEED': '#ffd966',
    'GUARD': '#c7eb3d',
    'HASTE': '#ffd966',
    'SLOW': '#73d1ff',
};
const HL_RE = new RegExp(`\\b(${Object.keys(HL_COLORS).join('|')})\\b`, 'g');
const highlightTerms = (raw) => esc(raw).replace(HL_RE, (m) => `<span class="wd-hl" style="color:${HL_COLORS[m]}">${m}</span>`);

// Crisp inline SVG emblems (zero raw Unicode emojis in Status Effects stages)
const svg = (inner) => `<svg class="wd-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const STATUS_SVG = {
    shieldCheck: svg('<path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3z" fill="currentColor" fill-opacity=".18"/><path d="m9 12 2 2 4-4"/>'),
    shieldHalf: svg('<path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3z"/><path d="M12 3v19" stroke-width="1.6"/><path d="M12 3 4 6v6c0 5 3.5 8.5 8 10V3z" fill="currentColor" fill-opacity=".28"/>'),
    shieldSolid: svg('<path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3z" fill="currentColor" fill-opacity=".26"/>'),
    heart: svg('<path d="M12 20.5s-7.5-4.8-9-9.5C1.9 7.5 4.4 4.5 7.5 4.5c2 0 3.5 1.1 4.5 2.5 1-1.4 2.5-2.5 4.5-2.5 3.1 0 5.6 3 4.5 6.5-1.5 4.7-9 9.5-9 9.5z" fill="currentColor" fill-opacity=".32"/>'),
    heartCrack: svg('<path d="M12 20.5s-7.5-4.8-9-9.5C1.9 7.5 4.4 4.5 7.5 4.5c2 0 3.5 1.1 4.5 2.5 1-1.4 2.5-2.5 4.5-2.5 3.1 0 5.6 3 4.5 6.5-1.5 4.7-9 9.5-9 9.5z" fill="currentColor" fill-opacity=".18"/><path d="M12 7 10 11l3 2-2 5"/>'),
    flame: svg('<path d="M12 2c.5 3.5 4 5.5 4 10a4 4 0 1 1-8 0c0-2 1-3.5 2-5 0 1.5 1 2.5 2 2.5 0-2.5 0-5 0-7.5z" fill="currentColor" fill-opacity=".28"/>'),
    target: svg('<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>'),
    chevUp: svg('<path d="m6 15 6-6 6 6"/><path d="m6 10 6-6 6 6"/>'),
    chevDn: svg('<path d="m6 9 6 6 6-6"/><path d="m6 14 6 6 6-6"/>'),
    replay: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
    crownSlash: svg('<path d="M3 17 5 8l4 4 3-6 3 6 4-4 2 9H3z" fill="currentColor" fill-opacity=".2"/><path d="M4 20 20 4" stroke="#ff4d2e" stroke-width="2.4"/>'),
    bolt: svg('<path d="M13 2 4 14h7l-1 8 10-12h-7l0-8z" fill="currentColor" fill-opacity=".28"/>'),
    snowflake: svg('<path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1"/>'),
    shieldX: svg('<path d="M12 3 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3z" fill="currentColor" fill-opacity=".15"/><path d="m9 9 6 6M15 9l-6 6"/>'),
    lock: svg('<rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" fill-opacity=".22"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'),
    sun: svg('<circle cx="12" cy="12" r="4" fill="currentColor" fill-opacity=".3"/><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8"/>'),
    siphon: svg('<path d="M13 2 5 13h6l-1 9 9-11h-6l0-9z" fill="currentColor" fill-opacity=".25"/><circle cx="19" cy="5" r="2" fill="currentColor"/>'),
    stop: svg('<circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity=".16"/><path d="m5.6 5.6 12.8 12.8" stroke-width="2.4"/>'),
    pack: svg('<path d="M6 9a6 6 0 0 1 12 0v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9z" fill="currentColor" fill-opacity=".22"/><path d="M9 9V7a3 3 0 0 1 6 0v2M9 14h6"/>'),
};

const renderStatusAnim = (anim) => {
    switch (anim) {
    case 'magicShield':
        return '<div class="wd-mini-card"></div><div class="anim-magicShield"><span class="wing l"></span><span class="wing r"></span><div class="core"></div></div>';
    case 'magicSeal':
        return `<div class="wd-mini-card"></div><div class="anim-magicSeal"><span class="rune"></span><span class="chain a"></span><span class="chain b"></span>${STATUS_SVG.lock}</div>`;
    case 'reflect':
        return '<div class="wd-mini-card"></div><div class="anim-reflect"><div class="hex"></div></div>';
    case 'purifyingAegis':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.shieldCheck}</div>`;
    case 'crusaderFortress':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.shieldHalf}</div>`;
    case 'knightShield':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.shieldSolid}</div>`;
    case 'rubyHeart':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.heart}</div>`;
    case 'flameShield':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.flame}</div>`;
    case 'atkUp':
        return '<span class="anim-tag">+ATK</span>';
    case 'atkDown':
        return '<span class="anim-tag dn">-ATK</span>';
    case 'trueShot':
        return `<div class="anim-pulse">${STATUS_SVG.target}</div>`;
    case 'advantage':
        return `<div class="wd-mini-card"></div><div class="anim-bob-up">${STATUS_SVG.chevUp}</div>`;
    case 'disadvantage':
        return `<div class="wd-mini-card"></div><div class="anim-bob-dn">${STATUS_SVG.chevDn}</div>`;
    case 'powerFloor':
        return '<div class="anim-floor"><span class="rk">9+</span><span class="bar"></span></div>';
    case 'powerCeiling':
        return '<div class="anim-ceil"><span class="bar"></span><span class="rk">&le;7</span></div>';
    case 'echoReplay':
        return `<div class="anim-spin">${STATUS_SVG.replay}</div>`;
    case 'multiHand':
        return '<div class="anim-fan"><i></i><i></i><i></i></div>';
    case 'offGuard':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.heartCrack}</div>`;
    case 'crownPiercer':
        return `<div class="anim-pulse">${STATUS_SVG.crownSlash}</div>`;
    case 'haste':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.bolt}</div>`;
    case 'slow':
        return `<div class="anim-spin">${STATUS_SVG.snowflake}</div>`;
    case 'dispel':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.shieldX}</div>`;
    case 'energyLock':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.lock}</div>`;
    case 'energyPurge':
        return `<div class="anim-spin">${STATUS_SVG.sun}</div>`;
    case 'flameSiphon':
        return `<div class="wd-mini-card"></div><div class="anim-pulse">${STATUS_SVG.siphon}</div>`;
    case 'thermalStop':
        return `<div class="wd-mini-card"></div><div class="anim-pulse">${STATUS_SVG.stop}</div>`;
    case 'squireRecovery':
        return `<div class="anim-pulse"><span class="ring"></span>${STATUS_SVG.pack}</div>`;
    case 'heaterGauge':
        return '<div class="anim-heater"><b>MAX!</b><div class="cells"><i></i><i></i><i></i><i></i></div></div>';
    default:
        return `<div class="anim-pulse">${STATUS_SVG.shieldSolid}</div>`;
    }
};

const renderFighterCard = (f) => {
    const fac = FACTION_MAP[f.faction];
    const role = ROLE_MAP[f.role];
    const isVolatile = f.offSeal === 'volatile' || f.defSeal === 'volatile';
    const statHtml = f.stats.map((val, i) => {
        const [label, col] = STAT_META[i];
        const pct = Math.round(Math.min(10, Math.max(0, val)) * 10);
        const valText = Number.isInteger(val) ? String(val) : val.toFixed(1);
        return `<div class="wd-stat" style="--sc:${col}">
            <div class="wd-stat-top"><span>${label}</span><b>${valText}</b></div>
            <div class="wd-stat-track"><div class="wd-stat-fill" style="width:${pct}%"></div></div>
        </div>`;
    }).join('');

    const offTag = f.role === 'crusader' ? 'GRD' : (f.role === 'whiteMage' && f.faction === 'black' ? 'STR' : 'OFF');
    const defTag = (f.role === 'whiteMage' && f.faction === 'black') ? 'DEX' : 'DEF';

    return `
    <article class="wd-fighter" data-faction="${f.faction}" data-role="${f.role}" style="--fc:${fac.color}">
        <div class="wd-f-head">
            <img class="wd-f-icon" src="${img(`roles/${role.icon}`)}" alt="${esc(role.name)}" loading="lazy">
            <div class="wd-f-title">
                <h4>${esc(f.name)} <span class="wd-fac-pill">${esc(fac.name)}</span><span class="wd-seal-pill ${isVolatile ? 'volatile' : 'sealed'}">${isVolatile ? 'Volatile' : 'Sealed'}</span></h4>
                <div class="wd-f-sub">${esc(role.name)} · ${esc(fac.title)}</div>
            </div>
        </div>
        <div class="wd-stats6">${statHtml}</div>
        <div class="wd-skills2">
            <div class="wd-skill off">
                <div class="wd-skill-head"><span class="wd-skill-tag">${offTag}</span><span class="wd-skill-name">${esc(f.offName)}</span><span class="wd-skill-u">U${f.offU}</span></div>
                ${esc(f.offDesc)}
            </div>
            <div class="wd-skill def">
                <div class="wd-skill-head"><span class="wd-skill-tag">${defTag}</span><span class="wd-skill-name">${esc(f.defName)}</span><span class="wd-skill-u">U${f.defU}</span></div>
                ${esc(f.defDesc)}
            </div>
        </div>
    </article>`;
};

// Map Combat Guide sections by index for our balanced 3-band desktop layout
const [gBars, gAttrs, gMom, gShields, gHands, gPyro, gCancel, gSeals, gClock] = WD_COMBAT_GUIDE;

const renderCombatCard = (sec) => `
<div class="wd-ccard" style="--ca:${sec.accent}">
    <h4>${esc(sec.title)}</h4>
    ${sec.intro ? `<p>${highlightTerms(sec.intro)}</p>` : ''}
    ${sec.bullets.length ? `<div class="wd-cbullets">${sec.bullets.map(([lbl, col, txt]) => `
        <div class="wd-cbullet" style="--bc:${col}"><b>${esc(lbl)}</b><span>${highlightTerms(txt)}</span></div>`).join('')}</div>` : ''}
</div>`;

const body = `
<main class="product wd-page" style="--c:#d6a04f;--c2:#e5484d">
<section class="p-hero" id="overview">
    <div class="bg"></div>
    <div class="wrap">
        <div>
            <img class="game-logo" src="${img('logo')}" alt="WarDecks: Leagues">
            <h1 style="font-size:clamp(32px,5vw,54px);margin-top:10px">A deck of cards. <span class="hot" style="background:linear-gradient(135deg,#f3cf86,#d6a04f 55%,#b8742c);-webkit-background-clip:text;background-clip:text">An army at war.</span></h1>
            <p class="lead">The classic card game of War reborn as a deep medieval tactical battler for iPhone and iPad. Command 48 unique characters across 8 asymmetric roles and 6 factions — with dual energy bars, live 3D status effects, and true 180° Pass &amp; Play tabletop combat.</p>
            <div class="badges">
                <span class="hot" style="color:#1a1005">In beta</span><span>iPhone &amp; iPad</span><span>Pass &amp; Play 180°</span><span>vs CPU</span><span>Power Duels 3.0</span>
            </div>
            <div class="cta-row" style="margin-top:22px">
                ${primaryButton}
                <a class="btn btn-ghost" href="#roster">Explore all 48 fighters</a>
                <a class="btn btn-ghost" href="#guide">Combat &amp; Status Guide</a>
            </div>
            <p class="note">${APP_STORE ? 'Available on the App Store.' : 'WarDecks: Leagues is in active beta testing and coming to the App Store.'}</p>
        </div>
        <div class="devices" aria-hidden="true">
            ${phone('character-select', 'Character Select — Astrid of Yellow', 'back')}
            ${phone('pyro-odds', 'Power Duels 3.0 — Inferno Odds Dial', 'front')}
        </div>
    </div>
    <div class="wrap" style="display:block">
        <div class="p-stats">${WD_STATS.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
    </div>
</section>

<nav class="wd-subnav" aria-label="WarDecks sections">
    <div class="wrap">
        <a href="#modes">Modes &amp; Rules</a>
        <a href="#showcase">Inside the Game</a>
        <a href="#roles">8 Roles</a>
        <a href="#roster">48 Fighters</a>
        <a href="#factions">6 Factions</a>
        <a href="#guide">Combat &amp; Status Guide</a>
        <a href="#campaign">Campaign</a>
        <a href="#battlefields">Battlefields</a>
        <a href="#screens">Screenshots</a>
    </div>
</nav>

<section id="modes">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Game modes &amp; rules</span><h2>Five modes. Three ways to win.</h2>
        <p class="lead">Local 2P Pass &amp; Play and 1P vs CPU are playable now in beta, with Campaign, Competitive League, and GameKit Multiplayer on the way.</p></div></div>
        <div class="modes">${WD_MODES.map(([t, d, on]) => `<div class="mode reveal"><b>${esc(t)}</b><p>${esc(d)}</p><span class="st ${on ? 'on' : 'soon'}">${on ? 'Playable in beta' : 'Coming soon'}</span></div>`).join('')}</div>
        <div class="rules" style="margin-top:16px">${WD_RULES.map(([k, t, d]) => `<div class="rule reveal"><img src="${img(`rules/${k}`)}" alt="${esc(t)}" loading="lazy"><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}</div>
    </div>
</section>

<section id="showcase">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Inside the arena</span><h2>Built like a fighting game. Played with a deck of cards.</h2>
        <p class="lead">Every screen is engineered for clarity, speed, and dramatic momentum swings — tap any screenshot to inspect it full-screen.</p></div></div>
        <div class="wd-showcase-list">
            ${WD_SHOWCASES.map((sc, idx) => `
            <div class="wd-showcase reveal${idx % 2 === 1 ? ' flip' : ''}" style="--sa:${sc.accent}">
                <div class="wd-sc-copy">
                    <span class="ey">${esc(sc.eyebrow)}</span>
                    <h3>${esc(sc.title)}</h3>
                    <p>${esc(sc.body)}</p>
                    <ul class="wd-sc-points">${sc.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>
                </div>
                <div class="wd-sc-media">
                    ${sc.shots.map(([s, cap]) => `
                    <div class="wd-shot-frame" data-zoom="${img(`screens/${s}`)}" data-caption="${esc(cap)}">
                        <img src="${img(`screens/${s}`)}" alt="${esc(cap)}" loading="lazy">
                        <span class="wd-shot-cap">${esc(cap)}</span>
                    </div>`).join('')}
                </div>
            </div>`).join('')}
        </div>
    </div>
</section>

<section id="roles">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Eight Archetypes</span><h2>Eight roles. Eight class passives.</h2>
        <p class="lead">Every role brings a distinct bar behavior and innate passive skill — then mutates across all six kingdom factions.</p></div></div>
        <div class="wd-roles-grid">${WD_ROLES.map((r) => `
            <div class="wd-role-card reveal">
                <div class="wd-role-top">
                    <img src="${img(`roles/${r.icon}`)}" alt="${esc(r.name)}" loading="lazy">
                    <div><h3>${esc(r.name)}</h3><small>${esc(r.title)}</small></div>
                </div>
                <span class="wd-bar-tag">${esc(r.bars)}</span>
                <p>${esc(r.summary)}</p>
                <div class="wd-passive"><b>Passive · ${esc(r.passive)}</b>${esc(r.passiveDesc)}</div>
            </div>`).join('')}
        </div>
    </div>
</section>

<section id="roster">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Complete 48-Fighter Matrix</span><h2>Every character, stat bar &amp; skill.</h2>
        <p class="lead">Filter by faction or role to inspect all 48 fighters — exact 6-attribute profiles, charge thresholds, Sealed vs Volatile bars, and OFF/DEF skills.</p></div></div>

        <div class="wd-roster-controls">
            <div class="wd-filter-row" id="wd-fac-filters">
                <span class="wd-filter-label">Faction</span>
                <button type="button" class="wd-chip on" data-fac="red" style="--fc:#e5484d"><span class="dot"></span>Red</button>
                ${WD_FACTIONS.filter((f) => f.id !== 'red').map((f) => `<button type="button" class="wd-chip" data-fac="${f.id}" style="--fc:${f.color}"><span class="dot"></span>${esc(f.name)}</button>`).join('')}
                <button type="button" class="wd-chip" data-fac="all" style="--fc:#f3cf86">All 6</button>
            </div>
            <div class="wd-filter-row" id="wd-role-filters">
                <span class="wd-filter-label">Role</span>
                <button type="button" class="wd-chip on" data-role="all" style="--fc:#f3cf86">All 8 Roles</button>
                ${WD_ROLES.map((r) => `<button type="button" class="wd-chip" data-role="${r.id}" style="--fc:#f3cf86">${esc(r.name)}</button>`).join('')}
            </div>
            <div class="wd-roster-meta">
                <span id="wd-roster-count">Showing 8 of 48 fighters</span>
                <span>U# = rounds to charge · 6 RPG stats on a 1–10 scale</span>
            </div>
        </div>

        <div class="wd-fighters-grid" id="wd-fighters-grid">
            ${WD_FIGHTERS.map(renderFighterCard).join('')}
        </div>
    </div>
</section>

<section id="factions">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Six Kingdoms</span><h2>Six banners. Distinct battle philosophies.</h2>
        <p class="lead">Each faction reinterprets every role with its own visual crest, roster, stat balance, and skill variants.</p></div></div>
        <div class="wd-factions">${WD_FACTIONS.map((f) => `
            <div class="wd-faction-card reveal" style="--fc:${f.color}">
                <img src="${img(`factions/${f.id}`)}" alt="${esc(f.name)} faction" loading="lazy">
                <div class="wd-faction-body">
                    <span class="wd-faction-name">${esc(f.name)} Faction</span>
                    <small>${esc(f.title)}</small>
                    <p>${esc(f.vibe)}</p>
                </div>
            </div>`).join('')}
        </div>
    </div>
</section>

<section id="guide">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">In-Game Encyclopedia</span><h2>Power Duels Combat &amp; Status Guide.</h2>
        <p class="lead">Master every energy rule, shield interaction, and all 28 animated status effects — matching the exact HUD badges you see on the battlefield.</p></div></div>

        <div class="wd-guide-shell">
            <div class="wd-guide-top">
                <div>
                    <span class="eyebrow">Interactive Reference</span>
                    <h3 style="font-size:20px;margin-top:3px">POWER DUELS GUIDE</h3>
                </div>
                <div class="wd-guide-tabs" role="tablist">
                    <button type="button" class="wd-gtab on" data-tab="combat" role="tab" aria-selected="true">COMBAT</button>
                    <button type="button" class="wd-gtab" data-tab="status" role="tab" aria-selected="false">STATUS EFFECTS (28)</button>
                </div>
            </div>

            <div class="wd-guide-body">
                <div class="wd-panel" id="wd-tab-combat">
                    <div class="wd-combat-stack">
                        <!-- Band 1: Balanced 2-Column Core (Energy + Momentum | 6 Attributes) -->
                        <div class="wd-band-2">
                            <div class="wd-ccard" style="--ca:#f5c542">
                                <h4>${esc(gBars.title)} &amp; MOMENTUM</h4>
                                <div class="wd-bar-legend">
                                    <div class="wd-bleg" style="--bc:#ff9838"><div class="wd-bleg-top"><b>OFF</b><span>Win to charge</span></div><div class="wd-bleg-track"><div class="wd-bleg-fill"></div></div></div>
                                    <div class="wd-bleg" style="--bc:#3ddc75"><div class="wd-bleg-top"><b>DEF</b><span>Lose to charge</span></div><div class="wd-bleg-track"><div class="wd-bleg-fill"></div></div></div>
                                </div>
                                <p>${highlightTerms(gBars.intro)}</p>
                                <div class="wd-cbullets">${gMom.bullets.map(([lbl, col, txt]) => `
                                    <div class="wd-cbullet" style="--bc:${col}"><b>${esc(lbl)}</b><span>${highlightTerms(txt)}</span></div>`).join('')}
                                </div>
                            </div>
                            <div class="wd-ccard" style="--ca:#5fe0ff">
                                <h4>${esc(gAttrs.title)}</h4>
                                <p>Every one of the 48 fighters is tuned on a 1–10 scale across six attributes that govern power strength, bar speed, and defeat/victory retention.</p>
                                <div class="wd-attr-list">
                                    ${gAttrs.bullets.map(([lbl, col, txt]) => `
                                    <div class="wd-attr-row" style="--bc:${col}">
                                        <b>${esc(lbl)}</b>
                                        <span>${highlightTerms(txt)}</span>
                                    </div>`).join('')}
                                </div>
                            </div>
                        </div>

                        <!-- Band 2: Balanced 3-Column Deep Mechanics -->
                        <div class="wd-band-3">
                            ${renderCombatCard(gShields)}
                            ${renderCombatCard(gHands)}
                            ${renderCombatCard(gPyro)}
                        </div>

                        <!-- Band 3: Balanced 3-Column Rules Footer -->
                        <div class="wd-band-3">
                            ${renderCombatCard(gCancel)}
                            ${renderCombatCard(gSeals)}
                            ${renderCombatCard(gClock)}
                        </div>
                    </div>
                </div>

                <div class="wd-panel" id="wd-tab-status" hidden>
                    <div class="wd-sfilters" id="wd-status-filters">
                        <button type="button" class="wd-chip on" data-cat="all" style="--fc:#ffd966">ALL (28)</button>
                        <button type="button" class="wd-chip" data-cat="shields" style="--fc:#59f5b8">SHIELDS &amp; WARDS</button>
                        <button type="button" class="wd-chip" data-cat="buffs" style="--fc:#ff9838">BUFFS</button>
                        <button type="button" class="wd-chip" data-cat="debuffs" style="--fc:#ff4d2e">DEBUFFS</button>
                        <button type="button" class="wd-chip" data-cat="tempo" style="--fc:#73d1ff">TEMPO &amp; SEALS</button>
                    </div>
                    <div class="wd-sgrid" id="wd-status-grid">
                        ${WD_STATUS_EFFECTS.map((s) => `
                        <article class="wd-scard" data-cat="${s.cat}" style="--kc:${s.color}">
                            <div class="wd-sstage" aria-hidden="true">${renderStatusAnim(s.anim)}</div>
                            <div class="wd-sinfo">
                                <div class="wd-shead"><h4>${esc(s.title)}</h4><span class="wd-skind">${esc(s.kind)}</span></div>
                                <div class="wd-sbadges">${s.badges.map(([txt, col]) => `<span class="wd-spil" style="--bc:${col}">${esc(txt)}</span>`).join('')}</div>
                                <div class="wd-sroles">${esc(s.roles)}</div>
                                <p>${highlightTerms(s.desc)}</p>
                            </div>
                        </article>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="campaign">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Campaign</span><h2>Choose your hero.</h2>
        <p class="lead">Six flagship heroes — one from each faction — lead the single-player campaign, with animated portrait loops and custom voice-overs.</p></div></div>
        <div class="heroes">${WD_HEROES.map(([k, n, f, c, r]) => `<div class="hero-card reveal" style="--fc:${c}"><div class="art"><img src="${img(`heroes/${k}`)}" alt="${esc(n)}" loading="lazy"></div><b>${esc(n)}</b><small>${esc(f)} · ${esc(r)}</small></div>`).join('')}</div>
    </div>
</section>

<section id="battlefields">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Battlefields &amp; Competitive League</span><h2>Twelve arenas. Fifteen ranks to Mythic.</h2></div></div>
        <div class="fields">${WD_FIELDS.map(([k, n]) => `<div class="field" data-zoom="${img(`battlefields/${k}`)}" data-caption="${esc(n)}"><img src="${img(`battlefields/${k}`)}" alt="${esc(n)}" loading="lazy"><span>${esc(n)}</span></div>`).join('')}</div>
        <div class="card reveal" style="padding:24px;margin-top:18px">
            <span class="eyebrow">Competitive League</span>
            <h3 style="font-size:22px;margin:6px 0 6px">Climb fifteen ranks.</h3>
            <p style="margin:0 0 14px;color:var(--muted)">From Beginner to Mythic, with promotion series between divisions. Coming with the Competitive League mode.</p>
            <div class="ranks">${WD_RANKS.map((r, i) => `<span style="--t:${Math.round((i / (WD_RANKS.length - 1)) * 45)}">${esc(r)}</span>${i < WD_RANKS.length - 1 ? chevron : ''}`).join('')}</div>
        </div>
    </div>
</section>

<section id="screens">
    <div class="wrap">
        <div class="section-head"><div><span class="eyebrow">Screenshots</span><h2>From the war table</h2>
        <p class="lead">Captured directly on iPhone from the live beta — tap any shot to view full-screen.</p></div></div>
        <div class="shots phones">${WD_GALLERY.map(([n, cap]) => `<span class="phone" data-zoom="${img(`screens/${n}`)}" data-caption="${esc(cap)}"><img src="${img(`screens/${n}`)}" alt="${esc(cap)}" loading="lazy"></span>`).join('')}</div>
    </div>
</section>

<section>
    <div class="wrap duo">
        <div class="card">
            <span class="eyebrow">Launch</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Be there on day one</h3>
            <p style="color:var(--muted);margin:0 0 14px">WarDecks: Leagues is in beta testing for iPhone and iPad. Write to us and we will let you know when it reaches the App Store.</p>
            ${primaryButton.replace('btn btn-primary', 'btn btn-ghost btn-sm')}
        </div>
        <div class="card">
            <span class="eyebrow">Help</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Questions?</h3>
            <p style="color:var(--muted);margin:0 0 14px">Support for WarDecks: Leagues opens with its release. Until then, the Support Center can reach us.</p>
            <a class="btn btn-ghost btn-sm" href="/support#contact">Contact us ${small(ICONS.arrow)}</a>
        </div>
    </div>
</section>
</main>
<div class="lb" id="lb"><img alt=""></div>`;

const head = `<style>${WARDECKS_CSS}</style><script>
document.addEventListener('DOMContentLoaded', () => {
    // 1. Lightbox zoom
    const lb = document.getElementById('lb'), im = lb.querySelector('img');
    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-zoom]');
        if (t) { im.src = t.dataset.zoom; im.alt = t.dataset.caption || ''; lb.classList.add('open'); return; }
        if (lb.classList.contains('open')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });

    // 2. Interactive 48-Fighter Roster Filters (Faction x Role)
    let activeFac = 'red', activeRole = 'all';
    const cards = Array.from(document.querySelectorAll('#wd-fighters-grid .wd-fighter'));
    const countEl = document.getElementById('wd-roster-count');
    const applyRoster = () => {
        let shown = 0;
        cards.forEach((c) => {
            const ok = (activeFac === 'all' || c.dataset.faction === activeFac) && (activeRole === 'all' || c.dataset.role === activeRole);
            c.hidden = !ok;
            if (ok) shown++;
        });
        if (countEl) countEl.textContent = 'Showing ' + shown + ' of ' + cards.length + ' fighters';
    };
    document.querySelectorAll('#wd-fac-filters .wd-chip').forEach((btn) => {
        btn.addEventListener('click', () => {
            activeFac = btn.dataset.fac;
            document.querySelectorAll('#wd-fac-filters .wd-chip').forEach((b) => b.classList.toggle('on', b === btn));
            applyRoster();
        });
    });
    document.querySelectorAll('#wd-role-filters .wd-chip').forEach((btn) => {
        btn.addEventListener('click', () => {
            activeRole = btn.dataset.role;
            document.querySelectorAll('#wd-role-filters .wd-chip').forEach((b) => b.classList.toggle('on', b === btn));
            applyRoster();
        });
    });
    applyRoster();

    // 3. Interactive 2-Tab Power Duels Guide (COMBAT | STATUS EFFECTS)
    const tabs = document.querySelectorAll('.wd-gtab');
    const pCombat = document.getElementById('wd-tab-combat');
    const pStatus = document.getElementById('wd-tab-status');
    tabs.forEach((t) => {
        t.addEventListener('click', () => {
            const isCombat = t.dataset.tab === 'combat';
            tabs.forEach((b) => { b.classList.toggle('on', b === t); b.setAttribute('aria-selected', String(b === t)); });
            if (pCombat) pCombat.hidden = !isCombat;
            if (pStatus) pStatus.hidden = isCombat;
        });
    });

    // 4. Status Effects Category Filter Chips
    const sCards = Array.from(document.querySelectorAll('#wd-status-grid .wd-scard'));
    document.querySelectorAll('#wd-status-filters .wd-chip').forEach((btn) => {
        btn.addEventListener('click', () => {
            const cat = btn.dataset.cat;
            document.querySelectorAll('#wd-status-filters .wd-chip').forEach((b) => b.classList.toggle('on', b === btn));
            sCards.forEach((c) => { c.hidden = cat !== 'all' && c.dataset.cat !== cat; });
        });
    });
});
</script>`;

export const htmlWarDecks = sitePage({
    title: 'WarDecks: Leagues · The card game of War, at war',
    description: 'WarDecks: Leagues for iPhone and iPad: 48 unique characters, 8 asymmetric roles, 6 factions, Power Duels 3.0, 28 status effects, 12 battlefields, and 180° Pass & Play.',
    path: '/ios/wardecks',
    ogImage: img('screens/title'),
    icon: app.icon,
    active: 'apps',
    back: { href: '/ios-apps', label: 'iOS Apps' },
    head,
    body,
});
