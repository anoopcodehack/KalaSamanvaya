import React from "react";

interface FolkArtBannerProps {
  className?: string;
}

export default function FolkArtBanner({ className = "" }: FolkArtBannerProps) {
  return (
    <div className={`w-full overflow-hidden leading-none select-none ${className}`} aria-hidden="true">
      <svg
        className="w-full h-12 sm:h-16"
        viewBox="0 0 1200 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="folkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B1E1E" />
            <stop offset="20%" stopColor="#C85A32" />
            <stop offset="40%" stopColor="#D9822B" />
            <stop offset="60%" stopColor="#1E5C4E" />
            <stop offset="80%" stopColor="#2A4B7C" />
            <stop offset="100%" stopColor="#8B1E1E" />
          </linearGradient>

          <pattern id="folkArchPattern" width="120" height="64" patternUnits="userSpaceOnUse">
            {/* Background pill arch */}
            <rect width="120" height="64" fill="#2A1810" />

            {/* Arch 1: Crimson Red with Temple Tower */}
            <path d="M 5 60 L 5 25 Q 30 5 55 25 L 55 60 Z" fill="#8B1E1E" stroke="#E5A93C" strokeWidth="1.5" />
            {/* Sacred Lotus / Gopura in Arch 1 */}
            <polygon points="30,12 40,28 35,28 42,42 18,42 25,28 20,28" fill="#F4E8D1" />
            <circle cx="30" cy="48" r="4" fill="#D9822B" />

            {/* Arch 2: Forest Emerald Green with Peacocks / Florals */}
            <path d="M 65 60 L 65 25 Q 90 5 115 25 L 115 60 Z" fill="#1B4D3E" stroke="#E5A93C" strokeWidth="1.5" />
            {/* Traditional Mayura / Peacock silhouette */}
            <path
              d="M 90 14 C 84 14 78 22 84 28 C 87 31 82 38 78 44 C 86 44 95 40 98 32 C 100 26 96 14 90 14 Z"
              fill="#E5A93C"
            />
            <circle cx="88" cy="20" r="2" fill="#8B1E1E" />

            {/* Bottom & Top Decorative Border Ribbons */}
            <line x1="0" y1="2" x2="120" y2="2" stroke="#E5A93C" strokeWidth="2.5" />
            <line x1="0" y1="6" x2="120" y2="6" stroke="#C85A32" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="0" y1="58" x2="120" y2="58" stroke="#C85A32" strokeWidth="1" strokeDasharray="4 2" />
            <line x1="0" y1="62" x2="120" y2="62" stroke="#E5A93C" strokeWidth="2.5" />

            {/* Rosettes between arches */}
            <circle cx="60" cy="18" r="4" fill="#D9822B" stroke="#F4E8D1" strokeWidth="1" />
            <circle cx="120" cy="18" r="4" fill="#D9822B" stroke="#F4E8D1" strokeWidth="1" />
            <circle cx="0" cy="18" r="4" fill="#D9822B" stroke="#F4E8D1" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="100%" height="64" fill="url(#folkArchPattern)" />
      </svg>
    </div>
  );
}
