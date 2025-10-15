// JS/assets/js/contact.js
(function () {
  'use strict';

  // ⚠️ TU URL del Web App (termina en /exec)
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbwImTgG_71GPfs6VX0o9cJP6GJ8jILhsb4hPC9Ucd3M7n_WHDJNYSWDIqy8KjXngTW_/exec';

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  ready(() => {
    // QA: avisar si el archivo cargó
    console.log('[contact.js] loaded');

    const form = document.getElementById('contactForm');
    const alertSuccess = document.getElementById('alertSuccess');
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const msgEl = document.getElementById('message');

    // QA: detectar si no existe el form (ruta de script mal, ID distinto, etc.)
    if (!form || !alertSuccess || !nameEl || !emailEl || !msgEl) {
      console.error('[contact.js] No se encontró algún elemento del formulario. ¿IDs correctos? ¿El script se está cargando?');
      return;
    }

    function setValidity(el, isValid) {
      el.classList.toggle('is-valid', isValid);
      el.classList.toggle('is-invalid', !isValid);
      el.setAttribute('aria-invalid', String(!isValid));
    }

    function showSuccessAlert() {
      alertSuccess.classList.remove('d-none');
      alertSuccess.classList.add('show');
      setTimeout(() => {
        alertSuccess.classList.remove('show');
        setTimeout(() => alertSuccess.classList.add('d-none'), 300);
      }, 5000);
    }

    // Validación en vivo
    emailEl.addEventListener('input', () => {
      emailEl.value = emailEl.value.trim().toLowerCase();
      setValidity(emailEl, emailEl.checkValidity());
    });
    nameEl.addEventListener('input', () => setValidity(nameEl, nameEl.checkValidity()));
    msgEl.addEventListener('input', () => setValidity(msgEl, msgEl.checkValidity()));

    // Enviar → Google Apps Script (FormData evita preflight CORS)
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      emailEl.value = emailEl.value.trim().toLowerCase();

      if (!form.checkValidity()) {
        event.stopPropagation();
        setValidity(nameEl, nameEl.checkValidity());
        setValidity(emailEl, emailEl.checkValidity());
        setValidity(msgEl, msgEl.checkValidity());
        form.classList.add('was-validated');
        console.warn('[contact.js] Form inválido: corrige los campos marcados.');
        return;
      }

      const fd = new FormData();
      fd.append('name', nameEl.value.trim());
      fd.append('email', emailEl.value.trim());
      fd.append('message', msgEl.value.trim());
      fd.append('lang', document.documentElement.lang || 'es');
      fd.append('ua', navigator.userAgent);
      fd.append('ref', document.referrer || '');
      fd.append('path', location.pathname + location.search);

      try {
        const res = await fetch(GAS_URL, { method: 'POST', body: fd });
        // En modo FormData + GAS, res.ok puede no estar disponible (según CORS),
        // pero el envío igual llega al script. Mostramos éxito UX siempre que no haya excepción.
        console.log('[contact.js] Enviado a GAS:', res && res.status);

        showSuccessAlert();

        form.reset();
        [nameEl, emailEl, msgEl].forEach(el => {
          el.classList.remove('is-valid', 'is-invalid');
          el.removeAttribute('aria-invalid');
        });
        form.classList.remove('was-validated');

      } catch (err) {
        console.error('[contact.js] Error enviando a GAS:', err);
        alert('Hubo un problema al enviar el mensaje. Intenta nuevamente más tarde.');
      }
    });
  });
})();


