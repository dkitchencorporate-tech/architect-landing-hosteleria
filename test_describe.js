const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = 'https://ytzgfgzwrjwbmjudvwgc.supabase.co';
const serviceKey = 'sb_secret_OA_fKL8TKTf9qHxRUTJFaQ_MkYVX2dk';
const supabaseAdmin = createClient(supabaseUrl, serviceKey);

async function describe() {
  const { data, error } = await supabaseAdmin.from('profiles').select('*').limit(1);
  if (error) console.error(error);
  else console.log(data);
}
describe();
