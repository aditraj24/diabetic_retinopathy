"use client";

import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { GradeInfoSection } from "@/components/landing/GradeInfoSection";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-teal/10 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
        <Link href="/login" className="flex items-center gap-2.5 text-xl font-bold group">
          <Image 
            src="/new_logo2.png" 
            alt="DR-Vision Logo" 
            width={48} 
            height={48} 
            className="transition-transform duration-300 group-hover:scale-105 drop-shadow-sm"
          />
          <span className="text-teal-dark font-extrabold tracking-tight">DR-Vision</span> 
        </Link>
        <Link href="/login">
          <Button variant="primary" size="sm" className="font-bold px-6 shadow-btn">
            Sign In
          </Button>
        </Link>
      </header>

      <main className="flex-1">
        <Hero />
        
        {/* How it works */}
        <div className="py-24 px-4 relative overflow-hidden bg-white/30 border-y border-teal/5">
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none hidden md:block mix-blend-multiply">
            <Image 
              src="/retinography.png" 
              alt="" 
              width={350} 
              height={350} 
              aria-hidden="true"
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.h2 
              className="text-3xl font-extrabold text-primary mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How it works
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              {[
                { step: 1, title: "Sign in Securely", desc: "Access your clinical dashboard via secure practitioner credentials." },
                { step: 2, title: "Upload Photograph", desc: "Drop a clear retinal fundus image for processing." },
                { step: 3, title: "Receive Grading", desc: "Get an immediate severity grade with medical guidance and history tracking." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                >
                  <div className="w-16 h-16 rounded-full bg-teal text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-btn relative">
                    {item.step}
                    {idx < 2 && (
                       <div className="hidden md:block absolute top-1/2 left-[calc(100%+1rem)] w-[calc(100%+2rem)] border-t-2 border-dashed border-teal/30 -translate-y-1/2 pointer-events-none" />
                    )}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                  <p className="text-secondary font-medium text-sm max-w-xs">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <FeatureCards />
        <GradeInfoSection />
        
        <div className="border-t border-b border-amber-200 py-6 px-4 bg-amber-50">
          <div className="max-w-4xl mx-auto text-center text-amber-800 text-sm font-semibold leading-relaxed flex flex-col sm:flex-row items-center justify-center gap-3">
            <AlertTriangle size={20} className="text-amber-500 flex-shrink-0" />
            <span>
              <span className="font-bold mr-1 text-amber-700">DISCLAIMER:</span>
              This tool is intended for screening assistance only. It is not a substitute for examination by a qualified ophthalmologist. Always consult a medical professional for diagnosis and treatment decisions.
            </span>
          </div>
        </div>
      </main>

      <footer className="bg-white/50 backdrop-blur-sm border-t border-teal/10 py-10 px-6 text-center text-secondary font-medium font-sm relative overflow-hidden">
        <p className="relative z-10">DR-Vision &copy; {new Date().getFullYear()}. Built for clinical screening assistance.</p>
      </footer>
    </div>
  );
}
