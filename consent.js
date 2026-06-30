/* MistWake consent management.
   Gates Meta Pixel, TikTok Pixel, and GA4 so none of them load until the
   visitor has made a choice. Necessary/site-function scripts are never gated. */
(function () {
  var KEY = 'mistwake_consent_v1';

  function getConsent() {
    try {
      return JSON.parse(localStorage.getItem(KEY));
    } catch (e) {
      return null;
    }
  }

  function saveConsent(c) {
    c.ts = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch (e) {}
    applyConsent(c);
    hideBanner();
  }

  function loadGA() {
    if (window.__mwGaLoaded) return;
    window.__mwGaLoaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-QL64FNLP2R';
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', 'G-QL64FNLP2R');
  }

  function loadMetaPixel() {
    if (window.__mwFbLoaded) return;
    window.__mwFbLoaded = true;
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '2018199632137449');
    fbq('track', 'PageView');
  }

  function loadTikTok() {
    if (window.__mwTtLoaded) return;
    window.__mwTtLoaded = true;
    !(function (w, d, t) {
      w.TiktokAnalyticsObject = t; var ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
      ttq.setAndDefer = function (t, e) { t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))); }; };
      for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
      ttq.instance = function (t) { for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]); return e; };
      ttq.load = function (e, n) {
        var r = "https://analytics.tiktok.com/i18n/pixel/events.js", o = n && n.partner;
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = r; ttq._t = ttq._t || {}; ttq._o = ttq._o || {}; ttq._o[e] = n || {};
        n = document.createElement("script"); n.type = "text/javascript"; n.async = !0; n.src = r + "?sdkid=" + e + "&lib=" + t;
        e = document.getElementsByTagName("script")[0]; e.parentNode.insertBefore(n, e);
      };
      ttq.load('D922U1BC77U4748KJP0G');
      ttq.page();
    })(window, document, 'ttq');
  }

  function applyConsent(c) {
    if (c.analytics) loadGA();
    if (c.advertising) { loadMetaPixel(); loadTikTok(); }
  }

  function hideBanner() {
    var el = document.getElementById('mw-consent-banner');
    if (el) el.remove();
  }

  function showBanner() {
    if (document.getElementById('mw-consent-banner')) return;
    var el = document.createElement('div');
    el.id = 'mw-consent-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie and tracking preferences');
    el.innerHTML =
      '<div class="mw-consent-inner">' +
        '<p>We use cookies for site analytics and ad measurement. Necessary cookies are always on.</p>' +
        '<div class="mw-consent-actions">' +
          '<button type="button" data-mw="customize">Customize</button>' +
          '<button type="button" data-mw="reject">Reject Non-Essential</button>' +
          '<button type="button" data-mw="accept" class="mw-consent-primary">Accept All</button>' +
        '</div>' +
        '<div class="mw-consent-custom" id="mw-consent-custom" hidden>' +
          '<label><input type="checkbox" checked disabled /> Necessary (always on)</label>' +
          '<label><input type="checkbox" id="mw-consent-analytics" checked /> Analytics (Google Analytics)</label>' +
          '<label><input type="checkbox" id="mw-consent-advertising" checked /> Advertising (Meta &amp; TikTok pixels)</label>' +
          '<button type="button" data-mw="save" class="mw-consent-primary">Save Preferences</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(el);

    el.querySelector('[data-mw="accept"]').addEventListener('click', function () {
      saveConsent({ analytics: true, advertising: true });
    });
    el.querySelector('[data-mw="reject"]').addEventListener('click', function () {
      saveConsent({ analytics: false, advertising: false });
    });
    el.querySelector('[data-mw="customize"]').addEventListener('click', function () {
      document.getElementById('mw-consent-custom').hidden = false;
    });
    el.querySelector('[data-mw="save"]').addEventListener('click', function () {
      saveConsent({
        analytics: document.getElementById('mw-consent-analytics').checked,
        advertising: document.getElementById('mw-consent-advertising').checked
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var c = getConsent();
    if (c) applyConsent(c);
    else showBanner();
  });

  window.mistwakeConsent = { get: getConsent, set: saveConsent, reopen: showBanner };
})();