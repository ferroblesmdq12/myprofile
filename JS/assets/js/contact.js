// JS/assets/js/contact.js
(function () {
  'use strict';

  // ⚠️ Pega acá la URL real de tu Web App de Google Apps Script:
  // Ej.: https://script.google.com/macros/s/AKfycbXXXXXXXXXXXX/exec
  const GAS_URL = 'https://script.google.com/d/1Em0Mme38IBhozWWAUTs0lS5Ub66xm_ty9y3zkbMDBo08XDDR8MvAmN1K/edit?usp=sharing';

  const form = document.getElementById('contactForm');
  const alertSuccess = document.getElementById('alertSuccess');
  const nameEl = document.getElementById('name');
  const emailEl = document.getElementById('email');
  const msgEl = document.getElementById('message');

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
      setTimeout(() => alertSuccess.classList.add('d-none'), 300); // respeta el fade
    }, 5000);
  }

  // Validación en vivo
  emailEl.addEventListener('input', () => {
    emailEl.value = emailEl.value.trim().toLowerCase();
    setValidity(emailEl, emailEl.checkValidity());
  });
  nameEl.addEventListener('input', () => setValidity(nameEl, nameEl.checkValidity()));
  msgEl.addEventListener('input', () => setValidity(msgEl, msgEl.checkValidity()));

  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Normalizo email
    emailEl.value = emailEl.value.trim().toLowerCase();

    // Si hay errores de HTML5, marco y salgo
    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidity(nameEl, nameEl.checkValidity());
      setValidity(emailEl, emailEl.checkValidity());
      setValidity(msgEl, msgEl.checkValidity());
      form.classList.add('was-validated');
      return;
    }

    // Payload para GAS
    const payload = {
      name: nameEl.value.trim(),
      email: emailEl.value.trim(),
      message: msgEl.value.trim(),
      lang: document.documentElement.lang || 'es',
      ua: navigator.userAgent,
      ref: document.referrer || '',
      path: location.pathname + location.search
    };

    try {
      // Envío a Google Apps Script
      // Si te aparece error de CORS:
      // 1) publicá el Web App como "Cualquiera con el enlace"
      // 2) si persiste, probá el plan B comentado debajo
      const res = await fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // --- Plan B (CORS): ---
      // const res = await fetch(GAS_URL, {
      //   method: 'POST',
      //   mode: 'no-cors', // respuesta será "opaque", pero el envío llega
      //   body: JSON.stringify(payload)
      // });

      // Éxito UX (sin depender del status en modo no-cors)
      showSuccessAlert();

      // Limpieza
      form.reset();
      [nameEl, emailEl, msgEl].forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
        el.removeAttribute('aria-invalid');
      });
      form.classList.remove('was-validated');

      // (Opcional) Podés loguear el status real si no usás no-cors:
      // console.log('GAS status:', res.status);

    } catch (err) {
      console.error('Error enviando a GAS:', err);
      // (Opcional) Mostrar un alert de error al usuario
      // alert('Hubo un problema enviando tu mensaje. Intenta nuevamente más tarde.');
    }
  }, false);
})();

