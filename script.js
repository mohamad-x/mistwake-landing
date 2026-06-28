let waitlistSubmitted = false;

const RESERVATION_URL = 'https://mistwake.gumroad.com/l/fhbea';
const KICKSTARTER_URL = 'https://www.kickstarter.com/projects/mistwake/mistwake-a-sound-mist-alarm-clock';
const WEBHOOK_URL = 'https://alphatestapp.online/webhook/mistwake-vip';
const VIP_COUNTER_POLL_MS = 15000;

function collectAttribution() {
  var params = new URLSearchParams(window.location.search);
  function g(k) { return params.get(k) || ''; }
  return {
    utm_source: g('utm_source'),
    utm_medium: g('utm_medium'),
    utm_campaign: g('utm_campaign'),
    utm_content: g('utm_content'),
    utm_term: g('utm_term'),
    fbclid: g('fbclid'),
    referrer: document.referrer || '',
    page: window.location.pathname
  };
}

function showWaitlistSuccess(form) {
  var message = document.getElementById('form-message');
  if (message) message.textContent = "You're on the list — taking you to the next step…";
  var qs = window.location.search || '';
  setTimeout(function () { window.location.href = '/thank-you/' + qs; }, 600);
}

function handleWaitlistSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (waitlistSubmitted) return false;

  var form = (e && e.target && e.target.closest) ? e.target.closest('.waitlist-form') : document.querySelector('.waitlist-form');
  var input = form ? form.querySelector('input[type=email]') : document.getElementById('email');
  var email = input ? input.value.trim() : '';
  if (!email) return false;

  waitlistSubmitted = true;
  var btn = form ? form.querySelector('button') : null;
  if (btn) { btn.disabled = true; btn.textContent = 'Submitting...'; }
  var message = document.getElementById('form-message');
  if (message) message.textContent = 'Submitting...';

  var payload = collectAttribution();
  payload.email = email;

  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(payload).toString()
  })
    .then(function (res) { if (!res.ok) throw new Error('status ' + res.status); return res; })
    .then(function () {
      if (typeof fbq === 'function') fbq('track', 'Lead');
      if (window.ttq && typeof ttq.track === 'function') ttq.track('CompleteRegistration');
      if (typeof gtag === 'function') gtag('event', 'generate_lead', { event_category: 'conversion', event_label: 'free_email_signup' });
      showWaitlistSuccess(form);
    })
    .catch(function () {
      waitlistSubmitted = false;
      if (btn) { btn.disabled = false; btn.textContent = (btn.dataset.originalText || 'Join the Free Launch List'); }
      var retryMessage = document.getElementById('form-message');
      if (retryMessage) retryMessage.textContent = 'Something went wrong — please try again.';
    });

  return false;
}

function handleGoogleFormLoad() { /* deprecated: Google Forms iframe replaced by n8n webhook */ }

function trackReservationClick() {
  if (typeof fbq === 'function') fbq('track', 'InitiateCheckout', { value: 1, currency: 'USD' });
  if (window.ttq && typeof ttq.track === 'function') ttq.track('InitiateCheckout', { value: 1, currency: 'USD' });
  if (typeof gtag === 'function') gtag('event', 'begin_checkout', { currency: 'USD', value: 1, event_label: 'gumroad_reservation' });
}

function trackKickstarterClick() {
  if (typeof fbq === 'function') fbq('trackCustom', 'KickstarterFollowClick');
  if (typeof gtag === 'function') gtag('event', 'kickstarter_click', { event_label: 'prelaunch_page' });
}

function assetPath(path) {
  return window.location.pathname.indexOf('/vip/') === 0 ? '../' + path : path;
}

function attachAttributionToReserveLinks() {
  var params = new URLSearchParams(window.location.search);
  var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];

  document.querySelectorAll('.reserve-link,.kickstarter-follow-link').forEach(function (link) {
    try {
      var url = new URL(link.href);
      keys.forEach(function (key) { if (params.get(key)) url.searchParams.set(key, params.get(key)); });
      link.href = url.toString();
    } catch (e) { }
  });
}

