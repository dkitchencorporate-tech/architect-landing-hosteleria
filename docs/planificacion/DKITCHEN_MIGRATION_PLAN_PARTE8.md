# DKITCHEN — PARTE 8: EMPAQUETIZACIÓN Y AUTOMATIZACIÓN DE PAGO (venta sin negociación)

**Complementa a:** Partes 1-7. Nace de la decisión de Alex de escapar del ciclo de presupuestación larga, reuniones de personalización de propuesta y negociación de descuentos en todo lo que no sea alto ticket consultivo (franquicia, línea de marca propia a medida, multi-Base-Operativa — eso sigue exactamente igual que hoy, fuera de esta parte). Todo lo definido aquí está **CONFIRMADO** por Alex tras una ronda de decisión explícita — no queda como propuesta abierta salvo donde se indique.

---

## 1. Los tres niveles — marco de referencia para toda esta parte

| Nivel | Qué significa | Peldaños |
|---|---|---|
| **A — Entrega instantánea** | Pagas → el sistema aprovisiona todo sin intervención humana | QR (ya existe, sin cambios) |
| **B — Encargo sin fricción** | Pagas con tarjeta al precio fijo publicado, sin negociar nada antes → se dispara automáticamente el proceso, con plazos definidos; el trabajo de ejecución sigue siendo humano | Experience, Auditoría, Base Operativa, Dark Kitchen Ruta B |
| **C — Consultivo, sin cambios** | Cualificación/admisión/cotización caso a caso | Dark Kitchen Ruta A, franquicia, líneas de marca propia, multi-Base-Operativa |

Ningún peldaño de Nivel C se toca en esta parte.

---

## 2. QR — sin cambios

Ya es Nivel A puro (Parte 2, Sección 2.2-bis). No requiere ningún ajuste de esta parte.

---

## 3. Auditoría de canales externos — CONFIRMADO: producto de alto valor con precio ancla, no automatizado

Se descarta la vía "informe automático por IA" que se había valorado en la fase de análisis — Alex decide explícitamente que Auditoría sea un **producto 1 a 1 con trato humano real**, posicionado deliberadamente por encima de "gratis o documento automatizado", y separado con claridad del Analizador de Rentabilidad gratuito (Parte 5), que sigue siendo el lead-magnet sin fricción de la escalera.

- **Precio:** ancla **297€**, oferta especial exclusiva **47€** — la diferencia de precio es intencional y grande: hace creíble que es una "oferta", nunca "el precio real es 47€ disfrazado". El ancla de 297€ está validada frente a mercado — auditorías de marketing 100% bespoke para restaurantes con informe + hoja de ruta se venden en el mercado a partir de ~750€ sin ningún descuento, así que 297€ no es una cifra inflada artificialmente.
- **Por qué 47€ y no una cifra simbólica tipo 1€:** un precio ese bajo colisiona con el Analizador de Rentabilidad gratuito y diluye el mensaje de "esto es trato humano de alto valor" — 47€ sigue siendo un precio de compra por impulso para un hostelero, pero deja claro que es un producto de pago real, no una variante gratuita con otro nombre.
- **Escasez — real, no artificial (mismo principio ya aplicado a Dark Kitchen Ruta A y Experience):** el número de auditorías 1 a 1 que Alex puede ejecutar por semana es una limitación real de su propia agenda, no un truco de marketing. Comunicar la oferta con un aforo explícito y verdadero (ej. "X plazas por semana") en vez de una cuenta atrás genérica.
- **Flujo (Nivel B con reunión incluida, no opcional):**
  1. Página explica con precisión qué es y qué no es la auditoría (diagnóstico de Google Business Profile + redes, sin garantía de resultado — mismo principio que ya rige el resto de la escalera).
  2. Formulario preparador (datos del negocio + accesos/enlaces a auditar) — sustituye cualquier intercambio previo por email.
  3. Pago (297€/47€ según oferta vigente) dispara automáticamente: agendamiento de la reunión 1 a 1 con el especialista, sin pasos intermedios de negociación de fecha por WhatsApp.
  4. La reunión termina con la entrega de un documento de auditoría de alto valor + directrices de avance claras — este documento es el entregable, no un PDF genérico.
  5. Cierre con CTA natural hacia Base Operativa (ya establecido en Parte 6, Sección 5) cuando el diagnóstico lo justifique.

