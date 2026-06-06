# Protocolo de Operaciones y Workflow SaaS (B2B Hospitality)

Este documento detalla los criterios de trabajo, protocolos de captura de datos y el flujo de implementación (Pipeline) estructurado para cada nuevo cliente (hostelero) que ingrese al ecosistema SaaS de **ARCHITECT**.

Sirve como el manual de instrucciones definitivo de la agencia tras cerrar exitosamente una venta.

---

## 1. Fase 1: Onboarding y Captura Estructurada de Datos
**Objetivo:** Erradicar la informalidad de los correos electrónicos o WhatsApps caóticos y estructurar la información del restaurante desde el minuto cero.

### Flujo Técnico:
1. **Acceso Inicial:** El cliente realiza el pago y recibe credenciales (o enlace mágico) para acceder a la ruta `/dashboard`.
2. **Formulario Cautivo:** Antes de ver el dashboard completo, el cliente es guiado forzosamente por el `OnboardingWizard`.
3. **Datos Críticos Requeridos:**
   - Información del negocio: Nombre, dirección, tipo de cocina, ticket medio.
   - Operaciones: Aforo, número de mesas.
   - Recursos: Redes sociales, carta actual (URL).
4. **Asistencia por IA:** Un chatbot integrado conversa y simula preguntas extra de negocio (alérgenos, platos estrella, estilo visual) para brindar un trato de agencia hiper-personalizada.
5. **Persistencia:** Todos estos datos se deben guardar en la base de datos (actualmente estructurados y mapeados vía `localStorage` en la demo) para que el equipo de Arquitectos inicie el desarrollo.

---

## 2. Fase 2: Ejecución del Pipeline de Trabajo (Transparencia)
**Objetivo:** Evitar que el cliente pregunte "cómo va lo mío". Se gestiona su expectativa mediante un pipeline visual dentro de su propio panel.

### Estados del Pipeline (Visibles en `/dashboard#pipeline`):
1. **Onboarding & Traspaso de Datos:** (Completado automáticamente al terminar la Fase 1).
2. **Diseño UI/UX y Estructura Base:** (Activo). Los Arquitectos implementan el diseño web premium usando los datos del onboarding.
3. **Desarrollo del Agente IA y Reservas:** Configuración de integraciones de WhatsApp y conectores de reserva.
4. **Revisión y Ajustes:** Loop de feedback de la V1 con el cliente.
5. **Lanzamiento:** Paso final de despliegue donde el SaaS se vuelve 100% operativo y se desbloquea la autogestión.

---

## 3. Fase 3: Gestión de Privilegios y Autogestión (SaaS Core)
**Objetivo:** Dividir a los usuarios en categorías de rentabilidad para la agencia.

### Plan Base (Pago Único)
- **Autogestión Bloqueada (Fase de entrega):** Hasta que el proyecto no se entregue, esta pestaña se muestra con un overlay borroso de "Desarrollo en Proceso". Una vez entregada, permite editar textos básicos de menú y web.
- **Librería de Eventos (Limitada):** Solo tienen acceso a **1 evento de regalo** (Cata Guiada) para comprobar la utilidad de los protocolos de Growth. El resto aparece bloqueado.
- **Incentivo de Venta:** Existen banners sutiles y elegantes a lo largo del panel que sugieren la conversión al plan mensual.

### Plan Socio Growth (Suscripción Mensual - 299€/mes)
- **Desbloqueo Total:** Autogestión completa.
- **Acceso a los 7 Eventos Premium:** Los clientes pueden lanzar dossiers estructurados de Maridajes, Música en Directo, Flamenco, etc.
- **Integraciones Inmediatas:** Acceso prioritario al soporte y analíticas avanzadas.

---

## 4. Fase 4: Ecosistema de Up-Sells (El Marketplace B2B)
**Objetivo:** Escalar la facturación de la agencia ofreciendo servicios extra que el hostelero pueda simular o contratar desde el panel a un clic.

### Servicios Ofertados (`/dashboard#marketplace`):
1. **Agente WhatsApp Autónomo:** Integración de bot de IA 24/7 para cerrar reservas.
2. **Ads Management:** Campañas de Google/Meta hyper-locales para días flojos.
3. **Creación de Contenidos UGC:** Servicio de grabación in-situ de TikToks/Reels.
4. **Auditoría de Rentabilidad:** Análisis de escandallos e ingeniería de menús.

**Flujo Operativo Interno:**
Cuando el usuario hace clic en "Solicitar Contratación", nuestro backend envía inmediatamente una notificación vía webhook/WhatsApp a un consultor senior de la agencia, quien cierra la venta mediante trato humano (Simulado en la interfaz actual con 1.5s de delay y un alert de confirmación).

---

## 5. El "Panel Interno" (Próximos Pasos de Desarrollo)
Tras el despliegue del SaaS orientado al cliente, el equipo técnico deberá construir un `/admin/clientes` (Backoffice de la Agencia) donde el equipo de Arquitectos:
- Pueda ver en lista las respuestas del OnboardingWizard de cada cliente.
- Tenga un conmutador manual para cambiar el estado del "Pipeline" (Avanzar el estado del proyecto).
- Pueda alternar la flag de los clientes entre `PLAN_BASE` y `PLAN_GROWTH` en Supabase al confirmarse los pagos en Stripe.