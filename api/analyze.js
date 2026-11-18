const IDS = ["STOP","NO_ENTRY","SPEED_LIMIT_40","SCHOOL_AHEAD","PEDESTRIAN_CROSSING","PARKING","HOSPITAL","UNKNOWN"];
const CONF = ["high", "medium", "low"];

const PROMPT = `You are a road-sign visual analyser for an Indian school learning app.
Look ONLY at the image. Identify whether it shows one of these Indian road signs:
${IDS.filter(i=>i!=="UNKNOWN").join(", ")}.
If the image is not clearly one of them, or is blurry/partial/not a sign, use "UNKNOWN".
Do NOT give traffic rules or safety advice. Describe only what is visible.
Return ONLY JSON:
{"candidateId": one of [${IDS.join(", ")}],
 "name": string,
 "visualCharacteristics": [string, ...] (max 4 short visible features),
 "colorShape": string,
 "confidence": "high"|"medium"|"low",
 "uncertaintyReason": string (empty if high)}`;

function validate(o) {
  if (!o || typeof o !== "object") return null;
  if (!IDS.includes(o.candidateId)) return null;
  if (!CONF.includes(o.confidence)) return null;
  if (!Array.isArray(o.visualCharacteristics)) return null;
  if (typeof o.colorShape !== "string" || typeof o.name !== "string") return null;
  return {
    candidateId: o.candidateId,
    name: String(o.name).slice(0, 60),
    visualCharacteristics: o.visualCharacteristics.slice(0, 4).map((x) => String(x).slice(0, 120)),
    colorShape: o.colorShape.slice(0, 160),
    confidence: o.confidence,
    uncertaintyReason: String(o.uncertaintyReason || "").slice(0, 200),
  };
}

// ---- Provider adapter (Gemini). Swap only this function to change provider. ----
async function callProvider(mime, b64, signal) {
  const model = process.env.VISION_MODEL || "gemini-2.5-flash";
  const base = process.env.VISION_API_URL || "https://generativelanguage.googleapis.com/v1beta";
  const r = await fetch(`${base}/models/${model}:generateContent`, {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.VISION_API_KEY },
    body: JSON.stringify({
      contents: [{ parts: [{ text: PROMPT }, { inline_data: { mime_type: mime, data: b64 } }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.1 },
    }),
  });
  if (!r.ok) throw new Error(`provider ${r.status}`);
  const j = await r.json();
  return j.candidates?.[0]?.content?.parts?.[0]?.text;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "POST only" });
  if (!process.env.VISION_API_KEY) return res.status(500).json({ ok: false, error: "AI is not configured." });

  const image = req.body?.image;
  const m = typeof image === "string" && image.match(/^data:(image\/(?:jpeg|png|webp));base64,(.+)$/);
  if (!m) return res.status(400).json({ ok: false, error: "Invalid image." });
  if (m[2].length > 4_000_000) return res.status(413).json({ ok: false, error: "Image too large." });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 20000);
  try {
    const raw = await callProvider(m[1], m[2], ctrl.signal);
    let parsed;
    try { parsed = JSON.parse(raw.replace(/```json|```/g, "").trim()); }
    catch { return res.status(502).json({ ok: false, error: "AI returned unreadable output." }); }
    const result = validate(parsed);
    if (!result) return res.status(502).json({ ok: false, error: "AI output failed validation." });
    return res.status(200).json({ ok: true, result });
  } catch (e) {
    const msg = e.name === "AbortError" ? "AI timed out." : "AI service error.";
    return res.status(504).json({ ok: false, error: msg });
  } finally {
    clearTimeout(timer);
  }
}