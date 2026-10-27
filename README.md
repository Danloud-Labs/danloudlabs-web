# Danloud Labs website

The pages of **danloudlabs.com**, served by the Danloud Labs Cloudflare Worker. Every image is
served from this repo through GitHub raw (the repo must stay **public**).

AURA Calendar's own pages live in their own repo: `Danloud-Labs/aura-calendar-web`.

| Page | URL | File | Status |
|---|---|---|---|
| Main page | `/` | `worker/home.js` | New design |
| iOS Apps | `/ios-apps`, `/ios` | `worker/ios.js` | New design |
| Privacy Policy | `/privacy`, `/privacy-policy`, `/privacy/hazmat` | `worker/privacy.js` | New design |
| Support Center | `/support` | `worker/support.js` | New design |
| HazMat Scanner | `/ios/hazmat-scanner`, `/hazmat`, `/hazmat-scanner` | `worker/hazmat.js` | New design |
| FedLog | `/ios/fedlog`, `/fedlog` | `worker/fedlog.js` | New design (beta; set `APP_STORE` when live) |
| Amaphest | `/amaphest-amalion-progenitor` (+ `/characters`, `/characters/<slug>`, `/universe`, `/gallery`), `/amaphest` | `worker/amaphest*.js` | New design (characters, factions, universe) |
| Mega Man X9: Apex-Primal | `/mmx9-beastwars-fm` (+ `/story`, `/characters`, `/characters/<slug>`, `/bosses`, `/universe`), `/mmx9` | `worker/mmx9*.js` | New design (fan project; blue and dark violet palette) |
| WarDecks: Leagues | `/ios/wardecks`, `/wardecks` | `worker/wardecks.js` | New design (beta; set `APP_STORE` when live) |
| Everything else | | | Old design, unchanged |

## Structure

```
danloudlabs-web/
├── assets/
│   ├── brand/      logo-mark.webp (transparent), hero-characters.webp, logo-card.webp
│   ├── apps/       <app>-icon.webp (256 px), <app>-banner.webp (16:9), hazmat/, fedlog/ and wardecks/ art
│   └── projects/   <project>-logo.webp (transparent logos of the creative projects)
├── worker/         the files that go in the Cloudflare Worker
│   ├── worker.js       the Worker's entry file (same name in the dashboard): imports and routes.
│   │                   It also imports old-design pages that only live in the dashboard
│   │                   (myncha, darkwithinme, android, software, fftii, leave-tracker, aura-routes).
│   ├── site-data.js    apps, projects, platforms, contact: edit this one for content
│   ├── site-styles.js  shared CSS (Theme Studio palette) for every redesigned page
│   ├── site-layout.js  shared page shell: top bar, footer, app cards, icons
│   ├── home.js         main page, exports htmlPrincipal
│   ├── ios.js          iOS Apps page, exports htmlIOS
│   ├── privacy.js      Privacy Policy, exports htmlPrivacy (legal text: change on purpose)
│   ├── support.js      Support Center, exports htmlSupport (FAQ, search, email assistant)
│   ├── hazmat.js       HazMat Scanner page, exports htmlHazMat
│   ├── fedlog.js       FedLog page, exports htmlFedLog
│   ├── wardecks.js     WarDecks: Leagues page, exports htmlWarDecks
│   ├── amaphest.js     Amaphest pages + handleAmaphest(request) router
│   ├── amaphest-data.js        Amaphest texts: main page, sections, gallery list
│   ├── amaphest-characters.js  every character and faction (bios, roles, facts)
│   ├── amaphest-universe.js    the Universe page (Hemos / Earth tabs) and its CSS
│   ├── amaphest-universe-data.js  the Universe texts
│   ├── amaphest-styles.js   Amaphest-only CSS
│   ├── mmx9.js              Mega Man X9 pages + handleMMX9(request) router
│   ├── mmx9-data.js         MMX9 texts: title, premise, Universe cards, sections
│   ├── mmx9-characters.js   MMX9 characters, factions and the eight bosses' stats
│   ├── mmx9-story.js        MMX9 chapters (Story page)
│   └── mmx9-styles.js       MMX9-only CSS (blue / dark violet)
├── tools/mmx9_assets.py  converts the MMX9 art in iCloud and writes its manifest
├── tools/preview.mjs   renders the pages to preview/ with the local images
└── CLOUDFLARE.md       how to install / update the Worker
```

Each page keeps the same export name the Worker's entry file (`worker.js` in the dashboard) already imports, so a redesigned
page only needs its file pasted over the old one.

## Common changes

- **Support Center FAQ:** each answer is one entry in `FAQ` (`worker/support.js`) with its app,
  topic, question and answer. When an app ships (FedLog, WarDecks), change its status in
  `SUPPORT_APPS` and add its questions. Deep links: `/support#aura`, `/support#hazmat`,
  `/support#aura-restore` (opens that answer), `/support?q=refund` (searches).

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

## Amaphest art

Character art lives in iCloud (`Danloud Labs/Cloudflare/Banners/Amaphest/Characters/...`).
The pages read `assets/projects/amaphest/manifest.json` live, so new art needs no Cloudflare paste:

```
cd ~/Developer/danloudlabs-web
python3 tools/amaphest_assets.py     # converts the art and rewrites the manifest
git add -A && git commit -m "Amaphest art" && git push
```

In each character folder (or in each outfit subfolder, like Michelle's): a landscape image or
a name with "wallpaper" becomes the 16:9 dynamic wallpaper, "F&B" / "turnaround" / "CGI" the
front & back sheet, and any other portrait the profile picture (newest wins). Rename a file to
`profile.png`, `wallpaper.jpg` or `turnaround.jpg` to force it. A new character needs an entry in
`worker/amaphest-characters.js`; its folder name maps to the slug automatically (titles dropped,
"Name-Alias" -> name) unless `FOLDER_SLUGS` in the script says otherwise.

- The root image of each faction folder (`Characters/Factions/<Faction>/`) is that faction's button art.
- `Universe/<Hemos|Earth>/`: an image named like a card or section of the Universe page goes there,
  `Hero` is the tab's top background; `Universe/hemos.png` and `earth.png` are the tab planet icons.
- The Worker re-reads the manifest every minute, so art shows up about a minute after the push.

## Mega Man X9 art

Art lives in iCloud (`Danloud Labs/Cloudflare/Banners/MMX9`): `Characters/Main Characters/<Name>`,
`Characters/Factions/<CFE|Antagonist|Mavericks>/<Name>`, `Universe/<Card name>.<ext>`, and
`banner.*` / `logo.*` at the top for the main page. The pages read
`assets/projects/mmx9/manifest.json` live, so new art needs no Cloudflare paste:

```
cd ~/Developer/danloudlabs-web
python3 tools/mmx9_assets.py     # converts the art and rewrites the manifest
git add -A && git commit -m "MMX9 art" && git push
```

Until there is a `banner.*`, the hero uses the old MMX9 wallpaper from `danloudlabs-assets`.
