# PoliNetwork Slides

Skill per agenti AI (Claude Code e Codex) che crea le presentazioni delle assemblee
PoliNetwork: un unico file HTML animato, con il tema del sito, che funziona offline e si
esporta in PDF.

I contenuti li decide sempre chi usa la skill: i template sono scalette con soli segnaposto e
l'agente non aggiunge fatti, numeri o nomi che l'utente non ha dato.

All'avvio l'agente chiede:
- **parlata o autoesplicativa:** se qualcuno la presenta o se si manda da leggere senza nessuno
  che presenta (l'autoesplicativa si può anche ricavare da una parlata già fatta). Quante slide
  servono lo decidono i contenuti, non c'è una versione breve e una lunga;
- **quanto densa:** essenziale (parole chiave, una cosa per slide) o dettagliata (più contesto);
- **con o senza sticker meme**, in tutte e due le versioni;
- **la lingua:** italiano o inglese;
- **i contenuti:** argomenti, numeri, persone, date.

Poi propone la scaletta, aspetta la conferma, compone le slide con i componenti del tema,
compila il file e lo controlla con gli screenshot.

## Installazione e uso

Le istruzioni passo passo per Claude (sito e app), Claude Code e Codex sono in
**[GUIDA.md](GUIDA.md)**. In breve:

| Strumento | Installazione | Richiamarla |
|---|---|---|
| claude.ai / app Claude | carica `polinetwork-slides.zip` in Customize → Skills | chiedi la presentazione |
| Claude Code | `npx skills add PoliNetworkOrg/skills --skill polinetwork-slides -a claude-code -g`, oppure `ln -s <repo>/skills/polinetwork-slides ~/.claude/skills/polinetwork-slides` | `/polinetwork-slides` o chiedi |
| Codex | `$skill-installer` con il link a questa cartella, oppure `npx skills add … -a codex -g` | `$polinetwork-slides` o chiedi |

Requisiti: **Python 3.10+**. **Chrome o Chromium** serve per il controllo automatico del layout,
che è facoltativo.

### Senza agente

Dalla cartella della skill (`skills/polinetwork-slides/`):

```bash
cp templates/parlata.slides.html ~/assemblea.slides.html # sostituisci i segnaposto
python3 scripts/build.py ~/assemblea.slides.html          # → ~/assemblea.html
python3 scripts/check.py ~/assemblea.html --shots ~/shots # controllo + screenshot
```

Il markup di ogni componente è in [references/components.md](references/components.md).

## Struttura

```
SKILL.md                  istruzioni per l'agente (procedura, regole)
templates/                parlata, autoesplicativa (.slides.html, basi con soli segnaposto)
assets/memes/             sticker meme pronti (gatti scontornati)
references/memes.md       catalogo dei meme: espressione e lati tagliati di ognuno
references/components.md  catalogo dei layout con markup e limiti
references/brand.md       tono, dati fissi, testi standard IT/EN
assets/theme.css          tema: token del sito, glass, layout, animazioni, stampa
assets/deck.js            motore: navigazione, animazioni, panoramica, presentatore, ?check
assets/fonts/             DM Sans, Poppins, Red Hat Text (woff2, latin + latin-ext)
assets/icons/             icone Lucide (+ alcune Simple Icons) incluse nel file finale
assets/shapes/, logo.*    forme di sfondo e logo, presi dai repo web e polinet.cc;
                          print-*.jpg sono gli sfondi già pronti per la stampa
scripts/build.py          compila il sorgente in un HTML autonomo (solo libreria standard)
scripts/check.py          controllo del layout, screenshot e PDF (--pdf) con Chrome headless
scripts/render_print_bg.py  rigenera assets/shapes/print-*.jpg (solo manutenzione)
scripts/package.py        crea lo ZIP da caricare su claude.ai (in dist/ nella radice della repo)
GUIDA.md                  guida all'installazione e all'uso per i membri
```

## Manutenzione

- **Colori e font** vengono da `web/src/styles/figma.css` e `typography.css`. Se il sito
  cambia, aggiorna le variabili in cima ad `assets/theme.css`.
- **Nuova icona:** copia l'SVG da [lucide.dev](https://lucide.dev) in `assets/icons/`
  e aggiungila alla tabella in `components.md`.
- **Nuovo componente:**
  1. aggiungi il CSS in `theme.css`;
  2. se serve, aggiungi il suo selettore all'elenco `ANIM` in `deck.js`, per farlo animare;
  3. se è di vetro (`backdrop-filter`), aggiungilo alle regole di stampa in fondo a `theme.css`:
     Chrome non stampa `backdrop-filter`, quindi lì va spento e la faccia va messa sopra
     `var(--bg-frost)` (lo sfondo già sfocato), come per `.next`. Niente testo in gradiente con
     `background-clip: text` senza una tinta piena per la stampa: Evince lo mostra come un
     rettangolo pieno;
  4. se si anima, il PDF deve mostrare lo stato finale anche se si stampa a metà animazione.
     In stampa `theme.css` spegne tutte le animazioni CSS e `deck.js` mette prima la pagina in
     modalità statica (Firefox fotograferebbe le animazioni a metà), quindi lo stile di base (senza
     `.slide.active`) dev'essere quello finale, non quello di partenza. Quello che anima
     `deck.js` (testi, `style` in linea) va portato al valore finale in `settleForPrint()` o
     annullato nelle regole di stampa, come i numeri che contano e il treno delle persone;
  5. niente `translate`/`transform` per centrare un elemento assoluto (`top: 50%; translate: 0
     -50%`): in stampa Chrome spezza la pagina dove l'elemento sta prima dello spostamento, e la
     parte sotto finisce staccata. Centra con `top: 0; bottom: 0; height: fit-content; margin-block:
     auto`, come `.cover > .window`;
  6. se dipende dalla posizione di altri elementi (le frecce di `.map`, la strada di `.road`),
     `deck.js` lo disegna con `offsetLeft`/`offsetTop` (non `getBoundingClientRect`, che cambia
     con la scala del palco e con le animazioni in corso) a font caricati e a ogni `go()`;
  7. documentalo in `components.md`, con markup e limiti;
  8. provalo nelle due versioni (parlata e `mode: lettura`) con `check.py --shots shots/ --pdf
     shots/prova.pdf`. In lettura la regola generica del testo (`html.read :is(p, li, …)`) vale per
     tutti i paragrafi: il componente che ha una misura sua la scrive con un selettore più
     specifico (`.quote > p.who`), oppure si aggiunge a quelli esclusi lì (`.statement`, `.lead`,
     `.small`).
- **Sfondo di stampa:** se cambiano forme, colori del fondo, `--glass-blur` o la composizione
  (`PRINT_SHAPES` e `PRINT_LOOPERS` in `build.py`), rigenera gli sfondi raster con
  `python3 scripts/render_print_bg.py` (serve Chrome). Sono raster apposta: Chrome rasterizza
  gli SVG con i filtri a ogni pagina, e il PDF arrivava a 1 MB a slide.
- **Dati fissi** (codice fiscale, link): tienili aggiornati in `references/brand.md`.
- **Nuovo meme:** PNG scontornato in `assets/memes/`, nome in PascalCase che dice l'espressione
  e finisce in `Cat` (`SadThumbsUpCat.png`). Controlla che non ci sia già, anche ruotato o
  specchiato: se c'è, tieni il più recente col vecchio nome, così i deck che lo usano non si
  rompono. Poi aggiungi una riga in `references/memes.md`, con il taglio misurato come spiegato lì.
- **Dopo ogni modifica** rigenera lo ZIP con `python3 scripts/package.py` (finisce in `dist/`
  nella radice della repo) e ricaricalo su claude.ai. Chi usa Git aggiorna con `git pull`, chi usa
  `npx skills` con `npx skills update polinetwork-slides`.
- **Regressione dell'emblema di copertina:** `python3 scripts/test_orbit.py` verifica con
  Chrome/Chromium che gli anelli ruotino senza isolare la sfocatura dello sfondo e che
  la modalità statica fermi la rotazione.

## Licenze di terze parti

- Font: SIL Open Font License, vedi `assets/fonts/OFL-*.txt`.
- Icone Lucide: ISC.
- Simple Icons: CC0.

I testi delle licenze sono in `assets/icons/`.
