// =====================================================================================
// Danloud Labs website: Support Center  ->  /support
// Search, per-app FAQ, troubleshooting, requirements and an email assistant that opens
// the visitor's own mail app with everything filled in (nothing is sent by this page).
// Answers describe the apps as they ship; update them when a screen or price changes.
// =====================================================================================

import { SITE, SITE_APPS } from './site-data.js';
import { ICONS, esc, sitePage } from './site-layout.js';

const app = (slug) => SITE_APPS.find((a) => a.slug === slug);
const path = (s) => `<span class="path">${s}</span>`;

// Where each app stands; drives the badges, the FAQ filters and the email assistant.
const SUPPORT_APPS = [
    { key: 'aura', slug: 'aura-calendar', status: 'On the App Store', st: '#4ade80' },
    { key: 'hazmat', slug: 'hazmat-scanner', status: 'On the App Store', st: '#4ade80' },
    { key: 'fedlog', slug: 'fedlog', status: 'Beta on TestFlight', st: '#fbbf24' },
    { key: 'wardecks', slug: 'wardecks', status: 'In development', st: '#a49cae' },
];

// ---------- FAQ ----------
// topic: purchases | setup | troubleshooting | privacy (the quick topic cards filter by it)
const FAQ = [
    // AURA Calendar
    { app: 'aura', id: 'aura-buy', topic: 'purchases', q: 'How do I buy a theme?', a: `
        <p>Open the <b>Theme Shop</b>, pick a theme and tap its price. The purchase is handled by Apple and is a one-time payment: there is no subscription.</p>
        <p>AURA Calendar is free to download and comes with six Included themes. Premium themes are $1.99, Daylight, Dynamic and Pulse themes are $3.99, and Smart themes are $5.99 (US prices). Sponsored themes are free.</p>` },
    { app: 'aura', id: 'aura-restore', topic: 'purchases', q: 'I bought a theme but it shows the price again, or My Themes is empty', a: `
        <ol>
            <li>Open the <b>Theme Shop</b> and tap <b>Restore Purchases</b> (at the top of the Theme Shop, and again at the end of the list).</li>
            <li>Make sure you are signed in with the same Apple Account you bought the theme with: ${path('Settings → [your name] → Media &amp; Purchases')}.</li>
            <li>Keep the internet on while it restores, then close and reopen AURA Calendar.</li>
        </ol>
        <p>Your purchase is never lost: it belongs to your Apple Account. If it still does not appear, write to us with the theme name.</p>` },
    { app: 'aura', id: 'aura-devices', topic: 'purchases', q: 'Do my themes work on my iPad and Apple TV?', a: `
        <p>Yes. Buy once and the theme is yours on iPhone, iPad and Apple TV with the same Apple Account. On a new device, open the Theme Shop and tap <b>Restore Purchases</b>. On Apple TV, Restore Purchases is in Aura TV's Settings.</p>` },
    { app: 'aura', id: 'aura-download', topic: 'troubleshooting', q: 'A theme will not download or is missing its art', a: `
        <p>Store themes download their artwork and music from our content server, so they need an internet connection the first time. Try again on Wi-Fi, keep the app open until the download finishes, and make sure your device has free storage. The six Included themes live inside the app and work offline.</p>` },
    { app: 'aura', id: 'aura-weather', topic: 'troubleshooting', q: 'The weather does not show, or my Smart theme does not change with the weather', a: `
        <ol>
            <li>Allow location: ${path('Settings → Privacy &amp; Security → Location Services → Aura Calendar')} and choose <b>While Using the App</b> or <b>Always</b>.</li>
            <li>In AURA Calendar, open ${path('Settings → Weather &amp; Widget')} and check that <b>Override Local Weather</b> is off. When it is on, the theme shows the weather you picked instead of the real one.</li>
            <li>Weather needs an internet connection. It is provided by  Weather.</li>
        </ol>` },
    { app: 'aura', id: 'aura-location', topic: 'troubleshooting', q: 'My location reminder does not alert me when the app is closed', a: `
        <p>A reminder that alerts you when you arrive at or leave a place needs <b>Always</b> location access, so it can work while AURA Calendar is closed. Turn on <b>Always Allow Location</b> in AURA Calendar's Settings, or choose <b>Always</b> in ${path('Settings → Privacy &amp; Security → Location Services → Aura Calendar')}. Also check that notifications are allowed for AURA Calendar.</p>` },
    { app: 'aura', id: 'aura-alarm', topic: 'troubleshooting', q: 'My urgent task did not ring', a: `
        <p>An urgent alarm rings like a Clock alarm, even when your phone is silenced or in a Focus. For it to work:</p>
        <ul>
            <li>Your iPhone needs iOS 26.1 or later.</li>
            <li>The task needs a date <b>and</b> a time in the future.</li>
            <li>Turn on <b>Urgent alarm</b> in the task (it appears once the task has a time).</li>
            <li>Allow alarms for AURA Calendar when iOS asks.</li>
        </ul>` },
    { app: 'aura', id: 'aura-sync', topic: 'setup', q: 'How does iCloud Sync work?', a: `
        <p>Turn it on in ${path('Settings → Sync → iCloud Sync')}. Your own events and tasks travel between your devices through your private iCloud, and <b>Sync Now</b> syncs right away.</p>
        <p>Anything tied to an Apple calendar or a Reminders list is left alone, because Apple already syncs those. Photos and voice memos stay on the device they were added to for now. You need to be signed in to iCloud on each device.</p>` },
    { app: 'aura', id: 'aura-calendars', topic: 'setup', q: 'How do I connect my calendars and Apple Reminders?', a: `
        <p>Open AURA Calendar's Settings and use <b>Connected Calendars</b> to pick which calendars to show, and <b>Apple Reminders</b> to keep your tasks in step with the Reminders lists you choose. If you said no when iOS asked, turn access back on in ${path('Settings → Privacy &amp; Security → Calendars')} (or Reminders) → Aura Calendar.</p>` },
    { app: 'aura', id: 'aura-sound', topic: 'setup', q: 'How do I turn off the music or the sound effects?', a: `
        <p>Open ${path('Settings → Ambience &amp; Sounds')} in AURA Calendar. <b>Ambient Music</b> turns the theme music on or off and sets its volume, and <b>App Sound Effects</b> turns the app's sound effects on or off.</p>` },
    { app: 'aura', id: 'aura-motion', topic: 'setup', q: 'The particles or animations are too busy', a: `
        <p>Lower <b>Particle opacity</b> in AURA Calendar's Settings. AURA Calendar also follows ${path('Settings → Accessibility → Motion → Reduce Motion')}: with it on, animated scenes and pulsing light become softer.</p>` },
    { app: 'aura', id: 'aura-frame', topic: 'setup', q: 'How do I use landscape and frame mode?', a: `
        <p>Turn your iPhone or iPad sideways for the wide landscape view. To leave it on your desk as a living picture frame, turn on <b>Keep Screen Awake</b> in Settings, so the display stays on while the app is open (it uses more battery).</p>` },
    { app: 'aura', id: 'aura-widgets', topic: 'setup', q: 'How do I add the widgets?', a: `
        <p>Touch and hold an empty spot on your Home Screen, tap <b>Edit → Add Widget</b>, search for <b>Aura Calendar</b> and pick a size. Lock Screen widgets are added from the Lock Screen's <b>Customize</b> screen. Widgets use your active theme and the local weather.</p>` },
    { app: 'aura', id: 'aura-siri', topic: 'setup', q: 'What can I ask Siri?', a: `
        <p>Try “Add a task to Aura Calendar”, “Add an event to Aura Calendar”, “Mark a task done in Aura Calendar”, “What's due today in Aura Calendar” or “What's on my Aura Calendar today”. They also appear in the Shortcuts app.</p>` },
    // AURA Calendar: Aura Cycle and Aura Sleep (1.1)
    { app: 'aura', id: 'aura-health-on', topic: 'setup', q: 'How do I turn on Aura Cycle and Aura Sleep?', a: `
        <p>Aura Cycle (period and cycle tracking) and Aura Sleep (your sleep on the calendar) are free and come with AURA Calendar 1.1 and later. Both are off until you turn them on.</p>
        <ol>
            <li>Open AURA Calendar's Settings and turn on <b>Aura Cycle</b> or <b>Aura Sleep</b>.</li>
            <li>When iOS asks, allow AURA Calendar to read and write the Apple Health categories it lists. Each one is asked for separately.</li>
            <li>In the Planner, the heart (Aura Cycle) and the moon (Aura Sleep) next to the Smart Lists button now open the log for the selected day.</li>
        </ol>
        <p>Not sure yet? Tap the heart or the moon while they are off, or open <b>Aura Cycle Guide</b> or <b>Aura Sleep Guide</b> in Settings, for a short tour.</p>` },
    { app: 'aura', id: 'aura-cycle-log', topic: 'setup', q: 'How do I log my period, symptoms or mood?', a: `
        <p>Tap the heart in the Planner, or press and hold a day in the month. The log has tabs for <b>Period</b> (flow and color), <b>Symptoms</b>, <b>Mood</b>, <b>Intimacy</b> and <b>Notes</b>. Tap <b>Save</b> to save it to Apple Health, or <b>Clear day</b> to remove what you logged that day.</p>
        <p>On the month, a solid ring marks a logged period, a dashed ring an estimated next period, and a turquoise tint the estimated fertile window. Estimates come only from your own history: they are not birth control, and Aura Cycle is not a medical device.</p>` },
    { app: 'aura', id: 'aura-sleep-log', topic: 'setup', q: 'Where does Aura Sleep get my sleep?', a: `
        <p>From Apple Health. With an Apple Watch that tracks sleep, the hours, bedtime, wake-up and stages (Deep, Core, REM, Awake) appear on their own each morning. Sleep from your iPhone's Sleep schedule or another sleep app works too.</p>
        <p>No watch? Tap the moon in the Planner, turn on <b>Enter hours by hand</b> and set your bedtime and wake-up; they are saved to Apple Health as sleep. You can also note how you woke up and what happened last night.</p>
        <p>Set your sleep goal in ${path('Settings → Aura Sleep → Sleep goal')}. The month then shows a thin bar on each day with how close you got. <b>Morning check-in</b> sends a gentle reminder at 9 AM.</p>` },
    { app: 'aura', id: 'aura-health-access', topic: 'troubleshooting', q: 'Aura Cycle or Aura Sleep could not save, or shows no data', a: `
        <p>AURA Calendar needs access to Apple Health. Open the <b>Health</b> app, tap your picture, then ${path('Apps → Aura Calendar')} and turn on the categories (or <b>Turn On All</b>). Then try again.</p>
        <p>If Aura Sleep shows nothing for a night, check that the Health app has sleep for that night: Apple Watch sleep tracking needs the watch worn in bed with a Sleep schedule or Sleep Focus on. A night belongs to the day you wake up.</p>` },
    { app: 'aura', id: 'aura-discreet', topic: 'privacy', q: 'Can I keep Aura Cycle private from people who see my screen?', a: `
        <p>Yes. In ${path('Settings → Aura Cycle')}, <b>Discreet mode</b> shows neutral dots and the word "Personal" instead of drops and hearts, and <b>Lock with Face ID</b> asks for Face ID before the log opens. Intimacy is never shown on widgets or the lock screen.</p>` },
    { app: 'aura', id: 'aura-health-data', topic: 'privacy', q: 'Where is my cycle and sleep data stored? Can you see it?', a: `
        <p>No, we never see it. What you log is saved in Apple Health on your device. The few details Health has no place for (like period color, notes and how you woke up) stay only on that iPhone, encrypted, and are not synced to iCloud or included in backups. Nothing is sent to us, used for ads or shared. Details are in our <a href="/privacy#aura-health">Privacy Policy</a>.</p>
        <p>Turning Aura Cycle or Aura Sleep off does not delete anything. To delete, use <b>Clear day</b> or <b>Clear</b> in the log, or delete the data in the Health app.</p>` },

    // HazMat Scanner
    { app: 'hazmat', id: 'hazmat-free', topic: 'purchases', q: 'What is free in HazMat Scanner?', a: `
        <p>The <b>ERG Guides</b> are free for everyone, forever: the complete 392-page ERG 2024 guidebook and all 64 emergency response guides, with or without Pro.</p>` },
    { app: 'hazmat', id: 'hazmat-pro', topic: 'purchases', q: 'What does Lifetime Access include, and is it a subscription?', a: `
        <p>Lifetime Access unlocks every tool with a single purchase:</p>
        <ul>
            <li>Real-time Vision AI camera placard scanner</li>
            <li>Full 2,767 chemical database lookup and hazard filters</li>
            <li>30 official DOT placards and 9 tanker and railcar profiles</li>
        </ul>
        <p>It is a one-time payment ($14.99 in the US): no subscription, no auto-renewal and no account required.</p>` },
    { app: 'hazmat', id: 'hazmat-trial', topic: 'purchases', q: 'How does the 15-day free trial work?', a: `
        <p>Start it from the welcome screen or from any locked tab. It unlocks everything for 15 days with no payment and no card, and nothing renews automatically. The trial starts only when you tap <b>Start 15-Day Free Trial</b>, and deleting and reinstalling the app does not start a new one.</p>` },
    { app: 'hazmat', id: 'hazmat-legacy', topic: 'purchases', q: 'I bought HazMat Scanner when it was a paid app. Do I have to pay again?', a: `
        <p>No. If you downloaded HazMat Scanner when it was a paid app, you keep full access for free, permanently. It is recognized automatically from your original download with the same Apple Account. If the tools look locked, open the Pro screen and tap <b>Restore Purchases</b>.</p>` },
    { app: 'hazmat', id: 'hazmat-restore', topic: 'purchases', q: 'How do I restore Lifetime Access on a new device?', a: `
        <p>Sign in with the same Apple Account, open any locked tab to reach the Pro screen and tap <b>Restore Purchases</b>.</p>` },
    { app: 'hazmat', id: 'hazmat-offline', topic: 'privacy', q: 'Does it work without a connection?', a: `
        <p>Yes. Everything runs on your device: 100 percent offline, no account, no network and no tracking. The scanner uses Apple's Vision framework on the device, and images are never uploaded.</p>` },
    { app: 'hazmat', id: 'hazmat-scan', topic: 'troubleshooting', q: 'The scanner does not read a placard', a: `
        <ul>
            <li>Get good light, hold steady and fill the frame with the orange UN panel or the hazard diamond.</li>
            <li>Type the number instead: the Scanner tab has a <b>Direct 4-Digit UN Number Lookup</b>.</li>
            <li>Scan from a saved photo (it needs Photo Library access).</li>
            <li>If a number is not found, check the 4 digits: the lookup covers the ERG 2024 Yellow Section.</li>
        </ul>` },
    { app: 'hazmat', id: 'hazmat-camera', topic: 'troubleshooting', q: 'The camera shows black or asks for permission', a: `
        <p>Turn on camera access in ${path('Settings → Privacy &amp; Security → Camera → HazMat Scanner')}, then reopen the app. Photo Library access, for scanning saved images, is in ${path('Settings → Privacy &amp; Security → Photos')}.</p>` },
    { app: 'hazmat', id: 'hazmat-db', topic: 'troubleshooting', q: 'It says “Chemical Database Unavailable”', a: `
        <p>The built-in database could not be loaded. Delete HazMat Scanner and install it again from the App Store; your Lifetime Access comes back with <b>Restore Purchases</b>.</p>` },
    { app: 'hazmat', id: 'hazmat-use', topic: 'privacy', q: 'Can I rely on it in an emergency?', a: `
        <p>HazMat Scanner is a reference tool for trained personnel. Always follow your agency protocols and the official DOT Emergency Response Guidebook.</p>` },

    // FedLog (beta)
    { app: 'fedlog', id: 'fedlog-beta', topic: 'setup', q: 'How do I send feedback about the FedLog beta?', a: `
        <p>FedLog is in beta testing on TestFlight. The fastest way to report something is from TestFlight itself: take a screenshot while using FedLog and tap <b>Share Beta Feedback</b>, or open the TestFlight app, choose FedLog and tap <b>Send Beta Feedback</b>. You can also write to us with the email assistant below.</p>` },

    // General
    { app: 'general', id: 'refunds', topic: 'purchases', q: 'How do I ask for a refund?', a: `
        <p>Purchases are processed by Apple, so refunds are requested from Apple: go to <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a>, sign in with your Apple Account, find the purchase and choose <b>Request a refund</b>. We never see your payment details.</p>` },
    { app: 'general', id: 'cancel', topic: 'purchases', q: 'Do your apps have subscriptions I need to cancel?', a: `
        <p>AURA Calendar themes and HazMat Scanner's Lifetime Access are one-time purchases: nothing renews and there is nothing to cancel. To review any subscriptions on your Apple Account, open ${path('Settings → [your name] → Subscriptions')}.</p>` },
    { app: 'general', id: 'data', topic: 'privacy', q: 'Do you collect my data?', a: `
        <p>No. Our apps have no accounts, no analytics and no ads. What you create stays on your device and, where an app syncs, in your own iCloud. Read the full <a href="/privacy">Privacy Policy</a>.</p>` },
    { app: 'general', id: 'update', topic: 'troubleshooting', q: 'Something is not working right. What should I try first?', a: `
        <ol>
            <li>Update the app from the App Store (open the App Store, tap your profile picture and pull down to refresh updates).</li>
            <li>Close the app fully (swipe it away in the App Switcher) and open it again.</li>
            <li>Restart your device and check that iOS is up to date in ${path('Settings → General → Software Update')}.</li>
            <li>Check the app's permissions in ${path('Settings → [app name]')}.</li>
            <li>Still stuck? Write to us with the email assistant below.</li>
        </ol>` },
];

