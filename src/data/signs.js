// Approved catalogue with English (en), Hindi (hi), and Marathi (mr) translations.
// Fallback is always "en".
export const SIGNS = [
  {
    id: "STOP", category: "Mandatory", shape: "Octagon", color: "Red with white text",
    en: {
      name: "STOP",
      categoryLabel: "Mandatory (Must follow)",
      visual: "Red octagon (8 sides) with the word STOP in white.",
      meaning: "Come to a complete halt, look both ways, and go only when it is safe.",
      action: "Stop fully at the line, even if the road looks empty.",
      lesson: "Look closely at this sign. It is a red 8-sided shape called an octagon. This is the STOP sign. It is a Mandatory rule, which means every driver MUST come to a complete stop at the line, look both ways, and move only when the road is completely safe."
    },
    hi: {
      name: "रुकिए (STOP)",
      categoryLabel: "अनिवार्य (Mandatory)",
      visual: "सफेद अक्षरों में STOP लिखा हुआ लाल अष्टकोण (8 भुजाओं वाला आकार)।",
      meaning: "पूरी तरह से रुक जाएं, दोनों तरफ देखें और सुरक्षित होने पर ही आगे बढ़ें।",
      action: "भले ही सड़क खाली दिखे, लाइन पर पूरी तरह रुकें।",
      lesson: "इस साइन को ध्यान से देखें। यह 8 भुजाओं वाला लाल आकार है। इसे रुकिए यानी STOP साइन कहते हैं। यह एक अनिवार्य नियम है। जब भी ड्राइवर यह साइन देखें, उन्हें लाइन पर पूरी तरह रुकना चाहिए, दोनों तरफ देखना चाहिए और रास्ता साफ होने पर ही आगे बढ़ना चाहिए।"
    },
    mr: {
      name: "थांबा (STOP)",
      categoryLabel: "बंधनकारक (Mandatory)",
      visual: "पांढऱ्या अक्षरात STOP लिहिलेला लाल अष्टकोन (८ बाजूंचा आकार).",
      meaning: "पूर्णपणे थांबा, दोन्ही बाजूंनी पहा आणि सुरक्षित असेल तेव्हाच पुढे जा.",
      action: "रस्ता रिकामा दिसत असला तरी रेषेवर पूर्णपणे थांबा.",
      lesson: "या चिन्हाकडे नीट पहा. हा ८ बाजूंचा लाल अष्टकोनी आकार आहे. याला थांबा म्हणजेच STOP चिन्ह म्हणतात. हा बंधनकारक नियम आहे. हे चिन्ह दिसताच वाहन चालकाने रेषेवर पूर्ण थांबून दोन्ही बाजूंनी पाहावे आणि सुरक्षित असल्यावरच पुढे जावे."
    }
  },
  {
    id: "NO_ENTRY", category: "Prohibitory", shape: "Circle", color: "Red circle, white horizontal bar",
    en: {
      name: "NO ENTRY",
      categoryLabel: "Prohibitory (Not allowed)",
      visual: "Red circle with one solid white horizontal bar across the middle.",
      meaning: "Vehicles must not enter this road from this side.",
      action: "Do not enter. Find another route.",
      lesson: "Look at this red circle with a white bar across the middle. This is the NO ENTRY sign. Red circular signs tell us what is NOT allowed. This sign means vehicles cannot enter this road from your side, so you must turn around and take another route."
    },
    hi: {
      name: "प्रवेश निषेध (NO ENTRY)",
      categoryLabel: "निषेधात्मक (मना है)",
      visual: "बीच में सफेद आड़ी पट्टी वाला लाल गोला।",
      meaning: "इस तरफ से वाहनों को इस सड़क पर प्रवेश नहीं करना चाहिए।",
      action: "अंदर न जाएं। कोई दूसरा रास्ता चुनें।",
      lesson: "बीच में सफेद पट्टी वाले इस लाल गोले को देखें। इसे प्रवेश निषेध यानी NO ENTRY कहते हैं। लाल गोल साइन हमें बताते हैं कि क्या करना मना है। इसका मतलब है कि गाड़ियाँ इस तरफ से अंदर नहीं जा सकतीं, इसलिए दूसरा रास्ता चुनें।"
    },
    mr: {
      name: "प्रवेश बंद (NO ENTRY)",
      categoryLabel: "मनाई चिन्ह (परवानगी नाही)",
      visual: "मध्ये पांढरी आडवी पट्टी असलेले लाल वर्तुळ.",
      meaning: "या बाजूने वाहनांना या रस्त्यावर प्रवेश करण्यास मनाई आहे.",
      action: "आत जाऊ नका. दुसरा मार्ग शोधा.",
      lesson: "मध्ये पांढरी आडवी पट्टी असलेल्या या लाल वर्तुळाकडे पहा. याला प्रवेश बंद म्हणजेच NO ENTRY म्हणतात. लाल गोलाकार चिन्हे आपल्याला काय करू नये हे सांगतात. या रस्त्यावर या बाजूने वाहने नेता येत नाहीत, म्हणून दुसरा मार्ग निवडावा."
    }
  },
  {
    id: "SPEED_LIMIT_40", category: "Prohibitory", shape: "Circle", color: "Red ring, number 40 inside",
    en: {
      name: "SPEED LIMIT 40",
      categoryLabel: "Prohibitory (Limit)",
      visual: "White circle with a red ring border and the number 40 inside.",
      meaning: "Do not drive faster than 40 kilometres per hour here.",
      action: "Check your speed and slow down to 40 or less.",
      lesson: "Notice this circular sign with a red border and the number 40 written inside. This is the SPEED LIMIT 40 sign. Unlike No Entry which has a white bar, this sign shows a number. It tells drivers they must not drive faster than 40 kilometres per hour here."
    },
    hi: {
      name: "गति सीमा 40 (SPEED LIMIT 40)",
      categoryLabel: "निषेधात्मक (सीमा)",
      visual: "लाल किनारे वाला गोला जिसके अंदर 40 नंबर लिखा है।",
      meaning: "यहाँ 40 किलोमीटर प्रति घंटे से तेज़ गाड़ी न चलाएं।",
      action: "अपनी गति जांचें और इसे 40 या उससे कम करें।",
      lesson: "लाल घेरे के अंदर लिखे 40 नंबर वाले इस गोल साइन को देखें। यह गति सीमा 40 यानी SPEED LIMIT 40 साइन है। यह ड्राइवरों को बताता है कि यहाँ गाड़ी की रफ्तार 40 किलोमीटर प्रति घंटे से ज़्यादा नहीं होनी चाहिए।"
    },
    mr: {
      name: "वेग मर्यादा ४० (SPEED LIMIT 40)",
      categoryLabel: "मनाई चिन्ह (मर्यादा)",
      visual: "लाल कडा असलेले वर्तुळ ज्याच्या आत 40 हा अंक आहे.",
      meaning: "येथे ताशी ४० किलोमीटरपेक्षा जास्त वेगाने वाहन चालवू नका.",
      action: "तुमचा वेग तपासा आणि ४० किंवा त्यापेक्षा कमी करा.",
      lesson: "लाल कडा असलेल्या या वर्तुळात 40 हा अंक दिसत आहे. याला वेग मर्यादा ४० म्हणजेच SPEED LIMIT 40 म्हणतात. या ठिकाणी वाहन ताशी ४० किलोमीटरपेक्षा जास्त वेगाने चालवू नये असे हे चिन्ह सांगते."
    }
  },
  {
    id: "SCHOOL_AHEAD", category: "Warning", shape: "Triangle", color: "Red border, children symbol",
    en: {
      name: "SCHOOL AHEAD",
      categoryLabel: "Warning (Be careful)",
      visual: "Triangle with a red border and children walking inside.",
      meaning: "A school is near. Children may cross the road suddenly.",
      action: "Slow down and be ready to stop.",
      lesson: "Look at the triangular shape with a red border and children inside. Remember: triangular signs NEVER mean Stop—they are Warning signs about hazards ahead. This is the SCHOOL AHEAD sign. It warns drivers that children may cross suddenly, so they must slow down and stay alert."
    },
    hi: {
      name: "आगे स्कूल है (SCHOOL AHEAD)",
      categoryLabel: "चेतावनी (सावधान रहें)",
      visual: "लाल किनारे वाला त्रिकोण जिसके अंदर बच्चे चलते हुए दिखते हैं।",
      meaning: "पास में स्कूल है। बच्चे अचानक सड़क पार कर सकते हैं।",
      action: "गति धीमी करें और रुकने के लिए तैयार रहें।",
      lesson: "लाल किनारे वाले इस त्रिकोण को देखें जिसमें बच्चे दिख रहे हैं। याद रखें: त्रिकोण वाले साइन का मतलब STOP नहीं होता, बल्कि वे आगे के खतरे की चेतावनी देते हैं। यह 'आगे स्कूल है' साइन है। यहाँ गाड़ी धीमी करनी चाहिए क्योंकि बच्चे अचानक सड़क पार कर सकते हैं।"
    },
    mr: {
      name: "पुढे शाळा आहे (SCHOOL AHEAD)",
      categoryLabel: "सावधानतेचे चिन्ह (Warning)",
      visual: "लाल कडा असलेला त्रिकोण आणि आत चालणारी मुले.",
      meaning: "जवळ शाळा आहे. मुले अचानक रस्ता ओलांडू शकतात.",
      action: "वेग कमी करा आणि थांबण्यासाठी तयार रहा.",
      lesson: "लाल कडा असलेल्या या त्रिकोणाकडे पहा ज्यात मुले दिसत आहेत. लक्षात ठेवा: त्रिकोणी चिन्हाचा अर्थ STOP नसतो, ती धोक्याची सूचना देणारी चिन्हे असतात. हे 'पुढे शाळा आहे' चिन्ह आहे. येथे वाहन हळू चालवावे कारण मुले अचानक रस्त्यावर येऊ शकतात."
    }
  },
  {
    id: "PEDESTRIAN_CROSSING", category: "Warning", shape: "Triangle", color: "Red border, walking person",
    en: {
      name: "PEDESTRIAN CROSSING",
      categoryLabel: "Warning (Be careful)",
      visual: "Triangle with a red border and a person walking over stripes.",
      meaning: "People may cross the road here.",
      action: "Drivers must slow down and give way to people crossing.",
      lesson: "Here is a triangular warning sign showing a person walking over stripes. This is the PEDESTRIAN CROSSING sign. Important tip: this sign does NOT tell pedestrians to stop! It warns DRIVERS that people may cross here, so drivers must slow down and give way."
    },
    hi: {
      name: "पैदल पारपथ (PEDESTRIAN CROSSING)",
      categoryLabel: "चेतावनी (सावधान रहें)",
      visual: "लाल त्रिकोण के अंदर पट्टियों पर चलता हुआ व्यक्ति।",
      meaning: "यहाँ लोग सड़क पार कर सकते हैं।",
      action: "ड्राइवर गति धीमी करें और पैदल चलने वालों को रास्ता दें।",
      lesson: "इस त्रिकोण साइन में एक व्यक्ति पट्टियों पर चलता दिख रहा है। इसे पैदल पारपथ यानी PEDESTRIAN CROSSING कहते हैं। ध्यान दें: यह साइन पैदल चलने वालों को रुकने के लिए नहीं कहता, बल्कि यह ड्राइवरों को सावधान करता है कि वे गाड़ी धीमी करें और लोगों को सड़क पार करने दें।"
    },
    mr: {
      name: "पादचारी मार्ग (PEDESTRIAN CROSSING)",
      categoryLabel: "सावधानतेचे चिन्ह (Warning)",
      visual: "लाल त्रिकोणामध्ये पट्ट्यांवरून चालणारी व्यक्ती.",
      meaning: "येथे लोक रस्ता ओलांडू शकतात.",
      action: "चालकांनी वेग कमी करावा आणि पादचाऱ्यांना रस्ता द्यावा.",
      lesson: "या त्रिकोणी चिन्हामध्ये एक व्यक्ती झेब्रा क्रॉसिंगवरून चालताना दिसते. याला पादचारी मार्ग म्हणजेच PEDESTRIAN CROSSING म्हणतात. महत्त्वाचे: हे चिन्ह पादचाऱ्यांना थांबायला सांगत नाही, तर ते वाहन चालकांना इशारा देते की त्यांनी वेग कमी करून लोकांना रस्ता ओलांडू द्यावा."
    }
  },
  {
    id: "PARKING", category: "Informatory", shape: "Square", color: "Blue with white P",
    en: {
      name: "PARKING",
      categoryLabel: "Informatory (Helpful info)",
      visual: "Blue square with a big white letter P inside.",
      meaning: "You may park your vehicle here.",
      action: "Park neatly inside the marked area.",
      lesson: "Look at this blue square with a white letter P. Blue square signs are Informatory signs—they give helpful information about facilities nearby. This is the PARKING sign, telling drivers they are allowed to park neatly inside the marked area."
    },
    hi: {
      name: "पार्किंग (PARKING)",
      categoryLabel: "सूचनात्मक (मददगार जानकारी)",
      visual: "नीले चौकोर डिब्बे के अंदर सफेद अक्षर P।",
      meaning: "आप यहाँ अपना वाहन पार्क कर सकते हैं।",
      action: "चिह्नित जगह के अंदर सही तरीके से पार्क करें।",
      lesson: "सफेद P लिखे इस नीले चौकोर साइन को देखें। नीले चौकोर साइन सूचनात्मक होते हैं जो उपयोगी जानकारी देते हैं। यह पार्किंग साइन है, जो बताता है कि आप यहाँ अपनी गाड़ी सुरक्षित पार्क कर सकते हैं।"
    },
    mr: {
      name: "पार्किंग (PARKING)",
      categoryLabel: "माहितीदर्शक चिन्ह (Informatory)",
      visual: "निळ्या चौकोनामध्ये पांढरे P हे अक्षर.",
      meaning: "तुम्ही तुमचे वाहन येथे पार्क करू शकता.",
      action: "नेमून दिलेल्या जागेत नीट वाहन पार्क करा.",
      lesson: "पांढरे P अक्षर असलेल्या या निळ्या चौकोनाकडे पहा. निळी चौकोनी चिन्हे उपयुक्त माहिती देतात. हे पार्किंग चिन्ह आहे, याचा अर्थ तुम्ही येथे ठरवून दिलेल्या जागेत तुमचे वाहन पार्क करू शकता."
    }
  },
  {
    id: "HOSPITAL", category: "Informatory", shape: "Square", color: "Blue with white H or cross",
    en: {
      name: "HOSPITAL",
      categoryLabel: "Informatory (Helpful info)",
      visual: "Blue square with a white H or medical bed/cross symbol.",
      meaning: "A hospital is nearby.",
      action: "Keep quiet, do not honk, and give way to ambulances.",
      lesson: "This blue square with the letter H is an Informatory sign for a HOSPITAL nearby. Whenever you see this sign, keep the area peaceful—do not honk your horn, drive calmly, and always give way to ambulances."
    },
    hi: {
      name: "अस्पताल (HOSPITAL)",
      categoryLabel: "सूचनात्मक (मददगार जानकारी)",
      visual: "नीला चौकोर साइन जिस पर सफेद H या क्रॉस बना है।",
      meaning: "पास में अस्पताल है।",
      action: "शांति रखें, हॉर्न न बजाएं और एम्बुलेंस को रास्ता दें।",
      lesson: "सफेद H वाला यह नीला चौकोर साइन बताता है कि पास में अस्पताल है। जब भी आप यह साइन देखें, तो हॉर्न बिल्कुल न बजाएं, शांति बनाए रखें और एम्बुलेंस को तुरंत रास्ता दें।"
    },
    mr: {
      name: "रुग्णालय / हॉस्पिटल (HOSPITAL)",
      categoryLabel: "माहितीदर्शक चिन्ह (Informatory)",
      visual: "निळा चौकोन ज्यावर पांढरे H किंवा अधिकचे चिन्ह आहे.",
      meaning: "जवळ रुग्णालय (हॉस्पिटल) आहे.",
      action: "शांतता राखा, हॉर्न वाजवू नका आणि रुग्णवाहिकेला रस्ता द्या.",
      lesson: "पांढरे H असलेले हे निळे चौकोनी चिन्ह जवळ रुग्णालय म्हणजेच हॉस्पिटल असल्याचे सांगते. हे चिन्ह दिसल्यावर हॉर्न वाजवू नका, शांतता राखा आणि अँब्युलन्सला तात्काळ रस्ता द्या."
    }
  },
];

export const CATEGORIES = ["Mandatory", "Prohibitory", "Warning", "Informatory"];
export const getSign = (id) => SIGNS.find((s) => s.id === id);
export const baseLang = (lang) => (lang || "en-IN").split("-")[0];
export const txt = (sign, lang) => sign?.[baseLang(lang)] || sign?.en;
