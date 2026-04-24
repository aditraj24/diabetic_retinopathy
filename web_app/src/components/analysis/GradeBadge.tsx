import { Badge } from "@/components/ui/Badge";
import { GRADE_MAP } from "@/lib/gradeSeverity";

export function GradeBadge({ grade, size = "lg" }: { grade: number; size?: "sm" | "lg" }) {
  const info = GRADE_MAP[Math.min(Math.max(Math.floor(grade), 0), 4)];

  if (size === "sm") {
    return <Badge grade={grade} size="sm" />;
  }

  return (
    <div className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${info.badgeBg} ${info.badgeText} border-white/10`}
      style={{ boxShadow: `0 0 30px ${info.hexColor}20` }}
    >
      <span className="text-5xl font-black mb-2">Grade {grade}</span>
      <span className="text-xl font-bold">{info.label}</span>
    </div>
  );
}
