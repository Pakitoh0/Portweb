# Regresión visual

`temas.spec.ts` captura la portada en los 6 temas × 2 modos y la compara con las referencias de
`__screenshots__/`. Solo se ejecuta en el CI, porque las fuentes se renderizan distinto en cada
sistema y las referencias se generan en el mismo entorno (Ubuntu + Chromium de Playwright).

## Cuándo falla

Si un cambio altera el aspecto de algún tema, el job **E2E: Playwright** falla y sube el
artefacto `playwright-trazas` con la captura esperada, la real y la diferencia.

## Actualizar las referencias (cambio visual intencionado)

1. Descarga el artefacto `playwright-trazas` del run que falló.
2. Copia cada `*-actual.png` a `tests/visual/__screenshots__/` quitando el sufijo `-actual`.
3. Revisa las imágenes y haz commit (`test(visual): actualizar referencias`).
