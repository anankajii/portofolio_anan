import { useState, useEffect } from "react";
import AppleSplash from "./AppleSplash";

export default function MobileView({ onIconClick }) {
  const [time, setTime]           = useState(new Date());
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (t) =>
    t.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  const today  = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "short" }); // "Wed"
  const dayNum  = today.getDate();

  // ── Weather forecast (static) ──────────────────────────────────────────────
  const forecast = [
    { day: "18", icon: "🌧️", temp: "23°" },
    { day: "19", icon: "🌧️", temp: "22°" },
    { day: "20", icon: "🌧️", temp: "22°" },
    { day: "21", icon: "🌩️", temp: "22°" },
    { day: "22", icon: "🌧️", temp: "22°" },
    { day: "23", icon: "🌧️", temp: "22°" },
  ];

  // ── App icons ──────────────────────────────────────────────────────────────
  const apps = [
    {
      id: "projects", label: "Projects", badge: "10+",
      icon: (
        // Flutter-style icon: dark bg + Flutter logo
        <div className="w-full h-full rounded-[22%] overflow-hidden bg-[#1a1a1a] flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-10 h-10">
            <path fill="#54C5F8" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357z"/>
            <path fill="#01579B" d="M14.328 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.372z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "skills", label: "Packages", badge: "3",
      icon: (
        // Dart / pub.dev style: teal diamond on dark
        <div className="w-full h-full rounded-[22%] overflow-hidden bg-[#1a1a1a] flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 100 100" className="w-10 h-10">
            <polygon points="25,2 75,2 98,25 98,75 75,98 25,98 2,75 2,25" fill="#00B4AB"/>
            <polygon points="25,2 75,2 98,25 50,50" fill="#00D2C8" opacity="0.7"/>
            <polygon points="2,25 25,2 50,50 2,75" fill="#007B77" opacity="0.8"/>
          </svg>
        </div>
      ),
    },
    {
      id: "github", label: "Github", badge: "20+",
      icon: (
        // GitHub: white octocat on near-black
        <div className="w-full h-full rounded-[22%] overflow-hidden bg-[#1a1a1a] flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "linkedin", label: "LinkedIn", badge: "5K+",
      icon: (
        // LinkedIn: white "in" on blue, iOS style
        <div className="w-full h-full rounded-[22%] overflow-hidden bg-[#0A66C2] flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "resume", label: "Resume", badge: null,
      icon: (
        // Adobe Acrobat style: red bg, white A
        <div className="w-full h-full rounded-[22%] overflow-hidden bg-[#CC0000] flex items-center justify-center shadow-lg">
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
            <path d="M19.352 15.041c-.39-.302-1.298-.46-2.7-.469-1.053-.007-2.38.08-3.773.245-.617-.355-1.254-.745-1.79-1.22-1.37-1.2-2.514-2.865-3.232-4.697.047-.185.088-.36.126-.53.38-1.658.52-3.316.42-4.57-.09-1.12-.48-2.01-1.22-2.01-.42 0-.79.27-.99.74-.56 1.32-.27 3.65.78 5.79-.37 1.12-.77 2.24-1.3 3.44-.57 1.29-1.19 2.47-1.83 3.52-1.12.5-2.07 1.04-2.83 1.61-1.5 1.12-2.2 2.3-1.93 3.27.14.5.54.88 1.1 1.02.22.06.45.09.68.09 1.3 0 2.77-.93 4.26-2.76.27-.33.55-.69.83-1.07 1.1-.38 2.28-.73 3.5-1.01 1.17-.27 2.28-.46 3.28-.57.97.54 1.98.97 2.93 1.22 1.87.49 3.44.38 4.12-.3.33-.33.44-.77.3-1.24-.14-.47-.52-.84-1.04-1.04zm-16.3 3.97c-.18.22-.36.43-.54.62-.97 1.06-1.9 1.6-2.56 1.6-.1 0-.2-.01-.29-.04-.2-.05-.33-.16-.38-.34-.14-.5.38-1.33 1.56-2.2.56-.42 1.27-.83 2.1-1.22-.6.6-1.2 1.12-1.89 1.58zm5.5-14.5c.14-.33.33-.5.52-.5.38 0 .57.5.62 1.04.07.87-.04 2.2-.32 3.6-.73-1.87-.97-3.6-.82-4.14zm-1.5 10.5c.44-.9.84-1.84 1.2-2.78.6 1.1 1.33 2.1 2.16 2.96-.5.1-1.02.22-1.54.36-.65.17-1.28.36-1.88.56.02-.04.04-.07.06-.1zm9.5 1.5c-.38.38-1.5.5-3.04.1-.6-.16-1.22-.4-1.84-.7 1.1-.12 2.1-.17 2.9-.16 1.1.01 1.7.14 1.9.3.1.08.14.18.1.3-.02.06-.06.12-.12.16z"/>
          </svg>
        </div>
      ),
    },
    {
      id: "about", label: "About Me", badge: null,
      icon: (
        // iOS Settings-style: gradient blue
        <div className="w-full h-full rounded-[22%] overflow-hidden flex items-center justify-center shadow-lg"
          style={{ background: "linear-gradient(145deg,#1c7ef5,#0a52c4)" }}>
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      ),
    },
  ];

  // ── Dock icons ─────────────────────────────────────────────────────────────
  const dockApps = [
    {
      id: "call", label: "Phone",
      icon: (
        <div className="w-full h-full rounded-[22%] overflow-hidden shadow-lg"
          style={{ background: "linear-gradient(145deg,#4cd964,#2db84d)" }}>
          <div className="w-full h-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
              <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "mail", label: "Mail",
      icon: (
        <div className="w-full h-full rounded-[22%] overflow-hidden shadow-lg"
          style={{ background: "linear-gradient(145deg,#1a8fff,#0070e0)" }}>
          <div className="w-full h-full flex items-center justify-center">
            {/* iOS Mail envelope */}
            <svg viewBox="0 0 60 44" className="w-9 h-7">
              <rect x="1" y="1" width="58" height="42" rx="4" fill="none" stroke="white" strokeWidth="2"/>
              <polyline points="1,1 30,26 59,1" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "calendar", label: dayName,
      icon: (
        // iOS Calendar: white bg, red day name, black date
        <div className="w-full h-full rounded-[22%] overflow-hidden bg-white shadow-lg flex flex-col">
          <div className="bg-[#FF3B30] flex items-center justify-center py-1">
            <span className="text-white text-[11px] font-semibold uppercase tracking-wide">{dayName}</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <span className="text-black text-3xl font-thin">{dayNum}</span>
          </div>
        </div>
      ),
    },
    {
      id: "contacts", label: "Contacts",
      icon: (
        // iOS Contacts: white bg, colorful bottom strip
        <div className="w-full h-full rounded-[22%] overflow-hidden bg-white shadow-lg flex flex-col">
          <div className="flex-1 flex items-center justify-center pt-2">
            <svg viewBox="0 0 24 24" className="w-9 h-9">
              <circle cx="12" cy="9" r="4" fill="#8E8E93"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#8E8E93"/>
            </svg>
          </div>
          {/* Colorful bottom strip like iOS */}
          <div className="flex h-2">
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
        backgroundImage: `url('/src/assets/windows11-wallpaper.jpg')`,
        backgroundColor: '#1a0533',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25" />

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

      {/* ── Weather Widget ── */}
      <div className="relative z-10 mx-4 mt-2">
        <div className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-3 shadow-xl">
          {/* Current weather */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-1">
                <span className="text-white text-sm font-semibold">Pare</span>
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white opacity-70">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
              </div>
              <div className="text-white text-4xl font-thin leading-none mt-0.5">22°</div>
            </div>
            <div className="text-right">
              <div className="text-2xl">☁️</div>
              <div className="text-white/70 text-[11px] mt-1">Patchy rain nearby</div>
              <div className="text-white/70 text-[11px]">H:30° L:22°</div>
            </div>
          </div>
          {/* Divider */}
          <div className="border-t border-white/10 mb-2" />
          {/* Forecast */}
          <div className="flex justify-between">
            {forecast.map((f, i) => (
              <div key={i} className="flex flex-col items-center gap-0.5">
                <span className="text-white/60 text-[10px]">{f.day}</span>
                <span className="text-sm">{f.icon}</span>
                <span className="text-white text-[10px] font-medium">{f.temp}</span>
              </div>
            ))}
          </div>
          <p className="text-white/40 text-[10px] text-center mt-1.5">Weather</p>
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
