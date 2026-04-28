import { useState, useEffect } from "react";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import WindowsTaskbar from "./WindowsTaskbar";
import SplashScreen from "./SplashScreen";
import ProfileCard from "./ProfileCard";
import MobileView from "./MobileView";
import MobileSheet from "./MobileSheet";
import wallpaper from "../assets/windows11-wallpaper.jpg";

// Content components
import ProjectsContent from "./content/ProjectsContent";
import AboutContent    from "./content/AboutContent";
import SkillsContent   from "./content/SkillsContent";
import GithubContent   from "./content/GithubContent";
import ResumeContent   from "./content/ResumeContent";
import CameraContent   from "./content/CameraContent";

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

function CameraIcon() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] rounded-2xl shadow-lg flex items-center justify-center"
      style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="3" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.2"/>
        <circle cx="12" cy="13" r="4" fill="none" stroke="white" strokeWidth="1.4"/>
        <circle cx="12" cy="13" r="2" fill="white" opacity="0.9"/>
        <rect x="7" y="4" width="4" height="2.5" rx="1" fill="white" opacity="0.8"/>
        <circle cx="18.5" cy="9" r="1" fill="white" opacity="0.7"/>
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
    {
      id: "camera",
      label: "Camera",
      icon: <CameraIcon />,
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
      camera: <CameraContent isMobile={isMobile} />,
    };

    const titleMap = {
      projects: "My Projects",
      skills: "Skills & Technologies",
      github: "Github - anankajii",
      resume: "Resume / CV",
      about: "About Me",
      camera: "Camera",
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
