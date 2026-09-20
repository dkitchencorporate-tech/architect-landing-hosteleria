# QR personalizado, SEO programático y afiliados: qué se construyó y qué queda mapeado

**Fecha:** 20 de septiembre de 2026
**Origen:** al analizar `javiggil.com/56fc9cb32b97` para el motor de QR (ver
`MOTOR_QR_ANALISIS_PROFESIONAL_Y_PLAN.md`), el titular del proyecto señaló que
esa misma referencia contiene tres ideas de valor añadido que DKitchen debe
tener configuradas también: QR con aspecto de marca, SEO programático, y un
programa de afiliados. Este documento separa las tres con precisión: una se
construyó y se verificó esta sesión; las otras dos quedan mapeadas a las fases
donde ya estaba previsto tratarlas, con instrucciones concretas, no con una
intención genérica.

No repetir aquí el error que ya se corrigió en otro sitio: la fuente no es un
manual de infraestructura, es una guía de un producto de generación de QR con
arte de IA. Se toma de ella la idea de negocio, no su implementación técnica
—que depende de GPU de pago e iteración manual, desproporcionado para el
estado actual del proyecto—.

---

## 1. QR con marca del restaurante — CONSTRUIDO Y VERIFICADO

### Qué se descartó, y por qué

La fuente monta el aspecto personalizado con **ControlNet sobre Stable
Diffusion**: un modelo de IA generativa que funde una imagen artística con el
patrón del QR. Es real y funciona, pero la propia fuente reconoce sus costes:
*"la IA no acierta a la primera... necesita generar varias versiones y,
muchas veces, un segundo pase de ajuste fino"*, factura por segundo de GPU
(0,000225 $ a 0,001525 $/seg en Replicate), y *"los espacios de demostración
gratuitos se quedan sin GPU asignada quien sabe cuándo; para servir esto a
clientes de pago hace falta una API de pago de verdad"*.

