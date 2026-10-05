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
- Testo in evidenza: `<mark>parola</mark>` (blu) e `<b>parola</b>` (scuro, grassetto).
- Testo secondario sotto un componente: `<p class="small">…</p>`.
- Elenco puntato semplice: `<ul><li>…</li></ul>` (puntini blu del brand, max 6 voci).
- Paragrafo introduttivo grande: `<p class="lead">…</p>`.
- Card di vetro generica: `<div class="glass">…</div>`; varianti `glass tint`
  (azzurrina, per evidenziare) e `glass solid` (più opaca, per testo lungo).
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
- Ritaglia e comprimi le foto prima di metterle (sotto 500 KB l'una).
- **Sticker** (meme o personaggi scontornati, PNG trasparente): `<img class="sticker" src="img/x.png" alt="">`.
  In basso a destra, alto 380 px; il contenuto si restringe per fargli spazio.
  Varianti: `sticker left`, `sticker small` (240 px, non sposta il contenuto), `sticker top`.
  Al massimo uno per slide, e non in tutte.

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

Tre scelte indipendenti, da chiedere all'utente (default: tutte sì in breve e lunga, solo il nome
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

### Righe con icona: `ul.irows` (il layout più usato)
```html
<ul class="irows">
  <li><i data-icon="monitor"></i><p>MVP: homepage, team, matricole</p></li>
  <li><i data-icon="calendar"></i><p><b>Titolo della riga</b><small>dettaglio facoltativo</small></p></li>
</ul>
```
Max 4 righe; max ~12 parole per riga. Per cosa abbiamo fatto, cosa stiamo facendo,
prossimi passi o dettagli di un evento (dove, quando, cosa).

### Card in griglia: `div.cards`
```html
<div class="cards">
  <div><i data-icon="hand-coins"></i><h3>Titolo</h3><p>Una o due frasi.</p></div>
  …
</div>
```
2 o 4 card → 2 colonne; 3, 5, 6 → 3 colonne; 7-8 → 4. Forzare: `data-cols="3"`.
Max ~20 parole per card. L'icona è facoltativa.

### Numeri in evidenza: `div.stats`
```html
<div class="stats">
  <div><b>20 000+</b><span>studenti raggiunti</span></div>
  …
</div>
<p class="small">Facoltativo: riga di sintesi</p>
```
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
`.phone`, QR `.qr`. Legenda colorata: `<ul class="legend"><li style="--c: var(--green)">…</li></ul>`
(colori: `--blue`, `--green`, `--red`, `--amber`, `--violet`, `--pn-blue`).

### Galleria: `div.gallery`
```html
<div class="gallery">
  <figure><img src="img/evento-1.jpg" alt=""><figcaption>Welcome drink · settembre</figcaption></figure>
  …
</div>
```
2-4 foto, didascalia facoltativa.

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
Testo standard in `brand.md`. Struttura:
```html
<div class="fivex">
  <div class="glass"><h3>Cos'è?</h3><p>…</p><h3>Come farlo?</h3><p>…</p></div>
  <div class="glass tint code"><span class="label">Il nostro codice fiscale</span><b>97927490157</b><p>…</p></div>
</div>
```

## Versione autoesplicativa (`mode: lettura`)

Con `mode: lettura` nel commento in testa al file tutti i componenti sopra restano validi, con
testo più piccolo e limiti più larghi. In più ci sono i componenti qui sotto. Niente sticker.

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

### Punti chiave: `ol.points`
```html
<ol class="points">
  <li><b>Il sito è online</b>Da settembre, con pagine per team e matricole.</li>
  …
</ol>
```
Per la slide "In sintesi": 4-6 punti, numerati da soli, ~20 parole ciascuno.

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
