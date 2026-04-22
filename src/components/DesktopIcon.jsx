export default function DesktopIcon({ icon, label, badge, onClick, iconType = "svg" }) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-white/10 transition-all duration-200 w-24"
    >
      <div className="relative">
        <div className="w-16 h-16 group-hover:scale-105 transition-transform">
          {icon}
        </div>
        {badge && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 flex items-center justify-center font-bold shadow-lg">
            {badge}
          </span>
        )}
      </div>
      <span className="text-white text-sm text-center font-medium drop-shadow-lg leading-tight">
        {label}
      </span>
    </button>
  );
}
