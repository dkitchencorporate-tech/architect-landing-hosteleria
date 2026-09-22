# DKITCHEN — PARTE 6: REFACTORIZACIÓN VISUAL Y DE MATERIAL DE VENTA DE LA WEB (dkitchencorporate.es)

**Complementa a:** Partes 1-5. Nace de la auditoría en vivo de `dkitchencorporate.es` (2026-09-21): la migración de identidad y de precios está correctamente implementada, pero la web vende poco porque cada página repite el mismo patrón de tarjetas uniformes, sin jerarquía visual, sin hero propio por producto y sin material de venta suficiente — "se explica y queda a medias, no vende". Esta parte no cambia ningún precio ni ninguna regla de negocio ya cerrada en las Partes 1-5 — es exclusivamente estructura visual + copy para que cada página convierta.

---

## 0. Diagnóstico — por qué hoy no vende, no es un problema de diseño superficial

La auditoría (Partes 5 y la más reciente) confirma que los datos están bien: precios correctos, mecánica correcta, principios correctos (cero comisión, pasarela del cliente, etc.). El problema es estructural:

1. **Ninguna página tiene hero propio** — la primera pantalla de QR, Experience, Auditoría, Base Operativa y Dark Kitchen no comunica de un vistazo qué hace ESE producto en particular ni por qué importa.
2. **Todo pesa igual visualmente** — features, precios y detalles secundarios están en el mismo tipo de tarjeta, mismo tamaño, mismo color. El ojo no tiene dónde detenerse ni qué leer primero.
3. **Cero ritmo de sección** — scroll uniforme sin alternancia de fondo/color/tipo de bloque, que es justo lo que hace que una página se sienta como "un PDF convertido en web" en vez de un producto de venta.
4. **La profundidad real del producto no está en el copy** — el ejemplo más grave es Base Operativa, donde toda la sofisticación de la PWA (tracking en vivo, impresora térmica, catálogo atómico, fidelización, bloqueo de emergencia, multiidioma) simplemente no aparece.
5. **Faltan precios en dos páginas clave** (Dark Kitchen y Auditoría), pese a que las cifras de Dark Kitchen ya están cerradas desde la Parte 3 — sin ancla numérica, nadie evalúa si le interesa.

Esta parte ataca los 5 puntos a la vez, página por página.

---

## 1. Sistema de bloques — el lenguaje visual compartido por las 6 páginas

En vez de que cada página improvise su propia mezcla de tarjetas, se define un vocabulario de 6 tipos de bloque, cada uno con una función y un tratamiento visual distinto. Cada página de esta parte se especifica como una secuencia de estos bloques, nunca como una lista repetida del mismo tipo:

- **HERO** — primera pantalla, propia de cada página (no reutilizar el layout de header genérico). Titular grande (una frase, la promesa central), subtítulo de una línea, 1-2 cifras de prueba como elementos visuales propios (no texto corrido), CTA. Imagen o mockup del producto de fondo o al lado, nunca solo texto sobre fondo plano.
- **POWER-STATEMENT** — bloque de una sola frase corta, tipografía muy grande, fondo de color de acento distinto al resto de la página (nunca el mismo fondo que el bloque anterior o siguiente). Sin bullets, sin explicación adicional — es una respiración y un golpe de efecto, no una sección informativa. Es el bloque que hoy no existe en ninguna página y es el que más falta hace.
- **FEATURE-SPLIT** — una función o grupo pequeño de funciones relacionadas, con mockup/icono grande a un lado y copy explicativo al otro (nunca centrado en una tarjeta simétrica). Se usa en repetición controlada (2-4 por página como máximo) para las funciones que merecen espacio propio, no para listar todo por igual.
- **PRICING-BLOCK** — tratamiento dedicado, visualmente diferenciado del resto de la página (no una tarjeta más del mismo tipo que las de features). Cuando hay más de un plan/tarifa, se trata como comparación o como escalera visual (ver Experience más abajo), nunca como lista plana.
- **OBJECTION-HANDLING** — formato pregunta/respuesta corta, pero integrado con tratamiento visual propio (no relegado a un bloque de texto al final tipo FAQ genérico).
- **CTA-FINAL** — cierre de página con un único siguiente paso claro, nunca varios CTAs compitiendo por la misma atención.
- **SALTO-CUÁNTICO** (nuevo, CONFIRMADO en la Parte 11) — bloque de puente entre dos peldaños de la escalera, aparece **una sola vez en toda la web**. No es un FEATURE-SPLIT ni un POWER-STATEMENT: es una transición 3D en scroll que convierte visualmente el elemento 3D de un peldaño en el del siguiente, con una frase corta de dos tiempos (antes/después) como único copy. Ver especificación completa en la Sección 3 (página QR) y en la Parte 7.

