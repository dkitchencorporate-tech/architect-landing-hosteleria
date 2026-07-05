# 🛡️ AGENTIC MASTER GUIDE & SUPREME SOP (ARCHITECT.SYS HOSPITALITY)
**Consulta Obligatoria para Todo Agente IA (Antigravity, Gemini, Claude, Cursor, Copilot, etc.)**

> [!CAUTION]
> **REGLA CERO - PROHIBICIÓN ABSOLUTA DE ALUCINAR:**
> Tienes estrictamente prohibido inventar precios, modificar cuotas, alucinar características, o promover servicios fuera de nuestro catálogo (ej. Dark Kitchens o proyectos personalizados millonarios están CONGELADOS). Si tienes dudas sobre alguna tarifa o funcionalidad, consulta este documento o pregunta directamente al K-Admin (Alex).

---

## 1. ADN Y MODELO DE NEGOCIO (Consultative Selling B2B)
* **Misión:** Rescatar al hostelero de las comisiones abusivas (El Tenedor / UberEats cobran 20-30%) y evitar pérdidas por cartas PDF estáticas o llamadas no atendidas en horas punta.
* **Visión:** Convertir a Architect.Sys en el estándar de ingeniería gastronómica de alto standing, instalando un **Ecosistema 24/7** en cada restaurante.
* **Modelo:** Venta Consultiva B2B de infraestructura de facturación (PWA nativa, KDS, Carta Visual HD, CRM y Recepcionista IA). No vendemos "webs genéricas", vendemos activos que generan retorno EBITDA inmediato.

---

## 2. CATÁLOGO DE PRECIOS EXACTO E INNEGOCIABLE
1. **Nivel 1: Fundación Digital / Base Operativa (700 € pago único)**
   * Fraccionable en **2 cuotas de 350 €**.
   * Incluye PWA de pedidos/reservas (0% comisiones), Carta Visual HD y Bonos Estratégicos (Valor: 980€).
   * **Mantenimiento y Servidor:** 2 primeros meses GRATIS. A partir del 3er mes: **69 €/mes** (sin permanencia).
2. **Nivel 2: Recepcionista IA + CRM Reservas (450 € setup express + 69 €/mes)**
   * Agente autónomo en WhatsApp (Meta API + Kommo CRM), calificación de comensales y fianza anti No-Shows.
   * Incluye consumo de tokens IA hasta 1.500 chats/mes y soporte técnico.
   * 🌟 **Ventaja Socio Growth:** Si el cliente está en el Plan Growth, los 69 €/mes de mantenimiento quedan bonificados a **0 €/mes para siempre**.
3. **Nivel 3: Plan Growth Partner (299 €/mes o 2.990 €/año)**
   * Para inyectar tráfico y llenar días valle. Incluye biblioteca completa de eventos (7+ eventos), campañas publicitarias, 1 actualización mensual y **mantenimiento IA bonificado a 0 €/mes**.
4. **Upsells de Agencia:** Meta Ads Avanzado (desde 299 €/mes) | Community Manager & UGC (desde 350 €/mes).
5. **Dark Kitchens / Enterprise:** *ESTRICTAMENTE DESCARTADO Y CONGELADO HASTA NUEVA ORDEN.*

---

## 3. MAPA INTEGRAL DE RUTAS Y URLS DEL PROYECTO
Cualquier agente que retome el trabajo debe conocer la ubicación exacta de cada módulo:

### 🌐 A. Área Pública y Marketing (100% Funcional)
* `/`: Landing page principal (Venta consultiva, calculadora de pérdida EBITDA y cierre dual).
* `/hub`: Hub VIP con carruseles de vídeo nativos pre-cargados en DOM y formulario de diagnóstico en 3 pasos.
* `/demo/carta`: Demostración interactiva de carta visual HD para hostelería.
* `/onboarding`: Asistente de toma de datos para nuevos restaurantes (`OnboardingWizard.tsx`).
* `/deal/[token]`: Visor dinámico de propuestas y contratos (ej. Venta El Gallo).
* `/terms`, `/privacy`, `/data-deletion`: Páginas legales y cumplimiento normativo.

