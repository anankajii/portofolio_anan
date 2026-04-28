import { useState, useEffect, useRef, useCallback } from "react";
import scubaVideo from "../../assets/scubaaa.webm";

// ── Skin color detection + motion ─────────────────────────────────────────────
// Deteksi pixel warna kulit (YCbCr color space range), lalu cek apakah
// area kulit tersebut bergerak dibanding frame sebelumnya.
function isSkinPixel(r, g, b) {
  // Convert RGB → YCbCr
  const y  =  0.299 * r + 0.587 * g + 0.114 * b;
  const cb = -0.169 * r - 0.331 * g + 0.500 * b + 128;
  const cr =  0.500 * r - 0.419 * g - 0.081 * b + 128;
  // Standard skin range in YCbCr
  return y > 80 && cb >= 85 && cb <= 135 && cr >= 135 && cr <= 180;
}

function createHandDetector() {
  let prevSkinMask = null;

  return function detect(ctx, W, H) {
    const { data } = ctx.getImageData(0, 0, W, H);
    const skinMask = new Uint8Array(W * H);
    let skinCount = 0;

    for (let i = 0; i < W * H; i++) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
      if (isSkinPixel(r, g, b)) {
        skinMask[i] = 1;
        skinCount++;
      }
    }

    const skinRatio = skinCount / (W * H);
    // Harus ada cukup pixel kulit (tangan di frame): 3%–40%
    const handPresent = skinRatio > 0.03 && skinRatio < 0.40;

    let moved = false;
    if (handPresent && prevSkinMask) {
      // Hitung berapa pixel kulit yang berpindah
      let diff = 0;
      for (let i = 0; i < skinMask.length; i++) {
        if (skinMask[i] !== prevSkinMask[i]) diff++;
      }
      // Gerakan tangan: >2% pixel kulit berubah posisi
      moved = diff / (W * H) > 0.02;
    }

    prevSkinMask = skinMask;
    return { handPresent, moved };
  };
}

function randomPos() {
  return {
    top:  `${5  + Math.random() * 45}%`,
    left: `${5  + Math.random() * 55}%`,
    size: 180 + Math.floor(Math.random() * 80),
    id:   Date.now() + Math.random(),
  };
}

