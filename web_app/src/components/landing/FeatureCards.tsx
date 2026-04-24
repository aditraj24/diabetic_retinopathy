"use client";

import { motion } from "framer-motion";
import { Zap, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Instant Analysis",
    description: "Upload retinal photographs and receive DL-computed results in seconds.",
    icon: Zap,
    color: "text-teal",
    bg: "bg-teal/10"
  },
  {
    title: "5-Grade Classification",
    description: "Accurate grading from No DR to Proliferative DR with probability distribution.",
    icon: BarChart3,
    color: "text-coral",
    bg: "bg-coral/10"
  },
  {
    title: "Secure History",
    description: "All results saved securely with clinical notes and full audit trail.",
    icon: ShieldCheck,
    color: "text-teal-dark",
    bg: "bg-teal-dark/10"
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } })
};

export function FeatureCards() {
  return (
    <div id="features" className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-primary">Why use DR-Vision?</h2>
          <p className="mt-3 text-secondary text-lg font-medium">Clinical-grade DL screening at your fingertips</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                className="white-card white-card-hover p-8 cursor-default"
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-secondary leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
