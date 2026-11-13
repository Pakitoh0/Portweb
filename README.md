# Portweb

Portafolio personal con estética de terminal y escritorio tiling (Hyprland/Omarchy): cada sección es una "ventana" y la barra superior imita una waybar con workspaces.

## Stack

- [Astro](https://astro.build) 7 — sitio estático
- [Tailwind CSS](https://tailwindcss.com) 4 — vía `@tailwindcss/vite`
- TypeScript
- **pnpm** como gestor de paquetes (no uses npm ni yarn)

## Secciones

| Workspace | Sección     | Contenido                                          |
|-----------|-------------|----------------------------------------------------|
| 1         | `inicio`    | Presentación (`whoami`), `fetch` y estado actual    |
| 2         | `sobre-mí`  | `cat sobre-mi.md`                                   |
| 3         | `proyectos` | `ls ~/proyectos`: tarjetas de proyectos uni / dev   |
| 4         | `skills`    | `tree ~/skills`: tecnologías por categoría          |
| 5         | `contacto`  | `./contactar.sh`: GitHub, LinkedIn y email          |

## Puesta en marcha

Requisitos: Node 26 y pnpm.

```bash
pnpm install
pnpm dev        # servidor de desarrollo en http://localhost:4321
pnpm build      # genera el sitio estático en dist/
pnpm preview    # sirve el build localmente
```

## Personalizar

Todos los datos están en [`src/data/profile.ts`](src/data/profile.ts):

- `profile`: nombre, rol, universidad, bio y enlaces de contacto.
- `projects`: lista de proyectos (`kind: 'uni' | 'dev'`, etiquetas y enlace).
- `skills`: tecnologías agrupadas por categoría.

Los colores (paleta oscura tipo Catppuccin Mocha) se definen en el bloque `@theme` de [`src/styles/global.css`](src/styles/global.css).

## Estructura

```
src/
├── components/
│   ├── Bar.astro       # barra superior estilo waybar (workspaces + reloj)
│   ├── Prompt.astro    # línea de comando "❯ cmd"
│   └── Window.astro    # ventana con borde degradado al pasar el ratón
├── data/profile.ts     # datos del portafolio
├── layouts/Layout.astro
├── pages/index.astro
└── styles/global.css
```

## Pendiente

- [ ] Sustituir los marcadores (`TU NOMBRE`, `TU UNIVERSIDAD`, enlaces) por datos reales.
- [ ] Enlazar cada proyecto a su repositorio o demo.
- [ ] Desplegar (Vercel, Netlify o GitHub Pages).
