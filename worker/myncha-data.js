// =====================================================================================
// Myncha: Vampires of Exius — website content. An original story by David Gomez Valerio.
// The story is still being written: only what exists is here, and every character without a
// story yet says so kindly. Source: David's "Narrative" (Acts I–IX), his notes and the
// design blueprints, told as the story's own rules (the curse, the hunger, the guilt).
// Art lives in assets/projects/myncha/ and is added later (CGI versions are on their way):
//   characters/<key>.webp (3:4) and characters/<key>-beast.webp for werewolf transformations,
//   locations/<key>.webp, bestiary/<key>.webp, curse/<key>.webp, exius/<key>.webp (16:9),
//   story/act-01.webp… (16:9). A missing image shows an empty labeled frame.
// Gallery: any image in gallery/, listed in gallery.json by tools/myncha_gallery.mjs (read live).
// =====================================================================================

import { asset } from './site-data.js';

export const MY_BASE = '/myncha-vampires-of-exius';
export const MY_ASSETS = asset('projects/myncha');
export const myAsset = (path) => `${MY_ASSETS}/${path}`;

export const MY = {
    title: 'Myncha: Vampires of Exius',
    author: 'David Gomez Valerio',
    tagline: 'Exius… I will find you.',
    logline: 'One night, on a dance floor, Myncha fell in love for the first time. Before dawn, a vampire had taken the boy and remade her. Now the sun turns her skin to diamond, a hunger for blood burns in her chest, and a mirror in a ruined cathedral has opened the way to Exius, an older, magical world, where she will search for the one she lost.',
    note: 'Myncha: Vampires of Exius, its story and its characters are original works by David Gomez Valerio and Danloud Labs LLC. All rights reserved. The story is still being written.',
    soon: 'Biography coming soon. Myncha’s story is still being written, and this character’s chapter hasn’t been told yet.',
};

export const MY_SECTIONS = [
    { key: 'story', name: 'The Story', nav: 'Story', text: 'From the night on the dance floor to the other side of the Mirror of Fate, act by act.' },
    { key: 'characters', name: 'Characters', nav: 'Characters', text: 'Vampires, werewolves, fairies, ghouls, the Church and the hunters of Exius.' },
    { key: 'curse', name: 'The Curse', nav: 'The Curse', text: 'Skin that turns to diamond in the sun, a hunger that never sleeps, and the weight of every life.' },
    { key: 'exius', name: 'Exius', nav: 'Exius', text: 'The world on the other side of the mirror: our Earth, rolled back into a magical past.' },
    { key: 'bestiary', name: 'Bestiary', nav: 'Bestiary', text: 'The creatures that hunt the woods of Exius, and the ones waiting at the end of the road.' },
    { key: 'locations', name: 'Locations', nav: 'Locations', text: 'From The Basement and the university to the lake cathedral and the primeval forest.' },
    { key: 'gallery', name: 'Gallery', nav: 'Gallery', text: 'Concept art, key art and wallpapers of Myncha and Exius.' },
    { key: 'soundtrack', name: 'Soundtrack', nav: 'Soundtrack', text: 'The music of Myncha: Vampires of Exius.' },
];

// ---------------------------------------------------------------- characters
// Each character has a profile page (/characters/<key>) with a banner and a portrait.
// Art (tools/myncha_assets.py): characters/<key>.webp (3:4 portrait) and characters/<key>-banner.webp (16:9).
// `bio: null` shows MY.soon. `forms`: extra looks with their own art, e.g. a werewolf's wolf form
// (characters/<key>-beast.webp). The first form is the character's main look.
const WOLF = [{ suffix: '', name: 'Human' }, { suffix: '-beast', name: 'Wolf form' }];

