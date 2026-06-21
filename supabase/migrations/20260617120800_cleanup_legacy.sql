-- 1. Añadir columnas a business_profiles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='business_profiles' AND column_name='main_problem') THEN
        ALTER TABLE public.business_profiles ADD COLUMN main_problem text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='business_profiles' AND column_name='monthly_revenue') THEN
        ALTER TABLE public.business_profiles ADD COLUMN monthly_revenue text;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='business_profiles' AND column_name='team_size') THEN
        ALTER TABLE public.business_profiles ADD COLUMN team_size text;
    END IF;
END $$;

-- 2. Migrar datos si los hay (Opcional, en caso de haber proyectos en la tabla)
INSERT INTO public.business_profiles (id, main_problem, monthly_revenue, team_size)
SELECT profile_id, main_problem, monthly_revenue, team_size FROM public.projects
ON CONFLICT (id) DO UPDATE SET 
    main_problem = EXCLUDED.main_problem,
    monthly_revenue = EXCLUDED.monthly_revenue,
    team_size = EXCLUDED.team_size;

-- 3. Destruir tabla projects (Legacy)
DROP TABLE IF EXISTS public.projects CASCADE;

-- 4. Limpiar columnas legacy en profiles
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='plan') THEN
        ALTER TABLE public.profiles DROP COLUMN plan CASCADE;
    END IF;
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='onboarding_completed') THEN
        ALTER TABLE public.profiles DROP COLUMN onboarding_completed CASCADE;
    END IF;
END $$;
