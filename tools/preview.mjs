// Renders the pages to preview/ with images pointing at the local assets/ folder:
//   node tools/preview.mjs   then open preview/index.html
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ASSETS } from '../worker/site-data.js';
import { htmlPrincipal } from '../worker/home.js';
import { htmlIOS } from '../worker/ios.js';
import { htmlPrivacy } from '../worker/privacy.js';
import { htmlSupport } from '../worker/support.js';
import { htmlHazMat } from '../worker/hazmat.js';
import { htmlFedLog } from '../worker/fedlog.js';
import { htmlWarDecks } from '../worker/wardecks.js';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'preview');
await mkdir(out, { recursive: true });
const pages = { 'index.html': htmlPrincipal, 'ios-apps.html': htmlIOS, 'privacy.html': htmlPrivacy, 'support.html': htmlSupport, 'hazmat.html': htmlHazMat, 'fedlog.html': htmlFedLog, 'wardecks.html': htmlWarDecks };
const links = [['href="/ios/hazmat-scanner"', 'href="hazmat.html"'], ['href="/support#', 'href="support.html#'], ['href="/support"', 'href="support.html"'], ['href="/privacy"', 'href="privacy.html"'], ['href="/ios-apps"', 'href="ios-apps.html"'], ['href="/#', 'href="index.html#'], ['href="/"', 'href="index.html"']];
for (const [file, html] of Object.entries(pages)) {
    let h = html.split(SITE_ASSETS).join('../assets');
    for (const [a, b] of links) h = h.split(a).join(b);
    await writeFile(join(out, file), h);
    console.log(file, `${Math.round(h.length / 1024)} KB`);
}

// Amaphest pages are built per request and read the art manifest live: serve it from disk.
import { readFile } from 'node:fs/promises';
import { handleAmaphest } from '../worker/amaphest.js';
const realFetch = globalThis.fetch;
globalThis.fetch = async (u, o) => (String(u).includes('/projects/amaphest/manifest.json')
    ? new Response(await readFile(join(out, '..', 'assets/projects/amaphest/manifest.json')))
    : realFetch(u, o));
const amaPages = { 'amaphest.html': '', 'amaphest-characters.html': '/characters', 'amaphest-gallery.html': '/gallery', 'amaphest-universe.html': '/universe',
    'amaphest-michelle.html': '/characters/michelle-brown', 'amaphest-shock.html': '/characters/shock', 'amaphest-hammond.html': '/characters/george-hammond', 'amaphest-ryan.html': '/characters/ryan-cole', 'amaphest-kratos.html': '/characters/kratos' };
for (const [file, route] of Object.entries(amaPages)) {
    const res = await handleAmaphest(new Request(`https://danloudlabs.com/amaphest-amalion-progenitor${route}`));
    let h = (await res.text()).split(SITE_ASSETS).join('../assets');
    h = h.replace(/href="\/amaphest-amalion-progenitor\/characters\/michelle-brown"/g, 'href="amaphest-michelle.html"')
        .replace(/href="\/amaphest-amalion-progenitor\/characters\/shock"/g, 'href="amaphest-shock.html"')
        .replace(/href="\/amaphest-amalion-progenitor\/characters"/g, 'href="amaphest-characters.html"')
        .replace(/href="\/amaphest-amalion-progenitor\/gallery"/g, 'href="amaphest-gallery.html"')
        .replace(/href="\/amaphest-amalion-progenitor\/universe"/g, 'href="amaphest-universe.html"')
        .replace(/href="\/amaphest-amalion-progenitor"/g, 'href="amaphest.html"');
    await writeFile(join(out, file), h);
    console.log(file, `${Math.round(h.length / 1024)} KB`);
}

// Mega Man X9 pages: same idea, manifest read from disk.
import { handleMMX9 } from '../worker/mmx9.js';
const fetchAma = globalThis.fetch;
globalThis.fetch = async (u, o) => (String(u).includes('/projects/mmx9/manifest.json') || String(u).includes('/projects/mmx9/soundtrack.json')
    ? new Response(await readFile(join(out, '..', 'assets/projects/mmx9/', String(u).includes('soundtrack') ? 'soundtrack.json' : 'manifest.json')).catch(() => '{}'))
    : fetchAma(u, o));
const mmxPages = { 'mmx9.html': '', 'mmx9-story.html': '/story', 'mmx9-characters.html': '/characters', 'mmx9-mavericks.html': '/mavericks', 'mmx9-weapons.html': '/weapons', 'mmx9-locations.html': '/locations', 'mmx9-soundtrack.html': '/soundtrack', 'mmx9-x.html': '/characters/x', 'mmx9-universe.html': '/universe',
    'mmx9-sigma.html': '/characters/sigma', 'mmx9-gamma.html': '/characters/gamma', 'mmx9-mammoth.html': '/characters/arctic-woolly-mammoth' };
const mmxLinks = [['/story', 'mmx9-story.html'], ['/characters/sigma', 'mmx9-sigma.html'], ['/characters/gamma', 'mmx9-gamma.html'], ['/characters/arctic-woolly-mammoth', 'mmx9-mammoth.html'],
    ['/characters', 'mmx9-characters.html'], ['/mavericks', 'mmx9-mavericks.html'], ['/weapons', 'mmx9-weapons.html'], ['/locations', 'mmx9-locations.html'], ['/soundtrack', 'mmx9-soundtrack.html'], ['/characters/x', 'mmx9-x.html'], ['/universe', 'mmx9-universe.html'], ['', 'mmx9.html']];
for (const [file, route] of Object.entries(mmxPages)) {
    const res = await handleMMX9(new Request(`https://danloudlabs.com/mmx9-beastwars-fm${route}`));
    let h = (await res.text()).split(SITE_ASSETS).join('../assets');
    for (const [r, f] of mmxLinks) h = h.split(`href="/mmx9-beastwars-fm${r}"`).join(`href="${f}"`);
    await writeFile(join(out, file), h);
    console.log(file, `${Math.round(h.length / 1024)} KB`);
}
