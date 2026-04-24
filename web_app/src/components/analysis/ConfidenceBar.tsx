export function ConfidenceBar({ label, value, color, isTop }: { label: string; value: number; color: string; isTop: boolean }) {
  const percentage = (value * 100).toFixed(1) + "%";
  
  return (
    <div className={`flex flex-col space-y-1 mb-3 ${isTop ? "opacity-100" : "opacity-80"}`}>
      <div className="flex justify-between text-sm">
        <span className={`font-semibold ${isTop ? "text-gray-900" : "text-gray-500"}`}>{label}</span>
        <span className={`${isTop ? "font-bold text-gray-900" : "font-medium text-gray-500"}`}>{percentage}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner">
        <div 
          className={`h-2.5 rounded-full ${color} transition-all duration-700 ease-out`} 
          style={{ width: percentage }}
        ></div>
      </div>
    </div>
  );
}
