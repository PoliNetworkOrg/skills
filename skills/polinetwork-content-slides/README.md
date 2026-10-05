# PoliNetwork Content Slides

Skill per agenti AI (Claude, Claude Code e Codex) che prepara i **contenuti** di una
presentazione PoliNetwork: parte da un ordine del giorno, da appunti o da una bozza e consegna un
file `.md` pronto da passare a [`polinetwork-slides`](../polinetwork-slides/), che ne fa le slide.

Le due skill si dividono il lavoro:

| | `polinetwork-content-slides` | `polinetwork-slides` |
|---|---|---|
| Decide | **cosa** dire: argomenti, ordine, numeri, cosa mostrare al pubblico | **come** mostrarlo: slide, componenti, immagini, animazioni |
| Produce | `nome-contenuti.md` | `nome.html` (+ il sorgente `nome.slides.html`) |

All'avvio l'agente chiede, in un solo messaggio, solo quello che non sa già:
- **a voce o da leggere**, **quanto densa** (essenziale o completa), **lingua**, **occasione**,
  data e luogo: finiscono nel frontmatter del file, così `polinetwork-slides` non li richiede;
- **chi la vedrà** e **cosa deve ottenere**: decidono cosa si può mostrare e cosa va protetto
  (conteggi delicati, trattative, dati economici).

Poi propone buchi, riordini e accorpamenti nell'ordine del giorno, fa le domande che sbloccano i
contenuti (raggruppate per area, numerate) e scrive il file. In chat segnala solo cosa resta da
verificare e le note formali, che nel file non vanno.

## Installazione e uso

Le istruzioni passo passo per Claude (sito e app), Claude Code e Codex sono in
**[GUIDA.md](GUIDA.md)**. In breve:

| Strumento | Installazione | Richiamarla |
|---|---|---|
| claude.ai / app Claude | carica `polinetwork-content-slides.zip` in Customize → Skills | chiedi di preparare i contenuti |
| Claude Code | `npx skills add PoliNetworkOrg/skills --skill polinetwork-content-slides -a claude-code -g`, oppure `ln -s <repo>/skills/polinetwork-content-slides ~/.claude/skills/polinetwork-content-slides` | `/polinetwork-content-slides` o chiedi |
| Codex | `$skill-installer` con il link a questa cartella, oppure `npx skills add … -a codex -g` | `$polinetwork-content-slides` o chiedi |

Conviene installare anche `polinetwork-slides`: le due skill sono pensate per lavorare insieme.
La skill non richiede programmi; Python 3.10+ serve solo a chi crea lo ZIP.

Il flusso tipico:

1. chiedi i contenuti allegando ODG, appunti o bozza, per esempio "Prepariamo i contenuti per
   l'assemblea dei soci del 15 novembre, l'ODG è in odg.md";
2. rispondi alle domande e controlla il file `.md` che ricevi;
3. passa il file a `polinetwork-slides` ("Fai la presentazione da
   assemblea-2026-11-15-contenuti.md"): legge modalità, densità, lingua e occasione dal file e
   chiede solo immagini, sticker e struttura.

## Struttura

```
SKILL.md                      istruzioni per l'agente (domande, analisi, regole, consegna)
references/formato-output.md  formato del file .md: frontmatter, sezioni, forme dei dati, checklist
scripts/package.py            crea lo ZIP da caricare su claude.ai (in dist/ nella radice della repo)
GUIDA.md                      guida all'installazione e all'uso per i membri
```

## Manutenzione

Il formato del file è il contratto con `polinetwork-slides`. Se cambia qualcosa lì, aggiorna
`references/formato-output.md`:
- **domande iniziali** (a voce/da leggere, densità, lingua, occasione): chiavi del frontmatter;
- **limiti del catalogo** (voci dell'indice, numeri, righe di stato, tappe, voci del bilancio):
  limiti nella sezione "Dati con una forma";
- **etichette e sezioni della versione autoesplicativa**: "Sezioni fisse della versione da
  leggere";
- **dati fissi e testi standard** (`brand.md`): sezione 1 di `SKILL.md` e il 5x1000 nel formato.

**Dopo ogni modifica** rigenera lo ZIP con `python3 scripts/package.py` (finisce in `dist/`
nella radice della repo) e ricaricalo su claude.ai. Chi usa Git aggiorna con `git pull`, chi usa
`npx skills` con `npx skills update polinetwork-content-slides`.
