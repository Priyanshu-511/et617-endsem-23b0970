import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";
import { MISC, contentLang, signName, miscFeedback } from "../data/question.js";
import { baseLang } from "../data/signs.js";
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
  const b = baseLang(lang);

  const score = a ? a.filter((x) => x.correct).length : 0;
  const revise = a ? [...new Set(a.filter((x) => !x.correct).map((x) => x.topic))] : [];
  const miscs = state.misconceptions || [];
  const reviseNames = revise.map((id) => signName(id, lang)).join(", ");
  const miscText = miscs.map((m) => miscFeedback(m, lang)).join(" ");

  const summary = a && (
    b === "hi"
      ? `आपने ${a.length} में से ${score} सही उत्तर दिए। ` +
        (revise.length ? `कृपया इन्हें दोबारा दोहराएं: ${reviseNames}। ` : "हर साइन पर बहुत बढ़िया प्रदर्शन! ") +
        (miscs.length ? "ध्यान रखें: " + miscText : "")
      : b === "mr"
      ? `तुम्ही ${a.length} पैकी ${score} बरोबर उत्तरे दिली. ` +
        (revise.length ? `कृपया यांची पुन्हा उजळणी करा: ${reviseNames}. ` : "प्रत्येक चिन्हावर उत्तम कामगिरी! ") +
        (miscs.length ? "लक्षात ठेवा: " + miscText : "")
      : `You got ${score} out of ${a.length} correct. ` +
        (revise.length ? `Please revise: ${reviseNames}. ` : "Great work on every sign! ") +
        (miscs.length ? "Remember: " + miscText : "")
  );

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
        ? miscs.map((m) => <div key={m} className="status"><strong>{MISC[m].title}</strong><p>{miscFeedback(m, lang)}</p></div>)
        : <p>None this time. Well done!</p>}

      <h3>Revise these signs</h3>
      <p>{revise.length ? reviseNames : "Nothing. You are doing great."}</p>

      <h3>Your progress</h3>
      <ul>{state.attempts.map((t, i) => <li key={i}>Attempt {i + 1}: {t.score}/{t.total}</li>)}</ul>

      <button className="btn secondary" onClick={() => speak(summary, lang)}>🔊 Hear my summary</button>
      <button className="btn" onClick={() => nav("/practice")}>Retry practice</button>
      <button className="btn secondary" onClick={() => { reset(); nav("/capture"); }}>Learn another sign</button>
    </section>
  );
}