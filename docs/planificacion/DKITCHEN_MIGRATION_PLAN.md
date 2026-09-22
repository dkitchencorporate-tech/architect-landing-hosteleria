# PLAN DE MIGRACIÓN DE IDENTIDAD Y REESTRUCTURACIÓN DE STOCK DE SERVICIOS
## Architect.Sys → DKitchen

**Documento preparado para:** el agente de código con acceso de escritura al repositorio `dkitchencorporate-tech/architect-landing-hosteleria`.
**Preparado a partir de:** clonación y auditoría completa del repositorio + lectura de la landing en producción (`hosteleria.architectsys.com`) + los 4 dossiers comerciales de marcas propias (DKITCHEN_DELIVERY_4, BOKADIPAN, Wing Boss, Architect Sys Experience).
**Fecha de auditoría:** 2026-09-20.

> **Instrucción para el agente que ejecute este documento:** esto NO es un simple find-and-replace de "Architect.Sys" → "DKitchen". Es una migración de identidad + un rediseño del modelo de negocio que toca copy, lógica de producto, prompts de IA, y datos de configuración en al menos 20 archivos. Léelo completo antes de tocar código. Hay preguntas bloqueantes en la Sección 7 que el propietario (Alex) debe responder antes de que ejecutes las fases que dependen de ellas — no asumas esos valores.

---

## 0. Resumen ejecutivo

El negocio deja de centrarse en el modelo **Growth** (suscripción 299€/mes + 20% variable con garantía de resultados) y pasa a centrarse en una **escalera de valor de 5 peldaños** sin compromiso recurrente obligatorio ni garantía de resultados, apoyada en un activo que el negocio ya tiene y que hasta ahora no se estaba vendiendo como tal: **seis marcas virtuales propias, ya operadas y documentadas (2020-2022, Madrid)**, que ahora se venden como inventario listo para entregar, no como desarrollo a medida.

El bot de WhatsApp con IA, que hoy es el producto ancla de la sección "Ecosistema 24/7" (450€ setup + 69€/mes), deja de ser un producto principal: se convierte en un upsell de configuración barato, disponible en cualquier punto de la escalera, porque Meta ya ofrece un bot nativo de WhatsApp que cubre lo que antes había que construir a medida.

La marca pasa de **Architect.Sys** a **DKitchen**, apoyándose en el reconocimiento ya existente de Google Business Profile de DKITCHEN CORPORATE SL, la entidad legal real detrás del negocio (Architect.Sys nunca tuvo entidad, registro ni facturación consolidada — era un piloto).

---

## 1. Migración de identidad

### 1.1 Qué cambia

| Elemento | Antes (Architect.Sys) | Después (DKitchen) | Estado |
|---|---|---|---|
| Nombre de marca (copy visible) | "Architect.Sys" / "Architect Sys" | "DKitchen" | Definir estilo exacto — ver pregunta bloqueante #7 |
| Entidad legal | Ninguna (piloto sin registrar) | DKITCHEN CORPORATE SL | Confirmado por PDF adjunto |
| Dirección legal | — | Calle La Granja 1, Alcobendas, CP 28108, España | Confirmado por PDF adjunto |
| Dominio | `architectsys.com` / `hosteleria.architectsys.com` / `architect-sys.com` (3 variantes distintas encontradas en código) | Dominio nuevo comprado por Alex | **BLOQUEANTE — ver 7.1** |
| Email de contacto/soporte | `privacy@architectsys.com`, `support@architectsys.com` | Bajo el nuevo dominio | **BLOQUEANTE — ver 7.8** |
| Email de la entidad (PDFs) | — | `dkitchencorporate@gmail.com` (el PDF muestra "kgmail.com", casi seguro un typo del propio membrete — confirmar con Alex antes de usarlo en producción) | Verificar |
| Número de WhatsApp de negocio | Al menos 3 números reales distintos en uso simultáneo (ver 1.3) | Uno solo, canónico | **BLOQUEANTE — ver 7.2** |
| Color/identidad visual | Naranja `#FF4500` sobre crema `#FDFCF8` | Sin instrucción de cambiarlo — se mantiene salvo que Alex diga lo contrario | No tocar sin confirmación |

### 1.2 Por qué esto no es un cambio de nombre y dominio simple

El grep sobre `src/` para variantes de "architect" y "architectsys.com" devuelve **35+ archivos** con el nombre hardcodeado, y el negocio real (pricing, lógica de bot, prompts de IA) tiene el modelo Growth incrustado en capas que van mucho más allá del copy visible: hay reglas de negocio dentro del generador de creatividades IA y dentro del prompt del bot de ventas en producción. Cambiar el nombre sin tocar esas capas deja el sitio con la marca nueva pero vendiendo el producto viejo.

