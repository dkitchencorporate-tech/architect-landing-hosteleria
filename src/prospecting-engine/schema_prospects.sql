-- ==============================================================================
-- ESQUEMA DE BASE DE DATOS SUPABASE - ARCHITECT.SYS SCOUT COMMAND CENTER
-- Tabla anti-duplicados para prospección B2B de alta hostelería.
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.prospects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_name TEXT NOT NULL,
    city TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    website_url TEXT,
    instagram_handle TEXT,
    business_model TEXT NOT NULL,
    google_rating NUMERIC(3, 1) DEFAULT 4.5,
    review_count INTEGER DEFAULT 100,
    has_pdf_menu BOOLEAN DEFAULT true,
    uses_el_tenedor BOOLEAN DEFAULT true,
    has_online_ordering BOOLEAN DEFAULT false,
    estimated_monthly_revenue NUMERIC(12, 2) DEFAULT 0,
    estimated_lost_margin_monthly NUMERIC(12, 2) DEFAULT 0,
    priority_score INTEGER DEFAULT 50,
    status TEXT NOT NULL DEFAULT 'DISCOVERED',
    diagnostic_summary TEXT,
    whatsapp_hook TEXT,
    instagram_hook TEXT,
    email_subject TEXT,
    email_body TEXT,
    channel_history JSONB DEFAULT '[]'::jsonb,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_phone UNIQUE (phone)
);

-- Índices adicionales para rendimiento en filtrado y anti-duplicación
CREATE INDEX IF NOT EXISTS idx_prospects_city ON public.prospects(city);
CREATE INDEX IF NOT EXISTS idx_prospects_status ON public.prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_priority ON public.prospects(priority_score DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_website ON public.prospects(website_url) WHERE website_url IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_prospects_ig ON public.prospects(instagram_handle) WHERE instagram_handle IS NOT NULL;

-- Políticas de Seguridad RLS (Row Level Security)
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;

-- Permitir acceso total al rol de servicio (Service Role / Admin)
CREATE POLICY "Allow admin full access on prospects" 
ON public.prospects 
FOR ALL 
TO service_role, authenticated, anon
USING (true) 
WITH CHECK (true);

-- Comentario descriptivo para la tabla
COMMENT ON TABLE public.prospects IS 'Tabla central del motor Architect.Sys Scout Command Center para gestión anti-duplicados y seguimiento multi-canal.';
