// =====================================================================================
// Amaphest: The Amalion Progenitor — website content (characters, factions, universe).
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

export const AMA_GROUPS = [
    { key: 'main', name: 'Main Characters' },
    { key: 'pilots', name: 'AMA-ESS Pilots', sub: 'Encore Enterprises’ armored pilots, one suit and one power each.' },
    { key: 'secondary', name: 'Secondary Characters' },
];

export const AMA_FACTIONS = [
    { key: 'encore', name: 'Encore Enterprises', color: '#c8323f', text: 'A private corporation of advanced technology that grew beyond the resources of any government. Home of the AMA-ESS program.' },
    { key: 'urso', name: 'Project URSO', color: '#3f7cff', text: 'A U.S. government agency created to find anomalous subjects and develop advanced technology.' },
    { key: 'guerrillas', name: 'The Guerrillas', color: '#7aa34a', text: 'A resistance of ex-soldiers fighting with scavenged weapons against corporate and government power.' },
    { key: 'cia', name: 'U.S. CIA', color: '#5b6b8c', text: 'The intelligence agency that first took notice of the girl with the impossible heart.' },
    { key: 'hemos', name: 'Hemosapiens', color: '#ff4d6d', text: 'The civilization of Hemos, divided by a civil war between the bearers of Red and Blue.' },
    { key: 'brown', name: 'The Brown Family', color: '#e0a35c', text: 'Michelle’s family, the ordinary life that was taken from her.' },
    { key: 'military', name: 'U.S. Armed Forces', color: '#8a9a6a', text: 'The soldiers and commanders caught in the middle of a war they were never told about.' },
];

