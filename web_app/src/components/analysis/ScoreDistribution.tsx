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
        <div className="glass-card px-3 py-2 text-sm !rounded-lg">
          <p className="text-white font-semibold">{`G${label}: ${Number(payload[0].value).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6 border-t border-white/10 pt-6">
      <h3 className="text-lg font-semibold text-white mb-4">Confidence Distribution</h3>
      
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
              tick={{ fontSize: 12, fill: '#A0AEC0' }} 
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(val) => `${val}%`} 
              tick={{ fontSize: 12, fill: '#A0AEC0' }} 
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.hexColor} 
                  style={{ filter: index === topGrade ? 'drop-shadow(0 0 8px ' + entry.hexColor + ')' : 'none' }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