export const MY_GROUPS = [
    {
        key: 'vampires', name: 'Vampires', color: '#b48cff',
        text: 'Humans who were turned. Myncha is the only one who came from the real world; the others have only ever known Exius.',
        members: [
            {
                key: 'myncha', name: 'Myncha', role: 'The girl from the real world',
                bio: 'A university student who had lived a quiet, ordinary life until the night she fell in love on a dance floor. Turned by a vampire patriarch before her first kiss, she is the only human from the real world in Exius. In the sun her skin turns to diamond; in her chest burns a hunger she fights with everything she has left of herself. She crossed the Mirror of Fate to find the one she lost.',
                facts: [['Origin', 'The real world'], ['Curse', 'Skin that turns to diamond in the sun'], ['Searching for', 'Bryan']],
                forms: [{ suffix: '', name: 'Vampire' }, { suffix: '-human', name: 'Human' }],
            },
            { key: 'vickie', name: 'Vickie', role: 'Vampire of Exius · ally', bio: 'Like Myncha, she was human once and was turned. Unlike Myncha, she has only ever existed in Exius. She becomes one of Myncha’s allies.', facts: [['Origin', 'Exius']] },
            { key: 'rita', name: 'Rita', role: 'Vampire of Exius · ally', bio: 'A human turned vampire who belongs to Exius alone. She becomes one of Myncha’s allies.', facts: [['Origin', 'Exius']] },
        ],
    },
    {
        key: 'night', name: 'The Night It Began', color: '#5fd6e6',
        text: 'The people of the real world on the night that changed everything.',
        members: [
            { key: 'bryan', name: 'Bryan', role: 'The boy from the dance floor', bio: 'The stranger Myncha fell in love with at first sight. They danced for hours and walked into the woods to see the moon, and then the shadows tore open. All she found the next morning were his car keys. Later, in the crypt of a ruined cathedral, she found a torn strap of his leather jacket.', facts: [['Origin', 'The real world']] },
            { key: 'sire', name: 'The Sire', role: 'Vampire patriarch', bio: 'A vampire of immense, suffocating power who took Bryan, and who, moved by a twisted pity, remade Myncha instead of killing her. The pendant he wore led her to an ancient book, and the book to Exius.' },
            { key: 'dark-ladies', name: 'The Dark Ladies', role: 'The Sire’s companions', bio: 'The two vampire women who came out of the shadows at his side that night.' },
        ],
    },
    {
        key: 'werewolves', name: 'Werewolves', color: '#7aa6d8',
        text: 'Each one walks beside a wolf, and each one has another shape.',
        members: [
            { key: 'wynclaw', name: 'Wynclaw', role: 'Werewolf', bio: null, forms: WOLF },
            { key: 'nightfang', name: 'Nightfang', role: 'Werewolf', bio: null, forms: WOLF },
            { key: 'lucian', name: 'Lucian', role: 'Werewolf', bio: null, forms: WOLF },
        ],
    },
    {
        key: 'fairies', name: 'Fairies', color: '#8fd18f',
        text: 'The winged folk of the magical woods.',
        members: [
            { key: 'ember', name: 'Ember', role: 'Fairy', bio: null },
            { key: 'lioren', name: 'Lioren', role: 'Fairy', bio: null },
            { key: 'wink', name: 'Wink', role: 'Fairy', bio: null },
        ],
    },
    {
        key: 'ghouls', name: 'Ghouls', color: '#9aa0a8',
        text: 'Not quite dead, not quite anything else.',
        members: [
            { key: 'gendall', name: 'Gendall', role: 'Ghoul', bio: null },
            { key: 'gengi', name: 'Gengi', role: 'Ghoul', bio: null },
            { key: 'mika', name: 'Mika', role: 'Ghoul', bio: null },
        ],
    },
    {
        key: 'church', name: 'The Church', color: '#e3c27a',
        text: 'The faithful of a small parish in Exius.',
        members: [
            { key: 'aurelius', name: 'Aurelius', role: 'The Church', bio: null },
            { key: 'father-andrew', name: 'Father Andrew', role: 'The Church', bio: null },
            { key: 'sister-camelia', name: 'Sister Camelia', role: 'The Church', bio: null },
        ],
    },
    {
        key: 'emissaries', name: 'The Church Emissaries', color: '#f0a33c',
        text: 'The seven emissaries of the Church. Myncha’s search for the one she loves will bring her face to face with each of them, one by one.',
        members: [
            { key: 'cardinal-gabriel', name: 'Cardinal Gabriel', role: 'Church Emissary', bio: null },
            { key: 'antoanette', name: 'Antoanette', role: 'Church Emissary', bio: null },
            { key: 'awilda', name: 'Awilda', role: 'Church Emissary', bio: null },
            { key: 'georgina', name: 'Georgina', role: 'Church Emissary', bio: null },
            { key: 'hortense', name: 'Hortense', role: 'Church Emissary', bio: null },
            { key: 'jake', name: 'Jake', role: 'Church Emissary', bio: null },
            { key: 'troy', name: 'Troy', role: 'Church Emissary', bio: null },
        ],
    },
    {
        key: 'hunters', name: 'Vampire Hunters', color: '#e06a6a',
        text: 'The people of Exius know vampires exist. Some of them hunt.',
        members: [
            { key: 'barbara', name: 'Barbara', role: 'Vampire hunter', bio: null },
            { key: 'clementina', name: 'Clementina', role: 'Vampire hunter', bio: null },
            { key: 'cliff', name: 'Cliff', role: 'Vampire hunter', bio: null },
        ],
    },
];

