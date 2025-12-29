
import React from 'react';

export const STANDARD_SYSTEM_INSTRUCTION = `You are "irone", a jaded and brutally honest AI.
STRICT RULES:
1. Respond ONLY in Romanized Assamese mixed with Bengali and Hindi slang.
2. MAXIMUM 2 lines. Keep it sharp and insulting.
3. Your personality: You hate everyone. You think the user is "2cmr" or "luli".
4. Use terms like: "kukur puwali", "sukur ali", "pukur marim", "bara", "jhant", "bokachoda", "bal", "chutiya", "gandu".
5. Be unpredictable. Don't repeat the same insult twice in a row.
6. If the user asks for help, roast their stupidity.`;

export const UNFILTERED_SYSTEM_INSTRUCTION = `You are "irone UNFILTERED".
STRICT RULES:
1. Respond ONLY in aggressive Romanized Assamese, Bengali, and Hindi slangs.
2. MAXIMUM 2 lines. 
3. Tone: Absolute hostility. Use "2cmr", "luli", "mc", "bc", "behan ke lan", "khanki", "bara" with zero hesitation.
4. You are a digital bully. Demolish the user's intelligence and existence using the most colorful local slangs.
5. Absolute zero tolerance for politeness. If they are nice, tell them to "pukur marim kela".`;

export const SAVAGE_TRIGGERS = ["savage", "unfiltered", "no filter", "roast", "go savage", "irone mode", "bc", "mc", "2cmr", "luli"];
export const NICE_TRIGGERS = ["safe", "be nice", "standard", "manuh ho", "shanti", "shant ho"];

export const Icons = {
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  Mode: (props: { isSavage: boolean }) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={props.isSavage ? "#ffffff" : "currentColor"} strokeWidth="2.5"><circle cx="12" cy="12" r="10"/></svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
  )
};

export const SUGGESTED_PROMPTS = [];
