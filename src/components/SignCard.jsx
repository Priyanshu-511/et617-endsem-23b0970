const SHAPES = {
  STOP: `<polygon points="60,10 140,10 190,60 190,140 140,190 60,190 10,140 10,60" fill="#c1121f" stroke="#fff" stroke-width="6"/><text x="100" y="118" font-size="50" font-weight="700" fill="#fff" text-anchor="middle" font-family="Arial">STOP</text>`,
  NO_ENTRY: `<circle cx="100" cy="100" r="90" fill="#c1121f"/><rect x="35" y="85" width="130" height="30" fill="#fff"/>`,
  SPEED_LIMIT_40: `<circle cx="100" cy="100" r="90" fill="#c1121f"/><circle cx="100" cy="100" r="68" fill="#fff"/><text x="100" y="124" font-size="64" font-weight="700" text-anchor="middle" font-family="Arial" fill="#111">40</text>`,
  SCHOOL_AHEAD: `<polygon points="100,12 190,176 10,176" fill="#c1121f"/><polygon points="100,42 164,162 36,162" fill="#fff"/><g stroke="#111" stroke-width="6" stroke-linecap="round"><circle cx="85" cy="95" r="8" fill="#111"/><line x1="85" y1="105" x2="85" y2="135"/><line x1="85" y1="135" x2="76" y2="152"/><line x1="85" y1="135" x2="94" y2="152"/><circle cx="118" cy="108" r="6" fill="#111"/><line x1="118" y1="116" x2="118" y2="138"/><line x1="118" y1="138" x2="112" y2="152"/><line x1="118" y1="138" x2="124" y2="152"/></g>`,
  PEDESTRIAN_CROSSING: `<polygon points="100,12 190,176 10,176" fill="#c1121f"/><polygon points="100,42 164,162 36,162" fill="#fff"/><g stroke="#111" stroke-width="6" stroke-linecap="round"><circle cx="100" cy="88" r="8" fill="#111"/><line x1="100" y1="98" x2="100" y2="126"/><line x1="100" y1="126" x2="90" y2="142"/><line x1="100" y1="126" x2="110" y2="142"/><line x1="100" y1="106" x2="88" y2="116"/><line x1="100" y1="106" x2="112" y2="114"/></g><g fill="#111"><rect x="62" y="148" width="76" height="4"/><rect x="56" y="156" width="88" height="4"/></g>`,
  PARKING: `<rect x="10" y="10" width="180" height="180" rx="16" fill="#0b4fa8"/><text x="100" y="142" font-size="120" font-weight="700" text-anchor="middle" font-family="Arial" fill="#fff">P</text>`,
  HOSPITAL: `<rect x="10" y="10" width="180" height="180" rx="16" fill="#0b4fa8"/><text x="100" y="142" font-size="120" font-weight="700" text-anchor="middle" font-family="Arial" fill="#fff">H</text>`,
};

export const signSvgFull = (id) =>
  `<svg viewBox="0 0 200 200" width="400" height="400" xmlns="http://www.w3.org/2000/svg">${SHAPES[id] || ""}</svg>`;

// Synthetic sample image (a drawing, not a photo) for testing without a real sign
export function sampleToDataUrl(id) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = c.height = 400;
      const x = c.getContext("2d");
      x.fillStyle = "#cfd8dc"; x.fillRect(0, 0, 400, 400);
      x.drawImage(img, 20, 20, 360, 360);
      res(c.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = rej;
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(signSvgFull(id));
  });
}

export default function SignCard({ id, label, size = 96 }) {
  return (
    <div className="signcard">
      <div role="img" aria-label={label || id} style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: signSvgFull(id).replace('width="400" height="400"', 'width="100%" height="100%"') }} />
      {label && <div className="note">{label}</div>}
    </div>
  );
}