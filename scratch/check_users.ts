import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function checkUsers() {
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error('Error listing users:', error);
    return;
  }
  console.log('Total users:', users.length);
  users.forEach(u => {
    console.log(`- ${u.email} (ID: ${u.id}, Created: ${u.created_at})`);
  });
}

checkUsers();
