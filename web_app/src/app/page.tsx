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
    <div className="min-h-screen flex flex-col">
      <header className="h-16 backdrop-blur-xl bg-navy-card/60 border-b border-white/10 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link href="/login" className="flex items-center gap-2.5 text-xl font-bold group">
          <Image 
            src="/new_logo2.png" 
            alt="DR-Vision Logo" 
            width={70} 
            height={70} 
            className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,117,255,0.3)]"
          />
          <span className="text-cyan/90">DR-Vision</span> 
        </Link>
        <Link href="/login">
          <Button variant="primary" size="sm" className="font-semibold px-6">
            Sign In
          </Button>
        </Link>
      </header>

      <main className="flex-1">
        <Hero />
        
        {/* How it works — with retinography visual */}
        <div className="py-20 px-4 relative overflow-hidden">
          {/* Decorative retinography on the left */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none select-none hidden md:block">
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
              className="text-3xl font-extrabold text-white mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How it works
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neon-blue to-cyan text-white flex items-center justify-center text-2xl font-bold mb-4 z-10 shadow-glow">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                  <p className="text-muted mt-2 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <FeatureCards />
        <GradeInfoSection />
        
        <div className="border-t border-b border-amber-500/20 py-6 px-4 bg-amber-500/5">
          <div className="max-w-4xl mx-auto text-center text-amber-300/80 text-sm font-medium leading-relaxed flex items-center justify-center gap-2 flex-wrap">
            <AlertTriangle size={16} className="text-amber-400 flex-shrink-0" />
            <span>
              <span className="font-bold mr-1 text-amber-300">DISCLAIMER:</span>
              This tool is intended for screening assistance only. It is not a substitute for examination by a qualified ophthalmologist. Always consult a medical professional for diagnosis and treatment decisions.
            </span>
          </div>
        </div>
      </main>

      {/* Footer with caduceus watermark */}
      <footer className="bg-navy-card/40 border-t border-white/5 py-10 px-6 text-center text-muted">
        <p>DR-Vision &copy; {new Date().getFullYear()}. Built for clinical screening assistance.</p>
      </footer>
    </div>
  );
}