Ninguna página de esta parte repite el mismo bloque más de 3-4 veces seguidas — la alternancia de tipo de bloque (y de fondo) es lo que genera el ritmo que hoy falta.

---

## 2. Home

**HERO:** mantener el titular actual ("Atrae más clientes, agiliza tu servicio y domina tu presencia digital"), pero subirlo de peso: tipografía dominante, subtítulo de una frase que hoy no existe en ningún sitio y que la página necesita — **qué es DKitchen en una línea** (ej.: "El socio tecnológico que digitaliza tu restaurante sin comisiones ni intermediarios — tú decides hasta dónde subir"). La cifra de autoridad del fundador (7 marcas virtuales, dark kitchen en Madrid desde 2020) va aquí, como badge visual junto al CTA, no como párrafo de biografía al final de la página.

**POWER-STATEMENT:** "Cero comisiones sobre cada ticket. Los datos de tu cliente se quedan contigo." — ya existe como frase, pero hoy vive dentro de un párrafo. Se convierte en bloque propio, fondo de color de marca, tipografía grande, sin nada más alrededor.

**FEATURE-SPLIT — la escalera:** en vez de 5 tarjetas idénticas, tratamiento asimétrico: QR Menú con el mayor peso visual (es la puerta de entrada, mockup del menú digital), los otros 4 peldaños en fila secundaria más compacta pero con icono/color propio cada uno — nunca monocromo, cada peldaño debe sentirse como un producto distinto, no una variación del mismo molde.

**PROOF-BLOCK:** la biografía del fundador, hoy un párrafo de texto, se convierte en un bloque de cifra grande + una línea de contexto ("Alex — bares, restaurantes y una dark kitchen con 7 marcas virtuales en Madrid desde 2020. Esto no lo vendemos, lo hemos operado.").

**CTA-FINAL.**

---

## 3. QR Menú

**HERO propio:** titular actual ("La tecnología no es un gasto. Es tu mejor empleado."). **CORRECCIÓN — Parte 11:** las dos cifras de prueba ("14h/semana recuperadas, ticket medio +15%") se retiran del hero. Alex confirmó que no hay todavía un dato real de cliente que las respalde, y publicar una cifra sin cliente detrás es el mismo riesgo de credibilidad que ya se resolvió para el resto de la web (Sección 0). Mientras no exista ese dato real, el hero se sostiene solo con el titular + subtítulo + CTA (sin badges de cifra) — el hueco visual que deja el badge de prueba se recupera cuando el primer caso de éxito documentado (Parte 11, sección de casos) tenga cifras propias que mostrar, momento en el que ese caso concreto (no una cifra media inventada) ocupa ese lugar.

**CTA — CONFIRMADO, se construye ya en esta misma fase, no queda pendiente:** Alex autoriza y encarga en este mismo documento la construcción del checkout de Stripe (Parte 2, Sección 2.2-bis) — la cuenta de Stripe ya está lista para configurarse vía API. El botón dice "Activar Básico" / "Activar Ampliado" y dispara el flujo real: checkout de Stripe → webhook → aprovisionamiento automático de cliente + panel admin + menú + QR. Esta página, por tanto, se construye completa desde el primer paso — no hay versión provisional con CTA a WhatsApp que corregir más adelante.

