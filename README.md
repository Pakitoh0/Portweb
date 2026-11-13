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
| 4         | Skills      | `tree ~/skills`                            |
| 5         | Contacto    | `./contactar.sh`                           |

## Detalles de diseño

- **Barra tipo waybar:** el workspace activo se marca según la sección visible y hay un reloj en vivo.
- **Ventanas tiling:** la portada reparte las ventanas como un escritorio Hyprland, y al pasar el ratón el borde se vuelve un degradado, igual que una ventana activa.
- **Accesible:** respeta `prefers-reduced-motion`.
