# Inventario dei due template

`templates/parlata.slides.html` e `templates/autoesplicativa.slides.html` contengono gli stessi
55 layout, nello stesso ordine e con gli stessi `id` / `data-layout`. La prima versione è
il template **presentato**; la seconda usa `mode: lettura`. Il template è un catalogo da cui
scegliere: copia le slide pertinenti, elimina le altre, sostituisci testo, numeri e immagini.
Gli ID permettono di trovare il componente nel sorgente senza dipendere dai titoli lorem ipsum.
Tutti i testi hanno già lo stile finale; nessuna `.todo`, nessuna immagine mancante.

## Densità e riferimento visivo

Quantità ricavate dai sorgenti forniti dall'utente:

- Assemblea (`assemlea-2026-10-25/assemblea-2026-10-15.slides.html`, 42 slide): titoli con
  mediana 3 parole (90° percentile 5, massimo 6); paragrafi con mediana 6 parole
  (90° percentile 12). Le note del relatore sono escluse.
- E-group (`egroup/egroup-lettura.slides.html`, 11 slide): titoli con mediana 5 parole
  (90° percentile 8, massimo 9); paragrafi con mediana 14,5 parole (90° percentile 23).
  È un riferimento di quantità, non di impaginazione.
- Design (`progetto-fhci/C1/presentazione/presentazione_animata.html`): palco 16:9, margini
  ampi e condivisi, gerarchia titolo/corpo, colonne e blocchi allineati, numero e titolo dei
  divisori in basso a sinistra. Questi tratti sono già presenti nel tema della skill.
  Colori, logo, font e icone restano quelli PoliNetwork.

Parlata: titoli 3–5 parole, righe semplici di 4–8 parole, descrizioni brevi, 3–4 elementi
per slide. Lettura: titoli fino a 8–10 parole, descrizioni di ~19 parole, paragrafi di
~40 parole quando servono contesto e spiegazione. I layout con immagini o dati possono
restare brevi anche in lettura. Un componente non è un invito a riempirlo al limite.

## Uso e proporzioni

Copia anche `templates/img/` nella cartella `img/` accanto al nuovo sorgente. I segnaposto
neutri sono asset SVG locali: la build li incorpora e le anteprime funzionano offline.
Per la presentazione reale sostituiscili con foto o screenshot e rimuovi gli asset non usati.

| Asset | Proporzione | Uso |
|---|---|---|
| `foto-4x3.svg` | 4:3 | Testo e foto, gallerie, evento |
| `foto-16x9.svg` | 16:9 | Immagine a tutto schermo |
| `foto-2x1.svg` | 2:1 | Profilo di una persona |
| `ritratto.svg` | 1:1 | Foto team e referenti, ritaglio circolare |
| `web-16x10.svg` | 16:10 | Schermo del MacBook |
| `app-1.svg`, `app-2.svg`, `app-3.svg` | 9:19,2 | iPhone, tre schermate distinguibili |
| `tablet-4x3.svg` | 4:3 | iPad orizzontale |
| `documento-a4.svg` | A4 verticale | Statuto, regolamento, documento |

Indice e divisore sono presenti in entrambe le librerie per garantire la copertura richiesta.
In una presentazione autoesplicativa rimangono facoltativi secondo la skill. I contatori della
votazione sono interattivi nella parlata e fermi con l'esito nella lettura. Numeri, date, nomi
lorem ipsum e dati di bilancio sono esempi, non fatti riferiti all'associazione. Logo, contatti
standard e 5×1000 seguono invece `brand.md`. Nessuno sticker facoltativo è preinserito.

## Slide presenti in entrambi i template

