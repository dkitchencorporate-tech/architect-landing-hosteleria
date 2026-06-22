const fs = require('fs');
const path = require('path');

const manualsDir = path.join(__dirname, 'src', 'app', 'manuals');

const contentMap = {
  'mapa-navegacion': {
    title: 'Topología de Red y Enrutamiento B2B (Master Plan)',
    tag: 'Arquitectura Frontend',
    icon: 'BookOpen',
    content: `
      <h2>1. Executive Summary</h2>
      <p>Este documento especifica la topología de red y el enrutamiento de Next.js App Router para Architect.Sys. Su diseño no es trivial; constituye un embudo de retención que categoriza el tráfico en tres capas estrictas: Adquisición Pública (Capa 0), Entorno de Cliente Autenticado (Capa 1) y Governance Administrativo (Capa 2). La estructuración correcta asegura tiempos de carga mínimos, mejorando las métricas de retención (LTV) y habilitando un monitoreo exacto del comportamiento comercial.</p>

      <h2>2. Arquitectura de Enrutamiento y Mapeo Lógico</h2>
      <h3>2.1. Capa 0: Adquisición y Conversión (Public Routes)</h3>
      <p>Rutas diseñadas para la captación de leads fríos, tráfico pagado (Ads) y SEO B2B. Los tiempos de Time-To-First-Byte (TTFB) están optimizados mediante Server Components en la raíz.</p>
      <ul>
        <li><strong><code>src/app/page.tsx</code>:</strong> Epicentro del embudo de ventas. Carga componentes estáticos críticos como el <code>Hero.tsx</code> y el <code>CreativeShowcase.tsx</code>, optimizando Web Vitals.</li>
        <li><strong><code>src/app/auth/login/page.tsx</code> & <code>register/page.tsx</code>:</strong> Endpoints de la API de Identidad (Supabase Auth). Emplean redirecciones seguras para evitar secuestros de sesión en la primera iteración de onboarding.</li>
      </ul>

      <h3>2.2. Capa 1: Entorno Multi-Tenant B2B (Protected Client Routes)</h3>
      <p>Rutas que manejan los flujos operativos de cuentas de pago (Restaurantes). Requieren un token de sesión válido inyectado en las cabeceras HTTP de la petición.</p>
      <ul>
        <li><strong><code>src/app/dashboard/layout.tsx</code>:</strong> El guardián perimetral. Antes de montar la vista, lee las cookies y si el JWT expira o es inválido, redirige. Elimina el "flicker" de carga que ocurre en SPAs obsoletas.</li>
        <li><strong><code>src/app/dashboard/events/page.tsx</code>:</strong> Punto de consumo de la base de datos de eventos <code>master_events</code> cruzada con <code>client_events</code>.</li>
        <li><strong><code>src/app/dashboard/ai-architect/page.tsx</code>:</strong> Interfaz del motor de inferencia IA.</li>
      </ul>

      <h3>2.3. Capa 2: Governance y Telemetría Administrativa (K-Admin Level)</h3>
      <p>El núcleo de operaciones. Oculto para la red global y blindado por validación de Identity Access Management (IAM).</p>
      <ul>
        <li><strong><code>src/app/admin-architect/layout.tsx</code>:</strong> Middleware a nivel de layout que exige una validación semántica (presencia del identificador admin "klar").</li>
        <li><strong><code>/admin-architect/creative</code>:</strong> Módulo de auditoría de inferencia IA. Permite *impersonation* técnico inyectando un <code>targetUserId</code> específico.</li>
        <li><strong><code>/admin-architect/pipeline</code>:</strong> Tablero de control de Operaciones (RevOps) que permite el seguimiento físico y virtual de implementaciones técnicas (Kommo, Meta Ads).</li>
      </ul>

      <h2>3. Instrucciones Operativas (SOP) para Agentes IA y Desarrolladores</h2>
      <div class="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-6">
        <h4 class="text-blue-500 font-bold mb-2">Directrices de Contribución de Enrutamiento</h4>
        <ul class="text-zinc-300 text-sm list-disc pl-4 space-y-2">
          <li><strong>Regla 3.1:</strong> Nunca agregar un endpoint API en <code>/api</code> sin un middleware de autorización a menos que sea un webhook validado mediante HMAC.</li>
          <li><strong>Regla 3.2:</strong> No usar <code>localStorage</code> para proteger rutas. Todas las verificaciones deben emplear <code>@supabase/ssr</code> en el servidor (Layout o Page).</li>
          <li><strong>Regla 3.3:</strong> Al crear una nueva ruta de cliente, debe residir siempre dentro del directorio <code>(dashboard)/</code> para heredar la protección de Capa 1 automáticamente.</li>
        </ul>
      </div>

      <h2>4. Escalabilidad y Futuro (Conclusión)</h2>
      <p>Actualmente el enrutamiento soporta +10,000 conexiones concurrentes sin penalización de latencia gracias a la CDN Global de Vercel. A medida que escalemos, el siguiente paso será migrar los layouts de protección a un <code>middleware.ts</code> real en el Edge Network, lo que reducirá los tiempos de redirección de usuarios no autenticados a sub-50 milisegundos en todo el mundo.</p>
    `
  },
  'arquitectura-saas': {
    title: 'Arquitectura Serverless Multi-Tenant (Master Plan)',
    tag: 'Base de Datos',
    icon: 'Database',
    content: `
      <h2>1. Executive Summary</h2>
      <p>Architect.Sys no es una web tradicional; es una infraestructura SaaS distribuida, diseñada sobre arquitectura Serverless (Next.js + Vercel) y bases de datos relacionales en la nube con PostgreSQL (Supabase). Esta decisión técnica garantiza la escalabilidad horizontal automatizada, permitiendo que la plataforma soporte picos de tráfico masivos durante campañas de Ads sin que el costo de servidores fijos afecte el margen bruto (Gross Margin) del modelo de negocio B2B High-Ticket.</p>

      <h2>2. Modelado de Datos Distribuido (PostgreSQL Schema)</h2>
      <p>El núcleo transaccional reside en la migración <code>20260621000001_create_creative_tables.sql</code>, diseñada bajo un modelo Multi-Tenant.</p>
      
      <h3>2.1. Tablas Core:</h3>
      <dl class="space-y-4">
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">1. auth.users & public.profiles & public.business_profiles</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">La tabla <code>profiles</code> hereda el UUID de la tabla de identidades mediante un trigger atómico (<code>handle_new_user</code>) y almacena el <code>status</code> ('pending_approval' o 'active'). Posteriormente, <code>business_profiles</code> expande la identidad con atributos de negocio: <code>cuisine_type</code>, <code>capacity</code>, <code>average_ticket</code>. Es el cimiento para calcular la Economía Unitaria de cada cuenta.</dd>
        </div>
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">2. public.master_events & public.client_events</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">El catálogo centralizado de servicios. <code>master_events</code> almacena JSONBs complejos con los entregables y roles técnicos de la agencia y el cliente. <code>client_events</code> actúa como tabla relacional muchos-a-muchos, rastreando los estados de despliegue (bloqueado, solicitado, activo) mediante el enum de PostgreSQL.</dd>
        </div>
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">3. public.creative_chats</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">Persistencia del motor de IA. Emplea la columna <code>messages</code> de tipo <strong>JSONB</strong>. Esta elección arquitectónica es vital: permite la inserción O(1) y la actualización sin la sobrecarga de consultas JOIN complejas, garantizando inferencias sub-segundo incluso en historiales de chat kilométricos.</dd>
        </div>
      </dl>

      <h2>3. Instrucciones Operativas (SOP) para Base de Datos</h2>
      <div class="bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl mt-6">
        <h4 class="text-orange-500 font-bold mb-2">Protocolos de Riesgo y Modificación de Schema</h4>
        <ul class="text-zinc-300 text-sm list-disc pl-4 space-y-2">
          <li><strong>Regla 3.1: Mapeo Inmutable.</strong> Los campos de JSONB nunca deben parsearse sin un bloque <code>try/catch</code> estricto en Next.js. Si una IA corrompe un bloque JSON de chat, el frontend crasheará si no se provee un Fallback (Array vacío).</li>
          <li><strong>Regla 3.2: Row Level Security (RLS).</strong> En el despliegue futuro hacia clientes de terceros, toda tabla debe habilitar políticas RLS para evitar que un <code>profile_id</code> lea los datos o campañas generadas por la competencia comercial.</li>
          <li><strong>Regla 3.3: Migraciones UP/DOWN.</strong> Prohibido ejecutar <code>ALTER TABLE</code> de forma directa en producción. Se debe crear un archivo <code>.sql</code> de migración en la carpeta <code>supabase/migrations</code>.</li>
        </ul>
      </div>

      <h2>4. Mantenimiento y Escalabilidad Futura (Conclusión)</h2>
      <p>El cuello de botella de esta arquitectura recaerá en la tabla <code>creative_chats</code> a medida que los tokens procesados superen los 100 Millones. El plan de escalabilidad involucra particionar la tabla mensualmente (Table Partitioning) y vaciar los JSONB antiguos a un almacenamiento en frío (AWS S3 / Supabase Storage), manteniendo solo el contexto de los últimos 30 días en caché en memoria.</p>
    `
  },
  'estrategia-ventas': {
    title: 'Estrategia de Ventas y Economía Unitaria B2B (Master Plan)',
    tag: 'Operaciones Comerciales',
    icon: 'Target',
    content: `
      <h2>1. Executive Summary</h2>
      <p>Este documento es la columna vertebral comercial del proyecto corporativo. Architect.Sys no vende "software", vende "infraestructura de facturación" a dueños de restaurantes. Todo el código fuente de <code>src/app/page.tsx</code> y sus componentes está matemáticamente orquestado para calificar la psicología del comprador, minimizar la objeción de precio y anclar contratos de <strong>Infraestructura Base (700€)</strong> y suscripciones recurrentes <strong>Growth Partner (299€/mes)</strong> con <strong>Soporte Premium IA (69€/mes)</strong>.</p>

      <h2>2. Ingeniería Psicométrica del Embudo (Code-To-Sale)</h2>
      <p>La Landing Page implementa una estructura clásica de *Consultative Selling* empaquetada en un flujo digital:</p>
      
      <h3>2.1. Diagnosis y Dolor (Pain Points)</h3>
      <p>Implementado en <code>src/components/sections/TheTrojanHorse.tsx</code>. Rompe la mentalidad de gasto mensual en plataformas extractivas comparando el desperdicio con la inversión de construir activos propios. El objetivo de esta sección de código es crear una "disruptura cognitiva" que prepare al usuario para el ancla principal.</p>

      <h3>2.2. Valor Irresistible y Urgencia (Bonos)</h3>
      <p>Implementado en <code>src/components/sections/ConsultingModal.tsx</code>. El flujo no permite "Comprar ahora" de forma genérica; en su lugar, exige dejar los datos para asegurar <strong>Bonos Estratégicos valorados en 980€</strong> y elegir la hora de una consultoría gratuita, implementando un sesgo de exclusividad y urgencia.</p>

      <h3>2.3. Economía del Precio Ancla (Pricing Strategy)</h3>
      <p>Implementado en <code>src/components/sections/EventLibraryHook.tsx</code> y <code>HighTicketEcosystem.tsx</code>. <br/>
      Se establece una estructura de capas:<br/>
      - <strong>Base Operativa (700€, fraccionable en 2 cuotas de 350€):</strong> Elimina la barrera de entrada al negocio.<br/>
      - <strong>Soporte Premium IA (69€/mes):</strong> Coste mínimo que el cliente percibe como ridículo en comparación a su valor (ahorro de recepcionistas/camareros).<br/>
      - <strong>Socio Growth (299€/mes):</strong> El plan premium que perdona la cuota de mantenimiento de 69€, anclando psicológicamente el valor del sistema completo frente a las agencias tradicionales.</p>

      <h2>3. Instrucciones Operativas (SOP) para Analistas y A/B Testing</h2>
      <div class="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-6">
        <h4 class="text-blue-500 font-bold mb-2">Manipulación de Variables de Conversión</h4>
        <ul class="text-zinc-300 text-sm list-disc pl-4 space-y-2">
          <li><strong>Regla 3.1:</strong> Las modificaciones a copys (textos) dentro de la Landing solo deben hacerse previo Test A/B estadísticamente significativo. Un Agente IA nunca debe alterar la oferta monetaria (Ej. bajar el Base de 700€ o el Growth de 299€) sin autorización administrativa explícita del K-Admin.</li>
          <li><strong>Regla 3.2:</strong> Las integraciones futuras con pasarelas (Stripe) requerirán validar la sesión previa de Supabase para enlazar el <code>stripe_customer_id</code> al <code>profile_id</code> de la tabla <code>profiles</code>.</li>
        </ul>
      </div>

      <h2>4. Expansión Comercial (Conclusión)</h2>
      <p>El diseño del embudo sostiene un CAC (Customer Acquisition Cost) proyectado altamente rentable. Salvando <strong>solo 1 mesa de 4 personas al mes</strong>, el sistema de 69€/mes se paga solo. El resto es beneficio limpio a la caja del restaurante. La modificación del código en esta área no es un tema estético, es un impacto directo en el P&L (Profit & Loss) de la compañía.</p>
    `
  },
  'onboarding-b2b': {
    title: 'Protocolos de Onboarding y Activación (Master Plan)',
    tag: 'Customer Success',
    icon: 'Users',
    content: `
      <h2>1. Executive Summary</h2>
      <p>El Onboarding es la frontera de mayor vulnerabilidad en un SaaS B2B. Si un cliente paga un High-Ticket y la curva de aprendizaje inicial (Time-to-Value) es tediosa, la probabilidad de cancelación en el mes 1 (Churn) se dispara. El flujo codificado en <code>src/app/onboarding/page.tsx</code> está diseñado para reducir la fricción a cero, empleando un sistema de invitaciones con tokens únicos y contraseñas autogestionadas.</p>

      <h2>2. Flujo de Datos y Activación Atómica</h2>
      <h3>2.1. Pipeline de Captura Front-End</h3>
      <p>El componente lee el <code>token</code> por URL (search params) y valida su legitimidad contra la tabla <code>invitations</code>. El formulario minimiza la carga cognitiva exigiendo solo datos esenciales:</p>
      <ul>
        <li><strong>Nombre Comercial (Business Name):</strong> Para la tabla <code>profiles</code>.</li>
        <li><strong>Email y Password:</strong> Creación atómica de identidad en Supabase Auth.</li>
        <li>El sistema hereda el plan desde la invitación (ej. <code>base_pago_unico</code>) y asume un rol precargado de cliente.</li>
      </ul>

      <h3>2.2. Mutación de Base de Datos (Backend-Side)</h3>
      <p>El registro dispara una transacción múltiple en Supabase: (1) <code>auth.signUp</code> crea el Identity. (2) Se actualiza <code>profiles</code> poniendo <code>status: 'active'</code>. (3) Se crea un <code>business_profiles</code> base para el motor IA (cuisine_type, address). (4) El token de invitación se quema (<code>used: true</code>). Todo en menos de un segundo.</p>

      <h2>3. Instrucciones Operativas (SOP) para Agentes y DevOps</h2>
      <div class="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-6">
        <h4 class="text-blue-500 font-bold mb-2">Protocolos de Estabilidad del Onboarding</h4>
        <ul class="text-zinc-300 text-sm list-disc pl-4 space-y-2">
          <li><strong>Regla 3.1: Validación Frontera.</strong> Nunca guardar en DB sin parsear y tipar los datos recibidos (usando TypeScript Interfaces o validadores como Zod).</li>
          <li><strong>Regla 3.2: Redirección Condicional.</strong> El middleware o los layouts deben verificar el estado de sesión (token JWT) para garantizar que usuarios no registrados nunca consuman las rutas de dashboard (Capa 1).</li>
        </ul>
      </div>

      <h2>4. Impacto a Largo Plazo (Conclusión)</h2>
      <p>Los datos extraídos en este proceso no mueren en la tabla <code>profiles</code>. En versiones futuras, el Motor IA de Architect extraerá este contexto (ej. "Tengo 200 sillas y facturo 50k") directamente en su *System Prompt* para personalizar estrategias comerciales sin que el usuario tenga que darle contexto redundante en cada chat.</p>
    `
  },
  'agente-ia': {
    title: 'Motores de Inferencia y Agentes IA (Master Plan)',
    tag: 'Ingeniería AI',
    icon: 'Bot',
    content: `
      <h2>1. Executive Summary</h2>
      <p>El Agente de IA "Arqui" no es un chatbot de Q&A genérico. Es un Motor de Inferencia Estratégico (Strategic Reasoning Engine) embebido en la plataforma. Actúa como el Consultor de Marketing B2B del cliente, reduciendo el coste de operaciones (OPEX) de la agencia al automatizar el 80% de la planificación estratégica publicitaria que un Account Manager tradicional haría manualmente.</p>

      <h2>2. Arquitectura de LLM y Flujo de Inferencia</h2>
      <h3>2.1. El Componente Frontend (<code>ChatTab.tsx</code>)</h3>
      <p>Esta pestaña maneja la comunicación interactiva entre el cliente React y el backend. La arquitectura exige:</p>
      <ul>
        <li><strong>Inyección de Contexto Maestro (System Prompt):</strong> Define el comportamiento absoluto del agente, sus metodologías de cierre de ventas, y sus matrices restrictivas (qué responder y qué evadir).</li>
        <li><strong>Evaluación de Memoria Semántica:</strong> Al arrancar, el endpoint o el frontend recupera el historial de la tabla <code>public.creative_chats</code> (tipo JSONB) para dotar al agente de estado temporal continuo.</li>
      </ul>

      <h3>2.2. Side-Effects de Alta Complejidad (Creative Campaigns)</h3>
      <p>El Agente tiene la directriz de detectar intenciones ("Quiero hacer una campaña para San Valentín"). Al generar la salida, no solo responde en texto plano, sino que el sistema Backend parsea parámetros clave y crea un registro paralelo y atómico en la tabla <code>public.creative_campaigns</code> (Ángulo, Texto generado, Audiencia objetivo). Esto materializa la "Charla" en "Entregables B2B Reales".</p>

      <h2>3. Instrucciones Operativas (SOP) para IAs de Mantenimiento</h2>
      <div class="bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-6">
        <h4 class="text-blue-500 font-bold mb-2">Protocolos de Actualización de Modelos</h4>
        <ul class="text-zinc-300 text-sm list-disc pl-4 space-y-2">
          <li><strong>Regla 3.1: Temperaturas de Inferencia.</strong> La IA debe mantener una temperatura media-baja (0.4 - 0.7) para evitar "alucinaciones" al entregar estrategias presupuestarias a clientes reales. Los datos financieros deben ser deterministas.</li>
          <li><strong>Regla 3.2: Límite de Tasas (Rate Limiting).</strong> Cualquier nuevo desarrollo en el frontend del chat debe implementar debounce y bloqueos visuales mientras se espera el stream o respuesta, evitando que clientes malintencionados agoten las cuotas de API del LLM.</li>
          <li><strong>Regla 3.3: Mutación de JSONB.</strong> La actualización de la tabla <code>creative_chats</code> exige conservar todo el historial previo. Si se hace un UPDATE directo y se pisa la cadena JSON, se pierde permanentemente la memoria de ese cliente (Data Loss Crítico).</li>
        </ul>
      </div>

      <h2>4. Escalabilidad Cognitiva (Conclusión)</h2>
      <p>A futuro, "Arqui" integrará una arquitectura RAG (Retrieval-Augmented Generation), cruzando métricas de rendimiento en tiempo real (datos de impresiones de Meta Ads del cliente) extraídos vía APIs de terceros, volviendo sus decisiones y estrategias cuantitativamente infalibles.</p>
    `
  },
  'centro-control': {
    title: 'Centro de Mando Operacional y Compliance (Master Plan)',
    tag: 'Auditoría y RevOps',
    icon: 'LayoutDashboard',
    content: `
      <h2>1. Executive Summary</h2>
      <p>El módulo <code>/admin-architect</code> representa la capa de Governance C-Level. Las cuentas B2B corporativas requieren una revisión exhaustiva de sus implementaciones, gestión de calidad del servicio y visualización del Pipeline (Revenue Operations). Este entorno está sellado criptográficamente y es el corazón desde el cual tú (K-Admin) controlas el imperio de datos sin interactuar con interfaces limitadas de cliente.</p>

      <h2>2. Arquitectura de Submódulos Administrativos</h2>
      <h3>2.1. Creative Factory (El Panóptico Estratégico)</h3>
      <p>Ubicado en <code>/admin-architect/creative</code>. Es la obra maestra de auditoría técnica. En lugar de ver el panel genérico de IA, el Admin dispone de un <strong>Selector de Entidades</strong>. Al cambiar el dropdown (eligiendo el Restaurante de Juan o el Bar de María):</p>
      <ul>
        <li>El componente altera dinámicamente un prop de React: <code>targetUserId</code>.</li>
        <li>Los hooks de base de datos se re-hidratan apuntando a los registros JSONB de <code>creative_chats</code> y <code>creative_campaigns</code> vinculados a ESE cliente.</li>
        <li><strong>Resultado:</strong> Capacidad de visualizar, auditar y corregir (Impersonate) la dirección estratégica de cada cliente, garantizando la promesa de valor (Quality Assurance).</li>
      </ul>

      <h3>2.2. Kanban Pipeline (Gestión de Despliegues)</h3>
      <p>El tablero <code>/admin-architect/pipeline</code> gestiona los estados logísticos del Onboarding técnico (Ej: "Conexión con Meta", "Webhook de Kommo activo", "Pixel instalado"). Centraliza la entrega del servicio (Fulfillment) eliminando la dependencia de herramientas externas como Trello o Asana.</p>

      <h2>3. Instrucciones Operativas (SOP) de Compliance</h2>
      <div class="bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl mt-6">
        <h4 class="text-orange-500 font-bold mb-2">Protocolos de Riesgo y Manipulación de Identidad</h4>
        <ul class="text-zinc-300 text-sm list-disc pl-4 space-y-2">
          <li><strong>Regla 3.1: IAM Semántica Estricta.</strong> El código actual valida en el <code>layout.tsx</code> si <code>data.user.email.includes('klar')</code>. Si un desarrollador futuro altera este string o lo elimina por error, todo el panel de administración quedará expuesto al internet público. <strong>Prohibido modificar este condicional sin un sistema de RBAC alterno activo.</strong></li>
          <li><strong>Regla 3.2: Exportación de Datos.</strong> La manipulación de los registros de <code>profiles</code> a CSV o endpoints externos requerirá validaciones Service-to-Service (Tokens de portador).</li>
        </ul>
      </div>

      <h2>4. Mantenimiento del Imperio (Conclusión)</h2>
      <p>El diseño del Centro de Mando asume que las operaciones de la agencia crecerán de forma vertical. A futuro, se crearán submódulos que mostrarán tableros de métricas P&L consolidadas y métricas de consumo de tokens LLM por cada cliente para auditar la rentabilidad granular de cada cuenta High-Ticket.</p>
    `
  },
  'google-oauth': {
    title: 'Arquitectura Zero-Trust, Seguridad y OAuth (Master Plan)',
    tag: 'Ciberseguridad B2B',
    icon: 'ShieldCheck',
    content: `
      <h2>1. Executive Summary</h2>
      <p>La seguridad no es una capa superficial en Architect.Sys; es el perímetro fundacional. Procesamos datos confidenciales corporativos de restaurantes (Facturación, Capacidad, Estrategias de Mercado B2B). La decisión de migrar de autenticaciones básicas a <strong>Google OAuth</strong> vía Supabase bajo una arquitectura <strong>Zero-Trust</strong> garantiza auditorías limpias para estándares ISO/SOC2 futuros, previniendo fuga de datos (Data Leaks) y secuestro de sesiones.</p>

      <h2>2. Ingeniería del Protocolo de Autenticación</h2>
      <h3>2.1. Intercambio de Tokens OAuth 2.0</h3>
      <p>El flujo en <code>/auth/login</code> desencadena la invocación a <code>signInWithOAuth()</code>. Esto transfiere la responsabilidad de verificación de identidad criptográfica a los servidores de Google Cloud Platform (GCP). Tras el OK, Supabase genera un JSON Web Token (JWT) firmado para la sesión.</p>

      <h3>2.2. Gestión SSR (Server-Side Rendering) de Cookies</h3>
      <p>El antiguo modelo guardaba JWTs en el <code>localStorage</code> del navegador. Este vector es vulnerable a <strong>Cross-Site Scripting (XSS)</strong>. El proyecto se ha refactorizado con la librería <code>@supabase/ssr</code>, implementando el archivo maestro <code>src/lib/supabase-server.ts</code>.</p>
      <ul>
        <li>Los tokens residen en cookies HttpOnly (o manejadas por SSR).</li>
        <li>Los Layouts en Next.js (Server Components) leen directamente las cabeceras de red antes de enviar un solo byte de HTML al usuario, interceptando a los intrusos de forma instantánea.</li>
      </ul>

      <h2>3. Instrucciones Operativas (SOP) de Seguridad Integral</h2>
      <div class="bg-red-500/10 border border-red-500/20 p-6 rounded-xl mt-6">
        <h4 class="text-red-500 font-bold mb-2">Protocolo de Desastre y Variables Clasificadas</h4>
        <ul class="text-zinc-300 text-sm list-disc pl-4 space-y-2">
          <li><strong>Regla 3.1: Service Key.</strong> La <code>SUPABASE_SERVICE_KEY</code> tiene privilegios de superusuario que ignoran el Row Level Security (RLS) en Postgres. NUNCA debe incluirse en un archivo con la directiva <code>'use client'</code> ni prefijarse con <code>NEXT_PUBLIC_</code>. Un commit que exponga esta clave resultará en un compromiso total del SaaS.</li>
          <li><strong>Regla 3.2: Rotación de Secretos.</strong> En caso de intrusión sospechosa, el procedimiento es: (1) Entrar al panel de Supabase y rotar la llave de proyecto. (2) Entrar a Vercel Settings y actualizar el entorno. (3) Ejecutar <code>vercel --prod</code> para invalidar el caché global en Edge.</li>
          <li><strong>Regla 3.3: Prevención de Crawlers.</strong> Las rutas de <code>/admin-architect</code> y <code>/dashboard</code> deben estar siempre excluidas en la instrucción de <code>robots.txt</code> para evitar el mapeo forzado por arañas web ajenas.</li>
        </ul>
      </div>

      <h2>4. Certificación y Escala (Conclusión)</h2>
      <p>Este nivel de seguridad es lo que diferencia a una "herramienta freelancer" de un "Software Empresarial". Al mantener sesiones basadas en cookies y flujos OAuth duros, Architect.Sys puede pasar por filtros técnicos complejos de departamentos de TI en grandes cadenas hoteleras o franquicias sin objeciones de cumplimiento.</p>
    `
  }
};

