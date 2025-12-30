
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, LABIBA_SYSTEM_INSTRUCTION } from "../constants.tsx";
import { getLocalResponseStream } from "../localBrain.ts";

export const streamWithAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isLabibaMode: boolean = false
) {
  const hasApiKey = typeof process !== 'undefined' && !!process.env.API_KEY;
  const labibaKeywords = ["i am labiba", "moi labiba", "labiba nushan", "it's labiba", "queen labiba"];
  const isNowLabiba = isLabibaMode || labibaKeywords.some(k => message.toLowerCase().includes(k));

  if (!hasApiKey) {
    yield* getLocalResponseStream(message, isNowLabiba);
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let instruction = isNowLabiba ? LABIBA_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  const contents: any[] = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .slice(-10)
    .map(h => ({
      role: h.role,
      parts: [{ text: h.parts[0].text }]
    }));

  contents.push({ role: "user", parts: [{ text: message }] });

  try {
    const streamResponse = await ai.models.generateContentStream({
      // Using gemini-flash-lite-latest as it offers the highest rate limits 
      // and is most suitable for free-tier/credit-sensitive hosting.
      model: "gemini-flash-lite-latest", 
      contents: contents,
      config: {
        systemInstruction: instruction,
        temperature: isNowLabiba ? 0.7 : 0.9,
        topP: 0.95,
        tools: [{ googleSearch: {} }],
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
