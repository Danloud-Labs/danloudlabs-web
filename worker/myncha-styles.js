// =====================================================================================
// Myncha: Vampires of Exius website CSS. Reuses the component CSS of the MMX9 pages (sub-nav,
// cards, chapter reader, sections) on a gothic night: amethyst lavender for Myncha, the cyan of
// her diamond skin and her blur, and blood crimson for the hunger.
// =====================================================================================

import { MMX_CSS } from './mmx9-styles.js';

export const MY_CSS = MMX_CSS + `
:root { --a1: #b48cff; --a2: #5fd6e6; --a3: #3a1a5e; }
body::before {
    background:
        radial-gradient(900px 600px at 8% -10%, rgba(180, 140, 255, 0.18), transparent 60%),
        radial-gradient(900px 700px at 95% 0%, rgba(95, 214, 230, 0.10), transparent 60%),
        radial-gradient(800px 600px at 50% 110%, rgba(170, 20, 50, 0.16), transparent 60%),
        var(--bg);
}
.mmx.my { --blue: #b48cff; --violet: #5fd6e6; --deep: #3a1a5e; --blood: #ff5a76; --c: var(--blue); }
.my .grad-bv, .my .eyebrow { background: linear-gradient(90deg, #b48cff, #e0c8ff 45%, #5fd6e6); -webkit-background-clip: text; background-clip: text; color: transparent; }
.my .grad-blood { background: linear-gradient(90deg, #ff5a76, #b48cff); -webkit-background-clip: text; background-clip: text; color: transparent; }
.my .mmx-nav img { height: 32px; }
.my .btn-primary { background: linear-gradient(135deg, #b48cff, #7a4fd6); color: #fff; }

/* Hero: the logo on the night */
.my-hero { padding: 34px 0 20px !important; text-align: center; }
.my-hero .logo { width: min(760px, 100%); height: auto; display: block; margin: 0 auto; filter: drop-shadow(0 0 40px rgba(180, 140, 255, 0.35)); }
.my-hero .lead { max-width: 760px; margin: 14px auto 0; font-size: clamp(16px, 1.9vw, 19px); color: #ddd6ee; }
.my-hero .tag { font-family: var(--round); font-style: italic; letter-spacing: 1px; margin: 16px 0 0; font-size: 18px; color: #5fd6e6; }
.my-hero .cta-row { justify-content: center; }

/* Image frames: the art when it exists, a labeled night frame until then */
.ph { position: relative; margin: 0; overflow: hidden; display: grid; place-items: center; background: radial-gradient(70% 70% at 50% 40%, #241a38, #0d0a16 90%); }
.ph::before { content: ""; position: absolute; inset: 10px; border: 1px solid rgba(180, 140, 255, 0.18); border-radius: 10px; pointer-events: none; }
.ph.wide { aspect-ratio: 16 / 9; }
.ph.portrait { aspect-ratio: 3 / 4; }
.ph img { position: absolute; inset: 0; z-index: 1; display: block; width: 100%; height: 100%; object-fit: cover; }
.ph figcaption { padding: 0 12px; text-align: center; font-family: var(--round); font-size: 12px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: #7e6aa3; }

/* Story reader */
.my .chapter .num { color: var(--blue); }
.my .chapter { scroll-margin-top: 132px; }
.my .chapter p.scene { text-align: center; color: var(--dim); letter-spacing: 8px; margin: 26px 0; }
.continues { margin-top: 26px; padding: 22px 24px; border-radius: 18px; border: 1px dashed rgba(180, 140, 255, 0.4); background: rgba(180, 140, 255, 0.06); color: #ddd6ee; }
.continues h3 { margin: 0 0 6px; font-size: 20px; }
.continues p { margin: 0; }

/* Character tabs and cards */
.gtabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; scroll-margin-top: 132px; }
.gtab { --gc: var(--blue); display: inline-flex; align-items: center; gap: 8px; padding: 9px 14px; border-radius: 99px; border: 1px solid var(--line); background: var(--card); color: var(--muted); font: inherit; font-size: 14px; cursor: pointer; transition: .2s; }
.gtab small { font-size: 11.5px; font-weight: 800; color: var(--dim); }
.gtab:hover { color: var(--fg); border-color: color-mix(in srgb, var(--gc) 50%, transparent); }
.gtab.on { color: #fff; border-color: var(--gc); background: color-mix(in srgb, var(--gc) 16%, var(--card)); }
.gtab.on small { color: var(--gc); }
.gpanel[hidden] { display: none; }
.ghead { margin-bottom: 16px; max-width: 860px; }
.ghead h2 { font-size: clamp(26px, 3.4vw, 38px); margin: 0 0 8px; color: var(--gc); }
.ghead p { color: #d6d3e3; font-size: 16.5px; margin: 0; }
.people { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.person, .place, .entry { border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); scroll-margin-top: 140px; }
.person .ph, .place .ph, .entry .ph { border-bottom: 1px solid var(--line); }
.person .forms { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--line); border-bottom: 1px solid var(--line); }
.person .forms .ph { border: 0; }
.person .pi, .place .pi, .entry .pi { padding: 14px 16px 16px; }
.person h3, .place h3, .entry h3 { font-size: 19px; margin: 0; }
.person small, .place small { display: block; font-size: 12px; font-weight: 700; letter-spacing: .5px; text-transform: uppercase; color: var(--gc, var(--rc, var(--blue))); margin: 6px 0 8px; }
.person p, .place p, .entry p { margin: 0; color: #d3cfdf; font-size: 14.5px; }
.person p.soon { color: var(--dim); font-style: italic; }

/* The Curse */
.curse { --cc: var(--blue); display: grid; grid-template-columns: 1.05fr 1fr; gap: 26px; align-items: start; padding: 20px; border-radius: 24px; border: 1px solid color-mix(in srgb, var(--cc) 35%, var(--line)); background: radial-gradient(600px 300px at 100% 0%, color-mix(in srgb, var(--cc) 12%, transparent), transparent 70%), var(--card); margin-bottom: 18px; scroll-margin-top: 130px; }
.curse:nth-child(even) { grid-template-columns: 1fr 1.05fr; }
.curse:nth-child(even) .ph { order: 2; }
.curse .ph { border-radius: 16px; }
.curse h2 { font-size: clamp(26px, 3.4vw, 38px); margin: 0 0 12px; color: var(--cc); }
.curse p { color: #ddd9e8; font-size: 16.5px; line-height: 1.7; margin: 0 0 12px; }
.powers { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.power { padding: 18px; border-radius: 18px; border: 1px solid var(--line); background: var(--card); }
.power h3 { margin: 0 0 6px; font-size: 18px; color: #e0c8ff; }
.power p { margin: 0; color: #d3cfdf; font-size: 14.5px; }
.arts { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 28px; }
.art { display: grid; grid-template-columns: 220px 1fr; gap: 14px; padding: 12px 0; border-bottom: 1px solid var(--line); }
.art b { color: #5fd6e6; font-family: var(--round); letter-spacing: .5px; }
.art span { color: #d3cfdf; font-size: 14.5px; }

/* Exius, bestiary, locations */
.lore { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.lore .place h3 { font-size: 21px; }
.lore .place p { font-size: 15.5px; line-height: 1.65; }
.entries { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.rjump { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.rjump a { padding: 8px 14px; border-radius: 99px; border: 1px solid color-mix(in srgb, var(--rc) 45%, transparent); color: var(--fg); text-decoration: none; font-size: 14px; background: color-mix(in srgb, var(--rc) 10%, var(--card)); }
.region { padding-top: 20px !important; scroll-margin-top: 120px; }
.region-h { font-size: clamp(24px, 3vw, 32px); color: var(--rc); margin-bottom: 14px; display: flex; align-items: baseline; gap: 12px; }
.region-h small { font-size: 13px; color: var(--dim); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.places { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.mmx-section .sec-art { border-bottom: 1px solid var(--line); }
.my .fan-note { line-height: 1.6; }
.my input[type=range]::-webkit-slider-thumb { box-shadow: 0 0 0 3px rgba(180, 140, 255, 0.35); }

@media (max-width: 980px) {
    .people, .places, .powers { grid-template-columns: repeat(2, 1fr); }
    .curse, .curse:nth-child(even) { grid-template-columns: 1fr; }
    .curse:nth-child(even) .ph { order: 0; }
    .arts, .lore { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
    .people { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .places, .powers, .entries { grid-template-columns: 1fr; }
    .person .pi { padding: 12px; }
    .person p { font-size: 13.5px; }
    .art { grid-template-columns: 1fr; gap: 2px; }
}
`;
