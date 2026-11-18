import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context.jsx";
import CameraCapture from "../components/CameraCapture.jsx";
import SignCard, { sampleToDataUrl } from "../components/SignCard.jsx";
import { SIGNS } from "../data/signs.js";
import { prepareImage } from "../services/ai.js";

export default function Capture() {
  const nav = useNavigate();
  const { image, setImage } = useApp();
  const [err, setErr] = useState("");

  const fromBlob = async (b) => {
    setErr("");
    try { setImage({ dataUrl: await prepareImage(b), sampleId: null, simulated: false }); }
    catch (e) { setErr(e.message); }
  };
  const sample = async (id, simulated = false) =>
    setImage({ dataUrl: await sampleToDataUrl(id), sampleId: id, simulated });

  return (
    <section className="card">
      <h1>Take a photo of a road sign</h1>
      {image ? (
        <>
          <img className="preview" src={image.dataUrl} alt="Your road sign" />
          {image.simulated && <p className="badge">DEMO MODE: the AI answer will be simulated</p>}
          <button className="btn" onClick={() => nav("/recognise")}>Continue</button>
          <button className="btn secondary" onClick={() => setImage(null)}>Retake</button>
        </>
      ) : (
        <>
          <CameraCapture onCapture={fromBlob} />
          <label className="label" htmlFor="up">Or upload a photo</label>
          <input id="up" className="input" type="file" accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files[0] && fromBlob(e.target.files[0])} />
          {err && <p className="status">{err}</p>}

          <h2>No sign nearby? Try a sample</h2>
          <p className="note">These are drawings for testing, not real photos.</p>
          <div className="grid">
            {SIGNS.map((s) => (
              <button key={s.id} className="tile" onClick={() => sample(s.id)} aria-label={s.en.name}>
                <SignCard id={s.id} label={s.en.name} />
              </button>
            ))}
          </div>
          <h2>Demo: when the AI is wrong</h2>
          <button className="btn secondary" onClick={() => sample("SPEED_LIMIT_40", true)}>
            Run misidentification demo (simulated)
          </button>
        </>
      )}
    </section>
  );
}