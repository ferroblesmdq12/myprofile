(function(){
  'use strict';
  // 1) Detectar idioma: ?lang=xx -> localStorage -> navegador
  const urlLang = new URLSearchParams(location.search).get('lang');
  const storedLang = localStorage.getItem('siteLang');
  const navigatorLang = (navigator.language || 'es').slice(0,2);
  const lang = (urlLang || storedLang || navigatorLang || 'es').toLowerCase();
  const safeLang = ['es','en','it', 'pt'].includes(lang) ? lang : 'es';
  document.documentElement.lang = safeLang;
  if (urlLang) localStorage.setItem('siteLang', safeLang);

  // 2) Diccionario
  const dict = {
    es: {
      'contact.title': 'Contacto | Portafolio',
      'contact.heading': 'Formulario de Contacto',
      'contact.success': '¡Tu mensaje fue enviado correctamente!',
      'contact.name': 'Nombre',
      'contact.namePh': 'Tu nombre',
      'contact.nameError': 'Por favor ingresa tu nombre.',
      'contact.email': 'Email',
      'contact.emailPh': 'tu@email.com',
      'contact.emailError': 'Por favor ingresa un email válido (ejemplo: usuario@dominio.com).',
      'contact.message': 'Nota',
      'contact.messagePh': 'Escribe tu mensaje...',
      'contact.messageError': 'Por favor ingresa un mensaje.',
      'contact.send': 'Enviar',
      'contact.close': 'Cerrar'
    },
    en: {
      'contact.title': 'Contact | Portfolio',
      'contact.heading': 'Contact Form',
      'contact.success': 'Your message was sent successfully!',
      'contact.name': 'Name',
      'contact.namePh': 'Your name',
      'contact.nameError': 'Please enter your name.',
      'contact.email': 'Email',
      'contact.emailPh': 'you@email.com',
      'contact.emailError': 'Please enter a valid email (e.g. user@domain.com).',
      'contact.message': 'Note',
      'contact.messagePh': 'Write your message…',
      'contact.messageError': 'Please enter a message.',
      'contact.send': 'Send',
      'contact.close': 'Close'
    },
    it: {
      'contact.title': 'Contatto | Portfolio',
      'contact.heading': 'Modulo di Contatto',
      'contact.success': 'Il tuo messaggio è stato inviato con successo!',
      'contact.name': 'Nome',
      'contact.namePh': 'Il tuo nome',
      'contact.nameError': 'Per favore inserisci il tuo nome.',
      'contact.email': 'Email',
      'contact.emailPh': 'tu@email.com',
      'contact.emailError': 'Inserisci un email valido (es. utente@dominio.com).',
      'contact.message': 'Nota',
      'contact.messagePh': 'Scrivi il tuo messaggio…',
      'contact.messageError': 'Per favore inserisci un messaggio.',
      'contact.send': 'Invia',
      'contact.close': 'Chiudi'
    },
    pt: {
      'contact.title': 'Contato | Portfólio',
      'contact.heading': 'Formulário de Contato',
      'contact.success': 'Sua mensagem foi enviada com sucesso!',
      'contact.name': 'Nome',
      'contact.namePh': 'Seu nome',
      'contact.nameError': 'Por favor, insira seu nome.',
      'contact.email': 'Email',
      'contact.emailPh': 'seu@email.com',
      'contact.emailError': 'Por favor, insira um email válido (ex.: usuario@dominio.com).',
      'contact.message': 'Nota',
      'contact.messagePh': 'Escreva sua mensagem…',
      'contact.messageError': 'Por favor, insira uma mensagem.',
      'contact.send': 'Enviar',
      'contact.close': 'Fechar'
    }

  };
  const t = dict[safeLang] || dict.es;

  // 3) Aplicar traducciones
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.setAttribute('placeholder', t[key]);
  });
  // Botón cerrar de alerta
  const closeBtn = document.querySelector('#alertSuccess .btn-close');
  if (closeBtn && t['contact.close']) closeBtn.setAttribute('aria-label', t['contact.close']);

  // 4) Actualizar <title>
  const titleEl = document.querySelector('title[data-i18n="contact.title"]');
  if (titleEl && t['contact.title']) titleEl.textContent = t['contact.title'];
})();
