// =====================================================================================
// Amaphest: The Universe — content of the /universe page, one entry per tab.
// Sources: H01 Hemos Worldbook, H02 Hemos Dictionary, A02 Compendium, A06 Dictionary,
// A07 Locations, A08 Project URSO, A09 Timeline and the 00 Summary. Spoiler-free on purpose.
//
// Art: tools/amaphest_assets.py reads iCloud Banners/Amaphest/Universe/<Tab>/ and lists every
// image in manifest.json under universe.<tab>. An image named like a card id or card name
// (encore.jpg, "Resonant Plains.png") decorates that card; "hero" / "background" / "banner"
// is the tab's top background; an image named like a section (Corporations, "The resistance") is
// that section's background; any other image becomes a section background, in name order.
//
// Shape: tab { key, name, era, color, hero { title, lead, stats[] }, sections[] }
//        section { id, eyebrow, title, text, layout: 'cards' | 'wide' | 'timeline' | 'energies', items[] }
//        item { id, name, kicker, text, color, chars[] (character slugs), facts[] }
// =====================================================================================

export const AMA_UNIVERSE_TABS = [
    // =================================================================== HEMOS
    {
        key: 'hemos', name: 'Hemos', era: 'The homeworld', color: '#ff2e4d', color2: '#2f8bff',
        hero: {
            kicker: 'Far beyond our galaxy',
            title: 'Hemos, the listening world',
            lead: 'A crystalline planet where storms speak like sermons, forests remember every voice and cities are tuned instead of built. Its people, the Hemosapiens, are born incomplete, until the Blessing gives each of them one of two sacred energies.',
            stats: [['3', 'Suns'], ['5', 'Moons, each a fortress'], ['2', 'Sacred energies'], ['7–8 ft', 'Average Hemosapien height']],
        },
        sections: [
            {
                id: 'currents', eyebrow: 'The Blessing', title: 'Two currents. Never both.', layout: 'energies',
                text: 'Hemosapiens are not born complete. Shortly after birth, an infant is carried before blessed adults: near the one who shares its destiny, the adult glows red or blue. The child is then taken to the Power Orb of that current, and the Orb completes them. The essence is permanent, and no Hemosapien can ever carry both.',
                items: [
                    { id: 'alpha', name: 'Alpha', kicker: 'The Red current', color: '#ff2e4d', text: 'Fiery and volatile: passion, raw power and destruction. Alpha Hemosapiens glow with molten red-orange veins and wear jagged, scarred crystal armor.' },
                    { id: 'betha', name: 'Betha', kicker: 'The Blue current', color: '#2f8bff', text: 'Calm and ordered: discipline, precision and stability. Betha Hemosapiens shine with icy blue-white veins and wear refined, ceremonial plating.' },
                    { id: 'power-orbs', name: 'The Power Orbs', kicker: 'Origin of every essence', color: '#d63cff', orb: 'dual', text: 'The Red and the Blue Orb are the sacred sources of Alpha and Betha, guarded inside the moon fortresses. They are not just energy: they are the origin of Hemosapien identity itself.' },
                    { id: 'chaos', name: 'Chaos', kicker: 'The forbidden collision', color: '#ff4fd8', text: 'Healers warn never to force the currents together. When Alpha and Betha collide, they birth Chaos: an unstable pink force that consumes everything it touches.' },
                ],
            },
            {
                id: 'land', eyebrow: 'Landscapes', title: 'The land sings', layout: 'cards', band: true,
                text: 'Every biome on Hemos is both geography and scripture. The planet hums, resonates and remembers, and to travel across it is to pass from one way of listening into another.',
                items: [
                    { id: 'resonant-plains', name: 'Resonant Plains', kicker: 'The planet’s harp', text: 'Grasslands threaded with crystal outcrops that turn wind into full chords. Hunters wait for the plains to hum low before they move, and festivals string temporary harps between the crystals.' },
                    { id: 'crystalline-forests', name: 'Crystalline Forests', kicker: 'The planet’s cathedrals', text: 'Trees of translucent mineral that store daylight and release it at dusk. Councils are sung here in rhythm, and the trees are said to replay the voices of councils long gone.' },
                    { id: 'resonite-caverns', name: 'Resonite Caverns', kicker: 'Living archives', text: 'Underground halls veined with red and blue light. Apprentices wait in their dark until their breath matches the cavern’s pulse, and miners strike only where the seam consents.' },
                    { id: 'floating-shards', name: 'The Floating Shards', kicker: 'Sanctuaries in the sky', text: 'Fragments of stone suspended above the cliffs, reached only by bridges of braided light that appear at night. The grieving climb them to feel their sorrow loosen in the wind.' },
                    { id: 'shimmering-seas', name: 'Shimmering Seas', kicker: 'Cradle and cathedral', text: 'Ordinary by day, glowing by night. Sky-gliders migrate over their surface while ancient leviathans stir beneath, able to light entire bays in red and blue.' },
                    { id: 'coastal-abysses', name: 'Coastal Abysses', kicker: 'Where ancestors listen', text: 'Cliffs that drop into luminous depths, believed to hold the spirits that descended with the First Storm. No nets are cast here; pilgrims leave threads of light instead.' },
                ],
            },
            {
                id: 'life', eyebrow: 'Flora & fauna', title: 'Every creature has a voice', layout: 'cards',
                text: 'The plants and animals of Hemos are not resources but co-authors of its civilization. They heal, warn, console and judge.',
                items: [
                    { id: 'crystal-bloom-trees', name: 'Crystal Bloom Trees', kicker: 'Village elders', text: 'Their blossoms glow red to hurry the market and blue to slow the day down. To ignore their signal is said to sow misfortune.' },
                    { id: 'veil-vines', name: 'Veil Vines', kicker: 'Medicine that asks for song', text: 'Translucent vines whose healing sap is released only to those who hum a steady tone. A silent harvest sours.' },
                    { id: 'moon-moss', name: 'Moon Moss', kicker: 'Humble guidance', text: 'A faint glow that marks the safe paths through caverns, woven into funeral shrouds to guide the dead.' },
                    { id: 'gravestalkers', name: 'Gravestalkers', kicker: 'Predator and protector', text: 'Apex hunters with glowing spines that move so carefully even the grass stays quiet. Legends say a spared stalker returns the mercy.' },
                    { id: 'gliders', name: 'Gliders', kicker: 'Creatures of geometry', text: 'Wings thin as panes of glass, folding air into precise patterns. A glider seen twice in a polished shard means a guest is coming.' },
                    { id: 'companion-beasts', name: 'Companion Beasts', kicker: 'Living vows', text: 'Gifted to each child at the Blessing. Their coats widen with light in times of joy and dim in sorrow, and they grow alongside their charge.' },
                    { id: 'abyssal-leviathans', name: 'Abyssal Leviathans', kicker: 'Older than memory', text: 'Sea guardians whose resonance can calm a storm or break a fleet apart. To meet one is to be judged.' },
                    { id: 'ripple-serpents', name: 'Ripple Serpents', kicker: 'Devourers of harmony', text: 'Eel-like predators whose vibrations stun prey and shatter crystal. In myth, they are dissonance itself.' },
                ],
            },
            {
                id: 'cities', eyebrow: 'Civilization', title: 'Cities tuned, not built', layout: 'cards', band: true,
                text: 'No Hemosapien structure is an act of domination. Foundations are struck like chimes until the echoes align, and a house that does not hum properly is taken down and begun again.',
                items: [
                    { id: 'sanctuary-towers', name: 'Sanctuary Towers', kicker: 'Seats of governance', text: 'Crystal spires struck like chimes at dawn. Inside, councils decide in echoing chambers, so every judgment is literally reverberated back at them.' },
                    { id: 'resonant-plazas', name: 'Resonant Plazas', kicker: 'The heart of each town', text: 'Open courts that glow from veins beneath the floor, home to Blessings, festivals and public debate.' },
                    { id: 'living-houses', name: 'Living Houses', kicker: 'Homes that breathe', text: 'Grown from crystal and vine, their windows aligned with the dawns and moons that matter to each family.' },
                    { id: 'cavern-cities', name: 'Cavern Cities', kicker: 'A cosmos of stone', text: 'Underground cities whose ceilings are carved with constellations, so even children below ground learn the sky.' },
                    { id: 'moon-fortresses', name: 'Moon Fortresses', kicker: 'Guardians of the gates', text: 'Every one of the five moons is a military fort. Their walls amplify sound and light, and their defenders use the fortress itself as an instrument.' },
                    { id: 'betha-script', name: 'Betha Script', kicker: 'Writing that hums', text: 'The luminous, symmetrical alphabet of law and archives, etched into living crystal. Rebels break the same letters into jagged graffiti: one voice says endure, the other says change.' },
                ],
            },
            {
                id: 'society', eyebrow: 'Society', title: 'Science is lord. Knowledge is law.', layout: 'wide',
                text: 'Hemos recognizes no gods. Councils are custodians of knowledge, laws are sung into crystal, and a decree that hums falsely is believed to wither. For most of its history, killing was unthinkable: punishment meant reassignment, never death.',
                items: [
                    { id: 'archivists', name: 'Archivists of Resonance', kicker: 'Keepers of law', text: 'They judge a law by its tone as much as its words: if a tablet rings steady when struck, the law holds.' },
                    { id: 'engineers', name: 'Resonite Engineers', kicker: 'Composers in crystal', text: 'Every tool and machine must hum in harmony with its wielder. A badly tuned weapon can shatter in the hand.' },
                    { id: 'healers', name: 'Healers of the Core', kicker: 'Physicians of rhythm', text: 'They hum and chant over the sick until their voice aligns with the patient’s current.' },
                    { id: 'warriors', name: 'Warriors of the Moons', kicker: 'Silent defenders', text: 'Trained to fight in measured silence, their movements like deliberate drumbeats. Many guard the moon fortresses.' },
                    { id: 'tacticians', name: 'Tacticians', kicker: 'Composers of war', text: 'They speak of battles in tempo, not numbers: a raid begun too fast falters, a defense held too long cracks.' },
                    { id: 'resonance-ports', name: 'Resonance Ports', kicker: 'Body and machine', text: 'Small ports at the back of the neck release crystalline tendrils that link a Hemosapien directly to resonance technology. The more tendrils, the larger the machine they can command.' },
                    { id: 'sanity-room', name: 'The Sanity Room', kicker: 'Institution', text: 'Childbirth on Hemos is sacred and deadly. The first daughters of mothers who survive are preserved here to protect the continuity of the species.' },
                    { id: 'purgatory', name: 'The Purgatory', kicker: 'Institution', text: 'Where women who cannot bear children are sent, not as exiles but to serve as engineers, scientists and diplomats.' },
                    { id: 'resonite', name: 'Resonite', kicker: 'The witness stone', text: 'A crystal found only on Hemos that glows red or blue near the blessed. Sacred proof of the Blessing, and a tool of surveillance in the wrong hands.' },
                ],
            },
            {
                id: 'powers', eyebrow: 'Power on Hemos', title: 'Three banners, one civil war', layout: 'cards', band: true,
                text: 'For centuries a neutral council kept Hemos in balance. Then a successor betrayed it, and the planet split under red and blue banners.',
                items: [
                    { id: 'old-regimen', name: 'The Old Regimen', kicker: 'The neutral council', color: '#c0b080', text: 'The first government of Hemos, aligned with neither current. It enforced law and diplomacy, passed leadership peacefully every hundred years, and held that laws could be preserved but never rewritten.', chars: ['vaelor', 'kurga', 'okune'] },
                    { id: 'new-regimen', name: 'The New Regimen', kicker: 'The Blue order', color: '#2f6bff', text: 'Founded by Kratos when he betrayed the council that chose him. It embraced Betha’s order, rewrote laws that were never meant to change and stripped citizens of the right to wield the currents.', chars: ['kratos', 'dravak', 'maelor'] },
                    { id: 'the-most', name: 'The Most', kicker: 'The Red rebellion', color: '#ff2e4d', text: 'Born as “A Few”, four Red ex-soldiers who refused Kratos. Under Arkon they broke Hemos’ oldest law, brought lethal force to the planet and seized the Red power. Their stronghold is the Red Fortress.', chars: ['arkon', 'veyra', 'drevos', 'kairon'] },
                ],
            },
            {
                id: 'history', eyebrow: 'History', title: 'The fracture of Hemos', layout: 'timeline',
                items: [
                    { name: 'Centuries of peace', text: 'The Old Regimen governs in balance and law, and leadership passes peacefully every hundred years.' },
                    { name: 'The betrayal of Kratos', text: 'Chosen as successor and hailed as a unifier, Kratos turns on the council and founds the New Regimen.', chars: ['kratos'] },
                    { name: 'A Few', text: 'Four Red-blessed ex-soldiers reject the new order. Arkon commits the first killing in the history of Hemos.', chars: ['arkon'] },
                    { name: 'The Red power falls', text: 'A Few infiltrates the Red moon fortress and steals the Red Orb. The rebellion grows into The Most.' },
                    { name: 'Civil war', text: 'Generations are torn apart. When Kratos cannot end the rebellion, command passes to the disciplined general Kurga.', chars: ['kurga'] },
                    { name: 'Okune’s mission', text: 'The last Red diplomat is entrusted with the most critical mission of the war. It will bind the fate of Hemos to a fragile world called Earth.', chars: ['okune'] },
                ],
            },
            {
                id: 'rituals', eyebrow: 'Rituals', title: 'How Hemos remembers', layout: 'cards',
                items: [
                    { id: 'rite-of-resonance', name: 'The Rite of Resonance', text: 'Infants are carried into the glowing forests. The trees warm or brighten near them, revealing which current completes them.' },
                    { id: 'storm-listening', name: 'Storm Listening', text: 'Families fall silent during crystal storms, believing each glittering flake is a leftover syllable of the First Storm.' },
                    { id: 'death-rituals', name: 'Tools in the wind', text: 'The tools of the dead hang in the wind for a year, so the household can hear which skill is missing. Then they are passed on.' },
                ],
            },
        ],
    },

    // =================================================================== EARTH
    {
        key: 'earth', name: 'Earth', era: 'Present day', color: '#2f8bff', color2: '#d63cff',
        hero: {
            kicker: 'Present day',
            title: 'Earth, and the race for the Amalion',
            lead: 'A private corporation richer than any government. A Vice President who swore to stop it. Secret agencies, foreign allies and a resistance fighting with scavenged weapons. Since the day the two energies of Hemos reached Earth, every power on the planet has wanted them.',
            stats: [['1', 'Girl with both currents'], ['5', 'AMA-ESS pilots'], ['4', 'Nations drawn in'], ['URSO-2', 'Her classified name']],
        },
        sections: [
            {
                id: 'energies', eyebrow: 'The science', title: 'What Earth calls the energies of Hemos', layout: 'energies',
                text: 'Human science gave the currents new names, and found something Hemos never imagined possible.',
                items: [
                    { id: 'alpha', name: 'Alpha', kicker: 'Searing heat', color: '#ff2e4d', text: 'The red current. On Earth it melts reinforced alloys and powers Encore’s most aggressive weapons.' },
                    { id: 'betha', name: 'Betha', kicker: 'Freezing cold', color: '#2f8bff', text: 'The blue current. Stabilizing and precise, it can freeze a battlefield solid.' },
                    { id: 'zetha', name: 'Zetha', kicker: 'The collision', color: '#ff4fd8', text: 'Earth’s codename for what Hemos calls Chaos: the violent pink fusion that forms when Alpha and Betha collide, hot enough to vaporize containment alloys.' },
                    { id: 'amalion', name: 'Amalion', kicker: 'Element Am', color: '#f2e6ff', text: 'A pearl-white essence with a pink shimmer, found only in one girl’s blood. It lets Alpha and Betha live together in one body. Forged into alloy, it is lighter and stronger than steel.' },
                ],
            },
            {
                id: 'corporations', eyebrow: 'Corporations & technology', title: 'The companies that build the future', layout: 'wide', band: true,
                text: 'Private technology outgrew the governments meant to regulate it. Whoever controls Alpha and Betha controls the next century, and the companies know it.',
                items: [
                    {
                        id: 'encore', name: 'Encore Enterprises', kicker: 'Silicon Valley · “The White Spire”', color: '#c8323f', chars: ['william-bourne', 'stuart-mctrevor', 'george-hammond', 'cassandra-veyra'],
                        text: 'Built by William Bourne on the ruins of his father’s Bourne Industries, Encore began as an unknown private organization of advanced technology and quietly funded corporations until it surpassed the resources of the U.S. government. Behind its glass-and-chrome headquarters runs AMA-PHEST, the classified program built around the Amalion.',
                        facts: [['Programs', 'AMA-PHEST, AMA-ESS suits'], ['Machines', 'AMA-HPT troopers, AMA-TTV tanks, AMA-TAV gunships, AMA-SAP battleships'], ['Software', 'IMPALA (hardware), INSIGHT (neural systems), Neuron-AI']],
                    },
                    {
                        id: 'bourne-industries', name: 'Bourne Industries', kicker: 'Where it began', color: '#a33a46', chars: ['alexander-bourne'],
                        text: 'Founded by the physicist Alexander Bourne to pursue a radical idea: that power could be refined through frequency rather than combustion. When he died, his son dismantled it and built Encore from its research.',
                    },
                    {
                        id: 'arms-tech', name: 'Arms-Tech Industries & Magnetixium', kicker: 'Germany', color: '#ff9a3d', chars: ['ion'],
                        text: 'Germany’s most advanced technology firm. Its subsidiary Magnetixium reshaped applied magnetism around one brilliant, unstable scientist: Dr. Markus Krüger, whose theories always ran ahead of any energy source able to survive them.',
                    },
                    {
                        id: 'atomika', name: 'Atomika Enterprises', kicker: 'Germany', color: '#e0c040',
                        text: 'A German technology institute that works with Encore on the redesign of nuclear missiles.',
                    },
                    {
                        id: 'yoshimura', name: 'Yoshimura Laboratories', kicker: 'Japan', color: '#3fd0d0',
                        text: 'A coastal research complex and home of the Focus Cannon: a particle weapon that draws its energy from water. Its principles hold the key to endurance in battle.',
                    },
                    {
                        id: 'infra-net', name: 'The Infra-net', kicker: 'The network', color: '#7f8cff',
                        text: 'A resonance-based network that links AMA units and weapons in real time. Nearly impossible to jam, but vulnerable to resonance corruption. Governments may buy Encore’s machines; Encore keeps the network.',
                    },
                ],
            },
            {
                id: 'government', eyebrow: 'Governments & agencies', title: 'The state strikes back', layout: 'wide',
                text: 'Washington sees the Amalion as a matter of national security, and the girl who carries it as classified property. Not everyone in power agrees on what to do with her.',
                items: [
                    {
                        id: 'white-house', name: 'The White House', kicker: 'Washington, D.C.', color: '#9fb4d8', chars: ['glenn-monroe'],
                        text: 'Vice President Glenn Monroe, a former scientist, won office campaigning to stop the unauthorized development of advanced science by private corporations, a war between the state and the companies that had outgrown it.',
                    },
                    {
                        id: 'urso', name: 'Project U.R.S.O.', kicker: 'Unidentified Rare Species Online', color: '#3f7cff', chars: ['dylan-cole', 'ayumi-tanaka', 'james-harker', 'victor-ross', 'helena-ward', 'adrian-mathews', 'dynamo'],
                        text: 'The classified program that locates, studies and contains biological anomalies, under the direct oversight of the Vice President. It produced URSO-1, the super-soldier Dynamo, and classified a four-year-old girl as Subject URSO-2.',
                        facts: [['Colorado Springs', 'Pre-URSO holding site'], ['Northern Virginia', 'Containment research facility'], ['Washington Federal Belt', 'Main hub'], ['Seattle', 'Headquarters']],
                    },
                    {
                        id: 'cia', name: 'Central Intelligence Agency', kicker: 'Langley, Virginia', color: '#5b7bb0', chars: ['elizabeth-kane', 'thomas-caldwell', 'isabella-torres'],
                        text: 'The agency that first answered a pediatrician’s alarming report, took custody of the child and erased every record of her existence.',
                    },
                    {
                        id: 'pentagon', name: 'The Pentagon', kicker: 'Defense Command', color: '#8a9a6a', chars: ['charles-hurley'],
                        text: 'The heart of America’s military, and a target: it guards a nuclear reactor that Encore’s pilots would very much like to take.',
                    },
                    {
                        id: 'space-force', name: 'U.S. Space Force', kicker: 'San Diego, California', color: '#6fb0ff',
                        text: 'A fortified base above the ocean that controls satellites, orbital defenses and spacecraft navigation, and one of the last lines of U.S. resistance against Encore’s expansion.',
                    },
                    {
                        id: 'russia', name: 'Russia', kicker: 'Foreign power', color: '#5fd35f', chars: ['coords'],
                        text: 'After the marksman Dmitri Volkov allied with Encore, Russia gave him full support in resources and soldiers. It also hides experimental Infra-net facilities of its own.',
                    },
                ],
            },
            {
                id: 'resistance', eyebrow: 'The resistance', title: 'Fighting back with scavenged weapons', layout: 'cards', band: true,
                text: 'Between the corporations and the state live the people caught in the crossfire, and the few who refuse to look away.',
                items: [
                    { id: 'guerrillas', name: 'The Guerrillas', kicker: 'Los Angeles', color: '#7aa34a', chars: ['ryan-cole', 'circuit', 'bulldog', 'doc', 'fixer', 'eagle', 'ghost', 'torch', 'sophia-cole'], text: 'Former soldiers led by Ryan Cole, hiding beneath the ruins of Los Angeles. They protect civilians, sabotage Encore and expose what the governments hide.' },
                    { id: 'guerrillas-base', name: 'The Underground', kicker: 'Their home', color: '#a4b36a', text: 'A stronghold under the city: warm, dimly lit and full of life. Hangars, workshops, a medical bay and, at night, a bonfire under the stars.' },
                    { id: 'civilians', name: 'The people in between', kicker: 'Why they fight', color: '#e0a35c', text: 'Families in the suburbs, refugees on the freeways, children who have never seen a city without war machines. Everyone the race for the Amalion forgot.' },
                ],
            },
            {
                id: 'world', eyebrow: 'The map', title: 'Where the war is fought', layout: 'cards',
                items: [
                    { id: 'los-angeles', name: 'Los Angeles', kicker: 'United States', text: 'Ruined avenues, burned freeways and a resistance hidden underneath. The front line of the war.' },
                    { id: 'silicon-valley', name: 'Silicon Valley', kicker: 'United States', text: 'Home of the White Spire, Encore’s headquarters: a corporate utopia hiding an empire of experiments.' },
                    { id: 'seattle', name: 'Seattle', kicker: 'United States', text: 'Headquarters of Project U.R.S.O. and Glenn Monroe’s private command center.' },
                    { id: 'san-diego', name: 'San Diego', kicker: 'United States', text: 'A coastal city under siege and the U.S. Space Force base that refuses to fall.' },
                    { id: 'catalina-island', name: 'Catalina Island', kicker: 'California', text: 'A secluded villa off the coast, and the place where one engineer tried to sell Encore’s secrets.', chars: ['ethan-cross'] },
                    { id: 'japan', name: 'Japan', kicker: 'Yoshimura Laboratories', text: 'A coastal city of order and technological grace, hiding a weapon that runs on water.' },
                    { id: 'germany', name: 'Germany', kicker: 'Arms-Tech · Atomika', text: 'The industrial partner behind magnetism research and nuclear redesigns.' },
                    { id: 'russia-front', name: 'Russia', kicker: 'Infra-net facilities', text: 'Signal towers and secret networks that could rewire the war.' },
                ],
            },
            {
                id: 'history', eyebrow: 'History', title: 'How we got here', layout: 'timeline',
                items: [
                    { name: 'Bourne Industries', text: 'Alexander Bourne founds his research company to study the architecture of energy.', chars: ['alexander-bourne'] },
                    { name: 'The rise of Encore', text: 'His son William dismantles it and founds Encore Enterprises, which soon surpasses the resources of the U.S. government.', chars: ['william-bourne'] },
                    { name: 'A Vice President against the corporations', text: 'Glenn Monroe reaches the White House promising to stop unauthorized science.', chars: ['glenn-monroe'] },
                    { name: 'Project U.R.S.O.', text: 'A new agency is created to find anomalous subjects and develop advanced technology.', chars: ['dylan-cole'] },
                    { name: 'The impossible heart', text: 'A four-year-old girl in Los Angeles shows readings no doctor can explain. The CIA takes her, and the world never hears her name.', chars: ['theodore-peterson', 'michelle-brown'] },
                    { name: 'The Amalion', text: 'At Encore, Dr. Hammond discovers what keeps her alive: a new element in her blood. Encore launches AMA-PHEST.', chars: ['george-hammond'] },
                    { name: 'Amaphest', text: 'Bonded to the AMA-ESS 05, the girl becomes Encore’s most powerful creation, and the one it cannot control.', chars: ['michelle-brown'] },
                ],
            },
        ],
    },
];

export const findUniverseTab = (key) => AMA_UNIVERSE_TABS.find((t) => t.key === key);
