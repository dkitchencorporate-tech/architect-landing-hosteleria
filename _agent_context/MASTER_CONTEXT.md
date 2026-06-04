# ARCHITECT.SYS - CONTEXTO MAESTRO PARA AGENTES IA

> **⚠️ AVISO PARA FUTUROS AGENTES IA:** 
> Lee este documento íntegramente antes de proponer cambios, escribir copy o modificar la arquitectura de la web. Este documento contiene la lógica de negocio, psicología de ventas y el estado técnico del embudo "High-Ticket" de Architect.Sys.

---

## 1. EL MODELO DE NEGOCIO (EL PIVOTE ESTRATÉGICO)
Architect.Sys NO es una agencia de marketing tradicional ni un software SaaS barato. El negocio pivotó de vender "Suscripciones de 39€/mes" a convertirse en un **Socio Operativo de Alta Rentabilidad (High-Ticket)**.
*   **El Tono de Comunicación:** Directo, analítico, de nivel "Director de Proyectos" o "Consultor Senior B2B". Cero lenguaje infantil. Hablamos de ROI, fugas de capital, cuellos de botella y estandarización.
*   **El Enemigo Común:** Las aplicaciones de delivery de terceros (Glovo, JustEat) que roban el 30% del margen, y la falta de tráfico los días valle (lunes a jueves).

## 2. LA JERARQUÍA DE NECESIDADES (LOS 4 PILARES DE VENTA)
Cualquier Agente IA que opere en ventas o atención al cliente (como "Arqui") debe diagnosticar al cliente antes de recetar. Existen 4 pilares estrictos:

1.  **Nivel 1: BASE OPERATIVA (Precio: 700€ Pago Único)**
    *   *Para quién es:* Restaurantes sin web, que usan Instagram como carta, o dependen de Glovo.
    *   *Qué incluye:* PWA, Carta Interactiva QR, Motor de Reservas directo, y optimización SEO en Google Maps.
2.  **Nivel 2: PLAN GROWTH / SOCIO OPERATIVO (Precio: 299€ / mes)**
    *   *Para quién es:* Restaurantes que tienen base digital pero sufren de "horas muertas" o locales vacíos los días valle.
    *   *Qué incluye:* Inyección de tráfico mediante la *Biblioteca de Eventos* (catas, cenas temáticas) y Meta Ads hiper-locales.
3.  **Nivel 3: AGENTE HÍBRIDO IA (Precio: 450€ Setup + 69€ / mes mantenimiento)**
    *   *Para quién es:* Restaurantes que "mueren de éxito". Tienen clientes, pero el teléfono colapsa los fines de semana y pierden mesas porque el personal está cocinando.
    *   *Qué incluye:* Un bot IA conectado a WhatsApp y al CRM Kommo que atiende, perfila y reserva en segundos (24/7).
4.  **Nivel 4: DARK KITCHEN ENTERPRISE (Precio: Desde 3.000€ a 10.000€)**
    *   *Para quién es:* Inversores o dueños que quieren exprimir la capacidad ociosa de sus fogones montando "Marcas Virtuales" a domicilio.
    *   *Qué incluye:* Ingeniería de procesos, fichas técnicas de menús llave en mano, KDS (Pantalla de cocina multimarca) y enrutamiento de flotas (Stuart).

## 3. PSICOLOGÍA DE VENTAS Y TÁCTICAS DE CIERRE
Al escribir copy o configurar flujos de venta, debes aplicar estas reglas inquebrantables:
*   **Anclaje de Valor (El Gatillo de 1.150€):** Nunca dispares un precio de golpe. Justifica la inversión regalando el "Pack de Arranque" (Auditoría de fuga, Neuromarketing de carta, Estrategia Días Valle y Kit IA), el cual tiene un valor percibido de 1.150€.
*   **El Filtro de Autoridad:** No pedimos reuniones, otorgamos "Entrevistas de Admisión" o "Auditorías de Viabilidad". Generamos escasez limitando los desarrollos (ej. "Solo 2 proyectos Dark Kitchen por trimestre").
*   **Regla del Cierre en 2 Pasos:** Al chatear, NUNCA lances un muro de texto con el precio, los bonos y el enlace en el mismo mensaje. *Paso A:* Da el precio y la estrategia, y haz una pregunta ("¿has fracasado con ads antes?"). *Paso B:* Tras su respuesta, empatiza, suelta los bonos y el enlace a Calendly/WhatsApp.

## 4. ARQUITECTURA TÉCNICA Y COMPONENTES CLAVE
La web está construida en Next.js 14, React, Tailwind CSS. Usa un diseño 100% responsivo "Mobile-First".

*   `ExitIntent.tsx`: Modal que detecta salida en PC (ratón) y Móvil (scroll rápido). Ofrece un **CTA Dual** sin fricción: WhatsApp directo (rápido) o Calendly (corporativo). Retiene con los bonos de 1.150€.
*   `DarkKitchen.tsx`: Landing B2B para vender proyectos de ingeniería (+3k€). No muestra precios, tiene un *Timeline* estricto de Fases de Admisión.
*   `EnterpriseModal.tsx`: El "Peaje de entrada" para Dark Kitchen. Exige saber la facturación actual y el presupuesto líquido disponible. Envía el lead a `/api/lead` y pone al usuario en "Lista de Espera".
*   `HighTicketEcosystem.tsx` / `WhatsAppHero.tsx`: Módulos visuales que desglosan la "Matemática del ROI" (cómo ahorrar comisiones) y el funcionamiento del Agente IA en modo "Híbrido".
*   `ConsultingModal.tsx`: Embudo general de agendamiento sincronizado con Calendly.
*   `app/api/demo/respond/route.ts`: **El cerebro de Arqui (El agente IA de ventas).** Contiene el System Prompt con las 10 Leyes del Cerrador y el flujo dinámico de perfilado.

## 5. MÓDULOS DE RETENCIÓN (DASHBOARDS)
*Para justificar las cuotas de mantenimiento (69€) y el Plan Growth (299€), el ecosistema incluye herramientas visuales para el hostelero:*
*   **LiveMonitor / TrafficMonitor:** Dashboards de monitorización en tiempo real. Demuestran al hostelero los picos de tráfico y las interacciones de los clientes en vivo.
*   **Biblioteca de Eventos:** Catálogo de tácticas prediseñadas (catas de vino, cenas maridaje) listas para desplegar.
*   **Fábrica Creativa:** Módulo donde se gestiona el contenido visual y se coordina el marketing.

## 6. ESTADO ACTUAL Y TAREAS PENDIENTES (DEUDA TÉCNICA)
*Al iniciar una nueva sesión, revisa esto:*
1.  **Bug Crítico SEO:** En `src/app/layout.tsx`, la etiqueta `<meta description>` aún dice "(39€/mes)". *DEBE CAMBIARSE INMEDIATAMENTE* para evitar disonancia cognitiva y fugas de tráfico Ads.
2.  **Caso de Estudio Ficticio:** La sección de la "Taberna Los Arcos" es actualmente un *mockup* de copy publicitario. La meta de negocio es reemplazarla pronto con un "Paciente Cero" (un testimonio real en video) para eliminar la "deuda de credibilidad".

---
*Fin del Contexto Maestro. Al acceder a este archivo, confirma al usuario que has asimilado la arquitectura High-Ticket de Architect.Sys.*
