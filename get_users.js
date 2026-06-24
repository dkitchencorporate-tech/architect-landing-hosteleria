require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function main() {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error(error);
  } else {
    console.log("Users:");
    data.users.forEach(u => console.log(u.email));
  }
}

main();