const TOPICS = [
    ['bag', 'Purchases & restore', 'Buying, restoring and refunds', 'purchases'],
    ['wrench', 'Fix a problem', 'Step-by-step troubleshooting', 'troubleshooting'],
    ['sync', 'Setup & sync', 'iCloud, calendars, widgets, Siri', 'setup'],
    ['shield', 'Privacy & safety', 'Your data and offline use', 'privacy'],
];

// ---------- Rendering ----------
const groupMeta = (key) => {
    if (key === 'general') return { name: 'General', sub: 'Purchases, refunds and privacy for all our apps', icon: null, color: '#b48cff' };
    const s = SUPPORT_APPS.find((x) => x.key === key);
    const a = app(s.slug);
    return { name: a.name, sub: s.status, icon: a.icon, color: a.color };
};

const faqGroups = ['aura', 'hazmat', 'fedlog', 'general'].map((key) => {
    const g = groupMeta(key);
    const items = FAQ.filter((f) => f.app === key);
    const head = g.icon ? `<img src="${g.icon}" alt="">` : `<span class="ic" style="width:40px;height:40px;border-radius:11px;display:grid;place-items:center;color:var(--a2);background:rgba(180,140,255,.12);border:1px solid rgba(180,140,255,.25)">${ICONS.help.replace('<svg', '<svg width="22" height="22"')}</span>`;
    return `
    <div class="faq-group" id="${key}" data-group="${key}" style="--c:${g.color}">
        <header>${head}<div><h3>${esc(g.name)}</h3><span>${esc(g.sub)}</span></div></header>
        <div class="faq">
            ${items.map((f) => `
            <details id="${f.id}" data-app="${f.app}" data-topic="${f.topic}">
                <summary><span class="q">${esc(f.q)}</span></summary>
                <div class="ans">${f.a}</div>
            </details>`).join('')}
        </div>
    </div>`;
}).join('');

