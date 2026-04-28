export default function LinkedInContent({ isMobile }) {
  const sectionCard = isMobile
    ? { background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }
    : { background: "rgba(17,24,39,0.4)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.20)" };

  return (
    <div className="h-full overflow-y-auto text-white">
      {/* Cover */}
      <div className="h-32 bg-gradient-to-r from-blue-700/80 via-blue-500/80 to-cyan-500/80 relative">
        <div className="absolute -bottom-10 left-6">
          <div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl shadow-xl"
            style={{ border: "4px solid rgba(255,255,255,0.2)" }}
          >
            👨‍💻
          </div>
        </div>
        <a
          href="https://www.linkedin.com/in/m-khanan-mukhtar-0b81a8302/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
          style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)" }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          Open LinkedIn
        </a>
      </div>

      {/* Profile Info */}
      <div className="pt-12 px-6 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <h1 className="text-xl font-bold">M. Khanan Mukhtar</h1>
        <p className="text-white/70 text-sm mt-0.5">Fullstack Developer · Java & Laravel Enthusiast</p>
        <p className="text-white/50 text-xs mt-1">📍 Indonesia</p>
        <div className="flex gap-4 mt-3">
          <div className="text-center">
            <div className="text-cyan-300 font-bold text-sm">5K+</div>
            <div className="text-white/50 text-xs">Connections</div>
          </div>
          <div className="text-center">
            <div className="text-cyan-300 font-bold text-sm">500+</div>
            <div className="text-white/50 text-xs">Followers</div>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <a
            href="https://www.linkedin.com/in/m-khanan-mukhtar-0b81a8302/"
            target="_blank" rel="noopener noreferrer"
            className="px-5 py-1.5 rounded-full text-sm font-semibold transition"
            style={{ background: "rgba(37,99,235,0.6)", backdropFilter: "blur(10px)", border: "1px solid rgba(96,165,250,0.4)" }}
          >
            Connect
          </a>
          <a
            href="https://www.linkedin.com/messaging/compose/?to=m-khanan-mukhtar-0b81a8302"
            target="_blank" rel="noopener noreferrer"
            className="px-5 py-1.5 rounded-full text-sm font-semibold transition"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.20)" }}
          >
            Message
          </a>
        </div>
      </div>

      {/* About */}
      <div className="mx-4 mt-3 rounded-xl p-4" style={sectionCard}>
        <h2 className="font-semibold text-white mb-2">About</h2>
        <p className="text-white/65 text-sm leading-relaxed">
          Fullstack Developer dengan passion dalam membangun sistem yang real-world dan bermanfaat.
          Berpengalaman dalam Java, Laravel, React, dan Vue.js. Saya suka membangun solusi yang efisien dan scalable.
        </p>
      </div>

      {/* Experience */}
      <div className="mx-4 mt-3 rounded-xl p-4" style={sectionCard}>
        <h2 className="font-semibold text-white mb-3">Experience</h2>
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-blue-600/60 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
            style={{ border: "1px solid rgba(96,165,250,0.3)" }}>💼</div>
          <div>
            <h3 className="text-white text-sm font-medium">Fullstack Developer</h3>
            <p className="text-white/50 text-xs">Freelance · Full-time</p>
            <p className="text-white/40 text-xs">2022 – Present · 2+ yrs</p>
            <p className="text-white/50 text-xs mt-1">Java, Laravel, React, Vue.js, MySQL</p>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mx-4 mt-3 rounded-xl p-4" style={sectionCard}>
        <h2 className="font-semibold text-white mb-3">Top Skills</h2>
        <div className="flex flex-wrap gap-2">
          {["Java", "Laravel", "PHP", "Flutter", "MySQL", "REST API", "Git", "Figma"].map((skill) => (
            <span key={skill} className="px-3 py-1 rounded-full text-xs text-cyan-200"
              style={{ background: "rgba(6,182,212,0.15)", border: "1px solid rgba(6,182,212,0.3)" }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="mx-4 mt-3 mb-4 rounded-xl p-4" style={sectionCard}>
        <h2 className="font-semibold text-white mb-3">Education</h2>
        <div className="flex gap-3">
          <div className="w-10 h-10 bg-green-600/60 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
            style={{ border: "1px solid rgba(74,222,128,0.3)" }}>🎓</div>
          <div>
            <h3 className="text-white text-sm font-medium">Politeknik Negeri Jember</h3>
            <p className="text-white/50 text-xs">Teknik Informatika - PSDKU Nganjuk</p>
            <p className="text-white/40 text-xs">2024 – Sekarang</p>
          </div>
        </div>
      </div>
    </div>
  );
}
