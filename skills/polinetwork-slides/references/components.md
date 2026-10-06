# Catalogo dei componenti

Ogni slide è una `<section class="slide">` nel file `*.slides.html`. Il motore
(`deck.js`) aggiunge da solo footer, numero di pagina, animazioni d'ingresso,
icone, segnaposto per le immagini mancanti e l'impaginazione verticale.
**Scrivi solo il markup qui sotto, senza CSS nuovo e senza classi inventate.**
I testi negli esempi servono solo a mostrare la lunghezza giusta: i contenuti veri li dà l'utente.

Il palco è 1600×900. I limiti indicati ("max") sono quelli entro cui il testo sta
nella slide senza rimpicciolirsi: se il contenuto è di più, dividilo in due slide.

## Struttura comune

```html
<section class="slide">
  <p class="kicker">Facoltativo: etichetta sopra il titolo</p>
  <h1>Titolo della slide</h1>              <!-- max ~6 parole, una riga -->
  <p class="sub">Facoltativo: sottotitolo</p> <!-- max ~14 parole -->
  … un solo componente (o due piccoli) …
  <img class="sticker" src="img/meme.png" alt="">   <!-- facoltativo -->
  <aside class="notes">Note per chi presenta (tasto P).</aside>
</section>
```

- Tutto quello che non è `h1`, `.kicker`, `.sub`, `.sticker` o `.notes` finisce in
  un contenitore centrato in verticale sotto il titolo.
- Testo in evidenza: `<mark>parola</mark>` (blu; nei testi grandi come `.lead`, titoli di copertina
  e frasi a effetto diventa il gradiente del brand) e `<b>parola</b>` (scuro, grassetto).
- Testo secondario sotto un componente: `<p class="small">…</p>`. **Solo nella versione
  autoesplicativa:** proiettato non si legge da lontano. A voce quello che non sta nel componente
  va nelle note (`aside.notes`), e `check.py` segnala ogni `p.small` rimasto.
- Elenco puntato semplice: `<ul><li>…</li></ul>` (puntini blu del brand, max 6 voci).
- Paragrafo introduttivo grande: `<p class="lead">…</p>`.
- Card di vetro generica: `<div class="glass">…</div>`; varianti `glass tint`
  (azzurrina, solo per l'unico elemento da evidenziare, come il codice fiscale: mai per contenuti
  normali) e `glass solid` (più opaca: resta bianca anche sopra le forme blu dello sfondo).
- Elementi che vanno insieme (una scheda e il suo QR, un testo e la sua azione) stanno nello
  stesso riquadro, con i bordi sinistri allineati: niente blocchi separati di peso diverso
  impilati uno sotto l'altro.
- `data-footer="off"` sulla section toglie footer e numero.
- Copertina, divisori e chiusura non hanno il numero di pagina; nelle slide con uno sticker
  a destra il numero viene nascosto.

## Icone

`<i data-icon="nome"></i>`: diventa un'icona a linea Lucide. Elenco completo:
`python3 scripts/build.py --list-icons`. Le più utili:

| Tema | Icone |
|---|---|
| Tempo e luoghi | `calendar` `calendar-days` `clock` `hourglass` `map-pin` `map` `route` `milestone` |
| Persone | `users` `users-round` `user` `user-plus` `handshake` `heart-handshake` `graduation-cap` `school` |
| Lavoro e stato | `rocket` `target` `flag` `circle-check` `check` `list-checks` `clipboard-list` `trending-up` `refresh-cw` `triangle-alert` |
| Tecnologia | `monitor` `laptop` `smartphone` `code` `server` `bot` `database` `cloud` `cpu` `network` `lock` `key` |
| Comunicazione | `megaphone` `message-circle` `messages-square` `mail` `send` `bell` `newspaper` `share-2` `link` `qr-code` `globe` |
| Social | `instagram` `linkedin` `brand-telegram` `brand-whatsapp` `brand-discord` `brand-github` |
| Soldi | `euro` `wallet` `piggy-bank` `hand-coins` `receipt` `banknote` `vote` |
| Eventi | `party-popper` `ticket` `music` `camera` `image` `pizza` `beer` `coffee` `utensils` `mic` `gift` `trophy` `award` |
| Idee e design | `lightbulb` `sparkles` `palette` `pen-tool` `layers` `puzzle` `star` `heart` `eye` |

Un nome sbagliato fa fallire `build.py`, che suggerisce i nomi più vicini.

## Immagini

