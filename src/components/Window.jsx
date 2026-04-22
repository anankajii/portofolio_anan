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
      className={`absolute rounded-2xl overflow-hidden transition-shadow ${
        isActive ? 'z-40' : 'z-30'
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        maxWidth: '95vw',
        maxHeight: '85vh',
        background: 'rgba(17, 24, 39, 0.45)',
        backdropFilter: 'blur(64px) saturate(180%)',
        WebkitBackdropFilter: 'blur(64px) saturate(180%)',
        border: isActive
          ? '1px solid rgba(255, 255, 255, 0.22)'
          : '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: isActive
          ? '0 32px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.18)'
          : '0 16px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between px-4 py-2 cursor-move select-none"
        style={{
          background: isActive
            ? 'rgba(255,255,255,0.08)'
            : 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="text-white font-normal text-sm drop-shadow">{title}</span>
        </div>

        {/* Windows 11 Style Controls */}
        <div className="window-controls flex items-center">
          {/* Minimize */}
          <button
            onClick={onMinimize}
            className="w-11 h-8 flex items-center justify-center transition-colors rounded"
            style={{ background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            title="Minimize"
          >
            <svg width="10" height="1" viewBox="0 0 10 1" fill="white">
              <rect width="10" height="1"/>
            </svg>
          </button>

          {/* Maximize */}
          <button
            className="w-11 h-8 flex items-center justify-center transition-colors rounded"
            style={{ background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            title="Maximize"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1">
              <rect x="0.5" y="0.5" width="9" height="9"/>
            </svg>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-11 h-8 flex items-center justify-center transition-colors rounded"
            style={{ background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(220,38,38,0.75)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            title="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="white" strokeWidth="1">
              <path d="M 0 0 L 10 10 M 10 0 L 0 10"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="h-[calc(100%-40px)] overflow-y-auto"
        style={{ background: 'transparent' }}
      >
        {content}
      </div>
    </div>
  );
}
