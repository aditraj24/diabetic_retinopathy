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
    <div className="min-h-screen flex flex-col bg-white">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link href="/login" className="flex items-center gap-2.5 group">
          <Image
            src="/new_logo2.png"
            alt="DR-Vision Logo"
            width={40}
            height={40}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-xl font-semibold text-gray-900 tracking-tight">DR-Vision</span>
        </Link>
        <Link href="/login">
          <Button variant="primary" size="sm" className="font-medium px-5 shadow-sm">
            Sign In
          </Button>
        </Link>
      </header>

      <main className="flex-1">
        <Hero />

        {/* How it works */}
        <div className="py-16 px-4 bg-white border-t border-gray-100">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h2
              className="text-2xl font-semibold text-gray-900 mb-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              How it works
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { step: 1, title: "Sign in Securely", desc: "Access your clinical dashboard via secure practitioner credentials." },
                { step: 2, title: "Upload Photograph", desc: "Drop a clear retinal fundus image for processing." },
                { step: 3, title: "Receive Grading", desc: "Get an immediate severity grade with medical guidance and history tracking." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center text-base font-medium mx-auto mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-base font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <FeatureCards />
        <GradeInfoSection />

        {/* Disclaimer */}
        <div className="border-t border-gray-200 py-5 px-4 bg-gray-50">
          <div className="max-w-3xl mx-auto flex items-start sm:items-center gap-3 text-left sm:text-center">
            <AlertTriangle size={16} className="text-gray-400 flex-shrink-0 mt-0.5 sm:mt-0" />
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="font-semibold text-gray-600 mr-1">Disclaimer:</span>
              This tool is intended for screening assistance only. It is not a substitute for examination by a qualified ophthalmologist. Always consult a medical professional for diagnosis and treatment decisions.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 px-6 text-center">
        <p className="text-xs text-gray-400">
          DR-Vision © {new Date().getFullYear()}. Built for clinical screening assistance.
        </p>
      </footer>
    </div>
  );
}