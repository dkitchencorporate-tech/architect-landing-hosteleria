# DKITCHEN — PARTE 12: AUDITORÍA TÉCNICA DE WHOP Y PLAN DE MIGRACIÓN DESDE STRIPE

**Complementa a:** Partes 2, 3 y 8 (todo lo que ahí se especificó sobre checkout, webhooks, pagos fraccionados y la tubería de contrato/factura, construido pensando en Stripe). **Esta parte no reabre la decisión — Alex ya decidió usar Whop.** Lo que sigue es la auditoría precisa que pidió, con las cifras reales verificadas hoy (22/09/2026), y el plan de cómo ejecutar el cambio sobre lo ya especificado.

---

## 0. Alcance exacto — qué sustituye Whop y qué no

Whop sustituye a Stripe **solo donde DKitchen es el comerciante que cobra**: checkout de QR (Parte 2, Sección 2.2), order-bump de Auditoría (Parte 8, Sección 3.1), pago de Auditoría en solitario, cuota de desarrollo + mensualidad de Núcleo Operativo, y Dark Kitchen (Ruta A y B, Parte 8 Sección 5).

**No sustituye nada en Experience.** Ahí la pasarela sigue siendo del propio cliente (Stripe, SumUp o Revolut Pay, a su elección — Parte 6, Sección 4), porque el dinero de cada entrada es del local, no de DKitchen — cero comisión, cero intermediación, principio ya cerrado desde la Parte 2. Whop no tiene ningún papel en ese flujo.

---

## 1. Qué es Whop hoy, verificado (no la versión de hace un año)

