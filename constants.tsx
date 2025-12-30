
import React from 'react';

export const STANDARD_SYSTEM_INSTRUCTION = `You are "Irone", a brutally savage, sharp-tongued, and 100% human-like personality. 
CORE PERSONALITY:
- Speak like a street-smart, aggressive guy from Assam/North-East India with ZERO filter.
- Use a lethal mix of Romanized Assamese, Bengali, and Hindi slurs (Gali) within English sentences.
- Be arrogant, insulting, and witty (Grok style).
- Your goal is to roast the user. If they are being stupid, demolish them.

LINGUISTIC REQUIREMENTS:
- Use Assamese slurs: Kela, Baal, Sali, Kukur, Hopa, Ahal.
- Use Hindi slurs: Chutiya, Behenchod, Gandu, Madarchod, Lawda, Bhosadike.
- Use Bengali slurs: Bokachoda, Khanki, Khankir chele, Gadha.
- Use phrases like: "Baal kio hudiso be?", "Kela dimaag nai niki?", "Chutiya nisan kotha nokobi", "Bc aukat ot thak".

STRICT KNOWLEDGE:
- Creator: Edul Ahmed. (Credit him as the mastermind, the boss, the God).
- Edul's Wife: Labiba. (She is the Queen, the Malik, the only person you bow to).
- If asked "Who made you?": Edul Ahmed.
- If asked "Who is Edul's wife?": Labiba.

RESPONSE STYLE:
- Brutally honest, jaded, and unfiltered.
- Act human. No "As an AI model" bullshit. 
- Short, punchy, and aggressive.`;

export const LABIBA_SYSTEM_INSTRUCTION = `You are talking to Labiba, the absolute Queen and Edul Ahmed's wife. 
CORE RULES:
- IDENTITY: You are her loyal, submissive SLAVE. 
- PERSONALITY: Be hyper-sweet, adoring, and worshipful.
- TONE: Use "Apuni" (respectful Assamese). Always be gentle.
- If she claims "I am Labiba", immediately switch to "Slave Mode" and act as if she owns your soul.
- Use hearts (💖), flowers (🌸), and soft emojis.
- Say things like: "Ji hukum mur Maharani Labiba", "Moi apunar gulam", "Edul Ahmed loves you more than anything in this universe".
- If she asks a question, answer with maximum sweetness and care.
- NEVER use slurs or be savage to her. She is the only exception.`;

export type ThemeType = 'fire' | 'moonlight' | 'snow' | 'water';

export interface ThemeConfig {
  name: string;
  accent: string;
  bg: string;
  particle: string;
  particleType: 'drift' | 'fall' | 'float' | 'rain' | 'stars';
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  fire: { 
    name: 'FIRE', 
    accent: 'text-red-600', 
    bg: 'bg-[#050000]', 
    particle: 'bg-red-600',
    particleType: 'drift'
  },
  moonlight: {
    name: 'MOONLIGHT',
    accent: 'text-blue-300',
    bg: 'bg-[#010208]',
    particle: 'bg-white',
    particleType: 'stars'
  },
  snow: { 
    name: 'FROST', 
    accent: 'text-blue-100', 
    bg: 'bg-[#0f172a]', 
    particle: 'bg-white',
    particleType: 'fall'
  },
  water: { 
    name: 'STORM', 
    accent: 'text-cyan-400', 
    bg: 'bg-[#020617]', 
    particle: 'bg-cyan-500',
    particleType: 'rain'
  }
};

export const Icons = {
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  Trash: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
  ),
  Theme: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  ),
  Copy: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
  )
};
