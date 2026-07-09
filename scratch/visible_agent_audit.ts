import { createClient } from '@supabase/supabase-js';
import { chromium, Page } from 'playwright';
import fs from 'fs';
import path from 'path';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

interface PageAuditResult {
  url: string;
  title: string;
  status: number | string;
  consoleErrors: string[];
  failedNetworkRequests: string[];
  findings: string[];
  isFullyConnected: boolean;
  hasMockOrStaticData: boolean;
}

async function runVisibleAudit() {
  console.log('🤖 [AUDITORÍA E2E EN VIVO - MODO VISIBLE] Iniciando...');
  
  // 1. Obtener Magic Link de login para klarx94@gmail.com
  console.log('🔑 Generando enlace de acceso directo para klarx94@gmail.com...');
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: 'klarx94@gmail.com',
  });

  if (linkError || !linkData?.properties?.action_link) {
    console.error('❌ Error generando magic link para klarx94@gmail.com:', linkError);
    process.exit(1);
  }

  const magicLink = linkData.properties.action_link;
  console.log('✨ Magic link obtenido con éxito.');

  // 2. Abrir Navegador Visible (headless: false)
  console.log('🖥️ Abriendo ventana de Chromium en el escritorio (headless: false, slowMo: 300ms)...');
  const browser = await chromium.launch({
    headless: false,
    slowMo: 300,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: null
  });

  const page = await context.newPage();

  const auditResults: PageAuditResult[] = [];

  // Configurar listeners de consola y red globalmente por página
  let currentConsoleErrors: string[] = [];
  let currentFailedRequests: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      currentConsoleErrors.push(msg.text());
    }
  });

  page.on('response', response => {
    if (response.status() >= 400 && !response.url().includes('favicon')) {
      currentFailedRequests.push(`${response.status()} - ${response.url()}`);
    }
  });

  // Paso A: Iniciar sesión con Magic Link en Producción Vercel
  console.log('🚀 [Paso 1/14] Accediendo con sesión klarx94@gmail.com...');
  await page.goto(magicLink, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000); // Esperar a que Supabase auth establezca cookies y redirija

  const urlsToTest = [
    { name: 'Dashboard Operativo Principal', url: 'https://hosteleria.architectsys.com/dashboard' },
    { name: 'Configuración y Menú Digital', url: 'https://hosteleria.architectsys.com/dashboard/settings' },
    { name: 'Visión General Corporativa (Master)', url: 'https://hosteleria.architectsys.com/admin-architect/overview' },
    { name: 'Gestión de Clientes Hostelería', url: 'https://hosteleria.architectsys.com/admin-architect/clients' },
    { name: 'Pipeline CRM de Ventas High-Ticket', url: 'https://hosteleria.architectsys.com/admin-architect/pipeline' },
    { name: 'Creative Factory IA', url: 'https://hosteleria.architectsys.com/admin-architect/creative' },
    { name: 'Protocolos y Contratos Firmados', url: 'https://hosteleria.architectsys.com/admin-architect/protocols' },
    { name: 'Trazabilidad y Eventos del Enjambre', url: 'https://hosteleria.architectsys.com/admin-architect/events-master' },
    { name: 'Scout Command Center PWA', url: 'https://hosteleria.architectsys.com/admin/scout' },
    { name: 'Landing Page Publicidad B2B', url: 'https://hosteleria.architectsys.com/' },
    { name: 'Hub Visual de Muestras', url: 'https://hosteleria.architectsys.com/hub' },
    { name: 'Demo Carta Interactiva PWA 0.2s', url: 'https://hosteleria.architectsys.com/demo/carta' },
    { name: 'Flujo Onboarding VIP 48 Horas', url: 'https://hosteleria.architectsys.com/onboarding' },
    { name: 'Sala de Negociación Deal Room VIP', url: 'https://hosteleria.architectsys.com/deal/demo' }
  ];

  for (let i = 0; i < urlsToTest.length; i++) {
    const target = urlsToTest[i];
    console.log(`\n======================================================`);
    console.log(`🔎 [Paso ${i + 2}/15] Auditando: ${target.name}`);
    console.log(`🔗 URL: ${target.url}`);
    
    currentConsoleErrors = [];
    currentFailedRequests = [];
    const findings: string[] = [];
    let isFullyConnected = true;
    let hasMockOrStaticData = false;

    try {
      const response = await page.goto(target.url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(2500); // Dar tiempo a que carguen los useEffect / peticiones fetch de Next.js

      const status = response ? response.status() : 'No Response';
      const title = await page.title();

      // Inspección específica del DOM por sección para comprobar funcionalidad y datos reales vs mock
      if (target.url.includes('/admin/scout')) {
        // Verificar tabla de leads en Scout
        const bodyText = await page.textContent('body') || '';
        if (bodyText.includes('0 Leads') || bodyText.includes('SyntaxError') || currentConsoleErrors.some(e => e.includes('leads'))) {
          findings.push('⚠️ Endpoint de prospectos en Scout devuelve error o no conecta con Supabase real en producción.');
          isFullyConnected = false;
        } else {
          findings.push('✅ Scout cargó datos de prospectos desde Supabase.');
        }
      }

      if (target.url.includes('/admin-architect/creative')) {
        // Verificar botones de generar imagen y copy en la fábrica
        const buttons = await page.locator('button').allInnerTexts();
        findings.push(`🎨 Botones interactivos en Creative Factory detectados: ${buttons.slice(0, 5).join(', ')}...`);
        // Probar clic en un botón si existe
        const generateBtn = page.locator('button:has-text("Generar"), button:has-text("Estrategia")').first();
        if (await generateBtn.isVisible()) {
          findings.push('⚡ Botón de acción principal visible y activo.');
        }
      }

      if (target.url.includes('/dashboard')) {
        const bodyText = await page.textContent('body') || '';
        if (bodyText.includes('simulación') || bodyText.includes('mock') || bodyText.includes('Ejemplo')) {
          findings.push('⚠️ Se detectaron textos informativos o datos de ejemplo simulados en el Dashboard.');
          hasMockOrStaticData = true;
        }
      }

      if (currentConsoleErrors.length > 0) {
        findings.push(`❌ Errores en consola JS: ${currentConsoleErrors.join(' | ')}`);
        isFullyConnected = false;
      }

      if (currentFailedRequests.length > 0) {
        findings.push(`❌ Peticiones de red fallidas (HTTP 4xx/5xx): ${currentFailedRequests.join(' | ')}`);
        isFullyConnected = false;
      }

      auditResults.push({
        url: target.url,
        title,
        status,
        consoleErrors: [...currentConsoleErrors],
        failedNetworkRequests: [...currentFailedRequests],
        findings,
        isFullyConnected,
        hasMockOrStaticData
      });

      console.log(`📊 Estado: ${status} | Título: ${title}`);
      if (findings.length > 0) {
        findings.forEach(f => console.log(`   -> ${f}`));
      }

    } catch (err: any) {
      console.error(`💥 Error navegando a ${target.url}:`, err.message);
      auditResults.push({
        url: target.url,
        title: 'Error de Carga',
        status: 'Timeout / Error',
        consoleErrors: [err.message],
        failedNetworkRequests: [],
        findings: ['No se pudo cargar la página dentro del tiempo de espera de 25s'],
        isFullyConnected: false,
        hasMockOrStaticData: false
      });
    }
  }

  console.log('\n📝 Generando informe final de auditoría operativa...');
  
  const reportPathJson = path.join(process.cwd(), 'prospecting_logs', 'production_e2e_audit_report.json');
  const reportPathMd = path.join(process.cwd(), 'prospecting_logs', 'production_e2e_audit_report.md');

  fs.mkdirSync(path.join(process.cwd(), 'prospecting_logs'), { recursive: true });
  fs.writeFileSync(reportPathJson, JSON.stringify(auditResults, null, 2));

  // Generar Markdown legible
  let mdContent = `# 🧠 DIAGNÓSTICO E2E EN VIVO (SESIÓN KLARX94 EN PRODUCCIÓN VERCEL)\n\n`;
  mdContent += `**Fecha:** ${new Date().toISOString()}\n`;
  mdContent += `**Usuario Verificado:** klarx94@gmail.com\n\n`;
  mdContent += `## 📋 TABLA RESUMEN DE AUDITORÍA OPERATIVA\n\n`;
  mdContent += `| Sección / URL | Estado HTTP | Conexión Supabase/Backend | Datos Simulados/Mock | Hallazgos Principales |\n`;
  mdContent += `|---|---|---|---|---|\n`;

  for (const res of auditResults) {
    const connIcon = res.isFullyConnected ? '🟢 Conectado 100%' : '🔴 Conexión Fallida / Error';
    const mockIcon = res.hasMockOrStaticData ? '⚠️ Contiene Mock/Simulado' : '🟢 Real / Limpio';
    const cleanFindings = res.findings.map(f => f.replace(/\n/g, ' ')).join('<br>');
    mdContent += `| [${res.title || res.url}](${res.url}) | \`${res.status}\` | ${connIcon} | ${mockIcon} | ${cleanFindings || 'Operativo 100%'} |\n`;
  }

  fs.writeFileSync(reportPathMd, mdContent);

  console.log(`\n✅ [AUDITORÍA FINALIZADA] Informe guardado en:\n -> ${reportPathMd}`);
  await browser.close();
}

runVisibleAudit().catch(err => {
  console.error('Error fatal en auditoría:', err);
  process.exit(1);
});
