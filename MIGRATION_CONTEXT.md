# CONTEXTO DE MIGRACIÓN - ARCHITECT.SYS (RESUME STATE)

Este documento contiene la memoria a corto plazo y el plan de acción exacto que estábamos a punto de ejecutar antes de la migración de equipo. 
**[Instrucción para el Agente IA al reanudar]:** Lee este documento y carga el "Plan de Implementación v2" para continuar exactamente donde lo dejamos.

## Estado Actual (16 Junio 2026)
Hemos terminado el diagnóstico del ecosistema SaaS (Admin Architect, Dashboard y Creative Factory) y hemos aprobado el **Plan de Refactorización y Escalabilidad Operativa (Versión 2.0)**. 
Aún **no se ha escrito código** de este nuevo plan. Estamos listos para iniciar la **Fase 1 y Fase 2**.

## El Plan Aprobado (A Ejecutar)

### 1. Auditoría de IA
- Las APIs actuales (Gemini e Imagen 4 vía AI Studio) tienen un límite de 15 RPM en el plan gratuito y bloquean la generación de imágenes. La solución es escalar a un proyecto de Google Cloud con facturación (Pay-as-you-go). El código actual ya intercepta estos errores correctamente.

### 2. Saneamiento de Base de Datos y Aislamiento Multitenant
- Se eliminará el uso de `localStorage` y `DEFAULT_MOCK_CLIENTS`.
- Se hará un barrido total (TRUNCATE) de las tablas `profiles` y `projects` en Supabase para reiniciar el sistema.
- Se aplicará estricto Row Level Security (RLS) basado en el ID del usuario.

### 3. Rediseño Híbrido "Premium Clarity"
- Se abandonará el Dark Mode genérico por una interfaz híbrida, clara, ultra-premium orientada a concentración y resultados.
- Paleta de colores: Hueso, Crema, Blanco Puro, Negro profundo, con acentos en Naranja Architect y Rojo sutil para alertas.
- UI: Menú hamburguesa lateral dinámico, desplazamientos interactivos fluidos, bordes nítidos y sombras de baja opacidad.

### 4. Flujo de Control de Clientes Dual
- **Ruta Inbound (Automatizada):** Cliente se registra vía Landing. Su perfil nace en Supabase como `status = 'pending_approval'`. El cliente ve una pantalla de "Esperando Activación". El Super Admin recibe notificación y lo habilita manualmente desde el panel de control, otorgando accesos.
- **Ruta Outbound (Manual):** El Super Admin entra a la zona de "Forjar Ecosistema", crea clientes a mano, asigna planes/paquetes custom (precio fijo, recurrente, híbrido) y le envía el acceso pre-configurado al cliente.

## Próximo Paso Inmediato al Iniciar Sesión
1. Entregar al usuario los Scripts SQL para hacer el *Truncate* y agregar las columnas de `status` y `custom_package` en Supabase.
2. Comenzar la refactorización visual (Fase 2) transicionando los layouts principales (`/admin-architect/layout.tsx`, `/dashboard/layout.tsx` y `/creative-factory/page.tsx`) al nuevo Design System "Premium Clarity".
