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
    ".agenda > li", ".irows > li", ".cards > *", ".stats > *", ".teams > *", ".timeline > li", ".compare > *",
    ".team > *", ".split > *", ".budget > .glass", ".fivex > *", ".vote > *", ".gallery > figure", ".people > .person",
    ".links > li", ".cover .meta", ".cover .orbit", ".cover .brand", ".lockup", ".media > *", ".legend > li", "table.status tr",
    ".bars > .bar", ".cloud > span", ".thanks .qr", ".body > .summary", ".body > .next", ".body > dl", ".cols > *",
    "ol.points > li", "dl.terms > div", ".cover .intro",
  ].join(",");

  let sectionTitle = "";
  slides.forEach((s, idx) => {
    const centered = CENTERED.some((c) => s.classList.contains(c));
    if (s.classList.contains("section")) sectionTitle = (s.querySelector(":scope > h1")?.textContent || "").trim();
    // lettura: in alto a destra la sezione in cui si è
    const crumb = s.dataset.crumb === "off" ? "" : s.dataset.crumb || sectionTitle;
    if (READ && !centered && crumb) s.insertAdjacentHTML("afterbegin", `<div class="crumb">${crumb.replace(/</g, "&lt;")}</div>`);
    // contenuto sotto il titolo in un .body centrato in verticale
    if (!centered && !s.querySelector(":scope > .body")) {
      const body = document.createElement("div");
      body.className = "body";
      const keep = (el) => el.matches("h1, .kicker, .sub, .notes, .sticker, script");
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
    // animazioni d'ingresso a cascata
    let k = 0;
    s.querySelectorAll(ANIM).forEach((el) => {
      if (el.closest(".notes") || el.classList.contains("w") || el.classList.contains("reveal")) return;
      if (!el.hasAttribute("data-anim")) el.setAttribute("data-anim", "");
      el.style.setProperty("--i", Math.min(k++, 16));
    });
  });

  /* ---------- Componenti ---------- */
  // righe con icona: l'icona dentro una tessera di vetro
  document.querySelectorAll(".irows > li > svg.ico").forEach((svg) => {
    const tile = document.createElement("span");
    tile.className = "tile";
    svg.replaceWith(tile);
    tile.appendChild(svg);
  });
  // colonne esplicite
  document.querySelectorAll("[data-cols]").forEach((el) => el.style.setProperty("--cols", el.dataset.cols));
  // agenda: righe per colonna; in lettura ogni voce porta alla sezione corrispondente
  const sections = slides.filter((s) => s.classList.contains("section"));
  document.querySelectorAll(".agenda").forEach((el) => {
    const n = el.children.length;
    el.style.setProperty("--rows", n > 6 ? Math.ceil(n / 2) : n);
    if (READ && sections.length >= n) [...el.children].forEach((li, i) => li.setAttribute("data-goto", slides.indexOf(sections[i])));
  });
  document.addEventListener("click", (e) => {
    const li = e.target.closest("[data-goto]");
    if (li && !root.classList.contains("overview")) go(+li.dataset.goto);
  });
  // barre: data-value
  document.querySelectorAll(".bars > .bar").forEach((b) => {
    const v = parseFloat(b.dataset.value || "0");
    b.style.setProperty("--v", Math.max(0, Math.min(100, v)));
    if (!b.querySelector("i")) {
      const label = b.innerHTML;
      b.innerHTML = `<span>${label}</span><i></i><em>${b.dataset.label || v + "%"}</em>`;
    }
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
  const counters = [...document.querySelectorAll(".stats b, .num[data-count], .cloud b")].map((el) => {
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
          }
        }
        const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        if (own && parseFloat(cs.fontSize) < MIN_FONT && !el.closest(".ph, .qr figcaption")) issues.push(`testo troppo piccolo (${cs.fontSize}): ${name}`);
      }
      if (READ && s.querySelector(".sticker")) issues.push("sticker nella versione da leggere: toglilo");
      const ag = s.querySelector(".agenda");
      if (READ && ag && ag.children.length > sections.length) issues.push(`indice con ${ag.children.length} voci ma ${sections.length} divisori: serve un divisore (.section) per voce, altrimenti l'indice non è cliccabile`);
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
