// Keep the existing Apps Script contract; report success only after backend confirmation.
(() => {
  const endpoint = 'https://script.google.com/macros/s/AKfycbwwhVfkGW7tj8zs_52e27yss-v0e1rG48cHAudDOkqBQqFqyGZzEOJ_26cXD4Zk6Cs/exec';
  const form = document.getElementById('contactForm');
  if (!form) return;
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('formStatus');
  const messages = {
    es: { sending: 'Enviando…', success: '✓ Tu mensaje se envió correctamente. Gracias por contactarme.', error: 'No se pudo confirmar el envío. Inténtalo de nuevo o escríbeme por LinkedIn.', invalid: 'Completa tu nombre, email y mensaje.' },
    en: { sending: 'Sending…', success: '✓ Your message was sent successfully. Thank you for getting in touch.', error: 'Delivery could not be confirmed. Please try again or contact me on LinkedIn.', invalid: 'Please enter your name, email and message.' },
    it: { sending: 'Invio…', success: '✓ Messaggio inviato. Grazie per avermi contattato.', error: 'Invio non confermato. Riprova o contattami su LinkedIn.', invalid: 'Inserisci nome, email e messaggio.' },
    pt: { sending: 'Enviando…', success: '✓ Mensagem enviada. Obrigado pelo contato.', error: 'Não foi possível confirmar o envio. Tente novamente ou fale comigo pelo LinkedIn.', invalid: 'Preencha seu nome, email e mensagem.' }
  };
  const copy = () => messages[document.documentElement.lang] || messages.es;
  let pending = false;
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (pending || form.elements.company.value) return;
    status.textContent = '';
    status.classList.remove('error');
    if (!form.reportValidity()) return;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || !email || !message) { status.textContent = copy().invalid; return; }
    const label = button.querySelector('[data-t="send"]');
    pending = true;
    button.disabled = true;
    form.setAttribute('aria-busy', 'true');
    const previous = label.textContent;
    label.textContent = copy().sending;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('email', email);
      data.append('message', message);
      data.append('page', location.href);
      data.append('userAgent', navigator.userAgent || '');
      data.append('company', '');
      const response = await fetch(endpoint, { method: 'POST', body: data, signal: controller.signal });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Delivery not confirmed');
      form.reset();
      status.textContent = copy().success;
    } catch {
      status.classList.add('error');
      status.textContent = copy().error;
    } finally {
      clearTimeout(timeout);
      pending = false;
      button.disabled = false;
      form.removeAttribute('aria-busy');
      const translated = { es: 'Enviar mensaje', en: 'Send message', it: 'Invia messaggio', pt: 'Enviar mensagem' };
      label.textContent = translated[document.documentElement.lang] || previous;
    }
  });
})();
