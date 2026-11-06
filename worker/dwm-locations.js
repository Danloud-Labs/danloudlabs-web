// =====================================================================================
// Dark Within Me — the Locations page, by region.
// Art (empty frames until the image is pushed): assets/projects/dwm/locations/<key>.webp, 16:9
// (e.g. locations/siena-castle.webp). `book`: where it first appears (1–4); 0 = the Legends.
// =====================================================================================

export const DWM_REGIONS = [
    {
        key: 'italy', name: 'Italy', color: '#e0283f',
        places: [
            { key: 'san-fernald-residence', name: 'The D’ San Fernald Residence', where: 'Tuscany', book: 1, text: 'The family home in the valleys of Tuscany, by a river. Cristian’s father’s study still holds his safe, his photographs and his favorite rum.' },
            { key: 'tuscany-valleys', name: 'The Valleys of Tuscany', where: 'Tuscany', book: 1, text: 'Where Cristian and Elizabeth met every Friday, and where he waited the Friday she did not come.' },
            { key: 'brasco-residence', name: 'The Brasco Residence', where: 'Tuscany', book: 1, text: 'Henry Brasco’s palace and its training hall, where Cristian learned the sword as a boy and teaches it as a man.' },
            { key: 'florence', name: 'Florence', where: 'Tuscany', book: 1, text: 'Rosellio’s humble workshop on the outskirts, and the academy of the armies where Cristian served for twelve years.' },
            { key: 'siena-castle', name: 'The Royal Castle of Siena', where: 'Siena', book: 1, text: 'Seat of the queens of Siena. In its front garden lie Margaret Dwarson and, one day, her daughter.' },
            { key: 'the-docks', name: 'The Docks of the Valley', where: 'Tuscany', book: 1, text: 'Where Cristian swore his love under a star, where Dionysus left him to die, and where Azazel first spoke to him.' },
            { key: 'dionysian-palace', name: 'The Dionysian Palace', where: 'Tuscany', book: 1, text: 'Dionysus’s mansion, where Elizabeth lived as a prisoner and looked at her star every night from the terraces.' },
        ],
    },
    {
        key: 'britain', name: 'Britain', color: '#c9ccd6',
        places: [
            { key: 'london-castle', name: 'The Royal Castle of London', where: 'London, England', book: 1, text: 'Where Elizabeth was born, and where, with King Henry VIII’s blessing, her engagement to a god was celebrated.' },
            { key: 'gloucester-mansion', name: 'The Gloucester Mansion', where: 'England', book: 1, text: 'Duke Giovanni’s home, built with the fortune of his family’s weapons.' },
            { key: 'scotland-railway', name: 'The Line to Edinburgh', where: 'Scotland', book: 1, text: 'Count Sherman’s hall, where Esther Giovenili sang again, and the railway where her last song ended.' },
        ],
    },
    {
        key: 'journey', name: 'The Four Souls', color: '#ff6b6b',
        places: [
            { key: 'owari-fortress', name: 'The Fortress of Owari', where: 'Nagoya, Japan', book: 1, text: 'The armed stronghold of the Oda clan, far enough from Kyoto to escape the endless wars of the central provinces.' },
            { key: 'ancient-forest', name: 'The Ancient Forest', where: 'Japan', book: 1, text: 'A forest dark with enormous trees, home to the Asura and watched over by Artemis.' },
            { key: 'newfoundland', name: 'Terrazo and Serrino', where: 'Newfoundland', book: 1, text: 'Quiet provinces of meadows and mangroves, set on fire by the cannons of the Queen Anne’s Revenge.' },
            { key: 'frozen-sea', name: 'The Frozen Sea', where: 'West of Greenland', book: 1, text: 'Where the chase ended, the ice stopped both warships, and Blackbeard fought his last battle.' },
            { key: 'sanabu', name: 'Sanabú', where: 'Egypt', book: 1, text: 'The city of Emperor Kahem, where Cristian was a guest with his face hidden.' },
            { key: 'siwa', name: 'The Oasis of Siwa', where: 'Egypt', book: 1, text: 'A poor village of hard workers and the oldest people in Egypt, where Hacmoni Ghazi teaches children to fish.' },
            { key: 'thutmose-tomb', name: 'The Tomb of Thutmose III', where: 'Southern Egypt', book: 1, text: 'A hidden crypt under the sand, protected by a magic that leaves any power useless and any demon human.' },
            { key: 'dead-swamp', name: 'The Dead Swamp', where: 'Romania', book: 1, text: 'A poisonous swamp full of demons, crossed by a single old wooden bridge on the edge of collapse.' },
            { key: 'lost-city', name: 'The Lost City of Brașov', where: 'Romania', book: 1, text: 'Empty for six years, yet someone keeps it clean. Its people are prisoners on the mountain above.' },
            { key: 'faremur-cathedral', name: 'The Cathedral of Faremur', where: 'Romania', book: 1, text: 'Built in 1023 and decorated with statues of the War between Light and Darkness. Home of Vlad Draculea and his hall of mirrors.' },
        ],
    },
    {
        key: 'beyond', name: 'Beyond the World of Men', color: '#a78bfa',
        places: [
            { key: 'heaven', name: 'Heaven', where: 'The realm of light', book: 0, text: 'The kingdom of God the Father and the gods. Its palace walls see everything that happens in the three worlds.' },
            { key: 'the-gate', name: 'The Gate between Worlds', where: 'Between Heaven and earth', book: 0, text: 'A magical illusion that opens only with a key and turns invisible while it stands open. Mirtis never found it again.' },
            { key: 'underworld', name: 'The Dungeons of Hell', where: 'The darkness below', book: 0, text: 'The deepest prison of the shadows, where Éres was locked away, and later his son Lucifer.' },
        ],
    },
];
