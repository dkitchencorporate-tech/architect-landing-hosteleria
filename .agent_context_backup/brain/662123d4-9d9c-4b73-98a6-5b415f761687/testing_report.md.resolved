# Reporte de Pruebas de Experiencia de Usuario: Creative Factory Multi-Cliente

Este informe recopila el plan de pruebas de experiencia de usuario (UX) y validación funcional simulando el trabajo diario de un consultor B2B en la **Factoría Creativa** al gestionar diferentes clientes.

---

## 📋 Plan de Casos de Prueba y Resultados

| ID | Caso de Prueba | Objetivo | Datos de Entrada | Resultado Obtenido | Estado |
|---|---|---|---|---|---|
| **TC-01** | Cambio de Contexto de Cliente | Validar que la interfaz se actualiza al cambiar de cliente. | Selector: *L'Atelier de L'Océan* | Ficha lateral y selector de platos actualizan especialidades gourmet de forma instantánea. | **PASSED** |
| **TC-02** | Tono de Redacción Gourmet | Comprobar que la IA adapta el tono sofisticado al generar copy. | Cliente: *L'Atelier de L'Océan* | Copys elegantes en tercera persona, mención a bogavantes, alta cocina y un ticket medio real de 80€. | **PASSED** |
| **TC-03** | Tono de Redacción Barrio/Casual | Comprobar que la IA adapta el tono cercano. | Cliente: *El Tardeo de Lola* | Copys directos en segunda persona ("lo curras tú"), mención a croquetas, migas y tapeo. | **PASSED** |
| **TC-04** | Vinculación Dinámica de Plato | Validar la persistencia de imágenes en disco para platos específicos. | Plato: *Patatas Bravas* (El Tardeo de Lola) | Comprobado que la API asocia la imagen generada a `client_lola_2.png`. | **PASSED** |

---

## 🛠️ Evidencias de Ejecución (Capturas de Pantalla)

### 1. Cambio de Contexto del Cliente (Gourmet)
Al seleccionar a **L'Atelier de L'Océan**, la barra lateral izquierda actualiza la especialidad del restaurante a "Marisco de Autor y Alta Cocina" y le asigna la categoría de negocio **GOURMET** en color dorado/ámbar.

![Ficha Gourmet de Cliente](/C:/Users/Administrator/.gemini/antigravity/brain/662123d4-9d9c-4b73-98a6-5b415f761687/ux_test_gourmet_profile_1780752639921.png)

### 2. Generación en Tono Gourmet (Sofisticado)
Al fabricar la campaña contra el dolor de delivery, la IA redacta en tono elegante y asertivo de tercera persona ("su negocio", "el talento culinario es suyo") adaptando la estructura al ticket medio de 80€ característico de su carta y nombrando de manera orgánica el restaurante y sus bogavantes.

![Copy Gourmet Generado](/C:/Users/Administrator/.gemini/antigravity/brain/662123d4-9d9c-4b73-98a6-5b415f761687/ux_test_gourmet_generation_1780752684500.png)

### 3. Generación en Tono Casual/Cercano
Al cambiar el contexto a **El Tardeo de Lola** y regenerar, el tono de redacción varía por completo a segunda persona ("vuestro sudor", "lo curras tú"), enfocando el gancho al dolor de un restaurante tradicional y nombrando directamente platos tradicionales como las croquetas o el tapeo de Granada.

![Copy Casual Generado](/C:/Users/Administrator/.gemini/antigravity/brain/662123d4-9d9c-4b73-98a6-5b415f761687/ux_test_casual_generation_1780752720030.png)
