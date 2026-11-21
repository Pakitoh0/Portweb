---
title: El pipeline de 9 módulos de esta web
date: 2026-11-21
summary: Cómo despliego este portafolio sin miedo a romperlo. Nueve revisiones en paralelo, una red de seguridad en local y un despliegue que nunca deja la web caída.
tags: [GitHub Actions, CI/CD, Playwright, Seguridad]
draft: true
---

Esta web es estática y pequeña, pero la uso para practicar cómo me gustaría que se desplegara cualquier proyecto. La regla es una: **si algo falla, no se publica nada y sigue en línea la última versión buena**.

## Los nueve módulos

Cada push a `main` lanza nueve trabajos en paralelo en GitHub Actions:

| Módulo       | Qué revisa                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| Guardián     | Ficheros que nunca deben versionarse (claves, `.env`, volcados, builds) y que nadie debilite las protecciones |
| Calidad      | Formato con Prettier, tipos con `astro check` y contraste WCAG AA de los 12 temas                             |
| Workflows    | Errores en los workflows (actionlint) y su seguridad (zizmor)                                                 |
| Secretos     | Credenciales filtradas en todo el historial de git (gitleaks)                                                 |
| Dependencias | Vulnerabilidades conocidas con `pnpm audit`                                                                   |
| CodeQL       | Análisis estático de seguridad del código                                                                     |
| Build        | Build, enlaces internos rotos, HTML válido y presupuesto de peso                                              |
| Lighthouse   | Rendimiento ≥ 90, accesibilidad ≥ 95, buenas prácticas ≥ 90 y SEO ≥ 90                                        |
| E2E          | Tests de Playwright sobre el build real, en escritorio y móvil, y regresión visual                            |

Solo cuando pasan **los nueve**, un último trabajo empaqueta la web y la despliega en GitHub Pages.

## Después de desplegar

- **Atestación de procedencia firmada** (SLSA): cualquiera puede comprobar con `gh attestation verify` que un fichero publicado salió de este repo y de este workflow.
- **Prueba de humo**: unos segundos después, se comprueba que la web y la 404 responden con el contenido esperado.
- **Monitor** cada 6 horas: si la web publicada falla, abre un issue y lo cierra solo cuando se recupera.

## Endurecer los propios workflows

Un pipeline también es código que puede atacarse:

- **Permisos mínimos**: el workflow empieza con `permissions: {}` y cada trabajo pide solo lo que necesita.
- **Actions fijadas por SHA**, no por etiqueta: una etiqueta puede moverse y un SHA no.
- **zizmor** revisa los workflows en busca de inyecciones y malas prácticas.

## Modo mantenimiento

Si algo va mal en producción y necesito tiempo para arreglarlo, hay un botón: _Run workflow → maintenance_. Publica una página autónoma sin pasar por el build, para aplicar el arreglo con calma.

## La red de seguridad en local

Esperar al CI para descubrir un error de formato es perder el tiempo. Con lefthook:

- **Antes de cada commit**: guardián, formato de los ficheros cambiados y gitleaks.
- **Antes de cada push**: formato, tipos, temas, guardián, build, enlaces, HTML y peso, en serie. Si algo falla, el push se cancela.

Los e2e y Lighthouse se quedan en el CI, porque las capturas y las medidas solo son fiables en el mismo entorno siempre.

## `main` protegida, pero ágil

`main` exige los nueve checks y un PR a cualquiera que no sea yo. Como administrador, puedo hacer push directo; GitHub lo deja registrado y el pipeline revisa igual cada cambio antes de publicarlo. El force push y el borrado de la rama están prohibidos.

## Qué me llevo

- **Un fallo nunca debe tumbar producción**: separar «revisar» de «publicar».
- **Lo que no se comprueba automáticamente acaba rompiéndose**: enlaces, peso, contraste, la lista de proyectos en los tests…
- **Mover las comprobaciones lo más cerca posible de quien escribe el código** ahorra ciclos de CI.

El workflow completo está en [github.com/Pakitoh0/Portweb](https://github.com/Pakitoh0/Portweb).
