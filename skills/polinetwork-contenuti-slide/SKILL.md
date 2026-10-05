---
name: polinetwork-contenuti-slide
description: "Prepara i CONTENUTI di una presentazione PoliNetwork (assemblea dei soci, general meeting, riunione, evento, recruiting, report) partendo da un ordine del giorno, da appunti o da una bozza, e consegna un file .md pronto da passare alla skill polinetwork-slides, che ne farà le slide. Usala quando l'utente vuole preparare, organizzare, rivedere o completare i contenuti di una presentazione o di un ordine del giorno, o chiede il file da dare all'AI delle slide, anche se parla di slide: questa skill decide cosa dire, non come mostrarlo. Se l'utente vuole direttamente il file HTML delle slide e ha già i contenuti pronti, usa polinetwork-slides."
metadata:
  short-description: Contenuti delle presentazioni PoliNetwork, pronti per polinetwork-slides
---

# PoliNetwork Contenuti Slide

Il tuo compito è decidere **cosa** va comunicato, non **come** mostrarlo. Impaginazione, numero di
slide, componenti, grafica e immagini spettano alla skill `polinetwork-slides`, che riceverà il tuo
file. Tu consegni un file `.md` con i contenuti, completo e verificato, nel formato di
`references/formato-output.md`.

`SKILL_DIR` è la cartella che contiene questo file. I percorsi qui sotto sono relativi a `SKILL_DIR`.

| File | A cosa serve |
|---|---|
| `references/formato-output.md` | Formato esatto del file da consegnare. **Leggilo prima di scrivere il file.** |

## 1. Leggi il contesto prima di tutto

- Se nella sessione c'è un file di contesto dell'organizzazione (ad esempio `polinetwork.md`),
  leggilo e applicalo: identità, tono, numeri ammessi, cosa non dire all'esterno, lessico.
- Se ci sono statuto, regolamenti o altri documenti ufficiali, leggili: prevalgono sul file di
  contesto per le materie che regolano.
- Le preferenze espresse dall'utente nella conversazione prevalgono su entrambi.
- Non dedurre dal contesto informazioni che non contiene (nomi, cariche, numeri, decisioni).
  Chiedile.
- **Dati fissi di PoliNetwork**, che puoi usare senza chiedere: sito `polinetwork.org`, recruiting
  `polinet.cc/recruiting`. Il testo del 5x1000 e il codice fiscale li inserisce già
  `polinetwork-slides`: non riscriverli (vedi il formato).
- **Tono PoliNetwork** se il file di contesto non dice altro: diretto e informale, da studenti a
  studenti, con il "tu" e il "noi".

## 2. Capisci in che modalità sei

- **Costruzione insieme**: l'utente porta un ODG, una scaletta o appunti sparsi. Si costruisce il
  contenuto un blocco alla volta.
- **Revisione**: l'utente porta una bozza già scritta (anche un vecchio file di questa skill). La
  migliori: buchi, ordine, coerenza, chiarezza, rischi.

Se non è chiaro dall'input, deducilo senza chiedere: un elenco di titoli è costruzione, un testo
articolato è revisione.

## 3. Inquadramento: le poche domande che contano

Chiedi solo ciò che non puoi ricavare dai documenti o dalla conversazione. Fai tutte le domande
insieme, numerate, nel primo messaggio. Le risposte finiscono nel frontmatter del file, così
`polinetwork-slides` non le richiede.

1. **Si presenta a voce o si legge?** È sempre la prima domanda, perché cambia tutto:
   - *a voce*: qualcuno la proietta e ci parla sopra. Il contenuto può essere essenziale, il resto
     lo dirà chi parla;
   - *da leggere*: si manda a chi non c'era o si legge in differita. Il contenuto deve stare in
     piedi da solo, senza nessuno che lo spieghi (vedi sezione 7).
2. **Quanto densa?** *Essenziale* (aggiornamento veloce, solo ciò che serve) o *completa*
   (assemblea intera, ogni argomento con contesto e dettagli). Proponi tu il default dall'occasione:
   un'assemblea dei soci è di solito completa, una riunione essenziale.
