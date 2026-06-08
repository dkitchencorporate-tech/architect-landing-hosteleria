# SIMULACIÓN DE TEST DE USUARIO: DEL MINUTO CERO AL ÉXITO

Este documento plantea el guión exacto para probar la plataforma como un cliente real, garantizando que todos los puntos de contacto funcionan perfectamente antes de salir a producción comercial.

## ESCENARIO DE PRUEBA
- **Cliente Ficticio:** Carlos, dueño de "La Brasita C.B." (Restaurante familiar y de carnes, ticket medio 35€).
- **Servicio Contratado:** Plan Base (Pago único por infraestructura web) con interés potencial en Growth.

---

## PASO 1: LA COMPRA (El Minuto Cero)
**Simulación:**
1. Carlos firma el contrato digital y realiza el pago de 1.500€.
2. Automáticamente, recibe un correo: *"Bienvenido a la Élite Gastronómica, Carlos. Aquí tienes las llaves de tu negocio."*
3. Se genera un usuario en la base de datos: `carlos@labrasita.com`.

## PASO 2: EL ONBOARDING WIZARD (Día 1)
**Acción en la Plataforma:**
1. Entrar a `URL_DE_PRODUCCION/dashboard`.
2. Login con las credenciales de Carlos.
3. El sistema detecta que es el primer inicio de sesión y lanza la pantalla completa de **Onboarding**.
4. **Verificación:**
   - Llenar los datos básicos (Horarios, Aforo: 50 pax, Ticket Medio: 35€).
   - Interactuar con el Chatbot de IA: Carlos le dice a la IA *"Mi especialidad es el chuletón madurado 45 días"*. La IA responde y guarda el dato para el equipo de copywriting.
   - Terminar Onboarding.
5. *Comprobación en Agencia:* El `/admin-architect` debe reflejar a "La Brasita" en la fase *En Onboarding / Esperando Datos*.

## PASO 3: EL PIPELINE Y DESARROLLO (Días 2-14)
**Acción en la Plataforma (Vista Cliente):**
1. Carlos vuelve a entrar a su panel 3 días después.
2. Ya no ve el onboarding. Ve un Dashboard bloqueado parcialmente con un **Pipeline de Trabajo**.
3. **Verificación:** Debe ver que la fase "Diseño Web" está marcada como "En Proceso" (70%) y saber exactamente en qué está trabajando la agencia.

## PASO 4: LA ENTREGA Y EL DESBLOQUEO (Día 15)
**Simulación:**
1. Desde `/admin-architect`, la agencia cambia el estado de Carlos a "Entregado".
2. **Acción en la Plataforma (Vista Cliente):**
   - Carlos entra y se activa una animación de "¡Felicidades! Tu infraestructura está viva".
   - Accede a la pestaña de autogestión de su carta.
   - Accede a la **Biblioteca de Eventos**.
3. **Verificación del Neuromarketing:**
   - Carlos debe ver el evento de regalo: "Cata de Carnes Maduradas y Vinos Tintos" (Desbloqueado).
   - Intenta hacer clic en "Noche de Monólogos" y el sistema le muestra un candado hermoso: *"Exclusivo para Socios Growth. Aumenta tu facturación los martes por solo 299€/mes."*

## PASO 5: EL UP-SELL (Día 30)
**Acción en la Plataforma:**
1. Carlos está encantado con la web, pero tiene problemas gestionando reservas de WhatsApp.
2. Navega a la pestaña **Potenciadores / Marketplace** de su `/dashboard`.
3. Hace clic en "Agente IA de Reservas Autónomo".
4. **Verificación:** Al solicitar información, el sistema simula el aviso a la agencia y lanza un confeti o popup de confirmación: *"Tu asesor estratégico contactará contigo en 15 minutos".*

---

## CRITERIOS DE APROBACIÓN (10/10) PARA DESPLIEGUE FINAL
- [ ] ¿El Onboarding Wizard guarda correctamente la información y no deja al cliente abandonado?
- [ ] ¿El Toggle Mock de la interfaz cambia efectivamente los permisos y visibilidad (Base vs Growth)?
- [ ] ¿El pipeline de la agencia se entiende a la primera mirada?
- [ ] ¿El diseño destila autoridad, lujo y precisión (modo oscuro, acentos naranjas, interfaces limpias)?
- [ ] ¿La experiencia en dispositivos móviles es impecable? (Carlos mirará esto en su iPhone mientras está en el restaurante).

*Si todos estos checks pasan en el entorno local, estamos listos para conquistar el mercado en Vercel.*