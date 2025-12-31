
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
    "it's labiba", 
    "queen labiba", 
    "labiba nushan",
    "i'm labiba",
    "labiba name",
    "my name is labiba"
  ];
  
  const isNowLabiba = isLabibaMode || labibaKeywords.some(k => message.toLowerCase().includes(k));

  if (!hasApiKey) {
    yield* getLocalResponseStream(message, isNowLabiba);
    return;
  }

  // Initializing with the latest Gemini 2.5 Flash model which offers excellent performance on free tiers
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  let instruction = isNowLabiba ? LABIBA_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  // Enhance the instruction with mandatory constraints for the "brain"
  instruction += "\nCRITICAL: YOUR RESPONSE MUST NOT EXCEED 5 LINES. YOU MUST PROVIDE THE REQUESTED INFORMATION FIRST, THEN ROAST THE USER USING LOCAL SLURS (GALIES).";

  // Maintain last 8 exchanges for context
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
      model: "gemini-2.5-flash", 
      contents: contents,
      config: {
        systemInstruction: instruction,
        temperature: isNowLabiba ? 0.7 : 1.1, // Higher temperature for more chaotic roasts
        topP: 0.95,
        topK: 40,
        // Using thinking budget of 0 for faster, more impulsive "human" responses
        thinkingConfig: { thinkingBudget: 0 }
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
