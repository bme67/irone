
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, LABIBA_SYSTEM_INSTRUCTION } from "../constants.tsx";
import { getLocalResponseStream } from "../localBrain.ts";

export const streamWithAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isLabibaMode: boolean = false
) {
  const apiKey = process.env.API_KEY;
  const labibaKeywords = [
    "i am labiba", 
    "moi labiba", 
    "it's labiba", 
    "queen labiba", 
    "labiba nushan",
    "i'm labiba",
    "labiba name",
    "my name is labiba"
  ];
  
  const isNowLabiba = isLabibaMode || labibaKeywords.some(k => message.toLowerCase().includes(k));

  if (!apiKey) {
    console.warn("API_KEY missing, falling back to local brain.");
    yield* getLocalResponseStream(message, isNowLabiba);
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  const instruction = isNowLabiba ? LABIBA_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  const contents: any[] = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .slice(-6) // Maintain a concise history for faster responses
    .map(h => ({
      role: h.role,
      parts: [{ text: h.parts[0].text }]
    }));

  contents.push({ role: "user", parts: [{ text: message }] });

  try {
    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview", 
      contents: contents,
      config: {
        systemInstruction: instruction,
        temperature: isNowLabiba ? 0.7 : 1.0, 
        topP: 0.95,
        topK: 40,
      },
    });

    let hasText = false;
    for await (const chunk of streamResponse) {
      const text = chunk.text;
      if (text) {
        hasText = true;
        yield text;
      }
    }

    if (!hasText) {
      throw new Error("Empty response from Gemini API");
    }

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    // Silent fallback to local brain for better UX
    yield* getLocalResponseStream(message, isNowLabiba);
  }
};
