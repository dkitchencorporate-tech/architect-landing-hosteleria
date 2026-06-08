export default function ClientsPage() {
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
              <th className="px-6 py-4">Negocio</th>
              <th className="px-6 py-4">Plan Actual</th>
              <th className="px-6 py-4">Estado</th>
              <th className="px-6 py-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 font-bold text-zinc-900">Restaurante El Gourmet (Demo)</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md font-bold text-xs">Growth</span>
              </td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Activo
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-zinc-400 hover:text-orange-600 font-bold transition-colors">Administrar</button>
              </td>
            </tr>
             <tr className="hover:bg-zinc-50 transition-colors">
              <td className="px-6 py-4 font-bold text-zinc-900">Tapas & Cañas C.B.</td>
              <td className="px-6 py-4">
                <span className="px-2.5 py-1 bg-zinc-100 text-zinc-600 rounded-md font-bold text-xs">Base</span>
              </td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                  Onboarding
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-zinc-400 hover:text-orange-600 font-bold transition-colors">Administrar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
