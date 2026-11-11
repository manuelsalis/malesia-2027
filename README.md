# Malesia 2027 — Single-page travel companion

Un unico sito statico e responsive che riunisce l’itinerario fotografico, le 17 giornate, voli, alloggi, budget, risparmio e checklist prenotazioni.

### Premium Edition 2.0 — novembre 2026

- Nuova direzione artistica con profondità 3D, carte sovrapposte, vetro satinato, sfondi atmosferici e tre palette distinte (city, rainforest, island).
- Animazioni di ingresso, scroll progress, transizioni, effetto tilt su desktop e animazioni disattivate per utenti con `prefers-reduced-motion`.
- Galleria fotografica con visualizzazione ingrandita, frecce avanti/indietro e navigazione con tastiera.
- **Giorni 15 → 16 → 17** in una sequenza verticale, senza anomalie di posizionamento. Aggiunta la voce **Rientro** nella navigazione.
- Voli di ritorno secondo le informazioni condivise: **15 luglio 2027, KUL 21:00 → DOH 23:30 (QR4990)**; **16 luglio, DOH 09:15 → FCO 14:15 (QR131)**, scalo a Doha 9h45. Tutti orari locali da verificare sulla prenotazione.
- SVG illustrati originali incorporati come fallback delle fotografie: se Wikimedia Commons non è raggiungibile, la pagina rimane curata e leggibile.
- Layout responsive verificato a larghezze da 320 px a 1920 px, nessuno scorrimento orizzontale.


## Aprire il sito

- Apri `index.html` nel browser. Per visualizzare le fotografie vere di Wikimedia Commons serve una connessione Internet. Se non disponibile, vengono mostrati sfondi illustrati di riserva inclusi in `index.html`.
- Non serve installare Node, React, un database o altri strumenti: CSS e JavaScript sono già inclusi nell'unico `index.html`.
- Le **fotografie** e i **font web** vengono caricati da servizi esterni e richiedono Internet. Gli sfondi illustrati incorporati e i font di sistema mantengono la pagina utilizzabile anche senza di essi.

## Pubblicare con GitHub Pages (gratuito, sito pubblico)

1. Accedi a GitHub e crea un nuovo repository, ad esempio `malesia-2027`, con visibilità **Public**.
2. Carica **`index.html`** nella **radice** del repository (puoi aggiungere anche questo README, `.nojekyll` e `CREDITI_FOTO.md`). Non caricare soltanto il file ZIP: GitHub Pages deve trovare `index.html`.
3. Vai su **Settings → Pages** del repository.
4. In **Build and deployment**, scegli **Deploy from a branch**, poi **main** e **/(root)**. Clicca **Save**.
5. Il sito sarà disponibile su `https://TUO-USERNAME.github.io/malesia-2027/` una volta pubblicato.
6. Apri lo stesso indirizzo anche dal telefono. Puoi aggiungerlo alla schermata Home dalle opzioni del browser.

## Se hai già pubblicato la vecchia versione

Sostituisci semplicemente `index.html` nel repository, sulla stessa branch di GitHub Pages. Puoi mantenere invariati `README.md`, `.nojekyll` e `CREDITI_FOTO.md`, ma è consigliato aggiornare anche il README. Le spese e le prenotazioni salvate nel browser restano disponibili finché il sito mantiene lo **stesso indirizzo/origine** e la stessa chiave di storage. Esporta comunque un backup JSON prima di aggiornare.

## Dati e sincronizzazione

- La dashboard salva nel `localStorage` del browser: i dati non vengono pubblicati nel repository.
- Per passare da un dispositivo all'altro, usa **Esporta backup** e poi **Importa backup**.
- La chiave di archiviazione è **`malesia-2027-planner-v2`**, uguale a quella della dashboard precedente: se apri il nuovo file nella *stessa origine* dei file vecchi, può leggere le modifiche già salvate. Altrimenti esporta il JSON dalla vecchia dashboard e importalo nella nuova.
- Non salvare password, documenti o dati di pagamento nella pagina. Se il tuo repository è pubblico, i file statici sono visibili a chiunque possieda il link.
- Prezzi e orari sono indicativi e soggetti a verifica prima delle prenotazioni.

## Contenuto

- Kuala Lumpur: 1–5 luglio (+ ultima notte 14–15 luglio)
- Kuching e Borneo: 5–8 luglio
- Perhentian: 8–14 luglio
- Viaggio A/R Roma: 30 giugno – 16 luglio 2027; partenza da KUL il 15 luglio ore 21:00, arrivo a FCO il 16 luglio ore 14:15 via Doha
- Pianificazione: due persone, 14 notti in Malesia, totale iniziale di circa 3.410 €

## Immagini e licenze

Le fotografie remote di Wikimedia Commons hanno crediti e licenze specifici. Vedi la sezione Crediti nel piè di pagina o `CREDITI_FOTO.md`. Le immagini relative a turtle, Nemo Point e altre aree di snorkeling sono **illustrative**, non fotografie verificate di quei punti esatti.

## Nota sulla privacy

GitHub Pages è un servizio di hosting statico, non un servizio di sincronizzazione. Il sito è statico, ma l’interfaccia è interattiva grazie a JavaScript eseguito nel browser. Nessun dato della dashboard viene inviato a server dall'applicazione.
