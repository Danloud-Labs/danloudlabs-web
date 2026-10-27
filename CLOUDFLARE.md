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
