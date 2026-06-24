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

    const { token, planType, email } = await req.json();

    if (!token || !planType) {
      return NextResponse.json({ status: 'error', message: 'Faltan campos' }, { status: 400 });
    }

    // 1. Sync the admin profile securely using Service Role to maintain relational integrity
    if (auth.session?.user.email === 'klarx94@gmail.com') {
      const { error: upsertError } = await supabaseAdmin.from('profiles').upsert({
        id: auth.session.user.id,
        email: 'klarx94@gmail.com',
        role: 'admin',
        business_name: 'Architect Sys Admin',
      }, { onConflict: 'id' });
      
      if (upsertError) {
        console.error('[admin/invitations] sync profile error', upsertError);
      }
    }

    // 2. Insert with strict foreign key linkage
    const { data, error } = await supabaseAdmin
      .from('invitations')
      .insert({
        token,
        plan_type: planType,
        email: email || null,
        created_by: auth.session?.user.id
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
