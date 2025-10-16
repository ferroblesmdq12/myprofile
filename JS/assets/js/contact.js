// JS/assets/js/contact.js
(function () {
  'use strict';

  // URL pública del Web App (termina en /exec)
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbwB4C7FO0UVR2Y5ifGzsySoLRMLB2gjwqwNFjTOaVvHNVxDOIzX-BzrqzgMFD7S0NOd/exec';

  // Elementos del formulario
  const form = document.getElementById('contactForm');
  const alertSuccess = document.getElementById('alertSuccess');
  const submitBtn = form ? form.querySelector('button[type="submit"]') : null;

  if (!form) {
    console.error('[contact.js] No se encontró #contactForm en la página.');
    return;
  }

  // Utilidad: limpiar clases de validación tras éxito
  function limpiarValidaciones() {
    form.classList.remove('was-validated');
    form.querySelectorAll('.form-control, .form-select, textarea, input').forEach(el => {
      el.classList.remove('is-valid', 'is-invalid');
      if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');
      el.removeAttribute('aria-invalid');
    });
  }

  // Mostrar alerta de éxito (Bootstrap) y auto-ocultar
  function mostrarExito() {
    if (!alertSuccess) return;
    alertSuccess.classList.remove('d-none');
    alertSuccess.classList.add('show');
    // Auto-ocultar en 6s si el usuario no la cierra
    setTimeout(() => {
      // usa la API de Bootstrap si existe; si no, oculta a mano
      try {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alertSuccess);
        bsAlert.close();
      } catch {
        alertSuccess.classList.add('d-none');
        alertSuccess.classList.remove('show');
      }
    }, 6000);
  }

  // Validador simple adicional para email (deja pasar .com, .ar, .es, etc.)
  function emailBasicoOk(value) {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(String(value || '').trim());
  }

  // Submit
  form.addEventListener('submit', async (event) => {
    // HTML5 validation primero
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    event.preventDefault(); // no recargar

    // Campos
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const messageEl = document.getElementById('message');

    const name = (nameEl?.value || '').trim();
    const email = (emailEl?.value || '').trim().toLowerCase();
    const message = (messageEl?.value || '').trim();

    // Validación extra de email
    if (!emailBasicoOk(email)) {
      form.classList.add('was-validated');
      emailEl?.classList.add('is-invalid');
      return;
    }

    // Deshabilitar botón mientras se envía
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando…`;
    }

    // Armar payload (FormData) compatible con tu Apps Script
    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('message', message);
    fd.append('lang', document.documentElement.lang || 'es');
    fd.append('ua', navigator.userAgent || '');
    fd.append('ref', document.referrer || '');
    fd.append('path', location.pathname || '');

    try {
      // Enviar a GAS. Usamos no-cors: la respuesta será opaca, pero el Script recibe OK.
      await fetch(GAS_URL, {
        method: 'POST',
        body: fd,
        mode: 'no-cors'
      });

      // UX de éxito local
      mostrarExito();
      form.reset();
      limpiarValidaciones();

    } catch (err) {
      console.error('[contact.js] Error al enviar a GAS:', err);
      // Si querés, acá podrías mostrar una alerta de error en el DOM.
      // Por ahora no interrumpimos la UI de éxito a menos que quieras lo contrario.
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-busy');
        submitBtn.innerHTML = originalText;
      }
    }
  }, false);
})();
