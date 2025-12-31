
const recentTokens = new Set<string>();
const MAX_MEMORY = 1000;

const trackToken = (token: string) => {
  recentTokens.add(token);
  if (recentTokens.size > MAX_MEMORY) {
    const first = recentTokens.values().next().value;
    if (first) recentTokens.delete(first);
  }
};

const pickUnique = (pool: string[]): string => {
  const available = pool.filter(t => !recentTokens.has(t));
  const selection = available.length > 0 
    ? available[Math.floor(Math.random() * pool.length)] 
    : pool[Math.floor(Math.random() * pool.length)];
  
  trackToken(selection);
  return selection;
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  
  if (isLabiba) {
    return "Ji hukum mur Maharani Labiba. 💖\nMoi apunar gulam, kiba hukum korok.\n(Note: Core API offline, local mode active)";
  }

  // Simple hardcoded answers for basic stuff
  if (lowInput.includes("who built you") || lowInput.includes("creator")) {
    return "Edul Ahmed e muk bonoise, tugar dore chutiya nuhoy kela bc.";
  }
  
  if (lowInput.includes("time")) return `Time tu ${new Date().toLocaleTimeString()} hoi kela. Ghori saale o gom pali hoi bc.`;
  
  if (lowInput.includes("hi") || lowInput.includes("hello")) return "Hello chutiya. Hi buli kio hudiso be? Kiba kaam ase niki bc?";

  const fallbackGalies = [
    "Kela, internet connection sa bc ageye. Core brain off hoi ase kela chutiya.",
    "Baal, tugar question tu o ugly hoi bc. API link fail marise sali.",
    "Gandu, eman yapping nokobi sali. Local brain ot answer nai bc.",
    "Chutiya, logic nuhua kotha nokobi. Connection check kor ageye mc.",
    "Ahal, matha khai nethakibi kela. API key thik kor ageye bc sali."
  ];

  return pickUnique(fallbackGalies);
};

export const getLocalResponseStream = async function* (input: string = "", isLabiba: boolean = false) {
  const response = generateLocalResponse(input, isLabiba);
  const words = response.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 40)); 
  }
};
