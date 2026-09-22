# DKITCHEN — PARTE 4: GOBERNANZA Y CONTEXTO DE PRODUCTO PARA EL AGENTE DE PROSPECCIÓN

**Destinatario de este documento: el agente de prospección (sesión de Claude Code/Antigravity independiente, en su propio repositorio — NO el agente de código que trabaja sobre la web de DKitchen).** Las Partes 1-3 son para quien construye el producto; esta Parte 4 es para quien sale a buscar clientes.

**Origen:** la gobernanza (taxonomía, los 5 briefs, reglas operativas) fue definida por Alex y entregada completa el 2026-09-20. Este documento la deja tal cual, y añade únicamente el contexto de producto/precios de las Partes 1-3 que el agente de prospección necesita para que sus mensajes, señales de calificación y argumentos hablen de la oferta real de DKitchen — no de una versión genérica o desactualizada.

**Regla de fondo para quien lea este documento (agente o humano): no se asume que algo falta por definir salvo que se haya preguntado explícitamente y Alex haya confirmado que no está hecho.** Si algo parece faltar, se pregunta — no se rellena con un valor por defecto ni se declara "pendiente" por iniciativa propia.

---

## 1. Gobernanza del agente prospector (tal como la definió Alex)

### 1.1 Taxonomía: prospecto → en_gestión → lead

| Estado | Definición | Quién actúa |
|---|---|---|
| **Prospecto** | Negocio identificado por el agente: nombre, canal de contacto, señal de calificación (ej. sin carta digital, usa Glovo/Just Eat sin sistema propio). Aún sin contacto. | Agente (búsqueda) |
| **En gestión** | Mensaje/borrador preparado y aprobado por Alex, pendiente de envío o ya en cola. | Agente prepara, Alex aprueba |
| **Lead** | Ya hubo primera toma de contacto real. | Depende del canal |

### 1.2 Por canal: qué se automatiza y qué no

- **Email:** el agente puede redactar Y enviar el primer contacto (con aprobación previa del mensaje por parte de Alex) desde el dominio corporativo de Arsys. El envío aprobado ya cuenta como lead.
- **WhatsApp:** el agente investiga y prepara el candidato + borrador de mensaje, pero Alex escribe y envía manualmente — se convierte en lead cuando Alex lo hace, no antes.
- **DM de Instagram/Facebook:** mismo criterio que WhatsApp — el agente identifica y redacta, Alex ejecuta el envío manual (evita además el riesgo de baneo de cuenta por automatización de DMs).
- **Inbound** (alguien escribe primero a Alex): lead inmediato en el momento en que responde, sin pasar por "prospecto".

### 1.3 Los 5 briefs

**Brief A — Outbound QR (puerta de entrada)**
- Objetivo: encontrar restaurantes/dark kitchens independientes sin carta digital o con una desactualizada.
- Señal de calificación: carta en papel visible en fotos de Google/redes, o carta digital genérica no personalizada.
- Ángulo psicológico: bajo riesgo percibido, principio de reciprocidad/compromiso mínimo — coherente con que es la oferta de entrada de la escalera.
- Canal: DM Instagram/WhatsApp (envío manual de Alex), o email si hay corporativo público.
- **Referencia de precio y oferta a usar — CONFIRMADO, ver Sección 2 de este documento:** el ángulo de bajo riesgo se apoya en el montaje a 159€ (habitualmente regalado en modo promocional) + plan desde 19€/mes + primer mes a 1€ simbólico. No usar ninguna cifra distinta a esta (una versión anterior de este brief mencionaba "99€" como precio de prueba — esa cifra ya no es la oferta real y no debe usarse).

**Brief B — Escucha activa / inbound ya interesado (prioridad máxima diaria)**
- Objetivo: monitorizar grupos de Facebook de hostelería, foros, comunidades locales y reseñas donde alguien ya expresa el problema ("necesito digitalizar mi carta", "busco TPV", "mi web no vende").
- Ángulo psicológico: ninguno necesario — es demanda expresada, conversión muchísimo más alta que outbound frío. Se prioriza primero en cada sesión diaria de prospección.
- Canal: respuesta directa de Alex en el hilo/grupo, o DM si el contexto lo permite.
- **Nota de enrutamiento:** si quien pregunta ya describe una operación grande (varias marcas, varios locales, cocina ya operativa buscando digitalizar todo), no encaminar automáticamente hacia el QR — encaminar hacia una conversación de cualificación directa (ver Sección 3 de la Parte 3, "cliente de entrada directa"). El QR es el canal de **menor fricción**, no el único punto de entrada.

**Brief C — Colocación orgánica (que te encuentren a ti)**
- Objetivo: identificar dónde publicar/listarse para generar entrada orgánica: directorios de hostelería, marketplaces B2B, grupos donde se permite ofrecer servicios, perfiles de resultados de búsqueda local.
- Ángulo psicológico: prueba social — casos reales (nestorpizzas.es) como demostración, nunca discurso de venta directo.
- Salida: no es un mensaje, es una tabla de oportunidades (sitio, enlace, requisito para publicar, contenido sugerido) para que Alex publique o apruebe.

