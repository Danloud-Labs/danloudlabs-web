#!/usr/bin/env python3
"""
Amaphest website art: converts the character art in iCloud into web images and writes
assets/projects/amaphest/manifest.json, which the website reads live (no Cloudflare paste
needed when art is added: run this, commit, push).

    python3 tools/amaphest_assets.py            # from ~/Developer/danloudlabs-web
    python3 tools/amaphest_assets.py --src "<other iCloud folder>"

How files are recognized inside each character folder (and inside each form subfolder,
for characters with several outfits such as Michelle's AMA-ESS Jacket or Offensive Mode):
  - name contains "wallpaper", or the image is landscape  -> 16:9 dynamic wallpaper
  - name contains "F&B", "turnaround" or "CGI"            -> front & back turnaround
  - any other portrait image (Face, Upscale, Collection_Cover, profile) -> profile picture
When several files match the same role, the newest one wins. Renaming a file to
profile.png / wallpaper.jpg / turnaround.jpg always forces its role.
"""
import argparse
import json
import os
import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image

HOME = Path.home()
DEFAULT_SRC = HOME / 'Library/Mobile Documents/com~apple~CloudDocs/Danloud Labs/Cloudflare/Banners/Amaphest'
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets/projects/amaphest'

# Folder name in iCloud (the part before " – " / " - " when present) -> slug used by the site.
# Folders not listed here get an automatic slug: titles dropped, "Name-Alias" -> name.
# The site shows the names from the story documents; folder spellings that differ are mapped here.
FOLDER_SLUGS = {
    # main
    'Amaphest': 'michelle-brown', 'Michelle Brown': 'michelle-brown',
    'AMA-PR4': 'dash', 'George Hammond': 'george-hammond', 'Glenn Monroe': 'glenn-monroe',
    # secondary
    'Alexander Bourne': 'alexander-bourne', 'Charles Hurley': 'charles-hurley',
    'Dr. Teodore Peterson': 'theodore-peterson', 'Dr. Theodore Peterson': 'theodore-peterson',
    'Ethan Cross': 'ethan-cross', 'Nick Sanders': 'nick-sanders', 'Okune': 'okune',
    # AMA-ESS pilots
    'Randy Williams': 'shock', 'Markus Krüger': 'ion', 'Kenji Takahiro': 'blade', 'Dmitri Volkov': 'coords',
    # Encore Enterprises
    'AMA_VX': 'ama-vx', 'AMA-VX': 'ama-vx', 'Dr. Ellias Korrin': 'elias-korrin', 'Dr. Elias Korrin': 'elias-korrin',
    'Dr. Selene Aerkwright': 'selene-arkwright', 'Dr. Selene Arkwright': 'selene-arkwright',
    # Project URSO
    'Jason Reed': 'dynamo', 'Dr. Ayuki Tanaka': 'ayumi-tanaka', 'Dr. Ayumi Tanaka': 'ayumi-tanaka',
    'S.A. Isabela Torres': 'isabella-torres', 'S.A. Isabella Torres': 'isabella-torres',
    # The Guerrillas ("Name-Alias")
    'Alex Vega-Circuit': 'circuit', 'Diego Ramirez-Torch': 'torch', 'Elena Markov-Doc': 'doc',
    'Javier Ortega-Fixer': 'fixer', 'Lil Mendoza-Ghost': 'ghost', 'Lila Mendoza-Ghost': 'ghost',
    'Marcus Hale-Bulldog': 'bulldog', 'Ryan Cole-Chief': 'ryan-cole', 'Zara Malik-Eagle': 'eagle',
}
# Faction folder (inside Characters/Factions) -> faction key in amaphest-characters.js.
# The image at the root of each faction folder becomes that faction's button art.
FACTION_KEYS = {
    'AMA-ESS Pilots': 'pilots', "Brown's Family": 'brown', 'Encore Enterprises': 'encore',
    'Project URSO': 'urso', 'The Guerrillas': 'guerrillas', 'US CIA': 'cia', 'Hemosapients': 'hemos',
}
TITLES = r'^(Dr\.|Director|Colonel|Commander|Captain|General|S\.A\.)\s+'
IMAGE_EXT = {'.jpg', '.jpeg', '.png', '.webp', '.heic'}


_SLUGS = {unicodedata.normalize('NFC', k): v for k, v in FOLDER_SLUGS.items()}


def slug_for(folder: str):
    folder = unicodedata.normalize('NFC', folder)   # macOS stores "ü" decomposed
    key = re.split(r'\s[–-]\s', folder, maxsplit=1)[0].strip()
    found = _SLUGS.get(key) or _SLUGS.get(folder.strip())
    if found:
        return found
    name = re.sub(TITLES, '', key).split('-')[0]
    return form_slug(name) or None


def form_slug(name: str):
    return re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')


def role_of(path: Path, size):
    n = path.stem.lower()
    if n.startswith('profile'):
        return 'profile'
    if n.startswith('wallpaper') or 'wallpaper' in n:
        return 'wallpaper'
    if n.startswith('turnaround') or 'f&b' in n or 'cgi' in n:
        return 'turnaround'
    w, h = size
    return 'wallpaper' if w > h * 1.2 else 'profile'


