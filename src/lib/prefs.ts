// Preferencias del visitante (tema). localStorage puede fallar (modo privado, bloqueo): siempre try/catch.
export const themes = ['mocha', 'tokyo-night', 'gruvbox'] as const;
export type Theme = (typeof themes)[number];
const KEY = 'portweb-theme';

export function getTheme(): Theme {
  const current = document.documentElement.dataset.theme;
  return themes.includes(current as Theme) ? (current as Theme) : 'mocha';
}

export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // Sin almacenamiento: el tema dura hasta recargar
  }
  document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}
