// =====================================================================================
// Danloud Labs website: embers and ash rising over the WarDecks: Leagues page.
// A port of the game's EmberField (FactionRouletteView.swift): embers that rise, sway and
// twinkle with a soft glow, plus gray ash flakes drifting slower, on a 30 fps schedule.
// Same particle math and hash as the game; the counts grow with the window width (the game's
// 28 embers and 12 ash flakes are for a phone screen). Off with "reduce motion", paused when
// the tab is hidden, and it never catches clicks.
// =====================================================================================

export const WD_EMBERS_CSS = `
.wd-embers { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 35; mix-blend-mode: screen; }
`;

export const WD_EMBERS_SCRIPT = `<script>
(() => {
    if (!window.matchMedia || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = () => {
        const canvas = document.createElement('canvas');
        canvas.className = 'wd-embers';
        canvas.setAttribute('aria-hidden', 'true');
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        // The page's fire colors (the game uses the faction's accent and secondary colors).
        const COLOR = [255, 168, 64], SECONDARY = [255, 96, 40];
        const rand = (i, channel) => { const v = Math.sin(i * 12.9898 + channel * 78.233) * 43758.5453; return v - Math.floor(v); };
        let width = 0, height = 0, embers = 28, ash = 12;
        const resize = () => {
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            width = window.innerWidth; height = window.innerHeight;
            canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const scale = Math.max(1, width / 390) * 0.7;
            embers = Math.min(64, Math.round(28 * scale)); ash = Math.min(28, Math.round(12 * scale));
        };
        const particle = (i, t, min, max, sway) => {
            const travel = height + 60;
            const speed = min + (max - min) * rand(i, 1);
            const progress = ((t * speed + travel * rand(i, 2)) % travel) / travel;
            const y = height + 30 - progress * travel;
            const x = width * rand(i, 3) + sway * Math.sin(t * (0.6 + rand(i, 4)) + 6.28 * rand(i, 4));
            const life = Math.max(0, Math.min(1, progress * 6) * (1 - Math.pow(progress, 2.2)));
            return [x, y, life];
        };
        const rgba = (c, a) => 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a.toFixed(3) + ')';
        const draw = (t) => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < embers; i++) {
                const [x, y, life] = particle(i, t, 40, 105, 20);
                const r = 1.3 + 2.1 * rand(i, 5);
                const twinkle = 0.65 + 0.35 * Math.sin(t * (4 + 5 * rand(i, 6)) + 10 * rand(i, 7));
                const alpha = life * twinkle;
                const tint = rand(i, 8) > 0.35 ? COLOR : SECONDARY;
                ctx.fillStyle = rgba(tint, 0.18 * alpha);
                ctx.beginPath(); ctx.arc(x, y, r * 2.5, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = rgba(tint, alpha);
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
            }
            for (let j = 0; j < ash; j++) {
                const i = j + 1000;
                const [x, y, life] = particle(i, t, 18, 42, 36);
                const w = 2 + 3 * rand(i, 5);
                ctx.fillStyle = 'rgba(191,191,191,' + (0.5 * life).toFixed(3) + ')';
                ctx.beginPath(); ctx.ellipse(x, y, w / 2, w / 4, 0, 0, Math.PI * 2); ctx.fill();
            }
        };
        let last = 0, running = false;
        const frame = (now) => {
            if (document.hidden) { running = false; return; }
            if (now - last >= 1000 / 30) { last = now; draw(now / 1000); }
            requestAnimationFrame(frame);
        };
        const run = () => { if (!running && !document.hidden) { running = true; requestAnimationFrame(frame); } };
        document.addEventListener('visibilitychange', run);
        window.addEventListener('resize', resize);
        resize();
        run();
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
</script>`;
