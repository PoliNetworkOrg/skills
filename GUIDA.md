# Guida: installare e usare PoliNetwork Slides

PoliNetwork Slides è una **skill**: un pacchetto di istruzioni che insegna a Claude o a Codex a
creare le presentazioni delle assemblee con il tema PoliNetwork. Si installa **una volta sola**;
da quel momento basta chiedere "fammi la presentazione per l'assemblea" e l'assistente sa cosa fare.

Il risultato è un unico file `.html`: si apre con il browser, funziona anche senza internet e si
può esportare in PDF.

Scegli la sezione che corrisponde allo strumento che usi:

| Usi… | Vai a |
|---|---|
| Claude nel browser (claude.ai) o nell'app Claude per computer | [1. Claude (app e sito)](#1-claude-app-e-sito) |
| Claude Code (terminale, VS Code, scheda Code dell'app) | [2. Claude Code](#2-claude-code) |
| Codex (terminale, app, VS Code) | [3. Codex](#3-codex) |

---

## 1. Claude (app e sito)

**Serve:** un account Claude, anche gratuito, e il file `polinetwork-slides.zip`.

### Installazione

1. Apri [claude.ai](https://claude.ai) (oppure l'app Claude) e vai in **Settings → Capabilities**.
   Attiva **Code execution and file creation**: senza questa opzione le skill non funzionano.
2. Vai in **Customize → Skills**.
3. Premi **+**, poi **+ Create skill** → **Upload a skill**.
4. Scegli il file `polinetwork-slides.zip` (non serve estrarlo).
5. La skill compare nell'elenco: controlla che l'interruttore sia acceso.

Sui piani **Team ed Enterprise** chi l'ha caricata può condividerla con i colleghi o con tutta
l'organizzazione: gli altri la trovano già in **Customize → Skills** e non devono caricarla.

### Uso

Apri una nuova chat e chiedi, per esempio:

> Fammi la presentazione PoliNetwork per l'assemblea dei soci del 15 novembre in aula 3.1.

Allega anche appunti, verbali o documenti: Claude li usa come fonte dei contenuti. Per foto e
sticker, caricali nella chat e di' in quale slide vanno. Alla fine Claude ti dà il file `.html`
da scaricare (vedi [4. Come funziona](#4-come-funziona-una-volta-installata)).

**Limite:** nel sito e nell'app di solito non c'è un browser per il controllo automatico delle
slide. Claude te lo segnala: apri il file e dai un'occhiata prima di presentare.

---

## 2. Claude Code

**Serve:** [Claude Code](https://code.claude.com) installato, Git e **Python 3.10 o più recente**.
Per il controllo automatico delle slide serve anche **Google Chrome** o **Chromium**.

### Installazione

Apri il terminale ed esegui:

```bash
git clone <URL-DELLA-REPO> ~/polinetwork-slides
mkdir -p ~/.claude/skills
ln -s ~/polinetwork-slides ~/.claude/skills/polinetwork-slides
```

Su **Windows** (PowerShell), al posto delle ultime due righe:

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\skills"
Copy-Item -Recurse "$HOME\polinetwork-slides" "$HOME\.claude\skills\polinetwork-slides"
```

Su Windows la cartella è una copia: dopo ogni aggiornamento va ricopiata.

Se usi già la skill su claude.ai con lo stesso account, l'app desktop di Claude Code può
caricarla anche da lì.

### Uso

Apri Claude Code nella cartella dove vuoi salvare la presentazione, per esempio:

```bash
mkdir -p ~/assemblee/2026-11 && cd ~/assemblee/2026-11
claude
```

Poi scrivi la richiesta in linguaggio normale:

> Fammi la presentazione per l'assemblea dei soci del 15 novembre, versione lunga.
> I contenuti sono in appunti.md.

Oppure richiama la skill per nome con `/polinetwork-slides`, seguito dalla richiesta.

### Aggiornare

```bash
cd ~/polinetwork-slides && git pull
```

---

## 3. Codex

**Serve:** [Codex](https://developers.openai.com/codex) installato e **Python 3.10 o più recente**.
Per il controllo automatico delle slide serve anche **Google Chrome** o **Chromium**.

### Installazione (metodo semplice)

Apri Codex e scrivi:

> $skill-installer installa la skill da https://github.com/<ORGANIZZAZIONE>/<REPO>

Al posto del link metti quello della repo; se la skill è in una sottocartella, usa il link alla
sottocartella. Poi chiudi e riapri Codex.

### Installazione (con Git, per aggiornarla con un comando)

```bash
git clone <URL-DELLA-REPO> ~/polinetwork-slides
mkdir -p ~/.agents/skills
ln -s ~/polinetwork-slides ~/.agents/skills/polinetwork-slides
```

Su Windows copia la cartella in `%USERPROFILE%\.agents\skills\polinetwork-slides`, come per
Claude Code. Poi chiudi e riapri Codex.

### Uso

Apri Codex nella cartella dove vuoi salvare la presentazione e scrivi la richiesta in linguaggio
normale:

> Fammi la presentazione per il General Meeting del 12 ottobre, versione breve, in inglese.

Oppure richiama la skill per nome con `$polinetwork-slides`, seguito dalla richiesta.

### Aggiornare

Con Git: `cd ~/polinetwork-slides && git pull`. Con `$skill-installer`: cancella la cartella
`~/.codex/skills/polinetwork-slides` e reinstalla.

---

## 4. Come funziona, una volta installata

### Cosa ti chiede l'assistente

1. **Si presenta a voce o si legge?** A voce: qualcuno la proietta e ci parla sopra. Da leggere:
   si manda a chi non c'era o si legge in differita, e ogni slide si capisce da sola, con frasi
   complete, un riquadro "In breve" dove serve, una sintesi iniziale e il glossario delle sigle.
   Niente sticker.
2. **Quanto densa?** Essenziale o completa. Insieme alla risposta di prima decide la versione:
   - a voce, essenziale: **breve**, circa 8 slide, per aggiornamenti e riunioni da 10-15 minuti;
   - a voce, completa: **lunga**, circa 25 slide, assemblea completa con team, bilancio,
     votazione e 5x1000;
   - da leggere, essenziale: **autoesplicativa compatta**, circa 8-12 slide, una per argomento;
   - da leggere, completa: **autoesplicativa completa**, circa 15-20 slide con contesto, perché e
     risultati di ogni argomento.
3. **Lingua:** italiano o inglese.
4. **Occasione:** che incontro è, data e luogo.
5. **Contenuti:** argomenti, numeri, persone, eventi, scadenze.
6. **Immagini:** foto, screenshot.
7. **Sticker (meme):** solo nelle versioni a voce. Se li vuoi, l'assistente propone dove metterli
   e tu li carichi; se no, la presentazione non ne ha.
8. **Struttura:** se vuoi l'indice, i divisori di sezione ("Parte 1") e il nome della sezione in
   alto a destra. Di default tutti e tre nella breve e nella lunga, solo il nome della sezione
   nell'autoesplicativa.

**I contenuti li decidi tu.** L'assistente impagina e riformula, ma non inventa numeri, nomi o
argomenti. Gli unici dati che inserisce da solo sono il codice fiscale per il 5x1000, il sito e il
link al recruiting. Prima di creare le slide ti mostra la **scaletta**, cioè l'elenco delle slide
con il loro contenuto: controllala e correggila.

Se un dato non ce l'hai ancora (per esempio una cifra del bilancio), di' "lascialo da completare":
nella slide comparirà evidenziato in azzurro, tipo `[€]`.

### Versione da leggere a partire da una già fatta

Dopo l'assemblea puoi chiedere, nella stessa cartella:

> Fai la versione autoesplicativa di assemblea-2026-11-15.

L'assistente parte dalla presentazione proiettata, trasforma le note di chi ha parlato in testo
nelle slide e ti chiede, in un solo messaggio, le informazioni che mancano per spiegare tutto (per
esempio l'esito delle votazioni). Il risultato è un file separato, per esempio
`assemblea-2026-11-15-lettura.html`.

### I file che ottieni

| File | A cosa serve |
|---|---|
| `nome.html` | La presentazione: **si apre con Chrome, si proietta e si manda agli altri** |
| `nome.slides.html` | Il sorgente: serve all'assistente per fare modifiche |
| `img/` | Le immagini (foto, sticker). Se ne manca una, nella slide compare un riquadro con il nome del file da aggiungere |

Per modificare la presentazione, chiedi all'assistente nella stessa cartella, per esempio "nella
slide 5 cambia il titolo in…" oppure "ho aggiunto le foto in img/, ricompila".

Se hai ricevuto solo il file `.html` da qualcun altro, chiedi all'assistente di **estrarre il
sorgente**: ricrea `nome.slides.html` e le immagini.

### Presentare

Apri `nome.html` con **Google Chrome** (Edge e Brave vanno bene uguale).

| Tasto | Azione |
|---|---|
| → oppure Spazio | slide successiva |
| ← | slide precedente |
| **F** | schermo intero |
| **O** | panoramica di tutte le slide: clic su una per andarci |
| **P** oppure **Ctrl+P** (⌘P su Mac) | finestra del presentatore (note, timer, slide successiva): tienila sul tuo schermo e proietta l'altra |
| **S** | stampa / esporta in PDF |
| Home / Fine | prima / ultima slide |

Nelle slide di **votazione**, clic su Favorevoli, Contrari o Astenuti per aggiungere un voto;
**Maiusc + clic** per toglierlo.

### Esportare in PDF

Premi **S** oppure il pulsante con la stampante nella barra in basso a destra (compare muovendo
il mouse). Ctrl+P non stampa: nelle presentazioni apre il presentatore.

Nella finestra di stampa:
- **Chrome / Edge / Brave:** Destinazione **Salva come PDF**, Margini **Nessuno**, spunta
  **Grafica di sfondo** → Salva.
- **Firefox:** Destinazione **Salva come PDF**, in **Altre impostazioni** Margini **Nessuno** e
  spunta **Stampa sfondi** → Salva.

Ogni slide diventa una pagina. Senza "Grafica di sfondo" / "Stampa sfondi" spariscono sfondo e
card in vetro.

---

## 5. Problemi comuni

| Problema | Soluzione |
|---|---|
| L'assistente non usa la skill | Richiamala per nome: `/polinetwork-slides` in Claude Code, `$polinetwork-slides` in Codex. Su claude.ai controlla che sia accesa in Customize → Skills. Dopo l'installazione riavvia Claude Code o Codex. |
| Su claude.ai la skill non compare o non parte | Controlla che **Code execution and file creation** sia attivo in Settings → Capabilities. |
| "Chrome/Chromium non trovato" | Installa Google Chrome. Il controllo automatico è facoltativo: la presentazione funziona lo stesso, ma guardala prima di presentare. |
| `python3: command not found` | Installa Python 3.10 o più recente da [python.org](https://www.python.org/downloads/). Su Windows il comando può chiamarsi `python` o `py`. |
| In una slide c'è un riquadro tratteggiato | Manca un'immagine: mettila in `img/` con il nome indicato e chiedi di ricompilare. |
| Le animazioni scattano sul proiettore | Apri il file con `?static` in fondo all'indirizzo (es. `…/nome.html?static`): tutto resta fermo. |
