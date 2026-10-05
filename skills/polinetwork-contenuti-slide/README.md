# PoliNetwork Contenuti Slide

Skill per agenti AI (Claude, Claude Code e Codex) che prepara i **contenuti** di una
presentazione PoliNetwork: parte da un ordine del giorno, da appunti o da una bozza e consegna un
file `.md` pronto da passare a [`polinetwork-slides`](../polinetwork-slides/), che ne fa le slide.

Le due skill si dividono il lavoro:

| | `polinetwork-contenuti-slide` | `polinetwork-slides` |
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

## Uso

1. Chiedi i contenuti, allegando ODG, appunti o bozza:

   > Prepariamo i contenuti per l'assemblea dei soci del 15 novembre. L'ODG è in odg.md.

   Oppure richiama la skill per nome: `/polinetwork-contenuti-slide` in Claude Code,
   `$polinetwork-contenuti-slide` in Codex.
2. Rispondi alle domande e controlla il file `.md` che ricevi.
3. Passa il file alla skill delle slide, nella stessa chat o in una nuova:

   > Fai la presentazione da assemblea-2026-11-15-contenuti.md.

   `polinetwork-slides` legge modalità, densità, lingua e occasione dal file e chiede solo
   immagini, sticker e struttura (indice, divisori).

## Installazione

Come per le altre skill della repo (vedi il [README principale](../../README.md)):

| Strumento | Installazione |
|---|---|
| Claude Code | `npx skills add PoliNetworkOrg/skills --skill polinetwork-contenuti-slide -a claude-code -g`, oppure `ln -s <repo>/skills/polinetwork-contenuti-slide ~/.claude/skills/polinetwork-contenuti-slide` |
| Codex | `$skill-installer` con il link a questa cartella, oppure `npx skills add … -a codex -g` |
| claude.ai / app Claude | crea lo ZIP della cartella e caricalo in Customize → Skills (comando sotto) |

Per lo ZIP, dalla radice della repo:

```bash
mkdir -p dist && (cd skills && zip -r ../dist/polinetwork-contenuti-slide.zip polinetwork-contenuti-slide)
```

Conviene installare anche `polinetwork-slides`: le due skill sono pensate per lavorare insieme.
Non servono Python né altri programmi.

## Struttura

```
SKILL.md                      istruzioni per l'agente (domande, analisi, regole, consegna)
references/formato-output.md  formato del file .md: frontmatter, sezioni, forme dei dati, checklist
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
