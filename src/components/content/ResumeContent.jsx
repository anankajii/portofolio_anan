import { useState } from "react";
import cvPdf from "../../assets/CV_M_Khanan Mukhtar_B.pdf";

const TABS = [
  { id: "cv",         label: "📄 CV" },
  { id: "sertifikat", label: "🏆 Sertifikat" },
];

const LINKS = {
  cv: cvPdf,
  sertifikat: "https://drive.google.com/embeddedfolderview?id=1HaIZx1YKpCiBmuRVtkyBsF5eVs8deelv#grid",
};

export default function ResumeContent({ isMobile }) {
  const [activeTab, setActiveTab] = useState("cv");

  const tabActive   = { background: "rgba(6,182,212,0.3)",  border: "1px solid rgba(6,182,212,0.5)",   color: "white" };
  const tabInactive = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)" };
  const btnBg       = "rgba(6,182,212,0.25)";
  const btnHover    = "rgba(6,182,212,0.4)";

  return (
    <div className="flex flex-col h-full text-white">
      {/* Tab Bar */}
      <div className="flex gap-2 px-4 pt-4 pb-3 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
            style={activeTab === tab.id ? tabActive : tabInactive}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PDF / Folder Viewer */}
      <div className="flex-1 min-h-0">
        <iframe
          key={activeTab}
          src={LINKS[activeTab]}
          title={activeTab === "cv" ? "CV M. Khanan Mukhtar" : "Sertifikat"}
          className="w-full h-full"
          style={{ minHeight: isMobile ? "65vh" : "480px", border: "none" }}
        />
      </div>

      {/* Open Button */}
      <div className="p-4 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}>
        <a
          href={LINKS[activeTab]}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl transition font-medium text-white text-center"
          style={{ background: btnBg, backdropFilter: "blur(20px)", border: "1px solid rgba(6,182,212,0.45)" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = btnHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = btnBg)}
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white flex-shrink-0">
            <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
          </svg>
          Buka di Tab Baru
        </a>
      </div>
    </div>
  );
}
