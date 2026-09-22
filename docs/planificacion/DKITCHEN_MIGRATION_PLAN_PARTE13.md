# DKITCHEN — PARTE 13: SIMULACIÓN HORA 0 v2 — SIN TECHO GEOGRÁFICO, META DE 10 CASOS, Y POR QUÉ ESTO SÍ ES UN NEGOCIO CAMBIA-VIDA

**Complementa a y corrige la Parte 10.** Repite la auditoría de simulación desde el minuto cero incorporando todo lo decidido desde entonces (Partes 11 y 12), corrige un error de partida mío, y responde directamente a las dos preguntas que planteas: por qué esto se convierte en negocio cambia-vida, y cómo acelerar el alcance de resultados.

---

## 0. Corrección de partida — Granada y Baza nunca fueron el techo

Lo dejo dicho con la misma claridad con la que tú lo has corregido: en la Parte 10 traté el TAM de Granada capital + Baza (2.000-3.500 negocios estimados) como si fuera el límite estructural del negocio. **Eso fue un error de framing mío, no algo que tú hayas dicho.** Granada y Baza son tu base operativa física — donde vives, donde puedes prospectar en persona hoy — no una frontera para ads ni para prospección digital. Corrijo el modelo completo de esta parte partiendo de eso: **los ads y la prospección digital escalan en alcance geográfico desde el minuto uno, sin límite autoimpuesto, cada vez que el presupuesto de reinversión lo permite** (mecanismo ya definido en la Parte 11, Sección 1).

Esto cambia una conclusión real de la Parte 10 que si era correcta y sigue siéndolo: el techo real de esta simulación **nunca fue geográfico** — es de volumen de conversión por grupo de anuncios (el propio algoritmo de Meta necesita ~50 conversiones/semana por ad-set para salir de fase de aprendizaje, Parte 10 Sección 3, y eso no cambia por ampliar el mapa) y de capacidad de ejecución (cuántos Núcleo Operativo/Dark Kitchen puedes cerrar y entregar tú mismo sin ayuda). Ver Sección 3 para el desarrollo completo de esto.

---

## 0-bis. Actualización — estructura de ads, meta ampliada a 20 casos, y horizonte de salida de España

Tres correcciones tuyas que cambian los supuestos de esta parte, incorporadas directamente:

**a) Estructura de ads — ya no son 4 grupos genéricos repartiendo presupuesto entre todos los servicios.** Son **dos streams dedicados y separados**, cada uno con su propia creatividad (estática + vídeo):
- **QR + los nuevos complementos (Google Business, reservas, reseñas):** 15€/día.
- **Auditoría + Escandallo:** 10€/día.
- Total de partida: **25€/día ≈ 750€/mes** (sube el punto de partida de la Parte 13 original, 600€/mes).
- **La norma de reinversión se mantiene igual que en la Parte 11:** el presupuesto total sube según entran tanto los 1€ de QR como los 47€ de Auditoría, **sin importar de qué stream vino el cliente que convirtió** — es un fondo de reinversión compartido, no dos presupuestos aislados que crecen cada uno solo con su propio origen. Cómo repartes el aumento entre los dos streams día a día es una decisión operativa tuya, no una fórmula fija — este documento actualiza el punto de partida, no un reparto automático del crecimiento.

**b) Descuento exclusivo de prospección física — nuevo, y deliberadamente excepcional.** Formalizo esto como lo que es: una excepción acotada a la norma de "precio fijo, sin negociación" que rige el resto de la escalera (Parte 2, Sección 1.1; Parte 8, todo el documento) — no una reversión de esa norma:
- **Aplica únicamente a negocios prospectados por ti en persona**, nunca a un cliente que llega por canal digital/autoservicio.
- **Descuento de hasta el 50%**, decidido caso por caso, exclusivamente por ti, en el momento de la visita — no hay tabla ni automatización para esto, es deliberadamente manual.
- **Su único propósito es acelerar el volumen de casos de éxito documentables** (Parte 6, Sección 7-bis) — no es una herramienta de venta general, es el precio que pagas por comprimir en semanas lo que la prueba social tardaría meses en generar por canal orgánico.
- **Efecto en la meta:** con esta palanca y el tiempo disponible antes de tu salida de España, la meta de la Sección 1 pasa de **10 a hasta 20 casos de éxito documentados**, sujeto a tiempo real disponible.
- **Nota para el agente de código:** esto no necesita checkout ni automatización — es un cierre manual (transferencia, factura con importe ajustado) fuera del flujo de autoservicio. No construir ningún campo de "código de descuento" público; si hace falta algo, es un ajuste de importe que tú mismo introduces al facturar ese caso concreto, nunca expuesto al cliente final como opción.

