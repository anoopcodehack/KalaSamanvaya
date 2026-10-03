"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delayMs?: number;
  durationMs?: number;
  threshold?: number;
  rootMargin?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delayMs = 0,
  durationMs = 650,
  threshold = 0.12,
  rootMargin = "0px 0px -40px 0px",
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect accessibility settings
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // SSR / older browser fallback
    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [threshold, rootMargin]);

  // Directional transform offsets when hidden
  const getHiddenTransform = () => {
    switch (direction) {
      case "up":
        return "translate-y-7 sm:translate-y-9";
      case "down":
        return "-translate-y-7 sm:-translate-y-9";
      case "left":
        return "translate-x-7 sm:translate-x-9";
      case "right":
        return "-translate-x-7 sm:-translate-x-9";
      case "fade":
      default:
        return "translate-y-0";
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${
        isVisible
          ? "opacity-100 translate-y-0 translate-x-0"
          : `opacity-0 ${getHiddenTransform()}`
      } ${className}`}
    >
      {children}
    </div>
  );
}
