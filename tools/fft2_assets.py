#!/usr/bin/env python3
"""
Final Fantasy Tactics II: The Moon and the Radiant Sword: converts David's art into the
website's assets/projects/fft2/ folder.

    cd ~/Developer/danloudlabs-web && python3 tools/fft2_assets.py

- Source: ~/Downloads/FFT2 (characters, jobs, locations, swords) and the iCloud project folder
  (logo and the trailer, whose frames illustrate the Story chapters).
- Every file name is mapped by hand in ART below (the source names carry random suffixes).
  A source that is missing is skipped with a warning.
- Same group, same size: portraits 900x1200 (3:4), jobs 768x1376, locations 1920x1072.
  Art that is not 3:4 (the chocobos) is fitted inside its frame on the page, never cropped.
"""
import os
import subprocess
from PIL import Image

HOME = os.path.expanduser('~')
DL = os.environ.get('FFT2_ART') or os.path.join(HOME, 'Downloads/FFT2')
ICLOUD = os.environ.get('FFT2_PROJECT') or os.path.join(HOME, 'Library/Mobile Documents/com~apple~CloudDocs/Danloud Labs/Projects/Final Fantasy Tactics II')
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets/projects/fft2')

C = 'Characters/Noble Houses'
U = 'Characters/Unique Characters'
ART = {
    # characters/<key>.webp
    'characters': {
        'marcel': f'{C}/Bourdeaux (Ordallia)/King_Marcel_Bourdeaux_ab157326_2K.jpg',
        'valerand': f'{C}/Bourdeaux (Ordallia)/Prince_Valerand_Bourdeaux_be5eb30a_2K.jpg',
        'genevieve': f'{C}/Bourdeaux (Ordallia)/Princess_Genevieve_Bourdeaux_98d13bd8_2K.jpg',
        'lucius': f'{C}/Bourdeaux (Ordallia)/Prince_Lucius_Bourdeaux_and_Black_66fe47c9_2K.jpg',
        'nocturne': f'{C}/Bourdeaux (Ordallia)/Nocturne_0dca51da_2K.jpg',
        'aveline': f'{C}/Oaks Family/Aveline_Bunansa_Oaks_db401e49_2K.jpg',
        'lady-aveline': f'{C}/Oaks Family/Lady_Aveline_Oaks_901ebfbc_2K.jpg',
        'agrias': f'{C}/Oaks Family/Agrias_Oaks_0affcec9_2K.jpg',
        'effigy': f'{C}/Oaks Family/Effigy_6867aca9_2K.jpg',
        'arthur': f'{C}/Ironclad/Arthur_"The_Anvil"_Ironclad_75a316dd_2K.jpg',
        'beatrix': f'{C}/Ironclad/Beatrix_Ironclad_63599578_2K.jpg',
        'gideon': f'{C}/Ironclad/Gideon_Ironclad_acbe862b_2K.jpg',
        'boco': f'{C}/Ironclad/Boco_c41c883e_2K.jpg',
        'robert': f'{C}/Beoulve Family/Lord_Commander_Robert_Beoulve_61ced00d_2K.jpg',
        'cedric': f'{C}/Beoulve Family/Cedric_Beoulve_005b832d_2K.jpg',
        'elric': f'{C}/Larg/Marquis_Elric_Larg_9caf2736_2K.jpg',
        'valen': f'{C}/Larg/Anime_boy_dark_fantasy_concept_173a1f2a_2K.jpg',
        'marissa': f'{C}/Goltana/Dowager_Countess_Marissa_Goltana_5553ca45_2K.jpg',
        'julian': f'{C}/Goltana/Julian_Goltana_cda8416c_2K.jpg',
        'kenneth': f'{C}/Atkascha/Anime_boy_concept_art_portrait_c9e117b5_2K.jpg',
        'lysandra': f'{C}/Atkascha/Lysandra_Atkascha_0b90c4b1_2K.jpg',
        'delita': f'{U}/Young_King_Delita_Hyral_armor_70d8c645_2K.jpg',
        'agrias-young': f'{U}/Agrias_Oaks_(Young)_eeb48dfb_2K.jpg',
        'mustadio': f'{U}/Mustadio_Bunansa_4753608f_2K.jpg',
        'ramza': f'{U}/Ramza_Beoulve_9633a2de_2K.jpg',
    },
    # jobs/<key>.webp
    'jobs': {
        'alchemist': 'Characters/Jobs/New Jobs/Alchemist_1cb2f705_2K.jpg',
        'templar': 'Characters/Jobs/New Jobs/Templar_afdcc2a1_2K.jpg',
        'chocobo-breeder': 'Characters/Jobs/New Jobs/Chocobo_Breeder_f714a4ca_2K.jpg',
        'invoker': 'Characters/Jobs/New Jobs/Invoker_f43bd4db_2K.jpg',
        'magician': 'Characters/Jobs/New Jobs/Magician_889af292_2K.jpg',
        'hwarang': 'Characters/Jobs/New Jobs/Hwarang_ec6cb932_2K.jpg',
        'gladiator': 'Characters/Jobs/New Jobs/Gladiator_854e09f6_2K.jpg',
        'red-mage': 'Characters/Jobs/New Jobs/Red_Mage_f39751ce_2K.jpg',
        'squire': 'Characters/Jobs/Old Jobs/Squire_e122af43_2K.jpg',
        'chemist': 'Characters/Jobs/Old Jobs/Chemist_8e8bfefb_2K.jpg',
        'knight': 'Characters/Jobs/Old Jobs/Knight_193e9e6b_2K.jpg',
        'archer': 'Characters/Jobs/Old Jobs/Archer_cd25f7fb_2K.jpg',
        'monk': 'Characters/Jobs/Old Jobs/Monk_eb057e82_2K.jpg',
        'white-mage': 'Characters/Jobs/Old Jobs/White_Mage_fa5ad074_2K.jpg',
        'black-mage': 'Characters/Jobs/Old Jobs/Black_Mage_3ffae602_2K.jpg',
        'time-mage': 'Characters/Jobs/Old Jobs/Time_Mage_94ffad6c_2K.jpg',
        'summoner': 'Characters/Jobs/Old Jobs/Summoner_ce1c1d28_2K.jpg',
        'thief': 'Characters/Jobs/Old Jobs/Thief_cfb0467f_2K.jpg',
        'mediator': 'Characters/Jobs/Old Jobs/Mediator_a9a56a16_2K.jpg',
        'mystic': 'Characters/Jobs/Old Jobs/Mystic_6af63b8e_2K.jpg',
        'geomancer': 'Characters/Jobs/Old Jobs/Geomancer_cccc5ce6_2K.jpg',
        'dragoon': 'Characters/Jobs/Old Jobs/Dragooner_b64ecf60_2K.jpg',
        'samurai': 'Characters/Jobs/Old Jobs/Samurai_4358ddcf_2K.jpg',
        'ninja': 'Characters/Jobs/Old Jobs/Ninja_a1309fcb_2K.jpg',
        'bard-dancer': 'Characters/Jobs/Old Jobs/Artist_1f8c8eeb_2K.jpg',
    },
    # locations/<key>.webp
    'locations': {
        'verminhan': "locations/Verminhan_Aerial_View_0e7e7ccb_2K.jpg",
        'verminhan-hallway': "locations/Verminhan_Castle_-_Hallway_b4c1f414_2K.jpg",
        'verminhan-throne': "locations/Royal_throne_of_Verminhan_-_050786f0_2K.jpg",
        'lesalia-castle': "locations/upscale_4208a446_2K.jpg",
        'delita-tomb': "locations/Delitas'_Tomb_-_Lesalia_Cementery_49e6c6d5_2K.jpg",
        'besrudio-workshop': "locations/Bersudio's_Workshop_in_Goug_7f27d648_2K.jpg",
        'the-continent': "locations/Final_Fantasy_Tactics_II_Region_33352414_2K.jpg",
        'war-table': "locations/Ivalice_Map_9a3c966f_2K.jpg",
    },
    # relics/<key>.webp
    'relics': {
        'aethelgard': 'Swords Storyline/Aethelgard_4c34bf75_2K.jpg',
        'dawnweaver': 'Swords Storyline/Copy_of_Prince_and_Chocobo_8f9c12f8_2K.jpg',
    },
}
SIZES = {'characters': (900, 1200), 'relics': (900, 1200), 'jobs': (768, 1376), 'locations': (1920, 1072)}

