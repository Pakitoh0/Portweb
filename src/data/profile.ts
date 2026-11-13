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

export const skills = {
  lenguajes: ['TypeScript', 'JavaScript', 'Python', 'C', 'Ensamblador RISC-V'],
  web: ['Astro', 'HTML', 'CSS', 'Tailwind'],
  sistemas: ['Linux (Arch)', 'Hyprland', 'Bash/Zsh', 'Git'],
  hardware: ['Logisim', 'Sistemas digitales', 'Arquitectura de computadores'],
};
