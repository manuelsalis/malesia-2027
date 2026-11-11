(() => {
'use strict';
const KEY='malesia-2027-planner-v2';
const DEFAULT_ITEMS=[{"id":"flight-international","kind":"flight","group":"Voli","title":"Voli internazionali A/R","subtitle":"Roma FCO ↔ Kuala Lumpur KUL · Qatar Airways / Malaysia Airlines","currency":"EUR","price":1250.06,"booked":false,"paid":false,"baggage":"2 bagagli da stiva: franchigia da verificare sul biglietto","notes":"Scali a Doha di 9h45 in entrambe le direzioni. Verificare unica prenotazione e 2×20 kg stiva.","legs":[{"date":"2027-06-30","from":"FCO","to":"DOH","depart":"09:40","arrive":"16:05","flight":"QR116"},{"date":"2027-07-01","from":"DOH","to":"KUL","depart":"01:50","arrive":"14:45","flight":"QR4991"},{"date":"2027-07-15","from":"KUL","to":"DOH","depart":"21:00","arrive":"23:30","flight":"QR4990"},{"date":"2027-07-16","from":"DOH","to":"FCO","depart":"09:15","arrive":"14:15","flight":"QR131"}]},{"id":"flight-kul-kch","kind":"flight","group":"Voli","title":"Volo Kuala Lumpur → Kuching","subtitle":"Malaysia Airlines · 2 passeggeri · 5 luglio","currency":"EUR","price":133.45,"booked":false,"paid":false,"baggage":"25 kg stiva a persona + bagaglio a mano da 5 kg","notes":"L’orario esatto non è visibile nello screenshot: completarlo quando prenotato.","legs":[{"date":"2027-07-05","from":"KUL","to":"KCH","depart":"","arrive":"","flight":""}]},{"id":"flight-kch-kbr","kind":"flight","group":"Voli","title":"Volo diretto Kuching → Kota Bharu","subtitle":"8 luglio · 2 passeggeri · aeroporto KBR","currency":"EUR","price":145.98,"booked":false,"paid":false,"baggage":"20 kg stiva a persona inclusi nel prezzo totale","notes":"Partenza del mattino, orario esatto da confermare. Arrivo riferito ~10:40.","legs":[{"date":"2027-07-08","from":"KCH","to":"KBR","depart":"","arrive":"10:40","flight":""}]},{"id":"flight-kbr-kul","kind":"flight","group":"Voli","title":"Volo Kota Bharu → Kuala Lumpur","subtitle":"14 luglio · 2 passeggeri","currency":"EUR","price":70,"booked":false,"paid":false,"baggage":"20 kg stiva a persona inclusi nel prezzo totale","notes":"Trasferimento dall’isola con la barca delle 12:00; confermare orari barche.","legs":[{"date":"2027-07-14","from":"KBR","to":"KUL","depart":"18:25","arrive":"19:40","flight":""}]},{"id":"hotel-kl-first","kind":"hotel","group":"Hotel","title":"Santa Grand Signature · Kuala Lumpur","subtitle":"Standard Queen · 4 notti · 1–5 luglio","currency":"MYR","price":880,"booked":false,"paid":false,"baggage":"Camera matrimoniale privata","notes":"220 MYR × 4 notti; controllare imposte, politica cancellazione, colazione.","checkin":"2027-07-01","checkout":"2027-07-05","checkinTime":"","checkoutTime":""},{"id":"hotel-kuching","kind":"hotel","group":"Hotel","title":"Hock Lee Hotel & Residences · Kuching","subtitle":"Camera privata · 3 notti · 5–8 luglio","currency":"MYR","price":400,"booked":false,"paid":false,"baggage":"Camera privata · verificare bagno e condizioni","notes":"Offerta trovata circa 90 €. Verificare tasse e tipo di camera.","checkin":"2027-07-05","checkout":"2027-07-08","checkinTime":"","checkoutTime":""},{"id":"hotel-perhentian","kind":"hotel","group":"Hotel","title":"Samudra Beach Chalet · Perhentian Besar","subtitle":"Standard Double privata · 6 notti · 8–14 luglio","currency":"MYR","price":1500,"booked":false,"paid":false,"baggage":"Camera matrimoniale privata","notes":"Offerta indicata ~315 €: verificare A/C, bagno privato, acqua calda e tasse. Il cambio bancario può differire.","checkin":"2027-07-08","checkout":"2027-07-14","checkinTime":"","checkoutTime":""},{"id":"hotel-kl-last","kind":"hotel","group":"Hotel","title":"Santa Grand Signature · ultima notte","subtitle":"Standard Queen · 1 notte · 14–15 luglio","currency":"MYR","price":220,"booked":false,"paid":false,"baggage":"Camera matrimoniale privata","notes":"220 MYR come stima dalla prima prenotazione; confermare tariffa del 14 luglio.","checkin":"2027-07-14","checkout":"2027-07-15","checkinTime":"","checkoutTime":""},{"id":"extra-meals","kind":"extra","group":"Altre spese","title":"Pasti e bevande (2 persone)","subtitle":"14 giorni · stima modificabile","currency":"EUR","price":430,"booked":false,"paid":false,"notes":"Budget medio: ~31 € al giorno per entrambi."},{"id":"extra-city-transport","kind":"extra","group":"Altre spese","title":"Trasporti locali e aeroporti","subtitle":"MRT, Grab e spostamenti in città · stima","currency":"EUR","price":140,"booked":false,"paid":false,"notes":"Kuala Lumpur e Kuching, inclusi trasferimenti urbani."},{"id":"extra-island-transfer","kind":"extra","group":"Altre spese","title":"Transfer KBR / Kuala Besut e barche","subtitle":"A/R per 2 · stima","currency":"EUR","price":130,"booked":false,"paid":false,"notes":"Barca A/R e trasferimenti terra; ricalcolare con preventivo reale."},{"id":"extra-excursions","kind":"extra","group":"Altre spese","title":"Escursioni, ingressi e snorkeling","subtitle":"Bako, Semenggoh, KL Eco Park, 2 tour e water taxi","currency":"EUR","price":210,"booked":false,"paid":false,"notes":"Budget stimato, non quotazione."},{"id":"extra-insurance","kind":"extra","group":"Altre spese","title":"Assicurazione viaggio (2 persone)","subtitle":"Preventivo indicativo","currency":"EUR","price":90,"booked":false,"paid":false,"notes":"Valutare coperture mediche, attività e annullamento."},{"id":"extra-buffer","kind":"extra","group":"Altre spese","title":"Margine imprevisti","subtitle":"Riserva prudenziale","currency":"EUR","price":150,"booked":false,"paid":false,"notes":"Non è un costo già previsto: è un cuscinetto."}];
const DEFAULT_STATE={version:2,rate:4.54,reserved:0,payday:27,items:DEFAULT_ITEMS};
let state;
let filter='all';
let editId=null;
const $=id=>document.getElementById(id);
function ico(name,extra=''){return `<svg class="ui-icon ${extra}" aria-hidden="true" focusable="false"><use href="#ui-${name}"></use></svg>`}
function clone(x){return JSON.parse(JSON.stringify(x))}
function escapeHTML(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function eur(n){return new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(n)||0)}
function rawPrice(n,c){return c==='MYR'?new Intl.NumberFormat('it-IT',{maximumFractionDigits:2}).format(n)+' MYR':eur(n)}
function euro(item){return item.currency==='MYR'?(Number(item.price)||0)/(Number(state.rate)||4.54):(Number(item.price)||0)}
function dmy(iso){if(!iso)return '';const p=String(iso).split('-');return p.length===3?`${p[2]}/${p[1]}/${p[0]}`:String(iso)}
function nowRome(){try{const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());const obj=Object.fromEntries(parts.map(x=>[x.type,x.value]));return `${obj.year}-${obj.month}-${obj.day}`}catch(e){return new Date().toISOString().slice(0,10)}}
function daysDiff(a,b){return Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000)}
function salaryDates(today){const out=[];const deadline='2027-03-31';for(let year=2026;year<=2027;year++)for(let month=1;month<=12;month++){const dt=`${year}-${String(month).padStart(2,'0')}-${String(Math.min(Number(state.payday)||27,28)).padStart(2,'0')}`;if(dt>=today && dt<=deadline)out.push(dt)}return out}
function math(){const expenses=state.items.map(i=>({...i,eur:euro(i)}));const total=expenses.reduce((sum,i)=>sum+i.eur,0);const unpaid=expenses.filter(i=>!i.paid).reduce((s,i)=>s+i.eur,0);const booked=expenses.filter(i=>i.kind!=='extra');const bookedCount=booked.filter(i=>i.booked).length;const paidTotal=total-unpaid;const remaining=Math.max(0,unpaid-(Number(state.reserved)||0));const salary=salaryDates(nowRome());return {expenses,total,unpaid,paidTotal,booked,bookedCount,remaining,salary,perMonth:salary.length?remaining/salary.length:null,bookRate:booked.length?bookedCount/booked.length:1,payRate:total?paidTotal/total:1};}
function load(){
  try{
    const raw=localStorage.getItem(KEY);
    if(raw){const p=JSON.parse(raw);
      if(p&&Array.isArray(p.items)&&p.items.length){state={...clone(DEFAULT_STATE),...p,items:p.items};return;}
    }
  }catch(error){/* Browser privacy settings or malformed local data: show initial values. */}
  state=clone(DEFAULT_STATE);
}
function save(preserveTimestamp=false){
  state.version=3;
  if(!preserveTimestamp)state.updatedAt=new Date().toISOString();
  if(!localCacheWrite()) {
    cloudStatus('error','Memoria locale non disponibile','Esporta subito un backup JSON: il browser ha rifiutato il salvataggio.');
  }
  updateSyncStatus();
  cloudQueueLocalChange(); // Also queues imported JSON; receiving onValue never calls save().
}
function setText(id,v){const el=$(id);if(el)el.textContent=v}
function renderKpis(){const m=math();const left=daysDiff(nowRome(),'2027-06-30');setText('k-budget',eur(m.total));setText('k-unpaid',eur(m.unpaid));setText('k-still-save',eur(m.remaining));setText('k-booked',`${m.bookedCount} / ${m.booked.length}`);setText('k-days',left>0?String(left):left===0?'Oggi':`Partenza trascorsa`);setText('k-monthly',m.perMonth!==null?eur(m.perMonth):'—');setText('next-paycheck',m.salary.length?`Stipendi rimanenti: ${m.salary.length} · ultimo 27 marzo 2027`:'Nessuno stipendio prima del termine stabilito');setText('k-sub-bookings',eur(m.booked.filter(i=>!i.booked).reduce((s,i)=>s+i.eur,0)));setText('k-paid',eur(m.paidTotal)); document.querySelectorAll('[data-price-item]').forEach(el=>{const item=state.items.find(i=>i.id===el.dataset.priceItem);if(item)el.textContent=rawPrice(item.price,item.currency);});setText('nav-today',`Oggi in Italia: ${dmy(nowRome())}`);setText('progress-book-label',`${Math.round(m.bookRate*100)}%`);setText('progress-paid-label',`${Math.round(m.payRate*100)}%`);$('progress-book').style.width=(m.bookRate*100)+'%';$('progress-paid').style.width=(m.payRate*100)+'%';setText('reserve-summary',`Fondo già accantonato: ${eur(state.reserved)}. Da risparmiare ancora: ${eur(m.remaining)}.`);
setText('net-desc',m.remaining<=0?'Il budget non ancora pagato risulta coperto dal fondo inserito.':m.perMonth===null?'La scadenza del 31 marzo 2027 è trascorsa: modifica le ipotesi o accantona subito il residuo.':`Accantonando ${eur(m.perMonth)} per ciascuno dei ${m.salary.length} stipendi residui, copriresti il fabbisogno indicato entro marzo.`);
setText('break-flights',eur(m.expenses.filter(x=>x.group==='Voli').reduce((s,i)=>s+i.eur,0)));setText('break-hotels',eur(m.expenses.filter(x=>x.group==='Hotel').reduce((s,i)=>s+i.eur,0)));setText('break-extras',eur(m.expenses.filter(x=>x.group==='Altre spese').reduce((s,i)=>s+i.eur,0)));
$('payday-list').innerHTML=m.salary.length?m.salary.map((date,i)=>`<div class="payday"><div><b>Stipendio ${i+1}</b><div class="muted small">${dmy(date)}</div></div><strong>${eur(m.perMonth)}</strong></div>`).join(''):'<div class="payday">Non ci sono altri stipendi entro il 31/03/2027.</div>';
}
function cardTemplate(i){const amount=euro(i);const extra=i.kind==='extra';const hotel=i.kind==='hotel';const icon=extra?ico('receipt'):hotel?ico('hotel'):ico('plane');const legs=i.legs?.length?i.legs.map(l=>`${dmy(l.date)} ${escapeHTML(l.from)} → ${escapeHTML(l.to)} · ${escapeHTML(l.depart||'orario?')}–${escapeHTML(l.arrive||'orario?')}${l.flight?' · '+escapeHTML(l.flight):''}`).join('<br>'):hotel?`${dmy(i.checkin)} → ${dmy(i.checkout)}${i.checkinTime?' · check-in '+escapeHTML(i.checkinTime):''}${i.checkoutTime?' · check-out '+escapeHTML(i.checkoutTime):''}`:'';
return `<article class="card booking-card ${extra?'extra':hotel?'hotel':'flight'} ${i.booked?'is-booked':''}"><div><div class="booking-header"><div class="booking-icon">${icon}</div><div class="booking-title"><h3>${escapeHTML(i.title)}</h3><p>${escapeHTML(i.subtitle||'')}</p><div class="book-tags">${i.kind!=='extra'?`<span class="tag ${i.booked?'':'tag-warning'}">${i.booked?ico('check','icon-sm')+' Prenotato':'Da prenotare'}</span>`:'<span class="tag">Budget stimato</span>'}<span class="tag ${i.paid?'':'tag-warning'}">${i.paid?ico('check','icon-sm')+' Pagato':'Non pagato'}</span>${i.confirmation?'<span class="tag">Codice: '+escapeHTML(i.confirmation)+'</span>':''}</div></div></div><div class="book-meta">${legs?`<div>${legs}</div>`:''}${i.baggage?`<div>${ico('luggage')} ${escapeHTML(i.baggage)}</div>`:''}${i.notes?`<div>${escapeHTML(i.notes)}</div>`:''}</div></div><div class="booking-money"><strong>${rawPrice(i.price,i.currency)}</strong>${i.currency==='MYR'?`<small>≈ ${eur(amount)} · cambio 1 € / ${String(state.rate).replace('.',',')} MYR</small>`:`<small>Prezzo totale per 2</small>`}</div><div class="booking-bottom"><div class="booking-flags">${!extra?`<label class="checkwrap"><input aria-label="Prenotato: ${escapeHTML(i.title)}" type="checkbox" data-action="book" data-id="${escapeHTML(i.id)}" ${i.booked?'checked':''}/> Prenotato</label>`:''}<label class="checkwrap paid"><input aria-label="Pagato: ${escapeHTML(i.title)}" type="checkbox" data-action="paid" data-id="${escapeHTML(i.id)}" ${i.paid?'checked':''}/> Pagato</label></div><div class="booking-actions"><button type="button" class="action-edit" data-action="edit" data-id="${escapeHTML(i.id)}">${ico('edit')} Modifica costo, orari e note</button>${i.custom?`<button type="button" class="action-delete" data-action="delete" data-id="${escapeHTML(i.id)}">${ico('trash')} Elimina</button>`:''}</div></div></article>`}
function renderList(){const items=state.items.filter(i=>filter==='all'||i.group===filter);$('booking-list').innerHTML=items.length?items.map(cardTemplate).join(''):'<div class="card empty-message">Non ci sono voci in questa categoria.</div>';setText('list-count',`${items.length} voci visualizzate · ${state.items.length} voci nel budget`)}
function render(){renderKpis();renderList()}
function editItem(id){editId=id;const i=state.items.find(x=>x.id===id);if(!i)return;setText('modal-heading',i.custom?'Modifica spesa personalizzata':'Modifica prenotazione / costo');const legs=i.kind==='flight'?`<div class="wide"><b style="font-size:.87rem">Tratte e orari (tutti modificabili)</b><div class="leg-list">${(i.legs||[]).map((l,j)=>`<div class="leg-row" data-leg="${j}"><div class="leg-header">Tratta ${j+1} · ${escapeHTML(l.from)} → ${escapeHTML(l.to)}</div><div class="field"><label>Da (aeroporto)</label><input name="from" value="${escapeHTML(l.from)}"/></div><div class="field"><label>A (aeroporto)</label><input name="to" value="${escapeHTML(l.to)}"/></div><div class="field"><label>Data partenza</label><input name="date" type="date" value="${escapeHTML(l.date)}"/></div><div class="field"><label>Numero volo</label><input name="flight" value="${escapeHTML(l.flight||'')}"/></div><div class="field"><label>Ora decollo</label><input name="depart" type="time" value="${escapeHTML(l.depart||'')}"/></div><div class="field"><label>Ora arrivo</label><input name="arrive" type="time" value="${escapeHTML(l.arrive||'')}"/></div></div>`).join('')}</div></div>`:i.kind==='hotel'?`<div class="field"><label>Check-in</label><input name="checkin" type="date" value="${escapeHTML(i.checkin||'')}"/></div><div class="field"><label>Check-out</label><input name="checkout" type="date" value="${escapeHTML(i.checkout||'')}"/></div><div class="field"><label>Ora check-in (facoltativa)</label><input name="checkinTime" type="time" value="${escapeHTML(i.checkinTime||'')}"/></div><div class="field"><label>Ora check-out (facoltativa)</label><input name="checkoutTime" type="time" value="${escapeHTML(i.checkoutTime||'')}"/></div>`:'';
$('edit-fields').innerHTML=`<div class="form-grid"><div class="field wide"><label>Nome voce</label><input name="title" maxlength="180" required value="${escapeHTML(i.title)}"/></div><div class="field wide"><label>Descrizione breve</label><input name="subtitle" value="${escapeHTML(i.subtitle||'')}"/></div><div class="field"><label>Prezzo totale per 2</label><input name="price" type="number" min="0" step="0.01" required value="${escapeHTML(i.price)}"/></div><div class="field"><label>Valuta</label><select name="currency"><option value="EUR" ${i.currency==='EUR'?'selected':''}>Euro (EUR)</option><option value="MYR" ${i.currency==='MYR'?'selected':''}>Ringgit (MYR)</option></select></div>${legs}<div class="field wide"><label>Bagagli / tipo camera (facoltativo)</label><input name="baggage" value="${escapeHTML(i.baggage||'')}"/></div><div class="field wide"><label>Codice prenotazione (facoltativo)</label><input name="confirmation" value="${escapeHTML(i.confirmation||'')}"/></div><div class="field wide"><label>Appunti / modifiche</label><textarea name="notes">${escapeHTML(i.notes||'')}</textarea></div></div>`;
$('edit-fields').querySelectorAll('.field').forEach((field,index)=>{
  const input=field.querySelector('input,select,textarea');
  const label=field.querySelector('label');
  if(input&&label){input.id='edit-field-'+index;label.htmlFor=input.id;}
});
$('edit-modal').showModal();}
function saveEdit(e){e.preventDefault();const i=state.items.find(x=>x.id===editId);if(!i)return;const form=$('edit-form');const get=name=>form.elements[name]?.value??'';i.title=get('title').trim()||'Senza titolo';i.subtitle=get('subtitle').trim();i.price=Math.max(0,Number(get('price'))||0);i.currency=get('currency')==='MYR'?'MYR':'EUR';i.baggage=get('baggage').trim();i.confirmation=get('confirmation').trim();i.notes=get('notes').trim();if(i.kind==='flight')i.legs=Array.from(form.querySelectorAll('[data-leg]'),r=>{const f=n=>r.querySelector(`[name="${n}"]`)?.value??'';return {from:f('from'),to:f('to'),date:f('date'),flight:f('flight'),depart:f('depart'),arrive:f('arrive')}});if(i.kind==='hotel'){i.checkin=get('checkin');i.checkout=get('checkout');i.checkinTime=get('checkinTime');i.checkoutTime=get('checkoutTime');}save();render();$('edit-modal').close();}
function addExpense(){const id='custom-'+Date.now().toString(36);state.items.push({id,kind:'extra',group:'Altre spese',title:'Nuova spesa',subtitle:'Personalizzabile',price:0,currency:'EUR',booked:false,paid:false,notes:'',custom:true});save();render();editItem(id)}
/* ------------------------------------------------------------------
   DEVICE TRANSFER — GitHub Pages hosts static files, not a database.
   State persists locally (same key as v2 to keep existing data).
   Transfer is EXPLICIT: validated JSON file, Web Share, or a gzip
   compressed URL fragment (#m2027=...). The fragment is not sent
   in HTTP requests, but CAN be saved by apps receiving the link.
   GitHub Pages never hosts the database; Firebase handles optional authorized cloud sync.
   The Firebase web API key is public configuration, not an admin secret.
   ------------------------------------------------------------------ */
