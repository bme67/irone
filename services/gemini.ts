
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, UNFILTERED_SYSTEM_INSTRUCTION } from "../constants";

export const streamWithSavageAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isSavageMode: boolean = false
) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  const instruction = isSavageMode ? UNFILTERED_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  const streamResponse = await ai.models.generateContentStream({
    model: "gemini-3-pro-preview",
    contents: [
      ...history,
      { role: "user", parts: [{ text: message }] }
    ],
    config: {
      systemInstruction: instruction,
      temperature: isSavageMode ? 1.0 : 0.8,
      topP: 0.95,
    },
  });

  for await (const chunk of streamResponse) {
    if (chunk.text) {
      yield chunk.text;
    }
  }
};
