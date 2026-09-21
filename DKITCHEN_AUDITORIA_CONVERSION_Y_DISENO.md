# Auditoría de conversión y diseño — estado real, página por página

**Fecha:** 2026-09-21
**Alcance:** solo la web de DKitchen (`dkitchencorporate.es`). No toca la Parte 5 (alérgenos,
idiomas, Analizador de Rentabilidad) — esa queda en cola, tal como su propio documento exige,
hasta que esta fase cierre.
**Método:** lectura directa de cada componente que compone cada página real en producción, no
una opinión sobre capturas de pantalla. Donde el hallazgo es un defecto verificable (imagen rota,
copy que contradice el precio real), se marca como **defecto**, no como "falta de diseño".
**Regla de este documento:** primero contenido/estrategia de venta, después diseño — en ese
orden, tal como se pidió. La Fase 3 (motion/3D) no empieza hasta que la Fase 1 y 2 estén cerradas
página por página.

---

## 0. Defectos verificados — arreglar antes que ninguna otra cosa

Esto no es "falta de diseño de alto nivel", es contenido roto o falso que ya está en producción:

| # | Dónde | Qué está mal | Evidencia |
|---|---|---|---|
| D1 | Home, `LiveDemoCTA.tsx` | El QR de la demo está roto — usa `api.qrserver.com` con el color mal formateado (`color=FF4500` sin el prefijo `%23` que exige esa API para el `#`), y no hay `onError` de respaldo como sí tiene el resto del sitio. Se ve tal cual en la captura: icono de imagen rota. | Código línea 36; confirmado visualmente en la captura del home |
| D2 | `FAQ.tsx`, preguntas 4 y 5 | Vende y explica **"Agentes IA" conectados a WhatsApp/CRM** como si existieran — es exactamente el bot "Arqui" que se erradicó del proyecto el 19/09/2026 (ver `manuals/estrategia-ventas`). Un visitante real puede leer hoy que DKitchen instala IA en su WhatsApp. Esto no es una FAQ desactualizada, es una promesa de producto que no existe. |Código líneas 18-24 |
| D3 | `NavBar.tsx` | El CTA de la barra dice **"Auditoría Gratuita"** y el mensaje de WhatsApp precompuesto pide "la Auditoría Gratuita" — pero `/auditoria` (la página real) dice explícitamente "Diagnóstico de pago único". Contradice el propio precio del producto que se acaba de construir. | `NavBar.tsx` líneas 27-28, 71, 112 vs. `AuditoriaCanales.tsx` |
| D4 | Home, `FounderBio.tsx` | La foto de "Alex, CEO" (`/images/founder_ugc.png`) es una imagen generada por IA con estética cyberpunk/neón — no una foto real. Contradice el propio texto que dice "trato directo, sin intermediarios" y busca prueba de autenticidad. Un fundador de carne y hueso con una foto de IA genérica resta credibilidad, no la suma. | Visual, confirmado en captura |
| D5 | `/qr` | El plan (`DKITCHEN_MIGRACION_COMPLETA.md`, Sección 2, Peldaño 1) es explícito: el QR Menú es "el único peldaño con checkout de autoservicio real" — Stripe Checkout, aprovisionamiento automático. Hoy los botones "Activar Básico/Ampliado" abren WhatsApp. No es un matiz de diseño: es la pieza de producto más importante de todo el peldaño 1, y no existe. (Coincide con la tarea ya aplazada #16 — pero aplazada no significa invisible: hay que decidir si se construye ahora o se sigue vendiendo por WhatsApp mientras tanto, y decirlo así en la propia página, no fingir un checkout con un botón que no lo es). |`QrMenuPricing.tsx` |

**Recomendación:** D1-D4 son correcciones de minutos/horas, sin ambigüedad de producto — se pueden arreglar ya, en paralelo a que decidas el resto. D5 es una decisión de alcance (¿Stripe ahora o después?) que si no se resuelve, condiciona todo el rediseño de `/qr`.

---

## 1. Home (`/`) — diagnóstico: identidad de marca correcta, cero motor de conversión

Componentes actuales, en orden: `AggressiveHero` → `VisionAndEmpathy` → "Cómo funciona en 3 pasos" → `LiveDemoCTA` → grid de 5 tarjetas a la escalera → `FounderBio`.

**Lo que sí funciona:**
- Identidad visual consistente (naranja `#FF4500` sobre negro/crema), coherente en toda la página.
- El titular del hero es claro y orientado a beneficio, no a producto.
- El ticker de nichos ("Restaurantes, Asadores, Dark Kitchens...") es un intento de prueba de amplitud — está bien encaminado pero es genérico, no prueba nada verificable.

**Lo que falta para que sea un embudo, no un folleto:**
- **Cero prueba social real.** No hay ni un número (clientes activos, escaneos totales, eventos ejecutados), ni un testimonio, ni un logo de cliente. El caso real del evento Alhambra (documentado en los dossiers) no aparece en ningún sitio de la home.
- **Cero urgencia o escasez genuina.** Nada en la home comunica por qué actuar hoy y no la semana que viene — ni siquiera el ángulo ya definido en el propio plan (montaje QR gratis "en modo de oferta permanente", primer mes a 1€) aparece en el home; solo se ve al llegar a `/qr`.
- **La sección "Cómo funciona" es genérica.** "Atracción incesante / Pedido directo / Ticket multiplicado" no menciona ningún producto real de la escalera — es lenguaje de agencia de marketing clásico, justo lo que el posicionamiento de marca quiere evitar (ver `manuals/estrategia-ventas`, Sección "Posicionamiento de Marca").
- **El grid de 5 tarjetas es plano.** Mismo tamaño, mismo peso visual para QR Menú (19€/mes) y Dark Kitchen (hasta 10.000€) — no hay jerarquía que diga "empieza aquí" frente a "esto es para negocios grandes". Un visitante nuevo no sabe por dónde entrar.
- **No hay ancla de precio visible en el home.** El primer precio que ve cualquier visitante está a un clic de distancia (dentro de `/qr`), nunca en la página de entrada — malo para conversión de tráfico frío, que decide en los primeros segundos si sigue o se va.

**Lo que hay que construir (contenido, antes que animación):**
1. Franja de prueba social con números reales (aunque sean modestos al principio: "X escaneos gestionados", "evento real ejecutado en la Alhambra") — nunca inventados.
2. Reescribir "Cómo funciona" para que hable de la escalera real (QR → Experience → Auditoría → Base → Dark Kitchen), no de conceptos genéricos de marketing.
3. Jerarquía visual real en el grid de productos: la tarjeta de QR Menú (el punto de entrada) debe pesar visualmente más que las demás en el home — es la puerta, las otras cinco no compiten con ella en ese lugar.
4. Arreglar D1 y D4 antes de nada — un CTA roto y una foto de IA en el propio home son los primeros dos frenos de confianza que ve cualquier visitante.

---

## 2. `/qr` — diagnóstico: buen contenido de producto, falta el mecanismo de compra y la prueba

**Lo que sí funciona:** `DigitalPresenceValue` explica bien el dolor (tiempo de servicio, ticket medio), y `QrMenuPricing` tiene las dos tarjetas de plan con feature-gating claro y precios reales de `pricing-config.ts` — no hay cifras inventadas.

**Lo que falta:**
- **D5 (checkout real)** — la pieza más importante, ya descrita arriba.
- **Cero prueba de que el QR funciona de verdad.** No hay un ejemplo de carta real (aunque sea de una marca propia del catálogo de `/marcas`), ni un GIF/vídeo de 5 segundos del flujo de escaneo → carta. El argumento de venta clave del producto ("el QR que imprimes hoy es el único que vas a necesitar") es un texto, no algo que se pueda verificar en la propia página.
- **No se menciona el contador de escaneos como parte de la venta** — el propio plan (Sección 3.3 de la Parte 2) dice que mostrar cuántas veces se escaneó el QR antes de la primera factura completa es clave para reducir cancelaciones; en la página de venta ese dato ni se insinúa como parte de la experiencia post-compra.
- **Sin comparación directa con la competencia gratuita.** El propio plan (Sección 3.2 de la Parte 2) da el argumento exacto a usar ("cambia tu carta y comprueba si tu QR sigue sirviendo" frente a competidores que obligan a reimprimir) — hoy no está en la página.

---

## 3. `/experience` — diagnóstico: el contenido es más completo de lo que parece, falta prueba visual

Corrección de lo que se percibió en la revisión rápida: **esta página sí explica el mecanismo** — tiene hero, 3 argumentos de valor, las 4 tarifas con contexto, un desglose de responsabilidades en dos columnas, y los 7 formatos con su marca emparejada. El contenido textual está, de hecho, más desarrollado que en cualquier otra página de la escalera.

**Lo que sí falta, de verdad:**
- **Cero prueba visual del caso real.** El evento de la Alhambra ya se ejecutó y se documentó en un dossier — no hay ni una foto, ni una cifra de resultado ("X entradas vendidas", "aforo completo") en la página. Es la pieza de prueba social más fuerte que existe en todo el negocio y no está explotada en absoluto.
- **No hay ejemplo del "informe de cierre"** que el propio plan describe como parte del entregable (T+2 días, Sección 5.3 de la Parte 2) — mostrar (aunque sea con datos de ejemplo etiquetados como tal) qué aspecto tiene ese informe reforzaría la percepción de seriedad.
- **La tarjeta de 7 formatos es texto plano** — cada uno debería enlazar a la marca correspondiente en `/marcas` (hoy no hay ningún link cruzado entre ambas páginas).

---

## 4. `/auditoria` — diagnóstico: correcto pero mínimo

Tres pasos genéricos + CTA. Cumple lo que puede cumplir sin precio cerrado, pero:
- **No hay ejemplo de hallazgo.** El texto habla de "brechas cuantificadas" pero no muestra ni un ejemplo anonimizado de qué aspecto tiene un hallazgo real (ej. "ficha de Google sin responder a reseñas desde hace 4 meses: X% menos de clics de proximidad, dato de SEMrush/BrightLocal").
- Arreglar D3 (contradicción "gratis" vs. "pago único") es obligatorio antes de cualquier otra cosa aquí — ahora mismo el propio sitio se contradice a sí mismo sobre el precio de este producto.

---

## 5. `/base-operativa` — diagnóstico: la página más trabajada de las cinco

`TheTrojanHorse.tsx` ya tiene: 4 bonos con valor tachado, un `DashboardShowcase` interactivo, la tarjeta de precio con desglose de beneficios y el bono de 2 meses gratis. Es, con diferencia, la página con más arsenal de conversión clásico (anclaje de precio, urgencia de bonos, prueba con mockup de dashboard).

**Lo que falta:** conectar con `/auditoria` y `/demo/carta` ya está hecho (lo añadí en la Fase 4). Pendiente real: el `DashboardShowcase` es un mockup — si en algún momento hay un cliente real dispuesto a que se muestre su panel (con permiso), sustituir el mockup por una captura real multiplicaría la credibilidad. No es urgente, es una mejora de prueba social a futuro.

---

## 6. `/dark-kitchen` — diagnóstico: Ruta A muy trabajada, Ruta B (nueva) todavía plana

La Ruta A (`DarkKitchen.tsx`) tiene calculadora de "hemorragia", proceso de admisión en 3 fases y aviso de exclusividad — nivel de conversión alto, ya estaba así antes de esta sesión.

La Ruta B (`MarcaEnCaja.tsx`, construida en esta sesión) tiene las tablas de precio correctas pero carece del mismo nivel de "gancho" que la Ruta A — no tiene calculador de oportunidad perdida (el propio plan, Sección 8 de la Parte 2, dice explícitamente que hay que reutilizar el "Calculador de Hemorragia" también para la Ruta B) ni casos de marcas ya vendidas.

**Pendiente concreto:** adaptar el calculador de hemorragia de la Ruta A a la Ruta B (cocina ociosa sin marca adicional vs. con marca adicional), tal como el plan ya lo pide.

---

## 7. `/marcas` — diagnóstico: catálogo correcto, sin conexión de venta cruzada

Los datos son reales (menú y precios de los dossiers). Falta el enlace cruzado con `/experience` (cada marca ya declara su `formatoEvento` en el dato, pero no hay un link clicable hacia esa sección de `/experience`) y con `/dark-kitchen` Ruta B (el CTA actual es solo WhatsApp genérico, no lleva directamente al selector de Ruta B con la marca preseleccionada).

---

## 8. `/faq` — diagnóstico: la página con el hallazgo más grave (D2)

Más allá de D2 (bot inexistente), el resto de preguntas son genéricas y no cubren las dudas reales que generaría la escalera actual: nada sobre "¿qué pasa si cancelo el QR antes del mes 2?", nada sobre "¿qué pasa con mis datos si dejo de ser cliente?", nada específico de Experience/Dark Kitchen. Hay que reescribirla entera con preguntas ancladas a los productos reales, no heredadas del modelo anterior.

---

## 9. Plan de ejecución propuesto — en el orden que pediste: contenido/venta primero, diseño después

**Fase 1 — Defectos y contradicciones (D1-D5), inmediato:**
Arreglar D1 (QR roto), D2 (FAQ del bot inexistente), D3 (contradicción gratis/pago en Auditoría), D4 (decidir: fotografía real de Alex o eliminar la sección hasta tenerla). D5 requiere que decidas si se construye el checkout de Stripe ahora (cambia el alcance de esta fase) o si `/qr` se reescribe honestamente como venta consultiva por WhatsApp mientras tanto.

**Fase 2 — Contenido de venta de alto nivel, página por página:**
2.1 Home: prueba social real, jerarquía de producto, reescribir "cómo funciona".
2.2 `/qr`: ejemplo de carta real/vídeo del flujo, argumento comparativo frente a gratuitos.
2.3 `/experience`: explotar el caso real de la Alhambra (fotos, cifras), ejemplo de informe de cierre, enlaces cruzados a `/marcas`.
2.4 `/auditoria`: ejemplo de hallazgo anonimizado.
2.5 `/dark-kitchen`: calculador de hemorragia adaptado a Ruta B.
2.6 `/marcas`: enlaces cruzados a Experience y a Ruta B.
2.7 `/faq`: reescritura completa anclada a los productos reales.

**Fase 3 — Diseño de movimiento (Sección 10 del plan), solo cuando 1 y 2 estén cerradas:**
Lenis, Framer Motion/GSAP, elemento 3D por hero de producto, transiciones de página, tilt 3D en tarjetas — tal como ya está especificado, sin repetirlo aquí.

---

## 10. Preguntas que necesito que respondas antes de poder ejecutar la Fase 2 a fondo

1. **¿Tienes fotos o vídeo reales del evento Alhambra** (o de cualquier evento ya ejecutado) que pueda usar en `/experience`? Sin eso, la pieza de prueba social más fuerte del negocio se queda en texto.
2. **¿Construyo ya el checkout de Stripe para el QR Menú (D5),** o `/qr` se reescribe por ahora como venta consultiva honesta (quitando cualquier apariencia de checkout) mientras decides el momento de automatizarlo?
3. **Sobre D4 (foto del fundador):** ¿tienes una foto real que prefieras usar, o eliminamos la sección de "acceso directo al fundador" hasta tenerla?
4. **Datos reales de cifras** (escaneos totales gestionados hasta ahora, número de clientes QR activos, etc.) para la prueba social del home — o confirmas que hoy son 0/muy pocos y hay que diseñar esa sección de forma que crezca con datos reales desde el primer cliente, sin inventar cifras mientras tanto.

Con esas cuatro respuestas puedo ejecutar la Fase 2 completa sin más idas y vueltas.
