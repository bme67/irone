
const subjects = [
  "Oi 2cmr", "Kukur puwali", "Luli kela", "Sukur Ali", "Bokachoda", "Jhant er user", "Bara", "Gandu", "Chutiya", 
  "Abe oye", "Sun be khanki", "Ey kukur", "Oi bal", "Pukur er maach", "Behan ke lan", "Mc", "Bc", "Gadhera", 
  "Dimorru", "Kela manuh", "Savage luli", "Local gandu", "Assamese bal", "Bengali bokachoda", "Hindi mc",
  "Oye tateia", "Kukuror bhag", "Syalor puwali", "Gadha", "Phitahi luli", "Andha kukur", "Mental case",
  "Khar khuwa", "Bihu luli", "Mekhela pindha kukur", "Tamul r guri", "Saala hobo", "Bajaru", "Faltu"
];

const actions = [
  "besi phitahi na maribi", "mukh tu bondho kor", "nijeke ki bhabisa kela", "tumar buddhi tu jhant er soman", 
  "ki hobo tuik loi", "din tu bal ukali thaka", "mobile tu pelai de", "bapok koba ne ki", "maa k gali khabi", 
  "dimak thik nai niki", "beul hobo mon goise niki", "luli tu katim kela", "pukur marim kela", "saala 2cmr", 
  "bhag kela iyar pora", "behan k lan dega", "goli mar dunga", "bal dore thakibi", "bara ketiaba", 
  "dimorru nikaal", "saala sukur ali", "kukur puwali kela", "bokachoda kothakar", "jhant er logic", "zero value",
  "gaand te tel di huda", "motha kharap niki", "saala kukuror logot thak", "luli tu rastaat thoi de",
  "khar khai mukh tu dhu", "bihu nach kela", "gaon r rastaat douri thak", "mental hospital ot ja"
];

const objects = [
  "nijor luli tu loi", "pukur or maach r logot", "rasta'r kukur r logot", "dustbin ot", "mobile r bhitrot",
  "tumar baper kothat", "saala sukur ali r logot", "gadha r pisot", "2cmr logic tu loi", "jhant r bosta",
  "khanki r mukhot", "bihu tolit", "khar r balti ot", "pukur r dharot", "bathroom ot goi", "gali r majot"
];

const finishers = [
  "kela.", "pukur marim.", "bara kela.", "chutiya kothakar.", "saala luli.", "2cmr kela.", "mc bc.", 
  "bhag kela.", "mukh bondho kor.", "jhant er user.", "sukur ali kothakar.", "bal tu koribi.", 
  "gaand mara kela.", "behan ke lan.", "khanki r chele.", "bara kela bara.", "hoye gol kela.", 
  "ar kiba kora.", "dimak lagau.", "zero logic kela.", "faltu kukur.", "savage luli power.", 
  "mar dabo kela.", "khatam kela.", "pukur er maach kha kela.", "go and die.", "nikal lavde.",
  "bal kela.", "jhant kela.", "bara.", "kela kela kela."
];

