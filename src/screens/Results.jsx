import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";
import { MISC, contentLang, signName } from "../data/question.js";
import { speak, stopSpeaking } from "../services/speech.js";

const OUT = {
  O1: { label: "Classify signs into categories", need: 4, of: 5 },
  O2: { label: "Explain signs using what you see", need: 3, of: 3 },
  O3: { label: "Choose a safe response in traffic situations", need: 4, of: 5 },
};

export default function Results() {
  const nav = useNavigate();
  const { state, reset } = useApp();
  const a = state.lastAttempt;
  const lang = contentLang(state.lang);

  const score = a ? a.filter((x) => x.correct).length : 0;
  const revise = a ? [...new Set(a.filter((x) => !x.correct).map((x) => x.topic))] : [];
  const miscs = state.misconceptions || [];
  const summary = a && `You got ${score} out of ${a.length} correct. ` +
    (revise.length ? `Please revise: ${revise.map(signName).join(", ")}. ` : "Great work on every sign! ") +
    (miscs.length ? "Remember: " + miscs.map((m) => MISC[m].feedback).join(" ") : "");

  useEffect(() => { if (!a) nav("/"); else speak(summary, lang); return () => stopSpeaking(); }, [a, summary, lang, nav]);
  if (!a) return null;

  return (
    <section className="card">
      <h1>Your results</h1>
      <h2>{score} / {a.length} correct</h2>

      <h3>Learning outcomes</h3>
      {Object.entries(OUT).map(([k, o]) => {
        const n = a.filter((x) => x.outcome === k && x.correct).length;
        return <p key={k}>{n >= o.need ? "✅" : "🔁"} {o.label}: {n}/{o.of} (goal {o.need})</p>;
      })}

      <h3>Misconceptions found</h3>
      {miscs.length
        ? miscs.map((m) => <div key={m} className="status"><strong>{MISC[m].title}</strong><p>{MISC[m].feedback}</p></div>)
        : <p>None this time. Well done!</p>}

      <h3>Revise these signs</h3>
      <p>{revise.length ? revise.map(signName).join(", ") : "Nothing. You are doing great."}</p>

      <h3>Your progress</h3>
      <ul>{state.attempts.map((t, i) => <li key={i}>Attempt {i + 1}: {t.score}/{t.total}</li>)}</ul>

      <button className="btn secondary" onClick={() => speak(summary, lang)}>🔊 Hear my summary</button>
      <button className="btn" onClick={() => nav("/practice")}>Retry practice</button>
      <button className="btn secondary" onClick={() => { reset(); nav("/capture"); }}>Learn another sign</button>
    </section>
  );
}