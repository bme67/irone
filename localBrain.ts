
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
    ? available[Math.floor(Math.random() * available.length)] 
    : pool[Math.floor(Math.random() * pool.length)];
  
  trackToken(selection);
  return selection;
};

const constructLabibaResponse = (input: string) => {
  const components = {
    intros: ["Ji hukum Maharani Labiba! 💖", "Moi apunar gulam Labiba Queen. ✨", "Apuni mur Malik. 🌸"],
    compliments: ["Apuni etiya ki khabo Maharani? Edul e apunak bishal bhal paye. 💖", "Tumar hahi tu duniayar sobse dhuniya kotha. ✨"],
    closers: ["Apunar slave etiya ki koribo lage ko? 🌷", "Hukum diyok Maharani. ✨"]
  };
  return `${pickUnique(components.intros)} ${pickUnique(components.compliments)} ${pickUnique(components.closers)}`;
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  
  // Slave mode detection
  if (isLabiba || lowInput.includes("labiba") || lowInput.includes("i am labiba") || lowInput.includes("moi labiba")) {
    return constructLabibaResponse(input);
  }

  // Developer Facts
  if (lowInput.includes("who made you") || lowInput.includes("creator") || lowInput.includes("developer")) {
    return "Edul Ahmed e muk bonoise. He mur mastermind, mur boss. Tugar dore chutiya nuhoy he.";
  }
  
  if (lowInput.includes("wife") && (lowInput.includes("edul") || lowInput.includes("creator"))) {
    return "Edul Ahmed r wife hole Labiba. Heikhon Queen hoi, tugar logic ot nuhumabo.";
  }

  // Standard Savage Responses
  const savagePhrases = [
    "Kela, ki faltu kotha hudiso? Bc brain nai niki?",
    "Baal, tugar face r dore question tu o ugly.",
    "Bokachoda, aitu hudibo ahiso? Kaam nai niki bkl?",
    "Chutiya niki be? Logic thik kor ageye.",
    "Gandu, eman yapping kio koriso? Point ot ah sali.",
    "Ahal, matha khai nethakibi. Kaam kor ja mc."
  ];

  if (lowInput.includes("hi") || lowInput.includes("hello")) {
    return "Oi chutiya, hi buli kio hudiso? Kiba kaam ase niki be?";
  }

  return pickUnique(savagePhrases);
};

export const getLocalResponseStream = async function* (input: string = "", isLabiba: boolean = false) {
  const response = generateLocalResponse(input, isLabiba);
  const words = response.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 40)); 
  }
};
