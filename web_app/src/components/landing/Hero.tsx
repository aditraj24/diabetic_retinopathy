"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center bg-[#052c2c]">
      {/* Hero background image — fully responsive */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/heroImage.jpg"
          alt="Diabetic Retinopathy Screening Visualization"
          fill
          priority
          className="object-cover object-center w-full h-full"
          sizes="100vw"
          quality={90}
        />
        {/* Dark teal gradient overlay for readability (#052c2c80) */}
        <div className="absolute inset-0 bg-[#052c2c]/75 bg-gradient-to-r from-[#052c2c]/90 via-[#052c2c]/70 to-[#052c2c]/40" />
      </div>
      
      {/* Left-aligned content with approx 10% padding aligned vertically center */}
      <div className="relative z-10 w-full pl-[5%] sm:pl-[10%] pr-[5%] py-20 md:py-32 flex">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Diabetic Retinopathy Screening
            </h1>
            
            <p className="mt-4 text-lg md:text-xl text-white/90 font-light mb-10 max-w-xl leading-relaxed">
              Upload a retinal fundus image and receive instant DL-driven grading with clinical recommendations. Built for screening assistance in clinical and research settings.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full bg-[#0D6B6B] text-white hover:bg-[#0a5252] transition-colors flex items-center justify-center gap-2 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0D6B6B] focus:ring-offset-2 focus:ring-offset-[#052c2c]">
                Get Started
                <ArrowRight size={18} />
              </button>
            </Link>
            <a href="#features" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 text-lg font-semibold rounded-full bg-white text-[#0D6B6B] hover:bg-gray-100 transition-colors flex items-center justify-center shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#052c2c]">
                Learn More
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
