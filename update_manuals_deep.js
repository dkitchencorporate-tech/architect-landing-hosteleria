const fs = require('fs');
const path = require('path');

const manualsDir = path.join(__dirname, 'src', 'app', 'manuals');

const contentMap = {
  'mapa-navegacion': {
    title: 'Mapa Integral de Navegación',
    tag: 'Directorio',
    icon: 'BookOpen',
    content: `
      <h2>1. Directorio Público y Rutas de Conversión (Front-End)</h2>
      <p>Las siguientes rutas están abiertas al público y forman el embudo principal de adquisición B2B:</p>
      <ul>
        <li><strong><code>/</code> (Home):</strong> Raíz del proyecto. Renderiza el layout principal de la Landing Page (\`src/app/page.tsx\`). Destinado a la conversión inicial.</li>
        <li><strong><code>/auth/login</code> & <code>/auth/register</code>:</strong> Formularios y flujos OAuth. Protegidos parcialmente (si el usuario ya tiene sesión, es redirigido mediante middleware).</li>
        <li><strong><code>/onboarding</code>:</strong> El paso post-registro. El archivo \`src/app/onboarding/page.tsx\` captura los metadatos del restaurante (tipo, capacidad, facturación) y actualiza la tabla \`profiles\`.</li>
      </ul>

      <h2>2. Dashboard del Cliente (Client Zone)</h2>
      <p>Rutas ubicadas bajo \`src/app/dashboard/\`. Están protegidas por el cliente SSR de Supabase. El archivo clave de protección es \`src/app/dashboard/layout.tsx\` que fuerza el re-enrutamiento a \`/auth/login\` si la sesión (\`createClient().auth.getUser()\`) es inválida.</p>
      <ul>
        <li><strong><code>/dashboard</code>:</strong> Overview. Renderiza los componentes \`TrafficMonitor.tsx\` y \`LiveMonitor.tsx\`.</li>
        <li><strong><code>/dashboard/events</code>:</strong> Renderiza \`EventsLibrary.tsx\`. Cruza la tabla \`master_events\` con \`client_events\` (relacionadas por \`event_id\`) para mostrar los eventos desbloqueados o solicitados.</li>
        <li><strong><code>/dashboard/campaigns</code>:</strong> Historial de campañas, lee directamente de la tabla \`creative_campaigns\` filtrando por el \`profile_id\` activo.</li>
        <li><strong><code>/dashboard/ai-architect</code>:</strong> El chat interactivo con el Agente IA, que invoca a la ruta \`/api/creative-factory/agent-chat\`.</li>
      </ul>

      <h2>3. Admin Master Console (Admin Zone)</h2>
      <p>Rutas bajo \`src/app/admin-architect/\`. El archivo \`src/app/admin-architect/layout.tsx\` implementa la regla de negocio crítica: <code>data?.user?.email?.includes('klar')</code>. Solo tú, el administrador, pasas este filtro.</p>
      <ul>
        <li><strong><code>/admin-architect/overview</code>:</strong> Vista global de negocio. Lee directamente de \`profiles\` para contar restaurantes registrados.</li>
        <li><strong><code>/admin-architect/creative</code>:</strong> Creative Factory. Contiene el selector de clientes que inyecta un \`targetUserId\` dinámico para que el componente \`AgentChat\` lea la tabla \`creative_chats\` pero del cliente seleccionado.</li>
        <li><strong><code>/admin-architect/events-master</code>:</strong> Permite visualizar los eventos globales inyectados (por ejemplo, vía \`seed_events.mjs\`).</li>
        <li><strong><code>/admin-architect/pipeline</code>:</strong> Tablero Kanban renderizado desde \`src/app/admin-architect/pipeline/page.tsx\`.</li>
      </ul>
    `
  },
  'arquitectura-saas': {
    title: 'Arquitectura SaaS y Base de Datos',
    tag: 'Infraestructura',
    icon: 'Database',
    content: `
      <h2>1. Esquema Relacional de Supabase (PostgreSQL)</h2>
      <p>El proyecto se sustenta en una arquitectura Serverless en Supabase. La estructura principal fue creada a través de la migración: \`supabase/migrations/20260621000001_create_creative_tables.sql\`.</p>
      
      <h3>Tablas Principales:</h3>
      <dl class="space-y-4">
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">public.profiles</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">Vinculada a \`auth.users\`. Almacena \`restaurant_type\`, \`monthly_revenue\`, \`seating_capacity\` y \`saas_plan\`. Se alimenta desde \`/onboarding\`.</dd>
        </div>
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">public.master_events</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">Almacena el catálogo base (Catas, Monólogos, Speed Dating). Los campos incluyen arrays JSON para \`client_role\`, \`agency_role\` y \`deliverables\`.</dd>
        </div>
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">public.client_events</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">Tabla pivote. Campos: \`profile_id\`, \`event_id\`, \`status\` (locked, requested, active, completed).</dd>
        </div>
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">public.creative_chats</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">Guarda la persistencia del agente IA. Campo vital: \`conversation_history\` (JSONB), que acumula los roles (user, assistant, system).</dd>
        </div>
        <div>
          <dt class="font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block">public.creative_campaigns</dt>
          <dd class="mt-2 pl-4 border-l-2 border-orange-500/50">Matriz de despliegue publicitario generada. Campos: \`angle\`, \`target_audience\`, \`generated_copy\`.</dd>
        </div>
      </dl>

      <h2>2. Disparadores Automáticos (Triggers)</h2>
      <p>Existe una función almacenada en Supabase (\`handle_new_user\`) acoplada a un Trigger. Cuando un usuario hace login por OAuth y se registra en \`auth.users\`, Supabase ejecuta automáticamente una sentencia \`INSERT\` en \`public.profiles\` creando un registro en blanco ligado a ese UID.</p>

      <h2>3. Integración Continua (CI/CD) con Vercel</h2>
      <p>La arquitectura depende enteramente de Vercel para el Build & Deploy. Cualquier modificación en la rama \`main\` dispara una compilación.</p>
      <div class="bg-zinc-900/50 border border-white/10 p-6 rounded-xl mt-6">
        <h4 class="text-white font-bold mb-2">Comandos Esenciales (SOP Operativo)</h4>
        <pre class="bg-black/50 p-4 rounded-lg text-sm text-zinc-300 font-mono mt-2 overflow-x-auto whitespace-pre-wrap">
# Listar despliegues remotos y verificar estados
vercel ls

# Desplegar a producción forzosamente (ignorando cache)
vercel --prod

# Inyectar nuevas variables de entorno remotas
vercel env add SUPABASE_SERVICE_KEY
        </pre>
      </div>
    `
  },
  'estrategia-ventas': {
    title: 'Embudos de Ventas y Estrategia B2B',
    tag: 'Ventas',
    icon: 'Target',
    content: `
      <h2>1. Estructura Persuasiva del Front-End</h2>
      <p>La Landing Page (\`src/app/page.tsx\`) no es un simple diseño; es un embudo psicológico codificado en secciones:</p>
      <ul>
        <li><strong>Hero Section (\`src/components/Hero.tsx\`):</strong> Promesa de valor radical y CTA principal hacia el onboarding.</li>
        <li><strong>Pain Points (\`src/components/PainPoints.tsx\`):</strong> Diagnóstico de mercado (Local vacío, dependencia de reseñas falsas, guerra de precios).</li>
        <li><strong>Creative Showcase (\`src/components/CreativeShowcase.tsx\`):</strong> Interfaz de demostración simulada que evidencia la potencia del Agente IA y la generación de matrices de copys, elevando la percepción de autoridad tecnológica.</li>
        <li><strong>Pricing (\`src/components/Pricing.tsx\`):</strong> Estrategia de anclaje con el Plan Growth (2,497€) para vender masivamente el Plan Base (997€).</li>
      </ul>

      <h2>2. Justificación Técnica de Precios (High-Ticket)</h2>
      <p>Almacenamos la variable \`saas_plan\` en \`localStorage\` y luego en la tabla \`profiles\`. La diferencia operativa real en el código es:</p>
      <ul>
        <li><strong>Base Plan (997€/mes):</strong> El usuario interactúa con la plataforma de forma "Self-Service". Genera sus campañas en la pestaña "Arqui" y solicita eventos.</li>
        <li><strong>Growth Partner (2,497€/mes):</strong> La agencia intercepta las solicitudes a través del Master Console. Incluye automatizaciones en Kommo CRM (\`/api/webhooks/kommo\`) y asignación de presupuesto humano (Account Manager).</li>
      </ul>

      <h2>3. Sistema de "Exclusividad Invertida"</h2>
      <p>El botón de pago no es directo, el usuario percibe que "Aplica" para trabajar contigo. Esto se gestiona en la fase de Lead Gen y el Onboarding.</p>
    `
  },
  'onboarding-b2b': {
    title: 'Onboarding de Clientes B2B',
    tag: 'Operaciones',
    icon: 'Users',
    content: `
      <h2>1. El Código del Flujo (\`src/app/onboarding/page.tsx\`)</h2>
      <p>Una vez el cliente se registra vía Google OAuth (\`/auth/login\`), es redirigido a \`/onboarding\`. Este componente gestiona un formulario multi-step en React:</p>
      <ol>
        <li><strong>Paso 1: Tipo de Local.</strong> Define la identidad del perfil comercial.</li>
        <li><strong>Paso 2: Aforo y Facturación.</strong> Métricas vitales para calcular ROAS.</li>
      </ol>

      <h2>2. Inyección a Supabase y Activación</h2>
      <p>Al presionar "Completar Onboarding", el sistema ejecuta una función asíncrona que hace un \`UPSERT\` en la tabla \`profiles\`, utilizando el \`userId\` actual como clave de búsqueda:</p>
      <pre class="bg-black/50 p-4 rounded-lg text-sm text-zinc-300 font-mono mt-2 mb-4 overflow-x-auto whitespace-pre-wrap">
const { error } = await supabase.from('profiles').update({
  restaurant_type: formData.type,
  monthly_revenue: formData.revenue,
  seating_capacity: formData.capacity,
  is_onboarded: true
}).eq('id', user.id);
      </pre>

      <h2>3. Creación del Set Inicial de Eventos</h2>
      <p>Inmediatamente después de la actualización del perfil, el cliente accede al \`/dashboard\`. La lógica en \`EventsLibrary.tsx\` detecta que el cliente es nuevo y lista todos los \`master_events\` con el estado inicial, listos para ser solicitados.</p>
    `
  },
  'agente-ia': {
    title: 'Agente de Ventas IA (Arqui)',
    tag: 'Inteligencia Artificial',
    icon: 'Bot',
    content: `
      <h2>1. Lógica del Chat (\`/api/creative-factory/agent-chat\`)</h2>
      <p>El componente \`AgentChat.tsx\` interactúa con un Endpoint de API en Next.js. El Agente (Arqui) cuenta con un System Prompt robusto que lo instruye para comportarse como Director Estratégico, no como un bot de servicio al cliente genérico.</p>

      <h2>2. El Ciclo de Persistencia (Tabla \`creative_chats\`)</h2>
      <p>El flujo exacto de almacenamiento de memoria es el siguiente:</p>
      <ul>
        <li>El usuario (o el administrador en modo lectura) abre la ventana de chat.</li>
        <li>El sistema lanza un \`SELECT conversation_history FROM creative_chats WHERE profile_id = userId\`.</li>
        <li>Si existe historial, se hidrata el estado de React y la conversación se reanuda de forma fluida.</li>
        <li>Al enviar un nuevo mensaje, se hace la petición a la IA, se recibe la respuesta, y ambos mensajes se empaquetan en el array JSONB.</li>
        <li>Finalmente se ejecuta un \`UPSERT\` en la base de datos para sobrescribir la columna \`conversation_history\` garantizando la memoria persistente.</li>
      </ul>

      <h2>3. Integración con "Matrices" (Creative Campaigns)</h2>
      <p>Cuando la IA decide generar un "Copy" o campaña publicitaria estructurada (a partir de una petición del usuario, por ejemplo, "Hazme un copy para Facebook sobre mi evento de Catas"), el sistema captura este output y lo graba simultáneamente en la tabla \`creative_campaigns\`. Así, el Administrador (Klarx94) puede visualizar, exportar y montar la campaña en Meta Ads.</p>
    `
  },
  'centro-control': {
    title: 'Centro de Control de Administración',
    tag: 'Administración',
    icon: 'LayoutDashboard',
    content: `
      <h2>1. Autenticación y Layout Master</h2>
      <p>El archivo \`src/app/admin-architect/layout.tsx\` emplea la función \`createClient()\` de \`@supabase/ssr\` para realizar una verificación server-side. Si el \`user.email\` no incluye explícitamente \`klar\`, el componente ejecuta un \`router.push('/dashboard')\`. Esto blinda todas las rutas anidadas.</p>

      <h2>2. Creative Factory B2B (\`/admin-architect/creative/page.tsx\`)</h2>
      <p>Esta es la herramienta más poderosa del sistema interno. Su funcionamiento se basa en inyección de contexto:</p>
      <ol>
        <li>Se carga el listado de clientes directamente desde la tabla \`profiles\`.</li>
        <li>Al seleccionar un cliente del dropdown, el estado \`selectedClient\` se actualiza con su UUID.</li>
        <li>El componente hijo (\`AgentChat.tsx\` o el visualizador de campañas) recibe este UUID a través del prop \`targetUserId\`.</li>
        <li>En lugar de leer la propia sesión de Admin, el sistema consulta en \`creative_chats\` y \`creative_campaigns\` filtrando por \`profile_id = targetUserId\`.</li>
      </ol>
      <p>Esto permite "espiar" y auditar la estrategia que el Agente IA le está sugiriendo al cliente en tiempo real.</p>

      <h2>3. Kanban Pipeline (\`/admin-architect/pipeline\`)</h2>
      <p>Tablero de operaciones drag-and-drop renderizado vía Tailwind y estado de React. Se utiliza para medir los tiempos de Setup Técnico (montaje de ads, integraciones Kommo) y garantizar la retención de clientes Growth Partner.</p>
    `
  },
  'google-oauth': {
    title: 'Configuración de Seguridad y OAuth',
    tag: 'Seguridad',
    icon: 'ShieldCheck',
    content: `
      <h2>1. El Flujo Google OAuth (GCP -> Supabase -> Next.js)</h2>
      <p>Hemos desechado el registro manual inseguro para adoptar un estándar corporativo. La implementación precisa:</p>
      <ul>
        <li><strong>Google Cloud Platform:</strong> Configuración del Client ID y Secret en la API Console bajo el dominio \`architect-landing-hosteleria.vercel.app\`.</li>
        <li><strong>Supabase Auth:</strong> Inserción de credenciales de Google y habilitación de redirección segura.</li>
        <li><strong>Frontend (\`src/app/auth/login/page.tsx\`):</strong> El botón de Login ejecuta el método: <br><br><code>await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: \`\${location.origin}/auth/callback\` } })</code></li>
      </ul>

      <h2>2. Manejo de Sesión Server-Side (\`@supabase/ssr\`)</h2>
      <p>Para evitar la manipulación de sesión en LocalStorage (XSS vulnerable), usamos Cookies. El archivo \`src/lib/supabase-server.ts\` / \`supabase-browser.ts\` encapsula las utilidades para leer, establecer y destruir cookies automáticamente. Esta validación es la que permite a \`/dashboard/layout.tsx\` y \`/manuals/layout.tsx\` bloquear el acceso antes de renderizar siquiera el DOM visual.</p>

      <div class="bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl mt-8">
        <h4 class="text-orange-500 font-bold mb-2 flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          Directriz de Seguridad Suprema
        </h4>
        <p class="text-zinc-300 text-sm">Nunca debe exponerse la variable <code>SUPABASE_SERVICE_KEY</code> en el Frontend (dentro de archivos expuestos o \`NEXT_PUBLIC_\`). Esta clave puede bypassar todas las reglas RLS de la base de datos (como se usó en el \`seed_events.mjs\`). Solo debe usarse en entornos Node o llamadas de servidor seguras.</p>
      </div>
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
        <ArrowLeft size={16} /> Volver al Índice
      </Link>

      <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-14 overflow-hidden shadow-2xl">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <header className="border-b border-white/10 pb-10 mb-10">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-orange-500 flex-shrink-0 mt-2">
              <Icon size={40} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-orange-500/90 bg-orange-500/10 px-3 py-1.5 rounded-md inline-block border border-orange-500/20">
                  ${data.tag}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-white/5">
                  SOP Master Plan
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                ${data.title}
              </h1>
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-bold flex items-center gap-3 bg-black/30 w-fit px-4 py-2 rounded-lg border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
            Estado del Protocolo: ACTIVO &nbsp;<span className="text-zinc-600">|</span>&nbsp; Acceso: K-ADMIN LEVEL
          </p>
        </header>

        <div className="prose prose-invert prose-orange max-w-none 
          prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight 
          prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-zinc-100
          prose-h3:text-xl prose-h3:text-orange-500/90 prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-lg
          prose-li:text-zinc-300 prose-li:text-lg prose-li:marker:text-orange-500
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-orange-400 prose-code:bg-orange-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" 
          dangerouslySetInnerHTML={{ __html: ${JSON.stringify(data.content)} }}>
        </div>
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

console.log('Deep Manuals updated successfully!');
