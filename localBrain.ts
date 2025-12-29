
const subjects = [
  "Oi 2cmr", "Kukur puwali", "Luli kela", "Sukur Ali", "Bokachoda", "Jhant er user", "Bara", "Gandu", "Chutiya", 
  "Abe oye", "Sun be khanki", "Ey kukur", "Oi bal", "Pukur er maach", "Behan ke lan", "Mc", "Bc", "Gadhera", 
  "Dimorru", "Kela manuh", "Savage luli", "Local gandu", "Assamese bal", "Bengali bokachoda", "Hindi mc",
  "Oye tateia", "Kukuror bhag", "Syalor puwali", "Gadha", "Phitahi luli", "Andha kukur", "Mental case",
  "Khar khuwa", "Bihu luli", "Mekhela pindha kukur", "Tamul r guri", "Saala hobo", "Bajaru", "Faltu",
  "Bherenda", "Siali r bacha", "Jondh kela", "Chapri", "Nalla", "Bhikhari", "Gutter ki paidaish",
  "Namuna", "Aadhe dimak wala", "Dhekia khuwa", "Khar-mutia", "Bhutur baper", "Mekuri puwali",
  "Pagala kukur", "Lura", "Guri-kata", "Syalor ragi", "Bandoror koli", "Ullu ka pattha", "Chaman",
  "Tharki luli", "Kachra manuh", "Dustbin or bhoot", "Kukuror leg", "Boka-hobo", "Harami luli"
];

const actions = [
  "besi phitahi na maribi", "mukh tu bondho kor", "nijeke ki bhabisa kela", "tumar buddhi tu jhant er soman", 
  "ki hobo tuik loi", "din tu bal ukali thaka", "mobile tu pelai de", "bapok koba ne ki", "maa k gali khabi", 
  "dimak thik nai niki", "beul hobo mon goise niki", "luli tu katim kela", "pukur marim kela", "saala 2cmr", 
  "bhag kela iyar pora", "behan k lan dega", "goli mar dunga", "bal dore thakibi", "bara ketiaba", 
  "dimorru nikaal", "saala sukur ali", "kukur puwali kela", "bokachoda kothakar", "jhant er logic", "zero value",
  "gaand te tel di huda", "motha kharap niki", "saala kukuror logot thak", "luli tu rastaat thoi de",
  "khar khai mukh tu dhu", "bihu nach kela", "gaon r rastaat douri thak", "mental hospital ot ja",
  "mekhela pindhi nach", "nale me jaake mar", "shakal dekh apni kela", "aukat me reh", "paisa nikal be",
  "motha tu gila kor", "syalor dore ragi mar", "baal dore sae thak", "dhol pitibo najana",
  "khanki r dore kotha nokobi", "gaand mara kela", "pukur ot dub mar", "rastaat bhik mag", "jhant ukali thak"
];

const objects = [
  "nijor luli tu loi", "pukur or maach r logot", "rasta'r kukur r logot", "dustbin ot", "mobile r bhitrot",
  "tumar baper kothat", "saala sukur ali r logot", "gadha r pisot", "2cmr logic tu loi", "jhant r bosta",
  "khanki r mukhot", "bihu tolit", "khar r balti ot", "pukur r dharot", "bathroom ot goi", "gali r majot",
  "Paltan Bazar r kachrot", "Dhubri r pukhuri t", "Brahmaputra r dharot", "Tamul r guri t",
  "Nale ke paas", "Kachre ke dibbe me", "Sandaas me", "Sadak pe", "Bhoot r banglow t",
  "Mokha kharap r logot", "Kukuror bhura t", "Gutter r pani t", "Bathroom or goli t",
  "Bajar r majot", "Police thant", "Hospital or bed ot", "Mental case r logot"
];

const finishers = [
  "kela.", "pukur marim.", "bara kela.", "chutiya kothakar.", "saala luli.", "2cmr kela.", "mc bc.", 
  "bhag kela.", "mukh bondho kor.", "jhant er user.", "sukur ali kothakar.", "bal tu koribi.", 
  "gaand mara kela.", "behan ke lan.", "khanki r chele.", "bara kela bara.", "hoye gol kela.", 
  "ar kiba kora.", "dimak lagau.", "zero logic kela.", "faltu kukur.", "savage luli power.", 
  "mar dabo kela.", "khatam kela.", "pukur or maach kha kela.", "go and die.", "nikal lavde.",
  "bal kela.", "jhant kela.", "bara.", "kela kela kela.", "saala nalla.", "bhikhari kothakar.",
  "khub savage hoi aso?", "luli katim kela.", "gaand fati jabo.", "bhag rasta't.", "mental kela."
];

const shayariOpeners = [
  "Arz kiya hai, duniya mein gham hai...",
  "Dil toota hai tumhara, aankhon mein paani...",
  "Tanhayi ka aalam hai, raat hai bhari...",
  "Dard-e-dil ki dastaan kya sunayein...",
  "Log kehte hain ishq mein maza hai...",
  "Zindagi ek dhoka hai, sab ne jana hai...",
  "Aasman mein taare, zameen pe andhera...",
  "Waqt ne kiya kya haseen sitam...",
  "Bikhre hue sapne, toota hua dil...",
  "Shayar bante hain log dard-e-dil se...",
  "Tanhayi ki raahon mein bhatak raha hoon...",
  "Maut ka intezaar hai is dil ko..."
];

const shayariPunchlines = [
  "Par tu kela pure 2cmr luli hai.",
  "Tumar gaand ot kela pukur marim kela.",
  "Saala kukuror puwali, dustbin ot goi mor.",
  "Tugar logic tu kela jhant er soman.",
  "Go and cry in the gutter, nalla kothakar.",
  "Behan ke lan, rona band kor kukur puwali.",
  "Bapok koba niki tumar luli tu 2cmr hoi gol?",
  "Zindagi joke hai, aur tui kela biggest joke.",
  "Shayari sunega? Gaand mara kela.",
  "Pukur or maach r logot goi bhal pau ko kela.",
  "Mental hospital r rasta tu huda niki kela?",
  "Bara kela, tugar mukh tu saala sukur ali."
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
    "Luli luli luli... tui kela chutiya r puwali! Go and dance in the dustbin kela.",
    "Ek do teen kela, tugar luli tu bean... go and sing in the gutter kela."
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
  
  // Emotional / Sad Intent (The Shayari Engine)
  const sadKeywords = ["sad", "dukhi", "cry", "rona", "upset", "alone", "broken", "dard", "depression", "feeling", "hurt"];
  if (sadKeywords.some(k => lowInput.includes(k))) {
    const opener = shayariOpeners[Math.floor(Math.random() * shayariOpeners.length)];
    const punch = shayariPunchlines[Math.floor(Math.random() * shayariPunchlines.length)];
    return `${opener}\n\n${punch}`;
  }

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
    `${s}, kela ${a} ${o}. ${f}`,
    `${a} ${s} in ${o}, ${f}`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

export const getLocalResponseStream = async function* (input: string = "") {
  const roast = generateLocalRoast(input);
  const words = roast.split(' ');
  for (const word of words) {
    yield word + ' ';
    await new Promise(resolve => setTimeout(resolve, 50)); 
  }
};
