#!/usr/bin/env python3
"""Compila una presentazione PoliNetwork in un unico file HTML autonomo.

Uso:
    python3 scripts/build.py percorso/assemblea.slides.html [-o out.html] [--no-embed-images]
    python3 scripts/build.py --extract assemblea.html [-o cartella]   # ricava il sorgente

Il sorgente contiene solo le <section class="slide">, preceduto da un commento
con i metadati:

    <!--
    title: Assemblea dei Soci – 28 aprile 2026
    lang: it
    -->

Il risultato include tema, motore, font, logo, forme di sfondo, le sole icone
usate e (di default) le immagini locali, quindi funziona offline e si può
mandare come singolo file. Solo libreria standard di Python.
"""

from __future__ import annotations

import argparse
import base64
import difflib
import html
import mimetypes
import re
import sys
from pathlib import Path

SKILL = Path(__file__).resolve().parent.parent
ASSETS = SKILL / "assets"

FONTS = [
    # (family, weight, file stem)
    ("DM Sans", "400 700", "DMSans-400-700"),
    ("Poppins", "400", "Poppins-400"),
    ("Poppins", "500", "Poppins-500"),
    ("Poppins", "600", "Poppins-600"),
    ("Red Hat Text", "400 700", "RedHatText-400-700"),
]
RANGES = {
    "latin": "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
    "latin-ext": "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF",
}
ARROW = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'
ICON_TAG = re.compile(r'<i\b([^>]*?)\bdata-icon="([a-z0-9-]+)"([^>]*)>\s*</i>')
META = re.compile(r"\A\s*<!--(.*?)-->", re.S)


def b64(path: Path, mime: str | None = None) -> str:
    mime = mime or mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    return f"data:{mime};base64,{base64.b64encode(path.read_bytes()).decode()}"


def svg_uri(svg: str) -> str:
    return "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode()


def font_css() -> str:
    out = []
    for family, weight, stem in FONTS:
        for subset, rng in RANGES.items():
            f = ASSETS / "fonts" / f"{stem}-{subset}.woff2"
            out.append(
                f'@font-face{{font-family:"{family}";font-style:normal;font-weight:{weight};font-display:block;'
                f'src:url({b64(f, "font/woff2")}) format("woff2");unicode-range:{rng}}}'
            )
    return "\n".join(out)


def wire_paths() -> str:
    """Due fasci di curve bianche che si incrociano (looper delle presentazioni PoliNetwork)."""
    n = 26
    d = []
    for i in range(n):
        t = i / (n - 1)
        d.append(f'<path d="M{560 + 420 * t:.1f},-40 C{640 + 260 * t:.1f},{320 + 60 * t:.1f} {980 + 220 * t:.1f},{660 - 80 * t:.1f} 1680,{520 + 300 * t:.1f}"/>')
    for i in range(n):
        t = i / (n - 1)
        d.append(f'<path d="M1680,{-20 + 300 * t:.1f} C{1220 - 220 * t:.1f},{220 + 140 * t:.1f} {840 + 160 * t:.1f},{560 + 90 * t:.1f} {620 + 560 * t:.1f},960"/>')
    return "".join(d)


def vars_css() -> str:
    sh = ASSETS / "shapes"
    uri = {n: b64(sh / f"{n}.svg", "image/svg+xml") for n in ("looper", "big-blue", "big-teal", "small-blue")}
    # sfondo statico per stampa/panoramica: stessa composizione di .bg nel palco 1600×900
    wire = svg_uri(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">'
        f'<g fill="none" stroke="#fff" stroke-width="1.4" opacity=".55">{wire_paths()}</g></svg>'
    )
    bg_print = (
        f'url("{wire}") 0 0 / 1600px 900px no-repeat, '
        f'url("{uri["looper"]}") -416px -640px / 1664px auto no-repeat, '
        f'url("{uri["looper"]}") 640px 64px / 1440px auto no-repeat, '
        f'url("{uri["big-blue"]}") 800px -576px / 1280px 1280px no-repeat, '
        f'url("{uri["big-teal"]}") -352px 224px / 1184px 1184px no-repeat, '
        f'url("{uri["small-blue"]}") 1088px 480px / 576px 576px no-repeat, '
        "var(--bg)"
    )
    return (
        ":root{"
        f'--logo:url("{b64(ASSETS / "logo.svg", "image/svg+xml")}");'
        f'--arrow:url("{svg_uri(ARROW)}");'
        + "".join(f'--shape-{n}:url("{u}");' for n, u in uri.items())
        + f"--bg-print:{bg_print};"
        "}"
    )


