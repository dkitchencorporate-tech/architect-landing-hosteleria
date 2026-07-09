'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase-client';

function AnalyticsPixelLogic() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 0. EXCLUIR DASHBOARD ADMINISTRATIVO
    if (pathname.startsWith('/admin-architect')) return;

    const trackView = async () => {
      if (!supabaseClient) return;

      // 1. Gestionar Session ID
      let sessionId = localStorage.getItem('architect_session_id');
      if (!sessionId) {
        sessionId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15);
        localStorage.setItem('architect_session_id', sessionId);
      }

      // 2. Geolocalización Inteligente (Proxy Servidor Vercel)
      let geo = { city: 'Desconocido', country_name: 'Desconocido' };
      try {
        const geoRes = await fetch('/api/analytics/geo');
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          geo = { city: geoData.city || 'Desconocido', country_name: geoData.country_name || 'Desconocido' };
        }
      } catch (err) {
        console.warn('[Analytics] No se pudo obtener la geolocalización local.');
      }

      // 3. Capturar UTMs
      const utm_source = searchParams.get('utm_source');
      const utm_medium = searchParams.get('utm_medium');
      const utm_campaign = searchParams.get('utm_campaign');

      // 4. Determinar Device Type
      const ua = navigator.userAgent;
      let deviceType = 'desktop';
      if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) deviceType = 'tablet';
      else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) deviceType = 'mobile';

      // 5. Preparar Data
      const payload = {
        session_id: sessionId,
        path: pathname,
        referrer: document.referrer || null,
        utm_source,
        utm_medium,
        utm_campaign,
        device_type: deviceType,
        metadata: {
          user_agent: ua,
          screen_width: window.innerWidth,
          screen_height: window.innerHeight,
          language: navigator.language,
          timestamp: new Date().toISOString(),
          city: geo.city,
          country: geo.country_name,
          event: 'page_view'
        }
      };

      console.log("[Analytics] Lead Detectado:", payload);

      // 6. Inserción en Supabase
      await supabaseClient.from('web_analytics').insert([payload]);
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