### 3.1 Auditoría absorbe el Escandallo — CONFIRMADO en la Parte 11, y se vende como order-bump justo después de QR

Dos decisiones de Alex, tomadas juntas porque son la misma pieza de embudo:

**a) La Auditoría de 47€ pasa a incluir una capa de análisis de rentabilidad/escandallo más profunda que la del Analizador gratuito (Parte 5), pero por debajo del nivel de precisión que tendría el motor completo dentro de Base Operativa:**
- El Analizador gratuito (Parte 5) sigue existiendo tal cual, sin cambios — es y sigue siendo el lead-magnet de coste cero.
- La capa que se añade a la Auditoría de 47€ usa los mismos datos que el cliente ya aporta en el formulario preparador (paso 2 del flujo de arriba) + una revisión manual del especialista en la propia reunión 1 a 1 — no es un informe automático nuevo que programar desde cero, es una extensión del contenido que ya se entrega en la reunión existente.
- Esto es lo que convierte la Auditoría en el segundo escalón de entrada agresiva que Alex pidió: QR resuelve "tener presencia digital", Auditoría+Escandallo resuelve "saber si el negocio es rentable" — ambos automatizados o casi-automatizados hasta el pago, ambos con entrega de valor real e inmediata.

**b) Order-bump en el checkout de QR:** justo después de que el cliente paga el 1€ de entrada de QR (Parte 2, Sección 2.2-bis), en la misma pantalla de confirmación, se ofrece la Auditoría+Escandallo a 47€ como un único clic adicional ("Ya tienes tu carta digital. ¿Sabes si tu negocio es realmente rentable? Añade tu Auditoría por 47€"), aprovechando el momento de mayor intención de compra de todo el embudo — es el mismo principio ya documentado para el paso de QR a Experience (Parte 2, Sección 3.3), aplicado un paso antes.
- Técnicamente es un segundo `line_item` o un segundo `checkout.session` encadenado inmediatamente después del primero (a definir por el agente de código según cómo esté montado el checkout de QR) — no bloquea el pago de QR si el cliente lo rechaza, es estrictamente opcional y no vuelve a insistirse en la misma sesión.
- Este es el mecanismo que conecta directamente con la lógica de reinversión de presupuesto de ads que Alex describió (Parte 11): cada euro que entra por QR o por este order-bump es presupuesto que se reinvierte en más ads de QR/Auditoría, nunca en ads fríos de Base Operativa/Dark Kitchen.

---

## 4. Experience — CONFIRMADO: formulario + reunión 1 a 1 automática + portal propio del cliente

No se elimina la reunión — se automatiza el disparo de la reunión y se añade algo que hoy no existe: **acceso real, no solo documentación**.

- **Flujo de compra:** formulario de configuración (formato elegido de los 7, fecha deseada, aforo, gastronomía propia/DKitchen/híbrido) → pago a la tarifa fija que corresponda (Parte 2, Sección 5.1) → dispara automáticamente: entregables inmediatos (brief del evento pre-rellenado con lo indicado en el formulario) + agendamiento automático de la reunión 1 a 1 con DKitchen para cerrar el detalle. Mantiene la cercanía humana, elimina la fricción de "pedir presupuesto antes de saber si me interesa".
- **Portal del evento — pieza de construcción nueva, no un ajuste de copy:** cada evento comprado da acceso a un área propia, protegida por contraseña, exclusiva del cliente (no del público que compra entradas), con:
  - Cronograma del evento (T-21 a T+2, ya definido en Parte 2, Sección 5.4) con estado visible de cada hito.
  - Fecha y enlace de la próxima reunión real agendada.
  - Objetivos y proyecciones del evento.
  - Seguimiento en vivo de venta de entradas (lee del mismo sistema de QR de Ticket, Parte 2, Sección 5.5).
  - Reactivación con instrucciones, precios y condiciones claras (tarifas de Reuso/Reuso fidelizado ya definidas).
  - Upsell cruzado visible: pasar todo a Base Operativa, comprar QR, otros formatos disponibles.
  - Acceso rápido a soporte técnico vía WhatsApp o creación de nota de servicio, sin salir del portal.
  - Normas de uso claras.
