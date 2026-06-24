const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = 'https://ytzgfgzwrjwbmjudvwgc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0emdmZ3p3cmp3Ym1qdWR2d2djIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NTg4MDUsImV4cCI6MjA5MTEzNDgwNX0.ijLOlxuIcXm3tIQt3ut8f4_Dli7SHbtQ38uLpLbVjGg';
const serviceKey = 'sb_secret_OA_fKL8TKTf9qHxRUTJFaQ_MkYVX2dk';

const supabaseAdmin = createClient(supabaseUrl, serviceKey);
const supabaseUser = createClient(supabaseUrl, supabaseKey);

async function runE2E() {
  console.log('--- EMPEZANDO AUDITORÍA E2E ---');

  try {
    // 1. Crear invitación (Admin)
    console.log('[1] Generando Invitación...');
    const token = crypto.randomUUID();
    const { data: invite, error: inviteError } = await supabaseAdmin
      .from('invitations')
      .insert({
        token,
        plan_type: 'base_pago_unico',
        used: false
      })
      .select()
      .single();

    if (inviteError) throw inviteError;
    console.log('✅ Invitación generada:', invite.token);

    // 2. Simular Onboarding Cliente
    console.log('\n[2] Simulando Onboarding Cliente...');
    const testEmail = `test+${Date.now()}@gmail.com`;
    const testPassword = 'Password123!';
    
    // Validar token (como lo hace el front)
    const { data: validateInvite, error: validateError } = await supabaseUser
      .from('invitations')
      .select('*')
      .eq('token', token)
      .single();
      
    if (validateError || !validateInvite || validateInvite.used) {
      console.error('Validation error:', validateError);
      throw new Error("Error validando token o token ya usado.");
    }

    // SignUp
    const { data: authData, error: authError } = await supabaseUser.auth.signUp({
      email: testEmail,
      password: testPassword,
    });

    if (authError) throw authError;
    console.log('✅ Usuario registrado en Auth:', authData.user.id);

    // Actualizar profile y crear business_profile
    await supabaseUser.from('profiles').update({
      business_name: 'Restaurante E2E Test',
      status: 'active'
    }).eq('id', authData.user.id);

    await supabaseUser.from('business_profiles').insert({
      id: authData.user.id,
      cuisine_type: 'Fina Gastronomía',
      average_ticket: '50',
      address: 'Calle Test 123',
      capacity: 100,
      tables: 25
    });

    await supabaseAdmin.from('invitations').update({ used: true }).eq('id', validateInvite.id);
    console.log('✅ Perfil y Business Profile creados, Invitación quemada.');

    // 3. Simular Acceso a Dashboard y Recursos
    console.log('\n[3] Validando Acceso a Recursos...');
    const { data: profileCheck, error: profileError } = await supabaseUser
      .from('profiles')
      .select('*, business_profiles(*)')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;
    console.log('✅ Perfil cargado correctamente:', profileCheck.business_name);

    // Intentar acceder a master_events (RLS: usuarios pueden hacer select)
    const { data: eventsCheck, error: eventsError } = await supabaseUser
      .from('master_events')
      .select('*');
      
    if (eventsError) throw eventsError;
    console.log(`✅ Eventos Maestros leídos exitosamente: ${eventsCheck?.length} eventos encontrados.`);

    // 4. Creative Factory Backend Simulation
    console.log('\n[4] Testeando Estructura de Creative Factory...');
    // Create a creative chat
    const { data: chatData, error: chatError } = await supabaseUser
      .from('creative_chats')
      .insert({
        profile_id: authData.user.id,
        messages: [{ role: 'system', content: 'Iniciando chat.' }]
      })
      .select()
      .single();

    if (chatError) throw chatError;
    console.log('✅ Chat de Creative Factory inicializado para el cliente.');

    // Create a creative dish
    const { data: dishData, error: dishError } = await supabaseUser
      .from('creative_dishes')
      .insert({
        profile_id: authData.user.id,
        name: 'Plato Test E2E',
        description: 'Una descripción de prueba.'
      })
      .select()
      .single();
      
    if (dishError) throw dishError;
    console.log('✅ Plato guardado en Creative Factory.');

    console.log('\n✅ FLUJO E2E COMPLETADO CON ÉXITO.');

  } catch (err) {
    console.error('\n❌ ERROR DURANTE E2E TEST:', err);
  }
}

runE2E();
