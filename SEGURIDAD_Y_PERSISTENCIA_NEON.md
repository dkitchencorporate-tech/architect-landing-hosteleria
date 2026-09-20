# Seguridad y persistencia en Neon

**Actualizado:** 20 de septiembre de 2026
**Estado:** aplicado y verificado sobre `main`. Las Secciones 1 a 6 son el análisis y el
diseño; la **Sección 8** describe lo que está realmente ejecutado, y la **Sección 7**
dice qué falta y por qué. Lo que no esté en la 8, no está puesto.

Este documento existe para que el backend no se improvise. Recoge, uno a uno, los
agujeros encontrados durante la migración, y define cómo debe quedar cada cosa en
Neon para que no se repitan. No es una lista de buenas intenciones: cada hallazgo
tiene su evidencia y su remedio concreto.

---

## 0. La regla inamovible, enunciada con precisión

La regla es: **el despliegue solo tiene el front; todo lo demás vive en Neon.**

Conviene enunciarla de forma que se pueda verificar, porque en su versión literal
—"nada se maneja a nivel de despliegue"— es inalcanzable: el despliegue necesita al
menos una credencial para hablar con la base de datos, y las páginas se renderizan
ahí. Si nos quedamos en la versión literal, tendremos la sensación de cumplirla sin
poder demostrarlo nunca.

La versión verificable es esta:

> **El despliegue no tiene autoridad.** Puede pedir datos; no puede decidir quién
> tiene derecho a ellos. Si alguien roba el despliegue entero —código, variables de
> entorno y todo— no debe poder leer ni escribir nada que su identidad no le
> permitiera ya.

De ahí salen cuatro obligaciones concretas:

| Vive en Neon, siempre | Puede vivir en el despliegue |
|---|---|
| Quién puede ver cada fila (RLS) | El renderizado de la interfaz |
| Quién puede escribir y qué (RLS + funciones) | Textos, precios de catálogo, imágenes |
| Las reglas de negocio que no pueden violarse (constraints) | Validación de formularios *como comodidad*, nunca como defensa |
| El registro de quién hizo qué (auditoría) | La cadena de conexión, y nada más |

**La prueba de fuego**, que hay que poder responder en cualquier momento: *si un
atacante obtiene la variable de entorno de conexión, ¿qué puede hacer?* La respuesta
correcta no es "nada" —tendría acceso a la base— sino **"exactamente lo que puede
hacer un visitante anónimo"**, porque el rol con el que se conecta el despliegue es
un rol sin privilegios y toda la autoridad está en las políticas.

Esa es la diferencia entre decir que la seguridad está en Neon y que lo esté.

---

## 1. Inventario de hallazgos

Severidad: **Crítico** (permite acceso o fuga ya), **Alto** (lo permitiría en cuanto
haya datos), **Medio** (riesgo real pero acotado), **Bajo** (calidad o cumplimiento).

### V-01 · Crítico · El middleware fabricaba un administrador

`src/middleware.ts` (eliminado). Cuando no había sesión y el entorno era de
desarrollo, **construía un objeto de usuario con un correo concreto**:

```
user = { email: 'klarx94@gmail.com' } as any;
```

Ese objeto pasaba después los dos controles de administrador del mismo archivo
(líneas 67 y 77). El único seguro era que `NODE_ENV` valiera `production`: una
variable de entorno mal puesta en un despliegue convertía a cualquier visitante en
administrador.

**Estado:** eliminado con el middleware.
**Remedio en Neon:** la identidad nunca se construye en el código. El rol efectivo
de una petición sale del token verificado contra la base; si no hay token, el rol es
`anon` y las políticas deciden. No existe rama de código capaz de conceder un rol.

### V-02 · Crítico · Modo demo por correo en duro

`src/app/dashboard/page.tsx`, líneas 25-33 (corregido). Comparaba el correo con
`klarx94@gmail.com` y, si coincidía, marcaba el onboarding como completo saltándose
la base de datos. Además tenía su propio bypass de desarrollo que asignaba ese correo
cuando no había sesión.

**Estado:** eliminado.
**Remedio en Neon:** si hace falta una cuenta de demostración, es una fila más con un
rol propio (`demo`), sujeta a las mismas políticas. Un privilegio que se concede con
un `if` en el cliente no es un privilegio, es un agujero.

### V-03 · Crítico · Administrador por coincidencia de texto

`src/app/dashboard/layout.tsx`, línea 25 (corregido):

```
if (data?.user?.email?.includes('klar')) setIsAdmin(true);
```

Cualquier correo que contuviera la cadena `klar` obtenía el enlace al panel interno.
`klara@…`, `declarando@…`, `klarna@…` — todos pasaban.

**Estado:** eliminado.
**Remedio en Neon:** la pertenencia a un rol es una fila en una tabla de roles, no
una subcadena. Se comprueba con igualdad sobre un identificador, nunca con `includes`.

### V-04 · Alto · "Modo Dios" documentado