const appPicks = SUPPORT_APPS.map((s) => {
    const a = app(s.slug);
    return `<button class="pick" type="button" data-pick="${s.key}" style="--c:${a.color};--st:${s.st}"><img src="${a.icon}" alt=""><span><b>${esc(a.name)}</b><small>${esc(s.status)}</small></span></button>`;
}).join('');

const filterBar = `
    <div class="faq-bar" id="faq-bar">
        <button class="txt on" type="button" data-filter="*">All</button>
        ${['aura', 'hazmat', 'fedlog'].map((k) => { const g = groupMeta(k); return `<button type="button" data-filter="${k}" style="--c:${g.color}"><img src="${g.icon}" alt="">${esc(g.name)}</button>`; }).join('')}
        <button class="txt" type="button" data-filter="general">General</button>
        <span class="count" id="faq-count"></span>
    </div>`;

const topicCards = TOPICS.map(([icon, title, text, key]) => `
    <button class="topic" type="button" data-topic-pick="${key}"><span class="ic">${ICONS[icon]}</span><b>${esc(title)}</b><span>${esc(text)}</span></button>`).join('');

const appOptions = SUPPORT_APPS.map((s) => `<option value="${esc(app(s.slug).name)}">${esc(app(s.slug).name)}</option>`).join('');

