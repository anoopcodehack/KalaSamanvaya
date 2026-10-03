import React from "react";

interface FolkArtBorderProps {
  className?: string;
  variant?: "dark" | "terracotta" | "cream" | "gold";
}

export default function FolkArtBorder({ className = "", variant = "dark" }: FolkArtBorderProps) {
  const getColors = () => {
    switch (variant) {
      case "terracotta":
        return { bg: "bg-[#C85A32]", stroke: "#F5EBE1", fill: "#D9822B" };
      case "cream":
        return { bg: "bg-[#FAF6F0]", stroke: "#C85A32", fill: "#3D2B1F" };
      case "gold":
        return { bg: "bg-[#2A1810]", stroke: "#D9822B", fill: "#E5A93C" };
      case "dark":
      default:
        return { bg: "bg-[#23170F]", stroke: "#D9822B", fill: "#FAF6F0" };
    }
  };

  const colors = getColors();

  return (
    <div className={`w-full overflow-hidden leading-none py-1.5 ${colors.bg} ${className}`} aria-hidden="true">
      <svg
        className="w-full h-7 opacity-90"
        viewBox="0 0 1200 28"
        preserveAspectRatio="repeat-x"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern id={`kasuti-pattern-${variant}`} width="60" height="28" patternUnits="userSpaceOnUse">
          {/* Kasuti Gopura / Temple triangle motif */}
          <path
            d="M 30 2 L 44 14 L 38 14 L 46 22 L 14 22 L 22 14 L 16 14 Z"
            fill="none"
            stroke={colors.stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Lotus / Sun diamond center */}
          <rect
            x="27"
            y="9"
            width="6"
            height="6"
            transform="rotate(45 30 12)"
            fill={colors.fill}
          />
          {/* Base counted-thread running stitch */}
          <line x1="0" y1="26" x2="60" y2="26" stroke={colors.stroke} strokeWidth="1.5" strokeDasharray="4 2" />
          <line x1="0" y1="2" x2="60" y2="2" stroke={colors.stroke} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          {/* Side diamond accents */}
          <polygon points="5,14 10,10 10,18" fill={colors.fill} opacity="0.8" />
          <polygon points="55,14 50,10 50,18" fill={colors.fill} opacity="0.8" />
        </pattern>
        <rect width="100%" height="28" fill={`url(#kasuti-pattern-${variant})`} />
      </svg>
    </div>
  );
}
