const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function checkSchema() {
  const { data, error } = await supabase
    .from('invitations')
    .select('*')
    .limit(1);
    
  if (error) {
    console.error(error);
  } else {
    console.log('Invitations table columns (from first row or empty):', data);
    if (data.length === 0) {
      console.log('No rows. Let me insert a dummy row to get the schema back.');
    }
  }
}
checkSchema();
