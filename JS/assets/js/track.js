(function () {
  var ENDPOINT = 'https://script.google.com/d/1sLlJ6E8PmNLDBc7j9bgMslP6ViV-aLF9bQkZeaTUCoKB07kGKYNTIhgy/edit?usp=sharing'; // ej: https://script.google.com/macros/s/XXXX/exec

  var payload = {
    url: location.href,
    path: location.pathname,
    referrer: document.referrer || '',
    ua: navigator.userAgent,
    lang: navigator.language || '',
    tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || ''),
    ts: new Date().toISOString()
  };

  // Preferir sendBeacon
  if (navigator.sendBeacon) {
    try {
      var blob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' });
      navigator.sendBeacon(ENDPOINT, blob);
      return;
    } catch (e) {}
  }

  // Fallback GET (pixel)
  try {
    var qs = new URLSearchParams(payload).toString();
    var img = new Image();
    img.src = ENDPOINT + '?' + qs;
  } catch (e) {
    try {
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(payload),
        keepalive: true,
        mode: 'no-cors'
      });
    } catch (_) {}
  }
})();
