import { getSign, txt, baseLang } from "./signs.js";

// Respect the user's selected regional language (en-IN, hi-IN, mr-IN) for TTS & STT!
export const contentLang = (lang) => lang || "en-IN";

export const UI_TEXT = {
  en: {
    tutorTitle: "Your Voice Tutor",
    teachBadge: "Step 1 · Learn First",
    quizBadge: "Step 2 · Check Understanding",
    ready: "Ready",
    speaking: "🔊 Tutor is speaking…",
    listening: "🎤 Listening… speak now",
    processing: "⏳ Checking your answer…",
    listenLesson: "🔊 Replay lesson",
    readyQuiz: "I understand! Ask me questions →",
    hearQuestion: "🔊 Hear question again",
    tapAnswer: "🎤 Tap and speak your answer",
    stopMic: "⏹ Stop listening",
    youSaid: "You said:",
    replayFb: "🔊 Replay feedback",
    tryAgain: "🔁 Try again",
    cantSpeak: "Can't speak? Type your answer",
    checkTyped: "Check typed answer",
    goPractice: "Go to practice →",
    nextQ: "Next question →",
    visualLabel: "What it looks like",
    meaningLabel: "What it means",
    actionLabel: "What a driver should do",
    categoryLabel: "Category",
  },
  hi: {
    tutorTitle: "आपका वॉयस ट्यूटर",
    teachBadge: "चरण 1 · पहले सीखें",
    quizBadge: "चरण 2 · अपनी समझ जांचें",
    ready: "तैयार",
    speaking: "🔊 ट्यूटर बोल रहा है…",
    listening: "🎤 सुन रहा है… अब बोलें",
    processing: "⏳ आपका उत्तर जांचा जा रहा है…",
    listenLesson: "🔊 पाठ दोबारा सुनें",
    readyQuiz: "मैं समझ गया! अब मुझसे प्रश्न पूछें →",
    hearQuestion: "🔊 प्रश्न दोबारा सुनें",
    tapAnswer: "🎤 टैप करें और बोलकर उत्तर दें",
    stopMic: "⏹ सुनना बंद करें",
    youSaid: "आपने कहा:",
    replayFb: "🔊 सुझाव दोबारा सुनें",
    tryAgain: "🔁 फिर से प्रयास करें",
    cantSpeak: "बोल नहीं सकते? अपना उत्तर टाइप करें",
    checkTyped: "टाइप किया उत्तर जांचें",
    goPractice: "अभ्यास पर जाएं →",
    nextQ: "अगला प्रश्न →",
    visualLabel: "यह कैसा दिखता है",
    meaningLabel: "इसका मतलब",
    actionLabel: "ड्राइवर को क्या करना चाहिए",
    categoryLabel: "श्रेणी",
  },
  mr: {
    tutorTitle: "तुमचा व्हॉइस ट्यूटर",
    teachBadge: "पायरी १ · आधी शिका",
    quizBadge: "पायरी २ · तुमची समज तपासा",
    ready: "तयार",
    speaking: "🔊 ट्यूटर बोलत आहे…",
    listening: "🎤 ऐकत आहे… आता बोला",
    processing: "⏳ तुमचे उत्तर तपासत आहे…",
    listenLesson: "🔊 धडा पुन्हा ऐका",
    readyQuiz: "मला समजले! आता मला प्रश्न विचारा →",
    hearQuestion: "🔊 प्रश्न पुन्हा ऐका",
    tapAnswer: "🎤 टॅप करा आणि बोलून उत्तर द्या",
    stopMic: "⏹ ऐकणे थांबवा",
    youSaid: "तुम्ही म्हणालात:",
    replayFb: "🔊 अभिप्राय पुन्हा ऐका",
    tryAgain: "🔁 पुन्हा प्रयत्न करा",
    cantSpeak: "बोलता येत नाही? उत्तर टाइप करा",
    checkTyped: "टाइप केलेले उत्तर तपासा",
    goPractice: "सरावाकडे जा →",
    nextQ: "पुढील प्रश्न →",
    visualLabel: "हे कसे दिसते",
    meaningLabel: "याचा अर्थ",
    actionLabel: "चालकाने काय करावे",
    categoryLabel: "प्रकार",
  },
};

