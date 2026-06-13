'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
// AuthLayer removed: middleware.ts handles secure SSR authentication

const DEFAULT_MOCK_CLIENTS = [
  {
    id: 'dongiovanni',
    name: 'Pizzería Don Giovanni',
    cuisine: 'Pizza y Pasta Italiana Rústica',
    tier: 'Barrio',
    dishes: [
      { id: '1', name: 'Pizza Margherita con Borde de Queso', desc: 'Salsa de tomate San Marzano, mozzarella de búfala fresca, albahaca y aceite de oliva virgen.' },
      { id: '2', name: 'Calzone de Prosciutto y Champiñones', desc: 'Masa doblada y rellena de jamón cocido premium, mozzarella hilada y champiñones frescos.' },
      { id: '3', name: 'Tiramisú Casero de la Abuela', desc: 'Bizcocho de soletilla bañado en espresso premium, crema de mascarpone y cacao puro en polvo.' }
    ]
  },
  {
    id: 'ocean',
    name: "L'Atelier de L'Océan",
    cuisine: 'Marisco de Autor y Alta Cocina',
    tier: 'Gourmet',
    dishes: [
      { id: '1', name: 'Tartar de Vieira con Trufa y Caviar', desc: 'Vieira fresca picada a cuchillo, trufa negra rallada, perlas de caviar y emulsión cítrica.' },
      { id: '2', name: 'Rodaballo Salvaje a la Brasa', desc: 'Rodaballo salvaje entero cocinado a la brasa de encina con emulsión bilbaína texturizada.' },
      { id: '3', name: 'Soufflé de Limón y Cítricos con Oro', desc: 'Soufflé horneado al momento con limón de Granada y copos de oro comestible de 24k.' }
    ]
  },
  {
    id: 'lola',
    name: 'El Tardeo de Lola',
    cuisine: 'Tapas Tradicionales Granadinas',
    tier: 'Casual',
    dishes: [
      { id: '1', name: 'Croquetas de Jamón Ibérico Crujientes', desc: 'Bechamel suave reposada 24h con jamón ibérico de bellota y rebozado panko extra crujiente.' },
      { id: '2', name: 'Patatas Bravas Caseras con Alioli', desc: 'Patatas rústicas pochadas y fritas, salsa brava ahumada y alioli casero de ajo asado.' },
      { id: '3', name: 'Claras con Limón Frías de Barril', desc: 'Cerveza artesanal de barril muy fría emulsionada con granizado natural de limón.' }
    ]
  }
];

