import { useState, useRef, useEffect } from "react";

export default function Window({ 
  id, 
  title, 
  content, 
  position, 
  size, 
  isActive, 
  onClose, 
  onMinimize, 
  onFocus,
  onMove 
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
    onFocus();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - size.width));
        const newY = Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - size.height));
        onMove({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, onMove, size]);

  return (
    <div
      ref={windowRef}
      className={`absolute bg-gray-900/95 backdrop-blur-xl rounded-lg shadow-2xl overflow-hidden transition-all border ${
        isActive ? 'z-40 border-blue-500/50' : 'z-30 border-gray-700/50'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        maxWidth: '90vw',
        maxHeight: '80vh'
      }}
      onClick={onFocus}
    >
      {/* Windows 11 Style Title Bar */}
      <div
        className={`flex items-center justify-between px-4 py-2 cursor-move select-none ${
          isActive ? 'bg-gray-800/90' : 'bg-gray-800/70'
        }`}
        onMouseDown={handleMouseDown}
      >
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-white font-normal text-sm">{title}</span>
        </div>

        {/* Windows 11 Style Controls */}
        <div className="window-controls flex items-center">
          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Minimize"
          >
            <svg width="10" height="1" viewBox="0 0 10 1" fill="white">
              <rect width="10" height="1"/>
            </svg>
          </button>

          {/* Maximize (disabled for now) */}
          <button
            className="w-11 h-8 flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Maximize"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1">
              <rect x="0.5" y="0.5" width="9" height="9"/>
            </svg>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-11 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
            title="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1">
              <path d="M 0 0 L 10 10 M 10 0 L 0 10"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)] overflow-y-auto bg-gray-900/50">
        {content}
      </div>
    </div>
  );
}
