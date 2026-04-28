import profilePhoto from "../../assets/photo_profile.jpeg";

export default function AboutContent({ isMobile }) {
  const cardStyle = isMobile
    ? { background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)" }
    : { background: "rgba(17,24,39,0.4)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.20)" };

  return (
    <div className="p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 shadow-lg"
          style={{ border: "2px solid rgba(255,255,255,0.25)" }}>
          <img
            src={profilePhoto}
            alt="M. Khanan Mukhtar"
            className="w-full h-full object-cover object-top scale-[1.75]"
            style={{ transformOrigin: 'center 60%' }}
          />
        </div>
        <div>
          <h2 className="text-xl font-bold">M. Khanan Mukhtar</h2>
          <p className="text-cyan-400 text-sm">Fullstack Developer</p>
          <p className="text-gray-400 text-xs mt-1">📍 Indonesia</p>
        </div>
      </div>

      <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
        <p>Fullstack Developer with a passion for building real-world and impactful systems.</p>
        <p>Experienced in Java, Laravel, React, and Vue.js to build efficient and scalable solutions.</p>
      </div>

      <div className="mt-5 space-y-2 rounded-2xl p-4" style={cardStyle}>
        <h3 className="font-semibold text-white">🎯 Focus Areas</h3>
        <ul className="text-sm text-gray-200 space-y-1 list-disc list-inside">
          <li>Backend: Java, Laravel, Node.js</li>
          <li>Frontend: React, Vue.js</li>
          <li>Database: MySQL, PostgreSQL, MongoDB</li>
          <li>Tools: Git, Docker, REST API</li>
        </ul>
      </div>
    </div>
  );
}
