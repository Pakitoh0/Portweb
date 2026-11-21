// Colecciones de contenido: notas técnicas en Markdown, una carpeta por idioma (es/ y en/)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const notas = defineCollection({
  loader: glob({ pattern: '{es,en}/*.md', base: './src/content/notas' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    // Borrador: se ve con `pnpm dev`, pero no se publica
    draft: z.boolean().default(false),
  }),
});

export const collections = { notas };
