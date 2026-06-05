-- Fase 1.1: Políticas RLS (Row Level Security)

-- Habilitar RLS en las tablas
ALTER TABLE public.web_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads_analytics ENABLE ROW LEVEL SECURITY;

-- Políticas para web_analytics
-- Permitir INSERT a usuarios anónimos (para AnalyticsPixel)
CREATE POLICY "Allow anonymous inserts to web_analytics"
ON public.web_analytics
FOR INSERT
TO anon
WITH CHECK (true);

-- Denegar SELECT, UPDATE, DELETE para anon implícitamente al no crear políticas.
-- Permitir ALL únicamente para roles autenticados de nivel administrador
CREATE POLICY "Allow full access for authenticated admins to web_analytics"
ON public.web_analytics
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Políticas para chats
CREATE POLICY "Allow full access for authenticated admins to chats"
ON public.chats
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Políticas para leads_analytics
CREATE POLICY "Allow full access for authenticated admins to leads_analytics"
ON public.leads_analytics
FOR ALL
TO authenticated
USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');

-- Fase 1.2: Índices B-Tree para optimización de consultas del dashboard

-- Índice para tabla chats
CREATE INDEX IF NOT EXISTS idx_chats_created_at
ON public.chats USING btree (created_at DESC);

-- Índice para tabla web_analytics
CREATE INDEX IF NOT EXISTS idx_web_analytics_created_at
ON public.web_analytics USING btree (created_at DESC);
