// Notas técnicas publicadas en un idioma, de la más reciente a la más antigua.
// Los borradores (draft: true) solo aparecen en desarrollo (`pnpm dev`).
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type Note = CollectionEntry<'notas'> & { slug: string };

export async function getNotes(lang: Lang): Promise<Note[]> {
  const entries = await getCollection(
    'notas',
    (e) => e.id.startsWith(`${lang}/`) && (import.meta.env.DEV || !e.data.draft),
  );
  return entries
    .map((e) => ({ ...e, slug: e.id.slice(lang.length + 1) }))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Fecha corta de una nota (p. ej. «21 nov 2026» / «Nov 21, 2026»). */
export function noteDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
