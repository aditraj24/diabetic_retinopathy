import { GRADE_MAP } from "@/lib/gradeSeverity";

export function RecommendationCard({ grade }: { grade: number }) {
  const g = Math.min(Math.max(Math.floor(grade), 0), 4);
  const info = GRADE_MAP[g];

  return (
    <div className={`mt-6 p-5 bg-white border-l-4 ${info.borderColor} rounded-r-lg shadow-sm border-y border-r border-gray-200`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
          Clinical Recommendation
        </h3>
        <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md ${info.badgeBg} ${info.badgeText}`}>
          {info.urgency}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed font-medium">
        {info.recommendation}
      </p>
    </div>
  );
}
