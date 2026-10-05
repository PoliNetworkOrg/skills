# Formato del file di output

Il file è il contratto con `polinetwork-slides`, la skill che farà le slide: deve poterlo usare
senza altre spiegazioni e senza rifare le domande a cui l'utente ha già risposto. Per questo il
frontmatter riprende le sue domande e il corpo usa convenzioni fisse per i dati che hanno una
forma (numeri, stati, tappe, persone, bilancio, votazioni).

## Struttura

```markdown
---
per: polinetwork-slides
modalita: a voce            # oppure: da leggere
densita: completa           # oppure: essenziale
lingua: it                  # oppure: en
occasione: Assemblea dei Soci
data: 15 novembre 2026
luogo: Politecnico di Milano, aula 3.1
---

<!--
Contenuti per polinetwork-slides. Convenzioni:
- "## N. Titolo" = sezione e voce dell'indice; la riga "> …" sotto è il suo sottotitolo (data-sub).
- "## Titolo" senza numero = sezione fissa fuori dall'indice.
- [da completare: …] = dato confermato ma non ancora disponibile: diventa un segnaposto .todo.
- Sezione "5x1000" senza testo = usa il testo standard di brand.md.
-->

# Bilancio e piano dell'anno

> Facoltativo: una frase su cos'è il documento e per chi.

## Ordine del giorno

1. Chi siamo
2. Cosa abbiamo fatto
3. Bilancio
4. 5x1000

---

## 1. Chi siamo

> Una frase su cosa contiene la sezione.

### Sottotema

- Punto
- Punto

---

## 2. Cosa abbiamo fatto

> Una frase su cosa contiene la sezione.

### Altro sottotema

1. Passaggio
2. Passaggio

---

…
```

## Frontmatter

Sempre tutte le chiavi, con i valori esatti indicati. Nient'altro: niente relatori, tempi, note.

| Chiave | Valori | Cosa decide per le slide |
|---|---|---|
| `per` | `polinetwork-slides` | Identifica il file come input per quella skill |
| `modalita` | `a voce` · `da leggere` | Versione proiettata o autoesplicativa |
| `densita` | `essenziale` · `completa` | Insieme a `modalita` sceglie la versione (tabella sotto) |
| `lingua` | `it` · `en` | Lingua delle slide e delle etichette fisse |
| `occasione` | testo libero | Etichetta sopra il titolo in copertina |
| `data`, `luogo` | testo libero | Copertina. Se non ci sono o non servono, ometti la chiave |

| | essenziale | completa |
|---|---|---|
| **a voce** | breve, ~8 slide | lunga, ~25 slide |
| **da leggere** | autoesplicativa compatta, ~8-12 slide | autoesplicativa completa, ~15-20 slide |

Il commento `<!-- … -->` dopo il frontmatter si copia così com'è, togliendo le righe delle
convenzioni che il file non usa. È l'unica istruzione ammessa nel file.

## Titoli e sezioni

- `#` solo per il titolo della presentazione: al massimo ~7 parole, senza data (la data sta nel
  frontmatter).
- `## Ordine del giorno` subito dopo il titolo: elenco numerato, **massimo 9 voci**, ognuna di
  massimo ~5 parole.
- `## N. Titolo` per ogni punto dell'ordine del giorno, numerato e scritto **esattamente** come
  nell'ODG, nello stesso ordine.
- Subito sotto ogni `## N.`, una riga `> …`: una frase (massimo ~12 parole) su cosa contiene la
  sezione. Diventa il sottotitolo nell'indice e nel divisore.
- `###` per i sottotemi. *A voce*: titoli brevi (~6 parole), l'argomento. *Da leggere*: il titolo
  dice la conclusione ("Il sito è online da settembre"), fino a ~10 parole.
- `---` tra un punto e l'altro, per rendere evidenti i confini delle sezioni.
- `## Titolo` senza numero solo per le sezioni fisse della versione da leggere (sotto). Non
  compaiono nell'ODG.

## Testo

- **Elenchi** puntati per informazioni parallele, numerati per processi e sequenze. Al massimo
  ~6 voci per elenco: se sono di più, dividi in due sottotemi.
- **Grassetto** per l'etichetta all'inizio di un punto ("**Obiettivo**: …") o per il numero
  all'inizio di un dato, non per enfasi sparsa.
- **Tabelle** per confronti (prima/dopo, distribuzioni, corrispondenze).
- **Link** scritti in chiaro, senza protocollo se è ovvio (`polinetwork.org/pagina`). Account
  social come `@account`, solo se l'utente li indica.
- **Lingua e tono**: quelli del frontmatter e del file di contesto, se presente.

## Dati con una forma

Usa queste forme quando il contenuto le ha: `polinetwork-slides` le riconosce e sceglie il
componente adatto. Non indicare mai il componente: scrivi solo il dato nella sua forma.

**Numeri in evidenza** (2-5 per sottotema): elenco con il numero in grassetto all'inizio.

```markdown
- **1 200** iscritti ai gruppi delle matricole
- **35** volontari attivi
```