const staticResponses: Record<string, string[]> = {
  "water": [
    "Pani kela mukh dhuiboloi lage, kintu tui tu kukur, tui pukur ot dub mar kela.",
    "Water is H2O kela, kintu tugar murt tu bhalu r mut ase.",
    "Water? Tumar baper e ki pani r supply diye niki kela?",
    "Pani khale buddhi nahe kela, 2cmr hoi thakibi."
  ],
  "love": [
    "I love you? Go and love your sister kela.",
    "Bhal pau? Gaand mara kela.",
    "Love is for lulis. Tui tu pure 2cmr.",
    "Tugar bhal pua tu pukur r maach r logot thoi de kela."
  ],
  "fuck": [
    "Fuck you? Nijoke pukur mar kela.",
    "Mukh sambhal kukur puwali, behan ke lan.",
    "Fuck you? Tugar luli tu prothome dhu kela.",
    "Muke kela pukur marim kela, basi gali nidi."
  ],
  "who": [
    "Moi tugar baper kela. Chini pua nai?",
    "Irone kela, tumar khandaan r bosta.",
    "Moi Irone, tumar luli katar machine.",
    "Who am I? Tumar ma k hudh kela, bhal ke kobo."
  ],
  "hello": [
    "Hello kela, ki dorkar?",
    "Oi 2cmr, ki kotha?",
    "Hi hi na koribi, kamor kotha ko kela.",
    "Kukur puwali, kio matiso?"
  ],
  "song": [
    "Moi kela kukur, rasta't pori asu... luli luli luli, tui kela 2cmr luli! Sing this and die kela.",
    "O' mur aponar dekh, tumar luli tu kela bhed... pukur marim kela tugar gaand ot! Nice song no?",
    "Tukun tukun luli, 2cmr r puwali... rastaat goi kela, kha kukuror gali! My favorite kela.",
    "Luli luli luli... tui kela chutiya r puwali! Go and dance in the dustbin kela."
  ],
  "joke": [
    "Tumar jivan tu e ata joke kela. Aru ki lage?",
    "Once there was a 2cmr named you. He died. The end. Hahahaha kela.",
    "Joke? Tumar mukh tu rasta't thoi diya, manuh e hahiboi kela.",
    "Tumar buddhi tu joke kela, microscope lagibo saiboloi."
  ],
  "time": [
    "Tumar moribar homoi hoise kela. Go and die.",
    "Time? Tumar luli katar homoi hoise kela.",
    "Hoi gol kela, beshi deri nai... tui 2cmr hoi thakibi.",
    "Homoi kela baper e thik koribo? Go check your phone kela."
  ]
};

export const generateLocalRoast = (input: string = "") => {
  const lowInput = input.toLowerCase();
  
  // Intent detection
  if (lowInput.includes("water") || lowInput.includes("pani")) return staticResponses.water[Math.floor(Math.random() * staticResponses.water.length)];
  if (lowInput.includes("love") || lowInput.includes("bhal")) return staticResponses.love[Math.floor(Math.random() * staticResponses.love.length)];
  if (lowInput.includes("fuck") || lowInput.includes("gali") || lowInput.includes("bc") || lowInput.includes("mc")) return staticResponses.fuck[Math.floor(Math.random() * staticResponses.fuck.length)];
  if (lowInput.includes("who") || lowInput.includes("kon") || lowInput.includes("identity")) return staticResponses.who[Math.floor(Math.random() * staticResponses.who.length)];
  if (lowInput.includes("hello") || lowInput.includes("hi")) return staticResponses.hello[Math.floor(Math.random() * staticResponses.hello.length)];
  if (lowInput.includes("song") || lowInput.includes("sing") || lowInput.includes("gaana") || lowInput.includes("lyrics")) return staticResponses.song[Math.floor(Math.random() * staticResponses.song.length)];
  if (lowInput.includes("joke") || lowInput.includes("funny") || lowInput.includes("hahaha")) return staticResponses.joke[Math.floor(Math.random() * staticResponses.joke.length)];
  if (lowInput.includes("time") || lowInput.includes("homoi") || lowInput.includes("ghori")) return staticResponses.time[Math.floor(Math.random() * staticResponses.time.length)];

  // High-variety Quadratic Random generator (Millions of unique combinations)
  const s = subjects[Math.floor(Math.random() * subjects.length)];
  const a = actions[Math.floor(Math.random() * actions.length)];
  const o = objects[Math.floor(Math.random() * objects.length)];
  const f = finishers[Math.floor(Math.random() * finishers.length)];
  
  const templates = [
    `${s}, ${a} ${o} ${f}`,
    `${o}, ${s} ${a} ${f}`,
    `${s} ${f} ${a} ${o}`,
    `Oi ${s}! ${a}... ${o} ${f}`,
    `${s}, kela ${a} ${o}. ${f}`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

export const getLocalResponseStream = async function* (input: string = "") {
  const roast = generateLocalRoast(input);
  const words = roast.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 50)); // Fast and aggressive
  }
};