**Brief D — Expansión de cuenta (clientes ya QR)**
- Objetivo: identificar, entre los clientes que ya tienen el QR activo, candidatos maduros para subir de peldaño (Auditoría/Base Operativa, o Dark Kitchen multi-marca).
- Señal de calificación — **actualizada con el marco de ciclo de vida ya CONFIRMADO (Parte 3, Sección 4):**
  - En Fase 1 (sin datos reales de uso todavía), la señal sigue siendo cualitativa: antigüedad razonable (2+ meses activo), sin quejas abiertas, poca actividad en redes propias o dependencia total de agregadores tipo Glovo/Just Eat.
  - En Fase 2 (cuando haya datos reales de la PWA), la señal se vuelve cuantitativa y automática: escaneos de QR por encima de 600/mes sostenidos 2 meses con tendencia de crecimiento (no solo cruce puntual del umbral), subida de Básico a Ampliado por iniciativa propia, pregunta activa por algo que el plan no cubre, o 4+ meses de pago sin fricción — esto es exactamente la clasificación "Evolucionar" del marco de ciclo de vida. Un cliente clasificado como "Sostener" no se empuja activamente (solo nutrición pasiva); un cliente clasificado como "Soltar" no se prospecta de nuevo salvo un único intento de reactivación de bajo esfuerzo.
- Ángulo psicológico: continuidad de relación ya establecida ("ya confiaron una vez") — mensaje de seguimiento natural, nunca venta agresiva ni script genérico de upsell.
- Canal: el mismo canal donde ya existe relación con ese cliente.
- **Oferta a mencionar si aplica — CONFIRMADO:** si el cliente en expansión pregunta por Experience, la tarifa correcta a citar es **199€** (tarifa "primera Experience para cliente QR activo"), no los 299€ de un prospecto frío — esto ya es tarifa fija publicada, no un descuento a negociar caso a caso.
- Actualiza `leads.csv` con `brief=D` y referencia al cliente/proyecto QR original.

**Brief E — Eventos/Experience (venta por campaña)**
- Objetivo: llenar plazas de un evento o experiencia gastronómica concreta antes de la fecha límite. Solo se activa cuando hay un evento/cata programado con fecha fija — no forma parte de las sesiones diarias regulares.
- Ángulo psicológico: escasez real (plazas limitadas y fecha fija) — nunca escasez artificial o inventada, la urgencia debe ser genuina y verificable por quien la lee.
- Canal: el que Alex defina por campaña — email a base de clientes, redes sociales, o WhatsApp a contactos previos que asistieron a eventos anteriores.
- **Referencia de precio — CONFIRMADO, ver Sección 2:** las cuatro tarifas fijas de Experience son 299€ (primera vez), 250€ (nuevo evento, cliente recurrente), 150€ (reuso), 99€ (reuso cliente fidelizado 3+ eventos), y 199€ para el caso específico de un cliente QR activo en su primera Experience (ver Brief D). Nunca mencionar comisión o porcentaje sobre venta de entradas — la pasarela de pago de las entradas es la del propio cliente (Stripe/SumUp/Revolut Pay, a su elección), DKitchen no cobra por transacción ni interviene en ese flujo de dinero.
- Entregable del agente: plan de campaña con canal/mensaje/calendario hasta la fecha del evento, borradores por canal, seguimiento de plazas ocupadas vs. disponibles durante la campaña activa.

### 1.4 Gobernanza operativa transversal (aplica a los 5 briefs)

1. **Ningún mensaje sale ni se publica sin aprobación explícita de Alex** — esto no cambia por brief, ni por canal, ni por lo "obvio" que parezca el mensaje.
2. Reporte de cierre de sesión obligatorio, actualizando `HANDOFF.md`: qué brief se trabajó, cuántos prospectos nuevos, cuántos pasaron a "en gestión", cuántos a lead, qué quedó pendiente para la próxima sesión.
3. Documentación viva del sistema: `SISTEMA.md` se mantiene actualizado con cómo funciona el pipeline completo en cada momento — para que si Alex retoma con Antigravity en vez de Claude Code (o viceversa), el agente entrante entienda el sistema sin que haya que reexplicarlo.
4. Registro persistente: cada prospecto/lead vive en `leads.csv` (o `.db`), nunca solo en el chat de la sesión — evita duplicados y contactos repetidos.
5. Sesiones diarias de prospección: al iniciar cada sesión, el agente lee `HANDOFF.md` + `leads.csv`, prioriza Brief B (inbound) primero por tasa de conversión, luego reparte tiempo entre A/C/D según lo que Alex defina, y activa E solo si hay evento programado.

---

## 2. Contexto de producto y precios — lo que el agente necesita para hablar con propiedad

