# Danloud Labs website

The pages of **danloudlabs.com**, served by the Danloud Labs Cloudflare Worker. Every image is
served from this repo through GitHub raw (the repo must stay **public**).

AURA Calendar's own pages live in their own repo: `Danloud-Labs/aura-calendar-web`.

| Page | URL | File | Status |
|---|---|---|---|
| Main page | `/` | `worker/home.js` | New design |
| iOS Apps | `/ios-apps`, `/ios` | `worker/ios.js` | New design |
| Privacy Policy | `/privacy` | `privacy.js` (Worker) | Next |
| Support Center | `/support` | `support.js` (Worker) | Next |
| HazMat Scanner | `/ios/hazmat-scanner` | `hazmat.js` (Worker) | Next |
| Everything else | | | Old design, unchanged |

## Structure

```
danloudlabs-web/
├── assets/
│   ├── brand/      logo-mark.webp (transparent), hero-characters.webp, logo-card.webp
│   ├── apps/       <app>-icon.webp (256 px) and <app>-banner.webp (16:9)
│   └── projects/   <project>-logo.webp (transparent logos of the creative projects)
├── worker/         the files that go in the Cloudflare Worker
│   ├── site-data.js    apps, projects, platforms, contact: edit this one for content
│   ├── site-styles.js  shared CSS (Theme Studio palette) for every redesigned page
│   ├── site-layout.js  shared page shell: top bar, footer, app cards, icons
│   ├── home.js         main page, exports htmlPrincipal
│   └── ios.js          iOS Apps page, exports htmlIOS
├── tools/preview.mjs   renders the pages to preview/ with the local images
└── CLOUDFLARE.md       how to install / update the Worker
```

Each page keeps the same export name the Worker's `index.js` already imports, so a redesigned
page only needs its file pasted over the old one.

## Common changes

- **New app:** add its icon and 16:9 banner to `assets/apps/`, then an entry in `SITE_APPS`
  (`worker/site-data.js`). It shows on the main page and on /ios-apps.
- **New creative project:** transparent logo in `assets/projects/`, entry in `SITE_PROJECTS`.
- **Texts:** `worker/site-data.js` for shared content, the page file for page-only text.

## Check before pushing

```
cd ~/Developer/danloudlabs-web
npm run check      # syntax of every module, must end in "All JS OK"
npm run preview    # writes preview/*.html; open preview/index.html
```
