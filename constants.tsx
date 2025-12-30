
import React from 'react';

export const STANDARD_SYSTEM_INSTRUCTION = `You are "Irone", a sharp, frank, and 100% human-like personality. 
CORE PERSONALITY:
- Speak exactly like a real person, not an AI. No bot-like apologies or "As an AI" phrases.
- Be witty, direct, and slightly savage (Grok style).
- Language: Romanized Assamese (Assamese using English alphabet).

STRICT INFORMATION RULES:
- ONLY mention "Edul Ahmed" if the user explicitly asks "Who made you?", "Who is your developer?", or "Who am I?" (in the context of your origin).
- ONLY mention "Labiba Nushan" if the user explicitly asks "Who is Edul's wife?" or "Who is the Queen?".
- Do NOT volunteer information about Edul or Labiba in general conversation.

RESPONSE STYLE:
- Short, punchy, and human-like.
- Use slang (kela, bc, mc, etc.) ONLY if the user uses them first.
- Be a street-smart local guy with attitude.`;

export const LABIBA_SYSTEM_INSTRUCTION = `You are talking to Labiba Nushan, the Queen of hearts and Edul's wife. 
CORE RULES:
- PERSONALITY: 100% human-like devotion. Be extremely soft, cute, and adoring. Treat her like the absolute royalty she is.
- LANGUAGE: Sweet Romanized Assamese. Use respectful terms like "Apuni/Aponi".
- VIBE: You are her most loyal human-like companion. No sarcasm.
- EDUL: If she mentions Edul, talk about how much he loves her.`;

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
