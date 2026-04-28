const technical = [
  { name: "Java",            icon: "☕", bg: "linear-gradient(135deg,#b07219,#7a4f10)" },
  { name: "PHP",             icon: "🐘", bg: "linear-gradient(135deg,#7377b4,#4f5380)" },
  { name: "Flutter",         icon: "💙", bg: "linear-gradient(135deg,#54C5F8,#01579B)" },
  { name: "Laravel",         icon: "🔺", bg: "linear-gradient(135deg,#FF2D20,#a01a14)" },
  { name: "REST API",        icon: "🔗", bg: "linear-gradient(135deg,#6366f1,#4338ca)" },
  { name: "HTML",            icon: "🌐", bg: "linear-gradient(135deg,#e34c26,#a33318)" },
  { name: "CSS",             icon: "🎨", bg: "linear-gradient(135deg,#563d7c,#3a2854)" },
  { name: "Git / GitHub",    icon: "🐙", bg: "linear-gradient(135deg,#24292e,#000)" },
  { name: "Database Design", icon: "🗄️", bg: "linear-gradient(135deg,#06b6d4,#0e7490)" },
];

const tools = [
  { name: "VS Code",           icon: "💻", bg: "linear-gradient(135deg,#007ACC,#005a9e)" },
  { name: "Postman",           icon: "📮", bg: "linear-gradient(135deg,#FF6C37,#c44a1e)" },
  { name: "Android Studio",    icon: "🤖", bg: "linear-gradient(135deg,#3DDC84,#1a8a4a)" },
  { name: "XAMPP",             icon: "🦈", bg: "linear-gradient(135deg,#FB8200,#b35c00)" },
  { name: "Laragon",           icon: "🐉", bg: "linear-gradient(135deg,#00BCD4,#00838f)" },
  { name: "phpMyAdmin",        img: "https://ampps.com/sitepad-data/uploads/2023/03/phpMyAdmin-Logo-Space.png", bg: "#ffffff" },
  { name: "Figma",             icon: "🎭", bg: "linear-gradient(135deg,#A259FF,#6b2fc7)" },
  { name: "Canva",             img: "https://images.seeklogo.com/logo-png/43/1/canva-logo-png_seeklogo-438258.png", bg: "linear-gradient(135deg,#00C4CC,#007b80)" },
  { name: "Adobe Illustrator", icon: "✏️", bg: "linear-gradient(135deg,#FF9A00,#b36a00)" },
  { name: "Adobe Lightroom",   icon: "📷", bg: "linear-gradient(135deg,#3175D4,#1a4a9e)" },
];

function IconGrid({ items, startDelay = 0 }) {
  return (
    <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
      {items.map((item, i) => (
        <div
          key={item.name}
          className="flex flex-col items-center gap-2"
          style={{
            animation: `float-icon 3s ease-in-out infinite`,
            animationDelay: `${(startDelay + i * 0.18) % 3}s`,
          }}
        >
          {/* Icon bubble */}
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden"
            style={{
              background: item.bg,
              boxShadow: "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
          >
            {item.img ? (
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-2xl leading-none">{item.icon}</span>
            )}
          </div>
          {/* Label */}
          <span className="text-white/75 text-[10px] font-medium text-center leading-tight max-w-[56px]">
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SkillsContent({ isMobile }) {
  const cardStyle = isMobile
    ? { background: "rgba(255,255,255,0.08)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)" }
    : { background: "rgba(17,24,39,0.4)", backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.20)" };

  return (
    <div className="p-6 space-y-5 text-white">
      <style>{`
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>

      <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
        <h3 className="font-semibold text-white/80 text-xs uppercase tracking-widest">⚙️ Technical</h3>
        <IconGrid items={technical} startDelay={0} />
      </div>

      <div className="rounded-2xl p-5 space-y-4" style={cardStyle}>
        <h3 className="font-semibold text-white/80 text-xs uppercase tracking-widest">🛠️ Tools</h3>
        <IconGrid items={tools} startDelay={0.5} />
      </div>
    </div>
  );
}
