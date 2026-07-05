# 🚀 DOSSIER DE ARRANQUE: FASE 2 (PROSPECCIÓN Y VENTAS)
**Fecha:** 24 de Junio de 2026
**Objetivo:** Transición de la fase de desarrollo/infraestructura a la fase de adquisición de clientes automatizada.

---

> [!IMPORTANT]
> **ESTADO ACTUAL:** La pasarela de pago (Whop) está configurada, la base de datos (Supabase) estructurada, el CRM funcional y el generador de contratos dinámico está operativo. El motor del negocio está construido. Ahora toca encenderlo y meterle combustible (Leads).

## 1. REVISIÓN Y PUESTA A PUNTO (Testing Final en Producción)
Antes de enviar tráfico y contactar masivamente, debemos asegurar que la experiencia del usuario sea perfecta. Para mañana a primera hora ejecutaremos este checklist:

### A. Zonas de Trabajo (Admin)
- [ ] Validar que el Kanban del CRM mueve los leads correctamente y dispara las alertas.
- [ ] Comprobar que los "Contratos (Deals)" se ligan al cliente y reflejan los descuentos aplicados.
- [ ] Testear la generación final de credenciales tras un pago exitoso (Webhook de Whop).

### B. Zonas del Cliente (Dashboard & Creative Factory)
- [ ] Recorrido completo de Onboarding simulando ser un dueño de restaurante (completar perfil, datos del local).
- [ ] Validar la interfaz de la *Creative Factory* (Chatbots de creación de recetas/platos y copies).
- [ ] Revisión visual en dispositivos móviles (los dueños de restaurantes usan el móvil el 90% del tiempo).

### C. Servicios Upsell (Escalera de Valor)
- [ ] Revisar la visibilidad de los servicios adicionales dentro del panel del cliente.
- [ ] Asegurar que el flujo de compra de un upsell (ej. "Gestión de Redes Sociales Avanzada") redirige a un checkout válido.

---

## 2. PLAN DE AUTOMATIZACIÓN DE PROSPECCIÓN (Enjambre de Agentes AI)
Para que no tengas que estar buscando clientes a mano, vamos a construir un ecosistema de agentes autónomos. Estos agentes trabajarán 24/7 buscando restaurantes, evaluando su presencia digital y contactándolos.

### Arquitectura del Enjambre de Agentes (Swarm)

#### 🕵️‍♂️ Agente 1: El Sabueso (Data Scraper & Lead Gen)
*   **Misión:** Buscar restaurantes en Google Maps, Tripadvisor y ElTenedor dentro de España (o tu zona objetivo).
*   **Análisis:** Revisa si tienen página web (si es vieja, lenta o no tienen), si su Instagram está abandonado, y extrae su email público y teléfono.
*   **Output:** Alimenta tu base de datos de Supabase con leads cualificados de forma automática.

#### ✍️ Agente 2: El Copywriter (Icebreaker Generator)
*   **Misión:** Toma los datos del *Sabueso* y genera un email/mensaje hiper-personalizado.
*   **Ejemplo:** *"Hola [Nombre], he visto que [Restaurante] tiene 4.5 estrellas en Google pero la web tarda 8 segundos en cargar y pierden reservas. He preparado un diseño gratis para ustedes..."*
*   **Output:** Deja los emails en borradores o los encola para envío.

#### 🚀 Agente 3: El SDR (Sales Development Representative)
*   **Misión:** Envía los correos (vía NodeMailer/Resend) en horarios óptimos.
*   **Seguimiento:** Si no responden en 3 días, hace un follow-up automático.
*   **Conversión:** Si el restaurante responde positivamente, les envía tu enlace de **Calendly** para cerrar la videollamada contigo.

#### 📊 Agente 4: El Analista (Reporting Diario)
*   **Misión:** Todos los días a las 08:00 AM o al final del día, te enviará un reporte (puede ser a tu WhatsApp, Email o un canal de Slack/Discord).
*   **Métricas:** *"Hoy contactamos a 150 restaurantes. 12 abrieron el correo. 3 respondieron. 1 agendó reunión."*

---

## 3. HOJA DE RUTA PARA MAÑANA

> [!TIP]
> **Recomendación Estratégica:** No intentaremos programar los 4 agentes desde cero en código puro el primer día, ya que llevaría semanas. Usaremos herramientas especializadas.

1.  **Checklist de Producción:** (09:00 - 11:00) Haremos la auditoría final de las zonas de cliente y administrador.
2.  **Diseño de la Máquina de Prospección:** (11:00 - 13:00) 
    *   Te recomendaré el stack tecnológico exacto para los agentes (Ej: *n8n* para orquestar + *OpenAI/Gemini* para el cerebro + *Apify* para sacar datos de Google Maps).
    *   Configuraremos el primer agente extracto de leads.
3.  **Primer Lote de Pruebas:** (Tarde) Extraeremos los primeros 50 restaurantes reales y automatizaremos el primer contacto.

---
**¿Estás de acuerdo con esta estructura para nuestra próxima sesión de trabajo?** Si apruebas este dossier, mañana empezaremos directamente a tachar elementos de la lista.
