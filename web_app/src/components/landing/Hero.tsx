"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-[85vh] md:min-h-[90vh] flex items-center border-b border-white/5">
      {/* Hero background image — fully responsive */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/heroImage.jpg"
          alt="Futuristic retinal scan visualization"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/70 to-navy/95" />
        {/* Neon glow overlays on top of the image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,117,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(79,209,197,0.08),transparent_50%)]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
            <span className="text-cyan/90">AI-Powered</span>{" "}
            Diabetic Retinopathy Screening
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/70 mb-10 drop-shadow-md">
            Upload a retinal fundus image and receive instant DL-driven grading with clinical recommendations. Built for screening assistance in clinical and research settings.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg rounded-xl shadow-glow gap-2">
              Get Started
              <ArrowRight size={18} />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg rounded-xl backdrop-blur-sm">
              Learn More
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
