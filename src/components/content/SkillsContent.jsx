const technical = [
  { name: "Java",            icon: "☕", color: "rgba(176,114,25,0.25)",  border: "rgba(176,114,25,0.5)"  },
  { name: "PHP",             icon: "🐘", color: "rgba(119,123,180,0.25)", border: "rgba(119,123,180,0.5)" },
  { name: "Flutter",         icon: "💙", color: "rgba(84,197,248,0.25)",  border: "rgba(84,197,248,0.5)"  },
  { name: "Laravel",         icon: "🔺", color: "rgba(255,45,32,0.25)",   border: "rgba(255,45,32,0.5)"   },
  { name: "REST API",        icon: "🔗", color: "rgba(99,102,241,0.25)",  border: "rgba(99,102,241,0.5)"  },
  { name: "Postman",         icon: "📮", color: "rgba(255,108,55,0.25)",  border: "rgba(255,108,55,0.5)"  },
  { name: "MySQL",           icon: "🐬", color: "rgba(0,117,143,0.25)",   border: "rgba(0,117,143,0.5)"   },
  { name: "HTML",            icon: "🌐", color: "rgba(227,76,38,0.25)",   border: "rgba(227,76,38,0.5)"   },
  { name: "CSS",             icon: "🎨", color: "rgba(86,61,124,0.25)",   border: "rgba(86,61,124,0.5)"   },
  { name: "Git / GitHub",    icon: "🐙", color: "rgba(36,41,46,0.4)",     border: "rgba(255,255,255,0.3)" },
  { name: "Database Design", icon: "🗄️", color: "rgba(6,182,212,0.25)",   border: "rgba(6,182,212,0.5)"   },
];

const tools = [
  { name: "VS Code",           icon: "💻", color: "rgba(0,122,204,0.25)",  border: "rgba(0,122,204,0.5)"  },
  { name: "NetBeans",          icon: "🟠", color: "rgba(255,140,0,0.25)",  border: "rgba(255,140,0,0.5)"  },
  { name: "Android Studio",    icon: "🤖", color: "rgba(61,220,132,0.25)", border: "rgba(61,220,132,0.5)" },
  { name: "XAMPP",             icon: "🦈", color: "rgba(251,130,0,0.25)",  border: "rgba(251,130,0,0.5)"  },
  { name: "Laragon",           icon: "🐉", color: "rgba(0,188,212,0.25)",  border: "rgba(0,188,212,0.5)"  },
  { name: "phpMyAdmin",        icon: "🗃️", color: "rgba(244,127,36,0.25)", border: "rgba(244,127,36,0.5)" },
  { name: "Figma",             icon: "🎭", color: "rgba(162,89,255,0.25)", border: "rgba(162,89,255,0.5)" },
  { name: "Canva",             icon: "🖼️", color: "rgba(0,196,204,0.25)",  border: "rgba(0,196,204,0.5)"  },
  { name: "Adobe Illustrator", icon: "✏️", color: "rgba(255,154,0,0.25)",  border: "rgba(255,154,0,0.5)"  },
  { name: "Adobe Lightroom",   icon: "📷", color: "rgba(49,117,186,0.25)", border: "rgba(49,117,186,0.5)" },
];

function BadgeList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item.name}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-white font-medium"
          style={{ background: item.color, border: `1px solid ${item.border}` }}
        >
          <span>{item.icon}</span>
          {item.name}
        </span>
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
      <div className="rounded-2xl p-4 space-y-3" style={cardStyle}>
        <h3 className="font-semibold text-white/90 text-sm uppercase tracking-wider">⚙️ Technical</h3>
        <BadgeList items={technical} />
      </div>
      <div className="rounded-2xl p-4 space-y-3" style={cardStyle}>
        <h3 className="font-semibold text-white/90 text-sm uppercase tracking-wider">🛠️ Tools</h3>
        <BadgeList items={tools} />
      </div>
    </div>
  );
}
