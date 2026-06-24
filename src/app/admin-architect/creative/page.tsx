'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { Target, Zap, Utensils, Map, Bot, Sparkles, BookOpen } from 'lucide-react';
import { useAlert } from '@/components/ui/AlertProvider';

import MatrixTab from '@/components/creative-factory/MatrixTab';
import GeneratorTab from '@/components/creative-factory/GeneratorTab';
import MenuTab from '@/components/creative-factory/MenuTab';
import StrategyTab from '@/components/creative-factory/StrategyTab';
import ChatTab from '@/components/creative-factory/ChatTab';
import PromoTab from '@/components/creative-factory/PromoTab';
import DossierTab from '@/components/creative-factory/DossierTab';

// No mock clients - Data fetched entirely from Supabase

export default function CreativeFactoryPage() {
  const { showAlert } = useAlert();
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

  // Cargar todos los clientes reales desde Supabase (Vista de Admin)
  useEffect(() => {
    const fetchAllClients = async () => {
      try {
        const { supabaseClient } = await import('@/lib/supabase-client');
        if (!supabaseClient) return;

        // Fetch all client profiles
        const { data: profiles } = await supabaseClient
          .from('profiles')
          .select('id, business_name, business_profiles(cuisine_type, average_ticket)')
          .eq('role', 'client');

        if (profiles) {
          const mappedClients = await Promise.all(profiles.map(async (p: any) => {
            const biz = p.business_profiles?.[0] || {};
            
            // Fetch real dishes
            const { data: dishesData } = await supabaseClient
              .from('creative_dishes')
              .select('*')
              .eq('profile_id', p.id);
              
            const dishes = dishesData && dishesData.length > 0 ? dishesData : [
              { id: 'mock-1', name: 'Plato Principal', desc: 'Especialidad basada en ' + (biz.cuisine_type || 'General') },
              { id: 'mock-2', name: 'Postre de la casa', desc: 'El postre más vendido.' }
            ];

            return {
              id: p.id,
              name: p.business_name || 'Sin Nombre',
              cuisine: biz.cuisine_type || 'General',
              tier: (biz.average_ticket > 40) ? 'Gourmet' : 'Barrio',
              dishes: dishes
            };
          }));

          setClients(mappedClients);
          if (mappedClients.length > 0) {
            setSelectedClient(mappedClients[0]);
            setTargetDishId(mappedClients[0].dishes[0].id);
          }
        }
      } catch (err) {
        console.error("Error cargando clientes:", err);
      }
    };

    fetchAllClients();
  }, []);

  // Fetch client campaigns and chat history from Supabase when selectedClient changes
  useEffect(() => {
    const fetchClientData = async () => {
      if (!selectedClient) return;
      try {
        const { supabaseClient } = await import('@/lib/supabase-client');
        if (!supabaseClient) return;

        // Fetch campaigns
        const { data: campaigns } = await supabaseClient
          .from('creative_campaigns')
          .select('*')
          .eq('profile_id', selectedClient.id)
          .order('created_at', { ascending: false });

        if (campaigns) {
          setApprovedCreatives(campaigns.map((c: any) => ({
            id: c.id,
            clientName: selectedClient.name,
            pain: c.pain_point,
            angle: c.angle,
            hook: c.hook,
            primaryText: c.primary_text,
            image: c.image_url
          })));
        } else {
          setApprovedCreatives([]);
        }

        // Fetch chats
        const { data: chatData } = await supabaseClient
          .from('creative_chats')
          .select('messages')
          .eq('profile_id', selectedClient.id)
          .single();

        if (chatData && chatData.messages && chatData.messages.length > 0) {
          setChatHistories(prev => ({
            ...prev,
            [selectedClient.id]: chatData.messages
          }));
        }
      } catch (err) {
        console.error("Error cargando datos del cliente:", err);
      }
    };

    fetchClientData();
  }, [selectedClient]);

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
      showAlert('Por favor selecciona un dolor y un ángulo de ataque.');
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
        showAlert(data.message || 'Error al guardar la imagen.');
      }
    } catch (err) {
      console.error(err);
      showAlert('Error de conexión al intentar guardar.');
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
        const finalHistory = [...updatedHistory, agentMessage];
        setChatHistories({
          ...chatHistories,
          [selectedClient.id]: finalHistory
        });
        
        // Persist to Supabase
        try {
          const { supabaseClient } = await import('@/lib/supabase-client');
          if (supabaseClient) {
            // Check if row exists first for upsert behavior logic
            const { data: existingChat } = await supabaseClient
              .from('creative_chats')
              .select('id')
              .eq('profile_id', selectedClient.id)
              .single();
              
            if (existingChat) {
              await supabaseClient
                .from('creative_chats')
                .update({ messages: finalHistory, updated_at: new Date().toISOString() })
                .eq('profile_id', selectedClient.id);
            } else {
              await supabaseClient
                .from('creative_chats')
                .insert({ profile_id: selectedClient.id, messages: finalHistory });
            }
          }
        } catch (dbErr) {
          console.error("Error saving chat to Supabase", dbErr);
        }
        
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
        showAlert(data.message || 'Error al pintar la diapositiva.');
      }
    } catch (err) {
      console.error(err);
      showAlert('Error de conexión.');
    } finally {
      setIsGeneratingPromoImage(false);
    }
  };

  const handleAddToMatrix = async () => {
    if (!copyData || !generatedImage || !selectedClient) return;
    
    try {
      const { supabaseClient } = await import('@/lib/supabase-client');
      if (supabaseClient) {
        const { data: newCampaign, error } = await supabaseClient.from('creative_campaigns').insert({
           profile_id: selectedClient.id,
           dish_id: targetDishId.startsWith('mock') ? null : targetDishId,
           pain_point: selectedPain,
           angle: selectedAngle,
           hook: copyData.hook,
           primary_text: copyData.primaryText,
           visual_prompt: customVisualPrompt || copyData.visualPrompt,
           image_url: generatedImage
        }).select().single();

        if (error) {
          console.error("Error inserting campaign:", error);
          showAlert('Error al guardar la campaña en base de datos.');
          return;
        }

        const newCreative = {
          id: newCampaign.id,
          clientName: selectedClient.name,
          pain: newCampaign.pain_point,
          angle: newCampaign.angle,
          hook: newCampaign.hook,
          primaryText: newCampaign.primary_text,
          image: newCampaign.image_url
        };
        
        setApprovedCreatives([newCreative, ...approvedCreatives]);
        setActiveTab('matrix');
        showAlert(`¡Creativo de anuncio añadido a la Matriz de Despliegue para ${selectedClient.name} y guardado en la base de datos!`);
      }
    } catch (err) {
      console.error("Error guardando campaña en base de datos:", err);
      showAlert('Hubo un error de conexión al guardar.');
    }
  };

  const currentChat = selectedClient ? (chatHistories[selectedClient.id] || [
    { role: 'assistant', content: `¡Hola! Soy **Arqui**, el Coordinador de Ejecución IA de **Architect.Sys**.\n\nEstoy listo para redactar copys de Instagram, refinar el plan de prospección B2B o definir ideas para la carta de **${selectedClient.name}**. ¿Qué campaña o activo quieres estructurar hoy?` }
  ]) : [];

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-2rem)] bg-zinc-950/30 rounded-[2rem] border border-white/10 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] relative">
        
        {/* Dynamic Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Header Superior Limpio (Silver Premium) */}
        <header className="border-b border-white/10 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-30 px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Vault Activo</span>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2 mt-1">
              {activeTab === 'matrix' && <><Target size={20} className="text-zinc-300"/> Matriz de Despliegue</>}
              {activeTab === 'generator' && <><Zap size={20} className="text-zinc-300"/> Motor Generativo B2B</>}
              {activeTab === 'menu' && <><Utensils size={20} className="text-zinc-300"/> Especialidades de la Carta</>}
              {activeTab === 'strategy' && <><Map size={20} className="text-zinc-300"/> Hoja de Ruta Estratégica</>}
              {activeTab === 'chat' && <><Bot size={20} className="text-zinc-300"/> Coordinador IA</>}
              {activeTab === 'promo' && <><Sparkles size={20} className="text-zinc-300"/> Auto-Promoción Agency</>}
              {activeTab === 'dossier' && <><BookOpen size={20} className="text-zinc-300"/> Dossier de Operaciones</>}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 flex items-center gap-3 shadow-inner">
               <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">CLIENTE</span>
               <select 
                 value={selectedClient?.id || ''} 
                 onChange={(e) => handleClientChange(e.target.value)}
                 className="bg-transparent text-sm font-bold text-white focus:outline-none focus:ring-0 appearance-none min-w-[150px] cursor-pointer"
               >
                 {clients.map(c => (
                   <option key={c.id} value={c.id} className="bg-zinc-900">{c.name}</option>
                 ))}
               </select>
            </div>
            {selectedClient && (
              <Link href="/demo/carta" className="hidden md:flex text-xs bg-white text-black hover:bg-zinc-200 font-bold px-4 py-2 rounded-xl transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                Ver Demo
              </Link>
            )}
          </div>
        </header>

        {/* Horizontal Nav Tabs */}
        <div className="border-b border-white/5 bg-black/40 backdrop-blur-md px-6 overflow-x-auto custom-scrollbar flex shrink-0 shadow-inner">
          <nav className="flex gap-2 py-3 min-w-max">
            <button onClick={() => setActiveTab('matrix')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'matrix' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}>
              <Target size={14} className={activeTab === 'matrix' ? 'text-white' : ''} /> Matriz {approvedCreatives.length > 0 && <span className="bg-white text-black text-[9px] font-black px-1.5 py-0.5 rounded-full ml-1">{approvedCreatives.length}</span>}
            </button>
            <button onClick={() => setActiveTab('generator')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'generator' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}>
              <Zap size={14} className={activeTab === 'generator' ? 'text-white' : ''} /> Motor B2B
            </button>
            <button onClick={() => setActiveTab('menu')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'menu' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}>
              <Utensils size={14} className={activeTab === 'menu' ? 'text-white' : ''} /> La Carta
            </button>
            <button onClick={() => setActiveTab('strategy')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'strategy' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}>
              <Map size={14} className={activeTab === 'strategy' ? 'text-white' : ''} /> Estrategia
            </button>
            <button onClick={() => setActiveTab('chat')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'chat' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}>
              <Bot size={14} className={activeTab === 'chat' ? 'text-white' : ''} /> IA Chat
            </button>
            <button onClick={() => setActiveTab('promo')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'promo' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}>
              <Sparkles size={14} className={activeTab === 'promo' ? 'text-white' : ''} /> Agency Promo
            </button>
            <button onClick={() => setActiveTab('dossier')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'dossier' ? 'bg-white/10 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'}`}>
              <BookOpen size={14} className={activeTab === 'dossier' ? 'text-white' : ''} /> Dossier
            </button>
          </nav>
        </div>

        {/* Área de Trabajo de las Pestañas */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar relative z-10">
          <div className="max-w-[1200px] w-full mx-auto">
            
                        {/* 1. TAB: MATRIX */}
            {activeTab === 'matrix' && (
              <MatrixTab 
                approvedCreatives={approvedCreatives} 
                setActiveTab={setActiveTab} 
              />
            )}

            {/* 2. TAB: GENERATOR */}
            {activeTab === 'generator' && (
              <GeneratorTab 
                selectedPain={selectedPain}
                setSelectedPain={setSelectedPain}
                selectedAngle={selectedAngle}
                setSelectedAngle={setSelectedAngle}
                selectedClient={selectedClient}
                isGeneratingCopy={isGeneratingCopy}
                handleGenerateCopy={handleGenerateCopy}
                generalError={generalError}
                copyData={copyData}
                customVisualPrompt={customVisualPrompt}
                setCustomVisualPrompt={setCustomVisualPrompt}
                generatedImage={generatedImage}
                isGeneratingImage={isGeneratingImage}
                billingError={billingError}
                handleGenerateImage={handleGenerateImage}
                handleAddToMatrix={handleAddToMatrix}
                targetDishId={targetDishId}
                setTargetDishId={setTargetDishId}
                handleSaveAndAssign={handleSaveAndAssign}
                isSavingImage={isSavingImage}
                saveMessage={saveMessage}
              />
            )}

            {/* 3. TAB: MENU (Especialidades de la carta) */}
            {activeTab === 'menu' && selectedClient && (
              <MenuTab 
                selectedClient={selectedClient}
                handleDesignDishPhoto={handleDesignDishPhoto}
              />
            )}

            {/* 4. TAB: STRATEGY */}
            {activeTab === 'strategy' && selectedClient && (
              <StrategyTab 
                selectedClient={selectedClient}
                handleGenerateStrategy={handleGenerateStrategy}
                isGeneratingStrategy={isGeneratingStrategy}
                strategies={strategies}
              />
            )}

            {/* 5. TAB: CHAT (Agente de Ejecución) */}
            {activeTab === 'chat' && selectedClient && (
              <ChatTab 
                selectedClient={selectedClient}
                currentChat={currentChat}
                isSendingChat={isSendingChat}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleSendChatMessage={handleSendChatMessage}
                chatEndRef={chatEndRef}
              />
            )}

            {/* 6. TAB: PROMO (Auto-Promoción Architect.Sys) */}
            {activeTab === 'promo' && (
              <PromoTab 
                promoGoal={promoGoal}
                setPromoGoal={setPromoGoal}
                promoFormat={promoFormat}
                setPromoFormat={setPromoFormat}
                isGeneratingPromo={isGeneratingPromo}
                handleGenerateArchitectPromo={handleGenerateArchitectPromo}
                generalError={generalError}
                promoData={promoData}
                generatedImage={generatedImage}
                setCustomVisualPrompt={setCustomVisualPrompt}
                handleGenerateImage={handleGenerateImage}
                isGeneratingImage={isGeneratingImage}
                currentSlideIndex={currentSlideIndex}
                setCurrentSlideIndex={setCurrentSlideIndex}
                carouselImages={carouselImages}
                isGeneratingPromoImage={isGeneratingPromoImage}
                handleGeneratePromoSlideImage={handleGeneratePromoSlideImage}
              />
            )}

            {/* 7. TAB: DOSSIER DE PROTOCOLOS */}
            {activeTab === 'dossier' && (
              <DossierTab />
            )}


          </div>
        </div>
      </div>
    </>
  );
}
