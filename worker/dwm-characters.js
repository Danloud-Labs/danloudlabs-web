// =====================================================================================
// Dark Within Me — the Characters page: every group and its members.
// Source: David's "Complete Characters" list, "Biografías de Protagonistas" and the books.
// Art (empty frames until the image is pushed):
//   assets/projects/dwm/characters/<key>.webp           portrait, 3:4 (e.g. cristian.webp)
//   assets/projects/dwm/characters/groups/<group>.webp  group banner, 16:9 (e.g. groups/house-of-siena.webp)
// `book`: the book where the character first appears (1–4); 0 = the Legends.
// =====================================================================================

export const DWM_GROUPS = [
    {
        key: 'main', name: 'Main Characters', color: '#e0283f',
        text: 'The five lives the pact binds together: the soldier, the princess, the god who wants her, the demon who wants a soul, and the father who wants a crown.',
        members: [
            { key: 'cristian', name: 'Cristian D’ San Fernald II', role: 'Soldier, royal counsellor of Tuscany', book: 1, bio: 'Born in Tuscany in 1492, son of a famous writer and the Queen of Soprano. Orphaned at fourteen, he became a master of the sabre and an instructor of crossbow and rapier in the armies of Florence, then counsellor to the Brasco family. Half of his soul now belongs to a demon.' },
            { key: 'elizabeth', name: 'Elizabeth Gloucester', role: 'Princess of the royal blood of Siena', book: 1, bio: 'Born in London in 1495; her mother died two days later. Raised in the royal castle of Siena beside her cousin Ruth, she wants nothing to do with crowns or courts. Gentle, brave and stubborn, she would rather lie to her father than marry a god.' },
            { key: 'dionysus', name: 'Dionysus', role: 'God of wine and pleasure · Celestial Union', book: 1, bio: 'Son of Zeus and the mortal Semele. A member of the Celestial Union since 1208, he took human form in Venice as a powerful noble and friar. The only god willing to marry a mortal, as long as the mortal is Elizabeth.' },
            { key: 'azazel', name: 'Azazel', alias: 'Lezaza, in human form', role: 'Demon · once a god of the dead', book: 1, bio: 'Said to have led two hundred fallen angels. Stripped of his Prism by the Army of Light in 1028, he lives in the shadows of the docks and valleys of Tuscany. Second in power only to Lucifer, he is patient, generous with his gifts, and never says everything.' },
            { key: 'giovanni', name: 'Duke Giovanni Gloucester', role: 'Patriarch of Durham', book: 1, bio: 'Born in Durham in 1459, heir to a fortune in weapons he sold to marry Margaret Dwarson. Her death took the crown of Siena from him, and he has wanted it back ever since, whatever it costs his daughter.' },
            { key: 'expher', name: 'Expher', role: 'Cristian’s animal essence', book: 1, bio: 'The beast that woke inside Cristian in the fortress of Owari: half animal, half shadow. It fights at his side, lends him its tentacles and carries him like a horse when the road is long.' },
        ],
    },
    {
        key: 'san-fernald', name: 'Family and Friends', color: '#c9ccd6',
        text: 'The D’ San Fernald family and the Brascos, the family that took Cristian in.',
        members: [
            { key: 'cristian-i', name: 'Cristian D’ San Fernald I', role: 'Writer · Cristian’s father', book: 1, bio: 'Born in Rome in 1460, he wrote fantastic adventures set in every country he visited. Proud, jealous and devoted, he knew more about demons than any man should.' },
            { key: 'esther', name: 'Esther Giovenili', role: 'The Queen of Soprano · Cristian’s mother', book: 1, bio: 'Born in Lorraine in 1467, she sang with the Seraphim Choir of Paris at twelve. She left the stage for her son and returned fifteen years later, for one last night.' },
            { key: 'rosellio', name: 'Rosellio Giovenili', role: 'Carpenter and tinkerer · Cristian’s uncle', book: 1, bio: 'Esther’s brother. Accused of a death he did not cause, he fled Venice for a humble life outside Florence, where he raised Cristian for a year.' },
            { key: 'henry', name: 'Sir Henry Brasco', role: 'The Hunter of the Black Gods', book: 1, bio: 'Born in Berlin in 1468, branded a traitor at home, he settled in Tuscany and became its most respected warrior. Never defeated. His sword was found on a battlefield centuries older than he is.' },
            { key: 'helen', name: 'Helen Brasco', alias: 'born Helen Desmond', role: 'Henry’s wife', book: 1, bio: 'Born in Berlin in 1474 to a poor family, she fled to Italy with Henry and has treated Cristian as a son from the day he arrived.' },
            { key: 'marcus', name: 'Marcus Brasco II', role: 'Squire · Henry’s son', book: 1, bio: 'Born in Tuscany in 1504. An expert with throwing knives while still a boy, brave about everything except one thing: demons.' },
        ],
    },
    {
        key: 'house-of-siena', name: 'House of Siena', color: '#d9a64a',
        text: 'Three generations of queens, and one crown everybody wants.',
        members: [
            { key: 'carmen', name: 'Lady Carmen Peterwood', role: 'Queen of Siena', book: 1, bio: 'Born in 1421, she ruled Siena wisely after her husband abandoned her and their daughters. She kept a serious illness secret for decades and lived to seventy-eight.' },
            { key: 'margaret', name: 'Margaret Dwarson', role: 'First heir of Siena · Elizabeth’s mother', book: 1, bio: 'Born in 1467 and raised to rule. She married the Duke of Durham against her mother’s wishes and died two days after giving birth to Elizabeth.' },
            { key: 'leonore', name: 'Queen Leonore Dwarson', role: 'Queen of Siena · Elizabeth’s aunt', book: 1, bio: 'Bolder and rougher than her sister. She inherited the crown when Margaret died, and the rumors about her daughter’s father drove her husband away.' },
            { key: 'ruth', name: 'Ruth Perrish', role: 'First heir of Siena · Elizabeth’s cousin', book: 1, bio: 'Born in 1497, a member of the Congress of Siena since fifteen. The wisest say she will one day sit in the Celestial Union. Elizabeth’s closest friend.' },
        ],
    },
    {
        key: 'celestial-union', name: 'The Celestial Union', color: '#f0e9d8',
        text: 'Five gods of the rank of Imperial and three humans, who write the laws of the three worlds.',
        members: [
            { key: 'apollo', name: 'Apollo', role: 'Leader of the Celestial Union', book: 1, bio: 'Son of Zeus and Leto and twin brother of Artemis. He presides over the Union.' },
            { key: 'ares', name: 'Ares', role: 'Member of the Celestial Union', book: 1, bio: 'The god of war, one of the five Imperials.' },
            { key: 'aphrodite', name: 'Aphrodite', role: 'Member of the Celestial Union', book: 1, bio: 'The goddess of love and beauty, one of the five Imperials.' },
            { key: 'hypnos', name: 'Hypnos', role: 'Member of the Celestial Union', book: 1, bio: 'The god of sleep, one of the five Imperials.' },
            { key: 'enrique-glabados', name: 'Enrique Glabados', role: 'Human member', book: 1, bio: 'One of the three humans who sit in the Celestial Union.' },
            { key: 'carolina-fargo', name: 'Carolina Fargo', role: 'Human member', book: 1, bio: 'One of the three humans who sit in the Celestial Union.' },
            { key: 'felipe-hollies', name: 'Felipe Hollies', role: 'Human member', book: 1, bio: 'Born in London in 1490, he inherited his father’s seat at fourteen. Ashamed of how he was conceived, he gave up his father’s name. His mother was a cousin of Duke Giovanni.' },
        ],
    },
    {
        key: 'army-of-light', name: 'The Army of Light', color: '#9fc4ff',
        text: 'The Lords: the strongest warriors among the gods, over a thousand years old.',
        members: [
            { key: 'zeus', name: 'Zeus', role: 'Lord · Army of Light', book: 2, bio: 'Father of Apollo, Artemis and Dionysus. In 629 he found the greatest treasure in history: the Scroll of Resurrection.' },
            { key: 'poseidon', name: 'Poseidon', role: 'Lord · Army of Light', book: 2, bio: 'Lord of the seas, one of the four warriors of the Army of Light.' },
            { key: 'hephaestus', name: 'Hephaestus', role: 'Lord · Army of Light', book: 2, bio: 'The smith of the gods, one of the four warriors of the Army of Light.' },
            { key: 'zephyrus', name: 'Zephyrus', role: 'Lord · Army of Light', book: 2, bio: 'The west wind, one of the four warriors of the Army of Light.' },
        ],
    },
    {
        key: 'demon-union', name: 'The Demon Union', color: '#8b1d2c',
        text: 'The lords of darkness. Every demon carries its old name backwards since the war.',
        members: [
            { key: 'lucifer', name: 'Lucifer', role: 'The last Dark Lord · imprisoned in hell', book: 0, bio: 'The supreme leader of the Royal Legion, locked in the deepest dungeon of hell since the war. The rank of Dark Lord has been empty ever since, and the demons still wait for his return.' },
            { key: 'aamon', name: 'Aamon', alias: 'once Nomaa', role: 'Demon Union', book: 3, bio: 'One of the lords of the Demon Union.' },
            { key: 'abaddon', name: 'Abaddon', alias: 'once Noddaba', role: 'Demon Union', book: 3, bio: 'One of the lords of the Demon Union.' },
            { key: 'agares', name: 'Agares', alias: 'once Seraga', role: 'Demon Union', book: 3, bio: 'One of the lords of the Demon Union.' },
            { key: 'agramon', name: 'Agramon', alias: 'once Nomarga', role: 'Demon Union', book: 3, bio: 'One of the lords of the Demon Union.' },
        ],
    },
    {
        key: 'assassination-list', name: 'The Assassination List', color: '#ff6b6b',
        text: 'Four men whose souls are as black as night. Azazel’s price for a human face.',
        members: [
            { key: 'nobunaga', name: 'Oda Nobunaga', role: 'The Devil King of Owari', book: 1, bio: 'Lord of the Oda clan, who killed his own brother to rule it. A dark power sleeps in his sword, and an enchanted armor protects his soul.' },
            { key: 'blackbeard', name: 'Blackbeard', role: 'Captain of the Queen Anne’s Revenge', book: 1, bio: 'The most feared pirate of the seas, master of a warship with four hundred cannons and a silver gun that darkness can enchant.' },
            { key: 'thutmose', name: 'Thutmose III', role: 'The pharaoh who hid from death', book: 1, bio: 'He hid his soul inside his own tomb thousands of years ago, under a magic that turns any power to nothing.' },
            { key: 'vlad', name: 'Vlad Draculea', role: 'The king who cheated death', book: 1, bio: 'He lives in the Cathedral of Faremur above the lost city, with a scythe, wings, an army of half-men, and no reflection.' },
        ],
    },
    {
        key: 'allies', name: 'Allies of the Journey', color: '#7ad1a8',
        text: 'The people who helped a man with a demon’s face.',
        members: [
            { key: 'artemis', name: 'Artemis', role: 'Goddess of the hunt · General', book: 1, bio: 'Daughter of Zeus and Leto, she chose the forests over the cities of men and guards them from darkness. Her red sword sings like birds; her Prism takes the form of a huge white wolf with braided fur. First in line for a seat in the Union.' },
            { key: 'roberto', name: 'Roberto Salazar', role: 'French squire', book: 1, bio: 'He fought beside Cristian when Blackbeard burned Newfoundland, and sailed home in the pirate’s own ship.' },
            { key: 'karima', name: 'Karima Sunuhe', role: 'Daughter of Emperor Kahem', book: 1, bio: 'The first person Cristian told everything to. She guided him across Egypt and was waiting at the port when he left.' },
            { key: 'kahem', name: 'Emperor Kahem Sunuhe', role: 'Ruler of Sanabú', book: 1, bio: 'Karima’s father, who opened his palace to a stranger with a hidden face.' },
            { key: 'ghazi', name: 'Hacmoni Ghazi', role: 'The eldest man in Egypt', book: 1, bio: 'A fisherman and teacher in the oasis of Siwa who can still read the writing of the pharaohs, and who remembers the legends nobody else believes.' },
            { key: 'sebastian', name: 'Sebastián Viteli', role: 'Orphan of the lost city', book: 1, bio: 'Camelia’s twin brother. Armed with a big knife and, later, one of Cristian’s enchanted guns.' },
            { key: 'camelia', name: 'Camelia Viteli', role: 'Orphan of the lost city', book: 1, bio: 'Sebastián’s twin sister. She stole the keys to every door of the cathedral from under Vlad’s soldiers.' },
        ],
    },
    {
        key: 'shadows', name: 'Guardians and Shadows', color: '#a78bfa',
        text: 'The creatures that stood between Cristian and the four souls.',
        members: [
            { key: 'ferhenas', name: 'Ferhenas', role: 'Leader of the Asura', book: 1, bio: 'Leader of a nomad pack of demons in an ancient forest, who took Cristian for a demon who had escaped the prayer of exile.' },
            { key: 'venona', name: 'Venona', role: 'The woman of the mist · servant of Thutmose', book: 1, bio: 'A woman of the shadows who attacked Cristian twice on the road to the pharaoh’s tomb.' },
            { key: 'anubis', name: 'Anubis', role: 'Protector of Thutmose III', book: 1, bio: 'One of the most powerful gods of Egypt, master of mirages and of the power of the mind.' },
            { key: 'astaroth', name: 'Astaroth', role: 'Demon of the Battalion rank', book: 1, bio: 'The guardian of the Dead Swamp, stronger than a god and a man together, who knows an art of light.' },
        ],
    },
    {
        key: 'legends', name: 'The Legends', color: '#f2f2f7',
        text: 'The first beings of creation and the heirs of light and darkness, from the legends told before the books.',
        members: [
            { key: 'gyvenimas', name: 'Gyvenimas', role: 'Ambassador of life and resurrection', book: 0, bio: 'Servant at God’s left hand. She gave God His children, then left Heaven and threw the scroll of life to the earth.' },
            { key: 'mirtis', name: 'Mirtis', role: 'Funeral king of sin and death', book: 0, bio: 'Guardian at God’s right hand. He taught Éres to rule the darkness, and fell to the earth chasing the scroll of life. He has walked among men ever since.' },
            { key: 'vita', name: 'Vita', role: 'Queen of the heavens', book: 0, bio: 'Daughter of God the Father, mother of Herggott. Killed by her brother, whom she never truly fought.' },
            { key: 'eres', name: 'Éres', role: 'Lord of the shadows', book: 0, bio: 'Son of God the Father, father of Reficul. Locked in the deepest dungeon of hell for killing his sister.' },
            { key: 'herggott', name: 'Herggott', role: 'Heir of the heavens', book: 0, bio: 'Son of Vita, born from a sad sunflower seed. Leader of the legions of light, founder of the Celestial Union and the Army of Light. After the war he disappeared.' },
            { key: 'reficul', name: 'Reficul', role: 'Heir of the shadows', book: 0, bio: 'Son of Éres, born from the womb of Vita after his father killed her. Raised in the endless dark, he denied he was ever Vita’s son and swore his power came from darkness alone. He gathered the black gods into an army, gave them a new name, demons, and became their leader. In the eleventh century he set out to conquer Europe and to buy his father’s freedom from God the Father with the souls of men, and came face to face with his brother Herggott.' },
        ],
    },
];
