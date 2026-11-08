// =====================================================================================
// Danloud Labs website: CSS for the macOS app pages (on top of the shared product CSS in
// site-styles.js). The Mac window frame replaces the iPhone frame of the iOS pages.
// =====================================================================================

export const MAC_CSS = `
.macwin { position: relative; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255, 255, 255, 0.14); background: #15131c; box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.85), 0 0 60px -20px color-mix(in srgb, var(--c) 45%, transparent); }
.macwin .bar { height: 30px; display: flex; align-items: center; gap: 7px; padding: 0 12px; background: linear-gradient(180deg, #2a2733, #222029); border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
.macwin .bar i { width: 11px; height: 11px; border-radius: 50%; background: #ff5f57; }
.macwin .bar i:nth-child(2) { background: #febc2e; }
.macwin .bar i:nth-child(3) { background: #28c840; }
.macwin .bar span { margin-left: 10px; font-size: 12px; font-weight: 600; color: rgba(255, 255, 255, 0.55); }
.macwin .scr { position: relative; aspect-ratio: 16 / 10; display: grid; place-items: center; background: radial-gradient(70% 70% at 50% 40%, color-mix(in srgb, var(--c) 22%, #1a1822), #0d0c12 90%); }
.macwin .scr img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.macwin .scr figcaption { font-size: 12px; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(255, 255, 255, 0.35); }
.mac .p-hero .wrap { grid-template-columns: 1fr 1.05fr; }
.mac .p-hero .macwin { transform: perspective(1600px) rotateY(-6deg); }
.mac .split-feature { grid-template-columns: 1fr 1.15fr; }
.mac .split-feature.flip { grid-template-columns: 1.15fr 1fr; }
.mac .split-feature.flip .macwin { order: -1; }
.mac .split-feature.solo { grid-template-columns: 1fr; }
.mac .feat-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.mac .feat-cards .split-feature { margin: 0; background: radial-gradient(420px 260px at 100% 0%, color-mix(in srgb, var(--c) 12%, transparent), transparent 70%), var(--win); }
.mac .feat-cards .split-feature:nth-child(4n+2), .mac .feat-cards .split-feature:nth-child(4n+3) { background: radial-gradient(420px 260px at 0% 0%, color-mix(in srgb, var(--c2) 12%, transparent), transparent 70%), var(--win); }
.mac .feat-cards .split-feature h3 { font-size: clamp(22px, 2.4vw, 27px); }
.mac .btn-soon { cursor: default; opacity: .85; }
.mac .reqs { margin: 10px 0 0; padding: 0; list-style: none; }
.mac .reqs li { padding: 7px 0; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 14.5px; }
.mac .reqs li:last-child { border-bottom: 0; }
.mac .mac-shots { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.mac .mac-shots .macwin { cursor: zoom-in; }
.mac .who img.noicon { visibility: hidden; }
.lb figcaption { position: absolute; left: 0; right: 0; bottom: 18px; text-align: center; color: #fff; font-size: 15px; }
@media (max-width: 980px) {
    .mac .feat-cards { grid-template-columns: 1fr; }
    .mac .p-hero .wrap, .mac .split-feature, .mac .split-feature.flip { grid-template-columns: 1fr; }
    .mac .split-feature.flip .macwin { order: 0; }
    .mac .p-hero .macwin { transform: none; }
}
@media (max-width: 640px) { .mac .mac-shots { grid-template-columns: 1fr; } }
`;
