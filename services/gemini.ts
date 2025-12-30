
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, LABIBA_SYSTEM_INSTRUCTION } from "../constants.tsx";
import { getLocalResponseStream } from "../localBrain.ts";

export const streamWithAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isLabibaMode: boolean = false
) {
  const hasApiKey = typeof process !== 'undefined' && !!process.env.API_KEY;
  const labibaKeywords = [
    "i am labiba", 
    "moi labiba", 
    "labiba nushan", 
    "it's labiba", 
    "queen labiba", 
    "i'm labiba",
    "labiba name",
    "name is labiba"
  ];
  
  // Update labiba status based on current input
  const isNowLabiba = isLabibaMode || labibaKeywords.some(k => message.toLowerCase().includes(k));

  if (!hasApiKey) {
    yield* getLocalResponseStream(message, isNowLabiba);
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let instruction = isNowLabiba ? LABIBA_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  // Use a shallow history to keep tokens high but personality sharp
  const contents: any[] = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .slice(-8)
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
        temperature: isNowLabiba ? 0.7 : 1.0, // More temperature for more "savage" randomness
        topP: 0.95,
        // Optional search grounding if the model thinks it needs current context for a roast
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 } // No thinking needed for raw speed and insults
      },
    });

    let hasProducedText = false;
    try {
      for await (const chunk of streamResponse) {
        if (chunk.text) {
          hasProducedText = true;
          yield chunk.text;
        }
      }
    } catch (streamError: any) {
      console.warn("Stream interrupted:", streamError);
      if (!hasProducedText) yield* getLocalResponseStream(message, isNowLabiba);
    }

    if (!hasProducedText) {
      yield* getLocalResponseStream(message, isNowLabiba);
    }

  } catch (error: any) {
    console.error("API Error:", error);
    yield* getLocalResponseStream(message, isNowLabiba);
  }
};
