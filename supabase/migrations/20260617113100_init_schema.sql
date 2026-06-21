-- 1. Create Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  business_name text,
  status text default 'pending_approval' check (status in ('pending_approval', 'active')),
  role text default 'client' check (role in ('client', 'admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Try to add columns if table already existed
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='business_name') THEN
        ALTER TABLE public.profiles ADD COLUMN business_name text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='status') THEN
        ALTER TABLE public.profiles ADD COLUMN status text default 'pending_approval' check (status in ('pending_approval', 'active'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role text default 'client' check (role in ('client', 'admin'));
    END IF;
END $$;

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can do everything
DROP POLICY IF EXISTS "Admins have full access to profiles" ON public.profiles;
CREATE POLICY "Admins have full access to profiles" 
ON public.profiles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Users can read their own profile
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = id);

-- Policy: Users can update their own profile
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, business_name, role, status)
  VALUES (new.id, new.email, 'client', 'pending_approval');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create a profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. Create Business Profiles Table (Onboarding Data)
CREATE TABLE IF NOT EXISTS public.business_profiles (
  id uuid references public.profiles(id) on delete cascade not null primary key,
  address text,
  cuisine_type text,
  average_ticket numeric,
  capacity integer,
  tables integer,
  social_links text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on business_profiles
ALTER TABLE public.business_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can do everything
DROP POLICY IF EXISTS "Admins have full access to business_profiles" ON public.business_profiles;
CREATE POLICY "Admins have full access to business_profiles" 
ON public.business_profiles FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Users can read their own business profile
DROP POLICY IF EXISTS "Users can read own business_profile" ON public.business_profiles;
CREATE POLICY "Users can read own business_profile" 
ON public.business_profiles FOR SELECT 
USING (auth.uid() = id);

-- Policy: Users can insert their own business profile
DROP POLICY IF EXISTS "Users can insert own business_profile" ON public.business_profiles;
CREATE POLICY "Users can insert own business_profile" 
ON public.business_profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own business profile
DROP POLICY IF EXISTS "Users can update own business_profile" ON public.business_profiles;
CREATE POLICY "Users can update own business_profile" 
ON public.business_profiles FOR UPDATE 
USING (auth.uid() = id);


-- 3. Create Creative Assets Table (Generations from Factory)
CREATE TABLE IF NOT EXISTS public.creative_assets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  asset_type text not null, -- 'prompt', 'image', 'ad_copy'
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on creative_assets
ALTER TABLE public.creative_assets ENABLE ROW LEVEL SECURITY;

-- Policy: Admins can do everything
DROP POLICY IF EXISTS "Admins have full access to creative_assets" ON public.creative_assets;
CREATE POLICY "Admins have full access to creative_assets" 
ON public.creative_assets FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Users can read their own assets
DROP POLICY IF EXISTS "Users can read own assets" ON public.creative_assets;
CREATE POLICY "Users can read own assets" 
ON public.creative_assets FOR SELECT 
USING (auth.uid() = user_id);

-- Policy: Users can insert their own assets
DROP POLICY IF EXISTS "Users can insert own assets" ON public.creative_assets;
CREATE POLICY "Users can insert own assets" 
ON public.creative_assets FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own assets
DROP POLICY IF EXISTS "Users can update own assets" ON public.creative_assets;
CREATE POLICY "Users can update own assets" 
ON public.creative_assets FOR UPDATE 
USING (auth.uid() = user_id);

-- Policy: Users can delete their own assets
DROP POLICY IF EXISTS "Users can delete own assets" ON public.creative_assets;
CREATE POLICY "Users can delete own assets" 
ON public.creative_assets FOR DELETE 
USING (auth.uid() = user_id);
