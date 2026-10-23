// =====================================================================================
// Amaphest: every character and faction of the story.
// Texts come from the Amaphest documentation (A01 Characters, 00 Summary, A09 Timeline).
// Kept spoiler-free on purpose (no secret parentage, no endings).
//
// To add a character: add an entry here, and (for its art) a folder in iCloud whose name
// matches its `folder` (or its name). tools/amaphest_assets.py turns the folder name into
// the same slug. `group`: 'main', 'faction' or 'secondary'. `faction`: a key of AMA_FACTIONS.
// =====================================================================================

// `folder` is the iCloud folder name of the faction (its root image becomes the faction banner).
export const AMA_FACTIONS = [
    { key: 'pilots', name: 'AMA-ESS Pilots', folder: 'AMA-ESS Pilots', color: '#ff5a3c', text: 'Encore Enterprises’ armored pilots. Each AMA-ESS suit is built around one power, and each pilot was chosen to master it.' },
    { key: 'encore', name: 'Encore Enterprises', folder: 'Encore Enterprises', color: '#c8323f', text: 'A private corporation of advanced technology that grew beyond the resources of any government. Bourne’s inner circle and McTrevor’s labs run its weapons programs.' },
    { key: 'urso', name: 'Project U.R.S.O.', folder: 'Project URSO', color: '#3f7cff', text: 'The United States government’s super-soldier initiative, created to find, contain and weaponize anomalous subjects.' },
    { key: 'guerrillas', name: 'The Guerrillas', folder: 'The Guerrillas', color: '#7aa34a', text: 'A resistance of former soldiers fighting with scavenged weapons against corporate and government power, protecting civilians caught in between.' },
    { key: 'cia', name: 'U.S. CIA', folder: 'US CIA', color: '#5b7bb0', text: 'The intelligence agency that first discovered the girl with the impossible heart, and erased her from the world.' },
    { key: 'brown', name: 'The Brown Family', folder: "Brown's Family", color: '#e0a35c', text: 'Michelle’s family: the ordinary life that was taken from her, and the one that grew in its place.' },
    { key: 'hemos', name: 'Hemosapiens', folder: 'Hemosapients', color: '#ff4d6d', text: 'The civilization of Hemos, torn apart by a civil war between the New Regimen, the Old Regimen and the rebels of The Most.' },
    { key: 'military', name: 'U.S. Armed Forces', color: '#8a9a6a', text: 'The soldiers and commanders caught in the middle of a war they were never told about.' },
];

const C = (o) => o;

