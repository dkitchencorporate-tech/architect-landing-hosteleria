# DKITCHEN — PARTE 16: DARK KITCHEN RUTA B Y MANTENIMIENTO RECURRENTE DE NÚCLEO OPERATIVO — CONSTRUIDO Y PROBADO (22/09/2026)

**Complementa a la Parte 15.** Cubre lo que se construyó inmediatamente después de la ronda de verificación: las dos piezas que la Parte 15 (Sección 2) marcó como completamente inexistentes — Dark Kitchen y la cuota recurrente de Núcleo Operativo.

---

## 1. Dark Kitchen Ruta B — construido

- **Base de datos** (migración `0016_dark_kitchen_ruta_b.sql`): tabla `marcas` (RLS forzado, sin GRANT directo a ningún rol — mismo criterio que `pedidos_nivel_b`), función `dk.crear_marca_ruta_b()` (recalcula orden y precio de desarrollo por su cuenta, nunca confía en lo que le llegue de fuera) y `dk.contar_marcas_activas()` (para mostrar el precio correcto antes de pagar).
- **Código**: `crearCheckoutDarkKitchenRutaB()` en `whop.ts`, gestión en `src/lib/marcas.ts`, rama nueva en el webhook de Whop (`producto === 'dark-kitchen-ruta-b'`) que crea la marca y avisa a Alex por correo para la confirmación humana antes de producción (Parte 8, Sección 5, punto 3) — deliberadamente no automática.
- **Precio verificado en producción real**: 1ª marca 1.200€, 2ª 960€, 3ª+ 840€ — probado en una transacción revertida contra la base de datos real (tres altas seguidas, sin dejar rastro) y contra la API real de Whop (`checkout_configurations`, sin completar pago).
- **Ruta A** (consultivo, 3.000-10.000€) sigue sin automatizar, a propósito — es venta 1 a 1, no self-service.
- **Simplificación dejada por escrito**: el pago de una marca de Dark Kitchen Ruta B no dispara la tubería común de contrato/factura (`dispararTuberiaPostPago`) — esa tubería asume un cliente nuevo sin cuenta (`pedidos_nivel_b`), y una marca la compra un cliente que ya existe. Por ahora solo se crea la fila en `marcas` y se avisa a Alex por correo. Revisar cuando se decida cómo unificar ambos modelos.

## 2. Mantenimiento recurrente de Núcleo Operativo — construido

- **Problema real**: Whop no tiene "N ciclos gratis, luego cobra" nativo — solo `initial_price` (un único primer cobro distinto) y `renewal_price`. La regla de negocio (2 meses gratis, 69€/mes desde el mes 3) no encajaba en eso.
- **Solución**: no se crea ninguna suscripción en la activación. Un cron diario nuevo (`/api/cron/mantenimiento-nucleo-operativo`, 04:15 UTC, mismo patrón de `CRON_SECRET` que `gracia-impago`) revisa qué pedidos de Núcleo Operativo cumplieron 60 días desde el pago (migración `0017_mantenimiento_nucleo_operativo.sql`) y, para cada uno, crea el checkout recurrente real y le envía el enlace al cliente por correo.
- **Simplificación dejada por escrito, a propósito**: el contador de 60 días arranca desde el pago de los 700€ (`pedidos_nivel_b.creado_en`), no desde una fecha real de "puesta en marcha" — esa fecha no existe todavía en el modelo de datos porque el resto del onboarding (intake → contrato → cocina operando) no está construido. Revisar este punto cuando exista esa pieza (Fase 5, siguiente entrega).
- **Probado**: función SQL verificada con datos reales de precio (69€) y contra la API real de Whop (checkout de tipo `renewal`, 69€ inicial y recurrente, sin completar pago).

## 3. Corrección de un error propio de esta misma sesión

La migración `0015` original diagnosticó un hueco de permisos que no existía: `/api/intake/[token]` usa `comoAprovisionamiento()` (rol `dk_webhook` → `dk_aprovisionamiento`), que ya tenía acceso a `dk.pedido_por_token`/`dk.guardar_intake` desde la migración `0013`. El permiso añadido a `dk_app` era innecesario y se revirtió en la misma sesión. Se deja documentado en el propio archivo de la migración en vez de borrarlo, siguiendo el mismo criterio de honestidad que el resto de este proyecto.

## 4. Estado de las pruebas de Whop tras esta parte

Todos los planes de prueba controlada creados hoy (QR Ampliado, Dark Kitchen de prueba, mantenimiento de Núcleo Operativo de prueba) se dejaron en `visibility: hidden` tras verificar la respuesta de la API — no aparecen en ningún listado público, pero no se pudieron eliminar por completo vía API (la clave usada devuelve 401 en `DELETE /plans/{id}`, aparentemente fuera del alcance de permisos de esta clave). El plan viejo de QR a 19€/mes (Parte 15, Sección 2) sigue en el mismo estado — pendiente decidir si se amplían permisos de la API key o se borra manualmente desde el dashboard de Whop.

## 5. Pendiente real, no bloqueante

- UI de cliente para Dark Kitchen Ruta B (formulario en `/marcas` o panel de cliente que llame a `contarMarcasActivas`/dispare el checkout) — el código de pago ya existe, falta la pantalla que lo use.
- Unificar el modelo de "pedido" entre `pedidos_nivel_b` (clientes nuevos) y `marcas` (clientes existentes) si se quiere que Dark Kitchen Ruta B también tenga contrato/factura automática.
- Refinar el ancla de 60 días del mantenimiento de Núcleo Operativo cuando exista una fecha real de puesta en marcha.
