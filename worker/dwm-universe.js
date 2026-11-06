// =====================================================================================
// Dark Within Me — the Universe page: how the world works (Prism, gods, demons, the Union,
// the ranks, the arts) and the timeline. Source: David's "God's & Devil's Ranks",
// "Cronología de Eventos", the Librerías definitions and La Sua Origine.
// Art (optional): assets/projects/dwm/universe/<key>.webp, shown above its card when present
// in DWM_UNIVERSE_ART below.
// =====================================================================================

// Keys of the cards that already have art in assets/projects/dwm/universe/.
export const DWM_UNIVERSE_ART = [];

export const DWM_LORE = [
    {
        key: 'three-worlds', name: 'The Three Worlds', c: '#c9ccd6',
        text: [
            'Heaven, the living world and the darkness below. God the Father made His two children heirs of all three: Vita to rule the light and Éres the shadows, with the world of men between them.',
            'The only gate between Heaven and earth is a magical illusion that opens with a key and turns invisible while it stands open. Mirtis, the funeral king of death, lost his way back through it ages ago, and has walked among men ever since.',
        ],
    },
    {
        key: 'prism', name: 'The Prism', c: '#e0283f',
        text: [
            'Gods have no soul. In its place they carry a Prism, the gift God the Father gave the Ikon to end their wars: reason, a body like that of men, and their old form as a beast, given a life of its own to be their protector and companion.',
            'A god who is killed does not simply die. The Prism gathers its essences into a floating, living specter that, over the years, can build a new human body. Only a god can truly kill another god, by absorbing its Prism while it is wounded: the Prism becomes power, and the killer’s animal essence takes both its strength and its protector. Owning two Prisms is forbidden, and every absorption leaves a mark that can be counted.',
        ],
    },
    {
        key: 'demons', name: 'Demons', c: '#8b1d2c',
        text: [
            'Demons are black gods: gods whose power comes from darkness. After the War between Light and Darkness they lost their Prisms and their human form, and were forced to carry their names backwards as a mark of shame. Reficul became Lucifer. Their animal essence slowly turned into something darker and less than a beast.',
            'A demon cannot touch the world of men directly, only what surrounds it: a train’s rails, a fire, a fever. But a person killed by a demon’s doing is condemned, and their soul belongs to the darkness instead of Heaven. That is why a demon who wants a man’s soul must make him a deal.',
        ],
    },
    {
        key: 'celestial-union', name: 'The Celestial Union', c: '#d9a64a',
        text: [
            'Founded by Herggott before the war, the Celestial Union writes and enforces the divine laws of Heaven, earth and the Underworld. Its members hold the highest rank among the gods, Imperial. Today it is made up of five gods and two humans chosen by the Union itself. Before the war, two demons sat among them too.',
            'A seat is filled only when one is empty, by a vote of the members, humans included. The gods of the Union do not mix their blood with mortals. Almost none of them.',
        ],
    },
    {
        key: 'army-of-light', name: 'The Army of Light', c: '#f2f2f7',
        text: [
            'Herggott’s own company: the strongest warriors among the gods, formed to lead the legions of light against Reficul. Its members hold the rank of Lord.',
            'To join it, a god must have lived more than a thousand years and received the insignia of God the Father. Lords have no duties and answer to no one but the Celestial Union, and only in an emergency that threatens the world. Their power is said to be beyond measure.',
        ],
    },
    {
        key: 'arts', name: 'Arts of Light and Darkness', c: '#a78bfa',
        text: [
            'Gods and demons fight with arts: techniques and prayers learned over centuries. Among the arts of light are Sanitatem, which heals every wound, Geminus, which splits a body in two, and the Thousand Thunders of Herggott. The most feared of all is the prayer of exile, which strips a demon of its Prism and its name.',
            'The dark arts are the measure of a demon’s rank. Some old gods who betrayed God the Father and joined the darkness know both, light and dark, which makes them the most dangerous creatures in the three worlds. Some arts are forbidden altogether, and hidden where no one was meant to find them.',
        ],
    },
];

