# Portweb

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
- **Temas**: Catppuccin Mocha, Tokyo Night y Gruvbox; se recuerda la elección.
- **Estado en vivo**: la ventana de estado muestra la actividad pública reciente en GitHub (se refresca a diario).
- **SEO**: sitemap, imagen Open Graph, datos estructurados `Person` y URL canónicas.
- **Sin terceros**: la tipografía JetBrains Mono se sirve desde el propio sitio.

## Detalles de diseño

- **Barra tipo waybar:** el workspace activo se marca según la sección visible y hay un reloj en vivo.
- **Ventanas tiling:** la portada reparte las ventanas como un escritorio Hyprland, y al pasar el ratón el borde se vuelve un degradado, igual que una ventana activa.
- **Accesible:** respeta `prefers-reduced-motion`, enlace para saltar al contenido y 100 en accesibilidad de Lighthouse.

## Despliegue

Pipeline de GitHub Actions ([`deploy.yml`](.github/workflows/deploy.yml)) con siete módulos de revisión en paralelo. Solo se publica si pasan **todos**:

| Módulo       | Qué revisa                                                             |
| ------------ | ---------------------------------------------------------------------- |
| Calidad      | Formato (Prettier) y tipos (`astro check`)                             |
| Workflows    | Errores en los workflows (actionlint) y su seguridad (zizmor)          |
| Secretos     | Credenciales filtradas en todo el historial de git (gitleaks)          |
| Dependencias | Vulnerabilidades (`pnpm audit`) y dependencias nuevas en PRs           |
| CodeQL       | Análisis estático de seguridad del código                              |
| Build        | Build, enlaces internos rotos y HTML válido (html-validate)            |
| Lighthouse   | Rendimiento ≥ 90, accesibilidad ≥ 95, buenas prácticas ≥ 90 y SEO ≥ 90 |

Tras desplegar, una **prueba de humo** comprueba que la web en producción responde con el contenido esperado. Los PR pasan los mismos módulos, pero no despliegan.

Si algo falla, no se despliega y sigue en línea la última versión buena. Para hotfixes hay un **modo mantenimiento** (manual o con la variable `MAINTENANCE_MODE`) que publica una página de mantenimiento con la misma estética. Las actions están fijadas por SHA y cada job tiene los permisos mínimos.
