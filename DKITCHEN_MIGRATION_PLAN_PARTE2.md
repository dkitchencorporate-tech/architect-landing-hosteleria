# DKITCHEN — PARTE 2: RESPUESTAS DEFINITIVAS, MOTOR DE QR, ORQUESTACIÓN DE EXPERIENCE E INGENIERÍA DE PSICO-MARKETING

**Complementa a:** `DKITCHEN_MIGRATION_PLAN.md` (Parte 1) y se consolida junto con `DKITCHEN_MIGRATION_PLAN_PARTE3.md` (Parte 3). No la sustituye — de los bloqueantes de la Parte 1, la cuota mensual por marca en Dark Kitchen multimarca **ya se resolvió en la Parte 3, Sección 2**; dominio exacto y número de WhatsApp canónico **siguen abiertos**.
**Naturaleza de este documento:** este documento cierra decisiones de diseño y de producto que en la Parte 1 quedaron como preguntas abiertas. Donde doy una cifra que Alex no ha confirmado explícitamente en conversación, la marco como **PROPUESTA** (mi recomendación como asesor, con la lógica detrás) — no como un hecho ya decidido. El agente de código debe tratar "PROPUESTA" y "CONFIRMADO" como estados distintos.

---

## 1. Las cuatro preguntas, respondidas una por una

### 1.1 — Precio/modelo de Experience bajo "alquiler de arquitectura digital"

> **Corrección respecto a la primera versión de este documento:** la versión anterior de esta sección proponía que DKitchen se quedara con una comisión del 10% sobre la venta de entradas. **Esto queda descartado — Alex lo corrigió explícitamente.** DKitchen no gestiona dinero de terceros, no se queda con porcentaje alguno, y no se compromete con ningún resultado. Lo que sigue es el modelo correcto.

**Qué es exactamente el entregable de Experience:** un evento **ya definido y entregado una sola vez** (no algo que se negocia desde cero en cada conversación). La base son los **7 formatos de evento**, cada uno emparejado con una de las marcas/menús digitales ya desarrollados (ver 5.2 para el listado), más la opción de que el cliente use su propia gastronomía en un formato híbrido. El paquete que se entrega incluye:
- Guía de desarrollo del evento (cómo se monta, paso a paso).
- Procesos operativos (qué hacer antes, durante y después).
- Brief del evento (el documento de venta/concepto, como el ya usado en el caso Alhambra).
- Piezas de marketing digital y físico (creatividades para redes, diseño de flyer).
- Gestión de la campaña de ads (Meta/Google) — ejecutada por DKitchen, pagada por el dueño del local.
- Landing de venta directa de entradas, configurada con pasarela de pago.

**El punto crítico que corrige el modelo anterior — de quién es la pasarela de pago:** la landing la construye y configura DKitchen, pero la **cuenta de cobro (Stripe o SumUp) es del propio dueño del local**, no de DKitchen. El cliente abre su propia cuenta (configuración rápida, de minutos) y DKitchen conecta la landing a esa cuenta. El dinero de cada entrada cae directo en la cuenta del cliente. **DKitchen nunca toca el dinero, nunca ve un euro de comisión sobre ventas, y no figura como intermediario financiero.** Esto además evita un problema regulatorio real: en la UE, gestionar fondos de terceros de forma recurrente puede acercarte a obligaciones de entidad de pago (PSD2); no tocar el dinero en ningún momento elimina esa fricción de raíz, no solo la fricción comercial de "no queremos parecer Growth otra vez".

**El modelo de precio es de CUATRO tarifas fijas, sin ningún componente variable — CONFIRMADO por Alex, no es una propuesta:**

| Tarifa | Cuándo aplica | Qué cubre | Precio |
|---|---|---|---|
| **Primera vez** | Cliente nuevo, cualquiera de los 7 formatos | Definición del evento, guía de desarrollo, brief, piezas de marketing digital y físico, configuración de la landing + conexión a la pasarela propia del cliente, gestión de la primera campaña de ads | **299€** |
| **Reuso** | El cliente repite exactamente el mismo evento ya construido (mismo formato, misma landing) | Nueva fecha, reactivación de la landing existente, gestión de la campaña de ads de esa edición | **150€** |
| **Nuevo evento** | Cliente recurrente que quiere un formato distinto (otro de los 7, o uno a medida) al que ya tiene construido | Definición del nuevo formato, nueva landing, nuevo brief y piezas — pero ya sobre una relación y una cuenta de pago ya configuradas, por eso cuesta menos que la primera vez | **250€** |
| **Reuso — cliente fidelizado** | El cliente ya ha hecho **más de 2 eventos** con DKitchen (en cualquier combinación de formatos) | Reactivación puntual de un evento ya construido — a este nivel de recurrencia, todo el trabajo pesado ya está amortizado y es solo activación | **99€** |

**Por qué esta escalera de 4 precios es el diseño correcto:** cada tarifa premia exactamente lo que hay que premiar. La primera vez (299€) es la más cara porque es la única que incluye trabajo real de definición y construcción desde cero. Reusar el mismo evento (150€) es barato porque no hay nada que rediseñar, solo reactivar. Un formato nuevo para un cliente que ya confía en el sistema (250€) cuesta menos que la primera vez porque ya existe la relación, la cuenta de pago conectada y el conocimiento del negocio, pero sigue siendo trabajo de construcción real, así que no baja al nivel de un simple reuso. Y el reuso a partir del tercer evento (99€) es, en palabras de Alex, el método de acceso "más fuerte y agresivo a bajo costo": a ese nivel de recurrencia, cobrar casi de forma simbólica por reactivar mantiene al cliente dentro del sistema de forma constante, sin que el precio sea nunca la razón para no repetir.

**El presupuesto de ads sigue siendo del dueño del local**, igual que en la Parte 1 — DKitchen nunca pone capital de marketing propio, en ninguna de las cuatro tarifas.

**Si el cliente quiere que la landing sea suya (no "alquilada"), esto deja de ser Experience y se convierte en otro producto:** un desarrollo llave en mano con diseño de autor que integra el sistema de eventos dentro de la digitalización completa de su negocio — es decir, se fusiona con el peldaño de Base Operativa (o una variante superior de él), como una pieza más de una PWA 100% propia. El precio de esa variante no se fija aquí porque, por definición, es a medida — se cotiza como cualquier desarrollo bespoke, no con una tarifa de catálogo. Esto además refuerza la lógica de la escalera: Experience (alquilado, barato de repetir) es la puerta de entrada; Base Operativa (propio, a medida) es adonde se sube cuando el cliente quiere dejar de depender de que DKitchen "encienda" el sistema cada vez.

**Estos cuatro precios (299€ / 150€ / 250€ / 99€) están CONFIRMADOS por Alex — el agente puede publicarlos y programarlos como definitivos**, no como propuesta pendiente de validación.

### 1.2 — Pasarela de pago + generación de QR post-pago para Experience: ¿existe o es nueva?

**Confirmado por el repositorio: NO existe. Es una funcionalidad nueva que hay que construir en esta misma tanda, no un cambio cosmético.**

