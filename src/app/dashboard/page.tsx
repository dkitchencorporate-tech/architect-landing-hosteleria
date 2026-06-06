"use client";

import React, { useState, useEffect } from "react";
import OnboardingWizard from "@/components/dashboard/OnboardingWizard";
import EventsLibrary from "@/components/dashboard/EventsLibrary";
import Autogestion from "@/components/dashboard/Autogestion";
import Marketplace from "@/components/dashboard/Marketplace";
import Pipeline from "@/components/dashboard/Pipeline";

export default function DashboardPage() {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);
  const [isGrowthPlan, setIsGrowthPlan] = useState(false);
  const [activeTab, setActiveTab] = useState("events");

  useEffect(() => {
    // Check initial state
    const checkState = () => {
      const completed = localStorage.getItem("onboarding_completed") === "true";
      setHasCompletedOnboarding(completed);

      const plan = localStorage.getItem("saas_plan");
      setIsGrowthPlan(plan === "growth");
    };

    checkState();

    // Listen to hash changes for navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (["events", "autogestion", "marketplace", "pipeline"].includes(hash)) {
        setActiveTab(hash);
      }
    };

    // Set initial tab based on hash
    if (window.location.hash) handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    // Listen for custom event from Layout for real-time plan switching
    window.addEventListener("storage", checkState);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("storage", checkState);
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
      case "events":
        return <EventsLibrary isGrowthPlan={isGrowthPlan} />;
      case "autogestion":
        return <Autogestion isGrowthPlan={isGrowthPlan} />;
      case "marketplace":
        return <Marketplace />;
      case "pipeline":
        return <Pipeline />;
      default:
        return <EventsLibrary isGrowthPlan={isGrowthPlan} />;
    }
  };

  return (
    <div className="animate-fadeIn">
      {renderView()}
    </div>
  );
}
