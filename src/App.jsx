import { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Welcome from "./screens/Welcome.jsx";
import About from "./screens/About.jsx";
import { DEFAULT_LANG } from "./config/learner.js";

const KEY = "roadwise_state_v1";
const initial = { lang: DEFAULT_LANG, signId: null, aiSource: null, aiResult: null,
  scores: [], misconceptions: [], completed: [], step: "welcome" };

const Ctx = createContext();
export const useApp = () => useContext(Ctx);

export default function App() {
  const [state, setState] = useState(() => {
    try { return { ...initial, ...JSON.parse(localStorage.getItem(KEY)) }; } catch { return initial; }
  });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]); // no photos/audio stored
  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const reset = () => setState({ ...initial, lang: state.lang });

  return (
    <Ctx.Provider value={{ state, update, reset }}>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/about" element={<About />} />
          {/* next batch: /capture /recognise /tutor /practice /results */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Ctx.Provider>
  );
}