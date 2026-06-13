"use client";

import React, { useState, useEffect, useRef } from "react";

interface OnboardingWizardProps {
  onComplete: () => void;
}

export default function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    cuisineType: "",
    averageTicket: "",
    capacity: "",
    tables: "",
    socialLinks: "",
  });

  const [chatMessages, setChatMessages] = useState<{sender: 'ai'|'user', text: string}[]>([
    { sender: "ai", text: "¡Hola! Soy tu asistente de Onboarding. Para configurar tu cuenta y personalizar tus eventos, necesito hacerte un par de preguntas. ¿Cuál dirías que es el plato estrella o el ingrediente que más te caracteriza?" }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load state from local storage on mount
  useEffect(() => {
    const savedForm = localStorage.getItem("onboarding_form");
    if (savedForm) setFormData(JSON.parse(savedForm));

    const savedStep = localStorage.getItem("onboarding_step");
    if (savedStep) setStep(parseInt(savedStep, 10));

    const savedChat = localStorage.getItem("onboarding_chat");
    if (savedChat) setChatMessages(JSON.parse(savedChat));
  }, []);

  // Save state to local storage when it changes
  useEffect(() => {
    localStorage.setItem("onboarding_form", JSON.stringify(formData));
    localStorage.setItem("onboarding_step", step.toString());
    localStorage.setItem("onboarding_chat", JSON.stringify(chatMessages));
  }, [formData, step, chatMessages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      const { createClient } = await import("@/lib/supabase-browser");
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      const email = session?.user?.email || '';
      const isAdmin = email === 'klarx94@gmail.com';

      if (isAdmin) {
        localStorage.setItem("onboarding_completed", "true");
        onComplete();
        return;
      }

      if (session) {
        // Save project data
        await supabase.from('projects').insert([{
          profile_id: session.user.id,
          restaurant_name: formData.businessName,
          restaurant_type: formData.cuisineType,
          monthly_revenue: formData.averageTicket, // Mapping for now
          main_problem: "N/A", // From chat or default
          team_size: formData.capacity // Mapping for now
        }]);

        // Update profile onboarding status
        await supabase.from('profiles').update({ onboarding_completed: true }).eq('id', session.user.id);
      }
      
      onComplete();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const newMsgs = [...chatMessages, { sender: "user" as const, text: currentMessage }];
    setChatMessages(newMsgs);
    setCurrentMessage("");

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "Anotado. Lo guardo en tu perfil.";
      if (newMsgs.length === 2) {
        aiResponse = "¡Excelente elección! ¿Hay algún alérgeno común en tu carta que debamos destacar para curarnos en salud (ej. gluten, frutos secos)?";
      } else if (newMsgs.length === 4) {
        aiResponse = "Perfecto. Por último, ¿qué estilo visual quieres para tu web y comunicaciones? ¿Algo moderno y oscuro, o más bien cálido y tradicional?";
      } else if (newMsgs.length > 5) {
        aiResponse = "¡Gracias! He recopilado toda la información necesaria. Ya puedes terminar de rellenar el formulario para acceder al panel.";
      }
      setChatMessages(prev => [...prev, { sender: "ai", text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[80vh] bg-dash-bg text-dash-text-primary rounded-xl overflow-hidden border border-dash-border shadow-premium">

      {/* Form Section */}
      <div className="flex-1 p-8 overflow-y-auto lg:border-r border-dash-border">
        <h2 className="text-2xl font-bold text-white mb-2">Protocolo de Captación de Datos</h2>
        <p className="text-dash-text-secondary mb-8 text-sm">Completa esta información para estructurar el traspaso de información y preparar tu negocio para el ecosistema.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-semibold text-dash-accent">1. Datos Básicos del Negocio</h3>
              <div>
                <label className="block text-sm text-dash-text-secondary mb-1">Nombre del Local</label>
                <input required type="text" name="businessName" value={formData.businessName} onChange={handleChange} className="w-full bg-dash-surface border border-dash-border rounded p-3 text-white focus:border-brand focus:outline-none transition-colors" placeholder="Ej. El Rincón de Pepe" />
              </div>
              <div>
                <label className="block text-sm text-dash-text-secondary mb-1">Dirección Completa</label>
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-dash-surface border border-dash-border rounded p-3 text-white focus:border-brand focus:outline-none transition-colors" placeholder="Calle, Ciudad, CP" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-dash-text-secondary mb-1">Tipo de Cocina</label>
                  <select required name="cuisineType" value={formData.cuisineType} onChange={handleChange} className="w-full bg-dash-surface border border-dash-border rounded p-3 text-white focus:border-brand focus:outline-none transition-colors">
                    <option value="">Selecciona...</option>
                    <option value="tradicional">Tradicional / Casera</option>
                    <option value="gourmet">Gourmet / Alta Cocina</option>
                    <option value="casual">Casual Dining / Tapas</option>
                    <option value="fastfood">Fast Food / Burger</option>
                    <option value="nocturno">Ocio Nocturno / Copas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-dash-text-secondary mb-1">Ticket Medio (€)</label>
                  <input required type="number" name="averageTicket" value={formData.averageTicket} onChange={handleChange} className="w-full bg-dash-surface border border-dash-border rounded p-3 text-white focus:border-brand focus:outline-none transition-colors" placeholder="Ej. 25" />
                </div>
              </div>
              <div className="pt-4">
                <button type="button" onClick={handleNext} className="bg-brand hover:bg-brandHover text-white px-6 py-3 rounded font-medium transition-colors">Siguiente Paso</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="text-lg font-semibold text-dash-accent">2. Operaciones y Enlaces</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-dash-text-secondary mb-1">Aforo Máximo de Sala</label>
                  <input required type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full bg-dash-surface border border-dash-border rounded p-3 text-white focus:border-brand focus:outline-none transition-colors" placeholder="Ej. 50" />
                </div>
                <div>
                  <label className="block text-sm text-dash-text-secondary mb-1">Número de Mesas</label>
                  <input required type="number" name="tables" value={formData.tables} onChange={handleChange} className="w-full bg-dash-surface border border-dash-border rounded p-3 text-white focus:border-brand focus:outline-none transition-colors" placeholder="Ej. 15" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-dash-text-secondary mb-1">Enlaces (Instagram, Tripadvisor, Web actual)</label>
                <textarea name="socialLinks" value={formData.socialLinks} onChange={handleChange} rows={3} className="w-full bg-dash-surface border border-dash-border rounded p-3 text-white focus:border-brand focus:outline-none transition-colors" placeholder="https://instagram.com/tu-local..." />
              </div>
              <div className="pt-4 flex space-x-4">
                <button type="button" onClick={handlePrev} className="bg-dash-surface border border-dash-border hover:bg-dash-surface-hover text-white px-6 py-3 rounded font-medium transition-colors">Volver</button>
                <button type="submit" className="bg-brand hover:bg-brandHover text-white px-6 py-3 rounded font-medium transition-colors flex-1">Finalizar e Ingresar al SaaS</button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* AI Chatbot Section */}
      <div className="w-full lg:w-96 bg-dash-surface flex flex-col border-t lg:border-t-0 border-dash-border">
        <div className="p-4 border-b border-dash-border flex items-center space-x-3 bg-dash-surface-hover">
          <div className="w-10 h-10 rounded-full bg-brand flex items-center justify-center text-white font-bold">IA</div>
          <div>
            <h3 className="text-white font-medium text-sm">Asistente de Arquitectura</h3>
            <span className="text-xs text-trust flex items-center"><span className="w-2 h-2 rounded-full bg-trust mr-1"></span>Online</span>
          </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.sender === 'ai' ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[85%] p-3 rounded-lg text-sm ${msg.sender === 'ai' ? 'bg-dash-bg border border-dash-border text-dash-text-primary rounded-tl-none' : 'bg-brand text-white rounded-tr-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-dash-border bg-dash-bg">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Escribe aquí..."
              className="flex-1 bg-dash-surface border border-dash-border rounded p-2 text-sm text-white focus:border-brand focus:outline-none"
            />
            <button type="submit" className="bg-dash-surface-hover border border-dash-border text-white px-4 py-2 rounded hover:text-brand transition-colors">→</button>
          </form>
        </div>
      </div>
    </div>
  );
}
