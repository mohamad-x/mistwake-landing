let waitlistSubmitted=false;

const RESERVATION_URL='https://mistwake.gumroad.com/l/fhbea';
const OLD_STRIPE_URL='https://buy.stripe.com/aFa7sLcA3aXC3IIfQidIA00';

function handleWaitlistSubmit(){waitlistSubmitted=true;document.querySelectorAll('.waitlist-form button').forEach(function(b){b.disabled=true;b.textContent='Submitting...';});var m=document.getElementById('form-message');if(m)m.textContent='Submitting...';if(typeof fbq==='function')fbq('track','Lead');if(window.ttq&&typeof ttq.track==='function')ttq.track('CompleteRegistration');if(typeof gtag==='function')gtag('event','generate_lead',{event_category:'conversion',event_label:'free_email_signup'});return true;}

function handleGoogleFormLoad(){if(!waitlistSubmitted)return;document.querySelectorAll('.waitlist-form').forEach(function(f){f.reset();});document.querySelectorAll('.waitlist-form button').forEach(function(b){b.disabled=false;b.textContent=b.dataset.originalText||'Join Free List';});var m=document.getElementById('form-message');if(m)m.textContent="You're on the MistWake launch list.";waitlistSubmitted=false;}

function trackReservationClick(){if(typeof fbq==='function')fbq('track','InitiateCheckout',{value:1,currency:'USD'});if(window.ttq&&typeof ttq.track==='function')ttq.track('InitiateCheckout',{value:1,currency:'USD'});if(typeof gtag==='function')gtag('event','begin_checkout',{currency:'USD',value:1,event_label:'gumroad_reservation'});}

function trackKickstarterClick(){if(typeof gtag==='function')gtag('event','kickstarter_click');}

function updateReservationFunnelCopy(){
  document.querySelectorAll('.reserve-link').forEach(function(l){
    l.href=RESERVATION_URL;
    if(l.textContent.trim()==='Unlock $50 Off for $1')l.textContent='Reserve VIP Access for $1';
    if(l.textContent.trim()==='Reserve')l.textContent='Reserve';
  });

  document.querySelectorAll('span,p,small,a,h1,h2,h3,li,summary').forEach(function(el){
    if(!el.childElementCount){
      el.textContent=el.textContent
        .replace(/\$50 off/g,'$70 off MSRP')
        .replace(/Unlocks \$50 off at launch/g,'Unlocks $70 off MSRP at launch')
        .replace(/Unlock \$50 Off for \$1/g,'Reserve VIP Access for $1')
        .replace(/Secure checkout powered by Stripe\./g,'Secure checkout powered by Gumroad.')
        .replace(/Secure Stripe checkout/g,'Gumroad checkout')
        .replace(/Stripe Payment Link/g,'Gumroad product link')
        .replace(/planned retail price/g,'planned MSRP')
        .replace(/planned standard retail price/g,'planned MSRP')
        .replace(/Refundable before launch/g,'Reservation terms handled through Gumroad')
        .replace(/Reservations are refundable before launch\./g,'Reservation terms are handled through Gumroad.');
    }
  });

  var eyebrow=document.querySelector('.hero-copy .eyebrow');
  if(eyebrow)eyebrow.textContent='Kickstarter approved · Working prototype built';

  var subtitle=document.querySelector('.hero-subtitle');
  if(subtitle&&!subtitle.textContent.includes('working-prototype')){
    subtitle.textContent='MistWake is a working-prototype bedside alarm designed for mornings when sound alone is not enough. It begins with an alarm sound and can activate a brief, aimed fine-mist cue if the alarm is not dismissed.';
  }

  var offerList=document.querySelector('.offer-detail-list');
  if(offerList&&!offerList.textContent.includes('After reserving')){
    var li=document.createElement('li');
    li.textContent='After reserving, follow MistWake on Kickstarter so you get notified at launch';
    offerList.appendChild(li);
  }

  var faq=document.querySelector('.faq-list');
  if(faq&&!faq.textContent.includes('What happens after I reserve?')){
    var d=document.createElement('details');
    d.className='card faq-item';
    d.innerHTML='<summary>What happens after I reserve?</summary><p>After reserving, you will receive instructions to follow MistWake on Kickstarter and click “Notify Me On Launch” so you can act when the campaign goes live.</p>';
    faq.insertBefore(d,faq.children[2]||null);
  }
}

