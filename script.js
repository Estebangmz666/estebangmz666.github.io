const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const languageToggle = document.querySelector(".language-toggle");
const skills = document.querySelector("[data-i18n-label='skills']");
const year = document.querySelector("#year");

const translations = {
  "en": {
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.about": "About",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",
    "hero.eyebrow": "Backend developer · Armenia, Quindío",
    "hero.copy": "I build REST APIs with Java, Spring Boot, and SQL. My project work covers authentication, booking rules, database migrations, and integration testing.",
    "hero.availability": "Open to backend developer roles",
    "hero.projects": "View projects",
    "hero.cv": "Download CV (EN)",
    "hero.email": "Email me",
    "projects.eyebrow": "Selected work",
    "projects.title": "Projects",
    "project.grownups": "Veterinary management platform for appointments and clinical workflows. I implemented JWT authentication, recorded consent at account creation, and added coverage reporting to GitHub Actions.",
    "project.demo": "Live site",
    "project.stayhub": "Booking platform for rural accommodations. I built booking quotes, updated seasonal pricing, and added email notifications for completed reservations.",
    "project.transactum": "Desktop wallet built with JavaFX and SQLite. I integrated the interface and implemented the points and rewards redemption system.",
    "experience.title": "Experience",
    "experience.research.date": "September 2026–Present",
    "experience.research.title": "Research Assistant",
    "experience.research.org": "Office of the Vice President for Research · Universidad del Quindío",
    "experience.research.copy": "I migrate complete research project records between university systems, including literature reviews, project team members, research groups, budgets, and bibliographies.",
    "experience.business.date": "February 2023–Present",
    "experience.business.title": "Co-founder · ¡Ay, Donitas!",
    "experience.business.copy": "I co-manage daily operations, inventory, and customer service.",
    "about.eyebrow": "Profile",
    "about.title": "About",
    "about.copy": "I study Systems and Computer Engineering at Universidad del Quindío. My work focuses on backend development with Java and Spring Boot, with experience integrating APIs into Angular and TypeScript applications.",
    "about.languages": "Spanish (native) · English (B2)",
    "certs.eyebrow": "Education",
    "certs.title": "Certifications",
    "certs.view": "View certificate",
    "contact.eyebrow": "Contact",
    "contact.title": "Get in touch"
  },
  "es": {
    "nav.projects": "Proyectos",
    "nav.experience": "Experiencia",
    "nav.about": "Sobre mí",
    "nav.certifications": "Certificaciones",
    "nav.contact": "Contacto",
    "hero.eyebrow": "Desarrollador backend · Armenia, Quindío",
    "hero.copy": "Desarrollo APIs REST con Java, Spring Boot y SQL. Mis proyectos incluyen autenticación, reglas de reservas, migraciones de bases de datos y pruebas de integración.",
    "hero.availability": "Disponible para roles de desarrollo backend",
    "hero.projects": "Ver proyectos",
    "hero.cv": "Descargar CV (EN)",
    "hero.email": "Escríbeme",
    "projects.eyebrow": "Trabajo seleccionado",
    "projects.title": "Proyectos",
    "project.grownups": "Plataforma veterinaria para citas y flujos clínicos. Implementé autenticación JWT, el registro del consentimiento al crear cuentas y los informes de cobertura en GitHub Actions.",
    "project.demo": "Sitio web",
    "project.stayhub": "Plataforma de reservas para alojamientos rurales. Implementé cotizaciones, ajusté las tarifas por temporada y añadí notificaciones por correo para reservas completadas.",
    "project.transactum": "Billetera de escritorio con JavaFX y SQLite. Integré la interfaz e implementé el sistema de puntos y canjes.",
    "experience.title": "Experiencia",
    "experience.research.date": "Septiembre de 2026–actualidad",
    "experience.research.title": "Auxiliar de investigación",
    "experience.research.org": "Vicerrectoría de Investigaciones · Universidad del Quindío",
    "experience.research.copy": "Migro expedientes completos de proyectos de investigación entre sistemas de la universidad, incluidos estados del arte, integrantes, grupos de investigación, presupuestos y bibliografías.",
    "experience.business.date": "Febrero de 2023–actualidad",
    "experience.business.title": "Cofundador · ¡Ay, Donitas!",
    "experience.business.copy": "Gestiono junto con mi socia la operación diaria, el inventario y la atención al cliente.",
    "about.eyebrow": "Perfil",
    "about.title": "Sobre mi",
    "about.copy": "Estudio Ingeniería de Sistemas y Computación en la Universidad del Quindío. Me enfoco en desarrollo backend con Java y Spring Boot y he integrado APIs en aplicaciones con Angular y TypeScript.",
    "about.languages": "Español nativo · Inglés B2",
    "certs.eyebrow": "Formación",
    "certs.title": "Certificaciones",
    "certs.view": "Ver certificado",
    "contact.eyebrow": "Contacto",
    "contact.title": "Hablemos"
  }
};

function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The controls remain usable when browser storage is unavailable.
  }
}

function setTheme(theme) {
  const isDark = theme === "dark";
  root.classList.toggle("dark", isDark);
  themeIcon.textContent = isDark ? "◑" : "◐";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  savePreference("portfolio-theme", theme);
}

function changeLanguage(language) {
  const selectedLanguage = language === "es" ? "es" : "en";
  const isEnglish = selectedLanguage === "en";
  const messages = translations[selectedLanguage];

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = messages[element.dataset.i18n];
  });

  root.lang = selectedLanguage;
  languageToggle.textContent = isEnglish ? "ES" : "EN";
  languageToggle.setAttribute("aria-label", isEnglish ? "Change language to Spanish" : "Cambiar idioma a inglés");
  themeToggle.setAttribute("aria-label", isEnglish ? "Toggle dark mode" : "Alternar modo oscuro");
  skills.setAttribute("aria-label", isEnglish ? "Skills" : "Habilidades");
  document.querySelector(".nav").setAttribute("aria-label", isEnglish ? "Main navigation" : "Navegación principal");
  savePreference("portfolio-language", selectedLanguage);
}

setTheme(readPreference("portfolio-theme") === "light" ? "light" : "dark");
changeLanguage(readPreference("portfolio-language"));
year.textContent = new Date().getFullYear();

themeToggle.addEventListener("click", () => {
  setTheme(root.classList.contains("dark") ? "light" : "dark");
});

languageToggle.addEventListener("click", () => {
  changeLanguage(root.lang === "en" ? "es" : "en");
});