const BACKUP_APP = 'malesia-2027';
const BACKUP_SCHEMA = 3;
const MAX_BACKUP_BYTES = 1_000_000;
const MAX_LINK_CHARS = 15000;
function syncFeedback(message, isError=false){
  const el=$('sync-feedback');
  if(!el)return;
  el.textContent=message;
  el.classList.toggle('is-error',isError);
}
function backupPayload(){
  return {
    app:BACKUP_APP, schema:BACKUP_SCHEMA, version:BACKUP_SCHEMA,
    exportedAt:new Date().toISOString(), updatedAt:state.updatedAt||null,
    rate:state.rate, reserved:state.reserved, payday:27,
    items:state.items
  };
}
function backupText(){return JSON.stringify(backupPayload(),null,2);}
function backupFilename(){
  return 'malesia-2027-backup-'+new Date().toISOString().slice(0,10)+'.json';
}
function saveFile(text, filename){
  const url=URL.createObjectURL(new Blob([text],{type:'application/json;charset=utf-8'}));
  const anchor=document.createElement('a');
  anchor.href=url;anchor.download=filename;document.body.appendChild(anchor);anchor.click();anchor.remove();
  setTimeout(()=>URL.revokeObjectURL(url),10000);
}
function exportData(){
  saveFile(backupText(),backupFilename());
  syncFeedback('Backup JSON scaricato. Sul nuovo dispositivo apri questa pagina e scegli Importa backup.');
}
function syncDate(date){
  if(typeof date!=='string'||!Number.isFinite(Date.parse(date)))return 'Nessuna modifica salvata';
  return 'Ultima modifica: '+new Intl.DateTimeFormat('it-IT',
    {dateStyle:'short',timeStyle:'short',timeZone:'Europe/Rome'}).format(new Date(date));
}
function updateSyncStatus(){
  setText('sync-last-updated',syncDate(state.updatedAt));
}
function clampText(value,max=600){return String(value??'').slice(0,max);}
function limitedNumber(n,min,max,fallback){
  const v=Number(n);return Number.isFinite(v)&&v>=min&&v<=max?v:fallback;
}
function validDate(s){
  const str=clampText(s,10);
  return /^\d{4}-\d{2}-\d{2}$/.test(str)?str:'';
}
function validTime(s){
  const str=clampText(s,5);
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(str)?str:'';
}
function parseBackup(text){
  if(typeof text!=='string'||new Blob([text]).size>MAX_BACKUP_BYTES){
    throw new Error('Il backup supera il limite di 1 MB.');
  }
  let obj;
  try{obj=JSON.parse(text);}catch(e){throw new Error('JSON non valido.');}
  if(!obj||typeof obj!=='object'||Array.isArray(obj))throw new Error('Backup non riconosciuto.');
  if(obj.app!==undefined&&obj.app!==BACKUP_APP)throw new Error('Il file non appartiene al kit Malesia 2027.');
  // Accept previous v2 backups as well as the new v3 envelope.
  const data=(obj.data&&typeof obj.data==='object')?obj.data:obj;
  if(!Array.isArray(data.items)||data.items.length<1||data.items.length>200){
    throw new Error('Elenco delle voci mancante o troppo lungo.');
  }
  const seen=new Set();
  const items=data.items.map((src,index)=>{
    if(!src||typeof src!=='object'||Array.isArray(src))throw new Error('Voce '+(index+1)+' non valida.');
    const kind=['flight','hotel','extra'].includes(src.kind)?src.kind:'extra';
    const id=clampText(src.id,100);
    if(!id||seen.has(id))throw new Error('Identificativo di una voce mancante o duplicato.');
    seen.add(id);
    const price=limitedNumber(src.price,0,1_000_000,NaN);
    if(!Number.isFinite(price))throw new Error('Importo non valido: '+id);
    const item={
      id,kind,group:kind==='flight'?'Voli':kind==='hotel'?'Hotel':'Altre spese',
      title:clampText(src.title,180)||'Senza titolo',
      subtitle:clampText(src.subtitle,380),
      currency:src.currency==='MYR'?'MYR':'EUR',price,
      booked:!!src.booked, paid:!!src.paid,
      baggage:clampText(src.baggage),notes:clampText(src.notes,4000),
      confirmation:clampText(src.confirmation,180),
      custom:!!src.custom
    };
    if(item.paid&&kind!=='extra')item.booked=true;
    if(kind==='hotel'){
      item.checkin=validDate(src.checkin);
      item.checkout=validDate(src.checkout);
      item.checkinTime=validTime(src.checkinTime);
      item.checkoutTime=validTime(src.checkoutTime);
    }
    if(kind==='flight'){
      item.legs=Array.isArray(src.legs)?src.legs.slice(0,15).map(l=>({
        from:clampText(l?.from,12),to:clampText(l?.to,12),
        date:validDate(l?.date),depart:validTime(l?.depart),
        arrive:validTime(l?.arrive),flight:clampText(l?.flight,45)
      })):[];
    }
    return item;
  });
  return {
    version:BACKUP_SCHEMA,
    rate:limitedNumber(data.rate,.01,1000,4.54),
    reserved:limitedNumber(data.reserved,0,100_000_000,0),
    payday:27,items,
    updatedAt:typeof data.updatedAt==='string'&&Number.isFinite(Date.parse(data.updatedAt))
      ?data.updatedAt:null
  };
}
function restoreBackup(text, origin='file'){
  const parsed=parseBackup(text);
  const last=syncDate(parsed.updatedAt);
  const message='Importare '+parsed.items.length+' voci da '+origin+'?\n'+last+
    '\nI dati attuali di QUESTO dispositivo verranno sostituiti. Consigliato: esporta prima un backup.';
  if(!window.confirm(message)){
    syncFeedback('Importazione annullata: nessun dato modificato.');
    return false;
  }
  state=parsed;
  save(true); // Preserve source timestamp; importing is not a new edit.
  $('exchange-rate').value=state.rate;
  $('reserved-fund').value=state.reserved;
  render();
  syncFeedback('Importazione completata. Budget, prenotazioni e checklist sono aggiornati su questo dispositivo.');
  return true;
}
async function importData(file){
  if(!file)return;
  if(file.size>MAX_BACKUP_BYTES){syncFeedback('File troppo grande (massimo 1 MB).',true);return;}
  try{restoreBackup(await file.text(),'file JSON');}
  catch(error){syncFeedback(error.message,true);window.alert('Impossibile importare il backup: '+error.message);}
}
async function shareBackupFile(){
  // The file-sharing API is optional. A JSON download always works as fallback.
  try{
    if(typeof File==='function'&&navigator.share){
      const file=new File([backupText()],backupFilename(),{type:'application/json'});
      if(!navigator.canShare||navigator.canShare({files:[file]})){
        await navigator.share({title:'Malesia 2027 · Backup',text:'Backup del travel companion da importare sul nuovo dispositivo.',files:[file]});
        syncFeedback('Backup condiviso. Apri il file su un altro dispositivo e importalo nella pagina.');
        return;
      }
    }
  }catch(error){if(error.name==='AbortError')return;}
  exportData();
  syncFeedback('Condivisione file non disponibile in questo browser: backup JSON scaricato.');
}
function bytesBase64Url(buffer){
  const bytes=new Uint8Array(buffer);let binary='';
  for(let i=0;i<bytes.length;i+=16384){binary+=String.fromCharCode(...bytes.subarray(i,i+16384));}
  return btoa(binary).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
}
function base64UrlBytes(text){
  if(!/^[A-Za-z0-9_-]{10,20000}$/.test(text))throw new Error('Link di trasferimento non valido.');
  const base64=text.replace(/-/g,'+').replace(/_/g,'/');
  const binary=atob(base64+'='.repeat((4-base64.length%4)%4));
  return Uint8Array.from(binary,ch=>ch.charCodeAt(0));
}
async function compressString(text){
  if(!('CompressionStream' in window))throw new Error('Il browser non supporta i link compressi. Usa il backup JSON.');
  const stream=new Blob([text]).stream().pipeThrough(new CompressionStream('gzip'));
  return bytesBase64Url(await new Response(stream).arrayBuffer());
}
async function decompressString(token){
  if(!('DecompressionStream' in window))throw new Error('Il browser non supporta questo link. Trasferisci il file JSON.');
  const bytes=base64UrlBytes(token);
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  const reader=stream.getReader();
  // Read incrementally: never load an unbounded gzip expansion into memory.
  const chunks=[];
  let size=0;
  while(true){
    const {value,done}=await reader.read();
    if(done)break;
    size+=value.byteLength;
    if(size>MAX_BACKUP_BYTES){await reader.cancel();throw new Error('Backup compresso troppo grande.');}
    chunks.push(value);
  }
  const output=new Uint8Array(size);
  let offset=0;
  for(const chunk of chunks){output.set(chunk,offset);offset+=chunk.byteLength;}
  return new TextDecoder('utf-8',{fatal:true}).decode(output);
}
async function backupLink(){
  if(location.protocol!=='https:'&&location.protocol!=='http:')throw new Error('I link sono disponibili una volta pubblicato il sito su GitHub Pages. Ora usa il JSON.');
  const url=new URL(location.href);
  url.hash='m2027='+await compressString(JSON.stringify(backupPayload()));
  if(url.href.length>MAX_LINK_CHARS)throw new Error('Troppi dati per un link affidabile: trasferisci il file JSON.');
  return url.href;
}
async function copyTransferLink(){
  try{
    const link=await backupLink();
    if(navigator.clipboard&&navigator.clipboard.writeText){
      try{await navigator.clipboard.writeText(link);
        syncFeedback('Link copiato. Aprilo sul secondo dispositivo e conferma l’importazione.');return;
      }catch(error){/* Graceful fallback for browsers blocking clipboard. */}
    }
    $('sync-paste-content').value=link;
    $('sync-paste-dialog').showModal();
    $('sync-paste-content').focus();$('sync-paste-content').select();
    syncFeedback('Seleziona e copia il link mostrato nella finestra.');
  }catch(error){syncFeedback(error.message,true);}
}
async function importFromText(input){
  const value=String(input||'').trim();
  if(!value)throw new Error('Incolla prima il contenuto del backup o il link.');
  const token=value.match(/#m2027=([A-Za-z0-9_-]+)/);
  const json=token?await decompressString(token[1]):value;
  return restoreBackup(json,token?'link di trasferimento':'JSON incollato');
}
async function importFromLocationHash(){
  const match=window.location.hash.match(/^#m2027=([A-Za-z0-9_-]+)$/);
  if(!match)return;
  // Remove the personal backup from the address bar as soon as we read it.
  try{history.replaceState(history.state,'',location.pathname+location.search);}
  catch(error){/* If unavailable, importing still works. */}
  try{
    const text=await decompressString(match[1]);
    restoreBackup(text,'link di trasferimento');
  }catch(error){
    syncFeedback('Impossibile aprire il link: '+error.message,true);
  }
}
function setupSyncUi(){
  $('sync-copy-link').addEventListener('click',copyTransferLink);
  $('sync-share-file').addEventListener('click',shareBackupFile);
  $('sync-open-paste').addEventListener('click',()=>{
    $('sync-paste-content').value='';$('sync-paste-dialog').showModal();
  });
  $('sync-paste-close').addEventListener('click',()=>$('sync-paste-dialog').close());
  $('sync-paste-apply').addEventListener('click',async()=>{
    try{if(await importFromText($('sync-paste-content').value))$('sync-paste-dialog').close();}
    catch(error){syncFeedback(error.message,true);window.alert(error.message);}
  });
  $('sync-paste-dialog').addEventListener('click',event=>{
    if(event.target===$('sync-paste-dialog'))$('sync-paste-dialog').close();
  });
  window.addEventListener('storage',event=>{
    if(event.key!==KEY)return;
    load();$('exchange-rate').value=state.rate;$('reserved-fund').value=state.reserved;
    render();syncFeedback('Dati aggiornati da un’altra scheda di questo browser.');
  });
  updateSyncStatus();
  // Do not auto-import without user confirmation. The URL is one-time transport.
  importFromLocationHash();
}

/* ================================================================
   GOOGLE AUTH + FIREBASE REALTIME DATABASE (SDK 13.2.0)
   - Google Sign-In validates identity; only DATABASE RULES grant access.
   - The cloud node is a shared travel plan, not a per-user collection.
   - UI remains fully available if Firebase/CDN is unavailable.
   - localStorage is the offline cache AND a durable queue of user edits.
   - Incoming onValue updates never call save(), so they cannot echo
     themselves back to Firebase in an infinite feedback loop.
   - Reconnect flushes only if the remote fingerprint still equals the
     baseline last downloaded by this browser; otherwise the user decides.
   - Simultaneous online writes may still follow last-write-wins: this
     simple static architecture is not an atomic collaborative editor.
   ================================================================ */
const CLOUD_NODE = 'viaggio_malesia_2027/stato';
const PENDING_KEY = KEY + ':cloud-pending-v1';
const BASE_KEY = KEY + ':cloud-baseline-v1';
const SDK_VERSION = '13.2.0';
// FIREBASE SETUP: replace databaseURL with the exact Realtime Database URL
// from Firebase Console > Realtime Database > Data. The URL provided in the
// request (https://firebasedatabase.app) was only a domain placeholder.
const firebaseConfig = {
  apiKey: 'AIzaSyBGOr4ZN6JNX6YNBbFZCUzsSUalX5LwZUQ',
  authDomain: 'malesia-2027.firebaseapp.com',
  databaseURL: 'https://malesia-2027-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'malesia-2027',
  storageBucket: 'malesia-2027.firebasestorage.app',
  messagingSenderId: '270974190926',
  appId: '1:270974190926:web:287fc578c4acdc0ac7ca1f'
};

const cloud = {
  sdk:null, auth:null, database:null, provider:null,
  user:null, connected:null, authorized:false, ready:false,
  loading:true, configured:false, denied:false,
  unsubscribeState:null, unsubscribeConnection:null,
  stateRef:null, remote:null, remoteFingerprint:null,
  writeInFlight:false, writeFingerprint:null, writeTimer:0,
  conflict:false, errorMessage:'', importPending:false,
  volatilePending:null
};

function dbUrlValid(value){
  try {
    const url = new URL(value);
    return url.protocol==='https:' &&
      (/\.firebasedatabase\.app$/.test(url.hostname)||/\.firebaseio\.com$/.test(url.hostname)) &&
      url.hostname!=='firebasedatabase.app' && url.hostname!=='firebaseio.com';
  } catch(error){return false;}
}
function normalizedData(payload){
  return parseBackup(JSON.stringify(payload)); // Schema verification is shared with JSON imports.
}
function dataFingerprint(payload){
  const v=normalizedData(payload);
  // updatedAt is an informational timestamp, not a content change.
  return JSON.stringify({rate:v.rate,reserved:v.reserved,payday:v.payday,items:v.items});
}
function cloudPayload(){
  return {
    app:BACKUP_APP, schema:BACKUP_SCHEMA, version:BACKUP_SCHEMA,
    rate:state.rate, reserved:state.reserved, payday:27,
    items:clone(state.items), updatedAt:state.updatedAt||null
  };
}
function pendingRead(){
  try{
    const text=localStorage.getItem(PENDING_KEY);
    return text?JSON.parse(text):cloud.volatilePending;
  }catch(error){return cloud.volatilePending;}
}
function pendingStore(value){
  cloud.volatilePending=value;
  try{if(value)localStorage.setItem(PENDING_KEY,JSON.stringify(value));else localStorage.removeItem(PENDING_KEY);}
  catch(error){/* Fallback in memory; user may still export JSON. */}
}
function baseRead(){try{return localStorage.getItem(BASE_KEY);}catch(error){return null;}}
function baseStore(value){try{localStorage.setItem(BASE_KEY,value);}catch(error){/* Still works this session. */}}
function localCacheWrite(){
  try{localStorage.setItem(KEY,JSON.stringify(state));return true;}
  catch(error){return false;}
}
function useRemoteData(data,fingerprint){
  try{
    state=normalizedData(data);
    if(!localCacheWrite())cloudNotify('Memoria locale non disponibile: esporta un backup JSON.',true);
    baseStore(fingerprint);
    $('exchange-rate').value=state.rate;
    $('reserved-fund').value=state.reserved;
    render();updateSyncStatus();
  }catch(error){
    cloudNotify('Dati cloud non validi; il backup locale resta intatto.',true);
  }
}
function cloudNotify(message,isError=false){
  const msg=$('cloud-feedback');if(!msg)return;
  msg.textContent=message;msg.classList.toggle('is-error',isError);
}
function cloudStatus(type, message, detail){
  const badge=$('save-status');
  if(badge){badge.textContent=message;badge.dataset.sync=type;badge.title=detail||message;}
  const dot=$('cloud-state-dot');if(dot)dot.dataset.sync=type;
  setText('cloud-state-title',message);
  if(detail!==undefined)setText('cloud-state-detail',detail);
}
function cloudStatusRefresh(){
  const email=cloud.user?.email||'account Google';
  if(!navigator.onLine){cloudStatus('offline','Offline · Salvataggio locale','Le modifiche restano sul dispositivo.');return;}
  if(cloud.loading){cloudStatus('connecting','Firebase in caricamento…','L’itinerario e il budget funzionano anche senza cloud.');return;}
  if(!cloud.auth){cloudStatus('local','Cloud non disponibile · Dati locali','Il servizio di autenticazione non è raggiungibile.');return;}
  if(!cloud.user){cloudStatus('local','Accesso richiesto per sync cloud','Accedi con Google per sincronizzare il budget tra dispositivi.');return;}
  if(!cloud.configured){cloudStatus('config','Configura il database Firebase','Inserisci il databaseURL reale nel file index.html.');return;}
  if(cloud.denied){cloudStatus('denied','Account non autorizzato','Account non autorizzato alla sincronizzazione cloud. Visualizzazione in modalità locale.');return;}
  if(cloud.conflict){cloudStatus('conflict','Conflitto dati · Azione necessaria','Sono disponibili versioni locali e cloud differenti. Scegli quale conservare.');return;}
  if(cloud.connected===false){cloudStatus('offline','Offline · Salvataggio locale','Le modifiche saranno inviate alla riconnessione.');return;}
  if(cloud.writeInFlight || pendingRead()){cloudStatus('pending','Modifiche in sincronizzazione','Le modifiche sono salvate localmente e saranno inviate al cloud.');return;}
  if(!cloud.ready){cloudStatus('connecting','Connessione al cloud…','Verifica autorizzazioni e download dei dati.');return;}
  cloudStatus('synced',`Sincronizzato (${email})`,'Google Login attivo · Firebase Realtime Database collegato.');
}
function cloudQueueLocalChange(){
  // Every UI edit or manual JSON import calls this once via save().
  const previous=pendingRead();
  const record={
    data:cloudPayload(),
    base:previous ? previous.base : baseRead(),
    changedAt:Date.now()
  };
  pendingStore(record);
  cloudStatusRefresh();
  if(cloud.ready && cloud.authorized && !cloud.conflict)scheduleCloudWrite();
}
function scheduleCloudWrite(){
  clearTimeout(cloud.writeTimer);
  cloud.writeTimer=window.setTimeout(flushPending,650);
}
function cloudShowConflict(remote){
  cloud.remote=remote;cloud.conflict=true;
  const area=$('cloud-conflict');if(area)area.hidden=false;
  cloudStatusRefresh();
  cloudNotify('Sono presenti modifiche diverse su questo dispositivo e nel cloud. Scegli quale versione usare; nessun dato verrà sovrascritto automaticamente.',true);
}
function cloudHideConflict(){
  cloud.conflict=false;
  const area=$('cloud-conflict');if(area)area.hidden=true;
  cloudNotify('');
}
function handlePermissionError(error){
  const code=String(error?.code||'').toLowerCase().replace(/[-_\s]/g,'');
  if(code.includes('permissiondenied')||code.includes('permission')){
    cloud.denied=true;cloud.authorized=false;cloud.ready=false;
    cloudHideConflict();
    clearTimeout(cloud.writeTimer);
    cloudNotify('Account non autorizzato alla sincronizzazione cloud. Il sito resta utilizzabile in modalità locale.',true);
  } else {
    cloud.ready=false;
    cloud.errorMessage=error?.message||String(error);
    cloudNotify('Connessione Firebase non disponibile. I dati restano salvati localmente.',true);
  }
  cloudStatusRefresh();
}
async function flushPending(){
  if(!cloud.ready||!cloud.authorized||cloud.denied||!cloud.user ||
     cloud.conflict||cloud.connected!==true||cloud.writeInFlight)return;
  const record=pendingRead();if(!record)return;
  const targetFP=dataFingerprint(record.data);
  if(cloud.remoteFingerprint && cloud.remoteFingerprint!==record.base && cloud.remoteFingerprint!==targetFP){
    cloudShowConflict(cloud.remote);return;
  }
  cloud.writeInFlight=true;cloud.writeFingerprint=targetFP;
  cloudStatusRefresh();
  const uid=cloud.user.uid;
  try{
    // One deliberate write, not one per onValue callback. Existing data at
    // the shared node is replaced only after initial read/reconciliation.
    await cloud.sdk.set(cloud.stateRef,record.data);
    if(cloud.user?.uid!==uid)return;
    const current=pendingRead();
    baseStore(targetFP);
    cloud.remoteFingerprint=targetFP;
    cloud.remote=record.data;
    if(current && dataFingerprint(current.data)===targetFP){
      pendingStore(null);
    }else if(current){
      // A newer local edit arrived while this write was in flight.
      current.base=targetFP;
      pendingStore(current);
    }
    cloudNotify('Modifiche confermate su Firebase Realtime Database.');
  }catch(error){
    // Always preserve pending state on permission/network errors.
    handlePermissionError(error);
  }finally{
    cloud.writeInFlight=false;cloud.writeFingerprint=null;
    cloudStatusRefresh();
    if(cloud.ready && pendingRead() && !cloud.conflict)scheduleCloudWrite();
  }
}
function remoteValueReceived(value){
  cloud.ready=true;cloud.authorized=true;cloud.denied=false;
  if(value===null){
    cloud.remote=null;cloud.remoteFingerprint=null;
    // Empty database: seed with locally cached plan only after authorized read.
    if(!pendingRead())cloudQueueLocalChange();
    scheduleCloudWrite();cloudStatusRefresh();return;
  }
  let fp;
  try{fp=dataFingerprint(value);}catch(error){
    cloud.ready=false;
    cloudNotify('Il nodo Firebase contiene dati in formato inatteso. Non verrà sovrascritto.',true);
    cloudStatus('error','Formato cloud non valido','Controlla il nodo viaggio_malesia_2027/stato.');return;
  }
  cloud.remote=value;cloud.remoteFingerprint=fp;
  const pending=pendingRead();
  if(cloud.writeInFlight){
    // Local optimistic events may arrive before set() has been acknowledged.
    // Never clear the durable queue merely because onValue fired.
    cloudStatusRefresh();return;
  }
  if(pending){
    const pendingFP=dataFingerprint(pending.data);
    if(fp===pendingFP){
      pendingStore(null);baseStore(fp);cloudHideConflict();useRemoteData(value,fp);
    }else if(pending.base===fp){
      // Remote is unchanged since this browser last downloaded it.
      cloudHideConflict();scheduleCloudWrite();
    }else{
      cloudShowConflict(value);
    }
  }else{
    // After first login, don't silently overwrite meaningful legacy local
    // edits from a version that had only localStorage and no cloud baseline.
    if(!baseRead() && dataFingerprint(state)!==dataFingerprint(DEFAULT_STATE) &&
       dataFingerprint(state)!==fp){
      pendingStore({data:cloudPayload(),base:null,changedAt:Date.now()});
      cloudShowConflict(value);
    }else{
      cloudHideConflict();useRemoteData(value,fp);
    }
  }
  cloudStatusRefresh();
}
function detachCloudListeners(){
  clearTimeout(cloud.writeTimer);
  if(cloud.unsubscribeState){cloud.unsubscribeState();cloud.unsubscribeState=null;}
  if(cloud.unsubscribeConnection){cloud.unsubscribeConnection();cloud.unsubscribeConnection=null;}
  cloud.remote=null;cloud.remoteFingerprint=null;
  cloud.ready=false;cloud.authorized=false;cloud.connected=null;
  cloud.writeInFlight=false;cloud.denied=false;
  cloudHideConflict();
}
function renderUser(user){
  const login=$('google-login');const profile=$('google-profile');
  login.hidden=!!user;profile.hidden=!user;
  if(user){
    setText('auth-email',user.email||'Account Google');
    const avatar=$('auth-avatar');
    const photo=String(user.photoURL||'');
    if(/^https:\/\//i.test(photo)){avatar.src=photo;avatar.hidden=false;}
    else{avatar.hidden=true;avatar.removeAttribute('src');}
  }
}
function updateUser(user){
  detachCloudListeners();
  cloud.user=user;renderUser(user);
  if(!user){cloudStatusRefresh();return;}
  if(!cloud.configured){cloudStatusRefresh();return;}
  try{
    cloud.database=cloud.sdk.getDatabase(cloud.sdk.app);
    cloud.stateRef=cloud.sdk.ref(cloud.database,CLOUD_NODE);
    const connectionRef=cloud.sdk.ref(cloud.database,'.info/connected');
    cloud.unsubscribeConnection=cloud.sdk.onValue(connectionRef,snapshot=>{
      cloud.connected=snapshot.val()===true;
      cloudStatusRefresh();
      if(cloud.connected && cloud.ready && pendingRead())scheduleCloudWrite();
    },handlePermissionError);
    cloud.unsubscribeState=cloud.sdk.onValue(cloud.stateRef,snapshot=>{
      remoteValueReceived(snapshot.val());
    },handlePermissionError);
  }catch(error){handlePermissionError(error);}
  cloudStatusRefresh();
}
async function setupFirebase(){
  cloud.configured=dbUrlValid(firebaseConfig.databaseURL);
  cloudStatusRefresh();
  try{
    // Dynamic imports are deliberate: a failed CDN request must NOT prevent
    // the local app from initializing (important while flying/offline).
    const root='https://www.gstatic.com/firebasejs/'+SDK_VERSION+'/';
    const [core,authSDK,dbSDK]=await Promise.all([
      import(root+'firebase-app.js'),
      import(root+'firebase-auth.js'),
      import(root+'firebase-database.js')
    ]);
    const app=core.initializeApp(firebaseConfig);
    const auth=authSDK.getAuth(app);
    const provider=new authSDK.GoogleAuthProvider();
    cloud.sdk={app,getDatabase:dbSDK.getDatabase,ref:dbSDK.ref,
      set:dbSDK.set,onValue:dbSDK.onValue};
    cloud.auth=auth;cloud.provider=provider;
    cloud.loading=false;
    const button=$('google-login');button.disabled=false;
    button.addEventListener('click',()=>{
      // Starts within the user gesture: reduces popup-blocker problems.
      authSDK.signInWithPopup(auth,provider).catch(error=>{
        if(error.code==='auth/popup-closed-by-user'||error.code==='auth/cancelled-popup-request')return;
        const message=error.code==='auth/unauthorized-domain'
          ?'Dominio non autorizzato. Aggiungi il dominio github.io del sito nelle impostazioni Firebase Authentication.'
          :error.code==='auth/popup-blocked'
            ?'Il browser ha bloccato la finestra Google. Consenti i popup per questo sito.'
            :'Non è stato possibile accedere con Google: '+(error.message||error.code);
        cloudNotify(message,true);
      });
    });
    $('google-logout').addEventListener('click',()=>{
      authSDK.signOut(auth).catch(error=>cloudNotify('Impossibile uscire: '+error.message,true));
    });
    authSDK.onAuthStateChanged(auth,user=>updateUser(user),error=>{
      cloudNotify('Autenticazione non disponibile: '+error.message,true);
      cloud.loading=false;cloudStatusRefresh();
    });
    cloudStatusRefresh();
  }catch(error){
    cloud.loading=false;cloud.errorMessage=error?.message||String(error);
    cloudStatusRefresh();
    cloudNotify('Firebase non raggiungibile. Continua a usare il sito e salva un backup JSON.',true);
  }
}
function setupCloudUI(){
  $('google-login').disabled=true;
  cloudStatusRefresh();
  $('cloud-use-local').addEventListener('click',()=>{
    if(!cloud.conflict||!cloud.remote)return;
    if(!window.confirm('Sostituire la versione cloud con i dati salvati su questo dispositivo? Gli altri dispositivi riceveranno questa versione.'))return;
    const p=pendingRead()||{data:cloudPayload(),changedAt:Date.now()};
    p.base=cloud.remoteFingerprint;
    pendingStore(p);cloudHideConflict();scheduleCloudWrite();cloudStatusRefresh();
  });
  $('cloud-use-remote').addEventListener('click',()=>{
    if(!cloud.conflict||!cloud.remote)return;
    if(!window.confirm('Sostituire i dati di QUESTO dispositivo con la versione cloud? Esporta prima un backup JSON se vuoi conservarli.'))return;
    pendingStore(null);cloudHideConflict();
    useRemoteData(cloud.remote,cloud.remoteFingerprint);cloudStatusRefresh();
  });
  window.addEventListener('online',()=>{cloudStatusRefresh();if(cloud.ready)scheduleCloudWrite();});
  window.addEventListener('offline',cloudStatusRefresh);
  setupFirebase();
}


function init(){load();$('exchange-rate').value=state.rate;$('reserved-fund').value=state.reserved;$('exchange-rate').addEventListener('change',e=>{const x=Number(e.target.value);state.rate=x>0?x:4.54;save();render();});$('reserved-fund').addEventListener('input',e=>{state.reserved=Math.max(0,Number(e.target.value)||0);save();renderKpis()});$('booking-list').addEventListener('change',e=>{const t=e.target;if(t.tagName!=='INPUT')return;const i=state.items.find(x=>x.id===t.dataset.id);if(!i)return;if(t.dataset.action==='book'){i.booked=t.checked;if(!i.booked)i.paid=false;}else if(t.dataset.action==='paid'){i.paid=t.checked;if(i.paid&&i.kind!=='extra')i.booked=true;}save();render();
const replacement=Array.from($('booking-list').querySelectorAll('input[data-action]')).find(input=>input.dataset.id===t.dataset.id&&input.dataset.action===t.dataset.action);
if(replacement)replacement.focus({preventScroll:true});
});$('booking-list').addEventListener('click',e=>{const t=e.target.closest('button[data-action]');if(!t)return;if(t.dataset.action==='edit')editItem(t.dataset.id);if(t.dataset.action==='delete'&&confirm('Eliminare questa spesa personalizzata?')){state.items=state.items.filter(x=>x.id!==t.dataset.id);save();render()}});document.querySelectorAll('.tab[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab[data-filter]').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-pressed','false');});b.classList.add('active');b.setAttribute('aria-pressed','true');filter=b.dataset.filter;renderList()}));$('edit-form').addEventListener('submit',saveEdit);$('close-modal').addEventListener('click',()=>$('edit-modal').close());$('cancel-edit').addEventListener('click',()=>$('edit-modal').close());$('add-expense').addEventListener('click',addExpense);$('export-json').addEventListener('click',exportData);$('import-btn').addEventListener('click',()=>$('import-json').click());$('import-json').addEventListener('change',e=>{importData(e.target.files?.[0]);e.target.value=''});$('reset-all').addEventListener('click',()=>{if(confirm('Ripristinare tutti i costi e gli stati iniziali? Esporta prima un backup se vuoi conservare le modifiche.')){state=clone(DEFAULT_STATE);save();$('exchange-rate').value=state.rate;$('reserved-fund').value=state.reserved;render();}});$('print-page').addEventListener('click',()=>window.print());render();setupSyncUi();setupCloudUI();}
document.addEventListener('DOMContentLoaded',init);
})();
