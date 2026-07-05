# TODO List: Motor de Prospección Agresiva, Auditoría EBITDA & PWA Scout Command Center

## Fase 1: Arquitectura Modular de Agentes IA (Cero Monolitos)
- [x] Crear estructura `src/prospecting-engine/agents/` y definir interfaces base
- [x] Implementar `ScoutAgent.ts` (descubrimiento, scraping, deduplicación local y Supabase)
- [x] Implementar `DiagnosticAgent.ts` (cálculo de fuga de margen, auditoría de carta PDF/El Tenedor y scoring ICP)
- [x] Implementar `PredatorCopyAgent.ts` (redacción consultiva con Gemini 3 Pro / Flash y fallback resiliente)
- [x] Implementar `ChannelOperatorAgent.ts` (mapeo de acciones multi-canal: WhatsApp, IG, Email, LinkedIn)
- [x] Implementar `TelegramSyncerAgent.ts` (sincronización bidireccional y tarjetas VIP para aprobación de Alex)

## Fase 2: Persistencia & Escudo Anti-Duplicados (Supabase)
- [x] Diseñar esquema SQL `src/prospecting-engine/schema_prospects.sql` para tabla `prospects`
- [x] Integrar verificación anti-duplicados por teléfono/dominio en `ScoutAgent`
- [x] Implementar guardado transaccional y control de rondas diarias (100 leads/día)

## Fase 3: Centro de Mando Visual PWA (`src/app/admin/scout/`)
- [x] Crear layout y manifiesto PWA (`public/manifest.json`) para instalación en iOS/Android
- [x] Crear componentes visuales:
  - [x] `ScoutKPIs.tsx`: Métricas clave (Leads hoy, Aprobados por Alex, WhatsApps enviados, Fuga EBITDA total)
  - [x] `ScoutKanban.tsx`: Tablero visual por estado de CRM (Por Aprobar -> Autorizado -> WA Enviado -> Reunión -> Won)
  - [x] `ScoutTable.tsx`: Tabla de alta densidad estilo Clay.com con filtros por ciudad, rating y modelo de negocio
  - [x] `LeadDetailModal.tsx`: Radiografía financiera, ganchos de copy (1-click copy) y registro de acciones por canal
  - [x] `TelegramConfigCard.tsx`: Panel de control de sinergia con Telegram y disparo manual de rondas
- [x] Crear página principal `src/app/admin/scout/page.tsx` conectada a Supabase y al motor de agentes

## Fase 4: Integración y Verificación End-to-End
- [x] Verificación de compilación TypeScript (`npm run build`) y resolución de errores
- [x] Probar flujo de generación de copy con Gemini 3 Pro y fallback
- [x] Documentar manual de uso para Alex y despliegue final en Vercel
