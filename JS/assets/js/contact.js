(() => {
  // 👉 Tu URL de la Web App (de Apps Script)
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbwwhVfkGW7tj8zs_52e27yss-v0e1rG48cHAudDOkqBQqFqyGZzEOJ_26cXD4Zk6Cs/exec";

  // Referencias a los elementos del formulario
  const form        = document.getElementById("contactForm");
  const nameEl      = document.getElementById("name");
  const emailEl     = document.getElementById("email");
  const messageEl   = document.getElementById("message");
  const sendBtn     = form.querySelector("button[type='submit']");
  const alertSuccess= document.getElementById("alertSuccess");

  // Creamos un honeypot oculto para bots (aunque no esté en HTML)
  const potEl = document.createElement("input");
  potEl.type = "text";
  potEl.name = "company";
  potEl.id = "company";
  potEl.style.display = "none";
  form.appendChild(potEl);

  // Validación básica
  const emailOK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).toLowerCase());

  const showSuccess = () => {
    alertSuccess.classList.remove("d-none");
    alertSuccess.classList.add("show");
    setTimeout(() => {
      try {
        const bsAlert = bootstrap.Alert.getOrCreateInstance(alertSuccess);
        bsAlert.close();
      } catch {}
    }, 6000);
  };

  const showError = (msg) => {
    alert(msg || "No se pudo enviar el formulario. Intenta nuevamente.");
  };

  // Evento submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    [nameEl, emailEl, messageEl].forEach(el => el.classList.remove("is-invalid"));

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    let hasError = false;
    if (!name) { nameEl.classList.add("is-invalid"); hasError = true; }
    if (!email || !emailOK(email)) { emailEl.classList.add("is-invalid"); hasError = true; }
    if (!message) { messageEl.classList.add("is-invalid"); hasError = true; }
    if (hasError) return;

    if (potEl.value) return; // Bot detectado

    const prevText = sendBtn.textContent;
    sendBtn.disabled = true;
    sendBtn.textContent = "Enviando...";

    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      fd.append("message", message);
      fd.append("page", location.href);
      fd.append("userAgent", navigator.userAgent || "");
      fd.append("company", potEl.value || "");

      const resp = await fetch(WEB_APP_URL, {
        method: "POST",
        body: fd
      });

      let data = {};
      try { data = await resp.json(); } catch(_) {}

      if (resp.ok && data.ok) {
        form.reset();
        showSuccess();
      } else {
        showError(data.error || "No se pudo enviar el mensaje.");
      }
    } catch (err) {
      console.error(err);
      showError("Error de red. Intenta nuevamente.");
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = prevText;
    }
  });
})();
