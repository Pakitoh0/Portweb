// Presupuesto de peso del build: falla (exit 1) si el sitio engorda por encima de los límites.
// Mide los ficheros de dist/ sin comprimir. Se ejecuta en el CI tras el build.
import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const DIST = 'dist';
const KB = 1024;

// Límites (en KB). Valores de referencia al crearlos: JS 8, CSS 46, HTML 32, imagen mayor 107.
const BUDGET = {
  jsTotal: 40, // todo el JavaScript del sitio
  cssTotal: 80, // todo el CSS
  htmlPage: 80, // cada página HTML
  image: 200, // cada imagen (png, jpg, webp, avif, svg)
  font: 40, // cada fichero de fuente
};

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const files = walk(DIST).map((path) => ({
  path: relative(DIST, path),
  ext: extname(path).toLowerCase(),
  kb: statSync(path).size / KB,
}));

const sum = (exts) => files.filter((f) => exts.includes(f.ext)).reduce((a, f) => a + f.kb, 0);
const errors = [];
const fmt = (n) => `${n.toFixed(1)} KB`;

const js = sum(['.js', '.mjs']);
const css = sum(['.css']);
if (js > BUDGET.jsTotal) errors.push(`JavaScript total ${fmt(js)} > ${BUDGET.jsTotal} KB`);
if (css > BUDGET.cssTotal) errors.push(`CSS total ${fmt(css)} > ${BUDGET.cssTotal} KB`);

const limits = [
  [['.html'], BUDGET.htmlPage, 'página'],
  [['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg', '.gif'], BUDGET.image, 'imagen'],
  [['.woff', '.woff2', '.ttf', '.otf'], BUDGET.font, 'fuente'],
];
for (const [exts, max, what] of limits) {
  for (const f of files.filter((x) => exts.includes(x.ext))) {
    if (f.kb > max) errors.push(`${what} ${f.path}: ${fmt(f.kb)} > ${max} KB`);
  }
}

const biggest = (exts) =>
  Math.max(0, ...files.filter((f) => exts.includes(f.ext)).map((f) => f.kb));
console.log(
  [
    `JS total      ${fmt(js).padStart(9)} / ${BUDGET.jsTotal} KB`,
    `CSS total     ${fmt(css).padStart(9)} / ${BUDGET.cssTotal} KB`,
    `HTML mayor    ${fmt(biggest(['.html'])).padStart(9)} / ${BUDGET.htmlPage} KB`,
    `imagen mayor  ${fmt(biggest(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.svg'])).padStart(9)} / ${BUDGET.image} KB`,
    `fuente mayor  ${fmt(biggest(['.woff', '.woff2'])).padStart(9)} / ${BUDGET.font} KB`,
  ].join('\n'),
);

if (errors.length) {
  console.error(`✗ Presupuesto de peso superado:\n  - ${errors.join('\n  - ')}`);
  process.exit(1);
}
console.log('✓ Dentro del presupuesto de peso');
