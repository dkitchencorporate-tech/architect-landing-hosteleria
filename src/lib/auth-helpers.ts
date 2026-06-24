import { createClient } from './supabase-server';

export async function verifyAdmin() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    return { error: 'No autenticado', status: 401 };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (session.user.email !== 'klarx94@gmail.com' && profile?.role !== 'admin') {
    return { error: 'No autorizado. Se requiere rol de admin.', status: 403 };
  }

  return { session, supabase, error: null };
}
