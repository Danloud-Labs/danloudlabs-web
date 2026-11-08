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

// Dark Within Me pages: the book texts are read live, so serve them from disk.
import { handleDarkWithinMe } from '../worker/dwm.js';
const fetchMmx = globalThis.fetch;
globalThis.fetch = async (u, o) => {
    const m = String(u).match(/\/projects\/dwm\/([^?]+\.(md|json))/);
    return m ? new Response(await readFile(join(out, '..', 'assets/projects/dwm/', m[1])).catch(() => '')) : fetchMmx(u, o);
};
const dwmPages = { 'dwm.html': '', 'dwm-story.html': '/story', 'dwm-universe.html': '/universe', 'dwm-legends.html': '/legends', 'dwm-soundtrack.html': '/soundtrack', 'dwm-characters.html': '/characters', 'dwm-locations.html': '/locations' };
for (const [file, route] of Object.entries(dwmPages)) {
    const res = await handleDarkWithinMe(new Request(`https://danloudlabs.com/dark-within-me-la-sua-origine${route}`));
    let h = (await res.text()).split(SITE_ASSETS).join('../assets');
    for (const r of ['story', 'universe', 'legends', 'soundtrack', 'characters', 'locations']) h = h.split(`href="/dark-within-me-la-sua-origine/${r}`).join(`href="dwm-${r}.html`);
    h = h.split('href="/dark-within-me-la-sua-origine"').join('href="dwm.html"');
    await writeFile(join(out, file), h);
    console.log(file, `${Math.round(h.length / 1024)} KB`);
}

// Final Fantasy Tactics II pages: story and soundtrack read from disk.
import { handleFFT2 } from '../worker/fft2.js';
const fetchDwm = globalThis.fetch;
globalThis.fetch = async (u, o) => {
    const m = String(u).match(/\/projects\/fft2\/([^?]+\.(md|json))/);
    return m ? new Response(await readFile(join(out, '..', 'assets/projects/fft2/', m[1])).catch(() => '{}')) : fetchDwm(u, o);
};
const fftPages = { 'fft2.html': '', 'fft2-story.html': '/story', 'fft2-characters.html': '/characters', 'fft2-world.html': '/world', 'fft2-relics.html': '/relics', 'fft2-jobs.html': '/jobs', 'fft2-locations.html': '/locations', 'fft2-soundtrack.html': '/soundtrack' };
for (const [file, route] of Object.entries(fftPages)) {
    const res = await handleFFT2(new Request(`https://danloudlabs.com/fftii${route}`));
    let h = (await res.text()).split(SITE_ASSETS).join('../assets');
    for (const r of ['story', 'characters', 'world', 'relics', 'jobs', 'locations', 'soundtrack']) h = h.split(`href="/fftii/${r}`).join(`href="fft2-${r}.html`);
    h = h.split('href="/fftii"').join('href="fft2.html"');
    await writeFile(join(out, file), h);
    console.log(file, `${Math.round(h.length / 1024)} KB`);
}

// Myncha pages: story and soundtrack read from disk.
import { handleMyncha } from '../worker/myncha.js';
const fetchFft = globalThis.fetch;
globalThis.fetch = async (u, o) => {
    const m = String(u).match(/\/projects\/myncha\/([^?]+\.(md|json))/);
    return m ? new Response(await readFile(join(out, '..', 'assets/projects/myncha/', m[1])).catch(() => '{}')) : fetchFft(u, o);
};
const myRoutes = ['story', 'characters', 'curse', 'exius', 'bestiary', 'locations', 'gallery', 'soundtrack'];
const myProfiles = ['myncha', 'wynclaw', 'cardinal-gabriel', 'sire'];
for (const route of ['', ...myRoutes, ...myProfiles.map((k) => `characters/${k}`)]) {
    const file = route ? `myncha-${route.replace('/', '-')}.html` : 'myncha.html';
    const res = await handleMyncha(new Request(`https://danloudlabs.com/myncha-vampires-of-exius${route ? `/${route}` : ''}`));
    let h = (await res.text()).split(SITE_ASSETS).join('../assets');
    for (const k of myProfiles) h = h.split(`href="/myncha-vampires-of-exius/characters/${k}"`).join(`href="myncha-characters-${k}.html"`);
    for (const r of myRoutes) h = h.split(`href="/myncha-vampires-of-exius/${r}`).join(`href="myncha-${r}.html`);
    h = h.split('href="/myncha-vampires-of-exius"').join('href="myncha.html"');
    await writeFile(join(out, file), h);
    console.log(file, `${Math.round(h.length / 1024)} KB`);
}

// macOS app pages.
import { handleMacOS } from '../worker/macos.js';
for (const route of ['macos-apps', 'macos/cutout-studio', 'macos/alphacut', 'macos/yt-converter']) {
    const res = await handleMacOS(new Request(`https://danloudlabs.com/${route}`));
    let h = (await res.text()).split(SITE_ASSETS).join('../assets');
    for (const r of ['cutout-studio', 'alphacut', 'yt-converter']) h = h.split(`href="/macos/${r}"`).join(`href="macos-${r}.html"`);
    const file = `${route.replace('/', '-')}.html`;
    await writeFile(join(out, file), h);
    console.log(file, `${Math.round(h.length / 1024)} KB`);
}
