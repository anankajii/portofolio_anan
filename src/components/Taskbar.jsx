import { useState, useEffect } from "react";

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed top-0 right-0 z-50 flex items-center gap-2 p-4">
      {/* System Tray Icons */}
      <div className="flex items-center gap-1 bg-gray-900/60 backdrop-blur-xl rounded-lg px-2 py-1.5 border border-white/10">
        {/* WiFi Icon */}
        <button className="p-1.5 hover:bg-white/10 rounded transition" title="Network">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 21L15.6 16.2C14.6 15.45 13.35 15 12 15C10.65 15 9.4 15.45 8.4 16.2L12 21M12 3C7.95 3 4.21 4.34 1.2 6.6L3 9C5.5 7.12 8.62 6 12 6C15.38 6 18.5 7.12 21 9L22.8 6.6C19.79 4.34 16.05 3 12 3M12 9C9.3 9 6.81 9.89 4.8 11.4L6.6 13.8C8.1 12.67 9.97 12 12 12C14.03 12 15.9 12.67 17.4 13.8L19.2 11.4C17.19 9.89 14.7 9 12 9Z"/>
          </svg>
        </button>

        {/* Volume Icon */}
        <button className="p-1.5 hover:bg-white/10 rounded transition" title="Volume">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"/>
          </svg>
        </button>

        {/* Battery Icon */}
        <button className="p-1.5 hover:bg-white/10 rounded transition" title="Battery">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M16,18H4V6H16M16.67,4H15V2H9V4H7.33A1.33,1.33 0 0,0 6,5.33V20.67C6,21.4 6.6,22 7.33,22H16.67A1.33,1.33 0 0,0 18,20.67V5.33C18,4.6 17.4,4 16.67,4Z"/>
          </svg>
        </button>
      </div>

      {/* Clock & Date */}
      <button 
        className="bg-gray-900/60 backdrop-blur-xl rounded-lg px-3 py-1.5 shadow-lg border border-white/10 hover:bg-gray-900/80 transition"
        onClick={() => setShowNotifications(!showNotifications)}
      >
        <div className="text-right">
          <div className="text-white font-medium text-xs leading-tight">
            {formatTime(time)}
          </div>
          <div className="text-gray-400 text-xs leading-tight">
            {formatDate(time)}
          </div>
        </div>
      </button>

      {/* Notification Center Icon */}
      <button 
        className="bg-gray-900/60 backdrop-blur-xl rounded-lg p-2 border border-white/10 hover:bg-gray-900/80 transition"
        title="Notifications"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
          <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21"/>
        </svg>
      </button>
    </div>
  );
}