- Metti i file in `img/` accanto al sorgente e usa `src="img/nome.jpg"`. In
  compilazione vengono incorporati nel file finale.
- Se un file non esiste, al suo posto compare un riquadro tratteggiato con il nome
  del file, così si vede cosa manca. Non cancellare i `<img>` per immagini che
  l'utente fornirà dopo.
- Ritaglia e comprimi le foto prima di metterle (sotto 500 KB l'una), con ImageMagick se c'è:
  `magick foto.jpg -crop 960x720+0+300 +repage -quality 86 img/nome.jpg`. Ritaglia sul
  soggetto e nel formato del riquadro che la ospita, non lasciarle in formato originale.
- **Una foto per riquadro.** In `div.split` metti una sola foto orizzontale (4:3, per esempio
  `style="width: 640px; height: 480px"`): due foto verticali strette affiancate sono brutte. Le
  altre foto dello stesso evento vanno in una `div.gallery`. Non serve usarle tutte.
- **Foto di persone:** ogni persona con la foto una volta sola nella presentazione (se i lead
  sono anche nel Direttivo, foto solo in una delle due slide). Una foto di gruppo generica non va
  accanto a un elenco di persone precise: sembra che siano loro.
- **Screenshot di un'app** (nella cornice `.phone`): tema chiaro e la schermata che mostra di più
  (per esempio l'elenco con ricerca e filtri, non il dettaglio). Taglia la barra del browser e
  aggiungi in alto una striscia del colore dell'header, così il notch della cornice non copre
  l'header dell'app:
  `magick shot.jpg -crop 584x1176+0+104 +repage -background "<colore header>" -gravity north -splice 0x56 img/app.jpg`
  (il colore si legge con `magick shot.jpg -format "%[pixel:p{3,120}]" info:`).
- **Progetti e app: più schermate.** Un progetto non si racconta con una schermata sola. Mostrane
  2-4, ognuna con una funzione diversa (elenco, filtri, dettaglio, mappa…): una slide `split`
  con la descrizione e la schermata principale, poi una slide `div.screens` con le altre, oppure
  una slide per funzione, ognuna con la sua schermata. Le schermate di uno stesso progetto
  devono avere lo stesso tema e la stessa larghezza.
- **Inclinazione:** telefono e immagini scontornate stanno meglio un po' storti che dritti:
  `class="phone tilt"`, `class="cutout tilt"` (8°, `tilt-left` per −8°). A destra `tilt`, a
  sinistra (`split media-left`) `tilt-left`, così l'immagine pende sempre verso l'esterno.
  **Eccezione:** un oggetto già in prospettiva o in 3D (il mockup di una scatola, un prodotto
  fotografato di tre quarti, un oggetto appoggiato su un piano) resta dritto, senza `tilt`:
  inclinato sembra che stia cadendo. `tilt` solo per telefoni e oggetti piatti o visti di fronte
  (una lattina, un adesivo, un logo).
- **Lato delle immagini:** alterna `split` e `split media-left` lungo la presentazione, invece di
  mettere tutte le foto a destra. Il telefono a sinistra sale fino al sottotitolo: se la slide ha un
  `.sub` lungo, tienilo a destra e gira un'altra slide.
- **Immagini scontornate** (un prodotto, un oggetto, PNG trasparente) dentro la slide, in
  `.media` con `<img class="cutout tilt" src="img/x.png" alt="">`, non come sticker attaccato al
  bordo. Ritaglia prima i bordi trasparenti: `magick x.png -channel A -fx "u<0.2?0:u" +channel -trim +repage -resize x760 img/x.png`.
- **Sticker** (meme o personaggi scontornati, PNG trasparente): `<img class="sticker" src="img/x.png" alt="">`.
  Solo se l'utente ha detto sì ai meme. In basso a destra, alto 380 px; il contenuto si restringe
  per fargli spazio. Varianti: `sticker left`, `sticker small` (240 px, non sposta il contenuto), `sticker flip` (specchiato, per
  farlo guardare verso il contenuto),
  `sticker edge` (attaccato al bordo laterale, per i lati tagliati, vedi sotto),
  `sticker top`. Al massimo uno per slide, e non in tutte; mai su bilancio, votazioni e 5x1000.
  **Alterna i lati:** più o meno metà `sticker`, metà `sticker left`, mescolati lungo la
  presentazione. `sticker left` sposta il contenuto a destra; `sticker small` non sposta niente,
  quindi a sinistra copre il testo in basso (per esempio un `p.small`): lascialo a destra, a meno
  che l'angolo in basso a sinistra sia vuoto.
  **Lati tagliati:** molti meme sono tagliati dritto in basso e a volte su un fianco. Il taglio
  deve toccare il bordo della slide, mai restare a mezz'aria. Controlla ogni sticker dopo averlo
  copiato in `img/` (valore sopra 0.3 = lato tagliato):
  `for g in east west; do magick img/x.png -gravity $g -crop 1x0+0+0 +repage -format "$g %[fx:mean.a] " info:; done`.
  Taglio sul fianco destro → `sticker edge` (attaccato al bordo destro); sul sinistro → mettilo a
  sinistra con `sticker left edge`, oppure specchialo (`magick img/x.png -flop img/x.png`) e usa
  `sticker edge`. Il taglio in basso è già a posto: lo sticker sta sempre appoggiato al fondo.
- **Meme pronti** in `assets/memes/` (la cartella cresce: guarda cosa c'è con `ls`). Scegli il
  gatto che ha l'espressione giusta per la slide, per esempio: quello che supplica per le richieste
  al pubblico (associati, candidati), quello sorpreso per numeri e risultati, quello imbronciato per
  ritardi, problemi o "Domande?", quello in giacca e cravatta per organizzazione e team. Copialo in
  `img/` ridimensionato, così non appesantisce il file finale:
  `magick "$SKILL_DIR/assets/memes/PleaseCat.png" -channel A -fx "u<0.2?0:u" +channel -trim +repage -resize x760 -colors 256 PNG8:img/sticker-richieste.png`
  (`-fx "u<0.2?0:u"` toglie l'alone quasi invisibile che alcuni scontornati hanno attorno: senza,
  `-trim` non taglia niente e lo sticker resta sospeso con un margine vuoto; con `-colors 256`
  resta sotto i 250 KB invece di 500-700).
  Quelli non scontornati (con lo sfondo) vanno come `sticker small`.

## Tipi di slide

### Copertina: `cover`
```html
<section class="slide cover">
  <div class="brand"><span class="logo"></span>PoliNetwork</div>
  <p class="kicker">Assemblea dei Soci</p>
  <h1>Aggiornamento operativo e piano strategico</h1>   <!-- max ~7 parole -->
  <p class="sub">Facoltativo</p>
  <div class="meta"><span><i data-icon="calendar"></i>28 aprile 2026</span><span><i data-icon="map-pin"></i>Politecnico di Milano</span></div>
</section>
```
L'emblema con il logo negli anelli di vetro viene aggiunto da solo a destra, e sotto il titolo
compare da sola una barra a gradiente. Per evidenziare una parte del titolo (in gradiente blu):
`<h1>Da studenti, <mark>per studenti</mark></h1>`; al massimo 2-3 parole, facoltativo.
Variante solo logo, per aprire o chiudere:
```html
<section class="slide cover brand-only">
  <div class="lockup"><span class="logo"></span>PoliNetwork</div>
</section>
```

### Sezioni, indice, nome in alto

Tre scelte indipendenti, da chiedere all'utente (default: tutte sì nella parlata, solo il nome
in alto nell'autoesplicativa).
- **Divisori:** una slide `.section` apre la sezione. Senza divisori, la sezione la apre la sua
  prima slide: `<section class="slide" data-section="Chi siamo" data-sub="frase su cosa contiene">`.
- **Indice** (`ol.agenda`): ogni voce porta alla sua sezione (al divisore, o alla slide con
  `data-section`) e mostra sotto il sottotitolo (`.sub` del divisore o `data-sub`). Voci in più
  senza sezione, come "Domande", restano non cliccabili.
- **Nome della sezione in alto a destra:** automatico dall'ultima sezione aperta. `crumb: no` nel
  commento in testa al file lo toglie dappertutto; `data-crumb="off"` su una slide lo toglie lì,
  `data-crumb="Altro testo"` lo sostituisce.

### Divisore di sezione: `section`
```html
<section class="slide section">
  <p class="kicker">Parte 2</p>          <!-- facoltativo -->
  <h1>I nostri team</h1>                 <!-- max ~6 parole -->
  <p class="sub">Facoltativo</p>
  <span class="n">02</span>              <!-- facoltativo: numero grande in trasparenza -->
</section>
```
Anche per "Domande?", con uno sticker.

### Chiusura: `thanks`
```html
<section class="slide thanks">
  <h1>Grazie dell'attenzione</h1>
  <ul class="links">
    <li><i data-icon="globe"></i>polinetwork.org</li>
    <li><i data-icon="user-plus"></i>polinet.cc/recruiting</li>
    <li><i data-icon="instagram"></i>@account</li>   <!-- solo se l'utente lo indica -->
  </ul>
  <figure class="qr"><img src="img/qr.png" alt=""><figcaption>Facoltativo</figcaption></figure>
</section>
```

### Frase a effetto
```html
<section class="slide">
  <p class="statement">Più di <mark>20 000 studenti</mark> usano i nostri servizi, ma quasi nessuno sa che sono nostri.</p>
</section>
```
Max ~25 parole. Senza `h1`.

## Componenti di contenuto

### Indice: `ol.agenda`
```html
<ol class="agenda"><li>Chi siamo</li><li>Cosa abbiamo fatto</li>…</ol>
```
Numerato da solo. Fino a 9 voci sono tessere col numero grande (4 o meno su una riga, 5-6 su
tre colonne, 7-9 tessere più compatte su tre colonne; `data-cols` per forzare), oltre diventano
righe su due colonne. Con 7-9 voci togli lo sticker dalla slide dell'indice. Max 10 voci,
max ~5 parole per voce. Ogni tessera riprende da sola il sottotitolo della sua sezione.

### Righe con icona: `ul.irows`
```html
<ul class="irows">
  <li><i data-icon="monitor"></i><p>MVP: homepage, team, matricole</p></li>
  <li><i data-icon="calendar"></i><p><b>Titolo della riga</b><small>dettaglio facoltativo</small></p></li>
</ul>
```
Max 4 righe; max ~12 parole per riga. Buon layout di base, ma non in tutte le slide: mai in due
slide di fila. Per passi numerati c'è `ol.points`, per chi/quando/dove `dl.facts`.

### Card in griglia: `div.cards`
```html
<div class="cards">
  <div><i data-icon="hand-coins"></i><h3>Titolo</h3><p>Una o due frasi.</p></div>
  …
</div>
```
2 o 4 card → 2 colonne; 3, 5, 6 → 3 colonne; 7-8 → 4. Forzare: `data-cols="3"`.
**Stato dei progetti:** una card per progetto con lo stato sotto il nome, ordinate dal più avanti
al più indietro (pill come in `table.status`), più bella e leggibile della tabella quando i
progetti sono 4-6:
`<div><i data-icon="globe"></i><h3>Sito web</h3><span class="pill wip">In corso</span><p>Redesign</p></div>`.
Un nome lungo senza spazi (un dominio) non va a capo: se `check.py` dice "testo più largo della
card", togli lo sticker dalla slide o usa meno colonne.
Max ~20 parole per card. L'icona è facoltativa: sta sulla riga del titolo, accanto a `h3`.
Per persone o voci brevi (per esempio chi guida ogni team) usa un'etichetta sopra al titolo:
`<div><span class="label">IT</span><h3>Nome Cognome<br>Nome Cognome</h3></div>`. I nomi devono
stare su una riga: se vanno a capo, usa meno colonne (2×2 invece di 4 in fila).

### Numeri in evidenza: `div.stats`
```html
<div class="stats">
  <div><b>20 000+</b><span>studenti raggiunti</span></div>
  …
</div>
<p class="small">Facoltativo, solo da leggere: riga di sintesi</p>
```
Parola chiave facoltativa, ben visibile tra numero e descrizione:
`<div><b>150+</b><h3>Admin</h3><span>moderano i gruppi</span></div>`.
2-4 numeri (max 5). Con soli 2 numeri la slide resta vuota: aggiungi un `<p class="lead">`
sopra, oppure usa la nuvola "Chi siamo". I numeri contano fino al valore quando la slide compare;
il testo in `<b>` resta quello scritto (es. "20 000+", "3,8/5", "1000+").

### Nuvola "Chi siamo": `div.cloud`
```html
<div class="cloud">
  <h2>Chi siamo</h2>
  <span class="big">Studenti</span>
  <span><b>20 000+</b>studenti raggiunti</span>
  <span>Open Source</span>
  …
</div>
```
Max 16 parole o numeri attorno al titolo, posizionati da soli. `class="big"` per
2-3 parole chiave. Di solito senza `h1` nella section.

### Prima / Dopo: `div.compare`
```html
<div class="compare">
  <div class="glass"><span class="label">Prima</span><ul><li>…</li></ul></div>
  <div class="glass tint"><span class="label">Dopo</span><ul><li>…</li></ul></div>
</div>
```
Freccia automatica in mezzo. Nel "Dopo" si possono usare etichette:
`<div class="chips"><span>IT</span><span>HR</span>…</div>`. Max 4 punti per lato.

### Tabella di stato: `table.status`
```html
<table class="status glass">
  <tr><td>Nuovo sito web</td><td><span class="pill wip">MVP entro settembre</span></td></tr>
  <tr><td>Instagram<small>dettaglio facoltativo</small></td><td><span class="pill ok">Live</span></td></tr>
</table>
```
Pill: `ok` (fatto / live / pubblicato, verde), `wip` (in corso, blu), `plan`
(da iniziare, grigio), `warn` (in ritardo / da decidere, giallo), `ko` (bloccato /
annullato, rosso). Il pallino della riga prende il colore della pill. Max 7 righe.

### Barre di avanzamento: `div.bars`
```html
<div class="bars glass">
  <div class="bar" data-value="80">IT</div>
  <div class="bar" data-value="40" data-label="4/10">HR</div>
</div>
```
`data-value` da 0 a 100; `data-label` cambia il testo a destra (di default "80%"). Max 7 barre.
Così sono barre di **avanzamento** (quanto manca a 100). Per **confrontare voci tra loro** (una
distribuzione, una classifica: candidature per team, iscritti per corso) metti `data-scale="max"`
sul contenitore: la voce più grande riempie la riga, le altre in proporzione, barre spesse e il
valore in fondo a ogni barra, così si capisce a colpo d'occhio. Ordina le voci dalla più grande:
`<div class="bars glass" data-scale="max">`.

### Grafico a colonne: `div.columns`
```html
<div class="columns glass">
  <div class="col" data-value="5000" data-label="5.000">Scorsa assemblea</div>
  <div class="col" data-value="7500" data-label="7.500" data-from="5000" data-delta="+2.500">Oggi</div>
</div>
```
Per un confronto o una crescita che si deve capire a colpo d'occhio (prima/dopo, anno per anno):
meglio di due o tre numeri in `div.stats`, che vanno letti e confrontati a mente. 2-4 colonne,
alte in proporzione (`data-value` è il numero vero, non una percentuale; si parte da zero). Sopra
ogni colonna `data-label`, sotto il nome (max ~3 parole). `data-from` sull'ultima colonna colora
solo la parte cresciuta rispetto a quel valore, e `data-delta` la scrive accanto. **Solo cifre
date dall'utente.** Per tante voci o percentuali c'è `div.bars`.

Per una crescita sola basta **una colonna**: una seconda colonna con il valore di partenza
ripeterebbe la parte chiara. `data-from-label` scrive il valore di partenza accanto alla parte
chiara. In `data-delta` e `data-from-label` la prima parola è la cifra grande e il resto del
testo va piccolo sotto (max ~4 parole):
```html
<div class="columns glass">
  <div class="col" data-value="7500" data-label="7.500" data-from="5000"
       data-from-label="5.000 alla scorsa assemblea" data-delta="+2.500 in più da allora">Follower oggi</div>
</div>
```

### Crescita: `div.growth`
```html
<div class="split">
  <div class="growth" data-from="5000" data-value="7500">
    <p><b>+2.500</b>follower dalla scorsa assemblea</p>
    <div class="track"><span>5.000<small>scorsa assemblea</small></span><span>7.500<small>oggi</small></span></div>
  </div>
  <div class="media"><div class="phone tilt" style="width: 270px"><img src="img/profilo.jpg" alt=""></div></div>
</div>
```
Per **una crescita sola** raccontata come messaggio principale (follower, iscritti, soci): la
crescita in grande, sotto una barra orizzontale chiara fino al valore di partenza e scura fino a
oggi, con i due valori sotto. Si legge da sinistra a destra: 5.000 + 2.500 = 7.500. Meglio di
`div.columns` quando accanto c'è un'immagine (lo screenshot del profilo, una foto), in uno
`split`, senza `glass` intorno. Il titolo allora non ripete il numero (per esempio solo
"Instagram"). `data-from` e `data-value` sono i numeri veri; il testo delle etichette resta
quello scritto. Le due etichette si sovrappongono se la crescita è meno di un quarto del
totale: in quel caso meglio `div.stats`.

### Timeline: `ol.timeline`
```html
<ol class="timeline">
  <li><span class="when">Ottobre</span><h3>Recruiting</h3><p>Nuovo giro per tutti i team</p></li>
  …
</ol>
```
3-5 tappe; max ~10 parole per `<p>`. Solo se ogni tappa ha una data o un periodo:
per passi senza data usa `ul.irows`.

### Team: panoramica `div.teams`
```html
<div class="teams">
  <div><span class="n">1</span><h3>IT</h3><ul><li>Sviluppo</li><li>Bot</li></ul></div>
  …
  <div class="extra"><span class="n">+1</span><h3>International</h3><ul>…</ul></div>
</div>
```
Max 5 colonne, max 4 voci brevi per team. L'elenco `<ul>` è facoltativo: se l'utente non dà
i compiti, lascia solo numero e nome.
Per mostrare anche chi guida ogni team (al posto di una slide a parte), metti sotto `h3` un blocco
`.lead`, staccato dall'elenco da una linea; max 2 nomi:
`<div><span class="n">1</span><h3>IT</h3><div class="lead"><span class="label">Lead</span><p>Nome Cognome<br>Nome Cognome</p></div><ul>…</ul></div>`.

### Team: dettaglio `div.team` + persone
```html
<div class="team">
  <div class="glass"><span class="label">Di cosa ci occupiamo</span><ul><li>…</li></ul></div>
  <div class="glass people">
    <span class="label">Capi dipartimento</span>
    <figure class="person"><img src="img/nome.jpg" alt=""><figcaption>Nome Cognome<small>ruolo facoltativo</small></figcaption></figure>
    <figure class="person tbd"><img src="" alt=""><figcaption>Da decidere</figcaption></figure>
  </div>
</div>
```
Foto quadrate, ritagliate in cerchio da sole. Max 3 persone.
`div.people` si può usare anche da solo (es. il consiglio direttivo, fino a 6 persone).

### Testo + immagini: `div.split`
```html
<div class="split">
  <div class="glass"><ul><li>…</li></ul></div>
  <div class="media">
    <img src="img/foto-1.jpg" alt="" style="width: 300px; height: 380px">
    <div class="phone"><img src="img/screenshot.png" alt=""></div>
    <figure class="qr"><img src="img/qr.png" alt=""><figcaption>@account</figcaption></figure>
  </div>
</div>
```
Varianti: `split even` (metà e metà), `split media-left` (immagini a sinistra).
In `.media`: foto (`img`, dimensioni con `style` se servono), cornice smartphone
`.phone` (meglio con `tilt`), immagine scontornata `img.cutout`, QR `.qr`. La colonna di testo
deve essere alta circa come l'immagine accanto: se resta bassa, uniscila in un solo riquadro con
quello che le sta sotto. Legenda colorata: `<ul class="legend"><li style="--c: var(--green)">…</li></ul>`
(colori: `--blue`, `--green`, `--red`, `--amber`, `--violet`, `--pn-blue`): solo se i colori
significano qualcosa (stati, categorie), mai come puntini decorativi.

### QR code: `figure.qr` e `.has-qr`
Per ogni link da aprire in sala (un sito, l'iscrizione, il recruiting) proponi un QR. Generalo
con `qrencode -t PNG -s 16 -m 1 -o img/qr-nome.png "https://…"` e prima controlla che il link
risponda (`curl -sI "https://…"`). Se `qrencode` manca, dillo all'utente e lascia il segnaposto.
Niente didascalia sotto il QR e niente URL lunghi nel testo: basta il dominio corto.
Il QR sta nello stesso riquadro del testo a cui si riferisce, affiancato con `.has-qr` (il QR va
dove lo metti, primo o ultimo):
```html
<div class="cards">
  <div class="has-qr"><div><h3>Entra in un team</h3><p>Candidati su polinet.cc/recruiting</p></div>
    <figure class="qr"><img src="img/qr-recruiting.png" alt="QR code per il recruiting"></figure></div>
  …
</div>
<div class="glass">
  <dl class="facts">…</dl>
  <div class="has-qr"><figure class="qr"><img src="img/qr-app.png" alt=""></figure><p class="lead">Provalo e <mark>mandaci feedback</mark></p></div>
</div>
```
Larghezza di default 170 px; se il testo accanto va a capo, stringilo con `style="width: 150px"`.

### Galleria: `div.gallery`
```html
<div class="gallery">
  <figure><img src="img/evento-1.jpg" alt=""><figcaption>Welcome drink · settembre</figcaption></figure>
  …
</div>
```
2-4 foto, didascalia facoltativa.

### Schermate di un'app: `div.screens`
```html
<div class="screens">
  <figure><div class="phone"><img src="img/app-elenco.jpg" alt=""></div><figcaption>Cerca e filtra<small>per orario, prese, capienza</small></figcaption></figure>
  <figure><div class="phone"><img src="img/app-mappa.jpg" alt=""></div><figcaption>Mappa del campus</figcaption></figure>
  …
</div>
```
3-4 telefoni in fila, inclinati da soli a destra e a sinistra, con sotto cosa mostra ogni
schermata (max ~4 parole, `<small>` facoltativo con ~6 parole). Senza altro componente nella
slide, al massimo un `.sub`. Ogni schermata deve mostrare una cosa diversa.
Con **2 schermate** da sole la slide resta vuota ai lati: mettile in un `div.split` al posto di
`.media`, accanto a un `ul.irows` con quello che si vede nelle schermate, senza didascalie:
```html
<div class="split media-left">
  <ul class="irows">…</ul>
  <div class="screens">
    <figure><div class="phone"><img src="img/app-dettaglio.jpg" alt=""></div></figure>
    <figure><div class="phone"><img src="img/app-mappa.jpg" alt=""></div></figure>
  </div>
</div>
```

### Bilancio: `div.budget`
```html
<div class="budget">
  <div class="glass in"><h3>Entrate</h3><dl>
    <dt>Quote associative</dt><dd>1 250 €</dd>
    <dt class="total">Totale</dt><dd class="total">1 250 €</dd>
  </dl></div>
  <div class="glass out"><h3>Uscite</h3><dl>…</dl></div>
  <p class="glass result">Avanzo di gestione <b>310 €</b></p>
  <span class="stamp">Da approvare</span>      <!-- oppure class="stamp ok">Approvato -->
</div>
```
Max 5 voci per colonna. **Usa solo cifre date dall'utente**: mai inventarle o stimarle.

### Votazione: `div.vote`
```html
<div class="vote">
  <button class="yes"><span>Favorevoli</span><b>0</b></button>
  <button class="no"><span>Contrari</span><b>0</b></button>
  <button class="abs"><span>Astenuti</span><b>0</b></button>
</div>
```
Contatori live durante l'assemblea: clic +1, Maiusc+clic −1.

### 5x1000: `div.fivex`
Testo standard in `brand.md`: copialo così com'è. A sinistra i tre passi, a destra il codice
fiscale: scrivi solo le cifre, senza spazi, e il motore le mette da solo in caselle, una per
cifra, come sul modulo della dichiarazione.
```html
<p class="sub">Una quota IRPEF già trattenuta: non è una spesa in più, scegli tu dove va.</p>
<div class="fivex">
  <ul class="irows">
    <li><i data-icon="file-text"></i><p><b>Compila la dichiarazione</b><small>…</small></p></li>
    <li><i data-icon="pen-tool"></i><p><b>Firma nel riquadro</b><small>…</small></p></li>
    <li><i data-icon="hand-coins"></i><p><b>Scrivi il codice fiscale</b><small>…</small></p></li>
  </ul>
  <div class="glass tint code"><span class="label">Il nostro codice fiscale</span><b>97927490157</b><p>…</p></div>
</div>
```

## Versione autoesplicativa (`mode: lettura`)

Con `mode: lettura` nel commento in testa al file tutti i componenti sopra restano validi, con
testo più piccolo e limiti più larghi. In più ci sono i componenti qui sotto. Sticker solo se
l'utente ha voluto i meme: più piccoli (280 px), pochi e solo su slide leggere.
`div.cols`, `ol.points`, `dl.facts` e `p.next` funzionano anche nelle versioni a voce, con testo
più corto: usali per variare i layout.

| Componente | Limite in lettura |
|---|---|
| Titolo `h1` | ~10 parole, una riga e mezza |
| `ul.irows` | 4 righe; `<b>` ~8 parole + `<small>` ~20 parole |
| `div.cards` | 4-6 card, ~35 parole per card |
| `table.status` | 6 righe, con `<small>` di spiegazione |
| `ol.timeline` | 3-4 tappe, ~20 parole per `<p>` |
| Paragrafi in `.cols` | ~50 parole per colonna |

### In breve: `div.summary`
```html
<div class="summary"><span class="label">In breve</span><p>Il sito è online da settembre e ha già 3 000 visite al mese.</p></div>
```
Una o due frasi, in cima alla slide, subito sotto il titolo. Max ~35 parole.
Solo se aggiunge qualcosa: la chiave per leggere un corpo denso (colonne, tabella, bilancio) o
un'informazione che non sta altrove. Se ripete il titolo o le card sotto, toglilo.

### Colonne di spiegazione: `div.cols`
```html
<div class="cols">
  <div><h3><i data-icon="lightbulb"></i>Perché</h3><p>Due o tre frasi.</p></div>
  <div><h3><i data-icon="wrench"></i>Cosa abbiamo fatto</h3><p>…</p></div>
  <div><h3><i data-icon="trending-up"></i>Risultato</h3><p>…</p></div>
</div>
```
2 o 3 colonne; dentro anche più `<p>` o un `<ul>`. Icona nel titolo facoltativa.

### Prossimo passo: `p.next`
```html
<p class="next"><i data-icon="arrow-right"></i><b>Prossimo passo</b>Lancio con l'evento matricole, a settembre.</p>
```
Una riga in fondo alla slide. Altre etichette: "Cosa ti chiediamo", "Scadenza", "Contatto".

### Scheda dei fatti: `dl.facts`
```html
<dl class="facts glass">
  <dt>Quando</dt><dd>6 marzo, 17:00–20:00</dd>
  <dt>Dove</dt><dd>Piazza Leonardo da Vinci</dd>
  <dt>Chi</dt><dd>400+ persone</dd>
</dl>
```
Max 6 righe. Per eventi, iniziative, decisioni. Va bene anche dentro `div.split` accanto alle foto.
Dentro un `div.glass` insieme ad altro (per esempio un `.has-qr`), scrivi `dl.facts` senza
`glass`: il riquadro è quello esterno.

### Punti chiave: `ol.points`
```html
<ol class="points">
  <li><b>Il sito è online</b>Da settembre, con pagine per team e matricole.</li>
  …
</ol>
```
Per la slide "In sintesi": 4-6 punti, numerati da soli, ~20 parole ciascuno. A voce anche per
3-4 passi in sequenza: 3 punti stanno su una riga, 4 su due.

### Glossario: `dl.terms`
```html
<dl class="terms">
  <div><dt>APS</dt><dd>Associazione di Promozione Sociale: la forma giuridica di PoliNetwork.</dd></div>
  …
</dl>
```
Max 8 termini, su due colonne (se sono dispari l'ultimo occupa tutta la riga). Solo sigle e nomi che compaiono
davvero nel documento: definizioni standard da `brand.md`, quelle dei termini interni dall'utente.
Se l'utente chiede un termine che non compare, prima inseriscilo dove serve nel testo.

### Altro in lettura
- **Copertina:** `<p class="intro">…</p>` dopo `.meta`, una o due frasi su cos'è il documento.
- **Indice e divisori:** di default no (vedi "Sezioni, indice, nome in alto").
- **Timeline:** vale la regola di sempre, solo tappe con una data o un periodo.
- **Esito di una votazione:** `div.vote` con i numeri finali e `<span class="stamp ok">Approvato</span>`
  (o `<span class="stamp">Respinto</span>`) dentro il `div.vote`.

## Animazioni

Sono automatiche: ogni elemento dei componenti entra a cascata, i titoli di
copertina/sezione parola per parola, i numeri contano, le barre si riempiono, le icone a linea
si disegnano, i numeri a contorno (divisori, indice) si tracciano e le
foto della galleria fanno uno zoom lento. Con "riduci movimento" del sistema le decorative si spengono.
- `data-anim="pop|left|right|fade|none"` su un elemento cambia l'ingresso.
- `class="reveal"` su un elemento lo fa comparire alla pressione successiva di →
  (es. una `<li>` alla volta). Usalo poco, solo per svelare una risposta o un numero.
- Non aggiungere `@keyframes` o `<style>`: il tema copre tutto.

## Comandi durante la presentazione

→ / Spazio / PagGiù avanti · ← indietro · Home/Fine · **F** schermo intero ·
**O** panoramica di tutte le slide · **P** o **Ctrl+P** finestra presentatore (note, timer, slide
successiva) · **S** stampa / PDF · `#7` nell'URL apre la slide 7 · `?static` senza animazioni.
PDF: tasto S → Salva come PDF, margini "Nessuno", "Grafica di sfondo" (Firefox: "Stampa sfondi") attiva.
