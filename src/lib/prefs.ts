// Preferencias del visitante: tema (familia de colores) y modo (claro, oscuro o sistema).
// localStorage puede fallar (modo privado, bloqueo): siempre try/catch.
// La lista de familias debe coincidir con tools/themes/palettes.mjs (lo comprueba pnpm check:themes).

export const families = [
  'catppuccin',
  'tokyo-night',
  'gruvbox',
  'kanagawa',
  'everforest',
  'nord',
] as const;
export type Family = (typeof families)[number];
export const familyLabels: Record<Family, string> = {
  catppuccin: 'Catppuccin',
  'tokyo-night': 'Tokyo Night',
  gruvbox: 'Gruvbox',
  kanagawa: 'Kanagawa',
  everforest: 'Everforest',
  nord: 'Nord',
};

export const modes = ['system', 'light', 'dark'] as const;
export type Mode = (typeof modes)[number];

const THEME_KEY = 'portweb-theme';
const MODE_KEY = 'portweb-mode';
const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)');

function read(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Sin almacenamiento: la preferencia dura hasta recargar
  }
}

export function getFamily(): Family {
  const current = document.documentElement.dataset.theme;
  return families.includes(current as Family) ? (current as Family) : 'catppuccin';
}

export function getMode(): Mode {
  const saved = read(MODE_KEY);
  return modes.includes(saved as Mode) ? (saved as Mode) : 'system';
}

/** Aplica tema y modo al documento (data-theme, data-mode) y avisa a la interfaz. */
function apply(family: Family, mode: Mode): void {
  const root = document.documentElement;
  const dark = mode === 'dark' || (mode === 'system' && darkQuery().matches);
  root.dataset.theme = family;
  root.dataset.mode = dark ? 'dark' : 'light';
  // Color de la barra del navegador en móvil, acorde al tema
  const base = getComputedStyle(root).getPropertyValue('--color-base').trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', base);
  document.dispatchEvent(new CustomEvent('themechange'));
}

export function setFamily(family: Family): void {
  write(THEME_KEY, family);
  apply(family, getMode());
}

export function setMode(mode: Mode): void {
  write(MODE_KEY, mode);
  apply(getFamily(), mode);
}

// En modo sistema, seguir los cambios del sistema operativo en vivo (solo en el navegador:
// este módulo también se importa al compilar para leer la lista de temas)
if (typeof window !== 'undefined') {
  darkQuery().addEventListener('change', () => {
    if (getMode() === 'system') apply(getFamily(), 'system');
  });
}
