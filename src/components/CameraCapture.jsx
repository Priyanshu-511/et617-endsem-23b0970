import { useRef, useState, useEffect } from "react";

export default function CameraCapture({ onCapture }) {
  const video = useRef();
  const [stream, setStream] = useState(null);
  const [err, setErr] = useState("");

  const start = async () => {
    setErr("");
    try {
      setStream(await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }));
    } catch { setErr("Camera is unavailable or blocked. Please upload a photo instead."); }
  };
  const stop = () => { stream?.getTracks().forEach((t) => t.stop()); setStream(null); };

  useEffect(() => { if (stream && video.current) video.current.srcObject = stream; }, [stream]);
  useEffect(() => () => stream?.getTracks().forEach((t) => t.stop()), [stream]);

  const snap = () => {
    const el = video.current;
    const c = document.createElement("canvas");
    c.width = el.videoWidth; c.height = el.videoHeight;
    c.getContext("2d").drawImage(el, 0, 0);
    c.toBlob((b) => { onCapture(b); stop(); }, "image/jpeg", 0.9);
  };

  return (
    <div>
      {stream ? (
        <>
          <video ref={video} autoPlay playsInline muted className="preview" />
          <button className="btn" onClick={snap}>📸 Take photo</button>
          <button className="btn secondary" onClick={stop}>Cancel</button>
        </>
      ) : (
        <button className="btn" onClick={start}>📷 Open camera</button>
      )}
      {err && <p className="status">{err}</p>}
    </div>
  );
}