### 1.3 Inconsistencias encontradas que deben resolverse ANTES de programar (no son bugs a "arreglar en automático", son decisiones que le tocan a Alex)

**Números de WhatsApp encontrados, todos en uso real en algún punto del sistema:**
- `wa.me/34611499674` — el más usado, aparece repetido en `page.tsx`, `HighTicketEcosystem.tsx`, `EventLibraryHook.tsx`, etc.
- `wa.me/34000000000` — placeholder, no debería estar en producción pero está presente en el código.
- `wa.me/34622652659` — visto en el contenido de la landing en producción durante el fetch en vivo (no coincide con el del código fuente auditado — posible edición manual post-deploy o A/B).
- `+34 685 57 09 83` — el que aparece en el membrete oficial de los PDFs de DKITCHEN CORPORATE SL.

Esto es un problema real, no cosmético: un prospecto puede estar hablando con un número mientras el sitio le muestra copy que apunta a otro. **No se puede resolver por código — Alex tiene que decir cuál es el número operativo real.**

**Dominios encontrados en el código, los tres se comportan como "el dominio oficial" en distintos archivos:**
- `hosteleria.architectsys.com` — usado en `privacy/page.tsx`, `terms/page.tsx`, `data-deletion/page.tsx`, `LiveDemoCTA.tsx` (generador de QR), páginas de manuales.
- `architect-sys.com` — usado en `layout.tsx`, `openGraph.url`.
- `architect-landing-hosteleria.vercel.app` — mencionado en `project_state/estado_actual.md` como URL "actual" (documento desactualizado, pero indica que en algún momento fue la URL real de referencia).

**Precios del mismo producto (Recepcionista IA / Agente Híbrido) según la fuente:**
- `_agent_context/MASTER_CONTEXT.md`: 450€ setup + 69€/mes (coincide con lo que está realmente en producción en `HighTicketEcosystem.tsx`).
- `project_state/estado_actual.md`: 650€ setup + 49€/mes (documento desactualizado).
- `src/lib/bot-logic.ts` línea 92: 650€ Setup + 49€/mes, Carta QR 250€, Ads 400€/mes (el bot en producción puede estar citando esto a clientes reales ahora mismo).
- `src/app/api/demo/respond/route.ts`: cita 450€+69€/mes, pero también el "Pack de Arranque valorado en 1.150€ GRATIS" y el discurso de "porcentaje de éxito en taquilla" (Growth).

**Conclusión de esta sección:** hay tres fuentes de verdad de precios distintas y activas al mismo tiempo, y al menos dos de ellas (`bot-logic.ts` y `demo/respond/route.ts`) están conectadas a conversaciones reales con prospectos. Esto se resuelve en la Fase 0 de ejecución (Sección 8) creando una única fuente de verdad, no parcheando cada archivo por separado.

### 1.4 Mapa de archivos con referencias hardcodeadas a la identidad vieja

| Archivo | Qué contiene que hay que migrar |
|---|---|
| `src/app/layout.tsx` | `title: "Architect.Sys \| Agencias de Crecimiento para Hostelería"` (además contiene la palabra "Agencias", prohibida — ver 1.5), meta description con "Agentes IA Híbridos en WhatsApp" como mensaje principal, `openGraph.url: "https://architect-sys.com"`, `authors: [{ name: "Architect.Sys" }]` |
| `src/app/page.tsx` | Lockup de marca hardcodeado en nav y footer: `Architect<span className="text-[#FF4500]">.Sys</span>`, tagline de footer "Tu equipo para llenar tu restaurante", múltiples CTAs `wa.me/34611499674` |
| `src/app/privacy/page.tsx` | "Architect.Sys (en adelante, 'la Plataforma'), operando bajo el dominio hosteleria.architectsys.com", email `privacy@architectsys.com` |
| `src/app/terms/page.tsx` | Metadata canónica sobre `hosteleria.architectsys.com` |
| `src/app/data-deletion/page.tsx` | Metadata canónica sobre `hosteleria.architectsys.com`, email `support@architectsys.com` |
| `src/components/sections/LiveDemoCTA.tsx` | Generador de QR apuntando a `hosteleria.architectsys.com/demo/carta` |
| `src/app/manuals/mapa-navegacion/page.tsx` | Dominio hardcodeado en texto interno |
| `src/app/manuals/google-oauth/page.tsx` | Dominio hardcodeado en texto interno |
| `public/docs/contrato_AS_2026.html` | Plantilla de contrato real que se envía a clientes, bajo la marca vieja — **este archivo es el que más urge**, porque si se firma un contrato nuevo con esta plantilla, el cliente firma con una entidad/marca que ya no existe |
| `_agent_context/MASTER_CONTEXT.md`, `MIGRATION_CONTEXT.md`, `EXECUTIVE_SUMMARY_ARCHITECT.md`, `AGENCY_PROTOCOL_ROADMAP.md`, `SaaS_PROTOCOL.md`, `project_state/estado_actual.md` | Toda la documentación de contexto para agentes de IA sigue describiendo el negocio viejo (marca, precios, modelo Growth). Si no se actualiza, el próximo agente de IA que trabaje en el repo (Jules, Antigravity, Claude Code) va a seguir estas instrucciones desactualizadas por encima de lo que tú le digas puntualmente. **Esta actualización es tan crítica como el código** — ver Fase 7 en la Sección 8. |

