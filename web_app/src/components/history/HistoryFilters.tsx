"use client";

import { GRADE_MAP } from "@/lib/gradeSeverity";
import { Search } from "lucide-react";

interface HistoryFiltersProps {
  currentGrade: string;
  onGradeChange: (grade: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HistoryFilters({ currentGrade, onGradeChange, searchQuery, onSearchChange }: HistoryFiltersProps) {
  const filterOptions: { value: string; label: string; hexColor?: string }[] = [
    { value: "all", label: "All" },
    ...Object.entries(GRADE_MAP).map(([gradeNum, info]) => ({
      value: gradeNum,
      label: info.shortLabel,
      hexColor: info.hexColor
    }))
  ];

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onGradeChange(opt.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300 border ${
              currentGrade === opt.value
                ? "bg-neon-blue/20 text-neon-blue border-neon-blue/30 shadow-glow-sm"
                : "bg-white/5 text-muted border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {opt.hexColor && currentGrade !== opt.value && (
              <span 
                className="inline-block w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: opt.hexColor }}
              />
            )}
            {opt.label}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-muted" />
        </div>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-neon-blue focus:border-transparent transition-all text-sm"
        />
      </div>
    </div>
  );
}
