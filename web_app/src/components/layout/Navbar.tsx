"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, History, User, LogOut, Menu, X } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const user = session?.user;
  const initial = user?.displayName ? user.displayName.charAt(0).toUpperCase() : (user?.username ? user.username.charAt(0).toUpperCase() : "?");

  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/history", label: "History", icon: History }
  ];

  return (
    <header className="h-16 sticky top-0 z-50 w-full backdrop-blur-xl bg-navy-card/60 border-b border-white/10 flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-xl font-bold flex items-center gap-2.5 group">
          <Image 
            src="/new_logo2.png" 
            alt="DR-Vision Logo" 
            width={40} 
            height={40} 
            className="transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,117,255,0.3)]"
          />
          <span className="text-cyan/90 transition-all group-hover:text-white">
            DR-Vision
          </span> 
        </Link>
        
        <nav className="hidden md:flex items-center gap-1 mt-0.5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                  isActive 
                    ? "bg-neon-blue/10 text-neon-blue shadow-glow-sm" 
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none p-1 rounded-full hover:bg-white/5 transition-all duration-300"
          >
            <span className="text-sm font-semibold text-muted hidden sm:block pl-2">
              {user?.displayName || user?.username || "Account"}
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-neon-blue to-cyan shadow-glow-sm text-white flex items-center justify-center font-bold text-sm border border-white/20">
              {initial}
            </div>
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 glass-card py-2 z-20 origin-top-right animate-fade-in-up">
                <div className="px-4 py-3 border-b border-white/10 mb-1">
                  <p className="text-sm font-semibold text-white truncate">
                    {user?.displayName || user?.username}
                  </p>
                  <p className="text-xs text-muted truncate">
                    Clinical Administrator
                  </p>
                </div>
                
                {/* Mobile Links */}
                <div className="md:hidden border-b border-white/10 pb-1 mb-1">
                  {links.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:bg-white/5 hover:text-white font-medium transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Icon size={14} />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-muted hover:bg-white/5 hover:text-neon-blue font-medium transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User size={14} />
                  Your Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 font-medium transition-colors"
                >
                  <LogOut size={14} />
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
