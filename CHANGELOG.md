# Malesia 2027 — Edition 4.0

- Ripristinato l'`@import` tipografico (nella precedente versione era rimasto un frammento invalido).
- Rifatto il collage iniziale con CSS Grid reale, senza posizionamenti assoluti o sovrapposizioni delle 3 schede.
- Rafforzata la macchina a stati `has-photo` / `is-error`: foto e fallback mutuamente esclusivi.
- Normalizzati bordi, arrotondamenti, ritmi verticali, feedback dei pulsanti e focus visibile.
- Integrato il login Google nell'header con stato account, avatar, email e logout; icone SVG uniformi.
- Aggiunti Google Auth + Realtime Database SDK 13.2.0 caricati dinamicamente da `www.gstatic.com` nel blocco `script type="module"`. L'app rimane utilizzabile quando Firebase non si carica.
- Nuovo nodo condiviso `viaggio_malesia_2027/stato`, `onValue` per aggiornamenti live, `set` dopo debounce, badge di stato.
- Cache locale e coda persistente di modifiche per l'uso offline, prevenzione loop `onValue`, schermata non invasiva per conflitti cloud/locale.
- Gestito `PERMISSION_DENIED` con fallback locale e avviso esplicito.
- Import/Export JSON e trasferimento via link compresso invariati e utilizzabili.
- Aggiornata documentazione per Firebase Console, Google Auth, whitelist email e GitHub Pages.

**Configurazione esterna necessaria:** completare `firebaseConfig.databaseURL` con l'URL reale dalla console Firebase e verificare provider Google/domini autorizzati/regole RTDB.