**c) Horizonte de salida de España (~febrero/marzo de 2027) — contexto, no un cambio de alcance ahora mismo.** Sales de España en esa fecha aproximada, lo cual explica (más allá de las ventajas ya auditadas en la Parte 12) por qué no quieres quedar fiscalmente atado como facturador directo en España a largo plazo. **Esto no cambia nada de lo que se construye ahora:** DKitchen sigue operando en España bajo `.es`, con los mismos precios y condiciones, sin modificación. La operación internacional (LLC en EEUU, posible marca o dominio `.com` distinto para LATAM con precios/condiciones propias) se diseña **cuando llegue el momento**, no ahora — se deja anotado aquí como contexto de negocio para que el resto de las decisiones de esta fase (sobre todo la de pasarela de pago, Parte 12) se entiendan en su motivo real, no como una tarea pendiente de construcción.

---

## 1. El mecanismo de prospección física — formalizado con meta de salida explícita

Lo que describes no es "prospección física indefinida en Granada/Baza" — es un **runtime de validación con una meta de salida concreta y medible**, y lo formalizo así porque es exactamente lo que hace falta para que no se convierta en un nuevo cuello de botella dependiente de tu presencia (el mismo problema estructural que toda esta refactorización busca resolver):

- **Objetivo de esta fase: 10-20 casos de éxito documentados y recortables** (mismo estándar ya definido en Parte 6, Sección 7-bis — ficha + vídeo + autorización explícita del cliente; el tramo alto, hasta 20, es alcanzable con la palanca de descuento exclusivo de prospección física, Sección 0-bis). No es "vender lo máximo posible en Granada/Baza" — es específicamente acumular el mayor número posible de pruebas reales y repetibles antes de que cambie tu disponibilidad de prospección física presencial (salida de España, Sección 0-bis).
- **Por qué físico primero, ahí donde estás:** cada visita profesional presencial genera datos que ningún anuncio puede darte todavía — objeciones reales en vivo, tiempos de entrega reales, reacción real al ver la demo (Néstor Pizza, Seven Food Fries) en el momento, fricciones del formulario de intake (Parte 8, Sección 5-bis) que solo se detectan con un cliente real delante. Es literalmente la fase de control de calidad del sistema completo antes de escalarlo sin supervisión directa.
- **Condición de cierre de fase — la que tú mismo pones:** si la prospección física no llega al mínimo de 10 casos a un ritmo razonable, **la vía digital los consigue en su lugar** — no hay exclusividad de canal, hay una meta y dos caminos posibles hacia ella, y gana el que llegue primero. Esto es coherente con no dejar que ningún canal se convierta en una dependencia única.
- **Qué pasa al llegar al mínimo de 10:** la fase de validación manual se puede dar por cerrada en cualquier momento a partir de ahí — no porque dejes de prospectar en persona, sino porque el motor de venta ya puede apoyarse en la página de casos de éxito (Parte 6, Sección 7-bis) y en el embudo digital como mecanismo principal. Seguir hasta 20 es una extensión deliberada mientras siga siendo eficiente en tiempo, no una obligación — el criterio de corte real es tu propio calendario de salida de España (Sección 0-bis), no un número exacto de casos.

---

## 2. Supuestos actualizados de Hora 0 (ajustables, igual que en la Parte 10)

Todo lo demás de la Parte 10 permanece: sitio, checkout, dashboards, flyers, tarjetas, creatividad y redes ya terminados y en marcha; Meta Ads activo. Lo que cambia:

