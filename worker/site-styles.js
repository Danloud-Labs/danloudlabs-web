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

/* ---------- Support Center ---------- */
.help-hero { position: relative; text-align: center; padding: 64px 0 34px; overflow: hidden; }
.help-hero .glow { position: absolute; inset: -30% -20% auto; height: 150%; pointer-events: none;
    background: radial-gradient(520px 280px at 50% 40%, rgba(180, 140, 255, 0.26), transparent 70%), radial-gradient(420px 240px at 30% 60%, rgba(95, 224, 255, 0.16), transparent 70%), radial-gradient(420px 240px at 70% 60%, rgba(255, 111, 176, 0.14), transparent 70%); }
.help-hero .wrap { position: relative; }
.help-hero h1 { font-size: clamp(36px, 6vw, 64px); line-height: 1.02; margin-top: 10px; }
.help-hero .lead { margin: 14px auto 0; }
.search { position: relative; max-width: 640px; margin: 28px auto 0; }
.search svg { position: absolute; left: 18px; top: 50%; width: 20px; height: 20px; transform: translateY(-50%); color: var(--muted); pointer-events: none; }
.search input { width: 100%; font: inherit; font-size: 17px; color: var(--fg); padding: 18px 20px 18px 52px; border-radius: 18px; border: 1px solid var(--line2); background: rgba(11, 9, 16, 0.85); outline: none; transition: border-color .2s, box-shadow .2s; -webkit-appearance: none; }
.search input::placeholder { color: var(--dim); }
.search input:focus { border-color: var(--a2); box-shadow: 0 0 0 4px rgba(180, 140, 255, 0.15); }
.quick { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 16px; }
.quick button { font: inherit; font-size: 13px; color: var(--muted); cursor: pointer; padding: 7px 13px; border-radius: 999px; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line2); transition: .2s; }
.quick button:hover { color: var(--fg); border-color: var(--a2); }

