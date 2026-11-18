import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";
import { getSign } from "../data/signs.js";
import { contentLang, tutorQuestions, evaluateSpoken } from "../data/question.js";
import { speak, stopSpeaking, listen, stopListening, hasVoiceFor, recognitionSupported, ERROR_MESSAGES } from "../services/speech.js";
import SignCard from "../components/SignCard.jsx";

const LABEL = { idle: "Ready", speaking: "🔊 Tutor is speaking…", listening: "🎤 Listening… speak now", processing: "⏳ Checking your answer…" };

export default function VoiceTutor() {
  const nav = useNavigate();
  const { state, update } = useApp();
  const sign = getSign(state.signId);
  const lang = contentLang(state.lang);
  const qs = sign ? tutorQuestions(sign) : [];
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [fb, setFb] = useState(null);
  const [msg, setMsg] = useState("");
  const [typed, setTyped] = useState("");
  const [tries, setTries] = useState(0);

  const say = (text) => speak(text, lang, {
    onStart: () => setPhase("speaking"),
    onEnd: () => setPhase("idle"),
    onError: (e) => { if (e === "no-voice") setMsg(ERROR_MESSAGES["no-voice"]); else { setPhase("idle"); setMsg("Could not play audio. Read the text below."); } },
  });

  useEffect(() => {
    if (!sign) { nav("/capture"); return; }
    hasVoiceFor(lang).then((ok) => !ok && setMsg(ERROR_MESSAGES["no-voice"]));
    return () => { stopSpeaking(); stopListening(); };
  }, []);

  useEffect(() => {
    if (sign && qs[i]) { setTranscript(""); setFb(null); setTyped(""); setTries(0); say(qs[i].ask); }
  }, [i]);

  if (!sign) return null;

  const evaluate = (text) => {
    setPhase("processing");
    setTranscript(text);
    const r = evaluateSpoken(sign, qs[i].kind, text);
    setFb(r); setTries((t) => t + 1);
    if (r.misconception && !state.misconceptions.includes(r.misconception))
      update({ misconceptions: [...state.misconceptions, r.misconception] });
    say(r.feedback);
  };

  const mic = () => {
    if (phase === "listening") return stopListening();
    stopSpeaking(); setMsg("");
    listen(lang, {
      onStart: () => setPhase("listening"),
      onResult: (t) => evaluate(t),
      onError: (e) => { setPhase("idle"); setMsg(ERROR_MESSAGES[e] || `Voice error: ${e}`); },
      onEnd: () => setPhase((p) => (p === "listening" ? "idle" : p)),
    });
  };

  const last = i === qs.length - 1;
  const canNext = fb && (fb.correct || tries >= 2);

  return (
    <section className="card">
      <h1>Your voice tutor</h1>
      <SignCard id={sign.id} label={sign.en.name} size={110} />
      <p><strong>Tutor ({i + 1}/{qs.length}):</strong> {qs[i].ask}</p>
      <div className={`status ${phase}`} aria-live="polite">{LABEL[phase]}</div>
      <p className="note">Microphone: {recognitionSupported() ? "available" : "not supported in this browser. Use Chrome or type below."}</p>
      {msg && <p className="status">{msg}</p>}

      <button className="btn secondary" onClick={() => say(qs[i].ask)}>🔊 Hear the question again</button>
      <button className="btn" onClick={mic} disabled={!recognitionSupported() || phase === "processing"}>
        {phase === "listening" ? "⏹ Stop" : "🎤 Tap and answer aloud"}
      </button>

      {transcript && <p><strong>You said:</strong> “{transcript}”</p>}

      {fb && (
        <div className={`status ${fb.correct ? "speaking" : ""}`}>
          <p>{fb.feedback}</p>
          {fb.clue && <div className="row">{fb.clue.map((c) => <SignCard key={c} id={c} label={getSign(c).en.name} size={80} />)}</div>}
          <button className="btn secondary" onClick={() => say(fb.feedback)}>🔊 Replay feedback</button>
          {!fb.correct && <button className="btn secondary" onClick={() => { setFb(null); setTranscript(""); say(qs[i].ask); }}>🔁 Try again</button>}
        </div>
      )}

      <details>
        <summary>Can't speak? Type your answer</summary>
        <input className="input" value={typed} onChange={(e) => setTyped(e.target.value)} placeholder="Type here" />
        <button className="btn secondary" onClick={() => evaluate(typed)}>Check typed answer</button>
      </details>

      {canNext && (last
        ? <button className="btn ok" onClick={() => nav("/practice")}>Go to practice →</button>
        : <button className="btn ok" onClick={() => setI(i + 1)}>Next question →</button>)}
    </section>
  );
}