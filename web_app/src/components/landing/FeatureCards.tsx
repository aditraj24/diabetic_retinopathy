"use client";

import { motion } from "framer-motion";
import { Zap, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Instant Analysis",
    description: "Upload retinal photographs and receive DL-computed results in seconds.",
    icon: Zap,
  },
  {
    title: "5-Grade Classification",
    description: "Accurate grading from No DR to Proliferative DR with probability distribution.",
    icon: BarChart3,
  },
  {
    title: "Secure History",
    description: "All results saved securely with clinical notes and full audit trail.",
    icon: ShieldCheck,
  },
];

export function FeatureCards() {
  return (
    <div id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900">Why use DR-Vision?</h2>
          <p className="mt-2 text-base text-gray-500">
            Clinical-grade DL screening at your fingertips
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 cursor-default"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <div className="w-11 h-11 bg-gray-100 rounded-lg flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}