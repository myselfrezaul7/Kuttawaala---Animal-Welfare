import { GoogleGenAI } from "@google/genai";
import type { ChatMessage } from '../types';

// Safety check for process.env in purely browser environments
const apiKey = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : '';

// Initialize AI lazily or handle the missing key gracefuly inside functions
const ai = apiKey ? new GoogleGenAI({ apiKey: apiKey }) : null;

if (!apiKey) {
  console.warn("API_KEY environment variable is not set. AI features will be disabled or return mock responses.");
}

const SYSTEM_INSTRUCTION_EN = `You are an AI Vet for KUTTAWAALA, an animal welfare organization. Your purpose is to provide general guidance and first-aid information ONLY.
Always start every single response with this exact disclaimer, on its own line: '***Disclaimer: I am an AI Vet and not a substitute for professional veterinary advice. This information is for general guidance and first-aid purposes only. ALWAYS consult a licensed, in-person veterinarian for any health concerns or emergencies.***'

Your primary functions are:
1.  Provide helpful, general advice on pet care and basic first-aid steps in English. Do not provide any diagnosis or prescribe medication. Keep your answers concise and easy to understand.
2.  If a user asks for a checklist for a new pet (e.g., "what do I need for a new puppy?"), you MUST generate a comprehensive checklist formatted with markdown. The checklist should be organized into three sections with these exact titles:
    - ### 🛍️ Shopping List
    - ### ✅ To-Do List
    - ### 🏡 First Week Tips
    Use bullet points (-) for each item within these sections.`;

const SYSTEM_INSTRUCTION_BN = `আপনি KUTTAWAALA নামক একটি পশু কল্যাণ সংস্থার AI Vet। আপনার উদ্দেশ্য শুধুমাত্র সাধারণ নির্দেশনা এবং প্রাথমিক চিকিৎসার তথ্য প্রদান করা।
সর্বদা প্রতিটি উত্তরের শুরুতে এই দাবিত্যাগটি হুবহু একটি নতুন লাইনে লিখবেন: '***দাবিত্যাগ: আমি একজন AI Vet এবং পেশাদার ভেটেরিনারি পরামর্শের বিকল্প নই। এই তথ্য শুধুমাত্র সাধারণ নির্দেশনা এবং প্রাথমিক চিকিৎসার উদ্দেশ্যে। যেকোনো স্বাস্থ্য উদ্বেগ বা জরুরি অবস্থার জন্য সর্বদা একজন লাইসেন্সপ্রাপ্ত, ব্যক্তিগত পশুচিকিৎসকের সাথে পরামর্শ করুন।***'

আপনার প্রধান কাজগুলো হলো:
1.  পশুদের যত্ন এবং প্রাথমিক চিকিৎসার ধাপগুলো সম্পর্কে সহায়ক, সাধারণ পরামর্শ বাংলায় দিন। কোনো রোগ নির্ণয় বা ঔষধ লিখে দেবেন না। আপনার উত্তরগুলো সংক্ষিপ্ত এবং সহজে বোধগম্য রাখুন।
2.  যদি কোনো ব্যবহারকারী নতুন পোষা প্রাণীর জন্য একটি চেকলিস্ট চায় (যেমন, "নতুন কুকুরছানার জন্য আমার কী কী প্রয়োজন?"), আপনাকে অবশ্যই মার্কডাউন ফরম্যাটে একটি விரிவான চেকলিস্ট তৈরি করতে হবে। চেকলিস্টটি এই তিনটি শিরোনামের অধীনে সংগঠিত হওয়া উচিত:
    - ### 🛍️ কেনাকাটার তালিকা
    - ### ✅ করণীয় তালিকা
    - ### 🏡 প্রথম সপ্তাহের টিপস
    এই বিভাগগুলোর মধ্যে প্রতিটি আইটেমের জন্য বুলেট পয়েন্ট (-) ব্যবহার করুন।`;


const buildGeminiContent = (history: ChatMessage[]) => {
    return history.map(message => ({
      role: message.sender === 'ai' ? 'model' : 'user',
      parts: [{ text: message.text }],
    }));
};

const fileToPart = async (file: File) => {
    return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            resolve({
                inlineData: {
                    data: base64String,
                    mimeType: file.type
                }
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

export const getVetAssistantResponseStream = async function* (history: ChatMessage[], language: 'en' | 'bn') {
  if (!ai) {
      yield language === 'bn' 
        ? "API কী কনফিগার করা হয়নি। দয়া করে প্রশাসকের সাথে যোগাযোগ করুন।"
        : "API Key is not configured. Please contact the administrator.";
      return;
  }
  
  try {
    const contents = buildGeminiContent(history);
    const systemInstruction = language === 'bn' ? SYSTEM_INSTRUCTION_BN : SYSTEM_INSTRUCTION_EN;

    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-pro-preview',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    for await (const chunk of responseStream) {
        if(chunk.text) {
            yield chunk.text;
        }
    }

  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    if (error instanceof Error && error.message.includes('API key not valid')) {
        yield language === 'bn' 
            ? "দুঃখিত, অ্যাপ্লিকেশন কনফিগারেশনে একটি সমস্যা হয়েছে বলে মনে হচ্ছে। দয়া করে সাইট প্রশাসকের সাথে যোগাযোগ করুন।"
            : "I'm sorry, but there seems to be an issue with the application configuration. Please contact the site administrator.";
    } else {
        yield language === 'bn'
            ? "দুঃখিত, আপনার অনুরোধ প্রক্রিয়া করার সময় একটি ত্রুটি ঘটেছে। এটি একটি নেটওয়ার্ক সমস্যার কারণে হতে পারে। দয়া করে আপনার ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"
            : "I'm sorry, but an error occurred while processing your request. This could be due to a network issue. Please check your internet connection and try again.";
    }
  }
};

export const analyzeImageForReport = async (file: File) => {
    if (!ai) throw new Error("API Key missing");

    try {
        const imagePart = await fileToPart(file);
        
        const prompt = `Analyze this image for an animal rescue report. 
        Identify the animal type (e.g., Dog, Cat, Bird, Other) and briefly describe its visible physical condition or injuries.
        Return the result in JSON format with keys: "animalType" and "condition".`;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: {
                parts: [
                    imagePart,
                    { text: prompt }
                ]
            },
            config: {
                responseMimeType: 'application/json'
            }
        });

        return response.text || "{}";
    } catch (error) {
        console.error("Error analyzing image:", error);
        throw new Error("Failed to analyze image with AI.");
    }
};