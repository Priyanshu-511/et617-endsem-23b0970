import { useNavigate } from "react-router-dom";
import { LANGUAGES } from "../config/learner.js";
import { recognitionSupported, synthesisSupported } from "../services/speech.js";
import { useApp } from "../context.jsx";

export default function Welcome() {
  const nav = useNavigate();
  const { state, update } = useApp();
  return (
    <section className="card">
      <h1>Learn road signs around you</h1>
      <p>Take a photo of a road sign. Talk with your tutor. Learn what it means and how to stay safe.</p>
      <label className="label" htmlFor="lang">Language</label>
      <select id="lang" className="input" value={state.lang} onChange={(e) => update({ lang: e.target.value })}>
        {Object.entries(LANGUAGES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
      </select>
      <p className="note">
        🎤 Voice: {recognitionSupported() ? "speaking supported" : "speaking not supported in this browser (use Chrome)"} ·{" "}
        🔊 {synthesisSupported() ? "listening supported" : "audio not supported"}
      </p>
      <button className="btn" onClick={() => nav("/capture")}>Start learning</button>
    </section>
  );
}