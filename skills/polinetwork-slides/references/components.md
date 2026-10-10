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
- Link nel testo (una fonte, un documento): `<a href="https://…">PDF dello studio</a>` in un
  paragrafo, una voce o un `<small>`. Si vede sottolineato e si clicca anche nel PDF.
- **Rimando a un'altra slide:** `id="fonti"` sulla section di arrivo e
  `<a data-ref="fonti"></a>` dove serve il numero: diventa "12" e porta lì (anche nel PDF). Mai
  scrivere il numero a mano: se si aggiunge o toglie una slide, i numeri scritti a mano sbagliano.
- **Serie di slide uguali** (una per team, progetto, evento): `data-align="top"` sulla
  section fa partire il contenuto subito sotto il titolo, così passando da una all'altra niente
  si sposta.
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
  `sticker top`, `sticker lift` (staccato dal fondo: per i gatti interi, non tagliati in basso,
  che appoggiati al bordo sembrano tagliati). Al massimo uno per slide, e non in tutte; mai su bilancio, votazioni e 5x1000.
  **Alterna i lati:** più o meno metà `sticker`, metà `sticker left`, mescolati lungo la
  presentazione. `sticker left` sposta il contenuto a destra; `sticker small` non sposta niente,
  quindi a sinistra copre il testo in basso (per esempio un `p.small`): lascialo a destra, a meno
  che l'angolo in basso a sinistra sia vuoto.
  **Non deve coprire niente.** `check.py` non segnala uno sticker sopra il testo: guarda lo
  screenshot di ogni slide con uno sticker. `sticker small` copre facilmente la fine delle righe
  larghe (`irows`, `.next`, didascalie di `compare`). Se succede:
  - sticker largo e basso (un muso, un gatto che sbuca) in un angolo: rimpiccioliscilo solo su
    quella slide con `style="height: 180px"`;
  - oppure togli `small`: lo sticker grande fa restringere il contenuto;
  - se la slide è già piena (card con QR e `.next`, per esempio) e restringendo il testo va a capo,
    niente sticker su quella slide.
  **Grandezza:** sulle slide con molto spazio vuoto (chiusura, divisori, "Domande?") usa lo sticker
  grande, non `small`: piccolo in mezzo al vuoto sembra perso.
  **Lati tagliati:** molti meme sono tagliati dritto in basso e a volte su un fianco. Il taglio
  deve toccare il bordo della slide, mai restare a mezz'aria. Controlla ogni sticker dopo averlo
  copiato in `img/` (valore sopra 0.3 = lato tagliato):
  `for g in east west; do magick img/x.png -gravity $g -crop 1x0+0+0 +repage -format "$g %[fx:mean.a] " info:; done; magick img/x.png -gravity south -crop 0x1+0+0 +repage -format "south %[fx:mean.a]\n" info:`.
  Taglio sul fianco destro → `sticker edge` (attaccato al bordo destro); sul sinistro → mettilo a
  sinistra con `sticker left edge`, oppure specchialo (`magick img/x.png -flop img/x.png`) e usa
  `sticker edge`. Il taglio in basso è già a posto: lo sticker sta sempre appoggiato al fondo.
  Taglio in basso e anche sul fianco: le due classi insieme (es. `sticker left edge`), senza `lift`.
  Su un'immagine non scontornata (senza trasparenza) i valori escono tutti 0: non contano.
- **Meme pronti** in `assets/memes/`: scegli dal catalogo `references/memes.md`, che per ogni
  gatto dice cosa esprime e su quali lati è tagliato (la cartella cresce: un file che non è nel
  catalogo, guardalo prima di usarlo). Il gatto deve dire la stessa cosa della slide a colpo
  d'occhio, non per un gioco di parole. Copialo in `img/` ridimensionato, così non appesantisce il
  file finale:
  `magick "$SKILL_DIR/assets/memes/PleaseCat.png" -channel A -fx "u<0.5?0:u" +channel -trim +repage -resize 'x760>' -colors 256 PNG8:img/sticker-richieste.png`
  (`-fx "u<0.5?0:u"` toglie l'alone semitrasparente attorno al gatto. Senza, `-trim` non taglia
  niente e lo sticker resta sospeso con un margine vuoto. La soglia è 0.5 perché `PNG8` rende del
  tutto trasparenti i pixel sotto metà opacità: con una soglia più bassa l'ultima riga del taglio
  in basso diventa trasparente e il gatto resta staccato dal fondo di un pixel. `x760>`
  rimpicciolisce senza ingrandire i meme piccoli, quasi tutti 400 px. Con `-colors 256` resta sotto
  i 250 KB invece di 500-700).
  Quelli non scontornati (con lo sfondo) vanno come `sticker small`.
  Chiama il file in `img/` come l'argomento della slide (`sticker-censimento.png`). Se cambi lo
  sticker di una slide, cancella da `img/` il file che non usi più.

