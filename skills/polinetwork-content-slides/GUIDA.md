# Guida: installare e usare PoliNetwork Content Slides

PoliNetwork Content Slides è una **skill**: un pacchetto di istruzioni che insegna a Claude o a
Codex a preparare i **contenuti** di una presentazione PoliNetwork. Si installa **una volta sola**;
da quel momento basta chiedere "prepariamo i contenuti per l'assemblea" e l'assistente sa cosa fare.

Il risultato è un file `.md` con solo il contenuto (argomenti, testi, numeri), già nel formato che
legge [PoliNetwork Slides](../polinetwork-slides/GUIDA.md), la skill che fa le slide. Le due
skill lavorano in coppia:

1. **Content Slides** decide **cosa** dire: ti fa le domande giuste, propone l'ordine degli
   argomenti, controlla cosa si può mostrare al pubblico e scrive il file `.md`;
2. **Slides** decide **come** mostrarlo: prende il file `.md` e crea la presentazione `.html`.

Conviene installarle tutte e due. Content Slides funziona anche da sola, se ti serve solo il testo.

Scegli la sezione che corrisponde allo strumento che usi:

| Usi… | Vai a |
|---|---|
| Claude nel browser (claude.ai) o nell'app Claude per computer | [1. Claude (app e sito)](#1-claude-app-e-sito) |
| Claude Code (terminale, VS Code, scheda Code dell'app) | [2. Claude Code](#2-claude-code) |
| Codex (terminale, app, VS Code) | [3. Codex](#3-codex) |

---

## 1. Claude (app e sito)

**Serve:** un account Claude, anche gratuito, e il file `polinetwork-content-slides.zip`.

### Installazione

1. Apri [claude.ai](https://claude.ai) (oppure l'app Claude) e vai in **Settings → Capabilities**.
   Attiva **Code execution and file creation**: senza questa opzione le skill non funzionano.
2. Vai in **Customize → Skills**.
3. Premi **+**, poi **+ Create skill** → **Upload a skill**.
4. Scegli il file `polinetwork-content-slides.zip` (non serve estrarlo).
5. La skill compare nell'elenco: controlla che l'interruttore sia acceso.

Ripeti gli stessi passi con `polinetwork-slides.zip` se vuoi anche le slide.

Sui piani **Team ed Enterprise** chi l'ha caricata può condividerla con i colleghi o con tutta
l'organizzazione: gli altri la trovano già in **Customize → Skills** e non devono caricarla.

### Uso

Apri una nuova chat e chiedi, per esempio:

> Prepariamo i contenuti per l'assemblea dei soci del 15 novembre. Ti allego l'ordine del giorno.

Allega ODG, appunti, una bozza, lo statuto o i regolamenti: Claude li usa come fonte e per
controllare i vincoli formali. Alla fine ti dà il file `.md` da scaricare (vedi
[4. Come funziona](#4-come-funziona-una-volta-installata)).

---

## 2. Claude Code

**Serve:** [Claude Code](https://code.claude.com) installato e Git.

### Installazione

Apri il terminale ed esegui:

```bash
git clone https://github.com/PoliNetworkOrg/skills ~/polinetwork-skills
mkdir -p ~/.claude/skills
ln -s ~/polinetwork-skills/skills/polinetwork-content-slides ~/.claude/skills/polinetwork-content-slides
```

Se hai già clonato la repo per PoliNetwork Slides, basta l'ultima riga.

Su **Windows** (PowerShell), al posto delle ultime due righe:

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills"
Copy-Item -Recurse "$HOME\polinetwork-skills\skills\polinetwork-content-slides" "$HOME\.claude\skills\polinetwork-content-slides"
```

Su Windows la cartella è una copia: dopo ogni aggiornamento va ricopiata.

In alternativa, se hai Node.js, installala con un solo comando (senza clonare la repo), anche
insieme alla skill delle slide:

```bash
npx skills add PoliNetworkOrg/skills --skill polinetwork-content-slides polinetwork-slides -a claude-code -g
```

Se usi già la skill su claude.ai con lo stesso account, l'app desktop di Claude Code può
caricarla anche da lì.

### Uso

Apri Claude Code nella cartella dove vuoi salvare i contenuti (la stessa dove poi farai le slide),
per esempio:

```bash
mkdir -p ~/assemblee/2026-11 && cd ~/assemblee/2026-11
claude
```

Poi scrivi la richiesta in linguaggio normale:

> Prepariamo i contenuti per l'assemblea dei soci del 15 novembre. L'ODG è in odg.md.

Oppure richiama la skill per nome con `/polinetwork-content-slides`, seguito dalla richiesta.

### Aggiornare

```bash
cd ~/polinetwork-skills && git pull
```

Se l'hai installata con `npx skills`: `npx skills update polinetwork-content-slides`.

---

## 3. Codex

**Serve:** [Codex](https://developers.openai.com/codex) installato.

### Installazione (metodo semplice)

Apri Codex e scrivi:

> $skill-installer installa la skill da https://github.com/PoliNetworkOrg/skills/tree/main/skills/polinetwork-content-slides

Poi chiudi e riapri Codex.

### Installazione (con Git, per aggiornarla con un comando)

```bash
git clone https://github.com/PoliNetworkOrg/skills ~/polinetwork-skills
mkdir -p ~/.agents/skills
ln -s ~/polinetwork-skills/skills/polinetwork-content-slides ~/.agents/skills/polinetwork-content-slides
```

Con Node.js, in alternativa: `npx skills add PoliNetworkOrg/skills --skill polinetwork-content-slides -a codex -g`.

Su Windows copia la cartella in `%USERPROFILE%\.agents\skills\polinetwork-content-slides`, come
per Claude Code. Poi chiudi e riapri Codex.

### Uso

Apri Codex nella cartella dove vuoi salvare i contenuti e scrivi la richiesta in linguaggio
normale:

> Prepariamo i contenuti per il General Meeting del 12 ottobre, in inglese. Gli appunti sono in note.md.

Oppure richiama la skill per nome con `$polinetwork-content-slides`, seguito dalla richiesta.

### Aggiornare

Con Git: `cd ~/polinetwork-skills && git pull`. Con `npx skills`: `npx skills update polinetwork-content-slides`. Con `$skill-installer`: cancella la cartella
`~/.codex/skills/polinetwork-content-slides` e reinstalla.

---

## 4. Come funziona, una volta installata

### Da cosa puoi partire

- **Un ordine del giorno o appunti sparsi:** l'assistente costruisce i contenuti con te, un
  argomento alla volta.
- **Una bozza già scritta** (anche un file fatto prima con questa skill): l'assistente la rivede,
  trova i buchi, propone un ordine migliore e segnala i rischi.

### Cosa ti chiede l'assistente

Tutto in un solo messaggio, con le domande numerate, e solo quello che non sa già:

1. **Si presenta a voce o si legge?** A voce: qualcuno la proietta e ci parla sopra, quindi
   bastano i punti essenziali. Da leggere: si manda a chi non c'era, quindi ogni parte deve
   capirsi da sola, con frasi complete, una sintesi iniziale, il glossario delle sigle e i
   contatti.
2. **Quanto densa?** Essenziale (aggiornamento veloce) o completa (assemblea intera, con contesto
   e risultati per ogni argomento).
3. **Lingua:** italiano o inglese.
4. **Occasione:** che incontro è, data e luogo.
5. **Chi la vedrà:** interni, nuovi membri, esterni. E se il materiale circolerà dopo.
6. **Cosa deve ottenere:** informare, far decidere, convincere, reclutare. Se si vota qualcosa.
7. **Se c'è un obiettivo non scritto**, per esempio preparare il terreno per una decisione futura.

Le prime quattro risposte finiscono nel file: PoliNetwork Slides le legge da lì e non te le
richiede.

### Cosa fa con le tue risposte

- **Propone, non decide:** argomenti che mancano, un ordine migliore, temi da accorpare. Ogni
  proposta è spiegata in una riga e decidi tu.
- **Ti fa le domande sui contenuti**, raggruppate per area o per persona, così puoi girarle
  direttamente a chi sa la risposta. Rispondi anche a pezzi, con "3: …", "7: …".
- **Protegge quello che il pubblico non deve vedere:** conteggi delicati diventano percentuali,
  trattative non ufficiali e dati economici restano fuori se non vuoi mostrarli.
- **Controlla i regolamenti**, se li alleghi: preavvisi, ordine dei punti, cosa si può votare. Te
  lo dice in chat, non lo mette nel file.

**I contenuti li decidi tu.** L'assistente riordina e riformula, ma non inventa numeri, nomi o
argomenti. Se un dato manca te lo chiede; se non ce l'hai ancora ma vuoi tenere il punto, di'
"lascialo da completare": nel file diventa `[da completare: …]` e nelle slide un segnaposto
evidenziato.

### Il file che ottieni

Un file come `assemblea-2026-11-15-contenuti.md`, con:
- in testa, le risposte alle domande (a voce o da leggere, densità, lingua, occasione);
- l'ordine del giorno, poi un capitolo per ogni punto, con una frase che dice cosa contiene;
- solo contenuto: niente note per chi parla, niente orari, niente indicazioni su immagini o
  layout.

Sotto il file, in chat, l'assistente elenca solo quello che resta da verificare, cosa ha omesso
perché mancava e le note formali. Per cambiare qualcosa, chiedilo nella stessa chat: il file viene
aggiornato e riconsegnato intero.

### Dal file alle slide

Con PoliNetwork Slides installata, nella stessa chat o in una nuova (nella stessa cartella, se usi
Claude Code o Codex):

> Fai la presentazione da assemblea-2026-11-15-contenuti.md.

Su claude.ai, se apri una nuova chat, allega di nuovo il file `.md`. L'assistente delle slide
legge il file e ti chiede solo immagini, sticker e struttura (indice, divisori di sezione). Il
resto è nella [guida di PoliNetwork Slides](../polinetwork-slides/GUIDA.md#4-come-funziona-una-volta-installata).

---

## 5. Problemi comuni

| Problema | Soluzione |
|---|---|
| L'assistente non usa la skill | Richiamala per nome: `/polinetwork-content-slides` in Claude Code, `$polinetwork-content-slides` in Codex. Su claude.ai controlla che sia accesa in Customize → Skills. Dopo l'installazione riavvia Claude Code o Codex. |
| Su claude.ai la skill non compare o non parte | Controlla che **Code execution and file creation** sia attivo in Settings → Capabilities. |
| Parte la skill delle slide invece di questa | Di' esplicitamente "prima prepariamo i contenuti", oppure richiamala per nome. |
| Fa troppe domande | Allega più materiale (ODG, appunti, documenti) e di' in anticipo pubblico e obiettivo: non chiede ciò che trova già scritto. |
| Nel file manca un argomento | Se l'avevi tagliato non lo reintroduce. Chiedi di aggiungerlo e dai i contenuti. |
| La skill delle slide rifà le domande iniziali | Controlla che il file inizi con il blocco tra `---` (modalità, densità, lingua, occasione) e che tu l'abbia allegato o indicato per nome. |