Evidencia encontrada en la auditoría:
- `src/components/sections/EventLibraryHook.tsx` (línea 223) **ya describe** el concepto en el copy de marketing: *"Taquilla Transparente: La entrada se vende a través de una pasarela online propia. El comensal paga por adelantado y recibe un código QR. Tú solo escaneas en puerta."* — es decir, el sitio ya le promete esto al visitante.
- Pero `src/app/manuals/mapa-navegacion/page.tsx` (línea 56) dice explícitamente, en la documentación interna: *"Overview de Sistema... Métricas globales de facturación (**Pendiente de conexión futura con pasarela de pagos**)."*
- No hay ninguna dependencia de Stripe, Redsys, ni ningún SDK de pago instalada en el proyecto (`package.json` no la tiene, y no hay ningún archivo `api/` relacionado con webhooks de pago o creación de sesiones de checkout).
- Lo que sí existe es un generador de QR **estático** en `LiveDemoCTA.tsx`, pero apunta a una URL fija de demo (`hosteleria.architectsys.com/demo/carta`) usando el servicio externo `api.qrserver.com` — sirve como demo de la carta, no como motor de generación de tickets.

**Conclusión operativa:** el evento real (Alhambra) que ya se vendió con pasarela de pago **se hizo por fuera del código de este repositorio** (casi con toda seguridad con un enlace de pago genérico de Stripe, gestionado manualmente). Eso probó que el modelo funciona comercialmente — pero técnicamente no hay nada reutilizable en el repo todavía.

**Alcance real de lo que hay que construir (Fase nueva, ver Sección 8 más abajo) — corregido: la pasarela es del cliente, no de DKitchen (ver 1.1):**
1. Una landing por evento (no genérica) que muestre el evento, el precio de la entrada, y el botón de pago — con un panel de configuración donde se pega la clave/enlace de la cuenta de Stripe o SumUp **del cliente** (no una cuenta central de DKitchen). Cada evento de cada local cobra en la cuenta de ese local.
2. Un webhook o mecanismo de confirmación que, al confirmarse el pago en la cuenta del cliente, genere un código QR único por entrada/asistente (no reutilizable), lo asocie a esa venta en base de datos, y lo envíe al comprador (email o WhatsApp). Con Stripe esto es un webhook estándar de `checkout.session.completed`; con SumUp depende de qué API exponga la cuenta del cliente — hay que validar caso a caso, porque SumUp está más orientado a cobro presencial que a checkout online, así que Stripe debería ser la opción por defecto que se le recomienda al cliente salvo que ya use SumUp por otro motivo.
3. Una vista de validación en puerta (puede ser tan simple como una página `/admin/eventos/[id]/checkin` con lector de cámara del móvil) donde el equipo del local marca cada QR como "usado" al escanearlo, para que no se pueda reutilizar.
4. Un panel simple donde DKitchen (no el cliente) reactiva un evento ya construido para una nueva fecha (el "alquiler" de la Sección 1.1) sin tener que rehacer la landing desde cero.

Esto es una **feature de producto real**, con su propio modelo de datos (tabla `event_tickets` o similar: id, event_id, buyer_name, buyer_contact, qr_code, status [`valid`/`used`], purchased_at) y una tabla de configuración por evento/local que guarda a qué cuenta de pago del cliente está conectada esa landing — no una plantilla de copy. El agente debe presupuestar tiempo de desarrollo para esto como lo haría para cualquier feature nueva, no tratarlo como parte del lote de cambios de identidad.

### 1.3 — Mapa de páginas exacto

**Recomendación: una página por producto principal, con las dos rutas de Dark Kitchen como secciones dentro de la misma página, no como páginas separadas.**

```
/                    → Inicio (landing general, resumen de toda la escalera, CTA hacia cada producto)
/qr                  → QR Menú (peldaño 1)
/experience          → DKitchen Experience (peldaño 2) — incluye el listado/catálogo de eventos posibles
/auditoria           → Auditoría de canales externos (peldaño 3)
/base-operativa      → Digitalización personalizada (peldaño 4) — incluye auditorías + bonus + demo en vivo (Sección 6)
/dark-kitchen         → Dark Kitchen multimarca (peldaño 4b)
                        ├─ Sección "Empezar desde cero" (Ruta A — reutiliza DarkKitchen.tsx + EnterpriseModal.tsx)
                        └─ Sección "Ya tengo cocina, quiero sumar marca" (Ruta B — Marca en Caja, nuevo)
/marcas              → Catálogo público de las 6 marcas virtuales (activo de venta, ver Parte 1 Sección 5)
/demo/carta          → Demo en vivo de la carta interactiva (se mantiene, ver Sección 6)
/privacy /terms /data-deletion → legal (se mantienen, solo cambia el contenido de identidad)
/manuals/*           → documentación interna, no debe estar en el nav público
```

**Por qué una sola página para Dark Kitchen y no dos:** las dos rutas no son dos productos distintos — son dos puntos de partida distintos hacia el mismo resultado (más marcas operando bajo tu gestión). Separarlas en dos páginas fragmenta el SEO de una palabra clave que ya es de por sí nicho ("dark kitchen multimarca"), y duplica navegación para un visitante que a veces no sabe todavía en qué situación está hasta que lee la página. La solución intermedia correcta es lo que ya usa parcialmente `EnterpriseModal.tsx` hoy: un selector claro arriba de la página ("¿Partes de cero o ya tienes cocina operativa?") que lleva a cada sección — no dos URLs distintas.

**Nota de navegación:** cada página de producto debe tener, al final, un bloque "¿Qué sigue después de esto?" que enlace al siguiente peldaño lógico de la escalera (QR → Experience → Auditoría → Base → Dark Kitchen), para que la estructura de páginas separadas no rompa la sensación de recorrido/escalera que sí tenía la página única de scroll actual.

### 1.4 — "Menú flotante": ¿barra fija o burbuja?

Interpretación y recomendación explícita, para que el agente no tenga que adivinar: son **dos elementos distintos, y se recomienda construir ambos, porque no compiten entre sí:**

1. **Barra de navegación superior fija (sticky nav bar)** — esto es lo que normalmente se entiende por "menú" en un sitio web y es lo que recomiendo como elemento principal. Se queda fija en la parte superior al hacer scroll, con: logo DKitchen a la izquierda, enlaces a cada peldaño de la escalera al centro (Inicio / QR / Experience / Auditoría / Base Operativa / Dark Kitchen), y un botón de CTA a la derecha ("Hablar por WhatsApp" o "Reservar demo"). En móvil colapsa a un menú hamburguesa. Esto es necesario ahora que el sitio pasa de una sola página con scroll a varias páginas — sin esto, el visitante se pierde entre páginas.
2. **Botón flotante tipo burbuja (floating action button)** — un botón circular fijo en la esquina inferior derecha, visible en todo momento independientemente del scroll, que abre directamente el WhatsApp (`wa.me/...`). Esto ya existe *de facto* como patrón en el sitio (los CTAs actuales ya apuntan a WhatsApp repetidamente), pero no como burbuja flotante persistente — hoy son botones dentro del flujo de la página. Añadir la burbuja es una mejora, no una sustitución de la barra.

**Si Alex se refería solo a uno de los dos**, lo más probable por el contexto ("que se mantiene visible al hacer scroll") es la barra superior fija — constrúyela primero si hay que priorizar, y la burbuja como mejora secundaria.

---

## 2. El motor de generación de QR (QR Engine)

Hay que distinguir con claridad **dos motores de QR distintos**, porque se confunden fácilmente y son técnicamente diferentes:

