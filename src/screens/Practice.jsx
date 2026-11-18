import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";
import { CATEGORIES, getSign, txt, baseLang } from "../data/signs.js";
import { MATCH, MCQS, SHORTS, miscFeedback, evaluateShort, contentLang } from "../data/question.js";
import { speak, listen, stopListening, recognitionSupported, ERROR_MESSAGES } from "../services/speech.js";
import SignCard from "../components/SignCard.jsx";

function Match({ onDone, lang }) {
  const [ans, setAns] = useState({});
  const [checked, setChecked] = useState(false);
  const rows = MATCH.map((m) => ({ ...m, ok: ans[m.id] === m.answer }));
  return (
    <>
      <h2>Match each sign to its category</h2>
      {rows.map((m) => {
        const sName = txt(getSign(m.topic), lang).name;
        return (
          <div key={m.id} className="row">
            <SignCard id={m.topic} label={sName} size={70} />
            <select className="input" aria-label={`Category for ${sName}`}
              disabled={checked} value={ans[m.id] || ""} onChange={(e) => setAns({ ...ans, [m.id]: e.target.value })}>
              <option value="">Choose…</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            {checked && <p className="note">{m.ok ? "✅" : "❌"} {m.explanation} ({m.answer})</p>}
          </div>
        );
      })}
      {!checked
        ? <button className="btn" disabled={Object.keys(ans).length < MATCH.length} onClick={() => setChecked(true)}>Check</button>
        : <button className="btn ok" onClick={() => onDone(rows.map((m) => ({ id: m.id, outcome: m.outcome, topic: m.topic, correct: m.ok })))}>Next →</button>}
    </>
  );
}

function Mcq({ task, onDone, lang }) {
  const [picked, setPicked] = useState(null);
  const [tries, setTries] = useState(0);
  const [first, setFirst] = useState(null);
  const b = baseLang(lang);
  const qText = (b === "hi" && task.hiText) || (b === "mr" && task.mrText) || task.text;
  const okFb = (b === "hi" && task.hiCorrect) || (b === "mr" && task.mrCorrect) || task.correct;
  const badFb = (b === "hi" && task.hiIncorrect) || (b === "mr" && task.mrIncorrect) || task.incorrect;
  const ok = picked === task.answer;
  const pick = (i) => {
    const good = i === task.answer;
    const misc = task.misc?.[i] || null;
    if (tries === 0) setFirst({ correct: good, misc });
    setPicked(i); setTries(tries + 1);
    speak(good ? okFb : misc ? miscFeedback(misc, lang) : badFb, lang);
  };
  return (
    <>
      <h2>{qText}</h2>
      {task.showSign && <SignCard id={task.showSign} size={100} />}
      {task.options.map((o, i) => (
        <button key={i} className="btn secondary" disabled={picked !== null && (ok || picked === i)} onClick={() => pick(i)}>{o}</button>
      ))}
      {picked !== null && (
        <div className={`status ${ok ? "speaking" : ""}`}>
          <p>{ok ? okFb : (task.misc?.[picked] ? miscFeedback(task.misc[picked], lang) : badFb)}</p>
          {(ok || tries >= 2) && <p className="note">{!ok && `Answer: ${task.options[task.answer]}. `}{task.explanation}</p>}
          {!ok && tries < 2 && <button className="btn secondary" onClick={() => setPicked(null)}>Try again</button>}
        </div>
      )}
      {picked !== null && (ok || tries >= 2) && (
        <button className="btn ok" onClick={() => onDone([{ id: task.id, outcome: task.outcome, topic: task.topic, correct: first.correct, misconception: first.misc }])}>Next →</button>
      )}
    </>
  );
}

function Short({ task, onDone, lang }) {
  const [text, setText] = useState("");
  const [fb, setFb] = useState(null);
  const [tries, setTries] = useState(0);
  const [first, setFirst] = useState(null);
  const [msg, setMsg] = useState("");
  const [on, setOn] = useState(false);
  const b = baseLang(lang);
  const qText = (b === "hi" && task.hiText) || (b === "mr" && task.mrText) || task.text;
  const check = () => {
    const r = evaluateShort(task, text, lang);
    if (tries === 0) setFirst(r.correct);
    setTries(tries + 1); setFb(r); speak(r.feedback, lang);
  };
  const mic = () => {
    if (on) return stopListening();
    listen(lang, { onStart: () => setOn(true), onResult: (t) => setText(t),
      onError: (e) => setMsg(ERROR_MESSAGES[e] || e), onEnd: () => setOn(false) });
  };
  return (
    <>
      <h2>{qText}</h2>
      <SignCard id={task.showSign} size={110} />
      <input className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or use the microphone" />
      {recognitionSupported() && <button className="btn secondary" onClick={mic}>{on ? "⏹ Stop" : "🎤 Speak"}</button>}
      {msg && <p className="status">{msg}</p>}
      <button className="btn" onClick={check}>Check</button>
      {fb && <p className={`status ${fb.correct ? "speaking" : ""}`}>{fb.feedback}</p>}
      {fb && (fb.correct || tries >= 2) && (
        <button className="btn ok" onClick={() => onDone([{ id: task.id, outcome: task.outcome, topic: task.topic, correct: first }])}>Next →</button>
      )}
    </>
  );
}

export default function Practice() {
  const nav = useNavigate();
  const { state, update } = useApp();
  const lang = contentLang(state.lang);
  const steps = useMemo(() => [
    { t: "match" }, { t: "mcq", task: MCQS[0] }, { t: "mcq", task: MCQS[1] },
    ...SHORTS.map((task) => ({ t: "short", task })),
    ...MCQS.slice(2).map((task) => ({ t: "mcq", task })),
  ], []);
  const [i, setI] = useState(0);
  const [results, setResults] = useState([]);

  const done = (r) => {
    const all = [...results, ...r];
    if (i === steps.length - 1) {
      const score = all.filter((x) => x.correct).length;
      const found = [...new Set([...state.misconceptions, ...all.map((x) => x.misconception).filter(Boolean)])];
      update({ lastAttempt: all, misconceptions: found,
        attempts: [...state.attempts, { t: Date.now(), score, total: all.length }] });
      nav("/results");
    } else { setResults(all); setI(i + 1); }
  };

  const s = steps[i];
  return (
    <section className="card">
      <p className="note">Task {i + 1} of {steps.length}</p>
      {s.t === "match" && <Match key={i} onDone={done} lang={lang} />}
      {s.t === "mcq" && <Mcq key={i} task={s.task} onDone={done} lang={lang} />}
      {s.t === "short" && <Short key={i} task={s.task} onDone={done} lang={lang} />}
    </section>
  );
}