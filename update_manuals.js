const fs = require('fs');
const path = require('path');

const manualsDir = path.join(__dirname, 'src', 'app', 'manuals');

const contentMap = {
  'mapa-navegacion': {
    title: 'Mapa Integral de Navegación',
    tag: 'Directorio',
    icon: 'BookOpen',
    content: `
      <h2>1. Directorio Público y Rutas de Conversión</h2>
      <ul>
        <li><strong><code>/</code> (Home):</strong> Landing page principal. Diseño High-End, enfocado a captación B2B.</li>
        <li><strong><code>/onboarding</code>:</strong> Proceso post-registro donde los clientes llenan datos de su restaurante para el CRM.</li>
      </ul>

      <h2>2. Dashboard del Cliente (Client Zone)</h2>
      <p>Rutas protegidas por Supabase Auth (solo usuarios logueados):</p>
      <ul>
        <li><strong><code>/dashboard</code>:</strong> Vista general del negocio, estadísticas simuladas de CTR e impacto.</li>
        <li><strong><code>/dashboard/events</code>:</strong> Catálogo interactivo con los 7 eventos maestros (catas, monólogos, etc.).</li>
        <li><strong><code>/dashboard/campaigns</code>:</strong> Gestor de campañas publicitarias activas e historial de solicitudes.</li>
        <li><strong><code>/dashboard/ai-architect</code>:</strong> Chat integrado con el agente de IA (Arqui) capaz de generar ideas y guardarlas en Supabase.</li>
      </ul>

      <h2>3. Admin Master Console (Admin Zone)</h2>
      <p>Rutas con validación de rol estricta (\`isAdmin\`). Solo accesible por la cuenta maestra.</p>
      <ul>
        <li><strong><code>/admin-architect/overview</code>:</strong> Métricas globales, gestión de clientes (activar/bloquear).</li>
        <li><strong><code>/admin-architect/creative</code>:</strong> Creative Factory. Visualiza los historiales de IA y campañas de los clientes individuales gracias al selector de Supabase.</li>
        <li><strong><code>/admin-architect/projects</code>:</strong> Tablero Kanban de seguimiento de integraciones y status de Onboarding.</li>
      </ul>

      <div class="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl mt-8">
        <h4 class="text-orange-500 font-bold mb-2">Nota de Seguridad SSR</h4>
        <p class="text-zinc-400 text-sm">Todo el ruteo interno está protegido mediante validación de cookies de sesión (\`createClient\` de SSR) y Middleware en Vercel, impidiendo accesos anónimos a los paneles.</p>
      </div>
    `
  },
  'arquitectura-saas': {
    title: 'Arquitectura SaaS y Base de Datos',
    tag: 'Infraestructura',
    icon: 'Database',
    content: `
      <h2>1. Infraestructura de Supabase</h2>
      <p>La aplicación utiliza Supabase como backend-as-a-service principal. Las tablas centrales son:</p>
      <ul>
        <li><strong><code>profiles</code>:</strong> Extensión de Auth. Almacena el rol y datos básicos del restaurante.</li>
        <li><strong><code>master_events</code>:</strong> Catálogo inmutable de los 7 eventos base ofrecidos por la agencia.</li>
        <li><strong><code>client_events</code>:</strong> Relación N:M que indica qué evento ha desbloqueado o solicitado un cliente.</li>
        <li><strong><code>creative_chats</code>:</strong> Almacena el historial conversacional con el agente IA por cliente.</li>
        <li><strong><code>creative_campaigns</code>:</strong> Registra los copies de campañas y matrices generadas.</li>
      </ul>

      <h2>2. Autenticación Server-Side Rendering (SSR)</h2>
      <p>Hemos implementado \`@supabase/ssr\` para un manejo robusto de sesiones. Esto permite que los Layouts de Next.js (App Router) puedan leer las cookies de forma síncrona en el servidor antes de renderizar la UI, evitando los saltos o parpadeos de carga (FOUC).</p>

      <h2>3. Integración y Despliegue (Vercel)</h2>
      <p>Cada vez que hacemos un push a GitHub, Vercel intercepta el webhook y construye la aplicación. El pipeline de Vercel está configurado con las variables de entorno inyectadas directamente en el panel del proyecto.</p>

      <div class="bg-zinc-900/50 border border-white/10 p-6 rounded-xl mt-6">
        <h4 class="text-white font-bold mb-2">Comandos Vercel CLI (SOP)</h4>
        <pre class="bg-black/50 p-4 rounded-lg text-sm text-zinc-300 font-mono mt-2 overflow-x-auto">
vercel ls             # Lista los despliegues activos
git push origin main  # Desencadena un build automático
        </pre>
      </div>
    `
  },
  'estrategia-ventas': {
    title: 'Embudos de Venta y Estrategia B2B',
    tag: 'Ventas',
    icon: 'Target',
    content: `
      <h2>1. Posicionamiento del Producto</h2>
      <p>Architect.Sys no vende "marketing", vende <strong>Sistemas Operativos de Crecimiento</strong>. El enfoque es puramente transaccional y de retorno de inversión (ROI).</p>

      <h2>2. Justificación de los Planes (High-Ticket)</h2>
      <p>Se ofrecen dos verticales principales de ingreso mensual recurrente (MRR):</p>
      <ul>
        <li><strong>Base Plan (997€/mes):</strong> Orientado a locales que necesitan flujo constante (ads) y eventos estándar (como catas o música en vivo). El cliente autogestiona usando la IA.</li>
        <li><strong>Growth Partner (2,497€/mes):</strong> Para restaurantes de alto volumen. Incluye automatizaciones avanzadas, setup de CRM (Kommo) y seguimiento directo por parte de la agencia.</li>
      </ul>

      <h2>3. Gatillos Psicológicos Usados</h2>
      <p>La Landing Page emplea técnicas avanzadas de neuroventas:</p>
      <ul>
        <li><strong>Exclusividad Invertida:</strong> "No trabajamos con cualquiera, postula para ver si calificas".</li>
        <li><strong>Prueba Social Técnica:</strong> Mostrar flujos complejos de IA y Node.js en vez de simples métricas de Likes.</li>
        <li><strong>Anclaje de Precio:</strong> El coste del plan es minúsculo comparado con "tener el local vacío un sábado".</li>
      </ul>
    `
  },
  'onboarding-b2b': {
    title: 'Onboarding de Clientes B2B',
    tag: 'Operaciones',
    icon: 'Users',
    content: `
      <h2>1. El Flujo Post-Pago</h2>
      <p>Cuando el cliente abona su factura, es redirigido a <code>/onboarding</code>. Aquí se le solicita:</p>
      <ol>
        <li>Tipo de Local (Bar, Restaurante, Club).</li>
        <li>Capacidad de comensales.</li>
        <li>Facturación Promedio.</li>
      </ol>
      <p>Estos datos se inyectan en <strong>Supabase</strong> (Tabla \`profiles\`) y sirven para condicionar las respuestas del Agente IA posteriormente.</p>

      <h2>2. Despliegue de Eventos Inmediato</h2>
      <p>Una vez en el Dashboard, el sistema clona virtualmente los 7 eventos maestros (Master Events) hacia el catálogo del cliente. Desde ahí, el cliente puede "Solicitar" el despliegue de un evento, el cual cambia su estado en la base de datos y alerta a la agencia.</p>

      <h2>3. Activación de Campañas</h2>
      <p>En la sección "Campañas", el cliente puede requerir anuncios para Facebook o Google. Estos requerimientos alimentan la "Creative Factory" en el Master Console del administrador.</p>
    `
  },
  'agente-ia': {
    title: 'Agente de Ventas IA (Arqui)',
    tag: 'Inteligencia Artificial',
    icon: 'Bot',
    content: `
      <h2>1. Rol y Directrices Core</h2>
      <p>Arqui está configurado (System Prompt) para actuar como un "Director de Marketing y Estrategia". Sus respuestas no deben ser robóticas ni excesivamente cordiales, sino directas, analíticas y basadas en datos.</p>

      <h2>2. Persistencia en Supabase</h2>
      <p>A diferencia de versiones anteriores, todo el historial de chat se almacena ahora en la tabla <code>creative_chats</code> de Supabase. Cada vez que el cliente abre la sección "Arqui", el chat carga el contexto previo.</p>

      <h2>3. Generación de Matrices</h2>
      <p>El cliente puede usar la IA para generar "Matrices de Copies" (Anuncios B2B). Esta data estructurada no solo se muestra en pantalla, sino que se guarda en <code>creative_campaigns</code> para que la agencia (desde su Master Console) pueda ver qué textos quiere usar el cliente y pasarlos a producción en Facebook Ads.</p>
    `
  },
  'centro-control': {
    title: 'Centro de Control de Administración',
    tag: 'Administración',
    icon: 'LayoutDashboard',
    content: `
      <h2>1. Master Overview</h2>
      <p>El panel principal de administración consolida las métricas de MRR (Ingresos Recurrentes) y el listado global de restaurantes registrados en la plataforma. Desde aquí se pueden gestionar accesos e identificar cuellos de botella operativos.</p>

      <h2>2. Creative Factory (La Matriz)</h2>
      <p>El núcleo operativo de la agencia. Permite al administrador:</p>
      <ul>
        <li>Seleccionar cualquier cliente de la base de datos Supabase.</li>
        <li>Ver, en tiempo real, todo el historial de conversación que ese cliente ha tenido con el agente IA.</li>
        <li>Extraer y editar las Campañas (Matrices de Texto) generadas por los clientes para su montaje en Ads.</li>
      </ul>

      <h2>3. Project Board (Kanban)</h2>
      <p>Visualización del estado de entrega. Los proyectos pasan de "Onboarding" a "Activo" a "Renovación". Sirve como CRM interno rudimentario para evitar que ningún cliente pague sin recibir su setup.</p>
    `
  },
  'google-oauth': {
    title: 'Configuración de Seguridad y OAuth',
    tag: 'Seguridad',
    icon: 'ShieldCheck',
    content: `
      <h2>1. Google Cloud Platform (GCP)</h2>
      <p>La integración OAuth permite el acceso con un solo clic usando cuentas de Google. El flujo configurado exige:</p>
      <ul>
        <li>Alta del proyecto en Google Cloud Console.</li>
        <li>Configuración de la Pantalla de Consentimiento (Scope: email, profile).</li>
        <li>Creación de Credenciales (Client ID y Client Secret).</li>
      </ul>

      <h2>2. Integración en Supabase</h2>
      <p>En el panel de Supabase > Authentication > Providers, se habilitó Google inyectando las credenciales de GCP. Esto delega la responsabilidad de seguridad en los servidores de Google y Supabase.</p>

      <h2>3. Bloqueo de Rutas (Middleware y Layouts)</h2>
      <p>Next.js gestiona la seguridad interceptando las peticiones a rutas protegidas. Si un usuario sin sesión o sin el email <code>klarx94@...</code> intenta acceder a <code>/admin-architect</code> o <code>/manuals</code>, será redirigido o bloqueado instantáneamente.</p>
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
    <div className="max-w-4xl mx-auto pb-20 print:pb-0">
      <Link href="/manuals" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors mb-8 print:hidden bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20">
        <ArrowLeft size={16} /> Volver al Índice
      </Link>

      <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10" />
        
        <header className="border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shadow-inner text-orange-500">
              <Icon size={32} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500/80 bg-orange-500/10 px-3 py-1 rounded-md mb-2 inline-block">
                ${data.tag}
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                ${data.title}
              </h1>
            </div>
          </div>
          <p className="text-zinc-500 text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Estado: ACTIVO &nbsp;|&nbsp; Rol Requerido: ADMIN
          </p>
        </header>

        <div className="prose prose-invert prose-orange max-w-none 
          prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight 
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-base
          prose-li:text-zinc-400 prose-li:marker:text-orange-500
          prose-strong:text-zinc-200
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" dangerouslySetInnerHTML={{ __html: ${JSON.stringify(data.content)} }}>
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

console.log('Manuals updated successfully!');
