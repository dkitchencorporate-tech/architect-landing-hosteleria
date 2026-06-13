-- 1. Create Profiles Table (Linked to Auth Users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'client', -- 'client' or 'admin'
  plan TEXT DEFAULT 'base', -- 'base' or 'growth'
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Projects Table (Restaurant details from Onboarding)
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  restaurant_name TEXT,
  restaurant_type TEXT,
  monthly_revenue TEXT,
  main_problem TEXT,
  team_size TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Client Events Table (Events requested by the client)
CREATE TABLE public.client_events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  event_id TEXT NOT NULL, -- e.g. 'burger-master'
  status TEXT DEFAULT 'requested', -- 'requested', 'active', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Set up Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_events ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read/update their own profile. Admin can read all.
CREATE POLICY "Users can read own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Projects: Users can CRUD their own project. Admin can read all.
CREATE POLICY "Users can manage own project" ON public.projects
  FOR ALL USING (auth.uid() = profile_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- Client Events: Users can CRUD their own events. Admin can read all.
CREATE POLICY "Users can manage own events" ON public.client_events
  FOR ALL USING (auth.uid() = profile_id OR (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin');

-- 5. Trigger to automatically create a profile when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, plan)
  VALUES (new.id, new.email, 'client', 'base');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
