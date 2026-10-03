"use client";

import React, { useEffect, useState } from "react";

export default function LogoLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [lettersVisible, setLettersVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  const brandLetters = [
    { char: "K", color: "text-[#E67E22]" },
    { char: "a", color: "text-white" },
    { char: "l", color: "text-white" },
    { char: "a", color: "text-white" },
    { char: "S", color: "text-[#E67E22]" },
    { char: "a", color: "text-white" },
    { char: "m", color: "text-white" },
    { char: "a", color: "text-white" },
    { char: "n", color: "text-white" },
    { char: "v", color: "text-white" },
    { char: "a", color: "text-white" },
    { char: "y", color: "text-white" },
    { char: "a", color: "text-[#E67E22]" }
  ];

  useEffect(() => {
    // Check if user already saw the loader in this session
    const hasLoaded = sessionStorage.getItem("ks_logo_loaded");
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    // Step 1: Logo drops and bounces (0s - 0.7s)
    // Step 2: Trigger letters reveal at 0.7s
    const letterTimer = setTimeout(() => {
      setLettersVisible(true);
    }, 700);

    // Step 3: Trigger subtitle at 1.7s
    const subtitleTimer = setTimeout(() => {
      setSubtitleVisible(true);
    }, 1700);

    // Step 4: Start fadeout at 2.7s
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2700);

    // Step 5: Dismount at 3.2s
    const dismountTimer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("ks_logo_loaded", "true");
    }, 3200);

    return () => {
      clearTimeout(letterTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(fadeTimer);
      clearTimeout(dismountTimer);
    };
  }, []);

  const handleSkip = () => {
    setFadeOut(true);
    setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("ks_logo_loaded", "true");
    }, 300);
  };

  if (!loading) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#150B05] text-[#FAF6F0] cursor-pointer transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#E67E22]/20 blur-3xl animate-pulse pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-6 max-w-lg">
        
        {/* 1. Dropping & Bouncing Logo Emblem */}
        <div className="animate-dropBounce">
          <div className="p-3.5 sm:p-5 bg-white rounded-3xl shadow-[0_20px_50px_rgba(230,126,34,0.35)] border-2 border-[#E67E22] transform hover:scale-105 transition-transform">
            <img
              src="/logo.png"
              alt="KalaSamanvaya - Local Crafts • Global Hands"
              className="w-40 sm:w-52 h-auto object-contain mx-auto"
            />
          </div>
        </div>

        {/* 2. Staggered Letter-by-Letter Reveal */}
        <div className="min-h-[50px] flex items-center justify-center">
          {lettersVisible && (
            <div className="flex items-center tracking-wider text-3xl sm:text-5xl font-black font-serif select-none drop-shadow-md">
              {brandLetters.map((item, index) => (
                <span
                  key={index}
                  style={{ animationDelay: `${index * 65}ms` }}
                  className={`inline-block animate-letterPop ${item.color}`}
                >
                  {item.char}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. Subtitle & Tagline Glide Up */}
        <div
          className={`space-y-2 transition-all duration-700 transform ${
            subtitleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm font-semibold tracking-widest text-[#E67E22] uppercase">
            <span>Local Crafts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Global Hands</span>
          </div>

          <div className="text-xs text-amber-200/70 font-medium">
            ಕಲಾ ಸಮನ್ವಯ • Karnataka&apos;s Digital Artisan Network
          </div>
        </div>

        {/* Skip Tip */}
        <div className="text-[10px] text-stone-500 pt-4 uppercase tracking-widest">
          Click anywhere to enter
        </div>
      </div>
    </div>
  );
}
