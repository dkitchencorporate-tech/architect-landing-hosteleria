const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...value] = line.split('=');
  if (key && value.length > 0) env[key.trim()] = value.join('=').trim();
});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_KEY);

async function check() {
  const { data, error } = await supabase.from('invitations').select('*').limit(1);
  console.log('Invitations schema:', data);
  
  const { data: cols, error: err2 } = await supabase.rpc('get_columns', { table_name: 'invitations' });
  console.log('RPC or explicit columns:', cols, err2);
}
check();
