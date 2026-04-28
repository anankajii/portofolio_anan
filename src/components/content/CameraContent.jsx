import { useState, useEffect, useRef } from "react";

export default function CameraContent({ isMobile }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [permission, setPermission] = useState("idle"); // idle | granted | denied | error
  const [facingMode, setFacingMode] = useState("environment"); // environment = belakang, user = depan
  const [photo, setPhoto] = useState(null);
  const [flash, setFlash] = useState(false);

  const startCamera = async (facing = facingMode) => {
    // Stop stream lama dulu
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setPhoto(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPermission("granted");
    } catch (err) {
      setPermission(err.name === "NotAllowedError" ? "denied" : "error");
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const flipCamera = () => {
    const next = facingMode === "environment" ? "user" : "environment";
    setFacingMode(next);
    startCamera(next);
  };

  const takePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setPhoto(dataUrl);
    // Flash effect
    setFlash(true);
    setTimeout(() => setFlash(false), 150);
  };

  const downloadPhoto = () => {
    if (!photo) return;
    const a = document.createElement("a");
    a.href = photo;
    a.download = `photo_${Date.now()}.jpg`;
    a.click();
  };

  const retake = () => {
    setPhoto(null);
  };

  if (permission === "denied") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-white text-center">
        <div className="text-5xl">🚫</div>
        <p className="font-semibold">Akses kamera ditolak</p>
        <p className="text-white/60 text-sm">Izinkan akses kamera di pengaturan browser kamu, lalu refresh halaman.</p>
      </div>
    );
  }

  if (permission === "error") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 p-6 text-white text-center">
        <div className="text-5xl">⚠️</div>
        <p className="font-semibold">Kamera tidak tersedia</p>
        <p className="text-white/60 text-sm">Perangkat ini tidak memiliki kamera atau terjadi kesalahan.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      {/* Canvas tersembunyi untuk capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Flash overlay */}
      {flash && <div className="absolute inset-0 bg-white z-30 pointer-events-none" />}

      {/* Viewfinder / Photo preview */}
      <div className="flex-1 relative overflow-hidden">
        {photo ? (
          <img src={photo} alt="captured" className="w-full h-full object-contain bg-black" />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
          />
        )}

        {/* Grid overlay */}
        {!photo && (
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "33.33% 33.33%",
          }} />
        )}
      </div>

      {/* Controls */}
      <div
        className="flex-shrink-0 flex items-center justify-around px-8 py-5"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {photo ? (
          <>
            {/* Retake */}
            <button
              onClick={retake}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                </svg>
              </div>
              <span className="text-xs">Ulang</span>
            </button>

            {/* Download */}
            <button
              onClick={downloadPhoto}
              className="flex flex-col items-center gap-1 text-white hover:text-cyan-300 transition"
            >
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "rgba(6,182,212,0.3)", border: "2px solid rgba(6,182,212,0.6)" }}>
                <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
                  <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z"/>
                </svg>
              </div>
              <span className="text-xs">Simpan</span>
            </button>

            {/* Share (Web Share API) */}
            <button
              onClick={async () => {
                if (!navigator.share) return;
                const blob = await (await fetch(photo)).blob();
                const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
                navigator.share({ files: [file] }).catch(() => {});
              }}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/>
                </svg>
              </div>
              <span className="text-xs">Bagikan</span>
            </button>
          </>
        ) : (
          <>
            {/* Flip camera */}
            <button
              onClick={flipCamera}
              className="flex flex-col items-center gap-1 text-white/70 hover:text-white transition"
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
                  <path d="M20,5H16.83L15,3H9L7.17,5H4A2,2 0 0,0 2,7V19A2,2 0 0,0 4,21H20A2,2 0 0,0 22,19V7A2,2 0 0,0 20,5M12,17A5,5 0 0,1 7,12H9.5L6.5,9L3.5,12H6A6,6 0 0,0 18,12H15.5L18.5,9L21.5,12H19A5,5 0 0,1 14,17H12Z"/>
                </svg>
              </div>
              <span className="text-xs">Balik</span>
            </button>

            {/* Shutter */}
            <button
              onClick={takePhoto}
              className="w-20 h-20 rounded-full flex items-center justify-center transition active:scale-95"
              style={{
                background: "white",
                boxShadow: "0 0 0 4px rgba(255,255,255,0.3), 0 0 0 8px rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-16 h-16 rounded-full bg-white border-4 border-black/10" />
            </button>

            {/* Placeholder kanan */}
            <div className="w-12 h-12" />
          </>
        )}
      </div>
    </div>
  );
}
