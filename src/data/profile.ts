// Contenido del portafolio en español e inglés.
// LinkedIn y email siguen siendo marcadores: sustitúyelos por los reales.
import type { Lang } from '../i18n';

type L<T> = Record<Lang, T>;

export const profile = {
  name: 'Francisco',
  handle: 'pacodev',
  githubUser: 'Pakitoh0',
  role: {
    es: 'Estudiante de Ingeniería de Software · Junior Software Developer',
    en: 'Software Engineering Student · Junior Software Developer',
  } satisfies L<string>,
  university: 'Universidad de Málaga',
  bio: {
    es: 'Estudiante de Ingeniería de Software en la UMA, con formación previa en DAM. Me interesa entender cómo se construyen, prueban y mantienen los sistemas, no solo usarlos: arquitectura, automatización, QA y herramientas propias.',
    en: 'Software Engineering student at the University of Málaga, with a background in Multiplatform App Development. I want to understand how systems are built, tested and maintained, not just use them: architecture, automation, QA and my own tools.',
  } satisfies L<string>,
  location: { es: 'Málaga, España', en: 'Málaga, Spain' } satisfies L<string>,
  links: {
    github: 'https://github.com/Pakitoh0',
    linkedin: 'https://www.linkedin.com/in/TU_USUARIO',
    email: 'tu.correo@ejemplo.com',
  },
};

export const about = {
  intro: {
    es: [
      'Estudio Ingeniería de Software en la Universidad de Málaga, después de formarme en Desarrollo de Aplicaciones Multiplataforma. Combino la base académica con experiencia práctica en desarrollo, automatización de pruebas y proyectos colaborativos.',
      'Me interesa entender los sistemas, no limitarme a usarlos: cómo se diseñan, se prueban y se mantienen.',
    ],
    en: [
      'I study Software Engineering at the University of Málaga, after training in Multiplatform Application Development. I combine an academic foundation with hands-on experience in development, test automation and collaborative projects.',
      'I want to understand systems, not just use them: how they are designed, tested and maintained.',
    ],
  } satisfies L<string[]>,
  education: {
    es: [
      'Grado en Ingeniería de Software — Universidad de Málaga',
      'CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)',
    ],
    en: [
      'BSc in Software Engineering — University of Málaga',
      'Higher VET Diploma in Multiplatform App Development (DAM)',
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
};

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
        { key: 'Languages', value: 'C, C#, C++, Java, Python' },
        { key: 'Frameworks', value: '.NET / Pomelo, Node' },
      ],
    },
    { title: 'Frontend', rows: [{ key: 'Stack', value: 'HTML, JS/TS, React' }] },
    { title: 'Mobile', rows: [{ key: 'Stack', value: 'Dart, Flutter, React Native' }] },
    {
      title: 'DevOps & Tools',
      rows: [{ key: 'Tools', value: 'Docker, Jenkins, WSL, pnpm, Git, Postman' }],
    },
    { title: 'Testing', rows: [{ key: 'Tools', value: 'Playwright, JUnit, Mockito' }] },
    { title: 'Data', rows: [{ key: 'Formats', value: 'JSON, TSON' }] },
    {
      title: 'AI Tools',
      rows: [{ key: 'Tools', value: 'Ollama, Claude, Codex, OpenClaw, OpenCode' }],
    },
  ],
};

// Líneas fijas de la ventana de estado (debajo van las de GitHub)
export const staticStatus: L<{ ok: boolean; text: string }[]> = {
  es: [
    { ok: true, text: 'DAM completado' },
    { ok: true, text: 'Ingeniería de Software en la UMA' },
  ],
  en: [
    { ok: true, text: 'DAM completed' },
    { ok: true, text: 'Software Engineering at UMA' },
  ],
};
