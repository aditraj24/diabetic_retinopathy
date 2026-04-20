import { Hero } from "@/components/landing/Hero";
import { FeatureCards } from "@/components/landing/FeatureCards";
import { GradeInfoSection } from "@/components/landing/GradeInfoSection";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
          <span className="text-blue-600">👁️</span> DR-Vision
        </div>
        <Link href="/login">
          <Button variant="primary" size="sm" className="font-semibold px-6">
            Sign In
          </Button>
        </Link>
      </header>

      <main className="flex-1">
        <Hero />
        
        <div className="bg-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-12">How it works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 z-10 shadow-lg">1</div>
                <h4 className="text-lg font-bold text-gray-900">Sign in Securely</h4>
                <p className="text-gray-500 mt-2 text-sm">Access your clinical dashboard via secure practitioner credentials.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 z-10 shadow-lg">2</div>
                <h4 className="text-lg font-bold text-gray-900">Upload Photograph</h4>
                <p className="text-gray-500 mt-2 text-sm">Drop a clear retinal fundus image for processing.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold mb-4 z-10 shadow-lg">3</div>
                <h4 className="text-lg font-bold text-gray-900">Receive Grading</h4>
                <p className="text-gray-500 mt-2 text-sm">Get an immediate severity grade with medical guidance and history tracking.</p>
              </div>
            </div>
          </div>
        </div>

        <FeatureCards />
        <GradeInfoSection />
        
        <div className="bg-yellow-50 border-t border-b border-yellow-200 py-6 px-4">
          <div className="max-w-4xl mx-auto text-center text-yellow-800 text-sm font-medium leading-relaxed">
            <span className="font-bold mr-2 text-yellow-900">DISCLAIMER:</span>
            This tool is intended for screening assistance only. It is not a substitute for examination by a qualified ophthalmologist. Always consult a medical professional for diagnosis and treatment decisions.
          </div>
        </div>
      </main>

      <footer className="bg-gray-900 py-10 px-6 text-center text-gray-400">
        <p>DR-Vision &copy; {new Date().getFullYear()}. Built for clinical screening assistance.</p>
      </footer>
    </div>
  );
}