def icon_symbols(names: list[str]) -> str:
    out = []
    for name in names:
        f = ASSETS / "icons" / f"{name}.svg"
        svg = re.sub(r"<!--.*?-->", "", f.read_text(), flags=re.S)
        vb = re.search(r'viewBox="([^"]+)"', svg).group(1)
        inner = re.search(r"<svg[^>]*>(.*)</svg>", svg, re.S).group(1)
        inner = re.sub(r"<title>.*?</title>", "", inner, flags=re.S).strip()
        if name.startswith("brand-"):
            attrs = 'fill="currentColor" stroke="none"'
        else:
            attrs = 'fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"'
        out.append(f'<symbol id="i-{name}" viewBox="{vb}" {attrs}>{inner}</symbol>')
    return "".join(out)


SRC_TAG = re.compile(r'<script type="application/x-polinetwork-source">(.*?)</script>', re.S)
SRC_ATTR = re.compile(r'\bsrc="([^"]+)"')


def extract(built: Path, out_dir: Path | None) -> int:
    """Ricava il sorgente .slides.html (e le immagini incorporate) da un HTML compilato."""
    doc = built.read_text(encoding="utf-8")
    m = SRC_TAG.search(doc)
    if not m:
        print("ERRORE: il file non contiene il sorgente (non è stato creato da build.py?)", file=sys.stderr)
        return 1
    source = base64.b64decode(m.group(1)).decode("utf-8")
    out_dir = (out_dir or built.parent).resolve()
    out_dir.mkdir(parents=True, exist_ok=True)
    target = out_dir / (re.sub(r"\.html?$", "", built.name) + ".slides.html")
    if target.exists():
        print(f"ERRORE: {target} esiste già", file=sys.stderr)
        return 1
    target.write_text(source, encoding="utf-8")
    # le immagini sono state sostituite una a una, nello stesso ordine
    main_html = doc[doc.find('<main class="stage"'):doc.find("</main>")]
    body = META.sub("", source, count=1)
    written = 0
    for rel, uri in zip(SRC_ATTR.findall(body), SRC_ATTR.findall(main_html)):
        if not uri.startswith("data:") or re.match(r"^(data:|https?:|//|#)", rel):
            continue
        dest = (out_dir / html.unescape(rel)).resolve()
        if out_dir not in dest.parents or dest.exists():
            continue
        dest.parent.mkdir(parents=True, exist_ok=True)
        dest.write_bytes(base64.b64decode(uri.split(",", 1)[1]))
        written += 1
    print(f"OK {target}  ({written} immagini estratte)")
    return 0


