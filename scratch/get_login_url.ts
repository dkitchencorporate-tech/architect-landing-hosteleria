import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

async function getLoginUrl() {
  const { data, error } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email: 'klarx94@gmail.com',
  });
  if (error) {
    console.error('Error generating link:', error);
    return;
  }
  console.log('Magic Link:', data.properties?.action_link);
}

getLoginUrl();