export const uiTxt = (lang) => UI_TEXT[baseLang(lang)] || UI_TEXT.en;

export const MISC = {
  M1: {
    title: "Thinks every triangular sign means STOP",
    feedback: "Not every triangular sign means STOP. Triangular warning signs generally warn us about a possible hazard. The STOP sign has a distinctive octagonal shape.",
    hiFeedback: "हर त्रिकोणी साइन का मतलब STOP नहीं होता। त्रिकोण वाले साइन आगे के खतरे की चेतावनी देते हैं। STOP साइन आठ भुजाओं वाला (अष्टकोण) होता है।",
    mrFeedback: "प्रत्येक त्रिकोणी चिन्हाचा अर्थ STOP नसतो. त्रिकोणी चिन्हे पुढील धोक्याची सूचना देतात. STOP चिन्हाचा आकार आठ बाजूंचा (अष्टकोनी) असतो.",
    clue: ["STOP"],
  },
  M2: {
    title: "Thinks the pedestrian-crossing sign tells pedestrians to stop",
    feedback: "This sign alerts road users that pedestrians may cross here. Drivers should watch for pedestrians and follow the applicable crossing and right-of-way rules.",
    hiFeedback: "यह साइन पैदल चलने वालों को रुकने के लिए नहीं कहता, बल्कि ड्राइवरों को सावधान करता है कि यहाँ लोग सड़क पार कर सकते हैं। ड्राइवरों को गाड़ी धीमी करके उन्हें रास्ता देना चाहिए।",
    mrFeedback: "हे चिन्ह पादचाऱ्यांना थांबायला सांगत नाही, तर वाहन चालकांना इशारा देते की येथे लोक रस्ता ओलांडू शकतात. चालकांनी वेग कमी करून त्यांना रस्ता द्यावा.",
    clue: ["PEDESTRIAN_CROSSING"],
  },
};

export const miscFeedback = (code, lang) => {
  const m = MISC[code];
  if (!m) return "";
  const b = baseLang(lang);
  if (b === "hi") return m.hiFeedback;
  if (b === "mr") return m.mrFeedback;
  return m.feedback;
};

export const DIFF = {
  "SPEED_LIMIT_40|NO_ENTRY":
    "Good observation! My first guess was incorrect. Look at the number 40 inside the circular sign. A No Entry sign has a horizontal white bar. These two signs communicate different instructions.",
};

// Multilingual keywords (English + Hindi + Marathi + phonetic transliterations)
const KEY = {
  STOP: {
    name: ["stop", "ruk", "रुक", "स्टॉप", "थांबा", "थांब", "thamb", "thamba"],
    action: ["stop", "halt", "wait", "ruk", "रुक", "थांब", "रुकना", "थांबावे", "ब्रेक", "brake"],
  },
  NO_ENTRY: {
    name: ["no entry", "not enter", "do not enter", "प्रवेश", "नो एंट्री", "मना", "बंद", "pravesh", "band"],
    action: ["not enter", "don t enter", "another", "other route", "different route", "avoid", "turn", "नहीं", "मत जा", "दूसरा", "रास्ता", "जाऊ नका", "दुसरा", "मार्ग", "वळ", "मनाई"],
  },
  SPEED_LIMIT_40: {
    name: ["40", "forty", "speed", "गति", "रफ्तार", "चालीस", "४०", "चाळीस", "वेग", "स्पीड", "मर्यादा"],
    action: ["slow", "40", "forty", "reduce", "less", "below", "धीमा", "धीमी", "कम", "कमी", "हळू", "चाळीस", "चालीस", "४०", "वेग", "गति"],
  },
  SCHOOL_AHEAD: {
    name: ["school", "स्कूल", "शाळा", "विद्यालय", "shala", "बच्चे", "मुले"],
    action: ["slow", "careful", "children", "kids", "ready to stop", "धीमा", "धीमी", "सावधान", "बच्चे", "रुकने", "हळू", "कमी", "काळजी", "मुले", "थांब"],
  },
  PEDESTRIAN_CROSSING: {
    name: ["pedestrian", "crossing", "zebra", "cross", "पैदल", "क्रॉसिंग", "ज़ेब्रा", "झेब्रा", "पादचारी", "पारपथ"],
    action: ["slow", "give way", "let", "watch", "wait for", "stop for", "careful", "धीमा", "धीमी", "रास्ता", "रस्ता", "पार", "हळू", "कमी", "थांब", "जाने दें", "ओलांडू"],
  },
  PARKING: {
    name: ["parking", "park", "पार्किंग", "पार्क", "गाडी", "वाहन"],
    action: ["park", "पार्क", "खड़ी", "उभी", "लावा", "पार्किंग"],
  },
  HOSPITAL: {
    name: ["hospital", "अस्पताल", "हॉस्पिटल", "रुग्णालय", "दवाखाना"],
    action: ["quiet", "horn", "honk", "silent", "slow", "ambulance", "शांति", "शांतता", "हॉर्न", "एम्बुलेंस", "अँब्युलन्स", "धीमा", "हळू", "रास्ता", "रस्ता"],
  },
};

