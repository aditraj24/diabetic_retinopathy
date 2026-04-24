import { GradeInfo } from "@/types";
import { Info } from "lucide-react";

export function RecommendationCard({ grade }: { grade: number }) {
  // Simple mapping approach for decoupled text
  const recommendations: Record<number, { text: string; urgency: string; colorClass: string; bgClass: string; borderClass: string; iconColor: string }> = {
    0: { 
      text: "No diabetic retinopathy detected. Maintain good glycaemic control and schedule annual screening.", 
      urgency: "Routine", 
      colorClass: "text-[#0D6B6B]", 
      bgClass: "bg-[#0D6B6B]/5", 
      borderClass: "border-[#0D6B6B]/20",
      iconColor: "text-[#0D6B6B]" 
    },
    1: { 
      text: "Mild non-proliferative DR detected. Optimise blood sugar and blood pressure. Review in 12 months.", 
      urgency: "Watch", 
      colorClass: "text-yellow-700", 
      bgClass: "bg-yellow-50", 
      borderClass: "border-yellow-200",
      iconColor: "text-yellow-600" 
    },
    2: { 
      text: "Moderate non-proliferative DR detected. Ophthalmology review recommended within 6 months.", 
      urgency: "Soon", 
      colorClass: "text-orange-700", 
      bgClass: "bg-orange-50", 
      borderClass: "border-orange-200",
      iconColor: "text-orange-600" 
    },
    3: { 
      text: "Severe non-proliferative DR detected. Urgent ophthalmology referral within 1 month required.", 
      urgency: "Urgent", 
      colorClass: "text-red-700", 
      bgClass: "bg-red-50", 
      borderClass: "border-red-200",
      iconColor: "text-red-600" 
    },
    4: { 
      text: "Proliferative DR detected. Same-day urgent ophthalmology referral required. Risk of vision loss.", 
      urgency: "Emergency", 
      colorClass: "text-red-800", 
      bgClass: "bg-red-100", 
      borderClass: "border-red-300",
      iconColor: "text-red-700" 
    }
  };

  const rec = recommendations[Math.min(Math.max(grade, 0), 4)] || recommendations[0];

  return (
    <div className={`mt-8 p-5 rounded-2xl flex items-start gap-4 border ${rec.bgClass} ${rec.borderClass} shadow-sm transition-all duration-300 hover:shadow-md`}>
      <div className={`mt-0.5 ${rec.iconColor}`}>
        <Info size={22} strokeWidth={2.5} />
      </div>
      <div>
        <h4 className={`text-sm font-bold uppercase tracking-wider mb-1.5 ${rec.colorClass}`}>
          {rec.urgency} Action Recommended
        </h4>
        <p className="text-gray-800 font-medium leading-relaxed text-sm md:text-base">
          {rec.text}
        </p>
      </div>
    </div>
  );
}
