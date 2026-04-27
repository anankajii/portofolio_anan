import { useState, useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import WindowsTaskbar from "./WindowsTaskbar";
import SplashScreen from "./SplashScreen";
import ProfileCard from "./ProfileCard";
import MobileView from "./MobileView";
import MobileSheet from "./MobileSheet";
import wallpaper from "../assets/windows11-wallpaper.jpg";
import cvPdf from "../assets/CV_M_Khanan Mukhtar_B.pdf";

// Custom hook to detect mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
}

// Icon Components
function FlutterIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#02569B" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/>
      </svg>
      <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-sm transform rotate-45"></div>
    </div>
  );
}

function AppleIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    </div>
  );
}

function PackagesIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#00D8FF" d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26s-1.18-1.63-3.28-2.26c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26m9.07 1.93l.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.37-2.76c.58 0 1.14.06 1.71.03.29-.47.61-.94.91-1.47L16.43 12l-.81 1.5c-.3.53-.62 1-.91 1.47-.57-.03-1.13-.03-1.71-.03-.6 0-1.17 0-1.71.03-.29-.47-.61-.94-.91-1.47L8.57 12l.81-1.5c.3-.53.62-1 .91-1.47.54-.03 1.11-.03 1.71-.03.6 0 1.17 0 1.71.03"/>
      </svg>
    </div>
  );
}

function GithubIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl shadow-lg flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
      </svg>
    </div>
  );
}

function LinkedInIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg flex items-center justify-center relative">
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-blue-600">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
      <div className="absolute top-1 right-1 w-3 h-3 bg-blue-600 rounded-sm transform rotate-45"></div>
    </div>
  );
}

function PdfIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-lg flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11m-4.5-7.5c0 1.38-1.12 2.5-2.5 2.5H9v2H7.5V9H11c1.38 0 2.5 1.12 2.5 2.5v1m-1.5 0v-1c0-.55-.45-1-1-1H9v3h2c.55 0 1-.45 1-1m6.5 2c0 1.38-1.12 2.5-2.5 2.5h-2V9H16c1.38 0 2.5 1.12 2.5 2.5v3m-1.5 0v-3c0-.55-.45-1-1-1h-1v5h1c.55 0 1-.45 1-1z"/>
      </svg>
    </div>
  );
}

