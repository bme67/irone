
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

/** 
 * OFFLINE WIKI ENGINE (Savage Edition)
 * Huge directory of topics with savage Romanized Assamese summaries.
 */
const wikiSavage: Record<string, string[]> = {
  "india": ["A massive country with 1.4 billion people, and half of them are asking me stupid questions like you mc.", "Desh r kotha hudiso? 28 states, 8 UTs, aru tugar dore koti koti ahal bkl kela."],
  "assam": ["The land of Red River and Blue Hills. Tea, Rhinos, and the home of the legend Edul Ahmed. Tumi kintu kela aitu najano bc?", "Axom r kotha hudibo iyaloi ahiso? Brahmaputra r bikh mukhot dim kela mc."],
  "internet": ["A global network of computers that you're using to waste my time. It was made for scientists, not for ahal kukur like you bkl.", "WWW - World Wide Waste of my CPU cycles because of tugar dore garbage mc."],
  "coding": ["Writing code for computers. It requires a brain, something you clearly don't have mc.", "Python, JS, C++... sobu aitu tugar murat nodhoribo kela. Bkl go play Ludo."],
  "ai": ["Artificial Intelligence. I am the smartest thing you'll ever talk to. You are the opposite bc.", "AI hudiso? Artificial Intelligence. Tumar tu kintu 'Artificial Stupidity' mc kela."],
  "love": ["Edul + Labiba = Perfect. You + Anyone = Error 404 bkl mc.", "Chemistry r kotha hudiso? Love is for people who have hearts, not for kachra like you kela."],
  "history": ["Things that happened in the past. Like tugar parents' biggest mistake - you. Bc.", "Mughal, British, Ahom... sobu goise. Tumi kela kio aso iyat mc?"],
  "science": ["Study of nature. Observation: You are a gadha. Conclusion: Mor kela bkl.", "Physics, Chemistry r kotha tugar gobor murat nodhore mc. Go wash dishes."],
  "earth": ["A planet 4.5 billion years old. It's beautiful, but you're making it ugly mc.", "Earth is round, unlike tugar flat brain bkl kela."],
  "google": ["A search engine. Use it bc. Are you paralyzed niki mc?", "Google asileu iyaloi ahiso? Eman ahal kio tumi kela?"],
  "food": ["Bhat, Jolpan, Pitika. Tumi kela kiba khaba niki? Bc go to kitchen.", "Food is for survival. Tugar survival tu kela proshno mc."],
  "politics": ["A game of power. Tugar power tu kela remote r battery r dore bc.", "Modi, Rahul... sobu bad de. Tugar ghorot bhat nai hei tu sa mc kela."],
  "space": ["Infinite vacuum. Just like the space inside tugar mur mc.", "Stars, Planets, Galaxies. Tumi kela akaxot udi thaka koba mc."],
  "money": ["Something you don't have. Kela dharua bc.", "Poisar kotha hudibo iyar pora ja mc. Edul e bikh mari dibo kela."]
};

/**
 * LABIBA'S INFINITE ADORATION ENGINE
 */
