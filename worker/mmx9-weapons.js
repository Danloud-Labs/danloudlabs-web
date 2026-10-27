// =====================================================================================
// Mega Man X9: Apex-Primal — special weapons (Weapons page).
// Each playable character earns one weapon per Maverick. Weapons are listed by boss slug
// (worker/mmx9-characters.js); a missing name shows as "To be revealed".
// Art: Weapons/<X|Zero|Axl|Gamma>/<Weapon name>.<ext> in the iCloud MMX9 folder.
// =====================================================================================

export const MMX_WEAPON_USERS = [
    { key: 'x', name: 'X', character: 'x', color: '#3f8cff' },
    { key: 'zero', name: 'Zero', character: 'zero', color: '#e8394a' },
    { key: 'axl', name: 'Axl', character: 'axl', color: '#ff7a2f' },
    { key: 'gamma', name: 'Gamma', character: 'gamma', color: '#cfe3ff' },
];

// weapons[user][boss slug] = weapon name. X's names come from the General Notes.
export const MMX_WEAPONS = {
    x: {
        'arctic-woolly-mammoth': 'Cryo Stampede',
        'plasma-axolotl': 'Cell Repeater',
        'electro-unicorn': 'Thunder Lancer',
        'volcanic-great-ape': 'Inferno Knuckle',
        'supersonic-woodpecker': 'Echo Pulse',
        'toxin-ladybug': 'Acid Bloom',
        'splash-dolphin': 'Hydro Crash',
        'slicer-beaver': 'Twin Slicer',
    },
    zero: {},
    axl: {},
    gamma: {},
};

export const weaponOf = (user, bossSlug) => (MMX_WEAPONS[user] || {})[bossSlug] || '';
