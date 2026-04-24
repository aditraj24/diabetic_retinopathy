import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-transparent">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none select-none mix-blend-color-burn">
        <Image src="/snakeHealth.png" alt="" width={500} height={500} aria-hidden="true" />
      </div>

      <div className="sm:mx-auto w-full sm:max-w-md relative z-10 flex flex-col items-center">
        <Link href="/" className="flex items-center gap-3 mb-8 hover:opacity-90 transition-opacity">
          <Image src="/new_logo2.png" alt="DR-Vision Logo" width={56} height={56} className="drop-shadow-sm" />
          <span className="text-3xl font-extrabold text-teal-dark tracking-tight">DR-Vision</span>
        </Link>
      </div>

      <div className="sm:mx-auto w-full sm:max-w-md relative z-10">
        <div className="backdrop-md bg-white/20 border border-white/40 shadow-lg rounded-[20px] py-8 px-4 sm:px-10">
          {children}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-secondary relative z-10">
        <Link href="/" className="hover:text-teal transition-colors font-medium inline-flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-teal rounded-md">
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
