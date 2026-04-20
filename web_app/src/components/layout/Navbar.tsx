"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user;
  const initial = user?.displayName ? user.displayName.charAt(0).toUpperCase() : (user?.username ? user.username.charAt(0).toUpperCase() : "?");

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/dashboard/history", label: "History" }
  ];

  return (
    <header className="h-16 sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-8">
        <p className="text-xl font-bold flex items-center gap-2 text-gray-900 group">
          <span className="text-blue-600 transition-transform group-hover:scale-110">👁️</span> 
          DR-Vision
        </p>
        
        <nav className="hidden md:flex items-center gap-2 mt-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100" 
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile Navigation Dropdown could go here, omitting for simplicity as user dropdown covers it */}
        
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-700 hidden sm:block pl-2">
              {user?.displayName || user?.username || "Account"}
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-sm text-white flex items-center justify-center font-bold border border-white/20">
              {initial}
            </div>
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-200 shadow-xl py-2 z-20 origin-top-right animate-in fade-in zoom-in-95 duration-100">
                <div className="px-4 py-3 border-b border-gray-100 mb-1">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.displayName || user?.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Clinical Administrator
                  </p>
                </div>
                
                {/* Mobile Links */}
                <div className="md:hidden border-b border-gray-100 pb-1 mb-1">
                  {links.map(link => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 font-medium"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 font-medium transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  Your Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
