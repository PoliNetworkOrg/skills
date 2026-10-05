---
name: polinetwork-slides
description: "Crea presentazioni HTML animate con il tema ufficiale PoliNetwork (glass, forme del sito, font DM Sans/Poppins/Red Hat Text), per assemblee dei soci, general meeting e riunioni dell'associazione. Usala quando qualcuno chiede slide, una presentazione, un deck o un'assemblea PoliNetwork, anche in inglese (slides, presentation, general meeting). Produce un unico file .html che funziona offline e si esporta in PDF. Offre due versioni: parlata (da proiettare mentre qualcuno presenta) e autoesplicativa (da leggere senza chi presenta o da mandare a chi non c'era, anche ricavata da una presentazione già fatta), con o senza sticker meme, più o meno densa, in italiano o in inglese."
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
| `templates/parlata.slides.html` | Base per la versione parlata (da proiettare), solo segnaposto |
| `templates/autoesplicativa.slides.html` | Base per la versione da leggere da soli, solo segnaposto |
| `assets/memes/` | Sticker meme pronti (gatti scontornati), da usare se l'utente vuole i meme |
| `references/components.md` | Catalogo dei componenti con markup e limiti. **Leggilo prima di scrivere.** |
| `references/brand.md` | Tono, dati fissi (codice 5x1000, link), testi standard IT/EN |
| `scripts/build.py` | Compila il sorgente in un unico HTML autonomo |
| `scripts/check.py` | Controlla il layout con Chrome headless e fa gli screenshot |

## 1. Chiedi prima di scrivere

Fai **una sola domanda** con tutto quello che non sai già dalla richiesta. Non chiedere quello
che l'utente ha già detto.