**FEATURE-SPLIT — URL estable:** hoy es una frase de bullet perdida entre otras. Se convierte en su propio bloque con un mini-diagrama de dos pasos ("Cambias el menú → tu QR sigue funcionando igual" vs. el problema real de la competencia, que obliga a reimprimir cada vez que cambia la carta) — es el diferenciador técnico más fuerte del producto y hoy no se explica, solo se menciona.

**PRICING-BLOCK dedicado:** tabla clara Básico (9€/mes, 50 productos) vs. Ampliado (25€/mes, 150 productos, más elegido, ahora con Google Business + reservas + reseñas incluidos — CONFIRMADO en la Parte 11), con el montaje de 159€ (gratis en promo) + el primer mes a 1€ destacados como su propio elemento visual — es el gancho de conversión más fuerte de todo el producto y hoy se pierde diluido en el resto del texto.

**OBJECTION-HANDLING:** "¿Qué pasa después del primer mes a 1€?" (se cobra el plan completo automáticamente, se puede cancelar antes), "¿Puedo cambiar de plan luego?", "¿Los QR físicos van aparte?" (sí, compra separada desde el panel).

**SALTO-CUÁNTICO — CONFIRMADO en la Parte 11, se construye:** justo debajo del PRICING-BLOCK, antes del OBJECTION-HANDLING. El elemento 3D del hero de esta página (la tarjeta de QR/carta flotante, reactiva al cursor, ya definida en la Parte 7 para `/qr`) se transforma en scroll en el elemento 3D del hero de Núcleo Operativo (el dispositivo/pantalla flotante con el flujo de pedido en bucle, también ya definido en la Parte 7 para `/base-operativa`) — misma pieza visual, sin activo 3D nuevo que construir. Copy de dos tiempos, corto, sin explicación adicional: **"Esto es una carta."** (mientras se ve la tarjeta QR) → **"Esto es tu negocio entero."** (cuando termina de transformarse en el dispositivo de Núcleo Operativo), con un CTA propio hacia `/base-operativa` distinto del CTA-FINAL de cierre de página. Implementación técnica: React Three Fiber/Spline con interpolación de geometría o cross-fade entre las dos escenas ya construidas para cada página — coordinar con la Parte 7 para que ambos elementos 3D compartan un sistema de coordenadas/escala compatible desde el principio, en vez de construirlos por separado y tener que adaptarlos después.

> **CORRECCIÓN aplicada 2026-09-22 (ver Parte 15):** la construcción real diverge de esta especificación — no hay interpolación de geometría entre una escena compartida. El agente de código implementó `Hero3D.tsx` como **dos escenas independientes y autosuficientes** (una en `/qr`, otra en `/base-operativa`), cada una con su propio bucle entre el estado "carta" y el estado "pantalla", con salto de escala en el cruce y énfasis de tiempo distinto por página. Aceptado como versión definitiva del bloque (más simple de mantener) — ver Parte 7, Sección 2.3 para el detalle técnico corregido. **Sin confirmar todavía:** si el copy de dos tiempos y el CTA propio hacia `/base-operativa` descritos arriba sobrevivieron en la implementación real — no se ha hecho QA visual en navegador de este bloque (Parte 14, Fase 6, punto 25).

**CTA-FINAL.**

---

## 4. Experience

**HERO propio:** titular actual ("Un evento entero, montado. La taquilla entera, tuya.") con mockup de fondo de uno de los 7 formatos ya diseñados (usar el caso Alhambra/Cata de Maridaje como imagen de referencia, es el caso ya probado).

**POWER-STATEMENT:** "Cero comisión. El dinero es tuyo desde el primer euro." — cierra la duda de "¿de qué vive DKitchen entonces?" antes de que el visitante la formule, reforzando que el ingreso de DKitchen es la propia tarifa fija, nunca un porcentaje de la venta.

