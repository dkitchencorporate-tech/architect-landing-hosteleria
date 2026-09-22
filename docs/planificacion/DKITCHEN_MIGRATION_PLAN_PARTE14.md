# DKITCHEN — PARTE 14: ORDEN EXACTO DE EJECUCIÓN PARA EL AGENTE DE CÓDIGO (próxima sesión)

**Construida contrastando el informe de estado real (`INFORME_ESTADO_DKITCHEN_2026-09-21.md`, commit `80a33ef`) contra todo lo aprobado en las Partes 1-13.** No repite lo que el informe ya confirma como hecho y verificado — solo lo que falta, en el orden en que conviene construirlo. Entrégale este documento al agente de código junto con el índice (`DKITCHEN_INDICE_PARTES_1-9.md`, cubre hasta la Parte 13) para que tenga la regla de precedencia completa.

---

## Corrección de un dato del propio informe, antes de empezar

El informe dice, en la Sección 4.5, que el precio de Auditoría "sigue sin cerrar" y que es "el único bloqueante real" heredado. **Eso ya no es así — el precio se cerró hace varias partes:** 297€ ancla / 47€ oferta especial, producto 1 a 1 con reunión (Parte 8, Sección 3). El agente no lo tenía en su contexto todavía porque las Partes 8 y 11 no habían llegado a esa sesión. Queda como el primer punto de la Fase 1, no como una pregunta abierta.

---

## Fase 0 — Acciones tuyas (22/09/2026: COMPLETADA)

1. ~~Dar `WHOP_API_KEY` y `WHOP_COMPANY_ID` directamente al agente de código~~ — **hecho.** Al entrar al dashboard correcto de Whop (el del negocio, no el de la cuenta personal) apareció una clave vieja de la era Architect.Sys ("Architect Backend") con un webhook activo apuntando a `hosteleria.architectsys.com/api/whop/webhook` — ninguno de los dos estaba ya en Vercel, pero seguían vivos en el lado de Whop. Se borraron los dos y se creó una clave nueva ("DKitchen Producción", permisos completos, sin caducidad, sin restricción de IP — misma configuración que la vieja). **No se creó ninguna "Aplicación"** (eso es para apps multi-tenant instalables por terceros, no aplica aquí) **ni el webhook nuevo** (lo registra el propio agente por API al recibir la clave, así genera él mismo el `WHOP_WEBHOOK_SECRET` correcto contra la ruta real del código, no la antigua).
   - **Siguiente paso inmediato:** dale `WHOP_API_KEY` y `WHOP_COMPANY_ID` (las que acabas de generar) directamente al agente — nunca a mí — para que ejecute la Fase 2.
2. **Revocar en origen el resto de las 13 credenciales huérfanas de V-17** (Supabase, Kommo, WhatsApp/Meta) — la parte de Whop de este hallazgo **ya quedó cerrada** con el borrado de arriba; sigue pendiente el resto, en cada servicio externo correspondiente.

---

## Fase 1 — Corregir lo que ya está decidido pero no está en producción (rápido, alto impacto)

3. **Actualizar `src/lib/pricing-config.ts`** (la fuente única de precios que ya existe, según el informe Sección 1.2) con: QR Básico 9€/mes, QR Ampliado 25€/mes (Parte 11); Auditoría 297€/47€ (Parte 8, Sección 3). Ahora mismo la producción sigue mostrando 19€/49€ y ningún precio de Auditoría — es una corrección de datos, no una construcción nueva.
4. **Actualizar el PRICING-BLOCK visual de `/qr`** con los nuevos precios (Parte 6, Sección 3).
5. **Construir el PRICING-BLOCK de `/auditoria`**, que el informe confirma que sigue sin construir (Sección 4.5) precisamente porque el precio no estaba cerrado en su contexto — ya lo está (punto 3).

---

## Fase 2 — Whop en producción (ya puede arrancar)

6. **En cuanto le pases la clave (Fase 0, punto 1):** el agente registra el webhook por API (obtiene su propio `WHOP_WEBHOOK_SECRET`, apuntando a la ruta real `/api/webhooks/whop`, no a la antigua), configura `WHOP_API_KEY`/`WHOP_COMPANY_ID`/`WHOP_WEBHOOK_SECRET` en Vercel, y ejecuta la prueba real de extremo a extremo que él mismo propuso (informe, Sección 6.4) — un pago de prueba real contra el checkout de QR.
7. **Usar `initial_price`/`renewal_price` nativos de Whop** para el mecanismo de "1€ el primer mes" (Parte 2, Sección 3.3) — el propio agente ya encontró que Whop lo soporta de forma nativa, mejor que el cupón que tuvo que usar para Stripe (Parte 12, Sección 5, ya actualizada con este hallazgo).
8. **Construir la lógica de gracia/impago propia en el backend de DKitchen**, para que Whop no cancele la membresía de forma nativa a los 5 días — necesaria para respetar el calendario de 30 días ya prometido en el contrato (Parte 8, Sección 0; Parte 12, Sección 5). El informe no menciona esta pieza — no está construida todavía.

