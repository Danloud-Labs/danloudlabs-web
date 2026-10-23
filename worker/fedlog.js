// =====================================================================================
// Danloud Labs website: FedLog  ->  /ios/fedlog  (also /fedlog)
// FedLog is in beta on TestFlight. When it reaches the App Store, set APP_STORE below:
// the beta buttons turn into the App Store button on their own.
// Facts come from the app (tools, paywall, Rotation Manager); keep prices in step with it.
// =====================================================================================

import { SITE, SITE_APPS, asset } from './site-data.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const APP_STORE = '';   // e.g. 'https://apps.apple.com/app/idXXXXXXXXXX' once FedLog is live
const app = SITE_APPS.find((a) => a.slug === 'fedlog');
const shot = (name) => asset(`apps/fedlog/${name}.webp`);
const small = (svg) => svg.replace('<svg', '<svg width="15" height="15"');

const BETA_MAIL = `mailto:${SITE.email}?subject=${encodeURIComponent('[FedLog] Beta access request')}&body=${encodeURIComponent('Hi Danloud Labs,\n\nI would like to join the FedLog beta.\n\nPort / Field Office:\nPosition:\n')}`;

const primaryButton = APP_STORE
    ? `<a class="btn btn-store" href="${APP_STORE}" target="_blank" rel="noopener">${ICONS.apple}<span class="two"><small>Download on the</small>App Store</span></a>`
    : `<a class="btn btn-primary" href="${BETA_MAIL}">${ICONS.mail} Request beta access</a>`;

const phone = (name, alt, cls = '') => `<span class="phone ${cls}"><img src="${shot(name)}" alt="${esc(alt)}" loading="lazy"></span>`;

const STATS = [
    ['15 days', 'free trial'],
    ['9', 'officer tools'],
    ['4', 'calendar views'],
    ['OPM', 'locality pay tables'],
    ['3', 'shift types'],
];

// Big feature blocks, each with its screenshot.
const BLOCKS = [
    {
        img: 'dashboard', eyebrow: 'Dashboard', title: 'Your premium pay cap, always in sight.',
        text: 'A live gauge shows how close you are to the premium pay limit, including an approved waiver, and how much room is left. Tap it to project the rest of the year.',
        list: ['Regular hourly rate from your grade and step', 'Current pay period earnings', 'Annual base and total annual pay (base plus capped premiums)', 'Annual and sick leave balances, with your use-or-lose hours'],
    },
    {
        img: 'calendar', eyebrow: 'Calendar', title: 'Every day shows what it pays.',
        text: 'Your schedule with the earnings of each day, RDOs, holidays, leave and overtime at a glance. Today’s summary breaks the day into regular pay, night differential and premiums.',
        list: ['Calendar, Pay Period, Payroll and Fiscal views', 'Log overtime and leave from any day', 'Share or export your schedule as a PDF'],
        flip: true,
    },
    {
        img: 'rotation', eyebrow: 'Rotation Manager', title: 'Your rotation, applied in one tap.',
        text: 'Pick a preset port rotation, or build your own sliding or fixed schedule with its RDO phases, set your tour of duty, and apply it to today, the future or the whole calendar.',
        list: ['Preset port rotations', 'Custom rotations: 8-hour standard sliding, AWS 10-hour and more', 'Tour of duty with morning, swing or overnight shifts'],
    },
    {
        img: 'pay-table', eyebrow: 'Pay & profile', title: 'Built on the official pay tables.',
        text: 'Set your field office, port of entry, grade and step, and FedLog resolves your OPM locality table, locality percentage and hourly rate. Promotions and step increases go in your career timeline.',
        list: ['OPM pay tables with locality adjustment', 'LEO pay schedules', 'Career timeline for promotions, steps and transfers'],
        flip: true,
    },
];

const TOOLS = [
    ['swap', 'Swap Center', 'Browse mutual transfer requests, post your profile, and connect with other officers nationwide.', '#4f8cff', true],
    ['chart', 'Port Comparison', 'Compare base salaries, locality rate adjustments and premium pay cap projections across Ports of Entry.', '#e0b84a', false],
    ['contacts', 'Directory', 'Phone numbers, operational hours and physical addresses of all Ports of Entry and Field Offices.', '#4ade80', false],
    ['book', 'Literature', 'A digital pocket field guide compiled from official sources for rapid reference on immigration laws, admissibility and regulations.', '#b48cff', false],
    ['retire', 'Retirement', 'LEO pension estimates, TSP withdrawal rules, FERS supplements and retirement agency directories.', '#5fe0ff', false],
    ['team', 'Teammates', 'See the daily shifts, rotations, RDOs and leave status of the colleagues at your port who use FedLog.', '#ff6fb0', true],
    ['medic', 'Officer Safety & Medical', 'Tactical trauma protocols (M.A.R.C.H.), CPR pulse, CDC pet screener, port health stations with GPS and DOL OWCP injury claims.', '#f87171', false],
    ['heart', 'Benefits & Health', 'Compare federal health plans side by side, analyze dental and vision coverage, estimate family costs and FEHB retirement rules.', '#a78bfa', false],
    ['flame', 'HazMat & Chemical Response', 'ERG 2024, a camera placard and UN scanner, the chemical database, isolation distances and road and rail tanker shapes.', '#ff7a1a', false],
];

