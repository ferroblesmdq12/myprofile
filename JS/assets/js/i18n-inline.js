// funcionalidad para traducir a idiomas español|inglés/italiano/portugués 
// usando un diccionario inline 

// JS/assets/js/i18n-inline.js
(() => {
  // Utilidad: acceder a claves tipo "hero.hi"
  const getByPath = (obj, path) =>
    path.split('.').reduce((o, k) => (o && k in o) ? o[k] : undefined, obj);

  // Diccionario ES/EN/IT/PT
  const I18N = {
    es: {
      nav: { about: 'Sobre mí', projects: 'Proyectos', skills: 'Skills', contact: 'Contacto' },
      cta: { downloadCV: 'Descargar CV', viewProjects: 'Ver proyectos', letsTalk: 'Hablemos' },
      hero: {
        hi: 'Hola, soy Fernando',
        role: 'Data Analyst & Business Intelligence',
        pitch: 'Transformo datos en decisiones de negocio con <strong>Power BI</strong>, <strong>SQL</strong> y <strong>Python</strong>. KPI storytelling + pipelines simples en <strong>BigQuery</strong>.'
      },
      about: {
        title: 'Sobre mí',
        body: 'Soy <strong>Data Analyst</strong> con foco en <strong>KPIs</strong>, <strong>visualización</strong> y <strong>modelado</strong>. Experiencia construyendo dashboards en <strong>Power BI</strong>, consultas <strong>SQL</strong>, análisis con <strong>Pandas</strong> y procesos <strong>ETL</strong> simples y reproducibles. Formación en SoyHenry (DA) y proyectos reales en salud, deportes y retail.',
        badges: { es: 'ES 🇦🇷 nativo', en: 'EN B1/B2', it: 'IT A2/B1' }
      },
      skills: { analysis: 'Análisis & BI', data: 'Datos & SQL', powerquery: 'Power Query', star: 'Modelo Estrella' },
      projects: {
        title: 'Proyectos de Data Analytics', subtitle: 'Casos con impacto medible', allRepos: 'Ver todos los repos',
        biogenesys: {
          title: 'Biogenesys — Salud LATAM',
          b1: 'Automatización de limpieza (2.3M filas) con Pandas.',
          b2: 'Refresh del dashboard: <strong>18m → 4m</strong>.',
          b3: 'Identifiqué 3 países con mayor potencial de expansión.'
        },
        nba: {
          title: 'NBA-StatVision — Deportes',
          b1: 'BigQuery: estandarización de 10 temporadas.',
          b2: 'Modelo de lesiones vs. carga de juego.',
          b3: 'Filtros por jugador/equipo con rolling windows.'
        },
        senda: {
          title: 'Senda Café — Retail',
          b1: 'Análisis de ventas, costos y productividad por camarero.',
          b2: 'Alertas de stock y propuesta de turnos óptimos.',
          b3: 'KPIs de margen y rotación mensual.'
        },
        adventure: {
          title: 'Adventure Works',
          b1: 'Análisis de la base de datos Adventure Works (empresa ficticia de bicicletas y accesorios).',
          b2: 'Objetivo: modelo analítico global y regional para entender el negocio y mejorar decisiones.',
          b3: 'Herramientas: SQL Server, Power Query, Power BI y storytelling de KPIs.'
        }
      },
      notes: { title: 'Notas y repos', latest: 'Más recientes' },
      contact: { title: '¡Hablemos!', desc: '¿Agendamos 15’ para hablar de tus KPIs? Respondo en 24h.', button: 'Contacto ' },
      footer: { quote: '“Los datos cuentan historias… yo ayudo a encontrarlas”.', rights: 'Creado por Fernando Robles (2025) ©' }
    },
    en: {
      nav: { about: 'About', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
      cta: { downloadCV: 'Download CV', viewProjects: 'View projects', letsTalk: "Let's talk" },
      hero: {
        hi: "Hi, I'm Fernando",
        role: 'Data Analyst & Business Intelligence',
        pitch: 'I turn data into business decisions with <strong>Power BI</strong>, <strong>SQL</strong> and <strong>Python</strong>. KPI storytelling + simple pipelines in <strong>BigQuery</strong>.'
      },
      about: {
        title: 'About me',
        body: 'I am a <strong>Data Analyst</strong> focused on <strong>KPIs</strong>, <strong>visualization</strong> and <strong>data modeling</strong>. Experience building dashboards in <strong>Power BI</strong>, writing <strong>SQL</strong> queries, analyzing with <strong>Pandas</strong>, and creating simple, reproducible <strong>ETL</strong> processes. Trained at SoyHenry (DA) and real projects in healthcare, sports and retail.',
        badges: { es: 'ES 🇦🇷 native', en: 'EN B1/B2', it: 'IT A2/B1' }
      },
      skills: { analysis: 'Analytics & BI', data: 'Data & SQL', powerquery: 'Power Query', star: 'Star Schema' },
      projects: {
        title: 'Data Analytics Projects', subtitle: 'Cases with measurable impact', allRepos: 'See all repos',
        biogenesys: {
          title: 'Biogenesys — Healthcare LATAM',
          b1: 'Automated cleaning (2.3M rows) with Pandas.',
          b2: 'Dashboard refresh: <strong>18m → 4m</strong>.',
          b3: 'Identified 3 countries with the highest expansion potential.'
        },
        nba: {
          title: 'NBA-StatVision — Sports',
          b1: 'BigQuery: standardization of 10 seasons.',
          b2: 'Injury model vs. workload.',
          b3: 'Player/team filters with rolling windows.'
        },
        senda: {
          title: 'Senda Café — Retail',
          b1: 'Sales, costs and waiter productivity analysis.',
          b2: 'Stock alerts and optimal shifts proposal.',
          b3: 'Margin and monthly turnover KPIs.'
        },
        adventure: {
          title: 'Adventure Works',
          b1: 'Analysis of the Adventure Works database (fictional bicycle & accessories company).',
          b2: 'Goal: global and regional analytics model to understand the business and improve decision-making.',
          b3: 'Tools: SQL Server, Power Query, Power BI and KPI storytelling.'
        }
      },
      notes: { title: 'Notes & repos', latest: 'Latest' },
      contact: { title: "Let's talk!", desc: "Shall we schedule 15' to discuss your KPIs? I reply within 24h.", button: 'Contact ' },
      footer: { quote: '“Data tells stories… I help you find them.”', rights: 'Created by Fernando Robles (2025) ©' }
    },
    it: {
      nav: { about: 'Chi sono', projects: 'Progetti', skills: 'Competenze', contact: 'Contatti' },
      cta: { downloadCV: 'Scarica CV', viewProjects: 'Vedi progetti', letsTalk: 'Parliamo' },
      hero: {
        hi: 'Ciao, sono Fernando',
        role: 'Data Analyst & Business Intelligence',
        pitch: 'Trasformo i dati in decisioni di business con <strong>Power BI</strong>, <strong>SQL</strong> e <strong>Python</strong>. Storytelling dei KPI + pipeline semplici in <strong>BigQuery</strong>.'
      },
      about: {
        title: 'Chi sono',
        body: 'Sono un <strong>Data Analyst</strong> focalizzato su <strong>KPI</strong>, <strong>visualizzazione</strong> e <strong>modellazione</strong>. Esperienza nella creazione di dashboard in <strong>Power BI</strong>, query <strong>SQL</strong>, analisi con <strong>Pandas</strong> e processi <strong>ETL</strong> semplici e riproducibili. Formazione a SoyHenry (DA) e progetti reali in sanità, sport e retail.',
        badges: { es: 'ES 🇦🇷 madrelingua', en: 'EN B1/B2', it: 'IT A2/B1' }
      },
      skills: { analysis: 'Analisi & BI', data: 'Dati & SQL', powerquery: 'Power Query', star: 'Schema a stella' },
      projects: {
        title: 'Progetti di Data Analytics', subtitle: 'Casi con impatto misurabile', allRepos: 'Vedi tutti i repo',
        biogenesys: {
          title: 'Biogenesys — Sanità LATAM',
          b1: 'Automazione della pulizia (2,3M righe) con Pandas.',
          b2: 'Refresh della dashboard: <strong>18m → 4m</strong>.',
          b3: 'Identificati 3 paesi con maggior potenziale di espansione.'
        },
        nba: {
          title: 'NBA-StatVision — Sport',
          b1: 'BigQuery: standardizzazione di 10 stagioni.',
          b2: 'Modello infortuni vs. carico di gioco.',
          b3: 'Filtri per giocatore/squadra con rolling windows.'
        },
        senda: {
          title: 'Senda Café — Retail',
          b1: 'Analisi di vendite, costi e produttività dei camerieri.',
          b2: 'Avvisi di stock e proposta di turni ottimali.',
          b3: 'KPI di margine e rotazione mensile.'
        },
        adventure: {
          title: 'Adventure Works',
          b1: 'Analisi del database Adventure Works (azienda fittizia di biciclette e accessori).',
          b2: 'Obiettivo: modello analitico globale e regionale per comprendere il business e migliorare le decisioni.',
          b3: 'Strumenti: SQL Server, Power Query, Power BI e storytelling dei KPI.'
        }
      },
      notes: { title: 'Note e repo', latest: 'Più recenti' },
      contact: { title: 'Parliamo!', desc: 'Fissiamo 15’ per parlare dei tuoi KPI? Rispondo entro 24h.', button: 'Contatto ' },
      footer: { quote: '“I dati raccontano storie… io aiuto a trovarle”.', rights: 'Creato da Fernando Robles (2025) ©' }
    },
    pt: {
      nav: { about: 'Sobre mim', projects: 'Projetos', skills: 'Skills', contact: 'Contato' },
      cta: { downloadCV: 'Baixar CV', viewProjects: 'Ver projetos', letsTalk: 'Vamos conversar' },
      hero: {
        hi: 'Olá, sou Fernando',
        role: 'Data Analyst & Business Intelligence',
        pitch: 'Transformo dados em decisões de negócio com <strong>Power BI</strong>, <strong>SQL</strong> e <strong>Python</strong>. Storytelling de KPIs + pipelines simples em <strong>BigQuery</strong>.'
      },
      about: {
        title: 'Sobre mim',
        body: 'Sou <strong>Data Analyst</strong> com foco em <strong>KPIs</strong>, <strong>visualização</strong> e <strong>modelagem</strong>. Experiência na construção de dashboards em <strong>Power BI</strong>, consultas <strong>SQL</strong>, análise com <strong>Pandas</strong> e processos <strong>ETL</strong> simples e reproduzíveis. Formação na SoyHenry (DA) e projetos reais em saúde, esportes e varejo.',
        badges: { es: 'ES 🇦🇷 nativo', en: 'EN B1/B2', it: 'IT A2/B1' }
      },
      skills: { analysis: 'Análise & BI', data: 'Dados & SQL', powerquery: 'Power Query', star: 'Esquema em estrela' },
      projects: {
        title: 'Projetos de Data Analytics', subtitle: 'Casos com impacto mensurável', allRepos: 'Ver todos os repositórios',
        biogenesys: {
          title: 'Biogenesys — Saúde LATAM',
          b1: 'Automatização de limpeza (2,3M linhas) com Pandas.',
          b2: 'Atualização do dashboard: <strong>18m → 4m</strong>.',
          b3: 'Identifiquei 3 países com maior potencial de expansão.'
        },
        nba: {
          title: 'NBA-StatVision — Esportes',
          b1: 'BigQuery: padronização de 10 temporadas.',
          b2: 'Modelo de lesões vs. carga de jogo.',
          b3: 'Filtros por jogador/equipe com rolling windows.'
        },
        adventure: {
          title: 'Adventure Works',
          b1: 'Análise do banco de dados Adventure Works (empresa fictícia de bicicletas e acessórios).',
          b2: 'Objetivo: modelo analítico global e regional para entender o negócio e melhorar as decisões.',
          b3: 'Ferramentas: SQL Server, Power Query, Power BI e storytelling de KPIs.'
        }
      },
      notes: { title: 'Notas e repositórios', latest: 'Mais recentes' },
      contact: { title: 'Vamos conversar!', desc: 'Marcamos 15’ para falar dos seus KPIs? Respondo em até 24h.', button: 'Contato ' },
      footer: { quote: '“Os dados contam histórias… eu ajudo a encontrá-las”.', rights: 'Criado por Fernando Robles (2025) ©' }
    }
  };

  function rewriteContactLinks(lang) {
    const links = document.querySelectorAll('[data-contact-link], a[href$="contacto.html"], a[href*="contacto.html?"]');
    links.forEach(a => {
      const baseHref = a.getAttribute('href') || 'contacto.html';
      const u = new URL(baseHref, window.location.origin);
      u.searchParams.set('lang', lang);
      // dejar href relativo (útil en GitHub Pages)
      a.setAttribute('href', u.pathname.replace(window.location.origin, '') + u.search);
    });
  }

  function applyTranslations(lang) {
    const dict = I18N[lang] || I18N.es;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getByPath(dict, key);
      if (typeof val === 'string') {
        if (val.includes('<') && val.includes('>')) el.innerHTML = val;
        else el.textContent = val;
      }
    });

    try { localStorage.setItem('siteLang', lang); } catch {}

    const url = new URL(window.location);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);

    rewriteContactLinks(lang);
  }

  function detectLanguage() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && I18N[fromUrl]) return fromUrl;
    let stored;
    try { stored = localStorage.getItem('siteLang') || localStorage.getItem('lang'); } catch {}
    if (stored && I18N[stored]) return stored;
    const browser = (navigator.language || 'es').slice(0, 2);
    return I18N[browser] ? browser : 'es';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const langSelect = document.getElementById('langSwitcher');
    const lang = detectLanguage();
    if (langSelect) langSelect.value = lang;
    applyTranslations(lang);
    if (langSelect) langSelect.addEventListener('change', e => applyTranslations(e.target.value));
  });
})();


