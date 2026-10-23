// =====================================================================================
// Danloud Labs website: main page  ->  /
// =====================================================================================

import { SITE, SITE_APPS, SITE_PLATFORMS, SITE_PROJECTS, asset } from './site-data.js';
import { ICONS, appCard, esc, sitePage } from './site-layout.js';

const small = (svg) => svg.replace('<svg', '<svg width="16" height="16"');

const platformTiles = SITE_PLATFORMS.map((p) => `
<a class="platform reveal" href="${p.href}" style="--c:${p.color}">
    <div class="ic">${ICONS[p.icon]}</div>
    <h3>${esc(p.name)}</h3>
    <p>${esc(p.text)}</p>
    <span class="go">Explore ${small(ICONS.arrow)}</span>
</a>`).join('');

const projectCards = SITE_PROJECTS.map((p) => `
<a class="project reveal${p.cover ? ' cover' : ''}" href="${p.href}" style="--c:${p.color}">
    <div class="art"><img src="${p.logo}" alt="${esc(p.name)}" loading="lazy"></div>
    <div class="label"><b>${esc(p.name)}</b><span>${small(ICONS.arrow)}</span></div>
</a>`).join('');

const body = `
<main>
<section class="home-hero">
    <div class="glow"></div>
    <div class="wrap">
        <img class="chars" src="${asset('brand/hero-characters.webp')}" alt="Danloud Labs LLC characters" fetchpriority="high">
        <div class="copy">
            <span class="eyebrow">Independent studio · ${esc(SITE.location)}</span>
            <h1>Apps, games and stories<br><span class="grad-text">crafted with care.</span></h1>
            <p class="lead">${esc(SITE.tagline)}</p>
            <div class="cta-row">
                <a class="btn btn-primary" href="#apps">Explore our apps</a>
                <a class="btn btn-ghost" href="#projects">Creative projects</a>
            </div>
            <div class="stats">
                <div class="stat"><b class="grad-text">${SITE_APPS.length}</b><span>iOS apps</span></div>
                <div class="stat"><b>${SITE_PROJECTS.length}</b><span>creative projects</span></div>
                <div class="stat"><b>${SITE_PLATFORMS.length}</b><span>platforms</span></div>
                <div class="stat"><b>FL</b><span>made in Florida, USA</span></div>
            </div>
        </div>
    </div>
</section>

<section id="apps">
    <div class="wrap">
        <div class="section-head reveal">
            <div>
                <span class="eyebrow">Technology &amp; Apps</span>
                <h2>Our apps</h2>
                <p class="lead">Native software for iPhone, iPad and Apple TV, designed and built by Danloud Labs.</p>
            </div>
            <a class="btn btn-ghost btn-sm" href="/ios-apps">All iOS apps ${small(ICONS.arrow)}</a>
        </div>
        <div class="apps featured">${SITE_APPS.map(appCard).join('')}</div>
    </div>
</section>

<section id="platforms" style="padding-top:0">
    <div class="wrap">
        <div class="platforms">${platformTiles}</div>
    </div>
</section>

<section id="projects">
    <div class="wrap">
        <div class="section-head reveal">
            <div>
                <span class="eyebrow">Creative Projects</span>
                <h2>Worlds we are building</h2>
                <p class="lead">Games, fan projects and original stories from the Danloud Labs universe.</p>
            </div>
        </div>
        <div class="projects">${projectCards}</div>
    </div>
</section>

<section id="contact">
    <div class="wrap">
        <div class="contact reveal">
            <div class="pic"><img src="${asset('brand/logo-mark.webp')}" alt="" loading="lazy"><div class="word">Danloud Labs <span>LLC</span></div></div>
            <div class="text">
                <span class="eyebrow">Support &amp; Contact</span>
                <h2>We are here to help.</h2>
                <p class="lead" style="font-size:16.5px">Questions about one of our apps, business inquiries or feedback: reach us anytime.</p>
                <div class="rows">
                    <a class="row" href="/support"><span class="ic">${ICONS.help}</span><span><small>Help &amp; FAQ</small><b>Support Center</b></span></a>
                    <a class="row" href="mailto:${SITE.email}"><span class="ic">${ICONS.mail}</span><span><small>Business inquiries</small><b>${SITE.email}</b></span></a>
                    <a class="row" href="/privacy"><span class="ic">${ICONS.shield}</span><span><small>Your data</small><b>Privacy Policy</b></span></a>
                </div>
            </div>
        </div>
    </div>
</section>
</main>`;

export const htmlPrincipal = sitePage({
    title: 'Danloud Labs LLC',
    description: SITE.tagline,
    path: '/',
    ogImage: asset('brand/hero-characters.webp'),
    body,
});
