// Tests end-to-end de la web: navegación, terminal, temas, idiomas, 404, CSP y móvil
import { test, expect, type Page } from '@playwright/test';

/** Recoge errores de consola y violaciones de CSP durante el test. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}

async function openTerminal(page: Page) {
  await page.locator('button[data-open-terminal]').first().click();
  await expect(page.locator('#terminal')).toBeVisible();
}

async function run(page: Page, cmd: string) {
  await page.locator('#term-in').fill(cmd);
  await page.locator('#term-in').press('Enter');
}

test.describe('portada', () => {
  test('carga sin errores de consola ni de CSP', async ({ page }) => {
    const errors = trackErrors(page);
    await page.goto('./');
    await expect(page).toHaveTitle(/Francisco/);
    await expect(page.locator('h1')).toHaveText('Francisco');
    await expect(page.locator('meta[http-equiv="content-security-policy"]')).toHaveCount(1);
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });

  test('no hay scroll horizontal', async ({ page }) => {
    await page.goto('./');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });

  test('cada sección existe y el enlace de LinkedIn es el real', async ({ page }) => {
    await page.goto('./');
    for (const id of ['inicio', 'sobre-mi', 'proyectos', 'herramientas', 'contacto']) {
      await expect(page.locator(`section#${id}`)).toHaveCount(1);
    }
    await expect(
      page.locator('#contacto a[href*="linkedin.com/in/francisco-barbero"]'),
    ).toHaveCount(1);
    await expect(page.locator('#contacto a[href^="mailto:"]')).toHaveCount(0);
  });

  test('el workspace activo sigue a la sección, también la última', async ({ page, isMobile }) => {
    test.skip(isMobile, 'en móvil la barra solo muestra números');
    await page.goto('./');
    await expect(page.locator('.ws[aria-current]')).toHaveAttribute('data-ws', 'inicio');
    await page.locator('.ws[data-ws="contacto"]').click();
    await expect(page.locator('.ws[aria-current]')).toHaveAttribute('data-ws', 'contacto');
  });
});

test.describe('terminal', () => {
  test('se abre con Ctrl+K y ejecuta comandos', async ({ page }) => {
    await page.goto('./');
    await page.keyboard.press('Control+k');
    await expect(page.locator('#terminal')).toBeVisible();
    await expect(page.locator('#term-in')).toBeFocused();
    await run(page, 'help');
    await expect(page.locator('#term-out')).toContainText('muestra esta ayuda');
    await run(page, 'ls');
    await expect(page.locator('#term-out')).toContainText('omatab/');
    await run(page, 'comando-inventado');
    await expect(page.locator('#term-out')).toContainText('comando no encontrado');
  });

  test('lo que se escribe nunca se interpreta como HTML', async ({ page }) => {
    await page.goto('./');
    await openTerminal(page);
    await run(page, '<img src=x onerror=alert(1)>');
    await expect(page.locator('#term-out img')).toHaveCount(0);
    await expect(page.locator('#term-out')).toContainText('<img');
  });

  test('open lleva a la página del proyecto', async ({ page }) => {
    await page.goto('./');
    await openTerminal(page);
    await run(page, 'open omatab');
    await expect(page).toHaveURL(/\/proyectos\/omatab\/$/);
    await expect(page.locator('h1')).toHaveText('omatab');
  });
});

test.describe('temas e idiomas', () => {
  test('el tema elegido en la terminal se recuerda al recargar', async ({ page }) => {
    await page.goto('./');
    await openTerminal(page);
    await run(page, 'theme gruvbox');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'gruvbox');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'gruvbox');
  });

  test('el modo sigue al sistema y se puede fijar', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('./');
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'light');

    await openTerminal(page);
    await run(page, 'mode dark');
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'dark');
  });

  test('cada tema cambia los colores en claro y en oscuro', async ({ page }) => {
    await page.goto('./');
    const seen = new Set<string>();
    for (const theme of [
      'catppuccin',
      'tokyo-night',
      'gruvbox',
      'kanagawa',
      'everforest',
      'nord',
    ]) {
      for (const mode of ['light', 'dark']) {
        await page.evaluate(
          ([t, m]) => {
            document.documentElement.dataset.theme = t;
            document.documentElement.dataset.mode = m;
          },
          [theme, mode],
        );
        seen.add(await page.evaluate(() => getComputedStyle(document.body).backgroundColor));
      }
    }
    expect(seen.size).toBe(12); // 6 temas × 2 modos, todos distintos
  });

  test('los selectores de la barra cambian tema y modo', async ({ page, isMobile }) => {
    test.skip(isMobile, 'en móvil los selectores se ocultan; se usa la terminal');
    await page.goto('./');
    await page.locator('#theme-select').selectOption('kanagawa');
    await page.locator('#mode-select').selectOption('light');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'kanagawa');
    await expect(page.locator('html')).toHaveAttribute('data-mode', 'light');
  });

  test('el selector de idioma lleva a la versión en inglés', async ({ page }) => {
    await page.goto('./');
    await page.locator('a[hreflang="en"]').first().click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveCount(1);
  });
});

test.describe('proyectos', () => {
  for (const slug of ['omatab', 'portafolio', 'segundo-cerebro']) {
    test(`existe la página de ${slug} en ES y EN`, async ({ page }) => {
      for (const path of [`proyectos/${slug}/`, `en/projects/${slug}/`]) {
        const res = await page.goto(path);
        expect(res?.status()).toBe(200);
        await expect(page.locator('h1')).toHaveText(slug);
      }
    });
  }
});

test.describe('404', () => {
  test('una ruta inexistente muestra la 404 propia con la ruta pedida', async ({ page }) => {
    const res = await page.goto('no/existe');
    expect(res?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('404');
    await expect(page.locator('#missing-path')).toHaveText('/no/existe');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
  });
});
