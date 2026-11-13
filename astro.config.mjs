// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Desplegado en GitHub Pages: https://pakitoh0.github.io/Portweb/
export default defineConfig({
  site: 'https://pakitoh0.github.io',
  base: '/Portweb/',
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-US' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