| Elemento | Parte 10 (original) | Parte 13 (corregido) |
|---|---|---|
| Alcance geográfico de ads | Fijo: Granada capital + pueblos cercanos + Baza | **Sin límite fijo — empieza en tu radio físico, amplía clúster geográfico según crece el presupuesto de reinversión (Parte 11, Sección 1)** |
| Presupuesto de ads | 4 grupos × 5€/día ≈ 600€/mes, fijo, repartido entre todos los servicios | **Dos streams dedicados: QR+complementos 15€/día, Auditoría+Escandallo 10€/día ≈ 750€/mes de partida** (Sección 0-bis) — creciente por reinversión compartida, no techado — ver tabla de la Sección 4 |
| Producto de entrada anunciado | QR 1€ | QR 1€ **+ order-bump de Auditoría+Escandallo 47€** (Parte 11, Sección 3) en el mismo checkout |
| Precio QR | 19€/49€ | **9€/25€** (Parte 11) |
| Pasarela | Stripe | Whop (Parte 12) — sin impacto en las cifras de conversión, sí en el margen neto por transacción (Parte 12, Sección 2) |
| Prueba social | Ninguna todavía | **Néstor Pizza y Seven Food Fries documentables desde ya, a coste marginal cero** (Parte 6, Sección 7-bis) |

---

## 3. El techo real: volumen de conversión por ad-set y capacidad de ejecución, no geografía

Ampliar el mapa no resuelve el límite técnico de Meta Ads: cada ad-set individual sigue necesitando **~50 conversiones/semana** para salir de fase de aprendizaje de forma estable. Ampliar el alcance geográfico sin aumentar el presupuesto por ad-set no acelera esto — lo que lo acelera es exactamente el bucle de reinversión que ya definiste (Parte 11): más presupuesto por grupo, no solo más grupos dispersos por el mapa. La disciplina correcta es **crecer en profundidad de presupuesto por clúster antes que en número de clústeres simultáneos** — 3 clústeres bien alimentados convierten mejor que 10 clústeres famélicos, aunque los 10 cubran más territorio.

El segundo límite real, y el que de verdad decide si esto cambia tu vida o no, es tu propia capacidad de ejecución en el Nivel C (Dark Kitchen Ruta A, franquicia, marca a medida, Parte 8 Sección 1) — ahí no hay automatización posible, cada cierre sigue pasando por ti. La escalera está diseñada precisamente para que el volumen crezca donde sí escala (QR, Auditoría, Núcleo Operativo semi-automatizado) sin que tu tiempo sea el cuello de botella, y se concentre tu atención personal donde el ticket lo justifica.

---

## 4. Escenarios numéricos — 30/60/90 días, con el bucle de reinversión activo

