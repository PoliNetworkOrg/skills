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
references/components.md  catalogo dei layout con markup e limiti
references/brand.md       tono, dati fissi, testi standard IT/EN
assets/theme.css          tema: token del sito, glass, layout, animazioni, stampa
assets/deck.js            motore: navigazione, animazioni, panoramica, presentatore, ?check
assets/fonts/             DM Sans, Poppins, Red Hat Text (woff2, latin + latin-ext)
assets/icons/             icone Lucide (+ alcune Simple Icons) incluse nel file finale
assets/shapes/, logo.*    forme di sfondo e logo, presi dai repo web e polinet.cc
scripts/build.py          compila il sorgente in un HTML autonomo (solo libreria standard)
scripts/check.py          controllo del layout e screenshot con Chrome headless
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
  3. documentalo in `components.md`, con markup e limiti;
  4. provalo nel template parlato con `check.py`.
- **Dati fissi** (codice fiscale, link): tienili aggiornati in `references/brand.md`.
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
