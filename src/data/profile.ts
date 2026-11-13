// Contenido del portafolio en español e inglés.
import type { Lang } from '../i18n';

type L<T> = Record<Lang, T>;

export const profile = {
  name: 'Francisco',
  handle: 'pacodev',
  githubUser: 'Pakitoh0',
  role: {
    es: 'Programador junior · Desarrollo y QA Automation',
    en: 'Junior Developer · Development & QA Automation',
  } satisfies L<string>,
  university: 'Universidad de Málaga',
  bio: {
    es: 'Estudiante de Ingeniería del Software en la UMA y titulado en DAM, con experiencia en desarrollo y QA Automation: pruebas end-to-end con Playwright, pipelines de testing y trabajo en equipos Scrum. Me interesa entender cómo se construyen, prueban y mantienen los sistemas.',
    en: 'Software Engineering student at the University of Málaga with a Multiplatform App Development diploma, and hands-on experience in development and QA Automation: end-to-end testing with Playwright, testing pipelines and Scrum teams. I want to understand how systems are built, tested and maintained.',
  } satisfies L<string>,
  location: { es: 'Málaga, España', en: 'Málaga, Spain' } satisfies L<string>,
  links: {
    github: 'https://github.com/Pakitoh0',
    linkedin: 'https://www.linkedin.com/in/francisco-barbero-b86a142a0/',
  },
};

export const about = {
  intro: {
    es: [
      'Soy programador junior y estudiante de Ingeniería del Software en la Universidad de Málaga, titulado en Desarrollo de Aplicaciones Multiplataforma. En mis prácticas en Kamstrup automaticé pruebas end-to-end con Playwright, diseñé la base de un pipeline de testing y resolví incidencias críticas en una aplicación Python dentro de un equipo Scrum.',
      'Uso Linux y Windows a diario y me interesa entender los sistemas, no limitarme a usarlos. Busco incorporarme a un equipo de desarrollo o QA donde aportar calidad de software y crecer hacia roles de más responsabilidad técnica.',
    ],
    en: [
      "I'm a junior developer and Software Engineering student at the University of Málaga, with a diploma in Multiplatform Application Development. During my internship at Kamstrup I automated end-to-end tests with Playwright, designed the foundation of a testing pipeline and fixed critical issues in a Python application within a Scrum team.",
      "I use Linux and Windows every day and I want to understand systems, not just use them. I'm looking to join a development or QA team where I can bring software quality and grow into roles with more technical responsibility.",
    ],
  } satisfies L<string[]>,
  education: {
    es: [
      'Grado en Ingeniería del Software — UMA, ETSI Informática (2025 – actualidad)',
      'CFGS Desarrollo de Aplicaciones Multiplataforma (DAM) — CES Lope de Vega, Córdoba (2023 – 2025)',
    ],
    en: [
      'BSc in Software Engineering — University of Málaga, ETSI Informática (2025 – present)',
      'Higher VET Diploma in Multiplatform App Development (DAM) — CES Lope de Vega, Córdoba (2023 – 2025)',
    ],
  } satisfies L<string[]>,
  interests: {
    es: [
      'Ingeniería y arquitectura de software',
      'Desarrollo de aplicaciones multiplataforma',
      'IA aplicada al desarrollo y agentes de programación',
      'Linux y personalización de entornos de desarrollo',
      'DevOps, CI/CD y calidad del software',
      'Herramientas propias y proyectos personales',
    ],
    en: [
      'Software engineering and architecture',
      'Multiplatform application development',
      'AI-assisted development and coding agents',
      'Linux and development environment customization',
      'DevOps, CI/CD and software quality',
      'Building my own tools and side projects',
    ],
  } satisfies L<string[]>,
  philosophy: {
    es: [
      'Calidad y mantenibilidad del código',
      'Automatizar lo repetitivo',
      'Modularidad y separación de responsabilidades',
      'Documentar y planificar antes de construir',
      'Flujos de trabajo eficientes',
      'Herramientas que aporten valor real',
    ],
    en: [
      'Code quality and maintainability',
      'Automate the repetitive',
      'Modularity and separation of concerns',
      'Document and plan before building',
      'Efficient workflows',
      'Tools that add real value',
    ],
  } satisfies L<string[]>,
  languages: {
    es: ['Español: nativo', 'Inglés: técnico (lectura y documentación)'],
    en: ['Spanish: native', 'English: technical (reading and documentation)'],
  } satisfies L<string[]>,
};