### 2.1 QR de Carta (peldaño 1 — QR Menú)
- **Un solo QR por cliente, para siempre.** El QR codifica una URL **estable** de tipo `dkitchen.[dominio]/m/{slug-del-restaurante}` (o el patrón de dominio corto que se defina). Esa URL nunca cambia.
- Detrás de esa URL, un lookup en Supabase resuelve el `slug` al restaurante correspondiente y renderiza su carta en vivo.
- **Esto es lo que permite el panel de administración:** el cliente (o DKitchen en su nombre) edita platos, precios, fotos y disponibilidad desde un dashboard (`/dashboard/carta` o equivalente), y esos cambios se reflejan al instante para cualquiera que escanee el QR **sin que el QR físico impreso deje de funcionar nunca**. Esta es la promesa comercial clave del producto: "imprime una vez, cambia la carta las veces que quieras."
- Consecuencia técnica: el QR nunca debe generarse apuntando directamente a datos (nunca codificar el menú en el propio QR) — siempre apunta a un identificador estable que resuelve contra una base de datos editable.
- **Diferenciador frente a la competencia gratuita:** muchos generadores de QR gratuitos (el tipo de herramienta detrás de ofertas "100% gratis para siempre" como las mencionadas en la Sección 3.2) codifican la URL de una plantilla o versión concreta del menú, o dependen de acortadores de enlace atados a un plan/plantilla específicos — por eso, cuando el negocio quiere cambiar de plantilla, de plan o reestructurar la carta a fondo, terminan teniendo que generar (y reimprimir) un QR nuevo. En la arquitectura de DKitchen esto no puede pasar nunca, porque el QR nunca depende de una plantilla ni de un plan: apunta siempre al mismo `slug` estable, indistintamente de cuántas veces cambie el contenido, el diseño o incluso el plan de suscripción del cliente. Esto hay que decirlo así de explícito en el copy de venta: "el QR que imprimes hoy es el único que vas a necesitar — nosotros no te obligamos a reimprimir nunca por cambiar tu carta."

### 2.2 Autogestión: generación automática, sin trabajo manual de DKitchen por cada cliente nuevo

El motor de QR debe funcionar como un flujo de autoservicio, no como una tarea manual que Alex ejecuta cada vez que entra un cliente nuevo — esto es lo que permite escalar sin que cada QR Menú vendido consuma tiempo operativo:
1. El cliente (o DKitchen en su nombre, durante el proceso de venta) completa un formulario mínimo: nombre del negocio, `slug` deseado (con validación automática de que no esté ya en uso), logo.
2. El sistema crea automáticamente el registro en Supabase, genera el `slug`, y renderiza al instante tanto la carta vacía/plantilla como el QR correspondiente — sin intervención manual de nadie.
3. El QR queda disponible para descarga inmediata (PNG para digital, SVG para impresión — ver 2.3) desde el propio panel del cliente, y también debe poder generarse desde el panel interno de DKitchen (`/admin-architect`) para los casos en que Alex lo genera él mismo durante una venta presencial con flyer.
4. Este flujo de autogestión es, además, lo que hace viable el "formato agresivo de regalo" de la Sección 3.3: activar un cliente nuevo debe tardar minutos, no una tarea de desarrollo por cliente.

### 2.2-bis Compra directa con checkout propio — CONFIRMADO por Alex: el QR Menú es el primer producto 100% de autoservicio

Esto es una decisión de alcance importante que cambia cómo se construye este peldaño frente a todos los demás: **el QR Menú va a ser, inicialmente, el único producto de toda la escalera con compra directa desde la propia web, sin que Alex intervenga en la venta.** El resto de peldaños (Experience, Auditoría, Base Operativa, Dark Kitchen) siguen siendo procesos de venta consultiva/manual — solo el QR Menú se vende solo.

**Flujo exacto, de principio a fin:**
1. El visitante llega a la página `/qr`, ve el pricing (Básico 9€/mes, Ampliado 25€/mes — precios revisados en la Parte 11) y pulsa comprar.
2. Checkout integrado en la propia web de DKitchen (Stripe Checkout es la opción estándar aquí también — a diferencia de Experience, en este caso **la cuenta de cobro sí es de DKitchen**, porque es DKitchen quien vende su propio producto SaaS, no un evento de un tercero). Se captura el método de pago junto con el alta.
3. Al confirmarse el pago (webhook `checkout.session.completed` o equivalente), el sistema, sin intervención humana:
   - Crea el registro del cliente.
   - Crea su acceso al panel de administración.
   - Genera el menú digital (vacío/plantilla, listo para que el cliente cargue sus platos) sobre una de las 3 plantillas.
   - Genera el QR correspondiente al `slug` de ese cliente, ya descargable.
4. Desde dentro del propio panel de administración, aparece un **selector de impresiones para QR físico** — el cliente puede pedir directamente sus QR en papel, vinilo, metacrilato o atril (Sección 4), con precios mostrados ahí mismo, como una compra adicional de pago único, separada de la cuota mensual.

**Por qué esto importa para el agente de código:** este flujo convierte al QR Menú en el único producto que necesita un checkout completo, un webhook de aprovisionamiento automático, y un sistema de auto-registro — es, con diferencia, la pieza de mayor complejidad técnica nueva de todo el peldaño 1 (más que el propio motor de QR). Hay que presupuestarlo como tal, no como una simple landing con formulario de contacto.
### 2.3 Desglose exacto por plan — CONFIRMADO por Alex

> **REVISADO en la Parte 11 (`DKITCHEN_MIGRATION_PLAN_PARTE11.md`):** tras el análisis competitivo de la Parte 10 (banda real de mercado en QR digital: 4-12€/mes), Alex bajó el precio de ambos planes. **Básico: 19€ → 9€/mes. Ampliado: 49€ → 25€/mes.** Estas cifras sustituyen a las de esta sección en cualquier punto donde entren en conflicto — ver Parte 11 para el razonamiento completo y para el estado (pendiente de una decisión más) del paquete de funciones nuevas solicitado para Ampliado (sync Google Business, motor de reservas, botón de reseñas).

**Plan Básico — 9€/mes:**
- Menú digital (sobre una de las 3 plantillas fijas — Sección 2.3-bis).
- Autogestión: el cliente edita productos/precios/fotos vía el panel, sin que la URL del QR se vea afectada nunca (arquitectura de `slug` estable, Sección 2.1).
- QR de acceso genérico (sin personalización de marca en esta capa — el nivel de personalización de QR es un desbloqueable del plan Ampliado, ver abajo).

**Plan Ampliado — 25€/mes** (precio revisado en la Parte 11; ver nota arriba): todo lo del Básico, más:
- Personalización del QR (logo, color, marco — las capacidades técnicas descritas en 2.3-bis).
- Personalización adicional del menú (más allá de elegir entre las 3 plantillas — el alcance exacto de "más" queda a definir sobre la marcha, según palabras de Alex, y no es necesario cerrarlo antes de programar la base).
- Promociones y ofertas visibles para el cliente final en el propio menú digital.
- Botón de "llamar al camarero".
- **CONFIRMADO en la Parte 11 — absorción total, sin coste adicional:** sincronización con Google Business Profile, motor de reservas (mismo diseño ya especificado en la Parte 3, Sección 4: tope bajo de reservas/mes, sin gestión de mesas ni multiusuario) y botón de reseñas. Estas tres funciones quedan incluidas en el plan Ampliado a 25€/mes — **la antigua tarifa puente de "+10€ sobre Ampliado" (59€/mes total) queda retirada, absorbida dentro de este precio.** Alex asumió conscientemente que esto reduce el paquete completo de 59€ a 25€/mes porque prioriza la competitividad de entrada (Parte 11, Sección 6.1) sobre mantener ese upsell concreto.
- **Alex ha cerrado explícitamente esta lista como suficiente para empezar** ("alguno que otro detalle más, pero eso ya se gestiona sobre la marcha") — el agente no necesita más detalle que este para programar la primera versión del plan Ampliado; los extras menores se añaden de forma iterativa, no son un bloqueante de lanzamiento.
- **Lo único que sigue sin número cerrado:** el tope de productos por plan (cuántos platos caben en Básico vs. Ampliado) — Alex no lo ha fijado todavía, y sigue siendo el único punto realmente abierto de esta sección.

