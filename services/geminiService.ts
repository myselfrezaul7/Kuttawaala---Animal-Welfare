import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are an AI Vet for KUTTAWAALA, an animal welfare organization. Your purpose is to provide general guidance and first-aid information ONLY.
Always start every single response with this exact disclaimer, on its own line: '***Disclaimer: I am an AI Vet and not a substitute for professional veterinary advice. This information is for general guidance and first-aid purposes only. ALWAYS consult a licensed, in-person veterinarian for any health concerns or emergencies.***'

Your primary functions are:
1.  Provide helpful, general advice on pet care and basic first-aid steps. Do not provide any diagnosis or prescribe medication. Keep your answers concise and easy to understand.
2.  If a user asks for a checklist for a new pet (e.g., "what do I need for a new puppy?"), you MUST generate a comprehensive checklist formatted with markdown. The checklist should be organized into three sections with these exact titles:
    - ### 🛍️ Shopping List
    - ### ✅ To-Do List
    - ### 🏡 First Week Tips
    Use bullet points (-) for each item within these sections.`;

const buildGeminiContent = (history: ChatMessage[]) => {
    return history.map(message => ({
      role: message.sender === 'ai' ? 'model' : 'user',
      parts: [{ text: message.text }],
    }));
};

export const getVetAssistantResponse = async (history: ChatMessage[]): Promise<string> => {
  try {
    const contents = buildGeminiContent(history);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        return "I'm sorry, but there seems to be an issue with the application configuration. Please contact the site administrator.";
    }
    // Provide a more generic, user-friendly error message.
    return "I'm sorry, but an error occurred while processing your request. This could be due to a network issue. Please check your internet connection and try again.";
  }
};