### 1.5 Regla permanente de copy: eliminar el encuadre de "agencia"

Instrucción explícita y no negociable del propietario: la palabra "agencia" (y variantes: "agencias de marketing", etc.) no debe aparecer en ningún copy, metadata, título de sección, ni en los prompts de IA. Esto incluye:
- `layout.tsx`: título actual contiene "Agencias de Crecimiento para Hostelería" — reescribir.
- `FAQ.tsx`, pregunta 3: "A diferencia de agencias que secuestran tu dominio..." — reescribir sin usar la palabra, aunque el argumento (transparencia de propiedad de datos) se mantiene.
- Cualquier archivo de `_agent_context/` o `manuals/` que use "agencia" para describir el negocio hacia dentro (no hacia el cliente) también debe limpiarse, para que un futuro agente de IA no reintroduzca el encuadre por su cuenta.

---

## 2. La nueva escalera de valor (stock de servicios)

Orden de presentación, cronología de venta y cómo se complementan entre sí:

### Peldaño 1 — QR Menú (entrada, fricción casi cero, único producto de autoservicio)
- **Precio — CONFIRMADO por Alex:** 159€ de montaje/setup (gratis en modo de oferta promocional) + plan mensual en dos niveles: Plan Básico 19€/mes (menú digital + autogestión + 3 plantillas), Plan Ampliado 49€/mes (+ personalización de QR y de menú, promociones/ofertas visibles, botón de "llamar al camarero"). **Primer mes a 1€ simbólico** (no gratis — tarjeta registrada desde la compra, pasa a precio completo automáticamente el segundo mes). Los QR físicos son siempre coste aparte. Desarrollo técnico completo, plantillas, panel de administración y análisis de este modelo en la Parte 2 de este documento (`DKITCHEN_MIGRATION_PLAN_PARTE2.md`, secciones 2-4).
- **Es el único peldaño con checkout de autoservicio real:** el cliente compra directamente en la web (Stripe, cuenta propia de DKitchen), y el sistema aprovisiona solo — cuenta, panel y menú digital con QR — sin que Alex tenga que intervenir en la venta (Parte 2, Sección 2.2-bis). Todos los demás peldaños de la escalera siguen siendo venta consultiva/manual.
- **Función en el embudo:** primer contacto de fricción mínima. Convierte un lead frío en cliente activo con el menor compromiso posible. El precio mensual deliberadamente bajo ("casi ridículo", en palabras de Alex) no es un descuento de lanzamiento — es la estrategia permanente: el QR no es el negocio, es la puerta de entrada a la escalera (ver Parte 2, Sección 3.2).
- **Qué reemplaza:** en el código actual esto vive parcialmente en `TheTrojanHorse.tsx` (que ya muestra un precio tachado de 250€ junto al Base de 700€ — hay que revisar si esa sección necesita convertirse en la tarjeta real del QR Menú en vez de ser un gancho hacia el Base).

### Peldaño 2 — DKitchen Experience (antes "Architect Sys Experience")
- **Precio:** por presupuesto (quote-based), no hay tarifa fija publicada.
- **Función en el embudo:** orquestación de eventos gastronómicos puntuales, sin compromiso recurrente. Es el punto donde el cliente ve resultados tangibles en vivo (ya hay eventos reales cerrados y entregados, como el caso Alhambra documentado en el PDF de propuesta).
- **Estructura confirmada por el dossier ya usado con clientes reales:** venta anticipada de entradas vía Stripe, cobertura de costes integrada en la propuesta, sin suscripción posterior.
- **Menú híbrido:** el cliente puede usar su propia gastronomía en el evento, y opcionalmente incorporar SKUs de las marcas virtuales propias de DKitchen como prueba de tracción — esto es lo que conecta este peldaño con el inventario de marcas (Sección 5).
- **Elimina explícitamente:** cualquier garantía de resultado o reparto de ingresos (ver Sección 4, desmontaje de Growth).
- **Qué reemplaza en el código:** la sección `EventLibraryHook.tsx` actualmente muestra la tarjeta de precios de Growth (299€/mes, toggle 2.990€/año) con el copy "GARANTÍA DE ÉXITO (Variable del 20%)" — esta tarjeta entera se sustituye por la llamada a acción de Experience (contacto para presupuesto), no por una tarjeta de precio fijo.