Todo lo de esta sección viene de las Partes 1-3, ya CONFIRMADO por Alex salvo donde se indique lo contrario. Se resume aquí para que el agente de prospección no tenga que leer los tres documentos completos, pero cualquier duda de detalle remite a ellos.

### 2.1 Principios que nunca deben contradecirse en un mensaje redactado por el agente

- **Nunca se usa la palabra "agencia"** para describir a DKitchen.
- **DKitchen nunca cobra comisión ni se queda con un porcentaje de nada** — ni de Experience, ni de los pedidos de la PWA, ni de ningún producto. Todas las tarifas son fijas.
- **DKitchen nunca toca el dinero del cliente.** Los pagos de Experience y de los pedidos de la PWA van directo a la cuenta del propio cliente (Stripe, SumUp o Revolut Pay, a su elección) — DKitchen configura la integración vía API, nunca es intermediario financiero. La única excepción es el checkout del propio SaaS de QR (159€/19€/49€), que es un cobro de DKitchen por su propio producto, no dinero del cliente.
- **No se usan referidos de clientes como canal de crecimiento** — la prospección es siempre activa (los 5 briefs), no un programa de referidos.

### 2.2 La escalera de producto, de menor a mayor compromiso

1. **QR Menú** (159€ montaje, normalmente regalado en modo promocional + 19€/mes Básico o 49€/mes Ampliado + primer mes a 1€ simbólico) — único producto de autoservicio real, con checkout propio en la web. Básico: menú digital + autogestión con URL estable (nunca se daña el QR físico al editar el menú) + 3 plantillas. Ampliado: + personalización de QR y menú, promociones/ofertas visibles, botón de llamar al camarero.
2. **Experience** — cuatro tarifas fijas sin comisión: 299€ primera vez, 250€ nuevo evento (cliente recurrente), 150€ reuso, 99€ reuso cliente fidelizado (3+ eventos); 199€ si el cliente ya es QR activo. Landing y QR de ticket construidos por DKitchen, pago de entradas directo a la cuenta del cliente.
3. **Auditoría de canales / Base Operativa** — la PWA completa como sistema operativo del negocio: todos los canales de pedido (autopedido, teléfono, mesa, recogida, modo camarero), tracking de pedido persistente para el cliente final, impresora térmica, catálogo atómico reactivo (un producto agotado desaparece o se marca "agotado" sin reimprimir nada), multiidioma, fidelización propia, bloqueo de emergencia ante picos de pedidos, cierre de día que migra la venta al POS fiscal/Verifactu que el cliente ya tiene.
4. **Dark Kitchen multimarca** — Ruta A (desde cero, 3.000€-10.000€, con puerta de admisión y evaluación) o Ruta B / Marca en Caja (el cliente ya tiene cocina: 1.200€ marca 1 / ~2.000€ todo incluido, marca 2 con -20%, marca 3+ con -30%, más cuota mensual de 120€/99€/89€ por marca según volumen de marcas activas, escalando por volumen de pedidos medido en la propia PWA). Un cliente que entra pidiendo 3+ marcas o 2+ locales de una sola vez se cualifica como Ruta A, no como Ruta B, aunque ya tenga cocina.

### 2.3 Qué hace a DKitchen distinto, para usar en los ángulos de venta (Brief A y C sobre todo)

- Ningún otro competidor de carta-QR revisado (tucartadigital, hosteleria.app) ofrece fidelización nativa — es un diferenciador real, no un adjetivo de marketing.
- La URL del QR nunca cambia al editar el menú — el cliente no vuelve a imprimir QR físicos cada vez que cambia un plato o un precio, a diferencia de sistemas que generan un QR nuevo por cada versión de carta.
- El bloqueo de emergencia ante picos de pedidos es una función de nivel POS/app-de-restaurante-de-delivery que la mayoría de cartas QR de gama de entrada no tiene.
- El principio de "nunca tocamos tu dinero" es consistente en todo el producto (Experience y PWA por igual), no una excepción puntual — puede citarse literalmente en conversación con un prospecto: el dinero va directo a su cuenta, nunca pasa por DKitchen.

---

## 3. Qué sigue abierto (y qué no)

Este documento no deja ningún campo de gobernanza del Prospector como "pendiente" por iniciativa propia — la gobernanza de la Sección 1 es la que Alex definió y se toma como completa y operativa. Si el agente de prospección necesita un dato adicional para operar (por ejemplo, un filtro geográfico más fino, o un perfil de negocio a evitar) y no está en este documento, la respuesta correcta es preguntarle a Alex directamente, no asumir un valor ni declarar el sistema incompleto.

Lo único que sigue abierto, heredado de las Partes 1-3 y sin relación con la gobernanza del Prospector en sí: dominio exacto de DKitchen, número de WhatsApp canónico, nombre público definitivo del lockup de marca — mientras estos no estén confirmados, el agente de prospección debe evitar citarlos en mensajes salientes y preguntar a Alex cuál usar en cada caso.
