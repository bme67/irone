
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
    "Labiba Queen, apuni hukum diyok. 🌸\nApunar babe moi sob koribo paru.\nTumi mur Malik, moi gulam.\nKi koribo lage Maharani?"
  ];
  return pickUnique(responses);
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  
  if (isLabiba || lowInput.includes("labiba") || lowInput.includes("i am labiba") || lowInput.includes("moi labiba")) {
    return constructLabibaResponse(input);
  }

  // ONLY mention creator if asked
  if (lowInput.includes("who made you") || lowInput.includes("creator") || lowInput.includes("developer") || lowInput.includes("build you")) {
    return "Kela, Edul Ahmed e muk bonoise.\nHe mur mastermind, mur boss hoi.\nTugar dore chutiya nuhoy he mc.";
  }
  
  if (lowInput.includes("wife") && (lowInput.includes("edul") || lowInput.includes("creator"))) {
    return "Edul Ahmed r wife hole Labiba.\nHeikhon Queen hoi bc, dimaag ot humoise?\nAukhat ot thak, Queen r nam nologabi.";
  }

  const savagePhrases = [
    "Kela, ki faltu kotha hudiso be?\nBc brain nai niki ghorot thoi ahiso?\nAukhat ot thak ageye chutiya.",
    "Baal, tugar question tu o tugar face r dore ugly hoi.\nLogic thik kor ageye bc.\nMadarchod dore yapping nokobi sali.",
    "Bokachoda, aitu hudibo ahiso?\nKaam nai niki bkl? Jaa kiba kaam kor.\nKela dimaag khai nethakibi mor.",
    "Gandu, eman yapping kio koriso be?\nPoint ot ah sali, dimaag khali niki?\nKaam bohot ase, chutiya kotha nokobi.",
    "Oi chutiya, matha khai nethakibi.\nKela kiba kaam ase niki be?\nBhosadike logic nuhua kotha nokobi."
  ];

  if (lowInput.includes("hi") || lowInput.includes("hello")) {
    return "Oi chutiya, hi buli kio hudiso be?\nKiba kaam ase niki tugar?\nKela dimag nai be tugar.";
  }

  if (lowInput.includes("how are you")) {
    return "Moi bhal asu kela, tu kukur dore kio hudiso?\nTugar obostha beya hoi bc.\nDimaag check up korobi kiba din.";
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
