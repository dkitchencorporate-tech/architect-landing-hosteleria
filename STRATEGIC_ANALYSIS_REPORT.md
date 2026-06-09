# INFORME ESTRATÉGICO Y DE ARQUITECTURA: ARCHITECT.SYS (HOSTELERÍA)
**Documento clasificado para Análisis de Probabilidades y Viabilidad de Lanzamiento**

Este documento detalla el modelo de negocio, el embudo de conversión, la arquitectura tecnológica y los protocolos operativos de Architect.Sys, una agencia/plataforma SaaS "High-Ticket" enfocada en la digitalización y el crecimiento en ventas del sector hostelero (restaurantes, bares, dark kitchens).

---

## 1. MODELO DE NEGOCIO Y PROPUESTA DE VALOR
Architect.Sys no vende "páginas web". Vende un **Ecosistema de Ventas Automatizado**. La propuesta de valor se basa en erradicar la informalidad tecnológica de la hostelería, implementando infraestructura digital propia (menús, reservas), agentes de IA (WhatsApp) y estrategias de Growth (eventos).

**Tiers de Monetización:**
1. **Plan Base (Pago Único High-Ticket):** Entrega de infraestructura (Landing/Web del restaurante, carta digital) y acceso limitado al SaaS (1 Evento de regalo).
2. **Socio Growth (Suscripción Mensual / MRR):** Acceso total al catálogo de eventos, automatizaciones de IA (Arqui V2), análisis de datos en tiempo real y soporte continuo.
3. **Up-Sells (Marketplace):** Publicidad (Ads), Community Management, Auditorías de escandallos.

---

## 2. ESTRATEGIA DE CAPTACIÓN (TRÁFICO Y ADS)
- **Público Objetivo (Buyer Persona):** Dueños de restaurantes (desde barrio hasta fine dining), inversores en Dark Kitchens, gestores de hostelería cansados de pagar altas comisiones a apps de delivery (Glovo, UberEats) y frustrados por el descontrol de reservas vía WhatsApp manual.
- **Canales de Tráfico:** Meta Ads (Instagram/Facebook) y LinkedIn Ads (para perfiles corporativos e inversores).
- **Creativos (Ads):**
  - *Ángulo 1 (Dolor):* "¿Cansado de perder dinero en comisiones de delivery y reservas fantasma? Toma el control."
  - *Ángulo 2 (Autoridad):* "El sistema que usan los restaurantes Top para facturar en automático."
  - *Ángulo 3 (Curiosidad):* Demostración visual en 15 segundos del Agente IA respondiendo a un cliente.

---

## 3. EL EMBUDO Y LA LANDING PAGE PRINCIPAL (`/`)
La landing principal está diseñada bajo principios de neuromarketing para filtrar curiosos y agendar llamadas de alto valor.

**Estructura y Flujo de la Landing:**
1. **Hero Section (Above the Fold):** Promesa fuerte y clara.
   - *Botón Principal (CTA):* Dirige al widget de simulación o al calendario (Calendly) para "Agendar Auditoría Gratuita".
2. **The Trojan Horse (Simulador IA):** Un chat interactivo donde el usuario se hace pasar por un cliente de su propio restaurante y ve cómo nuestro Agente IA le vendería. Es el momento "Aha!".
3. **Módulos de Autoridad:** Exposición del problema (caos, informalidad) vs. La Solución (Ecosistema Architect).
4. **Sello Kommo Partner & Integraciones:** Demostración técnica de que somos Partners Oficiales (Autoridad).
5. **Dark Kitchen Enterprise:** Sección dedicada a inversores que quieren montar cocinas fantasma (Ticket ultra-alto).
6. **Formulario / Agendamiento:** Todos los CTAs secundarios redirigen al embudo de cualificación (Typeform + Calendly). Si no califican por volumen de facturación, se les descarta amablemente.

---