export default function CameraContent() {
  const videoRef     = useRef(null);
  const canvasRef    = useRef(null);
  const offscreenRef = useRef(null);
  const streamRef    = useRef(null);
  const rafRef       = useRef(null);
  const cooldownRef  = useRef(false);
  const detectRef    = useRef(null);

  const [permission,   setPermission]   = useState("idle");
  const [facingMode,   setFacingMode]   = useState("environment");
  const [photo,        setPhoto]        = useState(null);
  const [flash,        setFlash]        = useState(false);
  const [showHint,     setShowHint]     = useState(true);
  const [cats,         setCats]         = useState([]);
  const [status,       setStatus]       = useState("ready"); // ready | hand | moving

  // ── Spawn video ────────────────────────────────────────────────────────────
  const spawnCat = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    const pos = randomPos();
    setCats(prev => [...prev, pos]);
    setTimeout(() => setCats(prev => prev.filter(c => c.id !== pos.id)), 5000);
    setTimeout(() => { cooldownRef.current = false; }, 1500);
  }, []);

  // ── Detection loop ─────────────────────────────────────────────────────────
  const startDetectionLoop = useCallback((video) => {
    if (!offscreenRef.current) offscreenRef.current = document.createElement("canvas");
    const oc = offscreenRef.current;
    const W = 160, H = 90;
    oc.width = W; oc.height = H;
    const ctx = oc.getContext("2d", { willReadFrequently: true });

    detectRef.current = createHandDetector();

    let lastCheck = 0;
    const INTERVAL = 100;

    const loop = (ts) => {
      rafRef.current = requestAnimationFrame(loop);
      if (ts - lastCheck < INTERVAL) return;
      lastCheck = ts;
      if (!video || video.readyState < 2) return;

      ctx.drawImage(video, 0, 0, W, H);
      const { handPresent, moved } = detectRef.current(ctx, W, H);

      if (!handPresent) {
        setStatus("ready");
      } else if (moved) {
        setStatus("moving");
        spawnCat();
      } else {
        setStatus("hand");
      }
    };

    rafRef.current = requestAnimationFrame(loop);
  }, [spawnCat]);

  // ── Start camera ───────────────────────────────────────────────────────────
  const startCamera = useCallback(async (facing) => {
    if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    detectRef.current = null;
    setPhoto(null);
    setStatus("ready");

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
    } catch (err) {
      setPermission(err.name === "NotAllowedError" ? "denied" : "error");
      return;
    }

    streamRef.current = stream;
    const video = videoRef.current;
    if (video) {
      video.srcObject = stream;
      video.onloadeddata = () => startDetectionLoop(video);
    }
    setPermission("granted");
  }, [startDetectionLoop]);

  useEffect(() => {
    startCamera("environment");
    const t = setTimeout(() => setShowHint(false), 5000);
    return () => {
      clearTimeout(t);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
    };
  }, []);

  const flipCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current, c = canvasRef.current;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    setPhoto(c.toDataURL("image/jpeg", 0.92));
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  };

  const downloadPhoto = () => {
    if (!photo) return;
    const a = document.createElement("a");
    a.href = photo; a.download = `photo_${Date.now()}.jpg`; a.click();
  };

  const statusConfig = {
    ready:  { color: "rgba(255,255,255,0.3)", label: "No hand" },
    hand:   { color: "#3b82f6",              label: "Hand ✋" },
    moving: { color: "#22c55e",              label: "Moving! 🖐️" },
  };
  const sc = statusConfig[status] ?? statusConfig.ready;

  // ── Error screens ──────────────────────────────────────────────────────────
  if (permission === "denied") return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-white text-center">
      <div className="text-5xl">🚫</div>
      <p className="font-semibold">Camera access denied</p>
      <p className="text-white/60 text-sm">Allow camera access in your browser settings, then refresh.</p>
    </div>
  );

  if (permission === "error") return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-white text-center">
      <div className="text-5xl">⚠️</div>
      <p className="font-semibold">Camera not available</p>
      <p className="text-white/60 text-sm">
        Camera requires HTTPS.<br />
        Access via <span className="text-cyan-300 font-mono">localhost:5173</span> or deploy to Vercel.
      </p>
    </div>
  );

  // ── Main UI ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />
      {flash && <div className="absolute inset-0 bg-white z-30 pointer-events-none" />}

      <div className="flex-1 relative overflow-hidden">
        {photo ? (
          <img src={photo} alt="captured" className="w-full h-full object-contain bg-black" />
        ) : (
          <video
            ref={videoRef}
            autoPlay playsInline muted
            className="w-full h-full object-cover"
            style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
          />
        )}

        {/* Grid overlay */}
        {!photo && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)",
            backgroundSize: "33.33% 33.33%",
          }} />
        )}

        {/* Status indicator */}
        {!photo && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background: sc.color,
                boxShadow: status !== "ready" ? `0 0 8px ${sc.color}` : "none",
              }}
            />
            <span className="text-white/60 text-[10px] font-medium">{sc.label}</span>
          </div>
        )}

        {/* Hint */}
        {showHint && !photo && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 animate-bounce"
            style={{
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            <span>👋</span> Wave your hand for a surprise!
          </div>
        )}

        {/* Scuba video spawns */}
        {cats.map(cat => (
          <video
            key={cat.id}
            src={scubaVideo}
            autoPlay loop muted playsInline
            className="absolute pointer-events-none"
            style={{
              top: cat.top, left: cat.left,
              width: cat.size, height: cat.size,
              objectFit: "contain",
              animation: "cat-pop 5s ease-out forwards",
              zIndex: 20,
            }}
          />
        ))}

        <style>{`
          @keyframes cat-pop {
            0%   { opacity:0; transform:scale(0.2) rotate(-15deg); }
            12%  { opacity:1; transform:scale(1.15) rotate(6deg); }
            85%  { opacity:1; transform:scale(1) rotate(0deg); }
            100% { opacity:0; transform:scale(0.9) translateY(-20px); }
          }
        `}</style>
      </div>

      {/* Controls */}
      <div
        className="flex-shrink-0 flex items-center justify-around px-8 py-5"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        {photo ? (
          <>
            <button onClick={() => setPhoto(null)} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/></svg>
              </div>
              <span className="text-xs">Retake</span>
            </button>

            <button onClick={downloadPhoto} className="flex flex-col items-center gap-1 text-white hover:text-cyan-300 transition">
              <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "rgba(6,182,212,0.3)", border: "2px solid rgba(6,182,212,0.6)" }}>
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white"><path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/></svg>
              </div>
              <span className="text-xs">Save</span>
            </button>

            <button
              onClick={async () => {
                if (!navigator.share) return;
                const blob = await (await fetch(photo)).blob();
                navigator.share({ files: [new File([blob], "photo.jpg", { type: "image/jpeg" })] }).catch(() => {});
              }}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/></svg>
              </div>
              <span className="text-xs">Share</span>
            </button>
          </>
        ) : (
          <>
            <button onClick={flipCamera} className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M20,5H16.83L15,3H9L7.17,5H4A2,2 0 0,0 2,7V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V7A2,2 0 0,0 20,5M12,17A5,5 0 0,1 7,12H9.5L6.5,9L3.5,12H6A6,6 0 0,0 18,12H15.5L18.5,9L21.5,12H19A5,5 0 0,1 14,17H12Z"/></svg>
              </div>
              <span className="text-xs">Flip</span>
            </button>

            <button
              onClick={takePhoto}
              className="w-20 h-20 rounded-full flex items-center justify-center transition active:scale-95"
              style={{ background: "white", boxShadow: "0 0 0 4px rgba(255,255,255,0.3),0 0 0 8px rgba(255,255,255,0.1)" }}
            >
              <div className="w-16 h-16 rounded-full bg-white border-4 border-black/10" />
            </button>

            <div className="w-12 h-12" />
          </>
        )}
      </div>
    </div>
  );
}
