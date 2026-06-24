"use client";

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useAlert } from '@/components/ui/AlertProvider';

export default function AdminClientsTable({ initialProfiles }: { initialProfiles: any[] }) {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { showAlert } = useAlert();
  const supabase = createClient();

  const handleTogglePlan = async (id: string, currentPlan: string) => {
    setLoadingId(id);
    const newPlan = currentPlan === 'growth' ? 'base' : 'growth';
    
    const { error } = await supabase
      .from('profiles')
      .update({ plan: newPlan })
      .eq('id', id);

    if (!error) {
      setProfiles(prev => prev.map(p => p.id === id ? { ...p, plan: newPlan } : p));
    } else {
      showAlert("Error al actualizar el plan: " + error.message);
    }
    setLoadingId(null);
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden">
      <table className="w-full text-left text-sm text-zinc-600">
        <thead className="bg-zinc-50 border-b border-zinc-200 text-xs uppercase font-bold text-zinc-500">
          <tr>
            <th className="px-6 py-4">Negocio / Email</th>
            <th className="px-6 py-4">Plan Actual</th>
            <th className="px-6 py-4">Estado</th>
            <th className="px-6 py-4 text-right">Acciones Rápidas</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100">
          {profiles && profiles.length > 0 ? (
            profiles.map((profile: any) => {
              const project = profile.projects?.[0];
              const isGrowth = profile.plan === 'growth';
              return (
                <tr key={profile.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-zinc-900">
                    {project?.restaurant_name || profile.email}
                    <span className="block text-xs font-normal text-zinc-400">{profile.email}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md font-bold text-xs ${isGrowth ? 'bg-orange-100 text-orange-700' : 'bg-zinc-100 text-zinc-600'}`}>
                      {isGrowth ? 'Growth' : 'Base'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${profile.onboarding_completed ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                      {profile.onboarding_completed ? 'Activo' : 'Onboarding'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      disabled={loadingId === profile.id}
                      onClick={() => handleTogglePlan(profile.id, profile.plan)}
                      className={`font-bold transition-colors text-xs px-3 py-1.5 rounded-lg border ${
                        isGrowth ? 'border-zinc-200 text-zinc-500 hover:bg-zinc-100' : 'border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-100'
                      }`}
                    >
                      {loadingId === profile.id ? 'Cambiando...' : (isGrowth ? 'Bajar a Base' : 'Forzar Growth')}
                    </button>
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
  );
}
