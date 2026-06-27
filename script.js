let waitlistSubmitted=false;

const RESERVATION_URL='https://mistwake.gumroad.com/l/fhbea';
const KICKSTARTER_URL='https://www.kickstarter.com/projects/mistwake/mistwake-a-sound-mist-alarm-clock';
const WEBHOOK_URL='https://alphatestapp.online/webhook/mistwake-vip';

function collectAttribution(){
  var params=new URLSearchParams(window.location.search);
  function g(k){return params.get(k)||'';}
  return {utm_source:g('utm_source'),utm_medium:g('utm_medium'),utm_campaign:g('utm_campaign'),utm_content:g('utm_content'),utm_term:g('utm_term'),fbclid:g('fbclid'),referrer:document.referrer||'',page:window.location.pathname};
}

function showWaitlistSuccess(form){
  if(form)form.style.display='none';
  var m=document.getElementById('form-message');if(m)m.textContent='';
  var s=document.getElementById('signup-success');if(s)s.style.display='block';
}

function handleWaitlistSubmit(e){
  if(e&&e.preventDefault)e.preventDefault();
  if(waitlistSubmitted)return false;
  var form=(e&&e.target&&e.target.closest)?e.target.closest('.waitlist-form'):document.querySelector('.waitlist-form');
  var input=form?form.querySelector('input[type=email]'):document.getElementById('email');
  var email=input?input.value.trim():'';
  if(!email)return false;
  waitlistSubmitted=true;
  var btn=form?form.querySelector('button'):null;
  if(btn){btn.disabled=true;btn.textContent='Submitting...';}
  var m=document.getElementById('form-message');if(m)m.textContent='Submitting...';
  var payload=collectAttribution();payload.email=email;
  fetch(WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(payload).toString()})
    .then(function(res){if(!res.ok)throw new Error('status '+res.status);return res;})
    .then(function(){
      if(typeof fbq==='function')fbq('track','Lead');
      if(window.ttq&&typeof ttq.track==='function')ttq.track('CompleteRegistration');
      if(typeof gtag==='function')gtag('event','generate_lead',{event_category:'conversion',event_label:'free_email_signup'});
      showWaitlistSuccess(form);
    })
    .catch(function(){
      waitlistSubmitted=false;
      if(btn){btn.disabled=false;btn.textContent=(btn.dataset.originalText||'Join the Free Launch List');}
      var mm=document.getElementById('form-message');if(mm)mm.textContent='Something went wrong — please try again.';
    });
  return false;
}

function handleGoogleFormLoad(){/* deprecated: Google Forms iframe replaced by n8n webhook */}

function trackReservationClick(){if(typeof fbq==='function')fbq('track','InitiateCheckout',{value:1,currency:'USD'});if(window.ttq&&typeof ttq.track==='function')ttq.track('InitiateCheckout',{value:1,currency:'USD'});if(typeof gtag==='function')gtag('event','begin_checkout',{currency:'USD',value:1,event_label:'gumroad_reservation'});}

function trackKickstarterClick(){if(typeof fbq==='function')fbq('trackCustom','KickstarterFollowClick');if(typeof gtag==='function')gtag('event','kickstarter_click',{event_label:'prelaunch_page'});}

function updateReservationFunnelCopy(){
  /* HTML already has correct Gumroad links and $70 off copy — only inject
     the Kickstarter follow link into the hero actions if not already present */
  var heroActions=document.querySelector('.hero-actions');
  if(heroActions&&!heroActions.querySelector('.kickstarter-follow-link')){
    var k=document.createElement('a');
    k.className='text-link kickstarter-follow-link';
    k.href=KICKSTARTER_URL;
    k.target='_blank';
    k.rel='noopener';
    k.textContent='Follow on Kickstarter instead';
    heroActions.appendChild(k);
  }
}

function assetPath(path){return window.location.pathname.indexOf('/vip/')===0?'../'+path:path;}

function imageSection(id,eyebrow,title,img,alt,note){
  var s=document.createElement('section');
  s.className='section visual-section';
  s.id=id;
  s.innerHTML='<div class="section-header centered"><p class="eyebrow">'+eyebrow+'</p><h2>'+title+'</h2></div><div class="product-strip-image"><img class="asset-placeholder-img" src="'+assetPath(img)+'" alt="'+alt+'" loading="lazy" /></div><p class="qualifier-note centered-note">'+note+'</p>';
  return s;
}

function detailSection(){
  var s=document.createElement('section');
  s.className='section closeup-section';
  s.id='design-detail';
  s.innerHTML='<div class="section-header centered"><p class="eyebrow">Design details</p><h2>Nozzle and current measurements.</h2></div><div class="closeup-grid"><figure><img class="asset-placeholder-img" src="'+assetPath('assets/nozzle-closeup.webp?v=53')+'" alt="MistWake nozzle detail" loading="lazy" /><figcaption>Nozzle design direction.</figcaption></figure><figure><img class="asset-placeholder-img" src="'+assetPath('assets/dimensions.webp?v=53')+'" alt="MistWake dimensions diagram" loading="lazy" /><figcaption>Current dimensions, subject to manufacturing tolerance.</figcaption></figure></div>';
  return s;
}