const body = `
<main>
<section class="help-hero">
    <div class="glow"></div>
    <div class="wrap">
        <span class="eyebrow">Support Center</span>
        <h1>How can we help?</h1>
        <p class="lead">Answers for AURA Calendar, HazMat Scanner and our other apps, and a direct line to the people who build them.</p>
        <div class="search">
            ${ICONS.search}
            <input id="faq-search" type="search" placeholder="Search: restore purchases, weather, scanner, refund…" autocomplete="off" aria-label="Search the help articles">
        </div>
        <div class="quick">
            <button type="button" data-q="restore">Restore purchases</button>
            <button type="button" data-q="refund">Refunds</button>
            <button type="button" data-q="weather">Weather</button>
            <button type="button" data-q="iCloud">iCloud Sync</button>
            <button type="button" data-q="scanner">Placard scanner</button>
            <button type="button" data-q="trial">Free trial</button>
        </div>
    </div>
</section>

<section style="padding-top:20px;padding-bottom:30px">
    <div class="wrap">
        <div class="app-pick">${appPicks}</div>
    </div>
</section>

<section style="padding-top:10px;padding-bottom:40px">
    <div class="wrap">
        <div class="topics">${topicCards}</div>
    </div>
</section>

<section id="faq" style="padding-top:20px">
    <div class="wrap">
        <div class="section-head" style="margin-bottom:20px">
            <div>
                <span class="eyebrow">Help articles</span>
                <h2>Frequently asked questions</h2>
            </div>
        </div>
        ${filterBar}
        ${faqGroups}
        <div class="no-results card" id="no-results">No articles match your search. Try other words, or <a href="#contact" style="color:var(--a1)">write to us</a>.</div>
    </div>
</section>

<section style="padding-top:10px">
    <div class="wrap duo">
        <div class="card">
            <span class="eyebrow">Requirements</span>
            <h3 style="font-size:22px;margin:8px 0 14px">What you need</h3>
            <table class="req">
                <tr><th>App</th><th>Works on</th></tr>
                <tr><td>AURA Calendar</td><td>iPhone and iPad with iOS 18 or later; Apple TV with tvOS 26 or later</td></tr>
                <tr><td>HazMat Scanner</td><td>iOS 17 or later</td></tr>
            </table>
        </div>
        <div class="card">
            <span class="eyebrow">Coming next</span>
            <h3 style="font-size:22px;margin:8px 0 14px">In the lab</h3>
            ${['fedlog', 'wardecks'].map((k) => { const s = SUPPORT_APPS.find((x) => x.key === k); const a = app(s.slug); return `
            <div class="status-card" style="margin-bottom:14px">
                <img src="${a.icon}" alt="">
                <div><b>${esc(a.name)}</b> <span class="chip" style="white-space:nowrap;font-size:12px;padding:3px 9px;border-radius:999px;border:1px solid var(--line2);color:${s.st};margin-left:6px">${esc(s.status)}</span>
                <p>${k === 'fedlog' ? 'Being tested with a group of beta testers before its App Store release.' : 'In development. Support opens when it reaches the App Store.'}</p></div>
            </div>`; }).join('')}
        </div>
    </div>
</section>

<section id="contact">
    <div class="wrap">
        <div class="composer">
            <div class="side">
                <span class="eyebrow">Contact us</span>
                <h2>Still need help?</h2>
                <p class="lead" style="font-size:16px">Tell us what is going on and we will open an email for you with all the details we need to help, already written. You just press send.</p>
                <ol class="steps" style="margin-top:22px">
                    <li><span><b>Choose the app and the topic.</b> We fill in your device and system version for you.</span></li>
                    <li><span><b>Describe what happened.</b> Steps to reproduce and screenshots help a lot.</span></li>
                    <li><span><b>Send it from your mail app</b> to ${SITE.email}.</span></li>
                </ol>
                <p style="color:var(--dim);font-size:13px;margin-top:22px">Business inquiries are welcome at the same address.</p>
            </div>
            <form id="composer" novalidate>
                <div class="field">
                    <label for="c-app">App</label>
                    <select id="c-app">${appOptions}<option value="Other / Business">Other / Business inquiry</option></select>
                </div>
                <div class="field">
                    <label for="c-topic">Topic</label>
                    <select id="c-topic">
                        <option>Purchases or restore</option>
                        <option>Something is not working</option>
                        <option>Question about a feature</option>
                        <option>Feature idea</option>
                        <option>Beta feedback</option>
                        <option>Privacy</option>
                        <option>Business inquiry</option>
                    </select>
                </div>
                <div class="field">
                    <label for="c-device">Device</label>
                    <input id="c-device" placeholder="iPhone 16 Pro">
                </div>
                <div class="field">
                    <label for="c-os">System version</label>
                    <input id="c-os" placeholder="iOS 26.1">
                </div>
                <div class="field full">
                    <label for="c-version">App version <span style="text-transform:none;letter-spacing:0;font-weight:500">(optional)</span></label>
                    <input id="c-version" placeholder="AURA Calendar: Settings → About → Version">
                </div>
                <div class="field full">
                    <label for="c-msg">What happened?</label>
                    <textarea id="c-msg" placeholder="What did you try, what did you expect, and what happened instead?"></textarea>
                </div>
                <div class="actions">
                    <button class="btn btn-primary" type="submit">${ICONS.mail} Open email</button>
                    <button class="btn btn-ghost" type="button" id="c-copy">${ICONS.copy} Copy details</button>
                    <span class="copied" id="c-copied">Copied</span>
                </div>
                <p class="note">This page does not send or store anything: it only prepares the email in your own mail app. If no mail app opens, use Copy details and write to ${SITE.email}.</p>
            </form>
        </div>
    </div>
</section>
</main>`;