.app-pick { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.pick { --c: #b48cff; position: relative; display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: radial-gradient(260px 140px at 0% 0%, color-mix(in srgb, var(--c) 18%, transparent), transparent 70%), var(--card); text-decoration: none; transition: transform .2s, border-color .2s; cursor: pointer; font: inherit; color: inherit; text-align: left; }
.pick:hover { transform: translateY(-2px); border-color: var(--c); }
.pick img { width: 52px; height: 52px; border-radius: 13px; flex: none; }
.pick b { display: block; font-size: 15.5px; }
.pick small { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--muted); margin-top: 3px; }
.pick small::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: var(--st, #4ade80); box-shadow: 0 0 8px var(--st, #4ade80); }

.topics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.topic { display: flex; flex-direction: column; gap: 8px; padding: 18px; border-radius: 18px; border: 1px solid var(--line); background: var(--card); cursor: pointer; font: inherit; color: inherit; text-align: left; transition: .2s; }
.topic:hover { border-color: var(--line2); transform: translateY(-2px); }
.topic .ic { width: 40px; height: 40px; border-radius: 12px; display: grid; place-items: center; color: var(--a1); background: rgba(95, 224, 255, 0.08); border: 1px solid rgba(95, 224, 255, 0.22); }
.topic:nth-child(2) .ic { color: var(--a2); background: rgba(180, 140, 255, 0.1); border-color: rgba(180, 140, 255, 0.25); }
.topic:nth-child(3) .ic { color: var(--a3); background: rgba(255, 111, 176, 0.1); border-color: rgba(255, 111, 176, 0.25); }
.topic:nth-child(4) .ic { color: #4ade80; background: rgba(74, 222, 128, 0.1); border-color: rgba(74, 222, 128, 0.25); }
.topic .ic svg { width: 21px; height: 21px; }
.topic b { font-size: 15.5px; }
.topic span { color: var(--muted); font-size: 13.5px; }

.faq-bar { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 18px; }
.faq-bar button { font: inherit; font-size: 13.5px; font-weight: 600; color: var(--muted); cursor: pointer; display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px 6px 6px; border-radius: 999px; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line2); transition: .2s; }
.faq-bar button.txt { padding: 8px 14px; }
.faq-bar button img { width: 24px; height: 24px; border-radius: 7px; }
.faq-bar button.on { color: #fff; border-color: var(--c, var(--a2)); background: color-mix(in srgb, var(--c, #b48cff) 16%, transparent); }
.faq-bar .count { margin-left: auto; color: var(--dim); font-size: 13px; }
.faq-group { margin-bottom: 26px; scroll-margin-top: 90px; }
.faq-group > header { display: flex; align-items: center; gap: 12px; margin: 0 0 12px; }
.faq-group > header img { width: 40px; height: 40px; border-radius: 11px; }
.faq-group > header h3 { font-size: 20px; }
.faq-group > header span { color: var(--muted); font-size: 13.5px; }
.faq { display: grid; gap: 8px; }
.faq details { border-radius: 16px; border: 1px solid var(--line); background: var(--card); transition: border-color .2s, background .2s; scroll-margin-top: 90px; }
.faq details[open] { border-color: var(--line2); background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01)), var(--card); }
.faq summary { list-style: none; cursor: pointer; display: flex; align-items: center; gap: 14px; padding: 16px 18px; font-weight: 600; font-size: 15.5px; }
.faq summary::-webkit-details-marker { display: none; }
.faq summary::after { content: ""; margin-left: auto; flex: none; width: 10px; height: 10px; border-right: 2px solid var(--muted); border-bottom: 2px solid var(--muted); transform: rotate(45deg); transition: transform .2s; margin-top: -4px; }
.faq details[open] summary::after { transform: rotate(225deg); margin-top: 4px; }
.faq .tag { flex: none; font-size: 11px; font-weight: 700; letter-spacing: .4px; text-transform: uppercase; padding: 3px 8px; border-radius: 7px; color: var(--c, var(--a2)); background: color-mix(in srgb, var(--c, #b48cff) 14%, transparent); }
.faq .ans { padding: 0 18px 18px; color: #d3cdda; font-size: 15px; line-height: 1.7; }
.faq .ans p { margin: 0 0 10px; }
.faq .ans ol, .faq .ans ul { margin: 0 0 10px; padding-left: 20px; }
.faq .ans li { margin-bottom: 4px; }
.faq .ans a { color: var(--a1); text-decoration: none; }
.faq .ans a:hover { text-decoration: underline; }
.faq .ans .path { font-family: var(--ui); font-weight: 600; color: var(--fg); background: rgba(255, 255, 255, 0.06); border: 1px solid var(--line2); border-radius: 7px; padding: 1px 7px; white-space: nowrap; }
.faq mark { background: rgba(180, 140, 255, 0.35); color: #fff; border-radius: 3px; padding: 0 2px; }
.no-results { display: none; text-align: center; padding: 30px; color: var(--muted); }

.status-card { display: flex; gap: 16px; align-items: flex-start; }
.status-card img { width: 56px; height: 56px; border-radius: 14px; flex: none; }
.status-card p { margin: 6px 0 0; color: var(--muted); font-size: 14.5px; }
.duo { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.req { width: 100%; border-collapse: collapse; font-size: 14.5px; }
.req th, .req td { text-align: left; padding: 12px 14px; border-bottom: 1px solid var(--line); }
.req th { color: var(--dim); font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase; font-weight: 700; }
.req td:first-child { font-weight: 600; }
.req tr:last-child td { border-bottom: 0; }
.steps { counter-reset: s; list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
.steps li { counter-increment: s; display: grid; grid-template-columns: 30px 1fr; gap: 12px; align-items: start; color: #d3cdda; font-size: 14.5px; }
.steps li::before { content: counter(s); width: 28px; height: 28px; border-radius: 9px; display: grid; place-items: center; font-weight: 700; font-size: 13px; color: var(--a2); background: rgba(180, 140, 255, 0.12); border: 1px solid rgba(180, 140, 255, 0.25); }
.steps b { color: var(--fg); }

.composer { display: grid; grid-template-columns: 1fr 1.25fr; border-radius: 28px; overflow: hidden; border: 1px solid var(--line); background: var(--win); }
.composer .side { padding: 40px; background: radial-gradient(400px 260px at 20% 10%, rgba(180, 140, 255, 0.18), transparent 70%), radial-gradient(360px 240px at 80% 90%, rgba(95, 224, 255, 0.10), transparent 70%); border-right: 1px solid var(--line); }
.composer form { padding: 34px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.field { display: grid; gap: 6px; }
.field.full { grid-column: 1 / -1; }
.field label { font-size: 12px; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; color: var(--dim); }
.field select, .field input, .field textarea { width: 100%; font: inherit; font-size: 15px; color: var(--fg); padding: 12px 14px; border-radius: 12px; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.03); outline: none; transition: border-color .2s; -webkit-appearance: none; appearance: none; }
.field select { background-image: linear-gradient(45deg, transparent 50%, var(--muted) 50%), linear-gradient(135deg, var(--muted) 50%, transparent 50%); background-position: calc(100% - 20px) 52%, calc(100% - 15px) 52%; background-size: 5px 5px; background-repeat: no-repeat; padding-right: 36px; }
.field select option { background: #15111c; }
.field textarea { min-height: 140px; resize: vertical; line-height: 1.5; }
.field select:focus, .field input:focus, .field textarea:focus { border-color: var(--a2); }
.field .hint { font-size: 12.5px; color: var(--dim); }
.composer .actions { grid-column: 1 / -1; display: flex; gap: 10px; flex-wrap: wrap; align-items: center; }
.composer .actions button { font: inherit; cursor: pointer; }
.composer .note { font-size: 12.5px; color: var(--dim); grid-column: 1 / -1; }
.copied { color: #4ade80; font-size: 13px; font-weight: 600; opacity: 0; transition: opacity .2s; }
.copied.on { opacity: 1; }

@media (max-width: 980px) {
    .app-pick, .topics { grid-template-columns: repeat(2, 1fr); }
    .composer { grid-template-columns: 1fr; }
    .composer .side { border-right: 0; border-bottom: 1px solid var(--line); }
    .duo { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
    .help-hero { padding-top: 44px; }
    .app-pick { grid-template-columns: 1fr; }
    .composer form { grid-template-columns: 1fr; padding: 22px; }
    .composer .side { padding: 26px; }
    .faq-bar .count { width: 100%; margin-left: 0; }
    .faq summary { padding: 14px; font-size: 15px; }
    .faq .ans { padding: 0 14px 16px; }
}

/* ---------- App product pages (HazMat Scanner, FedLog…) ---------- */
.product { --c: #ff7a1a; --c2: #2ee6c9; }
.p-hero { position: relative; padding: 40px 0 30px; overflow: hidden; }
.p-hero .bg { position: absolute; inset: 0; pointer-events: none; background:
    radial-gradient(700px 420px at 78% 45%, color-mix(in srgb, var(--c) 26%, transparent), transparent 70%),
    radial-gradient(600px 400px at 15% 20%, color-mix(in srgb, var(--c2) 14%, transparent), transparent 70%); }
.p-hero .wrap { position: relative; display: grid; grid-template-columns: 1.1fr .9fr; gap: 40px; align-items: center; }
.p-hero .who { display: flex; align-items: center; gap: 14px; }
.p-hero .who img { width: 76px; height: 76px; border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.12); box-shadow: 0 14px 34px rgba(0, 0, 0, 0.6), 0 0 34px -8px var(--c2); }
.p-hero .who small { display: block; color: var(--muted); font-size: 13.5px; }
.p-hero h1 { font-size: clamp(38px, 6vw, 66px); line-height: 1.02; margin-top: 18px; }
.p-hero h1 .hot { background: linear-gradient(135deg, #ffb347, var(--c) 55%, #ff4d1a); -webkit-background-clip: text; background-clip: text; color: transparent; }
.p-hero .lead { margin-top: 14px; }
.badges { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px; }
.badges span { font-size: 12.5px; font-weight: 700; letter-spacing: .4px; padding: 6px 12px; border-radius: 999px; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.04); color: var(--muted); }
.badges span.hot { color: #fff; border-color: transparent; background: var(--c); box-shadow: 0 6px 20px -6px var(--c); }
.p-hero .cta-row { justify-content: flex-start; }
.p-hero .note { color: var(--dim); font-size: 13px; margin-top: 12px; }
.btn-store { background: #fff; color: #000; }
.btn-store .two { display: flex; flex-direction: column; align-items: flex-start; line-height: 1.1; }
.btn-store small { font-size: 10.5px; font-weight: 500; opacity: .7; }
.devices { position: relative; height: 560px; }
.devices img { position: absolute; max-width: none; filter: drop-shadow(0 34px 50px rgba(0, 0, 0, 0.75)); }
.devices .tab { right: 0; top: 0; height: 500px; }
.devices .ph { left: 4%; top: 70px; height: 490px; filter: drop-shadow(0 34px 50px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 40px color-mix(in srgb, var(--c) 25%, transparent)); }
.p-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: var(--radius); overflow: hidden; margin-top: 30px; }
.p-stats div { background: var(--win); padding: 18px 12px; text-align: center; }
.p-stats b { display: block; font-family: var(--round); font-size: clamp(22px, 3vw, 32px); line-height: 1.1; color: var(--c); }
.p-stats span { color: var(--muted); font-size: 13px; }

.p-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.p-feature { padding: 22px; border-radius: var(--radius); border: 1px solid var(--line); background: radial-gradient(320px 160px at 0% 0%, color-mix(in srgb, var(--c) 12%, transparent), transparent 70%), var(--card); }
.p-feature .ic { width: 44px; height: 44px; border-radius: 13px; display: grid; place-items: center; margin-bottom: 14px; color: var(--c); background: color-mix(in srgb, var(--c) 14%, transparent); border: 1px solid color-mix(in srgb, var(--c) 35%, transparent); }
.p-feature:nth-child(even) .ic { color: var(--c2); background: color-mix(in srgb, var(--c2) 12%, transparent); border-color: color-mix(in srgb, var(--c2) 32%, transparent); }
.p-feature .ic svg { width: 22px; height: 22px; }
.p-feature h3 { margin-bottom: 6px; }
.p-feature p { margin: 0; color: var(--muted); font-size: 14.5px; }

.shots-bar { display: flex; gap: 8px; margin-bottom: 18px; }
.shots-bar button { font: inherit; font-size: 13.5px; font-weight: 600; cursor: pointer; color: var(--muted); padding: 8px 16px; border-radius: 999px; background: rgba(255, 255, 255, 0.04); border: 1px solid var(--line2); }
.shots-bar button.on { color: #fff; border-color: var(--c); background: color-mix(in srgb, var(--c) 18%, transparent); }
.shots { display: grid; grid-auto-flow: column; gap: 14px; overflow-x: auto; padding-bottom: 12px; scroll-snap-type: x mandatory; }
.shots::-webkit-scrollbar { height: 6px; } .shots::-webkit-scrollbar-thumb { background: var(--line2); border-radius: 9px; }
.shots img { height: 520px; width: auto; max-width: none; border-radius: 18px; border: 1px solid var(--line); scroll-snap-align: start; cursor: zoom-in; }
.shots[hidden] { display: none; }

.pricing { display: grid; grid-template-columns: 1fr 1.15fr; gap: 14px; align-items: stretch; }
.plan { padding: 28px; border-radius: 24px; border: 1px solid var(--line); background: var(--card); display: flex; flex-direction: column; }
.plan.pro { border-color: color-mix(in srgb, var(--c) 55%, transparent); background: radial-gradient(420px 240px at 100% 0%, color-mix(in srgb, var(--c) 22%, transparent), transparent 70%), var(--card); box-shadow: 0 24px 60px -30px var(--c); }
.plan .price { font-family: var(--round); font-size: 40px; font-weight: 700; margin: 8px 0 2px; }
.plan .price small { font-size: 15px; color: var(--muted); font-weight: 500; }
.plan p { color: var(--muted); margin: 0 0 14px; font-size: 14.5px; }
.plan ul { list-style: none; padding: 0; margin: 4px 0 0; display: grid; gap: 9px; }
.plan li { display: flex; gap: 10px; font-size: 14.5px; color: #d3cdda; }
.plan li::before { content: ""; flex: none; width: 16px; height: 16px; margin-top: 3px; border-radius: 50%; background: var(--c2); -webkit-mask: radial-gradient(circle, #000 35%, transparent 38%); mask: radial-gradient(circle, #000 35%, transparent 38%); }
.plan.pro li::before { background: var(--c); }
.plan .foot { margin-top: auto; padding-top: 18px; font-size: 13px; color: var(--dim); }

.hotlines { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.hotline { display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); text-decoration: none; transition: .2s; }
.hotline:hover { border-color: #0a84ff; }
.hotline .ic { width: 42px; height: 42px; flex: none; border-radius: 12px; display: grid; place-items: center; color: #fff; background: #0a84ff; }
.hotline .ic svg { width: 20px; height: 20px; }
.hotline small { display: block; color: var(--muted); font-size: 12.5px; }
.hotline b { font-size: 16px; color: var(--c); font-variant-numeric: tabular-nums; }
.disclaimer { display: flex; gap: 14px; align-items: flex-start; padding: 18px 20px; border-radius: 16px; border: 1px solid rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.06); color: #e9dcc0; font-size: 14px; margin-top: 16px; }
.disclaimer svg { width: 22px; height: 22px; flex: none; color: #fbbf24; }
.lb { position: fixed; inset: 0; z-index: 100; background: rgba(0, 0, 0, 0.9); display: none; align-items: center; justify-content: center; padding: 24px; cursor: zoom-out; }
.lb.open { display: flex; }
.lb img { max-width: 100%; max-height: 92vh; border-radius: 14px; }

@media (max-width: 980px) {
    .p-hero .wrap { grid-template-columns: 1fr; }
    .devices { height: 440px; width: 100%; max-width: 560px; margin: 0 auto; }
    .devices .tab { height: 410px; right: 6%; }
    .devices .ph { height: 400px; left: 8%; top: 40px; }
    .p-features, .hotlines { grid-template-columns: repeat(2, 1fr); }
    .pricing { grid-template-columns: 1fr; }

}
@media (max-width: 640px) {
    .devices { height: 360px; }
    .devices .tab { height: 320px; right: 0; }
    .devices .ph { height: 330px; left: 0; top: 30px; }
    .p-features, .hotlines { grid-template-columns: 1fr; }
    .p-stats { grid-template-columns: repeat(2, 1fr); }
    .p-stats div:last-child { grid-column: 1 / -1; }
    .shots img { height: 420px; }
    .plan { padding: 22px; }
}

/* ---------- Phone frame for plain screenshots ---------- */
.phone { display: block; padding: 9px; border-radius: 46px; background: linear-gradient(160deg, #2b2f3a, #0d0f14 45%, #1c1f27); border: 1px solid rgba(255, 255, 255, 0.10); box-shadow: 0 40px 80px -24px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(0, 0, 0, 0.6); }
.phone img { display: block; width: 100%; height: auto; border-radius: 37px; }
.devices .phone { position: absolute; }
.devices .phone.back { right: 2%; top: 0; width: 250px; transform: rotate(4deg); opacity: .92; }
.devices .phone.front { left: 8%; top: 46px; width: 262px; transform: rotate(-3deg); box-shadow: 0 40px 80px -24px rgba(0, 0, 0, 0.85), 0 0 60px -12px color-mix(in srgb, var(--c) 40%, transparent); }
.shots .phone { flex: none; width: 250px; scroll-snap-align: start; cursor: zoom-in; padding: 7px; border-radius: 38px; }
.shots .phone img { border-radius: 31px; height: auto; width: 100%; max-width: 100%; border: 0; }
.devices .phone img { position: static; filter: none; max-width: 100%; }
.shots.phones { display: flex; }
.cap { text-align: center; color: var(--muted); font-size: 13px; margin-top: 10px; }
.tools-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.tool { display: flex; gap: 14px; padding: 18px; border-radius: 18px; border: 1px solid var(--line); background: var(--card); }
.tool .ic { width: 42px; height: 42px; flex: none; border-radius: 12px; display: grid; place-items: center; color: var(--tc, var(--c)); background: color-mix(in srgb, var(--tc, var(--c)) 14%, transparent); border: 1px solid color-mix(in srgb, var(--tc, var(--c)) 32%, transparent); }
.tool .ic svg { width: 21px; height: 21px; }
.tool b { display: block; font-size: 15.5px; margin-bottom: 4px; }
.tool p { margin: 0; color: var(--muted); font-size: 13.8px; line-height: 1.5; }
.tool .lock { display: inline-block; margin-top: 8px; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: #fbbf24; }
.split-feature { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: center; padding: 34px; border-radius: 28px; border: 1px solid var(--line); background: radial-gradient(500px 300px at 100% 50%, color-mix(in srgb, var(--c) 12%, transparent), transparent 70%), var(--win); margin-bottom: 16px; }
.split-feature.flip { grid-template-columns: 300px 1fr; background: radial-gradient(500px 300px at 0% 50%, color-mix(in srgb, var(--c2) 12%, transparent), transparent 70%), var(--win); }
.split-feature.flip .phone { order: -1; }
.split-feature h3 { font-size: clamp(24px, 3vw, 32px); margin: 8px 0 10px; }
.split-feature p.lead { font-size: 16px; }
.split-feature .phone { width: 100%; max-width: 280px; margin: 0 auto; }
@media (max-width: 980px) {
    .tools-grid { grid-template-columns: repeat(2, 1fr); }
    .devices .phone.back { width: 210px; right: 8%; }
    .devices .phone.front { width: 222px; left: 12%; top: 34px; }
    .split-feature, .split-feature.flip { grid-template-columns: 1fr; }
    .split-feature.flip .phone { order: 0; }
}
@media (max-width: 640px) {
    .tools-grid { grid-template-columns: 1fr; }
    .devices .phone.back { width: 165px; right: 2%; }
    .devices .phone.front { width: 175px; left: 4%; top: 26px; }
    .split-feature { padding: 22px; }
    .shots .phone { width: 210px; }
}

.checks { list-style: none; padding: 0; margin: 18px 0 0; display: grid; gap: 10px; }
.checks li { display: flex; gap: 10px; align-items: flex-start; color: var(--fg); font-size: 15px; }
.checks li::before { content: ""; flex: none; width: 18px; height: 18px; margin-top: 2px; border-radius: 6px; background: var(--c, var(--a2));
    -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z'/%3E%3C/svg%3E") center / 14px no-repeat, linear-gradient(#000, #000);
    -webkit-mask-composite: xor; mask-composite: exclude; }

/* ---------- Game page (WarDecks) ---------- */
.game-logo { width: min(460px, 100%); height: auto; filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.7)); margin: 6px 0 4px -6px; }
.modes { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.mode { padding: 18px; border-radius: 18px; border: 1px solid var(--line); background: var(--card); display: flex; flex-direction: column; gap: 8px; }
.mode b { font-size: 15px; letter-spacing: .3px; }
.mode p { margin: 0; color: var(--muted); font-size: 13.5px; }
.mode .st { margin-top: auto; align-self: flex-start; font-size: 11px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; padding: 4px 9px; border-radius: 999px; }
.mode .st.on { color: #4ade80; background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.3); }
.mode .st.soon { color: #fbbf24; background: rgba(251, 191, 36, 0.08); border: 1px solid rgba(251, 191, 36, 0.28); }
.rules { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.rule { border-radius: 20px; border: 1px solid var(--line); background: var(--card); overflow: hidden; }
.rule img { width: 100%; height: auto; background: radial-gradient(400px 120px at 50% 50%, color-mix(in srgb, var(--c) 18%, transparent), transparent 70%), #0d0b10; padding: 14px 10px; }
.rule div { padding: 0 20px 20px; }
.rule h3 { margin: 6px 0 6px; }
.rule p { margin: 0; color: var(--muted); font-size: 14.5px; }
.roles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.role { border-radius: 20px; border: 1px solid var(--line); background: var(--card); padding: 14px; display: flex; flex-direction: column; gap: 10px; }
.role img { width: 100%; height: auto; border-radius: 12px; }
.role h3 { font-size: 17px; text-align: center; letter-spacing: .5px; text-transform: uppercase; }
.power { font-size: 13px; color: var(--muted); line-height: 1.5; }
.power b { display: flex; align-items: center; gap: 7px; color: var(--fg); font-size: 13.5px; margin-bottom: 2px; }
.power b i { font-style: normal; font-size: 10px; font-weight: 800; letter-spacing: .5px; padding: 2px 6px; border-radius: 6px; }
.power b i.off { color: #ffb347; background: rgba(255, 140, 50, 0.14); }
.power b i.def { color: #4ade80; background: rgba(74, 222, 128, 0.12); }
.factions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.faction { border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: var(--card); }
.faction img { width: 100%; height: auto; display: block; }
.faction span { display: flex; align-items: center; gap: 8px; padding: 12px 16px; font-weight: 700; letter-spacing: .5px; }
.faction span::before { content: ""; width: 12px; height: 12px; border-radius: 50%; background: var(--fc); box-shadow: 0 0 10px var(--fc); }
.heroes { display: grid; grid-template-columns: repeat(6, 1fr); gap: 12px; }
.hero-card { border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); text-align: center; }
.hero-card .art { aspect-ratio: 3 / 4; display: flex; align-items: flex-end; justify-content: center; padding: 14px 8px 0; background: radial-gradient(120% 80% at 50% 30%, color-mix(in srgb, var(--fc) 38%, transparent), transparent 70%), linear-gradient(180deg, #17131d, #0b0910); }
.hero-card .art img { max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block; filter: drop-shadow(0 12px 18px rgba(0, 0, 0, 0.6)); transition: transform .4s; }
.hero-card:hover .art img { transform: translateY(-4px) scale(1.03); }
.hero-card { position: relative; } .hero-card b { position: relative; background: var(--card); }
.hero-card b { display: block; padding: 10px 6px 2px; letter-spacing: 1px; text-transform: uppercase; font-size: 14px; }
.hero-card small { display: block; padding-bottom: 12px; color: var(--muted); font-size: 12px; }
.fields { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
.field { position: relative; border-radius: 16px; overflow: hidden; border: 1px solid var(--line); cursor: zoom-in; }
.field img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; display: block; transition: transform .5s; }
.field:hover img { transform: scale(1.05); }
.field span { position: absolute; left: 0; right: 0; bottom: 0; padding: 22px 10px 10px; font-size: 12.5px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; background: linear-gradient(0deg, rgba(0, 0, 0, 0.85), transparent); }
.ranks { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; }
.ranks span { font-size: 13px; font-weight: 600; padding: 7px 12px; border-radius: 10px; border: 1px solid var(--line2); background: color-mix(in srgb, var(--c) calc(var(--t) * 1%), var(--card)); }
.ranks svg { width: 14px; height: 14px; color: var(--dim); }
@media (max-width: 980px) {
    .modes { grid-template-columns: repeat(2, 1fr); }
    .rules { grid-template-columns: 1fr; }
    .roles { grid-template-columns: repeat(2, 1fr); }
    .factions { grid-template-columns: repeat(2, 1fr); }
    .heroes { grid-template-columns: repeat(3, 1fr); }
    .fields { grid-template-columns: repeat(4, 1fr); }
}
@media (max-width: 640px) {
    .modes { grid-template-columns: 1fr; }
    .roles { grid-template-columns: 1fr 1fr; gap: 10px; }
    .role { padding: 10px; }
    .factions { grid-template-columns: 1fr; }
    .fields { grid-template-columns: repeat(2, 1fr); }
}
`;