/* Reads UTM params + fbclid from the current page URL and appends them to the Gumroad product URL, so reservation clicks can still be reviewed with campaign/ad/creative context. */
function attachAttributionToReserveLinks(){
  var params=new URLSearchParams(window.location.search);
  var keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'];
  document.querySelectorAll('.reserve-link').forEach(function(l){
    try{
      var u=new URL(l.href);
      keys.forEach(function(k){if(params.get(k))u.searchParams.set(k,params.get(k));});
      l.href=u.toString();
    }catch(e){}
  });
}

function assetPath(path){return window.location.pathname.indexOf('/vip/')===0?'../'+path:path;}

function applyVideo(){var holder=document.querySelector('#proof-video .visual-proof-image');if(!holder||holder.querySelector('video'))return;var v=document.createElement('video');v.className='asset-placeholder-img';v.controls=true;v.playsInline=true;v.preload='metadata';v.poster=assetPath('assets/real-prototype-handheld.webp');var s=document.createElement('source');s.src=assetPath('assets/prototype-demo.mp4?v=44');s.type='video/mp4';v.appendChild(s);holder.innerHTML='';holder.appendChild(v);
  var started=false;
  v.addEventListener('play',function(){if(started)return;started=true;if(typeof gtag==='function')gtag('event','video_start',{event_label:'prototype_demo'});});
  v.addEventListener('ended',function(){if(typeof gtag==='function')gtag('event','video_complete',{event_label:'prototype_demo'});});
}

function applyVipProgress(){var fill=document.getElementById('vip-progress-fill');var label=document.getElementById('vip-progress-label');if(!fill||!label)return;fetch(assetPath('assets/vip-reservations.json?v=44')).then(function(r){return r.json();}).then(function(data){var reserved=data.reserved||0;var total=data.total||1;var pct=Math.max(2,Math.min(100,Math.round((reserved/total)*100)));fill.style.width=pct+'%';label.textContent=reserved+' of '+total+' VIP spots reserved';}).catch(function(){var box=document.getElementById('vip-progress');if(box)box.style.display='none';});}

function applyFaqTracking(){document.querySelectorAll('.faq-item').forEach(function(d){d.addEventListener('toggle',function(){if(d.open&&typeof gtag==='function'){var q=d.querySelector('summary');gtag('event','faq_open',{event_label:q?q.textContent.trim():''});}});});}

function applyOfferViewTracking(){var el=document.getElementById('offer');if(!el||!window.IntersectionObserver)return;var fired=false;var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting&&!fired){fired=true;if(typeof gtag==='function')gtag('event','view_promotion',{event_label:'vip_offer'});obs.disconnect();}});},{threshold:0.4});obs.observe(el);}

document.addEventListener('DOMContentLoaded',function(){
  updateReservationFunnelCopy();
  document.querySelectorAll('.reserve-link').forEach(function(l){l.addEventListener('click',trackReservationClick);});
  document.querySelectorAll('.kickstarter-follow-link').forEach(function(l){l.addEventListener('click',function(e){if(l.getAttribute('aria-disabled')==='true')e.preventDefault();trackKickstarterClick();});});
  document.querySelectorAll('.waitlist-form button').forEach(function(b){b.dataset.originalText=b.textContent;});
  attachAttributionToReserveLinks();
  applyVideo();
  applyVipProgress();
  applyFaqTracking();
  applyOfferViewTracking();
});