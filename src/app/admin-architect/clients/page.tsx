import { createClient } from '@/lib/supabase-server';
import AdminClientsTable from '@/components/admin/AdminClientsTable';

export default async function ClientsPage() {
  const supabase = createClient();
  
  // Fetch profiles and their projects (using a join or separate queries)
  // Since we don't have explicit foreign key relationships set up in the PostgREST exactly for this simple schema,
  // we can just fetch profiles and projects separately or rely on a simple query.
  const { data: profiles } = await supabase.from('profiles').select('*, projects(*)').eq('role', 'client');

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Directorio de Clientes</h1>
        <p className="text-zinc-500 font-medium">Gestión y control de accesos al SaaS B2B.</p>
      </header>

      <AdminClientsTable initialProfiles={profiles || []} />
    </div>
  );
}
