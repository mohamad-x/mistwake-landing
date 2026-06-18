let waitlistSubmitted=false;

function handleWaitlistSubmit(){waitlistSubmitted=true;document.querySelectorAll('.waitlist-form button').forEach(function(b){b.disabled=true;b.textContent='Submitting...';});var m=document.getElementById('form-message');if(m)m.textContent='Submitting...';if(typeof fbq==='function')fbq('track','Lead');if(window.ttq&&typeof ttq.track==='function')ttq.track('CompleteRegistration');if(typeof gtag==='function')gtag('event','generate_lead',{event_category:'conversion',event_label:'free_email_signup'});return true;}

function handleGoogleFormLoad(){if(!waitlistSubmitted)return;document.querySelectorAll('.waitlist-form').forEach(function(f){f.reset();});document.querySelectorAll('.waitlist-form button').forEach(function(b){b.disabled=false;b.textContent=b.dataset.originalText||'Join Free List';});var m=document.getElementById('form-message');if(m)m.textContent="You're on the MistWake launch list.";waitlistSubmitted=false;}

function trackReservationClick(){if(typeof fbq==='function')fbq('track','InitiateCheckout',{value:1,currency:'USD'});if(window.ttq&&typeof ttq.track==='function')ttq.track('InitiateCheckout',{value:1,currency:'USD'});if(typeof gtag==='function')gtag('event','begin_checkout',{currency:'USD',value:1,event_label:'stripe_reservation'});}

function trackKickstarterClick(){if(typeof gtag==='function')gtag('event','kickstarter_click');}

/* Reads UTM params + fbclid from the current page URL and appends them as
   client_reference_id on the Stripe Payment Link, so the reservation can be
   attributed to a campaign/ad/creative even without a backend session.
   This does not replace server-side Conversions API attribution -- see
   docs/pixel-and-capi.md for what still requires a backend. */
function attachAttributionToReserveLinks(){
  var params=new URLSearchParams(window.location.search);
  var attribution={};
  ['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'].forEach(function(k){
    if(params.get(k))attribution[k]=params.get(k);
  });
  function readCookie(name){var m=document.cookie.match(new RegExp('(?:^|; )'+name+'=([^;]*)'));return m?decodeURIComponent(m[1]):null;}
  var fbc=readCookie('_fbc');var fbp=readCookie('_fbp');
  if(fbc)attribution._fbc=fbc;
  if(fbp)attribution._fbp=fbp;
  if(Object.keys(attribution).length===0)return;
  var encoded=encodeURIComponent(JSON.stringify(attribution)).slice(0,500);
  document.querySelectorAll('.reserve-link').forEach(function(l){
    try{
      var u=new URL(l.href);
      u.searchParams.set('client_reference_id',encoded);
      l.href=u.toString();
    }catch(e){}
  });
}

function applyVideo(){var holder=document.querySelector('#proof-video .visual-proof-image');if(!holder||holder.querySelector('video'))return;var v=document.createElement('video');v.className='asset-placeholder-img';v.controls=true;v.playsInline=true;v.preload='metadata';v.poster='assets/real-prototype-handheld.webp';var s=document.createElement('source');s.src='assets/prototype-demo.mp4?v=43';s.type='video/mp4';v.appendChild(s);holder.innerHTML='';holder.appendChild(v);
  var started=false;
  v.addEventListener('play',function(){if(started)return;started=true;if(typeof gtag==='function')gtag('event','video_start',{event_label:'prototype_demo'});});
  v.addEventListener('ended',function(){if(typeof gtag==='function')gtag('event','video_complete',{event_label:'prototype_demo'});});
}

function applyVipProgress(){var fill=document.getElementById('vip-progress-fill');var label=document.getElementById('vip-progress-label');if(!fill||!label)return;fetch('assets/vip-reservations.json?v=43').then(function(r){return r.json();}).then(function(data){var reserved=data.reserved||0;var total=data.total||1;var pct=Math.max(2,Math.min(100,Math.round((reserved/total)*100)));fill.style.width=pct+'%';label.textContent=reserved+' of '+total+' VIP spots reserved';}).catch(function(){var box=document.getElementById('vip-progress');if(box)box.style.display='none';});}

function applyFaqTracking(){document.querySelectorAll('.faq-item').forEach(function(d){d.addEventListener('toggle',function(){if(d.open&&typeof gtag==='function'){var q=d.querySelector('summary');gtag('event','faq_open',{event_label:q?q.textContent.trim():''});}});});}

function applyOfferViewTracking(){var el=document.getElementById('offer');if(!el||!window.IntersectionObserver)return;var fired=false;var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting&&!fired){fired=true;if(typeof gtag==='function')gtag('event','view_promotion',{event_label:'vip_offer'});obs.disconnect();}});},{threshold:0.4});obs.observe(el);}

document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.reserve-link').forEach(function(l){l.addEventListener('click',trackReservationClick);});
  document.querySelectorAll('.kickstarter-follow-link').forEach(function(l){l.addEventListener('click',function(e){if(l.getAttribute('aria-disabled')==='true')e.preventDefault();trackKickstarterClick();});});
  document.querySelectorAll('.waitlist-form button').forEach(function(b){b.dataset.originalText=b.textContent;});
  attachAttributionToReserveLinks();
  applyVideo();
  applyVipProgress();
  applyFaqTracking();
  applyOfferViewTracking();
});