var vipCounterState = { reserved: null, total: null, timer: null };

function getVipCounterUrl() {
  var box = document.getElementById('vip-progress');
  var configured = (box && box.getAttribute('data-counter-url')) || window.MISTWAKE_VIP_COUNTER_URL || '';
  return configured || assetPath('assets/vip-reservations.json');
}

function withCacheBuster(url) {
  var joiner = url.indexOf('?') === -1 ? '?' : '&';
  return url + joiner + 'ts=' + Date.now();
}

function normalizeVipCounter(data) {
  var reserved = Number(data && (data.reserved ?? data.count ?? data.vip_reserved));
  var total = Number(data && (data.total ?? data.capacity ?? data.vip_total));
  if (!Number.isFinite(reserved) || reserved < 0) reserved = 0;
  if (!Number.isFinite(total) || total < 1) total = 200;
  return { reserved: Math.round(reserved), total: Math.round(total) };
}

function renderVipCounter(counter) {
  var fill = document.getElementById('vip-progress-fill');
  var label = document.getElementById('vip-progress-label');
  if (!fill || !label) return;

  var reserved = Math.min(counter.reserved, counter.total);
  var total = counter.total;
  var pct = Math.max(2, Math.min(100, Math.round((reserved / total) * 100)));
  var previous = vipCounterState.reserved;

  fill.style.width = pct + '%';

  if (previous !== null && reserved > previous && window.requestAnimationFrame) {
    var start = previous;
    var delta = reserved - previous;
    var startedAt = performance.now();
    var duration = Math.min(900, 350 + delta * 120);
    function step(now) {
      var progress = Math.min(1, (now - startedAt) / duration);
      var value = Math.round(start + delta * progress);
      label.textContent = value + ' of ' + total + ' VIP spots reserved';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  } else {
    label.textContent = reserved + ' of ' + total + ' VIP spots reserved';
  }

  vipCounterState.reserved = reserved;
  vipCounterState.total = total;
}

function fetchVipCounter() {
  var url = getVipCounterUrl();
  return fetch(withCacheBuster(url), { cache: 'no-store' })
    .then(function (response) { if (!response.ok) throw new Error('status ' + response.status); return response.json(); })
    .then(function (data) { renderVipCounter(normalizeVipCounter(data)); })
    .catch(function () {
      var box = document.getElementById('vip-progress');
      if (box && vipCounterState.reserved === null) box.style.display = 'none';
    });
}

function applyVipProgress() {
  var fill = document.getElementById('vip-progress-fill');
  var label = document.getElementById('vip-progress-label');
  if (!fill || !label) return;

  fetchVipCounter();
  if (vipCounterState.timer) clearInterval(vipCounterState.timer);
  vipCounterState.timer = setInterval(fetchVipCounter, VIP_COUNTER_POLL_MS);
}

function applyFaqTracking() {
  document.querySelectorAll('.faq-item').forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (detail.open && typeof gtag === 'function') {
        var question = detail.querySelector('summary');
        gtag('event', 'faq_open', { event_label: question ? question.textContent.trim() : '' });
      }
    });
  });
}

function applyOfferViewTracking() {
  var offer = document.getElementById('offer') || document.getElementById('reserve');
  if (!offer || !window.IntersectionObserver) return;

  var fired = false;
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !fired) {
        fired = true;
        if (typeof gtag === 'function') gtag('event', 'view_promotion', { event_label: 'vip_offer' });
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  observer.observe(offer);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.reserve-link').forEach(function (link) { link.addEventListener('click', trackReservationClick); });
  document.querySelectorAll('.kickstarter-follow-link').forEach(function (link) { link.addEventListener('click', trackKickstarterClick); });
  document.querySelectorAll('.waitlist-form button').forEach(function (button) { button.dataset.originalText = button.textContent; });
  attachAttributionToReserveLinks();
  applyVipProgress();
  applyFaqTracking();
  applyOfferViewTracking();
});
