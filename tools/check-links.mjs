// Comprueba que el build en dist/ está completo y que no hay enlaces internos rotos.
// Falla (exit 1) con un mensaje claro si encuentra algún problema.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const BASE = '/Portweb/';

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

if (!existsSync(join(DIST, 'index.html'))) {
  fail(`No existe ${DIST}/index.html: el build no se ha generado. Ejecuta "pnpm build".`);
}

function listHtml(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return listHtml(path);
    return path.endsWith('.html') ? [path] : [];
  });
}

const errors = [];

for (const file of listHtml(DIST)) {
  const html = readFileSync(file, 'utf8');
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

  for (const [, url] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    // Externos, correo y protocolos ajenos: no se comprueban aquí
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;

    if (url.startsWith('#')) {
      const id = url.slice(1);
      if (id && !ids.has(id)) errors.push(`${relative(DIST, file)}: ancla rota "${url}"`);
      continue;
    }

    if (!url.startsWith(BASE)) {
      errors.push(
        `${relative(DIST, file)}: "${url}" no usa la base ${BASE} (en GitHub Pages daría 404)`,
      );
      continue;
    }

    const target = join(DIST, url.slice(BASE.length).split(/[?#]/)[0]);
    const exists =
      existsSync(target) && (statSync(target).isFile() || existsSync(join(target, 'index.html')));
    if (!exists) errors.push(`${relative(DIST, file)}: enlace roto "${url}"`);
  }
}

if (errors.length) fail(`Enlaces con problemas:\n  ${errors.join('\n  ')}`);
console.log('✓ Build completo y sin enlaces internos rotos');
