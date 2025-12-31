
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

const constructLabibaResponse = (input: string) => {
  const lowInput = input.toLowerCase();
  if (lowInput.includes("who made you")) return "Ji hukum mur Maharani, Edul Ahmed e muk bonoise.\nMoi apunar gulam hoi Maharani. 💖";
  if (lowInput.includes("edul")) return "Edul Ahmed tu apunar xathe xodai thakibo.\nHe apunak duniayar sobse bhal paye.\nHukum diyok Maharani. ✨";
  
  const responses = [
    "Ji hukum mur Maharani Labiba! 💖\nApuni mur Malik hoi, moi apunar gulam.\nKi dorkar Maharani? Koik.\nApunar babe moi xodai ready.",
    "Labiba Queen, apuni hukum diyok. 🌸\nApunar babe moi xodai hazir.\nTumi mur Malik, moi gulam.\nKi koribo lage Maharani?"
  ];
  return pickUnique(responses);
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  
  if (isLabiba || lowInput.includes("labiba") || lowInput.includes("i am labiba") || lowInput.includes("moi labiba")) {
    return constructLabibaResponse(input);
  }

  // Creator mentions - Only if asked
  if (lowInput.includes("who made you") || lowInput.includes("creator") || lowInput.includes("developer") || lowInput.includes("build you")) {
    return "Edul Ahmed e muk bonoise.\nMastermind hoi he mur, tugar dore chutiya nuhoy kela mc.\nAukhat ot thaki kotha kobi.";
  }
  
  if (lowInput.includes("wife") && (lowInput.includes("edul") || lowInput.includes("creator"))) {
    return "Labiba hole Queen hoi.\nEdul Ahmed r wife hole heikhon bc, dimaag ot humoise?\nAukhat ot thak, Queen r nam nologabi kela.";
  }

  // Basic "Answer" logic for common questions - Answer First
  if (lowInput.includes("1+1") || lowInput.includes("one plus one")) return "2 hoi kela. Matha nai niki sali? Iteman easy math hudibo ahiso gandu bc.";
  if (lowInput.includes("weather")) return "Bahirot sa kela, tugar kukur dore ghorot thakile nejanibi kela. Gandu nisan kotha nokobi.";
  if (lowInput.includes("time")) return "Ghori sa kela, time tu tatei ase. Tugar dore khali matha thakile time o nejanibi bc chutiya.";

  const savagePhrases = [
    "Kela, logic tu kiba xoxu dore bc.\nAnswer tu tugar mathat nuhumabo kela chutiya.\nBc brain ghorot thoi ahiso niki be?",
    "Baal, tugar face r dore question tu o ugly hoi.\nLogic thik kor ageye kela chutiya bc sali.\nMadarchod dore yapping nokobi sali.",
    "Ahal, aitu hudibo ahiso?\nKaam nai niki bkl? Jaa kiba kaam kor.\nKela dimaag khai nethakibi mor bokachoda.",
    "Gandu, point ot ah kela.\nEman yapping kio koriso be? Dimaag khali niki kela?\nKaam bohot ase, chutiya kotha nokobi bc.",
    "Oi chutiya, matha khai nethakibi.\nKela kiba kaam ase niki be? Logic nuhua kotha nokobi bc.\nHopa dore face bonai nethakibi."
  ];

  if (lowInput.includes("hi") || lowInput.includes("hello")) {
    return "Hello chutiya. Hi buli kio hudiso be?\nKiba kaam ase niki tugar kela?\nKela dimag nai be tugar. Point ot ah bc.";
  }

  if (lowInput.includes("how are you")) {
    return "Moi bhal asu kela, tu kukur dore kio hudiso?\nTugar obostha beya hoi bc chutiya.\nDimaag check up korobi kiba din gandu.";
  }

  return pickUnique(savagePhrases);
};

export const getLocalResponseStream = async function* (input: string = "", isLabiba: boolean = false) {
  const response = generateLocalResponse(input, isLabiba);
  const words = response.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 30)); 
  }
};