1. **Parlata o autoesplicativa?** È la prima domanda, perché decide tutto il resto:
   - **parlata:** qualcuno la proietta e ci parla sopra. Poco testo, animazioni. Parte da
     `templates/parlata.slides.html`;
   - **autoesplicativa:** si manda a chi non c'era o si legge in differita, senza nessuno che
     presenta. Ogni slide si capisce da sola (vedi [Versione autoesplicativa](#versione-autoesplicativa)).
     Parte da `templates/autoesplicativa.slides.html`.

   Non esistono una versione breve e una lunga: quante slide servono lo decidono i contenuti.
2. **Quanto densa?** Quanto testo per slide, indipendentemente da quante sono:
   - **essenziale:** parlata con parole chiave e una cosa per slide; autoesplicativa con una slide
     per argomento e solo quello che serve per capire (gli argomenti vicini si uniscono);
   - **dettagliata:** parlata con frasi brevi e più contesto per slide; autoesplicativa con ogni
     argomento spiegato con contesto, perché e risultati.
3. **Lingua:** italiano o inglese. Tutta la presentazione è in una lingua sola.
4. **Occasione:** che cosa è (Assemblea dei Soci, General Meeting…), data e luogo.
5. **Contenuti:** argomenti, numeri, persone, eventi, scadenze, oppure materiale da cui partire
   (appunti, verbale, documento, vecchia presentazione).
6. **Immagini:** foto e screenshot che vuole usare. Vanno messi nella cartella `img/`. Gli
   screenshot di app meglio in tema chiaro. Per ogni progetto o app chiedi 2-4 schermate diverse
   (elenco, filtri, dettaglio, mappa…), non una sola. Per i link da aprire in sala (sito,
   iscrizione, recruiting) proponi un QR.
7. **Con sticker meme o senza?** Si chiede sempre, sia per la parlata sia per l'autoesplicativa.
   Se dice sì, proponi dove metterli (vedi il punto 4): usa quelli che fornisce l'utente oppure i
   meme pronti di `assets/memes/`. Se dice no, niente sticker: togli tutti gli
   `<img class="sticker">` del template.
8. **Struttura**, con il default della versione scelta già proposto:
   - **indice** (`ol.agenda`, cliccabile, con il sottotitolo di ogni sezione): sì nella parlata,
     no nell'autoesplicativa;
   - **divisori di sezione** (slide "Parte 1"): sì nella parlata, no nell'autoesplicativa;
   - **nome della sezione in alto a destra:** sì in tutte.

   Come si applicano: senza indice si toglie la slide dell'indice. Senza divisori si tolgono le
   slide `.section` e la prima slide di ogni sezione porta `data-section="Titolo"` e
   `data-sub="una frase su cosa contiene"`. Senza nome in alto si scrive `crumb: no` nel commento
   in testa al file. Le tre scelte sono indipendenti.

La presentazione è lunga quanto servono i contenuti: con pochi contenuti vengono poche slide, e va
bene così. Se mancano informazioni per capire un argomento (soprattutto nell'autoesplicativa),
chiedile. Non riempire i buchi da solo.

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
   cp "$SKILL_DIR/templates/parlata.slides.html" assemblea-2026-04-28.slides.html
   mkdir -p img
   ```
2. Aggiorna il commento in testa al file con `title:` (titolo della scheda del browser) e
   `lang: it` oppure `lang: en`. Cancella il secondo commento, quello che inizia con
   "TEMPLATE PARLATO" o "TEMPLATE AUTOESPLICATIVO". Nella versione autoesplicativa
   lascia `mode: lettura`.

## 4. Scrivi le slide

- Usa **solo** i componenti di `references/components.md`. Non aggiungere `<style>`, classi
  inventate o script. Lo stile in linea serve solo per le dimensioni (`width`, `height`) di foto e
  QR: per inclinare, affiancare un QR o impaginare ci sono le classi del catalogo (`tilt`,
  `cutout`, `has-qr`).
- **Segui la scaletta confermata.** Sostituisci ogni segnaposto `.todo` del template con i contenuti
  dell'utente, togli le slide che non servono e aggiungi quelle che mancano copiandole dal catalogo.
  Il template è solo una base di layout, non uno schema obbligato.
- **Un'idea per slide.** Rispetta i limiti "max" del catalogo: se il contenuto è di più, dividilo in
  due slide invece di stringerlo.
- **Varia i layout.** Nessun componente e nessuna impaginazione devono dominare la presentazione:
  se le slide si somigliano tutte, sembra fatta in serie.
  - Mai lo stesso componente in due slide di contenuto di fila.
  - Nessun componente in più di circa un quarto delle slide di contenuto. Vale per tutti
    (`ul.irows`, `div.cards`, `div.split`, `dl.facts`, `div.stats`…), non per uno solo.
  - Lo stesso per le impaginazioni: per esempio non sempre riquadro a sinistra e immagine a destra,
    anche se dentro cambia componente.
  - Lo stesso per il lato di foto e sticker: non tutti a destra. Alterna le slide con immagine
    (`split` e `split media-left`) e gli sticker (`sticker` e `sticker left`) lungo la
    presentazione, come per i componenti: mai tutti dallo stesso lato, mai lunghe file uguali.
  - Quando correggi una ripetizione, non spostare tutto su un altro componente: distribuisci. Variare
    non vuol dire eliminare un componente, ma usarne tanti, ognuno poche volte.

  Scegli in base alla forma del contenuto: elenco di punti con icona → `ul.irows`, numeri →
  `stats`, passi → `ol.points`, tappe con data → `timeline`, oggi/domani → `compare`,
  perché/cosa/risultato → `cols`, chi/quando/dove → `dl.facts`, voci affiancate → `cards`, un
  evento con foto → `split`, più schermate di un'app → `screens`, un messaggio → frase a effetto. Già nella scaletta (punto 2) indica il
  componente di ogni slide, il lato dell'immagine o dello sticker se c'è, e controlla che nessuno
  si ripeta troppo.
- **Componi con cura.** Ogni slide deve essere bilanciata, non solo corretta:
  - riempi la larghezza: 3 voci stanno su una riga, non 2+1; niente riquadri piccoli in mezzo al
    vuoto;
  - testo e immagine affiancati sono alti circa uguali; elementi che vanno insieme stanno nello
    stesso riquadro, con i bordi allineati, invece che in blocchi separati di peso diverso;
  - nomi ed etichette stanno su una riga (se vanno a capo, meno colonne); niente URL lunghi;
  - la parola chiave si deve vedere: in `div.stats` mettila in `<h3>` tra numero e descrizione;
  - niente decorazioni senza significato: pallini colorati che non indicano niente, riquadri
    azzurri (`glass tint`) su contenuti normali.
- **Immagini e QR** (dettagli nella sezione "Immagini" del catalogo): una foto per riquadro,
  ritagliata sul soggetto e nel formato del riquadro; le altre in una galleria. Telefono e
  immagini scontornate inclinati (`tilt`); gli scontornati dentro la slide (`img.cutout`), non
  attaccati al bordo. Ogni persona con la foto una volta sola. QR per i link da aprire in sala,
  con il link verificato, senza didascalia, nello stesso riquadro del testo (`.has-qr`).
  Un progetto o un'app si mostra con più schermate, anche su più slide (`split` con la schermata
  principale, poi `div.screens` con le altre, oppure una slide per funzione).
- **Titoli corti:** al massimo ~6 parole, senza punto finale.
- **Inglese:** traduci anche le etichette fisse (vedi la tabella in `brand.md`). I nomi propri
  (team, eventi) restano come li scrive l'utente.
- **Sticker:** solo se l'utente li ha voluti (domanda 7 del punto 1); altrimenti nessuno. Al
  massimo uno per slide, non in tutte, mai su bilancio, votazioni e 5x1000. Nell'autoesplicativa
  ancora meno e solo su slide leggere. Usa quelli forniti dall'utente o i meme pronti di
  `assets/memes/` (copiali in `img/`, vedi "Sticker" nel catalogo); non scaricare immagini di terzi.
  Metti gli sticker un po' a destra e un po' a sinistra (vedi "Varia i layout").
- **Note per chi parla:** quando servono, mettile in `<aside class="notes">`. Si vedono con il tasto P.

## 5. Compila e controlla (obbligatorio)

```bash
python3 "$SKILL_DIR/scripts/build.py" assemblea-2026-04-28.slides.html
python3 "$SKILL_DIR/scripts/check.py" assemblea-2026-04-28.html --shots shots/
```

Il primo comando crea `assemblea-2026-04-28.html` con immagini e font incorporati. Il secondo
segnala testo fuori dalla slide o dalle card, contenuto che copre il titolo, font troppo piccoli,
segnaposto `.todo` rimasti e immagini mancanti. Tutti i `.todo` del template devono sparire: restano solo quelli dei dati che
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
   - troppe slide uguali: nel foglio riassuntivo non devono vedersi file di slide con lo stesso
     layout. Conta quante volte compare ogni componente e ogni impaginazione, nessuno escluso, e
     da che lato stanno foto e sticker: se sono quasi tutti dallo stesso lato, alternali;
   - slide sbilanciate: un lato pieno e l'altro vuoto, blocchi staccati, testi corti spezzati su
     due righe, foto strette o tagliate male, telefono o immagini dritti e rigidi;
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
sticker solo se l'utente li vuole, numero di pagina "05 / 19", nome della sezione in alto a destra, voci dell'indice
cliccabili che portano alle sezioni, contatori delle votazioni fermi.

**Come si scrive:**
- **Titoli che dicono la conclusione** ("Il sito è online da settembre"), non solo l'argomento
  ("Sito web"). Qui possono arrivare a ~10 parole.
- **Frasi complete** al posto delle parole chiave: chi, cosa, quando, perché, con i numeri.
- **"In breve" (`.summary`) solo dove serve:** sulle slide dense o da interpretare (colonne di
  spiegazione, tabelle di stato, bilancio), quando dice qualcosa che non è già nel titolo o nel
  corpo. Non sulle slide già sintetiche (numeri, card brevi, foto, team, timeline): lì basta un
  titolo che dice la conclusione. In tutto il documento poche, non una per slide.
- **Spiegare** con `.cols` (perché / cosa abbiamo fatto / risultato), `dl.facts` (quando, dove,
  chi) e `.next` (prossimo passo o cosa chiediamo a chi legge).
- **Struttura fissa:** copertina con `.intro` (cos'è il documento e per chi), "In sintesi"
  (`ol.points`), poi le sezioni (indice solo se l'utente lo vuole); in fondo "Cosa puoi fare tu",
  glossario delle sigle (`dl.terms`) e a chi scrivere per domande.
- **Votazioni:** riporta l'esito finale (numeri e timbro "Approvato" o "Respinto"), non i
  contatori da cliccare.
- **Niente "Domande?"** come slide a sé: al suo posto la chiusura "Per domande e contatti".
- **Di default niente indice né divisori di sezione** (servono a chi parla, non a chi legge), a
  meno che l'utente non li chieda. Una sezione inizia dalla sua prima slide, con
  `data-section="Titolo"` e `data-sub="una frase su cosa contiene"`: da lì viene il nome della
  sezione in alto a destra (e, se c'è l'indice, la voce e il suo sottotitolo). Le slide finali
  fuori dalle sezioni ("Cosa puoi fare tu", glossario) hanno `data-crumb="off"`.
- **Etichette in inglese:** vedi la tabella "Versione autoesplicativa" in `brand.md`.
- I limiti di testo per la lettura sono nel catalogo, sezione "Versione autoesplicativa".

**Trasformare una presentazione già fatta** (una parlata):
1. **Parti dal template autoesplicativo**, non dal vecchio file: copia
   `templates/autoesplicativa.slides.html` in un nuovo nome, per esempio
   `assemblea-2026-04-28-lettura.slides.html`, e versaci dentro i contenuti della presentazione
   originale. Il sorgente originale non si tocca.
2. **Fonti:** testo delle slide, note di chi parla (`<aside class="notes">`, se ci sono), verbale e
   materiali dati dall'utente. Non c'è altro: niente "Domande?", niente contatori di voto da
   cliccare. Gli sticker restano solo se l'utente li vuole anche qui.
3. **Ricostruisci le sezioni:** una per ogni gruppo di argomenti. Se l'utente non vuole i divisori
   (il default), il loro titolo e sottotitolo vanno in `data-section` e `data-sub` sulla prima
   slide della sezione. Se vuole l'indice, togli voci come "Domande" o "Q&A".
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
2. Ricompila con `build.py` e ricontrolla con `check.py`, poi guarda lo screenshot della slide
   cambiata a grandezza piena.
3. Quando l'utente corregge una slide, cerca lo stesso problema nelle altre e correggilo anche lì.
   Ma non esagerare nel verso opposto: se toglie un layout ripetuto, non sostituirlo ovunque con
   un altro (vedi "Varia i layout").

Se l'utente ha solo l'HTML compilato (per esempio l'ha ricevuto da qualcuno), ricava il sorgente:

```bash
python3 "$SKILL_DIR/scripts/build.py" --extract assemblea.html -o cartella/
```

Il comando crea `cartella/assemblea.slides.html` ed estrae in `cartella/img/` le immagini
incorporate.