// Six ranks each. `n`: what it takes; `t`: what they do.
export const DWM_GOD_RANKS = [
    { name: 'Os', n: 'Given with the Prism', t: 'Messengers of higher gods, soldiers of the legions, servants of the Union, spies and guardians of the living world.' },
    { name: 'Magus', n: 'Honored for valor in battle', t: 'Lead the Os legions, plan the strategies and tactics of each mission, and escort some members of the Union.' },
    { name: 'Frontier', n: 'The busiest rank', t: 'Run the affairs of the gods. A god who wants to live as a human asks a Frontier, who builds that life: name, status, home and family.' },
    { name: 'General', n: 'Needs a vacancy and proven skill', t: 'Enter the field when battles turn too fierce, and keep the peace and the divine laws in their regions of Heaven and earth.' },
    { name: 'Lord', n: '1,000 years and the insignia of God the Father', t: 'The Army of Light. Free of duties, they answer only to the Celestial Union in an emergency. The strongest warriors of all.' },
    { name: 'Imperial', n: 'A seat in the Union, by vote', t: 'The members of the Celestial Union, who write and enforce the laws of the three worlds.' },
];

export const DWM_DEMON_RANKS = [
    { name: 'Chimera', n: 'Count 0–10 · basic dark arts', t: 'Corrupt human souls. Weak alone, dangerous in packs: small legions and nomad hunters of pure souls.' },
    { name: 'Outsider', n: 'Count 10–30 · 3 dark arts', t: 'Lead the small legions and nomad packs. In the Royal Legion they hunt Frontiers and gods living as humans.' },
    { name: 'Gambler', n: 'Count 40–70 · 5 dark arts', t: 'Their bodies turn into almost indestructible metal. Slow but crushingly strong, they shield every Royal Legion.' },
    { name: 'Battalion', n: 'Count 85–125 · 8 dark arts', t: 'The demons’ Generals. To rise, each sacrifices part of its body and takes the same part from its first kill. The most feared in direct battle.' },
    { name: 'Impure King', n: 'Count 250–400 · 14 dark arts', t: 'Leaders of the fifteen Royal Legions, together the Supreme Legion. Some are fallen gods who know arts of light as well.' },
    { name: 'Dark Lord', n: 'Count 1,200–4,000 · 30 dark arts', t: 'The ruler of darkness. First Éres, then his son Lucifer, defeated in the war. The rank has been empty ever since.' },
];

export const DWM_COUNT = 'A demon’s rank is not given: it changes on its own as the demon grows stronger and learns more dark arts. Its Count is the number of gods and angels it has defeated, a mark of respect and loyalty among demons.';

export const DWM_TIMELINE = [
    { y: 'Before time', t: 'God the Father, Gyvenimas and Mirtis decide to end the wars of the Ikon. Vita and Éres are born.' },
    { y: 'Before time', t: 'Vita bears Herggott. Éres kills her and Reficul is born from her womb. Éres is locked in the deepest dungeon of hell.' },
    { y: 'Before time', t: 'Gyvenimas leaves Heaven and throws her scroll of life to the earth. Mirtis falls after it and is trapped among men.' },
    { y: 'Year 0', t: 'God the Father creates the world. The Ikon receive the Prism, reason and their animal form. Humanity is born.' },
    { y: '629', t: 'Zeus finds the greatest treasure in history: the Scroll of Resurrection, the power of Gyvenimas.' },
    { y: '800', t: 'The black gods take the name of demons, and Reficul becomes their leader.' },
    { y: '892', t: 'Ricardo Monteoro is born.' },
    { y: '1028', t: 'The War between Light and Darkness. The Celestial Union and the Army of Light are founded. The demons are banished.' },
    { y: '1112', t: 'The first humans join the Celestial Union.' },
    { y: '1208', t: 'Dionisio, god of wine and pleasure, joins the Celestial Union.' },
    { y: '1460', t: 'Cristian D’ San Fernald I is born in Rome.' },
    { y: '1492', t: 'Cristian D’ San Fernald II is born in Tuscany.' },
    { y: '1495', t: 'Elizabeth Gloucester is born in London. Her mother Margaret dies the next day.' },
    { y: '1506', t: 'Cristian’s parents die on a train in Scotland.' },
];
