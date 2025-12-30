
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, CONCISE_SYSTEM_INSTRUCTION, LABIBA_SYSTEM_INSTRUCTION } from "../constants.tsx";
import { getLocalResponseStream } from "../localBrain.ts";

/**
 * Streams AI responses using Gemini 3 Flash.
 * Falls back to localBrain if API key is missing or on error.
 */
export const streamWithAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isConciseMode: boolean = false,
  isLabibaMode: boolean = false
) {
  const hasApiKey = typeof process !== 'undefined' && !!process.env.API_KEY;
  
  // Detect if Labiba is newly identifying or was already identified
  const isLabiba = isLabibaMode || 
                   message.toLowerCase().includes("i am labiba") || 
                   message.toLowerCase().includes("moi labiba");

  if (!hasApiKey) {
    yield* getLocalResponseStream(message, isLabiba);
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let instruction = isConciseMode ? CONCISE_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;
  
  if (isLabiba) {
    instruction = LABIBA_SYSTEM_INSTRUCTION;
  }

  const contents = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .slice(-10)
    .map(h => ({
      role: h.role,
      parts: [{ text: h.parts[0].text }]
    }));

  contents.push({
    role: "user",
    parts: [{ text: message }]
  });

  try {
    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction: instruction,
        temperature: isLabiba ? 0.7 : 1.0, 
        topP: 0.95,
        maxOutputTokens: 250, 
        tools: [{ googleSearch: {} }],
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    let hasProducedText = false;
    for await (const chunk of streamResponse) {
      if (chunk.text) {
        hasProducedText = true;
        yield chunk.text;
      }
    }

    if (!hasProducedText) {
      yield* getLocalResponseStream(message, isLabiba);
    }

  } catch (error: any) {
    console.error("API Error - falling back to Local Brain:", error);
    yield* getLocalResponseStream(message, isLabiba);
  }
};
