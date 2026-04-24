"use client";

import { GRADE_MAP } from "@/lib/gradeSeverity";
import { motion } from "framer-motion";

export function GradeInfoSection() {
  return (
    <div className="py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-white">Understanding DR Grades</h2>
          <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
            The platform utilizes a 5-stage classification system for Diabetic Retinopathy severity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[0, 1, 2, 3, 4].map((grade) => {
            const info = GRADE_MAP[grade];
            return (
              <motion.div 
                key={grade} 
                className="glass-card glass-card-hover p-6 relative overflow-hidden cursor-default"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: grade * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className={`absolute top-0 left-0 w-full h-0.5 ${info.barColor}`}></div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-3 h-3 rounded-full ${info.barColor}`}></span>
                  <span className="font-bold text-muted text-sm tracking-widest uppercase">Grade {grade}</span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3">{info.label}</h3>
                
                <p className="text-sm text-muted line-clamp-4">
                  {info.recommendation}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