# Story chapter art: frames of the trailer (seconds), until the final art exists.
TRAILER = os.path.join(ICLOUD, 'Final Fantasy Tactics II_The Moon and The Radiant Sword.mp4')
FRAMES = {'chapter-01': 14, 'chapter-02': 54, 'chapter-03': 84, 'chapter-04': 97, 'chapter-05': 114, 'chapter-06': 124, 'poster': 5}


def fit(im, size):
    """Exact size for art with the group's shape (center crop); otherwise fit inside, same max box."""
    w, h = size
    if abs(im.width / im.height - w / h) < 0.04:
        r = max(w / im.width, h / im.height)
        im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
        l, t = (im.width - w) // 2, (im.height - h) // 2
        return im.crop((l, t, l + w, t + h))
    im = im.copy()
    im.thumbnail(size, Image.LANCZOS)
    return im


def save(im, path, q=84):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=q, method=6)


done = 0
for group, files in ART.items():
    for key, rel in files.items():
        src = os.path.join(DL, rel)
        if not os.path.exists(src):
            print('missing', rel)
            continue
        save(fit(Image.open(src).convert('RGB'), SIZES[group]), os.path.join(OUT, group, f'{key}.webp'))
        done += 1

logo = os.path.join(ICLOUD, 'Logo FINAL.jpg')
if os.path.exists(logo):
    im = Image.open(logo).convert('RGB')
    # Trim the white margins around the art (keep 3% padding).
    mask = im.convert('L').point(lambda v: 255 if v < 240 else 0)
    l, t, r, btm = mask.getbbox()
    pad = round(im.width * 0.03)
    im = im.crop((max(0, l - pad), max(0, t - pad), min(im.width, r + pad), min(im.height, btm + pad)))
    im.thumbnail((1600, 1600), Image.LANCZOS)
    save(im, os.path.join(OUT, 'brand/logo.webp'), 88)
    done += 1

if os.path.exists(TRAILER):
    tmp = os.path.join(OUT, '_frame.png')
    for key, t in FRAMES.items():
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', TRAILER, '-frames:v', '1', tmp], check=True)
        dest = 'brand/poster.webp' if key == 'poster' else f'story/{key}.webp'
        save(Image.open(tmp).convert('RGB'), os.path.join(OUT, dest))
        done += 1
    os.remove(tmp)
print(done, 'images -> assets/projects/fft2/')
