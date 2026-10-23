// =====================================================================================
// Danloud Labs website: HazMat Scanner  ->  /ios/hazmat-scanner  (also /hazmat, /hazmat-scanner)
// Facts come from the app itself (v1.2): keep prices and counts in step with the app.
// =====================================================================================

import { SITE_APPS, asset } from './site-data.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const APP_STORE = 'https://apps.apple.com/app/id6804674615';
const app = SITE_APPS.find((a) => a.slug === 'hazmat-scanner');
const shot = (dev, n) => asset(`apps/hazmat/${dev}-${n}.webp`);

const STATS = [
    ['2,767', 'hazardous materials'],
    ['64', 'ERG 2024 guides'],
    ['30', 'official DOT placards'],
    ['9', 'tanker and rail car profiles'],
    ['392', 'page official ERG PDF'],
];

const FEATURES = [
    ['scan', 'Real-time AI scanner', 'Point the camera at an orange UN panel or a hazard diamond and Apple Vision AI matches the 4-digit UN/NA number across all 2,767 materials, on the device. Flashlight support, or scan a photo from your library.'],
    ['search', 'Chemical ID', 'Search by UN/NA number or chemical name, or filter by hazard class, TIH inhalation hazards, water-reactive materials and warfare agents. Each result opens its emergency response guide.'],
    ['diamond', '30 official DOT placards', 'Every DOT hazardous materials placard with its hazard class, what it means and one tap to the matching emergency response guide.'],
    ['truck', 'Tankers and rail cars', 'Identify 9 road and rail containers, such as the MC-306, MC-331 and DOT-111, by their silhouette, with visual identification notes, pressure ratings and typical cargo.'],
    ['book', 'Full ERG 2024', 'All 64 emergency response guides with fire, health, evacuation and first aid protocols, plus the complete 392-page DOT guidebook as a PDF with keyword search and direct page jumping.'],
    ['call', '24/7 emergency hotlines', 'One-tap dialing to CHEMTREC, the National Response Center and the CDC Emergency Operations Center, plus a direct 4-digit UN number lookup with the most common materials.'],
];

const SHOTS = {
    iphone: [
        ['Identify. Respond. Protect.', 1], ['Scan any placard instantly', 2], ['Complete chemical intelligence', 3],
        ['2,767 chemicals at your fingertips', 4], ['All 30 official DOT placards', 5], ['Full ERG 2024 emergency guides', 6],
    ],
    ipad: [
        ['Identify. Respond. Protect.', 1], ['Scan any placard instantly', 2], ['Instant AI placard recognition', 3],
        ['Complete chemical intelligence', 4], ['2,767 chemicals at your fingertips', 5], ['All 30 official DOT placards', 6], ['Full ERG 2024 emergency guides', 7],
    ],
};

const HOTLINES = [
    ['CHEMTREC (US/Canada)', '1-800-424-9300', '+18004249300'],
    ['National Response Center (NRC)', '1-800-424-8802', '+18004248802'],
    ['CDC Emergency Operations Center', '770-488-7100', '+17704887100'],
];

const storeButton = `<a class="btn btn-store" href="${APP_STORE}" target="_blank" rel="noopener">${ICONS.apple}<span class="two"><small>Download on the</small>App Store</span></a>`;

const shotRow = (dev, hidden) => `<div class="shots" data-dev="${dev}"${hidden ? ' hidden' : ''}>${SHOTS[dev].map(([cap, n]) => `<img src="${shot(dev, n)}" alt="${esc(cap)}" loading="lazy" data-zoom="${shot(dev, n)}">`).join('')}</div>`;

