---
title: Mi segundo cerebro para Claude
date: 2026-11-21
summary: Un vault de Obsidian que hace de memoria persistente para Claude Code. Le da el contexto justo en cada sesión y no escribe nada sin mi permiso.
tags: [Obsidian, Claude Code, Bash, Python]
draft: true
---

Los agentes de programación empiezan cada sesión sin memoria. Yo repetía una y otra vez mis preferencias, el estado de cada proyecto y cómo habíamos resuelto un error la semana anterior. La salida obvia, meterlo todo en un `CLAUDE.md`, llenaba el contexto y no escalaba.

El criterio de éxito era sencillo: **repetir menos y que no vuelva a cometer errores ya resueltos, sin llenarle el contexto**.

## La estructura

Es un vault de Obsidian en Markdown, local, sin servicios externos ni procesos en segundo plano:

```text
Brain/
├── 00-index.md        tabla de enrutado: «si necesitas X, mira en Y»
├── 01-perfil/         preferencias (mandan sobre los valores por defecto) y sistema
├── 02-programacion/   stack, convenciones, testing, lecciones y snippets
├── 04-proyectos/      una carpeta por repositorio
├── 06-conocimiento/   documentación y fuentes técnicas
├── hot.md             en qué estoy ahora
└── log.md             qué se ha escrito y cuándo
```

Cada nota lleva frontmatter con `type`, `tags`, `summary` y `updated`. El agente busca por el resumen y solo abre lo que necesita. Las carpetas grandes tienen un índice que genera un script.

## Una carpeta por proyecto

```text
04-proyectos/<proyecto>/
├── 00-contexto.md     objetivo, estado, stack y la ruta del repo
├── 01-decisiones/     por qué se decidió cada cosa
├── 02-sesiones/       resumen de cada sesión de trabajo
├── 03-pendientes.md
├── 04-glosario.md
└── archivo/           chats completos: nunca entran en contexto
```

La ruta del repo en `00-contexto.md` es la clave: así se sabe qué proyecto toca según la carpeta en la que abro Claude Code.

## El hook de inicio

Al empezar cada sesión, un hook `SessionStart` en Bash:

1. lee las preferencias esenciales;
2. busca el proyecto cuya ruta contiene la carpeta actual (si hay varios, gana la más larga);
3. añade sus pendientes y lo reciente de `hot.md`;
4. lo recorta a unas 30 líneas como máximo.

Si algo falla, sale sin decir nada. **Una herramienta auxiliar nunca puede bloquear la sesión.**

## Siete skills

Todo lo demás se pide bajo demanda:

- **recall**: consultar el cerebro antes de una tarea, o ante un error que «me suena».
- **capture**: guardar un bug con causa no obvia, una decisión o una corrección mía.
- **session**: cerrar una sesión con su resumen, pendientes y contexto.
- **ingest**: convertir documentación o un PDF en notas enlazadas.
- **interview**: entrevistarme para rellenar lo que falta.
- **review**: mantenimiento, con notas viejas, pendientes ya hechos y resúmenes duplicados.
- **audit**: leer lo que le pido en las últimas sesiones y proponer convertir en skill lo que repito.

## La regla de oro: nada sin mi permiso

El agente **propone** el texto exacto y yo digo que sí o que no. Cada escritura aprobada queda en `log.md`. Así el cerebro no se llena de ruido ni de cosas que el agente creyó entender.

Tampoco se guarda lo que cambia solo, como el estado del CI o las issues: eso se consulta en directo. Una memoria que miente es peor que no tener memoria.

## Herramientas con tests

Alrededor hay scripts en Python y Bash, cada uno con sus tests: el generador de índices, el informe de mantenimiento (de solo lectura) y el exportador de chats al archivo de cada proyecto.

## Qué me llevo

- **Poco contexto y bien enrutado vale más que mucho.**
- **Separar lo reutilizable de lo de cada proyecto**: una lección sobre VA-API sirve en cualquier repo; un pendiente, solo en el suyo.
- **El humano decide qué se recuerda.** El agente propone, yo apruebo.
