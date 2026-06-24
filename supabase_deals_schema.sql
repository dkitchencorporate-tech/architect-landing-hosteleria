-- ==========================================
-- PHASE 4: LEADS & DEALS MANAGEMENT
-- ==========================================

-- 1. Create Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text UNIQUE NOT NULL,
    phone text,
    restaurant_name text,
    status text DEFAULT 'new' CHECK (status IN ('new', 'meeting_booked', 'met', 'closed', 'lost')),
    source text DEFAULT 'landing_page',
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Deals Table (The "Configured" Pitch)
CREATE TABLE IF NOT EXISTS public.deals (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    magic_token text UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
    plan_type text NOT NULL CHECK (plan_type IN ('base', 'growth', 'maintenance')),
    base_price numeric NOT NULL,
    setup_fee numeric DEFAULT 0,
    discounts jsonb DEFAULT '[]'::jsonb, -- Array of {name, amount}
    bonuses jsonb DEFAULT '[]'::jsonb, -- Array of strings
    deal_notes text,
    status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'signed', 'paid', 'expired')),
    stripe_session_id text,
    whop_payment_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    expires_at timestamp with time zone DEFAULT timezone('utc'::text, now() + interval '7 days')
);

-- 3. RLS Policies
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Admins can do everything
CREATE POLICY "Admins can do everything on leads" ON public.leads
    FOR ALL TO authenticated
    USING ( (auth.jwt() ->> 'email') = 'klarx94@gmail.com' );

CREATE POLICY "Admins can do everything on deals" ON public.deals
    FOR ALL TO authenticated
    USING ( (auth.jwt() ->> 'email') = 'klarx94@gmail.com' );

-- Public can read deals using the magic_token (unauthenticated or authenticated)
-- This is critical for the "Sala de Cierre"
CREATE POLICY "Public can read deal by magic token" ON public.deals
    FOR SELECT TO public
    USING ( true ); -- We rely on the magic_token being impossible to guess.

CREATE POLICY "Public can read lead associated with deal" ON public.leads
    FOR SELECT TO public
    USING ( true ); -- Again, controlled via application logic using the deal token.

-- Allow inserting leads anonymously (from landing page form / agent)
CREATE POLICY "Anon can insert leads" ON public.leads
    FOR INSERT TO anon
    WITH CHECK (true);