export default function Desktop() {
  const [showSplash, setShowSplash] = useState(true);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [mobileSheet, setMobileSheet] = useState(null); // { id, title, content }
  const isMobile = useIsMobile();

  const openWindow = (id, title, content) => {
    if (!openWindows.find(w => w.id === id)) {
      const newWindow = {
        id,
        title,
        content,
        position: { x: 100 + openWindows.length * 30, y: 80 + openWindows.length * 30 },
        size: id === 'projects' ? { width: 900, height: 650 } : 
              id === 'github' ? { width: 1000, height: 700 } : 
              { width: 800, height: 600 },
        minimized: false
      };
      setOpenWindows([...openWindows, newWindow]);
      setActiveWindow(id);
    } else {
      setActiveWindow(id);
      // Unminimize if minimized
      setOpenWindows(openWindows.map(w => 
        w.id === id ? { ...w, minimized: false } : w
      ));
    }
  };

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindow === id) {
      setActiveWindow(openWindows[openWindows.length - 2]?.id || null);
    }
  };

  const minimizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, minimized: true } : w
    ));
  };

  const updateWindowPosition = (id, position) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, position } : w
    ));
  };

  const desktopIcons = [
    { 
      id: "projects", 
      label: "Projects", 
      icon: <FlutterIcon />, 
      badge: "10+" 
    },
    { 
      id: "skills", 
      label: "Packages", 
      icon: <PackagesIcon />, 
      badge: "3" 
    },
    { 
      id: "github", 
      label: "Github", 
      icon: <GithubIcon />, 
      badge: "20+" 
    },
    { 
      id: "linkedin", 
      label: "LinkedIn", 
      icon: <LinkedInIcon />, 
      badge: "5K+" 
    },
    { 
      id: "resume", 
      label: "Resume", 
      icon: <PdfIcon /> 
    },
  ];

  const handleIconClick = (id) => {
    // External redirects
    if (id === 'linkedin') {
      window.open('https://www.linkedin.com/in/m-khanan-mukhtar-0b81a8302/', '_blank');
      return;
    }
    if (id === 'call') {
      window.location.href = 'tel:+62xxxxxxxxxx';
      return;
    }
    if (id === 'mail') {
      window.location.href = 'mailto:your-email@example.com';
      return;
    }
    if (id === 'calendar' || id === 'contacts' || id === 'language') return;

    const contentMap = {
      projects: <ProjectsContent isMobile={isMobile} />,
      skills: <SkillsContent isMobile={isMobile} />,
      github: <GithubContent isMobile={isMobile} />,
      resume: <ResumeContent isMobile={isMobile} />,
      about: <AboutContent isMobile={isMobile} />,
    };

    const titleMap = {
      projects: "My Projects",
      skills: "Skills & Technologies",
      github: "Github - anankajii",
      resume: "Resume / CV",
      about: "About Me",
    };

    if (!contentMap[id]) return;

    // Mobile: open bottom sheet instead of window
    if (isMobile) {
      setMobileSheet({ id, title: titleMap[id], content: contentMap[id] });
      return;
    }

    openWindow(id, titleMap[id], contentMap[id]);
  };

  // Mobile: skip Desktop splash, MobileView has its own AppleSplash
  // Desktop: show Windows splash
  if (showSplash && !isMobile) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // Mobile: render MobileView (which has AppleSplash inside)
  if (isMobile) {
    return (
      <>
        <MobileView onIconClick={handleIconClick} />
        {mobileSheet && (
          <MobileSheet
            {...mobileSheet}
            onClose={() => setMobileSheet(null)}
          />
        )}
      </>
    );
  }

  // Desktop layout (Windows 11)
  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Windows 11 Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${wallpaper})`,
          backgroundColor: '#0f1729',
        }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-4 z-10">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            {...icon}
            onClick={() => handleIconClick(icon.id)}
          />
        ))}
      </div>


      {/* Profile Card */}
      {showProfileCard && (
        <ProfileCard onClose={() => setShowProfileCard(false)} />
      )}

      {/* Windows */}
      {openWindows.filter(w => !w.minimized).map((window) => (
        <Window
          key={window.id}
          {...window}
          isActive={activeWindow === window.id}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          onFocus={() => setActiveWindow(window.id)}
          onMove={(position) => updateWindowPosition(window.id, position)}
        />
      ))}

      {/* Windows 11 Taskbar */}
      <WindowsTaskbar 
        openWindows={openWindows}
        onIconClick={handleIconClick}
        onWindowClick={(id) => {
          setActiveWindow(id);
          setOpenWindows(openWindows.map(w => 
            w.id === id ? { ...w, minimized: false } : w
          ));
        }}
        onStartClick={() => setShowProfileCard(!showProfileCard)}
      />
    </div>
  );
}

// Content Components
function ProjectsContent({ isMobile }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      title: "FlutterConf Latam Official App",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
      gradient: "from-blue-900 to-blue-700",
      icon: "🐦",
      color: "bg-cyan-400"
    },
    {
      title: "Windows XP Portfolio",
      category: "Portfolio",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      gradient: "from-green-600 to-blue-500",
      icon: "🪟",
      color: "bg-blue-500"
    },
    {
      title: "POS UMKM",
      category: "Business",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      gradient: "from-purple-900 to-purple-700",
      icon: "🏪",
      color: "bg-purple-500"
    },
    {
      title: "Sistem TK",
      category: "Education",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
      gradient: "from-teal-600 to-teal-800",
      icon: "🎓",
      color: "bg-teal-400"
    },
    {
      title: "Kampung Adat",
      category: "Tourism",
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&h=250&fit=crop",
      gradient: "from-orange-600 to-red-700",
      icon: "🏘️",
      color: "bg-orange-500"
    },
    {
      title: "E-Commerce Platform",
      category: "Shopping",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400&h=250&fit=crop",
      gradient: "from-pink-600 to-rose-700",
      icon: "🛒",
      color: "bg-pink-500"
    }
  ];

  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center">
        {/* Microsoft Store Style Loading */}
        <div className="relative">
          {/* Shopping Bag Icon */}
          <div className="w-32 h-32 mb-8">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <rect x="20" y="30" width="60" height="50" rx="4" fill="#0078D4" opacity="0.2"/>
              <rect x="20" y="30" width="60" height="50" rx="4" fill="none" stroke="#0078D4" strokeWidth="3"/>
              <path d="M 35 30 Q 35 15, 50 15 Q 65 15, 65 30" fill="none" stroke="#0078D4" strokeWidth="3"/>
              <g transform="translate(50, 55) scale(0.3)">
                <rect x="-20" y="-20" width="18" height="18" fill="#0078D4"/>
                <rect x="2" y="-20" width="18" height="18" fill="#0078D4"/>
                <rect x="-20" y="2" width="18" height="18" fill="#0078D4"/>
                <rect x="2" y="2" width="18" height="18" fill="#0078D4"/>
              </g>
            </svg>
          </div>

          {/* Loading Spinner */}
          <div className="flex justify-center mb-4">
            <div className="relative w-12 h-12">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-3 bg-white/60 rounded-full"
                  style={{
                    left: '50%',
                    top: '0',
                    transformOrigin: '0.5px 24px',
                    transform: `rotate(${i * 45}deg)`,
                    opacity: 0.2,
                    animation: `spin-fade 1s linear infinite`,
                    animationDelay: `${i * 0.125}s`
                  }}
                />
              ))}
            </div>
          </div>

          <p className="text-white/70 text-center text-sm">Loading projects...</p>
        </div>

        <style>{`
          @keyframes spin-fade {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="p-6 animate-fadeIn">
      {/* Sidebar */}
      <div className="flex gap-6">
        <div className="w-32 flex-shrink-0 space-y-4">
          <button className="flex items-center gap-2 text-cyan-300 text-sm">
            ⭐ All Projects
          </button>
          <button className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition">
            📱 Mobile
          </button>
          <button className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition">
            🌐 Web
          </button>
        </div>

        {/* Projects Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-4">
            {projects.map((project, idx) => (
              <div 
                key={idx} 
                className="group cursor-pointer animate-slideUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {/* Project Card */}
                <div
                  className="rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
                  style={isMobile
                    ? { background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }
                    : { background: 'rgba(17,24,39,0.45)', backdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.15)' }
                  }
                >
                  {/* Project Image/Preview */}
                  <div className={`h-40 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-30">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-80">
                        {project.icon}
                      </div>
                    </div>
                    {/* Category Badge */}
                    <div
                      className="absolute top-2 right-2 px-2 py-1 rounded text-xs text-white"
                      style={{
                        background: 'rgba(0,0,0,0.35)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {project.category}
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${project.color} rounded-lg flex items-center justify-center text-xl flex-shrink-0 opacity-90`}>
                        {project.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm truncate">
                          {project.title}
                        </h3>
                        <p className="text-white/50 text-xs mt-0.5">
                          {project.category}
                        </p>
                      </div>
                    </div>
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



function AboutContent({ isMobile }) {
  const cardStyle = isMobile
    ? { background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.15)' }
    : { background: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.20)' };

  return (
    <div className="p-6 text-white">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-4xl shadow-lg flex-shrink-0">
          👨‍💻
        </div>
        <div>
          <h2 className="text-xl font-bold">M. Khanan Mukhtar</h2>
          <p className="text-cyan-400 text-sm">Fullstack Developer</p>
          <p className="text-gray-400 text-xs mt-1">📍 Indonesia</p>
        </div>
      </div>
      <div className="space-y-3 text-gray-300 text-sm leading-relaxed">
        <p>Fullstack Developer dengan passion dalam membangun sistem yang real-world dan bermanfaat.</p>
        <p>Berpengalaman dalam Java, Laravel, React, dan Vue.js untuk membangun solusi yang efisien dan scalable.</p>
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

function SkillsContent({ isMobile }) {
  const skills = [
    { name: "Java", level: 90, icon: "☕" },
    { name: "Laravel", level: 85, icon: "🔺" },
    { name: "React", level: 80, icon: "⚛️" },
    { name: "Vue.js", level: 75, icon: "💚" },
    { name: "Node.js", level: 70, icon: "🟢" },
    { name: "MySQL", level: 85, icon: "🐬" },
    { name: "PostgreSQL", level: 75, icon: "🐘" },
    { name: "MongoDB", level: 70, icon: "🍃" },
  ];

  const trackBg = isMobile ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.12)';

  return (
    <div className="p-6 space-y-4">
      {skills.map((skill, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white font-medium flex items-center gap-2">
              <span>{skill.icon}</span>
              {skill.name}
            </span>
            <span className="text-cyan-400">{skill.level}%</span>
          </div>
          <div className="w-full rounded-full h-2" style={{ background: trackBg }}>
            <div 
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${skill.level}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function GithubContent({ isMobile }) {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/anankajii'),
          fetch('https://api.github.com/users/anankajii/repos?sort=updated&per_page=6')
        ]);
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        setProfile(profileData);
        setRepos(reposData);
      } catch (e) {
        setError('Failed to load Github data');
      } finally {
        setLoading(false);
      }
    };
    fetchGithub();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center" style={{ minHeight: 200 }}>
        <div className="relative w-12 h-12 mb-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-3 bg-white/60 rounded-full"
              style={{
                left: '50%', top: '0',
                transformOrigin: '0.5px 24px',
                transform: `rotate(${i * 45}deg)`,
                animation: `spin-fade 1s linear infinite`,
                animationDelay: `${i * 0.125}s`
              }}
            />
          ))}
        </div>
        <p className="text-white/70 text-sm">Loading Github profile...</p>
        <style>{`@keyframes spin-fade { 0%,100%{opacity:.2} 50%{opacity:1} }`}</style>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="h-full flex items-center justify-center" style={{ minHeight: 200 }}>
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  const glassCard = isMobile
    ? { background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)' }
    : { background: 'rgba(17,24,39,0.5)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(40px)' };
  const glassHeader = isMobile
    ? { background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.12)' }
    : { background: 'rgba(17,24,39,0.5)', borderBottom: '1px solid rgba(255,255,255,0.15)' };
  const glassStat = isMobile
    ? { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }
    : { background: 'rgba(17,24,39,0.5)', border: '1px solid rgba(255,255,255,0.18)', backdropFilter: 'blur(20px)' };

  const langColors = {
    JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
    Java: '#b07219', PHP: '#4F5D95', HTML: '#e34c26', CSS: '#563d7c',
    Vue: '#41b883', Dart: '#00B4AB', Go: '#00ADD8', default: '#8b949e'
  };

  return (
    <div className="h-full overflow-y-auto text-white">
      {/* Header / Profile */}
      <div className="px-6 py-5" style={glassHeader}>
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <img
            src={profile.avatar_url}
            alt={profile.login}
            className="w-20 h-20 rounded-full"
            style={{ border: '2px solid rgba(255,255,255,0.25)' }}
          />
          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-white">
                {profile.name || profile.login}
              </h1>
              <span className="text-white/50 text-sm">@{profile.login}</span>
              <a
                href={`https://github.com/${profile.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto px-3 py-1 rounded-md text-sm transition flex items-center gap-1"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                View on Github
              </a>
            </div>
            {profile.bio && (
              <p className="text-white/60 text-sm mt-1">{profile.bio}</p>
            )}
            {/* Location / Company */}
            <div className="flex items-center gap-4 mt-2 flex-wrap">
              {profile.location && (
                <span className="text-white/50 text-xs flex items-center gap-1">
                  📍 {profile.location}
                </span>
              )}
              {profile.company && (
                <span className="text-white/50 text-xs flex items-center gap-1">
                  🏢 {profile.company}
                </span>
              )}
              {profile.blog && (
                <a href={profile.blog} target="_blank" rel="noopener noreferrer"
                  className="text-cyan-300 text-xs hover:underline flex items-center gap-1">
                  🔗 {profile.blog}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4 mt-4 flex-wrap">
          {[
            { label: 'Repos', value: profile.public_repos },
            { label: 'Followers', value: profile.followers },
            { label: 'Following', value: profile.following },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg px-4 py-2 text-center min-w-[80px]" style={glassStat}>
              <div className="text-cyan-400 font-bold text-lg">{stat.value}</div>
              <div className="text-white/50 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Repositories */}
      <div className="p-6">
        <h2 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
          <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white/60">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
          </svg>
          Popular Repositories
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg p-4 transition-all group"
              style={glassCard}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <svg viewBox="0 0 16 16" className="w-4 h-4 fill-white/50 flex-shrink-0">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>
                  </svg>
                  <span className="text-cyan-300 group-hover:underline text-sm font-medium truncate">
                    {repo.name}
                  </span>
                </div>
                <span
                  className="text-xs rounded-full px-2 py-0.5 text-white/50 flex-shrink-0"
                  style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  {repo.private ? 'Private' : 'Public'}
                </span>
              </div>
              {repo.description && (
                <p className="text-white/50 text-xs mb-3 line-clamp-2">{repo.description}</p>
              )}
              <div className="flex items-center gap-3 text-xs text-white/40">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: langColors[repo.language] || langColors.default }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">⭐ {repo.stargazers_count}</span>
                )}
                {repo.forks_count > 0 && (
                  <span className="flex items-center gap-1">🍴 {repo.forks_count}</span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function LinkedInContent({ isMobile }) {
  const sectionCard = isMobile
    ? { background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.12)' }
    : { background: 'rgba(17,24,39,0.4)', backdropFilter: 'blur(40px)', WebkitBackdropFilter: 'blur(40px)', border: '1px solid rgba(255,255,255,0.20)' };

  return (
    <div className="h-full overflow-y-auto text-white">
      {/* Cover Photo */}
      <div className="h-32 bg-gradient-to-r from-blue-700/80 via-blue-500/80 to-cyan-500/80 relative"
        style={{ backdropFilter: 'blur(10px)' }}>
        {/* Avatar */}
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-3xl shadow-xl"
            style={{ border: '4px solid rgba(255,255,255,0.2)' }}>
            👨‍💻
          </div>
        </div>
        {/* Open LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/m-khanan-mukhtar-0b81a8302/"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1.5"
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
          }}
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
          Open LinkedIn
        </a>
      </div>

      {/* Profile Info */}
      <div
        className="pt-12 px-6 pb-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.12)' }}
      >
        <h1 className="text-xl font-bold text-white">M. Khanan Mukhtar</h1>
        <p className="text-white/70 text-sm mt-0.5">Fullstack Developer · Java & Laravel Enthusiast</p>
        <p className="text-white/50 text-xs mt-1 flex items-center gap-1">📍 Indonesia</p>
        {/* Stats */}
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
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <a
            href="https://www.linkedin.com/in/m-khanan-mukhtar-0b81a8302/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-1.5 rounded-full text-sm font-semibold transition"
            style={{
              background: 'rgba(37,99,235,0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(96,165,250,0.4)',
            }}
          >
            Connect
          </a>
          <a
            href="https://www.linkedin.com/messaging/compose/?to=m-khanan-mukhtar-0b81a8302"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-1.5 rounded-full text-sm font-semibold transition"
            style={{
              background: 'rgba(255,255,255,0.10)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.20)',
            }}
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
          Berpengalaman dalam Java, Laravel, React, dan Vue.js. Saya suka membangun solusi yang
          efisien dan scalable untuk berbagai kebutuhan bisnis.
        </p>
      </div>

      {/* Experience */}
      <div className="mx-4 mt-3 rounded-xl p-4" style={sectionCard}>
        <h2 className="font-semibold text-white mb-3">Experience</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-blue-600/60 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
              style={{ border: '1px solid rgba(96,165,250,0.3)' }}>💼</div>
            <div>
              <h3 className="text-white text-sm font-medium">Fullstack Developer</h3>
              <p className="text-white/50 text-xs">Freelance · Full-time</p>
              <p className="text-white/40 text-xs">2022 – Present · 2+ yrs</p>
              <p className="text-white/50 text-xs mt-1">Java, Laravel, React, Vue.js, MySQL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mx-4 mt-3 rounded-xl p-4" style={sectionCard}>
        <h2 className="font-semibold text-white mb-3">Top Skills</h2>
        <div className="flex flex-wrap gap-2">
          {['Java', 'Laravel', 'React', 'Vue.js', 'Node.js', 'MySQL', 'PostgreSQL', 'REST API', 'Git', 'Docker'].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-xs text-cyan-200"
              style={{
                background: 'rgba(6,182,212,0.15)',
                border: '1px solid rgba(6,182,212,0.3)',
              }}
            >
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
            style={{ border: '1px solid rgba(74,222,128,0.3)' }}>🎓</div>
          <div>
            <h3 className="text-white text-sm font-medium">Your University Name</h3>
            <p className="text-white/50 text-xs">Computer Science / Informatics</p>
            <p className="text-white/40 text-xs">2020 – 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResumeContent({ isMobile }) {
  const [activeTab, setActiveTab] = useState('cv');

  const links = {
    cv: cvPdf,
    sertifikat: `https://drive.google.com/embeddedfolderview?id=1HaIZx1YKpCiBmuRVtkyBsF5eVs8deelv#grid`,
  };

  const tabs = [
    { id: 'cv', label: 'CV' },
    { id: 'sertifikat', label: 'Sertifikat' },
  ];

  const tabActive = {
    background: 'rgba(6,182,212,0.3)',
    border: '1px solid rgba(6,182,212,0.5)',
    color: 'white',
  };
  const tabInactive = {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.6)',
  };

  return (
    <div className="flex flex-col h-full text-white">
      {/* Tab Bar */}
      <div className="flex gap-2 px-4 pt-4 pb-3 flex-shrink-0" style={{ borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
        {tabs.map(tab => (
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

      {/* PDF Viewer */}
      <div className="flex-1 min-h-0">
        <iframe
          key={activeTab}
          src={links[activeTab]}
          title={activeTab === 'cv' ? 'CV M. Khanan Mukhtar' : 'Sertifikat'}
          className="w-full h-full"
          style={{ minHeight: isMobile ? '65vh' : '480px', border: 'none' }}
        />
      </div>

      {/* Download Button */}
      <div className="p-4 flex-shrink-0" style={{ borderTop: '1px solid rgba(255,255,255,0.10)' }}>
        <a
          href={links[activeTab]}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl transition font-medium text-white text-center"
          style={{
            background: 'rgba(6,182,212,0.25)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(6,182,212,0.45)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(6,182,212,0.4)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(6,182,212,0.25)'}
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