---

## Fase 3 — Order-bump y fusión Auditoría+Escandallo

9. **Order-bump técnico**: segundo checkout (Whop) encadenado justo tras la confirmación de pago de QR, ofreciendo Auditoría+Escandallo a 47€ (Parte 8, Sección 3.1; Parte 12, Sección 4).
10. **Añadir la capa de Escandallo al entregable de Auditoría** — usa los mismos datos del formulario preparador + revisión del especialista en la reunión, no es un informe automático nuevo (Parte 8, Sección 3.1-a).

---

## Fase 4 — Mensajería y visual de la Parte 11 (aprobados, aún no construidos)

11. **Rename público "Base Operativa" → "Núcleo Operativo"** en toda la página (hero, nav, CTAs) — el nombre técnico interno/rutas pueden quedarse igual (Parte 6, Sección 6; Parte 11, Sección 6.2). El informe (Sección 4.6) confirma que la página sigue llamándose "Base Operativa" en todos sus textos — este cambio no se ha aplicado.
12. **QR Ampliado — bundle de Google Business + reservas + reseñas incluido**, retirar cualquier tarifa puente de +10€ separada (Parte 2, Sección 2.3; Parte 3, Sección 4).
13. **Bloque SALTO-CUÁNTICO** en `/qr`: el elemento 3D de la tarjeta QR transformándose en scroll en el dispositivo de Núcleo Operativo (Parte 6, Sección 3; Parte 7) — reutiliza los elementos 3D que el informe confirma que ya existen por separado (`Hero3D.tsx`, Sección 4.9), coordinándolos como un único sistema.
14. **Página `/casos-de-exito`** (Parte 6, Sección 7-bis) — Néstor Pizza y Seven Food Fries como primeros casos. Esto necesita que tú documentes/autorices el contenido real (vídeo, cifras si las hay) antes de que el agente pueda publicar las fichas — la construcción de la página no depende de ti, el contenido de las dos primeras fichas sí.

---

## Fase 5 — El pipeline de Nivel B/C (necesario antes de cerrar los primeros Núcleo Operativo/Dark Kitchen reales)

Ninguna pieza de esto aparece en el informe — el checkout construido hasta ahora cubre solo QR (Nivel A). Todo esto es Parte 8 sin empezar:

15. **Formulario de intake post-pago** (Parte 8, Sección 5-bis) — datos de negocio/menú, rama de fotos propias vs. generadas por IA con aprobación obligatoria.
16. **Tubería de contrato/factura automática**: webhook → Signaturit (firma) + factura Verifactu-compliant + documento de siguientes pasos + ticket interno (Parte 8, Sección 8).
17. **Pago fraccionado** (2 cuotas + 50€ recargo) para Núcleo Operativo/Dark Kitchen, usando el `Create Payment` fuera de sesión de Whop sobre un método guardado (Parte 8, Sección 6; Parte 12, Sección 4).
18. **Flujo híbrido de Dark Kitchen Ruta B**: pago de autoservicio a precio auto-calculado + confirmación humana rápida antes de producción (Parte 8, Sección 5).
19. **Experience: formulario + reunión 1:1 automática + portal Fase 1** (cronograma, próxima reunión, contacto de soporte) (Parte 8, Sección 4).
20. **Reframe activo vs. acceso visible en el contrato**: gracia, migración/autoalojamiento con tarifa escalada, licencia de marca — depende de que el punto 16 (tubería de contrato) ya exista (Parte 8, Sección 7).

---

## Fase 6 — Backlog ya conocido, sin cambios de prioridad

Tal como los deja el propio informe (Sección 8), sin ninguna urgencia nueva añadida por esta parte:

21. Fase SEO (programática).
22. Repo `dkitchen-prospector` — necesita que le des acceso o lo crees.
23. Login social (Google/Apple) — sigue aplazado.
24. Decisión sobre `.agent_context_backup/` en `main` (712 MB) — recomendado resolverlo junto al renombrado del repositorio, si es que lo haces.
25. **QA visual real en navegador de las Partes 6 y 7** — el propio informe es explícito en que esta sesión no tiene esa herramienta (Sección 4.9). Alguien (tú, o una sesión con navegador) tiene que abrir el sitio y confirmarlo antes de dar el diseño por bueno de verdad.

---

## Lo que no es tarea de este agente

**Plantillas de creatividad por formato de Experience** (Parte 2, Sección 5.2-bis) — es un activo de marketing/Prospector (imágenes y vídeo), no código de la web. No delegar al agente de código.

---

## Nota de alcance — lo que esta parte no cambia

Las Fases 1-4 son rápidas y de alto impacto porque son, en su mayoría, correcciones de algo ya decidido que no llegó a producción — tiene sentido pedírselas al agente ya, en cuanto tenga esta parte y el índice. Las Fases 5 en adelante son construcción nueva y más grande; nada te obliga a mandarlas todas de una vez — puedes soltarlas en el orden de esta lista, a medida que las anteriores queden cerradas y verificadas.
