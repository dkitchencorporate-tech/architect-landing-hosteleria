-- 1. Añadir plan_type a profiles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='plan_type') THEN
        ALTER TABLE public.profiles ADD COLUMN plan_type text check (plan_type in ('base_pago_unico', 'suscripcion', 'none')) default 'none';
    END IF;
END $$;

-- 2. Crear tabla invitations
CREATE TABLE IF NOT EXISTS public.invitations (
    id uuid default gen_random_uuid() primary key,
    token text not null unique,
    plan_type text not null check (plan_type in ('base_pago_unico', 'suscripcion')),
    used boolean default false,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS en invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Política: Admins pueden gestionar todas las invitaciones
DROP POLICY IF EXISTS "Admins can manage invitations" ON public.invitations;
CREATE POLICY "Admins can manage invitations" 
ON public.invitations FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Política: Invitados pueden leer su invitación validando el token
DROP POLICY IF EXISTS "Public can read invitations" ON public.invitations;
CREATE POLICY "Public can read invitations" 
ON public.invitations FOR SELECT 
USING (true);
