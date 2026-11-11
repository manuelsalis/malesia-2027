# Malesia 2027 — Firebase Edition 4.0

Sito in una sola pagina statica (`index.html`), con itinerario di 17 giornate, budget, prenotazioni, foto/fallback, login Google e sincronizzazione Firebase opzionale. Tutto HTML, CSS e JavaScript è contenuto nel singolo file, senza build step.

## IMPORTANTE: configurazione Firebase indispensabile

La configurazione fornita nel prompt includeva `authDomain: "://firebaseapp.com"` e `databaseURL: "https://firebasedatabase.app"`: non sono URL completi e non possono funzionare.

Nel file `index.html` l'`authDomain` è stato ricostruito usando il `projectId` fornito:

```js
authDomain: 'malesia-2027.firebaseapp.com'
```

**Devi sostituire esattamente questo valore:**

```js
databaseURL: 'INSERISCI_DATABASE_URL_DA_FIREBASE_CONSOLE'
```

con **l'URL esatto** che compare in **Firebase Console > Build > Realtime Database > Data**. Può avere uno dei formati:

- `https://NOME_DATABASE.firebaseio.com`
- `https://NOME_DATABASE.REGIONE.firebasedatabase.app`

Non indovinare la regione o il nome: usa l'URL che Firebase mostra nel tuo progetto.

Senza URL corretto il sito continua a funzionare **solo in locale**, indicando chiaramente che il cloud non è configurato. Non è stato possibile verificare un accesso al database reale perché manca il suo URL preciso.

## Attiva Google Login

1. Vai in **Firebase Console > Authentication > Sign-in method** e abilita **Google**.
2. Vai in **Authentication > Settings > Authorized domains** e aggiungi il dominio esatto in cui pubblichi il sito, ad esempio `tuo-utente.github.io` (non il percorso `/nome-repository`).
3. Controlla che il `projectId`, l'`authDomain`, `appId`, ecc. corrispondano alla Web App Firebase del progetto.
4. Pubblica il sito via HTTPS (GitHub Pages usa HTTPS) e premi **Accedi con Google**. Se il browser blocca il popup, consentilo per il sito.

## Whitelist email: solo sul server

Il login **non** autorizza da solo l'accesso ai dati. La whitelist deve essere applicata **nelle Security Rules del Realtime Database**. Non mettere whitelist o password nel JavaScript e non impostare `".read": true` o `".write": true` per il database.

Se servono regole iniziali, `REGOLE_FIREBASE_ESEMPIO.json` contiene un esempio da personalizzare con le email effettive. Non sostituire automaticamente le tue regole se sono già configurate.

Nodo condiviso dalla pagina: `viaggio_malesia_2027/stato`. Tutti gli account autorizzati lavorano **sullo stesso piano di viaggio**.

La Web API key Firebase visibile nell'HTML è configurazione pubblica. Le chiavi di **service account** e i segreti **non** devono essere inseriti nella pagina.

## Comportamento della sincronizzazione

- **Non autenticato:** lettura dell'itinerario e salvataggio in `localStorage`; badge “Accesso richiesto per sync cloud”.
- **Autenticato e autorizzato:** `onValue` riceve gli aggiornamenti condivisi; `set` salva in Firebase dopo un breve debounce. La UI mostra “Sincronizzato (email)”.
- **Account senza permessi:** l'errore `PERMISSION_DENIED` non blocca la pagina; la copia locale resta modificabile.
- **Offline:** le modifiche sono registrate in `localStorage` e in una coda persistente di modifiche non sincronizzate. Alla riconnessione, se il cloud non è stato modificato da altri, vengono inviate.
- **Conflitto:** se il cloud cambia rispetto all'ultima versione ricevuta mentre hai modifiche locali, il sito mostra la scelta “Usa dati cloud” oppure “Carica dati locali”, con conferma prima di sovrascrivere.
- **Backup manuali:** Esporta/Importa JSON e il link compresso continuano a funzionare. L'importazione è verificata e chiede conferma.

### Coerenza e limiti

Gli eventi provenienti da `onValue` aggiornano la cache **senza** invocare la funzione di salvataggio cloud: ciò evita i loop di sincronizzazione.

Il sistema è adatto a un piccolo gruppo di viaggiatori, **non è un editor collaborativo transazionale**. Se due utenti autorizzati modificano il piano esattamente nello stesso momento online, può prevalere l'ultima scrittura al nodo condiviso. La coda offline e il controllo di conflitto riducono, ma non eliminano, questa possibilità. Esporta periodicamente un JSON per sicurezza.

Se cancelli i dati del browser o usi una modalità privata che non mantiene `localStorage`, potresti perdere modifiche locali non ancora sincronizzate. I link di trasferimento e i file JSON possono contenere dettagli delle prenotazioni, quindi condividili privatamente.

## GitHub Pages

1. Crea un repository GitHub e carica `index.html`, `.nojekyll` e, se vuoi, la documentazione.
2. Vai in **Settings > Pages > Build and deployment**.
3. Scegli **Deploy from a branch > main > /(root)**.
4. Apri `https://tuo-utente.github.io/nome-repository/`.

Le foto di Wikimedia Commons vengono richieste online. Quando non si caricano sono usati fallback illustrati incorporati nella pagina; non sono mostrati insieme alle foto correttamente caricate.

## Verifiche della versione 4.0

- Controllo sintattico JavaScript (`node --check`).
- 17 tappe numerate e tre card header presenti.
- Rendering responsive su 320, 390, 750, 1024, 1280 e 1920 px: nessuna sovrapposizione delle tre card, nessun overflow orizzontale.
- Test degli stati delle immagini: valido -> foto senza fallback; errore -> fallback senza foto.
- Test automatizzati **con Firebase simulato**: Google Login, scrittura, ricezione in tempo reale, assenza di loop `onValue`, conflitto offline, selezione cloud, account non autorizzato e logout.
- **Non** è stata eseguita una connessione autenticata al progetto Firebase reale.

Il rientro internazionale resta impostato il **15 luglio 2027 alle 21:00 da Kuala Lumpur**, con scalo a **Doha** e arrivo a **Roma Fiumicino il 16 luglio alle 14:15**.

## Fonti tecniche ufficiali

- [Firebase SDK da CDN](https://firebase.google.com/docs/web/alt-setup)
- [Google Sign-In per il web](https://firebase.google.com/docs/auth/web/google-signin)
- [Realtime Database: lettura e scrittura](https://firebase.google.com/docs/database/web/read-and-write)
- [Rilevamento connessione RTDB](https://firebase.google.com/docs/database/web/offline-capabilities)
- [Security Rules e autenticazione](https://firebase.google.com/docs/rules/rules-and-auth)