const PED_STOP = /(pedestrian|people|walker|person|they|पैदल|लोग|पादचारी)\w*\s+(\w+\s+){0,2}(must |should |have to |need to )?(stop|halt|wait|रुक|थांब)/i;

export const tutorQuestions = (sign, lang = "en-IN") => {
  const b = baseLang(lang);
  const s = txt(sign, lang);
  if (b === "hi") {
    return [
      { kind: "name", ask: "अब अपनी समझ जांचते हैं। स्क्रीन पर दिख रहे इस साइन का नाम क्या है? बोलकर बताएं।" },
      { kind: "action", ask: `बहुत बढ़िया! जब ड्राइवर '${s.name}' साइन देखें, तो उन्हें क्या करना चाहिए?` },
    ];
  }
  if (b === "mr") {
    return [
      { kind: "name", ask: "आता तुमची समज तपासूया. स्क्रीनवर दिसणाऱ्या या चिन्हाचे नाव काय आहे? बोलून सांगा." },
      { kind: "action", ask: `छान! जेव्हा वाहन चालकाला '${s.name}' हे चिन्ह दिसते, तेव्हा त्याने काय करावे?` },
    ];
  }
  return [
    { kind: "name", ask: "Now let's check what you learned! Look at the sign on your screen. What is it called? Say its name." },
    { kind: "action", ask: `Great! What should a driver do when they see the ${s.name} sign?` },
  ];
};