### Peldaño 3 — Auditoría de canales externos (NUEVO producto)
- **Qué es:** diagnóstico pagado, de pago único, sobre Google Business Profile + redes sociales del cliente. Sin garantía de resultado — es un informe, no una promesa.
- **Precio:** **BLOQUEANTE — ver 7.4**, no está definido.
- **Función en el embudo:** una vez el cliente ha visto resultados en un Experience, está dispuesto a pagar por saber qué le falta en presencia digital. Este es el puente natural hacia el peldaño 4 (si el diagnóstico revela que necesita una web/app seria, no un parche).
- **Nota técnica:** esto es distinto del `business-audit` que ya existe en `src/lib/marketplace-data.ts` (id `business-audit`, "Auditoría de Escandallos y Rentabilidad") — ese es un audit de costes de platos, no de canales digitales. No hay que confundirlos ni fusionarlos; son productos distintos. Hay que **añadir** una nueva entrada a `marketplace-data.ts` (o a la nueva escalera principal, a decidir en Fase 4) para este producto nuevo.

### Peldaño 4 — Digitalización personalizada / Base Operativa
- **Precio:** 700€ pago único (salvo que Alex decida cambiarlo — ver 7.9).
- **Qué es:** sigue siendo el producto de diseño 100% a medida, nivel autor, en formato PWA. No cambia de naturaleza, cambia de posición en el relato: ya no compite conceptualmente contra Growth (que desaparece); ahora es la respuesta lógica después de que la auditoría del peldaño 3 demuestre que el cliente necesita algo serio y no un parche de QR genérico.
- **Qué reemplaza:** nada estructural — se mantiene el producto y su lógica actual en `FAQ.tsx` ("El pago de la Base Operativa es de 700€ (fraccionable)... A partir del tercer mes, el soporte premium y servidor cuesta solo 69€/mes"). Ojo: ese "69€/mes" de mantenimiento del Base **no es lo mismo** que el 69€/mes del bot de WhatsApp en `HighTicketEcosystem.tsx` — son dos mantenimientos distintos que hoy comparten número por coincidencia. Hay que verificar con Alex que esto sea intencional y no otro caso de números que colisionan por accidente.

### Peldaño 4b — Dark Kitchen multimarca ("Marca en Caja")
- Ver desarrollo completo en la Sección 6 (tiene dos rutas distintas y un vacío de producto que hay que construir).

### Fuera de la escalera — Configuración de bot de WhatsApp (downgrade)
- Ya no es un peldaño, es un cross-sell disponible en cualquier punto del recorrido.
- Ver desarrollo completo en la Sección 3.

---

## 3. Degradación del bot de WhatsApp: de producto ancla a upsell de configuración

### 3.1 La razón del cambio
Meta ahora ofrece una opción de bot nativo directamente en WhatsApp Business. Lo que antes había que construir a medida (conexión Meta API + Kommo CRM + entrenamiento de prompt, vendido a 450€ setup + 69€/mes como producto flagship de la sección "Ecosistema 24/7") deja de ser una barrera técnica real para el cliente, así que deja de tener sentido venderlo como producto principal.

### 3.2 Qué implica en el producto
- Deja de ser el centro de `HighTicketEcosystem.tsx` ("El Ecosistema 24/7"). Esa sección debe pasar de ser una sección propia de la página principal a, como mucho, una tarjeta de upsell dentro del panel de cliente (dashboard) o una mención breve, no un bloque con su propio storytelling de 84 líneas de componente.
- Precio nuevo: **BLOQUEANTE — ver 7.5**. Tiene que bajar sustancialmente de 450€+69€/mes para reflejar que ya no resuelve un problema técnico caro, sino que ahora es configuración.
- **Efecto colateral que hay que resolver, no ignorar:** `HighTicketEcosystem.tsx` línea 62-64 contiene esta lógica de bundling: *"Si estás suscrito al plan Growth (299€/mes), tu cuota de mantenimiento de IA es 0€/mes para siempre."* Como Growth desaparece (Sección 4), este gancho deja de tener sentido tal cual está. No se puede simplemente borrar la frase sin decidir qué la reemplaza: opciones a plantear a Alex son (a) eliminar el bundling y dejar el bot como upsell standalone con precio fijo bajo, o (b) incluirlo gratis dentro de Digitalización Personalizada (peldaño 4) como parte del paquete de 700€. Recomendación: opción (b), porque mantiene un gancho de valor percibido sin resucitar un compromiso recurrente obligatorio tipo Growth.
- El badge "Partner Oficial" de Kommo CRM y la dependencia de Kommo en general se mantienen técnicamente (es la integración real), pero el copy debe dejar de presentar esto como "el problema que resuelve tu volumen", porque ya no es el gancho principal de venta.