def pick(files):
    """files: list of Path -> {role: Path}, newest file per role."""
    roles = {}
    for f in sorted(files, key=lambda p: p.stat().st_mtime):
        try:
            with Image.open(f) as im:
                r = role_of(f, im.size)
        except Exception as e:  # noqa: BLE001
            print(f'  skip {f.name}: {e}')
            continue
        roles[r] = f
    return roles


def save(src: Path, dst: Path, role: str):
    dst.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im.load()
        if role == 'wallpaper':
            im = im.convert('RGB')
            w, h = im.size
            target = 16 / 9
            if abs(w / h - target) > 0.01:
                if w / h > target:
                    nw = round(h * target); x = (w - nw) // 2; im = im.crop((x, 0, x + nw, h))
                else:
                    nh = round(w / target); y = (h - nh) // 2; im = im.crop((0, y, w, y + nh))
            im.thumbnail((2048, 1152), Image.LANCZOS)
            im.save(dst, 'WEBP', quality=82, method=6)
        elif role == 'turnaround':
            im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
            im.thumbnail((1400, 1400), Image.LANCZOS)
            im.save(dst, 'WEBP', quality=82, method=6)
        elif role == 'faction':
            im = im.convert('RGB')
            im.thumbnail((1200, 1200), Image.LANCZOS)
            im.save(dst, 'WEBP', quality=80, method=6)
        elif role == 'logo':
            # Logo on black: use brightness as transparency so it sits on any dark page.
            rgb = im.convert('RGB')
            a = rgb.convert('L').point(lambda v: min(255, int(v * 1.6)))
            im = rgb.copy(); im.putalpha(a)
            im = im.crop(a.point(lambda v: 255 if v > 24 else 0).getbbox())
            im.thumbnail((1400, 700), Image.LANCZOS)
            im.save(dst, 'WEBP', quality=88, method=6)
        else:  # profile: keep transparency (pilot portraits have none behind them)
            im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
            im.thumbnail((720, 960), Image.LANCZOS)
            im.save(dst, 'WEBP', quality=84, method=6)
    return dst


def rel(p: Path):
    return p.relative_to(OUT).as_posix()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default=str(DEFAULT_SRC))
    args = ap.parse_args()
    src = Path(args.src)
    chars_dir = src / 'Characters'
    if not chars_dir.is_dir():
        sys.exit(f'Not found: {chars_dir}')

    manifest = {'characters': {}, 'factions': {}, 'brand': {}}

    # Brand art at the top of the folder.
    for f in src.iterdir():
        n = f.name.lower()
        if f.suffix.lower() not in IMAGE_EXT:
            continue
        if 'banner' in n:
            manifest['brand']['banner'] = rel(save(f, OUT / 'brand/banner.webp', 'wallpaper'))
            print('brand banner <-', f.name)
        elif 'logo' in n or 'collection_cover' in n:
            manifest['brand']['logo'] = rel(save(f, OUT / 'brand/logo.webp', 'logo'))
            print('brand logo   <-', f.name)

    def images(d: Path):
        return [f for f in d.iterdir() if f.is_file() and f.suffix.lower() in IMAGE_EXT]

    def dirs(d: Path):
        return sorted((x for x in d.iterdir() if x.is_dir()), key=lambda p: p.name)

    # Characters/<Main|Secondary Characters>/<character>  and  Characters/Factions/<faction>/<character>
    char_dirs = []
    for group in dirs(chars_dir):
        if unicodedata.normalize('NFC', group.name) == 'Factions':
            for fac in dirs(group):
                key = FACTION_KEYS.get(unicodedata.normalize('NFC', fac.name)) or form_slug(fac.name)
                root = sorted(images(fac), key=lambda p: p.stat().st_mtime)
                if root:
                    manifest['factions'][key] = {'banner': rel(save(root[-1], OUT / f'factions/{key}/banner.webp', 'faction'))}
                    print(f'faction {key:12} banner <- {root[-1].name}')
                char_dirs += dirs(fac)
        else:
            char_dirs += dirs(group)

    for folder in char_dirs:
        slug = slug_for(folder.name)
        if not slug:
            continue
        entry = manifest['characters'].setdefault(slug, {'forms': []})
        files = images(folder)
        if files:
            for role, f in pick(files).items():
                entry[role] = rel(save(f, OUT / f'characters/{slug}/{role}.webp', role))
                print(f'{slug:18} {role:10} <- {f.name}')
        for d in dirs(folder):
            ffiles = images(d)
            if not ffiles:
                continue
            fs = form_slug(d.name)
            form = {'name': d.name, 'slug': fs}
            for role, f in pick(ffiles).items():
                form[role] = rel(save(f, OUT / f'characters/{slug}/{fs}/{role}.webp', role))
                print(f'{slug:18} {fs + "/" + role:28} <- {f.name}')
            entry['forms'].append(form)
        if not entry['forms']:
            entry.pop('forms')
        if not entry:
            manifest['characters'].pop(slug)

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    print(f"\nmanifest.json: {len(manifest['characters'])} characters and {len(manifest['factions'])} factions with art")


if __name__ == '__main__':
    main()
