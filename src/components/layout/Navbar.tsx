"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Mic,
  Building2,
  User,
  Menu,
  X,
  Store,
  Home,
  Info,
  ChevronRight
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      name: "Home",
      href: "/",
      isActive: pathname === "/",
      icon: Home,
    },
    {
      name: "Shop",
      kannada: "ಮಳಿಗೆ",
      href: "/marketplace",
      isActive: pathname.startsWith("/marketplace"),
      icon: Store,
    },
    {
      name: "About Us",
      href: "/marketplace#about",
      isActive: false,
      icon: Info,
    },
    {
      name: "Business Solutions",
      kannada: "ಬಿ2ಬಿ",
      href: "/b2b",
      isActive: pathname.startsWith("/b2b"),
      icon: Building2,
    },
    {
      name: "Voice Portal",
      kannada: "ಧ್ವನಿ ನೊಂದಣಿ",
      href: "/artisan/onboard",
      isActive: pathname.startsWith("/artisan"),
      icon: Mic,
    },
  ];

  return (
    <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* ── 1. PROMINENT BIG LOGO (Sleek nav, big crisp logo) ── */}
          <Link
            href="/"
            className="flex items-center gap-3 group transition-transform duration-300 ease-out"
          >
            {/* Big Logo Image with subtle smooth hover micro-zoom */}
            <img
              src="/logo.png"
              alt="KalaSamanvaya - Local Crafts • Global Hands"
              className="h-16 sm:h-18 md:h-20 w-auto object-contain transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:-translate-y-0.5 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
            />
            <span className="hidden xl:inline-block text-xs font-bold text-[#C85A32] bg-amber-50/90 px-2.5 py-1 rounded-full border border-amber-200 transition-all duration-200 group-hover:border-[#C85A32]/40 group-hover:bg-amber-100/80">
              ಕಲಾ ಸಮನ್ವಯ
            </span>
          </Link>

          {/* ── 2. DESKTOP DYNAMIC NAVIGATION (Tactile soft dev hover animations) ── */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`group relative px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ease-out flex items-center gap-1.5 ${
                    link.isActive
                      ? "text-[#C85A32] font-bold bg-amber-50/90 shadow-sm"
                      : "text-stone-700 hover:text-[#C85A32] hover:bg-stone-50/80 hover:-translate-y-0.5 active:translate-y-0"
                  }`}
                >
                  {/* Icon with subtle upward micro-nudge on hover */}
                  <Icon
                    className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                      link.isActive
                        ? "text-[#C85A32]"
                        : "text-stone-400 group-hover:text-[#C85A32] group-hover:-translate-y-0.5"
                    }`}
                  />
                  <span>{link.name}</span>

                  {/* Smooth expanding underline on hover (standard dev craftsmanship, no AI glow) */}
                  <span
                    className={`absolute bottom-0.5 left-3 right-3 h-[2px] bg-[#C85A32] rounded-full transition-transform duration-300 ease-out origin-center ${
                      link.isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 opacity-80"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── 3. RIGHT ACTION ICONS (Tactile hover micro-interactions) ── */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            {/* Quick Kannada Voice Listing Badge (Desktop only) */}
            <Link
              href="/artisan/onboard"
              className="group hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-amber-300 text-[11px] font-bold text-[#C85A32] hover:bg-amber-100 hover:border-[#C85A32]/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 ease-out shadow-xs"
            >
              <Mic className="w-3 h-3 text-[#C85A32] transition-transform duration-200 ease-out group-hover:rotate-12 group-hover:scale-110" />
              <span>ಮಾತನಾಡಿ ನೊಂದಾಯಿಸಿ</span>
            </Link>

            {/* Log In Button with interactive hover avatar */}
            <Link
              href="/artisan/onboard"
              className="group px-3.5 py-1.5 rounded-full border border-stone-300 hover:border-[#C85A32] text-stone-800 text-xs font-semibold transition-all duration-200 ease-out flex items-center gap-2 hover:bg-stone-50 hover:-translate-y-0.5 hover:shadow-xs active:translate-y-0 active:scale-95"
            >
              <span>Log In</span>
              <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[11px] transition-transform duration-200 ease-out group-hover:scale-105 group-hover:bg-[#C85A32]">
                <User className="w-3 h-3" />
              </span>
            </Link>

            {/* Shopping Cart Button with subtle tilt & badge pulse */}
            <Link
              href="/marketplace#catalog"
              className="group relative p-2 rounded-full text-stone-800 hover:text-[#C85A32] hover:bg-stone-50 hover:-translate-y-0.5 active:scale-95 transition-all duration-200 ease-out"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-105" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#C85A32] text-white text-[10px] font-bold flex items-center justify-center shadow-xs transition-transform duration-200 ease-out group-hover:scale-110">
                1
              </span>
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-700 hover:text-[#C85A32] hover:bg-stone-100 active:scale-95 transition-all duration-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── MOBILE ACCORDION / SLIDEOUT MENU ── */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-2 shadow-lg animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-[0.99] ${
                  link.isActive
                    ? "bg-amber-50 text-[#C85A32] font-bold"
                    : "text-stone-700 hover:bg-stone-50 hover:text-[#C85A32]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      link.isActive ? "text-[#C85A32]" : "text-stone-400"
                    }`}
                  />
                  <span>{link.name}</span>
                </div>
                {link.kannada && (
                  <span className="text-xs text-stone-400 font-normal">
                    {link.kannada}
                  </span>
                )}
                <ChevronRight className="w-4 h-4 text-stone-400" />
              </Link>
            );
          })}

          <div className="pt-2 border-t border-stone-200">
            <Link
              href="/artisan/onboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-[#C85A32] hover:bg-[#a84420] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all duration-200"
            >
              <Mic className="w-4 h-4" />
              <span>Launch Kannada Voice Portal (ಧ್ವನಿ ನೊಂದಣಿ)</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
