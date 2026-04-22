import { useState, useEffect, useMemo } from "react";
import AppleSplash from "./AppleSplash";
import iosWallpaper from "../assets/ios-wallpaper.jpg";

export default function MobileView({ onIconClick }) {
  const [time, setTime] = useState(new Date());
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Update time every minute instead of every second for better performance
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) =>
    t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" });
  const dayNum = today.getDate();

  // Memoize static data to prevent re-creation on every render
  const forecast = useMemo(() => [
    { day: "18", icon: "🌧️", temp: "23°" },
    { day: "19", icon: "🌧️", temp: "22°" },
    { day: "20", icon: "🌧️", temp: "22°" },
    { day: "21", icon: "🌩️", temp: "22°" },
    { day: "22", icon: "🌧️", temp: "22°" },
    { day: "23", icon: "🌧️", temp: "22°" },
  ], []);

  // ── App icons (iOS 18 style - lebih rounded, shadow lebih soft) ──────────
  const apps = [
    {
      id: "projects", label: "Projects", badge: "10+",
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#54C5F8] to-[#01579B] flex items-center justify-center" 
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <svg viewBox="0 0 24 24" className="w-11 h-11">
            <path fill="white" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357z"/>
            <path fill="rgba(255,255,255,0.8)" d="M14.328 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.372z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "skills", label: "Packages", badge: "3",
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#00D2C8] to-[#007B77] flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <svg viewBox="0 0 100 100" className="w-11 h-11">
            <polygon points="25,2 75,2 98,25 98,75 75,98 25,98 2,75 2,25" fill="white" opacity="0.95"/>
            <polygon points="25,2 75,2 98,25 50,50" fill="white" opacity="0.7"/>
          </svg>
        </div>
      ),
    },
    {
      id: "github", label: "Github", badge: "20+",
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#24292e] to-[#000000] flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <svg viewBox="0 0 24 24" className="w-11 h-11 fill-white">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "linkedin", label: "LinkedIn", badge: "5K+",
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#0077B5] to-[#004471] flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <svg viewBox="0 0 24 24" className="w-11 h-11 fill-white">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "resume", label: "Resume", badge: null,
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#FF0000] to-[#990000] flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <svg viewBox="0 0 24 24" className="w-11 h-11 fill-white">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11m-4.5-7.5c0 1.38-1.12 2.5-2.5 2.5H9v2H7.5V9H11c1.38 0 2.5 1.12 2.5 2.5v1m-1.5 0v-1c0-.55-.45-1-1-1H9v3h2c.55 0 1-.45 1-1z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "about", label: "About Me", badge: null,
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#5E5CE6] to-[#3634A3] flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <svg viewBox="0 0 24 24" className="w-11 h-11 fill-white">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      ),
    },
  ];

  // ── Dock icons (iOS 18 style) ─────────────────────────────────────────────
  const dockApps = [
    {
      id: "call", label: "Phone",
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#34C759] to-[#248A3D] flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
            <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "mail", label: "Mail",
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-br from-[#007AFF] to-[#0051D5] flex items-center justify-center"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)' }}>
          <svg viewBox="0 0 60 44" className="w-9 h-7">
            <rect x="1" y="1" width="58" height="42" rx="4" fill="none" stroke="white" strokeWidth="2.5"/>
            <polyline points="1,1 30,26 59,1" fill="none" stroke="white" strokeWidth="2.5"/>
          </svg>
        </div>
      ),
    },
    {
      id: "calendar", label: dayName,
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-white flex flex-col"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <div className="bg-[#FF3B30] flex items-center justify-center py-1.5">
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">{dayName}</span>
          </div>
          <div className="flex-1 flex items-center justify-center bg-white">
            <span className="text-black text-[32px] font-light">{dayNum}</span>
          </div>
        </div>
      ),
    },
    {
      id: "contacts", label: "Contacts",
      icon: (
        <div className="w-full h-full rounded-[23%] overflow-hidden bg-gradient-to-b from-[#F5F5F7] to-[#E5E5EA] flex flex-col"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
          <div className="flex-1 flex items-center justify-center pt-2">
            <svg viewBox="0 0 24 24" className="w-9 h-9">
              <circle cx="12" cy="9" r="4" fill="#8E8E93"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#8E8E93"/>
            </svg>
          </div>
          <div className="flex h-2.5">
            <div className="flex-1 bg-[#FF3B30]"/>
            <div className="flex-1 bg-[#FF9500]"/>
            <div className="flex-1 bg-[#FFCC00]"/>
            <div className="flex-1 bg-[#34C759]"/>
            <div className="flex-1 bg-[#007AFF]"/>
            <div className="flex-1 bg-[#AF52DE]"/>
          </div>
        </div>
      ),
    },
  ];

  if (showSplash) {
    return <AppleSplash onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden relative flex flex-col select-none"
      style={{
        backgroundImage: `url(${iosWallpaper})`,
        backgroundColor: '#1a0533',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        willChange: 'transform',
      }}
    >
      {/* Dark overlay - optimized */}
      <div className="absolute inset-0 bg-black/25" style={{ willChange: 'opacity' }} />

      {/* ── iOS Status Bar ── */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-3 pb-1">
        <span className="text-white font-semibold text-[15px]">{formatTime(time)}</span>
        <div className="flex items-center gap-1.5">
          {/* Signal */}
          <div className="flex items-end gap-[2px]">
            {[3,5,7,9].map((h, i) => (
              <div key={i} className="w-[3px] bg-white rounded-sm"
                style={{ height: h, opacity: i < 3 ? 1 : 0.35 }} />
            ))}
          </div>
          {/* WiFi */}
          <svg width="16" height="12" viewBox="0 0 24 18" fill="white">
            <path d="M12 4C7.31 4 3.07 5.9 0 9l2.1 2.1C4.6 8.7 8.1 7 12 7s7.4 1.7 9.9 4.1L24 9c-3.07-3.1-7.31-5-12-5zm0 6c-2.76 0-5.26 1.12-7.07 2.93L7 15c1.29-1.29 3.07-2 5-2s3.71.71 5 2l2.07-2.07C17.26 11.12 14.76 10 12 10zm0 6c-1.38 0-2.63.56-3.54 1.46L12 21l3.54-3.54C14.63 16.56 13.38 16 12 16z"/>
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-[2px]">
            <div className="w-[22px] h-[11px] border-[1.5px] border-white rounded-[3px] relative flex items-center px-[2px]">
              <div className="h-[5px] bg-white rounded-sm w-[75%]" />
            </div>
            <div className="w-[2px] h-[5px] bg-white/60 rounded-r-sm" />
          </div>
        </div>
      </div>

      {/* ── Weather Widget (simplified for performance) ── */}
      <div className="relative z-10 mx-4 mt-2">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-3 shadow-xl">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-semibold">Pare</span>
              </div>
              <div className="text-white text-4xl font-thin leading-none mt-0.5">22°</div>
            </div>
            <div className="text-right">
              <div className="text-2xl">☁️</div>
              <div className="text-white/70 text-[11px] mt-1">Patchy rain</div>
              <div className="text-white/70 text-[11px]">H:30° L:22°</div>
            </div>
          </div>
          <div className="border-t border-white/10 mb-2" />
          <div className="flex justify-between">
            {forecast.map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-white/60 text-[10px]">{f.day}</span>
                <span className="text-sm">{f.icon}</span>
                <span className="text-white text-[10px] font-medium">{f.temp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── App Grid ── */}
      <div className="relative z-10 flex-1 px-5 pt-5 overflow-hidden">
        <div className="grid grid-cols-4 gap-x-3 gap-y-5">
          {apps.map((app) => (
            <button
              key={app.id}
              onClick={() => onIconClick(app.id)}
              className="flex flex-col items-center gap-1.5 active:opacity-60 transition-opacity"
            >
              <div className="relative w-[64px] h-[64px]">
                {app.icon}
                {app.badge && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full px-1.5 py-[1px] leading-none shadow-lg min-w-[20px] text-center">
                    {app.badge}
                  </span>
                )}
              </div>
              <span className="text-white text-[11px] font-medium drop-shadow text-center leading-tight">
                {app.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── iOS Dock ── */}
      <div className="relative z-10 mx-4 mb-8">
        <div className="bg-white/20 backdrop-blur-2xl rounded-[28px] border border-white/20 px-5 py-3 shadow-2xl">
          <div className="flex justify-around items-center">
            {dockApps.map((app) => (
              <button
                key={app.id}
                onClick={() => onIconClick(app.id)}
                className="active:opacity-60 transition-opacity"
              >
                <div className="w-[58px] h-[58px] shadow-xl">
                  {app.icon}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