**FEATURE-SPLIT — los 7 formatos:** de lista de texto a galería visual, cada formato con su marca virtual asociada (Santa Brazza → Noche de Asado, My Latin Bowl → Bowl Night, etc., Parte 2 Sección 5.2) — esto ya existe como contenido, falta el tratamiento de galería en vez de lista.

**PRICING-BLOCK — escalera de fidelización, no tabla plana:** ilustrar visualmente el camino descendente de precio (299€ primera vez → 250€ nuevo evento → 150€ reuso → 99€ fidelizado, con el atajo de 199€ para cliente QR activo marcado aparte) como una progresión, no cuatro cajas iguales — el mensaje visual debe ser "cuanto más repites, menos pagas", que es literalmente la mecánica.

**OBJECTION-HANDLING:** cómo se cobra la entrada (pasarela propia del cliente: Stripe, SumUp o Revolut Pay, a su elección), quién paga los anuncios (aparte, a Meta/Google, DKitchen gestiona pero no intermedia el dinero), plazo (~3 semanas de la reunión inicial al evento).

**CTA-FINAL.**

---

## 5. Auditoría de canales externos

**HERO propio:** "Un diagnóstico, no una promesa" ya tiene buena tensión honesta — dale tratamiento de declaración (fondo distinto, tipografía grande de "afirmación"), no de tarjeta de producto genérica.

**Precio ausente — no es un problema que esta parte resuelva, pero bloquea el rediseño:** hoy solo dice "pago único" sin cifra (heredado como pregunta abierta de la Parte 1, Sección 7.4). Ningún tratamiento visual compensa la ausencia de un número — sin precio, el bloque PRICING-BLOCK de esta página no se puede construir. Recomiendo cerrarlo antes de ejecutar el rediseño de esta página en particular; las otras 5 páginas no dependen de esto y pueden avanzar ya.

**FEATURE-SPLIT — los 3 pasos:** de texto plano a línea de tiempo visual (Revisión → Informe cuantificado → Siguiente paso natural hacia Base Operativa) — ya existe el contenido, falta el tratamiento de proceso.

**CTA-FINAL con flecha de continuidad hacia Base Operativa** — la lógica de "si el diagnóstico revela algo más serio, el siguiente paso es Base Operativa" ya está en el copy actual, pero sin tratamiento visual de puente entre páginas.

---

## 6. Base Operativa → nombre público "Núcleo Operativo" (CONFIRMADO en la Parte 11)

> **Nota de terminología:** Alex confirmó el renombrado público de este peldaño a **"Núcleo Operativo"** — el nombre técnico interno ("Base Operativa") puede mantenerse sin cambios en rutas, código y en los documentos de arquitectura (Partes 1, 3, 7, 8) para no forzar un refactor innecesario; lo que cambia es el nombre que ve el cliente: título de página, hero, nav, y cualquier CTA o copy de venta. La ruta `/base-operativa` puede mantenerse tal cual por simplicidad técnica (no afecta al SEO ni a nada ya indexado, porque el sitio está en migración) salvo que el agente de código prefiera moverla a `/nucleo-operativo` — es una decisión técnica libre, no de negocio.

**HERO propio:** nuevo titular que incorpora el nombre y la promesa de propiedad real que Alex pidió — ej. "Núcleo Operativo: tu sistema, no una web más. Conectado a tu TPV, sincronizado con tu gestoría." (sustituye a "Moderniza tu local y dispara tu rentabilidad hoy", que puede conservarse como subtítulo si se quiere mantener el gancho original) — con mockup real de la PWA en uso (pantalla de pedido en curso, o el KDS) — no una imagen genérica de restaurante. Este es también el nombre que debe aparecer en el peldaño correspondiente del FEATURE-SPLIT de la escalera del Home (Sección 2) y en cualquier mención cruzada desde Auditoría (Sección 5) o QR (Sección 3).