En `.agent_context_backup/` (eliminado) se describía un modo que, al iniciar sesión
con `alex@architectsys.com` o `admin@architectsys.com`, **ignoraba las comprobaciones
de base de datos e inyectaba datos de demostración**.

**Estado:** el backup se eliminó entero. No se ha encontrado el código activo, pero
hay que asumir que existió.
**Remedio en Neon:** ver V-02. Además, la auditoría (§2.6) deja constancia de cada
lectura privilegiada, de modo que un modo así no podría volver a pasar inadvertido.

### V-05 · Crítico · Exportación de datos personales sin autenticar

`src/app/api/admin/export-leads/route.ts`. Era un `POST` **sin comprobación de
identidad de ningún tipo** que devolvía un CSV con **nombre, teléfono, correo, origen
y fecha de todos los leads**. Bastaba conocer la ruta.

Esto no es solo una vulnerabilidad: es una brecha de datos personales con
implicaciones de RGPD si llegó a haber leads reales en esa tabla.

**Estado:** devuelve 503 y lleva el aviso escrito en el propio archivo.
**Remedio en Neon:** la exportación se convierte en una función `SECURITY DEFINER`
que (a) exige rol `admin`, (b) registra en la auditoría quién exportó, cuántas filas
y cuándo, y (c) está sujeta a límite de frecuencia. Una exportación masiva de datos
personales debe dejar rastro siempre.

### V-06 · Alto · Rutas de IA huérfanas de guardia

Seis rutas bajo `src/app/api/creative-factory/` usaban `verifyAdmin` de
`src/lib/auth-helpers.ts`. Al eliminar Supabase, ese archivo desapareció y las rutas
se habrían quedado abiertas. Llaman a Gemini: abiertas, cualquiera podría agotar la
cuota o usarlas como generador gratuito.

**Estado:** cerradas con `src/lib/api-guard.ts`, devuelven 503.
**Remedio en Neon:** rol `admin` comprobado contra la base + límite de frecuencia por
identidad (§6.3). El coste por llamada obliga a tratar la cuota como un recurso a
proteger, no solo como un dato.

### V-07 · Medio · Endpoint de diagnóstico que revelaba configuración

`src/app/api/diagnostic/route.ts` (eliminado). Un `GET` sin autenticar que informaba
de qué variables de entorno estaban presentes (`PRESENT` / `MISSING`) para la URL de
base de datos, la clave de servicio y la clave de Gemini.

No filtraba los valores, pero sí el mapa de la instalación: a un atacante le dice
exactamente qué existe y qué no antes de decidir por dónde entrar.

**Estado:** eliminado con el bot.
**Remedio:** no se reconstruye. Si hace falta comprobar salud, que sea un endpoint
que responda vivo/muerto sin describir la configuración.

### V-08 · Medio · Documentación confidencial indexable

`src/app/manuals/*` se declara "DOCUMENTO CONFIDENCIAL - USO INTERNO DKITCHEN" en su
pie de impresión, y era completamente pública e indexable: procedimientos, estrategia
comercial y precios.

**Estado:** se le ha puesto `noindex, nofollow`. **Sigue siendo accesible para
cualquiera que conozca la URL.**
**Remedio en Neon:** los manuales pasan a exigir rol autenticado. Mientras tanto, no
publicar la URL en ningún sitio y asumir que su contenido es semipúblico.

### V-09 · Alto · Paneles sin control de acceso

`/dashboard` y `/admin-architect/*` son hoy rutas públicas. El middleware que las
protegía dependía de Supabase y se eliminó. Ahora mismo no se filtra nada porque
están vacías, pero **la primera fila de datos reales que entre queda expuesta.**

**Estado:** abiertas, vacías, marcadas con aviso visible.
**Remedio en Neon:** ver §3. Es el punto que bloquea la entrada del primer cliente
real: no se carga nada en producción hasta que esté cerrado.

### V-10 · Medio · Datos del visitante a un tercero sin consentimiento

`src/components/AnalyticsPixel.tsx`, línea 26: en cada visita llama a
`https://ipapi.co/json/`, lo que envía la IP del visitante a un servicio externo para
geolocalizarlo. Ocurre **al margen del banner de cookies**, antes de que nadie acepte
nada.

**Estado: CERRADO (20/09/2026).** La llamada se ha eliminado. Entregaba un dato
personal a una empresa ajena, sin pedirlo y sin figurar en la política de privacidad,
a cambio de nada: el resultado no se guardaba en ninguna parte. Cuando haga falta el
país, lo resuelve el borde de Vercel a partir de la petición, sin terceros y sin
almacenar la IP. La CSP añadida en `next.config.js` (`connect-src 'self'`) impide
además que vuelva a aparecer una llamada así sin que se note.

### V-11 · Alto · Credenciales de correo en el despliegue

**Sigue abierto:** no lo puede cerrar el código, exige dar de alta un proveedor.

`src/app/api/lead/route.ts` usa `SMTP_EMAIL` y `SMTP_PASSWORD` con Gmail. Son
credenciales de una cuenta de correo real viviendo en variables de entorno del
despliegue. Quien las obtenga puede enviar correo **como DKitchen**.

