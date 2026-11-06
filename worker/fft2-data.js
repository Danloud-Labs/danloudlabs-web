// =====================================================================================
// Final Fantasy Tactics II: The Moon and the Radiant Sword — website content.
// A fan-made concept by David Gomez Valerio (Danloud Labs). Source: David's "Official Story &
// World Canon Compendium", "Narrative" and his design notes. Only what the game would show
// openly is here: the houses' hidden agendas and the secrets of Ordallia stay out.
// Art lives in assets/projects/fft2/ (tools/fft2_assets.py); a missing image shows an empty
// labeled frame on the page.
// =====================================================================================

import { asset } from './site-data.js';

export const FFT_BASE = '/fftii';
export const FFT_ASSETS = asset('projects/fft2');
export const fftAsset = (path) => `${FFT_ASSETS}/${path}`;
export const FFT_MEDIA = 'https://store.danloudlabs.com/fft2';

export const FFT = {
    title: 'Final Fantasy Tactics II',
    subtitle: 'The Moon and the Radiant Sword',
    author: 'David Gomez Valerio',
    tagline: 'History is written by those who survive to tell it.',
    logline: 'Twenty years after the War of the Lions, Ivalice has no king. As five houses gather in Lesalia to choose one, a prince of Ordallia and the daughter of two heroes walk toward the same city, one guided by the moon, the other by a radiant light.',
    note: 'Final Fantasy Tactics II: The Moon and the Radiant Sword is an independent fan-made concept by David Gomez Valerio and Danloud Labs LLC. Final Fantasy, Final Fantasy Tactics, Ivalice and all related characters are trademarks of Square Enix Holdings Co., Ltd. This project is not affiliated with, endorsed or sponsored by Square Enix.',
};

// The two journeys of the game (main page).
export const FFT_PATHS = [
    { key: 'moon', name: 'The Path of the Moon', hero: 'Prince Lucius Bourdeaux', img: 'characters/lucius.webp', color: '#8fa3ff',
        text: 'The second prince of Ordallia, brilliant and overshadowed, who wears his late mother’s crest of the Crescent Moon. His father sends him to Lesalia as a royal envoy, to sign peace with Ivalice and to compete for its crown.' },
    { key: 'light', name: 'The Path of Light', hero: 'Aveline Bunansa Oaks', img: 'characters/aveline.webp', color: '#f2b84b',
        text: 'The hidden daughter of the Holy Knight Agrias Oaks and the machinist Mustadio Bunansa. When her father’s compass wakes and points to the heart of Ivalice, she puts on her mother’s armor and follows a light from her dreams.' },
];

// Sections (sub-navigation and main page). Only 'live' ones are linked.
export const FFT_SECTIONS = [
    { key: 'story', name: 'The Story', nav: 'Story', status: 'live', text: 'The fall of a king, twenty years of no man’s land and the two journeys that begin when the world moves again.' },
    { key: 'characters', name: 'Characters', nav: 'Characters', status: 'live', text: 'House Bourdeaux of Ordallia, the Oaks family, the heirs of the five houses and the heroes of the War of the Lions.' },
    { key: 'world', name: 'The World', nav: 'World', status: 'live', text: 'The five houses of Ivalice, the Leadership Games and the empires beyond the border.' },
    { key: 'relics', name: 'The Relics', nav: 'Relics', status: 'live', text: 'Aethelgard and Dawnweaver: the two sovereign blades of light and of the moon.' },
    { key: 'jobs', name: 'Jobs', nav: 'Jobs', status: 'live', text: 'Eight new jobs and the classic jobs of Ivalice, reimagined.' },
    { key: 'locations', name: 'Locations', nav: 'Locations', status: 'live', text: 'Verminhan, Lesalia, Goug and the regions of a broken kingdom.' },
    { key: 'soundtrack', name: 'Soundtrack', nav: 'Soundtrack', status: 'live', text: 'The music of The Moon and the Radiant Sword.' },
];

