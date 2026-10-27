// =====================================================================================
// Mega Man X9: Apex-Primal — every character and faction.
// Texts come from David's notes (General Notes, Chapters, Boss Compendium, Beastroids Origins).
// Bios stay light on spoilers; the full story is on the Story page.
//
// To add a character: add an entry here and (for its art) a folder in iCloud whose name
// matches its name. tools/mmx9_assets.py turns the folder name into the same slug
// ("Dr. Clark" -> elaine-clark is mapped there). `group`: 'main' or 'faction'.
// The eight Mavericks have their own page (/mavericks), not a faction tab; they carry `boss`: stage, element, Apex mutation and weakness (weapons: mmx9-weapons.js).
// `forms`: notes per form slug (iCloud subfolder, e.g. X/Emerald Armor -> emerald-armor); `defaultForm` leads.
// =====================================================================================

export const MMX_FACTIONS = [
    { key: 'cfe', name: 'CFE Project', folder: 'CFE', color: '#e0b25c', text: 'Dr. Elaine Clark and the two Beastroids she built in secret, sealed away for centuries in hidden capsules beneath the ruins of her laboratory.' },
    { key: 'antagonists', name: 'Antagonists', folder: 'Antagonist', color: '#8b5cf6', text: 'The mind behind the Apex Virus, and the emperor he is trying to bring back.' },
];

const C = (o) => o;
const infected = 'Infected by the Apex Virus, its body mutated according to its animal structure, and nothing of its original mind answers anymore.';

