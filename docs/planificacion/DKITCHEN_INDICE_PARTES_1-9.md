# DKITCHEN — ÍNDICE DE ENTREGA AL AGENTE DE CÓDIGO (Partes 1-14)

**Nota de nombre de archivo:** este documento se creó cuando solo existían las Partes 1-9; el nombre de archivo se mantiene igual para no romper enlaces ya compartidos, pero su contenido cubre ahora hasta la Parte 14.

**Estado de esta entrega (22/09/2026):** el informe de estado real del agente de código (`INFORME_ESTADO_DKITCHEN_2026-09-21.md`, commit `80a33ef`) ya se recibió y se contrastó contra todo lo especificado aquí. **La Parte 14 es la entrega principal para el agente en este momento** — el orden exacto y priorizado de qué construir a continuación, dado lo que el informe confirma como ya hecho.

**Para quien recibe este set de documentos (agente de código o Alex revisando antes de entregar):** léelos en este orden. Donde dos documentos den una cifra o regla distinta sobre el mismo punto, **manda el número de parte más alto** — cada parte nueva revisa o cierra puntos de las anteriores explícitamente, quien lo lea no necesita adivinar cuál es la versión vigente.

| # | Archivo | Qué cubre | Estado |
|---|---|---|---|
| 1 | `DKITCHEN_MIGRATION_PLAN.md` | Migración de identidad Architect.Sys → DKitchen, mapa de archivos hardcodeados a migrar, primeros bloqueantes | Identidad (dominio, WhatsApp, lockup) resuelta en `DKITCHEN_MIGRACION_COMPLETA.md` — ver nota abajo |
| 2 | `..._PARTE2.md` | Motor de QR (arquitectura, checkout, personalización), orquestación de Experience, psico-marketing por peldaño | Vigente — precio de QR revisado en Parte 11 (9€/25€), Ampliado ahora incluye Google Business+reservas+reseñas (Sección 2.3), plantillas de ads por formato de Experience añadidas (Sección 5.2-bis) |
| 3 | `..._PARTE3.md` | Arquitectura PWA/POS, modelo de cuotas de Dark Kitchen (tabla 3×3), ciclo de vida del cliente, infraestructura (Neon) | Vigente — tarifa puente de reservas +10€ **retirada** (absorbida en Ampliado, Parte 11); segmento "solo QR" reforzado en Parte 11 |
| 4 | `..._PARTE4.md` | Gobernanza para el agente de prospección — taxonomía, briefs A-F, reglas por canal | Para el agente de prospección, repositorio aparte — no para el agente de código de la web |
| 5 | `..._PARTE5.md` | Alérgenos, monetización de idiomas, Analizador de Rentabilidad/Escandallos (lead magnet + producto interno) | Vigente — el Analizador gratuito no cambia; Auditoría (Parte 8) ahora incluye una capa adicional, ver Parte 8 Sección 3.1 |
| 6 | `..._PARTE6.md` | Refactorización visual y de copy de venta — sistema de 6 bloques, especificación página por página | Vigente — cifra de prueba del hero de QR retirada, página nueva `/casos-de-exito` añadida (Sección 7-bis), pricing de QR actualizado, **"Base Operativa" renombrado públicamente a "Núcleo Operativo"** (Sección 6), bloque nuevo SALTO-CUÁNTICO especificado (Secciones 1 y 3) |
| 7 | `..._PARTE7.md` | Capa de movimiento (Lenis, Framer Motion/GSAP, 3D por página, transiciones) + **paleta de color actualizada** | Vigente — **su paleta sustituye la de cualquier documento anterior, incluida `DKITCHEN_MIGRACION_COMPLETA.md`**. Elementos 3D de `/qr` y `/base-operativa` deben construirse como un único sistema con dos estados (requisito del bloque SALTO-CUÁNTICO, CONFIRMADO) |
| 8 | `..._PARTE8.md` | Empaquetización y pago sin negociación — Auditoría, Dark Kitchen híbrido, portabilidad/migración, cuotas, formulario de intake, firma/factura automática | Vigente — **sus precios sustituyen los "sin definir" de `DKITCHEN_MIGRACION_COMPLETA.md`, Sección 14** (Auditoría ya resuelta; bot de WhatsApp queda fuera de la escalera). Auditoría ahora absorbe capa de Escandallo + order-bump tras QR (Sección 3.1, añadido en Parte 11) |
| 9 | `..._PARTE9.md` | Primera simulación de lanzamiento (construcción parcial) | **Superada en espíritu por la Parte 10** ("Hora 0") — se conserva como referencia histórica, no como cifra vigente |
| 10 | `..._PARTE10.md` | Simulación "Hora 0" (todo construido y en marcha) — TAM, competencia, CAC/LTV, escenarios 30/60/90 días, honestidad cruda sobre percepción del modelo nuevo vs. antiguo | Vigente — **cifras de TAM (población/censo de hostelería de Granada y Baza) sin verificar con fuente oficial, ver Parte 11 Sección 5** |
| 11 | `..._PARTE11.md` | Ajuste de precio de QR (9€/25€), fusión Auditoría+Escandallo con order-bump, página de casos de éxito, filosofía del segmento "solo QR", relación Ampliado↔reservas, rename de Base Operativa, dispositivo "salto cuántico", plantillas de ads por formato de Experience | Vigente — **todos los puntos ya decididos por Alex y aplicados directamente en las Partes 2, 3, 6 y 7** |
| 12 | `..._PARTE12.md` | Auditoría técnica de Whop como pasarela de pago (sustituye a Stripe donde DKitchen es el comerciante), comparativa de comisiones real, mapeo de cada flujo ya especificado, plan de migración | Vigente — **contiene un conflicto técnico sin resolver** (política de gracia/impago nativa de Whop, 5 días, vs. la de 30 días ya aprobada en Parte 8) y un punto a verificar por Alex directamente en su dashboard, ver su Sección 5 |
| 13 | `..._PARTE13.md` | Simulación "Hora 0" v2 — corrige el techo geográfico de la Parte 10, estructura de ads en dos streams (QR+complementos 15€/día, Auditoría+Escandallo 10€/día), descuento exclusivo de prospección física (hasta 50%, meta ampliada a 10-20 casos), horizonte de salida de España (~feb/mar 2027, sin cambios de alcance ahora), respuesta directa a "negocio cambia-vida" y palancas de aceleración | Vigente — sustituye el marco de techo geográfico y la estructura de ads de la Parte 10/11; el resto de la Parte 10 (competencia, CAC/LTV) sigue vigente |
| 14 | `..._PARTE14.md` | Orden exacto y priorizado de ejecución para el agente de código, contrastando el informe de estado real (21/09/2026) contra todo lo aprobado en las Partes 1-13 | Vigente — **es la entrega operativa actual para el agente de código** |
| — | `DKITCHEN_MIGRACION_COMPLETA.md` | Documento fuente original de Alex — identidad, escalera base, menús reales de las 6 marcas, mapa de páginas | Vigente salvo donde las Partes 7, 8 y 11 lo revisan explícitamente (paleta, precios de Sección 14, precio de QR) |

