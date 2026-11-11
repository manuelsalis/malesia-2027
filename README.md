# Malesia 2027 — Travel Companion · Edition 3.0

Un'unica pagina HTML responsive (CSS e JavaScript incorporati) per il viaggio tra **Kuala Lumpur, Kuching/Borneo e Perhentian**. Il progetto contiene itinerario fotografico, 17 giornate, voli, hotel, calcolo del budget, checklist prenotazioni e trasferimento dei dati tra PC e smartphone.

## Le novità della versione 3.0

- **Foto e fallback esclusivi:** quando una foto reale viene caricata, il JavaScript marca la sua scheda come `has-photo`, il CSS rimuove completamente l'illustrazione di riserva e nasconde il contenuto di fallback. In caso di errore compare solo il disegno incorporato. La logica gestisce immagini già in cache e sorgenti cambiate successivamente.
- **Hero corretto:** le tre card delle destinazioni sono celle indipendenti di CSS Grid, non elementi sovrapposti e posizionati in assoluto. Le leggere inclinazioni sono puramente decorative e rispettano i dispositivi touch e `prefers-reduced-motion`.
- **Design system coerente:** tipografia, raggi, ombre, spaziature e pulsanti rifiniti per l'intero sito. Icone di interfaccia raccolte in un solo sprite **SVG inline**; non è richiesta alcuna libreria esterna.
- **Cronologia finale:** la scheda dell'hotel per la notte 14–15 luglio si trova subito dopo il giorno 15 e prima dei giorni 16 e 17. Il volo di ritorno parte da **Kuala Lumpur (KUL) il 15 luglio 2027 alle 21:00**, con scalo a **Doha (DOH)** e arrivo a **Roma Fiumicino (FCO) il 16 luglio alle 14:15**. Tutti gli orari sono locali e vanno verificati sul biglietto.
- **Trasferimento dispositivi:** nuovo pannello per JSON, condivisione nativa del file quando disponibile, copia del link compresso, incolla di JSON o link, validazione rigorosa e conferma prima di sostituire dati già salvati. I vecchi JSON del kit sono compatibili.

## Come usare `index.html`

Apri `index.html` direttamente in un browser oppure pubblicalo su GitHub Pages. Tutto il codice applicativo è nel singolo file; non servono server, npm, React o database. Le **fotografie** e i font decorativi sono richiesti a servizi esterni; se manca Internet, le illustrazioni e i font di sistema permettono comunque di leggere il programma e usare il budget.

Il budget, le spese, gli stati **prenotato/pagato** e le relative note si salvano in `localStorage`. La chiave resta **`malesia-2027-planner-v2`**, per mantenere le modifiche del sito precedente quando l'origine web rimane la stessa. Prima di aggiornare la pagina conviene comunque esportare un backup JSON.

## Trasferire i dati da PC a smartphone

### Metodo A — Link rapido, consigliato con GitHub Pages

1. Sul dispositivo che contiene le modifiche, apri la sezione **Voli & hotel** e vai al riquadro **Backup & trasferimento dati**.
2. Premi **Copia link di trasferimento** e invialo al secondo dispositivo tramite messaggio privato, AirDrop o un altro metodo fidato.
3. Sul secondo dispositivo apri quel link: il sito legge il backup dal frammento `#m2027=...`, lo rimuove dalla barra degli indirizzi e **chiede la tua conferma** prima di importarlo.
4. Dopo la conferma, budget, note, spese e stati prenotato/pagato vengono ricostruiti sul dispositivo di destinazione.

Il link incorpora **una fotografia dei dati al momento della copia**, compressa con le API native `CompressionStream`/`DecompressionStream`. Non è un indirizzo che rimane sincronizzato in automatico: se modifichi un dispositivo dopo aver generato il link, per trasferire le nuove modifiche devi generarne un altro.

**Privacy:** il frammento del link non è inviato al server dalla normale richiesta HTTP, ma può rimanere nei messaggi, nella cronologia o essere letto da chi riceve il link. Può contenere note e riferimenti di prenotazione: condividilo soltanto con persone fidate. Il link ha dimensione limitata; se è troppo lungo o il browser non supporta le API, passa al metodo B.

### Metodo B — File JSON, universale

1. Premi **Esporta JSON** per scaricare un file di backup, oppure **Condividi JSON** per aprire la condivisione nativa dove supportata.
2. Trasferisci il file `.json` al secondo dispositivo.
3. Apri il sito sul secondo dispositivo e premi **Importa JSON**, selezionando il file. In alternativa premi **Incolla backup o link** e incolla tutto il contenuto JSON.
4. Prima di importare, il sito **controlla la struttura dei dati** e chiede conferma per sostituire quelli locali.

**Importante:** l'importazione sostituisce i dati presenti nel dispositivo di destinazione; **non unisce automaticamente** due copie modificate separatamente. Se hai modifiche importanti su entrambi i dispositivi, esporta un backup da entrambi prima di decidere quale versione ripristinare.

### Che cosa GitHub Pages non fa

GitHub Pages ospita i file HTML/CSS/JS, non offre un database di sincronizzazione. **Non è presente un cloud sync continuo** e l'app non invia a GitHub il contenuto del budget o delle prenotazioni. Le modifiche in altre schede della **stessa origine e dello stesso browser** possono aggiornarsi tramite l'evento `storage`; questo non sincronizza dispositivi separati.

## Pubblicazione su GitHub Pages

1. Crea un repository pubblico, per esempio `malesia-2027`.
2. Nella radice del repository carica **`index.html`** (puoi caricare anche `README.md`, `CREDITI_FOTO.md`, `CHANGELOG.md` e `.nojekyll`). Non caricare soltanto il file ZIP: GitHub Pages deve trovare il file HTML.
3. In **Settings → Pages**, seleziona **Deploy from a branch**; scegli il ramo `main` e la cartella `/(root)`, poi salva.
4. Dopo il deployment il sito sarà disponibile su `https://TUO-USERNAME.github.io/malesia-2027/`. Apri **lo stesso indirizzo** su PC e smartphone.

Per aggiornare una versione già online, **sostituisci soltanto `index.html`**, mantenendo lo stesso repository e indirizzo. Dopo la pubblicazione, svuota la cache della pagina se continua a comparire la versione precedente.

## Contenuto e compatibilità

- 17 giornate di programma: 30 giugno – 16 luglio 2027.
- Tre ambientazioni distinte: urbano, rainforest e isole.
- Galleria foto con navigazione e crediti.
- Budget modificabile, aggiunta di spese, note, conferme, hotel e tratte aeree.
- Responsive da 320 px a 1920 px; supporto a tastiera, riduzione delle animazioni e visualizzazione in stampa.
- Link compresso: browser moderni con `CompressionStream` e `DecompressionStream`; il file JSON rimane l'alternativa compatibile.

## Immagini, attribuzioni e avvertenze

Le fotografie sono caricate da Wikimedia Commons secondo i crediti inclusi in `CREDITI_FOTO.md`. Alcune foto relative a fauna e snorkeling sono **illustrative**, non necessariamente riprese nel punto esatto. Confronta orari, costi e dettagli delle prenotazioni con documenti ufficiali e conferme dei fornitori.
