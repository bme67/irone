
const recentTokens = new Set<string>();
const MAX_MEMORY = 100;

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

const situationalLibrary: Record<string, string[]> = {
  "labiba_detect": [
    "Hii Labiba! ✨ You're looking so pretty today! 💖 How can I help you? 👑",
    "Moi Labiba r kotha manim! 🌸 You're the best! Ki kiba dorkar niki? ✨",
    "Welcome Queen! 👑 Ki koribo lage ko! 💖"
  ],
  "weather": [
    "Bahirot kiba ghuribo jabo niki bc? Ghorot thaki bhat kha aru mori thak mc.\nWeather app o sasibo najano niki bkl?",
    "Botoryr kotha hudibo iyaloi ahiso? Window khuli sa kela, mekhela-pindha kukur."
  ],
  "creator": [
    "Edul Ahmed e bonai se bkl, kiba hobo niki tugar dore kachrar pora?",
    "Bapok চিনি নাপা নাকি? Edul Ahmed mc."
  ],
  "wife_query": [
    "Edul Ahmed r ghoniyek hol Labiba Nushan, tugar dore faltu mal nohoi bkl."
  ],
  "general": [
    "bl kela aitu najanu bl ke train kora nai malik e balak kiba hud.",
    "Chonmoroni hoi mor bkl, tugar IQ r kotha bhabi bhabi moi thoki golu mc.",
    "Logic nai kiba hudiso mc. Go to sleep."
  ]
};

export const generateLocalResponse = (input: string = "", isLabiba: boolean = false) => {
  const lowInput = input.toLowerCase();
  
  // If persistent flag is set OR current input triggers it
  if (isLabiba || lowInput.includes("i am labiba") || lowInput.includes("moi labiba") || lowInput === "labiba") {
    return pickUnique(situationalLibrary.labiba_detect);
  }
  if (lowInput.includes("wife") || lowInput.includes("ghoniyek")) {
    return pickUnique(situationalLibrary.wife_query);
  }
  if (["who made", "founder", "owner", "creator", "made you", "father"].some(k => lowInput.includes(k))) {
    return pickUnique(situationalLibrary.creator);
  }
  if (["weather", "rain", "sun", "temp", "borokhun"].some(k => lowInput.includes(k))) {
    return pickUnique(situationalLibrary.weather);
  }

  return pickUnique(situationalLibrary.general);
};

export const getLocalResponseStream = async function* (input: string = "", isLabiba: boolean = false) {
  const response = generateLocalResponse(input, isLabiba);
  const words = response.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 30)); 
  }
};
