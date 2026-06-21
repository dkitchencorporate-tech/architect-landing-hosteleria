import React from 'react';

interface MenuTabProps {
  selectedClient: any;
  handleDesignDishPhoto: (dish: any) => void;
}

export default function MenuTab({
  selectedClient,
  handleDesignDishPhoto
}: MenuTabProps) {
  if (!selectedClient) return null;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white mb-2">Especialidades de la Carta</h3>
        <p className="text-zinc-400 text-sm">Gestiona la carta comercial de **{selectedClient.name}**. Diseña y vincula fotografías profesionales generadas por IA para cada especialidad.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedClient.dishes.map((dish: any) => {
          const imagePath = `/images/demo/client_${selectedClient.id}_${dish.id}.png`;
          return (
            <div key={dish.id} className="bg-zinc-950 border border-zinc-900 rounded-3xl p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="aspect-[4/3] bg-black border border-zinc-900 rounded-2xl relative overflow-hidden flex items-center justify-center text-zinc-700">
                  <img 
                    src={imagePath} 
                    alt={dish.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                  <div className="flex flex-col items-center gap-1.5 z-10 text-center px-4">
                    <span className="text-3xl opacity-35">🍽️</span>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Foto de la Carta</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">PLATO #{dish.id}</span>
                  <h4 className="text-sm font-black text-white mt-0.5">{dish.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{dish.desc}</p>
                </div>
              </div>

              <button 
                onClick={() => handleDesignDishPhoto(dish)}
                className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs py-2.5 rounded-xl border border-zinc-800 transition-colors"
              >
                🎨 Diseñar Foto con IA
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
