// Genera la imagen Open Graph de cada proyecto en public/og/<slug>-<lang>.png (1200x630)
// a partir de tools/og/project.html y los datos de src/data/profile.ts.
// Uso: CHROME_PATH=/usr/bin/chromium pnpm og   (las imágenes se suben al repo, como og.png)
import { createServer } from 'node:http';
import { mkdir, readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { chromium } from '@playwright/test';
import { projects } from '../../src/data/profile.ts';

const ROOT = resolve('.');
const OUT = resolve('public/og');
const TYPES = { '.html': 'text/html; charset=utf-8', '.woff2': 'font/woff2' };

// Servidor estático mínimo de la raíz del repo (la plantilla carga las fuentes de node_modules)
const server = createServer(async (req, res) => {
  const path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
  if (!path.startsWith(ROOT) || !TYPES[extname(path)]) return res.writeHead(404).end();
  try {
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] }).end(await readFile(path));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
const { port } = server.address();

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

try {
  for (const p of projects) {
    for (const lang of ['es', 'en']) {
      const params = new URLSearchParams({
        name: p.name,
        summary: p.summary[lang],
        kind: p.kind,
        tags: p.tags.join(','),
        dir: lang === 'es' ? 'proyectos' : 'projects',
        lang,
      });
      await page.goto(`http://127.0.0.1:${port}/tools/og/project.html?${params}`);
      await page.evaluate(() => document.fonts.ready);
      const file = join(OUT, `${p.slug}-${lang}.png`);
      await page.screenshot({ path: file });
      console.log(`✓ ${file.replace(ROOT + '/', '')}`);
    }
  }
} finally {
  await browser.close();
  server.close();
}