**FEATURE-SPLIT × 4 — esto es lo más urgente de toda la Parte 6:** hoy la profundidad real de la PWA (Parte 3, Sección 1) no está en la página. Se necesitan 3-4 bloques dedicados, cada uno con su propio mockup/icono, agrupando las funciones relacionadas:
1. **Todo pedido, un solo sitio** — autopedido, teléfono, mesa, recogida, modo camarero, con ticket de cocina y barra automático.
2. **El cliente ve su pedido en vivo** — tracking persistente (recibido → preparación → reparto → entregado), impresora térmica integrada.
3. **Catálogo que nunca miente** — reactivo y atómico: un producto agotado desaparece o se marca "agotado" al instante, sin reimprimir nada. Multiidioma disponible (Parte 5, Sección 2.1).
4. **Control incluso en el peor momento** — bloqueo de emergencia ante picos de pedidos, fidelización propia integrada, cierre de día que migra la venta al sistema fiscal/Verifactu que el cliente ya tiene.

Esto no es "más features que enumerar" — es la diferencia entre que la página comunique "casi nivel POS" (como ya dice el FAQ) o se quede en una promesa vacía sin respaldo.

**PRICING-BLOCK — el stack de 980€ en bonos:** ya es un buen anclaje de precio, mantenerlo pero con tratamiento de "regalo desbloqueado" (cada bono con su precio tachado y marcado como incluido: Auditoría Google Maps 180€, Ingeniería de Carta 250€, Inyección de Tráfico 300€, Kit de Redes 250€), no como lista plana de cuatro líneas.

**POWER-STATEMENT:** aquí cabe, sin nombrar a ningún competidor, la conclusión de la comparación con el mercado (Parte 5, Sección 3.1): "Cada función existe para que factures más, no para que gestiones más." — es la frase que resume el eje de posicionamiento que Alex definió, y hoy no está escrita en ningún sitio de la web.

**CTA-FINAL.**

---

## 7. Dark Kitchen

**HERO propio:** "Si tu sistema es un caos, más clientes significará tu ruina" — gancho fuerte, mantenerlo tal cual.

**POWER-STATEMENT — el más urgente de arreglar tras Base Operativa:** la comparación de comisión perdida (10.000€ de facturación = 3.000€ perdidos en apps de delivery, frente a 0€ con el ecosistema propio) ya existe como dato pero vive en texto corrido — es el mejor gancho numérico de toda la página y necesita tratamiento de cifra enorme, sola, con su propio fondo.

**PRICING-BLOCK — ausente hoy, cifras ya cerradas en la Parte 3:** sin precio visible nadie evalúa si le interesa. Mostrar: desarrollo (1.200€ marca 1, -20% marca 2, -30% marca 3+) y cuota mensual (120€/99€/89€ según nº de marcas, con el escalado por volumen de pedidos). No hace falta exponer cada escalón de volumen de la tabla completa de la Parte 3 en la web pública — sí una cifra de entrada clara con un "desde" y remitir el detalle exacto a la conversación de cualificación, coherente con que este peldaño sigue siendo venta consultiva, no autoservicio.

**FEATURE-SPLIT — catálogo de marcas virtuales:** de lista de texto a galería visual (Smash Burgers, Sushi, Kebab...) con mockup de cada marca — ya existe el contenido, falta el tratamiento de galería.

**OBJECTION-HANDLING con tratamiento de escasez real:** la exclusividad ("2 proyectos simultáneos por trimestre") debe tratarse visualmente como la misma escasez genuina que ya se estableció como principio para Experience (Parte 2, Sección 3) — nunca escasez artificial, pero si es real, debe sentirse real en el diseño, no como una línea de letra pequeña.

**CTA-FINAL** con la puerta de admisión clara (Auditoría Operativa → Ingeniería de Carta → Despliegue Tecnológico).

---

## 7-bis. Casos de éxito (página nueva — CONFIRMADO en la Parte 11)

