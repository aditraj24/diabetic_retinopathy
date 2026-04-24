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
    { value: "all", label: "All Grades" },
    ...Object.entries(GRADE_MAP).map(([gradeNum, info]) => ({
      value: gradeNum,
      label: info.shortLabel,
      hexColor: info.hexColor
    }))
  ];

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((opt) => {
          const isActive = currentGrade === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onGradeChange(opt.value)}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? "bg-[#0D6B6B]/10 text-[#0D6B6B] shadow-sm border border-[#0D6B6B]/20"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {opt.hexColor && (
                <span 
                  className={`inline-block w-2.5 h-2.5 rounded-full ${isActive ? 'scale-110 shadow-sm' : ''}`} 
                  style={{ backgroundColor: opt.hexColor }}
                />
              )}
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="relative w-full md:w-72">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search clinical notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0D6B6B]/20 focus:border-[#0D6B6B]/50 transition-all text-sm shadow-sm"
        />
      </div>
    </div>
  );
}
