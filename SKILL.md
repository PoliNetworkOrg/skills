---
name: polinetwork-slides
description: Crea presentazioni HTML animate con il tema ufficiale PoliNetwork (glass, forme del sito, font DM Sans/Poppins/Red Hat Text), per assemblee dei soci, general meeting e riunioni dell'associazione. Usala quando qualcuno chiede slide, una presentazione, un deck o un'assemblea PoliNetwork, anche in inglese (slides, presentation, general meeting). Produce un unico file .html che funziona offline e si esporta in PDF. Offre una versione breve o lunga, in italiano o in inglese.
metadata:
  short-description: Presentazioni HTML animate con il tema PoliNetwork
---

# PoliNetwork Slides

Questa skill genera presentazioni nello stile PoliNetwork. Tema, animazioni, font e logo sono già
pronti e non vanno modificati: tu impagini con i componenti del catalogo.

**I contenuti li decide l'utente.** Titoli, argomenti, numeri, persone, date, eventi e scaletta
vengono da quello che l'utente scrive o fornisce (appunti, verbali, documenti). Tu puoi riformulare,
accorciare, tradurre e scegliere il layout. Non puoi aggiungere fatti, cifre, nomi o argomenti che
l'utente non ha dato. I template contengono solo segnaposto e i testi negli esempi del catalogo
sono illustrativi: non riusarli come contenuto. Le uniche eccezioni sono i dati fissi e i testi
standard di `references/brand.md` (codice fiscale, sito, link al recruiting, testo del 5x1000).

`SKILL_DIR` è la cartella che contiene questo file. Tutti i percorsi qui sotto sono relativi a `SKILL_DIR`.

| File | A cosa serve |
|---|---|
| `templates/breve.slides.html` | Scaletta breve, ~8 slide (10-15 minuti), solo segnaposto |
| `templates/lunga.slides.html` | Scaletta lunga, ~25 slide (assemblea completa), solo segnaposto |
| `references/components.md` | Catalogo dei componenti con markup e limiti. **Leggilo prima di scrivere.** |
| `references/brand.md` | Tono, dati fissi (codice 5x1000, link), testi standard IT/EN |
| `scripts/build.py` | Compila il sorgente in un unico HTML autonomo |
| `scripts/check.py` | Controlla il layout con Chrome headless e fa gli screenshot |

## 1. Chiedi prima di scrivere

Fai **una sola domanda** con tutto quello che non sai già dalla richiesta. Non chiedere quello
che l'utente ha già detto.

1. **Versione:**
   - **breve**, ~8 slide: aggiornamento veloce o riunione;
   - **lunga**, ~25 slide: assemblea dei soci completa, con team, bilancio, votazione e 5x1000.
2. **Lingua:** italiano o inglese. Tutta la presentazione è in una lingua sola.
3. **Occasione:** che cosa è (Assemblea dei Soci, General Meeting…), data e luogo.
4. **Contenuti:** argomenti, numeri, persone, eventi, scadenze, oppure materiale da cui partire
   (appunti, verbale, documento, vecchia presentazione).
5. **Immagini:** foto, sticker e screenshot che vuole usare. Vanno messi nella cartella `img/`.

Se i contenuti sono troppo pochi per la versione scelta, dillo e chiedi di più, oppure proponi la
versione breve. Non riempire i buchi da solo.

## 2. Proponi la scaletta

Prima di scrivere l'HTML, mostra all'utente la scaletta: un elenco numerato con il titolo di ogni
slide, il componente che userai e in una riga cosa contiene, tutto ricavato dai suoi contenuti.
Aspetta la conferma o le correzioni. Se l'utente ha già dato una scaletta precisa, seguila.

Un dato che l'utente conferma ma ancora non ha (una cifra, un nome) diventa
`<span class="todo">[cosa manca]</span>`. Il controllo lo segnala e alla consegna lo elenchi.

## 3. Prepara i file

Lavora nella cartella indicata dall'utente. Se non ne indica una, lavora in quella corrente.

1. Copia il template scelto in un nome parlante che finisce in `.slides.html`, per esempio:
   ```bash
   cp "$SKILL_DIR/templates/lunga.slides.html" assemblea-2026-04-28.slides.html
   mkdir -p img
   ```
