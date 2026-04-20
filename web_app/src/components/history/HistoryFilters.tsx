"use client";

import { GRADE_MAP } from "@/lib/gradeSeverity";

interface HistoryFiltersProps {
  currentGrade: string;
  onGradeChange: (grade: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HistoryFilters({ currentGrade, onGradeChange, searchQuery, onSearchChange }: HistoryFiltersProps) {
  const filterOptions: { value: string; label: string; color?: string }[] = [
    { value: "all", label: "All" },
    ...Object.entries(GRADE_MAP).map(([gradeNum, info]) => ({
      value: gradeNum,
      label: info.shortLabel,
      color: info.tailwindColor
    }))
  ];

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onGradeChange(opt.value)}
            className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors border ${
              currentGrade === opt.value
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
            }`}
          >
            {opt.color && currentGrade !== opt.value && (
              <span 
                className="inline-block w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: opt.color === 'green' ? '#22c55e' : opt.color === 'teal' ? '#14b8a6' : opt.color === 'yellow' ? '#eab308' : opt.color === 'orange' ? '#f97316' : '#ef4444' }}
              />
            )}
            {opt.label}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-64">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