## Tipi di slide

L'inventario completo, con una slide per layout nei due template, è in
[`templates.md`](templates.md). Gli esempi hanno lorem ipsum nello stile finale, non `.todo`.

### Immagine a tutto schermo: `full-image`

```html
<section class="slide full-image" data-footer="off" data-crumb="off">
  <img class="hero-image" src="img/foto.jpg" alt="Descrizione della foto">
  <div class="glass solid image-caption">
    <h1>Titolo breve</h1><p>Una frase che spiega la foto.</p>
  </div>
</section>
```

Immagine 16:9, ritagliata al centro; titolo massimo ~5 parole e didascalia ~15 parole a voce,
~25 in lettura. Il riquadro opaco garantisce contrasto anche sulle foto. Nessun titolo fuori
dal riquadro. La zona importante della foto deve restare sopra o a destra della didascalia.

### Tabella di dati: `table.data-table`

```html
<table class="data-table glass">
  <thead><tr><th scope="col">Voce</th><th scope="col">Periodo</th><th scope="col">Valore</th></tr></thead>
  <tbody><tr><th scope="row">Nome</th><td>Ottobre</td><td>24</td></tr></tbody>
</table>
```

3–4 colonne, 4–5 righe a voce, fino a 6 in lettura. Intestazioni di 1–3 parole, celle di
1–5 parole, ultima colonna numerica allineata a destra. Per progetti e pill di stato usa
`table.status`. Metti unità e periodo nel titolo, nel sottotitolo o nelle intestazioni.

### Statistica singola: `div.metric`

```html
<div class="metric">
  <div><b class="num" data-count>74%</b><span class="label">Periodo o fonte</span></div>
  <div><h2>Cosa misura</h2><p>Una frase che spiega il dato.</p></div>
</div>
```

Un numero protagonista di massimo ~5 caratteri, unità inclusa; a destra titolo di ~3–4 parole
e spiegazione di ~15 parole a voce, ~30 in lettura. Per numeri più lunghi usa `div.stats`
oppure `b.num` in un riquadro. Mantieni fonte e periodo solo se li ha dati l'utente.

### Mockup dispositivi: `device-stage`, `laptop`, `phone`, `tablet`

```html
<!-- MacBook: screenshot 16:10, tagliato prima dell'inserimento -->
<div class="device-stage">
  <div class="laptop"><div class="display"><img src="img/sito.jpg" alt="Il sito"></div></div>
</div>
<!-- MacBook + iPhone: telefono sovrapposto al bordo destro del portatile -->
<div class="device-stage combo">
  <div class="laptop"><div class="display"><img src="img/sito.jpg" alt="Il sito"></div></div>
  <div class="phone"><img src="img/app.jpg" alt="La versione mobile"></div>
</div>
<!-- Solo iPhone, dentro .media oppure .device-stage in uno .split -->
<div class="device-stage"><div class="phone tilt"><img src="img/app.jpg" alt="L'app"></div></div>
<!-- 2 o 3 iPhone: usa duo o trio e uno screenshot diverso per ogni telefono -->
<div class="device-stage duo">
  <div class="phone"><img src="img/elenco.jpg" alt="Elenco"></div>
  <div class="phone"><img src="img/dettaglio.jpg" alt="Dettaglio"></div>
</div>
<!-- iPad orizzontale: screenshot 4:3 -->
<div class="device-stage"><div class="tablet"><img src="img/tablet.jpg" alt="Interfaccia su tablet"></div></div>
```

