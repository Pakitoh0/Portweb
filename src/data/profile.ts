// Datos personales del portafolio (LinkedIn y email siguen siendo marcadores)
export const profile = {
  name: 'Francisco',
  handle: 'pacodev',
  role: 'Estudiante de Ingeniería de Software · Junior Software Developer',
  university: 'Universidad de Málaga',
  bio: 'Estudiante de Ingeniería de Software en la UMA, con formación previa en DAM. Me interesa entender cómo se construyen, prueban y mantienen los sistemas, no solo usarlos: arquitectura, automatización, QA y herramientas propias.',
  location: 'Málaga, España',
  links: {
    github: 'https://github.com/Pakitoh0',
    linkedin: 'https://www.linkedin.com/in/TU_USUARIO',
    email: 'tu.correo@ejemplo.com',
  },
};

export const about = {
  education: [
    'Grado en Ingeniería de Software — Universidad de Málaga',
    'CFGS Desarrollo de Aplicaciones Multiplataforma (DAM)',
  ],
  interests: [
    'Ingeniería y arquitectura de software',
    'Desarrollo de aplicaciones multiplataforma',
    'IA aplicada al desarrollo y agentes de programación',
    'Linux y personalización de entornos de desarrollo',
    'DevOps, CI/CD y calidad del software',
    'Herramientas propias y proyectos personales',
  ],
  philosophy: [
    'Calidad y mantenibilidad del código',
    'Automatizar lo repetitivo',
    'Modularidad y separación de responsabilidades',
    'Documentar y planificar antes de construir',
    'Flujos de trabajo eficientes',
    'Herramientas que aporten valor real',
  ],
};

export const projects = [
  {
    name: 'portafolio',
    desc: 'Este mismo sitio: Astro + Tailwind con estética de escritorio tiling y pipeline de CI/CD con controles de calidad.',
    tags: ['Astro', 'Tailwind', 'CI/CD'],
    kind: 'dev',
    url: 'https://github.com/Pakitoh0/Portweb',
  },
  {
    name: 'omatab',
    desc: 'Usar una tablet como segunda pantalla por USB en Hyprland/Omarchy.',
    tags: ['Linux', 'Hyprland', 'Shell'],
    kind: 'dev',
    url: '#',
  },
  {
    name: 'segundo-cerebro',
    desc: 'Base de conocimiento en Obsidian integrada con agentes de IA mediante skills y hooks.',
    tags: ['Obsidian', 'Markdown', 'IA'],
    kind: 'dev',
    url: '#',
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
