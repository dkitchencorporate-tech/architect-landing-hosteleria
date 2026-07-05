# Auditoría Estratégica de Base de Datos (Supabase)

He escaneado exhaustivamente el esquema de tu base de datos de producción (`ytzgfgzwrjwbmjudvwgc`) comparando el "Ecosistema Legacy" (Mockups, Onboarding viejo, WhatsApp Bot) con el "Nuevo Ecosistema MVP" que acabo de inyectar.

A continuación, el mapeo exacto de qué sirve, qué entra en conflicto, y qué debemos limpiar antes de lanzar al cliente.

## 1. Módulos que están Perfectos (No tocar)

Estos módulos operativos y analíticos están bien estructurados y no entran en conflicto con el nuevo dashboard:
- **`chats` & `bot_settings`**: Es tu motor de IA conversacional (WhatsApp). Sigue intacto. El cliente final no lo toca, solo se nutre de él.
- **`web_analytics`**: Sistema de tracking de UTMs y referidos. Funciona en background perfectamente.
- **`leads`**: Tu tabla de recolección de prospectos (payloads). Intacta y aislada.

## 2. Los Nuevos Módulos (Inyectados por mí)

Estas son las tablas blindadas y estructuradas según nuestro último plan. Funcionan al 100%:
- **`invitations`**: Sistema de tokens encriptados (`plan_type`, `token`, `used`).
- **`creative_assets`**: Repositorio donde la *Creative Factory* guardará los prompts y creativos por cada `user_id`.
- **`business_profiles`**: La tabla donde ahora alojamos los datos técnicos del restaurante (address, capacity, cuisine_type, etc).

## 3. Conflictos y Redundancias (Requiere Limpieza ⚠️)

Aquí es donde el modelo antiguo ("Legacy") choca con el nuevo ("MVP").

### A. La Tabla `profiles` (Duplicidad de columnas)
La tabla principal de usuarios ahora mismo es un híbrido extraño porque mantuvimos columnas viejas y añadimos las nuevas:
- **Viejo:** `plan` (texto libre), `onboarding_completed` (boolean).
- **Nuevo:** `plan_type` (base_pago_unico / suscripcion), `status` (pending_approval / active), `role` (client / admin).
> **Solución propuesta:** Eliminar las columnas viejas `plan` y `onboarding_completed` para evitar que el sistema en el futuro se confunda de variable.

### B. Conflicto Crítico: `projects` vs `business_profiles`
En tu desarrollo anterior creaste una tabla llamada **`projects`** que guardaba los siguientes datos del cliente: `restaurant_name`, `restaurant_type`, `main_problem`, `monthly_revenue`, `team_size`.
Actualmente yo he creado **`business_profiles`** para gestionar la Carta Digital y la configuración del negocio (`capacity`, `tables`, `average_ticket`, `cuisine_type`).
> **El Problema:** Tenemos la información del cliente dividida en dos tablas diferentes que hacen casi lo mismo. 
> **Solución propuesta:** 
> 1. Mover `main_problem`, `monthly_revenue`, y `team_size` a la tabla `business_profiles`.
> 2. Destruir por completo la tabla `projects` para que `business_profiles` sea la "Fuente Única de Verdad" (Single Source of Truth) del cliente.

## 4. El Flujo de Registro (Onboarding Antiguo)
En tu código actual todavía debe haber restos del *Onboarding Wizard* público (`src/components/dashboard/OnboardingWizard.tsx`) que intentaba guardar en la tabla `projects`. Ya hemos construido la ruta `/onboarding?token=...` que es privada.
> **Solución propuesta:** Eliminar o archivar el código del Wizard antiguo para evitar brechas de seguridad (que alguien intente entrar sin token).

---

## User Review Required

> [!IMPORTANT]
> **Decisión Ejecutiva Requerida**
> Antes de que yo te dé luz verde para probar la interfaz visualmente, necesito tu aprobación para ejecutar el script de limpieza ("Clean-Up Script"):
> 1. ¿Me autorizas a eliminar la tabla `projects` y fusionar sus campos valiosos dentro de `business_profiles`?
> 2. ¿Me autorizas a limpiar las columnas obsoletas (`plan`, `onboarding_completed`) de la tabla `profiles`?
> 
> Si me das el "OK", aplico el bisturí en la base de datos (vía SQL CLI) y en el código frontend, dejando un entorno de producción inmaculado y listo para ventas.