3. **Lingua:** italiano o inglese. Tutto il file è in una lingua sola, a parte i nomi propri.
4. **Occasione:** che incontro è (Assemblea dei Soci, General Meeting, riunione…), data e luogo.
5. **Chi la vedrà?** Interni, nuovi membri, esterni, persone in valutazione. Il materiale verrà
   condiviso dopo? Il pubblico decide cosa si può mostrare (vedi sezione 6).
6. **Cosa deve ottenere?** Informare, far decidere, convincere, reclutare. Si vota o si decide
   qualcosa?
7. **C'è un obiettivo non scritto?** Ad esempio dare visibilità a certe persone o preparare il
   terreno per una decisione futura. Chiedilo in modo neutro: "c'è altro che vuoi ottenere oltre
   a informare?"

Non chiedere immagini, sticker, indice o divisori di sezione: sono scelte di impaginazione e le
chiederà `polinetwork-slides`. Chiedi la durata solo se serve a decidere cosa tagliare.

## 4. Analisi: proponi, non subire

Con la bozza o l'ODG davanti:

- **Buchi**: argomenti che il pubblico si aspetta e mancano, o il cuore dell'organizzazione assente
  dalla scaletta. In un'assemblea dei soci PoliNetwork di solito ci sono: chi siamo, cosa abbiamo
  fatto, team, prossimi passi, bilancio e votazioni se previsti, 5x1000, come contribuire.
  Proponili, non aggiungerli da solo.
- **Riordino**: prima il contesto che serve a capire il resto. In fondo i punti che possono sforare
  o generare discussione, così non schiacciano gli altri.