// ---------------------------------------------------------------- characters
// `img`: characters/<key>.webp (3:4 sheet; other shapes are fitted inside the frame).
export const FFT_GROUPS = [
    {
        key: 'bourdeaux', name: 'House Bourdeaux', sub: 'The royal family of Ordallia', color: '#8fa3ff',
        text: 'The ruling house of the Empire of Ordallia, which spent the twenty years of Ivalice’s ruin growing richer and stronger, unbroken by civil war.',
        members: [
            { key: 'lucius', name: 'Prince Lucius Bourdeaux', role: 'Second prince · The Crescent Moon', bio: 'Twenty-one, brilliant, reflective and highly educated. The “spare” prince, he chose his late mother’s crest, a crescent moon swallowing a star, and is the only one of her children who still honors her memory. Fights with the Ordallian royal rapier.' },
            { key: 'nocturne', name: 'Nocturne', role: 'Lucius’s black chocobo', bio: 'The black chocobo that carries the prince of the Moon.' },
            { key: 'marcel', name: 'King Marcel Bourdeaux', role: 'King of Ordallia', bio: 'A battle-hardened monarch who led Ordallia through the end of the Fifty Years’ War. He wields Dawnweaver, the ancestral sword he believes brought his empire twenty years of prosperity while Ivalice rotted.' },
            { key: 'valerand', name: 'Prince Valerand Bourdeaux', role: 'Crown prince · The Golden Sun', bio: 'The favored son and a brilliant battlefield commander, arrogant and strictly traditional. He sees Ivalice as ripe for the taking, Lucius as a soft philosopher, and Dawnweaver as his birthright.' },
            { key: 'genevieve', name: 'Princess Genevieve Bourdeaux', role: 'Youngest princess · Mistress of intelligence', bio: 'Sharp and observant, she runs the court’s shadow networks and counter-espionage. Lucius’s closest ally, she prefers his temperament to Valerand’s arrogance.' },
        ],
    },
    {
        key: 'oaks', name: 'The Oaks Family', sub: 'The Path of Light', color: '#f2b84b',
        text: 'A family hidden for twenty years in the volcanic valleys outside Goug, behind a homestead full of mechanical traps.',
        members: [
            { key: 'aveline', name: 'Aveline Bunansa', role: 'Holy Knight and machinist · among commoners', bio: 'Twenty years old. From her mother, the sword arts of the Holy Knights; from her father, an engineer’s mind and an eye for weak points. Among miners and mechanics she uses her father’s name.' },
            { key: 'lady-aveline', name: 'Lady Aveline Oaks', role: 'The same woman · among the nobility', bio: 'Before high nobles, and at the doors of forbidden ruins, she uses her mother’s name to command respect, though the Church still records Agrias Oaks as a heretic.' },
            { key: 'agrias', name: 'Agrias Oaks', role: 'Holy Knight in hiding · Aveline’s mother', bio: 'In her late forties, scarred by a hundred battles and walking with a limp. Branded a heretic, she vanished after the War of the Lions. She knows the signs of the old world better than anyone.' },
            { key: 'effigy', name: 'Effigy', role: 'Chocobo of the Oaks family', bio: 'The armored chocobo of the Oaks homestead.' },
        ],
    },
    {
        key: 'ironclad', name: 'House Ironclad', sub: 'Lionel · The Anvil & Plow', color: '#c98a5a',
        text: 'Blacksmiths and farmers who rebuilt Lionel with their own hands when the lords abandoned it. Twenty years later they are too strong to ignore.',
        members: [
            { key: 'arthur', name: 'Arthur “The Anvil” Ironclad', role: 'Leader of House Ironclad', bio: 'The blacksmith who organized the starving peasants of Lionel and reopened its iron mines.' },
            { key: 'beatrix', name: 'Beatrix Ironclad', role: 'Heir of House Ironclad', bio: 'Arthur’s eldest daughter: rough around the edges and heavily armored.' },
            { key: 'gideon', name: 'Gideon Ironclad', role: 'Youngest son of House Ironclad', bio: 'Nineteen, warm, a little awkward, fiercely loyal and surprisingly witty. He learned the mechanical side of the smithy and fights with a heavy crossbow and tinkered gadgets.' },
            { key: 'boco', name: 'Boco', role: 'Red chocobo of House Ironclad', bio: 'The red chocobo of the Ironclads.' },
        ],
    },
    {
        key: 'beoulve', name: 'House Beoulve', sub: 'Fovoham · The Golden Knight', color: '#7fa0e0',
        text: 'Shamed by the treachery of Dycedarg, the Beoulves spent twenty years doing the thankless work: clearing monsters, policing the roads and shielding the common folk.',
        members: [
            { key: 'robert', name: 'Lord Commander Robert Beoulve', role: 'Leader of House Beoulve', bio: 'The knight who has rebuilt the honor of the Beoulve name one road at a time.' },
            { key: 'cedric', name: 'Cedric Beoulve', role: 'Heir of House Beoulve', bio: 'Robert’s honorable, tactical son.' },
        ],
    },
    {
        key: 'larg', name: 'House Larg', sub: 'Gallione · The White Lion', color: '#e9e2cf',
        text: 'Gallione was left bankrupt. House Larg revived the trade routes of Dorter and rebuilt its merchant fleets, buying back its stability with coin.',
        members: [
            { key: 'elric', name: 'Marquis Elric Larg', role: 'Leader of House Larg', bio: 'The patron of the Leadership Games, who proposed a civilized way to choose a king.' },
            { key: 'valen', name: 'Valen Larg', role: 'Heir of House Larg', bio: 'Elric’s polished, diplomatic son.' },
        ],
    },
    {
        key: 'goltana', name: 'House Goltana', sub: 'Zeltennia · The Black Lion', color: '#c0394a',
        text: 'Zeltennia was nearly a graveyard after the war. House Goltana hunted down rogue mercenaries and fortified the western border for twenty years.',
        members: [
            { key: 'marissa', name: 'Dowager Countess Marissa Goltana', role: 'Leader of House Goltana', bio: 'She has carried the house through twenty bitter years and promises an army that will make Ivalice unbreakable.' },
            { key: 'julian', name: 'Julian Goltana', role: 'Heir of House Goltana', bio: 'Marissa’s proud, martial son.' },
        ],
    },
    {
        key: 'atkascha', name: 'House Atkascha', sub: 'Lesalia · The Crowned Dragon', color: '#a77fd6',
        text: 'The old capital suffered the worst of the famine. The surviving Atkaschas rationed every grain and saved the ancient archives from the wilderness.',
        members: [
            { key: 'kenneth', name: 'High Regent Duke Kenneth Atkascha', role: 'Leader of House Atkascha', bio: 'Keeper of the line of King Ondoria III and of the ancient laws of Ivalice.' },
            { key: 'lysandra', name: 'Princess-Regent Lysandra Atkascha', role: 'Heir of House Atkascha', bio: 'Kenneth’s traditionalist granddaughter.' },
        ],
    },
    {
        key: 'legends', name: 'The War of the Lions', sub: 'Twenty years ago', color: '#d9c49a',
        text: 'The heroes and the king of the first war, as the intro remembers them.',
        members: [
            { key: 'delita', name: 'King Delita Heiral', role: 'The lowborn king', bio: 'The commoner who rose to the throne at the end of the War of the Lions. The history books say he unified the realm and ruled in peace.' },
            { key: 'agrias-young', name: 'Agrias Oaks', role: 'Holy Knight · in the War of the Lions', bio: 'Sworn protector of Princess Ovelia, and one of the companions of Ramza Beoulve.' },
            { key: 'mustadio', name: 'Mustadio Bunansa', role: 'Machinist of Goug', bio: 'The son of Besrudio and a master of lost machines. He spent his last years building a safe home for his family, and died saving the miners of Goug in a cave-in.' },
            { key: 'ramza', name: 'Ramza Beoulve', role: 'The heretic knight', bio: 'The knight the Church branded a heretic, who vanished from history at the end of the War of the Lions.' },
        ],
    },
];

