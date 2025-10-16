// JS/assets/js/contact.js
(function () {
  'use strict';

  // URL pública del Web App (debe terminar en /exec)
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbxXtOF4usCEMj2Ny3gCbV9XcPMJLcp2TXtVlX2iMp_QNCTpgXQ0Vk1xjw66WmWQOxIc/exec';

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(() => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const alertSuccess = document.getElementById('alertSuccess');
    const submitBtn = form.querySelector('button[type="submit"]');
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const msgEl = document.getElementById('message');

    // Helpers de validación
    const emailBasic = v => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v||'').trim());
    function setValidity(el, ok){ el.classList.toggle('is-invalid', !ok); el.classList.toggle('is-valid', ok); el.setAttribute('aria-invalid', String(!ok)); }
    function limpiarValidaciones(){
      form.classList.remove('was-validated');
      form.querySelectorAll('.form-control, .form-select, textarea, input').forEach(el=>{
        el.classList.remove('is-valid','is-invalid'); el.removeAttribute('aria-invalid');
        if (typeof el.setCustomValidity==='function') el.setCustomValidity('');
      });
    }
    function showSuccessAlert(){
      if(!alertSuccess) return;
      alertSuccess.classList.remove('d-none'); alertSuccess.classList.add('show');
      setTimeout(()=>{ try{ bootstrap.Alert.getOrCreateInstance(alertSuccess).close(); }catch{ alertSuccess.classList.add('d-none'); alertSuccess.classList.remove('show'); } }, 6000);
    }

    // Validación en vivo
    emailEl.addEventListener('input', ()=>{ emailEl.value = emailEl.value.trim().toLowerCase(); setValidity(emailEl, emailEl.checkValidity() && emailBasic(emailEl.value)); });
    nameEl.addEventListener('input', ()=> setValidity(nameEl, nameEl.checkValidity()));
    msgEl.addEventListener('input', ()=> setValidity(msgEl, msgEl.checkValidity()));

    form.addEventListener('submit', async (e)=>{
      // HTML5 primero
      if(!form.checkValidity() || !emailBasic(emailEl.value)){
        e.preventDefault(); e.stopPropagation();
        form.classList.add('was-validated');
        setValidity(emailEl, emailEl.checkValidity() && emailBasic(emailEl.value));
        return;
      }

      e.preventDefault();

      // Deshabilitar botón y spinner
      const original = submitBtn ? submitBtn.innerHTML : '';
      if(submitBtn){
        submitBtn.disabled = true; submitBtn.setAttribute('aria-busy','true');
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando…`;
      }

      // Honeypot opcional (descomenta si agregás <input id="company"...> oculto)
      // const company = (document.getElementById('company')?.value || '').trim();
      // if (company) { if(submitBtn){ submitBtn.disabled=false; submitBtn.removeAttribute('aria-busy'); submitBtn.innerHTML=original; } return; }

      // Payload → GAS (FormData)
      const fd = new FormData();
      fd.append('name', nameEl.value.trim());
      fd.append('email', emailEl.value.trim().toLowerCase());
      fd.append('message', msgEl.value.trim());
      fd.append('lang', document.documentElement.lang || 'es');
      fd.append('ua', navigator.userAgent || '');
      fd.append('ref', document.referrer || '');
      fd.append('path', location.pathname + location.search);

      try {
        // no-cors: respuesta opaca, pero el Apps Script recibe OK
        await fetch(GAS_URL, { method:'POST', body: fd, mode:'no-cors' });
        console.log('[contact.js] Enviado a GAS (respuesta opaca por no-cors)');
        showSuccessAlert();
        form.reset();
        limpiarValidaciones();
      } catch (err) {
        console.error('[contact.js] Error enviando a GAS:', err);
        alert('Hubo un problema al enviar el mensaje. Intenta nuevamente más tarde.');
      } finally {
        if(submitBtn){
          submitBtn.disabled = false; submitBtn.removeAttribute('aria-busy'); submitBtn.innerHTML = original;
        }
      }
    });
  });
})();