export default function CreativeFactoryPage() {
  const [activeTab, setActiveTab] = useState('matrix');

  // Client States
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);

  // Form States (Generator)
  const [selectedPain, setSelectedPain] = useState('');
  const [selectedAngle, setSelectedAngle] = useState('');
  const [customVisualPrompt, setCustomVisualPrompt] = useState('');
  const [targetDishId, setTargetDishId] = useState('1');

  // Auto-Promo States
  const [promoGoal, setPromoGoal] = useState('Dolor de Comisiones de Delivery (Captar hosteleros quemados)');
  const [promoFormat, setPromoFormat] = useState('carousel');
  const [promoData, setPromoData] = useState<any>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<{ [key: number]: string }>({});
  const [isGeneratingPromo, setIsGeneratingPromo] = useState(false);
  const [isGeneratingPromoImage, setIsGeneratingPromoImage] = useState(false);

  // Loading States
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isSavingImage, setIsSavingImage] = useState(false);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);
  const [isSendingChat, setIsSendingChat] = useState(false);
  
  // Data States
  const [copyData, setCopyData] = useState<{ hook: string; primaryText: string; visualPrompt: string } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [billingError, setBillingError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  
  // Dynamic client strategies & chats (keyed by client id)
  const [strategies, setStrategies] = useState<{ [key: string]: string }>({});
  const [chatHistories, setChatHistories] = useState<{ [key: string]: any[] }>({});
  const [chatInput, setChatInput] = useState('');
  
  // UI States
  const [dossierSubTab, setDossierSubTab] = useState('laws');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [approvedCreatives, setApprovedCreatives] = useState<any[]>([]);

  // Ref for auto-scroll in chat
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Cargar clientes desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem('architect_clients');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setClients(parsed);
        if (parsed.length > 0) {
          setSelectedClient(parsed[0]);
          if (parsed[0].dishes && parsed[0].dishes.length > 0) {
            setTargetDishId(parsed[0].dishes[0].id);
          }
        }
      } catch (e) {
        localStorage.setItem('architect_clients', JSON.stringify(DEFAULT_MOCK_CLIENTS));
        setClients(DEFAULT_MOCK_CLIENTS);
        setSelectedClient(DEFAULT_MOCK_CLIENTS[0]);
        setTargetDishId('1');
      }
    } else {
      localStorage.setItem('architect_clients', JSON.stringify(DEFAULT_MOCK_CLIENTS));
      setClients(DEFAULT_MOCK_CLIENTS);
      setSelectedClient(DEFAULT_MOCK_CLIENTS[0]);
      setTargetDishId('1');
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistories, activeTab]);

  const handleClientChange = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setCopyData(null);
      setGeneratedImage(null);
      setSaveMessage(null);
      setBillingError(null);
      setGeneralError(null);
      if (client.dishes && client.dishes.length > 0) {
        setTargetDishId(client.dishes[0].id);
      }
    }
  };

  // 1. Generar Copy B2B y Prompt de Imagen adaptado al Cliente
  const handleGenerateCopy = async () => {
    if (!selectedPain || !selectedAngle || !selectedClient) {
      alert('Por favor selecciona un dolor y un ángulo de ataque.');
      return;
    }

    setIsGeneratingCopy(true);
    setCopyData(null);
    setGeneratedImage(null);
    setBillingError(null);
    setGeneralError(null);
    setSaveMessage(null);

    try {
      const res = await fetch('/api/creative-factory/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          pain: selectedPain, 
          angle: selectedAngle,
          clientName: selectedClient.name,
          clientCuisine: selectedClient.cuisine,
          clientTier: selectedClient.tier
        })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setCopyData(data.data);
        setCustomVisualPrompt(data.data.visualPrompt);
      } else {
        setGeneralError(data.message || 'Error al generar la campaña.');
      }
    } catch (err) {
      console.error(err);
      setGeneralError('Error en la conexión con el servidor.');
    } finally {
      setIsGeneratingCopy(false);
    }
  };

  // 2. Generar Imagen mediante Google Imagen 4
  const handleGenerateImage = async () => {
    const promptToUse = customVisualPrompt || copyData?.visualPrompt;
    if (!promptToUse) return;

    setIsGeneratingImage(true);
    setGeneratedImage(null);
    setBillingError(null);
    setGeneralError(null);

    try {
      const res = await fetch('/api/creative-factory/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptToUse })
      });
      const data = await res.json();
      
      if (data.status === 'ok') {
        setGeneratedImage(data.image);
      } else if (data.status === 'billing_required') {
        setBillingError(data.message);
      } else {
        setGeneralError(data.message || 'Error de generación de imagen.');
      }
    } catch (err) {
      console.error(err);
      setGeneralError('Error al conectar con la API de generación.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // 3. Persistir Imagen asignada a plato del cliente activo
  const handleSaveAndAssign = async () => {
    if (!generatedImage || !selectedClient) return;

    setIsSavingImage(true);
    setSaveMessage(null);

    const fileName = `client_${selectedClient.id}_${targetDishId}.png`;
    const selectedDish = selectedClient.dishes.find((d: any) => d.id === targetDishId);

    try {
      const res = await fetch('/api/creative-factory/save-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: generatedImage, fileName })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setSaveMessage(`¡Excelente! Imagen guardada físicamente y vinculada al plato "${selectedDish?.name}" de la carta del cliente "${selectedClient.name}".`);
      } else {
        alert(data.message || 'Error al guardar la imagen.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión al intentar guardar.');
    } finally {
      setIsSavingImage(false);
    }
  };

  // 4. Diseñar foto de plato directamente desde la Carta
  const handleDesignDishPhoto = (dish: any) => {
    setTargetDishId(dish.id);
    setSelectedPain('Las fotos actuales de la carta tienen baja calidad y no transmiten el valor real.');
    setSelectedAngle('El sangrado financiero silencioso: Demuestra con números agresivos la cantidad de dinero que pierden al mes.');
    setCopyData({
      hook: `¿${dish.name.toUpperCase()}?`,
      primaryText: `La ingeniería visual de menús demuestra que las cartas con fotografías de alta definición aumentan el ticket medio en un 27%. Sin comisiones. Bajo tu control.`,
      visualPrompt: `A award-winning professional macro gastronomic photograph of a plate of ${dish.name}, ${dish.desc}. Studio lighting, extremely detailed, depth of field, on a clean and premium plate, shot in 4:5 aspect ratio.`
    });
    setCustomVisualPrompt(`A award-winning professional macro gastronomic photograph of a plate of ${dish.name}, ${dish.desc}. Studio lighting, extremely detailed, depth of field, on a clean and premium plate, shot in 4:5 aspect ratio.`);
    setGeneratedImage(null);
    setSaveMessage(null);
    setActiveTab('generator');
  };

  // 5. Generar Estrategia Comercial de 30 días
  const handleGenerateStrategy = async () => {
    if (!selectedClient) return;

    setIsGeneratingStrategy(true);
    setGeneralError(null);

    try {
      const res = await fetch('/api/creative-factory/strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: selectedClient.name,
          clientCuisine: selectedClient.cuisine,
          clientTier: selectedClient.tier
        })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setStrategies({
          ...strategies,
          [selectedClient.id]: data.data.strategy
        });
      } else {
        setGeneralError(data.message || 'Error al estructurar el plan estratégico.');
      }
    } catch (err) {
      console.error(err);
      setGeneralError('Error al contactar con el estratega IA.');
    } finally {
      setIsGeneratingStrategy(false);
    }
  };

  // 6. Enviar mensaje al Agente de Ejecución (Chatbot)
  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedClient) return;

    const userMessage = { role: 'user', content: chatInput };
    const currentHistory = chatHistories[selectedClient.id] || [];
    const updatedHistory = [...currentHistory, userMessage];

    setChatHistories({
      ...chatHistories,
      [selectedClient.id]: updatedHistory
    });
    setChatInput('');
    setIsSendingChat(true);

    try {
      const res = await fetch('/api/creative-factory/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory,
          clientName: selectedClient.name,
          clientCuisine: selectedClient.cuisine,
          clientTier: selectedClient.tier
        })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        const agentMessage = { role: 'assistant', content: data.reply };
        setChatHistories({
          ...chatHistories,
          [selectedClient.id]: [...updatedHistory, agentMessage]
        });
      } else {
        setChatHistories({
          ...chatHistories,
          [selectedClient.id]: [...updatedHistory, { role: 'assistant', content: '⚠️ Error al procesar tu solicitud con el Agente de Ejecución.' }]
        });
      }
    } catch (err) {
      console.error(err);
      setChatHistories({
        ...chatHistories,
        [selectedClient.id]: [...updatedHistory, { role: 'assistant', content: '⚠️ Ocurrió un error de conexión con Arqui.' }]
      });
    } finally {
      setIsSendingChat(false);
    }
  };

  // 7. Generar Campaña de Auto-Promoción de Architect.Sys
  const handleGenerateArchitectPromo = async () => {
    setIsGeneratingPromo(true);
    setPromoData(null);
    setCarouselImages({});
    setCurrentSlideIndex(0);
    setBillingError(null);
    setGeneralError(null);

    try {
      const res = await fetch('/api/creative-factory/architect-promo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal: promoGoal, format: promoFormat })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setPromoData(data.data);
      } else {
        setGeneralError(data.message || 'Error al generar contenido promocional.');
      }
    } catch (err) {
      console.error(err);
      setGeneralError('Error de red al contactar con la API de auto-promoción.');
    } finally {
      setIsGeneratingPromo(false);
    }
  };

  // Generar imagen para slide específico del carrusel promocional
  const handleGeneratePromoSlideImage = async (slideIdx: number, prompt: string) => {
    setIsGeneratingPromoImage(true);
    setBillingError(null);

    try {
      const res = await fetch('/api/creative-factory/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.status === 'ok') {
        setCarouselImages({
          ...carouselImages,
          [slideIdx]: data.image
        });
      } else if (data.status === 'billing_required') {
        setBillingError(data.message);
      } else {
        alert(data.message || 'Error al pintar la diapositiva.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión.');
    } finally {
      setIsGeneratingPromoImage(false);
    }
  };

  const handleAddToMatrix = () => {
    if (!copyData || !generatedImage || !selectedClient) return;
    
    const newCreative = {
      id: Date.now(),
      clientName: selectedClient.name,
      pain: selectedPain,
      angle: selectedAngle,
      hook: copyData.hook,
      primaryText: copyData.primaryText,
      image: generatedImage
    };
    
    setApprovedCreatives([newCreative, ...approvedCreatives]);
    setActiveTab('matrix');
    alert(`¡Creativo de anuncio añadido a la Matriz de Despliegue para ${selectedClient.name}!`);
  };

  const currentChat = selectedClient ? (chatHistories[selectedClient.id] || [
    { role: 'assistant', content: `¡Hola! Soy **Arqui**, el Coordinador de Ejecución IA de **Architect.Sys**.\n\nEstoy listo para redactar copys de Instagram, refinar el plan de prospección B2B o definir ideas para la carta de **${selectedClient.name}**. ¿Qué campaña o activo quieres estructurar hoy?` }
  ]) : [];

  return (
    <>
      <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans flex antialiased selection:bg-orange-500/30">
        
        {/* SIDEBAR COMPLETO (Vault de control) */}
        <aside className="w-80 shrink-0 border-r border-zinc-900 bg-zinc-950 flex flex-col justify-between h-screen sticky top-0 z-40">
          
          <div className="p-6 flex flex-col gap-8 flex-1 overflow-y-auto">
            {/* Branding */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-orange-600/30">
                A
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest leading-none block">Architect.Sys</span>
                <span className="text-sm font-black text-white tracking-tight flex items-center gap-1.5 mt-0.5">
                  SALA DE CONTROL <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316] animate-pulse"></span>
                </span>
              </div>
            </div>

            {/* Selector de Cliente Activo */}
            <div className="bg-zinc-900/40 border border-zinc-900 rounded-2xl p-4 space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Cliente Seleccionado</span>
              <select 
                value={selectedClient?.id || ''} 
                onChange={(e) => handleClientChange(e.target.value)}
                className="w-full bg-black border border-zinc-800 rounded-xl text-xs font-bold text-white px-3 py-2.5 focus:outline-none focus:border-orange-600 appearance-none"
              >
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              
              {selectedClient && (
                <div className="pt-2 space-y-1.5 border-t border-zinc-900/60">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-zinc-500 font-bold uppercase">Cocina:</span>
                    <span className="text-zinc-300 truncate max-w-[120px] font-medium">{selectedClient.cuisine}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-zinc-500 font-bold uppercase">Target:</span>
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                      selectedClient.tier === 'Gourmet' ? 'bg-amber-950 text-amber-400' :
                      selectedClient.tier === 'Barrio' ? 'bg-blue-950 text-blue-400' : 'bg-purple-950 text-purple-400'
                    }`}>{selectedClient.tier}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Navegación del Vault */}
            <nav className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 block px-3 mb-2">Vaults de Control</span>
              
              <button 
                onClick={() => setActiveTab('matrix')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${activeTab === 'matrix' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'}`}
              >
                <span className="flex items-center gap-2.5">
                  <span>🎯</span> Matriz de Despliegue
                </span>
                {approvedCreatives.length > 0 && (
                  <span className="bg-orange-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">{approvedCreatives.length}</span>
                )}
              </button>

              <button 
                onClick={() => setActiveTab('generator')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeTab === 'generator' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'}`}
              >
                <span>⚡</span> Motor Generativo B2B
              </button>

              <button 
                onClick={() => setActiveTab('menu')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeTab === 'menu' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'}`}
              >
                <span>🍽️</span> Especialidades de la Carta
              </button>

              <button 
                onClick={() => setActiveTab('strategy')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeTab === 'strategy' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'}`}
              >
                <span>🗺️</span> Creador de Estrategias
              </button>

              <button 
                onClick={() => setActiveTab('chat')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeTab === 'chat' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'}`}
              >
                <span>🤖</span> Agente de Ejecución (Chat)
              </button>

              <button 
                onClick={() => setActiveTab('promo')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeTab === 'promo' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'}`}
              >
                <span>✨</span> Auto-Promoción Agency
              </button>

              <button 
                onClick={() => setActiveTab('dossier')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeTab === 'dossier' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/30'}`}
              >
                <span>📚</span> Dossier de Protocolos
              </button>
            </nav>
          </div>

          {/* Footer del Sidebar */}
          <div className="p-4 border-t border-zinc-900/60 bg-black/30 flex justify-between items-center text-xs">
            <span className="text-zinc-600 font-bold tracking-widest text-[9px] uppercase">MODO AGENCIA v2.0</span>
          </div>

        </aside>

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          
          {/* Header Superior Limpio */}
          <header className="border-b border-zinc-900/50 bg-[#050505] sticky top-0 z-30 px-8 py-5 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Vault Activo</span>
              <h2 className="text-base font-black text-white uppercase tracking-tight mt-0.5">
                {activeTab === 'matrix' && '🎯 Matriz de Despliegue'}
                {activeTab === 'generator' && '⚡ Motor Generativo B2B'}
                {activeTab === 'menu' && '🍽️ Especialidades de la Carta'}
                {activeTab === 'strategy' && '🗺️ Hoja de Ruta Estratégica'}
                {activeTab === 'chat' && '🤖 Coordinador IA de Ejecución'}
                {activeTab === 'promo' && '✨ Auto-Promoción Architect.Sys'}
                {activeTab === 'dossier' && '📚 Dossier de Operaciones Estratégicas'}
              </h2>
            </div>
            {selectedClient && (
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-400">
                  Trabajando con: <strong className="text-white font-bold">{selectedClient.name}</strong>
                </span>
                <Link href="/demo/carta" className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold px-4 py-2 rounded-xl transition-colors border border-zinc-800">
                  Ver Cartas Demo
                </Link>
              </div>
            )}
          </header>

          {/* Área de Trabajo de las Pestañas */}
          <div className="flex-1 p-8 max-w-[1200px] w-full mx-auto">
            
            {/* 1. TAB: MATRIX */}
            {activeTab === 'matrix' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Matriz de Despliegue Comercial</h3>
                  <p className="text-zinc-400 text-sm">Copys publicitarios e imágenes aprobadas listas para exportarse o activarse en Meta Ads Manager.</p>
                </div>

                {approvedCreatives.length === 0 ? (
                  <div className="border border-dashed border-zinc-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center bg-zinc-950/20">
                    <span className="text-4xl mb-4">🗂️</span>
                    <h4 className="text-lg font-bold text-white mb-1">Matriz de Creativos Vacía</h4>
                    <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-6">Genera copys persuasivos en el Motor Generativo B2B y apruébalos para verlos aquí.</p>
                    <button onClick={() => setActiveTab('generator')} className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-zinc-800 transition-colors">
                      Ir al Motor Generativo
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {approvedCreatives.map((creative) => (
                      <div key={creative.id} className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden flex flex-col">
                        <div className="relative aspect-[4/5] bg-black">
                          <img src={creative.image} alt={creative.hook} className="w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 p-6 flex flex-col justify-end">
                            <h4 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight leading-none">
                              {creative.hook}
                            </h4>
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <div className="flex gap-2 mb-3">
                              <span className="text-[9px] font-black tracking-widest bg-zinc-900 px-2 py-0.5 rounded text-zinc-400 uppercase">CLIENTE: {creative.clientName}</span>
                              <span className="text-[9px] font-black tracking-widest bg-orange-950 px-2 py-0.5 rounded text-orange-400 uppercase">ÁNGULO: {creative.angle}</span>
                            </div>
                            <p className="text-xs text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed">
                              {creative.primaryText}
                            </p>
                          </div>
                          <div className="border-t border-zinc-900/60 pt-4 flex gap-4">
                            <button onClick={() => alert('Campaña integrada en el embudo comercial de Architect.Sys.')} className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-3 rounded-xl transition-colors">
                              🚀 Lanzar Publicidad Local
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. TAB: GENERATOR */}
            {activeTab === 'generator' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Motor Generativo de Neuromarketing</h3>
                  <p className="text-zinc-400 text-sm">Define el dolor del hostelero. La IA adaptará los textos y prompts visuales al estilo de cocina y ticket del restaurante activo.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Formulario lateral */}
                  <div className="lg:col-span-1 space-y-6 bg-zinc-950 border border-zinc-900 p-6 rounded-3xl flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">1. Seleccionar Dolor</label>
                        <select 
                          value={selectedPain} 
                          onChange={(e) => setSelectedPain(e.target.value)} 
                          className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 appearance-none"
                        >
                          <option value="">Selecciona...</option>
                          <option value="Las comisiones abusivas del 30% de las apps de delivery se comen todo el margen de beneficio.">Delivery ahoga márgenes (30%)</option>
                          <option value="El comedor del restaurante se queda completamente vacío de martes a jueves por la noche.">Local vacío a mitad de semana</option>
                          <option value="El teléfono de reservas colapsa en horas punta, perdiendo llamadas y reservas de grupos.">Caos telefónico e ineficiencia de reservas</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">2. Ángulo Publicitario</label>
                        <select 
                          value={selectedAngle}
                          onChange={(e) => setSelectedAngle(e.target.value)}
                          className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 appearance-none"
                        >
                          <option value="">Selecciona...</option>
                          <option value="El sangrado financiero silencioso: Demuestra con números agresivos la cantidad de dinero que pierden al mes.">El Sangrado Financiero (Agresivo)</option>
                          <option value="Estatus y Modernización: Posiciona el restaurante como parte del 5% tecnológico superior de la ciudad.">El Restaurante del Futuro (Estatus)</option>
                          <option value="El variable sin riesgo: Garantía del 20% solo por resultados de afluencia conseguidos.">Modelo 20% Variable (Garantía)</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={handleGenerateCopy}
                      disabled={isGeneratingCopy || !selectedPain || !selectedAngle || !selectedClient}
                      className="w-full bg-white text-black font-black uppercase text-xs py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
                    >
                      {isGeneratingCopy ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                          Generando...
                        </>
                      ) : (
                        '⚙️ Fabricar Creativo'
                      )}
                    </button>
                  </div>

                  {/* Resultados de la generación */}
                  <div className="lg:col-span-2 space-y-6">
                    {generalError && (
                      <div className="bg-red-950/20 border border-red-900 text-red-400 p-4 rounded-2xl text-xs">
                        ⚠️ {generalError}
                      </div>
                    )}

                    {/* Copy Generado */}
                    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl relative">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <span>📝</span> Anuncio Estructurado
                      </h4>

                      {copyData ? (
                        <div className="space-y-4">
                          <div>
                            <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Gancho en Imagen (Hook)</label>
                            <div className="w-full bg-black rounded-xl border border-zinc-900 p-3 text-white text-sm font-black uppercase tracking-tight">
                              {copyData.hook}
                            </div>
                          </div>
                          <div>
                            <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Cuerpo del Post (Primary Text)</label>
                            <div className="w-full bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                              {copyData.primaryText}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-zinc-600 text-xs font-mono py-6 text-center">
                          {isGeneratingCopy ? 'IA escribiendo copy adaptado...' : 'Selecciona los parámetros y clica en Fabricar Creativo.'}
                        </div>
                      )}
                    </div>

                    {/* Visual Asset (Imagen 4) */}
                    <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <span>🎨</span> Visual Asset (Google Imagen 4)
                      </h4>

                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Preview */}
                        <div className="w-full md:w-[200px] aspect-[4/5] bg-black border border-zinc-900 rounded-2xl flex items-center justify-center text-zinc-600 relative overflow-hidden shrink-0">
                          {generatedImage ? (
                            <img src={generatedImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              {isGeneratingImage ? (
                                <>
                                  <span className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                                  <span className="text-[9px] text-zinc-500 font-bold uppercase">Pintando...</span>
                                </>
                              ) : (
                                <>
                                  <span className="text-3xl opacity-40">🖼️</span>
                                  <span className="text-[9px] font-bold uppercase text-zinc-700">Sin Imagen</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Prompt y Controles */}
                        <div className="flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Prompt de Imagen editable</label>
                            <textarea
                              value={customVisualPrompt}
                              onChange={(e) => setCustomVisualPrompt(e.target.value)}
                              disabled={!copyData}
                              className="w-full h-24 bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono focus:outline-none resize-none leading-relaxed"
                              placeholder="Prompt visual en inglés..."
                            />
                          </div>

                          {billingError && (
                            <div className="bg-orange-950/20 border border-orange-900 text-orange-400 p-3.5 rounded-xl text-[11px] leading-relaxed">
                              <strong>Facturación requerida:</strong> {billingError}
                            </div>
                          )}

                          <div className="space-y-2">
                            <button 
                              onClick={handleGenerateImage}
                              disabled={isGeneratingImage || !copyData}
                              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-3 rounded-xl disabled:opacity-50 transition-colors"
                            >
                              {isGeneratingImage ? 'Generando imagen...' : 'Generar Imagen con IA'}
                            </button>
                            
                            <button 
                              onClick={handleAddToMatrix}
                              disabled={!generatedImage || !copyData}
                              className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs py-3 rounded-xl border border-zinc-900/60 disabled:opacity-50 transition-colors"
                            >
                              Aprobar y Añadir a Matriz de Ads
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Vinculador dinámico */}
                      {generatedImage && selectedClient && (
                        <div className="mt-6 border-t border-zinc-900 pt-6 space-y-4">
                          <h5 className="text-xs font-black uppercase text-orange-500">Asignar a especialidad de la carta</h5>
                          <div className="flex flex-col sm:flex-row gap-4 items-end bg-black/50 p-4 rounded-2xl border border-zinc-900">
                            <div className="flex-1">
                              <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Elegir Plato del Cliente</label>
                              <select 
                                value={targetDishId} 
                                onChange={(e) => setTargetDishId(e.target.value)}
                                className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white"
                              >
                                {selectedClient.dishes.map((dish: any) => (
                                  <option key={dish.id} value={dish.id}>{dish.name}</option>
                                ))}
                              </select>
                            </div>
                            <button 
                              onClick={handleSaveAndAssign}
                              disabled={isSavingImage}
                              className="bg-white hover:bg-zinc-200 text-black font-black text-xs px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                            >
                              {isSavingImage ? 'Guardando...' : 'Vincular a Carta'}
                            </button>
                          </div>
                          {saveMessage && (
                            <div className="bg-green-950/20 border border-green-900 text-green-400 p-4 rounded-xl text-xs">
                              {saveMessage}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. TAB: MENU (Especialidades de la carta) */}
            {activeTab === 'menu' && selectedClient && (
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
                          {/* Mini visualizer */}
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
            )}

            {/* 4. TAB: STRATEGY */}
            {activeTab === 'strategy' && selectedClient && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-2">Plan Comercial de 30 Días</h3>
                    <p className="text-zinc-400 text-sm">Plan estratégico de marketing de guerrilla para **{selectedClient.name}**.</p>
                  </div>
                  <button 
                    onClick={handleGenerateStrategy}
                    disabled={isGeneratingStrategy}
                    className="bg-white hover:bg-zinc-200 text-black font-black text-xs px-5 py-3 rounded-xl transition-colors disabled:opacity-50"
                  >
                    {isGeneratingStrategy ? 'Trazando Ruta...' : '⚙️ Generar Estrategia IA'}
                  </button>
                </div>

                {strategies[selectedClient.id] ? (
                  <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-3xl prose prose-invert max-w-none prose-xs leading-relaxed font-mono">
                    <ReactMarkdown>{strategies[selectedClient.id]}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="border border-dashed border-zinc-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center bg-zinc-950/20">
                    <span className="text-4xl mb-4">🗺️</span>
                    <h4 className="text-lg font-bold text-white mb-1">Sin Hoja de Ruta Activa</h4>
                    <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-6">Genera una estrategia comercial a 30 días adaptada al ticket y tipo de cocina del cliente.</p>
                    <button 
                      onClick={handleGenerateStrategy}
                      disabled={isGeneratingStrategy}
                      className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-zinc-800 transition-colors"
                    >
                      Generar Estrategia Ahora
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 5. TAB: CHAT (Agente de Ejecución) */}
            {activeTab === 'chat' && selectedClient && (
              <div className="flex flex-col h-[calc(100vh-160px)] border border-zinc-900 bg-zinc-950 rounded-3xl overflow-hidden">
                <div className="bg-zinc-900/60 p-4 border-b border-zinc-900/60 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-black text-white text-sm">A</div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Arqui (AI Marketing Co-Pilot)</h4>
                    <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">En línea - Contexto: {selectedClient.name}</span>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {currentChat.map((msg: any, idx: number) => (
                    <div 
                      key={idx} 
                      className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
                        msg.role === 'user' ? 'bg-zinc-800 text-white' : 'bg-orange-600 text-white'
                      }`}>
                        {msg.role === 'user' ? 'C' : 'A'}
                      </div>
                      <div className={`p-4 rounded-2xl text-xs leading-relaxed font-mono ${
                        msg.role === 'user' ? 'bg-zinc-900 text-zinc-200 rounded-tr-none' : 'bg-zinc-900/50 border border-zinc-900 text-zinc-300 rounded-tl-none'
                      }`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  ))}
                  {isSendingChat && (
                    <div className="flex gap-3 max-w-[80%] mr-auto items-center">
                      <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center font-black text-white text-xs">A</div>
                      <div className="flex gap-1 py-3 px-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl rounded-tl-none">
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-150"></span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSendChatMessage} className="p-4 border-t border-zinc-900/60 bg-black/40 flex gap-3">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder={`Pregúntale a Arqui sobre la campaña de ${selectedClient.name}...`}
                    className="flex-1 bg-black border border-zinc-900 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-orange-600"
                  />
                  <button 
                    type="submit" 
                    disabled={isSendingChat || !chatInput.trim()}
                    className="bg-white hover:bg-zinc-200 text-black font-black text-xs px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
                  >
                    Enviar
                  </button>
                </form>
              </div>
            )}

            {/* 6. TAB: PROMO (Auto-Promoción Architect.Sys) */}
            {activeTab === 'promo' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">📢 Hub de Auto-Promoción Architect.Sys</h3>
                  <p className="text-zinc-400 text-sm">Diseña creativos de alto impacto para promocionar nuestros servicios B2B (Pago Único, Socio Growth, y WhatsApp Closers).</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Panel de Configuración */}
                  <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-6 flex flex-col justify-between">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">1. Objetivo de la Campaña B2B</label>
                        <select
                          value={promoGoal}
                          onChange={(e) => setPromoGoal(e.target.value)}
                          className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 appearance-none"
                        >
                          <option value="Dolor de Comisiones de Delivery (Captar hosteleros quemados con Glovo/UberEats)">Dolor del Delivery (30% comisión)</option>
                          <option value="Up-sell de Eventos Físicos (Convertir hosteleros base a suscripción Socio Growth mediante eventos)">Vender Eventos (Conversión a Growth)</option>
                          <option value="Promocionar a Arqui V2 (WhatsApp Sales Closer autónomo que detecta spam y cierra reservas)">Promocionar WhatsApp Bot Closer (Arqui V2)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">2. Formato del Anuncio</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setPromoFormat('static')}
                            className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                              promoFormat === 'static' ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-zinc-900 hover:border-zinc-800'
                            }`}
                          >
                            Estático (1 Frame)
                          </button>
                          <button
                            type="button"
                            onClick={() => setPromoFormat('carousel')}
                            className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                              promoFormat === 'carousel' ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-zinc-900 hover:border-zinc-800'
                            }`}
                          >
                            Carrusel (5 Slides)
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerateArchitectPromo}
                      disabled={isGeneratingPromo}
                      className="w-full bg-white text-black font-black uppercase text-xs py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
                    >
                      {isGeneratingPromo ? (
                        <>
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                          Generando Hub...
                        </>
                      ) : (
                        '⚡ Generar Campaña B2B'
                      )}
                    </button>
                  </div>

                  {/* Visualización de la campaña */}
                  <div className="lg:col-span-2 space-y-6">
                    {generalError && (
                      <div className="bg-red-950/20 border border-red-900 text-red-400 p-4 rounded-2xl text-xs">
                        ⚠️ {generalError}
                      </div>
                    )}

                    {promoData ? (
                      <div className="space-y-6">
                        {/* CASO: POST ESTÁTICO */}
                        {promoData.type === 'static' && (
                          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-6">
                            <div className="space-y-4">
                              <span className="text-[9px] font-black tracking-widest bg-orange-950 px-2 py-1 rounded text-orange-400 uppercase">ANUNCIO ESTÁTICO B2B</span>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Hook Visual</label>
                                <div className="bg-black rounded-xl border border-zinc-900 p-3 text-white text-sm font-black uppercase">
                                  {promoData.hook}
                                </div>
                              </div>
                              <div>
                                <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Copy del Post</label>
                                <div className="bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                                  {promoData.body}
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-zinc-900/60 pt-6 flex flex-col md:flex-row gap-6">
                              <div className="w-[180px] aspect-[4/5] bg-black border border-zinc-900 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                {generatedImage ? (
                                  <img src={generatedImage} alt="Static asset" className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-3xl opacity-30">🖼️</span>
                                )}
                              </div>
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Prompt Recomendado</label>
                                  <div className="bg-black border border-zinc-900 rounded-lg p-3 text-zinc-400 text-[10px] font-mono leading-relaxed h-20 overflow-y-auto">
                                    {promoData.imagePrompt}
                                  </div>
                                </div>
                                <button
                                  onClick={() => {
                                    setCustomVisualPrompt(promoData.imagePrompt);
                                    handleGenerateImage();
                                  }}
                                  disabled={isGeneratingImage}
                                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-3 rounded-xl transition-all mt-4"
                                >
                                  {isGeneratingImage ? 'Generando visual...' : 'Pintar con Imagen 4'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* CASO: POST CARRUSEL */}
                        {promoData.type === 'carousel' && (
                          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-6">
                            {/* Selector de diapositivas superior */}
                            <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                              <div className="flex items-center gap-3">
                                <span className="text-[9px] font-black tracking-widest bg-orange-950 px-2 py-1 rounded text-orange-400 uppercase">CARRUSEL ESTRATÉGICO</span>
                                <span className="text-xs font-bold text-zinc-500">Diapositiva {currentSlideIndex + 1} de {promoData.slides.length}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  disabled={currentSlideIndex === 0}
                                  onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
                                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-30 text-white px-3 py-1.5 rounded-lg text-xs font-black"
                                >
                                  ← Anterior
                                </button>
                                <button
                                  disabled={currentSlideIndex === promoData.slides.length - 1}
                                  onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
                                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-30 text-white px-3 py-1.5 rounded-lg text-xs font-black"
                                >
                                  Siguiente →
                                </button>
                              </div>
                            </div>

                            {/* Detalle de la diapositiva seleccionada */}
                            {promoData.slides[currentSlideIndex] && (
                              <div className="space-y-6">
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Título Diapositiva (Hook)</label>
                                    <div className="bg-black rounded-xl border border-zinc-900 p-3 text-white text-sm font-black uppercase">
                                      {promoData.slides[currentSlideIndex].hook}
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Texto Diapositiva (Descripción)</label>
                                    <div className="bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                                      {promoData.slides[currentSlideIndex].description}
                                    </div>
                                  </div>
                                </div>

                                <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row gap-6">
                                  <div className="w-[180px] aspect-[4/5] bg-black border border-zinc-900 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                                    {carouselImages[currentSlideIndex] ? (
                                      <img src={carouselImages[currentSlideIndex]} alt={`Slide ${currentSlideIndex + 1}`} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="text-center px-4">
                                        {isGeneratingPromoImage ? (
                                          <span className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin block mx-auto mb-2"></span>
                                        ) : (
                                          <span className="text-3xl opacity-30 block mb-2">🖼️</span>
                                        )}
                                        <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600">Diapo #{currentSlideIndex + 1}</span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                      <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Prompt de Imagen recomendado</label>
                                      <div className="bg-black border border-zinc-900 rounded-lg p-3 text-zinc-400 text-[10px] font-mono leading-relaxed h-20 overflow-y-auto">
                                        {promoData.slides[currentSlideIndex].imagePrompt}
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleGeneratePromoSlideImage(currentSlideIndex, promoData.slides[currentSlideIndex].imagePrompt)}
                                      disabled={isGeneratingPromoImage}
                                      className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-3 rounded-xl transition-all mt-4"
                                    >
                                      {isGeneratingPromoImage ? 'Pintando Diapositiva...' : 'Pintar esta Diapositiva'}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="border border-dashed border-zinc-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center bg-zinc-950/20 py-24">
                        <span className="text-4xl mb-4">📢</span>
                        <h4 className="text-lg font-bold text-white mb-1">Campaña de Auto-Promoción Vacía</h4>
                        <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-6">Elige el objetivo del embudo de Architect.Sys en el panel izquierdo y haz clic en Generar Campaña B2B.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 7. TAB: DOSSIER DE PROTOCOLOS */}
            {activeTab === 'dossier' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Dossier de Protocolos Operativos</h3>
                  <p className="text-zinc-400 text-sm">Biblioteca estratégica y de procedimientos estándar de la agencia **Architect.Sys**.</p>
                </div>

                <div className="flex border-b border-zinc-900 gap-6">
                  <button 
                    onClick={() => setDossierSubTab('laws')}
                    className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'laws' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Las 10 Leyes Operativas
                  </button>
                  <button 
                    onClick={() => setDossierSubTab('funnel')}
                    className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'funnel' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Protocolo de Captación
                  </button>
                  <button 
                    onClick={() => setDossierSubTab('events')}
                    className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'events' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Ecosistema de Eventos
                  </button>
                </div>

                <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-3xl space-y-6 leading-relaxed text-sm text-zinc-300 font-mono">
                  
                  {dossierSubTab === 'laws' && (
                    <div className="space-y-6">
                      <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Leyes Operativas del Consultor Gastronómico B2B</h4>
                      <ol className="list-decimal pl-5 space-y-4 text-xs">
                        <li><strong>Ley del Apalancamiento del Dolor:</strong> Nunca vendas "más ventas". Vende detener el sangrado de las comisiones del 30% del delivery o rentabilizar mesas vacías de martes a jueves.</li>
                        <li><strong>Ley del Variable sin Riesgo:</strong> La entrada inicial debe ser libre de fricción, garantizando un porcentaje por afluencia (20% variable) para anular el escepticismo.</li>
                        <li><strong>Ley de la Exclusividad Local:</strong> No captes a dos restaurantes de la misma categoría en un radio menor a 3 km. La exclusividad multiplica la lealtad del cliente.</li>
                        <li><strong>Ley del Anclaje Inesperado:</strong> Utiliza fotografías gastronómicas de impacto extremo en Ads (formato 4:5 vertical) para romper el scroll del móvil.</li>
                        <li><strong>Ley del Dossier Explicativo:</strong> Cada evento o propuesta debe ir respaldada por un dossier financiero detallado con costos fijos y retorno neto proyectado.</li>
                        <li><strong>Ley del Control de la Base de Datos:</strong> El restaurante debe poseer el 100% de la propiedad de sus leads y reservas; nosotros controlamos la infraestructura que los genera.</li>
                        <li><strong>Ley de la Auditoría Gratuita:</strong> Inicia la venta ofreciendo una auditoría de márgenes o una simulación visual de su nueva carta.</li>
                        <li><strong>Ley de la Fidelización Post-Evento:</strong> Los clientes captados en eventos gastronómicos deben recibir una secuencia de seguimiento automatizada en 48 horas.</li>
                        <li><strong>Ley de la Integridad de Marca:</strong> No reduzcas los precios; incrementa el valor de la oferta agregando consultoría estratégica.</li>
                        <li><strong>Ley de la Ley de Pareto Culinaria:</strong> El 80% del beneficio proviene del 20% de los platos. Enfoca tus creativos e imágenes profesionales en esos platos estrella.</li>
                      </ol>
                    </div>
                  )}

                  {dossierSubTab === 'funnel' && (
                    <div className="space-y-4 text-xs">
                      <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Flujo Estándar de Captación de Hostelería</h4>
                      <p>Protocolo paso a paso del consultor gastronómico para onboarding de nuevos clientes:</p>
                      <div className="space-y-3 pt-2">
                        <div className="p-4 bg-black rounded-xl border border-zinc-900">
                          <strong className="text-white block mb-1">Paso 1: Auditoría de Márgenes (Onboarding)</strong>
                          El cliente rellena el formulario inicial describiendo su local, menú, ticket medio y porcentaje de delivery. El sistema genera su base de datos.
                        </div>
                        <div className="p-4 bg-black rounded-xl border border-zinc-900">
                          <strong className="text-white block mb-1">Paso 2: Sesión de Control de la Carta</strong>
                          Abrimos la "Especialidades de la Carta" en la Sala de Control. Detectamos los platos estrella sin foto o con fotos deficientes y usamos Imagen 4 para producir las imágenes que irán en el menú digital interactivo.
                        </div>
                        <div className="p-4 bg-black rounded-xl border border-zinc-900">
                          <strong className="text-white block mb-1">Paso 3: Lanzamiento del Embudo B2B</strong>
                          Estructuramos las campañas locales con neuromarketing para detener comisiones o llenar días muertos. Desplegamos creativos aprobados desde la Matriz a Meta Ads.
                        </div>
                      </div>
                    </div>
                  )}

                  {dossierSubTab === 'events' && (
                    <div className="space-y-4 text-xs">
                      <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Ecosistema de Eventos Universales de Alta Afluencia</h4>
                      <p>Eventos probados para activar la afluencia física según la categoría comercial del restaurante:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="p-4 bg-black rounded-xl border border-zinc-900">
                          <strong className="text-orange-500 block mb-1">Maridaje y Catas (Gourmet)</strong>
                          Dirigido a restaurantes de ticket alto. Selección de vinos de autor y maridaje de platos exclusivos. Genera tickets muy elevados y posicionamiento de estatus.
                        </div>
                        <div className="p-4 bg-black rounded-xl border border-zinc-900">
                          <strong className="text-orange-500 block mb-1">Cenas con Espectáculo o Música (Casual)</strong>
                          Ideal para restaurantes modernos. Conciertos acústicos, espectáculos de flamenco o monólogos de humor de martes a jueves.
                        </div>
                        <div className="p-4 bg-black rounded-xl border border-zinc-900">
                          <strong className="text-orange-500 block mb-1">Citas Rápidas y Trivias (Barrio)</strong>
                          Juegos de preguntas por equipos o speed dating enfocados en jóvenes adultos locales. Garantiza afluencia masiva recurrente.
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}

          </div>

        </main>
      </div>
    </>
  );
}
