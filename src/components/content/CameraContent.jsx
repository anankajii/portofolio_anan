import { useState, useEffect, useRef, useCallback } from "react";

const SCUBA_GIF = "https://media.tenor.com/8377526270529966891/scuba-scuba-cat.gif";

// Deteksi gerakan tangan: bandingkan posisi wrist frame sekarang vs sebelumnya
function detectHandMovement(landmarks, prevLandmarks) {
  if (!prevLandmarks) return false;
  const wrist = landmarks[0];
  const prevWrist = prevLandmarks[0];
  const dx = wrist.x - prevWrist.x;
  const dy = wrist.y - prevWrist.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return dist > 0.015; // threshold gerakan
}

function randomPos() {
  return {
    top: `${10 + Math.random() * 60}%`,
    left: `${5 + Math.random() * 70}%`,
    size: 80 + Math.floor(Math.random() * 80), // 80–160px
    id: Date.now() + Math.random(),
  };
}

export default function CameraContent({ isMobile }) {
  const videoRef    = useRef(null);
  const canvasRef   = useRef(null);
  const streamRef   = useRef(null);
  const handsRef    = useRef(null);
  const prevLandRef = useRef(null);
  const cooldownRef = useRef(false);

  const [permission,  setPermission]  = useState("idle");
  const [facingMode,  setFacingMode]  = useState("environment");
  const [photo,       setPhoto]       = useState(null);
  const [flash,       setFlash]       = useState(false);
  const [showHint,    setShowHint]    = useState(true);   // "wave your hand" hint
  const [cats,        setCats]        = useState([]);     // array of {top,left,size,id}

  // ── Spawn scuba cat ──────────────────────────────────────────────────────
  const spawnCat = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;
    const pos = randomPos();
    setCats(prev => [...prev, pos]);
    // Remove after 2.5s
    setTimeout(() => {
      setCats(prev => prev.filter(c => c.id !== pos.id));
    }, 2500);
    // Cooldown 800ms agar tidak spam
    setTimeout(() => { cooldownRef.current = false; }, 800);
  }, []);

  // ── Start camera + MediaPipe Hands ──────────────────────────────────────
  const startCamera = useCallback(async (facing = "environment") => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
    }
    setPhoto(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setPermission("granted");

      // Lazy-load MediaPipe Hands
      const { Hands } = await import("@mediapipe/hands");
      const hands = new Hands({
        locateFile: file =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });
      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 0,
        minDetectionConfidence: 0.6,
        minTrackingConfidence: 0.5,
      });
      hands.onResults(results => {
        if (!results.multiHandLandmarks?.length) {
          prevLandRef.current = null;
          return;
        }
        const landmarks = results.multiHandLandmarks[0];
        if (detectHandMovement(landmarks, prevLandRef.current)) {
          spawnCat();
        }
        prevLandRef.current = landmarks;
      });
      handsRef.current = hands;

      // Feed frames to MediaPipe
      const sendFrame = async () => {
        if (!videoRef.current || videoRef.current.readyState < 2) {
          requestAnimationFrame(sendFrame);
          return;
        }
        await hands.send({ image: videoRef.current });
        requestAnimationFrame(sendFrame);
      };
      requestAnimationFrame(sendFrame);

    } catch (err) {
      setPermission(err.name === "NotAllowedError" ? "denied" : "error");
    }
  }, [spawnCat]);

  useEffect(() => {
    startCamera(facingMode);
    // Hide hint after 4s
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => {
      clearTimeout(t);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      handsRef.current?.close?.();
    };
  }, []);

  const flipCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current;
    const c = canvasRef.current;
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

  // ── Error states ─────────────────────────────────────────────────────────
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
        Camera requires a secure connection (HTTPS).<br/>
        Try accessing via <span className="text-cyan-300">localhost:5173</span> or deploy to Vercel.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      <canvas ref={canvasRef} className="hidden" />

      {/* Flash */}
      {flash && <div className="absolute inset-0 bg-white z-30 pointer-events-none" />}

      {/* Viewfinder */}
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

        {/* Grid */}
        {!photo && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.07) 1px,transparent 1px)",
            backgroundSize: "33.33% 33.33%",
          }} />
        )}

        {/* "Wave your hand" hint */}
        {showHint && !photo && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 animate-bounce"
            style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            <span>👋</span> Wave your hand for a surprise!
          </div>
        )}

        {/* Scuba cats */}
        {cats.map(cat => (
          <img
            key={cat.id}
            src={SCUBA_GIF}
            alt="scuba cat"
            className="absolute pointer-events-none"
            style={{
              top: cat.top,
              left: cat.left,
              width: cat.size,
              height: cat.size,
              borderRadius: "50%",
              animation: "cat-pop 2.5s ease-out forwards",
              zIndex: 20,
            }}
          />
        ))}

        <style>{`
          @keyframes cat-pop {
            0%   { opacity:0; transform: scale(0.3) rotate(-10deg); }
            20%  { opacity:1; transform: scale(1.1) rotate(5deg); }
            80%  { opacity:1; transform: scale(1) rotate(0deg); }
            100% { opacity:0; transform: scale(0.8) translateY(-20px); }
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
