export function ConfidenceBar({ label, value, color, isTop }: { label: string; value: number; color: string; isTop: boolean }) {
  const percentage = (value * 100).toFixed(1) + "%";
  
  return (
    <div className={`flex flex-col space-y-1 mb-3 ${isTop ? "opacity-100" : "opacity-60"}`}>
      <div className="flex justify-between text-sm">
        <span className={`font-medium ${isTop ? "text-white" : "text-muted"}`}>{label}</span>
        <span className={`${isTop ? "font-bold text-white" : "font-medium text-muted"}`}>{percentage}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
        <div 
          className={`h-2.5 rounded-full ${color} transition-all duration-700 ease-out`} 
          style={{ 
            width: percentage,
            ...(isTop ? { filter: 'drop-shadow(0 0 6px currentColor)' } : {})
          }}
        ></div>
      </div>
    </div>
  );
}
