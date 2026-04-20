import React from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6 hover:opacity-80 transition-opacity">
          <span className="text-blue-600 text-3xl">👁️</span>
          <span className="text-3xl font-bold text-gray-900">DR-Vision</span>
        </Link>
      </div>

      <div className="sm:mx-auto w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-gray-200/50 sm:rounded-2xl sm:px-10 border border-gray-100">
          {children}
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-900 transition-colors font-medium">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
