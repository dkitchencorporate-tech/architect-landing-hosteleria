"use client";

import React, { useState, useEffect } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isGrowthPlan, setIsGrowthPlan] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync plan choice with local storage for demo purposes
  useEffect(() => {
    const plan = localStorage.getItem("saas_plan");
    if (plan === "growth") setIsGrowthPlan(true);
  }, []);

  const togglePlan = () => {
    const newPlan = !isGrowthPlan;
    setIsGrowthPlan(newPlan);
    localStorage.setItem("saas_plan", newPlan ? "growth" : "base");
    // Dispatch an event so the page can react to plan changes immediately
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className="min-h-screen bg-[#020202] text-dash-text-primary font-sans flex flex-col md:flex-row overflow-hidden">

      {/* Mobile Header (Hamburger + Plan Toggle) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-dash-bg border-b border-dash-border z-20">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-dash-text-secondary">Base</span>
          <button onClick={togglePlan} className={`w-10 h-5 rounded-full relative transition-colors ${isGrowthPlan ? 'bg-brand' : 'bg-dash-surface-hover'}`}>
            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isGrowthPlan ? 'translate-x-5' : 'translate-x-0'}`}></div>
          </button>
          <span className="text-xs font-bold text-dash-accent">Growth</span>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={`absolute md:relative z-10 w-64 h-full bg-dash-bg border-r border-dash-border transform transition-transform duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-6 border-b border-dash-border hidden md:block">
          <h1 className="text-xl font-bold tracking-wider text-white">ARCHITECT<span className="text-brand">.</span></h1>
          <p className="text-xs text-dash-text-secondary mt-1">SaaS Operations Protocol</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider text-dash-text-secondary mb-4 mt-2">Navegación</p>
          <a href="#events" className="block px-4 py-3 rounded text-sm text-white bg-dash-surface hover:bg-dash-surface-hover transition-colors flex items-center border border-dash-border">
            <span className="w-2 h-2 rounded-full bg-brand mr-3"></span> Eventos
          </a>
          <a href="#autogestion" className="block px-4 py-3 rounded text-sm text-dash-text-secondary hover:text-white hover:bg-dash-surface transition-colors flex items-center">
            <span className="w-2 h-2 rounded-full bg-dash-text-secondary mr-3"></span> Autogestión
          </a>
          <a href="#marketplace" className="block px-4 py-3 rounded text-sm text-dash-text-secondary hover:text-white hover:bg-dash-surface transition-colors flex items-center">
            <span className="w-2 h-2 rounded-full bg-dash-accent mr-3"></span> Up-sells
          </a>
          <a href="#pipeline" className="block px-4 py-3 rounded text-sm text-dash-text-secondary hover:text-white hover:bg-dash-surface transition-colors flex items-center">
            <span className="w-2 h-2 rounded-full bg-trust mr-3"></span> Pipeline
          </a>
        </nav>

        <div className="p-4 border-t border-dash-border">
          <div className="bg-dash-surface rounded p-4 border border-dash-border">
            <p className="text-xs text-dash-text-secondary mb-2">Plan Actual</p>
            <p className="text-sm font-bold text-white mb-3">{isGrowthPlan ? 'Socio Growth (Sub)' : 'Base (Pago Único)'}</p>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-dash-text-secondary">Base</span>
              <button onClick={togglePlan} className={`w-10 h-5 rounded-full relative transition-colors ${isGrowthPlan ? 'bg-brand' : 'bg-dash-surface-hover border border-dash-border'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isGrowthPlan ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </button>
              <span className="text-xs font-bold text-dash-accent">Growth</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto bg-[#020202]">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    </div>
  );
}