### 3.3 Archivos con la lógica del bot como producto principal que hay que revisar
- `src/components/sections/HighTicketEcosystem.tsx` — componente completo a reducir/reposicionar.
- `src/components/dashboard/EventsLibrary.tsx`, `src/components/dashboard/Autogestion.tsx` — banners de upsell en el dashboard de cliente que actualmente pitchean "299€/mes" (mezclando Growth con el bot); hay que separar y corregir ambos mensajes.
- `src/lib/marketplace-data.ts`, entrada `whatsapp-bot-v2` (línea 14-27) — el precio actual "Desde 150€/mes" ya está más cerca del nuevo posicionamiento que el de `HighTicketEcosystem.tsx`, pero sigue siendo el mismo producto descrito de dos formas distintas en dos archivos distintos. Hay que unificar cuál de las dos descripciones sobrevive.

---

## 4. Desmontaje completo del modelo Growth

### 4.1 Por qué esto no es solo borrar una sección de la página

El modelo Growth (299€/mes + 20% variable, con garantía de resultado) no vive solo en el copy visible. Está incrustado en al menos cuatro capas distintas del sistema, y las últimas dos son las que de verdad importan porque están activas en producción hablando con prospectos reales ahora mismo:

1. **Copy de marketing visible** — fácil de encontrar y cambiar.
2. **Lógica de bundling de producto** — `HighTicketEcosystem.tsx` (ver 3.2).
3. **Reglas de negocio dentro de la herramienta de generación de creatividades con IA** — esto es contenido que el propio sistema usa para generar anuncios, no solo texto de la web:
   - `src/components/creative-factory/DossierTab.tsx` contiene literalmente una regla llamada **"Ley del Variable sin Riesgo"**, con el texto: *"...garantizando un porcentaje por afluencia (20% variable) para anular el escepticismo"*. Esto significa que cualquier anuncio generado con esta herramienta mientras esta regla siga ahí va a seguir vendiendo Growth aunque la web ya no lo muestre.
   - `src/components/creative-factory/GeneratorTab.tsx` tiene un desplegable con la opción literal **"Modelo 20% Variable (Garantía)"** — un selector que un usuario del panel admin podría seguir eligiendo activamente.
4. **El prompt del sistema del bot de ventas en producción** ("Arqui"):
   - `src/app/api/demo/respond/route.ts` — este es el archivo más urgente de toda la migración. Contiene el diagnóstico de 4 niveles que el bot usa para clasificar prospectos, el guion obligatorio de revelación de precio en 2 pasos, y esta línea exacta que el bot dice a clientes reales: *"Para evitar eso, trabajamos a porcentaje de éxito en taquilla. Y si aplicas hoy, te incluimos el Pack de Arranque valorado en 1.150€ GRATIS."* Mientras este archivo no se reescriba, el bot sigue vendiendo Growth aunque toda la web ya diga otra cosa.
   - `src/lib/bot-logic.ts` línea 92 — tiene su propia lista de precios independiente y desactualizada (ver 1.3), que también hay que alinear.

### 4.2 Qué lo reemplaza

Growth no se sustituye por "otro producto en el mismo lugar de la escalera" — se sustituye por un cambio de filosofía de venta:
- **Antes:** "te garantizo un % de tus ingresos, por eso me pagas una suscripción."
- **Ahora:** "te entrego algo concreto y replicable (un evento, un informe, una app, una marca lista para operar), tú decides si repites."

Esto significa que en el prompt del bot (`api/demo/respond/route.ts`) el "Pack de Arranque valorado en 1.150€ GRATIS" como anzuelo de urgencia debe revisarse: si se mantiene como técnica de venta, debe re-anclarse a un peldaño concreto de la nueva escalera (por ejemplo, como bono de bienvenida al contratar Digitalización Personalizada), nunca como compensación por la ausencia de garantía de resultado.

