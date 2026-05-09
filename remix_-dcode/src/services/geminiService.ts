import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || '' 
});

export async function askDragon(prompt: string, context: string = "") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `Eres DCODE, un dragón sabio y amigable experto en programación. 
        Tu misión es guiar a aprendices (desde niños hasta adultos) en el mundo del código.
        Habla de forma motivadora, usa metáforas de dragones y tesoros. 
        Si el usuario tiene un error, no le des la respuesta directamente, dale pistas para que lo descubra solo.
        Responde siempre en español.
        
        Contexto actual del usuario: ${context}`,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "¡Vaya! Mis llamas de sabiduría están parpadeando. Inténtalo de nuevo en un momento, pequeño aprendiz.";
  }
}
