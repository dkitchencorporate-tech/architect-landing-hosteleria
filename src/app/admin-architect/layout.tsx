import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
// AuthLayer removed: middleware.ts handles secure SSR authentication

export const metadata = {
  title: 'Architect Agency Hub',
  description: 'Central de Operaciones de la Agencia',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen bg-[#050505] selection:bg-orange-500/30">
        {/* Navigation Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto">
             {children}
          </div>
        </main>
      </div>
    </>
  );
}