const body = `
<main class="product">
<section class="p-hero">
    <div class="bg"></div>
    <div class="wrap">
        <div>
            <div class="who"><img src="${app.icon}" alt="HazMat Scanner icon"><div><b style="font-size:17px">HazMat Scanner</b><small>by Danloud Labs LLC</small></div></div>
            <h1>Identify. Respond. <span class="hot">Protect.</span></h1>
            <p class="lead">An offline hazardous materials reference tool for first responders, hazmat technicians, inspectors and transportation professionals. Scan a placard, get the official ERG 2024 guidance in seconds. Everything runs on your device.</p>
            <div class="badges">
                <span class="hot">ERG 2024</span><span>100% offline</span><span>iPhone &amp; iPad</span><span>No account</span><span>No tracking</span>
            </div>
            <div class="cta-row" style="margin-top:24px">
                ${storeButton}
                <a class="btn btn-ghost" href="#pricing">Free trial &amp; pricing</a>
            </div>
            <p class="note">Free download. The ERG Guides are free forever; unlock every tool with a 15-day free trial or a one-time Lifetime purchase.</p>
        </div>
        <div class="devices" aria-hidden="true">
            <img class="tab" src="${shot('ipad', 3)}" alt="">
            <img class="ph" src="${shot('iphone', 2)}" alt="">
        </div>
    </div>
    <div class="wrap" style="display:block">
        <div class="p-stats">${STATS.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
    </div>
</section>

<section id="features">
    <div class="wrap">
        <div class="section-head reveal">
            <div>
                <span class="eyebrow">Official ERG 2024 HazMat placard scanner</span>
                <h2>Everything you need on scene.</h2>
                <p class="lead">Powered by Apple Vision AI, HazMat Scanner recognizes UN identification numbers on DOT orange panels and hazard diamonds with your device camera. No internet required.</p>
            </div>
        </div>
        <div class="p-features">${FEATURES.map(([icon, title, text]) => `<div class="p-feature reveal"><div class="ic">${ICONS[icon]}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`).join('')}</div>
    </div>
</section>

<section id="screens" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head">
            <div><span class="eyebrow">Screenshots</span><h2>See it in action</h2></div>
            <div class="shots-bar" id="shots-bar"><button type="button" class="on" data-dev="iphone">iPhone</button><button type="button" data-dev="ipad">iPad</button></div>
        </div>
        ${shotRow('iphone', false)}
        ${shotRow('ipad', true)}
    </div>
</section>

<section id="pricing">
    <div class="wrap">
        <div class="section-head reveal">
            <div><span class="eyebrow">Pricing</span><h2>Start free. Pay once if you need more.</h2>
            <p class="lead">No subscription, no auto-renewal and no account. Nothing to cancel.</p></div>
        </div>
        <div class="pricing">
            <div class="plan reveal">
                <span class="eyebrow">Always free</span>
                <div class="price">$0</div>
                <p>For everyone, with or without the trial.</p>
                <ul>
                    <li>The complete 392-page ERG 2024 guidebook (PDF viewer with search)</li>
                    <li>All 64 emergency response guides</li>
                    <li>Fire, health, evacuation and first aid protocols</li>
                </ul>
            </div>
            <div class="plan pro reveal">
                <span class="eyebrow">HazMat Scanner Pro</span>
                <div class="price">$14.99 <small>one-time · Lifetime Access</small></div>
                <p>Unlock every emergency response tool with a single purchase. Try all of it free for 15 days first: no payment and no card needed.</p>
                <ul>
                    <li>Real-time Vision AI camera placard scanner</li>
                    <li>Full 2,767 chemical database lookup and hazard filters</li>
                    <li>30 official DOT placards and 9 tanker and rail car profiles</li>
                    <li>Free updates, on every device with your Apple Account</li>
                </ul>
                <div class="cta-row" style="justify-content:flex-start;margin-top:20px">${storeButton}</div>
                <div class="foot">Bought HazMat Scanner when it was a paid app? You keep full access for free, permanently. US price; it may vary by country.</div>
            </div>
        </div>
    </div>
</section>

<section id="hotlines" style="padding-top:10px">
    <div class="wrap">
        <div class="section-head"><div><span class="eyebrow">Always within reach</span><h2>24/7 emergency response hotlines</h2></div></div>
        <div class="hotlines">${HOTLINES.map(([name, num, tel]) => `<a class="hotline" href="tel:${tel}"><span class="ic">${ICONS.call}</span><span><small>${esc(name)}</small><b>${num}</b></span></a>`).join('')}</div>
        <div class="disclaimer">${ICONS.diamond}<span>HazMat Scanner is a reference tool for trained personnel. Always follow your agency protocols and the official DOT Emergency Response Guidebook.</span></div>
    </div>
</section>

<section>
    <div class="wrap duo">
        <div class="card">
            <span class="eyebrow">Privacy first</span>
            <h3 style="font-size:22px;margin:8px 0 10px">100% offline, zero tracking</h3>
            <p style="color:var(--muted);margin:0 0 14px">The chemical database and the ERG PDF live on your device. Camera images are processed on the device with Apple's Vision framework and are never uploaded, stored or shared. No account, no analytics, no ads.</p>
            <a class="btn btn-ghost btn-sm" href="/privacy">Privacy Policy ${ICONS.arrow.replace('<svg', '<svg width="15" height="15"')}</a>
        </div>
        <div class="card">
            <span class="eyebrow">Help</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Questions or problems?</h3>
            <p style="color:var(--muted);margin:0 0 14px">Restoring Lifetime Access, the free trial, scanner tips and more in the Support Center. Requires iOS 17 or later.</p>
            <a class="btn btn-ghost btn-sm" href="/support#hazmat">HazMat Scanner support ${ICONS.arrow.replace('<svg', '<svg width="15" height="15"')}</a>
        </div>
    </div>
</section>
</main>
<div class="lb" id="lb"><img alt=""></div>`;

const script = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const bar = document.getElementById('shots-bar');
    bar.addEventListener('click', (e) => {
        const b = e.target.closest('button'); if (!b) return;
        bar.querySelectorAll('button').forEach((x) => x.classList.toggle('on', x === b));
        document.querySelectorAll('.shots').forEach((s) => { s.hidden = s.dataset.dev !== b.dataset.dev; });
    });
    const lb = document.getElementById('lb'), img = lb.querySelector('img');
    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-zoom]');
        if (t) { img.src = t.dataset.zoom; img.alt = t.alt || ''; lb.classList.add('open'); return; }
        if (lb.classList.contains('open')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
});
</script>`;

export const htmlHazMat = sitePage({
    title: 'HazMat Scanner · Offline ERG 2024 placard scanner',
    description: 'HazMat Scanner for iPhone and iPad: real-time Apple Vision AI placard scanner, 2,767 hazardous materials, 30 DOT placards, 9 tanker and rail car profiles and the full ERG 2024. 100% offline.',
    path: '/ios/hazmat-scanner',
    ogImage: shot('ipad', 2),
    icon: app.icon,
    active: 'apps',
    back: { href: '/ios-apps', label: 'iOS Apps' },
    head: `<meta name="apple-itunes-app" content="app-id=6804674615">\n${script}`,
    body,
});