function kickstarterGuideSection(){
  var s=document.createElement('section');
  s.className='section benefits-section';
  s.id='kickstarter-guide';
  s.innerHTML='<div class="section-header centered"><p class="eyebrow">After reserving</p><h2>Follow MistWake on Kickstarter.</h2><p>Reserving for $1 gets you VIP access. Following on Kickstarter makes sure you are notified the moment the campaign goes live.</p><div class="hero-actions" style="justify-content:center;margin-top:18px;"><a class="primary-btn kickstarter-follow-link" href="'+KICKSTARTER_URL+'" target="_blank" rel="noopener">Follow on Kickstarter</a></div></div><div class="compact-feature-grid spec-grid simplified-grid"><article class="compact-card"><strong>1. Create or sign into Kickstarter</strong><span>Use your Kickstarter account so you can get launch notifications.</span></article><article class="compact-card"><strong>2. Open the MistWake page</strong><span>Use the button above or search MistWake on Kickstarter.</span></article><article class="compact-card"><strong>3. Click Notify Me On Launch</strong><span>This tells Kickstarter to alert you when the campaign goes live.</span></article><article class="compact-card"><strong>4. Back the project at launch</strong><span>When the campaign opens, choose your reward and complete your pledge.</span></article></div><div class="product-strip-image" style="margin-top:26px;"><img class="asset-placeholder-img" src="'+assetPath('assets/kickstarter-follow-guide.svg?v=53')+'" alt="MistWake Kickstarter follow guide" loading="lazy" /></div>';
  return s;
}

function addVisualSections(){
  /* ad-sleeping-through-alarms.webp, ad-better-way-wake-up.webp, and
     feature-overview.webp have been removed from dynamic injection because
     they contain banned phrases baked into the pixels: "10X MORE EFFECTIVE"
     and "Wake up refreshed" appear in at least two of three images.
     Replace these files with clean versions and restore the calls here. */
  if(document.getElementById('design-detail'))return;
  var specs=document.getElementById('specs');
  if(specs&&specs.parentNode){specs.parentNode.insertBefore(detailSection(),specs);}
  var offer=document.getElementById('offer');
  if(offer&&offer.parentNode&&!document.getElementById('kickstarter-guide')){offer.parentNode.insertBefore(kickstarterGuideSection(),offer.nextSibling);}
}

/* Reads UTM params + fbclid from the current page URL and appends them to the Gumroad product URL, so reservation clicks can still be reviewed with campaign/ad/creative context. */
function attachAttributionToReserveLinks(){
  var params=new URLSearchParams(window.location.search);
  var keys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term','fbclid'];
  document.querySelectorAll('.reserve-link,.kickstarter-follow-link').forEach(function(l){
    try{
      var u=new URL(l.href);
      keys.forEach(function(k){if(params.get(k))u.searchParams.set(k,params.get(k));});
      l.href=u.toString();
    }catch(e){}
  });
}

function applyVideo(){var holder=document.querySelector('#proof-video .visual-proof-image');if(!holder||holder.querySelector('video'))return;var v=document.createElement('video');v.className='asset-placeholder-img';v.controls=true;v.playsInline=true;v.preload='metadata';v.poster=assetPath('assets/real-prototype-handheld.webp');var s=document.createElement('source');s.src=assetPath('assets/prototype-demo.mp4?v=53');s.type='video/mp4';v.appendChild(s);holder.innerHTML='';holder.appendChild(v);
  var started=false;
  v.addEventListener('play',function(){if(started)return;started=true;if(typeof gtag==='function')gtag('event','video_start',{event_label:'prototype_demo'});});
  v.addEventListener('ended',function(){if(typeof gtag==='function')gtag('event','video_complete',{event_label:'prototype_demo'});});
}

function applyVipProgress(){var fill=document.getElementById('vip-progress-fill');var label=document.getElementById('vip-progress-label');if(!fill||!label)return;fetch(assetPath('assets/vip-reservations.json?v=53')).then(function(r){return r.json();}).then(function(data){var reserved=data.reserved||0;var total=data.total||1;var pct=Math.max(2,Math.min(100,Math.round((reserved/total)*100)));fill.style.width=pct+'%';label.textContent=reserved+' of '+total+' VIP spots reserved';}).catch(function(){var box=document.getElementById('vip-progress');if(box)box.style.display='none';});}

function applyFaqTracking(){document.querySelectorAll('.faq-item').forEach(function(d){d.addEventListener('toggle',function(){if(d.open&&typeof gtag==='function'){var q=d.querySelector('summary');gtag('event','faq_open',{event_label:q?q.textContent.trim():''});}});});}

function applyOfferViewTracking(){var el=document.getElementById('offer');if(!el||!window.IntersectionObserver)return;var fired=false;var obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting&&!fired){fired=true;if(typeof gtag==='function')gtag('event','view_promotion',{event_label:'vip_offer'});obs.disconnect();}});},{threshold:0.4});obs.observe(el);}

document.addEventListener('DOMContentLoaded',function(){
  updateReservationFunnelCopy();
  addVisualSections();
  document.querySelectorAll('.reserve-link').forEach(function(l){l.addEventListener('click',trackReservationClick);});
  document.querySelectorAll('.kickstarter-follow-link').forEach(function(l){l.addEventListener('click',trackKickstarterClick);});
  document.querySelectorAll('.waitlist-form button').forEach(function(b){b.dataset.originalText=b.textContent;});
  attachAttributionToReserveLinks();
  applyVideo();
  applyVipProgress();
  applyFaqTracking();
  applyOfferViewTracking();
});