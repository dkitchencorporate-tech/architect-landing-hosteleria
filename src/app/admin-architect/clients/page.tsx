import React from 'react';

export default function ClientsDirectoryPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Directorio de Clientes</h1>
        <p className="text-zinc-500 font-medium">Gestión de cuentas, facturación y niveles de acceso SaaS.</p>
      </header>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 text-center text-zinc-500">
         <p>Conectando con base de datos de Stripe y Supabase Auth...</p>
      </div>
    </div>
  );
}