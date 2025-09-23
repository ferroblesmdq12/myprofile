(function () {
  var ENDPOINT = 'https://script.google.com/macros/s/AKfycby8Q4Thf7kO7_QKvz80QLa5vsBQdLRM03dODRzsmsZYsxcQF9L4WWJub5horZpDVCb2/exec';
  if (!ENDPOINT) return;

  var payload = {
    url: location.href,
    path: location.pathname,
    referrer: document.referrer || '',
    ua: navigator.userAgent,
    lang: navigator.language || '',
    tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || ''),
    ts: new Date().toISOString()
  };

  // --- 1) Intento con sendBeacon (no bloquea navegación)
  try {
    if (navigator.sendBeacon) {
      var blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' });
      var ok = navigator.sendBeacon(ENDPOINT, blob);
      if (ok) return; // enviado con éxito
    }
  } catch (_) { /* sigue al fallback */ }

  // Ayudante: construir querystring con fallback si no hay URLSearchParams
  function buildQS(obj) {
    try {
      return new URLSearchParams(obj).toString();
    } catch {
      var parts = [];
      for (var k in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
        parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k] == null ? '' : String(obj[k])));
      }
      return parts.join('&');
    }
  }

  // --- 2) Fallback: pixel GET (con cache-buster)
  try {
    var qs = buildQS(payload) + '&r=' + Math.random().toString(36).slice(2);
    var img = new Image();
    img.src = ENDPOINT + '?' + qs;
    return;
  } catch (_) { /* último intento abajo */ }

  // --- 3) Último intento: fetch sin CORS (no garantiza recepción)
  try {
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(payload),
      keepalive: true,
      mode: 'no-cors'
    });
  } catch (_) {}
})();

