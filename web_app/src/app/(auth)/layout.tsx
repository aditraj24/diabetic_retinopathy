import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Caduceus watermark — subtle medical symbol in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/snakeHealth.png"
          alt=""
          width={500}
          height={500}
          className="invert"
          aria-hidden="true"
        />
      </div>

      <div className="sm:mx-auto w-full sm:max-w-md relative z-10">
        <Link href="/" className="flex flex-col items-center gap-2.0 mb-6 hover:opacity-90 transition-opacity">
          <Image 
            src="/new_logo2.png" 
            alt="DR-Vision Logo" 
            width={72} 
            height={72} 
            className="drop-shadow-[0_0_12px_rgba(0,117,255,0.25)]"
          />
          <span className="text-3xl font-bold text-cyan/90">DR-Vision</span>
        </Link>
      </div>

      <div className="sm:mx-auto w-full sm:max-w-md relative z-10">
        <div className="glass-card py-8 px-4 sm:px-10">
          {children}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-muted relative z-10">
        <Link href="/" className="hover:text-white transition-colors font-medium inline-flex items-center gap-1.5">
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