// ---------------------------------------------------------------- the world
// Crest art: world/houses/<key>.webp (1:1).
export const FFT_HOUSES = [
    { key: 'goltana', name: 'House Goltana', crest: 'The Black Lion', region: 'Zeltennia · West', colors: ['#141414', '#b3202f'], colorNames: 'Midnight Black & Crimson Red', leader: 'Dowager Countess Marissa Goltana', heir: 'Julian Goltana', aim: 'Rebuild the royal army and turn Ivalice into a fortress against Ordallia and Romanda.' },
    { key: 'larg', name: 'House Larg', crest: 'The White Lion', region: 'Gallione · East', colors: ['#f4f1e8', '#d4a73a'], colorNames: 'Pristine White & Royal Gold', leader: 'Marquis Elric Larg', heir: 'Valen Larg', aim: 'Unify Ivalice through intellect, trade and stability instead of bloodshed.' },
    { key: 'atkascha', name: 'House Atkascha', crest: 'The Crowned Dragon', region: 'Lesalia · Capital', colors: ['#5b2a86', '#b8913a'], colorNames: 'Royal Purple & Burnished Gold', leader: 'High Regent Duke Kenneth Atkascha', heir: 'Princess-Regent Lysandra Atkascha', aim: 'Preserve the divine bloodline of King Ondoria III and the ancient laws.' },
    { key: 'beoulve', name: 'House Beoulve', crest: 'The Golden Knight', region: 'Fovoham · North-Central', colors: ['#1d2f5c', '#e3b23c'], colorNames: 'Navy Blue & Sun Gold', leader: 'Lord Commander Robert Beoulve', heir: 'Cedric Beoulve', aim: 'Restore the honor of the Beoulve name through selfless, knightly protection.' },
    { key: 'ironclad', name: 'House Ironclad', crest: 'The Anvil & Plow', region: 'Lionel · South', colors: ['#6b6f75', '#b06a3b'], colorNames: 'Iron Grey & Earthy Copper', leader: 'Arthur “The Anvil” Ironclad', heir: 'Beatrix Ironclad', aim: 'Prove that the working people who rebuilt Ivalice deserve to govern it.' },
];