- **Por qué importa:** convierte la compra de "pagué y me dieron una factura, un plan y un PDF" a "tengo acceso a una estructura real que es mía mientras dure la relación" — es la misma lógica de activo-visible que se aplica en la Sección 6 a Base Operativa y Dark Kitchen, pero aplicada a Experience por primera vez.
- **Nota de alcance:** este portal es infraestructura nueva real (modelo de datos por evento, autenticación por cliente, vistas de seguimiento) — se presupuesta como fase propia, no como parte del lote de copy/movimiento de las Partes 6-7.

---

## 5. Dark Kitchen Ruta B (Marca en Caja) — CONFIRMADO: híbrido, autoservicio + confirmación rápida

No se va a autoservicio 100% instantáneo. Flujo decidido:

1. Cliente entra en `/marcas`, selecciona cuántas marcas quiere añadir — el sistema calcula el precio exacto ya con el descuento por volumen aplicado (curva 1.200€/-20%/-30%, Parte 3, Sección 3.3) y la cuota mensual correspondiente (tabla 3×3, Parte 3, Sección 2.2).
2. Paga por tarjeta directamente al precio mostrado, sin negociar nada.
3. **Antes de disparar la producción real** (kit de marca, clonado de PWA), hay una confirmación humana rápida — no una negociación, solo una verificación de que la cocina/local del cliente puede efectivamente operar lo que compró (evita el riesgo de cualificación que se señaló en la fase de análisis: alguien paga sin encajar realmente en el producto).
4. Confirmado, se dispara automáticamente: contrato, factura, kit de marca en cola de producción.

---

## 5-bis. Formulario de intake — Base Operativa y Dark Kitchen (qué se pide después de pagar)

**CONFIRMADO — esto no estaba definido en detalle, solo mencionado como "formulario de recogida de datos".** Aplica igual a Base Operativa y a cada marca que se añade vía Dark Kitchen Ruta B (mismo formulario, repetido por marca cuando aplica). Se dispara automáticamente al confirmarse el pago (Sección 8).

**Nota de terminología:** cuando este documento o los anteriores dicen "panel de administración" para Base Operativa/Dark Kitchen, no es un producto separado — es la **vista de gestión de la propia PWA** (la misma app tiene una cara de pedido para el cliente final y una cara de gestión para el hostelero: editar menú, ver pedidos en vivo, modo camarero, marcar producto agotado — Parte 3, Sección 5.1). No hay dos sistemas, hay un solo sistema con dos vistas.

**Campos del formulario:**

1. **Datos del negocio:** nombre, dirección(es), horario por día, logo (subida directa), colores de marca si ya tiene identidad definida (si no, se usa la paleta DKitchen por defecto).
2. **Catálogo/menú:** estructura de categorías (plantilla sugerida, editable), y por producto: nombre, descripción, precio, alérgenos (obligatorio y gratuito, ya confirmado en Parte 5), variantes/extras si aplica.
3. **Fotos de producto — dos ramas, el cliente elige una:**
   - **Rama A — el cliente aporta sus propias fotos**, por producto o en lote.
   - **Rama B — el cliente no tiene fotos y pide que DKitchen genere las imágenes.** Sub-formulario de estilo: referencia visual (subir 1-3 fotos de inspiración, o elegir un estilo predefinido: minimalista/oscuro, cálido/rústico, vibrante/colorido). Usa el mismo motor de IA económico ya decidido para el Analizador de Rentabilidad (Parte 5) — no se monta infraestructura nueva de IA para esto, se reutiliza.
   - **Aviso de riesgo real a comunicar en el propio formulario, no solo en letra pequeña:** una foto generada por IA es una aproximación del plato, no una fotografía real — si no se parece a lo que se sirve, genera quejas de comensales y daño reputacional para el cliente, no solo estético. Por eso **ninguna imagen generada se publica automáticamente** — el cliente aprueba cada una antes de que salga a la carta pública (paso de validación obligatorio, no opcional).