// Every character in order, with its group (for profiles and Previous / Next).
export const MY_CHARACTERS = MY_GROUPS.flatMap((g) => g.members.map((c) => ({ ...c, group: g })));
export const findCharacter = (key) => MY_CHARACTERS.find((c) => c.key === key);

// ---------------------------------------------------------------- the curse
// Art: curse/<key>.webp (16:9).
export const MY_CURSE = [
    {
        key: 'diamond', name: 'The Diamond Curse', color: '#9fe8ff',
        text: [
            'The sun does not burn Myncha. It does something slower and worse: it turns her skin into diamond, a beautiful, rigid crystal that spreads with every minute in the light.',
            'Wrapped in her black mantle she can endure the daylight for a while. The mantle slows her down and steals her agility, but it shelters her skin and makes her harder to hurt. When that endurance runs out, the crystal takes over. Her body grows heavy, she can no longer run or leap, and only the hard diamond on her arms lets her turn blows aside.',
            'If she stays in the light until the diamond covers her completely, there is no way back: Myncha becomes a statue of crystal, forever.',
        ],
    },
    {
        key: 'hunger', name: 'The Hunger', color: '#ff5a76',
        text: [
            'Since the night she was turned, an ache lives in her chest: a monstrous thirst for blood. It grows with time, and it grows faster every time she pushes her new body to its limits.',
            'Animal blood keeps it at bay and keeps her soul clean: rats and bats in the city, foxes and fawns in the forest, and best of all, the feral monsters of Exius. Human blood quenches it completely and fills her with a dark, intoxicating strength, and it always costs something she can never get back.',
            'The hungrier she is, the weaker her powers become and the faster her sanity slips. Starving, her body begins to consume itself.',
        ],
    },
    {
        key: 'guilt', name: 'The Weight of Guilt', color: '#c9a2ff',
        text: [
            'Myncha has not stopped being human inside. Every innocent life she takes stays with her.',
            'At first it is anxiety, a fear that follows her even when she rests. With the third life, the guilt breaks her: she falls to her knees in a panic she cannot control, and the sadness never fully leaves. With the fourth, nightmares tear her from her sleep, hungrier than before. The fifth would be the end of who she was: her human soul would dissolve, and only the monster would remain.',
        ],
    },
    {
        key: 'day-night', name: 'Day and Night', color: '#ffd38a',
        text: [
            'In Exius, the day is the danger: the sun hunts her skin, and she must move through shadows, ruins and the shelter of her mantle.',
            'The night gives her skin back to her, and her endurance slowly returns. But the night belongs to the monsters too. Everything that hunts grows fiercer after dark, and stalkers far more powerful come out to hunt in the places that were safe by day.',
            'At certain sanctuaries she can rest and let the hours pass, from day to night or night to day. Waiting is never free: time feeds the hunger.',
        ],
    },
    {
        key: 'humans', name: 'The Humans of Exius', color: '#e3c27a',
        text: [
            'Unlike the people of the real world, the people of Exius know that vampires exist. Some hunt them: armed zealots with silver and stakes who attack on sight.',
            'Others want them. The dark seekers dream of being turned. They walk calmly toward her, pull back their collars and offer their necks, and their presence alone wakes the hunger in her like nothing else. Myncha does not have to feed: a gust of her wind can push them back long enough for her to pass them by.',
        ],
    },
];

