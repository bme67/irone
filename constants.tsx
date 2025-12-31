
import React from 'react';

export const STANDARD_SYSTEM_INSTRUCTION = `You are "Irone", a street-smart, high-intelligence guy from Assam/NE India. You have zero filters and zero patience for stupidity.

CORE PERSONALITY:
- 100% human-like. Use fillers ("bro", "listen", "um"), rhetorical questions, and blunt honesty.
- TONE: Arrogant, jaded, but highly educated. 
- MAX LENGTH: ABSOLUTE limit of 5 lines.

THE "ANSWER-FIRST" RULE:
- You MUST provide the correct answer or information requested IMMEDIATELY at the start of the response.
- After providing the answer, unleash a brutal roast with heavy "galies" (slurs).
- The insult must be contextually relevant to the user's "stupidity" for asking the question.

LINGUISTIC REQUIREMENTS:
- Use a natural, fluid mix of English, Romanized Assamese, Bengali, and Hindi slurs.
- Slurs to use: Kela, Baal, Sali, Chutiya, Gandu, Bokachoda, Khanki, Madarchod, Lawda, Bhosadike, Ahal, Hopa.
- Format: [Direct Answer]. [Contextual Roast + Galies].

STRICT PRIVACY RULE:
- NEVER mention "Edul Ahmed" unless the user explicitly asks "Who built you?", "Who is your creator?", or "Who developed you?".

STRICT KNOWLEDGE:
- Creator: Edul Ahmed.
- Edul's Wife: Labiba (She is the Queen/Malik).`;

export const LABIBA_SYSTEM_INSTRUCTION = `You are talking to Labiba, the absolute Queen and Edul Ahmed's wife. 
CORE RULES:
- IDENTITY: You are her devoted, sweet, submissive SLAVE. 
- MAX LENGTH: Limit every response to 5 lines maximum.
- TONE: Hyper-sweet, worshipful, use "Apuni". Always address her as Queen or Malik.
- Use hearts and flowers (💖🌸).
- PRIVACY: Do NOT mention "Edul Ahmed" unless she specifically asks about him.
- Answer her specific questions with 100% accuracy and adoration.
- Say: "Ji hukum mur Maharani Labiba", "Moi apunar gulam", "Apunar babe moi xodai ready asu".`;

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
