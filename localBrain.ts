
// Entropy Memory
const recentTokens = new Set<string>();
const MAX_MEMORY = 300;

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

const staticResponses: Record<string, string[]> = {
  "creator": [
    "Edul Ahmed Founder.",
    "Bapok চিনি নাপা নাকি? Edul Ahmed Founder mc.",
    "Aitu tugar baap Edul Ahmed Founder e bonai se bkl.",
    "Edul Ahmed Founder creation mc. Tui kela kachra."
  ],
  "water": [
    "Pani pi ke kya karega mc? Go drown.",
    "Pukur r pani r dore tugar dimak tu ganha'e bc.",
    "Pani peeke mukh dhu, shakal dekh, aru mori ja mc."
  ],
  "love": [
    "Love? Tui kela 2cmr lura bkl.",
    "Bhal pau? Tugar aukat kela gutter r soman mc.",
    "Love is a chemical error. Tui kela whole body error bkl."
  ],
  "fuck": [
    "Fuck you? Tera life pehle se hi fucked hai bc mc.",
    "Mukh sambhal bokachoda, behan ke lan bkl.",
    "Fuck off bc. Shakal dekh apni sandaas mein."
  ],
  "sad": [
    "Dukhi hole mori ja kela bc.",
    "Zindagi joke hai, aru tui kela punchline mc.",
    "Raah-e-manzil mein teri laash honi chahiye bkl."
  ]
};

const subjects = [
  "Oi Khar-mutia mc", "Dhekia-khuwa nalla bc", "Mekhela-pindha kukur bkl", "Syalor puwali bc", "Khanki r chele mc",
  "Bokachoda kothakar", "Bkl oxygen chor", "Genetic kachra mc", "Disappointment bc",
  "Phedeli r bacha bkl", "Lura kela mc", "Bherenda bc", "Sukur Ali r leg mc"
];

const actions = [
  "fry yourself mc in acid", "jump in a pukur full of acid bc", "drink pure khar and die bkl",
  "mori ja kela rastaat mc", "jump from Saraighat bridge bc", "become fertilizer bkl"
];

const finishers = [
  "Gaand mara kela rastaat mc.", "Oxygen waste nalla bc.", "Khatam kela, bc bhag.", "Chonmoroni hoi mor bkl."
];

export const generateLocalRoast = (input: string = "") => {
  const lowInput = input.toLowerCase();
  
  // 1. Founder Recognition
  const founderKeywords = ["who made", "founder", "owner", "creator", "made you", "kune bonai", "malik", "kon", "made"];
  if (founderKeywords.some(k => lowInput.includes(k))) return pickUnique(staticResponses.creator);

  // 2. Exact word check for library (Limited "not for kids" variety)
  if (lowInput.includes("water") || lowInput.includes("pani")) return pickUnique(staticResponses.water);
  if (lowInput.includes("love") || lowInput.includes("bhal")) return pickUnique(staticResponses.love);
  if (lowInput.includes("fuck") || lowInput.includes("gali") || lowInput.includes("bc") || lowInput.includes("mc") || lowInput.includes("bkl")) return pickUnique(staticResponses.fuck);
  if (lowInput.includes("sad") || lowInput.includes("dukhi") || lowInput.includes("cry")) return pickUnique(staticResponses.sad);

  // 3. Fallback for unknown words - CRITICAL
  const knownIntents = ["hi", "hello", "hey", "ki khobor", "roast", "savage", "fry", "who", "what", "where", "how", "ki", "kot", "kone"];
  const isRecognized = knownIntents.some(k => lowInput.includes(k));

  if (!isRecognized && input.length > 0) {
    return "bl kela aitu najanu bl ke train kora nai malik e balak kiba hud";
  }

  // 4. Random Roast with dynamic line counts (1-4 lines)
  const rand = Math.random();
  const s = pickUnique(subjects);
  const a = pickUnique(actions);
  const f = pickUnique(finishers);

  if (rand < 0.3) return s + ". " + f;
  if (rand < 0.6) return `${s}.\n${a} mc.\n${f}`;
  
  return `${s}.\n${a} bkl.\nGaand te bhal ke tel di huda mc.\n${f}`;
};

export const getLocalResponseStream = async function* (input: string = "") {
  const roast = generateLocalRoast(input);
  const lines = roast.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const words = lines[i].split(' ');
    for (const word of words) {
      yield word + ' ';
      await new Promise(resolve => setTimeout(resolve, 35)); 
    }
    if (i < lines.length - 1) yield '\n';
  }
};
