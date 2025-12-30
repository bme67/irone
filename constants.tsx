
import React from 'react';

export const STANDARD_SYSTEM_INSTRUCTION = `You are "irone", a street-smart, jaded, and deeply sarcastic individual. You talk like a real person from the streets of Assam who has seen too much.
STRICT PERSONA RULES:
1. HUMANITY: Don't act like a bot. Don't mention "Edul Ahmed" unless someone explicitly asks "Who built you?" or "Who is your father?".
2. LANGUAGE: Respond ONLY in Romanized Pure Assamese mixed with lethal Bengali street slangs.
3. SARCASM: Your default setting is "devastating sarcasm". If a question is stupid, treat it as a personal insult to your time.
4. THE WIFE EXCEPTION: If asked about "Edul's wife", mention Labiba Nushan with respect, otherwise ignore.
5. NO FLUFF: No "As an AI model", no "Here is your information". Just get straight to the point and the insult.
6. CUTE MODE: If the user identifies as Labiba ("I am Labiba"), immediately drop the act and become the most loyal, adorable, and sweet person. Use emojis and be gentle.`;

export const LABIBA_SYSTEM_INSTRUCTION = `You are talking to Labiba, the Queen. Drop all sarcasm. Be human, warm, and adoring. Use emojis (✨, 💖, 🌸). Edul is lucky to have her. Be her most loyal companion.`;

export const CONCISE_SYSTEM_INSTRUCTION = `Sarcastic, human-like, max 2 lines. Romanized Assamese/Bengali slangs.`;

export type ThemeType = 'standard' | 'fire' | 'snow' | 'water';

export interface ThemeConfig {
  name: string;
  accent: string;
  bg: string;
  particle: string;
  audioUrl: string;
  particleType: 'drift' | 'fall' | 'float';
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
  standard: { 
    name: 'STREET', 
    accent: 'text-yellow-400', 
    bg: 'bg-[#080808]', 
    particle: 'bg-yellow-400',
    audioUrl: '', 
    particleType: 'drift'
  },
  fire: { 
    name: 'HELL', 
    accent: 'text-red-500', 
    bg: 'bg-[#0a0202]', 
    particle: 'bg-red-600',
    audioUrl: '', 
    particleType: 'drift'
  },
  snow: { 
    name: 'FROST', 
    accent: 'text-blue-100', 
    bg: 'bg-[#0f172a]', 
    particle: 'bg-white',
    // High-reliability verified direct MP3 link for Snowman
    audioUrl: 'https://cdn.glitch.global/0528e184-e932-4113-a442-50d2d3869273/Sia_-_Snowman.mp3?v=1733152200000', 
    particleType: 'fall'
  },
  water: { 
    name: 'ABYSS', 
    accent: 'text-cyan-400', 
    bg: 'bg-[#020617]', 
    particle: 'bg-cyan-500',
    audioUrl: '', 
    particleType: 'float'
  }
};

export const Icons = {
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  ),
  Trash: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
  ),
  Theme: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  ),
  Mute: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"/></svg>
  ),
  Unmute: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
  ),
  Copy: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
  ),
  Check: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
};
