---
title: Cómo hice omatab
date: 2026-11-21
summary: Una tablet Android como segunda pantalla de Hyprland por USB, con 17 ms de latencia y un 12 % de un núcleo. Lo que hubo que medir, parchear y depurar para llegar ahí.
tags: [Rust, GStreamer, Kotlin, Hyprland, Bash]
draft: true
---

Quería usar mi Galaxy Tab como monitor extendido del portátil. Las opciones que encontré iban por Wi-Fi, con una latencia que se notaba al mover el ratón, o no se integraban con Hyprland. Me puse tres condiciones: **por cable**, **fluido** y **sin cargar el portátil**.

## La arquitectura

No empecé de cero. [Moreland](https://github.com/adiimanav/moreland) ya hacía la parte difícil: crear un monitor virtual en Hyprland, capturarlo y codificarlo en H.264 por hardware. omatab es todo lo que hace falta alrededor para que sea un plugin de Omarchy que se usa con un clic.

```text
Hyprland ── monitor virtual (headless)
   │  ext-image-copy-capture (DMA-BUF, sin copias)
   ▼
Motor ── GStreamer VA-API → H.264 ── adb forward (USB) ──▶ app Android (MediaCodec)
   ▲                                                          │
   └──────────────── confirmación de cada frame ◀─────────────┘
```

- **Motor** en Rust (fork de Moreland con parches propios).
- **App Android** en Kotlin que decodifica y pinta el vídeo, con una pantalla de espera.
- **Controlador** en Bash + jq con verbos (`start`, `stop`, `doctor`, `set`…).
- **Widget** en la barra de Omarchy con QML, con un panel de ajustes.

## Primer muro: en Intel no salía ni un byte

En mi portátil (Intel, driver iHD) el motor creaba el monitor, pero no enviaba nada. El error era `not-negotiated` al primer frame.

La causa: el driver no anuncia el formato `XR24` en la entrada de `vapostproc`, solo `AR24` y otros. El código buscaba modificadores solo para XR24, caía a uno lineal de reserva y negociaba algo que el driver rechazaba. En AMD sí funciona, por eso no lo había visto nadie.

La solución fue elegir el formato según lo que anuncie el driver. AR24 tiene el mismo diseño que XR24 y el alfa se ignora al pasar a NV12. **Lección:** en VA-API ningún formato es universal; hay que preguntar al driver antes de fijarlo.

## Medir antes de optimizar

Para elegir el codificador y los FPS medí 20 segundos con vídeo en movimiento en la tablet. Sin movimiento, Hyprland manda ~1 fps y las cifras engañan.

| Combinación                 | Mediana      | p95          | Frames perdidos |
| --------------------------- | ------------ | ------------ | --------------- |
| `vah264enc` a 90 fps        | 14–22 ms     | ~30 ms       | ~0,3 %          |
| `vah264enc` a 120 fps       | 13 ms        | 27 ms        | 12 %            |
| **`vah264lpenc` a 120 fps** | **16–18 ms** | **21–28 ms** | **~0,1 %**      |

La mediana más baja perdía un 12 % de frames, y eso se nota como tirones. Me quedé con el codificador de bajo consumo (VDEnc): es hardware fijo, apenas usa la GPU y el motor se queda en un 12–15 % de un núcleo.

## El frame que el decodificador se guardaba

Al mover solo el ratón, el cursor «tardaba en aparecer». En las estadísticas, siempre se confirmaban N−1 de N frames. Había dos retenciones:

1. **En el portátil**, los paquetes se enviaban después de la siguiente captura, que espera a que algo cambie en pantalla.
2. **En la tablet**, el decodificador de Exynos no entrega el último frame hasta que llega otro, e ignora las opciones de baja latencia.

Lo arreglé enviando cada paquete en cuanto sale del codificador y, tras dos intervalos sin cambios, volviendo a codificar el último frame: un P-frame casi vacío que empuja el retenido. El cursor pasó de 38 a 21 ms de mediana.

## Desenchufar sin que se quede colgado

Al quitar el cable, el monitor virtual seguía ahí 5–7 segundos, o para siempre si la pantalla no cambiaba. El hilo principal estaba bloqueado esperando una captura que no iba a llegar.

Ahora una bandera compartida marca la desconexión, y la espera de captura usa `poll` con un timeout de 100 ms que la comprueba en cada vuelta. El corte se detecta en ~0,3 s, antes incluso que udev. Volver a enchufar y ver imagen bajó de 5–10 s a unos 3 s.

## Publicarlo bien

`omarchy plugin add` solo clona el repo, así que el binario del motor y el APK van en una release con sus sumas `SHA256SUMS`, y `omatab install` las comprueba antes de instalar nada. Sin `sudo`: si falta un paquete, te dice cuál. Al compilar el binario, quité las rutas de mi equipo con `--remap-path-prefix`: la primera versión llevaba 99 rutas con mi usuario dentro.

## Qué me llevo

- **Medir con contenido real**: estático y en movimiento, mediana y p95, no solo la media.
- **Cada bucle que bloquea tiene que poder despertarse** si el otro extremo se cae.
- **No suponer nada del hardware**: preguntar al driver qué soporta.
- **Una release verificable** vale más que pedir a la gente que compile.

El código está en [github.com/Pakitoh0/omatab](https://github.com/Pakitoh0/omatab).
