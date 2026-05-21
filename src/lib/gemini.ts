/**
 * src/lib/gemini.ts
 * Motor de IA Híbrido: Soporta tanto Gemini (Google) como Groq (Meta Llama 3).
 * Para usar Groq en Vercel, asegúrate de configurar la variable de entorno USE_GROQ="true"
 * y GROQ_API_KEY en tu panel de Vercel. Si no, usará Gemini por defecto.
 */

export async function generateGeminiContent(prompt: string, jsonMode: boolean = false) {
  const useGroq = process.env.USE_GROQ === 'true';

  if (useGroq) {
    return await generateWithGroq(prompt, jsonMode);
  } else {
    return await generateWithGoogle(prompt, jsonMode);
  }
}

async function generateWithGroq(prompt: string, jsonMode: boolean = false) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY no configurada en Vercel.");

  const model = "llama-3.3-70b-versatile"; 
  const url = `https://api.groq.com/openai/v1/chat/completions`;

  let retries = 2;
  while (retries >= 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 4096,
          response_format: jsonMode ? { type: "json_object" } : { type: "text" }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json();
        if (response.status === 429) throw new Error("RATE_LIMIT_EXCEEDED");
        if (response.status === 503 && retries > 0) {
            retries--;
            await new Promise(res => setTimeout(res, 2000));
            continue;
        }
        throw new Error(`Groq API Error: ${response.status} - ${JSON.stringify(errorBody)}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || "";
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.message === "RATE_LIMIT_EXCEEDED") {
          throw new Error("Límite de peticiones de Groq superado (Error 429).");
      }
      if (error.name === 'AbortError' && retries > 0) {
        retries--;
        await new Promise(res => setTimeout(res, 1500));
        continue;
      }
      if (retries === 0 || (error.name !== 'AbortError' && !error.message?.includes('503'))) {
         throw error;
      }
    }
  }
  throw new Error("Timeout con la API de Groq en Vercel.");
}

async function generateWithGoogle(prompt: string, jsonMode: boolean = false) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY no configurada.");

  const model = "gemini-flash-latest"; 
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  let retries = 2;
  while (retries >= 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            response_mime_type: jsonMode ? "application/json" : "text/plain",
            temperature: 0.7,
            max_output_tokens: 4096,
          }
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json();
        if (response.status === 503 && retries > 0) {
            retries--;
            await new Promise(res => setTimeout(res, 2000));
            continue;
        }
        if (response.status === 429) throw new Error("RATE_LIMIT_EXCEEDED");
        throw new Error(`Google AI Error: ${response.status} - ${JSON.stringify(errorBody)}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    } catch (error: any) {
      clearTimeout(timeoutId);
      if (error.message === "RATE_LIMIT_EXCEEDED") {
          throw new Error("Límite de peticiones de Google superado.");
      }
      if (error.name === 'AbortError' && retries > 0) {
        retries--;
        await new Promise(res => setTimeout(res, 1500));
        continue;
      }
      if (retries === 0 || (error.name !== 'AbortError' && !error.message?.includes('503'))) {
         throw error;
      }
    }
  }
  throw new Error("Timeout con la API de Gemini.");
}