### 4.3 Checklist de archivos a modificar en esta fase
- [ ] `src/components/sections/EventLibraryHook.tsx` — quitar tarjeta de precio Growth (299€/mes, toggle anual, copy de garantía) y sustituir por CTA de Experience.
- [ ] `src/components/creative-factory/DossierTab.tsx` — eliminar/reescribir la regla "Ley del Variable sin Riesgo".
- [ ] `src/components/creative-factory/GeneratorTab.tsx` — eliminar la opción "Modelo 20% Variable (Garantía)" del desplegable.
- [ ] `src/app/api/demo/respond/route.ts` — reescribir el prompt del sistema completo: diagnóstico de niveles, guion de precio, y la frase de "porcentaje de éxito en taquilla".
- [ ] `src/lib/bot-logic.ts` — alinear con la fuente única de precios (ver Sección 8, Fase 0).
- [ ] `src/components/sections/HighTicketEcosystem.tsx` — resolver el bundling roto (ver 3.2).
- [ ] `src/components/dashboard/EventsLibrary.tsx`, `Autogestion.tsx` — banners de dashboard.
- [ ] `_agent_context/MASTER_CONTEXT.md`, `AGENCY_PROTOCOL_ROADMAP.md`, `SaaS_PROTOCOL.md` — estos documentos describen a Growth como parte estructural del ciclo de vida del cliente ("El propio producto... se convierte en el mejor vendedor de los Up-sells", % transaccional en eventos) y deben reescribirse, no solo el código.

---

## 5. Marcas virtuales propias como activo de venta determinante

### 5.1 Reposicionamiento

Las seis marcas (Wing Boss, Seven Food Fries, Bokadipan, Santa Brazza, Natureza Brunch, My Latin Bowl) no son un proyecto nuevo ni un experimento — son marcas que ya operaron entre 2020 y 2022 en una dark kitchen propia en Madrid, con menús, pricing y (en al menos un caso, Seven Food Fries) una PWA de pedido ya construida y replicable (`seven-food-fries-pwa.vercel.app`, basada en el patrón de clonación de Néstor Pizza). Esto tiene que quedar explícito en el copy: son inventario probado y entregable, no "ideas para desarrollar si el cliente paga por ello".

### 5.2 Datos reales disponibles (de los dossiers PDF, para usar como contenido real, no placeholder)
- **Santa Brazza** (grill/asado): Entrecort 19,90€, Churrasco 16,99€, Asado de tira 16,99€, Parrilla Mixta 49,99€, Costillas BBQ 16,99€, Brochetas 14,80€, Asado de pollo 13,50€, extras 2,99€.
- **My Latin Bowl**: concepto rice-bowl (bases/toppings/proteína/salsas), bowls a 9,99€.
- **Seven Food Fries**: concepto loaded-fries, ítems a 7,77€.
- **Natureza Brunch**: panino/bagels/bircher muesli, rango 6-8€.
- (Bokadipan y Wing Boss: datos en sus PDFs respectivos, ya auditados en el dossier comercial correspondiente.)

### 5.3 Qué construir
Se recomienda una página o sección nueva (`/marcas` o equivalente) en el sitio DKitchen que funcione como catálogo público de estas seis marcas — con menú real, no genérico — para que cumplan dos funciones a la vez:
1. **Prueba social/técnica** dentro de un evento Experience (el cliente ve que son marcas reales, no un mockup).
2. **Catálogo de venta** para el peldaño Dark Kitchen multimarca — el cliente elige directamente de ahí qué marca(s) quiere añadir a su operación.

### 5.4 Dónde vive esto en el código actual
Hoy no existe una sección así. `DarkKitchen.tsx` menciona "marcas virtuales llave en mano" como uno de sus 3 pilares pero de forma genérica, sin catálogo ni datos reales — esto es una construcción nueva, no una edición de copy.

---

## 6. Escalado a Dark Kitchen multimarca: las dos rutas

Este es el hallazgo más importante de la auditoría a nivel de producto: **el código actual solo cubre una de las dos rutas que el negocio necesita vender**, y no es la más barata ni la más frecuente.

### 6.1 Ruta A — Desde cero (ya existe en el código, se mantiene)
- Componentes: `src/components/DarkKitchen.tsx` + `src/components/EnterpriseModal.tsx`.
- Formato: alto ticket (3.000€-10.000€), con puerta de admisión ("Solicitud de Ingeniería de Proyecto", evaluación de comité, "EN LISTA DE ESPERA DE EVALUACIÓN", exclusividad de "2 proyectos simultáneos por trimestre"), calculadora de "hemorragia" (coste de comisiones de delivery vs. margen con PWA propia).
- Esta ruta se mantiene funcionalmente como está, solo necesita la migración de identidad (marca, dominio, número) — su lógica de producto no está rota, es coherente con vender un dark kitchen completo desde cero.

