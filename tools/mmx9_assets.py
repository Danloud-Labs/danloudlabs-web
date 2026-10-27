#!/usr/bin/env python3
"""
Mega Man X9: Apex-Primal website art: converts the art in iCloud into web images and writes
assets/projects/mmx9/manifest.json, which the website reads live (no Cloudflare paste needed
when art is added: run this, commit, push).

    python3 tools/mmx9_assets.py            # from ~/Developer/danloudlabs-web
    python3 tools/mmx9_assets.py --src "<other iCloud folder>"

Folder layout (Danloud Labs/Cloudflare/Banners/MMX9):
  <root>/banner.*, logo.*                       main page hero and logo
  Characters/Main Characters/<Name>/            Maverick Hunters
  Characters/Factions/<Faction>/<Name>/         CFE, Antagonist, Mavericks
  Characters/Factions/<Faction>/<image>         that faction's button art
  Universe/<Card name>.<ext>                    art for a Universe card ("Apex Virus.png",
                                                "Beastroids.jpg", "Sigma Chip.webp"…)

Inside a character folder, the role of each image is decided like on the Amaphest pages:
  name contains "wallpaper", or the image is landscape  -> 16:9 wallpaper (hero of its page)
  name contains "F&B", "turnaround" or "CGI"            -> front & back sheet
  any other portrait image                              -> profile picture (cards)
When several files match the same role, the newest one wins. Renaming a file to
profile / wallpaper / turnaround always forces its role.
"""
import argparse
import json
import sys
import unicodedata
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from amaphest_assets import IMAGE_EXT, form_slug, pick, save  # noqa: E402  (shared converters)

HOME = Path.home()
DEFAULT_SRC = HOME / 'Library/Mobile Documents/com~apple~CloudDocs/Danloud Labs/Cloudflare/Banners/MMX9'
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets/projects/mmx9'

# Folder name in iCloud -> slug in worker/mmx9-characters.js. Others: lowercase-with-dashes.
FOLDER_SLUGS = {'Dr. Clark': 'elaine-clark', 'Dr. Elaine Clark': 'elaine-clark', 'Elaine Clark': 'elaine-clark', 'Slice Beaver': 'slicer-beaver'}
# Faction folder -> faction key in worker/mmx9-characters.js.
FACTION_KEYS = {'CFE': 'cfe', 'Antagonist': 'antagonists', 'Antagonists': 'antagonists', 'Mavericks': 'mavericks'}
# Universe image name -> card key in worker/mmx9-data.js (MMX_LORE).
LORE_KEYS = {'virus': 'apex-virus', 'apex-virus': 'apex-virus', 'the-apex-virus': 'apex-virus', 'primal': 'primal-state', 'the-primal-state': 'primal-state',
             'cfe': 'cfe-project', 'the-cfe-project': 'cfe-project', 'beastroid': 'beastroids', 'berserker': 'berserker-mode',
             'sigma-chip': 'sigma-chip', 'the-sigma-chip': 'sigma-chip', 'the-antidote': 'antidote'}

nfc = lambda s: unicodedata.normalize('NFC', s)  # noqa: E731  (macOS stores accents decomposed)


def rel(p: Path):
    return p.relative_to(OUT).as_posix()


def images(d: Path):
    return [f for f in d.iterdir() if f.is_file() and f.suffix.lower() in IMAGE_EXT]


def dirs(d: Path):
    return sorted((x for x in d.iterdir() if x.is_dir()), key=lambda p: p.name)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default=str(DEFAULT_SRC))
    src = Path(ap.parse_args().src)
    chars_dir = src / 'Characters'
    if not chars_dir.is_dir():
        sys.exit(f'Not found: {chars_dir}')

    manifest = {'characters': {}, 'factions': {}, 'universe': {'images': {}}, 'brand': {}}

    for f in images(src):
        n = f.name.lower()
        if 'banner' in n:
            manifest['brand']['banner'] = rel(save(f, OUT / 'brand/banner.webp', 'wallpaper'))
            print('brand banner <-', f.name)
        elif 'logo' in n:
            manifest['brand']['logo'] = rel(save(f, OUT / 'brand/logo.webp', 'logo'))
            print('brand logo   <-', f.name)

    char_dirs = []
    for group in dirs(chars_dir):
        if nfc(group.name) == 'Factions':
            for fac in dirs(group):
                key = FACTION_KEYS.get(nfc(fac.name)) or form_slug(fac.name)
                root = sorted(images(fac), key=lambda p: p.stat().st_mtime)
                if root:
                    manifest['factions'][key] = {'banner': rel(save(root[-1], OUT / f'factions/{key}/banner.webp', 'faction'))}
                    print(f'faction {key:12} banner <- {root[-1].name}')
                char_dirs += dirs(fac)
        else:
            char_dirs += dirs(group)

    for folder in char_dirs:
        slug = FOLDER_SLUGS.get(nfc(folder.name).strip()) or form_slug(nfc(folder.name))
        files = images(folder)
        if not slug or not files:
            continue
        entry = manifest['characters'].setdefault(slug, {})
        for role, f in pick(files).items():
            entry[role] = rel(save(f, OUT / f'characters/{slug}/{role}.webp', role))
            print(f'{slug:24} {role:10} <- {f.name}')

    uni = src / 'Universe'
    if uni.is_dir():
        for f in sorted(images(uni), key=lambda p: p.stat().st_mtime):
            name = form_slug(nfc(f.stem))
            key = LORE_KEYS.get(name, name)
            manifest['universe']['images'][key] = rel(save(f, OUT / f'universe/{key}.webp', 'universe'))
            print(f'universe {key:16} <- {f.name}')

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'manifest.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + '\n')
    print(f"\nmanifest.json: {len(manifest['characters'])} characters, {len(manifest['factions'])} factions, {len(manifest['universe']['images'])} universe images")


if __name__ == '__main__':
    main()