// The Leadership Games: art world/games/<key>.webp (16:9).
export const FFT_GAMES = {
    text: 'To keep Ivalice from another civil war while foreign empires wait at the border, the leaders of the five houses formed a Grand Coalition Council and created the Leadership Games: a tournament of statecraft and martial worth, held in the neutral ruins of the Royal City of Lesalia and judged by a council of elder arbiters. To win the crown, an heir must prove they can rule.',
    trials: [
        { key: 'sand-table', n: 'I', name: 'The Trial of Logistics', alt: 'The Sand Table', text: 'Inside the old Lesalian parliament, every heir faces the same imaginary crisis: a plague, a border blockade, an economic collapse. They must manage resources, move troops and write emergency laws in real time.' },
        { key: 'neutral-court', n: 'II', name: 'The Trial of Diplomacy', alt: 'The Neutral Court', text: 'A week of galas and public debates. The heirs are judged on the alliances they form, the old border disputes they settle and the favor they win from the neutral guilds, from the mining syndicates to what remains of the clergy.' },
        { key: 'grand-melee', n: 'III', name: 'The Trial of Chivalry', alt: 'The Grand Melee', text: 'A controlled arena where the heirs and their sworn guards fight with dulled weapons and armor enchanted to register clean hits. It tests leadership, positioning and personal skill under pressure.' },
    ],
};

// Beyond the border: art world/empires/<key>.webp (16:9).
export const FFT_EMPIRES = [
    { key: 'ordallia', name: 'The Empire of Ordallia', where: 'East of Ivalice', text: 'Ivalice’s old rival in the Fifty Years’ War. Ruled by House Bourdeaux from the royal city of Verminhan, it spent twenty years unbroken by war, growing rich and gathering great armies.' },
    { key: 'romanda', name: 'Romanda', where: 'Across the Rhana Strait', text: 'A militaristic island nation that also spent the twenty years of Ivalice’s ruin building its strength, waiting for the right moment.' },
];

// The state of Ivalice, twenty years after the war (World page intro).
export const FFT_STATE = [
    'The history books say King Delita Heiral unified the realm and ruled in peace. In truth, his reign lasted a single year. He left no heirs, no bloodline and no one to follow him.',
    'For twenty years Ivalice was a no man’s land: famine, plague, bandit clans and the lingering corruption of the shattered Zodiac Stones. The noble houses lost their wealth, their soldiers and their lands, and had to rebuild from nothing, clearing blighted soil and defending the common folk just to survive.',
    'Now they have finally stood up again, and the throne is still empty.',
];

// ---------------------------------------------------------------- relics
// Art: relics/<key>.webp (3:4 sheet).
export const FFT_RELICS = [
    {
        key: 'aethelgard', name: 'Aethelgard', title: 'The Sovereign Blade of Light', color: '#f2b84b',
        facts: [['Origin', 'Forged in the First Age from the molten core of a fallen star, quenched in the tears of a grieving goddess.'], ['Blade', 'A flawless white-gold knight sword, half translucent, rippling with an inner solar fire and holy runes along the fuller.'], ['Hilt', 'Outstretched angel wings holding a tear-shaped sapphire; white leather grip bound in gold wire; a crown pommel with a solar crystal.']],
        text: 'It gives off a constant, warm aura of holy light that cures madness, repels dark magic and shields allies from fear. It cannot be wielded by ambition or anger: its true power wakes only for pure, selfless hope. Aveline has seen it in her dreams, buried in a ruin no map shows.',
    },
    {
        key: 'dawnweaver', name: 'Dawnweaver', title: 'The Sovereign Blade of the Moon', color: '#8fa3ff',
        facts: [['Keeper', 'King Marcel Bourdeaux. To be passed to Crown Prince Valerand after his coronation.'], ['Blade', 'A grand, heavy double-edged knight sword whose dark fuller is etched with starlight and constellations.'], ['Hilt', 'A crescent-moon crossguard of polished iron and burnished silver around a glowing sapphire; a braided two-handed grip; a crescent-moon pommel holding a dark star.']],
        text: 'The ancestral sword of House Bourdeaux, revered across Ordallia as a holy gift of the gods, a blade of the moon whose radiant aura brought the empire twenty years of prosperity while Ivalice burned. Lucius has admired it all his life. He has never been allowed to touch it.',
    },
];

