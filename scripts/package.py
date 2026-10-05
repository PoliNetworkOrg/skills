#!/usr/bin/env python3
"""Crea lo ZIP della skill da caricare su claude.ai (Customize → Skills → Upload a skill).

Uso:
    python3 scripts/package.py [-o polinetwork-slides.zip]

Lo ZIP contiene la cartella polinetwork-slides/ con SKILL.md e tutti i file necessari,
senza cache, screenshot o file nascosti. Di default viene creato accanto alla cartella.
"""

from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
NAME = "polinetwork-slides"
SKIP_DIRS = {"__pycache__", "shots", ".git", "dist"}


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("-o", "--out", type=Path, default=SKILL.parent / f"{NAME}.zip")
    args = ap.parse_args()

    skill_md = (SKILL / "SKILL.md").read_text(encoding="utf-8")
    fm = re.match(r"---\n(.*?)\n---", skill_md, re.S)
    desc = re.search(r"^description:\s*(.+)$", fm.group(1), re.M) if fm else None
    if not desc or len(desc.group(1)) > 1024:
        print("ERRORE: SKILL.md senza description o description oltre 1024 caratteri", file=sys.stderr)
        return 1

    out = args.out.resolve()
    if SKILL in out.parents:
        print("ERRORE: crea lo ZIP fuori dalla cartella della skill", file=sys.stderr)
        return 1
    files = sorted(
        p for p in SKILL.rglob("*")
        if p.is_file()
        and not any(part in SKIP_DIRS or part.startswith(".") for part in p.relative_to(SKILL).parts)
        and p.suffix != ".pyc"
    )
    with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
        for p in files:
            z.write(p, f"{NAME}/{p.relative_to(SKILL).as_posix()}")
    print(f"OK {out}  ({len(files)} file, {out.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
