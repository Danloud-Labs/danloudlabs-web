// =====================================================================================
// Final Fantasy Tactics II website CSS. Reuses the component CSS of the MMX9 pages (sub-nav,
// cards, chapter reader, sections) on a night-blue page with parchment panels, the way the
// concept sheets look: moon silver-blue for Lucius, solar gold for Aveline.
// =====================================================================================

import { MMX_CSS } from './mmx9-styles.js';

export const FFT_CSS = MMX_CSS + `
:root { --a1: #f2b84b; --a2: #ffd98a; --a3: #2a3a78; --parch: #efe3c6; --ink: #2b2418; --ink2: #5b4c35; }
body::before {
    background:
        radial-gradient(900px 600px at 8% -10%, rgba(143, 163, 255, 0.16), transparent 60%),
        radial-gradient(900px 700px at 95% 0%, rgba(242, 184, 75, 0.12), transparent 60%),
        radial-gradient(800px 600px at 50% 110%, rgba(42, 58, 120, 0.25), transparent 60%),
        var(--bg);
}
.mmx.fft { --blue: #f2b84b; --violet: #8fa3ff; --deep: #1d2650; --c: var(--blue); }
.fft .grad-bv, .fft .eyebrow { background: linear-gradient(90deg, #8fa3ff, #c9b8ff 40%, #f2b84b); -webkit-background-clip: text; background-clip: text; color: transparent; }
.fft .mmx-nav img { height: 34px; border-radius: 6px; background: var(--parch); padding: 2px 6px; }
.fft .btn-primary { background: linear-gradient(135deg, #f2b84b, #e09a2a); color: #1a1408; }

/* Parchment panel: the paper of the concept sheets */
.parch { position: relative; border-radius: 22px; color: var(--ink); background:
    radial-gradient(60% 50% at 12% 18%, rgba(143, 163, 255, 0.22), transparent 70%),
    radial-gradient(55% 45% at 88% 80%, rgba(242, 184, 75, 0.28), transparent 70%),
    radial-gradient(40% 40% at 70% 15%, rgba(176, 120, 60, 0.12), transparent 70%),
    var(--parch); box-shadow: inset 0 0 80px rgba(120, 85, 40, 0.35), 0 30px 80px -40px #000; }

/* Hero: the logo on parchment */
.fft-hero { padding: 34px 0 30px !important; }
.fft-hero .parch { padding: clamp(18px, 4vw, 44px) clamp(16px, 4vw, 44px) clamp(22px, 3vw, 34px); text-align: center; }
.fft-hero .logo { width: min(820px, 100%); height: auto; mix-blend-mode: multiply; display: block; margin: 0 auto; }
.fft-hero .lead { color: var(--ink); max-width: 720px; margin: 8px auto 0; font-size: clamp(16px, 1.9vw, 19px); }
.fft-hero .tag { color: #6a4b18; font-style: italic; margin-top: 10px; }
.fft-hero .cta-row { justify-content: center; }
.fft-hero .btn-ghost { color: var(--ink); border-color: rgba(43, 36, 24, 0.35); }

/* Trailer */
.trailer { position: relative; aspect-ratio: 16 / 9; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: #000; box-shadow: 0 30px 80px -40px #8fa3ff; }
.trailer video { width: 100%; height: 100%; display: block; object-fit: cover; }

/* The two paths */
.paths { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.path { --pc: var(--blue); display: grid; grid-template-columns: 1fr; gap: 16px; align-items: start; padding: 16px; border-radius: 20px; border: 1px solid color-mix(in srgb, var(--pc) 40%, var(--line)); background: radial-gradient(400px 200px at 0% 0%, color-mix(in srgb, var(--pc) 16%, transparent), transparent 70%), var(--card); }
.path .ph { border-radius: 14px; }
.path small { display: block; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--pc); }
.path h3 { font-size: 24px; margin: 4px 0 2px; }
.path b { display: block; color: var(--muted); font-weight: 600; margin-bottom: 8px; }
.path p { margin: 0; color: #d6d3e3; }

/* Image frames: the art when it exists, a labeled parchment frame until then */
.ph { position: relative; margin: 0; overflow: hidden; display: grid; place-items: center; background: radial-gradient(70% 70% at 50% 50%, #f3e8cf, #dccaa0 90%); }
.ph.wide { aspect-ratio: 16 / 9; }
.ph.square { aspect-ratio: 1; }
.ph.portrait { aspect-ratio: 3 / 4; }
.ph.tall { aspect-ratio: 768 / 1376; }
.ph img { position: absolute; inset: 0; z-index: 1; display: block; width: 100%; height: 100%; object-fit: cover; }
.ph.fit img { object-fit: contain; }
.ph figcaption { padding: 0 12px; text-align: center; font-family: var(--round); font-size: 12px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #8a744e; }

/* Story reader */
.fft .chapter .ch-art { cursor: default; }
.fft .chapter .num { color: var(--blue); }
.fft .chapter p em { color: #e9dcc0; }
.fft .chapter { scroll-margin-top: 132px; }

/* Character tabs and cards */
.gtabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; scroll-margin-top: 132px; }
.gtab { --gc: var(--blue); display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 99px; border: 1px solid var(--line); background: var(--card); color: var(--muted); font: inherit; font-size: 14px; cursor: pointer; transition: .2s; }
.gtab small { font-size: 11.5px; font-weight: 800; color: var(--dim); }
.gtab:hover { color: var(--fg); border-color: color-mix(in srgb, var(--gc) 50%, transparent); }
.gtab.on { color: #fff; border-color: var(--gc); background: color-mix(in srgb, var(--gc) 16%, var(--card)); }
.gtab.on small { color: var(--gc); }
.gpanel[hidden] { display: none; }
.ghead { margin-bottom: 16px; max-width: 860px; }
.ghead small { display: block; font-size: 12.5px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--gc); }
.ghead h2 { font-size: clamp(26px, 3.4vw, 38px); margin: 4px 0 8px; }
.ghead p { color: #d6d3e3; font-size: 16.5px; margin: 0; }
.people { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.person, .place, .job { border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); scroll-margin-top: 140px; }
.person .ph, .place .ph, .job .ph { border-bottom: 1px solid var(--line); }
.person .pi, .place .pi, .job .pi { padding: 14px 16px 16px; }
.person h3, .place h3, .job h3 { font-size: 18px; margin: 0; }
.person small, .place small, .job small { display: block; font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--gc, var(--rc, var(--blue))); margin: 6px 0 8px; }
.person p, .place p, .job p { margin: 0; color: #d3cfdf; font-size: 14.5px; }

/* World: houses, games, empires */
.state { max-width: 860px; }
.state p { color: #ddd9e8; font-size: 17px; line-height: 1.7; margin: 0 0 12px; }
.houses { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.house { --hc: var(--blue); border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); display: flex; flex-direction: column; }
.house .bar { height: 6px; background: linear-gradient(90deg, var(--h1), var(--h2)); }
.house .ph { margin: 14px 14px 0; border-radius: 14px; }
.house .pi { padding: 12px 14px 16px; }
.house h3 { font-size: 18px; margin: 0; }
.house .crest { display: block; font-size: 12px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin: 4px 0 10px; }
.house dl { margin: 0 0 10px; font-size: 13.5px; }
.house dt { color: var(--dim); font-size: 11px; font-weight: 800; letter-spacing: 1px; text-transform: uppercase; margin-top: 8px; }
.house dd { margin: 2px 0 0; color: #e4e0ee; }
.house .sw { display: inline-block; width: 12px; height: 12px; border-radius: 3px; margin-right: 4px; vertical-align: -1px; border: 1px solid rgba(255, 255, 255, .25); }
.house p { margin: 0; color: #d3cfdf; font-size: 14px; }
.trials { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.trial { border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); }
.trial .pi { padding: 14px 16px 18px; }
.trial .n { font-family: var(--round); font-weight: 800; color: var(--blue); letter-spacing: 2px; }
.trial h3 { font-size: 19px; margin: 2px 0; }
.trial small { display: block; color: var(--violet); font-weight: 700; margin-bottom: 8px; }
.trial p { margin: 0; color: #d3cfdf; font-size: 14.5px; }
.empires { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

/* Relics */
.relic { --rc: var(--blue); display: grid; grid-template-columns: 380px 1fr; gap: 28px; align-items: start; padding: 20px; border-radius: 24px; border: 1px solid color-mix(in srgb, var(--rc) 35%, var(--line)); background: radial-gradient(600px 300px at 100% 0%, color-mix(in srgb, var(--rc) 12%, transparent), transparent 70%), var(--card); margin-bottom: 18px; }
.relic .ph { border-radius: 16px; }
.relic small { display: block; font-size: 12.5px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--rc); }
.relic h2 { font-size: clamp(30px, 4vw, 44px); margin: 4px 0 14px; }
.relic dl { margin: 0 0 16px; }
.relic dt { color: var(--rc); font-size: 11.5px; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase; margin-top: 10px; }
.relic dd { margin: 3px 0 0; color: #e4e0ee; }
.relic p { color: #ddd9e8; font-size: 16.5px; line-height: 1.7; margin: 0; }

/* Jobs */
.jobs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }

/* Locations */
.rjump { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.rjump a { padding: 8px 14px; border-radius: 99px; border: 1px solid color-mix(in srgb, var(--rc) 45%, transparent); color: var(--fg); text-decoration: none; font-size: 14px; background: color-mix(in srgb, var(--rc) 10%, var(--card)); }
.region { padding-top: 20px !important; scroll-margin-top: 120px; }
.region-h { font-size: clamp(24px, 3vw, 32px); color: var(--rc); margin-bottom: 14px; display: flex; align-items: baseline; gap: 12px; }
.region-h small { font-size: 13px; color: var(--dim); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.places { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.mmx-section .sec-art { border-bottom: 1px solid var(--line); }
.fft .fan-note { line-height: 1.6; }
.fft input[type=range]::-webkit-slider-thumb { box-shadow: 0 0 0 3px rgba(242, 184, 75, 0.35); }

@media (max-width: 1100px) { .houses { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 980px) {
    .paths, .empires { grid-template-columns: 1fr; }
    .people, .jobs { grid-template-columns: repeat(3, 1fr); }
    .places, .trials { grid-template-columns: repeat(2, 1fr); }
    .relic { grid-template-columns: 1fr; }
    .relic .ph { max-width: 420px; }
}
@media (max-width: 640px) {
    .people, .jobs, .houses { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .places, .trials { grid-template-columns: 1fr; }
    .person .pi, .job .pi { padding: 12px; }
    .person p, .job p { font-size: 13.5px; }
}
`;
