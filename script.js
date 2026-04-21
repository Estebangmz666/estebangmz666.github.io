const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const languageToggle = document.querySelector(".language-toggle");
const year = document.querySelector("#year");

const translations = {
  en: {
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.certifications": "Certifications",
    "nav.contact": "Contact",
    "hero.eyebrow": "Backend developer · Armenia, Quindio",
    "hero.title": "Hi, I am <span>Esteban Gomez Leon</span>. I build solid, well-structured backend solutions.",
    "hero.copy": "Systems and Computer Engineering student at Universidad del Quindio. I work with Java, Spring Boot, REST APIs, relational databases and full stack applications with Angular.",
    "hero.projects": "View projects",
    "hero.cv": "Download CV",
    "hero.email": "Email me",
    "projects.eyebrow": "Selected work",
    "projects.title": "Projects",
    "project.stayhub": "Airbnb-style platform for managing accommodations, bookings, reviews, JWT authentication, host metrics and an interactive Mapbox map.",
    "project.transactum": "Advanced virtual wallet for managing accounts, manual or scheduled transactions, points and user ranks with custom data structures.",
    "project.lexipol": "Machine learning pipeline for sentiment analysis using TF-IDF and logistic regression on IMDB reviews.",
    "project.gradesmasher": "R analysis about the relationship between study time and academic performance, with a linear model and result visualization.",
    "project.wallet": "Desktop application for managing budgets, login and financial movements with an interface built in JavaFX.",
    "project.academic": "Academic",
    "project.algorithms": "Academic implementations of graphs, binary trees, queues, contact agenda and calculator with graphical interface.",
    "tag.structures": "Structures",
    "tag.regression": "Regression",
    "tag.graphs": "Graphs",
    "tag.trees": "Trees",
    "about.eyebrow": "Profile",
    "about.title": "About",
    "about.copy": "I like building systems that feel simple for the user and solid in their architecture. My path goes from Java desktop applications to modern web development with Angular and Spring Boot, while exploring data analysis and machine learning with R and Python.",
    "certs.eyebrow": "Education",
    "certs.title": "Certifications",
    "certs.view": "View certificate",
    "contact.eyebrow": "Contact",
    "contact.title": "Let's build a clear, stable backend solution ready to grow.",
    "footer.rights": "© <span id=\"year\"></span> Esteban Gomez Leon. All rights reserved."
  },
  es: {
    "nav.projects": "Proyectos",
    "nav.about": "Sobre mi",
    "nav.certifications": "Certificaciones",
    "nav.contact": "Contacto",
    "hero.eyebrow": "Desarrollador backend · Armenia, Quindio",
    "hero.title": "Hola, soy <span>Esteban G\u00f3mez Le\u00f3n</span>. Desarrollo soluciones backend solidas y bien estructuradas.",
    "hero.copy": "Estudiante de Ingenieria de Sistemas y Computacion en la Universidad del Quindio. Trabajo con Java, Spring Boot, APIs REST, bases de datos relacionales y aplicaciones full stack con Angular.",
    "hero.projects": "Ver proyectos",
    "hero.cv": "Descargar CV",
    "hero.email": "Escribeme",
    "projects.eyebrow": "Trabajo seleccionado",
    "projects.title": "Proyectos",
    "project.stayhub": "Plataforma tipo Airbnb para gestionar alojamientos, reservas, resenas, autenticacion JWT, metricas para anfitriones y mapa interactivo con Mapbox.",
    "project.transactum": "Billetera virtual avanzada para gestionar cuentas, transacciones manuales o programadas, puntos y rangos de usuario con estructuras de datos propias.",
    "project.lexipol": "Pipeline de machine learning para analisis de sentimientos usando TF-IDF y regresion logistica sobre resenas de IMDB.",
    "project.gradesmasher": "Analisis en R sobre la relacion entre tiempo de estudio y rendimiento academico, con modelo lineal y visualizacion de resultados.",
    "project.wallet": "Aplicacion de escritorio para gestionar presupuesto, login y movimientos financieros con una interfaz creada en JavaFX.",
    "project.academic": "Academico",
    "project.algorithms": "Implementaciones academicas de grafos, arboles binarios, colas, agenda de contactos y calculadora con interfaz grafica.",
    "tag.structures": "Estructuras",
    "tag.regression": "Regresion",
    "tag.graphs": "Grafos",
    "tag.trees": "Arboles",
    "about.eyebrow": "Perfil",
    "about.title": "Sobre mi",
    "about.copy": "Me gusta construir sistemas que se sienten simples para el usuario y solidos en su arquitectura. Mi recorrido va desde aplicaciones de escritorio en Java hasta desarrollo web moderno con Angular y Spring Boot, mientras exploro analisis de datos y machine learning con R y Python.",
    "certs.eyebrow": "Formacion",
    "certs.title": "Certificaciones",
    "certs.view": "Ver certificado",
    "contact.eyebrow": "Contacto",
    "contact.title": "Construyamos una solucion backend clara, estable y lista para crecer.",
    "footer.rights": "© <span id=\"year\"></span> Esteban G\u00f3mez Le\u00f3n. Todos los derechos reservados."
  }
};

const savedTheme = localStorage.getItem("portfolio-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.classList.toggle("dark", theme === "dark");
  themeIcon.textContent = theme === "dark" ? "◑" : "◐";
  localStorage.setItem("portfolio-theme", theme);
}

function refreshYear() {
  const yearElement = document.querySelector("#year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function changeLanguage(language) {
  const selectedLanguage = translations[language] ? language : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[selectedLanguage][key];

    if (value) {
      element.innerHTML = value;
    }
  });

  root.lang = selectedLanguage;
  languageToggle.textContent = selectedLanguage === "en" ? "ES" : "EN";
  languageToggle.setAttribute(
    "aria-label",
    selectedLanguage === "en" ? "Change language to Spanish" : "Cambiar idioma a ingles"
  );
  localStorage.setItem("portfolio-language", selectedLanguage);
  refreshYear();
}

setTheme(savedTheme || (prefersDark ? "dark" : "light"));
changeLanguage(localStorage.getItem("portfolio-language") || "en");
refreshYear();

themeToggle.addEventListener("click", () => {
  const nextTheme = root.classList.contains("dark") ? "light" : "dark";
  setTheme(nextTheme);
});

languageToggle.addEventListener("click", () => {
  const nextLanguage = root.lang === "en" ? "es" : "en";
  changeLanguage(nextLanguage);
});