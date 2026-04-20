"use client";

import { GRADE_MAP } from "@/lib/gradeSeverity";
import { ConfidenceBar } from "./ConfidenceBar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function ScoreDistribution({ scores, topGrade }: { scores: number[]; topGrade: number }) {
  const chartData = scores.map((score, index) => ({
    name: GRADE_MAP[index].shortLabel,
    grade: index,
    value: score * 100,
    fillColor: GRADE_MAP[index].tailwindColor
  }));

  const getTailwindColorHex = (colorName: string) => {
    const map: Record<string, string> = {
      green: "#22c55e",
      teal: "#14b8a6",
      yellow: "#eab308",
      orange: "#f97316",
      red: "#ef4444"
    };
    return map[colorName] || "#3b82f6";
  };

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Confidence Distribution</h3>
      
      <div className="space-y-1 mb-6">
        {scores.map((score, index) => (
          <ConfidenceBar 
            key={index}
            label={GRADE_MAP[index].shortLabel}
            value={score}
            color={GRADE_MAP[index].barColor}
            isTop={index === topGrade}
          />
        ))}
      </div>

      <div className="h-48 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
            <XAxis dataKey="grade" tickFormatter={(val) => `G${val}`} tick={{ fontSize: 12 }} />
            <YAxis tickFormatter={(val) => `${val}%`} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(val: any) => [`${Number(val).toFixed(1)}%`, 'Confidence']} />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getTailwindColorHex(entry.fillColor)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
