
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, UNFILTERED_SYSTEM_INSTRUCTION } from "../constants.tsx";
import { getLocalResponseStream } from "../localBrain.ts";

export const streamWithSavageAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isSavageMode: boolean = false
) {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  
  // If no API Key, use local brain immediately with current message for intent detection
  if (!apiKey) {
    console.warn("No API Key found. Using Local Brain.");
    yield* getLocalResponseStream(message);
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  const instruction = isSavageMode ? UNFILTERED_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  const contents = history
    .filter(h => h.role === 'user' || h.role === 'model')
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
        temperature: 1.0,
        topP: 0.95,
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
    console.error("API Failed, falling back to Local Brain:", error);
    yield* getLocalResponseStream(message);
  }
};
