// =====================================================================================
// Danloud Labs website: styles that only the WarDecks: Leagues page uses (/ios/wardecks).
// The shared game-page classes (.modes, .rules, .roles, .factions, .heroes, .fields, .ranks)
// stay in site-styles.js; everything here is prefixed wd-.
// =====================================================================================

export const WD_CSS = `
.product.wd { --c: #d6a04f; --c2: #e5484d; --gold: #f3cf86; --off: #ff9838; --def: #3ddc75; }
.wd .p-stats { grid-template-columns: repeat(6, 1fr); }
.wd h1 .hot { background: linear-gradient(135deg, #f3cf86, #d6a04f 55%, #b8742c); -webkit-background-clip: text; background-clip: text; color: transparent; }
.wd .badges .hot { color: #1a1005; }

/* Sticky section links */
.wd-trailer { display: grid; grid-template-columns: minmax(240px, 340px) 1fr; gap: 56px; align-items: center; }
.wd-trailer .vid { aspect-ratio: 9 / 16; border-radius: 28px; overflow: hidden; background: #000; border: 1px solid color-mix(in srgb, #f3cf86 35%, var(--line)); box-shadow: 0 30px 80px -30px rgba(243, 207, 134, 0.35); }
.wd-trailer video { width: 100%; height: 100%; display: block; object-fit: cover; }
.wd-trailer h2 .hot { background: linear-gradient(135deg, #f3cf86, #d6a04f 55%, #b8742c); -webkit-background-clip: text; background-clip: text; color: transparent; }
@media (max-width: 820px) { .wd-trailer { grid-template-columns: 1fr; gap: 28px; } .wd-trailer .vid { width: min(340px, 100%); margin: 0 auto; } }
.wd-nav { position: sticky; top: 62px; z-index: 40; background: rgba(6, 5, 10, 0.78); backdrop-filter: saturate(160%) blur(16px); -webkit-backdrop-filter: saturate(160%) blur(16px); border-bottom: 1px solid var(--line); }
.wd-nav .wrap { display: flex; gap: 4px; overflow-x: auto; padding-top: 9px; padding-bottom: 9px; scrollbar-width: none; }
.wd-nav .wrap::-webkit-scrollbar { display: none; }
.wd-nav a { flex: none; text-decoration: none; color: var(--muted); font-size: 13.5px; font-weight: 600; padding: 7px 13px; border-radius: 999px; border: 1px solid transparent; transition: .2s; }
.wd-nav a:hover { color: var(--fg); background: rgba(255, 255, 255, 0.05); }
.wd-nav a.on { color: var(--gold); border-color: color-mix(in srgb, var(--c) 45%, transparent); background: color-mix(in srgb, var(--c) 12%, transparent); }
.wd section[id] { scroll-margin-top: 120px; }

/* From the menu to the first card */
.wd-path { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; counter-reset: step; }
.wd-step { display: flex; flex-direction: column; gap: 10px; }
.wd-step .phone { padding: 6px; border-radius: 30px; cursor: zoom-in; transition: transform .25s; }
.wd-step .phone img { border-radius: 25px; }
.wd-step:hover .phone { transform: translateY(-4px); }
.wd-step b { display: flex; align-items: center; gap: 8px; font-size: 14.5px; }
.wd-step b::before { counter-increment: step; content: counter(step); flex: none; width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 800; color: #1a1005; background: linear-gradient(135deg, var(--gold), var(--c)); }
.wd-step p { margin: 0; color: var(--muted); font-size: 13px; line-height: 1.45; }

/* Rules */
.wd-rules { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.wd-rule { position: relative; border-radius: 24px; border: 1px solid var(--line); background: radial-gradient(520px 260px at 100% 0%, color-mix(in srgb, var(--rc) 16%, transparent), transparent 70%), var(--win); padding: 26px; overflow: hidden; }
.wd-rule .art { width: 100%; max-width: 360px; height: auto; margin: -6px 0 10px -6px; }
.wd-rule h3 { font-size: 26px; margin: 2px 0 6px; }
.wd-rule > p { margin: 0 0 16px; color: var(--muted); }
.wd-opts { display: grid; gap: 10px; }
.wd-opt { display: flex; gap: 12px; padding: 13px 14px; border-radius: 16px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.02); }
.wd-opt .k { flex: none; min-width: 74px; font-size: 11px; font-weight: 800; letter-spacing: .8px; text-transform: uppercase; color: var(--rc); padding-top: 2px; }
.wd-opt b { display: block; font-size: 14.5px; }
.wd-opt span { display: block; color: var(--muted); font-size: 13.5px; line-height: 1.5; }
.wd-pills { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 7px; }
.wd-pills i { font-style: normal; font-size: 12px; font-weight: 700; padding: 3px 9px; border-radius: 8px; border: 1px solid var(--line2); color: var(--fg); background: rgba(255, 255, 255, 0.03); }
.wd-pills i.d { color: #1a1005; border-color: transparent; background: linear-gradient(135deg, var(--gold), var(--c)); }

/* Power Duels: how it plays */
.wd-bars { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin: 18px 0 4px; }
.wd-bar { padding: 12px 14px; border-radius: 14px; border: 1px solid color-mix(in srgb, var(--bc) 35%, transparent); background: color-mix(in srgb, var(--bc) 8%, transparent); }
.wd-bar b { display: flex; justify-content: space-between; font-size: 13px; letter-spacing: .6px; color: var(--bc); }
.wd-bar i { display: block; height: 8px; margin: 8px 0 6px; border-radius: 9px; background: rgba(255, 255, 255, 0.07); overflow: hidden; }
.wd-bar i::after { content: ""; display: block; height: 100%; width: var(--w); border-radius: 9px; background: linear-gradient(90deg, color-mix(in srgb, var(--bc) 55%, transparent), var(--bc)); box-shadow: 0 0 12px var(--bc); }
.wd-bar span { font-size: 12.5px; color: var(--muted); }
.wd-attrs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
.wd-attr { display: flex; gap: 10px; align-items: flex-start; font-size: 13.5px; color: var(--muted); line-height: 1.45; }
.wd-attr b { flex: none; width: 42px; text-align: center; font-size: 11.5px; font-weight: 800; letter-spacing: .6px; padding: 4px 0; border-radius: 8px; color: var(--ac); background: color-mix(in srgb, var(--ac) 14%, transparent); border: 1px solid color-mix(in srgb, var(--ac) 32%, transparent); }
.wd-charge { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 16px; }
.wd-charge div { padding: 12px; border-radius: 14px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.02); }
.wd-charge b { display: block; font-size: 13.5px; margin-bottom: 3px; }
.wd-charge span { font-size: 12.8px; color: var(--muted); line-height: 1.45; display: block; }
.wd-mech { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 8px; }
.wd-mech .tool { --tc: var(--c); }
.wd-status { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.wd-status > div { padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: var(--card); }
.wd-status h4 { margin: 0 0 10px; font-size: 12px; letter-spacing: 1.2px; text-transform: uppercase; color: var(--sc); }
.wd-status ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
.wd-status li { font-size: 12.5px; font-weight: 600; padding: 4px 9px; border-radius: 8px; color: var(--fg); background: color-mix(in srgb, var(--sc) 10%, transparent); border: 1px solid color-mix(in srgb, var(--sc) 26%, transparent); }

/* Roles */
.wd-roles { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.wd-role { display: flex; flex-direction: column; border-radius: 22px; border: 1px solid var(--line); background: var(--card); overflow: hidden; }
.wd-role .top { position: relative; padding: 14px 14px 0; background: radial-gradient(260px 160px at 50% 0%, color-mix(in srgb, var(--c) 18%, transparent), transparent 75%); }
.wd-role .top img { width: 100%; height: auto; border-radius: 14px; }
.wd-role .body { padding: 14px 16px 18px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
.wd-role h3 { margin: 0; font-size: 18px; letter-spacing: .6px; text-transform: uppercase; }
.wd-role h3 small { display: block; font-size: 11.5px; letter-spacing: 1px; color: var(--dim); margin-top: 2px; }
.wd-role .tac { margin: 0; color: #d3cfdf; font-size: 13.8px; line-height: 1.5; }
.wd-role .pw { font-size: 13px; color: var(--muted); line-height: 1.5; }
.wd-role .pw b { display: inline-block; font-size: 10px; font-weight: 800; letter-spacing: .6px; padding: 2px 6px; border-radius: 6px; margin-right: 6px; }
.wd-role .pw b.o { color: #ffb347; background: rgba(255, 140, 50, 0.14); }
.wd-role .pw b.d { color: #4ade80; background: rgba(74, 222, 128, 0.12); }
.wd-role .pas { margin-top: auto; padding-top: 10px; border-top: 1px solid var(--line); font-size: 12.5px; color: var(--dim); }
.wd-role .pas strong { color: var(--gold); font-weight: 700; }

/* Fighter sheet (dialog) */
.wd-sheet { width: min(860px, calc(100% - 24px)); max-height: calc(100% - 24px); padding: 0; border: 1px solid var(--line2); border-radius: 26px; background: var(--win); color: var(--fg); overflow: auto; }
.wd-sheet::backdrop { background: rgba(0, 0, 0, 0.78); backdrop-filter: blur(4px); }
.wd-sheet .in { display: grid; grid-template-columns: 300px 1fr; }
.wd-sheet .pic { position: relative; display: flex; align-items: flex-end; justify-content: center; min-height: 420px; background: radial-gradient(90% 70% at 50% 50%, color-mix(in srgb, var(--fc) 40%, transparent), transparent 75%), linear-gradient(180deg, #18131e, #0b0910); }
.wd-sheet .pic img { width: 100%; height: 100%; max-height: 520px; object-fit: contain; object-position: bottom; filter: drop-shadow(0 0 24px color-mix(in srgb, var(--fc) 55%, transparent)); }
.wd-sheet .info { padding: 24px 26px 26px; display: flex; flex-direction: column; gap: 14px; }
.wd-sheet .x { position: absolute; top: 12px; right: 12px; z-index: 2; width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--line2); background: rgba(0, 0, 0, 0.55); color: var(--fg); font-size: 20px; line-height: 1; cursor: pointer; }
.wd-sheet .who small { display: flex; gap: 8px; align-items: center; font-size: 12px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--fc); }
.wd-sheet .who h3 { font-size: 28px; margin: 4px 0 0; }
.wd-sheet .who p { margin: 2px 0 0; color: var(--muted); }
.wd-sheet .spd { color: var(--gold); letter-spacing: 2px; font-size: 14px; }
.wd-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 18px; }
.wd-stat { display: grid; grid-template-columns: 38px 1fr 30px; gap: 8px; align-items: center; font-size: 12px; font-weight: 700; }
.wd-stat em { font-style: normal; color: var(--ac); letter-spacing: .5px; }
.wd-stat i { height: 7px; border-radius: 9px; background: rgba(255, 255, 255, 0.07); overflow: hidden; }
.wd-stat i::after { content: ""; display: block; height: 100%; width: var(--w); border-radius: 9px; background: var(--ac); }
.wd-stat span { text-align: right; color: var(--muted); font-variant-numeric: tabular-nums; }
.wd-pow { padding: 13px 14px; border-radius: 16px; border: 1px solid var(--line); background: rgba(255, 255, 255, 0.02); }
.wd-pow .h { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 5px; }
.wd-pow .h b { font-size: 15.5px; }
.wd-pow .tag { font-size: 10px; font-weight: 800; letter-spacing: .6px; padding: 2px 7px; border-radius: 6px; }
.wd-pow .tag.o { color: #ffb347; background: rgba(255, 140, 50, 0.14); }
.wd-pow .tag.d { color: #4ade80; background: rgba(74, 222, 128, 0.12); }
.wd-pow .tag.p { color: var(--gold); background: color-mix(in srgb, var(--c) 16%, transparent); }
.wd-pow .meta { margin-left: auto; font-size: 11.5px; color: var(--dim); }
.wd-pow p { margin: 0; color: #d3cfdf; font-size: 13.8px; line-height: 1.5; }
.wd-sheet .nav { display: flex; justify-content: space-between; gap: 10px; margin-top: auto; }

/* Kingdoms: the crest card from the game's faction select, and the faction's eight fighters */
.wd-factions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.wd-faction { --fc: var(--c); display: grid; grid-template-columns: 44% 1fr; border-radius: 22px; overflow: hidden; border: 1px solid var(--line); background: radial-gradient(260px 200px at 100% 100%, color-mix(in srgb, var(--fc) 14%, transparent), transparent 75%), var(--card); transition: border-color .25s, box-shadow .25s; }
.wd-faction:hover { border-color: color-mix(in srgb, var(--fc) 55%, transparent); box-shadow: 0 18px 40px -20px color-mix(in srgb, var(--fc) 80%, transparent); }
.wd-faction .crest { position: relative; margin: 10px 0 10px 10px; border-radius: 16px; overflow: hidden; border: 1px solid color-mix(in srgb, var(--fc) 55%, rgba(255, 255, 255, 0.2)); box-shadow: 0 10px 26px -10px color-mix(in srgb, var(--fc) 75%, transparent); aspect-ratio: 3 / 4; }
.wd-faction .crest img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
.wd-faction:hover .crest img { transform: scale(1.05); }
.wd-faction .plate { position: absolute; left: 8px; right: 8px; bottom: 8px; padding: 6px 6px 7px; border-radius: 10px; text-align: center; font-family: Georgia, "Times New Roman", serif; font-weight: 700; font-size: 12.5px; letter-spacing: .6px; text-transform: uppercase; color: #fff; background: rgba(8, 6, 10, 0.82); border: 1px solid color-mix(in srgb, var(--fc) 60%, transparent); }
.wd-faction .plate small { display: block; font-family: var(--ui); font-size: 8.5px; letter-spacing: 1.4px; color: var(--fc); }
.wd-faction .body { padding: 16px 14px 14px; display: flex; flex-direction: column; min-width: 0; }
.wd-faction h3 { margin: 0; font-size: 19px; line-height: 1.2; }
.wd-faction h3 small { display: block; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--fc); margin-bottom: 3px; }
.wd-squad { display: grid; grid-template-columns: repeat(4, 1fr); gap: 4px; margin-top: auto; padding-top: 12px; }
.wd-squad button { min-width: 0; padding: 4px 0 3px; border: 1px solid transparent; border-radius: 10px; background: none; color: inherit; font: inherit; cursor: pointer; transition: transform .2s, background .2s, border-color .2s; }
.wd-squad button:hover { transform: translateY(-3px); background: color-mix(in srgb, var(--fc) 10%, transparent); border-color: color-mix(in srgb, var(--fc) 35%, transparent); }
.wd-squad img { width: 100%; height: 58px; object-fit: contain; object-position: bottom; filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.7)); }
.wd-squad span { display: block; font-size: 10.5px; color: var(--muted); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px; }

/* Decks */
.wd-decks { display: grid; grid-template-columns: 1fr 300px; gap: 40px; align-items: center; }
.wd-deck-list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 18px; }
.wd-deck { padding: 16px; border-radius: 18px; border: 1px solid var(--line); background: radial-gradient(220px 120px at 0% 0%, color-mix(in srgb, var(--dc) 20%, transparent), transparent 75%), var(--card); }
.wd-deck b { display: block; font-size: 15px; letter-spacing: 1.4px; font-family: Georgia, "Times New Roman", serif; }
.wd-deck span { color: var(--muted); font-size: 13.5px; }
.wd-deck em { display: inline-block; margin-top: 8px; font-style: normal; font-size: 10.5px; font-weight: 800; letter-spacing: .6px; text-transform: uppercase; color: var(--gold); }

@media (max-width: 1100px) {
    .wd-path { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 980px) {
    .wd .p-stats { grid-template-columns: repeat(3, 1fr); }
    .wd-rules { grid-template-columns: 1fr; }
    .wd-roles { grid-template-columns: repeat(2, 1fr); }
    .wd-mech { grid-template-columns: repeat(2, 1fr); }
    .wd-status { grid-template-columns: repeat(2, 1fr); }
    .wd-factions { grid-template-columns: repeat(2, 1fr); }
    .wd-decks { grid-template-columns: 1fr; }
    .wd-decks .phone { max-width: 280px; margin: 0 auto; }
    .wd-sheet .in { grid-template-columns: 1fr; }
    .wd-sheet .pic { min-height: 0; height: 340px; }
}
@media (max-width: 640px) {
    .wd .p-stats div:last-child { grid-column: auto; }
    .wd-path { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .wd-roles { grid-template-columns: 1fr; }
    .wd-mech, .wd-status, .wd-factions, .wd-bars, .wd-attrs, .wd-deck-list { grid-template-columns: 1fr; }
    .wd-charge { grid-template-columns: 1fr; }
    .wd-rule { padding: 20px; }
    .wd-opt { flex-direction: column; gap: 4px; }
    .wd-stats { grid-template-columns: 1fr; }
    .wd-sheet .info { padding: 18px; }
    .wd-sheet .who h3 { font-size: 23px; }
}
/* Screenshot tabs: a hidden device row must win over .shots.phones { display: flex } */
.product.wd .shots.phones[hidden] { display: none; }
.product.wd .shots .phone.dev-ipad { width: 400px; padding: 9px; border-radius: 30px; }
.product.wd .shots .phone.dev-ipad img { border-radius: 22px; }
.product.wd .shots .phone.dev-duo { width: 330px; border-radius: 40px; }
.product.wd .shots .phone.dev-duo img { border-radius: 33px; }
@media (max-width: 560px) {
    .product.wd .shots .phone.dev-ipad { width: 300px; }
    .product.wd .shots .phone.dev-duo { width: 260px; }
}
`;
