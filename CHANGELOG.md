# Malesia 2027 — Changelog

## Edition 3.0 · 11 novembre 2026

### Bug risolti

- La fotografia reale e lo sfondo illustrato non vengono più visualizzati insieme: stati espliciti `has-photo`/`is-error`, listener di caricamento/errore e riconoscimento delle modifiche alla sorgente.
- Hero a **tre card CSS Grid**, con spaziatura indipendente a tutte le risoluzioni al posto del precedente posizionamento assoluto.
- L'hotel della notte **14–15 luglio** è ora inserito nella cronologia fra i giorni 15 e 16; il giorno 17 resta sempre in coda.

### Interfaccia

- Rifinitura di ritmi verticali, griglie, colori, tipografia, padding, bordi e ombre.
- Uniformazione delle icone con uno sprite SVG coerente e incorporato.
- Miglior comportamento touch, `prefers-reduced-motion` e supporto quando le risorse di rete non sono raggiungibili.

### Trasferimento dati

- Backups JSON con schema v3, controlli su dimensione/valori/identificativi e supporto dei backup v2.
- Condivisione nativa o download JSON, importazione da file o testo e link compresso nel frammento URL.
- Conferma prima di sostituire i dati, feedback accessibile e indicazione dell'ultima modifica.
- Sicurezza: limite 1 MB, decompressione incrementale, rimozione dell'eventuale backup dall'URL, nessuna credenziale o integrazione Gist richiesta.
- Persistenza in `localStorage` sulla stessa chiave della versione 2.

### QA

- Verifiche senza overflow orizzontale alle larghezze 320, 390, 750, 950, 1280, 1440, 1920 px.
- Test automatici su budget, checkbox prenotazioni, inserimento/modifica spesa, esportazione/importazione JSON, rifiuto di dati non validi, link compresso, fotografie reali/fallback, galleria e cronologia finale.
- Parsing/sintassi JavaScript controllati.

## Edition 2.0

- Tre capitoli immersivi e animazioni di interfaccia, galleria fotografica e illustrazioni di riserva.
- Rientro via Doha: partenza **KUL 15 luglio ore 21:00** e arrivo **FCO 16 luglio ore 14:15**.
