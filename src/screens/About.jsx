import { ROLL } from "../config/learner.js";
export default function About() {
  return (
    <section className="card">
      <h1>About RoadWise</h1>
      <p>Educational project for ET617. Card: P1 · T8 · C6 (voice-first).</p>
      <p>Identity token: <strong>{ROLL}</strong></p>
      <p>Photos are analysed by an AI model and not stored. Voice is handled by your browser.</p>
    </section>
  );
}