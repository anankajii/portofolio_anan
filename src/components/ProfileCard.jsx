import { useState } from "react";

export default function ProfileCard({ onClose }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose && onClose(), 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop with Glassmorphism */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-md"
        onClick={handleClose}
      />

      {/* Card with Glassmorphism */}
      <div className="relative bg-gray-900/40 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 w-full max-w-2xl overflow-hidden animate-slideUp">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition z-10 backdrop-blur-xl"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
          </svg>
        </button>

        {/* Quick Links */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-center gap-6">
            {/* Projects */}
            <div className="group flex flex-col items-center gap-2 cursor-pointer">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="white">
                    <path d="M10,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V8C22,6.89 21.1,6 20,6H12L10,4Z"/>
                  </svg>
                </div>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 flex items-center justify-center font-bold shadow-lg">
                  10+
                </span>
              </div>
              <span className="text-white text-sm font-medium">Projects</span>
            </div>

            {/* Github */}
            <div className="group flex flex-col items-center gap-2 cursor-pointer">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </div>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 flex items-center justify-center font-bold shadow-lg">
                  20+
                </span>
              </div>
              <span className="text-white text-sm font-medium">Github</span>
            </div>

            {/* LinkedIn */}
            <div className="group flex flex-col items-center gap-2 cursor-pointer">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 flex items-center justify-center font-bold shadow-lg">
                  5K+
                </span>
              </div>
              <span className="text-white text-sm font-medium">LinkedIn</span>
            </div>

            {/* Resume */}
            <div className="group flex flex-col items-center gap-2 cursor-pointer">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-white">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6m4 18H6V4h7v5h5v11m-4.5-7.5c0 1.38-1.12 2.5-2.5 2.5H9v2H7.5V9H11c1.38 0 2.5 1.12 2.5 2.5v1m-1.5 0v-1c0-.55-.45-1-1-1H9v3h2c.55 0 1-.45 1-1z"/>
                  </svg>
                </div>
              </div>
              <span className="text-white text-sm font-medium">Resume</span>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="px-6 pb-6 space-y-3">
          {/* Phone */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-gray-300 text-sm font-medium">Phone</span>
            <span className="text-white text-sm">+593 99 598 0073</span>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-gray-300 text-sm font-medium">Email</span>
            <span className="text-white text-sm">danicoy@gmail.com</span>
          </div>

          {/* Website */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-gray-300 text-sm font-medium">Website</span>
            <a href="https://dctech.dev" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-sm hover:underline">
              https://dctech.dev
            </a>
          </div>

          {/* Experience */}
          <div className="flex items-center justify-between py-2 border-b border-white/10">
            <span className="text-gray-300 text-sm font-medium">Experience</span>
            <span className="text-white text-sm">7+ years</span>
          </div>

          {/* Skills */}
          <div className="flex items-start justify-between py-2">
            <span className="text-gray-300 text-sm font-medium">Skills</span>
            <div className="text-right text-white text-sm max-w-md">
              <p>Flutter, Dart</p>
              <p>UI/UX</p>
              <p>JavaScript, TypeScript</p>
              <p>NodeJS, Express, Ionic</p>
              <p>MongoDB, Firebase, Parse Server</p>
              <p>HTML, CSS, CI/CD, REST, Git</p>
            </div>
          </div>
        </div>

        {/* Footer with Glassmorphism */}
        <div className="bg-white/5 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-t border-white/10">
          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-2xl shadow-lg">
              👨‍💻
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Daniel Coyula</h3>
              <p className="text-gray-300 text-xs">Senior Flutter Engineer</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition backdrop-blur-xl" title="Call">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M6.62,10.79C8.06,13.62 10.38,15.94 13.21,17.38L15.41,15.18C15.69,14.9 16.08,14.82 16.43,14.93C17.55,15.3 18.75,15.5 20,15.5A1,1 0 0,1 21,16.5V20A1,1 0 0,1 20,21A17,17 0 0,1 3,4A1,1 0 0,1 4,3H7.5A1,1 0 0,1 8.5,4C8.5,5.25 8.7,6.45 9.07,7.57C9.18,7.92 9.1,8.31 8.82,8.59L6.62,10.79Z"/>
              </svg>
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition backdrop-blur-xl" title="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"/>
              </svg>
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition backdrop-blur-xl" title="Website">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/>
              </svg>
            </button>
            <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition backdrop-blur-xl" title="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
