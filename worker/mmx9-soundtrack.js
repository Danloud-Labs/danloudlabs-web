// =====================================================================================
// Mega Man X9: Apex-Primal — Soundtrack page: player + track list.
// Tracks come from assets/projects/mmx9/soundtrack.json (written by tools/mmx9_soundtrack.mjs);
// the MP3s live in Cloudflare R2 (store.danloudlabs.com/mmx9/soundtrack/). Each track gets a
// cover picked by mmx9.js (its stage, character or story image).
// =====================================================================================

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const time = (s) => (s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}` : '');

const I = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6.5" y="5" width="4" height="14" rx="1.2"/><rect x="13.5" y="5" width="4" height="14" rx="1.2"/></svg>',
    prev: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5.5" width="2.4" height="13" rx="1"/><path d="M19 6.4v11.2a1 1 0 0 1-1.55.83L9.6 13.2a1.4 1.4 0 0 1 0-2.4l7.85-5.23A1 1 0 0 1 19 6.4z"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="16.6" y="5.5" width="2.4" height="13" rx="1"/><path d="M5 6.4v11.2a1 1 0 0 0 1.55.83l7.85-5.23a1.4 1.4 0 0 0 0-2.4L6.55 5.57A1 1 0 0 0 5 6.4z"/></svg>',
    vol: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18.2 6.5a7.8 7.8 0 0 1 0 11"/></svg>',
};

export const MMX_SOUNDTRACK_CSS = `
.st-empty { text-align: center; padding: 50px 20px; border-radius: 24px; border: 1px dashed var(--line2); color: var(--muted); }
.st-now { display: grid; grid-template-columns: 1.15fr 1fr; gap: 26px; align-items: center; padding: 20px; border-radius: 24px; border: 1px solid color-mix(in srgb, var(--blue) 30%, var(--line)); background: linear-gradient(160deg, color-mix(in srgb, var(--violet) 12%, var(--win)), var(--win)); }
.st-now .cover { aspect-ratio: 16 / 9; border-radius: 16px; overflow: hidden; background: #000 center / cover no-repeat; box-shadow: 0 30px 70px -40px var(--blue); }
.st-now small { display: block; font-size: 12px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--blue); }
.st-now h2 { font-size: clamp(24px, 3vw, 34px); margin: 6px 0 18px; }
.st-ctrl { display: flex; align-items: center; gap: 12px; }
.st-btn { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; border: 1px solid var(--line2); background: rgba(255, 255, 255, 0.05); color: var(--fg); cursor: pointer; transition: .2s; }
.st-btn:hover { background: rgba(255, 255, 255, 0.1); }
.st-btn svg { width: 20px; height: 20px; }
.st-btn.big { width: 62px; height: 62px; border: 0; background: linear-gradient(135deg, var(--blue), var(--violet)); box-shadow: 0 12px 30px -10px var(--blue); }
.st-btn.big svg { width: 26px; height: 26px; }
.st-seek { display: flex; align-items: center; gap: 10px; margin-top: 18px; font-size: 12.5px; color: var(--muted); font-variant-numeric: tabular-nums; }
.st-seek input { flex: 1; }
.st-vol { display: flex; align-items: center; gap: 8px; margin-top: 12px; color: var(--muted); }
.st-vol svg { width: 18px; height: 18px; }
.st-vol input { width: 130px; }
.mmx input[type=range] { -webkit-appearance: none; appearance: none; height: 5px; border-radius: 99px; background: linear-gradient(90deg, var(--blue) var(--p, 0%), rgba(255, 255, 255, 0.14) var(--p, 0%)); outline: none; cursor: pointer; }
.mmx input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 14px; height: 14px; border-radius: 50%; background: #fff; box-shadow: 0 0 0 3px rgba(63, 140, 255, 0.35); }
.mmx input[type=range]::-moz-range-thumb { width: 14px; height: 14px; border: 0; border-radius: 50%; background: #fff; }
.st-list { margin-top: 22px; border-radius: 20px; border: 1px solid var(--line); background: var(--card); overflow: hidden; }
.st-row { display: grid; grid-template-columns: 34px 64px 1fr auto; gap: 14px; align-items: center; width: 100%; padding: 9px 16px; border: 0; border-bottom: 1px solid var(--line); background: none; color: var(--fg); font: inherit; text-align: left; cursor: pointer; transition: background .15s; }
.st-row:last-child { border-bottom: 0; }
.st-row:hover { background: rgba(255, 255, 255, 0.04); }
.st-row .n { color: var(--dim); font-size: 13px; font-variant-numeric: tabular-nums; text-align: right; }
.st-row .th { width: 64px; aspect-ratio: 16 / 9; border-radius: 6px; background: #000 center / cover no-repeat; }
.st-row .t { font-weight: 600; font-size: 15px; }
.st-row .d { color: var(--dim); font-size: 13px; font-variant-numeric: tabular-nums; }
.st-row.on { background: color-mix(in srgb, var(--blue) 12%, transparent); }
.st-row.on .t, .st-row.on .n { color: color-mix(in srgb, var(--blue) 70%, white); }
.st-bar { position: fixed; left: 0; right: 0; bottom: 0; z-index: 60; transform: translateY(110%); transition: transform .3s; border-top: 1px solid var(--line); background: rgba(10, 9, 16, 0.9); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); padding-bottom: env(safe-area-inset-bottom); }
.st-bar.show { transform: none; }
.st-bar .wrap { display: flex; align-items: center; gap: 14px; height: 68px; }
.st-bar .th { width: 72px; aspect-ratio: 16 / 9; border-radius: 8px; background: #000 center / cover no-repeat; flex: none; }
.st-bar .t { flex: 1; min-width: 0; font-weight: 600; font-size: 14.5px; }
.st-bar .t small { display: block; color: var(--dim); font-weight: 500; font-size: 12px; }
.st-bar .st-btn { width: 40px; height: 40px; }
.st-bar .st-btn.big { width: 46px; height: 46px; }
.st-bar .prog { position: absolute; left: 0; top: -1px; height: 2px; background: linear-gradient(90deg, var(--blue), var(--violet)); width: 0; }
.st-note { margin-top: 14px; color: var(--dim); font-size: 13px; }
body:has(.st-bar.show) footer { padding-bottom: 84px; }
@media (max-width: 860px) {
    .st-now { grid-template-columns: 1fr; padding: 14px; }
    .st-row { grid-template-columns: 26px 56px 1fr auto; gap: 10px; padding: 8px 12px; }
    .st-row .th { width: 56px; }
    .st-bar .th { display: none; }
    .st-vol { display: none; }
}
`;

// tracks: [{ n, title, url, duration }]; cover(track) -> image URL.
export function soundtrackBody({ tracks, cover }) {
    if (!tracks.length) {
        return '<div class="st-empty"><h3 style="font-size:22px;margin-bottom:6px">The soundtrack is on its way.</h3><p style="margin:0">The tracks are being uploaded.</p></div>';
    }
    const list = tracks.map((t) => ({ ...t, cover: cover(t) }));
    const total = list.reduce((a, t) => a + (t.duration || 0), 0);
    const first = list[0];
    return `
<div class="st-now" id="stNow">
    <div class="cover" id="stCover" style="background-image:url('${first.cover}')"></div>
    <div>
        <small id="stNum">Track ${String(first.n).padStart(2, '0')}</small>
        <h2 id="stTitle">${esc(first.title)}</h2>
        <div class="st-ctrl">
            <button class="st-btn" type="button" data-act="prev" aria-label="Previous">${I.prev}</button>
            <button class="st-btn big" type="button" data-act="play" aria-label="Play">${I.play}</button>
            <button class="st-btn" type="button" data-act="next" aria-label="Next">${I.next}</button>
        </div>
        <div class="st-seek"><span id="stCur">0:00</span><input id="stSeek" type="range" min="0" max="1000" value="0" aria-label="Seek"><span id="stDur">${time(first.duration) || '0:00'}</span></div>
        <div class="st-vol">${I.vol}<input id="stVol" type="range" min="0" max="100" value="80" aria-label="Volume"></div>
    </div>
</div>
<div class="st-list" id="stList">${list.map((t, i) => `
    <button class="st-row${i === 0 ? ' on' : ''}" type="button" data-i="${i}"><span class="n">${t.n}</span><span class="th" style="background-image:url('${t.cover}')"></span><span class="t">${esc(t.title)}</span><span class="d">${time(t.duration)}</span></button>`).join('')}
</div>
<p class="st-note">${list.length} tracks${total ? ` · ${Math.round(total / 60)} min` : ''} · Music created by David Gomez Valerio with Suno.</p>
<div class="st-bar" id="stBar"><div class="prog" id="stProg"></div><div class="wrap">
    <span class="th" id="stBarTh" style="background-image:url('${first.cover}')"></span>
    <span class="t"><small>Now playing</small><span id="stBarTitle">${esc(first.title)}</span></span>
    <button class="st-btn" type="button" data-act="prev" aria-label="Previous">${I.prev}</button>
    <button class="st-btn big" type="button" data-act="play" aria-label="Play">${I.play}</button>
    <button class="st-btn" type="button" data-act="next" aria-label="Next">${I.next}</button>
</div></div>
<audio id="stAudio" preload="none"></audio>
<script>
(() => {
    const T = ${JSON.stringify(list.map(({ n, title, url, cover: c }) => ({ n, title, url, cover: c }))).replace(/</g, '\\u003c')};
    const PLAY = ${JSON.stringify(I.play)}, PAUSE = ${JSON.stringify(I.pause)};
    const $ = (id) => document.getElementById(id);
    const a = $('stAudio'), seek = $('stSeek'), vol = $('stVol');
    let i = 0, loaded = false, dragging = false;
    const fmt = (s) => isFinite(s) ? Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0') : '0:00';
    const paint = (r) => r.style.setProperty('--p', (r.value / r.max * 100) + '%');
    try { const v = localStorage.getItem('mmx9-vol'); if (v !== null) vol.value = v; } catch (_) {}
    a.volume = vol.value / 100; paint(vol);
    const show = () => {
        const t = T[i];
        $('stTitle').textContent = $('stBarTitle').textContent = t.title;
        $('stNum').textContent = 'Track ' + String(t.n).padStart(2, '0');
        $('stCover').style.backgroundImage = $('stBarTh').style.backgroundImage = "url('" + t.cover + "')";
        document.querySelectorAll('.st-row').forEach((r) => r.classList.toggle('on', +r.dataset.i === i));
        if ('mediaSession' in navigator) navigator.mediaSession.metadata = new MediaMetadata({ title: t.title, artist: 'Mega Man X9: Apex-Primal', album: 'Original Soundtrack (fan-made)', artwork: [{ src: t.cover, sizes: '1280x720' }] });
    };
    const load = (k, play) => { i = (k + T.length) % T.length; a.src = T[i].url; loaded = true; show(); if (play) a.play().catch(() => {}); };
    const toggle = () => { if (!loaded) return load(i, true); a.paused ? a.play().catch(() => {}) : a.pause(); };
    const icons = () => document.querySelectorAll('[data-act=play]').forEach((b) => { b.innerHTML = a.paused ? PLAY : PAUSE; b.setAttribute('aria-label', a.paused ? 'Play' : 'Pause'); });
    document.addEventListener('click', (e) => {
        const b = e.target.closest('[data-act]'); if (b) { const k = b.dataset.act; if (k === 'play') toggle(); else load(i + (k === 'next' ? 1 : -1), true); return; }
        const r = e.target.closest('.st-row'); if (r) load(+r.dataset.i, true);
    });
    a.addEventListener('play', () => { icons(); $('stBar').classList.add('show'); });
    a.addEventListener('pause', icons);
    a.addEventListener('ended', () => load(i + 1, true));
    a.addEventListener('loadedmetadata', () => { $('stDur').textContent = fmt(a.duration); });
    a.addEventListener('timeupdate', () => {
        if (!a.duration) return;
        const p = a.currentTime / a.duration;
        if (!dragging) { seek.value = p * 1000; paint(seek); $('stCur').textContent = fmt(a.currentTime); }
        $('stProg').style.width = (p * 100) + '%';
        if ('mediaSession' in navigator && navigator.mediaSession.setPositionState) { try { navigator.mediaSession.setPositionState({ duration: a.duration, position: a.currentTime, playbackRate: 1 }); } catch (_) {} }
    });
    seek.addEventListener('input', () => { dragging = true; paint(seek); if (a.duration) $('stCur').textContent = fmt(seek.value / 1000 * a.duration); });
    seek.addEventListener('change', () => { dragging = false; if (!loaded) load(i, true); if (a.duration) a.currentTime = seek.value / 1000 * a.duration; });
    vol.addEventListener('input', () => { a.volume = vol.value / 100; paint(vol); try { localStorage.setItem('mmx9-vol', vol.value); } catch (_) {} });
    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', toggle); navigator.mediaSession.setActionHandler('pause', () => a.pause());
        navigator.mediaSession.setActionHandler('previoustrack', () => load(i - 1, true)); navigator.mediaSession.setActionHandler('nexttrack', () => load(i + 1, true));
        try { navigator.mediaSession.setActionHandler('seekto', (d) => { a.currentTime = d.seekTime; }); } catch (_) {}
    }
    // The big player out of view -> show the bottom bar (once something has played).
    const io = 'IntersectionObserver' in window && new IntersectionObserver(([en]) => { if (loaded) $('stBar').classList.toggle('show', !en.isIntersecting || !a.paused); });
    io && io.observe($('stNow'));
})();
</script>`;
}