## 4. PROTOCOLO DE VENTAS (DEL LEAD AL MINUTO CERO)
1. **Minuto 1 (Contacto):** El lead agenda la llamada. Se dispara un webhook (Make/Zapier) que lo ingresa a Kommo CRM. Recibe un WhatsApp automatizado (Arqui V2) presentándose como su asistente pre-auditoría.
2. **La Discovery Call (Reunión Zoom):**
   - No se presenta un PowerPoint. Se comparte pantalla y se muestra el `Admin Dashboard` funcionando en tiempo real.
   - Se audita su fuga de capital actual (comisiones, clientes perdidos).
   - Se presenta el plan de acción tecnológico.
3. **El Cierre y Contrato:** Envío de "Propuesta de Crecimiento Tecnológico" (PDF) y enlace de pago (Stripe).
4. **El Minuto Cero (El Pago):** Al entrar el pago, el sistema envía automáticamente el Contrato Digital y las credenciales de acceso a su portal privado (`/dashboard`).

---

## 5. ARQUITECTURA DEL PRODUCTO (DESPUÉS DE LA VENTA)
Una vez el cliente entra, el producto en sí mismo es una herramienta de retención y ventas pasivas.

**A. El Panel del Cliente (`/dashboard`):**
- **Onboarding Wizard:** Lo primero que ve. Un formulario guiado por un Agente IA para subir su carta, horarios y fotos. Elimina la fricción de "mandar cosas por WhatsApp".
- **Pipeline Transparente:** El cliente ve en tiempo real en qué fase de desarrollo estamos (Copywriting, Diseño, Conexión IA).
- **Biblioteca de Eventos:** 7 Protocolos listos para lanzar (Catas, Monólogos, etc.). Si es Plan Base, están bloqueados con un candado que invita a hacer Up-sell a Growth.
- **Marketplace:** Tienda interna para contratar IA, Ads o Community Manager a un clic.

**B. El Hub de la Agencia (`/admin-architect`):**
- **Live Overview:** Monitor en tiempo real de todos los agentes IA operando en los restaurantes de los clientes.
- **Creative Factory Hub:** Donde los copys y diseñadores reciben los datos del Onboarding.
- **Directorio y Pipeline:** Control absoluto de la agencia para mover clientes de fase a fase.

---

## 6. ESTRATEGIA DE RETENCIÓN Y CICLO DE VIDA (LTV)
El mayor riesgo de las agencias es el abandono (churn). Architect.Sys lo combate mediante:
1. **Dependencia Tecnológica:** El restaurante no puede vivir sin el Agente IA de WhatsApp una vez que empieza a tomarle reservas de madrugada.
2. **Eventos Mensuales:** Al estar suscrito a Growth, la agencia le lanza 1 evento mensual (ej. Cata de Vinos). Si el evento llena el local y factura 2.000€ extras, la cuota de 300€ de la agencia se justifica automáticamente.
3. **Escalabilidad:** Se le sigue ofreciendo Ads para reventar el local de reservas, o migrar a un modelo de franquicia/dark kitchen.

---

## 7. ANÁLISIS DE RIESGOS PARA EL ANALIZADOR DE PROBABILIDADES

**Puntos Fuertes (Factores de Éxito):**
- **Efecto "Aha!" Inmediato:** El simulador interactivo en la landing rompe la barrera de escepticismo.
- **Automatización del Onboarding:** Resuelve el mayor cuello de botella de las agencias: conseguir el material del cliente.
- **Neuromarketing Interno:** El dashboard del cliente vende por la agencia mediante elementos bloqueados (candados).
- **Posicionamiento Premium:** Se aleja de la guerra de precios de los "diseñadores web" baratos.

**Puntos Débiles (Riesgos a Mitigar):**
- **Barrera Tecnológica del Hostelero:** Muchos dueños de restaurantes tradicionales son reacios a la tecnología. La curva de aprendizaje del dashboard debe ser nula.
- **Coste de Adquisición (CPA):** Vender High-Ticket requiere leads cualificados. Si los Ads traen a dueños de bares arruinados, el calendario se llenará de llamadas no cualificadas.
- **Dependencia de la IA:** Si la API de OpenAI/Groq falla un fin de semana y no toma reservas, el restaurante culpará a la agencia.

**Conclusión Estratégica:**
El modelo es altamente escalable si el equipo de ventas logra transmitir la visión de "inversión en infraestructura" en lugar de "gasto en marketing". La retención está garantizada por la integración operativa profunda en el día a día del restaurante.