// Characters, in display order. `art` is the slug in manifest.json (defaults to slug).
export const AMA_CHARACTERS = [
    {
        slug: 'michelle-brown', name: 'Michelle Brown', alias: 'Amaphest', group: 'main', faction: 'brown', color: '#d63cff',
        role: 'The Amalion Progenitor',
        bio: [
            'Michelle Brown was born carrying both the Red and the Blue energies of Hemos, fused into her heart before she ever drew a breath. Her mother did not survive her birth, and Michelle grew up as a scientific anomaly, feared and coveted by the most powerful institutions on Earth.',
            'Taken from her father as a child, she was classified by the U.S. government as URSO Subject 02 and studied as an experiment rather than raised as a girl. Transferred to Encore Enterprises, she was trained inside the AMA-ESS 05 suit, built from the Amalion in her own blood, until she reclaimed her name and her purpose as Amaphest.',
        ],
        facts: [['Designation', 'URSO-02 · AMA-ESS 05'], ['Powers', 'Alpha (heat) and Betha (cold) currents'], ['Gift', 'Amalion in her bloodstream']],
        forms: {
            'ama-ess-jacket': 'Her bomber-style pilot jacket: a symbol of her dual identity, belonging both to Encore and to the family she chose.',
            'cobalt-armor': 'The AMA-ESS 05 in its cobalt finish.',
            'defensive-mode': 'The AMA-ESS 05 configured to protect.',
            'offensive-mode': 'The AMA-ESS 05 configured to strike, with shoulder cannons.',
        },
        defaultForm: 'offensive-mode',
    },
    {
        slug: 'george-hammond', name: 'Dr. George Hammond', group: 'main', faction: 'encore', color: '#4fb7ff',
        role: 'Lead scientist, Encore Enterprises',
        bio: [
            'A leading scientist at Encore Enterprises, specialized in applied energy technology and known for his practical ingenuity. Hammond grew disillusioned with Encore’s ruthlessness and became a surrogate father to Michelle, protecting her from inside the company.',
            'He designed the AMA-ESS 05 and the stabilizer that keeps Michelle alive. To her, he is the proof that even inside the cold steel of Encore, humanity survives.',
        ],
        facts: [['Field', 'Applied energy technology'], ['Creations', 'AMA-ESS 05, the stabilizer, DASH']],
    },
    {
        slug: 'glenn-monroe', name: 'Glenn Monroe', group: 'main', faction: 'urso', color: '#3f7cff',
        role: 'Vice President of the United States',
        bio: [
            'Once a brilliant government scientist, Glenn Monroe turned her intellect toward politics and rose to Vice President of the United States, campaigning against the unchecked science of private corporations.',
            'She created Project URSO, and her decisions shaped Michelle’s life from the very beginning. She represents political ambition, and the price of power.',
        ],
        facts: [['Office', 'Vice President of the U.S.'], ['Founded', 'Project URSO']],
    },
    {
        slug: 'dash', name: 'DASH', alias: 'AMA-PR4', group: 'main', faction: 'encore', color: '#ff4d4d',
        role: 'Guardian unit',
        bio: [
            'AMA-PR4, codename DASH, was born from the same empire that enslaved Michelle, yet remade for her defense. Built by Dr. Hammond, it carries his voice and can project his image from its chest core.',
            'It was never meant to serve Encore. It was built with one purpose: to protect Amaphest.',
        ],
        facts: [['Model', 'AMA-PR4'], ['Built by', 'Dr. George Hammond'], ['Purpose', 'Protect Amaphest']],
    },

    // AMA-ESS pilots (Encore Enterprises)
    {
        slug: 'shock', name: 'Randy Williams', alias: 'Shock', group: 'pilots', faction: 'encore', color: '#2fa8ff',
        role: 'Pilot of the AMA-ESS 01',
        bio: ['A U.S. pilot inside the AMA-ESS 01, Shock answers every fight with overwhelming firepower from his twin Gatling cannons. He is the first pilot Encore sends after the Amalion Progenitor.'],
        facts: [['Suit', 'AMA-ESS 01'], ['Weapon', 'Twin Gatling cannons'], ['Origin', 'United States']],
    },
    {
        slug: 'ion', name: 'Markus Krüger', alias: 'Ion', group: 'pilots', faction: 'encore', color: '#ff9a3d',
        role: 'Pilot of the AMA-ESS 02',
        bio: ['Lead scientist of Magnetixium, a subsidiary of Germany’s Arms-Tech Industries, Dr. Markus Krüger pilots the AMA-ESS 02 as Ion. His magnetic powers can bring down entire naval and air forces.'],
        facts: [['Suit', 'AMA-ESS 02'], ['Power', 'Magnetism'], ['Origin', 'Germany']],
    },
    {
        slug: 'blade', name: 'Kenji Takahiro', alias: 'Blade', group: 'pilots', faction: 'encore', color: '#ff2e4d',
        role: 'Pilot of the AMA-ESS 03',
        bio: ['Sharp, eager and burning with purpose, Blade pilots the AMA-ESS 03, a sleek frame of dark silver plates streaked with crimson conduits. His weapon, the AMA-Blade, is forged from pure Amalion alloy and edged with volatile Alpha resonance.'],
        facts: [['Suit', 'AMA-ESS 03'], ['Weapon', 'AMA-Blade']],
    },
    {
        slug: 'coords', name: 'Dmitri Volkov', alias: 'Coords', group: 'pilots', faction: 'encore', color: '#5fd35f',
        role: 'Pilot of the AMA-ESS 04',
        bio: ['A punk and a former resistance leader who changed sides, Coords is an expert in science, technology and firearms. Backed by Russia after allying with Encore, he fights with space cannons, a satellite-linked sniper rifle and two spheres in his palms that absorb incoming energy.'],
        facts: [['Suit', 'AMA-ESS 04'], ['Arsenal', 'Space cannons, satellite-linked sniper rifle, absorbing spheres'], ['Origin', 'Russia']],
    },

    // Secondary characters
    {
        slug: 'okune', name: 'Okune', group: 'secondary', faction: 'hemos', color: '#ff4d6d',
        role: 'Diplomat of Hemos',
        bio: ['A veteran from Hemos’ age of peace, born with Red essence yet faithful to diplomacy: the last surviving red-skinned diplomat, a living symbol of unity in a world divided. His final mission would lead him across the stars, to a fragile world its people call Earth.'],
        facts: [['World', 'Hemos'], ['Essence', 'Red']],
    },
    {
        slug: 'alexander-bourne', name: 'Alexander Bourne', group: 'secondary', faction: 'encore', color: '#c8323f',
        role: 'Founder of Bourne Industries',
        bio: ['Founder of Bourne Industries, the research company that came before Encore Enterprises. His legacy, and his son William, would change the course of science on Earth.'],
        facts: [['Founded', 'Bourne Industries']],
    },
    {
        slug: 'charles-hurley', name: 'General Charles Hurley', group: 'secondary', faction: 'military', color: '#8a9a6a',
        role: 'Pentagon Defense Command',
        bio: ['A general of the Pentagon Defense Command who must choose between his orders and the truth when the war reaches the heart of the U.S. military.'],
        facts: [['Rank', 'General'], ['Command', 'Pentagon Defense Command']],
    },
    {
        slug: 'theodore-peterson', name: 'Dr. Theodore Peterson', group: 'secondary', faction: 'brown', color: '#e0a35c',
        role: 'Specialist physician',
        bio: ['The specialist who examined a four-year-old Michelle after her mysterious collapses. He found an irregularity no medicine could explain, and his search for answers set events in motion.'],
        facts: [['Field', 'Medicine']],
    },
    {
        slug: 'ethan-cross', name: 'Ethan Cross', group: 'secondary', faction: 'encore', color: '#9a7cff',
        role: 'Former Encore systems engineer',
        bio: ['A senior systems engineer with ten years on resonance cores and stabilizer design. When he walked out of Encore with schematics and field notes, he became a man with knowledge too dangerous to leave alone.'],
        facts: [['Expertise', 'Resonance cores and stabilizers']],
    },
    {
        slug: 'nick-sanders', name: 'Nick Sanders', group: 'secondary', faction: 'military', color: '#8a9a6a',
        role: 'U.S. soldier',
        bio: ['A U.S. soldier stationed at a desert military base, and an old comrade of the Guerrillas’ leader from their years in the service.'],
        facts: [['Post', 'U.S. military base']],
    },
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

export const findCharacter = (slug) => AMA_CHARACTERS.find((c) => c.slug === slug);
export const findFaction = (key) => AMA_FACTIONS.find((f) => f.key === key);