export interface Hackathon {
  event: string;
  project: string;
  place: L<string>;
  period: L<string>;
  role: L<string>;
  url?: string; // repositorio o entrega
  tags: string[];
  achievements: L<string[]>;
}

// Hackathones en los que he participado (sección "experiencia"), del más reciente al más antiguo
export const hackathons: Hackathon[] = [
  {
    event: 'Malackathon · reto NTT DATA',
    project: 'mi_bot',
    place: { es: 'ETSI Informática (UMA), Málaga', en: 'ETSI Informática (UMA), Málaga, Spain' },
    period: { es: 'oct 2026', en: 'Oct 2026' },
    role: { es: 'Equipo de 4 · 8.º de 12 equipos', en: 'Team of 4 · 8th of 12 teams' },
    tags: ['Python', 'Scikit-learn', 'Machine Learning', 'NLP'],
    achievements: {
      es: [
        'Sistema que verifica y puntúa la veracidad de respuestas generadas por modelos de IA, detectando alucinaciones al contrastarlas con fuentes de referencia.',
        'Feature engineering: extracción de cifras, comprobación de plazos y análisis de consistencia con procesamiento de texto y expresiones regulares.',
        'Regresión logística y ExtraTreesClassifier (Scikit-learn), con umbrales ajustados por una función de coste que penaliza 4:1 los errores críticos.',
        'Sistema de inferencia autónomo y ligero, desarrollado en equipo con Git y con el tiempo en contra.',
      ],
      en: [
        'A system that verifies and scores the truthfulness of AI-generated answers, detecting hallucinations by checking them against reference sources.',
        'Feature engineering: number extraction, deadline checks and consistency analysis with text processing and regular expressions.',
        'Logistic regression and ExtraTreesClassifier (Scikit-learn), with thresholds tuned by a cost function that penalizes critical errors 4:1.',
        'A lightweight, self-contained inference system, built as a team with Git against the clock.',
      ],
    },
  },
  {
    event: 'Malackathon 2026 · Proof of Aid',
    project: 'ClearTrust',
    place: { es: 'Málaga', en: 'Málaga, Spain' },
    period: { es: '24 – 26 sep 2026', en: 'Sep 24 – 26, 2026' },
    role: {
      es: 'Equipo de 3 · finalistas entre 14 equipos',
      en: 'Team of 3 · finalists among 14 teams',
    },
    url: 'https://github.com/proof-of-aid/team-05',
    tags: ['Solidity', 'Arbitrum', 'FastAPI', 'PostgreSQL', 'React', 'TypeScript'],
    achievements: {
      es: [
        'Sistema para verificar que la ayuda humanitaria llega a quien la necesita sin publicar los datos personales de los beneficiarios.',
        'Smart contracts en Solidity (Foundry, OpenZeppelin) desplegados en Arbitrum Sepolia, con más de 160 tests y 100 % de cobertura: verificación en dos fases por auditores acreditados, disputas y depósitos.',
        'Pruebas cifradas (AES-256-GCM) y sin metadatos fuera de la cadena, ancladas con una raíz de Merkle y verificables desde el navegador contra la blockchain (wagmi/viem).',
        'Mi parte: el dashboard y los componentes de verificación del frontend (React + TypeScript) y los endpoints del backend para la descarga autorizada y la visibilidad de las pruebas (FastAPI).',
      ],
      en: [
        "A system to verify that humanitarian aid reaches those who need it without publishing beneficiaries' personal data.",
        'Solidity smart contracts (Foundry, OpenZeppelin) deployed on Arbitrum Sepolia, with 160+ tests and 100% coverage: two-stage verification by accredited auditors, disputes and deposits.',
        'Encrypted (AES-256-GCM), metadata-free off-chain evidence anchored with a Merkle root and verifiable from the browser against the blockchain (wagmi/viem).',
        'My part: the dashboard and verification components of the frontend (React + TypeScript) and the backend endpoints for authorized download and visibility of evidence (FastAPI).',
      ],
    },
  },
  {
    event: 'Hackathon del Ayuntamiento de Málaga',
    project: 'Mapa de zonas inundables',
    place: { es: 'Málaga', en: 'Málaga, Spain' },
    period: { es: 'jun 2026', en: 'Jun 2026' },
    role: {
      es: 'Equipo con perfiles de marketing · datos y frontend',
      en: 'Team with marketing profiles · data and frontend',
    },
    tags: ['React', 'Datos abiertos', 'Google AI Studio', 'Mapas'],
    achievements: {
      es: [
        'Hackathon para buscar soluciones reales a problemas actuales de la ciudad, con compañeros de marketing que ayudaron a detectar la problemática.',
        'Recopilé datos sobre zonas verdes para crear un dataset de zonas inundables y lo integramos en un mapa.',
        'Frontend en React y Google AI Studio para orquestar buena parte del flujo de trabajo mientras procesábamos los datos.',
      ],
      en: [
        "A hackathon to find real solutions to the city's current problems, with marketing teammates who helped pin down the problem.",
        'I gathered data on green areas to build a dataset of flood-prone zones, which we integrated into a map.',
        'A React frontend, with Google AI Studio orchestrating much of the workflow while we processed the data.',
      ],
    },
  },
  {
    event: 'Malackathon 2025',
    project: 'Análisis de datos con IA',
    place: { es: 'Universidad de Málaga', en: 'University of Málaga, Spain' },
    period: { es: '2025', en: '2025' },
    role: { es: 'Equipo de 4', en: 'Team of 4' },
    tags: ['Astro', 'TypeScript', 'Oracle', 'Gemini'],
    achievements: {
      es: [
        'Análisis de datos con inteligencia artificial, con Oracle como colaborador principal (alojaba nuestras bases de datos) e Indra y Mercedes-Benz como patrocinadores.',
        'Frontend con Astro y CSS, backend en TypeScript e IA integrada con Gemini.',
      ],
      en: [
        'Data analysis with artificial intelligence, with Oracle as main partner (it hosted our databases) and Indra and Mercedes-Benz as sponsors.',
        'Frontend with Astro and CSS, TypeScript backend and AI integrated through Gemini.',
      ],
    },
  },
];

