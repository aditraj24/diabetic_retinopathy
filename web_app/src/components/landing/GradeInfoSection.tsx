"use client";

import { GRADE_MAP } from "@/lib/gradeSeverity";
import { motion } from "framer-motion";

export function GradeInfoSection() {
  return (
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900">Understanding DR Grades</h2>
          <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
            The platform utilizes a 5-stage classification system for Diabetic Retinopathy severity.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {[0, 1, 2, 3, 4].map((grade) => {
            const info = GRADE_MAP[grade];
            return (
              <motion.div
                key={grade}
                className="bg-white border border-gray-200 rounded-md p-5 hover:border-gray-300 transition-colors duration-200 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: grade * 0.05 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: info.hexColor }}
                  />
                  <span className="font-mono text-xs text-gray-400">
                    Grade {grade}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {info.label}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
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