export const MMX_CHARACTERS = [
    // ------------------------------------------------------------------ Maverick Hunters
    C({
        slug: 'x', name: 'X', group: 'main', color: '#3f8cff',
        role: 'Maverick Hunter',
        bio: [
            'The legendary Reploid created by Dr. Light. After five years of peace, X had entered a deep dormant state, resting at last after countless years of battle, until Alia woke him to answer the attack on the Reploidforce satellite tower.',
            'When the Apex Virus spread across the world, X showed a resistance unlike any other Reploid. His cells became the key to the only antidote.',
        ],
        facts: [['Creator', 'Dr. Light'], ['Status', 'Immune to the Apex Virus']],
        defaultForm: 'base-armor',
    }),
    C({
        slug: 'zero', name: 'Zero', group: 'main', color: '#e8394a',
        role: 'Maverick Hunter',
        bio: [
            'X’s closest ally, born from Dr. Wily’s Project Zero, a prototype designed for combat and destruction. Because past viruses had already touched his systems, the Apex Virus struck him harder than anyone.',
            'His moods turned dangerous and Alia placed him in quarantine, under Layer’s watch. Only the antidote could bring him back to the field.',
        ],
        facts: [['Creator', 'Dr. Wily'], ['Navigator', 'Layer']],
    }),
    C({
        slug: 'axl', name: 'Axl', group: 'main', color: '#ff7a2f',
        role: 'Maverick Hunter',
        bio: [
            'The youngest of the three Hunters. The virus reached him too, though not as severely as Zero.',
            'With his copy ability he replicated X’s immune cells with perfect accuracy, stabilizing himself and giving Alia the reproducible source she needed to create the antidote.',
        ],
        facts: [['Ability', 'Copy: perfect replication'], ['Key role', 'Replicated X’s cells for the antidote']],
    }),
    C({
        slug: 'alia', name: 'Alia', group: 'main', color: '#7cc4ff',
        role: 'Navigator and scientist',
        bio: [
            'The Hunters’ lead navigator and researcher. Alia reactivated X when the alarm sounded and was the first to read the sonic-radiation wave behind the outbreak.',
            'She studied X’s cells in depth and created the antidote. When the Hunters captured a creature whose mutation was unlike any other, she convinced X to bring her back to the base.',
        ],
        facts: [['Field', 'Virus research, operations'], ['Created', 'The Apex Virus antidote']],
    }),
    C({
        slug: 'palette', name: 'Palette', group: 'main', color: '#9b7bff',
        role: 'Navigator and operator',
        bio: [
            'The operations navigator who mapped the crisis. Palette prepared the mission briefing that revealed eight stations under attack by infected animal-form Reploids.',
            'She guided X and Axl through the first missions while Zero remained in quarantine.',
        ],
        facts: [['Field', 'Mission briefings, field guidance']],
    }),
    C({
        slug: 'layer', name: 'Layer', group: 'main', color: '#e0508f',
        role: 'Navigator and field intelligence',
        bio: [
            'Zero’s navigator through countless missions. When he was quarantined, Layer stayed by his side, monitoring every fluctuation in his systems and every change in his behavior.',
            'She traced the energy signature of a mysterious captured Beastroid back to a place the official records said no longer existed.',
        ],
        facts: [['Field', 'Intelligence, Zero’s navigator']],
    }),

    // ------------------------------------------------------------------ CFE Project
    C({
        slug: 'elaine-clark', name: 'Dr. Elaine Clark', faction: 'cfe', group: 'faction', color: '#e0b25c',
        role: 'Pioneer of biocybernetics',
        bio: [
            'In the age of Dr. Light and Dr. Wily, Elaine Clark presented the CFE Project: Cortex Fusion Engineering, the integration of living human and animal cortex into robotic systems. The court and the scientific community dismissed it as pseudoscience, and her research was archived and forgotten.',
            'She continued in secret and built two Reploids from her forbidden designs. She was later pursued by the government and imprisoned, and her laboratory was raided and left in ruins. All of her experiments were reportedly destroyed. At least, that is what the records claim.',
            '“A robot can obey. A human can decide. An animal can survive. What if one could do all three?”',
        ],
        facts: [['Era', 'Dr. Light and Dr. Wily'], ['Research', 'Cortex Fusion Engineering (CFE)'], ['Creations', 'Gamma and Hemma']],
    }),
    C({
        slug: 'gamma', name: 'Gamma', alias: 'White Tiger', faction: 'cfe', group: 'faction', color: '#cfe3ff',
        role: 'Beastroid, Generation 1',
        bio: [
            'One of Dr. Clark’s two Beastroids, sealed in a hidden capsule for centuries. The sonic wave of the Apex Virus woke her, and she woke in pain, driven only by instinct and rage.',
            'Gamma is tactical aggression: calculated and controlled even in Berserker Mode. Once her mind is her own again, she has a reason to fight. Her sister is still out there.',
        ],
        facts: [['Animal', 'White tiger'], ['Creator', 'Dr. Elaine Clark'], ['Berserker', 'Controlled, with difficulty']],
    }),
    C({
        slug: 'hemma', name: 'Hemma', alias: 'Brown Tiger', faction: 'cfe', group: 'faction', color: '#ff8a1f',
        role: 'Beastroid, Generation 1',
        bio: [
            'Gamma’s sister, woken from the second capsule by the same wave. Emotional, ferocious and unpredictable, her Berserker is devastating.',
            'With no antidote to reach her, the virus keeps its grip on her mind. Sister against sister was always going to be the cruelest fight of all.',
        ],
        facts: [['Animal', 'Brown tiger'], ['Creator', 'Dr. Elaine Clark'], ['Berserker', 'Unstable']],
    }),

    // ------------------------------------------------------------------ Antagonists
    C({
        slug: 'dynamo', name: 'Dynamo', faction: 'antagonists', group: 'faction', color: '#b06bff',
        role: 'Creator of the Apex Virus',
        bio: [
            'A familiar face not seen in years. Dynamo spent years developing the Apex Virus and released it worldwide from the Reploidforce satellite tower, laughing that X had arrived too late.',
            'He manipulates the crisis from the shadows. His true goal is to find a host strong enough to carry the Sigma Chip.',
        ],
        facts: [['Created', 'The Apex Virus'], ['Goal', 'Revive Sigma']],
    }),
    C({
        slug: 'sigma', name: 'Sigma', faction: 'antagonists', group: 'faction', color: '#8b5cf6',
        role: 'Emperor of the Mavericks',
        bio: [
            'Sigma is dead. All that remains is his chip, an advanced AI unit that holds his complete consciousness.',
            'The chip cannot be installed in just any body. It needs one that can survive extreme mutation and still hold his mind without collapsing. Everything the Apex Virus does, it does to build that body.',
        ],
        facts: [['State', 'The Sigma Chip'], ['Wants', 'A perfect host']],
    }),

    // ------------------------------------------------------------------ The eight Mavericks
    C({
        slug: 'arctic-woolly-mammoth', name: 'Arctic Woolly Mammoth', faction: 'mavericks', group: 'faction', color: '#7fd6ff',
        role: 'Maverick · Ice',
        bio: [`Guardian of the Polar Excavation Base. ${infected}`],
        boss: { stage: 'Polar Excavation Base', element: 'Ice / Cryo', mutation: 'Ice Shatter Form', weakness: 'Fire' },
    }),
    C({
        slug: 'plasma-axolotl', name: 'Plasma Axolotl', faction: 'mavericks', group: 'faction', color: '#ff7ac8',
        role: 'Maverick · Bio-Electric',
        bio: [`Found in the Deep Sea Research Lab. ${infected}`],
        boss: { stage: 'Deep Sea Research Lab', element: 'Bio-Electric / Water', mutation: 'Plasma Surge Form', weakness: 'Electric' },
    }),
    C({
        slug: 'electro-unicorn', name: 'Electro Unicorn', faction: 'mavericks', group: 'faction', color: '#ffd84d',
        role: 'Maverick · Electric',
        bio: [`Rules the storms above the Sky Citadel. ${infected}`],
        boss: { stage: 'Sky Citadel', element: 'Electric / Storm', mutation: 'Thunder Overload Form', weakness: 'Ground' },
    }),
    C({
        slug: 'volcanic-great-ape', name: 'Volcanic Great Ape', faction: 'mavericks', group: 'faction', color: '#ff5a2b',
        role: 'Maverick · Fire',
        bio: [`Rampages through the Collapsed Volcano Mining Facility. ${infected}`],
        boss: { stage: 'Collapsed Volcano Mining Facility', element: 'Fire / Lava', mutation: 'Magma Rage Form', weakness: 'Water' },
    }),
    C({
        slug: 'supersonic-woodpecker', name: 'Supersonic Woodpecker', faction: 'mavericks', group: 'faction', color: '#8fe3c8',
        role: 'Maverick · Wind',
        bio: [`Strikes from the High Altitude Wind Farms. ${infected}`],
        boss: { stage: 'High Altitude Wind Farms', element: 'Wind / Sonic', mutation: 'Hurricane Node Form', weakness: 'Electric' },
    }),
    C({
        slug: 'toxin-ladybug', name: 'Toxin Ladybug', faction: 'mavericks', group: 'faction', color: '#a6e23c',
        role: 'Maverick · Poison',
        bio: [`Spreads its spores through the Toxic Overgrown Greenhouse. ${infected}`],
        boss: { stage: 'Toxic Overgrown Greenhouse', element: 'Poison / Biohazard', mutation: 'Contamination Spore Form', weakness: 'Ice' },
    }),
    C({
        slug: 'splash-dolphin', name: 'Splash Dolphin', faction: 'mavericks', group: 'faction', color: '#2fa8ff',
        role: 'Maverick · Water',
        bio: [`Haunts the Destroyed Desalinization Facility. ${infected}`],
        boss: { stage: 'Destroyed Desalinization Facility', element: 'Water / Pressure', mutation: 'Abyss Pressure Form', weakness: 'Electric' },
    }),
    C({
        slug: 'slicer-beaver', name: 'Slicer Beaver', faction: 'mavericks', group: 'faction', color: '#c0c7d4',
        role: 'Maverick · Blade',
        bio: [`Tears through the Industrial Logging Site. ${infected}`],
        boss: { stage: 'Industrial Logging Site', element: 'Blade / Steel', mutation: 'Shredding Maul Form', weakness: 'Fire' },
    }),
];

export const findCharacter = (slug) => MMX_CHARACTERS.find((c) => c.slug === slug);
export const findFaction = (key) => MMX_FACTIONS.find((f) => f.key === key);
export const factionMembers = (key) => MMX_CHARACTERS.filter((c) => c.faction === key);
export const MMX_BOSSES = MMX_CHARACTERS.filter((c) => c.boss);