### 📚 B. Área de Manuales y Guías Operativas (SOPs)
* `/manuals`: Índice Operativo Global (ahora con Banner Gigante hacia el Master Doc).
* `/manuals/master-doc`: **MASTER DOC / SOP SUPREMO (Este mismo documento en versión web interactiva).**
* `/manuals/mapa-navegacion`: Directorio detallado de enlaces por nivel de acceso.
* `/manuals/arquitectura-saas`: Estructura en Supabase, RLS y Vercel CLI.
* `/manuals/estrategia-ventas`: Ingeniería del embudo y justificación de precios High-Ticket.
* `/manuals/onboarding-b2b`: Flujo de integración de clientes y persistencia en CRM.
* `/manuals/agente-ia`: Leyes conversacionales de Arqui y conexión con Kommo CRM.
* `/manuals/centro-control`: Operativa del panel administrativo y Matriz Generativa.
* `/manuals/google-oauth`: Protocolos de seguridad, roles en Supabase y SSR Cookies.
* `/manuals/escalabilidad-creative-factory`: Roadmap de automatización de contenidos.
* `/manuals/escalado-whop`: Estrategia de ingresos recurrentes y afiliación (V2).

### 🕵️‍♂️ C. Prospección Agéntica y Scout Command Center (100% Funcional en Local)
* `/admin/scout`: **Scout Command Center PWA** (Dashboard instalable en móvil con vistas Kanban y Tabla estilo Clay.com).
* `src/prospecting-engine/orchestrator.ts`: Cerebro orquestador del enjambre.
* `src/prospecting-engine/agents/*`:
  * `ScoutAgent.ts`: Búsqueda en Google Maps/Tripadvisor y protección anti-duplicados.
  * `DiagnosticAgent.ts`: Cálculo de pérdida EBITDA y puntuación ICP.
  * `PredatorCopyAgent.ts`: Redacción consultiva con Gemini 3.0 Pro (con fallback anti-alucinaciones).
  * `ChannelOperatorAgent.ts`: Mapeo de ganchos para WhatsApp (sin enlaces), Instagram y Email.
  * `TelegramSyncerAgent.ts`: Sincronización en vivo de alertas con el móvil de Alex.
* `/api/prospecting/leads` & `/api/prospecting/run`: Endpoints CRUD y disparadores del ciclo.

### 🏛️ D. Centro de Control Admin B2B (`/admin-architect/*`)
* `/admin-architect/pipeline`: Gestión de oportunidades y embudo de ventas B2B.
* `/admin-architect/pipeline/[id]/setup`: Configuración técnica de propuestas.
* `/admin-architect/clients`: Gestión de cartera de clientes activos y cobros (1x700€ o 2x350€).
* `/admin-architect/protocols`: Generador universal de contratos y firma electrónica eSignature.
* `/admin-architect/events-master`: Repositorio maestro de plantillas de promoción.
* `/admin-architect/creative`: Panel administrativo de la Creative Factory.

### 📱 E. Área de Cliente B2B (`/dashboard/*`)
* `/dashboard`: Panel de control principal del propietario del restaurante.
* `LiveMonitor.tsx`: Supervisión en vivo de conversaciones IA en WhatsApp/Kommo.
* `TrafficMonitor.tsx`: Métricas de visitas y conversión de la PWA.
* `CreativeFactoryClient.tsx` & `EventsLibrary.tsx`: Generador de creatividades y activación de eventos.

### 🔌 F. APIs Backend y Webhooks (`/api/*`)
* `/api/webhooks/kommo` & `/woztell`: Conexión bidireccional CRM y mensajería WhatsApp.
* `/api/whop/*` & `/api/stripe/*`: Pasarelas de pago y aprovisionamiento automático.
* `/api/demo/respond` & `/waiter`: Motores IA conversacionales para las demos en vivo.

---

## 4. ESTADO DE ENTORNOS Y POLÍTICA DE GITHUB
* **Local:** Contiene el 100% de la ingeniería actualizada (incluyendo el Scout Command Center y el motor de prospección).
* **GitHub (`origin/main`) & Vercel:** Para mantener el código respaldado en la nube sin alterar la producción pública en Vercel, todos los commits de respaldo administrativo deben llevar la etiqueta **`[skip ci]`** en el mensaje de commit.

## 5. INSTRUCCIONES PARA RETOMAR EL TRABAJO
Si eres un nuevo agente entrando a este proyecto:
1. Lee este archivo `.agents/AGENTS.md` y `src/app/manuals/master-doc/page.tsx`.
2. Verifica que el build compile perfectamente con `npm run build`.
3. El foco actual del proyecto está en **operar el Enjambre de Prospección Agéntica** (`/admin/scout` y `src/prospecting-engine/`) para generar los primeros 100 leads diarios cualificados sin alucinaciones.