const script = `<script>
document.addEventListener('DOMContentLoaded', () => {
    const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const input = $('#faq-search'), items = $$('.faq details'), groups = $$('.faq-group'), count = $('#faq-count'), none = $('#no-results');
    items.forEach((d) => { d._q = d.querySelector('.q'); d._qText = d._q.textContent; d._text = d.textContent.toLowerCase(); });
    let appFilter = '*', topicFilter = '';

    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
    function apply() {
        const terms = norm(input.value.trim()).split(/\\s+/).filter(Boolean);
        let shown = 0;
        items.forEach((d) => {
            const okApp = appFilter === '*' || d.dataset.app === appFilter;
            const okTopic = !topicFilter || d.dataset.topic === topicFilter;
            const okText = terms.every((t) => norm(d._text).includes(t));
            const on = okApp && okTopic && okText;
            d.style.display = on ? '' : 'none';
            d._q.innerHTML = '';
            d._q.textContent = d._qText;
            if (on && terms.length) {
                const re = new RegExp('(' + terms.map((t) => t.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&')).join('|') + ')', 'gi');
                d._q.innerHTML = d._qText.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(re, '<mark>$1</mark>');
            }
            if (on) shown++;
        });
        groups.forEach((g) => { g.style.display = $$('details', g).some((d) => d.style.display !== 'none') ? '' : 'none'; });
        none.style.display = shown ? 'none' : 'block';
        const label = topicFilter ? ' · ' + $('[data-topic-pick="' + topicFilter + '"] b').textContent : '';
        count.textContent = shown + ' article' + (shown === 1 ? '' : 's') + label;
        if (terms.length && shown && shown <= 2) items.filter((d) => d.style.display !== 'none').forEach((d) => d.open = true);
    }
    function setApp(key) {
        appFilter = key;
        $$('#faq-bar [data-filter]').forEach((b) => b.classList.toggle('on', b.dataset.filter === key));
        apply();
    }
    input.addEventListener('input', apply);
    $$('#faq-bar [data-filter]').forEach((b) => b.addEventListener('click', () => setApp(b.dataset.filter)));
    $$('.quick [data-q]').forEach((b) => b.addEventListener('click', () => { input.value = b.dataset.q; topicFilter = ''; setApp('*'); $('#faq').scrollIntoView({ behavior: 'smooth' }); }));
    $$('[data-topic-pick]').forEach((b) => b.addEventListener('click', () => { topicFilter = topicFilter === b.dataset.topicPick ? '' : b.dataset.topicPick; input.value = ''; setApp('*'); $('#faq').scrollIntoView({ behavior: 'smooth' }); }));
    $$('[data-pick]').forEach((b) => b.addEventListener('click', () => {
        const k = b.dataset.pick;
        if (k === 'wardecks') { $('#contact').scrollIntoView({ behavior: 'smooth' }); return; }
        topicFilter = ''; input.value = ''; setApp(k);
        $('#faq').scrollIntoView({ behavior: 'smooth' });
    }));

    // Deep links: /support#aura, #hazmat, #aura-restore, ?q=refund
    const params = new URLSearchParams(location.search);
    if (params.get('q')) input.value = params.get('q');
    const hash = location.hash.slice(1);
    if (['aura', 'hazmat', 'fedlog', 'general'].includes(hash)) setApp(hash); else apply();
    const target = hash && document.getElementById(hash);
    if (target && target.tagName === 'DETAILS') { target.open = true; setTimeout(() => target.scrollIntoView({ block: 'center' }), 50); }

    // Email assistant: guess device and system from the browser, then build the email.
    const ua = navigator.userAgent;
    const dev = /iPad|Macintosh/.test(ua) && 'ontouchend' in document ? 'iPad' : /iPhone/.test(ua) ? 'iPhone' : /Mac OS X/.test(ua) ? 'Mac' : /Android/.test(ua) ? 'Android device' : '';
    const os = (ua.match(/OS (\\d+)[_.](\\d+)(?:[_.](\\d+))? like Mac OS X/) || []);
    if (dev) $('#c-device').placeholder = dev;
    if (os[1]) $('#c-os').value = (dev === 'iPad' ? 'iPadOS ' : 'iOS ') + os[1] + '.' + os[2] + (os[3] ? '.' + os[3] : '');
    if (dev && dev !== 'Mac') $('#c-device').value = dev;
    const appSel = $('#c-app'), topicSel = $('#c-topic');
    if (hash.startsWith('hazmat')) appSel.selectedIndex = 1;
    if (hash.startsWith('fedlog')) { appSel.selectedIndex = 2; topicSel.value = 'Beta feedback'; }

    function details() {
        const v = (id) => $(id).value.trim();
        return [
            'App: ' + v('#c-app'),
            'Topic: ' + v('#c-topic'),
            'Device: ' + (v('#c-device') || '-'),
            'System: ' + (v('#c-os') || '-'),
            'App version: ' + (v('#c-version') || '-'),
            '',
            v('#c-msg') || '(Describe the problem here)',
        ].join('\\n');
    }
    $('#composer').addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = '[' + appSel.value + '] ' + topicSel.value;
        location.href = 'mailto:${SITE.email}?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(details());
    });
    $('#c-copy').addEventListener('click', async () => {
        const text = 'To: ${SITE.email}\\nSubject: [' + appSel.value + '] ' + topicSel.value + '\\n\\n' + details();
        try { await navigator.clipboard.writeText(text); } catch (_) {
            const t = document.createElement('textarea'); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
        }
        const c = $('#c-copied'); c.classList.add('on'); setTimeout(() => c.classList.remove('on'), 1800);
    });
});
</script>`;

// FAQ structured data, so search engines can show the answers directly.
const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() } })),
};

export const htmlSupport = sitePage({
    title: 'Support Center · Danloud Labs',
    description: 'Help for AURA Calendar, HazMat Scanner and every Danloud Labs app: purchases and restore, troubleshooting, iCloud Sync, privacy, and a direct way to contact us.',
    path: '/support',
    active: 'support',
    back: { href: '/', label: 'Home' },
    head: `${script}\n<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`,
    body,
});
