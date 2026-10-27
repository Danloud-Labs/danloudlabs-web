// =====================================================================================
// Mega Man X9: Apex-Primal — locations (Locations page).
// Art: Locations/<Location name>.<ext> in the iCloud MMX9 folder ("Sky Citadel.jpg"); the
// asset script compresses it to 16:9 and the page reads it from the manifest.
// `boss`: the Maverick that holds that station (slug in mmx9-characters.js).
// =====================================================================================

export const MMX_LOCATION_GROUPS = [
    { key: 'stations', name: 'The Eight Stations', sub: 'The facilities attacked by infected Mavericks, as Palette mapped them in the mission briefing.' },
    { key: 'story', name: 'Story Locations', sub: 'Where the crisis began, where the Hunters fight back, and where it ends.' },
];

export const MMX_LOCATIONS = [
    { key: 'polar-excavation-base', name: 'Polar Excavation Base', group: 'stations', boss: 'arctic-woolly-mammoth' },
    { key: 'deep-sea-research-lab', name: 'Deep Sea Research Lab', group: 'stations', boss: 'plasma-axolotl' },
    { key: 'sky-citadel', name: 'Sky Citadel', group: 'stations', boss: 'electro-unicorn' },
    { key: 'collapsed-volcano-mining-facility', name: 'Collapsed Volcano Mining Facility', group: 'stations', boss: 'volcanic-great-ape' },
    { key: 'high-altitude-wind-farms', name: 'High Altitude Wind Farms', group: 'stations', boss: 'supersonic-woodpecker' },
    { key: 'toxic-overgrown-greenhouse', name: 'Toxic Overgrown Greenhouse', group: 'stations', boss: 'toxin-ladybug' },
    { key: 'destroyed-desalinization-facility', name: 'Destroyed Desalinization Facility', group: 'stations', boss: 'splash-dolphin' },
    { key: 'industrial-logging-site', name: 'Industrial Logging Site', group: 'stations', boss: 'slicer-beaver' },
    {
        key: 'reploidforce-satellite-tower', name: 'Reploidforce Satellite Tower', group: 'story',
        text: 'One of the most important data hubs in the world, linking Reploids and machines through millions of transmissions. From its central command room, Dynamo released the sonic wave of the Apex Virus.',
    },
    {
        key: 'maverick-hunter-base', name: 'Maverick Hunter Base', group: 'story',
        text: 'Where X rested in his dormant state, where Palette briefed the eight missions, and where Alia turned X’s cells into the only antidote.',
    },
    {
        key: 'dr-clarks-laboratory', name: 'Dr. Clark’s Laboratory', group: 'story',
        text: 'Raided and left in ruins after Dr. Elaine Clark was imprisoned. The official records say every experiment was destroyed. The records were wrong.',
    },
    {
        key: 'dynamos-stronghold', name: 'Dynamo’s Stronghold', group: 'story',
        text: 'The hidden fortress where Dynamo spent years developing the Apex Virus, and the source of every wave.',
    },
];
