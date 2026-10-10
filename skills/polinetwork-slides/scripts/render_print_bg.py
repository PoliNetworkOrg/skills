#!/usr/bin/env python3
"""Rigenera gli sfondi raster della stampa: assets/shapes/print-bg.jpg e print-frost.jpg.

Uso (solo per chi mantiene la skill, dopo aver cambiato forme, colori o composizione):
    python3 scripts/render_print_bg.py

- print-bg.jpg: colore di fondo e forme sfocate di PRINT_SHAPES (build.py), sotto curve e fili
  vettoriali di --bg-print.
- print-frost.jpg: tutto lo sfondo di stampa (forme, curve, fili) sfocato e saturato come
  --glass-blur. In stampa sta sotto i riquadri di vetro, al posto di backdrop-filter che Chrome
  non stampa.

Serve Chrome/Chromium (come check.py): disegna gli SVG su una tela e la salva in JPEG.
"""

from __future__ import annotations

import base64
import re
import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import build  # noqa: E402
import check  # noqa: E402

SHAPES = build.ASSETS / "shapes"
QUALITY = 0.92  # sfumature morbide: sotto ~0.9 si vedono le fasce


def theme_var(name: str) -> str:
    m = re.search(rf"--{name}:\s*([^;]+);", (build.ASSETS / "theme.css").read_text(encoding="utf-8"))
    return m.group(1).split("/*")[0].strip()


def glass_blur() -> tuple[str, str]:
    """(raggio, saturazione) di --glass-blur, per esempio ("24", "1.6") da blur(24px) saturate(160%)."""
    v = theme_var("glass-blur")
    return re.search(r"blur\((\d+(?:\.\d+)?)px\)", v).group(1), str(int(re.search(r"saturate\((\d+)%\)", v).group(1)) / 100)


def layers(items: list[tuple[str, int, int, int]]) -> str:
    out = []
    for name, x, y, w in items:
        svg = (SHAPES / f"{name}.svg").read_text(encoding="utf-8")
        vw, vh = map(float, re.search(r'viewBox="0 0 ([\d.]+) ([\d.]+)"', svg).groups())
        out.append(f'<image href="{build.b64(SHAPES / f"{name}.svg", "image/svg+xml")}" x="{x}" y="{y}" width="{w}" height="{w * vh / vw:.1f}" preserveAspectRatio="none"/>')
    return "".join(out)


def compositions() -> dict[str, str]:
    bg = f'<rect x="-400" y="-400" width="2400" height="1700" fill="{theme_var("bg")}"/>'
    head = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">'
    radius, sat = glass_blur()
    wire = f'<g fill="none" stroke="#fff" stroke-width="1.4" opacity=".55">{build.wire_paths()}</g>'
    return {
        "print-bg.jpg": f"{head}{bg}{layers(build.PRINT_SHAPES)}</svg>",
        # edgeMode duplicate + filtro più grande della pagina: niente bordi chiari ai lati
        "print-frost.jpg": (
            f'{head}<defs><filter id="f" x="-400" y="-400" width="2400" height="1700" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">'
            f'<feGaussianBlur stdDeviation="{radius}" edgeMode="duplicate"/><feColorMatrix type="saturate" values="{sat}"/></filter></defs>'
            f'<g filter="url(#f)">{bg}{layers(build.PRINT_SHAPES)}{layers(build.PRINT_LOOPERS)}{wire}</g></svg>'
        ),
    }


PAGE = """<!doctype html><canvas id="c" width="1600" height="900"></canvas><pre id="out"></pre><script>
const img = new Image();
img.onload = () => {
  const c = document.getElementById("c");
  c.getContext("2d").drawImage(img, 0, 0, 1600, 900);
  document.getElementById("out").textContent = c.toDataURL("image/jpeg", %s);
};
img.src = "%s";
</script>"""


def main() -> int:
    chrome = check.find_chrome()
    if not chrome:
        print("Chrome/Chromium non trovato: imposta CHROME=/percorso/del/browser", file=sys.stderr)
        return 2
    with tempfile.TemporaryDirectory() as tmp:
        for name, svg in compositions().items():
            page = Path(tmp) / "render.html"
            page.write_text(PAGE % (QUALITY, build.svg_uri(svg)), encoding="utf-8")
            res = check.run(chrome, ["--window-size=1600,900", "--virtual-time-budget=10000", "--dump-dom", page.as_uri()], timeout=120)
            m = re.search(r'<pre id="out">data:image/jpeg;base64,([^<]+)</pre>', res.stdout)
            if not m:
                print(f"ERRORE: {name} non generato.", res.stderr[-800:], file=sys.stderr)
                return 1
            data = base64.b64decode(m.group(1))
            (SHAPES / name).write_bytes(data)
            print(f"OK {SHAPES / name}  ({len(data) // 1024} KB)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