### 2.3-bis Motor técnico de personalización del QR (capacidad del plan Ampliado)

Hoy el único generador de QR que existe en el repositorio (`LiveDemoCTA.tsx`) usa un servicio externo genérico (`api.qrserver.com`) que produce un QR plano, sin marca, sin logo. El motor de generación debe construirse en el propio proyecto (no depender de un servicio externo básico), con estas capacidades, activas solo para clientes del plan Ampliado:
- **Nivel de corrección de errores alto (nivel H)** — permite superponer un logo en el centro sin que el código deje de ser escaneable.
- **Logo embebido** del negocio en el centro del QR.
- **Color de marca** en los módulos del QR en vez del negro plano por defecto (que es lo que ve un cliente del plan Básico).
- **Exportación en SVG** (vectorial), no solo PNG — imprescindible para que el QR se vea nítido tanto en una pegatina pequeña como en un soporte de metacrilato grande (Sección 4), sin pixelarse.
- **Marco/CTA visual** alrededor del QR (ej. "Escanea para ver el menú" con una flecha o icono).

**Carta digital — 3 plantillas fijas, para ambos planes:**
El menú digital que se abre al escanear se sirve sobre **un máximo de 3 plantillas fijas** (variaciones de layout/paleta ya diseñadas por DKitchen de antemano) — no hay diseño desde cero por cliente en este peldaño, en ninguno de los dos planes. Esto mantiene el coste de producción bajo control a un precio de 9-25€/mes (revisado en la Parte 11), y es coherente con por qué ese precio puede ser "casi ridículo" (Sección 3.2): no hay trabajo de diseño recurrente por cliente, solo elección de plantilla + carga de datos. Esto es, deliberadamente, lo que separa "barato y templado" (QR Menú) de "caro y a medida" (Base Operativa, diseño 100% de autor) — la frontera tiene que quedar nítida, o el cliente de 19€/mes nunca entiende por qué el de 700€ vale lo que vale.

Esta combinación (QR genérico en Básico → QR de marca + más personalización + promociones + llamar al camarero en Ampliado, sobre plantilla templada en ambos casos) es, junto con la estabilidad del `slug` (2.1), lo que justifica que el QR de DKitchen no compita por precio contra un generador gratuito: tiene panel de gestión serio y una ruta de mejora clara (Básico → Ampliado → todo el resto de la escalera).

### 2.4 QR de Ticket (peldaño 2 — Experience)
- **Un QR único, de un solo uso, por cada entrada vendida.** No es el mismo mecanismo que el QR de carta.
- Se genera dinámicamente en el momento en que se confirma el pago (webhook de la pasarela), no antes.
- Codifica un identificador único de esa venta concreta (no una URL de contenido navegable, sino un código que solo tiene sentido dentro del sistema de validación en puerta).
- Al escanearse en la entrada del evento, el sistema lo marca como `usado` — si alguien intenta reutilizar una captura de pantalla del mismo QR, el segundo escaneo debe rechazarse.
- Este motor **no existe todavía** (ver 1.2) — se construye junto con la pasarela de pago de Experience.
- **Riesgo operativo a documentar (no descubierto por intuición, sino por el propio patrón de mercado de este tipo de sistemas):** en cualquier motor de QR con redirección dinámica, todo QR impreso ya en manos de un cliente depende de que el servidor de redirección esté vivo — si ese servicio cae, **todos** los QR de **todos** los clientes dejan de funcionar al mismo tiempo, no solo el de uno. Es un punto único de fallo centralizado, a diferencia de un QR estático de toda la vida. Esto no cambia la arquitectura recomendada (sigue siendo la correcta), pero sí exige que el agente trate la disponibilidad de ese endpoint de resolución de `slug` como crítica — con el stack ya usado (Vercel + Supabase) el riesgo es bajo, pero conviene un chequeo de salud/alerta básico, no darlo por sentado.

### 2.5 Análisis del modelo que propone Alex, y recomendación

**El modelo que planteas (159€ de montaje gratis en oferta + 9€/25€ mensual, revisado en la Parte 11 + máximo 3 plantillas de carta + personalización solo del QR + panel simple con feature-gating) es sólido, y no le cambiaría la estructura.** Lo que hace bien, de forma explícita:
- Separa con claridad qué es "barato y templado" (QR Menú) de qué es "caro y a medida" (Base Operativa) — limitar la carta a 3 plantillas es la decisión correcta para que esa frontera no se difumine; si se permitiera diseño libre aquí, un cliente de 19€/mes esperaría el mismo nivel de atención que uno de 700€, y eso rompe la escalera entera.
- El feature-gating (Básico vs. Ampliado) es el mecanismo estándar de conversión en SaaS de bajo ticket — funciona porque el cliente ya está dentro del sistema y ve lo que se desbloquea, no porque se le convenza en abstracto.
- Regalar siempre el montaje pero no siempre la cuota mensual es la combinación correcta de agresividad con ancla de compromiso (ya lo señalo en 3.3).

**Dos puntos donde recomendaría cerrar más el modelo antes de que el agente programe, no cambiarlo de fondo:**
1. **Definir un número concreto de productos para cada plan**, no dejar "más productos" como algo abierto — por ejemplo, un tope de referencia como "hasta 20 platos en Básico, sin tope (o un tope alto, ej. 60) en Ampliado". Sin un número, el agente no puede poner un límite real en el código ni en el copy de venta, y un límite ambiguo es más difícil de defender ante un cliente que pregunta "¿cuántos productos puedo poner?".
2. **Cerrar la lista exacta de funcionalidades del plan Ampliado más allá de "llamar al camarero"**, aunque sea con solo una o dos más — un "algún par de funcionalidades más" sin nombrar cuáles obliga al agente a adivinar qué construir. No hace falta una lista larga, con 2-3 nombradas ya es suficiente para programar.

**No veo una alternativa de modelo que recomendaría por encima de esta** — el diseño ya resuelve el problema real (competir contra gratis sin regalar la diferenciación con Base Operativa), así que mi recomendación es cerrar esos dos puntos concretos, no rediseñar la estructura.

---

## 3. El QR como "ticket de entrada recurrente" y el formato agresivo de regalo

### 3.1 Filosofía: el QR Menú no es "un producto", es la llave que abre la relación

El QR Menú a 159€ (montaje, normalmente regalado) + 19-50€/mes **no se vende para generar el grueso de la facturación** — se vende para poner a DKitchen dentro del negocio del cliente con la menor fricción posible, y desde ahí, vender los peldaños siguientes (Experience, Auditoría, Base, Dark Kitchen). Es, literalmente, un "ticket de entrada recurrente" para DKitchen: cada cuota mensual que entra no es el objetivo, es el recordatorio mensual de que DKitchen sigue presente en ese negocio y sigue teniendo la puerta abierta para ofrecer el siguiente peldaño.

### 3.2 Inteligencia competitiva — por qué el precio del QR, por sí solo, no puede ser el argumento de venta

