"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const linkHoverClass =
    "group inline-flex items-center gap-1.5 text-stone-300 hover:text-amber-300 transition-all duration-300 ease-out hover:translate-x-2.5 py-0.5";
  const arrowClass =
    "text-[#E67E22] text-xs font-bold transition-all duration-300 ease-out opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 flex-shrink-0";
  const headingClass =
    "inline-block text-white font-medium text-sm sm:text-base tracking-wide mb-2.5 transition-all duration-300 ease-out hover:translate-x-2 hover:text-amber-200 cursor-default";
  const lineHoverClass =
    "inline-block transition-all duration-300 ease-out hover:translate-x-1.5 hover:text-stone-100 cursor-default";

  return (
    <footer className="relative w-full text-stone-200 text-xs selection:bg-[#D9822B] selection:text-white overflow-hidden">
      {/* ── RICH TEXTURED BROWN BACKGROUND (Matches Photo Exactly) ── */}
      <div 
        className="relative w-full pt-12 pb-24 px-6 sm:px-10 lg:px-16"
        style={{
          backgroundColor: "#3A1F0D",
          backgroundImage: `
            radial-gradient(ellipse at top, rgba(74, 38, 16, 0.9) 0%, rgba(35, 17, 7, 0.98) 100%),
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 3px),
            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 3px)
          `,
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* ── COL 1: CONTACT (Span 5 cols) ── */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <h4 className={headingClass}>
                Contact
              </h4>
              <div className="space-y-1 text-stone-300 text-xs leading-relaxed font-light">
                <p><span className={lineHoverClass}>KalaSamanvaya 101 (1st Floor), Heritage</span></p>
                <p><span className={lineHoverClass}>Crafts Center, Dharwad &amp; Udupi Clusters,</span></p>
                <p><span className={lineHoverClass}>Karnataka, India - 580001</span></p>
                <p className="pt-1.5">
                  <span className="text-stone-300">Phone: </span>
                  <a href="tel:+919113809951" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>+91 91138 09951</span>
                  </a>
                </p>
                <p>
                  <span className="text-stone-300">Email: </span>
                  <a href="mailto:info@kalasamanvaya.in" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>info@kalasamanvaya.in</span>
                  </a>
                </p>
              </div>
            </div>

            <div>
              <h4 className={headingClass}>
                Opening Hours
              </h4>
              <div className="space-y-0.5 text-stone-300 text-xs font-light">
                <p><span className={lineHoverClass}>Mon - Sat: 10am - 07:30pm</span></p>
                <p><span className={lineHoverClass}>Sunday: Closed</span></p>
              </div>
            </div>
          </div>

          {/* ── COL 2: HELPFUL LINKS & COMPANY (Span 4 cols) ── */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h4 className={headingClass}>
                Helpful Links
              </h4>
              <ul className="space-y-1.5 text-stone-300 text-xs font-light">
                <li>
                  <Link href="/help?tab=shipping" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>Shipping &amp; Returns</span>
                  </Link>
                </li>
                <li>
                  <Link href="/help?tab=privacy" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/help?tab=terms" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>Terms &amp; Conditions</span>
                  </Link>
                </li>
                <li>
                  <Link href="/help?tab=bulk" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>Bulk Enquiry</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className={headingClass}>
                Company
              </h4>
              <ul className="space-y-1.5 text-stone-300 text-xs font-light">
                <li>
                  <Link href="/marketplace#about" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>Our Story</span>
                  </Link>
                </li>
                <li>
                  <Link href="/help?tab=bulk" className={linkHoverClass}>
                    <span className={arrowClass}>›</span>
                    <span>Contact Us</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ── COL 3: KALASAMANVAYA OFFICIAL LOGO (Span 3 cols on right) ── */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-center pt-2 md:pt-0">
            <div className="relative w-40 h-32 p-3 rounded-2xl bg-white backdrop-blur-xs border border-amber-500/20 shadow-xl flex items-center justify-center group hover:bg-white/95 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer">
              <img
                src="/logo.png"
                alt="KalaSamanvaya - Local Crafts • Global Hands"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <span className="text-xs text-amber-200/80 mt-2.5 font-medium tracking-wider text-left md:text-right transition-all duration-300 ease-out hover:translate-x-1.5 hover:text-amber-300 cursor-default inline-block">
              ಕಲಾ ಸಮನ್ವಯ • Local Crafts
            </span>
          </div>

        </div>
      </div>

      {/* ── ETHNIC DUNE / WAVE RIDGE BORDER STRIP ── */}
      <div className="relative w-full h-8 overflow-hidden bg-[#2D1608]">
        <svg 
          className="w-full h-full text-[#4A2610] fill-current opacity-80" 
          viewBox="0 0 1200 40" 
          preserveAspectRatio="none"
        >
          {/* Repeating dune wave ridges from photo */}
          <path d="M0,35 C150,15 350,5 600,22 C850,38 1050,15 1200,28 L1200,40 L0,40 Z" />
          <path d="M0,25 C200,38 400,20 600,32 C800,12 1000,30 1200,18 L1200,40 L0,40 Z" opacity="0.6" />
        </svg>
      </div>

      {/* ── BOTTOM COPYRIGHT BAR ── */}
      <div className="w-full bg-[#241106] py-3.5 px-4 text-center border-t border-black/40">
        <p className="text-[11px] sm:text-xs text-stone-300 font-normal tracking-wide transition-all duration-300 ease-out hover:translate-x-1.5 hover:text-amber-200 cursor-default inline-block">
          © 2026 by KalaSamanvaya. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}