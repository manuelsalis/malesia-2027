/* DOM regression tests. No rendering engine: this does NOT certify visual layout.
   npm install --no-save jsdom css-tree
   node tests/verify.cjs */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {JSDOM, VirtualConsole} = require('jsdom');
const cssTree = require('css-tree');
const html = fs.readFileSync(path.join(__dirname, '../index.html'),'utf8');
const source = [...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].map(x=>x[2]);
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
const cssErrors=[];
cssTree.parse(css,{onParseError:e=>cssErrors.push(e.message)});
assert.deepEqual(cssErrors,[]);
let passed=0;
function check(name, fn) { fn(); passed++; console.log('PASS '+name); }
async function app(saved, options = {}) {
  const errors=[];
  const vc=new VirtualConsole();
  vc.on('jsdomError',error=>{if(error.type!=='css-parsing')errors.push(error.message)});
  const dom=new JSDOM(html,{url:'https://example.test/malesia/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window;
  await new Promise(resolve=>w.addEventListener('load',resolve,{once:true}));
  const media = new Map();
  w.matchMedia=query=>{
    if(!media.has(query)) media.set(query,{matches:query.includes('reduced-motion')?!!options.reduced:query.includes('pointer: fine')?!!options.pointer:query.includes('1240px')?!!options.desktop:false,media:query,listeners:[],addEventListener(type,fn){this.listeners.push(fn)},removeEventListener(type,fn){this.listeners=this.listeners.filter(x=>x!==fn)}});
    return media.get(query);
  };
  w.setTestMedia=(query,matches)=>{const m=w.matchMedia(query);m.matches=matches;m.listeners.forEach(fn=>fn({matches}))};
  w.testAnimations=[];
  if(options.animations){
    w.Element.prototype.animate=function(frames,settings){
      const animation={element:this,frames,settings,cancelled:false,cancel(){this.cancelled=true},onfinish:null};
      w.testAnimations.push(animation);return animation;
    };
    w.Element.prototype.getAnimations=function(){return w.testAnimations.filter(a=>a.element===this&&!a.cancelled)};
  }
  w.testObservers=[];
  if(options.intersection) w.IntersectionObserver=class {
    constructor(callback){this.callback=callback;this.targets=new Set();w.testObservers.push(this)}
    observe(el){this.targets.add(el)} unobserve(el){this.targets.delete(el)} disconnect(){this.targets.clear()}
  };
  w.confirm=()=>true; w.alert=()=>{};
  w.scrollTo=()=>{};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'))};
  const nativeAnchorClick=w.HTMLAnchorElement.prototype.click;
  w.HTMLAnchorElement.prototype.click=function(){if(!this.hasAttribute('download'))nativeAnchorClick.call(this)};
  w.URL.createObjectURL=()=> 'blob:test';w.URL.revokeObjectURL=()=>{};
  if(saved)w.localStorage.setItem('malesia-2027-planner-v2',saved);
  source.forEach(s=>w.eval(s));
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  await new Promise(resolve=>setTimeout(resolve,20));
  return {dom,w,d:w.document,errors};
}
(async()=>{
  const {dom,w,d,errors}=await app();
  const $=s=>d.querySelector(s), all=s=>[...d.querySelectorAll(s)];
  const click=s=>$(s).click();
  const change=(s,value,event='change')=>{const el=$(s);el.value=value;el.dispatchEvent(new w.Event(event,{bubbles:true}))};
  const stored=()=>JSON.parse(w.localStorage.getItem('malesia-2027-planner-v2'));
  const money=s=>Number($(s).textContent.replace(/\./g,'').replace(',','.').replace(/[^\d.-]/g,''));
  check('CSS syntax',()=>assert.equal(cssErrors.length,0));
  check('Unique IDs and valid fragment links',()=>{
    const ids=all('[id]').map(x=>x.id);assert.equal(ids.length,new Set(ids).size);
    all('a[href^="#"]').forEach(a=>{if(a.hash.length>1)assert.ok(d.getElementById(a.hash.slice(1)),a.hash)});
  });
  check('All static images have alternative text',()=>assert.equal(all('img:not([alt])').length,0));
  check('All 17 chronological days retained',()=>{
    for(let n=1;n<=17;n++)assert.ok(d.getElementById('giorno-'+n),'giorno-'+n);
  });
  const count=all('.booking-card').length;
  check('Local planner initializes while external services are unavailable',()=>{assert.ok(count>=12);assert.ok(money('#k-budget')>3000);});
  check('Mobile menu opens, announces state and closes with Escape',()=>{
    assert.equal($('#mobile-menu').hidden,true);click('#menu-toggle');
    assert.equal($('#mobile-menu').hidden,false);assert.equal($('#menu-toggle').getAttribute('aria-expanded'),'true');
    d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
    assert.equal($('#mobile-menu').hidden,true);assert.equal(d.activeElement,$('#menu-toggle'));
  });
  check('Menu anchor closes disclosure and moves focus to destination',()=>{
    click('#menu-toggle');click('#mobile-menu a[href="#budget"]');
    assert.equal($('#mobile-menu').hidden,true);assert.equal(d.activeElement,$('#budget'));
  });
  check('Booking filters update content and pressed state',()=>{
    click('[data-filter="Hotel"]');assert.equal(all('.booking-card').length,4);
    assert.equal($('[data-filter="Hotel"]').getAttribute('aria-pressed'),'true');
    assert.equal($('[data-filter="all"]').getAttribute('aria-pressed'),'false');
    click('[data-filter="all"]');assert.equal(all('.booking-card').length,count);
  });
  check('Paid status also confirms a booking and persists',()=>{
    const paid=$('[data-action="paid"][data-id="flight-international"]');paid.checked=true;paid.dispatchEvent(new w.Event('change',{bubbles:true}));
    const flight=stored().items.find(x=>x.id==='flight-international');assert.equal(flight.paid,true);assert.equal(flight.booked,true);
    assert.equal(money('#k-paid'),1250.06);
  });
  check('Unbooking resets paid status',()=>{
    const booked=$('[data-action="book"][data-id="flight-international"]');booked.checked=false;booked.dispatchEvent(new w.Event('change',{bubbles:true}));
    assert.equal(stored().items.find(x=>x.id==='flight-international').paid,false);
  });
  check('Reserve and exchange rate recalculate budget',()=>{
    const before=money('#k-budget');change('#reserved-fund','600','input');assert.equal(stored().reserved,600);
    change('#exchange-rate','5');assert.equal(stored().rate,5);assert.notEqual(money('#k-budget'),before);
  });
  check('Edit flight: labels, dates, notes, price and save',()=>{
    click('[data-action="edit"][data-id="flight-international"]');assert.equal($('#edit-modal').open,true);
    all('#edit-fields input,#edit-fields select,#edit-fields textarea').forEach(input=>assert.ok(d.querySelector('label[for="'+input.id+'"]'),input.name));
    change('#edit-form [name="price"]','1300');change('#edit-form [name="notes"]','Nota <b>letterale</b>');
    $('#edit-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
    const item=stored().items.find(x=>x.id==='flight-international');assert.equal(item.price,1300);assert.equal(item.notes,'Nota <b>letterale</b>');assert.equal($('#edit-modal').open,false);
    assert.ok($('.book-meta').textContent.includes('<b>letterale</b>'));
  });
  check('Hotel edit fields are also labeled',()=>{
    click('[data-action="edit"][data-id="hotel-kl-first"]');
    all('#edit-fields input,#edit-fields select,#edit-fields textarea').forEach(input=>assert.ok(d.querySelector('label[for="'+input.id+'"]')));
    click('#cancel-edit');assert.equal($('#edit-modal').open,false);
  });
  check('Custom expense adds, edits and deletes',()=>{
    click('#add-expense');change('#edit-form [name="title"]','Test transfer');change('#edit-form [name="price"]','25');
    $('#edit-form').dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
    const item=stored().items.find(x=>x.title==='Test transfer');assert.equal(item.price,25);
    click('[data-action="delete"][data-id="'+item.id+'"]');assert.equal(stored().items.some(x=>x.id===item.id),false);
  });
  check('Gallery opens, changes photo and closes',()=>{
    click('.photo-button');assert.equal($('#photo-viewer').open,true);const title=$('#viewer-title').textContent;
    click('#viewer-next');assert.notEqual($('#viewer-title').textContent,title);
    click('#close-viewer');assert.equal($('#photo-viewer').open,false);
  });
  check('Backup export action remains available',()=>click('#export-json'));
  const backup=JSON.stringify(stored());
  click('#sync-open-paste');change('#sync-paste-content',backup);click('#sync-paste-apply');
  await new Promise(resolve=>setTimeout(resolve,20));
  check('JSON backup restores local data',()=>{assert.equal($('#sync-paste-dialog').open,false);assert.equal(stored().reserved,600)});
  click('#sync-open-paste');change('#sync-paste-content','{"invalid":true}');click('#sync-paste-apply');
  await new Promise(resolve=>setTimeout(resolve,20));
  check('Invalid backup is rejected without clearing data',()=>{assert.equal($('#sync-paste-dialog').open,true);assert.equal(stored().reserved,600)});
  const saved=w.localStorage.getItem('malesia-2027-planner-v2');
  const reload=await app(saved);
  check('Local state survives a fresh page load',()=>assert.equal(reload.d.querySelector('#reserved-fund').value,'600'));
  check('No unhandled DOM execution errors',()=>assert.deepEqual(errors,[]));
  reload.dom.window.close();dom.window.close();
  const premium=await app(undefined,{animations:true,intersection:true,pointer:true});
  const pw=premium.w,pd=premium.d,pq=s=>pd.querySelector(s);
  check('Dark native color scheme is declared',()=>assert.equal(pq('meta[name="color-scheme"]').content,'dark'));
  check('Menu opening animates and remains accessible',()=>{
    pq('#menu-toggle').click();assert.equal(pq('#mobile-menu').hidden,false);assert.equal(pq('#mobile-menu').inert,false);
    assert.equal(pw.testAnimations.at(-1).settings.duration,300);pw.testAnimations.at(-1).onfinish();
  });
  check('Closing animation makes the disclosure inert immediately',()=>{
    pq('#menu-toggle').click();assert.equal(pq('#mobile-menu').inert,true);assert.equal(pq('#menu-toggle').getAttribute('aria-expanded'),'false');
    pw.testAnimations.at(-1).onfinish();assert.equal(pq('#mobile-menu').hidden,true);
  });
  check('Rapid toggle and motion preference change cannot leave a stuck menu',()=>{
    pq('#menu-toggle').click();const first=pw.testAnimations.at(-1);pq('#menu-toggle').click();assert.equal(first.cancelled,true);
    pw.setTestMedia('(prefers-reduced-motion: reduce)',true);
    assert.equal(pq('#mobile-menu').hidden,true);assert.equal(pq('#mobile-menu').style.overflow,'');
  });
  check('Reduced motion opens the menu without creating an animation',()=>{
    const before=pw.testAnimations.length;pq('#menu-toggle').click();assert.equal(pw.testAnimations.length,before);
    assert.equal(pq('#mobile-menu').hidden,false);
  });
  check('Desktop breakpoint closes menu and moves account controls into the header',()=>{
    pw.setTestMedia('(min-width: 1240px)',true);assert.equal(pq('#mobile-menu').hidden,true);
    assert.equal(pq('.auth-control').parentElement,pq('.nav-inner'));
    pw.setTestMedia('(min-width: 1240px)',false);assert.equal(pq('.auth-control').parentElement,pq('#mobile-menu'));
  });
  check('Entrance enhancement is one-shot and clears after completion',()=>{
    pw.setTestMedia('(prefers-reduced-motion: reduce)',false);
    const target=pq('.hero-text'),observer=pw.testObservers.find(o=>o.targets.has(target));assert.ok(observer);
    observer.callback([{target,isIntersecting:true}]);assert.ok(target.classList.contains('motion-enter'));
    assert.equal(observer.targets.has(target),false);target.dispatchEvent(new pw.Event('animationend'));
    assert.equal(target.classList.contains('motion-enter'),false);
  });
  check('Gallery transition follows live reduced-motion preference',()=>{
    pq('.photo-button').click();const before=pw.testAnimations.length;pq('#viewer-next').click();assert.equal(pw.testAnimations.length,before+1);
    pw.setTestMedia('(prefers-reduced-motion: reduce)',true);const count=pw.testAnimations.length;pq('#viewer-next').click();assert.equal(pw.testAnimations.length,count);
  });
  check('Premium controls introduce no unhandled DOM errors',()=>assert.deepEqual(premium.errors,[]));
  premium.dom.window.close();
  console.log('\n'+passed+' checks passed. Browser layout and live Firebase are NOT tested.');
})().catch(error=>{console.error(error);process.exit(1)});
