// =====================================================================================
// Danloud Labs website: iOS apps  ->  /ios-apps  (also /ios)
// =====================================================================================

import { SITE_APPS } from './site-data.js';
import { appCard, sitePage } from './site-layout.js';

const body = `
<main>
<section class="page-head">
    <div class="wrap">
        <span class="eyebrow">Technology &amp; Apps</span>
        <h1>iOS Applications</h1>
        <p class="lead">Explore native, high-performance software engineered for iPhone, iPad and Apple TV by Danloud Labs LLC.</p>
    </div>
</section>
<section style="padding-top:28px">
    <div class="wrap">
        <div class="apps">${SITE_APPS.map(appCard).join('')}</div>
    </div>
</section>
</main>`;

export const htmlIOS = sitePage({
    title: 'iOS Applications · Danloud Labs',
    description: 'Native, high-performance apps for iPhone, iPad and Apple TV by Danloud Labs LLC: AURA Calendar, HazMat Scanner, FedLog and WarDecks: Leagues.',
    path: '/ios-apps',
    active: 'apps',
    back: { href: '/', label: 'Home' },
    body,
});
