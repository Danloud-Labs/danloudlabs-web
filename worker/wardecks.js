// =====================================================================================
// Danloud Labs website: WarDecks: Leagues  ->  /ios/wardecks  (also /wardecks)
// WarDecks is in internal beta. Facts come from the game (GameMode, LocalMatchRuleset,
// CharacterRole, CharacterFaction, PowerDuelsCatalog, BattlefieldRegistry, LeagueRank).
// When it reaches the App Store, set APP_STORE and move modes from SOON to ON.
// =====================================================================================

import { SITE, SITE_APPS, asset } from './site-data.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const APP_STORE = '';
const app = SITE_APPS.find((a) => a.slug === 'wardecks');
const img = (path) => asset(`apps/wardecks/${path}.webp`);
const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');

const FOLLOW_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent('[WarDecks: Leagues] Keep me posted')}&body=${encodeURIComponent('Hi Danloud Labs,\n\nPlease let me know when WarDecks: Leagues is available.\n')}`;
const primaryButton = APP_STORE
    ? `<a class="btn btn-store" href="${APP_STORE}" target="_blank" rel="noopener">${ICONS.apple}<span class="two"><small>Download on the</small>App Store</span></a>`
    : `<a class="btn btn-primary" href="${FOLLOW_MAIL}">${ICONS.mail} Get notified at launch</a>`;

const phone = (name, alt, cls = '') => `<span class="phone ${cls}"><img src="${img(`screens/${name}`)}" alt="${esc(alt)}" loading="lazy"></span>`;

const STATS = [['48', 'characters'], ['8', 'roles'], ['6', 'factions'], ['12', 'battlefields'], ['15', 'league ranks']];

const MODES = [
    ['Local 2P · Pass & Play', 'Head-to-head battle on one device, each player at their own end of the screen.', true],
    ['Local 1P · vs CPU', 'Battle the CPU with the same Pass & Play rules and board.', true],
    ['Campaign', 'Conquer single-player levels and bosses with one of six heroes.', false],
    ['Competitive League', 'Battle for glory in ranked leagues, from Beginner to Mythic.', false],
    ['GameKit Multiplayer', 'Challenge players worldwide through Game Center.', false],
];

const RULES = [
    ['survival', 'Survival', 'Classic War: play until one side captures all 52 cards. On equal ranks, each side bets 1 to 5 face-down cards into the War pot (3 by default).'],
    ['endurance', 'Endurance', 'A timed match of 1 to 30 minutes. When the clock hits zero, whoever holds the most cards wins. Hesitate 15 seconds and the game flips for you.'],
    ['powerduels', 'Power Duels', 'Survival with tactics: every role charges an Offensive and a Defensive power as the battle goes, and unleashes them at the right moment.'],
];

// Red faction powers (every role has its own powers in each of the six factions).
const ROLES = [
    ['squire', 'Squire', 'Supply Stash', 'Reveal your top 3 deck cards, play the highest. The other 2 return to random deck positions.', 'Lightweight Pack', 'Rescue your highest lost card on defeat.'],
    ['knight', 'Knight', 'Reckless Fury', '+3 combat power to your active card for 1 turn. A single loss resets the charge entirely.', 'Last Stand', 'Force an instant tie, and a War, upon defeat.'],
    ['whitemage', 'White Mage', 'Radiant Ward', 'For 3 turns, cards ranked 3 or below are treated as a 7 in combat.', 'Radiant Mercy', 'Return the lost card directly to your deck.'],
    ['blackmage', 'Black Mage', 'Reaper’s Wager', 'Whoever loses the round also burns 1 random card from their own Won pile, for good.', 'Power Drain', 'Cancel the rival’s armed Offensive power and reset their charge to 0.'],
    ['archer', 'Archer', 'True Shot', 'With Farsight active, +3 combat power to your card, and the round is nullified on a loss.', 'Farsight', 'Reveal the rival’s next deck card for 1 turn.'],
    ['crusader', 'Crusader', 'Shield Bash', 'Recover 5 random cards from your own Won pile back into your deck.', 'Sacred Bastion', 'Immune to enemy Offensive powers for 3 turns; keep your card on a loss.'],
    ['tactician', 'Tactician', 'War Gambit', 'Reveal your next 3 deck cards and play them highest-first over your next 3 turns.', 'Redirection', 'Force the rival to redraw their card when you are about to lose the round.'],
    ['pyromaniac', 'Pyromaniac', 'Slow Burn', 'A 4-round fuse with a +3 buff that jumps to whoever loses each round, then burns a card.', 'Combustion', '+4 Defense. Lose a round while it is active and the buff jumps to the rival.'],
];

const FACTIONS = [['red', 'Red', '#e5484d'], ['blue', 'Blue', '#3f8cff'], ['yellow', 'Yellow', '#f5c542'], ['green', 'Green', '#4ade80'], ['orange', 'Orange', '#ff8a3d'], ['black', 'Black', '#a49cae']];
const HEROES = [['ignis', 'Ignis', 'Red'], ['gideon', 'Gideon', 'Blue'], ['lyra', 'Lyra', 'Green'], ['elara', 'Elara', 'Yellow'], ['theodric', 'Theodric', 'Orange'], ['seraphina', 'Seraphina', 'Black']];
const FIELDS = [['autumnforest', 'Autumn Forest'], ['beach', 'Beach'], ['castle', 'Castle'], ['cristalcave', 'Crystal Cave'], ['dessert', 'Desert'], ['field', 'Field'], ['swamp', 'Swamp'], ['throneroom', 'Throne Room'], ['thundermountain', 'Thunder Mountain'], ['volcanic', 'Volcanic'], ['winter', 'Winter'], ['woods', 'Woods']];
const RANKS = ['Beginner', 'Apprentice', 'Soldier', 'Vanguard', 'Scout', 'Veteran', 'Knight', 'Lieutenant', 'Captain', 'Commander', 'General', 'Warlord', 'Champion', 'Legend', 'Mythic'];
const GALLERY = [
    ['title', 'Title screen'], ['gameplay', 'A War in the Autumn Forest'], ['character-select', 'Local 2P character select'], ['battlefield-select', 'Choose the battlefield'],
    ['hero-select', 'Campaign heroes'], ['start', 'Touch to begin'], ['opening', 'Opening'], ['story-bridge', 'Story'], ['story-sword', 'Story'], ['story-cards', 'Story'], ['story-sorceress', 'Story'],
];
const chevron = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';

const body = `
<main class="product" style="--c:#d6a04f;--c2:#e5484d">
<section class="p-hero">
    <div class="bg"></div>
    <div class="wrap">
        <div>
            <img class="game-logo" src="${img('logo')}" alt="WarDecks: Leagues">
            <h1 style="font-size:clamp(32px,5vw,54px);margin-top:10px">A deck of cards. <span class="hot" style="background:linear-gradient(135deg,#f3cf86,#d6a04f 55%,#b8742c);-webkit-background-clip:text;background-clip:text">An army at war.</span></h1>
            <p class="lead">The classic card game of War, reborn as a medieval battle. Pick a hero from one of six factions, choose your rules and your battlefield, and fight for every card with powers that turn the tide of the war.</p>
            <div class="badges">
                <span class="hot" style="color:#1a1005">In beta</span><span>iPhone &amp; iPad</span><span>Pass &amp; Play</span><span>vs CPU</span><span>Power Duels</span>
            </div>
            <div class="cta-row" style="margin-top:24px">
                ${primaryButton}
                <a class="btn btn-ghost" href="#modes">How to play</a>
            </div>
            <p class="note">${APP_STORE ? 'Available on the App Store.' : 'WarDecks: Leagues is in beta testing and coming to the App Store.'}</p>
        </div>
        <div class="devices" aria-hidden="true">
            ${phone('character-select', '', 'back')}
            ${phone('gameplay', '', 'front')}
        </div>
    </div>
    <div class="wrap" style="display:block">
        <div class="p-stats">${STATS.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
    </div>
</section>

<section id="modes">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Game modes</span><h2>Five ways to go to war.</h2>
        <p class="lead">Two modes are ready to play in the beta; the rest are on their way.</p></div></div>
        <div class="modes">${MODES.map(([t, d, on]) => `<div class="mode reveal"><b>${esc(t)}</b><p>${esc(d)}</p><span class="st ${on ? 'on' : 'soon'}">${on ? 'Playable in beta' : 'Coming soon'}</span></div>`).join('')}</div>
    </div>
</section>

<section id="rules" style="padding-top:10px">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Battle rules</span><h2>Pick how the war is won.</h2></div></div>
        <div class="rules">${RULES.map(([k, t, d]) => `<div class="rule reveal"><img src="${img(`rules/${k}`)}" alt="${esc(t)}" loading="lazy"><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}</div>
    </div>
</section>

<section id="roles" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Power Duels</span><h2>Eight roles, sixteen ways to break the rules.</h2>
        <p class="lead">Each role charges an Offensive and a Defensive power with its own thresholds, and every faction gives the role a different twist. These are the Red faction’s.</p></div></div>
        <div class="roles">${ROLES.map(([k, name, off, offD, def, defD]) => `
            <div class="role reveal">
                <img src="${img(`roles/${k}`)}" alt="${esc(name)}" loading="lazy">
                <h3>${esc(name)}</h3>
                <div class="power"><b><i class="off">OFF</i>${esc(off)}</b>${esc(offD)}</div>
                <div class="power"><b><i class="def">DEF</i>${esc(def)}</b>${esc(defD)}</div>
            </div>`).join('')}
        </div>
    </div>
</section>

<section id="factions" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Factions</span><h2>Six banners. Forty-eight characters.</h2>
        <p class="lead">Every role marches under all six banners, each version with its own look, stats and powers.</p></div></div>
        <div class="factions">${FACTIONS.map(([k, n, c]) => `<div class="faction reveal" style="--fc:${c}"><img src="${img(`factions/${k}`)}" alt="${esc(n)} faction" loading="lazy"><span>${esc(n)} Faction</span></div>`).join('')}</div>
    </div>
</section>

<section id="campaign" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Campaign</span><h2>Choose your hero.</h2>
        <p class="lead">Six heroes, one from each faction, lead the single-player campaign, with animated scenes and their own voices.</p></div></div>
        <div class="heroes">${HEROES.map(([k, n, f]) => `<div class="hero-card reveal"><img src="${img(`heroes/${k}`)}" alt="${esc(n)}" loading="lazy"><b>${esc(n)}</b><small>${esc(f)} Faction</small></div>`).join('')}</div>
    </div>
</section>

<section id="battlefields" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head reveal"><div><span class="eyebrow">Battlefields</span><h2>Twelve places to fight.</h2></div></div>
        <div class="fields">${FIELDS.map(([k, n]) => `<div class="field" data-zoom="${img(`battlefields/${k}`)}" data-caption="${esc(n)}"><img src="${img(`battlefields/${k}`)}" alt="${esc(n)}" loading="lazy"><span>${esc(n)}</span></div>`).join('')}</div>
    </div>
</section>

<section id="leagues" style="padding-top:20px">
    <div class="wrap">
        <div class="card reveal" style="padding:28px">
            <span class="eyebrow">Competitive League</span>
            <h3 style="font-size:24px;margin:8px 0 6px">Climb fifteen ranks.</h3>
            <p style="margin:0 0 18px;color:var(--muted)">From Beginner to Mythic, with promotion series between ranks. Coming with the League mode.</p>
            <div class="ranks">${RANKS.map((r, i) => `<span style="--t:${Math.round((i / (RANKS.length - 1)) * 45)}">${esc(r)}</span>${i < RANKS.length - 1 ? chevron : ''}`).join('')}</div>
        </div>
    </div>
</section>

<section id="screens" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head"><div><span class="eyebrow">Screenshots</span><h2>From the war table</h2></div></div>
        <div class="shots phones">${GALLERY.map(([n, cap]) => `<span class="phone" data-zoom="${img(`screens/${n}`)}" data-caption="${esc(cap)}"><img src="${img(`screens/${n}`)}" alt="${esc(cap)}" loading="lazy"></span>`).join('')}</div>
    </div>
</section>

<section>
    <div class="wrap duo">
        <div class="card">
            <span class="eyebrow">Launch</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Be there on day one</h3>
            <p style="color:var(--muted);margin:0 0 14px">WarDecks: Leagues is in beta testing. Write to us and we will let you know when it reaches the App Store.</p>
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

const script = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const lb = document.getElementById('lb'), im = lb.querySelector('img');
    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-zoom]');
        if (t) { im.src = t.dataset.zoom; im.alt = t.dataset.caption || ''; lb.classList.add('open'); return; }
        if (lb.classList.contains('open')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
});
</script>`;

export const htmlWarDecks = sitePage({
    title: 'WarDecks: Leagues · The card game of War, at war',
    description: 'WarDecks: Leagues for iPhone and iPad: the classic card game of War reborn as a medieval battle, with 48 characters, 8 roles, 6 factions, Power Duels, 12 battlefields and Pass & Play. Now in beta.',
    path: '/ios/wardecks',
    ogImage: img('screens/title'),
    icon: app.icon,
    active: 'apps',
    back: { href: '/ios-apps', label: 'iOS Apps' },
    head: script,
    body,
});
