(function () {
  'use strict';
  const form = document.getElementById('contactForm');
  const alertSuccess = document.getElementById('alertSuccess');

  form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      // Mostrar alerta de éxito (dismissible + fade)
      alertSuccess.classList.remove('d-none');
      alertSuccess.classList.add('show'); // necesario para el efecto fade de Bootstrap
      // Resetear formulario
      form.reset();
      form.classList.remove('was-validated');
    }
    form.classList.add('was-validated');
  }, false);
})();
