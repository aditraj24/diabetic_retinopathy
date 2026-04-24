import { GradeInfo } from "@/types";

export interface GradeMapping extends GradeInfo {
  shortLabel: string;
  tailwindColor: string;
  badgeBg: string;
  badgeText: string;
  barColor: string;
  borderColor: string;
  glowColor: string;
  hexColor: string;
}

export const GRADE_MAP: Record<number, GradeMapping> = {
  0: {
    label: "No DR",
    shortLabel: "No DR",
    tailwindColor: "green",
    badgeBg: "bg-green-500/15",
    badgeText: "text-green-400",
    barColor: "bg-green-500",
    borderColor: "border-l-green-500",
    glowColor: "shadow-green-500/20",
    hexColor: "#22c55e",
    color: "green",
    recommendation: "No diabetic retinopathy detected. Maintain good glycaemic control and schedule annual screening.",
    urgency: "routine"
  },
  1: {
    label: "Mild NPDR",
    shortLabel: "Mild",
    tailwindColor: "teal",
    badgeBg: "bg-teal-500/15",
    badgeText: "text-teal-400",
    barColor: "bg-teal-500",
    borderColor: "border-l-teal-500",
    glowColor: "shadow-teal-500/20",
    hexColor: "#14b8a6",
    color: "teal",
    recommendation: "Mild non-proliferative DR detected. Optimise blood sugar and blood pressure. Review in 12 months.",
    urgency: "watch"
  },
  2: {
    label: "Moderate NPDR",
    shortLabel: "Moderate",
    tailwindColor: "yellow",
    badgeBg: "bg-yellow-500/15",
    badgeText: "text-yellow-400",
    barColor: "bg-yellow-500",
    borderColor: "border-l-yellow-500",
    glowColor: "shadow-yellow-500/20",
    hexColor: "#eab308",
    color: "yellow",
    recommendation: "Moderate non-proliferative DR detected. Ophthalmology review recommended within 6 months.",
    urgency: "soon"
  },
  3: {
    label: "Severe NPDR",
    shortLabel: "Severe",
    tailwindColor: "orange",
    badgeBg: "bg-orange-500/15",
    badgeText: "text-orange-400",
    barColor: "bg-orange-500",
    borderColor: "border-l-orange-500",
    glowColor: "shadow-orange-500/20",
    hexColor: "#f97316",
    color: "orange",
    recommendation: "Severe non-proliferative DR detected. Urgent ophthalmology referral within 1 month required.",
    urgency: "urgent"
  },
  4: {
    label: "Proliferative DR",
    shortLabel: "Proliferative",
    tailwindColor: "red",
    badgeBg: "bg-red-500/15",
    badgeText: "text-red-400",
    barColor: "bg-red-500",
    borderColor: "border-l-red-500",
    glowColor: "shadow-red-500/20",
    hexColor: "#ef4444",
    color: "red",
    recommendation: "Proliferative DR detected. Same-day urgent ophthalmology referral required. Risk of vision loss.",
    urgency: "emergency"
  }
};

export function getGradeInfo(grade: number): GradeInfo {
  const g = Math.min(Math.max(Math.floor(grade), 0), 4);
  return GRADE_MAP[g];
}