Presupuesto inicial **750€/mes (25€/día: 15€ QR+complementos, 10€ Auditoría+Escandallo)**, reinvertido de forma compartida según entra ingreso de QR/Auditoría (nunca en ads fríos de Núcleo Operativo/Dark Kitchen, Parte 11 Sección 1) — el ritmo de reparto entre los dos streams al crecer queda a tu criterio operativo, no está fijado aquí. CAC de QR se mantiene en el rango ya verificado de la Parte 10 (30-100€ por cliente pagante, con CPC 2-6€ y conversión de landing 4-8%) — con Auditoría ahora anunciada de forma directa y dedicada (no solo como order-bump), su propio CAC directo se estima en el mismo rango de CPC pero con una conversión de landing probablemente menor (producto de mayor consideración, sin la compra por impulso del 1€) — asumo conservadoramente 2-5%, ajustable en cuanto haya dato real. Tasa de aceptación del order-bump de Auditoría dentro del checkout de QR: **10-20%** de los compradores de QR — rango conservador dentro del benchmark verificado de la industria para order-bumps bien dirigidos (15-40%, con 30-40% en los mejores casos — [CartFlows, datos de SamCart sobre 7.000M$ procesados](https://cartflows.com/blog/order-bump/); tomo el tramo bajo porque Auditoría es una categoría de producto distinta al QR, no un complemento del mismo carrito, así que conviene ser conservador hasta tener un dato propio). **No incluyo en esta tabla los casos cerrados por descuento exclusivo de prospección física (Sección 0-bis)** — esos no dependen de ads ni de CAC, dependen de tu agenda de visitas, así que se suman aparte a la meta de casos de éxito, no a las cifras de MRR de esta tabla.

| | **Peor caso** | **Realista** | **Mejor caso** |
|---|---|---|---|
| **Día 30** — clientes QR pagando | 6 | 12 | 20 |
| Auditoría+Escandallo vendidas (order-bump) | 1 | 2 | 4 |
| Presupuesto de ads reinvertido a día 30 | 750€/mes (sin crecer aún) | ~900€/mes | ~1.150€/mes |
| Casos de éxito documentados | 1 (Néstor Pizza) | 2 (+Seven Food Fries) | 3 |
| MRR acumulado (QR + Núcleo Operativo si hay) | ~55€ | ~115€ | ~200€ |
| **Día 60** — clientes QR pagando (acumulado) | 14 | 28 | 45 |
| Auditoría+Escandallo (acumulado) | 3 | 6 | 10 |
| Primer Núcleo Operativo cerrado | No | Sí (1) | Sí (2) |
| Casos de éxito documentados (acumulado) | 3 | 6 | 9 |
| Presupuesto de ads reinvertido | ~950€/mes | ~1.300€/mes | ~1.850€/mes |
| MRR acumulado | ~140€ | ~1.000€ (incl. 1er Núcleo Operativo) | ~2.100€ |
| **Día 90** — clientes QR pagando (acumulado) | 24 | 46 | 75 |
| Auditoría+Escandallo (acumulado) | 5 | 10 | 17 |
| Núcleo Operativo cerrados (acumulado) | 1 | 2-3 | 4-5 |
| Meta de 10-20 casos de éxito (incl. cierres por descuento físico, fuera de esta tabla) | Mínimo (10) no alcanzado aún vía ads | Mínimo (10) **alcanzado** vía ads | Alcanzado con margen, tramo alto (20) a la vista si se suman los cierres de prospección física |
| Primer Dark Kitchen Ruta B | No | Posible | Sí |
| Presupuesto de ads reinvertido | ~1.100€/mes | ~1.700€/mes | ~2.750€/mes |
| MRR acumulado | ~250€ | ~1.900€ | ~4.300€ |

**Lo que cambia frente a la Parte 10, en crudo:** en el escenario realista, la meta de 10 casos de éxito se alcanza dentro de los primeros 90 días combinando prospección física + los dos casos ya disponibles gratis (Néstor Pizza, Seven Food Fries) — no es un objetivo a un año, es alcanzable en el primer trimestre si se documenta con disciplina desde ya. Eso es, literalmente, el final de la fase de validación manual (Sección 1) y el arranque de la fase donde el embudo empieza a venderse solo con prueba social, no con tu presencia.

---

## 5. Horizontes honestos — qué es real en cada plazo

- **2 semanas:** nada de esto genera todavía ingreso que notes en tu día a día. Lo que sí puede estar listo: Whop configurado y probado (Parte 12), checkout de QR + order-bump en producción, y **Néstor Pizza documentado como primer caso de éxito** (coste marginal cero, ya existe). Es la fase de poner en marcha la maquinaria, no de facturar.
- **1 mes:** primeros clientes QR reales pagando (rango 6-20 según escenario), primer o segundo caso de éxito publicado, primeras ventas de Auditoría+Escandallo vía order-bump. Ingreso real, pero todavía no sustituye ningún ingreso actual tuyo — es la prueba de que el motor funciona, no el motor a régimen.
- **2 meses:** el bucle de reinversión ya debería estar activo y visible (presupuesto de ads creciendo solo, sin que tengas que decidirlo caso a caso), primer Núcleo Operativo cerrado en el escenario realista, 6+ casos de éxito documentados. Este es el punto donde, si los números del escenario realista se cumplen, el negocio empieza a generar caja que puedes reinvertir sin tocar tu bolsillo personal.
- **6 meses:** con la meta de 10 casos ya superada hacia el mes 3, el embudo debería estar convirtiendo Núcleo Operativo/Dark Kitchen con menos esfuerzo de venta directa tuyo por caso (la página de casos de éxito haciendo parte del trabajo). Es un horizonte realista para tener varios Núcleo Operativo activos, el primer Dark Kitchen multimarca, y un MRR que empieza a acercarse a un salario base vivible en España — no "cambia tu vida" todavía, pero ya no es un experimento.
- **1 año:** aquí es donde la respuesta a "negocio cambia-vida" se decide de verdad, y depende de una variable que ningún modelo numérico puede fijar por ti: **cuántos Dark Kitchen/franquicia (Nivel C, alto ticket, consultivo) cierras con tu propio tiempo**, porque ahí no hay automatización que sustituya tu participación. Si el ritmo realista de la tabla se mantiene y consigues encadenar 4-8 cierres de Nivel C en el año (no una cifra inventada — es del mismo orden que "2 proyectos simultáneos por trimestre", el límite de exclusividad que ya definiste en Parte 6, Sección 7, aplicado a 12 meses), ahí sí estás hablando de una cifra de facturación anual que cambia la conversación por completo.

---

## 6. Por qué esto sí se convierte en negocio cambia-vida ahora

La respuesta honesta a por qué la Parte 10 sonó a "esto no te cambia la vida en 3 meses" es que, en ese momento, el modelo tenía tres limitaciones que ya no existen:

1. **Un techo geográfico que nunca debió estar ahí** — corregido en esta parte (Sección 0). El TAM real ya no es 2.000-3.500 negocios, es el mercado hispanohablante completo accesible por canal digital, con expansión LATAM/Centroamérica/EEUU ya contemplada en la elección de pasarela (Parte 12).
2. **Un embudo con un solo punto de entrada agresivo (QR)** — ahora son dos (QR + Auditoría+Escandallo vía order-bump, Parte 11), lo que duplica la superficie de conversión por cada euro de ad spend sin duplicar el coste de adquisición.
3. **Ningún mecanismo de venta que no dependiera de tu presencia física o tu palabra** — resuelto por el flywheel de casos de éxito (Parte 6, Sección 7-bis) con una meta de salida explícita y medible (Sección 1 de esta parte), no un "algún día tendré casos".

Ninguna pieza suelta cambia el negocio. La combinación de las tres — sin techo, doble entrada, y prueba social que vende sin ti — es lo que convierte esto de "un SaaS local que genera un ingreso extra" a "un sistema que puede crecer más rápido que tu disponibilidad personal", que es la definición operativa de negocio que cambia una vida: no que factura mucho un mes, sino que **deja de depender linealmente de tus horas** para crecer.

---

## 7. Cómo acelerar el alcance de resultados — palancas concretas, esta semana

En orden de impacto por esfuerzo:

1. **Documenta Néstor Pizza y Seven Food Fries esta semana, no cuando "haya tiempo".** Es el activo de mayor apalancamiento de todo el plan y ya existe a coste cero — cada semana sin publicarlo es una semana de embudo vendiendo sin su mejor prueba disponible.
2. **Cierra Whop antes que cualquier otra cosa técnica** (Parte 12) — hoy es la dependencia que bloquea que cualquier euro de ads convierta en cliente real. Sin checkout funcionando, todo lo demás de esta simulación es teórico.
3. **Prospecta físico y digital en paralelo desde el día 1, no en secuencia** — no hace falta agotar Granada/Baza antes de lanzar ads más amplios; ambos caminos corren a la vez hacia la misma meta de 10 casos (Sección 1), y el que llegue primero no invalida el otro, lo acelera.
4. **Reinvierte con la misma disciplina con la que ya defines la escasez real de Auditoría/Dark Kitchen** — la tentación va a ser esperar a "tener un colchón" antes de subir presupuesto de ads; el modelo de la Sección 4 solo se cumple si la reinversión ocurre casi en tiempo real, semana a semana, no mensualmente.
5. **No conviertas la prospección física en una tarea indefinida** — el criterio de salida (10 casos) existe precisamente para que no te quedes ahí más tiempo del necesario; en cuanto se cumpla, tu tiempo se reasigna a cerrar Nivel C, que es donde de verdad se mueve la aguja del "cambia-vida" (Sección 5, horizonte de 1 año).

---

## 8. Estado real vs. Hora 0 — ya con el informe del agente en mano

El informe de estado (21/09/2026) confirma que la Hora 0 de esta simulación **todavía no está alcanzada**: identidad, base de datos, motor de QR, refactor visual (Parte 6) y capa de movimiento (Parte 7) están en producción, pero el checkout no puede cobrar de verdad todavía (sin clave de pago configurada), varios precios en producción están desactualizados (QR sigue en 19€/49€, no en 9€/25€), y piezas enteras de la escalera de venta sin negociación (Parte 8: intake, contrato/factura automática, pago fraccionado, Experience 1:1) no están construidas aún. **El orden exacto y priorizado de qué construye el agente a continuación está en la Parte 14**, que ya incorpora este informe.
