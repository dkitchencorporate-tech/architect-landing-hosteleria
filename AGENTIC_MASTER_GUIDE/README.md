# 🦅 AGENTIC MASTER GUIDE - ARCHITECT.SYS HOSPITALITY
**Directorio Central para Agentes IA y Respaldo en la Nube**

Este directorio (`AGENTIC_MASTER_GUIDE/`) actúa como el repositorio maestro de conocimiento, sincronización y memoria operativa para cualquier Agente IA (Antigravity, Gemini 3.0, Claude, Cursor, etc.) que acceda a **Architect.Sys Hospitality** desde cualquier dispositivo o ubicación.

## 📌 1. REGLA SUPREMA DE OPERACIÓN (ANTI-ALUCINACIÓN)
Queda **TERMINANTEMENTE PROHIBIDO** alucinar precios, inventar características, modificar tarifas o alterar el modelo comercial del proyecto.
Todo agente que tome control de este código o converse con el usuario DEBE asumir como verdad única y absoluta los siguientes pilares:
- **Misión:** Liberar a la hostelería de las comisiones abusivas (20-30% en UberEats/El Tenedor) y digitalizar locales que pierden dinero por cartas PDF estáticas o llamadas no atendidas.
- **Modelo de Precios Innegociables:**
  1. **Base Operativa:** 700 € pago único (o 2 pagos de 350 €). 2 meses mantenimiento gratis, luego 69 €/mes.
  2. **Recepcionista IA + CRM:** 450 € setup + 69 €/mes (o 0 €/mes si el cliente es Socio Growth).
  3. **Plan Growth Partner:** 299 €/mes (o 2.990 €/año).
  4. **Upsells:** Meta Ads (desde 299 €/m) | Community Manager (desde 350 €/m).
  5. **Dark Kitchens:** *CONGELADO Y DESCARTADO HASTA NUEVA ORDEN.*

---

## 🗺️ 2. DIRECTORIO COMPLETO DE RUTAS Y ARCHIVOS CLAVE
Para una referencia rápida, aquí están las rutas exactas de cada área funcional del sistema:

| Área | Ruta / URL | Descripción y Archivos Clave | Estado |
| :--- | :--- | :--- | :--- |
| **SOP Supremo** | `/manuals/master-doc` | **Página Master interactiva** con toda esta verdad arquitectónica y comercial. | 🟢 100% Funcional |
| **Índice SOPs** | `/manuals` | Índice de manuales operativos (ahora con Banner Gigante hacia el Master Doc). | 🟢 100% Funcional |
| **Scout PWA** | `/admin/scout` | **Scout Command Center PWA** (Dashboard Kanban y Tabla para prospección IA). | 🟢 100% Funcional |
| **Motor IA** | `src/prospecting-engine/*` | Cerebro de 5 agentes (`Scout`, `Diagnostic`, `PredatorCopy`, `Channel`, `Telegram`). | 🟢 100% Funcional |
| **Landing** | `/` | Embudo público de venta consultiva y calculadora de pérdida EBITDA. | 🟢 100% Funcional |
| **Hub VIP** | `/hub` | Hub visual con carruseles de vídeo nativos pre-cargados y diagnóstico. | 🟢 100% Funcional |
| **Carta Demo** | `/demo/carta` | Menú interactivo HD para demostraciones en vivo. | 🟢 100% Funcional |
| **Onboarding** | `/onboarding` | Asistente de toma de datos y perfilaje de nuevos clientes B2B. | 🟢 100% Funcional |
| **Admin B2B** | `/admin-architect/*` | Gestión de pipeline, clientes, generador de contratos y firma eSignature. | 🟡 Funcional / Evolución |
| **Cliente B2B** | `/dashboard/*` | Panel del restaurante (`LiveMonitor`, `TrafficMonitor`, `CreativeFactory`). | 🔵 Estructura Lista |
| **APIs / CRM** | `/api/*` | Webhooks de Kommo CRM, Woztell WhatsApp, Whop, Stripe y motores IA. | 🟢 Probado y Conectado |

---

## 📂 3. ARCHIVOS DE RESPALDO EN ESTE DIRECTORIO (`/brain/`)
En la subcarpeta `AGENTIC_MASTER_GUIDE/brain/` encontrarás copias exactas de los documentos estratégicos históricos generados por la IA en sesiones anteriores:
- `dosier_propuesta_venta_el_gallo.md`: Modelo de propuesta real y contrato tipificado para un cliente de alto valor (Venta El Gallo, Sacromonte, Granada).
- `dossier_arranque_fase2.md`: Hoja de ruta para el arranque de la prospección automatizada y auditoría del sistema.
- `analisis_diseno.md`, `audit_report.md`, `diagnosis_report.md`: Auditorías técnicas y arquitectónicas del código.

---

## 🔄 4. PROTOCOLO DE GITHUB Y VERCEL (`[skip ci]`)
Para asegurar que todo el conocimiento, el código y las memorias agénticas estén respaldados al 100% en GitHub en la nube sin provocar un pase a producción accidental en Vercel (que afectaría a los clientes en vivo), los pushes de mantenimiento o documentación DEBEN llevar la etiqueta **`[skip ci]`** en el mensaje de commit.

**Ejemplo de comando:**
```bash
git add .
git commit -m "docs: sync agentic master guide and memory [skip ci]"
git push origin main
```

---

## 🚀 5. CÓMO RETOMAR EL PROYECTO DESDE AQUÍ
Si eres una nueva instancia de IA o un operador entrando en una nueva máquina:
1. Revisa este archivo y `.agents/AGENTS.md`.
2. Ejecuta `npm install` y `npm run build` para comprobar la integridad del entorno.
3. Continúa con la operación del **Enjambre Agéntico** en `/admin/scout` para prospectar 100 leads diarios cualificados.
