"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center bg-gray-900">
      {/* Hero background image */}
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
        {/* Solid dark overlay for readability */}
        <div className="absolute inset-0 bg-gray-900/70" />
      </div>
      
      {/* Left-aligned content */}
      <div className="relative z-10 w-full pl-[5%] sm:pl-[10%] pr-[5%] py-20 md:py-32 flex">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-5 leading-tight">
              Diabetic Retinopathy Screening
            </h1>
            
            <p className="mt-3 text-base md:text-lg text-gray-200 font-normal mb-8 leading-relaxed">
              Upload a retinal fundus image and receive instant DL-driven grading with clinical recommendations. Built for screening assistance in clinical and research settings.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/login" className="w-full sm:w-auto">
              <Button 
                variant="primary" 
                size="lg"
                className="w-full sm:w-auto px-6 py-3 text-base font-medium rounded-md shadow-sm"
              >
                Get Started
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <a href="#features" className="w-full sm:w-auto">
              <Button 
                variant="secondary" 
                size="lg"
                className="w-full sm:w-auto px-6 py-3 text-base font-medium bg-white text-gray-900 border-gray-200 hover:bg-gray-50 rounded-md shadow-sm"
              >
                Learn More
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}