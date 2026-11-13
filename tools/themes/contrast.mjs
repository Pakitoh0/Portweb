// Contraste WCAG 2.x entre colores hex y los pares que deben cumplir todos los temas.

function channel(v) {
  const c = v / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(rgb) {
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
}

export function luminance(hex) {
  const [r, g, b] = hexToRgb(hex).map(channel);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Mezcla a con b (t = 0 → a, t = 1 → b). */
export function mix(a, b, t) {
  const [ra, rb] = [hexToRgb(a), hexToRgb(b)];
  return rgbToHex(ra.map((v, i) => v + (rb[i] - v) * t));
}

export const MIN = 4.5; // WCAG AA, texto normal

/** Pares [primer plano, fondo] que la web usa de verdad. */
export const rules = [
  ['text', 'surface'],
  ['text', 'overlay'],
  ['subtle', 'surface'],
  ['subtle', 'base'],
  ['green', 'surface'],
  ['amber', 'surface'],
  ['blue', 'surface'],
  ['mauve', 'surface'],
  ['red', 'surface'],
  ['base', 'mauve'], // workspace activo
  ['base', 'green'], // botón principal
];