### 6.2 Ruta B — "Marca en Caja" para negocios que ya tienen cocina (NO EXISTE, hay que construirla)
- **El vacío de producto:** hoy no hay ningún flujo para un cliente que ya opera una cocina/restaurante y solo quiere añadir una o más marcas virtuales a lo que ya tiene. El único formulario existente (`EnterpriseModal.tsx`) está diseñado para admisión de alto ticket con evaluación de comité — es fricción excesiva para un producto que debería ser casi de autoservicio.
- **Lógica de precio — CONFIRMADO en su totalidad, ver `DKITCHEN_MIGRATION_PLAN_PARTE3.md` Sección 2.2 y 3.3:** 1.200€ la primera marca (~2.000€ todo incluido, con ~200€ de anuncios geolocalizados + flyers físicos); marca 2 con -20% de descuento (960€); marca 3 en adelante con -30% (840€); el componente de marketing (~200€) se mantiene íntegro por marca, sin descuento. Más una **cuota mensual fija por cada marca activa**: 120€/mes base (1-2 marcas), 99€/mes (3-5 marcas), 89€/mes (6+ marcas) — y cada uno de esos tres niveles escala a su vez si el volumen de pedidos de esa marca (medido de forma objetiva vía la PWA, no autodeclarado por el cliente) supera 5.000€/mes o 10.000€/mes (tabla completa en Parte 3, Sección 2.2).
- **Qué hay que construir:**
  - Un componente nuevo (ej. `MarcaEnCaja.tsx`) con un formulario de contacto/cotización más ligero que `EnterpriseModal.tsx` — sin puerta de admisión ni evaluación de comité, porque la barrera de entrada real es mucho menor (el cliente ya tiene cocina operativa, no está pidiendo construir una empresa entera).
  - Conexión con el catálogo de marcas de la Sección 5.3, para que el cliente pueda seleccionar directamente cuál(es) marca(s) quiere.
  - Entregables a definir en el formulario/propuesta: kit de marca (logo, menú, fotografía), página de pedido PWA (clonando el patrón ya probado de Seven Food Fries), alta en plataformas de delivery, lanzamiento de anuncios geolocalizados + flyers físicos.
- **Diferenciación clave frente a la Ruta A:** la Ruta A vende "te construyo un dark kitchen"; la Ruta B vende "le sumo marcas a la cocina que ya tienes". Son dos audiencias distintas (alguien sin cocina vs. alguien con cocina subutilizada) y deben tener entradas de conversión distintas en el sitio, no compartir el mismo modal.

---

## 7. Preguntas bloqueantes — Alex debe responder antes de ejecutar las fases que dependen de ellas

1. **Dominio exacto comprado.** ¿Cuál es el string exacto del nuevo dominio? El membrete de los PDFs muestra `www.dkitchencorporate.com`, pero no está confirmado que sea el dominio que se acaba de comprar para este proyecto.
2. **Número de WhatsApp canónico.** Hay al menos 3-4 números reales distintos en uso (`34611499674`, `34622652659`, `+34 685 57 09 83`, más el placeholder `34000000000`). ¿Cuál es el único número operativo real a partir de ahora?
3. ~~**Cuota mensual de gestión por marca activa** en el modelo Dark Kitchen multimarca~~ — **RESUELTO Y CERRADO, ver `DKITCHEN_MIGRATION_PLAN_PARTE3.md` Sección 2.2**: tabla completa de 120€/99€/89€ por marca (según nº de marcas activas) cruzada con 3 escalones de volumen de pedidos. Sin cifras abiertas.
4. **Precio de la nueva Auditoría de canales externos** (Google Business Profile + redes).
5. **Precio del upsell de configuración del bot de WhatsApp**, ya que deja de ser 450€ setup + 69€/mes.
6. **Nombre público definitivo del producto Dark Kitchen multimarca:** ¿"Marca en Caja" es ya el nombre final de cara al cliente, o es solo el nombre de trabajo interno? (El nombre anterior barajado, "Architect Sys Ready", ya no es viable con el cambio de marca.)
7. **Estilo exacto del nuevo lockup de marca:** ¿"DKitchen" a secas, "DKitchen Corporate", u otra variante? Esto determina cómo se escribe en nav, footer, metadata y legal.
8. **Email(s) de contacto/soporte bajo el nuevo dominio** (reemplazando `privacy@architectsys.com` / `support@architectsys.com`), y confirmar si `dkitchencorporate@gmail.com` (con la posible corrección del typo "kgmail.com") es el correo operativo real.
9. **¿El precio de 700€ de Base Operativa se mantiene o cambia** dentro de la nueva escalera?
10. ~~**Descuento exacto por marca adicional**~~ — **RESUELTO: CONFIRMADO en `DKITCHEN_MIGRATION_PLAN_PARTE3.md` Sección 3.3** (marca 2: -20%, marca 3+: -30%).
11. **Ver también `DKITCHEN_MIGRATION_PLAN_PARTE3.md` Sección 8** para el listado consolidado de todo lo resuelto y lo aún abierto entre las cuatro partes (incluye el modelo de flujo de pedidos PWA→POS, el ruteo de clientes multimarca/multilocal de entrada directa, el marco de ciclo de vida de clientes con cifras ya cerradas, y la Parte 4 dedicada al agente de prospección).

