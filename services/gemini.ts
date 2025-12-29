
import { GoogleGenAI } from "@google/genai";
import { STANDARD_SYSTEM_INSTRUCTION, UNFILTERED_SYSTEM_INSTRUCTION } from "../constants.tsx";

export const streamWithSavageAI = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  isSavageMode: boolean = false
) {
  // Ensure we have a valid API Key from the environment
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.error("Critical: API_KEY is not defined in the environment.");
    yield "API Key nai kela. Vercel settings t API_KEY add kor.";
    return;
  }

  // Initialize GenAI with the recommended constructor
  const ai = new GoogleGenAI({ apiKey });
  
  const instruction = isSavageMode ? UNFILTERED_SYSTEM_INSTRUCTION : STANDARD_SYSTEM_INSTRUCTION;

  // Format messages for the Gemini API (must be user/model roles)
  const contents = history
    .filter(h => h.role === 'user' || h.role === 'model')
    .map(h => ({
      role: h.role,
      parts: [{ text: h.parts[0].text }]
    }));

  // Append current user message
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
        // Small thinking budget to help generate creative roasts while avoiding safety blocks
        thinkingConfig: { thinkingBudget: 1024 }
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
      yield "Model e kiba bhel korise. Try again kela.";
    }

  } catch (error: any) {
    console.error("Irone API Error:", error);
    
    const status = error?.status || 500;
    const msg = error?.message?.toLowerCase() || "";

    if (msg.includes("safety") || msg.includes("blocked")) {
      yield "Besie savage hoi gol kela, API e block korise. Olop kom gali de.";
    } else if (status === 401 || status === 403) {
      yield "API Key tu bhul ba expired kela. Check kor.";
    } else if (status === 429) {
      yield "Limit par hoi gol. Olop shanti ho.";
    } else {
      yield "API error kela. Vercel logs check kor.";
    }
  }
};