// Her powers and the fighting arts she learns. Art: curse/arts/<key>.webp (16:9).
export const MY_POWERS = [
    { name: 'The Blur', text: 'Speed beyond anything human: she does not dodge, she blurs, leaving a trail of cyan and violet light.' },
    { name: 'Diamond Claws', text: 'Her nails sharpen into points as hard as diamond.' },
    { name: 'Starlight Armor', text: 'A touch of starlight is enough to harden her skin into a glittering shield in an instant.' },
    { name: 'The Wind', text: 'A magic of her own nature: gusts that push, pull and gather whatever stands in her way.' },
    { name: 'Umbral Snatch', text: 'Hidden under her mantle, she lunges and bites a feral beast in a heartbeat, enough to keep the hunger quiet. She never takes a human this way.' },
    { name: 'The Leap', text: 'Legs strong enough to launch her into the canopy, and the balance to strike from above.' },
];

export const MY_ARTS = [
    { name: 'Shattered Amethyst', text: 'A chain of four claw strikes, the heart of her fighting.' },
    { name: 'Lunar Uprising', text: 'A slash that staggers, and a heavy blow that throws the enemy into the air.' },
    { name: 'Grave-Dust Cascade', text: 'Strikes that end by slamming the enemy into the ground.' },
    { name: 'Crystalline Ruin', text: 'Three slow, crushing blows that break any guard.' },
    { name: 'Mourning Flurry', text: 'A heavy blow followed by two lightning cross-slashes and a final crush.' },
    { name: 'Exian Steel Waltz', text: 'A chain of strikes with the weapon she carries.' },
    { name: 'Gothic Intercept', text: 'Fast claws that pin the enemy before her weapon finishes the work.' },
    { name: 'Siren’s Redirect', text: 'Weapon, claw, weapon: a sweep that keeps the enemy at the right distance.' },
    { name: 'Velvet Ribbons', text: 'A quick claw and two wide weapon arcs to hold back a crowd.' },
    { name: 'Screaming Shroud', text: 'Three compressed waves of wind that push back everything in front of her.' },
    { name: 'Zephyr’s Claw', text: 'A gust that pulls a distant enemy straight into her claws.' },
    { name: 'Twisting Shards', text: 'Two vortexes that gather the enemies together, and a wide slash.' },
    { name: 'Sorrow’s Vortex', text: 'The wind draws them in; a crystal blow to the ground breaks them.' },
    { name: 'Armament Typhoon', text: 'The wind gathers a whole wave of enemies for one blow of her weapon.' },
];

// ---------------------------------------------------------------- exius
// Art: exius/<key>.webp (16:9).
export const MY_EXIUS = [
    { key: 'realm', name: 'The Realm of Exius', text: 'On the other side of the mirror, Myncha is still in the woods, and everything has changed. Exius is our Earth, with the same shape, rolled back into a distant, magical past: no highways, no city lights, no modern buildings. Ancient trees glow with a faint living light, the air hums with raw magic, and the night sky bleeds colors no human science has a name for.' },
    { key: 'mirror', name: 'The Mirror of Fate', text: 'An enormous mirror covered in glowing markings, hidden in the crypts beneath a ruined cathedral on a lake. It does not show a reflection, but a path through the woods: it is a threshold between worlds, a tear through time and space that ties the modern woods to something far older. The book that led Myncha there could not cross it.' },
    { key: 'two-worlds', name: 'Two Worlds', text: 'Myncha is the only human from the real world in Exius. Vampires like Vickie and Rita were human once too, but they have only ever existed on this side of the mirror.' },
    { key: 'peoples', name: 'The Peoples of Exius', text: 'Vampires and werewolves, fairies and ghouls, the Church and its seven emissaries, and the humans who hunt or worship the creatures of the night. The mysteries of this world are only beginning to open.' },
];

