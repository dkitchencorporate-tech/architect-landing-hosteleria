import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user.email?.includes('klar')) {
      if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const { data, error } = await supabase
      .from('pipeline_deals')
      .select('*, profiles(business_name, status)')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Pipeline GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user.email?.includes('klar')) {
      if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await req.json();
    const { profile_id, title, status, priority } = body;

    const { data, error } = await supabase
      .from('pipeline_deals')
      .insert([
        {
          profile_id,
          title,
          status: status || 'pending',
          priority: priority || 'medium',
        }
      ])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error: any) {
    console.error('Pipeline POST error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session || !session.user.email?.includes('klar')) {
      if (process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await req.json();
    const { id, status } = body;

    const { data, error } = await supabase
      .from('pipeline_deals')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Pipeline PATCH error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
