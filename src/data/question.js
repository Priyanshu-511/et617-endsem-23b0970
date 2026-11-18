import { getSign } from "./signs.js";

// Only English content so far; speech must use a language the text is written in.
export const contentLang = (lang) => (lang?.startsWith("en") ? lang : "en-IN");

export const MISC = {
  M1: {
    title: "Thinks every triangular sign means STOP",
    feedback: "Not every triangular sign means STOP. Triangular warning signs generally warn us about a possible hazard. The STOP sign has a distinctive octagonal shape.",
    clue: ["STOP"],
  },
  M2: {
    title: "Thinks the pedestrian-crossing sign tells pedestrians to stop",
    feedback: "This sign alerts road users that pedestrians may cross here. Drivers should watch for pedestrians and follow the applicable crossing and right-of-way rules.",
    clue: ["PEDESTRIAN_CROSSING"],
  },
};

export const DIFF = {
  "SPEED_LIMIT_40|NO_ENTRY":
    "Good observation! My first guess was incorrect. Look at the number 40 inside the circular sign. A No Entry sign has a horizontal white bar. These two signs communicate different instructions.",
};

const KEY = {
  STOP: { name: ["stop"], action: ["stop", "halt", "wait"] },
  NO_ENTRY: { name: ["no entry", "not enter", "do not enter", "don t enter"], action: ["not enter", "don t enter", "another", "other route", "different route", "avoid", "turn"] },
  SPEED_LIMIT_40: { name: ["40", "forty", "speed limit", "speed"], action: ["slow", "40", "forty", "reduce", "less", "below"] },
  SCHOOL_AHEAD: { name: ["school"], action: ["slow", "careful", "children", "kids", "ready to stop"] },
  PEDESTRIAN_CROSSING: { name: ["pedestrian", "crossing", "zebra", "cross"], action: ["slow", "give way", "let", "watch", "wait for", "stop for", "careful"] },
  PARKING: { name: ["parking", "park"], action: ["park"] },
  HOSPITAL: { name: ["hospital"], action: ["quiet", "horn", "honk", "silent", "slow", "ambulance"] },
};

const PED_STOP = /(pedestrian|people|walker|person|they)\w*\s+(\w+\s+){0,2}(must |should |have to |need to )?(stop|halt|wait)/;

export const tutorQuestions = (sign) => [
  { kind: "name", ask: "Look at the sign on your screen. What is it called? Say its name." },
  { kind: "action", ask: `What should a driver do when they see the ${sign.en.name} sign?` },
];

