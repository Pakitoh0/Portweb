# Regresión visual

`temas.spec.ts` captura la portada en los 6 temas × 2 modos y la compara con las referencias de
`__screenshots__/`. Solo se ejecuta en el CI, porque las fuentes se renderizan distinto en cada
sistema y las referencias se generan en el mismo entorno (Ubuntu + Chromium de Playwright).

## Cuándo falla

- **Falta una referencia** (tema nuevo o primera vez): el test falla y escribe la captura. El job
  **E2E: Playwright** la sube en el artefacto `referencias-visuales`, ya con su nombre final.
- **Cambia el aspecto**: el test falla y el artefacto `playwright-trazas` trae la captura esperada,
  la real y la diferencia.

## Añadir o actualizar referencias (cambio visual intencionado)

1. Descarga el artefacto del run que falló: `gh run download <id> -n referencias-visuales`
   (o, para un cambio, copia los `*-actual.png` de `playwright-trazas` quitando `-actual`).
2. Cópialas a `tests/visual/__screenshots__/` y **revísalas una a una**.
3. Haz commit (`test(visual): actualizar referencias`).