Choca de frente con la regla inamovible: es autoridad en el despliegue.

**Remedio:** sustituir la cuenta personal por un servicio de envío transaccional con
clave de API restringida a un único dominio remitente y revocable por sí sola. Y
mover la captación de leads a Neon (§5.1) para que el correo sea una notificación,
no el sistema de registro.

### V-12 · Medio · Clave de Gemini en el despliegue

**Estado: CERRADO.** Gemini se eliminó del proyecto por decisión de producto, y la
variable se borró del despliegue. Queda revocarla en Google Cloud, que solo puede
hacer el titular de la cuenta.

### V-13 · Alto · Sin límite de frecuencia en ninguna parte

Ninguna ruta de la aplicación tiene control de frecuencia. `/api/lead` envía un
correo por petición: un script puede inundar la bandeja de entrada y, de paso,
quemar la reputación del remitente. Las rutas de IA cuestan dinero por llamada.

**Estado: MITIGADO (20/09/2026).** Las rutas de IA ya no existen —se eliminaron con
Gemini— así que la única superficie viva era `/api/lead`, que ahora limita a 5 envíos
por IP cada 10 minutos y valida el correo y el teléfono antes de enviar nada.

El contador vive en memoria del proceso, y eso hay que decirlo con precisión: las
funciones de Vercel son efímeras y hay varias a la vez, así que el límite es por
instancia, no global. Quita de en medio el bucle trivial desde una consola; no frena
a quien reparta las peticiones. El límite global con contador en Neon (§6.3) sigue
pendiente, y se vuelve necesario el día que la captación de leads entre en la base.

### V-14 · Bajo · Redirección a una ruta inexistente

`src/app/onboarding/page.tsx` redirigía a `/client`, que no existe. Cualquiera que
hubiera completado el alta habría acabado en un 404.

**Estado:** el alta está cerrada; la redirección se eliminó.

### V-15 · Bajo · Interfaz declarada dos veces

`src/lib/events-data.ts` declara `EventDossier` dos veces. TypeScript lo tolera
porque fusiona interfaces, así que nunca dio error. Es un copia-pega a limpiar.

### V-17 · Crítico · Trece credenciales vivas de servicios que ya no existen

Auditadas las variables de entorno del proyecto en Vercel el 20/09/2026, el código
solo usa cinco: `GEMINI_API_KEY`, `GROQ_API_KEY`, `USE_GROQ`, `SMTP_EMAIL` y
`SMTP_PASSWORD`. Las otras trece siguen cargadas y activas sin que nada las llame:

| Variable | Servicio | Riesgo |
|---|---|---|
| `SUPABASE_SERVICE_KEY` | Supabase | **La clave de servicio: se salta RLS por completo.** Si el proyecto de Supabase sigue existiendo, quien la tenga tiene lectura y escritura totales sobre él |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Revela el proyecto contra el que usar la anterior |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | Pública por diseño, pero ya no protege nada |
| `KOMMO_ACCESS_TOKEN`, `KOMMO_BASE_URL`, `KOMMO_INTEGRATION_ID` | Kommo CRM | Acceso al CRM con los leads históricos |
| `WHATSAPP_TOKEN`, `WHATSAPP_BUSINESS_ACCOUNT_ID`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN` | Meta Cloud API | Permiten **enviar WhatsApp como DKitchen** |
| `WHOP_API_KEY`, `WHOP_COMPANY_ID`, `WHOP_WEBHOOK_SECRET` | Whop | **No hay ni una línea de código que los use.** Whop es una plataforma de pagos y membresías: conviene averiguar qué se conectó y cerrarlo |

Una credencial huérfana es la peor clase de credencial: conserva todo su poder y ya
no protege nada, así que nadie la echa de menos si se usa. `SUPABASE_SERVICE_KEY` y
los tokens de WhatsApp son los urgentes — el primero da acceso total a una base de
datos, los segundos permiten suplantar a la marca.

**Remedio:** revocar en origen (no basta con borrar la variable: hay que invalidar la
clave en Supabase, Meta, Kommo y Whop) y después limpiar el entorno de Vercel. No las
he borrado yo: son el entorno de producción y Whop no sé qué sostiene.

### V-16 · Bajo · Validación de formularios solo en el cliente

Los formularios validan en el navegador. `/api/lead` comprueba que los campos existan,
pero no su forma. Sin validación en el servidor, cualquiera puede enviar lo que quiera
directamente a la ruta.

**Remedio:** las restricciones viven en la tabla (§2.4). Un correo mal formado no
debe poder insertarse aunque la petición se salte el navegador.

---

## 2. Arquitectura en Neon

### 2.1 Roles

Cuatro roles, y solo cuatro. El despliegue **nunca** se conecta con el propietario.

| Rol | Quién lo usa | Puede |
|---|---|---|
| `dk_owner` | Solo migraciones, desde local o CI | Todo (DDL incluido) |
| `dk_anon` | El despliegue, visitante sin sesión | Lo que permitan las políticas de `anon` |
| `dk_auth` | El despliegue, visitante con sesión | Lo que permitan las políticas según su identidad |
| `dk_admin` | Nunca directamente; se alcanza por rol en la tabla de identidades | Operaciones internas, siempre auditadas |

```sql
-- El rol del despliegue no hereda nada por defecto.
CREATE ROLE dk_anon NOLOGIN;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM dk_anon;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO dk_anon, dk_auth;
```

Que la primera sentencia sea un `REVOKE` no es cosmético: en Postgres, `PUBLIC` tiene
privilegios por defecto sobre el esquema `public`. Si no se retiran explícitamente,
toda la arquitectura de políticas queda por encima de una puerta que sigue abierta.

### 2.2 RLS como única capa de autorización

**Toda tabla con datos nace con RLS activado y sin política.** Es decir: nace
inaccesible, y se le van concediendo permisos explícitos. El orden importa — si se
crea la tabla y se activa RLS después, existe una ventana en la que está abierta.

```sql
ALTER TABLE restaurantes ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurantes FORCE ROW LEVEL SECURITY;  -- aplica también al propietario
```

`FORCE` es lo que impide que una conexión con el rol propietario se salte las
políticas por accidente.

```sql
-- Un restaurante solo se ve a sí mismo.
CREATE POLICY restaurante_ve_lo_suyo ON restaurantes
  FOR SELECT TO dk_auth
  USING (id = dk.identidad_actual());