export interface Project {
  slug: string;
  name: string;
  kind: 'dev' | 'uni';
  tags: string[];
  repo?: string;
  image?: string; // ruta dentro de public/
  summary: L<string>;
  problem: L<string>;
  solution: L<string[]>;
  stack: string[];
  learned: L<string[]>;
}

export const projects: Project[] = [
  {
    slug: 'omatab',
    name: 'omatab',
    kind: 'dev',
    tags: ['Rust', 'Kotlin', 'Bash', 'Hyprland'],
    repo: 'https://github.com/Pakitoh0/omatab',
    summary: {
      es: 'Plugin de Omarchy que convierte una tablet Android en segunda pantalla por USB en Hyprland.',
      en: 'Omarchy plugin that turns an Android tablet into a USB second screen on Hyprland.',
    },
    problem: {
      es: 'Quería usar mi Galaxy Tab como monitor extendido del portátil con Hyprland, fluido por cable y sin restar rendimiento al equipo. Las soluciones existentes iban por Wi-Fi, con mucha latencia, o no se integraban con el escritorio.',
      en: 'I wanted to use my Galaxy Tab as an extended monitor for my Hyprland laptop: smooth over a cable and without hurting system performance. Existing options went over Wi-Fi with high latency, or did not integrate with the desktop.',
    },
    solution: {
      es: [
        'Motor propio basado en Moreland (Rust + GStreamer con VA-API) que codifica la pantalla virtual por hardware y la envía por ADB.',
        'App Android en Kotlin que decodifica y muestra la imagen, con pantalla de espera cuidada.',
        'Controlador en Bash + jq con verbos (start, stop, doctor, watch…) y botón en la barra de Omarchy con QML/Quickshell.',
        'Detecta el desenchufe en ~0,3 s y reconecta solo; ~16 ms de latencia mediana y ~12 % de un núcleo.',
        'Release con binario, APK y SHA256SUMS; se instala con un único comando de Omarchy.',
      ],
      en: [
        'Custom engine based on Moreland (Rust + GStreamer with VA-API) that hardware-encodes a virtual display and streams it over ADB.',
        'Kotlin Android app that decodes and shows the image, with a polished standby screen.',
        'Bash + jq controller with verbs (start, stop, doctor, watch…) and a button in the Omarchy bar built with QML/Quickshell.',
        'Detects unplugging in ~0.3 s and reconnects on its own; ~16 ms median latency and ~12 % of one core.',
        'Release with binary, APK and SHA256SUMS; installs with a single Omarchy command.',
      ],
    },
    stack: ['Rust', 'GStreamer / VA-API', 'Kotlin', 'Bash + jq', 'QML / Quickshell', 'ADB'],
    learned: {
      es: [
        'Medir antes de optimizar: latencia, p95 y uso de CPU con datos reales.',
        'Depurar vídeo por hardware (formatos de color, decodificadores que retienen frames).',
        'Empaquetar y publicar releases verificables.',
      ],
      en: [
        'Measure before optimizing: latency, p95 and CPU usage with real data.',
        'Debugging hardware video pipelines (color formats, decoders holding frames).',
        'Packaging and publishing verifiable releases.',
      ],
    },
  },
  {
    slug: 'echomap',
    name: 'echomap',
    kind: 'uni',
    tags: ['Flutter', 'Dart', 'Backend', 'TFG'],
    repo: 'https://github.com/Pakitoh0/Echomap',
    summary: {
      es: 'App móvil para localizar audífonos, pensada para personas con pérdida auditiva. Proyecto final del ciclo DAM.',
      en: 'Mobile app to locate hearing aids, built for people with hearing loss. Final project of my DAM diploma.',
    },
    problem: {
      es: 'Los audífonos son pequeños, caros y fáciles de perder. Para una persona con pérdida auditiva, perderlos significa quedarse sin una herramienta esencial del día a día.',
      en: 'Hearing aids are small, expensive and easy to lose. For someone with hearing loss, losing them means losing an essential everyday tool.',
    },
    solution: {
      es: [
        'Aplicación móvil multiplataforma con Flutter que ayuda a localizar los audífonos.',
        'Implementé la lógica de localización y definí la arquitectura de la aplicación.',
        'Backend y base de datos propios para guardar y consultar la información de localización.',
      ],
      en: [
        'Cross-platform mobile app built with Flutter that helps locate hearing aids.',
        'I implemented the location logic and defined the application architecture.',
        'Custom backend and database to store and query location data.',
      ],
    },
    stack: ['Flutter', 'Dart', 'Backend', 'Database'],
    learned: {
      es: [
        'Diseñar la arquitectura completa de una app: móvil, backend y datos.',
        'Pensar el producto desde las necesidades reales de accesibilidad de quien lo usa.',
      ],
      en: [
        'Designing the full architecture of an app: mobile, backend and data.',
        'Thinking about the product from the real accessibility needs of its users.',
      ],
    },
  },
  {
    slug: 'portafolio',
    name: 'portafolio',
    kind: 'dev',
    tags: ['Astro', 'Tailwind', 'CI/CD'],
    repo: 'https://github.com/Pakitoh0/Portweb',
    image: 'projects/portafolio.jpg',
    summary: {
      es: 'Este mismo sitio: Astro + Tailwind con estética de escritorio tiling y un pipeline de CI/CD con siete módulos de revisión.',
      en: 'This very site: Astro + Tailwind with a tiling-desktop look and a CI/CD pipeline with seven review modules.',
    },
    problem: {
      es: 'Necesitaba un portafolio que me representara y que, además, demostrara cómo trabajo: calidad, automatización y despliegues seguros.',
      en: 'I needed a portfolio that represented me and also showed how I work: quality, automation and safe deployments.',
    },
    solution: {
      es: [
        'Sitio estático con Astro, en español e inglés, con estética de Hyprland: ventanas en mosaico, barra tipo waybar y terminal interactiva.',
        'Pipeline en GitHub Actions: formato, tipos, seguridad de workflows, secretos, dependencias, CodeQL, HTML y Lighthouse con umbrales.',
        'Solo despliega si pasa todo; prueba de humo en producción y modo mantenimiento para hotfixes.',
      ],
      en: [
        'Static site with Astro, in Spanish and English, styled like Hyprland: tiled windows, waybar-like bar and an interactive terminal.',
        'GitHub Actions pipeline: formatting, types, workflow security, secrets, dependencies, CodeQL, HTML and Lighthouse with thresholds.',
        'Deploys only if everything passes; production smoke test and a maintenance mode for hotfixes.',
      ],
    },
    stack: ['Astro', 'Tailwind CSS', 'TypeScript', 'GitHub Actions', 'Lighthouse CI', 'pnpm'],
    learned: {
      es: [
        'Diseñar un pipeline donde un fallo nunca tumba la web en producción.',
        'Endurecer workflows: permisos mínimos y actions fijadas por SHA.',
      ],
      en: [
        'Designing a pipeline where a failure never takes production down.',
        'Hardening workflows: least-privilege permissions and SHA-pinned actions.',
      ],
    },
  },
  {
    slug: 'segundo-cerebro',
    name: 'segundo-cerebro',
    kind: 'dev',
    tags: ['Obsidian', 'Markdown', 'IA'],
    summary: {
      es: 'Base de conocimiento en Obsidian integrada con agentes de IA mediante skills y hooks.',
      en: 'Obsidian knowledge base integrated with AI coding agents through skills and hooks.',
    },
    problem: {
      es: 'Los agentes de programación empiezan cada sesión sin memoria: repetía contexto, preferencias y soluciones a errores ya vistos.',
      en: 'Coding agents start every session with no memory: I kept repeating context, preferences and fixes for errors I had already solved.',
    },
    solution: {
      es: [
        'Vault de Obsidian organizado por perfil, programación, proyectos y conocimiento, con un índice como punto de entrada.',
        'Hook de inicio de sesión que inyecta lo esencial y skills para consultar, capturar y revisar conocimiento bajo demanda.',
        'Nada se escribe sin aprobación explícita: el agente propone y yo decido.',
      ],
      en: [
        'Obsidian vault organized by profile, programming, projects and knowledge, with an index as the entry point.',
        'A session-start hook that injects the essentials, plus skills to recall, capture and review knowledge on demand.',
        'Nothing is written without explicit approval: the agent proposes, I decide.',
      ],
    },
    stack: ['Obsidian', 'Markdown', 'Claude Code (skills y hooks)', 'Bash'],
    learned: {
      es: [
        'Diseñar contexto para agentes: poco y bien enrutado vale más que mucho.',
        'Separar lo reutilizable de lo específico de cada proyecto.',
      ],
      en: [
        'Designing context for agents: a little, well routed, beats a lot.',
        'Separating reusable knowledge from project-specific notes.',
      ],
    },
  },
];

