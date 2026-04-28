import { useState, useEffect } from "react";

const projects = [
  {
    title: "OrtuConnect",
    category: "Mobile & Web",
    description: "Aplikasi komunikasi orang tua dan sekolah berbasis Mobile Android & Website.",
    url: "https://pameran-jti.polije.ac.id/product/424/ortuconnect",
    image: "https://pameran-jti.polije.ac.id/public/uploads/posters/17/poster_6938103269aaa.jpg",
    role: "Ketua Kelompok",
    team: "E-MOT TEAM",
    rating: "5.0 ⭐",
  },
  {
    title: "Aplikasi Kasir Sandangan Access",
    category: "Desktop",
    description: "Aplikasi kasir digital berbasis desktop untuk UMKM fashion lokal. Kelola penjualan, stok, dan pembelian secara offline.",
    url: "https://pameran-jti.polije.ac.id/product/241/aplikasi-kasir-sandangan-access",
    image: "https://pameran-jti.polije.ac.id/public/uploads/posters/14/poster_6830a933eb5d0.jpg",
    role: "Anggota",
    team: "KomkasPro",
    rating: null,
  },
  {
    title: "Bakul Sandangan",
    category: "Desktop",
    description: "Aplikasi pembukuan UMKM berbasis desktop untuk mencatat keuangan, stok, transaksi penjualan & pembelian.",
    url: "https://pameran-jti.polije.ac.id/x23241_ng/product/134/aplikasi-pembukuan-umkm-bakul-sandangan",
    image: "https://pameran-jti.polije.ac.id/x23241_ng/public/img/screenshots/134_1.jpg",
    role: "Anggota",
    team: "—",
    rating: null,
  },
  {
    title: "Desain Poster",
    category: "Design",
    description: "Koleksi desain poster untuk berbagai keperluan event, promosi, dan organisasi.",
    url: null,
    image: null,
    role: null,
    team: null,
    rating: null,
  },
  {
    title: "UI/UX Design",
    category: "Design",
    description: "Desain antarmuka aplikasi mobile dan web menggunakan Figma.",
    url: null,
    image: null,
    role: null,
    team: null,
    rating: null,
  },
];

const FILTERS = [
  { id: "all",     label: "All Projects" },
  { id: "Mobile",  label: "Mobile" },
  { id: "Web",     label: "Web" },
  { id: "Desktop", label: "Desktop" },
  { id: "Design",  label: "Design" },
];

export default function ProjectsContent({ isMobile }) {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const cardStyle = isMobile
    ? { background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.12)" }
    : { background: "rgba(17,24,39,0.45)", backdropFilter: "blur(40px)", border: "1px solid rgba(255,255,255,0.15)" };

  const filtered = projects.filter(
    (p) => filter === "all" || p.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-32 h-32 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="20" y="30" width="60" height="50" rx="4" fill="#0078D4" opacity="0.2"/>
              <rect x="20" y="30" width="60" height="50" rx="4" fill="none" stroke="#0078D4" strokeWidth="3"/>
              <path d="M 35 30 Q 35 15, 50 15 Q 65 15, 65 30" fill="none" stroke="#0078D4" strokeWidth="3"/>
              <g transform="translate(50, 55) scale(0.3)">
                <rect x="-20" y="-20" width="18" height="18" fill="#0078D4"/>
                <rect x="2"   y="-20" width="18" height="18" fill="#0078D4"/>
                <rect x="-20" y="2"   width="18" height="18" fill="#0078D4"/>
                <rect x="2"   y="2"   width="18" height="18" fill="#0078D4"/>
              </g>
            </svg>
          </div>
          <div className="flex justify-center mb-4">
            <div className="relative w-12 h-12">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-3 bg-white/60 rounded-full"
                  style={{
                    left: "50%", top: "0",
                    transformOrigin: "0.5px 24px",
                    transform: `rotate(${i * 45}deg)`,
                    opacity: 0.2,
                    animation: "spin-fade 1s linear infinite",
                    animationDelay: `${i * 0.125}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-white/70 text-center text-sm">Loading projects...</p>
        </div>
        <style>{`@keyframes spin-fade { 0%,100%{opacity:.2} 50%{opacity:1} }`}</style>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex gap-6">
        {/* Sidebar Filter */}
        <div className="w-32 flex-shrink-0 space-y-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className="w-full text-left flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
              style={
                filter === f.id
                  ? { background: "rgba(6,182,212,0.2)", color: "rgb(103,232,249)", border: "1px solid rgba(6,182,212,0.35)" }
                  : { color: "rgba(255,255,255,0.45)", border: "1px solid transparent" }
              }
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            {filtered.map((project, idx) => (
              <div
                key={idx}
                className="group animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col" style={cardStyle}>
                  {/* Image */}
                  <div className="h-36 bg-[#1a1a2e] relative overflow-hidden flex-shrink-0">
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => { e.target.style.display = "none"; }}
                      />
                    )}
                    <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
                      <span
                        className="px-2 py-0.5 rounded text-xs text-white"
                        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        {project.category}
                      </span>
                      {project.rating && (
                        <span
                          className="px-2 py-0.5 rounded text-xs text-yellow-300 font-medium"
                          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)" }}
                        >
                          {project.rating}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3 flex flex-col gap-1.5 flex-1">
                    <h3 className="text-white font-semibold text-sm leading-tight">{project.title}</h3>
                    {project.description && (
                      <p className="text-white/50 text-xs leading-relaxed line-clamp-2">{project.description}</p>
                    )}
                    {project.role && (
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-cyan-300 text-xs">{project.role}</span>
                        {project.team && <span className="text-white/30 text-xs">· {project.team}</span>}
                      </div>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center gap-1 text-xs text-blue-300 hover:text-blue-200 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current flex-shrink-0">
                          <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"/>
                        </svg>
                        Lihat Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
