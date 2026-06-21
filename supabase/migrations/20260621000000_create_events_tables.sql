CREATE TABLE IF NOT EXISTS public.master_events (
  id text PRIMARY KEY,
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  target_audience text NOT NULL,
  preparation_time text NOT NULL,
  client_role jsonb NOT NULL DEFAULT '[]'::jsonb,
  agency_role jsonb NOT NULL DEFAULT '[]'::jsonb,
  deliverables jsonb NOT NULL DEFAULT '[]'::jsonb,
  pre_event_protocol text NOT NULL,
  is_unlocked_for_base boolean NOT NULL DEFAULT false,
  image_placeholder text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.master_events ENABLE ROW LEVEL SECURITY;

-- Clients can read all events
CREATE POLICY "Clients can view master events" 
  ON public.master_events FOR SELECT 
  TO authenticated 
  USING (true);

-- Admins can manage events (Placeholder, ideally auth check)
CREATE POLICY "Admins can insert master events" ON public.master_events FOR INSERT TO authenticated USING (auth.jwt()->>'email' = 'klarx94@gmail.com');
CREATE POLICY "Admins can update master events" ON public.master_events FOR UPDATE TO authenticated USING (auth.jwt()->>'email' = 'klarx94@gmail.com');

CREATE TABLE IF NOT EXISTS public.client_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id text REFERENCES public.master_events(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'in_progress', 'delivered')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(profile_id, event_id)
);

ALTER TABLE public.client_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Clients can view their own events" 
  ON public.client_events FOR SELECT 
  TO authenticated 
  USING (auth.uid() = profile_id);

CREATE POLICY "Clients can insert their own events" 
  ON public.client_events FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Admins can view all client events" 
  ON public.client_events FOR SELECT 
  TO authenticated 
  USING (auth.jwt()->>'email' = 'klarx94@gmail.com');

CREATE POLICY "Admins can update client events" 
  ON public.client_events FOR UPDATE 
  TO authenticated 
  USING (auth.jwt()->>'email' = 'klarx94@gmail.com');


