export function ConfidenceBar({ label, value, color, isTop }: { label: string; value: number; color: string; isTop: boolean }) {
  const percentage = (value * 100).toFixed(1) + "%";
  
  return (
    <div className={`flex flex-col space-y-1 mb-3 ${isTop ? "opacity-100" : "opacity-70"}`}>
      <div className="flex justify-between text-sm">
        <span className={`font-medium ${isTop ? "text-gray-900" : "text-gray-600"}`}>{label}</span>
        <span className={isTop ? "font-bold" : "font-medium"}>{percentage}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div className={`h-2.5 rounded-full ${color}`} style={{ width: percentage }}></div>
      </div>
    </div>
  );
}
