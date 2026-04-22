import { useState, useEffect } from "react";

export default function WindowsTaskbar({ openWindows, onIconClick, onWindowClick, onStartClick }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Taskbar Apps with proper icons
  const taskbarApps = [
    { 
      id: "projects", 
      label: "Projects",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="white">
            <path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
          </svg>
        </div>
      )
    },
    { 
      id: "github", 
      label: "Github",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
        </div>
      )
    },
    { 
      id: "linkedin", 
      label: "LinkedIn",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </div>
      )
    },
    { 
      id: "resume", 
      label: "Resume",
      icon: (
        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11m-4.5-7.5c0 1.38-1.12 2.5-2.5 2.5H9v2H7.5V9H11c1.38 0 2.5 1.12 2.5 2.5v1m-1.5 0v-1c0-.55-.45-1-1-1H9v3h2c.55 0 1-.45 1-1z"/>
          </svg>
        </div>
      )
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glassmorphism Taskbar */}
      <div className="h-14 bg-gray-900/30 backdrop-blur-2xl border-t border-white/10 flex items-center justify-between px-2 shadow-2xl">
        {/* Left: Weather */}
        <div className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/10 rounded-lg transition cursor-pointer">
          <span className="text-2xl">🌤️</span>
          <div className="text-white text-xs">
            <div className="font-medium">32°C</div>
            <div className="text-gray-300 text-[10px]">Partly cloudy</div>
          </div>
        </div>

        {/* Center: Start Button + App Icons */}
        <div className="flex items-center gap-1">
          {/* Windows Start Button */}
          <button 
            onClick={onStartClick}
            className="w-11 h-11 flex items-center justify-center hover:bg-white/10 rounded-lg transition"
            title="Start"
          >
            <svg width="22" height="22" viewBox="0 0 88 88" fill="white">
              <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z"/>
            </svg>
          </button>

          {/* App Icons */}
          {taskbarApps.map((app) => {
            const isOpen = openWindows.find(w => w.id === app.id);
            return (
              <button
                key={app.id}
                onClick={() => isOpen ? onWindowClick(app.id) : onIconClick(app.id)}
                className={`relative p-1.5 hover:bg-white/10 rounded-lg transition ${
                  isOpen ? 'bg-white/5' : ''
                }`}
                title={app.label}
              >
                {app.icon}
                {isOpen && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-blue-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: System Tray */}
        <div className="flex items-center gap-0.5">
          {/* Language */}
          <button className="px-2.5 py-1 hover:bg-white/10 rounded-lg transition text-white text-xs font-medium">
            ENG
          </button>

          {/* Clock & Date */}
          <button 
            className="px-3 py-1.5 hover:bg-white/10 rounded-lg transition"
          >
            <div className="text-right">
              <div className="text-white text-xs font-medium leading-tight">
                {formatTime(time)}
              </div>
              <div className="text-gray-300 text-[10px] leading-tight">
                {formatDate(time)}
              </div>
            </div>
          </button>

          {/* Notification */}
          <button 
            className="p-2 hover:bg-white/10 rounded-lg transition relative"
            title="Notifications"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.19 14,4.29 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
            </svg>
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