// ---------------------------------------------------------------- jobs
// Art: jobs/<key>.webp (concept sheet, male and female).
export const FFT_JOBS = [
    {
        key: 'new', name: 'New Jobs', text: 'Eight jobs created for The Moon and the Radiant Sword.',
        jobs: [
            { key: 'alchemist', name: 'Alchemist', role: 'Item magic', text: 'Magic delivered through catalyst vials: no charge time, but a short range of two to three tiles and a single target per action.' },
            { key: 'templar', name: 'Templar', role: 'Holy knight', text: 'A heavily armored front-liner with sacred blade disciplines and a strong defense against magic.' },
            { key: 'chocobo-breeder', name: 'Chocobo Breeder', role: 'Mount synergy', text: 'Fights with and from the saddle: chocobo tactics, field mobility and dynamic positioning.' },
            { key: 'invoker', name: 'Invoker', role: 'Spirit summoning', text: 'Swift summons and spiritual channeling that reshape a small area of the battlefield.' },
            { key: 'magician', name: 'Magician', role: 'Arcane tricks', text: 'Illusions, status shifts and unconventional magic that throws the enemy off balance.' },
            { key: 'hwarang', name: 'Hwarang', role: 'Warrior-scholar', text: 'An elite warrior-scholar inspired by Korean tradition: blade and bow mastery and leadership auras.' },
            { key: 'gladiator', name: 'Gladiator', role: 'Frontline brute', text: 'High-risk physical power, crowd disruption and melee dominance.' },
            { key: 'red-mage', name: 'Red Mage', role: 'Hybrid caster', text: 'Rapier swordplay with a balance of black and white magic.' },
        ],
    },
    {
        key: 'classic', name: 'Classic Jobs', text: 'The jobs of the War of the Lions, redrawn for the new game.',
        jobs: [
            { key: 'squire', name: 'Squire', role: 'The beginning', text: 'Every soldier’s first job: basic skills, steady growth and the path to every other class.' },
            { key: 'chemist', name: 'Chemist', role: 'Items', text: 'Potions, remedies and phoenix downs, used anywhere on the field.' },
            { key: 'knight', name: 'Knight', role: 'Heavy sword', text: 'Heavy armor and the art of breaking the enemy’s weapons, armor and will.' },
            { key: 'archer', name: 'Archer', role: 'Ranged', text: 'Bows and crossbows, aimed shots and the high ground.' },
            { key: 'monk', name: 'Monk', role: 'Martial arts', text: 'Bare-handed fighting, chakra healing and the power to revive allies.' },
            { key: 'white-mage', name: 'White Mage', role: 'Healing', text: 'Cure, protect and raise: the light that keeps a party alive.' },
            { key: 'black-mage', name: 'Black Mage', role: 'Destruction', text: 'Fire, ice and lightning with long charge times and wide reach.' },
            { key: 'time-mage', name: 'Time Mage', role: 'Time and space', text: 'Haste, slow, stop and gravity: control of the battle’s clock.' },
            { key: 'summoner', name: 'Summoner', role: 'Summons', text: 'Calls the great beasts of legend to strike or heal a whole area.' },
            { key: 'thief', name: 'Thief', role: 'Speed and theft', text: 'Steals weapons, armor, gold and even hearts.' },
            { key: 'mediator', name: 'Orator', role: 'Words', text: 'Persuades, threatens and recruits enemies with words instead of steel.' },
            { key: 'mystic', name: 'Mystic', role: 'Status magic', text: 'Curses and blessings: silence, sleep, doubt and faith.' },
            { key: 'geomancer', name: 'Geomancer', role: 'The land', text: 'Turns the terrain itself into a weapon.' },
            { key: 'dragoon', name: 'Dragoon', role: 'Lance and leap', text: 'Leaps into the air and falls on the enemy with a spear.' },
            { key: 'samurai', name: 'Samurai', role: 'Katana', text: 'Draws on the spirits of legendary blades.' },
            { key: 'ninja', name: 'Ninja', role: 'Dual blades', text: 'Two weapons, thrown blades and unmatched speed.' },
            { key: 'bard-dancer', name: 'Bard & Dancer', role: 'Song and dance', text: 'Songs that lift allies and dances that weaken whole armies.' },
        ],
    },
];

