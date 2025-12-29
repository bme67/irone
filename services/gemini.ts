
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, UNFILTERED_SYSTEM_INSTRUCTION } from "../constants.tsx";

export const streamWithSavageAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isSavageMode: boolean = false
) {
  // Use the pre-configured process.env.API_KEY directly as required by the environment
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const instruction = isSavageMode ? UNFILTERED_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  try {
    const streamResponse = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: instruction,
        temperature: isSavageMode ? 1.0 : 0.8,
        topP: 0.95,
        // Disable thinking for ultra-fast "savage" latency
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    for await (const chunk of streamResponse) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    // Log error for developers to debug in Vercel/Browser console
    console.error("Irone AI Error:", error);
    throw error;
  }
};
