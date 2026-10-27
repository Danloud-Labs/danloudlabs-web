// =====================================================================================
// Mega Man X9: Apex-Primal — locations (Locations page).
// Art: Locations/<Location name>.<ext> in the iCloud MMX9 folder ("Sky Citadel.jpg"); the
// asset script compresses it to 16:9 and the page reads it from the manifest.
// `boss`: the character fought there (slug in mmx9-characters.js). Art file names: the location name, or
// for the special stages "Opening Stage", "Gamma Intermission", "Hemma Intermission", "Dynamo Intermission".
// =====================================================================================

export const MMX_LOCATION_GROUPS = [
    { key: 'stations', name: 'The Eight Stations', sub: 'The facilities attacked by infected Mavericks, as Palette mapped them in the mission briefing.' },
    { key: 'special', name: 'Special Stages', sub: 'The opening stage and the intermissions that break the hunt for the Mavericks.' },
    { key: 'story', name: 'Story Locations', sub: 'Where the Hunters plan, where the Beastroids were born, and where it all ends.' },
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
        key: 'opening-stage', name: 'Opening Stage: Reploidforce Satellite Tower', group: 'special',
        text: 'One of the most important data hubs in the world. X, Zero and Axl climb it floor by floor through wind and thunder to reach the central command room, where Dynamo releases the sonic wave of the Apex Virus.',
    },
    {
        key: 'gamma-intermission', name: 'Intermission: The White Tiger', group: 'special', boss: 'gamma',
        text: 'After the fourth station falls, something tears through a district on the outskirts of the city. The readings match no Maverick on record.',
    },
    {
        key: 'hemma-intermission', name: 'Intermission: Sister Against Sister', group: 'special', boss: 'hemma',
        text: 'As the last stations fall, a signal identical to Gamma’s, yet wildly unstable, appears on Layer’s screen. Hemma has been found.',
    },
    {
        key: 'dynamo-intermission', name: 'Intermission: Hunter and Prey', group: 'special', boss: 'dynamo',
        text: 'Her Berserker still wild but no longer blind, Hemma follows the scent of the virus to its source and finds the one who did this to her.',
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
