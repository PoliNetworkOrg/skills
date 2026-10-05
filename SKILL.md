---
name: polinetwork-slides
description: Crea presentazioni HTML animate con il tema ufficiale PoliNetwork (glass, forme del sito, font DM Sans/Poppins/Red Hat Text), per assemblee dei soci, general meeting e riunioni dell'associazione. Usala quando qualcuno chiede slide, una presentazione, un deck o un'assemblea PoliNetwork, anche in inglese (slides, presentation, general meeting). Produce un unico file .html che funziona offline e si esporta in PDF. Offre tre versioni: breve, lunga e autoesplicativa (densa, da leggere senza chi presenta o da mandare a chi non c'era, anche ricavata da una presentazione già fatta), in italiano o in inglese.
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
| `templates/autoesplicativa.slides.html` | Scaletta da leggere da soli, ~19 slide dense, solo segnaposto |
| `references/components.md` | Catalogo dei componenti con markup e limiti. **Leggilo prima di scrivere.** |
| `references/brand.md` | Tono, dati fissi (codice 5x1000, link), testi standard IT/EN |
| `scripts/build.py` | Compila il sorgente in un unico HTML autonomo |
| `scripts/check.py` | Controlla il layout con Chrome headless e fa gli screenshot |

## 1. Chiedi prima di scrivere

Fai **una sola domanda** con tutto quello che non sai già dalla richiesta. Non chiedere quello
che l'utente ha già detto.

1. **Versione:**
   - **breve**, ~8 slide: aggiornamento veloce o riunione;
   - **lunga**, ~25 slide: assemblea dei soci completa, con team, bilancio, votazione e 5x1000;
   - **autoesplicativa**, ~15-20 slide dense: da mandare a chi non c'era o da leggere in differita,
     senza nessuno che presenta. Ogni slide si capisce da sola (vedi
     [Versione autoesplicativa](#versione-autoesplicativa)).
2. **Lingua:** italiano o inglese. Tutta la presentazione è in una lingua sola.
3. **Occasione:** che cosa è (Assemblea dei Soci, General Meeting…), data e luogo.
4. **Contenuti:** argomenti, numeri, persone, eventi, scadenze, oppure materiale da cui partire
   (appunti, verbale, documento, vecchia presentazione).
5. **Immagini:** foto, sticker e screenshot che vuole usare. Vanno messi nella cartella `img/`.
   Nella versione autoesplicativa niente sticker.

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
   "TEMPLATE BREVE", "TEMPLATE LUNGO" o "TEMPLATE AUTOESPLICATIVO". Nella versione autoesplicativa
   lascia `mode: lettura`.

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
3. **Screenshot:** guarda `shots/contact-sheet.png` (se c'è) e almeno qualche `shots/slide-NN.png`
   a grandezza piena. `check.py` trova solo problemi di impaginazione; negli screenshot cerca il
   resto:
   - slide troppo vuote (unisci con un'altra o cambia componente) o troppo piene;
   - ripetizioni (la stessa informazione nel riquadro "In breve", nel corpo e nel `.next`);
   - numeri e nomi diversi da come li ha dati l'utente, frasi che aggiungono cose non dette.
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
  - P (o Ctrl+P) per la finestra presentatore con note e timer;
  - S per stampare o esportare in PDF: Salva come PDF, margini "Nessuno", "Grafica di sfondo"
    attiva (su Firefox "Stampa sfondi").

## Versione autoesplicativa

È la presentazione da **leggere**, non da proiettare: la si manda dopo l'assemblea o a chi non
c'era, e deve capirsi tutto senza nessuno che parla. Usa le stesse regole sui contenuti: solo
quello che dà l'utente, mai fatti inventati.

**Come si attiva:** `mode: lettura` nel commento in testa al file. Testo più piccolo e più denso,
niente sticker, numero di pagina "05 / 19", nome della sezione in alto a destra, voci dell'indice
cliccabili che portano alle sezioni, contatori delle votazioni fermi.

**Come si scrive:**
- **Titoli che dicono la conclusione** ("Il sito è online da settembre"), non solo l'argomento
  ("Sito web"). Qui possono arrivare a ~10 parole.
- **Frasi complete** al posto delle parole chiave: chi, cosa, quando, perché, con i numeri.
- **Un "In breve" (`.summary`)** in cima alle slide di contenuto: la frase da leggere per prima.
- **Spiegare** con `.cols` (perché / cosa abbiamo fatto / risultato), `dl.facts` (quando, dove,
  chi) e `.next` (prossimo passo o cosa chiediamo a chi legge).
- **Struttura fissa:** copertina con `.intro` (cos'è il documento e per chi), "In sintesi"
  (`ol.points`), indice, poi le sezioni; in fondo "Cosa puoi fare tu", glossario delle sigle
  (`dl.terms`) e a chi scrivere per domande.
- **Votazioni:** riporta l'esito finale (numeri e timbro "Approvato" o "Respinto"), non i
  contatori da cliccare.
- **Niente "Domande?"** come slide a sé: al suo posto la chiusura "Per domande e contatti".
- **Un divisore (`.section`) per ogni voce dell'indice**, nello stesso ordine: servono per l'indice
  cliccabile e per il nome della sezione in alto a destra. Le slide finali fuori dalle sezioni
  ("Cosa puoi fare tu", glossario) hanno `data-crumb="off"`.
- **Etichette in inglese:** vedi la tabella "Versione autoesplicativa" in `brand.md`.
- I limiti di testo per la lettura sono nel catalogo, sezione "Versione autoesplicativa".

**Trasformare una presentazione già fatta** (breve o lunga):
1. **Parti dal template autoesplicativo**, non dal vecchio file: copia
   `templates/autoesplicativa.slides.html` in un nuovo nome, per esempio
   `assemblea-2026-04-28-lettura.slides.html`, e versaci dentro i contenuti della presentazione
   originale. Il sorgente originale non si tocca.
2. **Fonti:** testo delle slide, note di chi parla (`<aside class="notes">`, se ci sono), verbale e
   materiali dati dall'utente. Non c'è altro: niente sticker, niente "Domande?", niente
   contatori di voto da cliccare.
3. **Ricostruisci le sezioni:** una voce dell'indice per ogni gruppo di argomenti, con il suo
   divisore. Togli dall'indice voci come "Domande" o "Q&A".
4. **Chiedi quello che manca, in un solo messaggio, prima di scrivere:** il perché delle scelte,
   i risultati, le date, gli esiti e i numeri delle votazioni, le definizioni delle sigle. Se la
   presentazione non ha note, quasi tutte le spiegazioni arriveranno da queste risposte. Quello
   che l'utente non sa resta `.todo`.
5. **Espandi** ogni slide in frasi complete usando solo le fonti e le risposte. Riporta i numeri
   esattamente come sono (se l'originale dice "1000+ persone", non diventano "1000+ matricole") e
   non aggiungere motivazioni o intenzioni che nessuno ha dato.
6. Proponi la scaletta come al punto 2, poi compila e controlla come sempre.

## Modificare una presentazione esistente

1. Modifica il sorgente `.slides.html` (mai l'HTML compilato).
2. Ricompila con `build.py` e ricontrolla con `check.py`.

Se l'utente ha solo l'HTML compilato (per esempio l'ha ricevuto da qualcuno), ricava il sorgente:

```bash
python3 "$SKILL_DIR/scripts/build.py" --extract assemblea.html -o cartella/
```

Il comando crea `cartella/assemblea.slides.html` ed estrae in `cartella/img/` le immagini
incorporate.
