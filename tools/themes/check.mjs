// Comprueba que cada tema de src/styles/themes.css cumple WCAG AA en los pares de `rules`.
// Lee el CSS final (no las paletas), así detecta también ediciones a mano.
import { readFileSync } from 'node:fs';
import { contrast, MIN, rules } from './contrast.mjs';
import { families } from './palettes.mjs';

const css = readFileSync('src/styles/themes.css', 'utf8');
const blocks = [
  ...css.matchAll(/:root\[data-theme='([^']+)'\]\[data-mode='([^']+)'\] \{([^}]+)\}/g),
];
const errors = [];

for (const [, family, mode, body] of blocks) {
  const c = Object.fromEntries(
    [...body.matchAll(/--color-(\w+):\s*(#[0-9a-f]{6})/g)].map((m) => [m[1], m[2]]),
  );
  for (const [fg, bg] of rules) {
    const ratio = contrast(c[fg], c[bg]);
    if (ratio < MIN)
      errors.push(`${family}/${mode}: ${fg} sobre ${bg} = ${ratio.toFixed(2)} (mínimo ${MIN})`);
  }
}

// Las familias de la web (prefs.ts y el script previo al pintado) deben ser las de las paletas
for (const file of ['src/lib/prefs.ts', 'src/layouts/Layout.astro']) {
  const text = readFileSync(file, 'utf8');
  for (const f of families)
    if (!text.includes(`'${f}'`)) errors.push(`${file}: falta la familia "${f}"`);
}

if (blocks.length < 12)
  errors.push(`solo hay ${blocks.length} variantes de tema (se esperaban 12)`);
if (errors.length) {
  console.error(`✗ Contraste insuficiente:\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log(`✓ Contraste WCAG AA en ${blocks.length} variantes de tema`);
