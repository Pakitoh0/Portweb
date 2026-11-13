# Portweb

[![Deploy](https://github.com/Pakitoh0/Portweb/actions/workflows/deploy.yml/badge.svg)](https://github.com/Pakitoh0/Portweb/actions/workflows/deploy.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/Pakitoh0/Portweb/badge)](https://scorecard.dev/viewer/?uri=github.com/Pakitoh0/Portweb)

Mi portafolio personal, con estética de terminal y escritorio tiling (Hyprland/Omarchy): cada sección es una "ventana" y la barra superior imita una waybar con workspaces.

🌐 **En vivo:** https://pakitoh0.github.io/Portweb/

## Stack

| Capa               | Tecnología                                                                      |
| ------------------ | ------------------------------------------------------------------------------- |
| Framework          | [Astro](https://astro.build) 7 (sitio estático, sin JS de framework en cliente) |
| Estilos            | [Tailwind CSS](https://tailwindcss.com) 4 vía `@tailwindcss/vite`               |
| Lenguaje           | TypeScript                                                                      |
| Tipografía         | JetBrains Mono                                                                  |
| Paleta             | Oscura, inspirada en Catppuccin Mocha                                           |
| Gestor de paquetes | pnpm                                                                            |
| Despliegue         | GitHub Pages con GitHub Actions                                                 |

## Secciones

| Workspace | Sección      | Comando                             |
| --------- | ------------ | ----------------------------------- |
| 1         | Inicio       | `whoami`, `fetch` y estado actual   |
| 2         | Sobre mí     | `cat sobre-mi.md`                   |
| 3         | Proyectos    | `ls ~/proyectos` (uni y desarrollo) |
| 4         | Herramientas | `fastfetch`                         |
| 5         | Contacto     | `./contactar.sh`                    |

## Funciones

- **Terminal interactiva** (`>_` en la barra, `Ctrl+K` o la tecla `` ` ``): `help`, `whoami`, `ls`, `open <proyecto>`, `cd <sección>`, `theme`, `lang`, `contact`… con autocompletado (Tab) e historial (↑↓).
- **Página por proyecto** con problema, solución, stack y qué aprendí (`/proyectos/<slug>/`).
- **Español e inglés** (`/` y `/en/`), con `hreflang` y selector de idioma en la barra.
- **6 temas × 3 modos**: Catppuccin, Tokyo Night, Gruvbox, Kanagawa, Everforest y Nord, cada uno en claro y oscuro, más el modo sistema (sigue al SO en vivo). Se eligen en la barra o con `theme`/`mode` en la terminal, y se recuerdan.
- **Estado en vivo**: la ventana de estado muestra la actividad pública reciente en GitHub (se refresca a diario).
- **SEO**: sitemap, imagen Open Graph, datos estructurados `Person` y URL canónicas.
- **Sin terceros**: la tipografía JetBrains Mono se sirve desde el propio sitio.

## Detalles de diseño

- **Barra tipo waybar:** el workspace activo se marca según la sección visible y hay un reloj en vivo.
- **Ventanas tiling:** la portada reparte las ventanas como un escritorio Hyprland, y al pasar el ratón el borde se vuelve un degradado, igual que una ventana activa.
- **Accesible:** respeta `prefers-reduced-motion`, enlace para saltar al contenido y 100 en accesibilidad de Lighthouse.

## Estructura

```
.github/      workflows (deploy, release, scorecard), Dependabot y política de seguridad
config/       configuración de herramientas (html-validate, Lighthouse, Playwright, release-please)
ops/          página de mantenimiento
public/       recursos estáticos (favicon, imagen Open Graph, capturas)
src/          código de la web (componentes, datos, i18n, layouts, páginas, estilos)
tests/        tests end-to-end (Playwright)
tools/        scripts del CI (guardián, commits, enlaces, servidor estático) y plantilla OG
```

## Despliegue

Pipeline de GitHub Actions ([`deploy.yml`](.github/workflows/deploy.yml)) con nueve módulos de revisión en paralelo. Solo se publica si pasan **todos**:

| Módulo       | Qué revisa                                                                                                  |
| ------------ | ----------------------------------------------------------------------------------------------------------- |
| Guardián     | Ficheros prohibidos (secretos, claves, volcados, builds), estructura del repo y endurecimiento de workflows |
| Calidad      | Formato (Prettier), tipos (`astro check`) y contraste WCAG AA de los 12 temas                               |
| Workflows    | Errores en los workflows (actionlint) y su seguridad (zizmor)                                               |
| Secretos     | Credenciales filtradas en todo el historial de git (gitleaks)                                               |
| Dependencias | Vulnerabilidades (`pnpm audit`) y dependencias nuevas en PRs                                                |
| CodeQL       | Análisis estático de seguridad del código                                                                   |
| Build        | Build, enlaces internos rotos y HTML válido (html-validate)                                                 |
| Lighthouse   | Rendimiento ≥ 90, accesibilidad ≥ 95, buenas prácticas ≥ 90 y SEO ≥ 90                                      |
| E2E          | 25 tests de Playwright sobre el build real: terminal, temas, idiomas, 404, CSP y móvil                      |

Lo publicado lleva una **atestación de procedencia firmada** (SLSA, `gh attestation verify`) y, tras desplegar, una **prueba de humo** comprueba que la web y la 404 responden. Solo se despliega desde `main`, protegida: todo entra por PR con los nueve módulos como checks obligatorios. Los PR pasan los mismos módulos, pero no despliegan.

Si algo falla, no se despliega y sigue en línea la última versión buena. Para hotfixes hay un **modo mantenimiento** (manual o con la variable `MAINTENANCE_MODE`) que publica una página de mantenimiento con la misma estética. Las actions están fijadas por SHA y cada job tiene los permisos mínimos.

## Seguridad

- **Content Security Policy** generada por Astro con hashes de cada script y estilo; sin servicios de terceros.
- **Guardián** ([`tools/guard.mjs`](tools/guard.mjs)): el CI falla si se versiona un secreto, una clave, un volcado, un artefacto de build o configuración local, o si se debilitan los workflows. En local: `pnpm check:guard`.
- **`.gitignore`** por categorías, con secretos, claves y keystores excluidos siempre.
- **Dependabot** semanal con una espera de 7 días antes de proponer versiones nuevas.
- Política y forma de reportar vulnerabilidades en [`SECURITY.md`](.github/SECURITY.md).
- **OpenSSF Scorecard** semanal, con resultados en Security → Code scanning.

## Flujo de trabajo

- **Commits** en formato [Conventional Commits](https://www.conventionalcommits.org/es/) (`feat:`, `fix:`, `ci:`…), validados en local y en cada PR.
- **Hooks locales** con lefthook (se instalan con `pnpm install`): guardián, formato y gitleaks antes de cada commit.
- **Releases** con release-please: mantiene un PR con la próxima versión y el `CHANGELOG.md`; al fusionarlo publica la release.
- **Temas accesibles**: las paletas oficiales viven en [`tools/themes/palettes.mjs`](tools/themes/palettes.mjs); `pnpm themes` genera el CSS ajustando solo los colores que no llegan a WCAG AA, y el CI falla si alguno baja del mínimo.