const PRO = [
    ['Swap Center & Port Comparison', 'Post trades in real time and compare ports side by side.'],
    ['Teammates & Directory', 'Your colleagues’ schedules and every station’s contacts.'],
    ['Earnings & premium pay cap tracker', 'Rates, differentials and overrides, so you do not work past the cap.'],
    ['Literature & Retirement', 'Handbook search, retirement estimates and leave payouts.'],
    ['Custom rotations & premium views', 'Saved rotations plus the Pay Period, Payroll and Fiscal calendars.'],
];

const GALLERY = [
    ['dashboard', 'Dashboard'], ['calendar', 'Calendar'], ['rotation', 'Rotation Manager'], ['tools', 'Tools'],
    ['tools-2', 'Safety, benefits and HazMat'], ['pay-table', 'OPM pay steps'], ['settings', 'Profile & pay settings'], ['splash', 'FedLog'],
];

const body = `
<main class="product" style="--c:#e0b84a;--c2:#4f8cff">
<section class="p-hero">
    <div class="bg"></div>
    <div class="wrap">
        <div>
            <div class="who"><img src="${app.icon}" alt="FedLog icon"><div><b style="font-size:17px">FedLog</b><small>Secure Duty &amp; Premium Tracker</small></div></div>
            <h1>Your duty. Your pay. <span class="hot" style="background:linear-gradient(135deg,#f7d774,#e0b84a 55%,#c9922e);-webkit-background-clip:text;background-clip:text">Your port.</span></h1>
            <p class="lead">FedLog is the shift and pay companion for federal officers at the Ports of Entry. Track your premium pay cap, plan your rotation, see what every day pays and keep the tools you use on duty in one secure app.</p>
            <div class="badges">
                <span class="hot" style="color:#1a1405">Beta on TestFlight</span><span>iPhone</span><span>OPM pay tables</span><span>No account needed</span><span>Verified community</span>
            </div>
            <div class="cta-row" style="margin-top:24px">
                ${primaryButton}
                <a class="btn btn-ghost" href="#tools">Explore the tools</a>
            </div>
            <p class="note">${APP_STORE ? 'Free download with a 15-day free trial of FedLog Pro.' : 'FedLog is in beta testing and coming soon to the App Store. Officers can ask to join the beta.'}</p>
        </div>
        <div class="devices" aria-hidden="true">
            ${phone('calendar', '', 'back')}
            ${phone('dashboard', '', 'front')}
        </div>
    </div>
    <div class="wrap" style="display:block">
        <div class="p-stats">${STATS.map(([n, t]) => `<div><b>${n}</b><span>${t}</span></div>`).join('')}</div>
    </div>
</section>

<section id="features">
    <div class="wrap">
        ${BLOCKS.map((b) => `
        <div class="split-feature reveal${b.flip ? ' flip' : ''}">
            <div>
                <span class="eyebrow">${esc(b.eyebrow)}</span>
                <h3>${esc(b.title)}</h3>
                <p class="lead">${esc(b.text)}</p>
                <ul class="checks">${b.list.map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
            </div>
            ${phone(b.img, b.eyebrow)}
        </div>`).join('')}
    </div>
</section>

<section id="tools" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head reveal">
            <div>
                <span class="eyebrow">FedLog utilities</span>
                <h2>Nine tools for the job.</h2>
                <p class="lead">Reference, community and safety tools built around the work at the Ports of Entry.</p>
            </div>
        </div>
        <div class="tools-grid">${TOOLS.map(([icon, name, text, color, verified]) => `
            <div class="tool reveal" style="--tc:${color}"><span class="ic">${ICONS[icon]}</span><span><b>${esc(name)}</b><p>${esc(text)}</p>${verified ? '<span class="lock">Verified officers only</span>' : ''}</span></div>`).join('')}
        </div>
    </div>
</section>

<section id="community" style="padding-top:10px">
    <div class="wrap">
        <div class="card reveal" style="display:grid;grid-template-columns:auto 1fr;gap:20px;align-items:center;padding:28px">
            <span style="width:64px;height:64px;border-radius:18px;display:grid;place-items:center;color:#e0b84a;background:rgba(224,184,74,.12);border:1px solid rgba(224,184,74,.3)">${ICONS.shield.replace('<svg', '<svg width="32" height="32"')}</span>
            <div>
                <span class="eyebrow">Verified community</span>
                <h3 style="font-size:22px;margin:6px 0 8px">Only officers in the Swap Center and Teammates.</h3>
                <p style="margin:0;color:var(--muted)">The community features need a FedLog account verified with an official <b style="color:var(--fg)">@dhs.gov</b> or <b style="color:var(--fg)">@cbp.dhs.gov</b> email address, with a code sent to that address. Everything else works on your iPhone without an account.</p>
            </div>
        </div>
    </div>
</section>

<section id="screens" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head"><div><span class="eyebrow">Screenshots</span><h2>A closer look</h2></div></div>
        <div class="shots phones">${GALLERY.map(([n, cap]) => `<span class="phone" data-zoom="${shot(n)}" data-caption="${esc(cap)}"><img src="${shot(n)}" alt="${esc(cap)}" loading="lazy"></span>`).join('')}</div>
    </div>
</section>

<section id="pricing">
    <div class="wrap">
        <div class="section-head reveal">
            <div><span class="eyebrow">FedLog Pro</span><h2>Try everything free for 15 days.</h2>
            <p class="lead">Then keep FedLog Pro with a monthly or yearly subscription, processed securely by the App Store.</p></div>
        </div>
        <div class="pricing">
            <div class="plan reveal">
                <span class="eyebrow">Plans</span>
                <div class="price">$4.99 <small>per month</small></div>
                <div class="price" style="font-size:30px;margin-top:0">$29.99 <small>per year</small></div>
                <p style="margin-top:10px">Start with the 15-day free trial. Subscriptions renew automatically until you cancel; manage or cancel anytime in Settings → [your name] → Subscriptions.</p>
                <div class="foot">US prices; they may vary by country.</div>
            </div>
            <div class="plan pro reveal">
                <span class="eyebrow">Included with Pro</span>
                <ul style="margin-top:12px">${PRO.map(([t, d]) => `<li><span><b style="color:var(--fg)">${esc(t)}</b><br><span style="color:var(--muted);font-size:13.8px">${esc(d)}</span></span></li>`).join('')}</ul>
                <div class="cta-row" style="justify-content:flex-start;margin-top:20px">${primaryButton}</div>
            </div>
        </div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap">
        <div class="disclaimer">${ICONS.diamond}<span>FedLog is an independent app by Danloud Labs LLC. It is not affiliated with, endorsed by or connected to U.S. Customs and Border Protection, the Department of Homeland Security or any government agency. Pay, leave and retirement figures are estimates for planning; your official earnings and leave statements are the final word.</span></div>
    </div>
</section>

<section>
    <div class="wrap duo">
        <div class="card">
            <span class="eyebrow">Beta</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Testing FedLog?</h3>
            <p style="color:var(--muted);margin:0 0 14px">Send feedback right from TestFlight: take a screenshot in FedLog and tap Share Beta Feedback. Or write to us.</p>
            <a class="btn btn-ghost btn-sm" href="/support#fedlog">FedLog support ${small(ICONS.arrow)}</a>
        </div>
        <div class="card">
            <span class="eyebrow">Privacy</span>
            <h3 style="font-size:22px;margin:8px 0 10px">Your data, protected</h3>
            <p style="color:var(--muted);margin:0 0 14px">Your schedule, pay and leave stay on your iPhone. Only what you choose to share in the Swap Center and Teammates goes to your FedLog account, and sharing is off until you turn it on.</p>
            <a class="btn btn-ghost btn-sm" href="/privacy">Privacy Policy ${small(ICONS.arrow)}</a>
        </div>
    </div>
</section>
</main>
<div class="lb" id="lb"><img alt=""></div>`;

const script = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const lb = document.getElementById('lb'), img = lb.querySelector('img');
    document.addEventListener('click', (e) => {
        const t = e.target.closest('[data-zoom]');
        if (t) { img.src = t.dataset.zoom; img.alt = t.dataset.caption || ''; lb.classList.add('open'); return; }
        if (lb.classList.contains('open')) lb.classList.remove('open');
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('open'); });
});
</script>`;

export const htmlFedLog = sitePage({
    title: 'FedLog · Secure Duty & Premium Tracker',
    description: 'FedLog for iPhone: premium pay cap tracking, shift rotations, daily earnings, OPM pay tables and nine officer tools for the Ports of Entry. Now in beta.',
    path: '/ios/fedlog',
    ogImage: shot('dashboard'),
    icon: app.icon,
    active: 'apps',
    back: { href: '/ios-apps', label: 'iOS Apps' },
    head: script,
    body,
});
