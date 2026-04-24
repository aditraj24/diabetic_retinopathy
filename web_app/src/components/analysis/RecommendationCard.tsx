import { GRADE_MAP } from "@/lib/gradeSeverity";
import { Stethoscope } from "lucide-react";

export function RecommendationCard({ grade }: { grade: number }) {
  const g = Math.min(Math.max(Math.floor(grade), 0), 4);
  const info = GRADE_MAP[g];

  return (
    <div 
      className={`mt-6 p-5 rounded-xl border-l-4 ${info.borderColor} bg-white/[0.03] border border-white/10`}
      style={{ borderLeftWidth: '4px' }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-white text-lg flex items-center gap-2">
          <Stethoscope size={18} className="text-muted" />
          Clinical Recommendation
        </h3>
        <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg ${info.badgeBg} ${info.badgeText}`}>
          {info.urgency}
        </span>
      </div>
      <p className="text-muted leading-relaxed font-medium">
        {info.recommendation}
      </p>
    </div>
  );
}