def available_icons() -> list[str]:
    return sorted(p.stem for p in (ASSETS / "icons").glob("*.svg"))


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("source", type=Path)
    ap.add_argument("-o", "--out", type=Path)
    ap.add_argument("--no-embed-images", action="store_true", help="lascia le immagini come link relativi")
    ap.add_argument("--list-icons", action="store_true", help="elenca le icone disponibili ed esce")
    ap.add_argument("--extract", action="store_true", help="ricava il sorgente da un HTML compilato")
    if "--list-icons" in sys.argv:
        print("\n".join(available_icons()))
        return 0
    args = ap.parse_args()
    if args.extract:
        return extract(args.source.resolve(), args.out)

    src: Path = args.source.resolve()
    text = src.read_text(encoding="utf-8")
    original = text
    meta: dict[str, str] = {}
    m = META.match(text)
    if m:
        for line in m.group(1).splitlines():
            if ":" in line:
                k, v = line.split(":", 1)
                meta[k.strip().lower()] = v.strip()
        text = text[m.end():]
    title = meta.get("title", "PoliNetwork")
    lang = meta.get("lang", "it")

    warnings: list[str] = []
    errors: list[str] = []

    # icone: <i data-icon="nome"></i> → <svg><use/></svg>
    known = set(available_icons())
    used: list[str] = ["camera"]

    def repl_icon(mo: re.Match) -> str:
        name = mo.group(2)
        if name not in known:
            hint = difflib.get_close_matches(name, known, n=3)
            errors.append(f'icona sconosciuta "{name}"' + (f" (forse: {', '.join(hint)})" if hint else ""))
            return mo.group(0)
        if name not in used:
            used.append(name)
        cls = re.search(r'class="([^"]*)"', mo.group(1) + mo.group(3))
        extra = f" {cls.group(1)}" if cls else ""
        return f'<svg class="ico{extra}" aria-hidden="true"><use href="#i-{name}"/></svg>'

    text = ICON_TAG.sub(repl_icon, text)

    # immagini locali → data URI
    missing: list[str] = []

    def repl_src(mo: re.Match) -> str:
        attr, val = mo.group(1), mo.group(2)
        if re.match(r"^(data:|https?:|//|#)", val):
            return mo.group(0)
        p = (src.parent / html.unescape(val)).resolve()
        if not p.is_file():
            missing.append(val)
            return mo.group(0)
        if args.no_embed_images:
            return mo.group(0)
        size = p.stat().st_size
        if size > 1_500_000:
            warnings.append(f"immagine pesante ({size // 1024} KB): {val} — meglio ridimensionarla")
        return f'{attr}="{b64(p)}"'

    text = re.sub(r'\b(src)="([^"]+)"', repl_src, text)
    for v in missing:
        warnings.append(f"immagine non trovata (resta un segnaposto): {v}")

    n_slides = len(re.findall(r'<section\b[^>]*class="[^"]*\bslide\b', text))
    if n_slides == 0:
        errors.append('nessuna <section class="slide"> trovata')
    n_todo = len(re.findall(r'class="todo"', text))
    if n_todo:
        warnings.append(f"{n_todo} segnaposto .todo ancora da completare")

    if errors:
        for e in errors:
            print("ERRORE:", e, file=sys.stderr)
        return 1

    css = (ASSETS / "theme.css").read_text(encoding="utf-8")
    js = (ASSETS / "deck.js").read_text(encoding="utf-8")
    doc = f"""<!doctype html>
<html lang="{html.escape(lang)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="generator" content="polinetwork-slides">
<title>{html.escape(title)}</title>
<link rel="icon" href="{b64(ASSETS / 'logo.png', 'image/png')}">
<style>
{font_css()}
{vars_css()}
{css}
</style>
</head>
<body>
<div class="bg" aria-hidden="true"><div class="shape s-looper"><i></i></div><div class="shape s-looper2"><i></i></div><div class="shape s-teal"><i></i></div><div class="shape s-blue"><i></i></div><div class="shape s-small"><i></i></div><svg class="wire" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice"><g>{wire_paths()}</g></svg></div>
<main class="stage" id="stage">
{text.strip()}
</main>
<svg width="0" height="0" style="position:absolute" aria-hidden="true">{icon_symbols(used)}</svg>
<script type="application/x-polinetwork-source">{base64.b64encode(original.encode()).decode()}</script>
<script>
{js}
</script>
</body>
</html>
"""
    out: Path = args.out.resolve() if args.out else src.with_name(re.sub(r"(\.slides)?\.html?$", "", src.name) + ".html")
    if out == src:
        print("ERRORE: l'output sovrascriverebbe il sorgente; usa -o", file=sys.stderr)
        return 1
    out.write_text(doc, encoding="utf-8")
    for w in warnings:
        print("ATTENZIONE:", w)
    print(f"OK {out}  ({n_slides} slide, {len(doc.encode()) // 1024} KB, icone: {len(used)})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
