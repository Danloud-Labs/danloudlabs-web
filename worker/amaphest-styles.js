// =====================================================================================
// Amaphest website: extra CSS on top of site-styles.js (Alpha red, Betha blue, Amalion
// purple). Injected only on the Amaphest pages.
// =====================================================================================

export const AMA_CSS = `
.ama { --alpha: #ff2e4d; --betha: #2f8bff; --amalion: #d63cff; --c: var(--amalion); }
.ama .grad-ab { background: linear-gradient(90deg, var(--betha), var(--amalion) 50%, var(--alpha)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.ama .eyebrow { background: linear-gradient(90deg, var(--betha), var(--amalion), var(--alpha)); -webkit-background-clip: text; background-clip: text; color: transparent; }

/* Subnav */
.ama-nav { position: sticky; top: 62px; z-index: 40; border-bottom: 1px solid var(--line); background: rgba(6, 5, 10, 0.8); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
.ama-nav .wrap { display: flex; gap: 6px; align-items: center; overflow-x: auto; padding: 9px 20px; scrollbar-width: none; }
.ama-nav .wrap::-webkit-scrollbar { display: none; }
.ama-nav img { height: 30px; width: auto; margin-right: 8px; flex: none; }
.ama-nav a, .ama-nav span { flex: none; text-decoration: none; font-size: 14px; font-weight: 600; color: var(--muted); padding: 7px 13px; border-radius: 999px; border: 1px solid transparent; }
.ama-nav a:hover { color: var(--fg); background: rgba(255, 255, 255, 0.05); }
.ama-nav a.on { color: #fff; border-color: color-mix(in srgb, var(--amalion) 60%, transparent); background: color-mix(in srgb, var(--amalion) 16%, transparent); }
.ama-nav span { color: var(--dim); }
.ama-nav span small { font-size: 10px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; margin-left: 6px; color: #fbbf24; }

/* Cinematic hero with slow "dynamic wallpaper" motion */
.cine { position: relative; overflow: hidden; min-height: min(78vh, 760px); display: flex; align-items: flex-end; background: #000; }
.cine > .bg { --focus: 50% 25%; position: absolute; inset: -4%; background-size: cover; background-position: var(--focus); transform-origin: var(--focus); animation: ama-drift 28s ease-in-out infinite alternate; }
.cine::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(0deg, var(--bg) 0%, rgba(6, 5, 10, 0.55) 38%, rgba(6, 5, 10, 0.05) 70%), linear-gradient(90deg, rgba(6, 5, 10, 0.75), transparent 60%); }
.cine .wrap { position: relative; z-index: 2; padding-bottom: 48px; }
.cine .logo { width: min(620px, 92%); height: auto; filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.8)); }
.cine .lead { color: #e7e2ee; max-width: 640px; margin-top: 14px; }
.cine .credit { color: var(--muted); font-size: 13px; letter-spacing: 1.4px; text-transform: uppercase; margin-top: 14px; }
.cine .sparks { position: absolute; inset: 0; z-index: 1; pointer-events: none; background:
    radial-gradient(2px 2px at 20% 30%, rgba(255, 46, 77, .9), transparent), radial-gradient(2px 2px at 70% 60%, rgba(47, 139, 255, .9), transparent),
    radial-gradient(1.5px 1.5px at 40% 80%, rgba(214, 60, 255, .9), transparent), radial-gradient(1.5px 1.5px at 85% 25%, rgba(255, 46, 77, .8), transparent),
    radial-gradient(2px 2px at 55% 15%, rgba(47, 139, 255, .8), transparent); background-size: 100% 100%; animation: ama-sparks 9s linear infinite; opacity: .7; }
/* Zooms toward the focus point (the face) and never drifts upward, so the face stays in frame. */
@keyframes ama-drift { from { transform: scale(1.02) translate3d(-0.8%, 0, 0); } to { transform: scale(1.09) translate3d(0.8%, 0.6%, 0); } }
@keyframes ama-sparks { from { transform: translateY(0); opacity: .8; } to { transform: translateY(-60px); opacity: .2; } }
@media (prefers-reduced-motion: reduce) { .cine > .bg, .cine .sparks { animation: none; } }

/* Universe trio */
.trio { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.trio .card { border-top: 2px solid var(--tc); background: radial-gradient(360px 180px at 0% 0%, color-mix(in srgb, var(--tc) 16%, transparent), transparent 70%), var(--card); }
.trio h3 { color: var(--tc); font-size: 20px; margin-bottom: 8px; }
.trio p { margin: 0; color: #d3cdda; font-size: 15px; }

/* Section tiles */
.ama-sections { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.ama-section { position: relative; padding: 22px; border-radius: 20px; border: 1px solid var(--line); background: var(--card); text-decoration: none; display: flex; flex-direction: column; gap: 8px; min-height: 160px; transition: .2s; }
a.ama-section:hover { border-color: var(--amalion); transform: translateY(-3px); box-shadow: 0 18px 50px -24px var(--amalion); }
.ama-section h3 { font-size: 20px; }
.ama-section p { margin: 0; color: var(--muted); font-size: 14px; }
.ama-section .st { margin-top: auto; align-self: flex-start; font-size: 11px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; }
.ama-section .st.live { color: #fff; background: var(--amalion); }
.ama-section .st.soon { color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.35); }

/* Character cards */
.ama-group { margin-bottom: 40px; }
.ama-group > h3 { font-size: 22px; margin-bottom: 4px; }
.ama-group > p { margin: 0 0 16px; color: var(--muted); }
.chars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.chars.sm { grid-template-columns: repeat(6, 1fr); }
.char { --cc: var(--amalion); position: relative; display: block; text-decoration: none; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: var(--card); transition: transform .25s, border-color .25s, box-shadow .25s; }
.char:hover { transform: translateY(-4px); border-color: var(--cc); box-shadow: 0 22px 60px -26px var(--cc); }
.char .pic { position: relative; aspect-ratio: 3 / 4; overflow: hidden; background: radial-gradient(90% 70% at 50% 35%, color-mix(in srgb, var(--cc) 45%, transparent), color-mix(in srgb, var(--cc) 8%, transparent) 65%, transparent 90%), linear-gradient(180deg, #16121c, #0a090d); }
.char .pic img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 20%; display: block; transition: transform .6s; }
.char:hover .pic img { transform: scale(1.05); }
.char .pic::after { content: ""; position: absolute; inset: auto 0 0; height: 40%; background: linear-gradient(0deg, var(--card), transparent); }
.char .mono { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--round); font-size: 64px; font-weight: 800; color: color-mix(in srgb, var(--cc) 75%, white); text-shadow: 0 0 40px var(--cc); letter-spacing: 2px; }
.char .soon { position: absolute; top: 10px; left: 10px; z-index: 1; font-size: 10.5px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; color: #fbbf24; background: rgba(0, 0, 0, 0.55); padding: 4px 8px; border-radius: 8px; }
.char .meta { position: relative; padding: 0 16px 16px; margin-top: -30px; z-index: 1; }
.char .meta small { display: block; font-size: 11.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: var(--cc); }
.char .meta b { display: block; font-family: var(--round); font-size: 19px; line-height: 1.15; margin-top: 2px; }
.char .meta span { display: block; color: var(--muted); font-size: 13px; margin-top: 3px; }
.chars.sm .char .meta b { font-size: 15.5px; }
.chars.sm .char .mono { font-size: 44px; }
.facs { display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px; }
.facs > .fac { grid-column: span var(--span, 3); }
.fac { --fc: var(--amalion); position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: 150px; padding: 16px 18px; border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: radial-gradient(120% 90% at 20% 0%, color-mix(in srgb, var(--fc) 40%, transparent), transparent 70%), linear-gradient(160deg, #1a1420, #0a090d); color: var(--text); font: inherit; text-align: left; cursor: pointer; transition: transform .25s, border-color .25s, box-shadow .25s; }
.fac .bg { position: absolute; inset: 0; background-size: cover; background-position: center 30%; transition: transform .6s, filter .3s; filter: saturate(.85) brightness(.75); }
.fac .bg.noart { filter: none; background: radial-gradient(60% 120% at 15% 100%, rgba(255, 46, 77, .55), transparent 70%), radial-gradient(60% 120% at 85% 0%, rgba(47, 139, 255, .5), transparent 70%), radial-gradient(40% 60% at 50% 50%, rgba(214, 60, 255, .35), transparent 80%), #0d0a12; }
.fac::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(6, 5, 10, .95) 8%, rgba(6, 5, 10, .35) 60%, rgba(6, 5, 10, .1)); }
.fac > b, .fac > small { position: relative; z-index: 1; }
.fac > b { font-family: var(--round); font-size: 18px; line-height: 1.15; }
.fac > small { margin-top: 3px; font-size: 11.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: color-mix(in srgb, var(--fc) 70%, white); }
.fac:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--fc) 60%, transparent); }
.fac:hover .bg { transform: scale(1.05); filter: saturate(1) brightness(.9); }
.fac.on { border-color: var(--fc); box-shadow: 0 0 0 1px var(--fc), 0 12px 40px -12px var(--fc); }
.fac.on .bg { filter: saturate(1.05) brightness(.95); }
.fac-panel { --fc: var(--amalion); margin-top: 18px; padding: 22px; border-radius: 22px; border: 1px solid color-mix(in srgb, var(--fc) 35%, var(--line)); background: linear-gradient(180deg, color-mix(in srgb, var(--fc) 9%, var(--win)), var(--win) 220px); }
.fac-panel[hidden] { display: none; }
#factions, .fac-panel { scroll-margin-top: 130px; }
.fac-panel .chars { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
.fac-panel > h3 { font-size: 24px; margin: 0 0 4px; }
.fac-panel > p { margin: 0 0 18px; color: var(--muted); max-width: 760px; }
.ch-role a { color: inherit; }

/* Character page */
.ch-hero { position: relative; overflow: hidden; background: #000; }
.ch-hero .stage { position: relative; aspect-ratio: 16 / 9; max-height: 82vh; width: 100%; overflow: hidden; }
.ch-hero .stage img.wp { --focus: 50% 28%; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: var(--focus); transform-origin: var(--focus); animation: ama-drift 26s ease-in-out infinite alternate; transition: opacity .5s; }
.ch-hero .stage.empty { aspect-ratio: auto !important; height: 360px; max-height: none; background: radial-gradient(60% 70% at 70% 40%, color-mix(in srgb, var(--cc) 40%, transparent), transparent 70%), linear-gradient(160deg, #15111c, #050407); }
.ch-hero .stage::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, var(--bg) 0%, rgba(6, 5, 10, 0.4) 30%, transparent 60%), linear-gradient(90deg, rgba(6, 5, 10, 0.85) 0%, rgba(6, 5, 10, 0.2) 45%, transparent 70%); }
.ch-hero .over { position: absolute; inset: auto 0 0; z-index: 2; }
.ch-hero .over .wrap { display: flex; align-items: flex-end; gap: 22px; padding-bottom: 34px; }
.ch-hero .avatar { width: 150px; aspect-ratio: 3 / 4; flex: none; border-radius: 22px; overflow: hidden; border: 2px solid color-mix(in srgb, var(--cc) 70%, transparent); box-shadow: 0 0 40px -6px var(--cc), 0 20px 50px rgba(0, 0, 0, 0.7); background: radial-gradient(90% 70% at 50% 35%, color-mix(in srgb, var(--cc) 50%, transparent), #0b0910 80%); }
.ch-hero .avatar img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 20%; display: block; }
.ch-hero h1 { font-size: clamp(34px, 5.5vw, 62px); line-height: 1; }
.ch-hero .alias { font-size: 13px; font-weight: 800; letter-spacing: 2.4px; text-transform: uppercase; color: var(--cc); margin-bottom: 6px; }
.ch-hero .ch-role { color: #e7e2ee; font-size: 17px; margin-top: 8px; }
.forms { display: flex; gap: 8px; flex-wrap: wrap; margin: 22px 0 6px; }
.forms button { font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; color: var(--muted); display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px 5px 5px; border-radius: 999px; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.04); transition: .2s; }
.forms button img { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; object-position: 50% 15%; }
.forms button.on { color: #fff; border-color: var(--cc); background: color-mix(in srgb, var(--cc) 18%, transparent); }
.ch-body { display: grid; grid-template-columns: 1.4fr 1fr; gap: 28px; align-items: start; }
.ch-body .bio p { color: #d9d3e2; font-size: 17px; margin: 0 0 14px; }
.ch-body .form-note { color: var(--muted); font-style: italic; font-size: 15px; }
.facts { width: 100%; border-collapse: collapse; }
.facts td { padding: 11px 0; border-bottom: 1px solid var(--line); vertical-align: top; font-size: 14.5px; }
.facts td:first-child { color: var(--dim); font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; width: 38%; padding-top: 13px; }
.facts tr:last-child td { border-bottom: 0; }
.facts a { color: color-mix(in srgb, var(--cc) 70%, white); text-decoration: none; border-bottom: 1px solid color-mix(in srgb, var(--cc) 40%, transparent); }
.turn { border-radius: 22px; overflow: hidden; border: 1px solid var(--line); background: #0b0a0e; cursor: zoom-in; }
.turn img { width: 100%; display: block; }
.pn { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.pn a { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); text-decoration: none; transition: .2s; }
.pn a:hover { border-color: var(--line2); }
.pn a.next { justify-content: flex-end; text-align: right; }
.pn small { display: block; color: var(--dim); font-size: 11.5px; letter-spacing: 1px; text-transform: uppercase; }
.pn b { font-size: 15px; }
.gallery-empty { text-align: center; padding: 50px 20px; border-radius: 24px; border: 1px dashed var(--line2); color: var(--muted); }
.ama-gallery { columns: 3 280px; column-gap: 12px; }
.ama-gallery figure { break-inside: avoid; margin: 0 0 12px; border-radius: 16px; overflow: hidden; border: 1px solid var(--line); cursor: zoom-in; }
.ama-gallery img { width: 100%; display: block; }

@media (max-width: 980px) {
    .trio { grid-template-columns: 1fr; }
    .ama-sections { grid-template-columns: repeat(2, 1fr); }
    .facs { grid-template-columns: repeat(2, 1fr); }
    .facs > .fac { grid-column: auto; }
    .facs > .fac:last-child:nth-child(odd) { grid-column: 1 / -1; }
    .chars { grid-template-columns: repeat(3, 1fr); }
    .chars.sm { grid-template-columns: repeat(4, 1fr); }
    .ch-body { grid-template-columns: 1fr; }
    .ch-hero .stage { aspect-ratio: 4 / 3; }
}
@media (max-width: 640px) {
    .cine { min-height: 74vh; }
    .chars, .chars.sm { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .ama-sections { grid-template-columns: 1fr; }
    .facs { gap: 10px; }
    .fac { min-height: 112px; padding: 12px 14px; }
    .fac > b { font-size: 15.5px; }
    .fac-panel { padding: 14px; border-radius: 18px; }
    .fac-panel .chars { grid-template-columns: repeat(2, 1fr); }
    .ch-hero .stage { aspect-ratio: 3 / 4; max-height: none; }
    .ch-hero .over .wrap { flex-direction: column; align-items: flex-start; gap: 14px; }
    .ch-hero .avatar { width: 110px; }
    .ch-hero .stage.empty { height: 330px; }
    .pn { grid-template-columns: 1fr; }
}
`;
