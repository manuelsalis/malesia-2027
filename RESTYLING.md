# Malesia 2027 — Dark Premium

Versione aggiornata del restyling, con tema scuro completo e microinterazioni. `index.html` è autonomo: HTML, CSS e JavaScript sono incorporati. Sostituisce direttamente il file della repository, senza build né framework.

## Direzione visiva

- Fondi carbone e verde profondo, superfici sovrapposte e bordi sottili.
- Accenti champagne e salvia; titoli editoriali e numeri con cifre tabulari.
- Header traslucido che acquista profondità durante lo scorrimento; indicatore della sezione corrente.
- Hero fotografica incorniciata, ombre morbide e didascalie con dettagli coordinati.
- Palette scura estesa a budget, prenotazioni, input, avvisi e finestre di dialogo. Tema nativo scuro anche per i controlli del browser; stampa su fondo chiaro.

## Microinterazioni implementate

| Elemento | Comportamento |
| --- | --- |
| Pulsanti principali | Riflesso al passaggio del puntatore, sollevamento lieve, movimento dell'icona e pressione al clic |
| Card e destinazioni | Sollevamento di 3–5 px, ombra e bordo graduati; zoom morbido delle fotografie |
| Superfici informative | Riflesso locale che segue il mouse, limitato a un aggiornamento per frame e disabilitato sui dispositivi touch |
| Menu mobile | Apertura e chiusura animate, contenuto non interattivo durante la chiusura, gestione di clic rapidi e cambi di viewport |
| Navigazione | Sottolineatura animata dei link e avanzamento della lettura |
| Sezioni e card | Ingresso discreto una sola volta quando entrano nella viewport; il contenuto resta visibile anche senza JavaScript o osservatore |
| Budget | Evidenziazione breve quando cambia realmente un importo, senza sostituire o contare artificialmente le cifre |
| Form e checkbox | Focus luminoso, bordo e fondo di selezione coerenti, conservazione del focus dopo il salvataggio dello stato |
| Galleria e modali | Apertura breve delle finestre, transizione fra fotografie e controlli con feedback |
| Torna in alto | Anello che visualizza la posizione di lettura |

La preferenza `prefers-reduced-motion` viene rispettata anche quando cambia a pagina aperta. Nessuna parallasse su touch, nessuna animazione continua di sfondo e nessun contenuto essenziale dipende dalle animazioni.

## Responsive e accessibilità

Restano i breakpoint a 480, 768, 1080 e 1240 px, con rifiniture sotto 360 px. Container massimo di 1240 px, colonne flessibili, didascalie nel flusso e testi lunghi a capo. I principali controlli e le aree cliccabili hanno dimensioni minime di 48 px; gli input usano testo a 16 px.

Menu con `aria-expanded`, Escape, clic esterno e trasferimento del focus alla sezione selezionata. Modali native con contenuto scorrevole e limite di altezza in `dvh`. Etichette dei campi associate agli input, filtri con `aria-pressed`, focus visibile e collegamento per saltare al contenuto.

Nessun `overflow-x: hidden` globale è usato per nascondere problemi di impaginazione.

## Contenuti e funzionalità

Conservati tutte le 17 giornate, importi iniziali, date, dettagli di viaggio, fotografie e crediti. Restano budget, cambio MYR/EUR, fondo risparmi, prenotato/pagato, spese personalizzate, modifiche, backup JSON, link di trasferimento, stampa e integrazione Google/Firebase. La chiave `localStorage` e la configurazione Firebase non sono cambiate.

## File

- `index.html`: sito completo, pronto da sostituire su GitHub Pages.
- `sorgenti/index.html` e `styles.css`: versione equivalente con file separati.
- `sorgenti/photos.js`: metadati fotografici.
- `sorgenti/planner.js`: budget, prenotazioni, backup e cloud.
- `sorgenti/gallery.js`: galleria, immagini, progressione e stato dell'header.
- `sorgenti/navigation.js`: menu responsive e transizioni.
- `sorgenti/premium.js`: ingressi, riflesso sulle superfici e feedback sugli importi.
- `tests/verify.cjs`: test DOM riproducibili.

Scegli una versione: il file unico contiene già tutto. Per la versione separata copia **tutti** i file di `sorgenti/` nella directory di pubblicazione. Le due versioni consegnate sono equivalenti; per successive modifiche scegli una sola sorgente principale.

## Verifiche e limiti

**29 controlli DOM superati.** Includono le funzioni del planner, menu, focus, filtri, galleria, backup, persistenza, dichiarazione del tema scuro, apertura e chiusura animate, clic rapidi, variazione delle preferenze di movimento e del breakpoint desktop. I test delle nuove transizioni simulano le API di animazione: verificano il comportamento, non l'aspetto grafico.

Parsing CSS senza errori e sintassi verificata per tutti e cinque gli script. Dati iniziali e metadati delle foto confrontati con la versione precedente. Le sei principali combinazioni cromatiche di testo/sfondo controllate superano 4,5:1; non si tratta di una certificazione completa di accessibilità.

**Il servizio di anteprima browser non è disponibile in questo ambiente.** Non sono stati eseguiti screenshot, misure di overflow o test visivi con Chrome, Firefox e Safari. La fluidità effettiva delle animazioni e il rendering sui dispositivi restano da verificare. Neppure l'autenticazione Google e il database Firebase reale sono stati testati.

Per ripetere i controlli, con Node.js 22.12+:

```sh
npm install
npm test
```

Le dipendenze servono solo ai test. Prima di pubblicare, controllare almeno viewport da 320, 390, 768, 1024, 1440 e 1920 px, orientamento orizzontale, zoom 200%, menu aperto, modali, preferenze di movimento ridotto e immagini non disponibili.