// ---------------------------------------------------------------- locations
// Art: locations/<key>.webp (16:9).
export const FFT_REGIONS = [
    {
        key: 'ordallia', name: 'Ordallia', color: '#8fa3ff',
        places: [
            { key: 'verminhan', name: 'Verminhan', where: 'The royal city of Ordallia', text: 'A rich capital of towering walls, rivers and banners, where the trumpets never stop.' },
            { key: 'verminhan-throne', name: 'The Royal Throne of Verminhan', where: 'Verminhan Castle', text: 'Where King Marcel holds court beneath the banners of the Golden Sun, and where the Grand Heir Ceremony takes place.' },
            { key: 'verminhan-hallway', name: 'The Halls of Verminhan', where: 'Verminhan Castle', text: 'The high, vaulted corridors of the royal palace, and the private armory where Dawnweaver rests.' },
            { key: 'war-table', name: 'The War Room', where: 'Ordallia', text: 'A table with a map of Ivalice, and the pieces someone is already moving.' },
        ],
    },
    {
        key: 'ivalice', name: 'Ivalice', color: '#f2b84b',
        places: [
            { key: 'the-continent', name: 'Ivalice and Its Neighbors', where: 'The continent', text: 'The broken kingdom between Ordallia to the east and Romanda across the Rhana Strait.' },
            { key: 'lesalia-castle', name: 'The Royal Palace of Lesalia', where: 'Lesalia', text: 'The palace of the old capital, where a king walked its empty halls looking for help.' },
            { key: 'delita-tomb', name: 'The Cemetery of Lesalia', where: 'Lesalia', text: 'Where the lowborn king rests, under a stone with his name.' },
            { key: 'lesalia-ruins', name: 'The Royal City of Lesalia', where: 'The capital', text: 'Neutral ruins and the home of the Leadership Games.' },
            { key: 'lesalia-parliament', name: 'The Old Lesalian Parliament', where: 'Lesalia', text: 'Where the Trial of Logistics is played on the Sand Table.' },
            { key: 'goug-homestead', name: 'The Hidden Homestead', where: 'The volcanic valleys outside Goug', text: 'A rustic home hidden in the foliage and protected by Mustadio’s mechanical traps.' },
            { key: 'goug', name: 'Goug', where: 'The Clockwork City', text: 'The city of machinists, and the mines beneath it where Mustadio gave his life.' },
            { key: 'besrudio-workshop', name: 'Besrudio’s Workshop', where: 'The old workshop of Mustadio’s father', text: 'A place of lost machines and old secrets, where Agrias knows her daughter will find something.' },
            { key: 'zeltennia', name: 'Zeltennia', where: 'West · House Goltana', text: 'A castle that was nearly a graveyard, and a western border fortified for twenty years.' },
            { key: 'gallione', name: 'Gallione and Dorter', where: 'East · House Larg', text: 'Trade routes and merchant fleets rebuilt from nothing.' },
            { key: 'fovoham', name: 'Fovoham', where: 'North-Central · House Beoulve', text: 'Roads cleared of monsters by the knights of the Golden Knight.' },
            { key: 'lionel', name: 'Lionel', where: 'South · House Ironclad', text: 'Iron mines and farmland reopened by the hands of the people.' },
        ],
    },
    {
        key: 'beyond', name: 'Beyond Ivalice', color: '#c9ccd6',
        places: [
            { key: 'rhana-strait', name: 'The Rhana Strait', where: 'Between Ivalice and Romanda', text: 'The sea that separates Ivalice from the island nation of Romanda.' },
            { key: 'romanda', name: 'Romanda', where: 'Across the Rhana Strait', text: 'A militaristic island nation, untouched by Ivalice’s ruin.' },
        ],
    },
];
