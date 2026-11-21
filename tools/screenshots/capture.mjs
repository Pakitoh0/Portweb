// Captura de una web publicada para la página de un proyecto (JPG, dentro del presupuesto de peso).
// Uso: CHROME_PATH=/usr/bin/chromium node tools/screenshots/capture.mjs <url> <salida.jpg> [espera_ms] [texto_a_pulsar]
// texto_a_pulsar: botón que cierra un diálogo de bienvenida antes de capturar (p. ej. "Empezar")
import { chromium } from '@playwright/test';

const [url, out, wait = '8000', click] = process.argv.slice(2);
if (!url || !out) {
  console.error('uso: capture.mjs <url> <salida.jpg> [espera_ms]');
  process.exit(1);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  // WebGL por software: los mapas 3D necesitan GPU y en headless no la hay
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, locale: 'es-ES' });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
  if (click) await page.getByRole('button', { name: click }).click();
  await page.waitForTimeout(Number(wait)); // margen para teselas y animaciones
  await page.screenshot({ path: out, type: 'jpeg', quality: 65 });
  console.log(`✓ ${out}`);
} finally {
  await browser.close();
}