export function evaluateSpoken(sign, kind, text) {
  const t = (text || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ");
  if (!t.trim()) return { status: "empty", correct: false, feedback: "I couldn't hear a clear answer. Please try again." };

  if (kind === "name" && sign.shape === "Triangle" && /\bstop\b/.test(t) && !/school|pedestrian|crossing|warning|children/.test(t))
    return { status: "misconception", misconception: "M1", correct: false, clue: ["STOP", sign.id],
      feedback: MISC.M1.feedback + " Look at the shape and colour of this sign, then try again." };

  if (kind === "action" && sign.id === "PEDESTRIAN_CROSSING" && PED_STOP.test(t))
    return { status: "misconception", misconception: "M2", correct: false, clue: ["PEDESTRIAN_CROSSING"],
      feedback: MISC.M2.feedback + " Now, what should a driver do here?" };

  if (KEY[sign.id][kind].some((w) => t.includes(w)))
    return { status: "correct", correct: true,
      feedback: kind === "name"
        ? `Correct! This is the ${sign.en.name} sign. ${sign.en.meaning}`
        : `Correct! ${sign.en.action}` };

  return { status: "incorrect", correct: false,
    feedback: `Not quite. Look closely: ${sign.en.visual} Try again.` };
}

// ---------- Practice content ----------
export const MATCH = [
  { id: "mt1", topic: "STOP", answer: "Mandatory" },
  { id: "mt2", topic: "SPEED_LIMIT_40", answer: "Prohibitory" },
  { id: "mt3", topic: "NO_ENTRY", answer: "Prohibitory" },
  { id: "mt4", topic: "SCHOOL_AHEAD", answer: "Warning" },
  { id: "mt5", topic: "PARKING", answer: "Informatory" },
].map((m) => ({ ...m, outcome: "O1", explanation:
  { Mandatory: "Mandatory signs give an order you must follow.",
    Prohibitory: "Prohibitory signs tell you what you must NOT do.",
    Warning: "Warning signs tell you about a hazard ahead.",
    Informatory: "Informatory signs give helpful information." }[m.answer] }));

export const MCQS = [
  { id: "m1", outcome: "M", format: "mcq", topic: "STOP", showSign: "SCHOOL_AHEAD",
    text: "Rohan says: \"Every triangular sign means STOP.\" Who is right?",
    options: ["Rohan is right. All triangles mean stop.", "Triangles usually warn about a hazard. STOP is an octagon.", "Triangles mean No Entry."],
    answer: 1, misc: { 0: "M1" },
    explanation: "Triangles are warning signs. STOP has eight sides and red colour.",
    correct: "Yes! Triangles warn us about a hazard. STOP is the octagon.",
    incorrect: "Not quite. Look at the shape: STOP is an octagon, while triangles warn about hazards." },
  { id: "m2", outcome: "M", format: "mcq", topic: "PEDESTRIAN_CROSSING", showSign: "PEDESTRIAN_CROSSING",
    text: "What does this sign tell us?",
    options: ["Pedestrians must stop here.", "People may cross here. Drivers watch out and give way.", "Walking is not allowed here."],
    answer: 1, misc: { 0: "M2" },
    explanation: "It warns drivers that people may be crossing.",
    correct: "Right! It warns that people may cross, so drivers must be careful.",
    incorrect: "Not quite. Look at the walking person. The sign warns drivers; it does not give orders to pedestrians." },
  ...[
    ["s1", "SCHOOL_AHEAD", "You ride a bicycle and see a SCHOOL AHEAD sign with children near the road. What do you do?",
      ["Speed up to pass quickly", "Slow down and be ready to stop", "Honk loudly and keep going"], 1,
      "Children may run onto the road, so slow down."],
    ["s2", "STOP", "You reach a STOP sign at a quiet junction. No vehicle is visible. What do you do?",
      ["Slow down and roll through", "Stop fully, look both ways, then go", "Honk and go"], 1,
      "STOP means a full halt, even when the road looks empty."],
    ["s3", "NO_ENTRY", "You see a NO ENTRY sign at the lane you usually use. What do you do?",
      ["Enter slowly", "Enter if nobody is looking", "Do not enter. Take another route"], 2,
      "NO ENTRY means vehicles must not enter from this side."],
    ["s4", "PEDESTRIAN_CROSSING", "You are driving. Near a PEDESTRIAN CROSSING sign, a person steps onto the road. What do you do?",
      ["Honk so they hurry", "Slow down and let them cross", "Drive faster to get past"], 1,
      "Drivers must watch for pedestrians and give way."],
    ["s5", "HOSPITAL", "You see a HOSPITAL sign. What is the best behaviour?",
      ["Honk to clear the road", "Drive slowly, keep the horn quiet and give way to ambulances", "Park in the middle of the road"], 1,
      "Hospitals need quiet, and ambulances need a clear path."],
  ].map(([id, topic, text, options, answer, explanation]) => ({
    id, outcome: "O3", format: "scenario", topic, showSign: topic, text, options, answer, explanation,
    correct: "Safe choice! " + explanation,
    incorrect: "That would not be safe. " + explanation })),
];

export const SHORTS = [
  { id: "e1", topic: "STOP", outcome: "O2", format: "short",
    text: "Explain what this sign means. Use its colour and shape.",
    visual: ["red", "octagon", "eight", "8"], meaning: ["stop", "halt", "wait"],
    model: "It is a red octagon. It means stop completely." },
  { id: "e2", topic: "SPEED_LIMIT_40", outcome: "O2", format: "short",
    text: "Explain what this sign means. Use its colour and shape.",
    visual: ["red", "circle", "round", "ring", "40", "forty", "number"], meaning: ["speed", "fast", "slow", "limit", "km", "not more"],
    model: "It is a red circle with 40 inside. Do not drive faster than 40 km/h." },
  { id: "e3", topic: "SCHOOL_AHEAD", outcome: "O2", format: "short",
    text: "Explain what this sign means. Use its colour and shape.",
    visual: ["red", "triangle", "children", "kids", "people"], meaning: ["school", "slow", "careful", "children", "warn"],
    model: "It is a red triangle with children. A school is near, so slow down." },
].map((e) => ({ ...e, showSign: e.topic }));

export function evaluateShort(task, text) {
  const t = (text || "").toLowerCase();
  if (!t.trim()) return { correct: false, feedback: "I didn't get an answer. Try again." };
  const v = task.visual.some((w) => t.includes(w));
  const m = task.meaning.some((w) => t.includes(w));
  if (v && m) return { correct: true, feedback: "Great explanation! You used what you can see and what it means. " + task.model };
  if (!v) return { correct: false, feedback: "Good start. Now also tell me about the colour or shape you can see." };
  return { correct: false, feedback: "You described what you see. Now tell me what the sign means for road users." };
}

export const signName = (id) => getSign(id)?.en.name || id;