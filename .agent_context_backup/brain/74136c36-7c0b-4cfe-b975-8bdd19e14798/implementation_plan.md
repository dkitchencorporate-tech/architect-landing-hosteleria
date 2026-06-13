# Pivotaje Arquitectónico: CRM Master-Detail y Chat Aislado

Esta fase transformará el prototipo actual en una herramienta de grado Enterprise (Vercel/Linear style), eliminando el ruido visual y enfocando el contexto de la IA de forma modular por prospecto.

## User Review Required

> [!WARNING]
> La colección de mensajes actual en Firebase no tiene el campo `leadId`. Recomiendo vaciar la colección `messages` actual o ignoraremos los mensajes antiguos para evitar errores de tipo en el nuevo formato. ¿Estás de acuerdo con ignorar el historial global previo?

## Open Questions

> [!IMPORTANT]
> 1. Para la vista Master-Detail, ¿prefieres que la tabla ocupe la mitad izquierda de la pantalla y el detalle la mitad derecha (Split View estilo Outlook/Linear), o que el detalle se abra como un Modal Expansivo que cubra la pantalla? Propondré un "Split View" si no indicas lo contrario, ya que es el estándar en CRMs modernos.

## Proposed Changes

---

### UI Frontend (Next.js & Tailwind)

#### [MODIFY] `apps/frontend/src/app/page.tsx`
- Eliminar el componente `<SidebarChat />` global.
- Expandir el `<main>` para que ocupe todo el ancho de la pantalla y ceda espacio a la nueva vista dividida de leads.

#### [MODIFY] `apps/frontend/src/components/LeadsDashboard.tsx`
- Reemplazar el layout de Grid por una Tabla/Lista altamente condensada (Nombre, Estado, Score, Fecha).
- Añadir estado interno `selectedLead: Lead | null` para gestionar la vista detalle.
- Renderizar la lista a la izquierda y el detalle (si hay uno seleccionado) a la derecha (Split-View).

#### [NEW] `apps/frontend/src/components/LeadDetail.tsx`
- Nuevo componente expansivo que recibirá el `lead` seleccionado.
- Contendrá pestañas o secciones estructuradas: "Resumen", "Borrador de Contacto", "Auditoría Web" (futuro).
- Integrará dentro de su layout el nuevo componente de chat aislado.

#### [NEW] `apps/frontend/src/components/LeadChat.tsx`
- Evolución de `SidebarChat.tsx`.
- Recibirá la prop `leadId: string` y `leadContext: any`.
- Suscripción a Firebase filtrada por `where("leadId", "==", lead.id)`.
- Al enviar mensajes, incluirá el `leadId` y el `leadContext` para que el backend tenga contexto.

#### [DELETE] `apps/frontend/src/components/SidebarChat.tsx`
- Archivo obsoleto por el aislamiento del chat.
#### [DELETE] `apps/frontend/src/components/LeadCard.tsx`
- Reemplazado por el diseño tabular en `LeadsDashboard` y la vista detalle en `LeadDetail`.

---

### Backend Worker

#### [MODIFY] `packages/backend-worker/src/firebase/chat.ts`
- Modificar la suscripción para que identifique mensajes con `leadId`.
- El prompt de la IA ya no será genérico. Al recibir un mensaje, el worker inyectará dinámicamente el contexto específico del lead (Nombre, Dolor, Score, Web) para que Gemini 2.5 Flash entienda el contexto de forma modular.
- Consultar los leads asociados usando el `leadId` adjunto al mensaje antes de generar la respuesta.

#### [MODIFY] `packages/backend-worker/src/ai/evaluator.ts`
- Redactar un nuevo `systemInstruction` asimétrico y ultra-conciso.
- Imponer restricciones de copywriting: cero falsa empatía, formato ultra-directo (4 líneas máximo).
- Ejemplo fijado: "Hola, he intentado ver vuestra carta en el móvil..."

## Verification Plan

### Automated Tests
- Observar los logs del backend para asegurar que la inyección de la dependencia `leadId` en el chat se lee correctamente.

### Manual Verification
- Cargar la interfaz. Confirmar visualmente la transición a Master-Detail list.
- Prospectar un lead nuevo y ver el spinner/loader.
- Clicar en un lead, abrir su detalle y mandar un mensaje en su chat privado.
- Confirmar en la consola del backend que se está aislando el historial y que Gemini usa el contexto del lead en el prompt.
