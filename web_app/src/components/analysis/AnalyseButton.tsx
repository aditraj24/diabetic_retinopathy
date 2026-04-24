"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Scan } from "lucide-react";

interface AnalyseButtonProps {
  onClick: () => void;
  isAnalysing: boolean;
  disabled: boolean;
}

export function AnalyseButton({ onClick, isAnalysing, disabled }: AnalyseButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Button
        onClick={onClick}
        isLoading={isAnalysing}
        disabled={disabled}
        size="lg"
        className={`w-full h-14 text-lg font-semibold gap-2 ${isAnalysing ? 'animate-glow-pulse' : ''}`}
      >
        {!isAnalysing && <Scan size={20} />}
        {isAnalysing ? "Analysing Image..." : "Analyse Image"}
      </Button>
    </motion.div>
  );
}
