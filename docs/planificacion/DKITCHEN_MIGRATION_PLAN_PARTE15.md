# DKITCHEN — PARTE 15: CIERRE DE LA RONDA DE VERIFICACIÓN 22/09/2026 — ESTADO REAL VS. DOCUMENTADO

**Complementa a y corrige puntualmente** las Partes 6, 7, 8, 12 y 14. Escrita tras una auditoría directa (código vía API de GitHub, estado real en Vercel, estado real en Whop vía su propia API) que confirma qué de lo que los documentos anteriores daban por "construido" o "confirmado" lo está de verdad, y qué no. Motivo: karc0 detectó correctamente que podían existir "cruces de código aplicado en zonas donde en producción no son visibles" — es decir, huecos entre lo documentado y lo real. Esta parte cierra esa brecha con evidencia verificada, no con lo que un informe anterior afirmaba.

---

## 1. Confirmaciones de `DKITCHEN_RESPUESTA_AGENTE_2026-09-22.md` — verificadas contra código real

| Punto | Estado verificado |
|---|---|
| Rename público "Base Operativa"→"Núcleo Operativo" | **Confirmado en código.** Ruta técnica `/base-operativa` sin tocar, copy público renombrado. |
| SALTO-CUÁNTICO construido como dos escenas independientes (no una compartida) | **Confirmado en código** (`src/components/motion/Hero3D.tsx`). Corrección aplicada a Parte 6 y Parte 7 en este mismo commit — ver nota en ambos documentos. **Sin confirmar todavía:** si el copy de dos tiempos y el CTA propio hacia `/base-operativa` sobrevivieron — pendiente de QA visual real en navegador (nadie la ha hecho todavía, Parte 14 Fase 6 punto 25). |
| Order-bump de Auditoría+Escandallo construido | **Confirmado en código** (`src/app/api/checkout/auditoria/route.ts`). **No confirmado:** prueba real contra la API de Whop — no se ejecutó (ver Sección 2). |
| `/casos-de-exito` con Néstor Pizza real | **Confirmado en código**, con catálogo real (52 productos) y enlace a nestorpizzas.es. Seven Food Fries sigue en "Próximamente", pendiente de contenido de Alex — sin cambios. |
| Whop checkout de QR "verificado en producción" (afirmado en `src/lib/payments/whop.ts`) | **Parcialmente cierto — matizado en Sección 2.** El plan de 9€/mes existe y está activo en Whop, pero convive con un plan viejo de 19€/mes también activo — ningún pago real de prueba de extremo a extremo quedó documentado como ejecutado con éxito. |

---

## 2. Estado real en Whop — verificado en vivo el 22/09/2026 vía la API de Whop (no vía el código, vía la cuenta real: `biz_nNcVxqsbJ9syzN`, "DKITCHEN CORPORATE")

Esto es lo que karc0 pidió comprobar directamente ("solo tiene creado a medias el servicio de QR y sin probar") — confirmado, con más detalle del esperado:

### Productos existentes (3 de los 4+ que debería haber)

| Producto Whop | Planes activos | Estado |
|---|---|---|
| QR Menú — Plan Básico (`prod_ZvXb7WE1EyxEa`) | `plan_GG0mgyYYYX0ny`: 1€→9€/mes (correcto, Parte 11) **+** `plan_3rrX9IHJZshyk`: 1€→19€/mes (precio viejo, pre-Parte 11) | **Ambos visibles y activos a la vez.** El plan viejo nunca se desactivó. Riesgo real: cualquier enlace de checkout viejo en caché, compartido o indexado cobra 19€/mes en vez de 9€/mes. |
| Auditoría de canales + Escandallo (`prod_CCCbQOwYAUnRX`) | `plan_hQ8BGOOaf0e5u`: 47€ único | Correcto, coincide con `pricing-config.ts`. |
| Núcleo Operativo — Activación (`prod_yz9sEEpBK6BRT`) | `plan_QT3BO45KVJ4ll`: 700€ único | Correcto para la activación. **Falta por completo:** ningún plan recurrente para la cuota de mantenimiento (`BASE_OPERATIVA.mantenimiento.mensual = 69€/mes`, arranca en el mes 3 tras 2 meses gratis, `pricing-config.ts`). No existe función en `whop.ts` que la cree ni la dispare — es un hueco de implementación real, no solo de Whop. |

### Lo que falta por completo

- **QR Ampliado (25€/mes)** — la función `crearCheckoutQr` en el código sí soporta este plan (`QR_MENU.planes.ampliado`), pero **nunca se ha ejecutado ni una sola vez** — no existe ningún producto/plan "Ampliado" en Whop. Confirma literalmente lo que karc0 describió: "solo tiene creado a medias el servicio de QR".
- **Dark Kitchen (Ruta A y Ruta B), cualquier tier** — cero productos, cero planes, cero función de checkout en `whop.ts`. No es que esté a medias: no existe ningún código que cree un checkout de Dark Kitchen todavía.
- **Cuota de mantenimiento recurrente de Núcleo Operativo (69€/mes)** — ver tabla arriba.