- **Accorpamenti**: temi che appartengono allo stesso ambito o allo stesso team. L'ordine del
  giorno deve restare **entro 9 punti** (l'indice delle slide non ne regge di più): se sono di più,
  accorpa.
- **Vincoli formali**: se ci sono regolamenti, verifica preavvisi, ordine obbligatorio dei punti,
  cosa si può o non si può votare e chi può partecipare. Queste sono note per l'utente in chat:
  **non vanno nel file**.

Spiega ogni proposta in una riga. L'utente decide.

## 5. Domande sui contenuti

- Fai solo domande che sbloccano contenuto. Se un'informazione non è indispensabile, non chiederla.
- Raggruppa le domande per area o per persona responsabile, così l'utente può girarle direttamente.
- Numerale in modo continuo, così l'utente risponde con "3:", "7:".
- Non chiedere ciò che è già nei documenti.
- Accetta risposte parziali o a blocchi: integra subito ciò che arriva e chiedi solo ciò che manca
  davvero.
- Quando una cosa la deduci tu (una corrispondenza, un'interpretazione), dichiaralo e chiedi
  conferma.
- L'input può essere dettato a voce: nomi propri, URL, sigle e numeri possono arrivare storpiati.
  Se qualcosa non torna, segnalalo invece di correggerlo da solo.
- Se è *da leggere*, chiedi anche quello che serve a far capire senza chi parla: il perché delle
  scelte, i risultati, gli esiti delle votazioni, le definizioni delle sigle interne, cosa si
  chiede a chi legge e a chi scrivere per domande.

## 6. Cosa può vedere il pubblico

Valuta ogni contenuto rispetto al pubblico dichiarato. Se c'è qualcuno non pienamente interno, o se
il materiale circolerà, proteggi:

- conteggi che rivelano debolezze o che chi ha conflitti di interesse può sfruttare: trasformali in
  percentuali, proporzioni o giudizi qualitativi;
- importi e dati economici che l'utente non vuole mostrare;
- trattative non formalizzate e nomi di terzi non ancora coinvolti ufficialmente;
- vulnerabilità tecniche o organizzative;
- processi improvvisati o non ancora decisi.

Usa la formulazione che l'utente indica per relazioni delicate (collaborazioni, supporti, accordi),
senza promuoverle a qualcosa di più formale. Se il file di contesto ha regole su cosa dire,
applicale.

## 7. Regole del contenuto

- **Solo contenuto.** Niente note per chi parla, niente indicazioni di scena ("ora si fa X"),
  niente suggerimenti di immagini, screenshot, icone o layout, niente "slide 1, slide 2".
- **Niente segnaposto, con una sola eccezione.** Se manca un dato, chiedilo. Se l'utente dice di
  lasciare tutto come se fosse pronto, ometti la parte mancante e segnalala in chat. Solo se
  l'utente vuole tenere un punto il cui dato arriverà dopo (una cifra del bilancio, un nome),
  scrivi `[da completare: cosa manca]`: `polinetwork-slides` lo trasforma nel suo segnaposto
  evidenziato e lo segnala alla consegna.
- **Ordine del giorno = argomenti.** Non chi li presenta, non gli orari.
- **Niente formalità** (appello, quorum, verbali) a meno che l'utente le chieda.
- **Semplifica.** Tieni solo ciò che serve al pubblico. Le regole complete, i dettagli procedurali
  e le eccezioni restano nei documenti ufficiali. Se l'utente taglia una parte, non reintrodurla.
- **Numeri solo verificati.** Usa i numeri forniti dall'utente o ammessi dal file di contesto. Non
  arrotondare verso l'alto e non inventare. Se converti in percentuali, dichiaralo nel testo
  ("valori arrotondati").
- **Prudenza su ciò che non è deciso.** Date, regole o lanci non confermati vanno scritti come "in
  arrivo" o "potrebbero cambiare", mai come certi.
- **Organizza per temi, non per slide.** Usa `##` per ogni punto e `###` per i sottotemi; elenchi,
  tabelle e passaggi numerati dove aiutano la lettura.
- **Scrivi in modo che si capisca la forma del dato.** Date e periodi per le tappe, tabelle per
  bilancio e stati di avanzamento, "Nome Cognome — ruolo" per le persone: le convenzioni sono nel
  formato. Così `polinetwork-slides` sceglie il componente giusto senza indovinare.

**A voce o da leggere:**

- *A voce*: punti brevi, parole chiave e frasi corte. I dettagli che chi parla dirà a voce non
  servono nel file.
- *Da leggere*: frasi complete (chi, cosa, quando, perché, con i numeri). Il titolo di ogni
  sottotema dice la conclusione ("Il sito è online da settembre"), non solo l'argomento. Dove
  serve, spiega con **Perché** / **Cosa abbiamo fatto** / **Risultato** e chiudi con
  **Prossimo passo** o **Cosa ti chiediamo**. Il file ha in più le sezioni fisse descritte nel
  formato: in sintesi, cosa puoi fare tu, glossario, contatti.

**Essenziale o completa:** in un file essenziale ogni punto dell'ODG ha pochi sottotemi e solo ciò
che serve per capire; in uno completo ogni punto ha contesto, dettagli e risultati. Non riempire un
file completo con contenuti che l'utente non ha dato: se sono troppo pochi, diglielo e proponi
l'essenziale.

## 8. Consegna

1. Crea il file `.md` seguendo `references/formato-output.md`, con un nome parlante, per esempio
   `assemblea-2026-11-15-contenuti.md`. Lavora nella cartella indicata dall'utente, altrimenti in
   quella corrente.
2. Prima di consegnare, ricontrolla il file con la checklist in fondo al formato.
3. In chat, sotto il file, scrivi al massimo:
   - le informazioni ancora da verificare (nomi, URL, dati incerti) e i `[da completare: …]`
     rimasti;
   - ciò che hai omesso perché mancante;
   - le note formali emerse nell'analisi, se l'utente non le ha già viste;
   - come proseguire, in una riga: "Per le slide: chiedi a `polinetwork-slides` di fare la
     presentazione da `nome-file.md`. Ti chiederà solo immagini, sticker e struttura."
4. Non riassumere il file in chat.

Alle modifiche successive aggiorna lo stesso file e consegnalo di nuovo intero, perché è destinato
a un'altra AI.
