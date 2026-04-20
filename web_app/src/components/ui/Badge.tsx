import { GRADE_MAP } from "@/lib/gradeSeverity";

export interface BadgeProps {
  grade: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Badge({ grade, size = "md", className = "" }: BadgeProps) {
  const g = Math.min(Math.max(Math.floor(grade), 0), 4);
  const info = GRADE_MAP[g];

  const sizes = {
    sm: "px-2 py-0.5 text-xs font-semibold",
    md: "px-3 py-1 text-sm font-semibold",
    lg: "px-4 py-1.5 text-base font-bold"
  };

  return (
    <span className={`inline-flex items-center rounded-full ${info.badgeBg} ${info.badgeText} ${sizes[size]} ${className}`}>
      {info.shortLabel}
    </span>
  );
}