-- Insert Seed Data for Master Events
INSERT INTO public.master_events (id, title, category, description, target_audience, preparation_time, client_role, agency_role, deliverables, pre_event_protocol, is_unlocked_for_base) VALUES
('cata-guiada', 'Cata Guiada Especial', 'Catas Guiadas', 'Una experiencia inmersiva para los amantes de los detalles. Organiza una cata de cervezas artesanales, vinos selectos, aceites o quesos, acompañada de un sommelier o experto que guíe a los clientes.', 'Parejas, grupos de amigos, foodies, y clientes que buscan experiencias de valor.', '2-3 Semanas', '["Fijar fecha de baja afluencia (martes/miércoles noche).", "Seleccionar el producto a catar con proveedores locales.", "Asegurar el stock y disponer la sala/mesas."]', '["Configuración de la campaña de Ads geolocalizada a 5km.", "Creación de la landing page de venta de tickets anticipados.", "Automatización de recordatorios por WhatsApp a los inscritos."]', '["Embudo de Venta de Tickets (Landing + Pasarela de Pago)", "Creatividades para Ads (Imágenes/Textos)", "Guión de ventas para el personal de sala"]', 'Reunión de 30 mins para definir precios, aforo máximo y producto central. Nosotros conectamos la pasarela de pago 24h después.', true),
('maridaje-exclusivo', 'Noche de Maridaje Exclusivo', 'Maridajes Exclusivos', 'Una cena degustación de varios pases donde cada plato está diseñado para complementar una bebida específica (vinos, licores, o cócteles de autor). Ideal para posicionar tu local en un segmento premium.', 'Clientes dispuestos a pagar un ticket alto por experiencias gastronómicas completas.', '3-4 Semanas', '["Diseño de menú cerrado (4-6 pases).", "Formación extra al personal de sala sobre los platos y vinos."]', '["Campañas de retargeting a clientes previos.", "Diseño estético de la minuta premium digital e impresa."]', '["Sistema de Reservas Exclusivo (Pago por adelantado)", "Campaña de Google Ads (''Cenas exclusivas'')", "Minuta digital interactiva"]', 'Validación del menú y maridaje con el chef. Definición del ticket medio objetivo y el margen de beneficio por cubierto.', false),
('musica-directo', 'Veladas de Música en Directo', 'Eventos Musicales', 'Transforma tu local con sesiones de jazz, acústicos o bandas en directo. Aumenta la duración de la estancia y el consumo de bebidas/copas de sobremesa.', 'Público general, grupos, y clientes que buscan ocio nocturno relajado.', '1-2 Semanas', '["Contratar artistas (agencias locales o contacto directo).", "Preparar espacio y acústica (evitar molestar mesas cercanas)."]', '["Promoción orgánica intensa en Instagram 1 semana antes.", "Campaña Meta Ads de ''Ocio y entretenimiento'' con vídeos del grupo."]', '["Campaña publicitaria hiper-local", "Cartelería digital", "Base de datos de leads interesados en música en directo"]', 'Verificación de licencias de música en directo y configuración de la fecha límite de promoción.', false),
('espectaculo-flamenco', 'Cena y Espectáculo Flamenco', 'Espectáculo Flamenco', 'Combina la fuerza del arte flamenco en vivo con una cena de tapas o raciones tradicionales. Un imán para turismo y celebraciones especiales.', 'Turistas, celebraciones de empresa, y residentes buscando cultura y gastronomía.', '3 Semanas', '["Contratación de cuadro flamenco.", "Adaptación del salón (escenario/tablao visible para todos)."]', '["Campañas orientadas a turistas (Google Ads por ubicación).", "Activación de Ads mostrando vídeos impactantes del baile/cante."]', '["Landing page multi-idioma para turistas", "Sistema de reservas con depósito previo", "Guión de remarketing por WhatsApp"]', 'Definir menú cerrado rápido (tapas frías) para no interrumpir el espectáculo. Revisión de aforo y visibilidad.', false),
('noches-comedia', 'Noches de Comedia / Monólogos', 'Noches de Comedia', 'Llena tu local los días más flojos (lunes a miércoles) ofreciendo un escenario a monologuistas locales o reconocidos. Risas, cervezas y comida rápida de calidad.', 'Jóvenes y adultos jóvenes (18-40 años), grupos de amigos.', '2 Semanas', '["Contratar monologuista y adecuar micrófono/sonido.", "Diseñar promoción ''Combo'' (Entrada + Consumición + Plato)."]', '["Anuncios en TikTok e Instagram Reels usando clips graciosos del comediante.", "Automatización de reservas vía DM de Instagram."]', '["Bot de reservas integrado en Instagram/WhatsApp", "Creatividades de alto impacto en formato Reel", "Seguimiento automatizado post-evento"]', 'Definir la oferta gastronómica ''rápida'' para la noche. Setup del Bot de reservas asociado a la palabra clave ''RISAS''.', false),
('trivia-interactiva', 'Noche de Trivia Interactiva', 'Juegos / Trivia', 'Gamifica la experiencia. Los clientes compiten por mesas en un juego de preguntas y respuestas usando sus móviles, con premios (descuentos, rondas gratis) para los ganadores.', 'Millennials, Gen Z, grupos de amigos y afterworks.', '1 Semana', '["Suscripción a plataforma de Trivia (Kahoot u otras).", "Pantallas/proyectores visibles en todo el local y definir premio."]', '["Campañas de captación mostrando el lado lúdico.", "Gestión de inscripciones de equipos."]', '["Landing de inscripción por equipos", "Estrategia de retención (descuentos para la próxima semana)", "Campaña Ads ''Jueves Universitarios/Afterwork''"]', 'Designación del presentador o animador del local. Setup del formulario de inscripción para capturar nombres de equipos.', false),
('speed-dating', 'Speed Dating & Mixology', 'Citas Rápidas', 'Organiza un evento de citas rápidas estructurado, por rangos de edad, acompañado de cócteles o picoteo. Excelente para atraer gente nueva a tu bar o restaurante.', 'Solteros (segmentados por edad, ej. 25-35, 35-45).', '3 Semanas', '["Organización del espacio (mesas para 2, numeradas).", "Cronómetro y dinámica de rotación."]', '["Meta Ads altamente segmentados por estado civil y edad.", "Balanceo y filtro de perfiles en la base de datos."]', '["Formulario de cualificación avanzado", "Sistema automatizado de Matching y notificaciones", "Campañas publicitarias ultrasegmentadas"]', 'Definición del filtro de perfiles, diseño del cóctel de bienvenida y reglas de privacidad.', false)
ON CONFLICT (id) DO NOTHING;
