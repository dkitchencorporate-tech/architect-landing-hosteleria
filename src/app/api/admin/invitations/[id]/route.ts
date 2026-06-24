import { verifyAdmin } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_KEY || ''
);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ status: 'error', message: auth.error }, { status: auth.status });
    }

    const { id } = params;

    const { error } = await supabaseAdmin
      .from('invitations')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('[admin/invitations] delete error', error);
      return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (err: any) {
    console.error('[admin/invitations] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
