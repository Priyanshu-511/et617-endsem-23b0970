async function resizeToJpeg(file, max = 1024, quality = 0.8) {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * scale);
  c.height = Math.round(bmp.height * scale);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", quality); // data URL
}

export async function prepareImage(fileOrBlob) {
  if (!/^image\/(jpeg|png|webp)$/.test(fileOrBlob.type)) throw new Error("Please use a JPG, PNG or WebP image.");
  if (fileOrBlob.size > 15 * 1024 * 1024) throw new Error("Image is too large (max 15 MB).");
  return resizeToJpeg(fileOrBlob);
}

// Returns { ok:true, result, source:"real-ai" } or { ok:false, error }
export async function analyzeImage(dataUrl, { timeoutMs = 25000 } = {}) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: dataUrl }),
      signal: ctrl.signal,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) return { ok: false, error: data?.error || `Server error (${res.status})` };
    return { ok: true, result: data.result, source: "real-ai" };
  } catch (e) {
    return { ok: false, error: e.name === "AbortError" ? "The AI took too long (timeout)." : "Could not reach the AI service." };
  } finally {
    clearTimeout(t);
  }
}

// Clearly-labelled simulated result for demo mode only.
export const simulatedMisidentification = (trueId = "SPEED_LIMIT_40") => ({
  ok: true, source: "simulated",
  result: {
    candidateId: "NO_ENTRY", name: "NO ENTRY",
    visualCharacteristics: ["Red circle", "White area inside"],
    colorShape: "Red circular sign", confidence: "medium",
    uncertaintyReason: "SIMULATED prediction for demonstration", trueId,
  },
});