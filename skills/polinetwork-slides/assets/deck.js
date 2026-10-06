/*
  PoliNetwork Slides — motore
  ←/→ Spazio PagSu/PagGiù · Home/Fine · F schermo intero · O panoramica · P (anche Ctrl+P) presentatore
  S stampa / PDF
  URL: ?static (niente animazioni) · ?check (controllo layout) · #N (vai alla slide N)
*/
(() => {
  const root = document.documentElement;
  const params = new URLSearchParams(location.search);
  const STATIC = params.has("static") || params.has("check") || params.has("embed");
  const CHECK = params.has("check");
  const EMBED = params.has("embed");
  const PRESENTER = params.has("presenter");
  const READ = root.classList.contains("read");
  if (STATIC) root.classList.add("static");
  if (EMBED) root.classList.add("embed");

  const LANG = (root.lang || "it").slice(0, 2);
  const T = {
    it: { image: "Immagine", prev: "Indietro", next: "Avanti", full: "Schermo intero", grid: "Panoramica", print: "Stampa / PDF", now: "Ora", next2: "Dopo", notes: "Note", end: "Fine", nonotes: "Nessuna nota." },
    en: { image: "Image", prev: "Previous", next: "Next", full: "Full screen", grid: "Overview", print: "Print / PDF", now: "Now", next2: "Next", notes: "Notes", end: "End", nonotes: "No notes." },
  }[LANG] || {};

  const stage = document.getElementById("stage");
  // sezioni: danno il nome in alto a destra, la slide a cui porta ogni voce dell'indice e il
  // sottotitolo della voce. Una sezione la apre un divisore .section (e la voce porta lì) oppure,
  // senza divisori, la sua prima slide con data-section="Titolo" (e data-sub="frase").
  // Indice, divisori e nome in alto sono scelte di chi scrive: ognuna funziona anche senza le altre.
  const sections = [];
  {
    const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    let title = "";
    stage.querySelectorAll(":scope > .slide").forEach((s) => {
      if (s.classList.contains("section")) {
        title = (s.querySelector(":scope > h1")?.textContent || "").trim();
        sections.push({ sub: s.querySelector(":scope > .sub")?.innerHTML || "", start: s });
        return;
      }
      if (s.dataset.section) {
        title = s.dataset.section;
        sections.push({ sub: esc(s.dataset.sub || ""), start: s });
      }
      if (sections.length && !sections.at(-1).start) sections.at(-1).start = s;
      if (title && !s.dataset.crumb) s.dataset.crumb = title;
    });
  }
  const slides = [...stage.querySelectorAll(":scope > .slide")];
  const total = slides.length;
  const icon = (name) => `<svg class="ico" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  /* ---------- Presentatore: finestra separata ---------- */
  if (PRESENTER) return presenterView();

  /* ---------- Preparazione delle slide ---------- */
  const CENTERED = ["cover", "section", "thanks"];
  const ANIM = [
    ".slide > h1", ".slide > .kicker", ".slide > .sub", ".body > .lead", ".body > .statement", ".body > p", ".body > ul:not([class])",
    ".body > .glass", ".body > .small", ".body > h2", ".body > table", ".body > .bars", ".body > .cloud > h2",
    ".agenda > li", ".irows > li > *", ".cards > *", ".stats > *", ".teams > *", ".timeline > li", ".compare > *",
    ".team > *", ".split > *", ".budget > .glass", ".fivex > *", ".vote > *", ".gallery > figure", ".screens > figure", ".people > .person",
    ".links > li", ".cover .meta > span", ".cover .orbit", ".cover .brand", ".lockup", ".media > *", ".legend > li", "table.status tr",
    ".bars > .bar", ".body > .columns", ".cloud > span", ".thanks .qr", ".body > .summary", ".body > .next", ".body > dl", ".cols > *",
    "ol.points > li", "dl.terms > div", ".cover .intro",
  ].join(",");

  let sectionTitle = "";
  slides.forEach((s, idx) => {
    const centered = CENTERED.some((c) => s.classList.contains(c));
    if (s.classList.contains("section")) sectionTitle = (s.querySelector(":scope > h1")?.textContent || "").trim();
    // lettura: in alto a destra la sezione in cui si è
    const crumb = s.dataset.crumb === "off" ? "" : s.dataset.crumb || sectionTitle;
    if (!centered && crumb && root.dataset.crumb !== "off") s.insertAdjacentHTML("afterbegin", `<div class="crumb">${crumb.replace(/</g, "&lt;")}</div>`);
    // contenuto sotto il titolo in un .body centrato in verticale
    if (!centered && !s.querySelector(":scope > .body")) {
      const body = document.createElement("div");
      body.className = "body";
      const keep = (el) => el.matches("h1, .kicker, .sub, .notes, .sticker, .qr.corner, script");
      [...s.children].filter((el) => !keep(el)).forEach((el) => body.appendChild(el));
      // il .sub resta in alto solo se segue il titolo
      s.insertBefore(body, s.querySelector(":scope > .sticker, :scope > .notes"));
    }
    // titoli grandi: parola per parola
    if (centered) {
      s.querySelectorAll(":scope > h1, .lockup").forEach((h) => {
        if (h.querySelector(".w")) return;
        let w = 0;
        const walk = (node) => {
          [...node.childNodes].forEach((n) => {
            if (n.nodeType === 3) {
              const frag = document.createDocumentFragment();
              n.textContent.split(/(\s+)/).forEach((part) => {
                if (!part) return;
                if (/^\s+$/.test(part)) return frag.append(part);
                const span = document.createElement("span");
                span.className = "w";
                span.style.setProperty("--w", w++);
                span.textContent = part;
                frag.append(span);
              });
              n.replaceWith(frag);
            } else if (n.nodeType === 1 && !n.classList.contains("logo")) walk(n);
          });
        };
        walk(h);
      });
    }
    // emblema copertina
    if (s.classList.contains("cover") && !s.classList.contains("brand-only") && !s.querySelector(".orbit")) {
      s.insertAdjacentHTML("beforeend", '<div class="orbit" aria-hidden="true"><i class="ring r1"></i><i class="ring r2"></i><i class="ring r3"></i><span class="logo"></span></div>');
    }
    // footer e numero
    if (s.dataset.footer !== "off" && !s.classList.contains("cover")) {
      s.insertAdjacentHTML("beforeend", '<div class="slide-foot"><span class="logo"></span>PoliNetwork</div>');
      const num = String(idx + 1).padStart(2, "0") + (READ ? ` / ${String(total).padStart(2, "0")}` : "");
      if (!centered) s.insertAdjacentHTML("beforeend", `<div class="slide-num">${num}</div>`);
    }
    // animazioni d'ingresso a cascata; nelle righe con icona tessera e testo entrano insieme
    let k = 0;
    const rows = new Map();
    s.querySelectorAll(ANIM).forEach((el) => {
      if (el.closest(".notes") || el.classList.contains("w") || el.classList.contains("reveal")) return;
      if (!el.hasAttribute("data-anim")) el.setAttribute("data-anim", "");
      const row = el.matches(".irows > li > *") ? el.parentElement : null;
      if (row && !rows.has(row)) rows.set(row, k++);
      el.style.setProperty("--i", Math.min(row ? rows.get(row) : k++, 16));
    });
  });

  /* ---------- Componenti ---------- */
  // righe con icona: l'icona dentro una tessera di vetro
  document.querySelectorAll(".irows > li > svg.ico").forEach((svg) => {
    const tile = document.createElement("span");
    tile.className = "tile";
    // l'animazione passa alla tessera di vetro, che deve entrare insieme al testo
    for (const a of ["style", "data-anim"]) if (svg.hasAttribute(a)) (tile.setAttribute(a, svg.getAttribute(a)), svg.removeAttribute(a));
    svg.replaceWith(tile);
    tile.appendChild(svg);
  });
  // colonne esplicite
  document.querySelectorAll("[data-cols]").forEach((el) => el.style.setProperty("--cols", el.dataset.cols));
  // agenda: tessere fino a 9 voci (7-9: tessere compatte su tre colonne), poi righe su due colonne;
  // ogni voce porta alla sezione corrispondente e ne riprende il sottotitolo (voci in più, come "Domande", no)
  document.querySelectorAll(".agenda").forEach((el) => {
    const n = el.children.length;
    if (n > 9) {
      el.classList.add("long");
      el.style.setProperty("--rows", Math.ceil(n / 2));
    } else {
      if (n > 6) el.classList.add("dense");
      if (!el.dataset.cols) el.style.setProperty("--cols", n > 4 ? 3 : n);
      [...el.children].forEach((li, i) => li.insertAdjacentHTML("afterbegin", `<span class="num">${String(i + 1).padStart(2, "0")}</span>`));
    }
    [...el.children].forEach((li, i) => {
      if (!sections[i]) return;
      const { start, sub } = sections[i];
      if (start) li.setAttribute("data-goto", slides.indexOf(start));
      if (n <= 9 && sub && !li.querySelector("small")) li.insertAdjacentHTML("beforeend", `<small>${sub}</small>`);
    });
  });
  // numeri a contorno (divisori, indice): un SVG sopra il testo, così il contorno si può tracciare.
  // Il testo resta (trasparente) per l'impaginazione; la linea di base si misura con un elemento sonda.
  document.fonts.ready.then(() => {
    // <mark> diviso in parole: un solo gradiente su tutta l'evidenziazione (vedi theme.css)
    document.querySelectorAll("mark").forEach((m) => {
      const ws = [...m.querySelectorAll(".w")];
      if (!ws.length) return;
      const left = Math.min(...ws.map((w) => w.offsetLeft));
      const right = Math.max(...ws.map((w) => w.offsetLeft + w.offsetWidth));
      m.style.setProperty("--gw", `${right - left}px`);
      ws.forEach((w) => w.style.setProperty("--gx", `${w.offsetLeft - left}px`));
    });
    document.querySelectorAll(".slide.section > .n, .agenda > li > .num").forEach((el) => {
      if (el.querySelector("svg.draw")) return;
      const probe = document.createElement("i");
      probe.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline";
      el.append(probe);
      const base = probe.offsetTop;
      probe.remove();
      const NS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(NS, "svg");
      svg.setAttribute("class", "draw");
      svg.setAttribute("aria-hidden", "true");
      const text = document.createElementNS(NS, "text");
      text.setAttribute("x", "0");
      text.setAttribute("y", base);
      text.textContent = el.textContent.trim();
      svg.appendChild(text);
      el.appendChild(svg);
      el.classList.add("outlined");
    });
  });
  document.addEventListener("click", (e) => {
    const li = e.target.closest("[data-goto]");
    if (li && !root.classList.contains("overview")) go(+li.dataset.goto);
  });
  // barre: data-value
  // data-scale="max" sul contenitore: la barra più lunga riempie la riga, le altre in proporzione
  // (per confrontare voci tra loro, non per un avanzamento su 100) e il valore sta in fondo alla barra
  document.querySelectorAll(".bars").forEach((c) => {
    const bars = [...c.querySelectorAll(":scope > .bar")];
    const rel = c.dataset.scale === "max";
    const max = Math.max(...bars.map((b) => parseFloat(b.dataset.value || "0")), 1);
    bars.forEach((b) => {
      const v = parseFloat(b.dataset.value || "0");
      b.style.setProperty("--v", rel ? (v / max) * 100 : Math.max(0, Math.min(100, v)));
      if (!b.querySelector("i")) {
        const label = b.innerHTML;
        const em = `<em>${b.dataset.label || v + "%"}</em>`;
        b.innerHTML = rel ? `<span>${label}</span><i>${em}</i>` : `<span>${label}</span><i></i>${em}`;
      }
    });
  });
  // 5x1000: il codice fiscale in caselle, una per cifra (il testo copiato resta il codice intero)
  document.querySelectorAll(".fivex .code > b").forEach((b) => {
    const code = b.textContent.replace(/\s+/g, "");
    if (!/^\d{6,16}$/.test(code) || b.querySelector("span")) return;
    b.setAttribute("aria-label", code);
    b.innerHTML = [...code].map((d) => `<span>${d}</span>`).join("");
  });
  // colonne: altezze relative al valore più alto del grafico; data-from = parte "prima"
  document.querySelectorAll(".timeline").forEach((tl) => tl.style.setProperty("--n", tl.children.length));
  document.querySelectorAll(".columns").forEach((c) => {
    const cols = [...c.querySelectorAll(":scope > .col")];
    const num = (x) => parseFloat(x || "0");
    const max = Math.max(...cols.map((col) => num(col.dataset.value)), 1);
    const desc = [];
    cols.forEach((col, i) => {
      const v = num(col.dataset.value);
      col.style.setProperty("--h", v / max);
      col.style.setProperty("--i", i);
      if (col.dataset.from) col.style.setProperty("--b", Math.min(1, num(col.dataset.from) / (v || 1)));
      if (!col.querySelector("i")) {
        const name = col.innerHTML;
        // etichette accanto alla colonna: la cifra grande, il resto del testo piccolo sotto
        const side = (text, cls) => {
          if (!text) return "";
          const [, n, note] = text.trim().match(/^(\S+)\s*(.*)$/);
          return `<b${cls ? ` class="${cls}"` : ""}>${n}${note ? `<small>${note}</small>` : ""}</b>`;
        };
        const sides = side(col.dataset.delta) + side(col.dataset.from && col.dataset.fromLabel, "base");
        col.innerHTML = `<em>${col.dataset.label || v}</em><i></i><span>${name}</span>${sides}`;
      }
      desc.push(`${col.querySelector("span").textContent}: ${col.dataset.label || v}`);
    });
    c.setAttribute("role", "img");
    c.setAttribute("aria-label", desc.join(", "));
  });
  // crescita: --b = valore di partenza / valore di oggi
  document.querySelectorAll(".growth").forEach((g) => {
    const from = parseFloat(g.dataset.from || "0"), v = parseFloat(g.dataset.value || "0");
    if (v > 0) g.style.setProperty("--b", Math.min(1, Math.max(0, from / v)));
  });
  // nuvola: posti attorno al titolo, riempiti in modo bilanciato (max 16)
  const SLOTS = [
    [24, 32], [76, 66], [56, 10], [40, 90], [76, 32], [24, 66], [30, 12], [64, 88],
    [7, 49], [93, 49], [82, 11], [16, 88], [9, 22], [90, 86], [93, 22], [8, 76],
  ];
  document.querySelectorAll(".cloud").forEach((c) => {
    const items = [...c.querySelectorAll(":scope > span")];
    items.forEach((el, i) => {
      if (!el.style.getPropertyValue("--x")) {
        const [x, y] = SLOTS[i % SLOTS.length];
        const j = ((i * 37) % 7) - 3;
        el.style.setProperty("--x", `${x + j * 0.5}%`);
        el.style.setProperty("--y", `${y - j * 0.6}%`);
      }
      el.style.setProperty("--d", `${-(i * 0.7) % 6}s`);
      if (!el.querySelector(":scope > i")) el.innerHTML = `<i>${el.innerHTML}</i>`;
    });
  });
  // votazione: clic = +1, Maiusc+clic = −1
  document.querySelectorAll(".vote > button").forEach((btn) => {
    const out = btn.querySelector("b") || btn.appendChild(document.createElement("b"));
    if (!out.textContent.trim()) out.textContent = "0";
    btn.classList.add("glass");
    btn.addEventListener("click", (e) => {
      const v = Math.max(0, (parseInt(out.textContent, 10) || 0) + (e.shiftKey ? -1 : 1));
      out.textContent = v;
    });
  });
  // immagini mancanti → segnaposto con il nome del file
  const placeholder = (el, src, label) => {
    const ph = document.createElement("div");
    ph.className = `ph ${el.className}`.trim();
    ph.innerHTML = `${icon("camera")}<span>${label || T.image}</span><span>${src}</span>`;
    for (const a of ["style", "data-anim"]) if (el.hasAttribute(a)) ph.setAttribute(a, el.getAttribute(a));
    el.replaceWith(ph);
  };
  document.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    const fail = () => placeholder(img, src || "?", img.alt);
    if (!src) return fail();
    if (img.complete && img.naturalWidth === 0 && !src.startsWith("data:")) fail();
    else img.addEventListener("error", fail, { once: true });
  });
  // numeri che contano fino al valore
  const counters = [...document.querySelectorAll(".stats b, .num[data-count], .cloud b, .growth > p > b")].map((el) => {
    const m = el.textContent.match(/^(\D*)(\d[\d.,\s  ]*\d|\d)(.*)$/s);
    // decimali ("3,8/5", "4.5") restano fermi: niente conteggio
    if (!m || /^\d{1,3}[.,]\d{1,2}$/.test(m[2].trim())) return null;
    const sep = (m[2].match(/[.,\s  ]/) || [""])[0];
    const value = parseInt(m[2].replace(/\D/g, ""), 10);
    const fmt = (v) => String(v).replace(/\B(?=(\d{3})+(?!\d))/g, sep === "," && /,\d{1,2}$/.test(m[2]) ? "." : sep);
    return { el, pre: m[1], post: m[3], value, fmt, final: el.textContent };
  }).filter(Boolean);
  function runCounters(slide) {
    counters.forEach((c) => {
      if (!slide.contains(c.el)) return;
      if (STATIC || c.value < 4) return (c.el.textContent = c.final);
      const t0 = performance.now() + 250, dur = 1400;
      const tick = (t) => {
        const p = Math.min(1, Math.max(0, (t - t0) / dur));
        const e = 1 - Math.pow(1 - p, 3);
        c.el.textContent = p >= 1 ? c.final : c.pre + c.fmt(Math.round(c.value * e)) + c.post;
        if (p < 1 && slide.classList.contains("active")) requestAnimationFrame(tick);
        else c.el.textContent = c.final;
      };
      requestAnimationFrame(tick);
    });
  }

  /* ---------- Interfaccia ---------- */
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="progress" id="pn-progress"></div>
     <nav class="ui" aria-label="Navigazione">
       <button id="pn-prev" title="${T.prev}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg></button>
       <span class="counter" id="pn-counter"></span>
       <button id="pn-next" title="${T.next}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg></button>
       <button id="pn-grid" title="${T.grid} (O)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg></button>
       <button id="pn-print" title="${T.print} (S)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg></button>
       <button id="pn-fs" title="${T.full} (F)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3"/></svg></button>
     </nav>`,
  );
  if (EMBED) document.querySelector(".ui").hidden = true;

  /* ---------- Navigazione ---------- */
  let cur = 0;
  let presenterWin = null;
  const shapes = [...document.querySelectorAll(".bg .shape")];
  const wire = document.querySelector(".bg .wire");
  const revealsOf = (s) => [...s.querySelectorAll(".reveal")];

  function moveBg(i) {
    shapes.forEach((b, k) => {
      const x = Math.sin(i * 1.1 + k * 1.7) * 7;
      const y = Math.cos(i * 0.8 + k * 2.3) * 6;
      const r = Math.sin(i * 0.5 + k) * 10;
      b.style.transform = `translate(${x}vw, ${y}vh) rotate(${r}deg)`;
    });
    if (wire) wire.style.transform = `translate(${Math.sin(i * 0.6) * 2}%, ${Math.cos(i * 0.5) * 1.5}%) rotate(${Math.sin(i * 0.4) * 3}deg)`;
  }

  /* ---------- animazioni sulla slide: data-fx="…" (uno o più nomi separati da spazi) ----------
     Su tela (disegnate qui): fireworks, confetti (una volta, all'arrivo); network, code (dietro al
     contenuto, continue); likes, pizza (davanti, continue). Solo CSS (theme.css): float, pulse,
     flow, shine, wiggle. Spente in ?check/?static/anteprima, nel PDF e con "riduci movimento". */
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const FX_COLORS = ["#1156ae", "#0369a1", "#0284c7", "#38bdf8", "#ffffff"]; // blu del tema e bianco
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // centro in alto di un elemento della slide, in coordinate 1600×900
  function anchorOf(slide, sel, fallback) {
    const el = slide.querySelector(sel);
    if (!el) return fallback;
    const s = slide.getBoundingClientRect(), r = el.getBoundingClientRect(), k = 1600 / s.width;
    return [(r.left + r.width / 2 - s.left) * k, (r.top - s.top) * k];
  }
  const FX = {
    // cinque fuochi bianchi e blu, in alto e lontano dal titolo
    fireworks() {
      const bursts = [[1180, 230, 500], [760, 300, 1000], [1400, 360, 1450], [980, 170, 1900], [560, 260, 2400]];
      const sparks = [];
      let fired = 0;
      return (ctx, ms, k) => {
        bursts.forEach(([x, y, at], i) => {
          const p = (ms - at + 500) / 500; // razzo che sale nei 500 ms prima dell'esplosione
          if (i < fired || p < 0 || p >= 1) return;
          ctx.globalAlpha = 0.9;
          ctx.fillStyle = "#1156ae";
          ctx.fillRect(x - 1.5, 900 - (900 - y) * (1 - (1 - p) ** 2), 3, 18);
        });
        while (fired < bursts.length && ms >= bursts[fired][2]) {
          const [x, y] = bursts[fired++], main = FX_COLORS[fired % FX_COLORS.length];
          for (let i = 0; i < 90; i++) {
            const a = (i / 90) * Math.PI * 2 + rnd(0, 0.2), v = rnd(3, 7.5);
            sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, c: Math.random() < 0.7 ? main : pick(FX_COLORS) });
          }
        }
        for (const s of sparks) {
          s.vx *= 0.965 ** k;
          s.vy = s.vy * 0.965 ** k + 0.06 * k;
          s.x += s.vx * k;
          s.y += s.vy * k;
          s.life -= 0.011 * k;
          if (s.life <= 0) continue;
          ctx.globalAlpha = Math.min(1, s.life * 1.4);
          ctx.fillStyle = s.c;
          ctx.beginPath();
          ctx.arc(s.x, s.y, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        return fired < bursts.length || sparks.some((s) => s.life > 0);
      };
    },
    // coriandoli bianchi e blu che cadono dall'alto e girano
    confetti() {
      const bits = Array.from({ length: 150 }, () => ({
        x: rnd(0, 1600), y: rnd(-260, -20), vy: rnd(2.2, 4.2), sway: rnd(0, 6.28), sp: rnd(0.02, 0.05),
        rot: rnd(0, 6.28), vr: rnd(-0.12, 0.12), w: rnd(9, 15), h: rnd(14, 22), c: pick(FX_COLORS), at: rnd(0, 1300),
      }));
      return (ctx, ms, k) => {
        let alive = false;
        for (const b of bits) {
          if (ms < b.at || b.y > 940) continue;
          alive = true;
          b.sway += b.sp * k;
          b.y += b.vy * k;
          b.x += Math.sin(b.sway) * 1.4 * k;
          b.rot += b.vr * k;
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.rot);
          ctx.scale(1, Math.cos(b.sway * 2)); // il foglietto si gira mentre cade
          ctx.globalAlpha = 0.95;
          ctx.fillStyle = b.c;
          if (b.c === "#ffffff") (ctx.shadowColor = "rgb(17 86 174 / 0.35)"), (ctx.shadowBlur = 4);
          ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
          ctx.restore();
        }
        return alive || ms < 1400;
      };
    },
    // la rete: nodi che si spostano piano e si collegano quando sono vicini (dietro al contenuto)
    network() {
      const nodes = Array.from({ length: 38 }, () => ({
        x: rnd(0, 1600), y: rnd(0, 900), vx: rnd(-0.35, 0.35), vy: rnd(-0.25, 0.25), r: rnd(2.5, 5),
      }));
      const D = 230;
      return (ctx, ms, k) => {
        const fade = Math.min(1, ms / 1200);
        for (const n of nodes) {
          n.x += n.vx * k;
          n.y += n.vy * k;
          if (n.x < -20 || n.x > 1620) n.vx *= -1;
          if (n.y < -20 || n.y > 920) n.vy *= -1;
        }
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#1156ae";
        for (let i = 0; i < nodes.length; i++)
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > D) continue;
            ctx.globalAlpha = (1 - d / D) * 0.28 * fade;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        ctx.fillStyle = "#1156ae";
        for (const n of nodes) {
          ctx.globalAlpha = 0.45 * fade;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
        return true;
      };
    },
    // codice che scende piano, molto tenue (dietro al contenuto): per l'IT
    code() {
      const glyphs = "01{}<>/=;()[]".split("");
      const cols = Array.from({ length: 40 }, (_, i) => ({ x: 20 + i * 40, y: rnd(-900, 0), v: rnd(1.2, 3), acc: 0 }));
      return (ctx, ms, k) => {
        // sfuma quello che c'è già, così resta una scia
        ctx.globalCompositeOperation = "destination-out";
        ctx.globalAlpha = 0.05 * k;
        ctx.fillRect(0, 0, 1600, 900);
        ctx.globalCompositeOperation = "source-over";
        ctx.font = "600 26px ui-monospace, monospace";
        ctx.fillStyle = "#1156ae";
        for (const c of cols) {
          c.acc += c.v * k;
          if (c.acc < 26) continue;
          c.acc = 0;
          c.y += 26;
          if (c.y > 940) c.y = rnd(-300, 0);
          ctx.globalAlpha = 0.55 * Math.min(1, ms / 1200);
          ctx.fillText(pick(glyphs), c.x, c.y);
        }
        return true;
      };
    },
    // cuori che salgono dal telefono (o dall'immagine) della slide, come i like
    likes(slide) {
      const hearts = [];
      let next = 900;
      const heart = (ctx, s) => {
        ctx.beginPath();
        ctx.moveTo(0, s * 0.3);
        ctx.bezierCurveTo(0, 0, -s * 0.5, 0, -s * 0.5, s * 0.3);
        ctx.bezierCurveTo(-s * 0.5, s * 0.6, 0, s * 0.8, 0, s);
        ctx.bezierCurveTo(0, s * 0.8, s * 0.5, s * 0.6, s * 0.5, s * 0.3);
        ctx.bezierCurveTo(s * 0.5, 0, 0, 0, 0, s * 0.3);
        ctx.fill();
      };
      return (ctx, ms, k) => {
        if (ms > next) {
          next = ms + rnd(220, 480);
          const [x, y] = anchorOf(slide, ".phone, .media img, .media", [1300, 600]);
          hearts.push({ x: x + rnd(-150, 150), y: y + rnd(-40, 40), vy: rnd(1.4, 2.4), ph: rnd(0, 6.28), s: rnd(30, 52), life: 1, c: pick(["#1156ae", "#0284c7", "#38bdf8", "#ffffff"]) });
        }
        for (const h of hearts) {
          h.ph += 0.05 * k;
          h.y -= h.vy * k;
          h.x += Math.sin(h.ph) * 0.9 * k;
          h.life -= 0.006 * k;
          if (h.life <= 0) continue;
          ctx.save();
          ctx.translate(h.x, h.y);
          ctx.globalAlpha = Math.min(1, h.life * 1.6);
          ctx.fillStyle = h.c;
          ctx.shadowColor = "rgb(17 86 174 / 0.35)";
          ctx.shadowBlur = 8;
          heart(ctx, h.s);
          ctx.restore();
        }
        for (let i = hearts.length - 1; i >= 0; i--) if (hearts[i].life <= 0) hearts.splice(i, 1);
        return true;
      };
    },
    // spicchi di pizza che cadono (per la slide finale, se si va a mangiare)
    pizza() {
      const slices = [];
      let next = 300;
      const slice = (ctx, s) => {
        ctx.fillStyle = "#fbbf24"; // formaggio
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.lineTo(-s * 0.55, 0);
        ctx.lineTo(s * 0.55, 0);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#b45309"; // crosta
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.6, s * 0.13, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#dc2626"; // salame
        for (const [px, py] of [[-0.15, 0.28], [0.17, 0.33], [0, 0.6]]) {
          ctx.beginPath();
          ctx.arc(px * s, py * s, s * 0.09, 0, Math.PI * 2);
          ctx.fill();
        }
      };
      return (ctx, ms, k) => {
        if (ms > next) {
          next = ms + rnd(260, 560);
          slices.push({ x: rnd(40, 1560), y: -60, vy: rnd(2, 3.6), rot: rnd(0, 6.28), vr: rnd(-0.04, 0.04), s: rnd(38, 60) });
        }
        for (const p of slices) {
          p.y += p.vy * k;
          p.rot += p.vr * k;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.globalAlpha = 0.95;
          ctx.shadowColor = "rgb(15 23 42 / 0.25)";
          ctx.shadowBlur = 10;
          slice(ctx, p.s);
          ctx.restore();
        }
        for (let i = slices.length - 1; i >= 0; i--) if (slices[i].y > 980) slices.splice(i, 1);
        return true;
      };
    },
  };
  const FX_BACK = ["network", "code"]; // dietro al contenuto
  function runFx(slide) {
    slide.querySelectorAll(":scope > canvas.fx").forEach((c) => c.remove());
    if (STATIC || REDUCED || !slide.dataset.fx) return;
    slide.dataset.fx.split(/\s+/).filter((n) => FX[n]).forEach((name) => {
      const cv = document.createElement("canvas");
      cv.className = FX_BACK.includes(name) ? "fx back" : "fx";
      cv.width = 1600;
      cv.height = 900;
      if (FX_BACK.includes(name)) slide.prepend(cv);
      else slide.appendChild(cv);
      const ctx = cv.getContext("2d"), step = FX[name](slide), t0 = performance.now();
      let last = t0;
      const frame = (t) => {
        if (!slide.classList.contains("active") || !cv.isConnected) return cv.remove();
        const k = Math.min(3, (t - last) / 16.67); // movimento uguale a 60 e a 120 Hz
        last = t;
        if (name !== "code") ctx.clearRect(0, 0, 1600, 900);
        ctx.globalAlpha = 1;
        if (step(ctx, t - t0, k)) requestAnimationFrame(frame);
        else cv.remove();
      };
      requestAnimationFrame(frame);
    });
  }

  function go(i, fromEnd = false) {
    i = Math.max(0, Math.min(total - 1, i));
    const changed = i !== cur || !slides[i].classList.contains("active");
    cur = i;
    slides.forEach((s, k) => {
      s.classList.toggle("active", k === i);
      s.classList.toggle("before", k < i);
    });
    if (changed) {
      revealsOf(slides[i]).forEach((r) => r.classList.toggle("shown", fromEnd || STATIC));
      moveBg(i);
      runCounters(slides[i]);
      runFx(slides[i]);
    }
    document.getElementById("pn-counter").textContent = `${i + 1} / ${total}`;
    document.getElementById("pn-progress").style.width = `${((i + 1) / total) * 100}%`;
    if (!EMBED) history.replaceState(null, "", `${location.search}#${i + 1}`);
    sync();
  }
  function next() {
    const hidden = revealsOf(slides[cur]).find((r) => !r.classList.contains("shown"));
    if (hidden) {
      hidden.classList.add("shown");
      return sync();
    }
    go(cur + 1);
  }
  function prev() {
    const shown = revealsOf(slides[cur]).filter((r) => r.classList.contains("shown"));
    if (shown.length) {
      shown.at(-1).classList.remove("shown");
      return sync();
    }
    go(cur - 1, true);
  }
  function fit() {
    const sc = Math.min(innerWidth / 1600, innerHeight / 900);
    stage.style.transform = `translate(-50%, -50%) scale(${sc})`;
    if (root.classList.contains("overview")) layoutOverview();
  }
  function toggleFs() {
    document.fullscreenElement ? document.exitFullscreen() : root.requestFullscreen?.();
  }

  // panoramica
  function layoutOverview() {
    const cols = Math.ceil(Math.sqrt(total * 1.6));
    const rows = Math.ceil(total / cols);
    const gap = 40;
    const cellW = (1600 - gap * (cols + 1)) / cols;
    const sc = cellW / 1600;
    const cellH = 900 * sc;
    const gridH = rows * cellH + (rows - 1) * gap;
    const offY = Math.max(gap, (900 - gridH) / 2);
    slides.forEach((s, k) => {
      const c = k % cols, r = Math.floor(k / cols);
      const x = gap + c * (cellW + gap), y = offY + r * (cellH + gap);
      s.style.transformOrigin = "0 0";
      s.style.transform = `translate(${x}px, ${y}px) scale(${sc})`;
    });
  }
  function toggleOverview(force) {
    const on = force ?? !root.classList.contains("overview");
    root.classList.toggle("overview", on);
    if (on) layoutOverview();
    else slides.forEach((s) => (s.style.transform = s.style.transformOrigin = ""));
  }
  stage.addEventListener("click", (e) => {
    if (!root.classList.contains("overview")) return;
    const s = e.target.closest(".slide");
    if (!s) return;
    toggleOverview(false);
    go(slides.indexOf(s));
  });

  // presentatore
  function sync() {
    if (presenterWin && !presenterWin.closed) {
      const s = slides[cur];
      const rv = revealsOf(s);
      presenterWin.postMessage({ pn: "state", cur, total, shown: rv.filter((r) => r.classList.contains("shown")).length, notes: s.querySelector(".notes")?.innerHTML || "" }, "*");
    }
  }
  addEventListener("message", (e) => {
    const d = e.data;
    if (!d || !d.pn) return;
    if (d.pn === "next") next();
    else if (d.pn === "prev") prev();
    else if (d.pn === "go") go(d.cur);
    else if (d.pn === "hello") sync();
  });
  function openPresenter() {
    const url = location.href.split("#")[0].replace(/[?&](static|check)\b/g, "");
    presenterWin = open(url + (url.includes("?") ? "&" : "?") + "presenter", "pn-presenter", "width=1280,height=800");
  }

  addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea, [contenteditable]")) return;
    const k = e.key;
    if (["ArrowRight", "PageDown", " ", "Enter", "ArrowDown"].includes(k)) {
      e.preventDefault();
      next();
    } else if (["ArrowLeft", "PageUp", "Backspace", "ArrowUp"].includes(k)) {
      e.preventDefault();
      prev();
    } else if (k === "Home") go(0);
    else if (k === "End") go(total - 1);
    else if (k === "f" || k === "F") toggleFs();
    else if (k === "o" || k === "O") toggleOverview();
    else if (k === "Escape" && root.classList.contains("overview")) toggleOverview(false);
    else if (k === "p" || k === "P") {
      // anche Ctrl+P / ⌘P: apre il presentatore al posto della stampa del browser
      e.preventDefault();
      openPresenter();
    } else if ((k === "s" || k === "S") && !e.ctrlKey && !e.metaKey && !e.altKey) printDeck();
  });
  // stampa / PDF: tasto S o pulsante nella barra (Ctrl+P apre il presentatore)
  function printDeck() {
    if (root.classList.contains("overview")) toggleOverview(false);
    print();
  }
  document.getElementById("pn-prev").onclick = prev;
  document.getElementById("pn-next").onclick = next;
  document.getElementById("pn-fs").onclick = toggleFs;
  document.getElementById("pn-grid").onclick = () => toggleOverview();
  document.getElementById("pn-print").onclick = printDeck;
  let tx = null;
  addEventListener("touchstart", (e) => (tx = e.touches[0].clientX), { passive: true });
  addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx;
    tx = null;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  });
  let hideT;
  addEventListener("mousemove", () => {
    document.body.classList.add("show-ui");
    clearTimeout(hideT);
    hideT = setTimeout(() => document.body.classList.remove("show-ui"), 1800);
  });
  addEventListener("resize", fit);
  addEventListener("hashchange", () => {
    const n = parseInt(location.hash.slice(1), 10);
    if (Number.isFinite(n) && n - 1 !== cur) go(n - 1);
  });
  fit();
  const start = parseInt(location.hash.slice(1), 10);
  cur = -1;
  go(Number.isFinite(start) ? start - 1 : 0);
  if (CHECK) document.fonts.ready.then(() => setTimeout(runCheck, 300));

  /* ---------- ?check: testo fuori dai bordi, sovrapposizioni, font troppo piccoli ---------- */
  function runCheck() {
    const report = [];
    const MIN_FONT = 17;
    slides.forEach((s, idx) => {
      s.classList.add("active");
      const issues = [];
      const sr = s.getBoundingClientRect();
      const scale = sr.width / 1600;
      const px = (v) => Math.round(v / scale);
      const foot = s.querySelector(".slide-foot");
      const footTop = foot ? foot.getBoundingClientRect().top : sr.bottom;
      const els = [...s.querySelectorAll("*")].filter((el) => !el.closest(".notes, .slide-foot, .slide-num, .crumb, .orbit, .bg, svg") && !el.matches(".sticker, .w, br"));
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (!r.width && !r.height) continue;
        const name = describe(el);
        const decor = el.matches(".n, .stamp, .cloud > span, .cloud > span *") || el.closest(".section > .n");
        if (!decor && (r.left < sr.left - 1 || r.right > sr.right + 1 || r.top < sr.top - 1 || r.bottom > sr.bottom + 1)) {
          issues.push(`esce dalla slide: ${name} (${px(r.right - sr.right)}px a destra, ${px(r.bottom - sr.bottom)}px sotto)`);
          el.setAttribute("data-overflow", "");
        } else if (!decor && foot && el.closest(".body") && r.bottom > footTop + 2 && el.children.length === 0) {
          issues.push(`copre il footer: ${name}`);
          el.setAttribute("data-overflow", "");
        }
        const cs = getComputedStyle(el);
        if ((el.scrollHeight > el.clientHeight + 2 && /hidden|clip|auto/.test(cs.overflowY) && !el.matches(".bars > .bar > i, .ph")) || (el.scrollWidth > el.clientWidth + 2 && /hidden|clip|auto/.test(cs.overflowX) && !el.matches(".ph"))) {
          issues.push(`contenuto tagliato dentro: ${name}`);
          el.setAttribute("data-overflow", "");
        }
        const glass = el.parentElement?.closest(".glass, .cards > *, .stats > *, .teams > *, .timeline > li, .agenda > li, .irows > li > p");
        if (glass && el.children.length === 0) {
          const g = glass.getBoundingClientRect();
          if (r.right > g.right + 2 || r.bottom > g.bottom + 2) {
            issues.push(`testo fuori dalla card: ${name}`);
            el.setAttribute("data-overflow", "");
          } else if (cs.display !== "inline" && el.clientWidth > 0 && el.scrollWidth > el.clientWidth + 2) {
            // una parola che non va a capo (un dominio, un nome lungo) esce dal suo riquadro anche se il riquadro sta nella card
            issues.push(`testo più largo della card: ${name}`);
            el.setAttribute("data-overflow", "");
          }
        }
        const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (own && parseFloat(cs.fontSize) < MIN_FONT && !el.closest(".ph, .qr figcaption")) issues.push(`testo troppo piccolo (${cs.fontSize}): ${name}`);
      }
      // contenuto troppo alto: centrato in verticale, risale sopra titolo e sottotitolo.
      // Conta solo dove si sovrappone davvero al testo (un telefono alto a destra non copre il titolo a sinistra).
      const body = s.querySelector(":scope > .body");
      const headText = [...s.querySelectorAll(":scope > h1, :scope > .kicker, :scope > .sub")].map((h) => {
        const range = document.createRange();
        range.selectNodeContents(h);
        return range.getBoundingClientRect();
      });
      if (body && headText.length) {
        const boxes = [...body.querySelectorAll("*")].filter(
          (el) => !el.closest(".crumb") && (el.children.length === 0 || el.matches("img, .phone, .qr")) && !el.matches("br, .w") && !el.closest("svg")
        );
        let worst = 0;
        for (const el of boxes) {
          const r = el.getBoundingClientRect();
          if (!r.width || !r.height) continue;
          for (const h of headText) {
            const dx = Math.min(r.right, h.right) - Math.max(r.left, h.left);
            const dy = Math.min(r.bottom, h.bottom) - Math.max(r.top, h.top);
            if (dx > 2 && dy > 2) worst = Math.max(worst, dy);
          }
        }
        if (worst) issues.push(`il contenuto copre il titolo (${px(worst)}px): accorcia, dividi la slide o usa un componente più compatto`);
      }
      const ag = s.querySelector(".agenda");
      if (READ && ag && ag.children.length > sections.length) issues.push(`indice con ${ag.children.length} voci ma ${sections.length} sezioni: serve una slide con data-section per voce, altrimenti l'indice non è cliccabile`);
      if (!READ && s.querySelector(".body > p.small")) issues.push("riga piccola (p.small): da lontano non si legge, toglila e mettila nelle note");
      if (s.querySelector(".ph")) issues.push(`immagini mancanti: ${[...s.querySelectorAll(".ph span:last-child")].map((x) => x.textContent).join(", ")}`);
      const todos = [...s.querySelectorAll(".todo")].map((x) => x.textContent.trim());
      if (todos.length) issues.push(`dati da completare (.todo): ${todos.join(" · ")}`);
      s.classList.toggle("active", idx === cur);
      if (issues.length) report.push({ slide: idx + 1, title: (s.querySelector("h1")?.textContent || "").trim().slice(0, 60), issues: [...new Set(issues)] });
    });
    const json = JSON.stringify({ slides: total, ok: report.length === 0, report }, null, 1);
    const out = document.createElement("script");
    out.type = "application/json";
    out.id = "pn-check";
    out.textContent = json;
    document.body.appendChild(out);
    const box = document.createElement("pre");
    box.id = "pn-check-report";
    box.textContent = report.length ? json : `OK — ${total} slide, nessun problema`;
    document.body.appendChild(box);
    console.log("PN_CHECK " + json);
  }
  function describe(el) {
    const t = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
    const c = el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).join(".") : "";
    return `<${el.tagName.toLowerCase()}${c}>${t ? ` "${t}"` : ""}`;
  }

  /* ---------- Vista presentatore ---------- */
  function presenterView() {
    root.classList.add("presenter");
    const base = location.href.split("#")[0].replace(/[?&]presenter\b/, "");
    const emb = base + (base.includes("?") ? "&" : "?") + "embed";
    document.body.insertAdjacentHTML(
      "beforeend",
      `<div class="pv">
        <div class="pv-bar"><span id="pv-count">–</span><span class="pv-time" id="pv-time">00:00</span><span>← → · P</span></div>
        <div><h4>${T.now}</h4><iframe id="pv-cur" src="${emb}#1"></iframe></div>
        <div class="pv-next"><h4>${T.next2}</h4><iframe id="pv-next" src="${emb}#2"></iframe></div>
        <div class="pv-notes"><h4>${T.notes}</h4><div id="pv-notes"></div></div>
      </div>`,
    );
    const t0 = Date.now();
    setInterval(() => {
      const s = Math.floor((Date.now() - t0) / 1000);
      document.getElementById("pv-time").textContent = `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
    }, 1000);
    const send = (m) => opener && opener.postMessage({ pn: m }, "*");
    addEventListener("message", (e) => {
      const d = e.data;
      if (!d || d.pn !== "state") return;
      document.getElementById("pv-count").textContent = `${d.cur + 1} / ${d.total}`;
      document.getElementById("pv-notes").innerHTML = d.notes || `<p>${T.nonotes}</p>`;
      document.getElementById("pv-cur").src = `${emb}#${d.cur + 1}`;
      document.getElementById("pv-next").src = d.cur + 1 < d.total ? `${emb}#${d.cur + 2}` : "about:blank";
    });
    addEventListener("keydown", (e) => {
      if (["ArrowRight", "PageDown", " ", "Enter", "ArrowDown"].includes(e.key)) (e.preventDefault(), send("next"));
      else if (["ArrowLeft", "PageUp", "Backspace", "ArrowUp"].includes(e.key)) (e.preventDefault(), send("prev"));
    });
    send("hello");
  }
})();
