// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Desplegado en GitHub Pages: https://pakitoh0.github.io/Portweb/
export default defineConfig({
  site: 'https://pakitoh0.github.io',
  base: '/Portweb/',
  vite: { plugins: [tailwindcss()] },
});
