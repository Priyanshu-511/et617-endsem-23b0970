import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";
import { analyzeImage, simulatedMisidentification } from "../services/ai.js";
import { SIGNS, getSign } from "../data/signs.js";
import { DIFF } from "../data/question.js";
import SignCard from "../components/SignCard.jsx";

export default function Recognition() {
  const nav = useNavigate();
  const { image, update } = useApp();
  const [phase, setPhase] = useState("loading");
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [picking, setPicking] = useState(null); // "incorrect" | "unsure" | "manual"
  const [fix, setFix] = useState(null);

  const run = async () => {
    setPhase("loading"); setPicking(null); setFix(null);
    if (image.simulated) { setData(simulatedMisidentification(image.sampleId)); return setPhase("done"); }
    const r = await analyzeImage(image.dataUrl);
    if (r.ok) { setData(r); setPhase("done"); } else { setErr(r.error); setPhase("error"); }
  };
  useEffect(() => { if (!image) nav("/capture"); else run(); }, []);
  if (!image) return null;

  const res = data?.result;
  const predicted = res && getSign(res.candidateId);
  const confirm = () => { update({ signId: res.candidateId }); nav("/tutor"); };
  const choose = (id) => {
    update({ signId: id });
    const chosen = getSign(id);
    const key = `${id}|${res?.candidateId}`;
    setFix(DIFF[key] ||
      (predicted && id !== predicted.id
        ? `Good observation! My first guess was incorrect. This sign shows: ${chosen.en.visual} The ${predicted.en.name} sign looks different: ${predicted.en.visual}`
        : `Thanks! This is the ${chosen.en.name} sign: ${chosen.en.visual}`));
  };

  return (
    <section className="card">
      <h1>What sign is this?</h1>
      <img className="preview" src={image.dataUrl} alt="Your road sign" />

      {phase === "loading" && <p className="status">🔍 The AI is looking at your photo…</p>}

      {phase === "error" && (
        <>
          <p className="status">⚠️ AI unavailable: {err}</p>
          <p className="note">This is not an AI result. You can still learn: choose the sign yourself.</p>
          <button className="btn" onClick={run}>Retry AI</button>
          <button className="btn secondary" onClick={() => setPicking("manual")}>Choose sign myself</button>
        </>
      )}

      {phase === "done" && res && (
        <>
          <p className={data.source === "simulated" ? "badge" : "note"}>
            {data.source === "simulated" ? "SIMULATED prediction (demo mode, not a real model)" : "Real AI analysis"}
          </p>
          <h2>{res.candidateId === "UNKNOWN" ? "The AI is not sure what this is" : `AI thinks: ${predicted.en.name}`}</h2>
          {predicted && <p>Category: <strong>{predicted.category}</strong></p>}
          <p><strong>What it saw:</strong></p>
          <ul>{res.visualCharacteristics.map((v, i) => <li key={i}>{v}</li>)}</ul>
          <p>Colour and shape: {res.colorShape}</p>
          <p>Confidence: <strong>{res.confidence}</strong>{res.uncertaintyReason ? ` (${res.uncertaintyReason})` : ""}</p>
          <p className="note">The AI can be wrong. You decide.</p>

          {!picking && !fix && (
            <>
              <button className="btn ok" disabled={res.candidateId === "UNKNOWN"} onClick={confirm}>✅ Correct</button>
              <button className="btn bad" onClick={() => setPicking("incorrect")}>❌ Incorrect</button>
              <button className="btn secondary" onClick={() => setPicking("unsure")}>🤔 I'm not sure</button>
            </>
          )}
        </>
      )}

      {picking && !fix && (
        <>
          <h2>{picking === "unsure" ? "No problem. Compare the signs and pick the closest." : "Which sign is it?"}</h2>
          <div className="grid">
            {SIGNS.map((s) => (
              <button key={s.id} className="tile" onClick={() => choose(s.id)}>
                <SignCard id={s.id} label={s.en.name} />
              </button>
            ))}
          </div>
        </>
      )}

      {fix && (
        <>
          <p className="status">{fix}</p>
          <button className="btn" onClick={() => nav("/tutor")}>Talk with the tutor 🎤</button>
        </>
      )}
    </section>
  );
}