const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseUrl = 'https://ytzgfgzwrjwbmjudvwgc.supabase.co';
const serviceKey = 'sb_secret_OA_fKL8TKTf9qHxRUTJFaQ_MkYVX2dk';

const supabaseAdmin = createClient(supabaseUrl, serviceKey);

async function testInsert() {
  const testId = crypto.randomUUID();
  console.log('Testing raw insert into profiles...');
  const { data, error } = await supabaseAdmin.from('profiles').insert({
    id: testId, // UUID
    business_name: 'Test Trigger',
    role: 'client',
    status: 'pending_approval'
  });
  
  if (error) {
    console.error('Insert error:', error);
  } else {
    console.log('Insert success!', data);
    await supabaseAdmin.from('profiles').delete().eq('id', testId);
  }
}

testInsert();