| N. | ID del layout | Tipologia |
|---|---|---|
| 01 | `copertina` | Copertina |
| 02 | `indice` | Agenda / indice |
| 03 | `divisore` | Divisore di sezione |
| 04 | `paragrafo` | Titolo + paragrafo |
| 05 | `elenco` | Elenco puntato |
| 06 | `due-colonne` | Due colonne |
| 07 | `citazione` | Citazione |
| 08 | `testo-immagine-destra` | Testo + immagine a destra |
| 09 | `testo-immagine-sinistra` | Testo + immagine a sinistra |
| 10 | `statistica` | Numero grande / statistica singola |
| 11 | `kpi-3` | Griglia di 3 KPI |
| 12 | `kpi-4` | Griglia di 4 KPI |
| 13 | `grafico` | Grafico a colonne |
| 14 | `tabella` | Tabella a quattro colonne |
| 15 | `timeline` | Timeline con quattro tappe |
| 16 | `confronto` | Confronto prima / dopo, opzione A / B |
| 17 | `team-foto` | Griglia team con foto |
| 18 | `persona-bio` | Singola persona con bio |
| 19 | `immagine-intera` | Immagine a tutto schermo |
| 20 | `galleria` | Galleria di tre immagini |
| 21 | `galleria-mosaico` | Galleria a mosaico, quattro immagini |
| 22 | `macbook` | Solo MacBook, sito web |
| 23 | `macbook-iphone` | MacBook + iPhone |
| 24 | `iphone` | Solo iPhone |
| 25 | `iphone-2` | 2 iPhone affiancati |
| 26 | `iphone-3` | 3 iPhone affiancati |
| 27 | `ipad` | Solo iPad, interfaccia orizzontale |
| 28 | `card` | Tre card di contenuto |
| 29 | `card-gruppi` | Card per priorità / categoria |
| 30 | `tabella-stato` | Tabella di stato dei progetti |
| 31 | `righe-icona` | Quattro righe con icona |
| 32 | `sintesi` | Sintesi / punti chiave |
| 33 | `spiegazione` | Tre colonne, sintesi e prossimo passo |
| 34 | `scheda-evento` | Scheda evento con foto |
| 35 | `team-panorama` | Panoramica dei team |
| 36 | `team-dettaglio` | Dettaglio team con referenti |
| 37 | `documento` | Documento A4 con spiegazioni |
| 38 | `bilancio` | Bilancio con entrate, uscite e saldo |
| 39 | `votazione` | Votazione live / esito definitivo |
| 40 | `cinque-per-mille` | 5×1000, testo standard PoliNetwork |
| 41 | `avanzamento` | Barre di avanzamento |
| 42 | `crescita` | Crescita singola con immagine |
| 43 | `nuvola` | Nuvola di parole |
| 44 | `recap-foto` | Riepilogo con mosaico di quattro foto |
| 45 | `pannello-citazione` | Pannello di punti + citazione |
| 46 | `mappa` | Mappa di relazioni |
| 47 | `percorso` | Percorso senza date |
| 48 | `interfaccia` | Interfaccia web ricostruita |
| 49 | `banner` | Banner / avviso di interfaccia |
| 50 | `messaggio` | Frase a effetto |
| 51 | `glossario` | Glossario |
| 52 | `fonti` | Fonti e rimandi |
| 53 | `azioni` | Azioni / come contribuire |
| 54 | `contatti` | Chiusura / contatti |
| 55 | `solo-brand` | Apertura / chiusura solo brand |

## Compilazione

Dalla radice del repository, con gli script esistenti:

```bash
python3 skills/polinetwork-slides/scripts/build.py skills/polinetwork-slides/templates/parlata.slides.html -o dist/parlata.html
python3 skills/polinetwork-slides/scripts/build.py skills/polinetwork-slides/templates/autoesplicativa.slides.html -o dist/autoesplicativa.html
python3 skills/polinetwork-slides/scripts/check.py dist/parlata.html --shots shots/parlata
python3 skills/polinetwork-slides/scripts/check.py dist/autoesplicativa.html --shots shots/lettura --pdf dist/autoesplicativa.pdf
python3 skills/polinetwork-slides/scripts/package.py
```

Il controllo verifica geometria e font. Guardare anche i fogli riassuntivi e le slide più dense,
i dispositivi e il PDF: nessun testo fuori dai contenitori, nessun componente vuoto, nessun
mockup deformato. Nelle presentazioni reali verificare anche la sostituzione del lorem ipsum.