Whop dejó de ser un simple wrapper sobre Stripe Connect y construyó **su propia infraestructura de pagos** — gestiona KYC, cobros y pagos directamente, con enrutamiento inteligente entre varios procesadores para maximizar la tasa de autorización ([Whop: built for the future of payments](https://whop.com/blog/payments-launch/)). API REST propia (`api.whop.com/api/v1`), SDKs oficiales en JavaScript/TypeScript, Python y Ruby, autenticación por API key de empresa ([How to use the Whop REST API to accept payments](https://whop.com/blog/how-to-use-the-whop-api/)).

**Dos formas de montar el checkout:**
- **Checkout Links** — URL de pago lista, el cliente la visita directamente (equivalente a Stripe Checkout hospedado).
- **Embedded Checkout** — formulario de pago incrustado en la propia web de DKitchen, vía componente React o script HTML ([Integrate via checkout API](https://whop.com/blog/integrate-checkout-api/)) — esta es la opción coherente con lo ya especificado en Parte 2, Sección 2.2 ("checkout integrado en la propia web de DKitchen").

**Tipos de plan:** `one_time` y `renewal` — cubre tanto el pago único (Auditoría, montaje de QR, desarrollo de Núcleo Operativo/Dark Kitchen) como la suscripción recurrente (QR mensual, mensualidad de Núcleo Operativo/Dark Kitchen).

**Webhooks disponibles para pagos:** `payment.succeeded`, `payment.failed`, `payment.created`, `payment.pending`, `payment.canceled`, `payment.authorized`, `payment.requires_action` — con verificación de firma (`webhook-signature`) y el mismo patrón recomendado que ya sigue el diseño actual: verificar, encolar el trabajo, responder `200` rápido ([Webhooks - Whop Docs](https://docs.whop.com/developer/guides/webhooks)). `payment.succeeded` es el equivalente directo al `checkout.session.completed` que ya está especificado en Parte 2, Sección 2.2, punto 3.

---

## 2. La comparativa de comisiones — en crudo, tal como la pides

No es para reabrir la decisión, es para que la conozcas con números reales antes de ejecutar:

| | **Stripe (España, comisión real verificada hoy)** | **Whop (comisión real verificada hoy)** |
|---|---|---|
| Tarjeta doméstica/UE | **1,5% + 0,25€** | **2,7% + 0,30$** |
| Tarjeta internacional | 3,25% + 0,25€ | +1,5% adicional (≈4,2% + 0,30$) |
| Conversión de divisa | +1% | +1% |
| Cripto en el checkout | No nativo (stablecoins en fase *public preview*, no producción estable) | **Nativo, ya en producción** |

Fuentes: [Stripe fee calculator Spain](https://www.feecalcpro.com/calculators/stripe-fee-calculator-spain/), [Whop Fees - Docs oficiales](https://docs.whop.com/fees), [Whop fees explained (Dodo Payments)](https://dodopayments.com/blogs/whop-fees-explained).

**Lo que esto significa en tu caso real, hoy:** el 100% de tu facturación actual es tarjeta española/UE — ahí Whop cuesta **casi el doble en porcentaje** que Stripe (2,7% vs 1,5%). En una cuota de QR de 9€/mes, es la diferencia entre 0,39€ y 0,64€ de comisión — parece poco por cliente, pero a 200-300 clientes recurrentes es una diferencia mensual real, no cosmética.

**Aviso importante — no actives los add-ons opcionales de Whop sin necesidad:** Whop ofrece capas adicionales encima de la comisión base — orquestación multi-procesador (+0,8%), automatización de facturación (+0,5%) y gestión de impuestos/remesas (+2%) — que, activadas todas, llevan la comisión hasta **6% + 0,30$** ([Whop Fees - Docs](https://docs.whop.com/fees)). Ninguna de las tres aporta nada a un negocio del tamaño actual de DKitchen (no necesitas multi-procesador, la facturación ya la resuelve Verifactu/Signaturit por fuera — Parte 8, Sección 8 — y la gestión de impuestos ya la lleva tu propia gestoría). **Mantener el plan base de Whop sin add-ons es la única configuración que tiene sentido aquí.**

**Lo que sí compensa la diferencia, y es objetivamente cierto:** el argumento de fondo que diste (no cambiar de pasarela al expandirte, más el pago cripto nativo) es real y verificable — no es una percepción. Whop paga a más de 170 países ([Whop: built for the future of payments](https://whop.com/blog/payments-launch/)) y el cripto en checkout ya está en producción, no en fase experimental como en Stripe. Ese es el valor que estás comprando con ese punto y pico de comisión extra.

---

## 3. Cripto en el checkout — cómo funciona exactamente

Verificado directamente: **"En los checkouts de Whop, el cripto aparece automáticamente para los clientes elegibles, sin configuración adicional"** ([Cómo aceptar pagos cripto — Whop](https://whop.com/blog/accept-crypto-payments/)). Monedas ampliamente aceptadas: Bitcoin, Ethereum, Dogecoin, y stablecoins (USDT, USDC), con integración de Coinbase para el procesamiento.

**El punto clave para ti: el cripto se convierte automáticamente a fiat (USD) en el momento del checkout — nunca mantienes el activo, nunca asumes volatilidad de precio.** El cliente paga en cripto si quiere, tú recibes el equivalente en fiat, sin gestionar wallets ni exposición cambiaria en tu operación diaria. Es exactamente el tipo de ventaja "invisible para el cliente, real para el negocio" que ya se ha priorizado en el resto de esta refactorización (fricción cero, sin que el usuario note la complejidad detrás).

**Aparte, para cobrar tus propios ingresos (payout), Whop también permite retirar directamente a wallet cripto** (Kraken, Coinbase) — comisión de retiro 5% + 1$, notablemente más cara que el ACH a 2,50€ fijo. Esto es un tema distinto del checkout: recomiendo cobrar en fiat vía ACH/transferencia y no usar el payout en cripto salvo que tengas una razón concreta para mantener parte de la tesorería en cripto.

---

## 4. Mapeo técnico — flujo por flujo, sustituyendo Stripe por Whop

| Flujo ya especificado | Pieza Stripe original | Sustituto Whop |
|---|---|---|
| Checkout QR (Parte 2, Sección 2.2) | Stripe Checkout hospedado | Embedded Checkout (componente React), plan `renewal` |
| Provisión automática tras pago (Parte 2, Sección 2.2, punto 3) | Webhook `checkout.session.completed` | Webhook `payment.succeeded` — mismo patrón: crea cliente, panel, menú, QR |
| Order-bump de Auditoría tras QR (Parte 8, Sección 3.1) | Segundo `line_item`/`checkout.session` encadenado | Segundo Checkout Link o Embedded Checkout con `plan_id` de Auditoría, disparado en la misma pantalla de confirmación |
| Pago fraccionado Núcleo Operativo/Dark Kitchen (Parte 8, Sección 6) | `SetupIntent` + segundo cargo programado manualmente | Guardar método de pago + acción **Create Payment** para el cargo fuera de sesión (`off-session`) — mismo nivel de trabajo manual, no hay cuotas nativas en ninguna de las dos plataformas |
| Tubería de contrato/factura post-pago (Parte 8, Sección 8) | Webhook Stripe dispara Signaturit + Verifactu | Webhook `payment.succeeded` de Whop dispara la misma cadena, sin cambios en Signaturit/Verifactu — son sistemas independientes de la pasarela |

**Lo que no cambia nada:** Signaturit (firma) y el sistema de factura Verifactu-compliant (Parte 8, Sección 8) no dependen de qué pasarela dispara el webhook — siguen funcionando igual, solo cambia el origen del evento.

---

## 5. Conflicto real que necesita tu decisión — política de impago/gracia (SIGUE ABIERTO, no lo cubrió el agente)

Esto es lo más importante que ha salido de la auditoría, y no estaba resuelto en ningún punto anterior: **el comportamiento nativo de Whop ante un pago recurrente fallido es un ciclo de reintentos de solo 5 días, tras el cual la membresía se cancela automáticamente** ([Failed Payments & Recovery — Whop Help Center](https://help.whop.com/en/articles/11430734-failed-payments-recovery)). Durante esos 5 días el acceso queda restringido ("Past Due") y el sistema manda recordatorios automáticos por email.

**Esto choca directamente con el calendario ya aprobado en la Parte 8, Sección 0:** reintentos día 0/3/7, acceso completo en gracia días 7-12, modo solo lectura días 12-30, suspensión día 30 — un ciclo de 30 días, no de 5. Si dejas que Whop gestione la cancelación de forma nativa, cualquier cliente con una tarjeta caducada pierde el acceso en menos de una semana, rompiendo la promesa de "infraestructura y mantenimiento" con gracia real que ya está en el contrato (Parte 8, Sección 7).

**Mi recomendación:** no dejar que Whop cancele la membresía de forma nativa. En su lugar, el propio backend de DKitchen escucha los webhooks `payment.failed`/`payment.succeeded`, y es el código de DKitchen (no Whop) quien decide, según el calendario ya aprobado, cuándo restringe acceso, cuándo pasa a solo lectura y cuándo suspende de verdad — usando la membresía de Whop solo como fuente de verdad del estado de cobro, no como el motor de decisión de acceso. Es más trabajo de desarrollo que dejarlo en automático, pero es la única forma de mantener la política de 30 días ya prometida al cliente sin reescribir esa parte del contrato.

**RESUELTO por el agente de código (informe 21/09/2026), mejor de lo que esta auditoría esperaba:** el objeto `plan` de Whop admite `initial_price` (primer cobro) y `renewal_price` (recurrente) como campos nativos separados — no hace falta ningún cupón/descuento de un solo uso, a diferencia de Stripe, donde sí hace falta simularlo con un cupón `duration: 'once'` (así está construido el checkout de Stripe ya en producción). El mecanismo de "1€ el primer mes, luego precio completo" (Parte 2, Sección 3.3) es, con Whop, más simple de lo que estaba en Stripe — una ventaja real del cambio, no solo la que ya se había identificado en cripto/alcance internacional.

---

## 6. Plan de migración — orden de ejecución

1. **Verificar en tu propio dashboard de Whop** (ya tienes cuenta y modo desarrollador activo): si el plan `renewal` admite precio de primer periodo distinto (Sección 5, punto pendiente), y confirmar el company ID + generar la API key desde la sección Developer.
2. **Crear los productos/planes en Whop:** QR Básico (`renewal`, 9€/mes), QR Ampliado (`renewal`, 25€/mes), montaje de QR (`one_time`, 159€, con lógica de descuento a 0€ en la promo activa), Auditoría+Escandallo (`one_time`, 47€), Núcleo Operativo (`one_time` desarrollo + `renewal` mensualidad), Dark Kitchen (mismo patrón).
3. **Construir el Embedded Checkout** en la página `/qr` (Parte 2, Sección 2.2), sustituyendo la referencia a Stripe Checkout.
4. **Registrar el endpoint de webhook** y suscribirlo a `payment.succeeded`/`payment.failed` — este endpoint es el que dispara toda la tubería de aprovisionamiento (Parte 2) y post-pago (Parte 8, Sección 8).
5. **Implementar el order-bump** (Parte 8, Sección 3.1) como segundo Checkout Link/Embedded Checkout encadenado tras el primero.
6. **Construir la lógica de gracia/suspensión propia** (Sección 5 de esta parte) en vez de depender del ciclo nativo de 5 días de Whop.
7. **Probar el pago fraccionado** (Parte 8, Sección 6) con la acción Create Payment sobre un método de pago guardado, en modo desarrollador, antes de activarlo con clientes reales.
8. **Dejar Stripe configurado como plan B**, sin desmontarlo, hasta que el flujo completo en Whop esté probado de principio a fin con al menos un pago real de prueba — no migrar en caliente sin una prueba end-to-end.

**No hace falta darme las claves de API en ningún momento** — esa configuración va directamente del dashboard de Whop al agente de código, yo no necesito tenerlas para especificar cómo se usan. **Confirmado por el propio agente (informe 21/09/2026):** el código de Whop ya está escrito y completo contra la documentación pública real, esperando solo `WHOP_API_KEY` y `WHOP_COMPANY_ID` — el `WHOP_WEBHOOK_SECRET` lo genera el propio agente al registrar el webhook por API, no hace falta que lo busques tú aparte. Dáselas directamente a él para que haga la primera prueba real de extremo a extremo.

---

## Fuentes consultadas para esta auditoría (22/09/2026)

- [Whop: built for the future of payments](https://whop.com/blog/payments-launch/)
- [How to use the Whop REST API to accept payments](https://whop.com/blog/how-to-use-the-whop-api/)
- [How to integrate a checkout API, step by step — Whop](https://whop.com/blog/integrate-checkout-api/)
- [Webhooks - Whop Docs](https://docs.whop.com/developer/guides/webhooks)
- [Payment - Whop API Reference](https://docs.whop.com/api-reference/payments/payment)
- [Fees - Whop Docs](https://docs.whop.com/fees)
- [Whop Fees 2026: The True Cost — Dodo Payments](https://dodopayments.com/blogs/whop-fees-explained)
- [How to accept crypto payments as a business — Whop](https://whop.com/blog/accept-crypto-payments/)
- [Failed Payments & Recovery — Whop Help Center](https://help.whop.com/en/articles/11430734-failed-payments-recovery)
- [Stripe Fee Calculator Spain 2026](https://www.feecalcpro.com/calculators/stripe-fee-calculator-spain/)