Página nueva, `/casos-de-exito`, aprobada por Alex como la pieza de mayor apalancamiento para vender Base Operativa/Dark Kitchen sin que él tenga que negociar cada cierre (razonamiento completo en la Parte 11). Estructura:

- **HERO propio:** "Esto no es una promesa. Es lo que ya está funcionando." — enlaza directamente con el POWER-STATEMENT del Home ("no lo vendemos, lo hemos operado").
- **Un bloque por caso, formato ficha, no lista de texto:** nombre del negocio, ubicación, qué tenía antes → qué usa ahora (QR / Experience / Base Operativa / Dark Kitchen, según el caso), vídeo corto de demo del sistema en uso (grabado por Alex o cedido por el cliente), y — solo cuando exista un dato real medido, nunca estimado — una cifra concreta de impacto. Primeros casos a documentar: **Néstor Pizza** (`nestorpizzas.es`, Base Operativa, Caniles/Baza) y **Seven Food Fries** (demo visual, sin publicidad activa de datos de negocio salvo autorización del cliente).
- **Sin cifras inventadas ni "hasta un X%":** cada ficha muestra solo lo que ese cliente concreto autorizó a mostrar. Esto es la misma disciplina que ya se aplicó al retirar la cifra de "14h/semana" del hero de QR (Sección 3) — un caso real y verificable pesa más que una media estadística sin respaldo, y es coherente con la investigación de venta por ROI en SaaS de restauración (Parte 10, Sección 7): el propietario de un restaurante evalúa por euros reales, no por un porcentaje genérico.
- **CTA-FINAL doble:** "Quiero un sistema así" (hacia Base Operativa) y "Habla con Alex sobre tu caso" (contacto directo) — esta página es, por diseño, el activo que más reduce la necesidad de prospección en frío según crezca el número de casos documentados.
- **Enlace desde:** Home (FEATURE-SPLIT de la escalera, Sección 2), y desde el CTA-FINAL de Base Operativa y Dark Kitchen (Secciones 6 y 7) como refuerzo de confianza justo antes de la decisión de compra.

**Requisito operativo, no de diseño:** cada caso necesita autorización explícita del cliente real (nombre del negocio, vídeo, cualquier cifra) antes de publicarse — mismo principio de aprobación obligatoria ya establecido para las fotos generadas por IA en el formulario de intake (Parte 8, Sección 5-bis).

---

## 8. Notas de implementación

- Esta parte no depende de las Partes 1-5 técnicamente (no introduce producto ni precio nuevo, salvo hacer visibles cifras que ya estaban confirmadas pero no publicadas: Dark Kitchen). Puede ejecutarse en paralelo a cualquier otra fase pendiente.
- El único bloqueante real es el precio de Auditoría (Sección 5) — heredado de la Parte 1, no de esta parte.
- **El checkout de QR (Sección 3) se construye dentro de esta misma fase** — CONFIRMADO por Alex, cuenta de Stripe lista para configurar vía API. No es un punto pendiente ni condicional.

### Orden de fases — CONFIRMADO por Alex

Esta parte (estructura visual + copy de venta) es la fase que se ejecuta primero. A continuación sigue la **Parte 7** (`DKITCHEN_MIGRATION_PLAN_PARTE7.md`) — movimiento e interacción: scroll con inercia (Lenis), storytelling real por scroll (Framer Motion `useScroll`/`useTransform` o GSAP ScrollTrigger), elemento 3D reactivo en el hero de cada página de producto (React Three Fiber o Spline), transiciones de página (`AnimatePresence`) y micro-interacciones de tarjetas (tilt real) — formalizada a partir de la Sección 10 de `DKITCHEN_MIGRACION_COMPLETA.md`, el documento que Alex compartió y que esta sesión ya tiene íntegro. No cambia ningún color ni identidad visual ya definida en esta Parte 6 — es una capa de refuerzo sobre la estructura y el copy que aquí se especifican, nunca un rediseño.
