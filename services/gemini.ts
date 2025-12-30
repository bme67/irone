
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, CONCISE_SYSTEM_INSTRUCTION, LABIBA_SYSTEM_INSTRUCTION } from "../constants.tsx";
import { getLocalResponseStream } from "../localBrain.ts";

export const streamWithAI = async function* (
  message: string,
  // Added array brackets to type history as an array of objects to fix parameter assignment and filter method errors
  history: { role: string; parts: { text: string }[] }[] = [],
  isConciseMode: boolean = false,
  isLabibaMode: boolean = false
) {
  const hasApiKey = typeof process !== 'undefined' && !!process.env.API_KEY;
  
  // Re-verify Labiba mode
  const labibaKeywords = ["i am labiba", "moi labiba", "labiba nushan"];
  const isNowLabiba = isLabibaMode || labibaKeywords.some(k => message.toLowerCase().includes(k));

  if (!hasApiKey) {
    yield* getLocalResponseStream(message, isNowLabiba);
    return;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  let instruction = isConciseMode ? CONCISE_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;
  if (isNowLabiba) {
    instruction = LABIBA_SYSTEM_INSTRUCTION;
  }

  // history is now correctly typed as an array, so filter and slice are available
  const contents = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .slice(-15)
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
        temperature: isNowLabiba ? 0.7 : 1.2, // More savage for normal users
        topP: 0.95,
        // Removed maxOutputTokens as it is recommended to avoid it or set a thinkingBudget on Gemini 3 models to prevent empty responses
        tools: [{ googleSearch: {} }],
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
      yield* getLocalResponseStream(message, isNowLabiba);
    }

  } catch (error: any) {
    console.error("API Error:", error);
    yield* getLocalResponseStream(message, isNowLabiba);
  }
};
