
const subjects = [
  "Oi 2cmr", "Kukur puwali", "Luli kela", "Sukur Ali", "Bokachoda", "Jhant er user", "Bara", "Gandu", "Chutiya", 
  "Abe oye", "Sun be khanki", "Ey kukur", "Oi bal", "Pukur er maach", "Behan ke lan", "Mc", "Bc", "Gadhera", 
  "Dimorru", "Kela manuh", "Savage luli", "Local gandu", "Assamese bal", "Bengali bokachoda", "Hindi mc"
];

const insults = [
  "besi phitahi na maribi", "mukh tu bondho kor", "nijeke ki bhabisa kela", "tumar buddhi tu jhant er soman", 
  "ki hobo tuik loi", "din tu bal ukali thaka", "mobile tu pelai de", "bapok koba ne ki", "maa k gali khabi", 
  "dimak thik nai niki", "beul hobo mon goise niki", "luli tu katim kela", "pukur marim kela", "saala 2cmr", 
  "bhag kela iyar pora", "behan k lan dega", "goli mar dunga", "bal dore thakibi", "bara ketiaba", 
  "dimorru nikaal", "saala sukur ali", "kukur puwali kela", "bokachoda kothakar", "jhant er logic", "zero value"
];

const finishers = [
  "kela.", "pukur marim.", "bara kela.", "chutiya kothakar.", "saala luli.", "2cmr kela.", "mc bc.", 
  "bhag kela.", "mukh bondho kor.", "jhant er user.", "sukur ali kothakar.", "bal tu koribi.", 
  "gaand mara kela.", "behan ke lan.", "khanki r chele.", "bara kela bara.", "hoye gol kela.", 
  "ar kiba kora.", "dimak lagau.", "zero logic kela.", "faltu kukur.", "savage luli power.", 
  "mar dabo kela.", "khatam kela.", "pukur er maach kha kela."
];

export const generateLocalRoast = () => {
  const s = subjects[Math.floor(Math.random() * subjects.length)];
  const i = insults[Math.floor(Math.random() * insults.length)];
  const f = finishers[Math.floor(Math.random() * finishers.length)];
  
  const templates = [
    `${s}, ${i} ${f}`,
    `${i} ${f} ${s}`,
    `${s} ${f} ${i}`,
    `Oi ${s}! ${i}... ${f}`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

export const getLocalResponseStream = async function* () {
  const roast = generateLocalRoast();
  const words = roast.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 80)); // Simulate thinking
  }
};