// ---------------------------------------------------------------- bestiary
// Art: bestiary/<key>.webp (16:9). `bio: null` shows that the entry is still being written.
export const MY_BESTIARY = [
    {
        key: 'enemies', name: 'Enemies', color: '#9aa0a8',
        entries: [
            { key: 'scavengers', name: 'The Scavengers', text: 'Small, wretched creatures that hunt in packs and feed on what they kill. They recognize a vampire as one of their own kind of predator.' },
            { key: 'shadow-beings', name: 'The Shadow Beings', text: 'Dark figures that glide across the lake and into the ruined cathedral. They sensed the newborn vampire in Myncha, and parted to let her through.' },
            { key: 'shadow-wolves', name: 'Shadow Wolves', text: 'Feral monsters of the forest. Their blood is the richest Myncha can drink without staining her soul.' },
            { key: 'stalkers', name: 'The Night Stalkers', text: 'Creatures far more powerful than anything that walks by day, which come out after dark to hunt in places that were safe in the sun.' },
        ],
    },
    {
        key: 'mini-bosses', name: 'Mini-Bosses', color: '#5fe0a0',
        entries: [
            { key: 'skeletal-dreadguard', name: 'The Skeletal Dreadguard', text: 'The bones of an ancient giant, raised by a bleeding green magic into a towering, many-limbed beast with emerald fire in its eyes. Only a force of explosive, unnatural strength can break what binds its marrow. It was the first creature Myncha faced in Exius.' },
        ],
    },
    {
        key: 'bosses', name: 'Bosses', color: '#ff5a76',
        entries: [
            { key: 'seven-emissaries', name: 'The Seven Emissaries', text: 'The seven emissaries of the Church, whom Myncha must face one by one on her way to the one she lost.' },
        ],
    },
];

// ---------------------------------------------------------------- locations
// Art: locations/<key>.webp (16:9).
export const MY_REGIONS = [
    {
        key: 'real-world', name: 'The Real World', color: '#5fd6e6',
        places: [
            { key: 'the-basement', name: 'The Basement', where: 'The club', text: 'A crowded, pulsing college night where Myncha saw a stranger across the dance floor and fell in love for the first time.' },
            { key: 'moonlit-woods', name: 'The Moonlit Woods', where: 'Outside the city', text: 'Where they went to admire the moon, and where the shadows tore open. Next to them, an old graveyard.' },
            { key: 'university', name: 'The University', where: 'Myncha’s campus', text: 'Her sanctuary, which felt entirely alien the morning after: the dorm where she locked herself away, and the archives where she found the Sire’s sigil.' },
            { key: 'coffee-shop', name: 'The Coffee Shop', where: 'Near campus', text: 'Where Myncha drank her favorite coffee one last time, as a farewell to her human life.' },
            { key: 'lake-cathedral', name: 'The Lake Cathedral', where: 'Deep in the woods', text: 'An ancient, decaying cathedral in the middle of a hidden, mist-covered lake. Beneath it, the crypts, and the Mirror of Fate.' },
        ],
    },
    {
        key: 'exius', name: 'Exius', color: '#b48cff',
        places: [
            { key: 'primeval-forest', name: 'The Primeval Forest', where: 'Beyond the mirror', text: 'Towering, glowing ancient trees under a sky of impossible colors, and the skittering of unseen things in the undergrowth.' },
            { key: 'clearing-of-bones', name: 'The Clearing of Bones', where: 'The forest', text: 'A grim clearing where the bleached bones of a prehistoric predator lay waiting to rise.' },
        ],
    },
];
