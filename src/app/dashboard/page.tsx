"use client";

import React, { useState, useEffect } from "react";
import EventsLibrary from "@/components/dashboard/EventsLibrary";
import Autogestion from "@/components/dashboard/Autogestion";
import Marketplace from "@/components/dashboard/Marketplace";
import Pipeline from "@/components/dashboard/Pipeline";

export default function DashboardPage() {
  // Sin base de datos no hay perfil que consultar. Se renderiza el panel ya
  // "onboardeado" para que sus pantallas sean revisables; el asistente de alta
  // vive en su propia ruta, /onboarding.
  const [hasCompletedOnboarding] = useState<boolean | null>(true);
  const [activeTab, setActiveTab] = useState("events");
  const isAdminDemo = false;
  const userProfile = null;

  useEffect(() => {
    // Navegación por hash entre las pestañas del panel
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["events", "autogestion", "marketplace", "pipeline"].includes(hash)) {
        setActiveTab(hash);
      }
    };

    if (window.location.hash) handleHashChange();
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  if (hasCompletedOnboarding === null) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando ecosistema...</div>;
  }

  // Render the appropriate view based on active tab
  const renderView = () => {
    switch (activeTab) {
      case "events":
        return <EventsLibrary />;
      case "autogestion":
        return <Autogestion />;
      case "marketplace":
        return <Marketplace />;
      case "pipeline":
        return <Pipeline />;
      default:
        return <EventsLibrary />;
    }
  };

  return (
    <div className="animate-fadeIn">
      {renderView()}
    </div>
  );
}
