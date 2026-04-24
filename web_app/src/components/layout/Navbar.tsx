"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, History, User, LogOut } from "lucide-react";

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
    <header className="h-16 sticky top-0 z-50 w-full bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <Image
            src="/new_logo2.png"
            alt="DR-Vision Logo"
            width={50}
            height={50}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <span className="text-lg font-semibold text-gray-900 tracking-tight">
            DR-Vision
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
              >
                <Icon size={15} />
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
            className="flex items-center gap-2 focus:outline-none p-1 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {user?.displayName || user?.username || "Account"}
            </span>
            <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-medium">
              {initial}
            </div>
          </button>

          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-20">
                <div className="px-4 py-2.5 border-b border-gray-100 mb-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user?.displayName || user?.username}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    Clinical Administrator
                  </p>
                </div>

                <div className="md:hidden border-b border-gray-100 pb-1 mb-1">
                  {links.map(link => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <User size={14} />
                  Your Profile
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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