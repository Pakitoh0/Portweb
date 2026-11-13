# Portweb

Mi portafolio personal, con estética de terminal y escritorio tiling (Hyprland/Omarchy): cada sección es una "ventana" y la barra superior imita una waybar con workspaces.

🌐 **En vivo:** https://pakitoh0.github.io/Portweb/

## Stack

| Capa            | Tecnología                                                        |
|-----------------|-------------------------------------------------------------------|
| Framework       | [Astro](https://astro.build) 7 (sitio estático, sin JS de framework en cliente) |
| Estilos         | [Tailwind CSS](https://tailwindcss.com) 4 vía `@tailwindcss/vite` |
| Lenguaje        | TypeScript                                                        |
| Tipografía      | JetBrains Mono                                                    |
| Paleta          | Oscura, inspirada en Catppuccin Mocha                             |
| Gestor de paquetes | pnpm                                                           |
| Despliegue      | GitHub Pages con GitHub Actions                                   |

## Secciones

| Workspace | Sección     | Comando                                    |
|-----------|-------------|--------------------------------------------|
| 1         | Inicio      | `whoami`, `fetch` y estado actual          |
| 2         | Sobre mí    | `cat sobre-mi.md`                          |
| 3         | Proyectos   | `ls ~/proyectos` (uni y desarrollo)        |
| 4         | Herramientas | `fastfetch`                               |
| 5         | Contacto    | `./contactar.sh`                           |

## Detalles de diseño

- **Barra tipo waybar:** el workspace activo se marca según la sección visible y hay un reloj en vivo.
- **Ventanas tiling:** la portada reparte las ventanas como un escritorio Hyprland, y al pasar el ratón el borde se vuelve un degradado, igual que una ventana activa.
- **Accesible:** respeta `prefers-reduced-motion`.

## Despliegue

Pipeline de GitHub Actions ([`deploy.yml`](.github/workflows/deploy.yml)) que solo publica si pasan todos los controles:

1. Instalación con lockfile congelado
2. Auditoría de dependencias (`pnpm audit`)
3. Comprobación de tipos (`astro check`)
4. Build
5. Detección de enlaces internos rotos

Si algo falla, no se despliega y sigue en línea la última versión buena. Para hotfixes hay un **modo mantenimiento** (manual o con la variable `MAINTENANCE_MODE`) que publica una página de mantenimiento con la misma estética. Las actions están fijadas por SHA y cada job tiene los permisos mínimos.
