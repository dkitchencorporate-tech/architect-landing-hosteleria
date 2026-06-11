import { createClient } from '@/lib/supabase-server';

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

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-600">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase font-bold text-zinc-500">
            <tr>
              <th className="px-6 py-4">Negocio / Email</th>
              <th className="px-6 py-4">Plan Actual</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {profiles && profiles.length > 0 ? (
              profiles.map((profile: any) => {
                const project = profile.projects?.[0];
                return (
                  <tr key={profile.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-zinc-900">
                      {project?.restaurant_name || profile.email}
                      <span className="block text-xs font-normal text-zinc-400">{profile.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${profile.plan === 'growth' ? 'bg-orange-100 text-orange-700' : 'bg-zinc-100 text-zinc-600'}`}>
                        {profile.plan === 'growth' ? 'Growth' : 'Base'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${profile.onboarding_completed ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                        {profile.onboarding_completed ? 'Activo' : 'Onboarding'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-zinc-400 hover:text-orange-600 font-bold transition-colors">Administrar</button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-zinc-400">
                  No hay clientes registrados en la base de datos todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
