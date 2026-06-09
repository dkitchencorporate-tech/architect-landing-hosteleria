# FINAL LAUNCH ROADMAP: INSTRUCCIONES DE DESPLIEGUE PARA ANTIGRAVITY

> **Objetivo:** Implementar las mejoras de conversión (CRO) recomendadas por el analizador de probabilidades y asegurar que el funnel completo (Landing -> Lead -> Cierre) funciona sin fricciones antes de activar el tráfico.

Este documento contiene las tareas críticas que **Antigravity** (agente ejecutor) debe implementar en la *Landing Page* y la arquitectura del embudo de ventas, basadas en el informe estratégico.

---

## 1. VISIBILIDAD DEL SAAS Y REDUCCIÓN DE INCERTIDUMBRE (Alta Prioridad)

El producto real (`/dashboard`, Onboarding AI, Pipeline) es altamente sofisticado pero invisible en la landing, lo que reduce la conversión.

### Acción 1: Añadir Screenshots del Dashboard en la Landing
- **Ubicación:** Sección de "Base Operativa" (justo después de presentar el precio).
- **Contenido visual requerido:**
  1. Imagen del **Pipeline de fases en tiempo real**.
  2. Imagen del **Onboarding Wizard guiado por IA**.
  3. Imagen de la **Biblioteca de Eventos** (mostrando la mecánica de candados/desbloqueo).
- **Copy de apoyo:** "Tu propio panel de control B2B: visualiza el estado de tu proyecto, lanza eventos con un clic y utiliza nuestra IA para integrar tu carta."

### Acción 2: Activar la Demo en Vivo Inmediata
- **Objetivo:** Un hostelero debe poder escanear un QR o hacer clic en un botón en su móvil y ver una carta digital/demo interactiva *funcionando*, sin necesidad de dejar su email.
- **Implementación:** Crear una subruta (ej. `/demo-tapas`) o usar un dominio de prueba con una carta digital ficticia atractiva. Asegurar que el botón "Ver Demo Interactiva" en la Hero Section enlace directamente aquí.

---

## 2. GENERACIÓN DE CONFIANZA Y NEUROMARKETING

### Acción 3: Añadir "Rostro Humano" (Sección Fundador/Equipo)
- **Implementación:** Añadir un bloque simple y honesto en la landing.
- **Copy sugerido:** *"Soy [Nombre del Usuario], Partner Oficial Kommo desde 2025, con experiencia en hostelería y tecnología. Mi objetivo es erradicar la informalidad en tu negocio. Mi teléfono directo: [Número]"*
- **Visual:** Foto real y profesional del fundador.

### Acción 4: Ajuste de Valores en los Bonos (Credibilidad)
- **Implementación:** Reducir la valoración económica de los bonos para que sean percibidos como realistas y accionables.
- **Cambio:** Bajar la auditoría de Google Maps de 350€ a **180€**.
- **Copy actualizado:** *"Auditoría de Google Maps (Valor: 180€) - Análisis de 14 factores de posicionamiento y entrega de un informe PDF de 8 páginas con acciones priorizadas."*

### Acción 5: Optimización de las FAQ (Fricción Móvil)
- **Implementación:** Modificar el componente Accordion (FAQ) en la landing page.
- **Cambio:** Las respuestas deben ser visibles por defecto, o al menos mostrar las 2-3 primeras líneas sin requerir interacción (clic/tap), ya que los usuarios móviles rara vez interactúan con acordeones en una lectura rápida.

---

## 3. EL "TROJAN HORSE" DE VENTAS (Arqui V2)

### Acción 6: Desplegar el Agente de Ventas en la Landing
- **Implementación:** Integrar a **Arqui V2** (o un widget de chat impulsado por IA) directamente en la esquina inferior (footer/floating widget) de la landing page.
- **Funcionamiento:** Se presenta como un "Consultor Interactivo". Debe estar entrenado con las *10 Leyes del Cerrador*. Cada conversación se captura y se cualifica como lead antes de redirigir a Calendly o enviar a WhatsApp.

---

## 4. AUDITORÍA Y TESTING DEL FUNNEL (End-to-End)

Antes de lanzar la campaña de Meta Ads, Antigravity debe realizar un test completo del embudo de conversión, asegurando que los pasos sean fluidos y requieran el mínimo esfuerzo por parte del cliente.

### Flujo a Testear (Simulación del Cliente "Carlos"):
1. **Ad -> Landing:** El clic lleva a la landing (carga rápida, móvil optimizado).
2. **Landing -> Demo:** Hace clic en la demo interactiva. Se asombra.
3. **Interacción:** Habla con el chatbot (Arqui V2) o ve las FAQ y las fotos del dashboard.
4. **Registro/Cualificación:** Hace clic en "Agendar Llamada". Pasa por un Typeform rápido (máx 3-4 preguntas de cualificación).
5. **Agendamiento:** Selecciona fecha en Calendly.
6. **(Post-Llamada) Cierre:** Recibe enlace de pago (Stripe fraccionado 2x350€).
7. **Onboarding:** Al pagar, un webhook (Zapier/Make) envía sus datos a Kommo, dispara un mensaje automático de WhatsApp agradeciendo la compra y le entrega sus credenciales para acceder a `/dashboard`.

**Misión Final de Antigravity:** Ejecutar estos cambios técnicos, subir las capturas del dashboard, ajustar los textos y comprobar que los webhooks (Stripe -> Kommo -> WhatsApp -> App) operan sin fallos. Cuando Antigravity confirme esta lista, el proyecto estará listo para abrir el tráfico comercial.
