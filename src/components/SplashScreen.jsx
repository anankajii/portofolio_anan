import { useState, useEffect } from "react";

export default function SplashScreen({ onComplete }) {
  const [dots, setDots] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev + 1) % 6);
    }, 200);

    // Animate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(dotsInterval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearInterval(dotsInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none">
      {/* Windows Logo */}
      <div className="mb-16">
        <svg 
          width="80" 
          height="80" 
          viewBox="0 0 88 88" 
          className="animate-pulse"
        >
          <path 
            fill="#0078D4" 
            d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z"
          />
        </svg>
      </div>

      {/* Loading Dots */}
      <div className="flex gap-2 mb-8">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i < dots ? 'bg-white scale-125' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-gray-400 text-sm">
        {progress < 30 && "Starting..."}
        {progress >= 30 && progress < 60 && "Loading portfolio..."}
        {progress >= 60 && progress < 90 && "Almost there..."}
        {progress >= 90 && "Welcome!"}
      </div>
    </div>
  );
}
