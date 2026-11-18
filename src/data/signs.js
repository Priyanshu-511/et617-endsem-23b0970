// Approved catalogue. Text is keyed by language; add "hi"/"mr" etc. with the same fields.
// Fallback is always "en".
export const SIGNS = [
  { id: "STOP", category: "Mandatory", shape: "Octagon", color: "Red with white text",
    en: { name: "STOP", visual: "Red octagon with the word STOP.",
      meaning: "Come to a complete halt, look both ways, and go only when it is safe.",
      action: "Stop fully at the line, even if the road looks empty." } },
  { id: "NO_ENTRY", category: "Prohibitory", shape: "Circle", color: "Red circle, white horizontal bar",
    en: { name: "NO ENTRY", visual: "Red circle with one white horizontal bar.",
      meaning: "Vehicles must not enter this road from this side.",
      action: "Do not enter. Find another route." } },
  { id: "SPEED_LIMIT_40", category: "Prohibitory", shape: "Circle", color: "Red ring, number 40 inside",
    en: { name: "SPEED LIMIT 40", visual: "Red ring with the number 40 inside.",
      meaning: "Do not drive faster than 40 km/h here.",
      action: "Check your speed and slow down to 40 or less." } },
  { id: "SCHOOL_AHEAD", category: "Warning", shape: "Triangle", color: "Red border, children symbol",
    en: { name: "SCHOOL AHEAD", visual: "Triangle with a red border and children walking.",
      meaning: "A school is near. Children may cross suddenly.",
      action: "Slow down and be ready to stop." } },
  { id: "PEDESTRIAN_CROSSING", category: "Warning", shape: "Triangle", color: "Red border, walking person",
    en: { name: "PEDESTRIAN CROSSING", visual: "Triangle with a person walking over stripes.",
      meaning: "People may cross the road here.",
      action: "Drivers slow down and give way to people crossing." } },
  { id: "PARKING", category: "Informatory", shape: "Square", color: "Blue with white P",
    en: { name: "PARKING", visual: "Blue square with a white letter P.",
      meaning: "You may park your vehicle here.",
      action: "Park neatly inside the marked area." } },
  { id: "HOSPITAL", category: "Informatory", shape: "Square", color: "Blue with white H or cross",
    en: { name: "HOSPITAL", visual: "Blue square with a white H.",
      meaning: "A hospital is nearby.",
      action: "Keep quiet, don't honk, and give way to ambulances." } },
];

export const CATEGORIES = ["Mandatory", "Prohibitory", "Warning", "Informatory"];
export const getSign = (id) => SIGNS.find((s) => s.id === id);
export const txt = (sign, lang) =>
  sign[lang?.split("-")[0]] || sign.en;