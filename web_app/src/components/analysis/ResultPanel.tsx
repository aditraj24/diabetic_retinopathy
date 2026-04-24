"use client";

import { AnalysisResult } from "@/types";
import { GradeBadge } from "./GradeBadge";
import { ScoreDistribution } from "./ScoreDistribution";
import { RecommendationCard } from "./RecommendationCard";
import { SaveResultButton } from "./SaveResultButton";
import { motion } from "framer-motion";

export function ResultPanel({ 
  result, 
  onSave, 
  isSaving, 
  isSaved 
}: { 
  result: AnalysisResult;
  onSave: (notes: string) => void;
  isSaving: boolean;
  isSaved: boolean;
}) {
  return (
    <motion.div 
      className="glass-card p-6 sm:p-8 max-w-xl mx-auto w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Analysis Result</h2>
        <GradeBadge grade={result.grade} size="lg" />
        <p className="mt-4 text-muted font-medium">
          Predicted with <span className="font-bold text-white">{(result.confidence * 100).toFixed(1)}%</span> confidence
        </p>
      </div>

      <ScoreDistribution scores={result.allScores} topGrade={result.grade} />
      
      <RecommendationCard grade={result.grade} />
      
      <SaveResultButton onSave={onSave} isSaving={isSaving} isSaved={isSaved} />

      <div className="mt-8 pt-4 border-t border-white/10 text-center">
        <p className="text-xs text-white/30 italic leading-relaxed">
          Disclaimer: This tool is intended for screening assistance only. It is not a substitute for examination by a qualified ophthalmologist. Always consult a medical professional for diagnosis and treatment decisions.
        </p>
      </div>
    </motion.div>
  );
}
