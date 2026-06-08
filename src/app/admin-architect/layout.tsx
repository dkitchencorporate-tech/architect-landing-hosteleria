import React from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AuthLayer from '@/components/dashboard/AuthLayer';

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
    <AuthLayer>
      <div className="flex min-h-screen bg-[#FDFCF8]">
        {/* Navigation Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <div className="flex-1 overflow-y-auto">
             {children}
          </div>
        </main>
      </div>
    </AuthLayer>
  );
}
