// =====================================================================================
// Danloud Labs website: WarDecks: Leagues  ->  /ios/wardecks  (also /wardecks)
// WarDecks is in internal beta. Every fact on this page comes from the game's code:
// GameMode, LocalMatchRuleset (Traditional / Power Duels, Warrior and Faction Duel),
// PowerDuelsGuideOverlayView (how Power Duels plays), DeckStyle, BattlefieldRegistry,
// LeagueRank, CampaignCharacter, and the 48-fighter catalog in wardecks-data.js.
// When it reaches the App Store, set APP_STORE and move modes from soon to on.
// =====================================================================================

import { SITE, SITE_APPS, asset } from './site-data.js';
import { ICONS, esc, sitePage } from './site-layout.js';
import { WD_FACTIONS, WD_ROLES, WD_FIGHTERS } from './wardecks-data.js';
import { WD_CSS } from './wardecks-styles.js';

const APP_STORE = '';
const app = SITE_APPS.find((a) => a.slug === 'wardecks');
const img = (path) => asset(`apps/wardecks/${path}.webp`);
const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');
const chevron = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>';

const FOLLOW_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent('[WarDecks: Leagues] Keep me posted')}&body=${encodeURIComponent('Hi Danloud Labs,\n\nPlease let me know when WarDecks: Leagues is available.\n')}`;
const primaryButton = APP_STORE
    ? `<a class="btn btn-store" href="${APP_STORE}" target="_blank" rel="noopener">${ICONS.apple}<span class="two"><small>Download on the</small>App Store</span></a>`
    : `<a class="btn btn-primary" href="${FOLLOW_MAIL}">${ICONS.mail} Get notified at launch</a>`;

const phone = (name, alt, cls = '') => `<span class="phone ${cls}" data-zoom="${img(`screens/${name}`)}" data-caption="${esc(alt)}"><img src="${img(`screens/${name}`)}" alt="${esc(alt)}" loading="lazy"></span>`;

const FACTION = Object.fromEntries(WD_FACTIONS.map((f) => [f.key, f]));
const ROLE = Object.fromEntries(WD_ROLES.map((r) => [r.key, r]));

const STATS = [['48', 'fighters'], ['8', 'roles'], ['6', 'kingdoms'], ['12', 'battlefields'], ['4', 'card decks'], ['15', 'league ranks']];

const MODES = [
    ['Local 2P · Pass & Play', 'Head-to-head on one device, each player at their own end of the screen.', true],
    ['Local 1P · vs CPU', 'The same board, rules and powers, against the CPU.', true],
    ['Campaign', 'Single-player levels and bosses, led by one of six heroes.', false],
    ['Competitive League', 'Ranked battles from Beginner to Mythic.', false],
    ['GameKit Multiplayer', 'Challenge players worldwide through Game Center.', false],
];

// From the menu to the first card (the Local 2P / vs CPU flow).
const PATH = [
    ['battle-mode', 'Battle mode', 'Traditional War, or Power Duels with hero powers.'],
    ['power-setup', 'Rules', 'Team assemble, War stakes and the battle clock.'],
    ['faction-roulette', 'Kingdom', 'Each player picks one of the six factions.'],
    ['character-select', 'Fighter', 'Stats, powers and passive before you commit.'],
    ['battlefield-select', 'Battlefield', 'Twelve arenas in an aerial 3D view.'],
    ['vs-intro', 'To war', 'The two fighters face off, and the first card flips.'],
];

const ATTRS = [
    ['ATK', '#ff9838', 'Attack', 'The combat impact of the Offensive skill.'],
    ['DEF', '#3ddc75', 'Defense', 'Barrier strength and recovery value of the Defensive skill.'],
    ['CON', '#f57075', 'Constitution', 'Offensive energy kept after losing a round.'],
    ['VIT', '#59e6ad', 'Vitality', 'Defensive energy kept after winning a round.'],
    ['SPD', '#ffd966', 'Speed', 'How fast the Offensive bar fills with each win.'],
    ['AGI', '#5fe0ff', 'Agility', 'How fast the Defensive bar fills with each loss.'],
];

const CHARGE = [
    ['Streak', 'Builds on consecutive rounds and resets to zero when the streak breaks.'],
    ['Decay', 'Steady build, and every unfavorable round costs one point.'],
    ['Persistent', 'Never drains. Purely cumulative.'],
];

const MECHANICS = [
    [ICONS.shield, 'Shields & Guard Break', 'A loss by less than a shield’s HP is absorbed and the card is saved. Breaking a shield with raw card power pays double Offensive energy; Archers pierce armor.'],
    [ICONS.flame, 'Momentum', 'Losing to an active Offensive skill doubles your Defensive gain. Beating an Off-Guard rival by enough triggers Vital Shatter. Winning a War never drains your Defensive bar.'],
    [ICONS.lock, 'Sealed or Volatile', 'A sealed bar that reaches 100% waits safely for the right turn. Volatile fighters can lose charge even from a full bar, in exchange for explosive power.'],
    [ICONS.copy, 'Hands & Suit tributes', 'Squires, Tacticians and Archers choose from several cards instead of blind draws. Tacticians sacrifice a card for an effect set by its suit and scaled by its rank.'],
    [ICONS.swap, 'Opposite statuses', 'Haste cures Slow and Slow cancels Haste; a shield cures Off-Guard. Magic Shield blocks incoming debuffs and drains, and Reflect sends them back.'],
    [ICONS.sync, 'Tactical clock', 'In timed matches, any skill that opens a hand, a stash pick or a card sacrifice adds 5 seconds to your turn before a card plays itself.'],
];

const STATUS = [
    ['Shields & wards', '#3ddc75', ['Magic Shield', 'Reflect', 'Sanctuary Aegis', 'Fortress Shield', 'Undying Aegis', 'Ruby Heart Shield', 'Flame Shield']],
    ['Buffs', '#ff9838', ['ATK Boost', 'True Shot', 'Advantage', 'Power Floor', 'Echo of Victory', 'Multi-Card Hand', 'Smokescreen']],
    ['Debuffs', '#f57075', ['ATK Reduction', 'Scorched', 'Curse', 'Off-Guard', 'Disadvantage', 'Power Ceiling', 'Crown Piercer']],
    ['Tempo & energy', '#5fe0ff', ['Haste', 'Slow', 'Dispel', 'Magic Seal', 'Energy Lock', 'Energy Purge', 'Energy Siphon', 'Thermal Stop', 'Heater Gauge']],
];

const DECKS = [
    ['Scorched', 'Burnt parchment and painted royals', '#e07a3c', true],
    ['Classic', 'The traditional English pattern in ivory and gold', '#d6a04f', false],
    ['Frozen', 'Glacial ice and frost-bitten royals', '#7cc8ff', false],
    ['Sylvan', 'Ancient woods and emerald magic', '#3ccf6e', false],
];

const HEROES = [['ignis', 'Ignis', 'red', 'Pyromaniac'], ['gideon', 'Gideon', 'blue', 'Knight'], ['lyra', 'Lyra', 'green', 'Archer'], ['elara', 'Elara', 'yellow', 'White Mage'], ['theodric', 'Theodric', 'orange', 'Crusader'], ['seraphina', 'Seraphina', 'black', 'Tactician']];
const FIELDS = [['autumnforest', 'Autumn Forest'], ['beach', 'Beach'], ['castle', 'Castle'], ['cristalcave', 'Crystal Cave'], ['dessert', 'Desert'], ['field', 'Field'], ['swamp', 'Swamp'], ['throneroom', 'Throne Room'], ['thundermountain', 'Thunder Mountain'], ['volcanic', 'Volcanic'], ['winter', 'Winter'], ['woods', 'Woods']];
const RANKS = ['Beginner', 'Apprentice', 'Soldier', 'Vanguard', 'Scout', 'Veteran', 'Knight', 'Lieutenant', 'Captain', 'Commander', 'General', 'Warlord', 'Champion', 'Legend', 'Mythic'];

const GALLERY = [
    ['title', 'Title screen'], ['start', 'Touch to begin'], ['opening', 'Opening'], ['gameplay', 'Crusader against Archer'],
    ['war-clash', 'War: equal ranks, cards on the line'], ['war-results', 'War results'], ['power-splash', 'Crown Piercer, Lyra of Green'],
    ['crusader-shield', 'A Crusader shield holds'], ['pyro-odds', 'Inferno Odds'], ['heater-explosion', 'Heater explosion'],
    ['game-over', 'Game over'], ['guide-combat', 'In-game Power Duels guide'], ['guide-status', 'Status effects guide'],
    ['role-traits', 'Role traits: Tactician'], ['deck-styles', 'Choose your deck'], ['faction-aerial', 'Kingdom select, aerial view'],
    ['hero-select', 'Campaign heroes'], ['story-bridge', 'Story'], ['story-sword', 'Story'], ['story-cards', 'Story'], ['story-sorceress', 'Story'],
];

const SECTIONS = [['modes', 'Modes'], ['rules', 'Rules'], ['power-duels', 'Power Duels'], ['roles', 'Roles'], ['fighters', 'Fighters'], ['factions', 'Kingdoms'], ['battlefields', 'Battlefields'], ['campaign', 'Campaign'], ['screens', 'Screenshots']];

// ---------- pieces ----------

const head = (eyebrow, title, lead = '') => `<div class="section-head reveal"><div><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${lead ? `<p class="lead">${lead}</p>` : ''}</div></div>`;

const rolePassives = (key) => [...new Set(WD_FIGHTERS.filter((f) => f.role === key).map((f) => f.passive.name))];

const roleCard = (r) => `
    <article class="wd-role reveal">
        <div class="top"><img src="${img(`roles/${r.key}`)}" alt="${esc(r.name)}" loading="lazy"></div>
        <div class="body">
            <h3>${esc(r.name)}<small>${esc(r.emblem)}</small></h3>
            <p class="tac">${esc(r.tactics)}</p>
            <div class="pw"><b class="o">OFF</b>${esc(r.off)}</div>
            <div class="pw"><b class="d">DEF</b>${esc(r.def)}</div>
            <div class="pas">Passive: <strong>${rolePassives(r.key).map(esc).join(' · ')}</strong></div>
        </div>
    </article>`;

const fighterCard = (f) => `
        <button class="wd-fighter" type="button" data-key="${f.key}" data-faction="${f.faction}" data-role="${f.role}" style="--fc:${FACTION[f.faction].color}" aria-label="${esc(`${f.name}, ${ROLE[f.role].name}`)}">
            <span class="art"><img src="${img(`fighters/${f.key}`)}" alt="" loading="lazy"></span>
            <span class="meta"><b>${esc(f.first)}</b><small>${esc(ROLE[f.role].name)}</small></span>
        </button>`;

const chip = (attr, value, label, color) => `<button type="button" data-${attr}="${value}"${value === 'all' ? ' class="on"' : ''}${color ? ` style="--fc:${color}"` : ''}>${color ? '<i></i>' : ''}${esc(label)}</button>`;

const factionCard = (f) => `
    <article class="wd-faction reveal" style="--fc:${f.color}">
        <img src="${img(`factions/${f.key}`)}" alt="${esc(f.title)}" loading="lazy">
        <div class="body">
            <h3><small>${esc(f.name)} faction</small>${esc(f.title)}</h3>
            <div class="wd-squad">${WD_FIGHTERS.filter((x) => x.faction === f.key).map((x) => `<button type="button" data-open="${x.key}" title="${esc(`${x.name} · ${ROLE[x.role].name}`)}"><img src="${img(`fighters/${x.key}`)}" alt="${esc(x.first)}" loading="lazy"></button>`).join('')}</div>
        </div>
    </article>`;

// ---------- page ----------

const body = `
<main class="product wd">
<section class="p-hero">
    <div class="bg"></div>
    <div class="wrap">
        <div>
            <img class="game-logo" src="${img('logo')}" alt="WarDecks: Leagues">
            <h1 style="font-size:clamp(32px,5vw,54px);margin-top:10px">A deck of cards. <span class="hot">An army at war.</span></h1>
            <p class="lead">The classic card game of War, reborn as a medieval battle. Pick one of 48 fighters from six kingdoms, set your rules and your battlefield, and turn the war with Offensive and Defensive powers that charge as every round is won and lost.</p>
            <div class="badges">
                <span class="hot">In beta</span><span>iPhone &amp; iPad</span><span>Pass &amp; Play</span><span>vs CPU</span><span>Power Duels</span>
            </div>
            <div class="cta-row" style="margin-top:24px">
                ${primaryButton}
                <a class="btn btn-ghost" href="#power-duels">How Power Duels works</a>
            </div>
            <p class="note">${APP_STORE ? 'Available on the App Store.' : 'WarDecks: Leagues is in beta testing and coming to the App Store.'}</p>
        </div>
        <div class="devices" aria-hidden="true">
            ${phone('character-select', '', 'back')}
            ${phone('power-splash', '', 'front')}
        </div>
    </div>
    <div class="wrap" style="display:block">
        <div class="p-stats">${STATS.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
    </div>
</section>

<nav class="wd-nav" aria-label="On this page"><div class="wrap">${SECTIONS.map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}</div></nav>

<section id="modes">
    <div class="wrap">
        ${head('Game modes', 'Five ways to go to war.', 'Both local modes are playable in the beta; the rest are on their way.')}
        <div class="modes">${MODES.map(([t, d, on]) => `<div class="mode reveal"><b>${esc(t)}</b><p>${esc(d)}</p><span class="st ${on ? 'on' : 'soon'}">${on ? 'Playable in beta' : 'Coming soon'}</span></div>`).join('')}</div>
        <div style="margin-top:44px">
            ${head('From the menu', 'Six steps to the first card.')}
            <div class="wd-path">${PATH.map(([s, t, d]) => `<div class="wd-step reveal">${phone(s, t)}<b>${esc(t)}</b><p>${esc(d)}</p></div>`).join('')}</div>
        </div>
    </div>
</section>

<section id="rules" style="padding-top:20px">
    <div class="wrap">
        ${head('Battle rules', 'Two ways to fight. Your settings.')}
        <div class="wd-rules">
            <article class="wd-rule reveal" style="--rc:#f3cf86">
                <img class="art" src="${img('rules/survival')}" alt="" loading="lazy">
                <span class="eyebrow">War rules · Classic</span>
                <h3>Traditional</h3>
                <p>The card game of War as you know it, with the stakes and the clock in your hands.</p>
                <div class="wd-opts">
                    <div class="wd-opt"><span class="k">War stakes</span><div><b>Cards bet on every tie</b><span>When ranks tie, each player wagers face-down cards before the decisive flip.</span><div class="wd-pills"><i>1</i><i>2</i><i class="d">3</i><i>4</i><i>5</i></div></div></div>
                    <div class="wd-opt"><span class="k">Survival</span><div><b>Last deck standing</b><span>No clock. The war ends when one side captures all 52 cards.</span></div></div>
                    <div class="wd-opt"><span class="k">Endurance</span><div><b>A battle clock from 1 to 30 minutes</b><span>Most cards when time runs out wins, and 15 seconds of hesitation flips a card for you.</span></div></div>
                </div>
            </article>
            <article class="wd-rule reveal" style="--rc:#ff9838">
                <img class="art" src="${img('rules/powerduels')}" alt="" loading="lazy">
                <span class="eyebrow">Tactical · Hero powers</span>
                <h3>Power Duels</h3>
                <p>The same War, with stakes and an optional clock, plus every fighter’s powers, passive and stats.</p>
                <div class="wd-opts">
                    <div class="wd-opt"><span class="k">Warrior Duel</span><div><b>1 v 1 champion combat</b><span>One fighter each, mastering their Offensive and Defensive powers all battle long.</span></div></div>
                    <div class="wd-opt"><span class="k">Faction Duel</span><div><b>Tag-team with your kingdom</b><span>Bring a squad from your faction and tap TAG before a flip to swap heroes mid-battle.</span>
                        <div class="wd-pills"><i>Squad 2</i><i class="d">3</i><i>4</i><i>8 (all)</i></div>
                        <div class="wd-pills"><i>Tag cooldown: Instant</i><i>2</i><i>4</i><i class="d">8 turns</i></div>
                        <div class="wd-pills"><i class="d">Energy per hero</i><i>or shared across swaps</i></div></div></div>
                </div>
            </article>
        </div>
    </div>
</section>

<section id="power-duels" style="padding-top:20px">
    <div class="wrap">
        ${head('Power Duels', 'Every round charges something.', 'Win a clash and your Offensive bar grows. Lose one and your Defensive bar does. Fill a bar, tap it before you flip, and the war bends your way.')}
        <div class="split-feature reveal">
            <div>
                <span class="eyebrow">Energy bars</span>
                <h3>Two bars, one rhythm.</h3>
                <p class="lead">Every fighter carries an Offensive skill, a Defensive skill and a class passive. When a bar reaches 100%, tap it before flipping your card to unleash or arm the power.</p>
                <div class="wd-bars">
                    <div class="wd-bar" style="--bc:#ff9838;--w:78%"><b><span>OFF</span><span>78%</span></b><i></i><span>Win a round to charge</span></div>
                    <div class="wd-bar" style="--bc:#3ddc75;--w:46%"><b><span>DEF</span><span>46%</span></b><i></i><span>Lose a round to charge</span></div>
                </div>
                <div class="wd-charge">${CHARGE.map(([t, d]) => `<div><b>${t}</b><span>${d}</span></div>`).join('')}</div>
            </div>
            ${phone('power-splash', 'Crown Piercer, Lyra of Green')}
        </div>
        <div class="split-feature flip reveal">
            <div>
                <span class="eyebrow">Six attributes</span>
                <h3>Read a fighter at a glance.</h3>
                <p class="lead">Each fighter is rated from 0 to 10 in six attributes that decide how hard their powers hit and how fast their bars move.</p>
                <div class="wd-attrs">${ATTRS.map(([k, c, n, d]) => `<div class="wd-attr" style="--ac:${c}"><b>${k}</b><span><strong style="color:var(--fg)">${n}.</strong> ${d}</span></div>`).join('')}</div>
            </div>
            ${phone('role-traits', 'Role traits: Tactician')}
        </div>
        <div class="split-feature reveal">
            <div>
                <span class="eyebrow">Shields</span>
                <h3>Hold the line, or shatter it.</h3>
                <p class="lead">Crusader fortress shields endure for several turns and wear down as they absorb blows. Knights parry, Archers pierce armor, and breaking a guard with raw card power pays double.</p>
            </div>
            ${phone('crusader-shield', 'A Crusader shield holds')}
        </div>
        <div class="split-feature flip reveal">
            <div>
                <span class="eyebrow">Heat odds</span>
                <h3>Pyromaniacs gamble with fire.</h3>
                <p class="lead">Open the Heat Odds dial, spend heat to raise your chances, and ignite a buff, or backfire into its exact opposite. Every Defensive activation stokes the furnace from 1:8 to 1:2, and when the Heater gauge blows, whoever loses that clash pays.</p>
            </div>
            ${phone('pyro-odds', 'Inferno Odds')}
        </div>
        <div class="wd-mech">${MECHANICS.map(([ic, t, d]) => `<div class="tool reveal"><span class="ic">${ic}</span><div><b>${t}</b><p>${d}</p></div></div>`).join('')}</div>
        <div style="margin-top:34px">
            ${head('Status effects', 'Know what is on the board.', 'Two status slots per player show what is working for you and against you. The in-game guide explains every one of them.')}
            <div class="wd-status">${STATUS.map(([t, c, list]) => `<div class="reveal" style="--sc:${c}"><h4>${t}</h4><ul>${list.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div>`).join('')}</div>
        </div>
    </div>
</section>

<section id="roles" style="padding-top:20px">
    <div class="wrap">
        ${head('Roles', 'Eight classes. Eight ways to win.', 'A role sets how a fighter plays. Its faction decides the exact powers, so the same role never plays the same way twice.')}
        <div class="wd-roles">${WD_ROLES.map(roleCard).join('')}</div>
    </div>
</section>

<section id="fighters" style="padding-top:20px">
    <div class="wrap">
        ${head('Roster', 'Forty-eight fighters.', 'Every role under all six banners, each with their own stats, Offensive and Defensive powers and passive. Tap a fighter to see their sheet.')}
        <div class="wd-filters">
            <div class="wd-chips" data-group="faction">${chip('faction', 'all', 'All kingdoms')}${WD_FACTIONS.map((f) => chip('faction', f.key, f.name, f.color)).join('')}</div>
            <div class="wd-chips" data-group="role">${chip('role', 'all', 'All roles')}${WD_ROLES.map((r) => chip('role', r.key, r.name)).join('')}</div>
            <span class="wd-count" id="wd-count">48 fighters</span>
        </div>
        <div class="wd-roster" id="wd-roster">${WD_FIGHTERS.map(fighterCard).join('')}</div>
    </div>
</section>

<section id="factions" style="padding-top:20px">
    <div class="wrap">
        ${head('Kingdoms', 'Six banners.', 'Choose a kingdom first, then the fighter who carries its colors into battle.')}
        <div class="wd-factions">${WD_FACTIONS.map(factionCard).join('')}</div>
    </div>
</section>

<section id="battlefields" style="padding-top:20px">
    <div class="wrap">
        ${head('Battlefields', 'Twelve places to fight.', 'Each battlefield brings its own backdrop and its own theme music.')}
        <div class="fields">${FIELDS.map(([k, n]) => `<div class="field" data-zoom="${img(`battlefields/${k}`)}" data-caption="${esc(n)}"><img src="${img(`battlefields/${k}`)}" alt="${esc(n)}" loading="lazy"><span>${esc(n)}</span></div>`).join('')}</div>
        <div class="wd-decks" style="margin-top:44px">
            <div class="reveal">
                <span class="eyebrow">Card decks</span>
                <h2 style="margin-top:8px">Four decks to play with.</h2>
                <p class="lead">Pick the cards you fight with. Every deck is a full 52-card set with its own faces, royals and backs.</p>
                <div class="wd-deck-list">${DECKS.map(([n, t, c, def]) => `<div class="wd-deck" style="--dc:${c}"><b>${n.toUpperCase()}</b><span>${t}</span>${def ? '<br><em>Default</em>' : ''}</div>`).join('')}</div>
            </div>
            ${phone('deck-styles', 'Choose your deck')}
        </div>
    </div>
</section>

<section id="campaign" style="padding-top:20px">
    <div class="wrap">
        ${head('Campaign', 'Choose your hero.', 'Six heroes, one from each kingdom, lead the single-player campaign with animated scenes and their own voices. Coming after the beta.')}
        <div class="heroes">${HEROES.map(([k, n, f, r]) => `<div class="hero-card reveal" style="--fc:${FACTION[f].color}"><div class="art"><img src="${img(`heroes/${k}`)}" alt="${esc(n)}" loading="lazy"></div><b>${esc(n)}</b><small>${esc(FACTION[f].title)} · ${esc(r)}</small></div>`).join('')}</div>
        <div class="card reveal" style="padding:28px;margin-top:22px">
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
        <div class="shots phones">${GALLERY.map(([n, cap]) => phone(n, cap)).join('')}</div>
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
<dialog class="wd-sheet" id="wd-sheet" aria-label="Fighter"></dialog>
<div class="lb" id="lb"><img alt=""></div>`;

// The fighter sheet is built in the browser from this data (the cards above are plain HTML).
const SHEET_DATA = {
    factions: FACTION,
    roles: Object.fromEntries(WD_ROLES.map((r) => [r.key, r.name])),
    fighters: WD_FIGHTERS,
    art: img('fighters/KEY'),
    attrs: ATTRS.map(([k, c]) => [k, c]),
};

const script = `<script type="application/json" id="wd-data">${JSON.stringify(SHEET_DATA).replace(/</g, '\\u003c')}</script>
<script>
document.addEventListener('DOMContentLoaded', () => {
    const D = JSON.parse(document.getElementById('wd-data').textContent);
    const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const art = (key, power) => D.art.replace('KEY', key + (power ? '-power' : ''));

    // Lightbox for screenshots and battlefields.
    const lb = document.getElementById('lb'), lbImg = lb.querySelector('img');
    document.addEventListener('click', (e) => {
        const z = e.target.closest('[data-zoom]');
        if (z && !z.closest('.devices')) { lbImg.src = z.dataset.zoom; lbImg.alt = z.dataset.caption || ''; lb.classList.add('open'); return; }
        if (lb.classList.contains('open') && e.target.closest('#lb')) lb.classList.remove('open');
    });

    // Roster filters.
    const roster = document.getElementById('wd-roster'), count = document.getElementById('wd-count');
    const filter = { faction: 'all', role: 'all' };
    const apply = () => {
        let n = 0;
        roster.querySelectorAll('.wd-fighter').forEach((b) => {
            const show = (filter.faction === 'all' || b.dataset.faction === filter.faction) && (filter.role === 'all' || b.dataset.role === filter.role);
            b.hidden = !show; if (show) n++;
        });
        count.textContent = n + (n === 1 ? ' fighter' : ' fighters');
    };
    document.querySelectorAll('.wd-chips').forEach((group) => group.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        const kind = group.dataset.group; filter[kind] = b.dataset[kind];
        group.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        apply();
    }));

    // Fighter sheet.
    const sheet = document.getElementById('wd-sheet');
    const behavior = { streak: 'Streak', decay: 'Decay', persistent: 'Persistent' };
    const visible = () => [...roster.querySelectorAll('.wd-fighter:not([hidden])')].map((b) => b.dataset.key);
    const power = (cls, label, p, isDef) => '<div class="wd-pow"><div class="h"><span class="tag ' + cls + '">' + label + '</span><b>' + esc(p.name) + '</b>'
        + (p.threshold ? '<span class="meta">Charge ' + p.threshold + ' · ' + behavior[p.behavior] + '</span>' : '') + '</div><p>' + esc(p.text) + '</p></div>';
    const open = (key) => {
        const f = D.fighters.find((x) => x.key === key); if (!f) return;
        const fac = D.factions[f.faction];
        const list = visible().includes(key) ? visible() : D.fighters.map((x) => x.key);
        const i = list.indexOf(key), prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
        sheet.style.setProperty('--fc', fac.color);
        sheet.innerHTML = '<div class="in"><div class="pic"><button class="x" type="button" aria-label="Close">&times;</button><img src="' + art(f.key, true) + '" alt="' + esc(f.name) + '"></div>'
            + '<div class="info"><div class="who"><small>' + esc(fac.title) + ' · ' + esc(D.roles[f.role]) + '</small><h3>' + esc(f.name) + '</h3><p>' + esc(f.title) + ' &nbsp;<span class="spd" title="Speed rating">' + '★'.repeat(f.spd) + '<span style="opacity:.25">' + '★'.repeat(5 - f.spd) + '</span></span></p></div>'
            + '<div class="wd-stats">' + D.attrs.map(([k, c], j) => '<div class="wd-stat" style="--ac:' + c + ';--w:' + (f.stats[j] * 10) + '%"><em>' + k + '</em><i></i><span>' + f.stats[j] + '</span></div>').join('') + '</div>'
            + power('o', 'OFF', f.off) + power('d', 'DEF', f.def) + power('p', 'PASSIVE', f.passive)
            + '<div class="nav"><button class="btn btn-ghost btn-sm" type="button" data-go="' + prev + '">&larr; Previous</button><button class="btn btn-ghost btn-sm" type="button" data-go="' + next + '">Next &rarr;</button></div></div></div>';
        if (!sheet.open) sheet.showModal();
        sheet.scrollTop = 0;
    };
    roster.addEventListener('click', (e) => { const b = e.target.closest('.wd-fighter'); if (b) open(b.dataset.key); });
    document.querySelectorAll('[data-open]').forEach((b) => b.addEventListener('click', () => open(b.dataset.open)));
    sheet.addEventListener('click', (e) => {
        if (e.target === sheet || e.target.closest('.x')) { sheet.close(); return; }
        const go = e.target.closest('[data-go]'); if (go) open(go.dataset.go);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lb.classList.remove('open');
        if (sheet.open && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) { const b = sheet.querySelector(e.key === 'ArrowRight' ? '[data-go]:last-child' : '[data-go]'); if (b) open(b.dataset.go); }
    });

    // Highlight the section in view.
    const links = [...document.querySelectorAll('.wd-nav a')];
    const io = new IntersectionObserver((es) => es.forEach((x) => {
        if (!x.isIntersecting) return;
        links.forEach((a) => {
            const on = a.hash === '#' + x.target.id; a.classList.toggle('on', on);
            if (on) { const bar = a.parentElement; bar.scrollTo({ left: a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' }); }
        });
    }), { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((a) => { const s = document.querySelector(a.hash); if (s) io.observe(s); });
});
</script>`;

export const htmlWarDecks = sitePage({
    title: 'WarDecks: Leagues · The card game of War, at war',
    description: 'WarDecks: Leagues for iPhone and iPad: the classic card game of War reborn as a medieval battle, with 48 fighters, 8 roles, 6 kingdoms, Power Duels, 12 battlefields, 4 card decks and Pass & Play. Now in beta.',
    path: '/ios/wardecks',
    ogImage: img('screens/title'),
    icon: app.icon,
    active: 'apps',
    back: { href: '/ios-apps', label: 'iOS Apps' },
    head: `<style>${WD_CSS}</style>${script}`,
    body,
});
