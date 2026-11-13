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
  // Content Security Policy: Astro añade un <meta> con los hashes de cada script y estilo
  security: { csp: true },
  // Sin bloques de código: se desactiva Shiki (usa estilos inline incompatibles con la CSP)
  markdown: { syntaxHighlight: false },
  vite: { plugins: [tailwindcss()] },
});