4. **Integración operativa:** datos del POS fiscal existente (para el cierre de día, Parte 3, Sección 5.2), datos de pasarela de pago propia si usa el motor de reservas, idiomas contratados si aplica el add-on multiidioma (Parte 5).

**CONFIRMADO:** "que generemos nosotros los adsets" se refiere únicamente a la Rama B de fotos de producto de arriba — nunca a creatividades publicitarias. Base Operativa **no incluye ni incluirá** generación ni gestión de campañas de publicidad — Alex lo descarta explícitamente por carga operativa (quiere evitar gestión masiva de campañas). La ejecución de ads sigue siendo exclusiva de Experience, y ahí sigue con el mismo criterio ya establecido: campaña acotada, hipergeolocalizada, hipersegmentada, con un tope de aforo bajo (25-50 personas) por fecha puntual — nunca campañas a gran escala. Que el agente de código no infiera ni construya ningún flujo de generación de creatividades publicitarias dentro de Base Operativa.

---

## 6. Base Operativa y Dark Kitchen — pago fraccionado, CONFIRMADO

Aplica a los importes de desarrollo de pago único: Base Operativa (700€) y Dark Kitchen Ruta B (dev fee por marca: 1.200€/960€/840€). No aplica a Experience (tarifas ya demasiado bajas para fraccionar) ni a QR (el 1€ del primer mes ya cumple esa función).

- **Estructura: 2 cuotas, recargo fijo de +50€ sobre el total**, igual en ambos productos. Ejemplo Base Operativa: 375€ + 375€ (750€ total) en vez de 700€ en un pago. Ejemplo Dark Kitchen marca 1: 625€ + 625€ (1.250€ total) en vez de 1.200€.
- El pago único sigue siendo la opción ancla/por defecto en el copy — el fraccionado se muestra como alternativa, nunca como el camino principal, para no diluir el precio de lista.
- **Mecanismo técnico (nota para el agente, no decisión de negocio):** Stripe no tiene una función nativa de "pago a plazos" para España (esa función solo existe en mercados como México, financiada por el emisor de la tarjeta). El camino correcto es guardar el método de pago (`SetupIntent`) en el primer cobro y programar el segundo cobro automáticamente en la fecha fijada.
- **Acceso:** se activa con el primer pago, igual que QR. Si el segundo cobro falla, política de reintento + periodo de gracia antes de suspender cualquier acceso — nunca corte inmediato (conecta directo con la Sección 7).

---

## 7. Activo vs. acceso — reframe CONFIRMADO para Base Operativa y Dark Kitchen

- **Copy:** la cuota mensual se comunica siempre como "infraestructura y mantenimiento", nunca como "acceso al software" o "suscripción" — mismo criterio que ya excluye la palabra "agencia" del copy (Parte 6/documento fuente, Sección 1.1).
- **Garantía de portabilidad de datos:** el cliente puede exportar su menú, catálogo y historial de pedidos en cualquier momento, pague o no — se escribe en el contrato, no solo como política de soporte informal.
- **Periodo de gracia** antes de suspender el acceso por impago (aplica tanto a la cuota mensual recurrente como al fraccionado de la Sección 6) — duración exacta pendiente de definir a nivel de implementación, no es una decisión de negocio bloqueante para el resto de esta parte.
- **Migración/autoalojamiento — CONFIRMADO, escalado por número de marcas:**

  | Caso | Fee de traspaso |
  |---|---|
  | Base Operativa (1 PWA) o Dark Kitchen 1-2 marcas | **150€** |
  | Dark Kitchen 3-5 marcas | **250€** |
  | Dark Kitchen 6+ marcas | **350€** |

  Mismo criterio de tramos que ya usa la cuota mensual de Dark Kitchen (Parte 3, Sección 2.2) — consistencia interna del modelo.
  - **Se comunica siempre como "cuota de traspaso de arquitectura", nunca como penalización de salida** — cubre el trabajo real de empaquetar, documentar y entregar el sistema, no es una tasa disuasoria. Un fee de salida percibido como punitivo genera más daño reputacional que el ingreso que aporta — el importe se mantiene deliberadamente moderado por esta razón.
  - Al ejecutar la migración, DKitchen queda exenta de todo soporte técnico, mantenimiento o garantía sobre esa instancia — requiere firma de descargo de responsabilidad como parte del mismo proceso (vía Signaturit, Sección 8).
  - No es una pérdida de cliente a efectos de negocio — es la venta de un activo que el cliente ya pagó, ahora completamente en sus manos.
  - **Marcas virtuales de Dark Kitchen — IP con licencia aparte, CONFIRMADO:** al migrar, el fee de traspaso de la tabla anterior cubre solo la infraestructura técnica, nunca el nombre/identidad de marca. Si el cliente quiere seguir operando bajo el nombre de una marca virtual de DKitchen (Wing Boss, Santa Brazza, etc.) tras autoalojarse, paga una **licencia de marca aparte de 25€/mes por marca**, recurrente mientras la siga usando — se suma al fee de traspaso, no lo sustituye. Sin esa licencia, el cliente debe rebrandear al migrar.