2. Aggiorna il commento in testa al file con `title:` (titolo della scheda del browser) e
   `lang: it` oppure `lang: en`. Cancella il secondo commento, quello che inizia con
   "TEMPLATE BREVE" o "TEMPLATE LUNGO".

## 4. Scrivi le slide

- Usa **solo** i componenti di `references/components.md`. Non aggiungere `<style>`, CSS inline
  per colori o font, classi inventate o script.
- **Segui la scaletta confermata.** Sostituisci ogni segnaposto `.todo` del template con i contenuti
  dell'utente, togli le slide che non servono e aggiungi quelle che mancano copiandole dal catalogo.
  Il template è solo una base di layout, non uno schema obbligato.
- **Un'idea per slide.** Rispetta i limiti "max" del catalogo: se il contenuto è di più, dividilo in
  due slide invece di stringerlo.
- **Titoli corti:** al massimo ~6 parole, senza punto finale.
- **Inglese:** traduci anche le etichette fisse (vedi la tabella in `brand.md`). I nomi propri
  (team, eventi) restano come li scrive l'utente.
- **Sticker:** al massimo uno per slide, mai su bilancio, votazioni e 5x1000. Usa solo immagini
  fornite dall'utente: se non ne ha, lascia il segnaposto `img/sticker-….png` oppure togli lo sticker.
- **Note per chi parla:** quando servono, mettile in `<aside class="notes">`. Si vedono con il tasto P.

## 5. Compila e controlla (obbligatorio)

```bash
python3 "$SKILL_DIR/scripts/build.py" assemblea-2026-04-28.slides.html
python3 "$SKILL_DIR/scripts/check.py" assemblea-2026-04-28.html --shots shots/
```

Il primo comando crea `assemblea-2026-04-28.html` con immagini e font incorporati. Il secondo
segnala testo fuori dalla slide o dalle card, font troppo piccoli, segnaposto `.todo` rimasti e
immagini mancanti. Tutti i `.todo` del template devono sparire: restano solo quelli dei dati che
l'utente fornirà dopo.

1. **Errori di `build.py`** (per esempio un'icona sconosciuta): correggi il sorgente e ricompila.
2. **Problemi di layout segnalati da `check.py`:**
   - accorcia il testo, oppure
   - dividi la slide, oppure
   - passa a un componente più adatto.

   Non rimpicciolire i font. Ricompila e ricontrolla finché `check.py` non riporta più problemi di
   layout.
3. **Screenshot:** guarda `shots/contact-sheet.png` (se c'è) o le singole `shots/slide-NN.png`.
   Controlla che le slide siano equilibrate, leggibili e senza sovrapposizioni.
4. **Senza Chrome/Chromium:** se `check.py` non trova il browser, dillo all'utente e indica che il
   layout non è stato verificato.
5. **Pulizia:** cancella la cartella `shots/` prima di consegnare, a meno che l'utente non chieda
   di tenere gli screenshot.

## 6. Consegna

Comunica all'utente:
- **i file:** il percorso dell'HTML finale, che è il file da proiettare o mandare, e del sorgente
  `.slides.html`, che serve per modificarla;
- **cosa manca:** le immagini da aggiungere in `img/` (con i nomi dei file) e i dati `.todo` da
  completare. Dopo averli aggiunti, si ricompila con lo stesso comando;
- **i comandi per presentare:**
  - → e ← per avanzare e tornare indietro;
  - F per lo schermo intero;
  - O per la panoramica;
  - P per la finestra presentatore con note e timer;
  - per il PDF: Chrome → Stampa → Salva come PDF, margini "Nessuno", "Grafica di sfondo" attiva.

## Modificare una presentazione esistente

1. Modifica il sorgente `.slides.html` (mai l'HTML compilato).
2. Ricompila con `build.py` e ricontrolla con `check.py`.

Se l'utente ha solo l'HTML compilato (per esempio l'ha ricevuto da qualcuno), ricava il sorgente:

```bash
python3 "$SKILL_DIR/scripts/build.py" --extract assemblea.html -o cartella/
```

Il comando crea `cartella/assemblea.slides.html` ed estrae in `cartella/img/` le immagini
incorporate.