export function evaluateSpoken(sign, kind, text, lang = "en-IN") {
  const b = baseLang(lang);
  const s = txt(sign, lang);
  // Preserve Unicode Devanagari characters (\u0900-\u097F) alongside Latin letters and digits
  const t = (text || "").toLowerCase().replace(/[^\p{L}\p{N} ]/gu, " ").trim();

  if (!t) {
    const emptyMsg = {
      en: "I couldn't hear a clear answer. Please tap the mic and try again.",
      hi: "मुझे स्पष्ट उत्तर सुनाई नहीं दिया। कृपया माइक दबाएं और फिर से बोलें।",
      mr: "मला स्पष्ट उत्तर ऐकू आले नाही. कृपया माइक दाबा आणि पुन्हा प्रयत्न करा.",
    };
    return { status: "empty", correct: false, feedback: emptyMsg[b] || emptyMsg.en };
  }

  // M1 check: Triangular sign confused with STOP
  const saidStop = /\b(stop|स्टॉप|रुकिए|थांबा)\b/u.test(t);
  const saidRightTriangle = /(school|pedestrian|crossing|warning|children|स्कूल|शाळा|पैदल|पादचारी)/u.test(t);
  if (kind === "name" && sign.shape === "Triangle" && saidStop && !saidRightTriangle) {
    const retryPrompt = {
      en: " Look at the shape and colour of this sign, then try again.",
      hi: " इस साइन के आकार और रंग को ध्यान से देखें और फिर कोशिश करें।",
      mr: " या चिन्हाचा आकार आणि रंग नीट पहा आणि पुन्हा प्रयत्न करा.",
    };
    return {
      status: "misconception", misconception: "M1", correct: false, clue: ["STOP", sign.id],
      feedback: miscFeedback("M1", lang) + (retryPrompt[b] || retryPrompt.en),
    };
  }

  // M2 check: Pedestrian crossing tells pedestrians to stop
  if (kind === "action" && sign.id === "PEDESTRIAN_CROSSING" && PED_STOP.test(t)) {
    const retryPrompt = {
      en: " Now, what should a driver do here?",
      hi: " अब बताएं, यहाँ ड्राइवर को क्या करना चाहिए?",
      mr: " आता सांगा, येथे वाहन चालकाने काय करावे?",
    };
    return {
      status: "misconception", misconception: "M2", correct: false, clue: ["PEDESTRIAN_CROSSING"],
      feedback: miscFeedback("M2", lang) + (retryPrompt[b] || retryPrompt.en),
    };
  }

  if (KEY[sign.id][kind].some((w) => t.includes(w))) {
    const correctMsg = {
      en: kind === "name" ? `Correct! This is the ${s.name} sign. ${s.meaning}` : `Correct! ${s.action}`,
      hi: kind === "name" ? `बिल्कुल सही! यह ${s.name} साइन है। ${s.meaning}` : `बिल्कुल सही! ${s.action}`,
      mr: kind === "name" ? `अगदी बरोबर! हे ${s.name} चिन्ह आहे. ${s.meaning}` : `अगदी बरोबर! ${s.action}`,
    };
    return { status: "correct", correct: true, feedback: correctMsg[b] || correctMsg.en };
  }

  const wrongMsg = {
    en: `Not quite. Look closely: ${s.visual} Try again.`,
    hi: `थोड़ा और सोचें। ध्यान से देखें: ${s.visual} फिर से कोशिश करें।`,
    mr: `जवळजवळ बरोबर, पण नीट पहा: ${s.visual} पुन्हा प्रयत्न करा.`,
  };
  return { status: "incorrect", correct: false, feedback: wrongMsg[b] || wrongMsg.en };
}

// ---------- Practice content ----------
export const MATCH = [
  { id: "mt1", topic: "STOP", answer: "Mandatory" },
  { id: "mt2", topic: "SPEED_LIMIT_40", answer: "Prohibitory" },
  { id: "mt3", topic: "NO_ENTRY", answer: "Prohibitory" },
  { id: "mt4", topic: "SCHOOL_AHEAD", answer: "Warning" },
  { id: "mt5", topic: "PARKING", answer: "Informatory" },
].map((m) => ({
  ...m, outcome: "O1", explanation: {
    Mandatory: "Mandatory signs give an order you must follow.",
    Prohibitory: "Prohibitory signs tell you what you must NOT do.",
    Warning: "Warning signs tell you about a hazard ahead.",
    Informatory: "Informatory signs give helpful information.",
  }[m.answer],
}));

