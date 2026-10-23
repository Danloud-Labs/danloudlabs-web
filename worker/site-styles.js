// =====================================================================================
// Danloud Labs website: shared CSS for every page (main page, iOS Apps, Support, Privacy…).
// Same palette and feel as Aura Theme Studio: dark glass, soft lines, cyan → violet → pink.
// =====================================================================================

export const SITE_CSS = `
:root {
    --bg: #06050a; --win: #0b0910; --panel: #120f18; --card: #15111c;
    --line: #262030; --line2: #2c2436; --fg: #f5f1f8; --muted: #a49cae; --dim: #6f6879;
    --a1: #5fe0ff; --a2: #b48cff; --a3: #ff6fb0;
    --grad: linear-gradient(135deg, var(--a1), var(--a2) 55%, var(--a3));
    --ui: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, "Segoe UI", Roboto, sans-serif;
    --round: ui-rounded, "SF Pro Rounded", var(--ui);
    --radius: 20px; --radius-sm: 14px; --max: 1180px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--ui); line-height: 1.55; -webkit-font-smoothing: antialiased; overflow-x: hidden; }
body::before {
    content: ""; position: fixed; inset: 0; z-index: -1; pointer-events: none;
    background:
        radial-gradient(900px 600px at 10% -10%, rgba(95, 224, 255, 0.10), transparent 60%),
        radial-gradient(900px 700px at 95% 0%, rgba(180, 140, 255, 0.13), transparent 60%),
        radial-gradient(800px 600px at 50% 110%, rgba(255, 111, 176, 0.08), transparent 60%),
        var(--bg);
}
img { max-width: 100%; display: block; }
figure { margin: 0; }
a { color: inherit; }
.wrap { width: 100%; max-width: var(--max); margin: 0 auto; padding: 0 20px; }

/* ---------- Top bar ---------- */
.topbar { position: sticky; top: 0; z-index: 50; background: rgba(6, 5, 10, 0.72); backdrop-filter: saturate(160%) blur(18px); -webkit-backdrop-filter: saturate(160%) blur(18px); border-bottom: 1px solid var(--line); }
.topbar .wrap { display: flex; align-items: center; gap: 14px; height: 62px; }
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; font-weight: 700; font-family: var(--round); font-size: 17px; letter-spacing: .2px; white-space: nowrap; }
.brand img { height: 32px; width: auto; filter: drop-shadow(0 0 10px rgba(95, 224, 255, 0.35)); }
.topbar .spacer { flex: 1; }
.topbar nav { display: flex; gap: 2px; }
.topbar nav a { text-decoration: none; color: var(--muted); font-size: 14px; padding: 7px 12px; border-radius: 999px; transition: .2s; }
.topbar nav a:hover, .topbar nav a.on { color: var(--fg); background: rgba(255, 255, 255, 0.06); }
.back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 7px 14px; border-radius: 999px; color: #0a84ff; text-decoration: none; border: 1px solid rgba(10, 132, 255, 0.6); font-weight: 500; font-size: 14px; transition: all .2s; background: rgba(0, 0, 0, .4); white-space: nowrap; }
.back-btn:hover { background: #0a84ff; color: #fff; }

/* ---------- Buttons ---------- */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 13px 22px; border-radius: 14px; font-weight: 600; font-size: 15px; text-decoration: none; transition: transform .15s, box-shadow .2s, background .2s; border: 1px solid transparent; }
.btn:hover { transform: translateY(-1px); }
.btn-primary { background: #fff; color: #000; }
.btn-primary:hover { box-shadow: 0 10px 30px rgba(255, 255, 255, 0.18); }
.btn-ghost { background: rgba(255, 255, 255, 0.05); border-color: var(--line2); color: var(--fg); }
.btn-ghost:hover { background: rgba(255, 255, 255, 0.09); }
.btn svg { width: 18px; height: 18px; flex: none; }
.btn-sm { padding: 8px 14px; font-size: 13.5px; border-radius: 11px; }

/* ---------- Text ---------- */
.eyebrow { display: inline-block; font-size: 12px; letter-spacing: 1.8px; text-transform: uppercase; font-weight: 700; background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
h1, h2, h3 { font-family: var(--round); letter-spacing: -0.02em; margin: 0; }
h2 { font-size: clamp(28px, 4vw, 42px); line-height: 1.12; margin: 10px 0 14px; }
h3 { font-size: 18px; }
.lead { color: var(--muted); font-size: clamp(16px, 1.6vw, 19px); max-width: 720px; }
.grad-text { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
section { padding: 72px 0; }
.section-head { margin-bottom: 34px; display: flex; align-items: flex-end; gap: 20px; justify-content: space-between; flex-wrap: wrap; }
.section-head.center { display: block; text-align: center; }
.section-head.center .lead { margin: 0 auto; }
.section-head .lead { margin: 0; }

/* ---------- Cards ---------- */
.card { background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01)), var(--card); border: 1px solid var(--line); border-radius: var(--radius); padding: 22px; }

/* ---------- Main page hero ---------- */
.home-hero { position: relative; padding: 36px 0 20px; text-align: center; overflow: hidden; }
.home-hero .glow { position: absolute; inset: -10% -20% auto; height: 120%; pointer-events: none;
    background: radial-gradient(600px 320px at 50% 45%, rgba(180, 140, 255, 0.30), transparent 70%),
                radial-gradient(500px 260px at 25% 60%, rgba(95, 224, 255, 0.18), transparent 70%),
                radial-gradient(500px 260px at 75% 60%, rgba(255, 111, 176, 0.16), transparent 70%); }
.home-hero .chars { position: relative; width: 100%; max-width: 1080px; margin: 0 auto; filter: drop-shadow(0 30px 60px rgba(0, 0, 0, 0.6)); }
.home-hero .copy { position: relative; margin-top: 8px; }
.home-hero h1 { font-size: clamp(30px, 5vw, 54px); line-height: 1.06; }
.home-hero .lead { margin: 16px auto 0; }
.cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 28px; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 40px; background: var(--line); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; }
.stat { background: var(--win); padding: 20px 14px; text-align: center; }
.stat b { display: block; font-family: var(--round); font-size: clamp(22px, 3vw, 32px); line-height: 1.1; }
.stat span { color: var(--muted); font-size: 13px; }

/* ---------- App cards ---------- */
.apps { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.app-card { --c: #b48cff; --g: rgba(180, 140, 255, .35); position: relative; display: flex; flex-direction: column; text-decoration: none; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--line); background: var(--card); transition: transform .25s, border-color .25s, box-shadow .25s; }
.app-card:hover { transform: translateY(-4px); border-color: var(--c); box-shadow: 0 24px 60px -24px var(--g); }
.app-card .banner { aspect-ratio: 16 / 9; overflow: hidden; background: #000; position: relative; }
.app-card .banner img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
.app-card:hover .banner img { transform: scale(1.04); }
.app-card .banner::after { content: ""; position: absolute; inset: auto 0 0; height: 45%; background: linear-gradient(0deg, var(--card), transparent); }
.app-card .body { display: flex; gap: 14px; align-items: flex-start; padding: 0 20px 20px; margin-top: -34px; position: relative; z-index: 1; }
.app-card .icon { width: 64px; height: 64px; border-radius: 16px; flex: none; border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 0 24px -6px var(--g); object-fit: cover; }
.app-card h3 { font-size: 20px; margin-top: 30px; }
.app-card p { margin: 6px 0 0; color: var(--muted); font-size: 14.5px; }
.app-card .meta { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 10px; margin-top: 12px; font-size: 12.5px; }
.app-card .chip, .app-card .go { white-space: nowrap; }
.app-card .chip { padding: 4px 10px; border-radius: 999px; border: 1px solid var(--line2); color: var(--muted); background: rgba(255, 255, 255, 0.04); }
.app-card .go { color: var(--c); font-weight: 600; display: inline-flex; align-items: center; gap: 5px; margin-left: auto; }
.apps.featured { grid-template-columns: repeat(3, 1fr); }
.apps.featured .app-card:first-child { grid-column: 1 / -1; flex-direction: row; }
.apps.featured .app-card:first-child .banner { flex: 1.35; aspect-ratio: auto; min-height: 320px; }
.apps.featured .app-card:first-child .banner::after { inset: 0 0 0 auto; width: 40%; height: auto; background: linear-gradient(270deg, var(--card), transparent); }
.apps.featured .app-card:first-child .body { flex: 1; flex-direction: column; margin: 0; padding: 32px; justify-content: center; }
.apps.featured .app-card:first-child h3 { font-size: 30px; margin-top: 6px; }
.apps.featured .app-card:first-child p { font-size: 16px; }
.apps.featured .app-card:first-child .meta { margin-top: 18px; width: 100%; }

/* ---------- Platform tiles ---------- */
.platforms { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.platform { --c: #0a84ff; display: flex; flex-direction: column; gap: 10px; text-decoration: none; padding: 24px; border-radius: var(--radius); border: 1px solid var(--line); background: radial-gradient(380px 200px at 0% 0%, color-mix(in srgb, var(--c) 22%, transparent), transparent 70%), var(--card); transition: transform .2s, border-color .2s, box-shadow .2s; }
.platform:hover { transform: translateY(-3px); border-color: var(--c); box-shadow: 0 18px 50px -22px var(--c); }
.platform .ic { width: 48px; height: 48px; border-radius: 14px; display: grid; place-items: center; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c) 35%, transparent); }
.platform .ic svg { width: 24px; height: 24px; }
.platform h3 { font-size: 20px; }
.platform p { margin: 0; color: var(--muted); font-size: 14.5px; }
.platform .go { margin-top: auto; padding-top: 6px; color: var(--c); font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 5px; }

/* ---------- Creative projects ---------- */
.projects { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.project { --c: #b48cff; grid-column: span 2; position: relative; display: flex; flex-direction: column; text-decoration: none; border-radius: var(--radius); overflow: hidden; border: 1px solid var(--line); transition: transform .25s, border-color .25s, box-shadow .25s;
    background: radial-gradient(120% 90% at 50% 40%, color-mix(in srgb, var(--c) 30%, transparent), transparent 65%), linear-gradient(180deg, #0e0b14, #08070c); }
.project:nth-child(4), .project:nth-child(5) { grid-column: span 3; }
.project:hover { transform: translateY(-4px); border-color: var(--c); box-shadow: 0 24px 60px -26px var(--c); }
.projects { align-items: start; }
.project .art { aspect-ratio: 16 / 9; position: relative; overflow: hidden; }
.project .art img { position: absolute; inset: 9% 7%; width: 86%; height: 82%; object-fit: contain; filter: drop-shadow(0 12px 26px rgba(0, 0, 0, 0.7)); transition: transform .5s; }
.project:hover .art img { transform: scale(1.05); }
.project.cover .art img { inset: 0; width: 100%; height: 100%; object-fit: cover; filter: none; }
.project .label { padding: 12px 16px 14px; border-top: 1px solid rgba(255, 255, 255, 0.06); display: flex; align-items: center; gap: 8px; background: rgba(6, 5, 10, 0.5); }
.project .label b { font-weight: 600; font-size: 14.5px; flex: 1; min-width: 0; }
.project .label span { color: var(--c); display: inline-flex; }

/* ---------- Contact ---------- */
.contact { display: grid; grid-template-columns: 1.05fr 1fr; gap: 0; border-radius: 28px; overflow: hidden; border: 1px solid var(--line); background: var(--win); }
.contact .pic { position: relative; min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 40px;
    background: radial-gradient(360px 260px at 50% 45%, rgba(95, 224, 255, 0.16), transparent 70%), radial-gradient(300px 200px at 60% 70%, rgba(245, 197, 66, 0.08), transparent 70%), linear-gradient(160deg, #141218, #09080c); }
.contact .pic img { width: 150px; height: auto; filter: drop-shadow(0 0 30px rgba(95, 224, 255, 0.35)) drop-shadow(0 18px 30px rgba(0, 0, 0, 0.6)); }
.contact .pic .word { font-family: var(--round); font-size: 30px; font-weight: 700; letter-spacing: .3px; color: #e9e6ee; }
.contact .pic .word span { color: var(--muted); font-weight: 500; }
.contact .text { padding: 44px; display: flex; flex-direction: column; justify-content: center; }
.contact .rows { display: grid; gap: 10px; margin-top: 20px; }
.contact .row { display: flex; align-items: center; gap: 14px; padding: 14px 16px; border-radius: 14px; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.03); text-decoration: none; transition: .2s; }
.contact .row:hover { border-color: var(--a2); background: rgba(180, 140, 255, 0.08); }
.contact .row .ic { width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; flex: none; background: rgba(180, 140, 255, 0.12); color: var(--a2); }
.contact .row .ic svg { width: 20px; height: 20px; }
.contact .row small { display: block; color: var(--dim); font-size: 11.5px; letter-spacing: 1.2px; text-transform: uppercase; font-weight: 600; }
.contact .row b { font-weight: 600; font-size: 15.5px; }

/* ---------- Page header (sub-pages) ---------- */
.page-head { padding: 56px 0 10px; }
.page-head h1 { font-size: clamp(34px, 5.4vw, 58px); line-height: 1.04; margin-top: 10px; }
.page-head .lead { margin-top: 14px; }

footer { border-top: 1px solid var(--line); color: var(--dim); font-size: 13px; padding: 28px 0 40px; margin-top: 40px; }
footer .wrap { display: flex; gap: 16px; flex-wrap: wrap; justify-content: space-between; align-items: center; }
footer nav { display: flex; gap: 16px; flex-wrap: wrap; }
footer a { color: var(--muted); text-decoration: none; }
footer a:hover { color: var(--fg); }

/* ---------- Reveal ---------- */
.reveal { opacity: 0; transform: translateY(18px); transition: opacity .7s ease, transform .7s ease; }
.reveal.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } * { scroll-behavior: auto; } }

/* ---------- Responsive ---------- */
@media (max-width: 980px) {
    .topbar nav { display: none; }
    .apps.featured .app-card:first-child { flex-direction: column; }
    .apps.featured .app-card:first-child .banner { aspect-ratio: 16 / 9; min-height: 0; }
    .apps.featured .app-card:first-child .banner::after { inset: auto 0 0; width: auto; height: 45%; background: linear-gradient(0deg, var(--card), transparent); }
    .apps.featured .app-card:first-child .body { padding: 0 20px 22px; margin-top: -34px; flex-direction: row; }
    .apps.featured .app-card:first-child h3 { font-size: 22px; margin-top: 30px; }
    .platforms { grid-template-columns: 1fr; }
    .apps.featured { grid-template-columns: repeat(2, 1fr); }
    .project, .project:nth-child(4), .project:nth-child(5) { grid-column: span 3; }
    .contact { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
    section { padding: 52px 0; }
    .wrap { padding: 0 16px; }
    .apps, .apps.featured { grid-template-columns: 1fr; }
    .stats { grid-template-columns: repeat(2, 1fr); }
    .project, .project:nth-child(4), .project:nth-child(5) { grid-column: 1 / -1; }
    .contact .text { padding: 26px; }
    .brand span { display: none; }
}

/* ---------- Legal pages (Privacy, Terms…) ---------- */
.legal { display: grid; grid-template-columns: 240px 1fr; gap: 40px; align-items: start; }
.toc { position: sticky; top: 86px; display: grid; gap: 2px; padding: 14px; border-radius: var(--radius); border: 1px solid var(--line); background: var(--win); }
.toc b { font-size: 11.5px; letter-spacing: 1.4px; text-transform: uppercase; color: var(--dim); padding: 6px 10px 8px; }
.toc a { text-decoration: none; color: var(--muted); font-size: 14px; padding: 7px 10px; border-radius: 10px; transition: .2s; }
.toc a:hover { color: var(--fg); background: rgba(255, 255, 255, 0.05); }
.toc a.on { color: var(--fg); background: rgba(180, 140, 255, 0.12); }
.dates { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px; }
.dates span { font-size: 13px; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--line2); color: var(--muted); background: rgba(255, 255, 255, 0.03); }
.dates span b { color: var(--fg); font-weight: 600; }
.glance { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 26px; }
.glance .card { padding: 18px; }
.glance .ic { width: 38px; height: 38px; border-radius: 11px; display: grid; place-items: center; margin-bottom: 12px; color: #4ade80; background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.28); }
.glance .ic svg { width: 20px; height: 20px; }
.glance b { display: block; font-size: 15px; }
.glance span { color: var(--muted); font-size: 13.5px; }
.legal-doc .block { scroll-margin-top: 86px; padding: 28px; margin-bottom: 14px; }
.legal-doc h2 { font-size: 22px; margin: 0 0 12px; display: flex; align-items: center; gap: 12px; }
.legal-doc h2 .n { font-size: 13px; font-weight: 700; color: var(--a2); background: rgba(180, 140, 255, 0.12); border: 1px solid rgba(180, 140, 255, 0.25); border-radius: 8px; padding: 2px 8px; font-family: var(--ui); }
.legal-doc h3 { font-size: 16px; margin: 20px 0 8px; }
.legal-doc p, .legal-doc li { color: #d3cdda; font-size: 15.5px; line-height: 1.7; }
.legal-doc p { margin: 0 0 12px; }
.legal-doc ul { margin: 0 0 12px; padding-left: 20px; }
.legal-doc li { margin-bottom: 6px; }
.legal-doc li::marker { color: var(--a2); }
.legal-doc a { color: var(--a1); text-decoration: none; }
.legal-doc a:hover { text-decoration: underline; }
.legal-doc strong { color: var(--fg); }
.covered { display: flex; gap: 10px; flex-wrap: wrap; margin: 6px 0 4px !important; padding: 0 !important; list-style: none; }
.covered li { display: flex; align-items: center; gap: 10px; margin: 0; padding: 8px 14px 8px 8px; border-radius: 14px; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.03); font-size: 14.5px; }
.covered img { width: 34px; height: 34px; border-radius: 9px; }
.perms { list-style: none; padding: 0 !important; display: grid; gap: 10px; }
.perms li { display: grid; grid-template-columns: 40px 1fr; gap: 14px; align-items: start; padding: 14px; margin: 0; border-radius: 14px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.02); }
.perms .ic { width: 40px; height: 40px; border-radius: 11px; display: grid; place-items: center; color: var(--a1); background: rgba(95, 224, 255, 0.08); border: 1px solid rgba(95, 224, 255, 0.22); }
.perms .ic svg { width: 20px; height: 20px; }
.perms strong { display: block; margin-bottom: 2px; }
@media (max-width: 980px) {
    .legal { grid-template-columns: 1fr; }
    .toc { position: static; grid-template-columns: repeat(2, 1fr); }
    .toc b { grid-column: 1 / -1; }
    .glance { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
    .legal-doc .block { padding: 20px; }
    .glance { grid-template-columns: 1fr 1fr; }
    .glance .card { padding: 14px; }
}
`;
