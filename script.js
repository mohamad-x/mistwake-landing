let waitlistSubmitted=false;
function handleWaitlistSubmit(){waitlistSubmitted=true;return true;}
function handleGoogleFormLoad(){if(!waitlistSubmitted)return;document.querySelectorAll('.waitlist-form').forEach(function(f){f.reset();});waitlistSubmitted=false;}
function trackReservationClick(){}
function applyVideo(){var holder=document.querySelector('#proof .visual-proof-image');if(!holder||holder.querySelector('video'))return;var v=document.createElement('video');v.className='asset-placeholder-img';v.autoplay=true;v.muted=true;v.loop=true;v.playsInline=true;v.preload='metadata';v.poster='assets/product-studio-front.webp';var s=document.createElement('source');s.src='assets/prototype-demo-video.mp4?v=41';s.type='video/mp4';v.appendChild(s);holder.innerHTML='';holder.appendChild(v);}
document.addEventListener('DOMContentLoaded',function(){document.querySelectorAll('.reserve-link').forEach(function(l){l.addEventListener('click',trackReservationClick);});applyVideo();});
