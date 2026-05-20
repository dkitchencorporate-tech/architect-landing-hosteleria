'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

function AnalyticsPixelLogic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const trackView = async () => {
      if (!supabaseClient) {
        console.warn('[Analytics Pixel] Supabase client not initialized.');
        return;
      }

      // 1. Gestionar Session ID
      let sessionId = localStorage.getItem('architect_session_id');
      if (!sessionId) {
        // Generar UUID siguiendo especificación (usando crypto.randomUUID si está disponible)
        sessionId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
        localStorage.setItem('architect_session_id', sessionId);
      }

      // 2. Capturar UTMs
      const utm_source = searchParams.get('utm_source');
      const utm_medium = searchParams.get('utm_medium');
      const utm_campaign = searchParams.get('utm_campaign');

      // 3. Determinar Device Type
      const ua = navigator.userAgent;
      let deviceType = 'desktop';
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        deviceType = 'tablet';
      } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        deviceType = 'mobile';
      }

      // 4. Preparar Data
      const payload = {
        session_id: sessionId,
        path: pathname,
        referrer: document.referrer || null,
        utm_source,
        utm_medium,
        utm_campaign,
        user_agent: ua,
        device_type: deviceType,
        screen_width: window.innerWidth,
        screen_height: window.innerHeight,
        metadata: {
          language: navigator.language,
          timestamp: new Date().toISOString()
        }
      };

      console.log("[Analytics] Evento enviado:", payload);

      // 5. Inserción en Supabase
      const { error } = await supabaseClient
        .from('web_analytics')
        .insert([payload]);

      if (error) {
        console.error('[Analytics Pixel] Error inserting data:', error.message);
      } else {
        console.log('[Analytics Pixel] Event recorded successfully.');
      }
    };

    trackView();
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsPixel() {
  return (
    <Suspense fallback={null}>
      <AnalyticsPixelLogic />
    </Suspense>
  );
}