export const AMA_CHARACTERS = [
    // ------------------------------------------------------------------ main
    C({
        slug: 'michelle-brown', name: 'Michelle Brown', alias: 'Amaphest', group: 'main', faction: 'brown', alsoIn: ['pilots'], color: '#d63cff',
        role: 'The Amalion Progenitor',
        bio: [
            'Michelle Brown was born carrying both the Red and the Blue energies of Hemos, Alpha and Betha, fused into her heart before she ever drew a breath. Her mother did not survive her birth, and Michelle grew up as a scientific anomaly, feared and coveted by the most powerful institutions on Earth.',
            'At four years old she was taken by the government and classified under Project U.R.S.O. as Subject 02, studied as an experiment rather than raised as a child. Transferred to Encore Enterprises, she fell under the care of Dr. George Hammond, who became her surrogate father. Trained inside the AMA-ESS 05, a suit built from the Amalion in her own blood, she reclaimed her name and her purpose as Amaphest.',
            'Now she fights the AMA-ESS pilots and the powers that made her, while finding something she never had: people who see her as more than a weapon.',
        ],
        facts: [['Designation', 'URSO-02 · AMA-ESS 05'], ['Powers', 'Alpha (heat) and Betha (cold) currents'], ['Gift', 'Amalion in her bloodstream']],
        forms: {
            'ama-ess-jacket': 'Her bomber-style pilot jacket: a symbol of her dual identity, belonging both to Encore and to the family she chose.',
            'cobalt-armor': 'The AMA-ESS 05 in its cobalt finish.',
            'defensive-mode': 'The AMA-ESS 05 configured to protect.',
            'offensive-mode': 'The AMA-ESS 05 configured to strike, with shoulder cannons.',
        },
        defaultForm: 'offensive-mode',
    }),
    C({
        slug: 'george-hammond', name: 'Dr. George Hammond', alias: 'The Anchor', group: 'main', faction: 'encore', color: '#4fb7ff',
        role: 'Chief Scientist, AMA-ESS Division',
        bio: [
            'The architect of the AMA-ESS program and Michelle’s protector. A leading scientist in applied energy technology, known for his practical ingenuity, Hammond grew disillusioned with Encore’s ruthlessness and became Michelle’s surrogate father and the moral compass of her life.',
            'He designed the AMA-ESS 05 and its Stabilizer Core to channel Michelle’s unstable energy into a usable system, turning her greatest weakness into her strength, and crafted upgrades like the Hydrocell and the Proton Ultra Cannon. He is the proof that even inside Encore, some choose to protect rather than exploit.',
        ],
        facts: [['Field', 'Applied energy technology'], ['Creations', 'AMA-ESS 05, the Stabilizer, AMA-PR4 “DASH”'], ['Personality', 'Compassionate, pragmatic, deeply protective']],
    }),
    C({
        slug: 'glenn-monroe', name: 'Glenn Monroe', group: 'main', faction: 'urso', color: '#3f7cff',
        role: 'Vice President of the United States',
        bio: [
            'Once a brilliant government scientist, Glenn Monroe turned her intellect toward politics and rose to Vice President of the United States, campaigning to stop the unauthorized development of advanced science by private corporations.',
            'She created Project U.R.S.O., was pivotal in its early research, and played her alliances with Encore to maximize her power. Her decisions shaped Michelle’s life from the very beginning. She represents political ambition, and the dangerous cost of power.',
        ],
        facts: [['Office', 'Vice President of the U.S.'], ['Founded', 'Project U.R.S.O.'], ['Before politics', 'Scientist']],
    }),
    C({
        slug: 'dash', name: 'DASH', alias: 'AMA-PR4', group: 'main', faction: 'encore', color: '#ff4d4d',
        role: 'Hammond’s guardian unit',
        bio: [
            'A compact quadruped robot secretly built by Dr. Hammond for Michelle. Unlike Encore’s massive war machines, DASH is agile, expressive and loyal. Its most vital feature is a hidden link to Hammond: it carries his voice and can project his image from its chest core, bringing his guidance to Michelle wherever she is.',
            'Born from the same empire that enslaved her, yet remade for her defense, DASH was never meant to serve Encore. It was built with one purpose: to protect Amaphest.',
        ],
        facts: [['Model', 'AMA-PR4'], ['Built by', 'Dr. George Hammond'], ['Abilities', 'Holographic projection, diagnostics, precision repair']],
    }),

    // ------------------------------------------------------------------ AMA-ESS pilots
    C({
        slug: 'shock', name: 'Randy Williams', alias: 'Shock', group: 'faction', faction: 'pilots', color: '#2fa8ff',
        role: 'Pilot of the AMA-ESS 01',
        bio: [
            'A decorated American soldier, chosen for his resilience and combat history. His AMA-ESS 01 wields dual Gatling guns able to shred infantry and armored targets in seconds. Shock thrives on battlefield dominance and brute force, overwhelming his enemies through sheer firepower.',
            'Loyal, stubborn and straightforward, he believes in military might above all else and rarely questions orders: the embodiment of the war machine.',
        ],
        facts: [['Suit', 'AMA-ESS 01'], ['Specialization', 'Heavy artillery, suppressive fire'], ['Origin', 'United States']],
    }),
    C({
        slug: 'ion', name: 'Markus Krüger', alias: 'Ion', group: 'faction', faction: 'pilots', color: '#ff9a3d',
        role: 'Pilot of the AMA-ESS 02',
        bio: [
            'A German scientist turned pilot, lead scientist of Magnetixium, a subsidiary of Arms-Tech Industries. His brilliance is matched only by his instability: obsessed with magnetism, he redesigned his AMA-ESS to manipulate metals on a massive scale, able to bring down entire fleets and air squadrons.',
            'He treats war like an experiment, indifferent to collateral damage: genius twisted into chaos, and a mirror of what Michelle could become if she lost her humanity.',
        ],
        facts: [['Suit', 'AMA-ESS 02'], ['Specialization', 'Magnetism, naval and air warfare'], ['Origin', 'Germany']],
    }),
    C({
        slug: 'blade', name: 'Kenji Takahiro', alias: 'Blade', group: 'faction', faction: 'pilots', color: '#ff2e4d',
        role: 'Pilot of the AMA-ESS 03',
        bio: [
            'A disciplined Japanese warrior who fuses ancient martial traditions with cutting-edge weaponry. His AMA-ESS 03, dark silver plates streaked with crimson conduits, channels energy into the AMA-Blade: a sword forged from pure Amalion alloy and edged with Alpha resonance, able to fire destructive energy waves.',
            'Reserved, tactical and honorable in his own rigid sense, he sees combat as an art. His discipline turned to violence reflects Michelle’s own struggle between control and unleashed power.',
        ],
        facts: [['Suit', 'AMA-ESS 03'], ['Weapon', 'AMA-Blade'], ['Origin', 'Japan']],
    }),
    C({
        slug: 'coords', name: 'Dmitri Volkov', alias: 'Coords', group: 'faction', faction: 'pilots', color: '#5fd35f',
        role: 'Pilot of the AMA-ESS 04',
        bio: [
            'A Russian marksman who embodies patience and precision. Once a leader of the resistance, he changed sides, and Russia backed him with resources and soldiers after his alliance with Encore. His AMA-ESS 04 integrates satellite systems to track opponents and drain their energy from long range.',
            'Detached, analytical and ruthless, he believes efficiency is the highest virtue: a hunter who never wastes a shot.',
        ],
        facts: [['Suit', 'AMA-ESS 04'], ['Specialization', 'Sniping, satellite-linked systems, energy drain'], ['Origin', 'Russia']],
    }),

    // ------------------------------------------------------------------ Encore Enterprises
    C({
        slug: 'william-bourne', name: 'William Bourne', alias: 'The Architect', group: 'faction', faction: 'encore', color: '#c8323f',
        role: 'CEO of Encore Enterprises',
        bio: [
            'Heir to Bourne Industries, William turned his father’s research into Encore Enterprises, a global powerhouse of weapons development that outgrew the resources of governments. Charismatic, polished and ruthless, he manipulates governments and investors alike.',
            'He sees Michelle not as a person but as the key to limitless energy, and built the AMA-ESS suits, the AMA-ARS robots and Encore’s war machines from her power.',
        ],
        facts: [['Company', 'Encore Enterprises'], ['Father', 'Alexander Bourne'], ['Personality', 'Ambitious, manipulative, commanding']],
    }),
    C({
        slug: 'cassandra-veyra', name: 'Cassandra Veyra', alias: 'The Whisper', group: 'faction', faction: 'encore', color: '#9a4dff',
        role: 'Head of Corporate Intelligence',
        bio: ['Bourne’s master of secrets. Cassandra runs Encore’s intelligence networks: espionage, disinformation and covert operations. Elegant and enigmatic, ruthless and brilliant, she is loyal only to Bourne and shapes outcomes from the shadows. In her hands, information is a weapon.'],
        facts: [['Division', 'Corporate Intelligence'], ['Loyal to', 'William Bourne']],
    }),
    C({
        slug: 'ama-vx', name: 'AMA-VX', alias: 'Sentinel', group: 'faction', faction: 'encore', color: '#ff3b5c',
        role: 'Bourne’s personal guardian automaton',
        bio: ['A unique three-meter construct powered by Hemos energy cores and advanced combat AI, its armored frame traced with red and blue resonance veins. Wherever Bourne appears, Sentinel follows. It commands squads of AMA-HPT units, raises reactive shields and strikes with an energy blade. Cold, merciless and absolutely loyal: the fusion of technology and tyranny.'],
        facts: [['Height', 'Three meters'], ['Power', 'Hemos energy cores'], ['Abilities', 'Reactive shielding, AMA-HPT squad command, energy blade']],
    }),
    C({
        slug: 'elias-korrin', name: 'Dr. Elias Korrin', alias: 'The Conductor', group: 'faction', faction: 'encore', color: '#e0b84a',
        role: 'Head of Resonance Engineering',
        bio: ['Encore’s visionary of resonance control, a scientist who treats energy as music and machines as instruments. Charismatic, theatrical and manipulative, he believes only he can orchestrate harmony between Alpha and Betha on a massive scale, designing resonance lattices, amplifiers and dampeners able to drain or weaponize entire battlefields. To him, people are instruments to be tuned.'],
        facts: [['Specialization', 'Resonance control and amplification'], ['Designs', 'Resonance lattices, planetary amplifiers, dampeners']],
    }),
    C({
        slug: 'yara-neves', name: 'Dr. Yara Neves', alias: 'The Architect of Flesh', group: 'faction', faction: 'encore', color: '#3fd0b0',
        role: 'Head of Biofusion',
        bio: ['A pioneer of bio-mechanical fusion who merges human physiology with resonance-based crystalline structures. Practical and relentless, she approaches science like an explorer mapping forbidden territory. Yara sees Michelle not as an anomaly but as a blueprint, the first proof that Alpha and Betha can coexist, and she seeks to replicate that miracle no matter the human cost.'],
        facts: [['Specialization', 'Bio-mechanical fusion'], ['Division', 'Biofusion']],
    }),
    C({
        slug: 'stuart-mctrevor', name: 'Dr. Stuart McTrevor', alias: 'The Architect of Interfaces', group: 'faction', faction: 'encore', color: '#5fb0ff',
        role: 'Senior Scientist, AMA-PHEST Program',
        bio: [
            'One of the leading minds behind the AMA-PHEST program. A specialist in advanced neurological systems, he was instrumental in the stabilizer technology and the neural interfaces that made the AMA-ESS suits possible, and he created the AMA-Blade among other advanced weaponry.',
            'Pragmatic, cautious and brilliant, he is torn between the demands placed on him and his own ethics, especially when it comes to Michelle: innovation as both salvation and damnation.',
        ],
        facts: [['Specialization', 'Neurological systems, neural interfaces'], ['Creations', 'Stabilizer research, AMA-Blade']],
    }),
    C({
        slug: 'adrian-kael', name: 'Adrian Kael', alias: 'The Iron Hand', group: 'faction', faction: 'encore', color: '#9aa3b2',
        role: 'Chief of Security & Enforcement',
        bio: ['A hardened ex-military commander assigned to protect McTrevor’s research facilities. Unlike the robots of Bourne’s inner circle, Kael is human muscle and discipline, tactical and ruthlessly efficient, marked by a black eyepatch from his many battles. Stern and loyal, he values order above all: the human shield of fragile innovation.'],
        facts: [['Background', 'Ex-military commander'], ['Loyal to', 'Dr. Stuart McTrevor']],
    }),
    C({
        slug: 'liora-vance', name: 'Dr. Liora Vance', alias: 'The Lens', group: 'faction', faction: 'encore', color: '#b48cff',
        role: 'Lead Neurological Interface Specialist',
        bio: ['McTrevor’s most trusted assistant and a pioneer of neuro-link technology, refining the connection between human pilots and their AMA-ESS suits. Her prematurely white hair with a glowing violet streak marks her as a product of neural experimentation. Visionary and quietly empathetic, she often acts as McTrevor’s conscience.'],
        facts: [['Specialization', 'Neuro-link technology'], ['Works with', 'Dr. Stuart McTrevor']],
    }),
    C({
        slug: 'selene-aerkwright', name: 'Dr. Selene Aerkwright', alias: 'The Prism', group: 'faction', faction: 'encore', color: '#7f8cff',
        role: 'Neural Systems Analyst',
        bio: ['Assistant to Dr. Vance, Selene maps the brainwave responses between pilots and AMA-ESS systems, often catching irregularities before they escalate. Calm, meticulous and less hesitant than her mentor, she refracts complex data into hidden truths, which earned her the name The Prism.'],
        facts: [['Specialization', 'Neurological data analysis'], ['Mentor', 'Dr. Liora Vance']],
    }),

    // ------------------------------------------------------------------ Project U.R.S.O.
    C({
        slug: 'dylan-cole', name: 'Director Dylan Cole', group: 'faction', faction: 'urso', color: '#3f7cff',
        role: 'Director of Project U.R.S.O.',
        bio: [
            'The elder brother of Ryan Cole built his career on discipline and loyalty. Where Ryan rebelled against corruption, Dylan embraced authority, climbing the military ranks as a brilliant strategist and hardline officer until he was named Director of Project U.R.S.O.',
            'To him, Michelle is a dangerous anomaly and a threat to order. Loyal to Vice President Glenn Monroe and set against his own brother, he believes himself a patriot, which makes him one of the most formidable obstacles Amaphest will ever face.',
        ],
        facts: [['Brother', 'Ryan Cole'], ['Answers to', 'Vice President Glenn Monroe']],
    }),
    C({
        slug: 'ayuki-tanaka', name: 'Dr. Ayuki Tanaka', group: 'faction', faction: 'urso', color: '#ff7ab6',
        role: 'Lead Scientist',
        bio: ['The intellectual heart of Project U.R.S.O. A brilliant Japanese scientist renowned for her work in anomalous energy and biotechnology, she was recruited to pioneer the research behind the super-soldiers. Ambitious and elegant, she is loyal to science more than to politics, and her true allegiance remains a mystery.'],
        facts: [['Specialization', 'Anomalous energy, biotechnology']],
    }),
    C({
        slug: 'james-harker', name: 'Colonel James Harker', group: 'faction', faction: 'urso', color: '#8a9ab8',
        role: 'Chief of Security',
        bio: ['A battle-hardened veteran feared by soldiers and subjects alike, chosen to guard Project U.R.S.O.’s facilities for his discipline and brutality. He sees Michelle as property of the state and takes her escape as a personal affront. His loyalty to Dylan Cole is absolute, and his methods are ruthless.'],
        facts: [['Rank', 'Colonel'], ['Loyal to', 'Director Dylan Cole']],
    }),
    C({
        slug: 'victor-ross', name: 'General Victor Ross', group: 'faction', faction: 'urso', color: '#6f8f6a',
        role: 'Operations Commander',
        bio: ['A pragmatic commander respected by his men for his calm under fire, more soldier than politician. He oversees Project U.R.S.O.’s deployments and field tests and carries out Dylan Cole’s strategies, yet he is one of the few inside the program who still wrestles with his conscience.'],
        facts: [['Rank', 'General'], ['Command', 'Deployments and field testing']],
    }),
    C({
        slug: 'helena-ward', name: 'Commander Helena Ward', group: 'faction', faction: 'urso', color: '#c07a5a',
        role: 'Commander of Training and Evaluation',
        bio: ['Appointed to shape the subjects of Project U.R.S.O. into effective weapons, she conditioned and tested both Dynamo and Michelle. To her they were soldiers first and people second. She considers Michelle her most difficult trainee, and both resents and respects her resilience.'],
        facts: [['Responsible for', 'Conditioning and testing of U.R.S.O. subjects']],
    }),
    C({
        slug: 'adrian-mathews', name: 'Dr. Adrian Mathews', group: 'faction', faction: 'urso', color: '#a4b36a',
        role: 'Senior Scientist',
        bio: ['A nervous but brilliant bioengineer specialized in the biological foundations of super-soldiers. His work kept both Dynamo and Michelle alive as U.R.S.O. subjects, and kept the program running. Behind his timid exterior lies a cold detachment: to him, the subjects are material for experimentation.'],
        facts: [['Specialization', 'Bioengineering']],
    }),
    C({
        slug: 'dynamo', name: 'Jason Reed', alias: 'Dynamo', group: 'faction', faction: 'urso', color: '#ffb02e',
        role: 'URSO-1 super-soldier',
        bio: ['A soldier who volunteered for Project U.R.S.O. to serve his country, unaware of the toll it would take. As its first successful subject, URSO-1, he gained seismic powers and enhanced speed and became the government’s poster child, the perfect soldier. Paraded as a hero, he struggles with what he has lost, and his humanity may yet define his fate.'],
        facts: [['Designation', 'URSO-1'], ['Powers', 'Seismic force, enhanced speed']],
    }),

    // ------------------------------------------------------------------ The Guerrillas
    C({
        slug: 'ryan-cole', name: 'Ryan Cole', alias: 'Chief', group: 'faction', faction: 'guerrillas', color: '#7aa34a',
        role: 'Leader of the Guerrillas',
        bio: [
            'A former soldier disillusioned by corruption in the military, Ryan turned against Project U.R.S.O. and Encore and founded the Guerrillas. Scarred but resilient, strong but compassionate, he protects civilians while leading the fight for freedom, inspiring loyalty through moral clarity and discipline.',
            'He becomes Michelle’s first true ally. His devotion to his daughter Sophia keeps him grounded: a soldier hardened by war, and a father above all.',
        ],
        facts: [['Brother', 'Director Dylan Cole'], ['Daughter', 'Sophia Cole']],
    }),
    C({
        slug: 'sophia-cole', name: 'Sophia Cole', group: 'faction', faction: 'guerrillas', color: '#ffd166',
        role: 'Ryan Cole’s daughter',
        bio: ['Raised by Ryan Cole inside the resistance, Sophia brings warmth and hope to the Guerrillas. Her bond with Michelle gives Amaphest an anchor of innocence: a little sister, and a reminder of everything that must be protected.'],
        facts: [['Father', 'Ryan Cole']],
    }),
    C({
        slug: 'circuit', name: 'Alex Vega', alias: 'Circuit', group: 'faction', faction: 'guerrillas', color: '#3fd0ff',
        role: 'Hacker & surveillance expert',
        bio: ['The Guerrillas’ hacker. Circuit handles infiltrations, electronic warfare and intelligence gathering. Quick-witted and clever, he keeps the team one step ahead of Encore’s machines.'],
        facts: [['Specialty', 'Electronic warfare, intelligence']],
    }),
    C({
        slug: 'bulldog', name: 'Marcus Hale', alias: 'Bulldog', group: 'faction', faction: 'guerrillas', color: '#b08a5a',
        role: 'Breacher & heavy weapons',
        bio: ['The muscle of the team. Broad and relentless, Bulldog breaches walls and carries the heavy weapons, shielding his comrades in the heat of battle. His loyalty makes him the wall between the Guerrillas and their enemies.'],
        facts: [['Specialty', 'Breaching, heavy weapons']],
    }),
    C({
        slug: 'doc', name: 'Dr. Elena Markov', alias: 'Doc', group: 'faction', faction: 'guerrillas', color: '#ff8fa3',
        role: 'Field medic',
        bio: ['The medic and healer of the team. Calm under fire, Doc treats the wounded on the battlefield and never abandons a comrade. She is the heart of the Guerrillas, a reminder of the human side of their struggle.'],
        facts: [['Specialty', 'Battlefield medicine']],
    }),
    C({
        slug: 'fixer', name: 'Javier Ortega', alias: 'Fixer', group: 'faction', faction: 'guerrillas', color: '#e0a35c',
        role: 'Mechanic & engineer',
        bio: ['The team’s mechanic and engineer. Fixer repairs weapons and vehicles and builds makeshift solutions out of scarce resources. His tinkerer’s spirit keeps the Guerrillas fighting no matter the odds.'],
        facts: [['Specialty', 'Repairs, improvised engineering']],
    }),
    C({
        slug: 'eagle', name: 'Zara Malik', alias: 'Eagle', group: 'faction', faction: 'guerrillas', color: '#6fd3a0',
        role: 'Sniper & scout',
        bio: ['The sniper and scout. With calm focus and sharp vision, Eagle is the silent guardian of the team, providing reconnaissance and overwatch so her comrades are never caught unaware.'],
        facts: [['Specialty', 'Reconnaissance, overwatch']],
    }),
    C({
        slug: 'ghost', name: 'Lil Mendoza', alias: 'Ghost', group: 'faction', faction: 'guerrillas', color: '#9aa3b2',
        role: 'Infiltrator & saboteur',
        bio: ['The infiltrator and saboteur. Ghost moves in silence and slips through enemy lines undetected. Pragmatic and efficient, she brings stealth and precision to balance the brute force of Bulldog and Torch.'],
        facts: [['Specialty', 'Stealth, sabotage']],
    }),
    C({
        slug: 'torch', name: 'Diego Ramirez', alias: 'Torch', group: 'faction', faction: 'guerrillas', color: '#ff6a3d',
        role: 'Demolitions expert',
        bio: ['The demolitions expert. Torch thrives on controlled chaos, planting charges and bringing down Encore’s machines with fire and explosions. Reckless but loyal, he is the wild card of the Guerrillas.'],
        facts: [['Specialty', 'Explosives']],
    }),

    // ------------------------------------------------------------------ U.S. CIA
    C({
        slug: 'elizabeth-kane', name: 'Director Elizabeth Kane', group: 'faction', faction: 'cia', color: '#5b7bb0',
        role: 'Director of the CIA',
        bio: ['Kane rose through the ranks of intelligence with a reputation for calm under pressure and precise judgment. She personally led the first inquiry into the child with the anomalous heart and oversaw her containment. Balancing politics and intelligence, she often clashes with Encore and U.R.S.O., respected and feared for her leadership.'],
        facts: [['Agency', 'Central Intelligence Agency']],
    }),
    C({
        slug: 'thomas-caldwell', name: 'S.A. Thomas Caldwell', group: 'faction', faction: 'cia', color: '#7f8fa8',
        role: 'Senior Intelligence Analyst',
        bio: ['A veteran analyst with decades of experience in geopolitical strategy and crisis analysis. His was the first voice to warn of the unprecedented nature of Michelle’s case, and his insights into Encore and U.R.S.O. shape the Agency’s decisions.'],
        facts: [['Specialty', 'Geopolitical strategy, crisis analysis']],
    }),
    C({
        slug: 'isabela-torres', name: 'S.A. Isabela Torres', group: 'faction', faction: 'cia', color: '#4fc3ff',
        role: 'Cyber Operations Specialist',
        bio: ['A brilliant young agent in cyber operations and counterintelligence, sharp and relentless in the digital field. She erased every record of Michelle’s existence, and she monitors Encore and U.R.S.O., intercepting and decoding their communications.'],
        facts: [['Specialty', 'Cyber operations, counterintelligence']],
    }),

    // ------------------------------------------------------------------ The Brown Family
    C({
        slug: 'steve-brown', name: 'Steve Brown', group: 'faction', faction: 'brown', color: '#e0a35c',
        role: 'Michelle’s father',
        bio: ['A civilian powerless to prevent his daughter’s abduction after his wife died giving birth to her. Silenced by the government and forced to live as though he never had a daughter, he lingers in Michelle’s memory as her lost family: the ordinary life stolen from her, and the humanity she keeps fighting for.'],
        facts: [['Daughter', 'Michelle Brown']],
    }),
    C({
        slug: 'mia-brown', name: 'Mia Brown', group: 'faction', faction: 'brown', color: '#f0b7a0',
        role: 'Steve Brown’s wife',
        bio: ['Born Mia Espinoza, she became Steve Brown’s second wife and brought stability back into his life. Together they raised two daughters, building the family life Steve had lost. Far from the war, she stands for normalcy and love.'],
        facts: [['Married to', 'Steve Brown'], ['Daughters', 'Ambar and Miura']],
    }),
    C({
        slug: 'ambar-brown', name: 'Ambar Brown', group: 'faction', faction: 'brown', color: '#ffb347',
        role: 'Michelle’s half-sister',
        bio: ['One of the two daughters of Steve and Mia Brown, raised in a quiet home that never spoke of Michelle. To Michelle, the nameplate on Ambar’s bedroom door is a glimpse of the life she could have had: a sister she has never met.'],
        facts: [['Parents', 'Steve and Mia Brown']],
    }),
    C({
        slug: 'miura-brown', name: 'Miura Brown', group: 'faction', faction: 'brown', color: '#ffa0c8',
        role: 'Michelle’s half-sister',
        bio: ['The younger of Steve and Mia Brown’s daughters. Like Ambar, she grew up without knowing the older sister the world was told never existed, part of the family Michelle can only watch from a distance.'],
        facts: [['Parents', 'Steve and Mia Brown']],
    }),

    // ------------------------------------------------------------------ Hemosapiens
    C({
        slug: 'kratos', name: 'Kratos', alias: 'Ruler of Hemos', group: 'faction', faction: 'hemos', color: '#3f7cff',
        role: 'Founder of the New Regimen',
        bio: ['Chosen by succession to rule Hemos and hailed as a unifier, Kratos betrayed its neutrality once on the throne. He rewrote laws that were never meant to change, stripped citizens of the right to wield Alpha and Betha, and founded the authoritarian New Regimen. Brilliant, youthful and authoritarian, he is remembered as the betrayer of balance.'],
        facts: [['Allegiance', 'The New Regimen'], ['Essence', 'Blue']],
    }),
    C({
        slug: 'dravak', name: 'Dravak', alias: 'The Enforcer', group: 'faction', faction: 'hemos', color: '#2f6bff',
        role: 'Executioner of the New Regimen',
        bio: ['The merciless hand of Kratos’ regime. A massive Blue Hemosapien of cold authority, Dravak hunted down rebels and enforced discipline across Hemos, making the New Regimen synonymous with fear.'],
        facts: [['Allegiance', 'The New Regimen'], ['Essence', 'Blue']],
    }),
    C({
        slug: 'maelor', name: 'Maelor', alias: 'The Scholar', group: 'faction', faction: 'hemos', color: '#6f8cff',
        role: 'Advisor to Kratos',
        bio: ['Kratos’ advisor and intellectual. Sharp, calculating and regal, Maelor rationalized the betrayal of balance as necessary reform and believed tyranny was survival. He became the voice that made authoritarianism sound righteous.'],
        facts: [['Allegiance', 'The New Regimen']],
    }),
    C({
        slug: 'kurga', name: 'Kurga', alias: 'The Disciplined General', group: 'faction', faction: 'hemos', color: '#8aa0c8',
        role: 'Wartime ruler of Hemos',
        bio: ['A loyal soldier of the Old Regimen, chosen to take command when Kratos failed to stop the rebellion. Disciplined and pragmatic, he carried Hemos into its darkest war, and entrusted Okune with the mission that would bind the fate of Hemos to Earth.'],
        facts: [['Allegiance', 'The Old Regimen']],
    }),
    C({
        slug: 'vaelor', name: 'Vaelor', alias: 'The Arbitrator', group: 'faction', faction: 'hemos', color: '#c0b080',
        role: 'Elder statesman of the Old Regimen',
        bio: ['A mediator who believed in diplomacy above all. Wise but slow to act, his faith in negotiation left Hemos vulnerable to Kratos’ betrayal and Arkon’s rebellion: the elder who spoke for unity but could not prevent the collapse.'],
        facts: [['Allegiance', 'The Old Regimen']],
    }),
    C({
        slug: 'arkon', name: 'Arkon', alias: 'Founder of The Most', group: 'faction', faction: 'hemos', color: '#ff2e4d',
        role: 'Warlord of the rebellion',
        bio: ['Once a loyal soldier of the Old Regimen, Arkon broke away when Kratos betrayed neutrality and formed A Few with three other ex-soldiers. He brought lethal force to Hemos for the first time, breaking its oldest law, and stole the Red Power. Charismatic, ruthless and defiant, he is remembered as both liberator and violator.'],
        facts: [['Allegiance', 'The Most (rebels)'], ['Essence', 'Red']],
    }),
    C({
        slug: 'veyra', name: 'Veyra', alias: 'The Tactician', group: 'faction', faction: 'hemos', color: '#ff6a5c',
        role: 'Strategist of The Most',
        bio: ['A lean, disciplined Red Hemosapien, once an officer of the Old Regimen’s lunar garrisons. Disillusioned by Kratos, he designed the raids and tactics of A Few, often clashing with Arkon’s obsession with violence: he fought to preserve the rebellion with strategy rather than destruction.'],
        facts: [['Allegiance', 'The Most (rebels)'], ['Essence', 'Red']],
    }),
    C({
        slug: 'drevos', name: 'Drevos', alias: 'The Loyalist', group: 'faction', faction: 'hemos', color: '#b0203a',
        role: 'Arkon’s most devoted follower',
        bio: ['Broad and intimidating, with dark crimson crystalline skin. Drevos lost his family to the failures of the Old Regimen and believes Arkon was chosen to save Hemos. Zealous and uncompromising, he enforces loyalty and executes deserters.'],
        facts: [['Allegiance', 'The Most (rebels)'], ['Essence', 'Red']],
    }),
    C({
        slug: 'kairon', name: 'Kairon', alias: 'The Outcast', group: 'faction', faction: 'hemos', color: '#c08a6a',
        role: 'Survivalist of The Most',
        bio: ['Scarred and cynical, cast out of the Old Regimen for insubordination. Kairon joined A Few bringing survival skills and knowledge of Hemos’ outer wastes. He never trusted Arkon or Kratos and fights out of vengeance: bitter, but indispensable.'],
        facts: [['Allegiance', 'The Most (rebels)']],
    }),

    // ------------------------------------------------------------------ secondary
    C({
        slug: 'okune', name: 'Okune', alias: 'The Diplomat', group: 'secondary', faction: 'hemos', alsoIn: ['hemos'], color: '#ff4d6d',
        role: 'Last Red diplomat of Hemos',
        bio: ['A veteran from Hemos’ age of peace, born with Red essence yet faithful to diplomacy: the last surviving red-skinned diplomat, a living symbol of unity in a world divided. Entrusted with the most critical mission of the war, he fled through Trash-Space carrying the two Power Orbs and crash-landed on a fragile world its people call Earth, where, without ever knowing it, he sowed the seeds of Michelle’s birth.'],
        facts: [['World', 'Hemos'], ['Essence', 'Red']],
    }),
    C({
        slug: 'alexander-bourne', name: 'Alexander Bourne', group: 'secondary', faction: 'encore', color: '#c8323f',
        role: 'Founder of Bourne Industries',
        bio: ['A pioneer of experimental physics who devoted his life to the invisible architecture of energy. His studies of resonance fields and energy harmonics were decades ahead of their time, proposing that all power could be refined through frequency rather than combustion. When institutions dismissed him, he built his own company to continue the work. He died of an incurable disease, leaving his empire, and his ambitions, to his son William.'],
        facts: [['Founded', 'Bourne Industries, later Encore Enterprises'], ['Son', 'William Bourne']],
    }),
    C({
        slug: 'charles-hurley', name: 'General Charles Hurley', group: 'secondary', faction: 'military', color: '#8a9a6a',
        role: 'Pentagon Defense Command',
        bio: ['A general of the Pentagon Defense Command who receives the President and the Vice President when the crisis reaches Washington. When the war arrives at the Pentagon itself, he must choose between his orders and the truth in front of him.'],
        facts: [['Rank', 'General'], ['Command', 'Pentagon Defense Command']],
    }),
    C({
        slug: 'theodore-peterson', name: 'Dr. Theodore Peterson', group: 'secondary', faction: 'brown', color: '#e0a35c',
        role: 'General medicine & pediatrics',
        bio: ['A local clinic physician and the first doctor to examine Michelle when, at four years old, her unstable energies triggered violent seizures and near-fatal collapses. Recognizing something beyond human medicine, he reached out to an old colleague, Dr. George Hammond. He represents the ordinary world confronted with the impossible, and his call changed the course of Michelle’s life.'],
        facts: [['Field', 'General medicine and pediatrics']],
    }),
    C({
        slug: 'ethan-cross', name: 'Ethan Cross', group: 'secondary', faction: 'encore', color: '#9a7cff',
        role: 'Former Encore systems engineer',
        bio: ['A senior systems engineer with ten years on resonance cores and stabilizer design. When he walked out of Encore with schematics and field notes on stabilizer extraction and Nano-chip failures, determined to sell them abroad, he became the target of one of Michelle’s first field missions, on Catalina Island.'],
        facts: [['Expertise', 'Resonance cores, stabilizers'], ['Last seen', 'Catalina Island, California']],
    }),
    C({
        slug: 'nick-sanders', name: 'Nick Sanders', group: 'secondary', faction: 'military', color: '#8a9a6a',
        role: 'U.S. soldier',
        bio: ['Ryan Cole’s old comrade from his years in the service. When Shock’s troops ambush Nick’s desert base and his desperate voice comes through on a transmission, Ryan and the Guerrillas take off in the middle of the night to bring him back alive.'],
        facts: [['Post', 'U.S. military base in the desert'], ['Served with', 'Ryan Cole']],
    }),
];

export const findCharacter = (slug) => AMA_CHARACTERS.find((c) => c.slug === slug);
export const findFaction = (key) => AMA_FACTIONS.find((f) => f.key === key);
// Members shown under a faction button: its own members plus the main characters who belong to it.
// A secondary character joins a faction list only through `alsoIn`.
export const factionMembers = (key) => AMA_CHARACTERS.filter((c) => (c.group !== 'secondary' && c.faction === key) || (c.alsoIn || []).includes(key));