export const MCQS = [
  {
    id: "m1", outcome: "M", format: "mcq", topic: "STOP", showSign: "SCHOOL_AHEAD",
    text: "Rohan says: \"Every triangular sign means STOP.\" Who is right?",
    hiText: "रोहन कहता है: \"हर त्रिकोण साइन का मतलब STOP होता है।\" कौन सही है?",
    mrText: "रोहन म्हणतो: \"प्रत्येक त्रिकोणी चिन्हाचा अर्थ STOP असतो.\" कोण बरोबर आहे?",
    options: ["Rohan is right. All triangles mean stop.", "Triangles usually warn about a hazard. STOP is an octagon.", "Triangles mean No Entry."],
    answer: 1, misc: { 0: "M1" },
    explanation: "Triangles are warning signs. STOP has eight sides and red colour.",
    correct: "Yes! Triangles warn us about a hazard. STOP is the octagon.",
    hiCorrect: "सही जवाब! त्रिकोण आगे के खतरे की चेतावनी देते हैं। STOP आठ भुजाओं वाला होता है।",
    mrCorrect: "बरोबर! त्रिकोण धोक्याची सूचना देतात. STOP अष्टकोनी आकाराचे असते.",
    incorrect: "Not quite. Look at the shape: STOP is an octagon, while triangles warn about hazards.",
    hiIncorrect: "सही नहीं। आकार देखें: STOP अष्टकोण है, जबकि त्रिकोण खतरे की चेतावनी देते हैं।",
    mrIncorrect: "बरोबर नाही. आकार पहा: STOP अष्टकोनी आहे, तर त्रिकोण धोक्याची सूचना देतात.",
  },
  {
    id: "m2", outcome: "M", format: "mcq", topic: "PEDESTRIAN_CROSSING", showSign: "PEDESTRIAN_CROSSING",
    text: "What does this sign tell us?",
    hiText: "यह साइन हमें क्या बताता है?",
    mrText: "हे चिन्ह आपल्याला काय सांगते?",
    options: ["Pedestrians must stop here.", "People may cross here. Drivers watch out and give way.", "Walking is not allowed here."],
    answer: 1, misc: { 0: "M2" },
    explanation: "It warns drivers that people may be crossing.",
    correct: "Right! It warns that people may cross, so drivers must be careful.",
    hiCorrect: "सही! यह बताता है कि लोग सड़क पार कर सकते हैं, इसलिए ड्राइवरों को सावधान रहना चाहिए।",
    mrCorrect: "बरोबर! लोक रस्ता ओलांडू शकतात याची ही सूचना आहे, म्हणून चालकांनी काळजी घ्यावी.",
    incorrect: "Not quite. Look at the walking person. The sign warns drivers; it does not give orders to pedestrians.",
    hiIncorrect: "सही नहीं। चलते हुए व्यक्ति को देखें। यह साइन ड्राइवरों को चेतावनी देता है, पैदल चलने वालों को नहीं।",
    mrIncorrect: "बरोबर नाही. चालणाऱ्या व्यक्तीकडे पहा. हे चिन्ह चालकांना इशारा देते, पादचाऱ्यांना नाही.",
  },
  ...[
    ["s1", "SCHOOL_AHEAD",
      "You ride a bicycle and see a SCHOOL AHEAD sign with children near the road. What do you do?",
      "आप साइकिल चला रहे हैं और सड़क के पास बच्चों के साथ 'आगे स्कूल है' साइन देखते हैं। आप क्या करेंगे?",
      "तुम्ही सायकल चालवत आहात आणि रस्त्याजवळ मुले व 'पुढे शाळा आहे' चिन्ह दिसते. तुम्ही काय कराल?",
      ["Speed up to pass quickly", "Slow down and be ready to stop", "Honk loudly and keep going"], 1,
      "Children may run onto the road, so slow down.",
      "बच्चे अचानक सड़क पर आ सकते हैं, इसलिए गति धीमी करें।",
      "मुले अचानक रस्त्यावर येऊ शकतात, म्हणून वेग कमी करा."],
    ["s2", "STOP",
      "You reach a STOP sign at a quiet junction. No vehicle is visible. What do you do?",
      "आप एक शांत चौराहे पर STOP साइन पर पहुँचते हैं। कोई गाड़ी नहीं दिख रही। आप क्या करेंगे?",
      "तुम्ही एका शांत चौकात STOP चिन्हाजवळ पोहोचता. कोणतेही वाहन दिसत नाही. तुम्ही काय कराल?",
      ["Slow down and roll through", "Stop fully, look both ways, then go", "Honk and go"], 1,
      "STOP means a full halt, even when the road looks empty.",
      "सड़क खाली होने पर भी STOP का मतलब पूरी तरह रुकना है।",
      "रस्ता रिकामा दिसत असला तरी STOP म्हणजे पूर्णपणे थांबणे."],
    ["s3", "NO_ENTRY",
      "You see a NO ENTRY sign at the lane you usually use. What do you do?",
      "आप अपनी रोज़ की गली में NO ENTRY का साइन देखते हैं। आप क्या करेंगे?",
      "तुम्ही नेहमी वापरत असलेल्या रस्त्यावर NO ENTRY चे चिन्ह दिसते. तुम्ही काय कराल?",
      ["Enter slowly", "Enter if nobody is looking", "Do not enter. Take another route"], 2,
      "NO ENTRY means vehicles must not enter from this side.",
      "NO ENTRY का मतलब है इस तरफ से वाहन प्रवेश नहीं कर सकते।",
      "NO ENTRY म्हणजे या बाजूने वाहनांना प्रवेश बंद आहे."],
    ["s4", "PEDESTRIAN_CROSSING",
      "You are driving. Near a PEDESTRIAN CROSSING sign, a person steps onto the road. What do you do?",
      "आप गाड़ी चला रहे हैं। पैदल पारपथ साइन के पास एक व्यक्ति सड़क पर आता है। आप क्या करेंगे?",
      "तुम्ही वाहन चालवत आहात. पादचारी मार्गाजवळ एक व्यक्ती रस्त्यावर येते. तुम्ही काय कराल?",
      ["Honk so they hurry", "Slow down and let them cross", "Drive faster to get past"], 1,
      "Drivers must watch for pedestrians and give way.",
      "ड्राइवरों को पैदल चलने वालों का ध्यान रखना और उन्हें रास्ता देना चाहिए।",
      "चालकांनी पादचाऱ्यांची काळजी घ्यावी आणि त्यांना रस्ता द्यावा."],
    ["s5", "HOSPITAL",
      "You see a HOSPITAL sign. What is the best behaviour?",
      "आपको अस्पताल (HOSPITAL) का साइन दिखता है। सबसे सही व्यवहार क्या है?",
      "तुम्हाला रुग्णालय (HOSPITAL) चे चिन्ह दिसते. सर्वात योग्य वर्तन कोणते?",
      ["Honk to clear the road", "Drive slowly, keep the horn quiet and give way to ambulances", "Park in the middle of the road"], 1,
      "Hospitals need quiet, and ambulances need a clear path.",
      "अस्पताल के पास शांति और एम्बुलेंस को साफ रास्ता चाहिए।",
      "रुग्णालयाजवळ शांतता आणि अँब्युलन्सला मोकळा रस्ता आवश्यक असतो."],
  ].map(([id, topic, text, hiText, mrText, options, answer, explanation, hiExp, mrExp]) => ({
    id, outcome: "O3", format: "scenario", topic, showSign: topic, text, hiText, mrText, options, answer, explanation,
    correct: "Safe choice! " + explanation,
    hiCorrect: "सुरक्षित चुनाव! " + hiExp,
    mrCorrect: "सुरक्षित निवड! " + mrExp,
    incorrect: "That would not be safe. " + explanation,
    hiIncorrect: "यह सुरक्षित नहीं होगा। " + hiExp,
    mrIncorrect: "हे सुरक्षित ठरणार नाही. " + mrExp,
  })),
];