**Bot de WhatsApp — fuera de la escalera, CONFIRMADO.** No es upsell de ningún peldaño y no tiene precio en esta parte. Se ofrece más adelante como campaña de configuración puntual dirigida a toda la base de clientes ya existente, no como cross-sell embebido en ningún producto — decisión explícita de Alex para no complicar el lanzamiento con un componente adicional.

---

## 8. Tubería común de post-pago — CONFIRMADO, una sola infraestructura para los 4 peldaños de Nivel B

Disparada por el webhook de pago (`checkout.session.completed` o equivalente) en Auditoría, Experience, Base Operativa y Dark Kitchen Ruta B:

1. **Contrato** generado automáticamente (plantilla + datos del cliente + respuestas del formulario de intake), firmado electrónicamente vía **Signaturit** (cumple eIDAS/RGPD, estándar en España para este caso).
2. **Factura** generada automáticamente — factura real de DKitchen Corporate SL a su cliente, compatible Verifactu. No confundir con la regla ya existente de que DKitchen no se convierte en sistema de facturación certificado para las ventas del cliente en su propia PWA (Parte 3, Sección 5.2) — son dos obligaciones fiscales distintas.
3. **Documento de "qué sigue"**, estandarizado por peldaño, enviado por email en el momento del pago.
4. **Ticket interno** en la cola de ejecución para los peldaños que no son instantáneos.

Este es el bloque de infraestructura nueva más grande de toda esta parte — se presupuesta como fase propia, igual que ya se trató el motor de pagos de Experience/QR en el documento fuente.

---

## 9. Impacto en prospección — resumen

- Brief A (Outbound QR) y Brief C (Colocación orgánica) evolucionan hacia enlazar directo a checkout de precio fijo en vez de a "pide tu propuesta personalizada", donde el peldaño ya sea Nivel B (Auditoría, Dark Kitchen Ruta B).
- Brief D (Expansión de cuenta) gana peso relativo: al bajar la fricción de entrada, el tiempo humano de Alex se concentra en empujar a clientes ya dentro hacia el peldaño de arriba, no en cerrar cada venta de entrada una por una.
- Auditoría (297€/47€) se suma a los ganchos de entrada ya existentes (QR 1€ primer mes, Analizador de Rentabilidad gratuito) como palanca de prospección agresiva, con la diferencia deliberada de que esta sí es una venta real de entrada, no un lead magnet gratuito.

---

## 10. Lo que queda para nivel de implementación, no de negocio

Estos puntos no bloquean el resto de esta parte — son detalles que el agente de código o el propio proceso legal deben fijar al construir, no decisiones que Alex necesite tomar ahora:
- Duración exacta del periodo de gracia antes de suspender acceso por impago.
- Número de reintentos automáticos antes de considerar fallido un cobro fraccionado.
- Texto exacto del descargo de responsabilidad de migración/autoalojamiento (requiere redacción legal, no solo de producto).
