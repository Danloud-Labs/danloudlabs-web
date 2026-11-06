// =====================================================================================
// Dark Within Me website CSS. The pages reuse the component CSS of the MMX9 pages (sub-nav,
// cinematic hero, cards, chapter reader, tabs) and repaint it: crimson and black with silver,
// taken from the Dark Within Me logo, instead of blue and violet.
// =====================================================================================

import { MMX_CSS } from './mmx9-styles.js';

export const DWM_CSS = MMX_CSS + `
:root { --a1: #e0283f; --a2: #ff6b6b; --a3: #7a0f1f; }
body::before {
    background:
        radial-gradient(900px 600px at 10% -10%, rgba(224, 40, 63, 0.16), transparent 60%),
        radial-gradient(900px 700px at 95% 0%, rgba(122, 15, 31, 0.28), transparent 60%),
        radial-gradient(800px 600px at 50% 110%, rgba(201, 204, 214, 0.05), transparent 60%),
        var(--bg);
}
.brand img { filter: drop-shadow(0 0 10px rgba(224, 40, 63, 0.4)); }
.mmx.dwm { --blue: #e0283f; --violet: #c9ccd6; --deep: #3a0710; --c: var(--blue); }
.dwm .grad-bv, .dwm .eyebrow { background: linear-gradient(90deg, #ff4d5e, #e0283f 45%, #c9ccd6); -webkit-background-clip: text; background-clip: text; color: transparent; }
.dwm .mmx-nav img { height: 34px; }

/* Hero: the full title art, centered and edge to edge, with drifting embers and the text under it */
.dwm-hero { position: relative; overflow: hidden; text-align: center; padding: 0 0 46px !important; background: #050304; }
.dwm-hero .hero-art { position: relative; z-index: 0; }
.dwm-hero .hero-art img { display: block; width: 100%; height: auto; max-height: 80vh; aspect-ratio: 2752 / 1536; object-fit: cover; object-position: 50% 42%; }
.dwm-hero .hero-art::after { content: ''; position: absolute; inset: auto 0 0 0; height: 30%; background: linear-gradient(to bottom, transparent, #050304); }
.dwm-hero .wrap { position: relative; z-index: 2; margin-top: -24px; }
.dwm-hero .lead { color: #e8dfe1; max-width: 680px; margin: 0 auto; font-size: clamp(16px, 1.9vw, 19px); }
.dwm-hero .tag { color: #ff8b97; font-style: italic; margin-top: 10px; }
.dwm-hero .cta-row { justify-content: center; }
.dwm-hero .credit { color: var(--muted); font-size: 13px; letter-spacing: 1.4px; text-transform: uppercase; margin-top: 18px; }
.embers { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
.embers i { position: absolute; bottom: -10px; width: 3px; height: 3px; border-radius: 50%; background: #ff5a3c; box-shadow: 0 0 8px 2px rgba(255, 70, 50, 0.7); opacity: 0; animation: ember 9s linear infinite; }
@keyframes ember { 0% { transform: translate3d(0, 0, 0); opacity: 0; } 10% { opacity: .9; } 100% { transform: translate3d(var(--dx, 30px), -95vh, 0); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .embers { display: none; } }

/* Explore cards without art yet: crimson instead of the MMX blue */
.dwm .mmx-section .art.none { background: radial-gradient(70% 90% at 20% 100%, rgba(224, 40, 63, .35), transparent 70%), radial-gradient(70% 90% at 90% 0%, rgba(201, 204, 214, .12), transparent 70%), #0a0607; }

/* Books */
.books { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.book { --bc: var(--blue); position: relative; display: flex; flex-direction: column; border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); text-decoration: none; transition: transform .25s, border-color .25s, box-shadow .25s; }
.book:hover { transform: translateY(-4px); border-color: var(--bc); box-shadow: 0 22px 60px -28px var(--bc); }
.book .cv { aspect-ratio: 16 / 9; background: radial-gradient(70% 80% at 50% 40%, color-mix(in srgb, var(--bc) 30%, transparent), #070405 75%) center / cover no-repeat; border-bottom: 1px solid var(--line); display: grid; place-items: center; }
.book .cv span { font-family: var(--round); font-size: 18px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: color-mix(in srgb, var(--bc) 70%, white); text-shadow: 0 0 24px var(--bc); text-align: center; padding: 0 10px; }
.book .bi { padding: 14px 16px 16px; }
.book small { display: block; font-size: 11.5px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; color: var(--bc); }
.book b { display: block; font-family: var(--round); font-size: 18px; margin-top: 3px; }

/* Story: one tab per book */
.btabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px; }
.btab { --bc: var(--blue); display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 12px 14px; border-radius: 14px; border: 1px solid var(--line); background: var(--card); color: var(--muted); font: inherit; text-align: left; cursor: pointer; transition: .2s; }
.btab small { font-size: 11px; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase; color: var(--dim); }
.btab b { font-family: var(--round); font-size: 17px; }
.btab:hover { color: var(--fg); border-color: color-mix(in srgb, var(--bc) 50%, transparent); }
.btab.on { color: #fff; border-color: var(--bc); background: color-mix(in srgb, var(--bc) 14%, var(--card)); box-shadow: 0 12px 40px -18px var(--bc); }
.btab.on small { color: var(--bc); }
.bpanel { --bc: var(--blue); }
.bpanel[hidden] { display: none; }
.btabs { scroll-margin-top: 132px; }
/* The whole cover, never cropped */
.bcover { width: 100%; aspect-ratio: 1920 / 1072; border-radius: 22px; overflow: hidden; border: 1px solid var(--line); background: #070405; }
.bcover img { display: block; width: 100%; height: 100%; object-fit: contain; }
.bsyn { max-width: 820px; margin: 26px 0 30px; }
.bsyn h2 { font-size: clamp(28px, 3.6vw, 40px); margin-bottom: 12px; }
.bsyn h2 small { display: block; font-size: 13px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--bc); margin-bottom: 6px; }
.bsyn p { color: #ddd6d8; font-size: 17px; line-height: 1.7; margin: 0 0 12px; }
.bsoon { padding: 26px; border-radius: 18px; border: 1px dashed var(--line2); color: var(--muted); text-align: center; }
.dwm .chapter { scroll-margin-top: 132px; }
/* Chapter art frame: shows the art when it exists, an empty frame waiting for it when not */
.dwm .chapter .ch-art { position: relative; cursor: default; }
.dwm .chapter .ch-art figcaption { display: none; }
.dwm .chapter .ch-art.empty { display: grid; place-items: center; background: radial-gradient(60% 80% at 50% 50%, color-mix(in srgb, var(--bc, #e0283f) 18%, transparent), #070405 75%); border-style: dashed; }
.dwm .chapter .ch-art.empty figcaption { display: block; font-family: var(--round); font-size: 13px; font-weight: 800; letter-spacing: 3px; text-transform: uppercase; color: color-mix(in srgb, var(--bc, #e0283f) 55%, #888); }

/* Universe: ranks and timeline */
.rank-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.rank-h { font-size: 20px; margin: 0 0 12px; }
.rank-h.light { color: #f0e9d8; }
.rank-h.dark { color: #ff6b6b; }
.ranks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.ranks li { display: flex; gap: 14px; padding: 14px 16px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); }
.ranks .rn { flex: none; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; font-weight: 800; font-size: 15px; }
.ranks.light .rn { background: rgba(240, 233, 216, .1); color: #f0e9d8; border: 1px solid rgba(240, 233, 216, .35); }
.ranks.dark .rn { background: rgba(224, 40, 63, .12); color: #ff6b6b; border: 1px solid rgba(224, 40, 63, .45); }
.ranks b { display: block; font-family: var(--round); font-size: 17px; }
.ranks small { display: block; font-size: 12px; font-weight: 700; letter-spacing: .6px; color: var(--dim); margin: 2px 0 6px; text-transform: uppercase; }
.ranks p { margin: 0; color: #d3cfdf; font-size: 14.5px; }
.count-note { color: var(--muted); font-size: 14px; margin: 12px 4px 0; }
.timeline { list-style: none; margin: 0; padding: 0 0 0 22px; border-left: 2px solid rgba(224, 40, 63, .35); display: flex; flex-direction: column; gap: 14px; max-width: 820px; }
.timeline li { position: relative; }
.timeline li::before { content: ''; position: absolute; left: -29px; top: 6px; width: 12px; height: 12px; border-radius: 50%; background: #e0283f; box-shadow: 0 0 12px rgba(224, 40, 63, .7); }
.timeline b { display: block; font-family: var(--round); color: #ff8b97; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; }
.timeline p { margin: 2px 0 0; color: #ddd6d8; }

.chapter p.scene { text-align: center; color: var(--dim); letter-spacing: 8px; margin: 26px 0; }
.chapter p em { color: #f0e6e8; }
.dwm .chapter .num { color: var(--blue); }

@media (max-width: 980px) {
    .books { grid-template-columns: repeat(2, 1fr); }
    .btabs { grid-template-columns: repeat(2, 1fr); }
    .rank-cols { grid-template-columns: 1fr; }
}
`;
