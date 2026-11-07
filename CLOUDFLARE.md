# Installing the pages in the Cloudflare Worker

`index.js` does **not** change: the redesigned pages keep their export names
(`htmlPrincipal`, `htmlIOS`).

1. Push this repo first (images load from
   `raw.githubusercontent.com/Danloud-Labs/danloudlabs-web/main/assets`). The repo must be **public**.
2. Cloudflare dashboard → Workers & Pages → the danloudlabs.com Worker → **Edit code**.
3. Create three new files and paste them from `worker/` with the same name:
   - `site-data.js`
   - `site-styles.js`
   - `site-layout.js`
4. Paste over the existing files:
   - `home.js`
   - `ios.js`
   - `privacy.js`
   - `support.js`
   - `hazmat.js`
   - `fedlog.js`
   - `wardecks.js`
5. **Deploy**, then open https://danloudlabs.com and https://danloudlabs.com/ios-apps

The old `styles.js` (`cssSubPaginas`) stays: the pages not redesigned yet still use it.

## Updating later

- Text or content: paste `site-data.js` (or the page file) and Deploy.
- Design: paste `site-styles.js` and Deploy; every redesigned page changes together.
- Images: push; GitHub raw can take up to 5 minutes to serve a replaced image.

## Amaphest (one-time)

1. Create `amaphest-data.js` and `amaphest-styles.js`; paste the new `amaphest.js` over the old one.
2. In `index.js`, add `import { handleAmaphest } from './amaphest.js';` and, at the start of
   `fetch`, next to the AURA Calendar handler:
   ```js
   const ama = await handleAmaphest(request);
   if (ama) return ama;
   ```
   Then delete the old `/amaphest-amalion-progenitor` route line (the `htmlAmaphest` import can stay).

## Mega Man X9 (one-time)

1. Create `mmx9-data.js`, `mmx9-characters.js`, `mmx9-story.js`, `mmx9-styles.js` and `mmx9-weapons.js`;
   paste the new `mmx9.js` over the old one.
2. Paste `worker/worker.js` over the dashboard's `worker.js` (it already imports `handleMMX9`,
   calls it right after Amaphest and drops the old `/mmx9-beastwars-fm` route line).
3. **Deploy**, then open https://danloudlabs.com/mmx9-beastwars-fm

### Mega Man X9: Locations (one-time)

Create `mmx9-locations.js`, then paste `mmx9.js`, `mmx9-data.js` and `mmx9-styles.js` over the old ones and Deploy.

### Mega Man X9: Soundtrack (one-time)

Create `mmx9-soundtrack.js`, then paste `mmx9.js`, `mmx9-data.js` and `mmx9-styles.js` over the old ones and Deploy.

## Dark Within Me (one-time)

1. Create `dwm.js`, `dwm-data.js` and `dwm-styles.js`.
2. Paste `worker/worker.js` over the dashboard's `worker.js` (it imports `handleDarkWithinMe`, calls it right
   after MMX9 and drops the old `/dark-within-me-la-sua-origine` route line). `darkwithinme.js` is no longer used.
3. **Deploy**, then open https://danloudlabs.com/dark-within-me-la-sua-origine

The chapters live in `assets/projects/dwm/story/<book>.md` and are read live: new chapters only need a git push.

### Dark Within Me: Universe and Legends (one-time)

Create `dwm-universe.js`, then paste `dwm.js`, `dwm-data.js` and `dwm-styles.js` over the old ones and Deploy.
Chapter art goes in `assets/projects/dwm/story/<book>/chapter-01.webp`… (legends: `assets/projects/dwm/legends/legend-01.webp`…):
an empty frame shows until the image is pushed.

### Dark Within Me: Soundtrack (one-time)

Paste `dwm.js`, `dwm-data.js`, `dwm-styles.js` and `mmx9-soundtrack.js` (the player, now shared by both sites) over the old ones and Deploy.
Upload the music from the Mac with `node tools/dwm_soundtrack.mjs`, then commit and push `assets/projects/dwm/soundtrack.json`.

### Dark Within Me: Characters and Locations (one-time)

Create `dwm-characters.js` and `dwm-locations.js`, then paste `dwm.js`, `dwm-data.js`, `dwm-styles.js` and `dwm-universe.js` over the old ones and Deploy.
The list of images to create is `assets/projects/dwm/ART.md` (refresh it with `node tools/dwm_art_list.mjs`).

## Final Fantasy Tactics II (one-time)

1. Create `fft2.js`, `fft2-data.js` and `fft2-styles.js`.
2. Paste `worker/worker.js` over the dashboard's `worker.js` (it imports `handleFFT2`, calls it right after Dark Within Me
   and drops the old `/fftii` route line). `fftii.js` is no longer used.
3. **Deploy**, then open https://danloudlabs.com/fftii
4. Upload the trailer and the music from the Mac: `node tools/fft2_media.mjs`, then commit and push
   `assets/projects/fft2/soundtrack.json`.

## Myncha: Vampires of Exius (one-time)

1. Create `myncha-data.js` and `myncha-styles.js`, and paste `worker/myncha.js` over the old dashboard `myncha.js`.
2. Paste `worker/worker.js` over the dashboard's `worker.js` (it imports `handleMyncha`, calls it right after FFT2
   and drops the old `/myncha-vampires-of-exius` route line).
3. **Deploy**, then open https://danloudlabs.com/myncha-vampires-of-exius
4. Upload the music from the Mac: `node tools/myncha_media.mjs`, then commit and push
   `assets/projects/myncha/soundtrack.json`.
5. Art (CGI) goes in `assets/projects/myncha/`: `characters/<key>.webp` (3:4, werewolves also `<key>-beast.webp`),
   `story/act-01.webp`…, `curse/`, `exius/`, `bestiary/`, `locations/`, `sections/` (16:9). Keys are in `worker/myncha-data.js`.
6. Gallery: put images in `assets/projects/myncha/gallery/` ("01 Title.webp"), run `node tools/myncha_gallery.mjs`,
   then commit and push. No Cloudflare paste needed.

### Myncha: character profiles (one-time)

Create `myncha-layout.js` and `myncha-characters.js`, then paste `myncha.js`, `myncha-data.js` and `myncha-styles.js`
over the old ones and Deploy. Character art: `python3 tools/myncha_assets.py`, then commit and push (no paste needed).

### Myncha: Gallery with videos (one-time)

Create `myncha-gallery.js`, then paste `myncha.js`, `myncha-layout.js` and `myncha-data.js` over the old ones and Deploy.
Gallery content: put images in `Website Resourses/Images` and videos in `Website Resourses/videos`
(~/Developer/Myncha Vampires of Exius), run `node tools/myncha_gallery.mjs`, then commit and push (no paste needed).