const baseTemplate = (key, data) => `'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Database, Target, Users, Bot, LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function ManualPage() {
  const IconMap = {
    BookOpen: BookOpen,
    Database: Database,
    Target: Target,
    Users: Users,
    Bot: Bot,
    LayoutDashboard: LayoutDashboard,
    ShieldCheck: ShieldCheck
  };
  
  const Icon = IconMap['${data.icon}'] || BookOpen;

  return (
    <div className="max-w-5xl mx-auto pb-20 print:pb-0">
      <Link href="/manuals" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors mb-8 print:hidden bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20">
        <ArrowLeft size={16} /> Volver a los SOPs Maestros
      </Link>

      <div className="relative bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-14 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        {/* Glow Corporativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
        
        <header className="border-b border-white/10 pb-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-[inset_0_0_30px_rgba(255,165,0,0.05)] text-orange-500 flex-shrink-0 mt-2">
              <Icon size={48} strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-md border border-orange-500/20">
                  ${data.tag}
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/10 shadow-inner">
                  Enterprise-Grade SOP
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20 shadow-inner">
                  Strict Confidential
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                ${data.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 bg-black/50 px-4 py-2.5 rounded-lg border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
              Documento Activo
            </p>
            <p className="text-zinc-500 text-xs font-mono bg-black/30 px-3 py-2 rounded-lg border border-white/5">
              ID: ARCH-${Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
          </div>
        </header>

        <article className="prose prose-invert prose-orange max-w-none 
          prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight 
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-zinc-100
          prose-h3:text-2xl prose-h3:text-zinc-300 prose-h3:mt-10 prose-h3:mb-5 prose-h3:font-bold
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
          prose-li:text-zinc-400 prose-li:text-lg prose-li:marker:text-orange-500
          prose-strong:text-zinc-200 prose-strong:font-bold
          prose-code:text-orange-300 prose-code:bg-orange-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-orange-500/20
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" 
          dangerouslySetInnerHTML={{ __html: ${JSON.stringify(data.content)} }}>
        </article>
      </div>
    </div>
  );
}`;

for (const [key, data] of Object.entries(contentMap)) {
  const dirPath = path.join(manualsDir, key);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  const filePath = path.join(dirPath, 'page.tsx');
  fs.writeFileSync(filePath, baseTemplate(key, data), 'utf8');
}

console.log('Enterprise Manuals Generated Successfully!');
