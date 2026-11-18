const SR = typeof window !== "undefined"
  ? window.SpeechRecognition || window.webkitSpeechRecognition : null;

export const recognitionSupported = () => !!SR;
export const synthesisSupported = () => "speechSynthesis" in window;

export function getVoices() {
  return new Promise((resolve) => {
    if (!synthesisSupported()) return resolve([]);
    const v = speechSynthesis.getVoices();
    if (v.length) return resolve(v);
    speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
    setTimeout(() => resolve(speechSynthesis.getVoices()), 1500);
  });
}

export async function hasVoiceFor(lang) {
  const base = lang.split("-")[0];
  const v = await getVoices();
  return v.some((x) => x.lang === lang || x.lang.startsWith(base));
}

export async function speak(text, lang, { onStart, onEnd, onError } = {}) {
  if (!synthesisSupported()) return onError?.("tts-unsupported");
  speechSynthesis.cancel();
  const voices = await getVoices();
  const base = lang.split("-")[0];
  const voice = voices.find((x) => x.lang === lang) || voices.find((x) => x.lang.startsWith(base));
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  if (voice) u.voice = voice;
  else onError?.("no-voice"); // still attempts with default voice
  u.rate = 0.9;
  u.onstart = () => onStart?.();
  u.onend = () => onEnd?.();
  u.onerror = (e) => (e.error === "interrupted" || e.error === "canceled") ? onEnd?.() : onError?.(e.error);
  speechSynthesis.speak(u);
}

export const stopSpeaking = () => synthesisSupported() && speechSynthesis.cancel();

let rec = null;
export function listen(lang, { onResult, onError, onStart, onEnd }) {
  if (!SR) return onError?.("not-supported");
  stopListening();
  rec = new SR();
  rec.lang = lang;
  rec.interimResults = false;
  rec.maxAlternatives = 3;
  let got = false;
  rec.onstart = () => onStart?.();
  rec.onresult = (e) => {
    got = true;
    const alts = Array.from(e.results[0]).map((a) => a.transcript.trim());
    onResult?.(alts[0], alts);
  };
  rec.onerror = (e) => {
    const map = { "not-allowed": "permission-denied", "service-not-allowed": "permission-denied",
      "no-speech": "no-speech", "language-not-supported": "language-unsupported",
      "network": "network", "aborted": "aborted" };
    if (e.error !== "aborted") onError?.(map[e.error] || e.error);
  };
  rec.onend = () => { onEnd?.(); if (!got) { /* handled by onerror or empty */ } };
  try { rec.start(); } catch { onError?.("start-failed"); }
}

export function stopListening() {
  try { rec?.stop(); } catch {}
  rec = null;
}

export const ERROR_MESSAGES = {
  "permission-denied": "Microphone blocked. Allow it in the browser settings, or type your answer.",
  "no-speech": "I didn't hear anything. Tap the mic and try again.",
  "language-unsupported": "This browser can't recognise that language. Type your answer instead.",
  "not-supported": "Voice input isn't supported here. Use Chrome, or type your answer.",
  "network": "Speech service needs internet. Try again or type.",
  "no-voice": "No voice for this language on your device; using a default voice.",
};