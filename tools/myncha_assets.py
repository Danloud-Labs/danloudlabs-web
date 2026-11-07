#!/usr/bin/env python3
"""
Myncha: Vampires of Exius: converts David's character art into the website's
assets/projects/myncha/characters/ folder.

    cd ~/Developer/danloudlabs-web && python3 tools/myncha_assets.py

- Source: ~/Downloads/Myncha Art/Characters  (note the space at the end of "Characters ").
  Override with MYNCHA_ART=/path/to/Characters.
- Each character folder holds a portrait (vertical, 3:4, usually a transparent PNG) and a
  banner (horizontal "dynamic" image). The portrait with transparency wins when there are
  several (e.g. a "_cutout.png" made with CutOut Studio).
- Output, same size per group: characters/<key>.webp (900x1200, keeps transparency) and
  characters/<key>-banner.webp (1920x1072). Forms use their own key: myncha-human, wynclaw-beast…
- A missing folder is skipped with a warning. Keys must match worker/myncha-data.js.
"""
import os
from PIL import Image

HOME = os.path.expanduser('~')
ART = os.environ.get('MYNCHA_ART') or os.path.join(HOME, 'Downloads/Myncha Art/Characters ')
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets/projects/myncha/characters')

FOLDERS = {
    'myncha': 'vampires/Myncha',
    'myncha-human': 'Humans/School/Myncha (Human)',
    'vickie': 'vampires/Vickie',
    'rita': 'vampires/Rita',
    'bryan': 'Humans/School/Bryan',
    'wynclaw': 'Werewolves/Wynclaw',
    'wynclaw-beast': 'Werewolves/Wynclaw/Transformation',
    'nightfang': 'Werewolves/Nightfang',
    'nightfang-beast': 'Werewolves/Nightfang/Transformation',
    'lucian': 'Werewolves/Lucian',
    'lucian-beast': 'Werewolves/Lucian/transformation',
    'ember': 'Fairies/Ember',
    'lioren': 'Fairies/Lioren',
    'wink': 'Fairies/Wink',
    'gendall': 'Ghouls/Gendall',
    'gengi': 'Ghouls/Gengi',
    'mika': 'Ghouls/Mika',
    'aurelius': 'Humans/Church/Small Parish/Aurelius',
    'father-andrew': 'Humans/Church/Small Parish/Father Andrew',
    'sister-camelia': 'Humans/Church/Small Parish/Sister Camelia',
    'antoinette': 'Humans/Church/Church Emissaries/Antoinette',
    'awilda': 'Humans/Church/Church Emissaries/Awilda',
    'cardinal-gabriel': 'Humans/Church/Church Emissaries/Cardinal Gabriel',
    'georgina': 'Humans/Church/Church Emissaries/Georgina',
    'hortense': 'Humans/Church/Church Emissaries/Hortense',
    'jake': 'Humans/Church/Church Emissaries/Jake',
    'troy': 'Humans/Church/Church Emissaries/Troy',
    'barbara': 'Humans/Vampire Hunters/Barbara',
    'clementina': 'Humans/Vampire Hunters/Clementina',
    'cliff': 'Humans/Vampire Hunters/Cliff',
}
PORTRAIT = (900, 1200)
BANNER = (1920, 1072)


def cover(im, size):
    """Exact size, center crop (the source already has nearly the right shape)."""
    w, h = size
    r = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * r), round(im.height * r)), Image.LANCZOS)
    left, top = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((left, top, left + w, top + h))


def transparent(im):
    return im.mode in ('RGBA', 'LA') and im.getchannel('A').getextrema()[0] < 255


def pick(folder):
    portraits, banners = [], []
    for name in sorted(os.listdir(folder)):
        path = os.path.join(folder, name)
        if name.startswith('.') or not os.path.isfile(path) or not name.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            continue
        im = Image.open(path)
        (portraits if im.height > im.width else banners).append((path, im))
    portraits.sort(key=lambda p: not transparent(p[1]))  # transparent first
    return (portraits[0] if portraits else None), (banners[0] if banners else None)


os.makedirs(OUT, exist_ok=True)
done = 0
for key, rel in FOLDERS.items():
    folder = os.path.join(ART, rel)
    if not os.path.isdir(folder):
        print('missing', rel)
        continue
    portrait, banner = pick(folder)
    if portrait:
        im = portrait[1].convert('RGBA')
        cover(im, PORTRAIT).save(os.path.join(OUT, f'{key}.webp'), 'WEBP', quality=86, method=6)
        done += 1
    else:
        print('no portrait', rel)
    if banner:
        cover(banner[1].convert('RGB'), BANNER).save(os.path.join(OUT, f'{key}-banner.webp'), 'WEBP', quality=82, method=6)
        done += 1
    else:
        print('no banner', rel)
print(done, 'images -> assets/projects/myncha/characters/')
