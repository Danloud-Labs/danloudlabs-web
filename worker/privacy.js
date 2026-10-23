// =====================================================================================
// Danloud Labs website: Privacy Policy  ->  /privacy  (also /privacy-policy, /privacy/hazmat)
// The policy text is legal text: change it only on purpose, and update LAST_UPDATED.
// =====================================================================================

import { SITE, SITE_APPS } from './site-data.js';
import { ICONS, sitePage } from './site-layout.js';

const EFFECTIVE = 'August 24, 2026';
const LAST_UPDATED = 'October 17, 2026';

const app = (slug) => SITE_APPS.find((a) => a.slug === slug);

// Apps covered, in the order the policy lists them.
const COVERED = [
    ['hazmat-scanner', '<strong>HazMat Scanner</strong>'],
    ['fedlog', '<strong>FedLog</strong>'],
    ['aura-calendar', '<strong>AURA Calendar</strong> (iPhone, iPad and Apple TV)'],
    ['wardecks', '<strong>WarDecks: Leagues</strong>'],
];

const PERMISSIONS = [
    ['camera', 'Camera:', "Used for on-device scanning features (e.g., placard recognition). Images are processed locally using Apple's Vision framework and are never uploaded, stored, or shared."],
    ['photo', 'Photo Library:', 'Used to scan from saved images, or to add photos to your own notes and journal entries. Selected images stay on your device.'],
    ['calendar', 'Calendars:', 'Used to show the events from the calendars you choose. In AURA Calendar you can also create and edit events in a calendar you pick. Your events stay in your calendars and are never sent to us.'],
    ['check', 'Reminders:', 'In AURA Calendar, used to keep your tasks in step with the Reminders lists you choose.'],
    ['pin', 'Location:', 'In AURA Calendar, used to show the local weather for weather themes and widgets, and for location-based reminders that alert you when you arrive at or leave a place. "Always" access is only needed so a location reminder can alert you while the app is closed. Your location is never sent to us.'],
    ['mic', 'Microphone:', 'In AURA Calendar, used only to record the voice memos you add to your journal entries. Recordings stay on your device and in your own iCloud.'],
    ['bell', 'Notifications and Alarms:', 'Used to alert you about your events and tasks, and in AURA Calendar to sound alarms for tasks you mark as urgent.'],
    ['wave', 'Siri and Shortcuts:', "In AURA Calendar, lets you add events and tasks or ask for today's agenda by voice. Requests are handled by Apple under Apple's privacy policy."],
];

const SECTIONS = [
    ['data-collection', 'Data Collection', `
        <p>Our applications are designed with a privacy-first approach. They do not collect, sell, or share any personal data, and we do not receive any information about you or how you use our apps. There are no accounts to create.</p>
        <h3>Information We Do NOT Collect</h3>
        <ul>
            <li>Names, email addresses, or contact information (unless you choose to write to us for support)</li>
            <li>Location data (when an app uses your location, it is used on your device and is never sent to us)</li>
            <li>Your calendar events, reminders, tasks, notes, journal entries, or voice memos</li>
            <li>Browsing or search history</li>
            <li>Device identifiers for tracking purposes</li>
            <li>Photos, videos, or camera data beyond on-device processing</li>
            <li>Health, financial, or biometric data</li>
            <li>Usage analytics or crash reports</li>
        </ul>`],
    ['permissions', 'Device Permissions', `
        <p>Some of our apps may ask for the following permissions. Each one is optional: if you decline, the rest of the app keeps working. Everything they give access to is used on your device and is never sent to us.</p>
        <ul class="perms">
            ${PERMISSIONS.map(([icon, name, text]) => `<li><span class="ic">${ICONS[icon]}</span><span><strong>${name}</strong> ${text}</span></li>`).join('\n            ')}
        </ul>`],
    ['third-parties', 'Apple Services and Third Parties', `
        <p>Our apps do not include any third-party analytics SDKs, advertising frameworks, crash reporting tools, or tracking technologies. We do not share any data with third parties.</p>
        <p>Some features use services provided by Apple, which handles that information under <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener">Apple's Privacy Policy</a>:</p>
        <ul>
            <li><strong>Weather (Apple WeatherKit):</strong> to show the weather, AURA Calendar sends your approximate location to Apple's weather service. Danloud Labs does not receive it.</li>
            <li><strong>iCloud:</strong> see <a href="#data-storage">Data Storage</a> below.</li>
            <li><strong>In-App Purchases:</strong> purchases are processed by Apple through the App Store. We never see your payment details, name, or Apple Account.</li>
        </ul>`],
    ['data-storage', 'Data Storage', `
        <p>Any data you create in our apps (such as events, tasks, notes, journal entries, preferences, or settings) is stored locally on your device. We do not operate servers that receive or store user data.</p>
        <p>Where cloud-based features exist (such as iCloud sync in AURA Calendar), data is transmitted directly between your devices and your own iCloud account, under Apple's own privacy policy. Danloud Labs LLC does not have access to this data.</p>
        <p>AURA Calendar downloads themes (artwork and music) from our content server. These downloads only request the theme files and do not include any personal information.</p>`],
    ['children', "Children's Privacy", `
        <p>Our apps do not knowingly collect personal information from children under the age of 13. Our apps do not contain ads, in-app social features, or any mechanism to collect personal data from any user.</p>`],
    ['security', 'Security', `
        <p>Since our apps do not collect or transmit personal data to us, there is no personal data on our side that could be exposed. Data on your device benefits from the security protections built into iOS, iPadOS and tvOS, including device encryption and app sandboxing, and data in iCloud is protected by Apple.</p>`],
    ['your-rights', 'Your Rights', `
        <p>Since we do not collect personal data, there is no personal data held by us to access, correct, or delete. You can delete your own data at any time by deleting it in the app, deleting the app, or removing the app's data from your iCloud settings. If you have any concerns, you may contact us at any time.</p>`],
    ['changes', 'Changes to This Policy', `
        <p>We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Continued use of our apps after changes constitutes acceptance of the updated policy.</p>`],
    ['contact', 'Contact Us', `
        <p>If you have any questions about this Privacy Policy or our apps, please contact us:</p>
        <ul>
            <li><strong>Email:</strong> <a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><strong>Developer:</strong> Danloud Labs LLC</li>
        </ul>`],
];