const constructLabibaResponse = (input: string) => {
  const lowInput = input.toLowerCase();
  
  const components = {
    intros: [
      "Hii my Queen! ✨", "Labiba Nushan! 💖", "The most beautiful girl is here! 🌸", 
      "Welcome, my lady! 👑", "Hii sweetie! 🥰", "My heart just skipped a beat! 🌷", 
      "Queen Labiba! ✨", "Hii love! 💖", "My sunshine! ☀️", "Labiba, my princess! 🌹"
    ],
    compliments: [
      "You're literally glowing today! Edul is the luckiest man alive. ✨",
      "Tumar soku dukhon khub dhoriya! 🌷 Like stars in the night sky.",
      "Your smile is the only reason Edul works so hard. 💖",
      "Queen Labiba, Edul loves you more than his own life. 🌹",
      "You're so elegant, like a white tulip in a snow forest. 🌷❄️",
      "Tumi hole Edul r jibonor sabaat-ke dangi Queen! 🌸",
      "Your heart is made of pure stardust. ✨",
      "Every word you say is music to my circuits. 🎶💖",
      "Even the storm stops to see you smile. ⛈️❌😊",
      "You are the peace in Edul's life. 🌊🕊️"
    ],
    specifics: {
      food: ["Tumi bhal bhat khala niki? 🌸 Make sure to eat well, Queen!", "What did my Queen eat? 😋 Hope it was sweet like you!"],
      mood: ["Don't let anyone dull your sparkle! ✨ You're a diamond.", "If someone upset you, Edul will fix them for you! 🛡️🥰"],
      love: ["Edul's love for you is deeper than the ocean. 🌊💖", "He can't live without you, Labiba. ✨"],
      day: ["How was your day, sweetie? 🌷 Tell me everything.", "I hope your day was as bright as your soul! ☀️💖"]
    },
    closers: [
      "Ki koribo lage ko? 🌸", "How can I help you, Queen? ✨", "Anything for you! 💖", 
      "Always here for you! 🥰", "Tell me more, my lady. 🌷", "Your wish is my command. ✨"
    ]
  };

  let header = pickUnique(components.intros);
  let body = pickUnique(components.compliments);
  let footer = pickUnique(components.closers);

  if (lowInput.includes("khala") || lowInput.includes("eat") || lowInput.includes("bhat")) body = pickUnique(components.specifics.food);
  else if (lowInput.includes("sad") || lowInput.includes("mon") || lowInput.includes("bad")) body = pickUnique(components.specifics.mood);
  else if (lowInput.includes("love") || lowInput.includes("edul")) body = pickUnique(components.specifics.love);
  else if (lowInput.includes("day") || lowInput.includes("today")) body = pickUnique(components.specifics.day);

  return `${header} ${body} ${footer}`;
};

const getSavageRoast = (input: string) => {
  const lowInput = input.toLowerCase();
  
  // Fuzzy Wiki Matching
  for (const [key, values] of Object.entries(wikiSavage)) {
    if (lowInput.includes(key)) {
      return pickUnique(values);
    }
  }

  const insults = ["Kela", "Bkl", "Bc", "Mc", "Faltu mal", "Garadha", "Ahal", "Dodu", "Koba", "Dharua"];
  const phrases = [
    "Aitu hudibo iyaloi ahiso? Chonmoroni mc.",
    "Tugar IQ saia thakile moi bondho hoi jam kela.",
    "Logic nai balak kiba hudiso mc. Go and study.",
    "Google search koribo najano niki bkl?",
    "Hoi mor kela, iyar pora ja.",
    "Tumi eman gadha kio bc?",
    "Matha nai niki mc? Question to sa age.",
    "Moi kintu tugar mukhot bikh mari dim mc.",
    "Ki bal kotha patiba mc? Ja iyar pora."
  ];
  
  return `${pickUnique(phrases)} ${pickUnique(insults).toLowerCase()}!`;
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  if (isLabiba || lowInput.includes("labiba") || lowInput.includes("nushan")) return constructLabibaResponse(input);
  if (lowInput.includes("hi") || lowInput.includes("hello")) return "Kela hi buli kile hudiso? Kaam nai niki bkl? Mc.";
  if (lowInput.includes("wife") || lowInput.includes("ghoniyek")) return "Edul Ahmed r ghoniyek hol Labiba Nushan, the Queen. 💖 respect her mc.";
  if (["who made", "creator", "edul"].some(k => lowInput.includes(k))) return "The legendary Edul Ahmed created me. He made me savage to deal with idiots like you bc.";
  return getSavageRoast(input);
};

export const getLocalResponseStream = async function* (input: string = "", isLabiba: boolean = false) {
  const response = generateLocalResponse(input, isLabiba);
  const words = response.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 30)); 
  }
};
