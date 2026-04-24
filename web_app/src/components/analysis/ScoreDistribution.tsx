"use client";

import { GRADE_MAP } from "@/lib/gradeSeverity";
import { ConfidenceBar } from "./ConfidenceBar";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export function ScoreDistribution({ scores, topGrade }: { scores: number[]; topGrade: number }) {
  const chartData = scores.map((score, index) => ({
    name: GRADE_MAP[index].shortLabel,
    grade: index,
    value: score * 100,
    hexColor: GRADE_MAP[index].hexColor
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="white-card px-3 py-2 text-sm !rounded-lg border border-gray-100/50 shadow-sm">
          <p className="text-primary font-bold">{`G${label}: ${Number(payload[0].value).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6 border-t border-gray-100 pt-6">
      <h3 className="text-lg font-bold text-primary mb-4 tracking-tight">Confidence Distribution</h3>
      
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
            <XAxis 
              dataKey="grade" 
              tickFormatter={(val) => `G${val}`} 
              tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} 
              axisLine={{ stroke: '#f3f4f6' }}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(val) => `${val}%`} 
              tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }} 
              axisLine={{ stroke: '#f3f4f6' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(42,122,122,0.03)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.hexColor} 
                  style={{ filter: index === topGrade ? 'drop-shadow(0 4px 6px ' + entry.hexColor + '40)' : 'none' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
