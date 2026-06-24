# Contexto de Negocio: Architect.Sys (High-Ticket B2B para Hostelería)

Este documento es la **fuente de la verdad** para cualquier Agente de IA que opere o modifique este repositorio. Ningún agente debe modificar el modelo de negocio, alterar precios o sugerir arquitecturas que contradigan estas leyes operativas.

## 1. El Embudo de Captación (Servicios Principales / Core)

La agencia opera bajo un modelo de suscripción y *Setup Fees* altamente calificados. Todos los servicios de esta sección son **Servicios Core (Principales)** y se exponen públicamente en la Landing Page.

Nadie compra con un clic. El flujo de ventas exige:
1. Agendar reunión por Calendly o contactar por WhatsApp.
2. Reunión de cualificación (Cierre Humano).
3. El K-Admin (dueño de la agencia) usa el **Modal de Propuestas** del panel de control para enviar el enlace de pago de Whop.

### 1.1. Plan Base: "Fundación Digital / Base Operativa" (El Caballo de Troya)
* **Precio:** 700€ (Pago único, fraccionable 2x350€).
* **Entregables de Software (Infraestructura):** Web Profesional (PWA), Carta Digital Interactiva con Neuromarketing, Motor de Reservas Directo, Base de Datos Propia, SEO B2B para Maps.
* **El "Pack de Arranque" (Bonos Estratégicos valorados en 980€):** El ancla de valor que justifica los 700€. Incluye:
  1. Auditoría de Fuga de Clientes en Google Maps (180€).
  2. Ingeniería de Carta Física / Neuromarketing (250€).
  3. Estrategia de Inyección de Tráfico para Días Valle (300€).
  4. Kit de Anuncios y Lanzamiento en Redes (250€).
* **Derecho a Eventos:** Otorga acceso a **1 Evento** de la biblioteca de eventos.
* **Mantenimiento Mensual:** 2 meses gratuitos de servidor. A partir del mes 3, se cobra el *Soporte Premium (69€/mes)* por alojamiento, anti-caídas y soporte técnico.

### 1.2. Ecosistema 24/7 (Recepcionista IA + CRM)
* **Precio:** Setup 450€ (Pago Único) + Mantenimiento 69€/mes.
* **Entregables:** Conexión Meta API, Pipeline Visual en Kommo CRM, Entrenamiento del Prompt con la marca del cliente. Licencia de Kommo incluida y hasta 1.500 chats/mes.

### 1.3. Socio Growth (Plan Growth)
* **Naturaleza:** Es un **Servicio Principal (Core)** expuesto en la Landing Page, NO es un upsell del Marketplace oculto.
* **Precio:** 299€/mes (Suscripción).
* **Derecho a Eventos:** Otorga acceso a **más de 1 evento al mes**.
* **Garantía de Éxito (Variable del 20%):** En los eventos planificados, la agencia asume la gestión de las campañas Ads y cobra un 20% de la taquilla generada, PERO solo si se cumple el objetivo de afluencia pactado.
* **Beneficio Cruzado:** Al contratar este plan, la cuota de mantenimiento de la IA (69€/mes) queda bonificada a 0€.

---

## 2. Los Upsells (El Marketplace Interno)

Los Upsells son servicios adicionales que solo se ofrecen a **clientes ya captados** (dentro de la Zona Privada `/dashboard` del cliente). 
Al igual que los servicios Core, el cliente solo puede hacer clic en "Solicitar Información". La venta final la ejecuta el K-Admin enviando la propuesta oficial.

* **Ejemplo 1: Creador UGC & Community Manager (350€/mes).** Grabación física y edición de 8-12 videos virales (Reels/TikTok).
* **Ejemplo 2: Auditoría Financiera / Ingeniería de Menú (Pago único a consultar).** Detección de fugas de capital y P&L.
* **Importante:** La "Creative Factory" (Generador de imágenes y copy con IA) está actualmente en fase *Standby* y NO se ofrece en los paquetes actuales. Solo se utiliza de forma interna por la agencia para prospectar.

---

## 3. Topología Técnica del Flujo de Cierre

Cualquier agente que modifique o cree funcionalidades relacionadas con "Creación de Clientes" o "Envío de Propuestas" debe ceñirse a este flujo arquitectónico:
1. K-Admin entra a `/admin-architect/pipeline`.
2. Selecciona un Cliente y el Servicio Acordado (Sea Core o Upsell).
3. El sistema dispara un correo electrónico con el **Contrato, el Dossier de Entregables, y el Botón de Pagar**.
4. El cliente hace clic en el enlace del correo.
5. Llega a una landing donde ve el contrato, hace clic en una casilla de verificación (Firma Digital / Aceptación).
6. Es redirigido a Whop o Stripe para ejecutar el pago.
