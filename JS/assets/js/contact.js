// JS/assets/js/contact.js
(function () {
  'use strict';
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

  // validación en vivo
  emailEl.addEventListener('input', () => {
    emailEl.value = emailEl.value.trim().toLowerCase();
    setValidity(emailEl, emailEl.checkValidity());
  });
  nameEl.addEventListener('input', () => setValidity(nameEl, nameEl.checkValidity()));
  msgEl.addEventListener('input', () => setValidity(msgEl, msgEl.checkValidity()));

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    emailEl.value = emailEl.value.trim().toLowerCase();

    if (!form.checkValidity()) {
      event.stopPropagation();
      setValidity(nameEl, nameEl.checkValidity());
      setValidity(emailEl, emailEl.checkValidity());
      setValidity(msgEl, msgEl.checkValidity());
    } else {
      // mostrar alerta
      alertSuccess.classList.remove('d-none');
      alertSuccess.classList.add('show');

      // ocultar automáticamente después de 5 s (manteniendo el fade)
      setTimeout(() => {
        alertSuccess.classList.remove('show');
        setTimeout(() => alertSuccess.classList.add('d-none'), 300);
      }, 5000);

      // limpiar formulario y estados
      form.reset();
      [nameEl, emailEl, msgEl].forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
        el.removeAttribute('aria-invalid');
      });
    }
    form.classList.add('was-validated');
  }, false);
})();
