-- 0015 · Permisos de dk_app sobre el intake de Nivel B (Parte 8, Sección 5-bis)
--
-- MOTIVO: auditoría del 22/09/2026 encontró que dk_app (el rol de conexión
-- de la app principal, DK_DATABASE_URL) no tenía forma de ejecutar
-- dk.pedido_por_token() ni dk.guardar_intake() -- ninguna de las dos estaba
-- concedida a dk_app ni a dk_anon/dk_auth (de los que dk_app es miembro).
-- El endpoint /api/intake/[token] (src/app/api/intake/[token]/route.ts)
-- habría fallado con "permission denied" en cuanto un cliente real hubiera
-- llegado a usarlo -- la Fase 5 estaba construida en código pero no
-- alcanzable en producción.
--
-- dk_webhook ya llegaba a estas funciones por su membresía en
-- dk_aprovisionamiento (0013) -- no necesita ningún cambio.
--
-- dk.limite_superado() ya era alcanzable por dk_app vía su membresía en
-- dk_anon/dk_auth (0007/0008) -- tampoco necesita cambio.
--
-- Se concede EXECUTE puntual sobre exactamente las dos funciones que la
-- ruta de intake necesita -- nunca acceso directo a las tablas
-- (pedidos_nivel_b, intake_formularios), que siguen sin GRANT directo a
-- ningún rol de aplicación, tal como especifica 0013.

GRANT EXECUTE ON FUNCTION dk.pedido_por_token(text) TO dk_app;
GRANT EXECUTE ON FUNCTION dk.guardar_intake(text, jsonb) TO dk_app;
