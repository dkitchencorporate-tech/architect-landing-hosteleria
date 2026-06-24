import { verifyAdmin } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Usar Service Key para evadir RLS
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

export async function POST(req: Request) {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ status: 'error', message: auth.error }, { status: auth.status });
    }

    const { token, planType } = await req.json();

    if (!token || !planType) {
      return NextResponse.json({ status: 'error', message: 'Faltan campos' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('invitations')
      .insert({
        token,
        plan_type: planType,
        // created_by omitido para evitar fkey errors si el perfil no existe
      })
      .select()
      .single();

    if (error) {
      console.error('[admin/invitations] insert error', error);
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'ok', data });
  } catch (err: any) {
    console.error('[admin/invitations] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
