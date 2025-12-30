
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, UNFILTERED_SYSTEM_INSTRUCTION } from "../constants.tsx";
import { getLocalResponseStream } from "../localBrain.ts";

export const streamWithSavageAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isSavageMode: boolean = false
) {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  
  if (!apiKey) {
    yield* getLocalResponseStream(message);
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  const instruction = isSavageMode ? UNFILTERED_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  // Maintaining context for real understanding
  const contents = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .slice(-8) // Slightly larger window for better contextual roasts
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
        temperature: 1.3, // Higher entropy for more "street-level" variety
        topP: 0.98,
        maxOutputTokens: 250,
        tools: [{ googleSearch: {} }], // Real-time grounding for the "not for kids" intelligence
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
      yield* getLocalResponseStream(message);
    }

  } catch (error: any) {
    console.error("API Error - likely Safety Block or Key issue. Falling back:", error);
    yield* getLocalResponseStream(message);
  }
};