---

## Regla de precedencia

1. `DKITCHEN_MIGRACION_COMPLETA.md` es la base — identidad, escalera, menús reales, mapa de páginas.
2. Las Partes 1-5 son el razonamiento y la auditoría que originaron esa base — no hace falta releerlas para programar si ya se leyó el documento fuente, salvo Parte 4 (prospección) y Parte 5 (Escandallos, es un producto nuevo no descrito en el documento fuente).
3. Las Partes 6-8 son la capa de venta/estructura — estructura visual, movimiento, empaquetización — y mandan sobre cualquier cifra o regla anterior con la que entren en conflicto.
4. La Parte 9 es histórica (primera simulación), la Parte 10 es la simulación vigente de contexto de negocio, ninguna de las dos es una especificación de producto y ninguna bloquea desarrollo.
5. La Parte 11 manda sobre cualquier cifra o regla anterior con la que entre en conflicto — en particular, el precio de QR (9€/25€) sustituye a cualquier mención anterior de 19€/49€ estén donde estén.
6. **La Parte 12 manda sobre cualquier referencia a Stripe como pasarela de DKitchen** (no sobre la pasarela propia del cliente en Experience, que no cambia) — pendiente de resolver el conflicto de política de gracia/impago antes de dar por cerrada la migración.
7. **La Parte 13 manda sobre el marco geográfico y la estructura de ads de la Parte 10/11** — no hay techo de mercado fijado a Granada/Baza; el resto de cifras de competencia y CAC/LTV de la Parte 10 sigue vigente.
8. **La Parte 14 manda como orden de ejecución operativo** — no introduce ninguna cifra ni regla de negocio nueva, solo prioriza y corrige contra el estado real verificado en el informe del agente.