// Datos del fastfetch de herramientas (sección 4)
export const fetch = {
  user: 'Pakitoh0',
  host: 'github',
  name: 'pacodev',
  // Fecha desde la que se calcula el "Uptime" (2 años, 8 meses y 6 días a 13/11/2026)
  since: '2024-03-07',
  groups: [
    {
      title: 'Backend',
      rows: [
        { key: 'Languages', value: 'Python, Java, C#, C, C++, Dart, SQL' },
        { key: 'Frameworks', value: '.NET / Pomelo, FastAPI, SQLAlchemy, Node' },
      ],
    },
    {
      title: 'Frontend',
      rows: [{ key: 'Stack', value: 'HTML, CSS, JS/TS, React, Astro, Tailwind' }],
    },
    {
      title: 'Mobile',
      rows: [{ key: 'Stack', value: 'Dart, Flutter, React Native, Android Studio' }],
    },
    {
      title: 'Testing & QA',
      rows: [{ key: 'Tools', value: 'Playwright, JUnit 5, Mockito, SonarQube' }],
    },
    {
      title: 'DevOps & CI/CD',
      rows: [
        { key: 'CI/CD', value: 'GitHub Actions, GitLab CI/CD, Jenkins' },
        { key: 'Tools', value: 'Docker, Git, Maven, pnpm, WSL, Postman' },
      ],
    },
    { title: 'Data', rows: [{ key: 'Databases', value: 'MariaDB, SQLite, JSON, TSON' }] },
    {
      title: 'AI Tools',
      rows: [
        { key: 'Tools', value: 'Claude Code, Codex, GitHub Copilot, Ollama, OpenClaw, OpenCode' },
      ],
    },
    { title: 'Workflow', rows: [{ key: 'Methods', value: 'Scrum, Agile · Linux, Neovim' }] },
  ],
};

// Líneas fijas de la ventana de estado (debajo van las de GitHub)
export const staticStatus: L<{ ok: boolean; text: string }[]> = {
  es: [
    { ok: true, text: 'DAM completado (2023 – 2025)' },
    { ok: true, text: 'prácticas en Kamstrup · QA Automation' },
    { ok: true, text: 'Ingeniería del Software en la UMA' },
  ],
  en: [
    { ok: true, text: 'DAM diploma (2023 – 2025)' },
    { ok: true, text: 'internship at Kamstrup · QA Automation' },
    { ok: true, text: 'Software Engineering at UMA' },
  ],
};
