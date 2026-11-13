// Servidor estático mínimo para tests y Lighthouse: sirve dist/ bajo /Portweb/ como GitHub Pages,
// incluida la 404 propia. Uso: node tools/serve.mjs [puerto]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const PORT = Number(process.argv[2] ?? 4321);
const BASE = '/Portweb/';
const ROOT = resolve('dist');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  // Evita salir de dist/ con rutas tipo /Portweb/../../etc/passwd
  const file = normalize(join(ROOT, decodeURIComponent(urlPath)));
  if (!file.startsWith(ROOT)) return null;
  try {
    const info = await stat(file);
    if (info.isFile()) return file;
    if (info.isDirectory()) {
      const index = join(file, 'index.html');
      if ((await stat(index)).isFile()) return index;
    }
  } catch {
    // no existe
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  if (pathname === '/Portweb') {
    res.writeHead(301, { Location: BASE }).end();
    return;
  }
  const file = pathname.startsWith(BASE) ? await resolveFile(pathname.slice(BASE.length)) : null;
  if (file) {
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
    return;
  }
  res.writeHead(404, { 'Content-Type': TYPES['.html'] });
  res.end(await readFile(join(ROOT, '404.html')));
}).listen(PORT, '127.0.0.1', () => {
  console.log(`Sirviendo dist/ en http://127.0.0.1:${PORT}${BASE}`);
});