Palco dispositivi alto 510 px. Non modificare proporzioni o dimensioni con CSS locale.
Telefono: asset 9:19,2, con fascia libera in alto per la Dynamic Island; portatile: 16:10;
tablet: 4:3 orizzontale. Il mockup usa `object-fit: cover`: prepara il ritaglio nella proporzione
indicata per non perdere parti importanti. Le varianti `duo` e `trio` inclinano i telefoni da
sole. In lettura può seguire una `.next` di ~20 parole; per descrivere un solo telefono usa
`split even` con un riquadro di testo accanto. Il tablet serve per siti, dashboard e documenti
consultati in orizzontale: non sceglierlo per un'app disponibile soltanto su smartphone.

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
Una nota in fondo alla copertina (per esempio la fonte dei numeri con l'asterisco):
`<p class="small">* Dal sondaggio ai soci di marzo 2026.</p>`, figlio della section.
Al posto dell'emblema a destra può andare una finestra finta (`div.window`, vedi "Interfacce
finte"), quando l'argomento è un'interfaccia: l'emblema allora non compare, il logo in alto a
sinistra resta.

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
  <h1>I nostri team</h1>                 <!-- max ~6 parole -->
  <p class="sub">Facoltativo: una frase su cosa c'è in questa parte</p>  <!-- max ~14 parole -->
</section>
```
Titolo in basso a sinistra, con davanti il numero della parte a contorno (01, 02…), messo da solo
nell'ordine dei divisori: non scrivere "Parte 2" né il numero. `data-n="off"` sull'`h1` toglie il
numero, `data-n="A"` lo cambia. Anche per "Domande?", con uno sticker a destra: un divisore che non
ha slide di contenuto dopo di sé (prima della chiusura) non prende il numero.

### Chiusura: `thanks`
```html
<section class="slide thanks">
  <h1>Grazie dell'attenzione</h1>
  <ul class="links">
    <li><i data-icon="globe"></i>polinetwork.org</li>
    <li><i data-icon="user-plus"></i>polinet.cc/recruiting</li>
    <li><i data-icon="instagram"></i>@account</li>   <!-- solo se l'utente lo indica -->
    <li><a href="https://github.com/org/repo"><i data-icon="brand-github"></i>github.com/org/repo</a></li>  <!-- link cliccabile, anche nel PDF -->
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
righe su due colonne. Su tre colonne l'ultima riga incompleta occupa da sola tutta la larghezza
(con 5 e 8 voci le ultime due tessere a metà riga ciascuna, con 7 l'ultima per intero). Con 7-9 voci togli lo sticker dalla slide dell'indice. Max 10 voci,
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
2 o 4 card → 2 colonne; 3, 5, 6 → 3 colonne; 7-8 → 4. Forzare: `data-cols="3"`. Fino a 10 card
brevi (un'etichetta, un nome, una parola: i referenti dei team) stanno su due righe con
`data-cols="5"`.
**A gruppi** (per priorità, per tipo, per scadenza): un `<p class="group">` apre ogni fila e le card del gruppo si
dividono la riga (3 card → tre per riga, 2 → metà ciascuna; max 4 per gruppo). `group muted` per i
gruppi meno importanti: intestazione e icone grigie. L'intestazione dice già il gruppo: non
ripeterlo in una pill dentro ogni card.
```html
<div class="cards">
  <p class="group">Entro settembre</p>
  <div><i data-icon="globe"></i><h3>Nuovo sito</h3><p>Una frase.</p><ul class="meta"><li><b>3 su 5</b> pagine pronte</li><li><b>2</b> persone dell'IT</li></ul></div>
  …
  <p class="group muted">Più avanti</p>
  <div>…</div><div>…</div>
</div>
```
`ul.meta` in fondo alla card: una o due righe con il numero in grassetto, allineate tra le card
della stessa fila. Va bene anche senza gruppi.
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
Etichetta facoltativa sopra il numero, per la fonte o il contesto del dato:
`<div><span class="label">Sondaggio 2026*</span><b>74%</b><h3>Usano il bot</h3><span>…</span></div>`
(l'asterisco rimanda alla nota sotto, vedi "Fonti e note").
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
  <div class="glass"><span class="label">Prima</span><h3>Titolo</h3><p>Una frase.</p></div>
  <div class="glass"><span class="label">Dopo</span><h3>Titolo</h3><p>Una frase.</p></div>
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

**Confronto con un riferimento** (noi e la media europea, quest'anno e l'anno scorso): metti
`data-compare="Nome nostro|Nome del riferimento"` sul contenitore e su ogni voce `data-vs` con il
valore di riferimento. Ogni voce ha due barre sulla stessa scala: la nostra in blu, sotto quella di
riferimento più sottile e grigia, ognuna con il suo valore; in alto a destra compare la legenda.
`data-label` e `data-vs-label` cambiano i testi dei valori (per esempio "0,6%").
```html
<div class="bars glass" data-compare="Quest'anno|L'anno scorso">
  <div class="bar" data-value="68" data-vs="52">Usano i gruppi Telegram</div>
  <div class="bar" data-value="41" data-vs="30">Seguono Instagram</div>
  <div class="bar" data-value="0.6" data-vs="1.3" data-label="0,6%" data-vs-label="1,3%">Si candidano nei team</div>
</div>
```
Max 6 voci. Solo cifre date dall'utente o da una fonte che l'utente ha indicato, con la fonte
scritta nella slide.

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

### Icona grande: `figure.bigicon`
```html
<figure class="bigicon"><i data-icon="layout-dashboard"></i>
  <figcaption><span class="label">In futuro</span>Admin dashboard<small>Il censimento sarà lì</small></figcaption></figure>
```
Al posto di una foto o di una card quando non c'è un'immagine da mostrare: l'icona in un cerchio
blu con due anelli, la didascalia sotto. Per esempio come secondo elemento di `div.compare` (la
freccia resta in mezzo) o in `.media` accanto a un riquadro. Meglio di una card con una riga sola.
Al posto dell'icona può esserci un numero grande, `<b class="num" data-count>150+</b>`: in un
`div.compare` usa `bigicon` da tutti e due i lati (numero → icona), mai un riquadro glass da una
parte e niente dall'altra.

### Animazioni sulla slide: `data-fx`
`<section class="slide" data-fx="likes shine">`: cose che si muovono sulla slide mentre la si
guarda, oltre agli ingressi. Uno o più nomi separati da spazi:

| Nome | Cosa fa | Dove usarlo |
| --- | --- | --- |
| `fireworks` | Cinque fuochi bianchi e blu, una volta all'arrivo (~3 s) | Un risultato da festeggiare |
| `confetti` | Coriandoli bianchi e blu che cadono, una volta (~4 s) | Chiusura, un traguardo |
| `network` | Nodi e linee che si muovono piano dietro al contenuto | Copertina, "chi siamo", divisori |
| `code` | Caratteri di codice che scendono tenui dietro al contenuto | Divisore o slide dell'IT |
| `emoji` | Faccine a contorno (felice, triste, occhiali, sorpresa…) che escono dall'alto della foto e salgono fino a uscire dallo schermo, come `likes` | Emozioni, paure, feedback delle persone |
| `likes` | Cuori bianchi e blu che salgono dall'alto del telefono fino a uscire dallo schermo, come i like di una diretta | Social, follower |
| `pizza` | Spicchi di pizza disegnati a contorno blu che spuntano, salgono e svaniscono come i punti di domanda, lontani da scritte e sticker | Quando dopo si va a mangiare (es. "Domande?" con `questions`) |
| `questions` | Punti di domanda bianchi e blu che spuntano attorno al titolo e salgono | "Domande?" |
| `wings` | Ali bianche che battono ai lati dell'immagine: compaiono con lei, ne seguono inclinazione e movimento (con `float` vola) | Red Bull, "ti mette le ali" |
| `snake` | Un verme di luce fa il giro di un riquadro (foto, card) e passa al successivo, su tutti | Hackathon, progetti, una slide "tech" |
| `train` | Le persone delle righe `div.people` (es. 4 sopra, 3 sotto) scivolano su una pista ovale e ci girano sopra piano, a distanze uguali: sempre tutte visibili, mai sovrapposte | Ringraziamenti al Direttivo, a un team |
| `wave` | Le persone di una riga `div.people` salgono e scendono a onda, a turno: la prima e la terza su mentre la seconda giù, poi il contrario | Un gruppo piccolo, 2-4 persone su una riga (il team di un progetto) |
| `float` | Immagini, telefoni e sticker galleggiano piano | Slide con screenshot o foto scontornate |
| `pulse` | Onde che partono dall'icona grande (`bigicon`) e dal QR | Un "in futuro", un "provalo" |
| `flow` | Una luce percorre la timeline dalla prima all'ultima tappa | `ol.timeline` |
| `shine` | Un riflesso passa sulla barra di `div.growth` | Crescita |
| `wiggle` | Lo sticker dondola | Solo versione con meme, e con parsimonia: un gatto fermo spesso è meglio |

Al massimo un effetto "grande" (`fireworks`, `confetti`, `network`, `code`, `emoji`, `likes`, `pizza`, `questions`, `train`) per
slide, e non in tutte: più o meno una slide su cinque, quelle che contano (copertina, risultati,
novità, chiusura). Mai su votazioni, bilancio e 5x1000. Gli
effetti dietro (`network`, `code`) restano tenui per non disturbare la lettura. Tutti si spengono
da soli nel PDF, nell'anteprima del presentatore, in `?check`/`?static` e per chi ha chiesto meno
animazioni nel sistema; gli screenshot di `check.py` quindi non li mostrano.

I numeri in `div.stats`, `b.num`, `div.cloud` e `div.growth` contano sempre fino al valore quando la
slide compare, anche quelli piccoli e gli intervalli ("0–4"); le cifre del codice del 5x1000 girano come
un contatore e si fermano una dopo l'altra.

### Numero grande in un riquadro: `b.num`
In un `glass` accanto a una foto, il numero chiave in grande (conta fino al valore come in
`div.stats`) dà al riquadro lo stesso peso della foto:
`<p class="lead"><b class="num" data-count>1.800+</b>iscrizioni</p>`.
La parola dopo il numero sta accanto, in piccolo, sulla stessa riga; poi 2-3 punti brevi.

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

### Persone: `div.people` da solo

Per una griglia di quattro persone usa `div.people.roster`: quattro colonne uguali e foto
da 240 px. Nomi di ~2–3 parole e un ruolo breve sotto. Per più persone usa le righe standard
qui sotto, senza `roster`, così si conserva lo spazio per nomi e ruoli.
Per presentare un gruppo di persone (il consiglio direttivo, il team del progetto, chi ha
lavorato a un evento) le persone stanno da sole sulla slide, **senza riquadro `glass`**: le foto
in cerchio sono già il contenuto. Con `data-fx="train"` sulla slide, dopo l'ingresso girano piano
su una pista ovale (vedi "Animazioni sulla slide"); nel PDF e in `?static` restano ferme in riga.
```html
<section class="slide" data-fx="train">
  <h1>Il Consiglio Direttivo</h1>
  <div class="people">
    <figure class="person"><img src="img/nome-cognome.jpg" alt=""><figcaption>Nome Cognome<small>ruolo facoltativo</small></figcaption></figure>
    …
  </div>
  <div class="people">…</div>   <!-- facoltativa: seconda riga -->
</section>
```
Una riga fino a 6 persone, oppure due righe (per esempio 4 sopra e 3 sotto). Con 2 o 3 persone
su una riga sola le foto e i nomi diventano grandi da soli, così la slide non resta vuota.
Quale animazione:
- **`train`** con due righe o con 5 persone e più: la pista ovale si riempie e il giro si capisce;
- **`wave`** con una riga sola di 2-4 persone (per esempio i tre membri di un gruppo di lavoro): su
  una pista con così poche persone le si vede solo girare in tondo, l'onda invece le lascia al loro
  posto.

Valgono anche nella versione autoesplicativa quando si presenta un gruppo.

### Testo + immagini: `div.split`
```html
<div class="split">
  <div class="cards" data-cols="1">
    <div><i data-icon="layers"></i><h3>Primo punto</h3><p>Una frase.</p></div>
    …
  </div>
  <div class="media">
    <img src="img/foto-1.jpg" alt="" style="width: 640px; height: 480px">
    <div class="phone"><img src="img/screenshot.png" alt=""></div>
    <figure class="qr"><img src="img/qr.png" alt=""><figcaption>@account</figcaption></figure>
  </div>
</div>
```
Varianti: `split even` (metà e metà), `split media-left` (immagini a sinistra), `split fit` (la
colonna dell'immagine è larga quanto l'immagine: per una foto verticale o un documento
`figure.sheet` accanto a 3-6 card; si combina con `media-left`).
Con `split fit` le card diventano alte quanto l'immagine, con righe tutte uguali; senza `fit`
restano alte quanto il loro contenuto.
**Mai un elenco puntato da solo dentro un riquadro** (`div.glass` con dentro solo `<ul>`): ogni
punto diventa una card, in `div.cards` con `data-cols="1"` (2-3 punti, una sotto l'altra) o
`data-cols="2"` (4 punti, 2×2; con un'etichetta sopra il titolo se ogni punto ha una data o un
contesto). Il titolo della card è la parte in grassetto del punto, il testo il resto. Un solo
riquadro `glass` va bene quando contiene altro: un testo unico, una spiegazione, un numero grande
con due righe sotto, una scheda `dl.facts`.
**Rinomine (vecchio → nuovo):** non una tabella con le pill, ma una card per voce con il nome
nuovo come titolo e il vecchio in piccolo sotto (`<p>Era: …</p>`); quello che sparisce va in una
riga a parte sotto le card (`p.next`), non in una pill rossa.
Le etichette delle card di una stessa slide sono dello stesso tipo: tutte date, tutte luoghi o
tutte categorie, non mescolate. Eccezione utile: per cose già fatte il luogo o il contesto, per
quelle future la data. L'anno comune a tutte va nel sottotitolo, non ripetuto nei titoli.
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
Da solo sotto un altro elemento (per esempio una timeline: "provalo") va in un riquadro proprio,
`<div class="glass has-qr">`, che resta largo quanto il contenuto e centrato. In alternativa, se il QR non si riferisce a un riquadro preciso (per esempio "provalo" su una slide con una
timeline), mettilo in alto a destra all'altezza del titolo, con un invito di una parola sotto:
`<figure class="qr corner"><img src="img/qr-app.png" alt="QR code per …"><figcaption>Provalo!</figcaption></figure>`
come figlio diretto della `section`. Il titolo deve stare a sinistra senza arrivare fin lì.

### Galleria: `div.gallery`
```html
<div class="gallery">
  <figure><img src="img/evento-1.jpg" alt=""><figcaption>Welcome drink, settembre</figcaption></figure>
  …
</div>
```
2-4 foto, didascalia facoltativa.

Con 4 foto in fila i riquadri diventano strisce strette: per foto di gruppo usa il mosaico,
`<div class="gallery mosaic">`. La prima foto va grande a sinistra (orizzontale, circa 3:2: è
quella che si vede di più), la seconda e la terza piccole e quasi quadrate in alto a destra, la
quarta larga sotto (circa 2:1, ritagliata al centro). Esattamente 4 foto. Se le foto vengono da
eventi diversi, la didascalia dice quale.
Per 6-8 foto dello stesso momento, tutte uguali e dritte: `<div class="gallery grid">` (vedi "Foto in
griglia e riquadro riassuntivo").

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

## Persone, documenti, collegamenti

Componenti per raccontare chi ha detto cosa, mostrare la cosa vera invece di descriverla e far
vedere come le cose sono collegate. Valgono in tutte e due le versioni.

### Citazione con chi la dice: `div.quote`
```html
<div class="quote">
  <img src="img/nome.jpg" alt="Nome">              <!-- oppure <i data-icon="user"></i> -->
  <p class="who"><b>Nome</b>Ruolo, in poche parole</p>
  <blockquote>«La frase, con le sue parole»</blockquote>
  <p class="note">Facoltativo: dove e quando l'ha detto</p>
</div>
```
Per una testimonianza, il feedback di un socio o di una matricola, la frase di un ospite. La foto
è tonda; chi non si mostra ha l'icona `user` in un cerchio e un'etichetta generica al posto del
nome ("Una matricola"). Max ~45 parole nella frase. `quote big` per una frase sola che regge mezza
slide (max ~15 parole): accanto a un `ul.panel` in `split even`, con sotto un `<p>` di contesto
(a che domanda rispondeva). Sopra un `div.cols` o un `div.cards` diventa l'attacco di una slide su
una persona.

### Scheda di una persona: `div.profile`
```html
<div class="profile">
  <div class="photos">
    <figure><img src="img/ospite.jpg" alt="Nome"><figcaption>Il talk del 6 marzo</figcaption></figure>
    <span class="label">Con lei sul palco</span>                               <!-- facoltativo -->
    <figure class="small"><img src="img/a.jpg" alt="Nome"><figcaption>Modera<b>Nome</b></figcaption></figure>
    <figure class="small"><img src="img/b.jpg" alt="Nome"><figcaption>Presenta<b>Nome</b></figcaption></figure>
  </div>
  <div class="glass">
    <span class="label">Ospite della serata</span>
    <h2>Ricercatrice in robotica</h2>
    <p>Chi è e cosa fa, in una o due frasi.</p>
    <blockquote>«Una sua frase che la racconta»</blockquote>
    <span class="label">Con PoliNetwork</span><p>Una frase.</p>             <!-- facoltativo -->
    <p class="note"><i data-icon="clock"></i>Talk di 40 minuti, con le domande del pubblico.</p>
  </div>
</div>
```
Per presentare **una** persona importante per il racconto (un ospite, un relatore, il nuovo
presidente) meglio di una `dl.facts`: foto grande a sinistra (2:1), chi è a destra. Le foto
piccole sono facoltative (chi c'era con lei). Max ~80 parole nel riquadro.

### Un documento vero: `figure.sheet`
```html
<div class="split fit media-left">
  <div class="cards" data-cols="1">…3 card…</div>
  <figure class="sheet"><img src="img/statuto-p1.jpg" alt="Prima pagina dello statuto"><figcaption>Lo statuto in vigore</figcaption></figure>
</div>
```
Quando la slide parla di un documento (statuto, regolamento, verbale, volantino), mostrane la
pagina invece di descriverla: un foglio appoggiato e un po' storto, largo 380 px, con la
didascalia sotto. `sheet straight` (dritto, angoli arrotondati) per un **estratto** da leggere,
con le parti importanti evidenziate nell'immagine, più largo (`style="width: 560px"`), accanto a
card su due colonne che spiegano le parti evidenziate. La pagina si ricava dal PDF con
`pdftoppm -f 1 -l 1 -r 110 -jpeg doc.pdf img/doc` (poi ritaglia i margini bianchi).

### Foto in griglia e riquadro riassuntivo: `.gallery.grid` e `div.recap`
```html
<div class="split">
  <div class="recap">
    <p class="lead"><b class="num" data-count>400+</b>persone al Welcome Day</p>
    <p><i data-icon="calendar"></i>26 settembre, Campus Leonardo</p>
    <p><i data-icon="clock"></i>Dalle 17 alle 22</p>
    <ol>
      <li><i data-icon="ticket"></i>Accoglienza ai banchetti</li>
      <li><i data-icon="mic"></i>Presentazione dei team</li>
      <li><i data-icon="pizza"></i>Aperitivo</li>
    </ol>
  </div>
  <div class="gallery grid">
    <figure><img src="img/welcome-1.jpg" alt=""></figure>
    …
  </div>
</div>
```
Un'attività raccontata con le sue foto (un evento, un workshop, un hackathon): a sinistra il
riquadro con il numero, quando e dove (1-2 righe con icona) e i momenti in ordine (3-4, una
riga ciascuno); a destra le foto tutte uguali e dritte in una griglia regolare: 4 → 2×2, 6 → 3×2,
8 → 4×2. Metti le foto nell'ordine dei momenti. Il riquadro può stare anche a destra (ultimo).
`.gallery.grid` va bene anche da sola, per 6-8 foto di un evento.

### Punti in un pannello: `ul.panel`
```html
<ul class="panel">
  <li><i data-icon="triangle-alert"></i><b>Titolo del punto</b><p>Una frase che lo spiega.</p></li>
  …
</ul>
```
3-4 punti, ognuno con un titolo (~5 parole) e una frase (~20 parole), in un riquadro solo e
separati da un filo. È il modo giusto di mettere più punti in un riquadro: accanto a una
citazione (`quote big`), a un'immagine o a un numero, dove quattro card separate sarebbero troppo
pesanti. Da solo nella slide meglio `div.cards`.

### Interfacce finte: `div.window`, `div.banner`
Quando la slide parla di un'interfaccia (la schermata per entrare in un gruppo, un avviso del sito,
il messaggio di un bot), ricostruiscila in HTML invece di descriverla: si anima come se qualcuno
la usasse (il testo scorre, la casella si spunta, il pulsante viene premuto, i numeri compaiono).
Nel PDF e in `?static` è già ferma nello stato finale.
```html
<div class="window" aria-hidden="true">
  <p class="bar">Regolamento dei gruppi</p>
  <div class="scroll">
    <p><b>1. Rispetto.</b> Testo lungo che scorre…</p>
    …
    <p><b>5. Annunci.</b> <mark class="flash">La regola da notare</mark></p>
    <p>…</p>
  </div>
  <div class="actions">
    <p class="check">Ho <del>letto</del> e accetto il regolamento</p>
    <span class="btn primary">Entra nel gruppo</span>
  </div>
  <div class="callout"><b>20 000+</b>studenti nei gruppi</div>
  <div class="callout light"><b>150+</b>admin che li moderano</div>
</div>
```
- `.scroll`: 5-8 paragrafi brevi; il testo scorre e si ferma con il `mark.flash` al centro, che
  poi si evidenzia. Senza `mark.flash` si ferma sull'ultimo paragrafo.
- `p.check` diventa una casella che si spunta; `<del>` cancella una parola con un tratto.
- `.btn` (contorno) e `.btn primary` (pieno); `.btn click`: arriva un puntatore e lo preme.
- `.callout` (scuro, in alto a destra) e `.callout light` (chiaro, in basso a destra): al massimo
  due numeri appoggiati alla finestra.
- Al posto di `.scroll` e `.actions` va bene anche un `<p class="body">` di testo normale.

In copertina, figlia della section, la finestra sta a destra al posto dell'emblema (il logo
PoliNetwork resta in alto a sinistra). Nelle altre slide va in `.media` o in uno `split`. Il
banner, una riga in fondo a un altro componente:
```html
<div class="banner" aria-hidden="true">
  <p><b>Novità:</b> il bot ti ricorda le scadenze degli appelli.</p>
  <span class="btn">Più tardi</span><span class="btn primary click">Attiva</span>
</div>
```
Una per presentazione, due al massimo: è un effetto che funziona perché è raro. Il testo della
finestra può essere un esempio (le righe di un regolamento tipo): numeri e fatti sono sempre quelli
dell'utente. `aria-hidden="true"`: è un'illustrazione, non contenuto da leggere ad alta voce.

### Mappa a colonne: `div.map`
```html
<div class="map">
  <div class="col">
    <h4>Chi</h4>
    <div class="node" data-id="matricole" data-to="orientarsi materiali"><i data-icon="graduation-cap"></i><span class="label">Matricole</span><b>Appena arrivate</b><small>primo anno</small></div>
    …
  </div>
  <div class="col fill">
    <h4>Cosa serve</h4>
    <div class="node" data-id="orientarsi" data-track="1" data-to="guida"><b>Orientarsi al Poli</b></div>
    …
  </div>
  <div class="col">
    <h4>Come</h4>
    <div class="node" data-id="guida" data-track="1" data-to="inserirsi"><b>Guida matricole</b></div>
    …
  </div>
  …
</div>
```
Colonne di riquadri collegati da frecce, per far vedere come le cose si collegano: persone →
bisogni → servizi → obiettivi, problemi → progetti → risultati, team → attività. Le frecce le
disegna il motore: ogni riquadro ha un `data-id` (una parola, unica nella mappa) e in `data-to`
gli id dei riquadri della colonna dopo a cui porta. Si disegnano colonna per colonna, poi una
luce le percorre. `data-track="1"`…`"4"` dà a un riquadro e alle sue frecce il colore di un filone
(blu, verde acqua, viola, grigio): nella colonna `fill` i riquadri sono pieni del loro colore,
nelle altre hanno una barra del colore a sinistra. Riquadri: icona e `.label` facoltative, `<b>`
max ~5 parole, `<small>` facoltativo. 3-4 colonne, max ~8 riquadri per colonna, `h4` di una o
due parole. `check.py` segnala i `data-to` che non trovano il loro `data-id`; guarda lo screenshot:
se le frecce si incrociano troppo, riordina i riquadri.

### Percorso a serpente: `ol.road`
```html
<ol class="road">
  <li><h3>Raccogliere le idee</h3><p>Un form aperto a tutti i soci.</p></li>
  …
</ol>
```
4-6 passi in sequenza, senza date (i prossimi passi di un progetto, le fasi di un lavoro): una
strada che va da sinistra a destra, curva e torna indietro, con i passi numerati sopra. Con un
numero dispari di passi la seconda fila è sfalsata di mezzo passo. Titolo ~3 parole, frase ~8
parole. La strada si disegna e i passi compaiono quando la strada li raggiunge. Con le date
meglio `ol.timeline`.

### Fonti e note
Un dato che viene da un'altra fonte (un sondaggio, uno studio, un report) porta un asterisco
(nell'etichetta o nel testo: "Sondaggio 2026*") e sotto il componente una nota: `<p class="small">*
Riferimenti completi nella slide <a data-ref="fonti"></a>, «Fonti».</p>` (solo nella versione da
leggere; a voce la fonte va nelle note). In fondo una slide `id="fonti"` con una riga per fonte:
```html
<section class="slide" id="fonti" data-crumb="off">
  <h1>Fonti</h1>
  <ul class="irows">
    <li><i data-icon="book-open"></i><p><b>Autore o ente (anno)</b><small><i>Titolo</i>. Cosa misura, in una frase.<br><a href="https://…">PDF del report</a></small></p></li>
  </ul>
</section>
```
Solo fonti date dall'utente, con il link che ha dato o verificato (`curl -sI`).

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
un'informazione che non sta altrove. Se ripete il titolo o le card sotto, toglilo. Spesso la stessa cosa la dice meglio un componente: la frase di chi l'ha detta
(`div.quote`), un numero (`b.num`), il documento vero (`figure.sheet`).

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
Una riga in fondo alla slide. Altre etichette: "Cosa ti chiediamo", "Scadenza", "Contatto". Anche
senza etichetta, con `lightbulb`, per la conclusione di una slide ("cosa ne ricaviamo"). Due `p.next`
uno sotto l'altro vanno bene per due informazioni di contorno diverse (come sono stati scelti i
partecipanti, quali materiali).

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
PDF: tasto S da Chrome/Edge/Brave → Salva come PDF, margini "Nessuno", "Grafica di sfondo" (Firefox: "Stampa sfondi") attiva. Per controllarlo: `check.py --pdf` (vedi il punto 5 di SKILL.md).
