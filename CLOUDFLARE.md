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
5. **Deploy**, then open https://danloudlabs.com and https://danloudlabs.com/ios-apps

The old `styles.js` (`cssSubPaginas`) stays: the pages not redesigned yet still use it.

## Updating later

- Text or content: paste `site-data.js` (or the page file) and Deploy.
- Design: paste `site-styles.js` and Deploy; every redesigned page changes together.
- Images: push; GitHub raw can take up to 5 minutes to serve a replaced image.
