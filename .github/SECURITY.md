# Política de seguridad

## Versiones soportadas

Solo se mantiene la versión publicada en https://pakitoh0.github.io/Portweb/ (rama `main`).

## Cómo reportar una vulnerabilidad

No abras un issue público. Usa el reporte privado de GitHub:
**Security → Report a vulnerability** en este repositorio.

Incluye qué has encontrado, cómo reproducirlo y su posible impacto. Intentaré responder en un plazo de 7 días.

## Medidas aplicadas

- **Pipeline de despliegue** ([`deploy.yml`](workflows/deploy.yml)): no se publica nada si falla cualquier módulo de revisión (guardián de ficheros, secretos con gitleaks, CodeQL, auditoría de dependencias, seguridad de workflows con zizmor y actionlint, entre otros).
- **Guardián de ficheros** ([`tools/guard.mjs`](../tools/guard.mjs)): impide versionar secretos, claves, volcados, artefactos de build o configuración local, y que se debiliten las protecciones del workflow.
- **Workflows endurecidos**: permisos mínimos por job, actions fijadas por SHA y `persist-credentials: false`.
- **Dependencias**: lockfile congelado, `pnpm audit` y actualizaciones automáticas con Dependabot.
- **Web**: sitio estático, sin servicios de terceros, con Content Security Policy.