-- Y solo puede modificar lo suyo, sin poder cambiarse de dueño.
CREATE POLICY restaurante_edita_lo_suyo ON restaurantes
  FOR UPDATE TO dk_auth
  USING (id = dk.identidad_actual())
  WITH CHECK (id = dk.identidad_actual());
```

La distinción entre `USING` y `WITH CHECK` es la que evita que alguien edite una fila
suya para reasignarla a otro: `USING` decide qué filas puede tocar, `WITH CHECK`
decide cómo pueden quedar después.

### 2.3 Las escrituras sensibles pasan por funciones

Donde una escritura implique una regla de negocio, no se concede `INSERT` directo: se
concede permiso de ejecución sobre una función `SECURITY DEFINER` que valida, escribe
y audita en una sola transacción.

```sql
CREATE FUNCTION dk.registrar_escaneo(p_code text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = dk, pg_temp   -- obligatorio: sin esto es escalable por search_path
AS $$
BEGIN
  INSERT INTO escaneos (code, ocurrido_en) VALUES (p_code, now());
END;
$$;

REVOKE ALL ON FUNCTION dk.registrar_escaneo(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION dk.registrar_escaneo(text) TO dk_anon;
```

El `SET search_path` no es opcional. Una función `SECURITY DEFINER` sin él puede ser
secuestrada por un esquema malicioso en el camino de búsqueda, y ejecutarse con los
privilegios del propietario. Es la vía de escalada más común en Postgres.

Nótese que registrar un escaneo lo puede hacer un anónimo —es un QR en una mesa— pero
**solo a través de esa función**: no tiene `INSERT` sobre la tabla, así que no puede
inventarse escaneos de otro restaurante ni falsear fechas.

### 2.4 Las reglas de negocio son restricciones, no validaciones

Todo lo que no puede ser cierto, no debe poder escribirse. Esto es lo que hace que la
regla inamovible se sostenga: aunque alguien salte el front por completo, la base
rechaza lo imposible.

```sql
ALTER TABLE menu_items ADD CONSTRAINT precio_no_negativo CHECK (precio >= 0);
ALTER TABLE restaurantes ADD CONSTRAINT slug_valido CHECK (slug ~ '^[a-z0-9-]{3,40}$');
ALTER TABLE restaurantes ADD CONSTRAINT slug_unico UNIQUE (slug);
ALTER TABLE leads ADD CONSTRAINT email_con_forma CHECK (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$');

-- Los topes de producto por plan, que son una promesa comercial, se hacen cumplir aquí.
CREATE FUNCTION dk.tope_productos() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = dk, pg_temp AS $$
DECLARE v_tope int; v_actual int;
BEGIN
  SELECT CASE plan WHEN 'basico' THEN 50 WHEN 'ampliado' THEN 150 ELSE 0 END
    INTO v_tope FROM restaurantes WHERE id = NEW.restaurante_id;
  SELECT count(*) INTO v_actual FROM menu_items WHERE restaurante_id = NEW.restaurante_id;
  IF v_actual >= v_tope THEN
    RAISE EXCEPTION 'Tope de % productos alcanzado para este plan', v_tope;
  END IF;
  RETURN NEW;
END; $$;
```

Los topes de 50 y 150 productos están publicados como característica del plan. Si solo
se comprueban en la interfaz, son una sugerencia.

### 2.5 Un QR único que no se puede reutilizar

El ticket de evento es el caso donde la persistencia tiene que ser absoluta: si dos
personas entran con el mismo QR, el sistema ha fallado delante del cliente.

```sql
CREATE FUNCTION dk.validar_entrada(p_qr text)
RETURNS TABLE (valida boolean, motivo text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path = dk, pg_temp AS $$
DECLARE v_id uuid; v_estado text;
BEGIN
  SELECT id, estado INTO v_id, v_estado
    FROM event_tickets WHERE qr_code = p_qr
    FOR UPDATE;                         -- bloquea la fila: sin esto, dos lectores simultáneos pasan
  IF v_id IS NULL THEN RETURN QUERY SELECT false, 'inexistente'; RETURN; END IF;
  IF v_estado = 'usada' THEN RETURN QUERY SELECT false, 'ya utilizada'; RETURN; END IF;
  UPDATE event_tickets SET estado = 'usada', usada_en = now() WHERE id = v_id;
  RETURN QUERY SELECT true, 'ok';
END; $$;
```

El `FOR UPDATE` es la diferencia entre un control real y uno aparente: sin él, dos
escaneos simultáneos de la misma captura de pantalla leen ambos "válida" antes de que
ninguno haya escrito "usada", y entran los dos. En la puerta de un evento, con dos
móviles, eso pasa.

### 2.6 Auditoría

Toda operación privilegiada deja rastro, en una tabla en la que **nadie puede
escribir directamente y nadie puede borrar**.

```sql
CREATE TABLE auditoria (
  id bigserial PRIMARY KEY,
  ocurrido_en timestamptz NOT NULL DEFAULT now(),
  identidad uuid,
  accion text NOT NULL,
  detalle jsonb
);
ALTER TABLE auditoria ENABLE ROW LEVEL SECURITY;
-- Sin política de INSERT, UPDATE ni DELETE para ningún rol del despliegue:
-- solo las funciones SECURITY DEFINER escriben aquí.
REVOKE ALL ON auditoria FROM dk_anon, dk_auth;
```

Entra en auditoría, como mínimo: cada exportación de datos personales (V-05), cada
cambio de rol, cada acceso con rol `admin` y cada validación de entrada en puerta.

---

## 3. Identidad

El despliegue no decide quién eres. Recibe un token, lo pasa, y la base lo resuelve.

```sql
CREATE FUNCTION dk.identidad_actual() RETURNS uuid
LANGUAGE sql STABLE AS $$
  SELECT nullif(current_setting('request.jwt.claim.sub', true), '')::uuid;
$$;

CREATE FUNCTION dk.es_admin() RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = dk, pg_temp AS $$
  SELECT EXISTS (
    SELECT 1 FROM identidades
    WHERE id = dk.identidad_actual() AND rol = 'admin' AND activo
  );
$$;
```

Tres propiedades que hay que conservar:

1. **El rol sale de una fila, no de un correo.** Nada de comparar cadenas (V-03).
2. **Se puede revocar.** Poner `activo = false` corta el acceso en la siguiente
   petición, sin desplegar nada.
3. **No hay lista blanca en el código.** Si mañana entra otro administrador, es un
   `UPDATE`, no un commit.

Para el panel interno, además, segundo factor. Un rol que puede exportar datos
personales no se protege solo con contraseña.

---

## 3.bis Dónde vive todo esto (verificado el 20/09/2026)

| Qué | Valor |
|---|---|
| Cuenta Vercel | `klarx94@gmail.com` · usuario `klarx94-architect` |
| Equipo | **`architect-sys-projects`** ("Architect Sys' projects") · `team_h4JhRvWvayMJYeKS0fRwU48u` |
| Plan | Hobby (1 build concurrente) |
| Proyecto | `architect-landing-hosteleria` · `prj_dbMUUwegDIGl0vfGVF2APCjvO8pU` |
| Instalación de marketplace | `icfg_8D37UEjqAk4SVDX0lkiD4neM` |
| **Base de datos** | **`dkitchen-db`** · `withered-scene-00256195` · **`aws-eu-central-1` (Fráncfort)** · Postgres 18.6 |
| Conexión | Solo por HTTPS con `@neondatabase/serverless`. El TCP al 5432 no sale de todos los entornos |

**Por qué Fráncfort y no la región por defecto.** El aprovisionamiento del marketplace
crea la base en `us-east-1` si no se le dice otra cosa, y ahí se creó la primera. Se
rehizo en Fráncfort antes de escribir una sola tabla: la región de un proyecto Neon no
se puede cambiar después, y vamos a guardar nombres, teléfonos y correos de hosteleros
españoles. Tenerlos en Estados Unidos es una transferencia a un tercer país que exige
salvaguardas propias bajo RGPD, y además suma latencia en cada consulta.

Para volver a crearla con región explícita, el campo es obligatorio y se pasa así:

```
vercel integration add neon --installation-id icfg_8D37UEjqAk4SVDX0lkiD4neM \
  --metadata region=fra1 --metadata auth=true --non-interactive
```

Las regiones que acepta el producto son `cle1`, `iad1`, `pdx1`, `fra1`, `lhr1`, `syd1`,
`sin1` y `gru1`. Para España, `fra1`.

Dos cosas a tener presentes:

1. **El equipo de Vercel se llama `architect-sys-projects`.** La marca vieja sigue en
   el nombre y en la URL del panel. Renombrarlo entra en el cutover, junto al dominio
   y al repositorio.
2. **El correo de la cuenta es `klarx94@gmail.com`**, que es exactamente el que estaba
   cableado en las puertas traseras V-02 y V-03. No es casualidad: eran atajos del
   propietario. Conviene recordarlo al montar la identidad en Neon, para no repetir el
   patrón de "mi correo es el administrador".

## 4. Secretos

| Secreto | Dónde | Reducción de daño |
|---|---|---|
| Cadena de conexión Neon | Variable de entorno del despliegue | Rol sin privilegios; toda la autoridad en políticas |
| Clave de envío de correo | Variable de entorno del despliegue | Servicio transaccional, no Gmail; restringida a un dominio; revocable sola (V-11) |
| `GEMINI_API_KEY` | Variable de entorno del despliegue | Tope de gasto en Google Cloud + límite de frecuencia (V-12) |
| Claves de pasarela del cliente | **En Neon, cifradas** | Nunca en el despliegue: son de terceros |

La última fila es la más delicada del proyecto. Cada evento de Experience se cobra en
la cuenta del **propio local**. Esas credenciales no son nuestras, y guardarlas en el
entorno del despliegue significaría que un compromiso nuestro compromete el dinero de
nuestros clientes.

Van cifradas en Neon, y el despliegue jamás las lee: la landing del evento pide a una
función que devuelva **una sesión de pago ya creada**, no la clave. Si alguien roba el
despliegue entero, no se lleva ni una credencial de cobro ajena.

Ninguno de estos valores se escribe en el repositorio, ni en un `.md`, ni en un
comentario. El token de Vercel usado en esta migración se rota al terminar.

---

## 5. Cómo aterrizan aquí las piezas que faltan

### 5.1 Captación de leads

Hoy `/api/lead` manda un correo y no guarda nada. Si el correo falla, el lead se
pierde sin dejar rastro, y no hay forma de saber cuántos se perdieron.

Pasa a: insertar en `leads` mediante función (validando forma, con límite de
frecuencia por IP y por correo), y **después** notificar. La notificación puede
fallar; el lead ya está guardado. Eso también resuelve V-16.

### 5.2 Motor de QR de carta

El QR codifica `dkitchencorporate.es/r/{code}`. La resolución hace tres cosas en una
transacción: registrar el escaneo (§2.3), resolver el destino vigente, redirigir.

El escaneo es lo que alimenta el umbral de 600/mes del marco Sostener/Evolucionar/
Soltar. Como decide la relación comercial con el cliente, **tiene que ser un dato de
la base, no una métrica del despliegue**: no puede depender de que un log se haya
conservado.

La disponibilidad de ese endpoint es crítica: si cae, dejan de funcionar todos los QR
impresos de todos los clientes a la vez. Es un punto único de fallo aceptado a cambio
de la promesa de "imprime una vez", y como tal necesita vigilancia activa.

### 5.3 Checkout del QR Menú

Único cobro propio de DKitchen. El webhook de confirmación aprovisiona cliente, menú
y QR **en una sola transacción**: o existe todo, o no existe nada. Un cliente que ha
pagado y se queda a medias es peor que uno que no ha podido pagar.

El webhook verifica la firma del proveedor antes de tocar la base. Un webhook de pago
sin verificación de firma es un endpoint que regala altas.

---

## 6. Antihacking

### 6.1 Inyección SQL
Consultas siempre parametrizadas; nunca concatenación. Con RLS activo, además, una
inyección que se colara seguiría topando con las políticas: dos capas, no una.

### 6.2 Escalada de privilegios
Cubierta por `SET search_path` en cada `SECURITY DEFINER` (§2.3), por `FORCE ROW LEVEL
SECURITY` (§2.2) y por el `REVOKE` inicial sobre `PUBLIC` (§2.1).

### 6.3 Abuso y coste
Contador de frecuencia **en Neon**, no en memoria del despliegue: las funciones de
Vercel son efímeras y se reparten entre instancias, así que un límite en memoria no
limita nada. Techos distintos por ruta: `/api/lead` y las rutas de IA son las caras.

### 6.4 Enumeración
Los identificadores públicos (`slug`, código de QR, id de ticket) son aleatorios y no
secuenciales. Un código correlativo permite recorrer el catálogo entero de clientes.

### 6.5 Exposición de superficie
`/dashboard`, `/admin-architect` y `/manuals` exigen sesión (V-08, V-09). Además,
`noindex` — pero el `noindex` es higiene, no control de acceso.

### 6.6 Copias de seguridad
Retención y restauración probadas. Una copia que nunca se ha restaurado no es una
copia, es una suposición.

---

## 6.bis Decisiones aplazadas a propósito

No son olvidos: se han valorado y se ha decidido no hacerlas todavía.

### Inicio de sesión con Google y Apple

BetterAuth viene habilitado en el proyecto de Neon, pero los botones de Google y Apple
quedan **para más adelante**. La razón es que hoy no hay a quién autenticar: el único
flujo que crearía cuentas es el checkout del QR Menú, y mientras el alta se haga a mano
no hacen falta proveedores externos.

Cuando toque, hay que tener en cuenta que las credenciales solo las puede emitir el
titular de las cuentas:

- **Google** — cliente OAuth 2.0 en Google Cloud Console: *Client ID* y *Client Secret*.
- **Apple** — Apple Developer, que es de pago (99 $/año): *Services ID*, *Team ID*,
  *Key ID* y el archivo de clave `.p8`.

Sin esos datos no se puede configurar nada del lado de la aplicación.

### Alta de cuentas en el checkout del QR

El peldaño de QR Menú se diseñó como autoservicio: el visitante paga 1 € y el sistema
aprovisiona cuenta, menú y QR sin intervención humana. **De momento el alta se hace a
mano, siempre.**

Tiene sentido mientras el volumen sea bajo: cada alta manual es una conversación con el
cliente, y el aprovisionamiento automático es la pieza de mayor complejidad técnica de
todo el peldaño (checkout, webhook con verificación de firma, transacción única que
crea cuenta, menú y QR o no crea nada). Automatizarlo antes de tener demanda sería
construir la parte cara sin haber validado la barata.

Cuando se automatice, el punto crítico está en la Sección 5.3: un cliente que ha pagado
y se queda a medio aprovisionar es peor que uno que no ha podido pagar.

## 7. Antes de que entre el primer cliente real

Nada de esto se carga con datos reales hasta que estén los ocho puntos:

- [x] `REVOKE ALL ON SCHEMA public FROM PUBLIC` ejecutado y verificado
- [x] RLS activo y **forzado** en todas las tablas con datos
- [x] El despliegue conecta con un rol sin privilegios, nunca con el propietario
- [ ] `/dashboard` y `/admin-architect` cerrados con sesión (V-09)
- [x] Exportación de datos personales: **neutralizada**, no habilitada (V-05)
- [x] Límite de frecuencia operativo en la única ruta de correo viva (V-13)
- [ ] Credenciales de correo migradas fuera de Gmail (V-11)
- [x] Geolocalización resuelta sin terceros (V-10)

Sobre los dos que siguen abiertos, para que no se lean como olvidos:

- **V-09** depende de que exista sesión, y la sesión depende de BetterAuth, que se
  configura cuando haya a quién autenticar (Sección 6.bis). Mientras tanto esas
  pantallas no muestran datos: `data-source.ts` devuelve colecciones vacías, así que
  lo que queda expuesto es la maqueta, no información de nadie. Sigue siendo un
  punto a cerrar antes del primer cliente, no antes del primer despliegue.
- **V-11** no lo puede hacer el código: exige dar de alta un proveedor de correo
  transaccional y retirar la contraseña de aplicación de Gmail. Es una decisión y un
  alta de servicio, ambas del titular de la cuenta.

- [x] **Prueba final**, y es la que de verdad cierra el asunto: coger la cadena de
  conexión del despliegue, abrirla desde fuera, y comprobar que **no se puede leer
  ni una fila de un cliente**.

Esa prueba ya no es un párrafo: es código que se ejecuta.

```
npm run db:verificar <entorno-propietario> <entorno-aplicación>
```

La última sección de `db/verificar-blindaje.mjs` abre literalmente la cadena que
tiene el despliegue y comprueba, tabla por tabla, que no responde. El 20/09/2026
sobre `main`: **43 comprobaciones, 0 fallidas**.

---

## 8. El blindaje, tal como está ejecutado

Esta sección describe lo que hay puesto, no lo que se pretende poner.

### 8.1 Qué se aplicó y dónde

Cuatro migraciones, en `db/migrations/`, aplicadas primero sobre una rama de prueba
creada desde `main` y solo después sobre `main`:

| Archivo | Qué instala |
|---|---|
| `0001_fundacion.sql` | Cierra el acceso que Postgres da a `PUBLIC` por defecto, crea el esquema `dk` y los roles `dk_anon` y `dk_auth` |
| `0002_identidad_auditoria.sql` | `dk.identidad_actual()`, tabla `identidades`, `dk.es_admin()` y la auditoría que nadie puede modificar |
| `0003_motor_qr.sql` | Restaurantes, carta, códigos y escaneos, con sus políticas y el tope de productos como restricción |
| `0004_rol_aplicacion.sql` | `dk_app`, el rol con el que se conecta el despliegue |

`db/migrate.mjs` las aplica en orden, una transacción por archivo, y lleva registro
en `dk_migraciones`: repetir la ejecución no hace daño.

### 8.2 Por qué `dk_app` existe

Es la pieza que sostiene la regla inamovible, y conviene entender la trampa que evita.

La integración de Neon inyecta en Vercel quince variables (`DATABASE_URL`,
`POSTGRES_URL`, `PGPASSWORD`…) que llevan la credencial de `neondb_owner`. Ese rol
tiene `BYPASSRLS`. **Con él, todas las políticas de este documento serían adorno.**
Es exactamente el papel que hacía `SUPABASE_SERVICE_KEY` en la etapa anterior, y el
motivo de que aparezca como V-17.

Así que la aplicación no usa ninguna de esas quince. Usa `DK_DATABASE_URL`, que
apunta a `dk_app`: sin `BYPASSRLS`, sin superusuario y —esto es lo importante— con
`NOINHERIT`. Recién conectado, `dk_app` **no puede leer una sola fila de ninguna
tabla**. Para hacer algo tiene que declarar con qué sombrero, dentro de la
transacción:

```sql
BEGIN;
SET LOCAL ROLE dk_anon;              -- el visitante que escanea un QR
...

BEGIN;
SELECT auth.jwt_session_init($1);    -- Postgres verifica la firma, no nosotros
SET LOCAL ROLE dk_auth;              -- el cliente con sesión demostrada
...
```

Olvidar esa línea no abre nada: deja la consulta sin permisos y falla. **El error por
omisión es denegar**, que es la única forma segura de equivocarse.

`LOCAL` no es decorativo: la conexión viene de PgBouncer en modo transacción, donde
el estado de sesión se comparte entre peticiones. `LOCAL` hace que el rol muera con
la transacción y no viaje a la petición siguiente.

La contraseña de `dk_app` la genera `db/crear-credencial-app.mjs`, que la escribe una
sola vez fuera del repositorio y se niega a escribirla si el rol resulta tener
privilegios que no debería. No está en ningún archivo versionado. Si se pierde, se
vuelve a ejecutar y se rota.

### 8.3 Tres cosas que impiden que esto se deshaga solo

Un blindaje que depende de que nadie se equivoque no es un blindaje.

**La guardia de credenciales** (`scripts/guardia-credenciales.mjs`) se ejecuta en
`prebuild`. Si alguien escribe `process.env.DATABASE_URL` en `src/`, **el despliegue
falla antes de existir**. Cubre también los restos de la etapa anterior: Supabase,
Gemini, Groq, Whop, Kommo, Woztell y Meta. Nombrar una variable en un comentario es
legítimo; leerla del entorno, no.

**Una sola puerta.** `src/lib/db.ts` es el único módulo del proyecto que abre una
conexión, y no exporta el pool: exporta `comoVisitante()` y `comoCliente(jwt)`. No hay
forma de consultar la base sin pasar por un rol declarado. Además comprueba al
arrancar que la cadena no apunta al propietario, por si la variable se cambiara a mano.

**La suite se ejecuta, no se lee.** `db/verificar-blindaje.mjs` no inspecciona el SQL:
siembra datos, adopta los roles y observa qué pasa. Comprueba por barrido que *toda*
tabla tiene RLS forzado y que *toda* función `SECURITY DEFINER` fija su `search_path`
—la vía clásica de escalada—, de modo que una tabla nueva sin blindar la delata el
barrido, no la memoria de quien revise. Se limpia al empezar y al terminar, así que
puede lanzarse contra `main` sin dejar rastro.

### 8.4 Cabeceras del borde

`next.config.js` envía CSP, HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`,
`Permissions-Policy` y las dos cabeceras de aislamiento entre orígenes.

Importa el orden de las capas: de poco sirve lo bien cerradas que estén las políticas
por fila si un tercero puede incrustar el panel en un iframe y hacer clic por encima
del usuario, o inyectar un script que use la sesión legítima de quien está delante.

`connect-src 'self'` merece una nota: la base de datos se consulta **siempre** desde
el servidor. Si algún día aparece un dominio de Neon en esa lista, es que algo se ha
cableado por el lado equivocado, y la cabecera lo convierte en un fallo visible.

Deuda consciente, anotada para que no se olvide: `script-src` aún admite
`'unsafe-inline'`, que Next.js necesita para la hidratación. Retirarlo exige nonces
por petición, y eso obliga a mover las páginas a renderizado dinámico. Se hará; no
es un descuido.

### 8.5 Estado de la conexión

| Dato | Valor |
|---|---|
| Proyecto Neon | `dkitchen-db` · `withered-scene-00256195` |
| Región | `aws-eu-central-1` (Fráncfort) |
| Postgres | 18.6 |
| Rol de la aplicación | `dk_app` · sin `BYPASSRLS` · `NOINHERIT` |
| Variable en Vercel | `DK_DATABASE_URL` (producción, preview y desarrollo) |
| Rol del propietario | `neondb_owner` · reservado para migraciones, nunca para la aplicación |

Queda viva la rama de pruebas `prueba-esquema` (`br-red-wave-b2s6nuo6`). No tiene
datos, pero sí un compute que consume cuota: se puede borrar cuando quieras.
