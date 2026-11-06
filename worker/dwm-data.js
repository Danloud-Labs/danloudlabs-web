// =====================================================================================
// Dark Within Me — website content: title, books, sections.
// An original saga by David Gomez Valerio (begun in 2011): story, characters and music are his.
// Chapter text is NOT here: each book's chapter summaries live in assets/projects/dwm/story/<book>.md
// (and the legends in assets/projects/dwm/legends.md), read live: editing them only needs a git push.
// =====================================================================================

import { asset } from './site-data.js';

export const DWM_BASE = '/dark-within-me-la-sua-origine';
export const DWM_ASSETS = asset('projects/dwm');
export const dwmAsset = (path) => `${DWM_ASSETS}/${path}`;

export const DWM = {
    title: 'Dark Within Me',
    author: 'David Gomez Valerio',
    since: 2011,
    tagline: 'Some pacts are signed in blood. This one was signed with half a soul.',
    logline: 'Italy, 1492. In a world where gods and demons live among men wearing human faces, a young soldier loses the woman he loves to a god, and accepts a demon’s offer to take her back.',
    copyright: 'Dark Within Me, its story, characters and music are original works by David Gomez Valerio and Danloud Labs LLC. © 2011–2026 Danloud Labs LLC. All rights reserved.',
};

// The four books, in reading order. `file`: the book's chapter summaries in assets/projects/dwm/story/
// (null until it is published). `cover`: assets/projects/dwm/books/<cover>.
export const DWM_BOOKS = [
    {
        key: 'la-sua-origine', n: 1, title: 'La Sua Origine', subtitle: 'The Origin', cover: 'la-sua-origine.webp', file: 'la-sua-origine.md', color: '#e0283f',
        synopsis: [
            'Tuscany, 1492. Cristian D’ San Fernald II is born into a world where gods and demons walk among men in human form, hidden behind noble names and ancient prisms. Orphaned at fourteen when a demon burns his parents alive, he becomes a soldier, then the trusted counsellor of the Brasco family.',
            'In Scotland he meets Elizabeth Gloucester, heir to the royal blood of Siena, and falls in love. But her father wants her married to a god, and Dionisio, god of wine and pleasure and member of the Celestial Union, wants her for himself. Left for dead by Dionisio, Cristian is offered a pact from the darkness: the power to win her back, for half of his soul.',
            'To become human again he must take four souls darkened by sin: a warlord in Japan, a pirate in Newfoundland, a pharaoh who hid from death in Egypt, and a king who cheated death in the lost city of Romania.',
        ],
    },
    {
        key: 'the-army-of-light', n: 2, title: 'The Army of Light', cover: 'the-army-of-light.webp', file: null, color: '#c9ccd6',
        synopsis: [
            'Centuries later, the seat of Dionisio in the Celestial Union stands empty, and the gods have learned how he died. Judging Cristian a threat to the balance of the three worlds, the Union calls upon its strongest warriors, the Army of Light.',
            'Elizabeth’s soul has returned to the world in a new body and a new life, with no memory of who she was. To reach her, Cristian will search for the four forbidden arts, hidden in places no man was meant to find and guarded by beasts no man was meant to face, while an old friend among the gods must choose between him and her own kind.',
        ],
    },
    {
        key: 'ricardo-monteoro', n: 3, title: 'Ricardo Monteoro', cover: 'ricardo-monteoro.webp', file: null, color: '#d9a64a',
        synopsis: [
            'Dublin, the tenth century. Ricardo Monteoro, an orphan raised among thieves, becomes the most wanted man in Ireland. When he breaks into the palace of a demon living in human form, he is not punished. He is hired.',
            'His task: steal the Scroll of Resurrection from the castle of Zeus. The gold that follows makes him a king. The feather left behind makes him prey. The story of a soul that refused to stay dead.',
        ],
    },
    {
        key: 'after-dawn', n: 4, title: 'After Dawn', cover: 'after-dawn.webp', file: null, color: '#8b5cf6',
        synopsis: [
            'Every war between light and darkness has ended the same way: with one side forced into the shadows. But the shadows remember, and they have been waiting.',
            'When the dawn finally seems to come, an old alliance shows its true face, the gates between the worlds are tested, and Cristian must carry a power that was never meant for human hands.',
        ],
    },
];

export const findBook = (key) => DWM_BOOKS.find((b) => b.key === key);

// Main page: the three ideas the saga stands on.
export const DWM_PREMISE = [
    { k: 'Gods and Demons', t: 'Born of the same Father and divided since the beginning, they live among men in human form: nobles, priests and landowners with the power of an ancient beast.' },
    { k: 'The Prism', t: 'Gods and demons have no soul. They carry a Prism: the essence that holds their human form, their power and the beast that protects them.' },
    { k: 'The Pact', t: 'Demons may not touch the world of men directly. But a man who accepts their power can, and every soul he takes darkens his own.' },
];

// Sections (main page and sub-navigation). Only 'live' ones are linked.
export const DWM_SECTIONS = [
    { key: 'story', name: 'The Story', nav: 'Story', status: 'live', text: 'Four books, from the Tuscany of 1492 to a war between the three worlds.' },
    { key: 'characters', name: 'Characters', status: 'soon', text: 'Cristian, Elizabeth, the Celestial Union, the Demon Union and the four souls of the Assassination List.' },
    { key: 'universe', name: 'The Universe', nav: 'Universe', status: 'live', text: 'The Prism, gods and demons, the Celestial Union, the Army of Light, the ranks of both sides and the timeline.' },
    { key: 'legends', name: 'Legends', nav: 'Legends', status: 'live', text: 'Before the first book: the birth of light and darkness, and the war that sent the demons into the shadows.' },
    { key: 'locations', name: 'Locations', status: 'soon', text: 'Siena, Tuscany, Japan, Newfoundland, Egypt, the lost city of Romania, Heaven and the Underworld.' },
    { key: 'soundtrack', name: 'Soundtrack', nav: 'Soundtrack', status: 'live', text: 'The original music of Dark Within Me, composed by the author since 2011.' },
];
