import { useState, useEffect } from "react";

export default function AppleSplash({ onComplete }) {
  const [phase, setPhase] = useState("logo"); // logo → progress → done

  useEffect(() => {
    // Show logo for 1.5s, then show progress bar, then complete
    const t1 = setTimeout(() => setPhase("progress"), 1500);
    const t2 = setTimeout(() => setPhase("done"), 3200);
    const t3 = setTimeout(() => onComplete(), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
      style={{
        opacity: phase === "done" ? 0 : 1,
        transition: phase === "done" ? "opacity 0.4s ease-out" : "none",
      }}
    >
      {/* Apple Logo SVG */}
      <div
        style={{
          opacity: phase === "logo" ? 0 : 1,
          transform: phase === "logo" ? "scale(0.85)" : "scale(1)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        <svg
          width="80"
          height="96"
          viewBox="0 0 814 1000"
          fill="white"
        >
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.9 0 111.9 2.6 168.3 80.1zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
        </svg>
      </div>

      {/* Progress bar — iOS style, bottom of screen */}
      {phase === "progress" && (
        <div className="absolute bottom-24 w-32">
          <div className="h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{
                animation: "ios-progress 1.6s ease-in-out forwards",
              }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes ios-progress {
          0%   { width: 0%; }
          60%  { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
