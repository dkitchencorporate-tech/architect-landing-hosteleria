# INSTRUCCIONES DE DESARROLLO E INVESTIGACIÓN PARA JULES: SAAS ONBOARDING & EVENT ENGINE

> [!IMPORTANT]
> **OBJETIVO CRÍTICO:** Diseñar y desarrollar un panel privado tipo SaaS (`/dashboard`) que sirva como el **Protocolo de Onboarding y Centro de Operaciones** para nuestros clientes (Hosteleros). Este sistema debe estructurar el traspaso de información para erradicar la informalidad y automatizar la captación de datos de su negocio mediante una IA integrada, antes de pasar a la gestión de sus menús, eventos y servicios.

---

## 1. INVESTIGACIÓN PREVIA EXIGIDA A JULES

Antes de escribir la base de datos de eventos, Jules debe simular u operar una investigación de mercado externa sobre **estrategias de facturación y crecimiento en hostelería mediante eventos**. Los 7 eventos a desarrollar en el SaaS no deben limitarse a nuestras 3 demos locales (Sushi, Tapas, Burger), sino ser universales y aplicables a:
- Restaurantes pequeños y de barrio (menús del día, raciones).
- Restaurantes medianos/familiares (casual dining).
- Restaurantes gourmet y alta cocina (fine dining, omakase, degustación).
- Bares de copas, cafeterías y locales de ocio nocturno en distintos rangos.

Los 7 eventos investigados y redactados por Jules deben cubrir obligatoriamente estas tipologías:
1. **Maridajes Exclusivos** (comida + vinos/licores).
2. **Catas Guiadas** (cervezas, aceites, quesos, destilados).
3. **Eventos Musicales** (bandas en directo, jazz, noches temáticas).
4. **Espectáculo Flamenco** (tardeos o cenas con arte en vivo).
5. **Noches de Comedia / Monólogos** (entretenimiento en días de baja afluencia).
6. **Juegos por Edades / Trivia Interactiva** (dinámicas de grupo y gamificación).
7. **Dating / Speed Dating (Citas rápidas)** (eventos de conexión social por rangos de edad).

Cada evento expuesto en el panel debe contar con un **Dossier Explicativo Detallado (Pop-up/Modal)** al hacer clic, con sus especificaciones de lanzamiento, tiempos de preparación, KPIs esperados, ads y logística.

---

## 2. EL FLUJO DE ONBOARDING (Protocolo de Captación de Datos)

El dashboard es la primera parada del cliente tras pagar. Debes implementar un asistente de configuración inicial (**Onboarding Wizard**):
- **Formulario de Registro de Negocio:** El cliente debe proporcionar:
  - Nombre del local, dirección, tipo de cocina (gourmet, tradicional, fast casual, etc.) y ticket medio.
  - Horarios, aforo máximo de sala, número de mesas y datos de contacto de sala.
  - Enlaces a redes sociales y carta actual (enlaces o subida de PDF).
- **Asistente de IA de Onboarding (Chatbot Interno):** Integrado directamente en el asistente para guiar al hostelero. El agente IA conversa con el cliente para aclarar dudas sobre los ingredientes de sus platos estrella, alérgenos comunes de su carta, o el estilo visual que desea reflejar en su futura web, guardando todo en el perfil del cliente de forma estructurada.

---

## 3. ESQUEMA DE PRIVILEGIOS Y NEUROMARKETING (SaaS Dashboard)

Implementa un panel que se adapte dinámicamente según el rol del cliente (utilizando un selector en el header para que el evaluador pueda testear ambos):

### A. Vista del Cliente "Socio Growth" (Suscripción Mensual)
- **Acceso Completo a la Biblioteca de Eventos:** Pueden lanzar 1 evento mensual incluido en su cuota. Los eventos adicionales se desbloquean a precios preferenciales.
- **Ecosistema Growth:** Acceso a soporte directo con su Consultor Senior por WhatsApp, taquilla transparente (venta de entradas digital integrada), informes de rendimiento y analíticas avanzadas.
- **Regalos de Fidelización:** Descuentos exclusivos en campañas publicitarias adicionales y acceso preferente a nuevos módulos.

### B. Vista del Cliente "Servicio Pago Único" (Plan Base)
- **Acceso Limitado:** Solo tienen activo **1 Evento Único de Regalo** (por ejemplo, el de "Cata Guiada") para lanzar en su onboarding. El resto de la biblioteca de eventos aparece con candado de bloqueo.
- **Sección de Autogestión:** Una pestaña especial donde pueden editar textos básicos de su carta, cambiar horarios o añadir platos sencillos. Esta sección permanece bloqueada con la etiqueta *"En fase de desarrollo / Entrega"* y se desbloquea dinámicamente cuando su web base esté 100% entregada.
- **CTAs de Conversión:** Banners no intrusivos pero potentes que explican las ventajas de dar el salto al Plan Growth (ej: *"Desbloquea el Agente de WhatsApp Autónomo y 6 Eventos más por 299€/mes"*).

---

## 4. EL MARKETPLACE DE UP-SELLS (Ecosistema B2B)

El dashboard debe contar con una pestaña llamada **"Potenciadores / Marketplace"** que muestre de forma visual y atractiva los servicios no contratados:
- **Agente WhatsApp de Ventas Autónomo (Arqui V2):** Para automatización de reservas y atención 24/7.
- **Gestión de Campañas Publicitarias (Ads):** Para atraer tráfico local masivo.
- **Servicio de Community Manager y Creación de Contenidos:** Vídeos cortos para Instagram/TikTok.
- **Planes de Negocio y Auditorías de Costes/Escandallos.**

Cada servicio tendrá un botón de "Solicitar información / Contratar" que active un flujo de simulación y notifique al consultor por WhatsApp.

---

## 5. REQUISITOS TÉCNICOS PARA JULES

1. **Rutas y Estructura:** Desarrollar en Next.js bajo la ruta `/dashboard`.
2. **Estilo Premium:** Mantener el lenguaje de diseño (fondos ultra oscuros, acentos naranja/oro, tipografía premium, bordes finos, y transiciones fluidas en modals).
3. **Persistencia:** Guarda el estado del Onboarding, la selección del plan y el historial del Chatbot de Onboarding en `localStorage` para que sea completamente interactivo durante la demo.
4. **Mock Plan Switcher:** Imprescindible colocar un botón toggle en el header del dashboard que permita cambiar entre `CLIENTE BASE (PAGO ÚNICO)` y `SOCIO GROWTH (SUSCRIPCIÓN)` para evaluar el comportamiento dinámico del SaaS.

---

*Jules, tu misión es dotar a este SaaS de alma B2B, demostrando a cualquier hostelero que al contratarnos entra en un protocolo de ingeniería de restaurantes riguroso y automatizado.*
