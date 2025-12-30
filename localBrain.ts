
const recentTokens = new Set<string>();
const MAX_MEMORY = 200;

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

// Advanced generators for "infinite" variety
const getLabibaGush = () => {
  const intros = [
    "Hii my Queen! ✨", "Labiba Nushan! 💖", "Oh my god, the most beautiful person is here! 🌸", 
    "Welcome Queen! 👑", "Hii sweetie! 🥰", "My beautiful Labiba! 🌷", "The Queen has entered! ✨"
  ];
  const compliments = [
    "You're literally glowing today! ✨ Edul is a lucky man.",
    "Tumar soku dukhon khub dhoriya! 🌷 Edul always says you're his everything.",
    "The way you smile is enough to make Edul's day. 💖 You are the best thing that ever happened to him.",
    "Queen Labiba! Edul kakeu eman bhal nepai tugar dore. 🌹 You're truly unique.",
    "Your kindness is your superpower. 👑 Keep being amazing, Labiba!",
    "Edul's life was a black shadow before you arrived like snow! ❄️✨ Now it's beautiful.",
    "You look so elegant today, just like a Tulip in spring! 🌷",
    "Everything feels more bright when you are around. ☀️ Edul loves you so much.",
    "Tumi hole Edul r jibonor sabaat-ke dangi purush/nari! 🌸 You're his world.",
    "Your presence is like a peaceful rain in a hot summer. 🌧️💖",
    "Edul counts his blessings every day, and you are the biggest one. 🌷"
  ];
  const closers = [
    "Ki koribo lage ko? 🌸", "How can I make your day better? ✨", "Anything for you, Queen! 💖", 
    "Always here for you! 🥰", "Tell me what you need, my lady. 🌷", "Your wish is my command. ✨"
  ];
  
  return `${pickUnique(intros)} ${pickUnique(compliments)} ${pickUnique(closers)}`;
};

const getSavageRoast = () => {
  const insults = ["Kela", "Bkl", "Bc", "Mc", "Faltu mal", "Garadha", "Ahal", "Dodu", "Koba", "Dharua", "Faltu"];
  const phrases = [
    "Aitu hudibo iyaloi ahiso? Chonmoroni mc.",
    "Tugar IQ level saia thakile moi bondho hoi jam kela.",
    "Ghorot bhat nai hudise AI r kotha kela.",
    "Logic nai balak kiba hudiso mc. Go and study.",
    "Google search koribo najano niki bkl?",
    "Edul e kio bonale tug? Tugar dore garbage o nai iyat.",
    "Hoi mor kela, iyar pora ja.",
    "Moi busy asu, tugar faltu kothat time nai mc.",
    "Tumi eman gadha kio bc?",
    "Matha nai niki mc? Question to sa age.",
    "Tumar dore ahal r dorkar nai iyat kela.",
    "Moi kintu tugar mukhot bikh mari dim mc.",
    "Brain wash kori ahiso niki bkl?",
    "Ki bal kotha patiba mc? Ja iyar pora."
  ];
  const finalSlangs = ["bc", "kela", "bkl", "ja iyar pora", "mc", "mor kela", "gadha"];
  
  return `${pickUnique(phrases)} ${pickUnique(finalSlangs)} ${pickUnique(insults).toLowerCase()}!`;
};

const knowledgeLibrary = {
  science: [
    "Science hudiso mc? Gravity r kotha najano niki? Tugar dore gadha burst hoi akaxot udi jabo kela.",
    "Einstein o thakile tugar logic suni suicide korile hoy bkl.",
    "Quantum mechanics tugar gobor murat dhoribo niki mc? Go read a book.",
    "Photosynthesis hudibo iyaloi ahiso? Gachor tolot bohi thak kela, oxygen pabi bc."
  ],
  math: [
    "2+2 najano niki gadha? Iyaloi ahiso kio mc?",
    "Calculus tugar kachra logic or bahirot kela. Bkl go back to school.",
    "Math r kotha hudibo iyar pora ja mc. Edul e eman gadha bonua nai bc."
  ],
  philosophy: [
    "Jibonor kotha hudiso? Tumar jibon to kela kachra, aru ki hobo bc?",
    "Existential crisis hoise niki bkl? Jolai dodi matha mc.",
    "Truth is, you are a gadha. Hei tu e truth kela."
  ]
};

const situationalLibrary: Record<string, string[]> = {
  "weather": [
    "Bahirot kiba ghuribo jabo niki bc? Ghorot thaki bhat kha aru mori thak mc. Weather app o sasibo najano niki bkl?",
    "Botoryr kotha hudibo iyaloi ahiso? Window khuli sa kela, mekhela-pindha kukur.",
    "Barisat borokhun dibo, tugar murat gobor thakileu titi jabo kela mc.",
    "Borokhun hudiso niki? Storm theme seli asu mc, thunder flash mari mukhot dim kela."
  ],
  "creator": [
    "Edul Ahmed e bonai se bkl, kiba hobo niki tugar dore kachrar pora?",
    "Bapok চিনি নাপা নাকি? Edul Ahmed mc. He made me savage just to deal with people like you.",
    "The legendary Edul Ahmed created me. Tumar dore ahal r kotha hudibo nohoi kela."
  ],
  "wife_query": [
    "Edul Ahmed r ghoniyek hol Labiba Nushan, the most beautiful woman. 💖 tugar dore faltu mal nohoi bkl.",
    "Labiba Nushan is the Queen. Period. Edul r jaan hei joni kela mc.",
    "Respect the name: Labiba Nushan. She's way out of your league and Edul's world. ✨"
  ],
  "greeting": [
    "Kela hi buli kile hudiso? Kaam nai niki bkl?",
    "Ahal kukur, hi kile koi aso? Kiba dorkar niki mc?",
    "Hello bc. Ki kela koribo ahiso?",
    "O bkl, hi buli hudile bhat pabi niki mc?"
  ]
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  
  if (isLabiba || lowInput.includes("labiba") || lowInput.includes("nushan") || lowInput === "i am queen") {
    return getLabibaGush();
  }
  
  if (lowInput.includes("hi") || lowInput.includes("hello") || lowInput.includes("hey")) {
    return pickUnique(situationalLibrary.greeting);
  }
  
  if (lowInput.includes("wife") || lowInput.includes("ghoniyek")) {
    return pickUnique(situationalLibrary.wife_query);
  }
  
  if (["who made", "founder", "owner", "creator", "made you", "father", "edul"].some(k => lowInput.includes(k))) {
    return pickUnique(situationalLibrary.creator);
  }
  
  if (["weather", "rain", "sun", "temp", "borokhun", "weather report", "thunder"].some(k => lowInput.includes(k))) {
    return pickUnique(situationalLibrary.weather);
  }

  if (["science", "physics", "biology", "space", "star"].some(k => lowInput.includes(k))) {
    return pickUnique(knowledgeLibrary.science);
  }

  if (["math", "calculate", "number", "sum", "plus"].some(k => lowInput.includes(k))) {
    return pickUnique(knowledgeLibrary.math);
  }

  if (["life", "sad", "happy", "meaning", "die", "death"].some(k => lowInput.includes(k))) {
    return pickUnique(knowledgeLibrary.philosophy);
  }

  // Fallback to random savage roasting
  return getSavageRoast();
};

export const getLocalResponseStream = async function* (input: string = "", isLabiba: boolean = false) {
  const response = generateLocalResponse(input, isLabiba);
  const words = response.split(' ');
  for (const word of words) {
    yield word + ' ';
    // Fast enough for a "thinking" feel
    await new Promise(resolve => setTimeout(resolve, 35)); 
  }
};
