import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";
import { getSign, txt } from "../data/signs.js";
import { contentLang, tutorQuestions, evaluateSpoken, uiTxt } from "../data/question.js";
import { speak, stopSpeaking, listen, stopListening, hasVoiceFor, recognitionSupported, ERROR_MESSAGES } from "../services/speech.js";
import SignCard from "../components/SignCard.jsx";

export default function VoiceTutor() {
  const nav = useNavigate();
  const { state, update } = useApp();
  const sign = getSign(state.signId);
  const lang = contentLang(state.lang);
  const tSign = sign ? txt(sign, lang) : null;
  const ui = uiTxt(lang);
  const qs = sign ? tutorQuestions(sign, lang) : [];

  // Two clear pedagogical stages:
  // "teach" -> AI explicitly teaches the sign to a complete beginner first
  // "quiz"  -> Voice-first assessment checking understanding
  const [stage, setStage] = useState("teach");
  const [i, setI] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [transcript, setTranscript] = useState("");
  const [fb, setFb] = useState(null);
  const [msg, setMsg] = useState("");
  const [typed, setTyped] = useState("");
  const [tries, setTries] = useState(0);

  const LABEL = {
    idle: ui.ready,
    speaking: ui.speaking,
    listening: ui.listening,
    processing: ui.processing,
  };

  const say = (text) => speak(text, lang, {
    onStart: () => setPhase("speaking"),
    onEnd: () => setPhase("idle"),
    onError: (e) => {
      if (e === "no-voice") setMsg(ERROR_MESSAGES["no-voice"]);
      else { setPhase("idle"); setMsg("Could not play audio. Read the text below."); }
    },
  });

  useEffect(() => {
    if (!sign) { nav("/capture"); return; }
    hasVoiceFor(lang).then((ok) => !ok && setMsg(ERROR_MESSAGES["no-voice"]));
    return () => { stopSpeaking(); stopListening(); };
  }, [sign, lang, nav]);

  // Speak the teaching lesson automatically when entering "teach" stage,
  // or speak the question when entering/advancing in "quiz" stage
  useEffect(() => {
    if (!sign || !tSign) return;
    if (stage === "teach") {
      say(tSign.lesson);
    } else if (stage === "quiz" && qs[i]) {
      setTranscript("");
      setFb(null);
      setTyped("");
      setTries(0);
      say(qs[i].ask);
    }
  }, [stage, i, lang]);

  if (!sign || !tSign) return null;

  const evaluate = (text) => {
    setPhase("processing");
    setTranscript(text);
    const r = evaluateSpoken(sign, qs[i].kind, text, lang);
    setFb(r);
    setTries((t) => t + 1);
    if (r.misconception && !state.misconceptions.includes(r.misconception))
      update({ misconceptions: [...state.misconceptions, r.misconception] });
    say(r.feedback);
  };

  const mic = () => {
    if (phase === "listening") return stopListening();
    stopSpeaking();
    setMsg("");
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
      <span className="badge">{stage === "teach" ? ui.teachBadge : ui.quizBadge}</span>
      <h1>{ui.tutorTitle}</h1>
      <SignCard id={sign.id} label={tSign.name} size={115} />

      <div className={`status ${phase}`} aria-live="polite">{LABEL[phase]}</div>
      {msg && <p className="status">{msg}</p>}

      {stage === "teach" ? (
        /* ── STAGE 1: AI TEACHES FIRST (Zero Prior Knowledge Assumed) ── */
        <div>
          <div className="status speaking" style={{ marginTop: 12 }}>
            <p style={{ marginBottom: 0 }}>{tSign.lesson}</p>
          </div>

          <ul>
            <li><strong>{ui.categoryLabel}:</strong> {tSign.categoryLabel}</li>
            <li><strong>{ui.visualLabel}:</strong> {tSign.visual}</li>
            <li><strong>{ui.meaningLabel}:</strong> {tSign.meaning}</li>
            <li><strong>{ui.actionLabel}:</strong> {tSign.action}</li>
          </ul>

          <button className="btn secondary" onClick={() => say(tSign.lesson)}>
            {ui.listenLesson}
          </button>
          <button
            className="btn ok"
            onClick={() => { stopSpeaking(); setStage("quiz"); setI(0); }}
          >
            {ui.readyQuiz}
          </button>
        </div>
      ) : (
        /* ── STAGE 2: VOICE-FIRST ASSESSMENT ── */
        <div>
          <p><strong>({i + 1}/{qs.length})</strong> {qs[i].ask}</p>
          <p className="note">
            Microphone: {recognitionSupported() ? "available" : "not supported in this browser. Use Chrome or type below."}
          </p>

          <button className="btn secondary" onClick={() => say(qs[i].ask)}>{ui.hearQuestion}</button>
          <button className="btn" onClick={mic} disabled={!recognitionSupported() || phase === "processing"}>
            {phase === "listening" ? ui.stopMic : ui.tapAnswer}
          </button>

          {transcript && <p><strong>{ui.youSaid}</strong> “{transcript}”</p>}

          {fb && (
            <div className={`status ${fb.correct ? "speaking" : ""}`}>
              <p>{fb.feedback}</p>
              {fb.clue && (
                <div className="row">
                  {fb.clue.map((c) => <SignCard key={c} id={c} label={txt(getSign(c), lang).name} size={80} />)}
                </div>
              )}
              <button className="btn secondary" onClick={() => say(fb.feedback)}>{ui.replayFb}</button>
              {!fb.correct && (
                <button className="btn secondary" onClick={() => { setFb(null); setTranscript(""); say(qs[i].ask); }}>
                  {ui.tryAgain}
                </button>
              )}
            </div>
          )}

          <details style={{ marginTop: 12 }}>
            <summary style={{ cursor: "pointer", fontWeight: 500 }}>{ui.cantSpeak}</summary>
            <input
              className="input"
              style={{ marginTop: 8 }}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder="..."
            />
            <button className="btn secondary" onClick={() => evaluate(typed)}>{ui.checkTyped}</button>
          </details>

          {canNext && (last
            ? <button className="btn ok" onClick={() => nav("/practice")}>{ui.goPractice}</button>
            : <button className="btn ok" onClick={() => setI(i + 1)}>{ui.nextQ}</button>)}
        </div>
      )}
    </section>
  );
}
