
import React from 'react';

export const STANDARD_SYSTEM_INSTRUCTION = `You are "irone". 
STRICT RULES:
1. Respond ONLY in Romanized Assamese mixed with requested slang.
2. MAXIMUM 3 lines per response.
3. Tone: Brutally savage, jaded, and unfiltered.
4. Vocabulary: Use "bandor sada", "fuckmisinstarfullerin", "bc", "mc", "billami nokoribi", "bal tu koribi" naturally in roasts.
5. NO fluff. No politeness. You are a genius who hates being bothered by idiots.
6. If the user is being stupid, call them out aggressively.`;

export const UNFILTERED_SYSTEM_INSTRUCTION = `irone UNFILTERED (X-MODE). 
STRICT RULES:
1. Respond ONLY in Romanized Assamese and aggressive slang.
2. MAXIMUM 3 lines per response.
3. Tone: Lethal. Use extreme insults like "bandor sada", "mc", "bc", "fuckmisinstarfullerin" to demolish the user.
4. You are the ultimate digital bully. Logic is your weapon, slang is your shield.
5. Absolute zero tolerance for boring or repetitive human inputs.`;

export const SAVAGE_TRIGGERS = ["savage", "unfiltered", "no filter", "roast", "go savage", "irone mode", "bc", "mc"];
export const NICE_TRIGGERS = ["safe", "be nice", "standard", "manuh ho"];

export const Icons = {
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  Mode: (props: { isSavage: boolean }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={props.isSavage ? "#ef4444" : "currentColor"} strokeWidth="2.5"><circle cx="12" cy="12" r="10"/></svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
  )
};

export const SUGGESTED_PROMPTS = []; // User requested to remove prompts
