// =====================================================================================
// Amaphest: The Amalion Progenitor — website content (universe, sections, gallery).
// Art is NOT listed here: tools/amaphest_assets.py writes assets/projects/amaphest/
// manifest.json from the iCloud art folders, and the pages read it live. Adding art only
// needs: run the script, commit, push. Adding or editing a character's text happens here.
// Keep the texts spoiler-free: this is the public face of the story.
// =====================================================================================

import { asset } from './site-data.js';

export const AMA_BASE = '/amaphest-amalion-progenitor';
export const AMA_ASSETS = asset('projects/amaphest');
export const AMA_MANIFEST = `${AMA_ASSETS}/manifest.json`;
export const amaAsset = (path) => `${AMA_ASSETS}/${path}`;

export const AMA = {
    title: 'Amaphest',
    subtitle: 'The Amalion Progenitor',
    creator: 'David Gomez Valerio',
    tagline: 'Born with two worlds in her heart.',
    // Where the face is in the main banner (x y). The hero crops and zooms around this point.
    bannerFocus: '46% 12%',
    logline: 'A girl born carrying the two sacred energies of a distant planet becomes the most coveted weapon on Earth, and the only one who can decide what she will be.',
};

// The universe, told without spoilers (main page).
export const AMA_UNIVERSE = [
    {
        k: 'Hemos', c: '#ff2e4d',
        t: 'Far beyond our galaxy lies Hemos, a world of three suns and five moons. Its people, the Hemosapiens, are blessed at birth with one of two sacred energies: Red or Blue. No one may ever carry both.',
    },
    {
        k: 'Alpha & Betha', c: '#2f8bff',
        t: 'On Earth the two currents are known as Alpha, a searing heat, and Betha, a freezing cold. When they collide they birth Chaos, an unstable pink force that consumes everything it touches.',
    },
    {
        k: 'Amalion', c: '#d63cff',
        t: 'One human child was born holding both currents without being destroyed. In her blood, scientists found Amalion: the only shield able to hold Alpha and Betha together. Every power on Earth wants it.',
    },
];

// Characters and factions live in amaphest-characters.js (its own file: it is long).
export { AMA_FACTIONS, AMA_CHARACTERS, findCharacter, findFaction, factionMembers } from './amaphest-characters.js';

// The characters page: main cast first, then faction buttons, then the secondary cast.
export const AMA_GROUPS = [
    { key: 'main', name: 'Main Characters' },
    { key: 'faction', name: 'Factions', sub: 'The powers behind every side. Choose a faction to meet its members.' },
    { key: 'secondary', name: 'Secondary Characters' },
];

// Sections of the universe (main page). Status 'live' links to the page; 'soon' shows a teaser.
export const AMA_SECTIONS = [
    { key: 'characters', name: 'Characters', status: 'live', text: 'The heroes, pilots and powers of the story.' },
    { key: 'technology', name: 'Technology', status: 'soon', text: 'The AMA-ESS suits, the stabilizer, Amalion and the war machines of Encore.' },
    { key: 'locations', name: 'Locations', status: 'soon', text: 'From the moon forts of Hemos to the ruins of Los Angeles.' },
    { key: 'gallery', name: 'Gallery', status: 'soon', text: 'Concept art, key art and wallpapers.' },
];

// Gallery: add { src: 'gallery/<file>.webp', caption: '...' } (files in assets/projects/amaphest/gallery/).
export const AMA_GALLERY = [];