export const SHORTS = [
  {
    id: "e1", topic: "STOP", outcome: "O2", format: "short",
    text: "Explain what this sign means. Use its colour and shape.",
    hiText: "इस साइन का मतलब बताएं। इसके रंग और आकार का उल्लेख करें।",
    mrText: "या चिन्हाचा अर्थ सांगा. त्याचा रंग आणि आकार सांगा.",
    visual: ["red", "octagon", "eight", "8", "लाल", "अष्टकोण", "आठ", "८"],
    meaning: ["stop", "halt", "wait", "रुक", "स्टॉप", "थांब"],
    model: "It is a red octagon. It means stop completely.",
    hiModel: "यह एक लाल अष्टकोण है। इसका मतलब पूरी तरह रुकना है।",
    mrModel: "हा एक लाल अष्टकोन आहे. याचा अर्थ पूर्णपणे थांबा.",
  },
  {
    id: "e2", topic: "SPEED_LIMIT_40", outcome: "O2", format: "short",
    text: "Explain what this sign means. Use its colour and shape.",
    hiText: "इस साइन का मतलब बताएं। इसके रंग और आकार का उल्लेख करें।",
    mrText: "या चिन्हाचा अर्थ सांगा. त्याचा रंग आणि आकार सांगा.",
    visual: ["red", "circle", "round", "ring", "40", "forty", "number", "लाल", "गोला", "वर्तुळ", "४०", "चालीस", "चाळीस"],
    meaning: ["speed", "fast", "slow", "limit", "km", "not more", "गति", "रफ्तार", "धीमा", "वेग", "मर्यादा", "हळू", "कमी"],
    model: "It is a red circle with 40 inside. Do not drive faster than 40 km/h.",
    hiModel: "यह लाल गोला है जिसमें 40 लिखा है। 40 किलोमीटर प्रति घंटे से तेज़ न चलाएं।",
    mrModel: "हे लाल वर्तुळ असून आत 40 लिहिले आहे. ताशी 40 किमी पेक्षा वेगाने जाऊ नका.",
  },
  {
    id: "e3", topic: "SCHOOL_AHEAD", outcome: "O2", format: "short",
    text: "Explain what this sign means. Use its colour and shape.",
    hiText: "इस साइन का मतलब बताएं। इसके रंग और आकार का उल्लेख करें।",
    mrText: "या चिन्हाचा अर्थ सांगा. त्याचा रंग आणि आकार सांगा.",
    visual: ["red", "triangle", "children", "kids", "people", "लाल", "त्रिकोण", "बच्चे", "मुले"],
    meaning: ["school", "slow", "careful", "children", "warn", "स्कूल", "शाळा", "धीमा", "हळू", "सावधान", "चेतावनी"],
    model: "It is a red triangle with children. A school is near, so slow down.",
    hiModel: "यह बच्चों वाला लाल त्रिकोण है। पास में स्कूल है, इसलिए गति धीमी करें।",
    mrModel: "हा मुलांचा लाल त्रिकोण आहे. जवळ शाळा आहे, म्हणून वेग कमी करा.",
  },
].map((e) => ({ ...e, showSign: e.topic }));

