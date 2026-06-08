import React from 'react';
import Link from 'next/link';

export default function AdminSidebar() {
  const navItems = [
    { name: 'Live Overview', href: '/admin-architect/overview', icon: '📊' },
    { name: 'Directorio de Clientes', href: '/admin-architect/clients', icon: '👥' },
    { name: 'Base de Eventos (Master)', href: '/admin-architect/events-master', icon: '📅' },
    { name: 'Creative Factory', href: '/admin-architect/creative-factory-hub', icon: '🎨' },
    { name: 'Pipeline de Agencia', href: '/admin-architect/pipeline', icon: '🚀' },
    { name: 'Visión SaaS (Demo)', href: '/dashboard', icon: '🖥️' }
  ];

  return (
    <aside className="w-64 bg-[#0A0A0A] border-r border-zinc-800 flex flex-col min-h-screen text-zinc-100 hidden md:flex">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-orange-600/20">
            A.
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter text-white">ARCHITECT.</h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Agency Hub</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <div className="mb-4 mt-2">
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-3 mb-2">Central de Operaciones</p>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-all group"
              >
                <span className="text-lg group-hover:scale-110 transition-transform">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-800">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-bold text-zinc-400">All Systems Operational</span>
        </div>
      </div>
    </aside>
  );
}