**Tappe nel tempo**: solo se ogni tappa ha una data o un periodo (3-5 tappe). Senza date usa un
elenco numerato normale.

```markdown
- **Ottobre**: recruiting per tutti i team
- **Dicembre**: lancio del nuovo sito
```

**Stato dei progetti** (massimo 7 righe): tabella con uno di questi stati, così come sono scritti:
`Fatto`, `Live`, `Pubblicato`, `In corso`, `Da iniziare`, `In ritardo`, `Da decidere`,
`Bloccato`, `Annullato`. Il dettaglio è facoltativo.

```markdown
| Progetto | Stato | Dettaglio |
|---|---|---|
| Nuovo sito | In corso | MVP entro settembre |
| Instagram | Live | |
```

**Team**: un `###` per team, con cosa fa (massimo 4 voci) e le persone come
`Nome Cognome — ruolo` (il ruolo è facoltativo). Per una panoramica di tutti i team, un elenco
`**Nome team**: compiti`.

```markdown
### IT

- **Di cosa ci occupiamo**: sito, bot, server
- **Capi dipartimento**: Nome Cognome, Nome Cognome — referente bot
```

**Prima / dopo**: tabella con le colonne `Prima` e `Dopo` (massimo 4 righe).

**Bilancio**: due tabelle, entrate e uscite, ognuna con al massimo 5 voci e la riga `Totale`,
poi il risultato e lo stato. Solo cifre date dall'utente.

```markdown
### Entrate

| Voce | Importo |
|---|---|
| Quote associative | 1 250 € |
| Totale | 1 250 € |

### Uscite

| Voce | Importo |
|---|---|
| Server e domini | 940 € |
| Totale | 940 € |

- **Avanzo di gestione**: 310 €
- **Stato**: Da approvare
```

**Votazione**: un `###` che inizia con `Votazione:` e dice cosa si vota. *A voce* basta questo (i
voti si contano dal vivo). *Da leggere*, aggiungi l'esito.

```markdown
### Votazione: approvazione del bilancio 2025

- **Esito**: Approvato
- **Favorevoli**: 42 · **Contrari**: 1 · **Astenuti**: 3
```

**5x1000**: una sezione `## N. 5x1000` senza testo, o con una sola riga se l'utente vuole dire
qualcosa in più. Il testo standard e il codice fiscale li mette `polinetwork-slides`.

## Sezioni fisse della versione da leggere

Solo con `modalita: da leggere`, oltre a ODG e sezioni numerate:

- **Introduzione**: la riga `> …` sotto il titolo, con cos'è il documento e per chi.
- `## In sintesi`, subito dopo l'ODG: 3-6 punti numerati, i fatti più importanti di tutto il
  documento, in frasi complete.
- Dentro le sezioni, dove serve spiegare, le etichette in grassetto **Perché**,
  **Cosa abbiamo fatto**, **Risultato**, **Prossimo passo**, **Cosa ti chiediamo**, **Scadenza**;
  per eventi e decisioni **Quando**, **Dove**, **Chi**, **Com'è andata**. In inglese usa le
  etichette tradotte (Why, What we did, Outcome, Next step, What we ask you, Deadline, When,
  Where, Who, How it went).
- In fondo, nell'ordine:
  - `## Cosa puoi fare tu`: azioni concrete per chi legge, con link;
  - `## Glossario`: `- **Sigla**: definizione`, massimo 8 termini, solo quelli che compaiono nel
    file. Le definizioni dei termini interni le dà l'utente. Per 5x1000, IRPEF, Terzo Settore e APS
    scrivi solo il termine: la definizione standard la mette `polinetwork-slides`;
  - `## Per domande e contatti`: a chi scrivere, con i contatti dati dall'utente.

In inglese i titoli delle sezioni fisse sono `Agenda`, `Key points`, `What you can do`,
`Glossary`, `Questions and contacts`; `## Ordine del giorno` diventa `## Agenda`.

## Cosa non deve mai comparire

- Nomi di relatori nell'ODG
- Orari o durate
- Note per chi parla, indicazioni di scena, istruzioni operative per la serata
- Riferimenti a immagini, screenshot, icone, sticker, layout, componenti o numero di slide
- Segnaposto come `TODO`, `XXX`, `[da inserire]`: l'unico ammesso è `[da completare: …]`, e solo
  se l'utente ha chiesto di tenere il punto
- Note formali o di rischio destinate solo all'organizzatore
- Il testo standard del 5x1000 e il codice fiscale

## Checklist prima della consegna

- [ ] Frontmatter completo, con i valori esatti della tabella.
- [ ] ODG con al massimo 9 voci, identico (testo e ordine) ai `## N.`.
- [ ] Ogni `## N.` ha la sua riga `> …`.
- [ ] Tutto in una lingua sola, quella del frontmatter.
- [ ] Ogni numero, nome e data viene dall'utente o dai documenti.
- [ ] Nessun elemento di "Cosa non deve mai comparire".
- [ ] Se `da leggere`: introduzione, "In sintesi", "Cosa puoi fare tu", "Glossario" (se ci sono
      sigle) e "Per domande e contatti".
