// TODO: sustituye los marcadores por tus datos reales
export const profile = {
  name: 'TU NOMBRE',
  handle: 'usuario',
  role: 'Estudiante de Ingeniería Informática · Desarrollador',
  university: 'TU UNIVERSIDAD',
  bio: 'Programo, rompo cosas en Linux y diseño procesadores en Logisim. Me gusta entender el stack de arriba a abajo: desde el transistor hasta la web.',
  location: 'España',
  links: {
    github: 'https://github.com/TU_USUARIO',
    linkedin: 'https://www.linkedin.com/in/TU_USUARIO',
    email: 'tu.correo@ejemplo.com',
  },
};

export const projects = [
  {
    name: 'procesador-riscv',
    desc: 'Procesador monociclo RISC-V diseñado en Logisim: ALU, banco de registros y unidad de control.',
    tags: ['RISC-V', 'Logisim', 'Hardware'],
    kind: 'uni',
    url: '#',
  },
  {
    name: 'omatab',
    desc: 'Usar una tablet como segunda pantalla por USB en Hyprland/Omarchy.',
    tags: ['Linux', 'Hyprland', 'Shell'],
    kind: 'dev',
    url: '#',
  },
  {
    name: 'portafolio',
    desc: 'Este mismo sitio: Astro + Tailwind con estética de escritorio tiling.',
    tags: ['Astro', 'Tailwind', 'TypeScript'],
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
    { title: 'Backend', rows: [
      { key: 'Languages', value: 'C, C#, C++, Java, Python' },
      { key: 'Frameworks', value: '.NET / Pomelo, Node' },
    ] },
    { title: 'Frontend', rows: [{ key: 'Stack', value: 'HTML, JS/TS, React' }] },
    { title: 'Mobile', rows: [{ key: 'Stack', value: 'Dart, Flutter, React Native' }] },
    { title: 'DevOps & Tools', rows: [{ key: 'Tools', value: 'Docker, Jenkins, WSL, pnpm, Git, Postman' }] },
    { title: 'Testing', rows: [{ key: 'Tools', value: 'Playwright, JUnit, Mockito' }] },
    { title: 'Data', rows: [{ key: 'Formats', value: 'JSON, TSON' }] },
    { title: 'AI Tools', rows: [{ key: 'Tools', value: 'Ollama, Claude, Codex, OpenClaw, OpenCode' }] },
  ],
};