### Hallazgo nuevo, no documentado en ningún lugar anterior: 3 planes huérfanos, visibles y con checkout activo

| Plan | Tipo | Importe | Producto asociado |
|---|---|---|---|
| `plan_f9aEoj2HXUUGy` | one_time | 400€ | Ninguno |
| `plan_nqduXzKUWi58E` | one_time | 700€ | Ninguno (duplicado de la cifra de Núcleo Operativo, pero sin vínculo a ese producto) |
| `plan_ZEpxoDmaawEns` | one_time | 10€ | Ninguno |

El código no crea planes con IDs fijos (usa `external_identifier` determinista por producto y deja que Whop cree el plan on-demand en cada llamada a `checkout_configurations`) — no hay ningún `plan_xxx` hardcodeado en `pricing-config.ts` ni en `whop.ts`. Estos tres son casi con toda seguridad restos de pruebas controladas ejecutadas directamente contra la API (el propio `whop.ts` documenta que sí se hizo al menos una "prueba controlada, sin que nadie pagara" para validar la forma de un plan `one_time`). **No se ha tocado ninguno de los tres** — decisión pendiente de Alex: confirmar que son de prueba y desactivarlos/borrarlos, o investigar su origen si no se reconocen.

**Acción recomendada, no ejecutada, pendiente de autorización:**
1. Desactivar (no borrar, por si hay algún cobro histórico asociado) el plan viejo de QR a 19€/mes.
2. Investigar y, si se confirma que son de prueba, archivar los 3 planes huérfanos.
3. Ejecutar el resto de la línea de implementación: QR Ampliado, cuota recurrente de Núcleo Operativo, Dark Kitchen — en ese orden, porque es el orden en que la escalera real los necesita.
4. Repetir la prueba controlada real (sin pago real) para el order-bump de Auditoría antes de anunciarlo como probado.

---

## 3. Estado real del repositorio y despliegue — verificado el 22/09/2026

- El repositorio y el proyecto de Vercel se **renombraron** de `architect-landing-hosteleria` a **`dkitchen-corporate-project`** (GitHub y Vercel), por decisión explícita de Alex — evita la confusión de nombre que arrastraba desde antes de la migración.
- La rama que Vercel despliega a `dkitchencorporate.es` **nunca fue `master`** — es `claude/github-repository-access-1cf0ss`, configurada como `productionBranch` del proyecto de Vercel. Esto explica por qué sesiones anteriores describían como "en producción" cosas que no aparecían al mirar la rama por defecto del repositorio en GitHub.
- **Corrección aplicada:** la rama por defecto de GitHub se cambió a `claude/github-repository-access-1cf0ss`, para que coincida con la realidad — cambio reversible, sin impacto en despliegue (es solo metadato de GitHub, Vercel sigue igual).
- `archive/architect-sys-legacy` (backup explícito del código anterior a la migración, pedido por Alex) **se protegió** contra borrado y force-push. La rama `main` apunta exactamente al mismo commit que este backup — no es una línea de trabajo paralela con contenido perdido, es la misma foto.
- Siguen abiertos y sin resolver: PR #2 ("sincronizacion", abril 2026) y PR #3 ("Refactor Architect.Sys: Security, Webhooks, Rate Limiting...", junio 2026) — ninguno de los dos se ha tocado en esta ronda. Requieren revisión y una decisión (cerrar, rescatar algo puntual, o descartar) antes de considerar el repositorio ordenado.
- Se añadió `.claude/agents/` (Brand Guardian, UI Designer, UX Architect) y un `CLAUDE.md` de proyecto que exige el uso de estos subagentes para cualquier trabajo visual/de producto — para que esto no dependa de qué sesión o qué canal (app móvil, cloud, local) toque el repositorio.

---

## 4. Hallazgo de seguridad pendiente (heredado de la auditoría de código del PR #5, sin resolver todavía)

El panel `/admin-dkitchen/*` no tiene guard de sesión/rol propio (`src/middleware.ts` existe en el histórico pre-migración pero no en la rama actual). Hoy no es explotable porque el backend real (Neon Auth) todavía no está conectado — pero el formulario de intake de la Fase 5 ya escribe en base de datos real. **Debe añadirse el guard en el mismo cambio que conecte Neon Auth, nunca después.**

---

## 5. Próximo paso acordado (sin cambios respecto a la Parte 14 / Respuesta del 22/09)

Arrancar la Fase 5 por el formulario de intake + la tubería de contrato/factura (Signaturit + Verifactu) en conjunto — sigue siendo la pieza que bloquea cerrar un cliente real de Núcleo Operativo o Dark Kitchen. A eso se suma ahora, con la misma prioridad, completar la línea de Whop que esta parte deja documentada como incompleta (Sección 2) y el refactor de diseño real de la Parte 7 (ver `CLAUDE.md` del repositorio).
