import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-slate-50 pt-16 pb-32 border-b border-gray-200">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">AI-Powered</span> Diabetic Retinopathy Screening
        </h1>
        
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
          Upload a retinal fundus image and receive instant AI-driven grading with clinical recommendations. Built for screening assistance in clinical and research settings.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg rounded-xl shadow-md">
              Get Started
            </Button>
          </Link>
          <a href="#features">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg rounded-xl">
              Learn More
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
