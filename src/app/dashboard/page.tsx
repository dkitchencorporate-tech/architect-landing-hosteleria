"use client";

import React, { useState, useEffect } from "react";
import OnboardingWizard from "@/components/dashboard/OnboardingWizard";
import EventsLibrary from "@/components/dashboard/EventsLibrary";
import Autogestion from "@/components/dashboard/Autogestion";
import Marketplace from "@/components/dashboard/Marketplace";
import Pipeline from "@/components/dashboard/Pipeline";
import CreativeFactoryClient from "@/components/dashboard/CreativeFactoryClient";
import { createClient } from "@/lib/supabase-browser";

export default function DashboardPage() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isGrowthPlan, setIsGrowthPlan] = useState(false);
  const [activeTab, setActiveTab] = useState("creative");
  const [isAdminDemo, setIsAdminDemo] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    const checkState = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      let email = session?.user?.email;
      
      // BYPASS LOCAL para no bloquear renderizado en localhost sin sesión
      if (!session && process.env.NODE_ENV === 'development') {
        email = 'klarx94@gmail.com';
      }

      if (!email) return;
      
      const isAdmin = email === 'klarx94@gmail.com';
      setIsAdminDemo(isAdmin);

      if (isAdmin) {
        // Modo Demo para presentaciones
        setHasCompletedOnboarding(true);
        setIsGrowthPlan(true);
      } else {
        // Cliente Real: Leer de Base de Datos
        if (session && session.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (profile) {
            setUserProfile(profile);
            setHasCompletedOnboarding(profile.onboarding_completed);
            setIsGrowthPlan(profile.plan === 'growth');
          } else {
            setHasCompletedOnboarding(false);
          }
        } else {
          setHasCompletedOnboarding(false);
        }
      }
    };

    checkState();

    // Listen to hash changes for navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["creative", "events", "autogestion", "marketplace", "pipeline"].includes(hash)) {
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

  if (!hasCompletedOnboarding) {
    return <OnboardingWizard onComplete={() => setHasCompletedOnboarding(true)} />;
  }

  // Render the appropriate view based on active tab
  const renderView = () => {
    switch (activeTab) {
      case "creative":
        return <CreativeFactoryClient userProfile={userProfile} />;
      case "events":
        return <EventsLibrary isGrowthPlan={isGrowthPlan} />;
      case "autogestion":
        return <Autogestion isGrowthPlan={isGrowthPlan} />;
      case "marketplace":
        return <Marketplace />;
      case "pipeline":
        return <Pipeline />;
      default:
        return <CreativeFactoryClient userProfile={userProfile} />;
    }
  };

  return (
    <div className="animate-fadeIn">
      {renderView()}
    </div>
  );
}
