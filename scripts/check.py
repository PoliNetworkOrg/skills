#!/usr/bin/env python3
"""Controlla una presentazione compilata con Chrome/Chromium headless.

Uso:
    python3 scripts/check.py presentazione.html [--shots DIR] [--slides 1,4,7]

- Apre il file con ?check: il motore misura ogni slide e segnala testo che esce
  dalla slide o dalle card, contenuto che copre il footer, font sotto i 17px,
  immagini mancanti e segnaposto .todo ancora da completare.
- Con --shots salva uno screenshot PNG per slide (e un foglio riassuntivo
  contact-sheet.png se ImageMagick è installato), da guardare prima di consegnare.

Il browser si trova da solo; altrimenti impostare CHROME=/percorso/chrome.
Esce con codice 1 se ci sono problemi di layout.
"""

from __future__ import annotations

import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

CANDIDATES = [
    "chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome",
    "brave", "brave-browser", "microsoft-edge",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
]


def find_chrome() -> str | None:
    if os.environ.get("CHROME"):
        return os.environ["CHROME"] if os.path.isfile(os.environ["CHROME"]) else None
    # chrome-headless-shell (Playwright) è il più affidabile per --dump-dom/--screenshot
    home = Path.home()
    for pat in (
        ".cache/ms-playwright/chromium_headless_shell-*/chrome-*/chrome-headless-shell",
        "Library/Caches/ms-playwright/chromium_headless_shell-*/chrome-*/chrome-headless-shell",
    ):
        hits = sorted(glob.glob(str(home / pat)))
        if hits:
            return hits[-1]
    for c in CANDIDATES:
        p = shutil.which(c) or (c if os.path.isfile(c) else None)
        if p:
            return p
    return None


def run(chrome: str, args: list[str], timeout: int = 60) -> subprocess.CompletedProcess:
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as prof:
        mode = [] if "headless-shell" in chrome else ["--headless=new"]
        cmd = [chrome, *mode, "--disable-gpu", "--no-first-run", "--hide-scrollbars",
               "--allow-file-access-from-files", f"--user-data-dir={prof}", *args]
        try:
            return subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        except subprocess.TimeoutExpired:
            return subprocess.CompletedProcess(cmd, 124, "", f"timeout dopo {timeout}s: prova CHROME=/percorso/chrome-headless-shell")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("deck", type=Path)
    ap.add_argument("--shots", type=Path, help="cartella dove salvare gli screenshot")
    ap.add_argument("--slides", help="solo queste slide per gli screenshot, es. 1,3,8")
    args = ap.parse_args()

    deck = args.deck.resolve()
    if deck.name.endswith(".slides.html"):
        print("Questo è il sorgente: compila prima con scripts/build.py", file=sys.stderr)
        return 2
    chrome = find_chrome()
    if not chrome:
        print("Chrome/Chromium non trovato: imposta CHROME=/percorso/del/browser", file=sys.stderr)
        return 2
    url = deck.as_uri()

    res = run(chrome, ["--window-size=1600,900", "--virtual-time-budget=6000", "--dump-dom", url + "?check"])
    m = re.search(r'<script type="application/json" id="pn-check">(.*?)</script>', res.stdout, re.S)
    if not m:
        print("Impossibile leggere il rapporto di controllo.", res.stderr[-800:], file=sys.stderr)
        return 2
    data = json.loads(m.group(1))
    total = data["slides"]
    if data["ok"]:
        print(f"OK — {total} slide, nessun problema di layout")
    else:
        for item in data["report"]:
            print(f"\nSlide {item['slide']}: {item['title']}")
            for issue in item["issues"]:
                print(f"  - {issue}")

    if args.shots:
        out = args.shots.resolve()
        out.mkdir(parents=True, exist_ok=True)
        nums = [int(x) for x in args.slides.split(",")] if args.slides else list(range(1, total + 1))

        def shot(n: int) -> Path:
            p = out / f"slide-{n:02d}.png"
            run(chrome, ["--window-size=1600,900", "--virtual-time-budget=4000", f"--screenshot={p}", f"{url}?static#{n}"])
            return p

        with ThreadPoolExecutor(max_workers=4) as ex:
            files = [p for p in ex.map(shot, nums) if p.exists()]
        print(f"\n{len(files)} screenshot in {out}")
        montage = shutil.which("montage")
        if montage and len(files) > 1:
            sheet = out / "contact-sheet.png"
            subprocess.run([montage, *map(str, files), "-tile", "4x", "-geometry", "400x225+6+6", "-background", "#e2e8f0", str(sheet)], check=False)
            if sheet.exists():
                print(f"Foglio riassuntivo: {sheet}")

    soft = ("immagini mancanti", "dati da completare")
    real = [i for item in data["report"] for i in item["issues"] if not i.startswith(soft)]
    return 1 if real else 0


if __name__ == "__main__":
    sys.exit(main())
