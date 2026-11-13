// Regresión visual: la portada en los 6 temas × 2 modos, comparada con una captura de referencia.
// Solo en el CI: las referencias se generan en el mismo entorno (Ubuntu + Chromium de Playwright),
// porque el renderizado de fuentes cambia entre sistemas.
// Actualizar referencias: ver tests/visual/README.md
import { test, expect } from '@playwright/test';

const families = ['catppuccin', 'tokyo-night', 'gruvbox', 'kanagawa', 'everforest', 'nord'];
const modes = ['dark', 'light'];

test.describe('regresión visual de temas', () => {
  test.skip(!process.env.CI && !process.env.VISUAL, 'solo en el CI (o con VISUAL=1)');
  test.skip(({ isMobile }) => isMobile, 'una sola resolución de referencia');

  for (const family of families) {
    for (const mode of modes) {
      test(`${family} · ${mode}`, async ({ page }) => {
        await page.addInitScript(
          ([f, m]) => {
            localStorage.setItem('portweb-theme', f);
            localStorage.setItem('portweb-mode', m);
          },
          [family, mode],
        );
        await page.goto('./');
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator('html')).toHaveAttribute('data-theme', family);
        await expect(page).toHaveScreenshot(`${family}-${mode}.png`, {
          animations: 'disabled',
          caret: 'hide',
          // Lo que cambia solo: el reloj y la actividad reciente de GitHub
          mask: [page.locator('#clock'), page.locator('#inicio ul')],
          maxDiffPixelRatio: 0.01,
        });
      });
    }
  }
});
