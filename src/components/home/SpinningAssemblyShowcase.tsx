"use client";

import React, { useState, useEffect, useRef } from "react";
import { RotateCcw, Sparkles, CheckCircle2, Layers } from "lucide-react";

interface SpinningAssemblyShowcaseProps {
  imageSrc?: string;
  altText?: string;
  title?: string;
  subtitle?: string;
  kannadaTitle?: string;
  kannadaSubtitle?: string;
}

export default function SpinningAssemblyShowcase({
  imageSrc = "/hero-crafts.jpg",
  altText = "Traditional Handcrafted Karnataka Treasures",
  title = "Generations of Craftsmanship",
  subtitle = "Mysore inlay craft, sandalwood jali carving, and hand-beaten temple brassware.",
  kannadaTitle = "ಪೀಳಿಗೆಯಿಂದ ಬಂದ ಕರಕುಶಲ ಪರಂಪರೆ",
  kannadaSubtitle = "ಮೈಸೂರು ಕೆತ್ತನೆ, ಗಂಧದ ಮರದ ಕೆತ್ತನೆ ಹಾಗೂ ಕಂಚಿನ ಪಾರಂಪರಿಕ ಕಲಾಕೃತಿಗಳು.",
}: SpinningAssemblyShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAssembled, setIsAssembled] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showGoldSeam, setShowGoldSeam] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Trigger assembly on scroll when entering viewport
  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsAssembled(true);
      setHasTriggered(true);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsAssembled(true);
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            setHasTriggered(true);
            // Slight delay after entering viewport for cinematic effect
            setTimeout(() => {
              setIsAssembled(true);
              // Trigger the golden fusion seam sparkle right when pieces meet
              setTimeout(() => {
                setShowGoldSeam(true);
                setTimeout(() => setShowGoldSeam(false), 1400);
              }, 900);
            }, 180);
          }
        });
      },
      {
        threshold: 0.28, // Triggers when roughly a third of the section is visible
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasTriggered]);

  // Manual replay button
  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAssembled(false);
    setShowGoldSeam(false);

    setTimeout(() => {
      setIsAssembled(true);
      setTimeout(() => {
        setShowGoldSeam(true);
        setTimeout(() => setShowGoldSeam(false), 1400);
      }, 900);
    }, 250);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl overflow-hidden border-2 border-amber-900/60 shadow-2xl bg-[#24130A] p-2.5 group transition-all duration-300 hover:border-amber-600/70"
    >
      {/* ── TOP BADGE & REPLAY CONTROL ── */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-500 backdrop-blur-md ${
            isAssembled
              ? "bg-amber-950/85 border border-amber-500/60 text-amber-300 shadow-md translate-y-0 opacity-100"
              : "bg-black/60 border border-stone-600/40 text-stone-400 -translate-y-2 opacity-0"
          }`}
        >
          <Sparkles className="w-3 h-3 text-[#E67E22] animate-spin-slow" />
          <span>4 Pieces Merged • ಪರಂಪರೆ ಮರುಜೋಡಣೆ</span>
        </div>

        {/* Replay / Break & Assemble Button */}
        <button
          onClick={handleReplay}
          type="button"
          aria-label="Replay 4-piece spinning assembly animation"
          className="pointer-events-auto px-2.5 py-1 rounded-full bg-black/65 hover:bg-amber-950/90 border border-amber-500/50 hover:border-amber-400 text-amber-200 text-[10px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1 backdrop-blur-md shadow-lg"
          title="Click to break into 4 pieces and reassemble!"
        >
          <RotateCcw className={`w-3 h-3 text-[#E67E22] transition-transform duration-500 ${!isAssembled ? "rotate-180" : ""}`} />
          <span className="hidden sm:inline">Re-Spin (ಮತ್ತೆ ತಿರುಗಿಸಿ)</span>
        </button>
      </div>

      {/* ── 4-PIECE PUZZLE CONTAINER (Aspect 4:3) ── */}
      <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#150B05] select-none perspective-[1000px]">
        {/* ================= PART 1: TOP-LEFT QUADRANT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(-85px, -85px) rotate(-180deg) scale(0.65)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 1100ms cubic-bezier(0.25, 1, 0.5, 1), opacity 800ms ease",
            transitionDelay: "0ms",
          }}
          className={`absolute top-0 left-0 w-1/2 h-1/2 overflow-hidden z-10 ${
            !isAssembled ? "shadow-2xl ring-1 ring-amber-400/50" : ""
          }`}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 left-0 w-[200%] h-[200%] max-w-none object-cover"
          />
          {/* Subtle golden corner frame accent while assembling */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400/60 pointer-events-none" />
        </div>

        {/* ================= PART 2: TOP-RIGHT QUADRANT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(85px, -85px) rotate(180deg) scale(0.65)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 1100ms cubic-bezier(0.25, 1, 0.5, 1), opacity 800ms ease",
            transitionDelay: "100ms",
          }}
          className={`absolute top-0 left-1/2 w-1/2 h-1/2 overflow-hidden z-10 ${
            !isAssembled ? "shadow-2xl ring-1 ring-amber-400/50" : ""
          }`}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute top-0 -left-[100%] w-[200%] h-[200%] max-w-none object-cover"
          />
          {/* Subtle golden corner frame accent while assembling */}
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-amber-400/60 pointer-events-none" />
        </div>

        {/* ================= PART 3: BOTTOM-LEFT QUADRANT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(-85px, 85px) rotate(180deg) scale(0.65)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 1100ms cubic-bezier(0.25, 1, 0.5, 1), opacity 800ms ease",
            transitionDelay: "180ms",
          }}
          className={`absolute top-1/2 left-0 w-1/2 h-1/2 overflow-hidden z-10 ${
            !isAssembled ? "shadow-2xl ring-1 ring-amber-400/50" : ""
          }`}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute -top-[100%] left-0 w-[200%] h-[200%] max-w-none object-cover"
          />
          {/* Subtle golden corner frame accent while assembling */}
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-amber-400/60 pointer-events-none" />
        </div>

        {/* ================= PART 4: BOTTOM-RIGHT QUADRANT ================= */}
        <div
          style={{
            transform: isAssembled
              ? "translate(0, 0) rotate(0deg) scale(1)"
              : "translate(85px, 85px) rotate(-180deg) scale(0.65)",
            opacity: isAssembled ? 1 : 0,
            transition: "transform 1100ms cubic-bezier(0.25, 1, 0.5, 1), opacity 800ms ease",
            transitionDelay: "260ms",
          }}
          className={`absolute top-1/2 left-1/2 w-1/2 h-1/2 overflow-hidden z-10 ${
            !isAssembled ? "shadow-2xl ring-1 ring-amber-400/50" : ""
          }`}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="absolute -top-[100%] -left-[100%] w-[200%] h-[200%] max-w-none object-cover"
          />
          {/* Subtle golden corner frame accent while assembling */}
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400/60 pointer-events-none" />
        </div>

        {/* ── GOLDEN FUSION SEAMS (Kintsugi / Suvarna Sandhi Effect) ── */}
        {/* Horizontal Seam */}
        <div
          className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-transparent via-amber-300 to-transparent z-20 pointer-events-none transition-opacity duration-700 ${
            showGoldSeam ? "opacity-90 shadow-[0_0_12px_#F59E0B]" : "opacity-0"
          }`}
        />
        {/* Vertical Seam */}
        <div
          className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-amber-300 to-transparent z-20 pointer-events-none transition-opacity duration-700 ${
            showGoldSeam ? "opacity-90 shadow-[0_0_12px_#F59E0B]" : "opacity-0"
          }`}
        />
        {/* Center Sparkle Pulse */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-200/90 blur-xs z-20 pointer-events-none transition-all duration-700 ${
            showGoldSeam ? "scale-150 opacity-100" : "scale-50 opacity-0"
          }`}
        />

        {/* ── SHADOW VIGNETTE & CAPTION OVERLAY ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20 pointer-events-none" />

        <div
          className={`absolute bottom-4 left-4 right-4 text-white text-xs z-25 transition-all duration-500 ${
            isAssembled ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#E67E22] animate-pulse" />
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
              Living Heritage • ಜೀವಂತ ಪರಂಪರೆ
            </span>
          </div>
          <span className="font-bold text-amber-200 text-sm sm:text-base block">
            {title}
          </span>
          <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5 leading-relaxed">
            {subtitle}
          </p>
          <p className="text-[10px] text-amber-300/80 mt-1 font-serif hidden sm:block">
            {kannadaSubtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