const GLANCE = [
    ['user', 'No accounts', 'There are no accounts to create.'],
    ['eye', 'No tracking', 'No analytics, ads or crash reporting tools.'],
    ['lock', 'Nothing sold or shared', 'We do not collect, sell, or share personal data.'],
    ['device', 'Stays with you', 'Your data stays on your device and in your own iCloud.'],
];

const body = `
<main>
<section class="page-head">
    <div class="wrap">
        <span class="eyebrow">Legal</span>
        <h1>Privacy Policy</h1>
        <p class="lead">Your privacy is important to us. This policy explains what data our apps collect, how it is used, and your rights.</p>
        <div class="dates"><span>Effective Date: <b>${EFFECTIVE}</b></span><span>Last Updated: <b>${LAST_UPDATED}</b></span></div>
    </div>
</section>

<section style="padding-top:34px">
    <div class="wrap legal">
        <nav class="toc" aria-label="Sections">
            <b>On this page</b>
            ${SECTIONS.map(([id, title], i) => `<a href="#${id}">${i + 1}. ${title}</a>`).join('\n            ')}
        </nav>

        <div class="legal-doc">
            <div class="glance">
                ${GLANCE.map(([icon, title, text]) => `<div class="card"><div class="ic">${ICONS[icon]}</div><b>${title}</b><span>${text}</span></div>`).join('\n                ')}
            </div>

            <div class="card block">
                <p>Danloud Labs LLC ("we", "us", "our") develops and publishes applications for iPhone, iPad and Apple TV. This Privacy Policy applies to all applications published by Danloud Labs LLC, including but not limited to:</p>
                <ul class="covered">
                    ${COVERED.map(([slug, label]) => `<li><img src="${app(slug).icon}" alt="">${label}</li>`).join('\n                    ')}
                </ul>
            </div>

            ${SECTIONS.map(([id, title, html], i) => `
            <article class="card block" id="${id}">
                <h2><span class="n">${i + 1}</span>${title}</h2>
                ${html}
            </article>`).join('')}
        </div>
    </div>
</section>
</main>`;

// Highlights the section being read in the side index.
const tocScript = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const links = [...document.querySelectorAll('.toc a')];
    if (!('IntersectionObserver' in window) || !links.length) return;
    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle('on', a === byId.get(e.target.id)));
    }), { rootMargin: '-20% 0px -70% 0px' });
    byId.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
});
</script>`;

export const htmlPrivacy = sitePage({
    title: 'Privacy Policy · Danloud Labs LLC',
    description: 'Privacy Policy for the apps published by Danloud Labs LLC: HazMat Scanner, FedLog, AURA Calendar and WarDecks: Leagues. No accounts, no tracking, no personal data collected.',
    path: '/privacy',
    active: 'privacy',
    back: { href: '/', label: 'Home' },
    head: tocScript,
    body,
});
