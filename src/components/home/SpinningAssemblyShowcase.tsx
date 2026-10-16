"use client";

import React, { useState, useEffect, useRef } from "react";

interface SpinningAssemblyShowcaseProps {
  imageSrc?: string;
  altText?: string;
  title?: string;
  subtitle?: string;
}

export default function SpinningAssemblyShowcase({
  imageSrc = "/hero-crafts.jpg",
  altText = "Traditional Handcrafted Karnataka Treasures",
  title = "Generations of Craftsmanship",
  subtitle = "Mysore inlay craft, sandalwood jali carving, and hand-beaten temple brassware.",
}: SpinningAssemblyShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const [showSeamGlow, setShowSeamGlow] = useState(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsAssembled(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsAssembled(true);
      return;
    }

    // Every time the user scrolls into view, trigger the 4-into-1 assembly.
    // When leaving view, reset so it can trigger again on next scroll!
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAssembled(true);
            setTimeout(() => {
              setShowSeamGlow(true);
              setTimeout(() => setShowSeamGlow(false), 800);
            }, 750);
          } else {
            setIsAssembled(false);
            setShowSeamGlow(false);
          }
        });
      },
      {
        threshold: 0.22,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl overflow-hidden border-2 border-amber-900/50 shadow-2xl bg-[#24130A] p-2.5 group"
    >
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#150B05] select-none">
        
        {/* ================= PART 1: TOP-LEFT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(-65px, -65px) rotate(-90deg) scale(0.75)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
            transitionDelay: isAssembled ? "0ms" : "0ms",
          }}
          className="absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden z-10 will-change-transform"
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 w-[200%] h-[200%] max-w-none object-cover"
          />
        </div>

        {/* ================= PART 2: TOP-RIGHT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(65px, -65px) rotate(90deg) scale(0.75)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
            transitionDelay: isAssembled ? "75ms" : "0ms",
          }}
          className="absolute top-0 left-1/2 w-1/2 h-1/2 overflow-hidden z-10 will-change-transform"
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 -left-[100%] w-[200%] h-[200%] max-w-none object-cover"
          />
        </div>

        {/* ================= PART 3: BOTTOM-LEFT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(-65px, 65px) rotate(90deg) scale(0.75)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
            transitionDelay: isAssembled ? "150ms" : "0ms",
          }}
          className="absolute top-1/2 left-0 w-1/2 h-1/2 overflow-hidden z-10 will-change-transform"
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute -top-[100%] left-0 w-[200%] h-[200%] max-w-none object-cover"
          />
        </div>

        {/* ================= PART 4: BOTTOM-RIGHT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(65px, 65px) rotate(-90deg) scale(0.75)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 900ms cubic-bezier(0.16, 1, 0.3, 1), opacity 700ms ease",
            transitionDelay: isAssembled ? "225ms" : "0ms",
          }}
          className="absolute top-1/2 left-1/2 w-1/2 h-1/2 overflow-hidden z-10 will-change-transform"
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute -top-[100%] -left-[100%] w-[200%] h-[200%] max-w-none object-cover"
          />
        </div>

        {/* Subtle lock-in seam flash */}
        <div
          className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-700 ${
            showSeamGlow ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-amber-300/80 to-transparent shadow-[0_0_8px_#F59E0B]" />
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-amber-300/80 to-transparent shadow-[0_0_8px_#F59E0B]" />
        </div>

        {/* Clean Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent z-25 pointer-events-none" />

        {/* Original Clean Text Overlay */}
        <div
          className={`absolute bottom-4 left-4 right-4 text-white text-xs z-30 transition-all duration-700 ${
            isAssembled ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          <span className="font-bold text-amber-300 text-sm block">
            {title}
          </span>
          <p className="text-[11px] text-stone-300 mt-0.5">
            {subtitle}
          </p>
        </div>

      </div>
    </div>
  );
}
