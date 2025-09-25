/*!
 * Click Tracker v1.0.0
 * Rastrea clics (LinkedIn, GitHub, CV) y envía eventos a Google Apps Script.
 * Uso en HTML:
 * <script src="/assets/js/click-tracker.js" defer data-endpoint="https://script.google.com/macros/s/AKfyc.../exec"></script>
 */
(function () {
  'use strict';

  // ===== Config =====
  var DEFAULT_ENDPOINT = 'https://script.google.com/macros/s/AKfyc.../exec';
  var SELECTOR = '[data-track="click"]';

  // ===== Helpers =====
  function getEndpoint() {
    // 1) data-endpoint en el tag <script>, 2) fallback a DEFAULT_ENDPOINT
    var cur = document.currentScript;
    if (cur && cur.dataset && cur.dataset.endpoint) return cur.dataset.endpoint;
    return DEFAULT_ENDPOINT;
  }

  function basePayload() {
    return {
      url: location.href,
      path: location.pathname,
      referrer: document.referrer || '',
      ua: navigator.userAgent,
      lang: navigator.language || '',
      tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || ''),
      ts: new Date().toISOString()
    };
  }

  function serializeEvent(el) {
    var p = basePayload();
    p.type = 'event';
    p.event_name = el.getAttribute('data-event') || 'click';
    p.target = el.getAttribute('data-target') || '';
    p.location = el.getAttribute('data-location') || '';
    p.label = (el.innerText || el.getAttribute('aria-label') || '').trim();
    return p;
  }

  function send(endpoint, payload) {
    var body = JSON.stringify(payload);

    // 1) Intento con sendBeacon
    if (navigator.sendBeacon) {
      try {
        var ok = navigator.sendBeacon(endpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' }));
        if (ok) return Promise.resolve(true);
      } catch (e) {}
    }

    // 2) Fallback fetch
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: body
    })
      .then(function () { return true; })
      .catch(function () { return false; });
  }

  // ===== Handlers =====
  function onTrackedClick(ev) {
    var el = ev.currentTarget;
    var endpoint = getEndpoint();
    var payload = serializeEvent(el);

    var href = el.getAttribute('href') || '';
    var isAnchor = el.tagName === 'A';
    var isHttp = /^https?:\/\//i.test(href);
    var opensNew = isAnchor && el.target === '_blank';

    // Consideramos "outbound" todo http(s) o enlaces que abren en nueva pestaña
    var isOutbound = (isAnchor && opensNew) || isHttp;

    if (isOutbound) {
      // Si abre en nueva pestaña, no bloqueamos navegación
      send(endpoint, payload);
      // Si NO abre en nueva pestaña, prevenimos y navegamos luego
      if (!opensNew && isAnchor) {
        ev.preventDefault();
        send(endpoint, payload).finally(function () {
          window.location.href = href;
        });
      }
    } else {
      // Botones internos / descargas locales
      send(endpoint, payload);
    }
  }

  // ===== Bootstrapping =====
  function bindTracking() {
    var els = document.querySelectorAll(SELECTOR);
    for (var i = 0; i < els.length; i++) {
      els[i].addEventListener('click', onTrackedClick, { passive: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindTracking);
  } else {
    bindTracking();
  }
})();
