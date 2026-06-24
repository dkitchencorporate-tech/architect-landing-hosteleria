import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Permitir BYPASS en entorno de desarrollo
    let userId = session?.user?.id;
    
    if (!userId) {
      if (process.env.NODE_ENV === 'development') {
        // En local, buscamos un usuario base si no hay sesión
        const { data: profile } = await supabase.from('profiles').select('id').limit(1).single();
        if (profile) userId = profile.id;
      }
      
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { serviceId } = await req.json();

    if (!serviceId) {
      return NextResponse.json({ error: 'serviceId is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('support_requests')
      .insert([
        {
          profile_id: userId,
          service_id: serviceId,
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    console.error('Support request error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
