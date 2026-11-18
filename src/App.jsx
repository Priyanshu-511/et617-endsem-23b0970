import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Welcome from "./screens/Welcome.jsx";
import About from "./screens/About.jsx";
import Capture from "./screens/Capture.jsx";
import Recognition from "./screens/Recognition.jsx";
import VoiceTutor from "./screens/VoiceTutor.jsx";
import Practice from "./screens/Practice.jsx";
import Results from "./screens/Results.jsx";
import { Ctx } from "./context.jsx";
import { DEFAULT_LANG } from "./config/learner.js";

const KEY = "roadwise_state_v1";
const initial = { lang: DEFAULT_LANG, signId: null, misconceptions: [], attempts: [], lastAttempt: null };

export default function App() {
  const [state, setState] = useState(() => {
    try { return { ...initial, ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return initial; }
  });
  const [image, setImage] = useState(null); // memory only: photos are never saved
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);
  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const reset = () => { setImage(null); setState({ ...initial, lang: state.lang }); };

  return (
    <Ctx.Provider value={{ state, update, reset, image, setImage }}>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/capture" element={<Capture />} />
          <Route path="/recognise" element={<Recognition />} />
          <Route path="/tutor" element={<VoiceTutor />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/results" element={<Results />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Ctx.Provider>
  );
}