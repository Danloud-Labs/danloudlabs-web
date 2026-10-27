// =====================================================================================
// Mega Man X9: Apex-Primal website: extra CSS on top of site-styles.js. Same TS look as
// the rest of the site, with its own palette: plain blue and dark violet (instead of the
// site's cyan and pink), plus the Apex Virus green as a rare accent.
// Injected only on the MMX9 pages.
// =====================================================================================

export const MMX_CSS = `
:root { --a1: #3f8cff; --a2: #7c4dff; --a3: #4a22b0; }
body::before {
    background:
        radial-gradient(900px 600px at 10% -10%, rgba(63, 140, 255, 0.14), transparent 60%),
        radial-gradient(900px 700px at 95% 0%, rgba(74, 34, 176, 0.22), transparent 60%),
        radial-gradient(800px 600px at 50% 110%, rgba(124, 77, 255, 0.10), transparent 60%),
        var(--bg);
}
.brand img { filter: drop-shadow(0 0 10px rgba(63, 140, 255, 0.4)); }
.mmx { --blue: #3f8cff; --violet: #7c4dff; --deep: #3b1c80; --virus: #7dff4f; --c: var(--blue); }
.mmx .grad-bv { background: linear-gradient(90deg, var(--blue), var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }
.mmx .eyebrow { background: linear-gradient(90deg, var(--blue), var(--violet)); -webkit-background-clip: text; background-clip: text; color: transparent; }

/* Subnav */
.mmx-nav { position: sticky; top: 62px; z-index: 40; border-bottom: 1px solid var(--line); background: rgba(6, 5, 10, 0.8); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); }
.mmx-nav .wrap { display: flex; gap: 6px; align-items: center; overflow-x: auto; padding: 9px 20px; scrollbar-width: none; }
.mmx-nav .wrap::-webkit-scrollbar { display: none; }
.mmx-nav img { height: 30px; width: auto; margin-right: 8px; flex: none; }
.mmx-nav a { flex: none; text-decoration: none; font-size: 14px; font-weight: 600; color: var(--muted); padding: 7px 13px; border-radius: 999px; border: 1px solid transparent; }
.mmx-nav a:hover { color: var(--fg); background: rgba(255, 255, 255, 0.05); }
.mmx-nav a.on { color: #fff; border-color: color-mix(in srgb, var(--blue) 60%, transparent); background: color-mix(in srgb, var(--blue) 16%, transparent); }

/* Cinematic hero */
.cine { position: relative; overflow: hidden; min-height: min(80vh, 780px); display: flex; align-items: flex-end; background: #000; }
.cine > .bg { --focus: 50% 30%; position: absolute; inset: -4%; background-size: cover; background-position: var(--focus); transform-origin: var(--focus); animation: mmx-drift 28s ease-in-out infinite alternate; }
.cine::before { content: ""; position: absolute; inset: 0; z-index: 1; background: linear-gradient(0deg, var(--bg) 0%, rgba(6, 5, 10, 0.55) 40%, rgba(6, 5, 10, 0.1) 72%), linear-gradient(90deg, rgba(6, 5, 10, 0.8), transparent 65%); }
.cine .wrap { position: relative; z-index: 2; padding-bottom: 48px; }
.cine .logo { width: min(640px, 94%); height: auto; filter: drop-shadow(0 18px 40px rgba(0, 0, 0, 0.85)); }
.cine .lead { color: #e4e6f2; max-width: 640px; margin-top: 16px; }
.cine .credit { color: var(--muted); font-size: 13px; letter-spacing: 1.4px; text-transform: uppercase; margin-top: 14px; }
.cine .scan { position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: .35; background: repeating-linear-gradient(0deg, rgba(63, 140, 255, 0.08) 0 1px, transparent 1px 4px); mix-blend-mode: screen; }
@keyframes mmx-drift { from { transform: scale(1.02) translate3d(-0.8%, 0, 0); } to { transform: scale(1.09) translate3d(0.8%, 0.6%, 0); } }
@media (prefers-reduced-motion: reduce) { .cine > .bg, .ch-hero .stage img.wp { animation: none; } }

/* Trailer */
.trailer { position: relative; aspect-ratio: 16 / 9; border-radius: 22px; overflow: hidden; border: 1px solid color-mix(in srgb, var(--blue) 35%, var(--line)); box-shadow: 0 30px 80px -40px var(--blue); background: #000; }
.trailer iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

/* Premise / lore cards */
.trio { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.trio .card, .lore .card { border-top: 2px solid var(--tc); background: radial-gradient(360px 180px at 0% 0%, color-mix(in srgb, var(--tc) 14%, transparent), transparent 70%), var(--card); }
.trio h3 { color: var(--tc); font-size: 20px; margin-bottom: 8px; }
.trio p { margin: 0; color: #d3cfdf; font-size: 15px; }
.trio .card { display: block; text-decoration: none; color: inherit; transition: transform .25s, box-shadow .25s; }
.trio .card:hover { transform: translateY(-3px); box-shadow: 0 20px 50px -28px var(--tc); }
.trio .card.has-art { padding: 0; overflow: hidden; }
.trio .card .art { aspect-ratio: 16 / 9; background-size: cover; background-position: center; border-bottom: 1px solid var(--line); }
.trio .card.has-art .txt { padding: 18px 20px 20px; }
.lore { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.lore .card { padding: 0; overflow: hidden; scroll-margin-top: 130px; }
.lore .card .art { aspect-ratio: 16 / 9; background-size: cover; background-position: center; border-bottom: 1px solid var(--line); }
.lore .card .txt { padding: 22px; }
.lore h3 { color: var(--tc); font-size: 22px; margin-bottom: 10px; }
.lore p { margin: 0 0 10px; color: #d3cfdf; font-size: 15.5px; }
.lore p:last-child { margin-bottom: 0; }

/* Section tiles */
.mmx-sections { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
.mmx-section { position: relative; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: var(--card); text-decoration: none; display: flex; flex-direction: column; transition: .2s; }
.mmx-section .art { aspect-ratio: 16 / 9; background-size: cover; background-position: center; border-bottom: 1px solid var(--line); transition: transform .6s; }
.mmx-section .art.none { background: radial-gradient(70% 90% at 20% 100%, rgba(63, 140, 255, .45), transparent 70%), radial-gradient(70% 90% at 90% 0%, rgba(124, 77, 255, .5), transparent 70%), #0b0a14; }
.mmx-section .txt { padding: 16px 18px 18px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
a.mmx-section:hover { border-color: var(--blue); transform: translateY(-3px); box-shadow: 0 18px 50px -24px var(--blue); }
.mmx-section h3 { font-size: 20px; }
.mmx-section p { margin: 0; color: var(--muted); font-size: 14px; }
.mmx-section .st { margin-top: auto; align-self: flex-start; font-size: 11px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; color: #fff; background: linear-gradient(90deg, var(--blue), var(--a3)); }

/* Character cards */
.mmx-group { margin-bottom: 40px; }
.mmx-group > h3 { font-size: 22px; margin-bottom: 4px; }
.mmx-group > p { margin: 0 0 16px; color: var(--muted); }
.chars { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
.chars.six { grid-template-columns: repeat(6, 1fr); }
.char { --cc: var(--blue); position: relative; display: block; text-decoration: none; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: var(--card); transition: transform .25s, border-color .25s, box-shadow .25s; }
.char:hover { transform: translateY(-4px); border-color: var(--cc); box-shadow: 0 22px 60px -26px var(--cc); }
.char .pic { position: relative; aspect-ratio: 3 / 4; overflow: hidden; background: radial-gradient(90% 70% at 50% 35%, color-mix(in srgb, var(--cc) 40%, transparent), color-mix(in srgb, var(--cc) 8%, transparent) 65%, transparent 90%), linear-gradient(180deg, #121426, #08080e); }
.char .pic img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 15%; display: block; transition: transform .6s; }
.char:hover .pic img { transform: scale(1.05); }
.char .pic::after { content: ""; position: absolute; inset: auto 0 0; height: 40%; background: linear-gradient(0deg, var(--card), transparent); }
.char .mono { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--round); font-size: 58px; font-weight: 800; color: color-mix(in srgb, var(--cc) 75%, white); text-shadow: 0 0 40px var(--cc); letter-spacing: 2px; }
.char .soon { position: absolute; top: 10px; left: 10px; z-index: 1; font-size: 10.5px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; color: #fbbf24; background: rgba(0, 0, 0, 0.55); padding: 4px 8px; border-radius: 8px; }
.char .meta { position: relative; padding: 0 16px 16px; margin-top: -30px; z-index: 1; }
.char .meta small { display: block; font-size: 11.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: var(--cc); }
.char .meta b { display: block; font-family: var(--round); font-size: 18px; line-height: 1.15; margin-top: 2px; }
.char .meta span { display: block; color: var(--muted); font-size: 13px; margin-top: 3px; }
.chars.six .char .meta b { font-size: 16px; }
.chars.six .char .mono { font-size: 44px; }

/* Faction buttons */
.facs { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.fac { --fc: var(--blue); position: relative; display: flex; flex-direction: column; justify-content: flex-end; min-height: 150px; padding: 16px 18px; border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: radial-gradient(120% 90% at 20% 0%, color-mix(in srgb, var(--fc) 38%, transparent), transparent 70%), linear-gradient(160deg, #15152a, #08080e); color: var(--fg); font: inherit; text-align: left; cursor: pointer; transition: transform .25s, border-color .25s, box-shadow .25s; }
.fac .bg { position: absolute; inset: 0; background-size: cover; background-position: center 30%; transition: transform .6s, filter .3s; filter: saturate(.85) brightness(.75); }
.fac::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, rgba(6, 5, 10, .95) 8%, rgba(6, 5, 10, .35) 60%, rgba(6, 5, 10, .1)); }
.fac > b, .fac > small { position: relative; z-index: 1; }
.fac > b { font-family: var(--round); font-size: 19px; line-height: 1.15; }
.fac > small { margin-top: 3px; font-size: 11.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: color-mix(in srgb, var(--fc) 70%, white); }
.fac:hover { transform: translateY(-3px); border-color: color-mix(in srgb, var(--fc) 60%, transparent); }
.fac:hover .bg { transform: scale(1.05); filter: saturate(1) brightness(.9); }
.fac.on { border-color: var(--fc); box-shadow: 0 0 0 1px var(--fc), 0 12px 40px -12px var(--fc); }
.fac-panel { --fc: var(--blue); margin-top: 18px; padding: 22px; border-radius: 22px; border: 1px solid color-mix(in srgb, var(--fc) 35%, var(--line)); background: linear-gradient(180deg, color-mix(in srgb, var(--fc) 9%, var(--win)), var(--win) 220px); }
.fac-panel[hidden] { display: none; }
#factions, .fac-panel { scroll-margin-top: 130px; }
.fac-panel > h3 { font-size: 24px; margin: 0 0 4px; }
.fac-panel > p { margin: 0 0 18px; color: var(--muted); max-width: 760px; }

/* Character page */
.ch-hero { position: relative; overflow: hidden; background: #000; }
.ch-hero .stage { position: relative; aspect-ratio: 16 / 9; max-height: 82vh; width: 100%; overflow: hidden; }
.ch-hero .stage img.wp { --focus: 50% 28%; position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: var(--focus); transform-origin: var(--focus); animation: mmx-drift 26s ease-in-out infinite alternate; }
.ch-hero .stage.empty { aspect-ratio: auto !important; height: 360px; max-height: none; background: radial-gradient(60% 70% at 70% 40%, color-mix(in srgb, var(--cc) 38%, transparent), transparent 70%), linear-gradient(160deg, #121426, #050407); }
.ch-hero .stage.blur img.wp { filter: blur(26px) brightness(.55) saturate(1.2); transform: scale(1.15); animation: none; }
.ch-hero .stage::after { content: ""; position: absolute; inset: 0; background: linear-gradient(0deg, var(--bg) 0%, rgba(6, 5, 10, 0.4) 30%, transparent 60%), linear-gradient(90deg, rgba(6, 5, 10, 0.85) 0%, rgba(6, 5, 10, 0.2) 45%, transparent 70%); }
.ch-hero .over { position: absolute; inset: auto 0 0; z-index: 2; }
.ch-hero .over .wrap { display: flex; align-items: flex-end; gap: 22px; padding-bottom: 34px; }
.ch-hero .avatar { width: 150px; aspect-ratio: 3 / 4; flex: none; border-radius: 22px; overflow: hidden; border: 2px solid color-mix(in srgb, var(--cc) 70%, transparent); box-shadow: 0 0 40px -6px var(--cc), 0 20px 50px rgba(0, 0, 0, 0.7); background: radial-gradient(90% 70% at 50% 35%, color-mix(in srgb, var(--cc) 50%, transparent), #0b0910 80%); position: relative; }
.ch-hero .avatar img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 15%; display: block; }
.ch-hero .avatar .mono { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--round); font-size: 40px; font-weight: 800; color: color-mix(in srgb, var(--cc) 75%, white); text-shadow: 0 0 30px var(--cc); }
.ch-hero h1 { font-size: clamp(34px, 5.5vw, 62px); line-height: 1; }
.ch-hero .alias { font-size: 13px; font-weight: 800; letter-spacing: 2.4px; text-transform: uppercase; color: var(--cc); margin-bottom: 6px; }
.ch-hero .ch-role { color: #e4e6f2; font-size: 17px; margin-top: 8px; }
.ch-body { display: grid; grid-template-columns: 1.4fr 1fr; gap: 28px; align-items: start; }
.ch-body .bio p { color: #d9d6e6; font-size: 17px; margin: 0 0 14px; }
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

/* Bosses */
.bosses { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
.boss { --cc: var(--blue); display: grid; grid-template-columns: 170px 1fr; border-radius: 20px; overflow: hidden; border: 1px solid var(--line); background: radial-gradient(420px 220px at 100% 0%, color-mix(in srgb, var(--cc) 12%, transparent), transparent 70%), var(--card); text-decoration: none; transition: transform .25s, border-color .25s, box-shadow .25s; }
.boss:hover { transform: translateY(-3px); border-color: var(--cc); box-shadow: 0 22px 60px -30px var(--cc); }
.boss .pic { position: relative; min-height: 200px; overflow: hidden; background: radial-gradient(90% 70% at 50% 35%, color-mix(in srgb, var(--cc) 40%, transparent), transparent 80%), #0a0a12; }
.boss .pic img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 15%; }
.boss .pic .mono { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--round); font-size: 44px; font-weight: 800; color: color-mix(in srgb, var(--cc) 75%, white); text-shadow: 0 0 30px var(--cc); }
.boss .info { padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.boss .info small { display: block; font-size: 11.5px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: var(--cc); }
.boss .info b { font-family: var(--round); font-size: 21px; line-height: 1.15; }
.boss dl { display: grid; grid-template-columns: auto 1fr; gap: 6px 14px; margin: 0; font-size: 14px; }
.boss dt { color: var(--dim); font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding-top: 2px; }
.boss dd { margin: 0; color: #dcd9e8; }
.chip { display: inline-block; font-size: 12px; font-weight: 700; padding: 2px 9px; border-radius: 999px; border: 1px solid color-mix(in srgb, var(--cc) 50%, transparent); color: color-mix(in srgb, var(--cc) 75%, white); background: color-mix(in srgb, var(--cc) 12%, transparent); }
.chip.weak { --cc: #ff5a5f; }
.strip { display: grid; grid-template-columns: repeat(8, 1fr); gap: 10px; }
.strip a { --cc: var(--blue); text-decoration: none; border-radius: 14px; overflow: hidden; border: 1px solid var(--line); background: var(--card); transition: .2s; }
.strip a:hover { border-color: var(--cc); transform: translateY(-3px); }
.strip .pic { position: relative; aspect-ratio: 3 / 4; background: radial-gradient(90% 70% at 50% 35%, color-mix(in srgb, var(--cc) 40%, transparent), transparent 80%), #0a0a12; }
.strip .pic img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 15%; }
.strip .pic .mono { position: absolute; inset: 0; display: grid; place-items: center; font-family: var(--round); font-size: 28px; font-weight: 800; color: color-mix(in srgb, var(--cc) 75%, white); text-shadow: 0 0 24px var(--cc); }
.strip span { display: block; padding: 8px 10px 10px; font-size: 12.5px; font-weight: 600; line-height: 1.25; }

/* Forms (X's armors) */
.forms { display: flex; gap: 8px; flex-wrap: wrap; margin: 4px 0 6px; }
.forms button { font: inherit; font-size: 14px; font-weight: 600; cursor: pointer; color: var(--muted); display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px 5px 5px; border-radius: 999px; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.04); transition: .2s; }
.forms button img { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; object-position: 50% 15%; }
.forms button.on { color: #fff; border-color: var(--cc); background: color-mix(in srgb, var(--cc) 18%, transparent); }
.forms button .dot { width: 30px; height: 30px; border-radius: 50%; flex: none; background: radial-gradient(circle, color-mix(in srgb, var(--cc) 55%, transparent), #0b0a12 75%); }
.forms { margin-top: 18px; }
.form-note { color: var(--muted); font-style: italic; font-size: 15px; }
.form-note:empty { display: none; }

/* Weapons */
.wtabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px; }
.wtab { --cc: var(--blue); display: flex; align-items: center; gap: 12px; padding: 8px 16px 8px 8px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); color: var(--muted); font: inherit; font-family: var(--round); font-size: 18px; font-weight: 700; cursor: pointer; transition: .2s; text-align: left; }
.wtab img, .wtab .mono { width: 46px; height: 46px; border-radius: 12px; object-fit: cover; object-position: 50% 15%; flex: none; }
.wtab .mono { display: grid; place-items: center; background: radial-gradient(circle, color-mix(in srgb, var(--cc) 45%, transparent), #0b0a12 80%); color: color-mix(in srgb, var(--cc) 75%, white); }
.wtab:hover { color: var(--fg); border-color: color-mix(in srgb, var(--cc) 50%, transparent); }
.wtab.on { color: #fff; border-color: var(--cc); background: color-mix(in srgb, var(--cc) 14%, var(--card)); box-shadow: 0 12px 40px -18px var(--cc); }
.wpanel { --cc: var(--blue); padding: 22px; border-radius: 22px; border: 1px solid color-mix(in srgb, var(--cc) 30%, var(--line)); background: linear-gradient(180deg, color-mix(in srgb, var(--cc) 8%, var(--win)), var(--win) 220px); }
.wpanel[hidden] { display: none; }
.wpanel-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
.wpanel-head h3 { font-size: 24px; }
.wpanel-head span { color: var(--dim); font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.weapons { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.weapon { --wc: var(--blue); border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); display: flex; flex-direction: column; }
.weapon .w-art { position: relative; aspect-ratio: 1 / 1; background: radial-gradient(70% 70% at 50% 45%, color-mix(in srgb, var(--wc) 38%, transparent), transparent 75%), #0a0a12; display: grid; place-items: center; }
.weapon .w-art[data-zoom] { cursor: zoom-in; }
.weapon .w-art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.weapon .w-glyph { font-family: var(--round); font-size: 40px; font-weight: 800; color: color-mix(in srgb, var(--wc) 75%, white); text-shadow: 0 0 30px var(--wc); }
.weapon .w-info { padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 8px; align-items: flex-start; }
.weapon .w-info b { font-family: var(--round); font-size: 18px; line-height: 1.2; }
.weapon .w-from { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 13px; text-decoration: none; }
.weapon .w-from:hover { color: var(--fg); }
.weapon .w-from img { width: 24px; height: 24px; border-radius: 50%; object-fit: cover; object-position: 50% 15%; }
.weapon.hidden-w b, .weapon.noname b { color: var(--dim); }
.wpanel.wide .weapons { grid-template-columns: repeat(2, 1fr); }
.wpanel.wide .w-art { aspect-ratio: 16 / 9; }
.weapon.hidden-w .w-glyph { opacity: .45; }

/* Story */
.spoiler { display: flex; gap: 12px; align-items: center; padding: 14px 18px; border-radius: 16px; border: 1px solid rgba(251, 191, 36, 0.3); background: rgba(251, 191, 36, 0.06); color: #f5deb0; font-size: 14.5px; margin-bottom: 28px; }
.story { display: grid; grid-template-columns: 250px 1fr; gap: 40px; align-items: start; }
.toc { position: sticky; top: 130px; max-height: calc(100vh - 150px); overflow-y: auto; padding-right: 6px; scrollbar-width: thin; }
.toc h4 { margin: 18px 0 6px; font-size: 11.5px; letter-spacing: 1.4px; text-transform: uppercase; color: var(--dim); }
.toc h4:first-child { margin-top: 0; }
.toc a { display: flex; gap: 10px; padding: 6px 10px; border-radius: 10px; text-decoration: none; color: var(--muted); font-size: 14px; line-height: 1.3; }
.toc a span { flex: none; width: 20px; color: var(--dim); font-variant-numeric: tabular-nums; }
.toc a:hover { color: var(--fg); background: rgba(255, 255, 255, 0.04); }
.toc a.on { color: #fff; background: color-mix(in srgb, var(--blue) 16%, transparent); }
.toc a.on span { color: var(--blue); }
.chapters { max-width: 720px; }
.chapter { scroll-margin-top: 130px; padding-bottom: 34px; margin-bottom: 34px; border-bottom: 1px solid var(--line); }
.chapter:last-child { border-bottom: 0; }
.chapter .num { font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--blue); }
.chapter h2 { font-size: clamp(26px, 3.4vw, 34px); margin: 6px 0 16px; }
.chapter p { color: #dcd9e8; font-size: 17.5px; line-height: 1.75; margin: 0 0 16px; }
.chapter blockquote { margin: 26px 0 0; padding: 18px 22px; border-left: 3px solid var(--violet); border-radius: 0 16px 16px 0; background: color-mix(in srgb, var(--violet) 9%, transparent); font-size: 19px; font-style: italic; color: #ece8fa; }
.chapter blockquote cite { display: block; margin-top: 8px; font-size: 13px; font-style: normal; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); }
.toc-mobile { display: none; }

.fan-note { margin-top: 10px; padding: 16px 18px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); color: var(--dim); font-size: 13px; }

@media (max-width: 980px) {
    .trio, .lore { grid-template-columns: 1fr; }
    .mmx-sections { grid-template-columns: repeat(2, 1fr); }
    .chars.six { grid-template-columns: repeat(3, 1fr); }
    .ch-body { grid-template-columns: 1fr; }
    .ch-hero .stage { aspect-ratio: 4 / 3; }
    .bosses { grid-template-columns: 1fr; }
    .strip { grid-template-columns: repeat(4, 1fr); }
    .story { grid-template-columns: 1fr; }
    .weapons { grid-template-columns: repeat(2, 1fr); }
    .wpanel.wide .weapons { grid-template-columns: 1fr; }
    .wtabs { grid-template-columns: repeat(2, 1fr); }
    .mmx-sections { grid-template-columns: repeat(2, 1fr); }
    .toc { display: none; }
    .toc-mobile { display: block; margin-bottom: 26px; }
    .toc-mobile select { width: 100%; font: inherit; font-size: 15px; color: var(--fg); background: var(--card); border: 1px solid var(--line2); border-radius: 12px; padding: 11px 12px; }
}
@media (max-width: 640px) {
    .cine { min-height: 76vh; }
    .chars, .chars.six { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .mmx-sections { grid-template-columns: 1fr; }
    .facs { grid-template-columns: 1fr; gap: 10px; }
    .fac { min-height: 104px; padding: 12px 14px; }
    .fac-panel { padding: 14px; border-radius: 18px; }
    .ch-hero .stage { aspect-ratio: 3 / 4; max-height: none; }
    .ch-hero .over .wrap { flex-direction: column; align-items: flex-start; gap: 14px; }
    .ch-hero .avatar { width: 110px; }
    .ch-hero .stage.empty { height: 330px; }
    .pn { grid-template-columns: 1fr; }
    .boss { grid-template-columns: 116px 1fr; }
    .boss .info { padding: 14px; }
    .boss .info b { font-size: 18px; }
    .strip { grid-template-columns: repeat(4, 1fr); gap: 8px; }
    .strip span { font-size: 11px; padding: 6px 7px 8px; }
    .chapter p { font-size: 16.5px; }
}
`;