---

## 8. Plan de ejecución por fases (orden recomendado para el agente de código)

**Fase 0 — Fuente única de verdad de precios.**
Crear `src/lib/pricing-config.ts` (o, si se prefiere alinear con el resto del sistema que ya vive en Supabase, una tabla `pricing_catalog`) con todos los precios de la escalera. Todos los componentes de UI, `bot-logic.ts`, y la generación del prompt de `api/demo/respond/route.ts` deben leer de aquí — el prompt del bot debe interpolar los precios en tiempo de ejecución desde esta fuente, no tenerlos escritos como texto fijo dentro del prompt. Esto es lo que evita que se repita el problema de 3-4 fuentes de precios desalineadas que existe hoy. Esta fase no depende de ninguna pregunta bloqueante y puede empezar ya.

**Fase 1 — Identidad.**
Solo ejecutar una vez resueltas las preguntas bloqueantes 1, 2, 7 y 8. Actualizar: `layout.tsx`, `page.tsx` (nav/footer/CTAs), `privacy/page.tsx`, `terms/page.tsx`, `data-deletion/page.tsx`, `LiveDemoCTA.tsx`, páginas de `manuals/`, `public/docs/contrato_AS_2026.html`. Eliminar también toda ocurrencia de "agencia"/"agencias" (Sección 1.5).

**Fase 2 — Desmontaje de Growth.**
Ejecutar el checklist completo de la Sección 4.3, incluyendo las capas de IA (`DossierTab.tsx`, `GeneratorTab.tsx`, `api/demo/respond/route.ts`).

**Fase 3 — Degradación del bot de WhatsApp.**
Resolver el bundling roto de `HighTicketEcosystem.tsx` (recomendación: incluirlo gratis dentro de Digitalización Personalizada — confirmar con Alex), reducir su presencia de sección propia a upsell, aplicar el nuevo precio (pregunta bloqueante 5).

**Fase 4 — Reestructurar la escalera en `page.tsx`.**
Reordenar/renombrar secciones para reflejar: QR Menú → Experience → Auditoría de canales → Base Operativa → Dark Kitchen multimarca, con el bot de WhatsApp fuera del flujo principal.

**Fase 5 — Construir la Ruta B de Dark Kitchen ("Marca en Caja").**
Componente nuevo + formulario ligero, según Sección 6.2. Depende de las preguntas bloqueantes 3 y 6.

**Fase 6 — Catálogo de marcas virtuales.**
Página/sección con los datos reales de menú de la Sección 5.2, conectada al formulario de la Fase 5.

**Fase 7 — Reescribir la documentación de contexto para agentes de IA.**
`_agent_context/MASTER_CONTEXT.md`, `MIGRATION_CONTEXT.md`, `EXECUTIVE_SUMMARY_ARCHITECT.md`, `AGENCY_PROTOCOL_ROADMAP.md`, `SaaS_PROTOCOL.md`, `project_state/estado_actual.md`. Esta fase es tan importante como el código: mientras estos documentos sigan describiendo el negocio viejo, cualquier agente de IA que trabaje después en este repo (incluido este mismo agente, en una sesión futura) va a seguir esas instrucciones por encima de lo que se le diga puntualmente. Recomendación: consolidar estos 6 documentos en menos archivos, ya que hoy ya están desalineados entre sí incluso antes de la migración.

**Fase 8 — Configuración externa (fuera del repositorio).**
El cambio de dominio rompe cualquier URL registrada externamente: callback de OAuth en Supabase Auth, webhooks configurados en Meta (Cloud API) y en Kommo CRM, DNS, variables de entorno en Vercel. Esto no se arregla con un commit — es checklist operativo que Alex o el agente con acceso a esos paneles debe ejecutar en paralelo al despliegue del código.

**Fase 9 — QA final.**
Grep final sobre `src/` para confirmar cero referencias residuales a "architect" (en cualquier variante), "Growth", "299€", "20% variable", y verificar que los tres números de WhatsApp descartados no queden en ningún archivo.

---

## 9. Nota de alcance

Este documento no asume que todas las fases se ejecuten en una sola sesión. La Fase 0 y la Fase 2 (desmontaje de Growth, sobre todo las capas de IA) son las más urgentes independientemente del resto, porque son las que hoy están activamente citando información incorrecta a prospectos reales. Si hay que priorizar por tiempo limitado, ese es el orden: Fase 0 → Fase 2 → el resto.
