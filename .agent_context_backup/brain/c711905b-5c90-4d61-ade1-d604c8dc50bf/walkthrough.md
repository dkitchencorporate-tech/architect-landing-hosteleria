# Cierre de Sprint: Transformación a Modelo Socio Operativo (High-Ticket)

Se ha completado la refactorización profunda de toda la arquitectura de conversión. El embudo ya no vende "herramientas"; vende "Ingeniería de Procesos" y filtra a los curiosos, garantizando que el equipo comercial solo hable con hosteleros listos para invertir.

## 1. El Muro de Elite: Enterprise Modal (Dark Kitchen)
Se reemplazó el botón directo a WhatsApp por un formulario oscuro de pre-cualificación (`EnterpriseModal.tsx`).
*   **7 Preguntas Estratégicas:** Obliga al cliente a revelar su volumen de facturación y su presupuesto líquido (Mínimo 3.000€).
*   **Gestión de Expectativas:** No entrega el calendario inmediatamente; envía al usuario a una "Lista de Espera de Evaluación" mientras los datos se envían a `/api/lead` para revisión del equipo.

## 2. Limpieza de Fricciones en el Embudo Inferior
*   **Nuestro Proceso:** Alineado con los 4 pilares operativos reales (Auditoría -> Fundación Digital -> Inyección de Tráfico -> Escalado Autónomo).
*   **Preguntas Frecuentes (FAQ):** Se eliminaron precios antiguos (la licencia fantasma de 450€) y se explicaron de forma transparente los 700€ de Setup Base, los 69€ de mantenimiento mensual y el 0% de comisiones por reserva.

## 3. El Cerebro B2B de Arqui (El Cerrador)
Se reescribió por completo la lógica del Agente IA en `route.ts`. Arqui ya no es un chatbot de atención al cliente, es un **Socio de Integraciones**.
*   **Conoce los 4 Pilares:** Sabe diagnosticar el dolor exacto y recetar la Base Operativa, el Plan Growth, el Agente IA o la Dark Kitchen.
*   **Sondeo Financiero:** Pregunta sutilmente si el cliente prefiere "Suscripción mensual" o "Pago único" antes de lanzar un precio.
*   **La Regla del Cierre en 2 Pasos:** Arqui ahora evita enviar muros de texto. Separa la revelación del precio de la entrega de los bonos (1.150€), usando una pregunta de empatía intermedia (*"¿has intentado hacer promociones tú mismo antes?"*) para bajar la guardia del hostelero antes del mazazo final.

El ecosistema ahora es un escudo contra prospectos de bajo nivel y un imán para inversores y restaurantes consolidados.
