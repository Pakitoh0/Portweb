// Genera src/styles/themes.css a partir de tools/themes/palettes.mjs.
// Si un color no llega a WCAG AA en algún par de `rules`, se corrige poco a poco hasta cumplir
// y se anota en el CSS: los acentos y el texto secundario se acercan al blanco (modo oscuro)
// o al negro (modo claro); el fondo de los chips (overlay) se acerca al de la ventana.
// Uso: node tools/themes/generate.mjs   ·   --check: falla si el CSS no está al día
import { readFileSync, writeFileSync } from 'node:fs';
import { families, palettes } from './palettes.mjs';
import { contrast, mix, MIN, rules } from './contrast.mjs';

const OUT = 'src/styles/themes.css';
const ADJUSTABLE = ['overlay', 'subtle', 'green', 'amber', 'blue', 'mauve', 'red'];

function fit(palette, mode) {
  const p = { ...palette };
  const adjusted = [];
  for (let pass = 0; pass < 3; pass++) {
    for (const [fg, bg] of rules) {
      // Se ajusta el lado ajustable; base, surface y text son intocables
      const key = ADJUSTABLE.includes(fg) ? fg : ADJUSTABLE.includes(bg) ? bg : null;
      if (!key) continue;
      const target = key === 'overlay' ? p.surface : mode === 'dark' ? '#ffffff' : '#000000';
      let t = 0;
      while (contrast(p[fg], p[bg]) < MIN && t < 1) {
        t += 0.02;
        p[key] = mix(palette[key], target, t);
      }
      if (p[key] !== palette[key] && !adjusted.includes(key)) adjusted.push(key);
    }
  }
  return { p, adjusted };
}

const vars = (p) =>
  Object.entries(p)
    .map(([k, v]) => `  --color-${k}: ${v};`)
    .join('\n');

let css = `/* GENERADO por tools/themes/generate.mjs a partir de tools/themes/palettes.mjs. No editar a mano. */\n`;
for (const family of families) {
  for (const mode of ['dark', 'light']) {
    const { p, adjusted } = fit(palettes[family][mode], mode);
    const note = adjusted.length ? ` · ajustado a WCAG AA: ${adjusted.join(', ')}` : '';
    css += `\n/* ${family} · ${mode}${note} */\n:root[data-theme='${family}'][data-mode='${mode}'] {\n${vars(p)}\n}\n`;
    // Sin JavaScript: el tema por defecto sigue la preferencia del sistema
    if (family === families[0] && mode === 'light') {
      css += `\n@media (prefers-color-scheme: light) {\n  :root:not([data-mode]) {\n${vars(p).replace(/^/gm, '  ')}\n  }\n}\n`;
    }
  }
}

if (process.argv.includes('--check')) {
  const current = readFileSync(OUT, 'utf8');
  if (current !== css) {
    console.error(`✗ ${OUT} no está al día con tools/themes/palettes.mjs. Ejecuta: pnpm themes`);
    process.exit(1);
  }
  console.log(`✓ ${OUT} al día`);
} else {
  writeFileSync(OUT, css);
  console.log(`✓ ${OUT} generado`);
}
