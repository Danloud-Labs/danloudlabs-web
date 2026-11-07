// =====================================================================================
// Myncha: Vampires of Exius — the Gallery page: a Videos section and an Images section.
// Content: assets/projects/myncha/gallery.json, read live, written by tools/myncha_gallery.mjs
//   { images: [{ src, caption }], videos: [{ title, url, poster, duration }] }
// Images live in assets/projects/myncha/gallery/ (git); videos in R2 (store.danloudlabs.com/myncha/videos/).
// =====================================================================================

import { MY, MY_BASE, myAsset } from './myncha-data.js';
import { loadLive, page, pageHead } from './myncha-layout.js';
import { esc } from './site-layout.js';

const time = (s) => (s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}` : '');

export const MY_GALLERY_CSS = `
.gal-jump { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 18px; }
.gal-jump a { padding: 8px 14px; border-radius: 99px; border: 1px solid rgba(180, 140, 255, 0.45); color: var(--fg); text-decoration: none; font-size: 14px; background: rgba(180, 140, 255, 0.08); }
.gal-jump a small { color: var(--dim); font-weight: 700; margin-left: 6px; }
.gal-sec { scroll-margin-top: 120px; }
.gal-sec h2 { font-size: clamp(24px, 3vw, 32px); margin: 0 0 14px; display: flex; align-items: baseline; gap: 12px; }
.gal-sec h2 small { font-size: 13px; color: var(--dim); font-weight: 700; letter-spacing: 1px; text-transform: uppercase; }
.gal-videos { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.gal-video { margin: 0; border-radius: 18px; overflow: hidden; border: 1px solid var(--line); background: var(--card); }
.gal-video video { display: block; width: 100%; aspect-ratio: 16 / 9; background: #000; }
.gal-video figcaption { display: flex; justify-content: space-between; gap: 10px; padding: 12px 16px; font-size: 15px; font-weight: 600; }
.gal-video figcaption span { color: var(--dim); font-weight: 500; font-variant-numeric: tabular-nums; }
.gal-images { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.gal-images figure { position: relative; margin: 0; aspect-ratio: 16 / 9; border-radius: 14px; overflow: hidden; border: 1px solid var(--line); background: var(--card); cursor: zoom-in; }
.gal-images img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .5s; }
.gal-images figure:hover img { transform: scale(1.04); }
.gal-images figcaption { position: absolute; inset: auto 0 0; padding: 22px 12px 9px; font-size: 13px; color: #fff; background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), transparent); }
.lb figcaption { position: absolute; left: 0; right: 0; bottom: 18px; text-align: center; color: #fff; font-size: 15px; }
@media (max-width: 900px) { .gal-images { grid-template-columns: repeat(2, 1fr); } .gal-videos { grid-template-columns: 1fr; } }
@media (max-width: 520px) { .gal-images { grid-template-columns: 1fr; } }
`;

export async function galleryPage() {
    const data = await loadLive('gallery.json', true);
    const images = data.images || [];
    const videos = data.videos || [];
    const empty = (what) => `<div class="gallery-empty"><h3>${what} coming soon.</h3><p>The art of Myncha and Exius is being created right now.</p></div>`;

    const videoGrid = videos.length
        ? `<div class="gal-videos">${videos.map((v) => `<figure class="gal-video reveal"><video src="${esc(v.url)}"${v.poster ? ` poster="${myAsset(v.poster)}"` : ''} controls playsinline preload="none"></video><figcaption>${esc(v.title || '')}<span>${time(v.duration)}</span></figcaption></figure>`).join('')}</div>`
        : empty('Videos');
    const imageGrid = images.length
        ? `<div class="gal-images">${images.map((g) => `<figure class="reveal" data-zoom="${myAsset(g.src)}" data-caption="${esc(g.caption || '')}"><img src="${myAsset(g.src)}" alt="${esc(g.caption || MY.title)}" loading="lazy">${g.caption ? `<figcaption>${esc(g.caption)}</figcaption>` : ''}</figure>`).join('')}</div>`
        : empty('Images');

    const body = `
${pageHead('Gallery', `The art of <span class="grad-bv">Myncha</span>`, 'Videos, key art and scenes from the world of Exius. Click an image to see it full size.')}
<section style="padding-top:0"><div class="wrap"><div class="gal-jump"><a href="#videos">Videos<small>${videos.length}</small></a><a href="#images">Images<small>${images.length}</small></a></div></div></section>
<section class="gal-sec" id="videos" style="padding-top:26px"><div class="wrap"><h2>Videos<small>${videos.length} ${videos.length === 1 ? 'video' : 'videos'}</small></h2>${videoGrid}</div></section>
<section class="gal-sec" id="images" style="padding-top:20px"><div class="wrap"><h2>Images<small>${images.length} ${images.length === 1 ? 'image' : 'images'}</small></h2>${imageGrid}</div></section>
<div class="lb" id="lb"><img alt=""><figcaption></figcaption></div>
<script>
(() => {
    const lb = document.getElementById('lb');
    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-zoom]');
        if (t) { lb.querySelector('img').src = t.dataset.zoom; lb.querySelector('figcaption').textContent = t.dataset.caption || ''; lb.classList.add('open'); return; }
        lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
    // One video at a time.
    document.querySelectorAll('.gal-video video').forEach((v) => v.addEventListener('play', () => {
        document.querySelectorAll('.gal-video video').forEach((o) => { if (o !== v) o.pause(); });
    }));
})();
</script>`;
    return page({ title: `Gallery · ${MY.title}`, description: `Videos and art from ${MY.title}.`, path: `${MY_BASE}/gallery`, active: 'gallery', body, css: MY_GALLERY_CSS });
}
