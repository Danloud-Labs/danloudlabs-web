// =====================================================================================
// Mega Man X9: Apex-Primal (fan-made) — website content: title, lore, sections.
// Art is NOT listed here: tools/mmx9_assets.py writes assets/projects/mmx9/manifest.json
// from the iCloud art folders (Danloud Labs/Cloudflare/Banners/MMX9), and the pages read it
// live. Adding art only needs: run the script, commit, push.
// Characters live in mmx9-characters.js, the chapters in mmx9-story.js.
// =====================================================================================

import { asset } from './site-data.js';

export const MMX_BASE = '/mmx9-beastwars-fm';
export const MMX_ASSETS = asset('projects/mmx9');
export const MMX_MANIFEST = `${MMX_ASSETS}/manifest.json`;
export const mmxAsset = (path) => `${MMX_ASSETS}/${path}`;

// Used until the iCloud folder has a banner / logo of its own.
export const MMX_FALLBACK = {
    logo: asset('projects/mmx9-logo.webp'),
    banner: 'https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/wallpapers/mmx9.wall.webp',
    icon: 'https://raw.githubusercontent.com/Danloud-Labs/danloudlabs-assets/main/icons/mmx9.webp',
};

export const MMX = {
    title: 'Mega Man X9',
    subtitle: 'Apex-Primal',
    creator: 'David Gomez Valerio',
    tagline: 'The beast within has awakened.',
    logline: 'Five years after Lumine’s fall, a virus carried by sound turns Reploids into savage beasts. X, Zero and Axl must stop it, while two sisters built in secret centuries ago wake up to a world at war.',
    trailer: 'tQSdsRBDY2M',
    // Where the action is in the main banner (x y). The hero crops and zooms around this point.
    bannerFocus: '50% 30%',
    disclaimer: 'Mega Man X is a trademark of Capcom. Apex-Primal is an unofficial, non-commercial fan project and is not affiliated with or endorsed by Capcom.',
};

// The three ideas the story stands on (main page).
export const MMX_PREMISE = [
    { k: 'The Apex Virus', c: '#7dff4f', t: 'Released by Dynamo from a satellite tower, it travels on sound and reaches Reploids through their auditory sensors. Humanoids degenerate; animal-form Reploids mutate into a Primal state, ruled by instinct alone.' },
    { k: 'The Beastroids', c: '#ff9a3c', t: 'Built in secret by Dr. Elaine Clark, they carry living human and animal cortex inside a robotic body. The virus cannot overwrite them. It unleashes them.' },
    { k: 'The Sigma Chip', c: '#8b5cf6', t: 'Sigma is dead. Only his chip remains, holding his complete consciousness. It needs a body strong enough to hold it without collapsing, and someone is building one.' },
];

// The Universe page: one card per idea. Art: Universe/<Card name>.<ext> in iCloud.
export const MMX_LORE = [
    {
        key: 'apex-virus', name: 'The Apex Virus', c: '#7dff4f',
        text: [
            'Dynamo spent years developing the Apex Virus. It spreads through frequencies captured by a Reploid’s auditory sensors, reaches its core code and installs a program that turns its cells into cell-devouring programs.',
            'In humanoid Reploids it acts as a degenerative agent: it breaks down cellular structure, corrupts core systems and destabilizes the mind. In animal-form Reploids it mutates the body itself, letting the animal side override the humanoid one. Both paths are terminal.',
        ],
    },
    {
        key: 'primal-state', name: 'The Primal State', c: '#ff6b3c',
        text: [
            'Infected animal-form Reploids lose their higher functions and are left driven entirely by animal instinct. Each one mutates differently, according to the animal its body was built on, into a unique Apex form.',
            'They are not choosing to fight. They are dying, consumed from within by the same virus that drives them to destroy everything around them.',
        ],
    },
    {
        key: 'cfe-project', name: 'The CFE Project', c: '#e0b25c',
        text: [
            'Cortex Fusion Engineering was Dr. Elaine Clark’s answer to a question no one else would ask: for a machine to truly understand the world, its core must come from real life.',
            'Her technique integrated micro-layers of cultivated human and animal cortex into robotic systems. Not full brains, but living tissue able to grant reasoning, identity, instinct, strength and reflexes. The court called it pseudoscience. Clark kept working in secret.',
        ],
    },
    {
        key: 'beastroids', name: 'Beastroids', c: '#ff9a3c',
        text: [
            'A Beastroid has a dual cognitive core: human cortex for thought, judgment and identity; animal cortex for power, speed, aggression and instinct. Physically human, with enhanced biology, integrated claws and extreme evolutionary adaptation.',
            'Generation 1 are the felines, Gamma and Hemma. Clark’s notes describe more: Generation 2 with wolves, eagles, panthers, bears and reptiles, and Generation 3, the Apex Hybrids, built from several animals at once.',
        ],
    },
    {
        key: 'berserker-mode', name: 'Berserker Mode', c: '#ff3c5c',
        text: [
            'Because a Beastroid’s animal core is organic, the Apex Virus cannot overwrite it. Instead, the human side collapses and the animal takes control.',
            'The result is Berserker Mode: full animal traits, brutal strength, altered perception and a partial loss of control. It exists only when a Beastroid meets the virus.',
        ],
    },
    {
        key: 'sigma-chip', name: 'The Sigma Chip', c: '#8b5cf6',
        text: [
            'An advanced AI unit that holds the complete consciousness of Sigma. It cannot be installed in just any body: it needs extreme stability and advanced mutation at the same time.',
            'The Apex Virus was never the goal. It was a forge, built to create the one body able to carry the emperor of the Mavericks back to life.',
        ],
    },
    {
        key: 'antidote', name: 'The Antidote', c: '#3f8cff',
        text: [
            'X showed a resistance to the virus that no other Reploid had. Axl used his copy ability to replicate X’s cells perfectly, and Alia combined both into the first antidote.',
            'It neutralizes the mental instability and stops the mutation and the cellular destruction from advancing. It cannot undo the damage that has already been done.',
        ],
    },
];

// Characters page groups.
export const MMX_GROUPS = [
    { key: 'main', name: 'Maverick Hunters', sub: 'The heroes and the navigators who guide them.' },
    { key: 'faction', name: 'Factions', sub: 'The creator, her Beastroids, the villains and the eight Mavericks. Choose a faction to meet its members.' },
];

// Sections (main page and sub-navigation). Status 'live' links to the page.
export const MMX_SECTIONS = [
    { key: 'story', name: 'The Story', nav: 'Story', status: 'live', text: 'All fifteen chapters, from the courtroom of Dr. Light to the birth of Apex Sigma.' },
    { key: 'characters', name: 'Characters', status: 'live', text: 'The Maverick Hunters, Dr. Clark’s Beastroids and the villains behind the virus.' },
    { key: 'bosses', name: 'The Mavericks', nav: 'Bosses', status: 'live', text: 'Eight infected Reploids, their stages, Apex mutations, weaknesses and weapons.' },
    { key: 'universe', name: 'The Universe', nav: 'Universe', status: 'live', text: 'The Apex Virus, the CFE Project, Beastroids, Berserker Mode and the Sigma Chip.' },
];