Nada de eso es proporcionado hoy: cero clientes reales todavía, el
aprovisionamiento de QR sigue siendo manual (tarea aplazada #16). Construirlo
ahora sería exactamente el tipo de sobreconstrucción que este proyecto ha
evitado en todo lo demás.

### Qué se construyó en su lugar

Un QR estándar —sin IA, sin coste de GPU, sin llamada a ningún servicio de
pago— coloreado con la marca del restaurante y con su logo superpuesto en el
centro, usando corrección de errores de nivel **H** (tolera hasta 30% de daño
en la imagen), que es la misma vía que la propia fuente describe como la
fiable: *"esto te ahorra el código base"*, sin el componente de IA.

**Piezas:**

- **`db/migrations/0009_color_de_marca.sql`** — columna `color_marca` (hex,
  validado por restricción) en `restaurantes`. Dato público del mismo tipo que
  `logo_url`: concedido a `dk_anon` igual que el logo. Aplicada a `main`.
- **`db/generar-qr.mjs`** — genera el QR a partir del código, coloreado con
  `color_marca` (o un negro de contraste alto por defecto si el restaurante
  no ha fijado el suyo) y con `logo_url` incrustado si existe. Escribe un
  `.svg` (vectorial, para imprenta) y un `.png` a 1200dpi equivalente.

**Verificación real, no visual:** el script rasteriza el SVG resultante y lo
**decodifica de vuelta** con un lector de QR de verdad (`jsQR`). Si el texto
decodificado no coincide exactamente con la URL codificada, el script falla y
no escribe ningún archivo. Un QR que "se ve bien" pero no escanea no sirve de
nada, y no hay forma de saberlo mirándolo. Probado en esta sesión con y sin
logo, con color de marca personalizado (`#FF4500`) y con el logo superpuesto:
decodifica correctamente en ambos casos.

**Uso:**
```
node db/generar-qr.mjs <entorno-del-propietario> <codigo> <dominio> [carpeta-salida]
# o: npm run db:generar-qr -- <entorno> <codigo> <dominio> [carpeta-salida]
```

El dominio se pasa explícito a propósito: un QR generado con el dominio de
previsualización de Vercel hay que regenerarlo con el dominio final antes de
imprimir de verdad — ver `SEGURIDAD_Y_PERSISTENCIA_NEON.md`, Sección 8.8.

**Para fijar la marca de un restaurante:** `UPDATE restaurantes SET
color_marca = '#RRGGBB' WHERE slug = '...'` (o desde el panel de cliente,
cuando exista — hoy no hay interfaz para esto, es un dato de base de datos).

### Lo que queda fuera de esta pieza, a propósito

No se ha construido interfaz de administración para elegir el color o subir
el logo: el panel de cliente sigue sin backend real (ver `ESTADO_FRONT.md`).
Cuando se construya el panel de cliente, este campo ya existe en el esquema y
solo hace falta un formulario que lo escriba — no requiere ninguna migración
nueva.

---

## 2. SEO programático — MAPEADO a la Fase SEO (tarea #7), no construido aún

### Qué dice la fuente, con precisión

Sección 7 de la guía: en vez de una landing genérica, montar **una plantilla**
que combine datos propios con la intención de búsqueda de una variante de
palabra clave que se repite cientos de veces (su ejemplo es "QR para WiFi",
"QR para Instagram", "QR para tarjeta de visita"). Cuatro pasos: encontrar el
patrón de palabra clave, ver qué buscan de verdad las páginas que ya rankean
para esas variantes, montar una plantilla que las cubra con datos reales, y
publicar en bloque.

**La advertencia que hay que respetar, citada literalmente de la fuente
(John Mueller, Google):** *"programmatic SEO is often a fancy banner for
spam"*. Si las páginas no aportan un dato o una utilidad real y distinta en
cada una, Google las trata como spam. Cada página tiene que servir sola.

### Cómo se traduce al negocio de DKitchen, sin inventar de más

El equivalente real para este proyecto no es "QR para WiFi": es una página
por **combinación tipo de negocio × ciudad**, con datos reales de esa
combinación, no una plantilla vacía repetida:

- `/carta-digital-para-restaurantes-en-{ciudad}` — con el número real de
  restaurantes que ya usan DKitchen en esa ciudad (cuando lo haya; con cero,
  no se publica la página — publicar una página vacía es exactamente el spam
  que la advertencia señala), el motor de QR explicado, y un caso de uso
  local si existe.
- `/qr-para-carta-de-{tipo-de-cocina}` (tapas, sushi, hamburguesas...) — con
  el diseño de carta que ya existe en `/demo/carta` adaptado a ese tipo, que
  es un dato real y distinto por página, no relleno.

**Regla de aceptación antes de publicar cualquier página de este tipo:**
¿esta página, sin las demás, le sirve a alguien que la encuentre sola desde
Google? Si la respuesta es no, no se publica todavía.

**Dónde ejecutar esto:** es el contenido central de la tarea #7 (Fase SEO),
que ya estaba en el orden operativo antes de este documento. No se adelanta
aquí porque exige datos que hoy no existen (restaurantes reales por ciudad) y
porque construirlo antes de la Fase 4 (reestructura de navegación) dejaría
páginas nuevas colgando de una estructura que va a cambiar.

---

## 3. Programa de afiliados — MAPEADO, con casilla propia porque no encaja en ninguna fase existente

### Qué dice la fuente

Comisión del 30% recurrente de por vida, sin techo de ganancias, pago por
PayPal sin mínimo de retiro. Herramientas listas citadas: **Rewardful**
(conecta con Stripe en un clic, desde 49 $/mes, 0% de comisión propia sobre lo
pagado a afiliados) y **FirstPromoter** (mismo patrón, compatible con
Stripe/Paddle/Recurly/Chargebee/Braintree). El giro que la fuente destaca: no
reclutar con email de venta — dar la comisión sin techo y dejar que el dinero
fácil convierta al desconocido en vendedor.

### Por qué no se construye ahora, y dónde debe vivir

Un programa de afiliados presupone dos cosas que este proyecto todavía no
tiene: **cobro recurrente funcionando** (no hay pasarela de pago integrada
todavía — es la Sección 5.3 de `SEGURIDAD_Y_PERSISTENCIA_NEON.md`, el
checkout del QR Menú, que sigue siendo alta manual por decisión explícita) y
**volumen de clientes que justifique reclutar vendedores externos**. Montar
un programa de afiliados antes de tener ninguna de las dos cosas es construir
la distribución antes que el producto que se distribuye.

**Dónde debe vivir cuando llegue el momento:** no es una tarea de
`architect-landing-hosteleria` (esta web), sino del sistema de prospección —
`dkitchen-prospector` (tarea #10). Queda anotado ahí como requisito futuro,
no como tarea activa: cuando exista cobro recurrente real y el volumen lo
justifique, evaluar Rewardful o FirstPromoter sobre la pasarela de pago que
se elija, con la misma condición de la fuente —comisión sin techo, pago sin
mínimo— como punto de partida de la negociación con afiliados, no como
compromiso ya cerrado.

---

## 4. Resumen para quien continúe

| Pieza | Estado | Dónde |
|---|---|---|
| QR con marca del restaurante | **Construido y verificado** | `db/generar-qr.mjs`, migración 0009 |
| SEO programático por ciudad/tipo de cocina | Mapeado, con regla de aceptación | Tarea #7 (Fase SEO), después de la Fase 4 |
| Programa de afiliados | Mapeado, con precondiciones explícitas | Tarea #10 (`dkitchen-prospector`), tras cobro recurrente real |

Con esto, las tres ideas señaladas están configuradas donde correspondía
configurarlas hoy, y mapeadas con instrucciones precisas donde no. No queda
ninguna a medias ni sin dueño.
