// Actividad pública reciente en GitHub, leída en el build.
// Si la API falla o tarda, devuelve una lista vacía: el build nunca se rompe por esto.
import type { Lang } from '../i18n';

export interface Activity {
  text: string;
  date: string; // fecha corta ya formateada
}

interface GhEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload: { ref_type?: string; release?: { tag_name?: string }; action?: string };
}

const labels = {
  es: {
    PushEvent: (r: string) => `push a ${r}`,
    ReleaseEvent: (r: string, tag?: string) => `release ${tag ?? ''} de ${r}`.replace('  ', ' '),
    newRepo: (r: string) => `nuevo repo ${r}`,
    CreateEvent: (r: string) => `nueva rama en ${r}`,
    PublicEvent: (r: string) => `publicado ${r}`,
    ForkEvent: (r: string) => `fork de ${r}`,
    WatchEvent: (r: string) => `★ a ${r}`,
    PullRequestEvent: (r: string) => `pull request en ${r}`,
    IssuesEvent: (r: string) => `issue en ${r}`,
    DiscussionEvent: (r: string) => `discusión en ${r}`,
  },
  en: {
    PushEvent: (r: string) => `pushed to ${r}`,
    ReleaseEvent: (r: string, tag?: string) => `released ${tag ?? ''} of ${r}`.replace('  ', ' '),
    newRepo: (r: string) => `new repo ${r}`,
    CreateEvent: (r: string) => `new branch in ${r}`,
    PublicEvent: (r: string) => `made ${r} public`,
    ForkEvent: (r: string) => `forked ${r}`,
    WatchEvent: (r: string) => `starred ${r}`,
    PullRequestEvent: (r: string) => `pull request in ${r}`,
    IssuesEvent: (r: string) => `issue in ${r}`,
    DiscussionEvent: (r: string) => `discussion in ${r}`,
  },
};

let cache: GhEvent[] | null = null;

async function loadEvents(user: string): Promise<GhEvent[]> {
  if (cache) return cache;
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    // En CI se usa el token del workflow (solo lectura) para evitar el límite anónimo
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=30`, {
      headers,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    cache = (await res.json()) as GhEvent[];
  } catch (error) {
    console.warn(`[github] sin actividad reciente (${String(error)}); se usa solo el estado fijo`);
    cache = [];
  }
  return cache;
}

export async function getActivity(user: string, lang: Lang, max = 3): Promise<Activity[]> {
  const events = await loadEvents(user);
  const l = labels[lang];
  const fmt = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'short',
  });
  const seen = new Set<string>();

  return [...events]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .flatMap((e) => {
      const repo = e.repo.name.replace(`${user}/`, '');
      let text: string | undefined;
      if (e.type === 'CreateEvent') {
        text = e.payload.ref_type === 'repository' ? l.newRepo(repo) : l.CreateEvent(repo);
      } else if (e.type === 'ReleaseEvent') {
        text = l.ReleaseEvent(repo, e.payload.release?.tag_name);
      } else if (e.type in l) {
        text = (l[e.type as keyof typeof l] as (r: string) => string)(repo);
      }
      // Sin tipos desconocidos ni líneas repetidas (p. ej. varios push seguidos)
      if (!text || seen.has(text)) return [];
      seen.add(text);
      return [{ text, date: fmt.format(new Date(e.created_at)) }];
    })
    .slice(0, max);
}

// ── Datos de repositorios (proyectos) ────────────────────────────────────────

export interface RepoStats {
  stars: number;
  license?: string;
  updated: string; // fecha corta ya formateada
  languages: { name: string; pct: number; filled: string; empty: string }[];
}

/** GET a la API de GitHub; devuelve null si falla (el build nunca se rompe por esto). */
async function ghGet<T>(path: string): Promise<T | null> {
  try {
    const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com${path}`, {
      headers,
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[github] ${path}: ${String(error)}`);
    return null;
  }
}

const repoCache = new Map<string, Promise<RepoStats | null>>();

/** Estrellas, licencia, última actualización y lenguajes de un repo a partir de su URL. */
export function getRepoStats(repoUrl: string, lang: Lang): Promise<RepoStats | null> {
  const key = `${repoUrl}|${lang}`;
  if (!repoCache.has(key)) repoCache.set(key, loadRepoStats(repoUrl, lang));
  return repoCache.get(key)!;
}

async function loadRepoStats(repoUrl: string, lang: Lang): Promise<RepoStats | null> {
  const fullName = new URL(repoUrl).pathname.replace(/^\/|\/$/g, '');
  const [repo, langs] = await Promise.all([
    ghGet<{ stargazers_count: number; pushed_at: string; license?: { spdx_id?: string } }>(
      `/repos/${fullName}`,
    ),
    ghGet<Record<string, number>>(`/repos/${fullName}/languages`),
  ]);
  if (!repo) return null;

  const total = Object.values(langs ?? {}).reduce((a, b) => a + b, 0);
  const languages = Object.entries(langs ?? {})
    .map(([name, bytes]) => ({ name, pct: total ? Math.round((bytes / total) * 100) : 0 }))
    .filter((l) => l.pct > 0)
    .slice(0, 5)
    .map((l) => {
      const filled = Math.round(l.pct / 5); // barra de 20 caracteres
      return { ...l, filled: '█'.repeat(filled), empty: '█'.repeat(20 - filled) };
    });

  const fmt = new Intl.DateTimeFormat(lang === 'es' ? 'es-ES' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const license = repo.license?.spdx_id;
  return {
    stars: repo.stargazers_count,
    license: license && license !== 'NOASSERTION' ? license : undefined,
    updated: fmt.format(new Date(repo.pushed_at)),
    languages,
  };
}