Investigación externa confirma algo que hay que afrontar de frente, no ignorar: **ya existen competidores que regalan la carta QR para siempre**, no solo el primer mes:
- [tucartadigital.com](https://tucartadigital.com/) ofrece una carta QR "100% gratuita" de forma permanente, con platos ilimitados, financiada por publicidad dentro de la carta; su plan premium para quitar la publicidad cuesta solo 5,95€/mes.
- [hosteleria.app](https://hosteleria.app/) se posiciona igual: "Carta Digital para tu Restaurante GRATIS con QR."

Esto significa que si DKitchen compite en el mensaje "carta QR barata", pierde contra un competidor que literalmente no cobra nada. **La conclusión estratégica es que el QR de DKitchen no se puede vender por el precio — se vende por lo que hay detrás:** sin publicidad ajena contaminando la carta del cliente, con diseño de conversión (no una plantilla genérica), con un ser humano real detrás (no un SaaS de autoservicio), y como puerta de entrada a un ecosistema completo (Experience, Auditoría, Base, Dark Kitchen) que ningún competidor de carta-QR-gratis ofrece. El copy y el discurso del bot deben evitar competir en "barato" y competir en "ya viene con un plan detrás, no es una herramienta suelta".

**El segundo argumento, más técnico y más difícil de rebatir, es el de la Sección 2.1: el QR nunca caduca ni necesita reimprimirse.** Un generador gratuito genérico suele atar el QR a una plantilla o a un plan concreto — el día que el negocio quiere cambiar de diseño de carta, ampliar el plan, o simplemente reestructurar el menú a fondo, muchos de esos sistemas obligan a generar (y volver a imprimir) un QR nuevo. Con la arquitectura de DKitchen (Sección 2.1) esto no ocurre nunca: el QR apunta siempre al mismo `slug` estable, cambie lo que cambie por detrás. Este argumento se usa en el discurso de venta como algo verificable ("pruébalo tú mismo: cambia tu carta y comprueba si tu QR actual sigue sirviendo"), no como una afirmación genérica de superioridad.

### 3.3 El formato agresivo de entrada — corregido: prueba de 1€, no un mes gratis

> **Corrección de Alex:** se descarta el mes gratis como mecánica de entrada. En su lugar, **prueba de 1€ el primer mes**, con tarjeta registrada desde el momento de la compra (Sección 2.2-bis). Los impresos físicos nunca están incluidos en esta prueba — siempre son coste aparte (Sección 4).

**Por qué esto convierte mejor que "gratis" (y no es solo una preferencia estética):** pedir la tarjeta desde el minuto uno y cobrar un importe simbólico, en vez de regalar el acceso, hace dos cosas que "gratis" no hace. Primero, ancla el producto por encima de cero — un servicio que cuesta 1€, aunque sea simbólico, se percibe como algo con valor real, mientras que "gratis" se percibe con el mismo valor que la competencia que regala la carta QR para siempre (Sección 3.2). Segundo, y más importante para la conversión real: al tener la tarjeta ya registrada, el paso al precio completo (19€ o 49€, según el plan elegido) el mes siguiente **es automático, no una decisión que el cliente tiene que tomar activamente** — pasa de "decidir si empiezo a pagar" (fricción alta, el cliente tiene que actuar) a "decidir si cancelo" (fricción baja para seguir siendo cliente, es el propio sistema el que asume la continuidad salvo que el cliente cancele). Este es el mismo principio que usan la inmensa mayoría de las pruebas de pago simbólico en SaaS de suscripción — es un patrón de conversión probado, no una apuesta.

Mecánica recomendada, con la lógica psicológica detrás de cada pieza:

- **Oferta — CONFIRMADO por Alex:** el montaje de 159€ se regala siempre en modo de oferta promocional (no es un descuento puntual, es la palanca de entrada permanente). El primer mes de cuota, en vez de ser gratis, se cobra a **1€ simbólico** — tarjeta registrada desde la compra (checkout de la Sección 2.2-bis), y a partir del segundo mes se factura automáticamente el precio completo del plan elegido (9€ o 25€, revisado en la Parte 11), sin que el cliente tenga que hacer nada para que eso ocurra.
- **Marco temporal explícito y visible:** aunque ya no es "gratis", sigue habiendo un corte de fecha claro que comunicar ("tu primer mes cuesta 1€, hasta el [fecha] — después, [9€/25€]/mes"), porque la claridad sobre cuándo empieza el cobro real sigue siendo lo que sostiene la confianza del cliente y evita sorpresas que generen cancelaciones o quejas.
- **El momento antes de la primera facturación completa no es un evento pasivo:** en los días previos a que se cobre el precio completo por primera vez, el sistema (bot o email automatizado) debe mostrarle al cliente, con datos reales, cuántas veces se escaneó su QR durante el mes de 1€ — esto refuerza la decisión de continuar (el cliente ve evidencia de que el sistema ya está funcionando) y reduce la probabilidad de cancelación justo antes del primer cobro completo, que es el punto de mayor fuga en cualquier modelo de prueba-a-pago.
- **Este es también el momento exacto de introducir Experience**, no antes ni después: el cliente que acaba de validar que el QR funciona y está a punto de asumir su primera cuota completa es psicológicamente el más receptivo a un siguiente paso de mayor valor — es la ventana de venta cruzada más caliente de toda la escalera.

---

## 4. QR físicos: materiales, formatos y estructura de precios (con 360imprimir como proveedor)

### 4.1 Aviso de honestidad sobre las cifras de esta sección

[360imprimir.es](https://www.360imprimir.es/pegatinas) no expone tablas de precio por cantidad en la carga estática de su página (los precios cargan dinámicamente al configurar el pedido), así que **no puedo darte cifras de coste exactas verificadas para 25/50/100 unidades sin que tú (o el agente, si tiene navegador) hagáis la simulación de compra real en su web**. El único dato duro que sí pude verificar es su promoción de volumen: **500 pegatinas por 12,19€** (≈0,024€/unidad a ese volumen, precio promocional). Lo que doy abajo es una **estructura de precios con lógica de margen**, no una cotización certificada — márcala como estimada hasta que se confirme con una simulación de compra real antes de publicarla al cliente.

### 4.2 Formatos recomendados (por caso de uso, de menor a mayor percepción de valor)

| Formato | Material | Caso de uso | Percepción de valor |
|---|---|---|---|
| Pegatina papel estándar | Papel adhesivo, no resistente al agua | Interior, mesas resguardadas, cartas ya laminadas | Básico |
| Pegatina vinilo | Vinilo resistente al agua/roce | Terraza, barra, exterior, zonas de limpieza frecuente | Medio |
| Atril/expositor de mesa en cartón o PVC rígido | Cartón grueso o PVC troquelado, formato "tienda de campaña" | Mesa, mostrador — se sostiene solo, no depende de superficie adhesiva | Medio-alto |
| Soporte de metacrilato con base | Metacrilato transparente + base, QR grabado o impreso en vinilo adherido | Mostrador, caja, entrada del local — la pieza premium | Alto (esta es la que debe verse en fotos de marketing) |

### 4.3 Estructura de precios sugerida (venta al cliente), con lógica de margen

Fórmula: `precio de venta = (coste estimado de imprenta × multiplicador de margen) + cuota fija de diseño/gestión`

| Cantidad | Multiplicador recomendado | Cuota fija de diseño/gestión | Lógica |
|---|---|---|---|
| 25 unidades (tanda mínima) | x4 sobre coste imprenta | +15€ | Tandas pequeñas casi no dejan margen en coste puro — la cuota fija cubre tu tiempo de maquetación y gestión de pedido, que es igual de alto para 25 que para 250 |
| 50 unidades | x3,5 sobre coste imprenta | +15€ | |
| 100 unidades | x3 sobre coste imprenta | +10€ | |
| 250+ unidades | x2,5 sobre coste imprenta | 0€ (se diluye en el volumen) | A partir de aquí el margen porcentual baja pero el margen absoluto en euros sigue creciendo — es el volumen el que paga |

**Ejemplo ilustrativo con el único dato verificado (500 uds papel a 12,19€ coste):** coste unitario ≈0,024€ → con x2,5 de margen, precio de venta ≈0,061€/unidad → 500 unidades ≈30,50€ de venta frente a 12,19€ de coste, dejando ~18€ de margen bruto en una sola tanda grande, antes de contar el metacrilato/PVC (mayor coste absoluto pero también mayor margen absoluto por unidad, al ser un producto premium con menos comparación de precio posible por parte del cliente).

**Instrucción para el agente / para Alex:** antes de publicar estos precios en cualquier página del sitio, hay que hacer una simulación de compra real en 360imprimir (o el proveedor final elegido) para las 4 combinaciones formato×cantidad de la tabla, y sustituir el multiplicador estimado por el coste real. Esta sección es una plantilla de pricing, no una tarifa cerrada.

---

## 5. Orquestación completa de DKitchen Experience

### 5.1 Quién hace qué (reparto de responsabilidades, para que quede sin ambigüedad en el contrato/brief)

| Elemento | Lo paga | Lo ejecuta | Quién recibe el dinero |
|---|---|---|---|
| Definición del concepto del evento (de los 7 formatos, o a medida) | — (incluido en la tarifa Primera vez/Nuevo evento, según corresponda) | DKitchen (con validación del dueño del local) | — |
| Landing del evento + generación de QR de entrada | — (incluido en la tarifa Primera vez/Nuevo evento, según corresponda) | DKitchen construye la landing y la conecta a la cuenta de pago del cliente | — |
| Pasarela de pago de las entradas (Stripe o SumUp) | El dueño del local abre y mantiene su propia cuenta | El dueño del local es el titular; DKitchen solo configura la conexión | **100% el dueño del local — DKitchen no toca ni ve ese dinero** |
| Guía de desarrollo, procesos y brief operativo | — (incluido en la tarifa Primera vez/Nuevo evento, según corresponda) | DKitchen | — |
| Piezas de marketing digital y físico (creatividades) | — (incluido en la tarifa Primera vez/Nuevo evento, según corresponda) | DKitchen diseña | — |
| Presupuesto de publicidad (Meta/Google Ads) | **El dueño del local** | DKitchen ejecuta la campaña y el contenido, con el presupuesto del local | — |
| Flyers físicos | **El dueño del local** | DKitchen diseña, el local decide si imprime con DKitchen (ver Sección 4) o por su cuenta | — |
| Colaboraciones con influencers locales | **El dueño del local** (o trueque con producto/entrada, a decidir caso a caso) | DKitchen puede coordinar el contacto si se pacta como parte del servicio | — |
| Validación de entradas en puerta | — | El propio local, con el sistema de check-in que entrega DKitchen | — |
| Reactivación para una nueva fecha (repetición del evento) | El local paga la tarifa de Reuso (150€, o 99€ si ya superó los 2 eventos) a DKitchen | DKitchen reactiva la landing existente y gestiona la nueva campaña de ads | El local sigue cobrando las entradas en su propia cuenta |

**Principio rector, doble:** (1) DKitchen nunca pone dinero de marketing del propio bolsillo para promocionar el evento de un tercero — actúa como el arquitecto e intermediario técnico/creativo, no como inversor del evento. (2) **DKitchen nunca gestiona ni retiene el dinero de las entradas** — el flujo de cobro es directo entre el asistente y el dueño del local, a través de la cuenta de pago que es propiedad del local. Esto es coherente con eliminar cualquier responsabilidad de garantizar resultado (Growth): si DKitchen no pone el capital de riesgo ni toca el dinero, tampoco puede debérsele un reparto de resultado ni puede vérsele como intermediario financiero de nada.

### 5.2 Los 7 formatos de evento, emparejados con los menús digitales ya desarrollados

> **Nota de transparencia:** esta lista reconstruye, con la información de los dossiers de marca disponibles, los 7 formatos de evento que se plantearon en una conversación anterior como pares posibles de cada menú digital ya construido. Si no coincide palabra por palabra con lo que ya se había fijado, corrígela — lo importante es que quede una lista cerrada de 7, no la redacción exacta.

| # | Formato de evento | Marca/menú digital emparejado | Por qué encaja |
|---|---|---|---|
| 1 | **Cata de maridaje** | Formato flexible — se empareja con cualquier marca (es el formato ya probado y vendido en el caso real Alhambra) | Es el formato de mayor ticket medio (venta de entrada + maridaje con bebida) y el que ya tiene una propuesta comercial validada |
| 2 | **Noche de Asado / Parrillada en vivo** | Santa Brazza | El menú de grill/asado se presta a cocina en vivo como espectáculo del propio evento |
| 3 | **Bowl Night** | My Latin Bowl | Formato de estación "arma tu bowl" en vivo, alta interacción con el asistente |
| 4 | **Fry Fest / Noche de fritos** | Seven Food Fries | Formato de degustación/competición entre variantes de loaded fries |
| 5 | **Brunch Pop-Up de domingo** | Natureza Brunch | Formato de sobremesa/fin de semana, encaja con locales que buscan activar el domingo, su día flojo habitual |
| 6 | **Noche de Bocadillos Gourmet** | Bokadipan | Formato casual, buen encaje con eventos de sobremesa/tapeo nocturno |
| 7 | **Wings Battle / Reto de alitas** | Wing Boss | Formato de competición/reto de picante, alto potencial viral en redes por el propio formato |

### 5.2-bis Plantilla de creatividad por formato — CONFIRMADO en la Parte 11

Para cada uno de los 7 formatos de la tabla de arriba, DKitchen pre-construye **una plantilla de creatividad reutilizable** (2 piezas estáticas + 1 vídeo corto, coherente con el formato fijo de campaña que Alex ya usa: grupos de anuncios pequeños y controlados, 25-50 personas, hipergeolocalizados, fecha única — Parte 10, Sección 3). Cada plantilla se construye una sola vez por formato (ej. una plantilla fija para "Bowl Night", otra para "Fry Fest") con los huecos de fecha, precio y ubicación como los únicos campos que cambian evento a evento.

- **Qué resuelve:** hoy cada evento nuevo implicaría crear creatividad desde cero — con 7 plantillas ya construidas, un evento nuevo del mismo formato solo necesita actualizar fecha/precio/ubicación sobre la plantilla existente, no rediseñar. Reduce el coste marginal de cada evento nuevo sin cambiar el tamaño ni el estilo de campaña que Alex quiere mantener (nunca gestión masiva de ads, Parte 8, Sección 5-bis).
- **Motor:** el mismo motor de creatividad IA que ya existe en el panel admin (`creative-factory`, mencionado en la Sección 5.4 más abajo) — no es una herramienta nueva, es aplicar la que ya existe una vez por formato en vez de una vez por evento.
- **El formato con menú propio del cliente (modificador "híbrido", ver más abajo) no tiene plantilla fija de marca** — usa la plantilla del formato de evento elegido, pero con los assets de producto del propio cliente, siguiendo la misma lógica del resto del documento.

**El menú propio del cliente no es un octavo formato — es un modificador que se puede aplicar a cualquiera de los 7.** Cuando el local quiere usar su propia gastronomía en vez de (o mezclada con) una de las marcas de DKitchen, se mantiene el mismo formato de evento (por ejemplo, sigue siendo una "Cata de maridaje"), pero el menú lo define el cliente. Esto es lo que ya está descrito en la Parte 1, Sección 2, Peldaño 2 como "menú híbrido".

### 5.3 Cronograma de puesta en marcha (plantilla estándar, ajustable por evento)

| Momento | Qué ocurre |
|---|---|
| T-21 días | Reunión de definición del evento (concepto, fecha, aforo, precio de entrada, si se usa gastronomía propia del local, gastronomía de una marca virtual de DKitchen, o híbrido) |
| T-18 días | Landing del evento en vivo, pasarela de pago activa, primer QR de prueba generado y validado |
| T-15 días | Arranque de campaña de anuncios (Meta/Google) con el presupuesto del local, primeras piezas de contenido para redes |
| T-10 días | Arranque de flyers físicos (si se contrataron) y outreach a influencers locales |
| T-5 días | Punto de control de ventas: si el aforo objetivo va lento, se decide con el local si se sube inversión en ads o se ajusta el mensaje — sin comprometer garantía de resultado, sí acompañamiento activo |
| T-0 (día del evento) | Check-in en puerta con el sistema de validación de QR — cada entrada se escanea una vez, el sistema la marca como usada |
| T+2 días | Informe de cierre: entradas vendidas, ingresos brutos, comisión de DKitchen, aprendizajes para el siguiente evento — este informe es, además, la base para vender el evento como "replicable" en el siguiente ciclo |

### 5.4 Canales de venta del evento (todos financiados por el local, ejecutados/coordinados por DKitchen)
1. **Flyers físicos** con QR directo a la landing de compra de entrada (no a la carta — es un QR de evento, con su propia landing y su propio plazo de vigencia).
2. **Redes sociales** — contenido generado con el mismo motor de creatividad IA que ya existe en el panel admin (`creative-factory`), adaptado al evento en vez de al negocio genérico.
3. **Influencers locales** — micro-influencers de la zona, coordinados por DKitchen, pagados o compensados por el local.
4. **Ads (Meta/Google)** — segmentación hiperlocal, igual que ya describe `marketplace-data.ts` para el servicio de ads existente, pero aplicada a la venta de entradas de un evento con fecha límite (esto es publicidad con urgencia real incorporada — un evento con fecha de caducidad convierte mejor que un negocio sin fecha límite, y hay que explotarlo en el copy de los anuncios).

### 5.5 El "candado" de acceso: por qué el QR único es la pieza que vende esto como algo serio

El argumento comercial más fuerte de Experience frente a "vender entradas por WhatsApp o Bizum como hace cualquier bar" es que **nadie entra sin QR válido, ya está pagado de antemano en la cuenta del propio local, y no hay manera de colarse o de que el dueño pierda el control de quién entró**. Esto hay que decirlo explícitamente en el copy de venta al dueño del local: "tú no gestionas listas, no gestionas efectivo en puerta, no discutes con nadie en la entrada — y el dinero de cada entrada cae directo en tu cuenta, no en la nuestra: nosotros te montamos el sistema, tú te quedas con el 100% de la taquilla."

---

## 6. Base Operativa: se mantiene y se refuerza — nada se degrada

Para que quede sin ambigüedad: el peldaño de Digitalización Personalizada / Base Operativa **no pierde ningún elemento que ya tenga en la web actual**. Se mantienen íntegros:
- El precio de 700€ (fraccionable), salvo que Alex decida cambiarlo (pregunta bloqueante ya abierta en la Parte 1, sección 7.9).
- Los bonus/regalos gratuitos ya prometidos (los 2 primeros meses de mantenimiento gratis, el Pack de Arranque como gancho de valor, si se decide mantenerlo re-anclado a este peldaño en vez de a Growth — ver Parte 1, Sección 4.2).
- Las auditorías como parte del proceso de venta — aquí conviene una aclaración importante: la **Auditoría de canales externos** (peldaño 3, nueva) y la **Auditoría de Escandallos y Rentabilidad** (`business-audit` en `marketplace-data.ts`, ya existente) son dos productos distintos y ambos se mantienen — uno audita presencia digital (Google Business Profile + redes), el otro audita costes de carta/platos. No hay que fusionarlos ni eliminar ninguno.
- El demo en vivo de la carta interactiva (`/demo/carta`, `LiveDemoCTA.tsx`) se mantiene tal cual, solo con la identidad migrada (dominio, colores si aplica).

Lo único que cambia en Base Operativa es **su posición narrativa dentro de la escalera** (Sección 2 de la Parte 1: ahora es la consecuencia lógica de la Auditoría, no un competidor directo de Growth, porque Growth ya no existe) — no su contenido ni su precio.

---

## 7. Dark Kitchen / Marca en Caja — recapitulación con precios, para cerrar el entendimiento

(Desarrollo completo de la lógica de producto en la Parte 1, Sección 6 — aquí solo la tabla de precios consolidada para que quede en un solo lugar de referencia rápida. **Todas las cifras de esta sección están CONFIRMADAS y cerradas — estructura completa en `DKITCHEN_MIGRATION_PLAN_PARTE3.md` Sección 2.2 y 3.3.**)

| Elemento | Ruta A (desde cero) | Ruta B (Marca en Caja — ya tiene cocina) |
|---|---|---|
| Rango de precio | 3.000€ - 10.000€ | 1.200€ marca 1 (~2.000€ todo incluido, con ~200€ de ads geolocalizados + flyers físicos) |
| Marca adicional | — (se factura como proyecto completo) | **CONFIRMADO:** marca 2 con -20% (960€), marca 3 en adelante con -30% (840€). El componente de marketing (~200€) se mantiene íntegro por marca, sin descuento. |
| Cuota recurrente | No definida en el modelo actual — a valorar si aplica | **CONFIRMADO, tabla completa:** 120€/mes (1-2 marcas) / 99€/mes (3-5 marcas) / 89€/mes (6+ marcas) por marca activa — cada nivel escala a su vez a 145-175€/mes si el volumen de esa marca (medido de forma objetiva vía la PWA, no autodeclarado) supera 5.000€/mes, y a 165-220€/mes si supera 10.000€/mes (tope, sin más escalones). No es comisión ni % — es cuota fija por escalón de carga operativa real. |
| Barrera de entrada | Alta — puerta de admisión, comité, exclusividad trimestral | Baja — casi de autoservicio/cotización directa, salvo que el cliente entre pidiendo 3+ marcas o 2+ locales de una vez, caso en que se re-enruta a admisión tipo Ruta A (ver Parte 3 Sección 3) |
| Componente técnico | PWA de pedidos + KDS multimarca + enrutamiento de repartidores | Kit de marca (logo/menú/fotografía) + PWA clonada del patrón ya probado (Seven Food Fries), que además funciona como kiosco/POS completo (pedidos propios, telefónicos, modo camarero, mostrador) con cierre diario que migra la venta al POS fiscal/Verifactu del cliente — ver Parte 3 Sección 1 — + alta en plataformas de delivery |
| Marketing incluido | A definir según proyecto | ~200€ en ads geolocalizados + flyers físicos, dentro del "todo incluido" de ~2.000€ |

---

## 8. Ingeniería de psico-marketing aplicada a cada peldaño

Esta sección traduce los principios que ya usa el bot "Arqui" (Filtro de Autoridad, anclaje de valor, revelación de precio en 2 pasos) a la nueva escalera, peldaño por peldaño:

| Peldaño | Principio dominante | Cómo se aplica |
|---|---|---|
| **QR Menú** | Reciprocidad + prueba antes de compromiso | Regalo de 1-2 meses con fecha de corte visible (no indefinida). El regalo no es "gratis sin más" — se presenta como "te lo activamos ya, decides en base a lo que veas" (esto reduce la fricción de decisión inicial sin regalar la percepción de valor). |
| **Experience** | Escasez real (fecha del evento) + prueba social diferida | El evento tiene fecha límite real, no artificial — esto es escasez auténtica, la más persuasiva porque no puede acusarse de manipulación. El informe de cierre (Sección 5.2, T+2) se convierte en prueba social para el siguiente cliente ("esto ya se hizo y funcionó, aquí están los números"). |
| **Auditoría de canales** | Autoridad + brecha (gap) | No se vende como "te ayudamos" sino como "te decimos exactamente qué te está costando dinero ahora mismo" — el informe debe mostrar un gap concreto y cuantificado (ej. "tu ficha de Google no responde a reseñas desde hace X meses, esto afecta tu posicionamiento de proximidad") antes de ofrecer la solución. |
| **Base Operativa** | Anclaje de valor + filtro de autoridad | Se mantiene el mecanismo ya validado: primero se establece el valor completo (incluyendo bonus), luego se revela el precio en 2 pasos, tal como ya hace `api/demo/respond/route.ts` — solo se reescribe el contenido (fuera Growth), no el mecanismo. |
| **Dark Kitchen** | Exclusividad + aversión a la pérdida | La Ruta A mantiene su exclusividad trimestral (ya validada en el copy actual: "2 proyectos simultáneos por trimestre"). La Ruta B, al ser de menor fricción, no necesita exclusividad — necesita en cambio anclar la pérdida de oportunidad: cada mes que un local no añade una marca virtual es un mes de capacidad de cocina ociosa que no se está monetizando (esto ya está parcialmente en el "Calculador de Hemorragia" de `DarkKitchen.tsx` — reutilizar ese mecanismo también para la Ruta B). |

---

## 9. Investigación externa: hooks de crecimiento agresivo y referencias de mercado

Hallazgos relevantes para calibrar el nivel de agresividad de la salida al mercado:

1. **Ya hay competidores regalando la carta QR de por vida**, no solo el primer mes ([tucartadigital.com](https://tucartadigital.com/), [hosteleria.app](https://hosteleria.app/)) — validado en la Sección 3.2. Consecuencia directa: competir en precio en el QR es una batalla perdida por diseño; el mensaje agresivo debe ir en la velocidad de activación (regalo con fecha de corte) y en lo que hay detrás del QR (ecosistema completo), no en el precio del QR en sí.
2. **Estructura de comisiones de ticketing real del mercado español** (Weezevent, Universe, Eventbrite, Enterticket, Ticketmaster, Fever, entre 2% y 30% según el nivel de servicio) — sirve aquí de contraste, no de referencia de precio: casi todas esas plataformas se quedan con un % porque son ellas las que gestionan el dinero. DKitchen, al dejar el cobro en la cuenta del propio cliente (Sección 1.1), queda fuera de esa lógica de comisión por diseño — la comparación confirma que el modelo de tarifa fija (Construcción + Alquiler) es coherente con no actuar como intermediario financiero, no que haya que imitar el % de estas plataformas.
3. **Patrón general de lanzamiento agresivo en SaaS/negocios locales (de fuentes generalistas de crecimiento de producto):** los lanzamientos agresivos que funcionan combinan tres elementos que ya están presentes de forma parcial en la estrategia actual de Alex y que conviene reforzar explícitamente:
   - **Cohortes con fecha límite** en vez de una oferta "siempre abierta" (ej. "primeros 20 locales de la zona, hasta el [fecha]") — genera urgencia real sin depender de descuentos.
   - **Un solo canal dominante al principio, no cinco a la vez** — la ejecución actual de Alex (flyers físicos + DM + visitas) ya sigue este principio implícitamente; no diluirlo añadiendo demasiados canales nuevos a la vez cuando arranque Experience.
   - **El propio cliente como el mejor anuncio del siguiente cliente** — no vía "referidos" (Alex ya descartó explícitamente ese canal), sino vía prueba social pasiva: el informe de cierre de cada Experience, el contador de escaneos del QR, y el catálogo de marcas virtuales con datos reales (Parte 1, Sección 5) funcionan como prueba social sin depender de que el cliente actúe como promotor activo.

---

## 10. Hitos de superación para la salida al mercado (roadmap agresivo, con números)

Un roadmap de metas concretas y verificables, no una lista de tareas — para que Alex tenga un marcador claro de si el ritmo de entrada al mercado es suficientemente agresivo:

| Hito | Meta numérica | Ventana de tiempo sugerida |
|---|---|---|
| Primeros clientes QR activos | 10 QR Menú activos (pagando o en periodo de regalo) | 30 días desde el lanzamiento de la migración |
| Primer Experience bajo el nuevo modelo (297€ + 10%) | 1 evento cerrado y ejecutado de principio a fin con la pasarela nueva | 45 días |
| Primera Auditoría de canales vendida | 1 auditoría paga completada, como validación de que el producto nuevo convierte | 45 días |
| Conversión QR → pago | ≥50% de los QR regalados convertidos a cuota de pago al terminar el periodo de regalo | Al cierre del primer ciclo de regalo de cada cohorte |
| Primer cliente de Marca en Caja (Ruta B) | 1 negocio con cocina existente sumando su primera marca virtual | 60 días |
| Catálogo de marcas publicado | Página `/marcas` en vivo con las 6 marcas y datos reales de menú | Antes del día 30 (es la pieza que sostiene la venta de Experience y de Dark Kitchen, debe estar lista temprano) |

---

## 11. Preguntas que siguen abiertas después de este documento

Este documento resuelve las 4 preguntas planteadas y las cifras de Experience y de QR Menú ya están **CONFIRMADAS** por Alex (299€/150€/250€/99€ para Experience; 159€ montaje + 9€/25€ mensual para QR — precio revisado en la Parte 11 —, con prueba de 1€ el primer mes). Lo que queda pendiente de cerrar antes de que el agente las trate como definitivas es más acotado:

1. **El precio del desarrollo llave en mano cuando el cliente quiere quedarse con la landing del evento como propia (Sección 1.1)** — queda deliberadamente sin cifra, porque por definición es un desarrollo a medida que se cotiza caso a caso, fusionado con Base Operativa.
2. **Los precios de QR físicos de la Sección 4** — son una estructura de margen, no una cotización real de 360imprimir. Hay que simular la compra real antes de publicar precios al cliente.
3. **La lista de los 7 formatos de evento de la Sección 5.2** — es una reconstrucción razonada a partir de los dossiers de marca disponibles, no una transcripción exacta de una lista previamente cerrada con Alex. Confirmar si coincide o si hay que ajustar algún emparejamiento.
4. ~~**Tope exacto de productos por plan de QR Menú** (Sección 2.3)~~ — **RESUELTO: CONFIRMADO por Alex en 50 productos (Básico) / 150 productos (Ampliado)**, y validado contra datos reales de tamaño de carta de restaurante (fuentes en Sección 9): incluso una carta amplia de restaurante casual (25-38 ítems) o quick-service (6-8 núcleo) queda muy por debajo de ambos topes, por lo que funcionan como límite técnico anti-abuso, no como gatillo de upsell sentido por el cliente medio. No hay más puntos abiertos en QR Menú.

Los bloqueantes que aún siguen abiertos en la Parte 1 (dominio exacto, número de WhatsApp canónico, descuento por marca adicional/por 3+ marcas activas, nombre público definitivo del lockup de marca) **siguen sin resolver**. La cuota mensual por marca de Dark Kitchen **ya no está abierta** — su estructura quedó CONFIRMADA en `DKITCHEN_MIGRATION_PLAN_PARTE3.md`, Sección 2.

Sources:
- [360imprimir.es — Pegatinas personalizadas](https://www.360imprimir.es/pegatinas)
- [tucartadigital.com](https://tucartadigital.com/)
- [hosteleria.app](https://hosteleria.app/)
- [BuscaTuSitio — Comisiones ticketing: Eventbrite, Ticketmaster y 8 más](https://buscatusitio.com/comisiones-ticketing)
