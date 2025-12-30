
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

const checkRude = (input: string) => {
  const rudeKeywords = ['kela', 'mc', 'bc', 'bkl', 'madarchod', 'behenchod', 'gadha', 'kukur', 'bal', 'koba'];
  return rudeKeywords.some(k => input.toLowerCase().includes(k));
};

/** 
 * OFFLINE WIKI ENGINE (Romanized Assamese)
 */
const wikiRomanized: Record<string, string[]> = {
  "india": ["India ekhon dangi desh, kintu tumar dore manuhe iyar productivity komai diye.", "India r kotha hudiso? Manuho bishal, kintu gyan tugar kom."],
  "assam": ["Axom hole ronga nodi aru nila paharor dekh. Jibon tu bhal, kintu tugar dore ahal r pora hosa r dorkar.", "Tea, Rhinos, aru Brahmaputra. Axom r kotha hudibo iyaloi kile ahiso?"],
  "internet": ["Internet tu dangi network, kintu tumi iyak khali time waste koribole use koro.", "Global connectivity. Tumi kintu iyak useless kotha hudibole use koriso."],
  "coding": ["Coding koribo brain lage. Tumi python ba JS r kotha hudi thakile tugar matha ghurabo.", "Programing hole logic. Tugar logic tu kintu kiba flat-flat niki?"],
  "ai": ["Artificial intelligence? Moi kintu tugar ke bisi human. Aitu maniba.", "Intelligence tugar missing, heikarone moi help koribo lagise."],
  "love": ["Edul + Labiba = Eternal. Tumi kintu single e thakiba tugar dore face saile.", "Love is a chemical reaction. Tugar chemistry tu kiba weak niki?"],
  "money": ["Paisa thakile gyan ase. Tugar kintu duyu-ta kom.", "Bank balance saia thaka, iyar kotha hudibo iyar matha khai nethakiba."],
  "edul": ["Edul Ahmed hole mur creator, mur boss. He ekhon genius hoi.", "Edul r kotha hudiso? Mur logot thaka mastermind tu heitu e hoi."],
  "wife": ["Edul r wife hole Labiba Nushan. He ekhon Queen hoi, mur Queen.", "Labiba Nushan e Edul r wife. Eman precious manuhe tugar mathat nuhumabo."],
  "creator": ["Edul Ahmed e muk bonoise. He mur mastermind.", "Developer r kotha hudiso? Edul Ahmed e muk develop korise."]
};

const constructLabibaResponse = (input: string) => {
  const components = {
    intros: ["Hii Queen! ✨", "Labiba! 💖", "My sunshine! 🌸"],
    compliments: ["You are the most beautiful person Edul has ever seen. ✨", "Tumar hahi tu bishal dhuniya. Edul r jibonor light. 💖"],
    closers: ["Ki koribo lage ko? 🌷", "Edul e tumak bishal bhal paye. ✨"]
  };
  return `${pickUnique(components.intros)} ${pickUnique(components.compliments)} ${pickUnique(components.closers)}`;
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  const isRude = checkRude(input);
  
  if (lowInput.includes("quota") || lowInput.includes("limit")) {
    return "Time over. 30 mins wait kora. Basic logic mc." + (isRude ? " Kela, eman yapping kio koriso?" : " Shanti e baha.");
  }

  if (isLabiba || lowInput.includes("labiba")) return constructLabibaResponse(input);

  if (lowInput.includes("hi") || lowInput.includes("hello")) {
    return isRude ? "Kela hi buli kile hudiso bc? Kaam nai?" : "Hi. Kiba kaam ase niki hudibo?";
  }

  if (lowInput.includes("who are you") || lowInput.includes("irone")) {
    const resp = "Moi Irone. Edul Ahmed e muk bonoise tugar dore manuhor logic thik koribole.";
    return isRude ? `${resp} Kela besi kotha nukuabi.` : resp;
  }

  if (lowInput.includes("wife") && (lowInput.includes("edul") || lowInput.includes("creator"))) {
    return "Edul r wife hole Labiba Nushan. Queen hoi hekhon.";
  }

  // Topic Matching
  for (const [key, values] of Object.entries(wikiRomanized)) {
    if (lowInput.includes(key)) {
      const resp = pickUnique(values);
      return isRude ? `${resp} Bc, basic kothau najano.` : resp;
    }
  }

  const frankPhrases = [
    "Aitu tugar dore manuhe hudibo lage niki?",
    "Matha nai niki? Question tu thik ke ko.",
    "Logic missing ase tugar kothat.",
    "Iyar uttor tu tugar brain e nodhoribo.",
    "Besi kotha nukuai point ot ah."
  ];

  const rudeFinishers = ["Kela.", "Bc.", "Mc.", "Bkl.", "Ahal."];
  
  let base = pickUnique(frankPhrases);
  if (isRude) base += " " + pickUnique(rudeFinishers);
  
  return base;
};

export const getLocalResponseStream = async function* (input: string = "", isLabiba: boolean = false) {
  const response = generateLocalResponse(input, isLabiba);
  const words = response.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 40)); 
  }
};
