// =====================================================================================
// Danloud Labs website: the content every page reads (apps, projects, platforms, contact).
// Images live in this repo (Danloud-Labs/danloudlabs-web) and are served from GitHub raw.
// =====================================================================================

export const SITE_ASSETS = 'https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-web/main/assets';
export const asset = (path) => `${SITE_ASSETS}/${path}`;

export const SITE = {
    name: 'Danloud Labs LLC',
    tagline: 'Crafting innovative mobile experiences, creative projects, and software solutions for a digital world.',
    location: 'Florida, USA',
    email: 'support@danloudlabs.com',
};

// iOS apps, in the order they show on the main page and on /ios-apps.
export const SITE_APPS = [
    {
        slug: 'aura-calendar',
        name: 'AURA Calendar',
        href: '/ios/aura-calendar',
        icon: asset('apps/auracalendar-icon.webp'),
        banner: asset('apps/auracalendar-banner.webp'),
        color: '#d946ef',
        glow: 'rgba(217, 70, 239, 0.40)',
        short: 'Immersive thematic calendar featuring weather-reactive visual environments & lo-fi audio.',
        platforms: 'iPhone · iPad · Apple TV',
    },
    {
        slug: 'hazmat-scanner',
        name: 'HazMat Scanner',
        href: '/ios/hazmat-scanner',
        icon: asset('apps/hazmat-icon.webp'),
        banner: asset('apps/hazmat-banner.webp'),
        color: '#2ee6c9',
        glow: 'rgba(46, 230, 201, 0.35)',
        short: 'Instant UN/NA placard recognition and offline Emergency Response Guidebook (ERG 2024).',
        platforms: 'iOS',
    },
    {
        slug: 'fedlog',
        name: 'FedLog',
        href: '/ios/fedlog',
        icon: asset('apps/fedlog-icon.webp'),
        banner: asset('apps/fedlog-banner.webp'),
        color: '#f5c542',
        glow: 'rgba(245, 197, 66, 0.35)',
        short: 'Tactical shift logging, OPM overtime cap tracking, and verified officer utilities.',
        platforms: 'iOS',
    },
    {
        slug: 'wardecks',
        name: 'WarDecks: Leagues',
        href: '/ios/wardecks',
        icon: asset('apps/wardecks-icon.webp'),
        banner: asset('apps/wardecks-banner.webp'),
        color: '#d1964a',
        glow: 'rgba(209, 150, 74, 0.35)',
        short: 'Strategic medieval card battle game powered by native Swift & SpriteKit engines.',
        platforms: 'iOS',
    },
];

export const SITE_PLATFORMS = [
    { name: 'iOS Apps', href: '/ios-apps', color: '#0a84ff', text: 'Native apps for iPhone, iPad and Apple TV, built in Swift.', icon: 'phone' },
    { name: 'Android Apps', href: '/android-apps', color: '#32de84', text: 'Our apps and tools for Android phones and tablets.', icon: 'android' },
    { name: 'Software & Tools', href: '/software-tools', color: '#ff9f0a', text: 'Desktop software and utilities for creators and professionals.', icon: 'tools' },
];

// Creative projects: logos with transparency, shown on a glowing card in each project's color.
export const SITE_PROJECTS = [
    { name: 'Mega Man X9: Apex-Primal', href: '/mmx9-beastwars-fm', logo: asset('projects/mmx9-logo.webp'), color: '#3f8cff' },
    { name: 'Dark Within Me: La Sua Origine', href: '/dark-within-me-la-sua-origine', logo: asset('projects/darkwithinme-logo.webp'), color: '#e0283f' },
    { name: 'Final Fantasy Tactics II', href: '/fftii', logo: asset('projects/fftii-logo.webp'), color: '#f2b84b', cover: true },
    { name: 'Myncha: Vampires of Exius', href: '/myncha-vampires-of-exius', logo: asset('projects/myncha-logo.webp'), color: '#b48cff' },
    { name: 'Amaphest: Amalion Progenitor', href: '/amaphest-amalion-progenitor', logo: asset('projects/amaphest-logo.webp'), color: '#ff4d6d' },
];
