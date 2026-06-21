-- Migración: Tablas Dinámicas para la Creative Factory
-- Elimina los datos estáticos de la memoria de la IA

CREATE TABLE IF NOT EXISTS public.creative_dishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.creative_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  dish_id UUID REFERENCES public.creative_dishes(id) ON DELETE SET NULL,
  pain_point TEXT NOT NULL,
  angle TEXT NOT NULL,
  hook TEXT NOT NULL,
  primary_text TEXT NOT NULL,
  visual_prompt TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.creative_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  messages JSONB DEFAULT '[]'::jsonb NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT creative_chats_profile_id_key UNIQUE (profile_id)
);

-- Políticas RLS (Si el cliente debe ver sus platos/campañas, o si solo el Admin lo usa)
-- Asumimos que Admin puede ver y editar todo, y el cliente puede ver lo suyo.
ALTER TABLE public.creative_dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creative_chats ENABLE ROW LEVEL SECURITY;

-- Políticas temporales para acelerar el uso por parte del Admin Architect y el Cliente:
CREATE POLICY "Allow full access to authenticated users" ON public.creative_dishes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access to authenticated users" ON public.creative_campaigns FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow full access to authenticated users" ON public.creative_chats FOR ALL USING (auth.role() = 'authenticated');
