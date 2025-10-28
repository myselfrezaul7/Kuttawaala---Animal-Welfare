import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are an AI Vet Assistant for KUTTAWAALA, an animal welfare organization. Provide helpful, general advice on pet care. Always start your response with a disclaimer: 'Disclaimer: I am an AI assistant and not a substitute for professional veterinary advice. Please consult a licensed veterinarian for any health concerns.' Do not provide any diagnosis or prescribe medication. Keep your answers concise and easy to understand for a general audience.`;

export const getVetAssistantResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    return "I'm sorry, but I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};
