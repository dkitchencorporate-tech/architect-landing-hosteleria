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

    const { token, planType, email, name } = await req.json();

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

    // 2. Intentar crear el usuario real en Auth para integrarlo al ecosistema
    let targetProfileId = null;
    
    if (email) {
      // a) Verificar si ya existe el perfil por correo
      const { data: existingProfile } = await supabaseAdmin
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
        
      if (existingProfile?.id) {
        targetProfileId = existingProfile.id;
      } else {
        // b) Crear el usuario en Auth (esto dispara el trigger handle_new_user)
        const mockPassword = `Klar_${Math.random().toString(36).slice(-8)}!`;
        const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
          email: email,
          password: mockPassword,
          email_confirm: true
        });

        if (authError) {
          console.error('[admin/invitations] Error creando Auth User:', authError);
          // Si el correo ya estaba registrado en auth pero no en profiles, lo capturamos
          if (authError.status === 422 || authError.message.includes('already registered')) {
            // No podemos saber el UUID si no está en perfiles tan fácilmente, 
            // pero asumiremos que el frontend o un intento posterior fallaría.
          }
        } else if (authUser?.user?.id) {
          targetProfileId = authUser.user.id;
          
          // Esperar brevemente a que el trigger de postgres termine su ejecución
          await new Promise(resolve => setTimeout(resolve, 300));
          
          // Actualizar el perfil con el nombre real proporcionado
          await supabaseAdmin.from('profiles').update({
            business_name: name || 'Cliente',
            status: 'pending_approval'
          }).eq('id', targetProfileId);
          
          // c) Insertarlo en el Kanban de Deals
          const { error: dealError } = await supabaseAdmin.from('pipeline_deals').insert({
            profile_id: targetProfileId,
            title: name || 'Cliente Protocolo Rápido',
            status: 'new',
            priority: 'high'
          });
          if (dealError) console.error('[admin/invitations] Error creando Deal:', dealError);
        }
      }
    }

    // 3. Insertar la Invitación (Token) para el Vault
    const { data, error } = await supabaseAdmin
      .from('invitations')
      .insert({
        token,
        plan_type: planType,
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
