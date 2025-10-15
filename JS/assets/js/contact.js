// JS/assets/js/contact.js
(function () {
  'use strict';

  // ⚠️ Pega acá la URL real de tu Web App de Google Apps Script:
  // Ej.: https://script.google.com/macros/s/AKfycbXXXXXXXXXXXX/exec
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbwImTgG_71GPfs6VX0o9cJP6GJ8jILhsb4hPC9Ucd3M7n_WHDJNYSWDIqy8KjXngTW_/exec';

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

  // JS/assets/js/contact.js (solo el bloque del submit)
form.addEventListener('submit', async function (event) {
  event.preventDefault();

  emailEl.value = emailEl.value.trim().toLowerCase();

  if (!form.checkValidity()) {
    event.stopPropagation();
    setValidity(nameEl, nameEl.checkValidity());
    setValidity(emailEl, emailEl.checkValidity());
    setValidity(msgEl, msgEl.checkValidity());
    form.classList.add('was-validated');
    return;
  }

  // Enviar como "form-data" (NO headers → NO preflight)
  const fd = new FormData();
  fd.append('name', nameEl.value.trim());
  fd.append('email', emailEl.value.trim());
  fd.append('message', msgEl.value.trim());
  fd.append('lang', document.documentElement.lang || 'es');
  fd.append('ua', navigator.userAgent);
  fd.append('ref', document.referrer || '');
  fd.append('path', location.pathname + location.search);

  try {
    await fetch(GAS_URL, { method: 'POST', body: fd });

    // éxito UX
    alertSuccess.classList.remove('d-none'); alertSuccess.classList.add('show');
    setTimeout(()=>{ alertSuccess.classList.remove('show'); setTimeout(()=>alertSuccess.classList.add('d-none'),300); }, 5000);

    form.reset();
    [nameEl, emailEl, msgEl].forEach(el => { el.classList.remove('is-valid','is-invalid'); el.removeAttribute('aria-invalid'); });
    form.classList.remove('was-validated');
  } catch (err) {
    console.error('Error enviando a GAS:', err);
  }
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

