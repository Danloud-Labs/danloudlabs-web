// =====================================================================================
// Danloud Labs website: WarDecks: Leagues — Editorial CSS
// Tight vertical rhythm, zero dead space between cards, alternating screenshot showcases,
// balanced Combat Guide architecture, interactive 48-Fighter Roster, and bespoke
// SVG + CSS 3D Status Effect miniatures.
// =====================================================================================

export const WARDECKS_CSS = `
/* ---------- Tight Editorial Rhythm ---------- */
.wd-page section { padding: 46px 0; border-top: 1px solid rgba(255, 255, 255, 0.045); }
.wd-page section.p-hero { border-top: 0; padding-bottom: 36px; }
.wd-page .section-head { margin-bottom: 24px; }
.wd-page .section-head h2 { margin: 6px 0 8px; }

/* ---------- Sticky Sub-Nav ---------- */
.wd-subnav {
    position: sticky; top: 62px; z-index: 40;
    background: rgba(8, 7, 13, 0.86);
    backdrop-filter: saturate(160%) blur(18px);
    -webkit-backdrop-filter: saturate(160%) blur(18px);
    border-top: 1px solid rgba(214, 160, 79, 0.16);
    border-bottom: 1px solid rgba(214, 160, 79, 0.24);
}
.wd-subnav .wrap {
    display: flex; align-items: center; gap: 6px;
    overflow-x: auto; scrollbar-width: none;
    padding-top: 9px; padding-bottom: 9px;
}
.wd-subnav .wrap::-webkit-scrollbar { display: none; }
.wd-subnav a {
    flex: none; text-decoration: none; font-size: 12.5px; font-weight: 700;
    letter-spacing: .35px; color: var(--muted);
    padding: 6px 12px; border-radius: 999px;
    border: 1px solid transparent; transition: .18s;
}
.wd-subnav a:hover {
    color: #f3cf86; background: rgba(214, 160, 79, 0.12);
    border-color: rgba(214, 160, 79, 0.35);
}

/* ---------- Editorial Feature Showcases (Copy + Live iPhone Shots) ---------- */
.wd-showcase-list { display: flex; flex-direction: column; gap: 22px; }
.wd-showcase {
    display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 28px; align-items: center;
    padding: 26px 28px; border-radius: 22px;
    border: 1px solid var(--line);
    background:
        radial-gradient(520px 260px at 85% 50%, color-mix(in srgb, var(--sa, #d6a04f) 14%, transparent), transparent 70%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.008)),
        var(--card);
}
.wd-showcase.flip { grid-template-columns: 0.95fr 1.05fr; }
.wd-showcase.flip .wd-sc-copy { order: 2; }
.wd-showcase.flip .wd-sc-media { order: 1; }
.wd-sc-copy .ey {
    display: inline-block; font-size: 11px; font-weight: 800; letter-spacing: 1.5px;
    text-transform: uppercase; color: var(--sa, #d6a04f); margin-bottom: 6px;
}
.wd-sc-copy h3 { font-size: clamp(21px, 2.4vw, 28px); line-height: 1.18; margin-bottom: 10px; }
.wd-sc-copy p { margin: 0 0 14px; color: var(--muted); font-size: 14.5px; line-height: 1.6; }
.wd-sc-points { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
.wd-sc-points li {
    display: flex; align-items: flex-start; gap: 9px;
    font-size: 13.5px; color: rgba(245, 241, 248, 0.9); line-height: 1.48;
}
.wd-sc-points li::before {
    content: ""; flex: none; width: 7px; height: 7px; margin-top: 7px;
    border-radius: 50%; background: var(--sa, #d6a04f);
    box-shadow: 0 0 8px var(--sa, #d6a04f);
}
.wd-sc-media {
    display: flex; justify-content: center; align-items: center; gap: 14px;
}
.wd-shot-frame {
    position: relative; width: 47%; max-width: 215px; border-radius: 22px; overflow: hidden;
    border: 1.5px solid rgba(255, 255, 255, 0.16); background: #000;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65);
    cursor: zoom-in; transition: transform .25s, border-color .25s;
}
.wd-shot-frame:hover { transform: translateY(-4px) scale(1.02); border-color: color-mix(in srgb, var(--sa, #d6a04f) 75%, #fff); }
.wd-shot-frame img { width: 100%; height: auto; display: block; }
.wd-shot-cap {
    position: absolute; left: 0; right: 0; bottom: 0;
    padding: 20px 10px 8px; font-size: 10.5px; font-weight: 700; letter-spacing: .3px;
    color: #fff; text-align: center;
    background: linear-gradient(0deg, rgba(0,0,0,0.88), transparent);
}

/* ---------- Role Overview Cards (8 Roles + Passives) ---------- */
.wd-roles-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.wd-role-card {
    border-radius: 18px; border: 1px solid var(--line); background: var(--card);
    padding: 15px; display: flex; flex-direction: column; gap: 9px;
    transition: transform .2s, border-color .2s;
}
.wd-role-card:hover { transform: translateY(-2px); border-color: rgba(214, 160, 79, 0.48); }
.wd-role-top { display: flex; align-items: center; gap: 11px; }
.wd-role-top img { width: 48px; height: 48px; border-radius: 11px; flex: none; object-fit: cover; border: 1px solid var(--line2); }
.wd-role-top h3 { font-size: 15px; text-transform: uppercase; letter-spacing: .45px; }
.wd-role-top small { display: block; font-size: 11.5px; color: var(--muted); margin-top: 1px; }
.wd-bar-tag {
    display: inline-block; align-self: flex-start;
    font-size: 10px; font-weight: 800; letter-spacing: .7px; text-transform: uppercase;
    padding: 3px 8px; border-radius: 999px;
    color: #f3cf86; background: rgba(214, 160, 79, 0.12); border: 1px solid rgba(214, 160, 79, 0.3);
}
.wd-role-card p { margin: 0; font-size: 12.8px; color: var(--muted); line-height: 1.48; }
.wd-passive {
    margin-top: auto; padding: 9px 10px; border-radius: 11px;
    background: rgba(255, 255, 255, 0.035); border: 1px solid rgba(255, 255, 255, 0.07);
    font-size: 12px; color: var(--muted); line-height: 1.42;
}
.wd-passive b { display: block; color: #ffd966; font-size: 11px; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 2px; }

/* ---------- Interactive 48-Fighter Roster Explorer ---------- */
.wd-roster-controls {
    display: flex; flex-direction: column; gap: 9px;
    padding: 14px 16px; border-radius: 16px; border: 1px solid var(--line);
    background: rgba(21, 17, 28, 0.92); margin-bottom: 14px;
}
.wd-filter-row { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.wd-filter-label {
    font-size: 10.5px; font-weight: 800; letter-spacing: 1.1px; text-transform: uppercase;
    color: var(--dim); margin-right: 4px; min-width: 60px;
}
.wd-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5.5px 11px; border-radius: 999px; cursor: pointer;
    font-family: var(--ui); font-size: 12px; font-weight: 700;
    color: var(--muted); background: rgba(255, 255, 255, 0.045);
    border: 1px solid var(--line2); transition: .18s;
}
.wd-chip:hover { color: var(--fg); border-color: rgba(255, 255, 255, 0.25); }
.wd-chip.on {
    color: #0b0910; background: var(--fc, #f3cf86);
    border-color: var(--fc, #f3cf86);
    box-shadow: 0 0 14px color-mix(in srgb, var(--fc, #f3cf86) 42%, transparent);
}
.wd-chip .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--fc, #fff); }
.wd-chip.on .dot { background: #0b0910; }
.wd-roster-meta {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;
    font-size: 12px; color: var(--muted); padding-top: 6px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}
.wd-fighters-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.wd-fighter {
    border-radius: 16px; border: 1px solid var(--line);
    background: linear-gradient(180deg, color-mix(in srgb, var(--fc) 8%, transparent), transparent 40%), var(--card);
    padding: 14px; display: flex; flex-direction: column; gap: 10px;
    transition: border-color .2s, transform .2s;
}
.wd-fighter:hover { border-color: color-mix(in srgb, var(--fc) 58%, var(--line)); transform: translateY(-2px); }
.wd-f-head { display: flex; align-items: center; gap: 11px; }
.wd-f-icon {
    width: 44px; height: 44px; border-radius: 11px; flex: none;
    object-fit: cover; border: 1.5px solid color-mix(in srgb, var(--fc) 68%, transparent);
}
.wd-f-title { flex: 1; min-width: 0; }
.wd-f-title h4 { margin: 0; font-family: var(--round); font-size: 16px; font-weight: 800; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.wd-f-sub { font-size: 11.8px; color: var(--muted); margin-top: 1px; }
.wd-fac-pill {
    font-size: 9.5px; font-weight: 800; letter-spacing: .5px; text-transform: uppercase;
    padding: 2px 7px; border-radius: 999px;
    color: var(--fc); background: color-mix(in srgb, var(--fc) 14%, transparent);
    border: 1px solid color-mix(in srgb, var(--fc) 42%, transparent);
}
.wd-seal-pill {
    font-size: 9px; font-weight: 800; letter-spacing: .5px; text-transform: uppercase;
    padding: 2px 6.5px; border-radius: 999px;
}
.wd-seal-pill.sealed { color: #ffd966; background: rgba(255, 217, 102, 0.11); border: 1px solid rgba(255, 217, 102, 0.34); }
.wd-seal-pill.volatile { color: #c084fc; background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.44); }

.wd-stats6 { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
.wd-stat { display: flex; flex-direction: column; gap: 3px; }
.wd-stat-top { display: flex; justify-content: space-between; font-size: 9.5px; font-weight: 800; }
.wd-stat-top span { color: var(--sc); }
.wd-stat-top b { color: var(--fg); font-variant-numeric: tabular-nums; }
.wd-stat-track { height: 4.5px; border-radius: 999px; background: rgba(255, 255, 255, 0.08); overflow: hidden; }
.wd-stat-fill { height: 100%; border-radius: 999px; background: var(--sc); }

.wd-skills2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: auto; }
.wd-skill {
    padding: 9px 10px; border-radius: 11px;
    background: rgba(0, 0, 0, 0.28); border: 1px solid rgba(255, 255, 255, 0.065);
    font-size: 12px; color: var(--muted); line-height: 1.42;
}
.wd-skill.off { border-left: 2.5px solid #ff9838; }
.wd-skill.def { border-left: 2.5px solid #3ddc75; }
.wd-skill-head { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; margin-bottom: 3px; }
.wd-skill-tag { font-size: 9px; font-weight: 900; letter-spacing: .5px; padding: 1.5px 5.5px; border-radius: 5px; }
.wd-skill.off .wd-skill-tag { color: #ffb347; background: rgba(255, 152, 56, 0.16); }
.wd-skill.def .wd-skill-tag { color: #4ade80; background: rgba(61, 220, 117, 0.14); }
.wd-skill-name { font-weight: 800; color: var(--fg); font-size: 12.2px; }
.wd-skill-u { margin-left: auto; font-size: 9.5px; font-weight: 800; color: var(--dim); font-variant-numeric: tabular-nums; }

/* ---------- Factions ---------- */
.wd-factions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.wd-faction-card {
    border-radius: 18px; overflow: hidden; border: 1px solid var(--line);
    background: var(--card); display: flex; flex-direction: column;
    transition: transform .2s, border-color .2s;
}
.wd-faction-card:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--fc) 60%, var(--line)); }
.wd-faction-card img { width: 100%; height: auto; display: block; }
.wd-faction-body { padding: 12px 14px 14px; display: flex; flex-direction: column; gap: 4px; }
.wd-faction-name { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; }
.wd-faction-name::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--fc); box-shadow: 0 0 10px var(--fc); }
.wd-faction-body small { font-size: 10.5px; font-weight: 700; letter-spacing: .8px; text-transform: uppercase; color: var(--fc); }
.wd-faction-body p { margin: 2px 0 0; font-size: 12.8px; color: var(--muted); line-height: 1.45; }

/* ---------- Editorial Power Duels Guide (Symmetrical, Zero Gaps) ---------- */
.wd-guide-shell {
    border-radius: 22px; border: 1.5px solid rgba(214, 160, 79, 0.45);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.025), rgba(0, 0, 0, 0.25)), #100d16;
    box-shadow: 0 22px 54px rgba(0, 0, 0, 0.5);
    overflow: hidden;
}
.wd-guide-top {
    display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;
    padding: 16px 22px; border-bottom: 1px solid rgba(214, 160, 79, 0.22);
    background: rgba(0, 0, 0, 0.32);
}
.wd-guide-tabs { display: flex; gap: 8px; }
.wd-gtab {
    padding: 8.5px 18px; border-radius: 11px; cursor: pointer;
    font-family: var(--round); font-size: 12.5px; font-weight: 800; letter-spacing: .7px;
    color: var(--muted); background: rgba(255, 255, 255, 0.055);
    border: 1px solid rgba(255, 255, 255, 0.12); transition: .2s;
}
.wd-gtab:hover { color: var(--fg); }
.wd-gtab.on[data-tab="combat"] {
    color: #160e02; background: linear-gradient(135deg, #ffe066, #ff9838);
    border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 0 18px rgba(255, 152, 56, 0.4);
}
.wd-gtab.on[data-tab="status"] {
    color: #031518; background: linear-gradient(135deg, #66ebff, #59f5b8);
    border-color: rgba(255, 255, 255, 0.5); box-shadow: 0 0 18px rgba(102, 235, 255, 0.4);
}
.wd-guide-body { padding: 20px 22px 22px; }
.wd-panel[hidden] { display: none !important; }

/* Balanced 3-Band Combat Layout (No uneven heights, no orphans) */
.wd-combat-stack { display: flex; flex-direction: column; gap: 14px; }
.wd-band-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; align-items: stretch; }
.wd-band-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; align-items: stretch; }
.wd-ccard {
    border-radius: 16px; padding: 16px 18px;
    background: rgba(255, 255, 255, 0.032);
    border: 1px solid color-mix(in srgb, var(--ca) 32%, var(--line));
    display: flex; flex-direction: column; gap: 10px;
}
.wd-ccard h4 {
    margin: 0; font-size: 11.5px; font-weight: 900; letter-spacing: .95px;
    text-transform: uppercase; color: var(--ca);
}
.wd-ccard p { margin: 0; font-size: 13.2px; color: rgba(245, 241, 248, 0.9); line-height: 1.56; }
.wd-bar-legend { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; }
.wd-bleg {
    padding: 8px 10px; border-radius: 10px;
    background: color-mix(in srgb, var(--bc) 10%, rgba(0,0,0,0.35));
    border: 1px solid color-mix(in srgb, var(--bc) 40%, transparent);
}
.wd-bleg-top { display: flex; justify-content: space-between; font-size: 11px; font-weight: 800; margin-bottom: 5px; }
.wd-bleg-top b { color: var(--bc); }
.wd-bleg-top span { color: var(--muted); font-size: 10px; }
.wd-bleg-track { height: 6.5px; border-radius: 999px; background: rgba(0,0,0,0.55); border: 1px solid color-mix(in srgb, var(--bc) 55%, transparent); overflow: hidden; }
.wd-bleg-fill { width: 72%; height: 100%; border-radius: 999px; background: linear-gradient(90deg, color-mix(in srgb, var(--bc) 70%, #fff), var(--bc)); box-shadow: 0 0 8px var(--bc); }
.wd-cbullets { display: flex; flex-direction: column; gap: 8px; }
.wd-cbullet b { display: block; font-size: 11px; font-weight: 900; letter-spacing: .45px; color: var(--bc); margin-bottom: 1.5px; }
.wd-cbullet span { display: block; font-size: 12.6px; color: rgba(245, 241, 248, 0.88); line-height: 1.48; }
.wd-attr-list { display: flex; flex-direction: column; gap: 8px; }
.wd-attr-row {
    display: grid; grid-template-columns: 118px 1fr; gap: 10px; align-items: baseline;
    padding: 7px 10px; border-radius: 10px;
    background: rgba(0, 0, 0, 0.25); border-left: 2.5px solid var(--bc);
}
.wd-attr-row b { font-size: 11px; font-weight: 900; letter-spacing: .5px; color: var(--bc); }
.wd-attr-row span { font-size: 12.4px; color: rgba(245, 241, 248, 0.88); line-height: 1.42; }
.wd-hl { font-weight: 800; }

/* Status Effects Filter & Uniform Grid */
.wd-sfilters { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 14px; }
.wd-sgrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 11px; }
.wd-scard {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 12px 13px; border-radius: 15px;
    background: rgba(255, 255, 255, 0.038);
    border: 1px solid color-mix(in srgb, var(--kc) 30%, var(--line));
    transition: transform .18s, border-color .18s;
}
.wd-scard:hover { transform: translateY(-1px); border-color: color-mix(in srgb, var(--kc) 68%, transparent); }
.wd-scard[hidden] { display: none !important; }
.wd-sstage {
    position: relative; width: 58px; height: 58px; flex: none;
    border-radius: 13px; overflow: hidden;
    background: linear-gradient(135deg, #201b2b, #0d0b14);
    border: 1.2px solid color-mix(in srgb, var(--kc) 55%, transparent);
    display: flex; align-items: center; justify-content: center;
    perspective: 260px;
}
.wd-sstage svg.wd-svg { width: 26px; height: 26px; color: var(--kc); filter: drop-shadow(0 0 7px var(--kc)); position: relative; z-index: 2; }
.wd-sinfo { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 4px; }
.wd-shead { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.wd-shead h4 { margin: 0; font-size: 13.8px; font-weight: 800; color: #fff; }
.wd-skind {
    flex: none; font-size: 8.8px; font-weight: 900; letter-spacing: .55px;
    color: var(--kc); padding: 2px 7px; border-radius: 999px;
    background: color-mix(in srgb, var(--kc) 15%, transparent);
    border: 1px solid color-mix(in srgb, var(--kc) 45%, transparent);
}
.wd-sbadges { display: flex; flex-wrap: wrap; gap: 5px; }
.wd-spil {
    font-size: 9.8px; font-weight: 800; letter-spacing: .25px; color: #fff;
    padding: 2px 7.5px; border-radius: 999px;
    background: rgba(0, 0, 0, 0.82); border: 1.2px solid var(--bc);
}
.wd-sroles { font-size: 10.8px; font-weight: 700; color: rgba(245, 241, 248, 0.54); }
.wd-sinfo p { margin: 0; font-size: 12.2px; color: rgba(245, 241, 248, 0.88); line-height: 1.46; }

/* ---------- Live Bespoke Vector + CSS 3D Status Animations (Zero Emojis) ---------- */
.wd-mini-card {
    position: absolute; width: 26px; height: 38px; border-radius: 4.5px;
    background: rgba(255, 255, 255, 0.07); border: 1px solid rgba(255, 255, 255, 0.22);
}

/* 1. Winged Magic Shield */
.anim-magicShield .wing {
    position: absolute; top: 16px; width: 17px; height: 22px;
    background: linear-gradient(135deg, #b8ffe0, #35f5b0 55%, #168a6a);
    clip-path: polygon(0 25%, 100% 0, 82% 52%, 100% 75%, 35% 100%, 0 65%);
    filter: drop-shadow(0 0 6px #35f5b0); transform-origin: right center;
}
.anim-magicShield .wing.l { left: 3px; animation: wdFlapL 1.8s ease-in-out infinite; }
.anim-magicShield .wing.r { right: 3px; transform-origin: left center; clip-path: polygon(100% 25%, 0 0, 18% 52%, 0 75%, 65% 100%, 100% 65%); animation: wdFlapR 1.8s ease-in-out infinite; }
.anim-magicShield .core {
    position: relative; z-index: 2; width: 20px; height: 24px;
    background: linear-gradient(180deg, #fff5c0, #4ef5b0 60%, #1a9e74);
    clip-path: polygon(50% 0, 100% 18%, 88% 72%, 50% 100%, 12% 72%, 0 18%);
    filter: drop-shadow(0 0 8px #59f5b8); animation: wdPulse 1.8s ease-in-out infinite;
}
@keyframes wdFlapL { 0%,100% { transform: rotateY(10deg) rotateZ(-6deg); } 50% { transform: rotateY(44deg) rotateZ(8deg); } }
@keyframes wdFlapR { 0%,100% { transform: rotateY(-10deg) rotateZ(6deg); } 50% { transform: rotateY(-44deg) rotateZ(-8deg); } }

/* 2. Magic Seal */
.anim-magicSeal .rune {
    position: absolute; width: 44px; height: 44px; border-radius: 50%;
    border: 2px dashed #c084fc;
    box-shadow: 0 0 10px rgba(184, 122, 255, 0.7), inset 0 0 8px rgba(255, 77, 130, 0.45);
    animation: wdSealSpin 4.5s linear infinite;
}
.anim-magicSeal .chain {
    position: absolute; width: 42px; height: 2px; border-radius: 2px;
    background: linear-gradient(90deg, #ff4d6d, #c084fc, #ff4d6d);
}
.anim-magicSeal .chain.a { transform: rotate(38deg); }
.anim-magicSeal .chain.b { transform: rotate(-38deg); }
@keyframes wdSealSpin { 0% { transform: rotateX(48deg) rotateZ(0deg); } 100% { transform: rotateX(48deg) rotateZ(360deg); } }

/* 3. Reflect Prism */
.anim-reflect .hex {
    position: relative; width: 34px; height: 38px;
    clip-path: polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%);
    background: linear-gradient(135deg, rgba(255,255,255,0.88), rgba(102,235,255,0.58) 45%, rgba(89,245,184,0.42));
    filter: drop-shadow(0 0 9px #66ebff); animation: wdPrism 3.2s ease-in-out infinite;
}
@keyframes wdPrism { 0%,100% { transform: rotateY(-22deg) scale(0.95); } 50% { transform: rotateY(22deg) scale(1.06); } }

/* 4. Vector Ring / Pulse / Spin */
.anim-pulse { position: relative; display: flex; align-items: center; justify-content: center; }
.anim-pulse .ring {
    position: absolute; width: 42px; height: 42px; border-radius: 50%;
    border: 1.8px solid var(--kc); opacity: .65; animation: wdPulse 1.5s ease-in-out infinite;
}
.anim-pulse svg.wd-svg { animation: wdPulse 1.5s ease-in-out infinite; }
.anim-spin svg.wd-svg { animation: wdSpin 6.5s linear infinite; }
.anim-bob-up svg.wd-svg { animation: wdBobUp 1.1s ease-in-out infinite; }
.anim-bob-dn svg.wd-svg { animation: wdBobDn 1.1s ease-in-out infinite; }

/* 5. Floor / Ceiling */
.anim-floor .bar, .anim-ceil .bar {
    position: absolute; left: 10px; right: 10px; height: 2.5px; border-radius: 2px;
    background: var(--kc); box-shadow: 0 0 8px var(--kc);
}
.anim-floor .bar { bottom: 10px; }
.anim-ceil .bar { top: 10px; }
.anim-floor .rk, .anim-ceil .rk { font-family: var(--round); font-size: 15px; font-weight: 900; color: #fff; text-shadow: 0 0 8px var(--kc); }

/* 6. Multi-Card Fan */
.anim-fan { position: relative; width: 42px; height: 34px; display: flex; align-items: center; justify-content: center; }
.anim-fan i {
    position: absolute; width: 15px; height: 23px; border-radius: 3px;
    background: linear-gradient(180deg, #6bc7ff, #1f2438);
    border: 1px solid rgba(255,255,255,0.65); transform-origin: bottom center;
}
.anim-fan i:nth-child(1) { transform: rotate(-20deg) translateX(-6px); }
.anim-fan i:nth-child(2) { transform: translateY(-2px); z-index: 2; }
.anim-fan i:nth-child(3) { transform: rotate(20deg) translateX(6px); }

/* 7. Heater Gauge */
.anim-heater { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.anim-heater b { font-size: 9px; font-weight: 900; color: #ffd966; letter-spacing: .6px; animation: wdPulse .9s ease-in-out infinite; }
.anim-heater .cells {
    display: flex; gap: 2px; padding: 3px 4px; border-radius: 999px;
    background: #000; border: 1px solid #ffd966; box-shadow: 0 0 9px rgba(255, 140, 30, 0.7);
}
.anim-heater .cells i { width: 8px; height: 5.5px; border-radius: 1.5px; display: block; background: linear-gradient(90deg, #ffe066, #ff6b2b); }
.anim-heater .cells i:last-child { animation: wdPulse .85s ease-in-out infinite; }

/* 8. ATK Pills */
.anim-tag {
    font-family: var(--round); font-size: 10.5px; font-weight: 900; color: #fff;
    padding: 3.5px 8px; border-radius: 999px; background: var(--kc);
    box-shadow: 0 0 11px var(--kc); animation: wdBobUp 1.1s ease-in-out infinite;
}
.anim-tag.dn { animation-name: wdBobDn; }

@keyframes wdPulse { 0%,100% { transform: scale(0.94); opacity: .82; } 50% { transform: scale(1.07); opacity: 1; } }
@keyframes wdBobUp { 0%,100% { transform: translateY(2px); } 50% { transform: translateY(-4px); } }
@keyframes wdBobDn { 0%,100% { transform: translateY(-2px); } 50% { transform: translateY(4px); } }
@keyframes wdSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* ---------- Responsive ---------- */
@media (max-width: 980px) {
    .wd-showcase, .wd-showcase.flip { grid-template-columns: 1fr; padding: 20px; gap: 18px; }
    .wd-showcase.flip .wd-sc-copy { order: 1; }
    .wd-showcase.flip .wd-sc-media { order: 2; }
    .wd-roles-grid { grid-template-columns: repeat(2, 1fr); }
    .wd-fighters-grid { grid-template-columns: 1fr; }
    .wd-factions { grid-template-columns: repeat(2, 1fr); }
    .wd-band-2, .wd-band-3, .wd-sgrid { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
    .wd-page section { padding: 34px 0; }
    .wd-roles-grid, .wd-factions, .wd-skills2 { grid-template-columns: 1fr; }
    .wd-stats6 { grid-template-columns: repeat(3, 1fr); }
    .wd-attr-row { grid-template-columns: 1fr; gap: 2px; }
    .wd-guide-top { padding: 14px 16px; }
    .wd-guide-body { padding: 14px; }
}
`;
