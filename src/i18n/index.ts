// Idiomas del sitio y rutas localizadas
export const langs = ['es', 'en'] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = 'es';

const base = import.meta.env.BASE_URL; // '/Portweb/'

/** Ruta absoluta (con base) de la portada en un idioma. */
export function homePath(lang: Lang): string {
  return lang === 'es' ? base : `${base}en/`;
}

/** Ruta absoluta de la página de un proyecto. */
export function projectPath(lang: Lang, slug: string): string {
  return lang === 'es' ? `${base}proyectos/${slug}/` : `${base}en/projects/${slug}/`;
}

/** Ruta absoluta de la lista de notas técnicas. */
export function notesPath(lang: Lang): string {
  return lang === 'es' ? `${base}notas/` : `${base}en/notes/`;
}

/** Ruta absoluta de una nota técnica. */
export function notePath(lang: Lang, slug: string): string {
  return `${notesPath(lang)}${slug}/`;
}

/** Textos fijos de la interfaz. */
export const ui = {
  es: {
    portfolio: 'portafolio',
    workspaces: {
      inicio: 'inicio',
      'sobre-mi': 'sobre-mí',
      experiencia: 'experiencia',
      proyectos: 'proyectos',
      herramientas: 'herramientas',
      contacto: 'contacto',
    },
    seeProjects: 'ver proyectos',
    contact: 'contactar',
    typeHelp: 'abre la terminal y escribe help',
    aboutTitle: 'Sobre mí',
    education: 'formación',
    interests: 'intereses',
    howIWork: 'cómo trabajo',
    languagesSpoken: 'idiomas',
    experienceTitle: 'Experiencia',
    contactText:
      '¿Hablamos? Estoy abierto a prácticas, proyectos y charlas sobre ingeniería de software, Linux, automatización o IA.',
    madeWith: 'hecho con Astro + Tailwind',
    viewDetails: 'ver detalles →',
    back: '← volver a proyectos',
    problem: 'Problema',
    solution: 'Solución',
    stack: 'Stack',
    learned: 'Qué aprendí',
    repo: 'repositorio',
    noRepo: 'sin repositorio público',
    theme: 'tema',
    mode: 'modo',
    modes: { system: '◐ sistema', light: '○ claro', dark: '● oscuro' },
    terminal: 'terminal',
    language: 'idioma',
    skipToContent: 'Saltar al contenido',
    updated: 'actualizado',
    languages: 'Lenguajes',
    notes: 'notas',
    notesTitle: 'Notas técnicas',
    notesIntro: 'Cómo he construido algunos de mis proyectos y lo que aprendí por el camino.',
    noNotes: 'Todavía no hay notas publicadas.',
    backToNotes: '← volver a notas',
    readNote: 'leer →',
    draft: 'borrador',
  },
  en: {
    portfolio: 'portfolio',
    workspaces: {
      inicio: 'home',
      'sobre-mi': 'about',
      experiencia: 'experience',
      proyectos: 'projects',
      herramientas: 'tools',
      contacto: 'contact',
    },
    seeProjects: 'see projects',
    contact: 'contact',
    typeHelp: 'open the terminal and type help',
    aboutTitle: 'About me',
    education: 'education',
    interests: 'interests',
    howIWork: 'how I work',
    languagesSpoken: 'languages',
    experienceTitle: 'Experience',
    contactText:
      "Let's talk! I'm open to internships, projects and conversations about software engineering, Linux, automation or AI.",
    madeWith: 'built with Astro + Tailwind',
    viewDetails: 'view details →',
    back: '← back to projects',
    problem: 'Problem',
    solution: 'Solution',
    stack: 'Stack',
    learned: 'What I learned',
    repo: 'repository',
    noRepo: 'no public repository',
    theme: 'theme',
    mode: 'mode',
    modes: { system: '◐ system', light: '○ light', dark: '● dark' },
    terminal: 'terminal',
    language: 'language',
    skipToContent: 'Skip to content',
    updated: 'updated',
    languages: 'Languages',
    notes: 'notes',
    notesTitle: 'Technical notes',
    notesIntro: 'How I built some of my projects and what I learned along the way.',
    noNotes: 'No notes published yet.',
    backToNotes: '← back to notes',
    readNote: 'read →',
    draft: 'draft',
  },
} satisfies Record<Lang, unknown>;