---

## Los tres precios que quedaban abiertos en el documento fuente (Sección 14) — su estado final

1. **Precio de Auditoría** → **RESUELTO en Parte 8, ampliado en Parte 11:** 297€ ancla / 47€ oferta especial, producto 1 a 1 con reunión, no automatizado, ahora con capa de Escandallo incluida y order-bump tras el pago de QR.
2. **Precio del bot de WhatsApp** → **queda fuera de la escalera, sin precio por ahora (Parte 8).** No es upsell de ningún peldaño. Se ofrecerá más adelante como campaña de configuración puntual a la base de clientes ya existente — el agente de código no necesita construir ningún flujo de venta para esto todavía.
3. **Precio del desarrollo llave en mano de la landing de Experience** → **RESUELTO en Parte 8:** igual al precio de Base Operativa (700€), con crédito de la última tarifa Experience ya pagada por el cliente.

---

## Lo que sigue pendiente

**Acciones de Alex, fuera del código (Parte 14, Fase 0):**
- Dar `WHOP_API_KEY`/`WHOP_COMPANY_ID` directamente al agente de código.
- Revocar en origen las 13 credenciales huérfanas de V-17 (Supabase, Kommo, WhatsApp/Meta, Whop antiguo).
- Documentar/autorizar el contenido real (vídeo, datos) de los dos primeros casos de éxito (Néstor Pizza, Seven Food Fries) antes de que se pueda publicar `/casos-de-exito`.

**Bloquea solo la construcción de la lógica de gracia/impago propia (Parte 12, Sección 5; Parte 14, Fase 2):**
- Cómo se gestiona el ciclo de gracia/impago: Whop cancela nativamente a los 5 días, la política ya aprobada (Parte 8) es de 30 días — recomendación dada (construir la lógica de acceso en el propio backend de DKitchen, no depender del ciclo nativo), pendiente de que el agente la implemente.

**No bloquea desarrollo:**
- Texto legal exacto del descargo de responsabilidad de migración/autoalojamiento (Parte 8, Sección 0/7) — necesita redacción de un abogado; el contenido sustantivo que debe cubrir ya está definido.
- Número exacto de reintentos de cobro más allá del esquema base ya fijado (Parte 8, Sección 0) — ya tiene calendario concreto aprobado, esto es solo por si se necesita ajuste fino en producción.
- Verificación oficial (INE/SIMA) de cifras de censo de hostelería, si se quieren en algún momento — ya no es TAM limitante (Parte 13), es solo referencia de contexto.
- Decisión técnica libre (no de negocio) de si la ruta `/base-operativa` se renombra a `/nucleo-operativo` o se mantiene tal cual — Parte 6, Sección 6.
- Estructura internacional (LLC en EEUU, dominio/marca distinta para LATAM) — deliberadamente aparcada hasta que Alex salga de España (~feb/mar 2027, Parte 13, Sección 0-bis). No construir nada de esto ahora.

Todo lo demás en las Partes 1-14 está **CONFIRMADO** y es programable sin más preguntas a Alex — el orden exacto está en la Parte 14.