export function evaluateShort(task, text, lang = "en-IN") {
  const b = baseLang(lang);
  const t = (text || "").toLowerCase();
  if (!t.trim()) {
    return {
      correct: false,
      feedback: b === "hi" ? "मुझे उत्तर नहीं मिला। फिर से प्रयास करें।" : b === "mr" ? "मला उत्तर मिळाले नाही. पुन्हा प्रयत्न करा." : "I didn't get an answer. Try again.",
    };
  }
  const v = task.visual.some((w) => t.includes(w));
  const m = task.meaning.some((w) => t.includes(w));
  const model = b === "hi" ? task.hiModel : b === "mr" ? task.mrModel : task.model;
  if (v && m) {
    const okPrefix = b === "hi" ? "बहुत बढ़िया व्याख्या! " : b === "mr" ? "छान स्पष्टीकरण! " : "Great explanation! You used what you can see and what it means. ";
    return { correct: true, feedback: okPrefix + model };
  }
  if (!v) {
    return {
      correct: false,
      feedback: b === "hi" ? "अच्छी शुरुआत! अब इसका रंग या आकार भी बताएं।" : b === "mr" ? "चांगली सुरुवात! आता त्याचा रंग किंवा आकारही सांगा." : "Good start. Now also tell me about the colour or shape you can see.",
    };
  }
  return {
    correct: false,
    feedback: b === "hi" ? "आपने आकार तो सही बताया। अब बताएं कि इस साइन का नियम क्या है।" : b === "mr" ? "तुम्ही आकार छान सांगितला. आता या चिन्हाचा अर्थ सांगा." : "You described what you see. Now tell me what the sign means for road users.",
  };
}

export const signName = (id, lang = "en-IN") => txt(getSign(id), lang)?.name || id;
