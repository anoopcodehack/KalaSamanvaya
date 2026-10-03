import React from "react";

export type FolkArtStripVariant = "krishna" | "elephant" | "madhubani" | "warli";

interface FolkArtBannerProps {
  className?: string;
  variant?: FolkArtStripVariant;
  heightClass?: string;
}

const STRIP_IMAGES: Record<FolkArtStripVariant, string> = {
  krishna: "/strips/strip-krishna.png",
  elephant: "/strips/strip-elephant.png",
  madhubani: "/strips/strip-madhubani.png",
  warli: "/strips/strip-warli.png",
};

export default function FolkArtBanner({
  className = "",
  variant = "krishna",
  heightClass = "h-14 sm:h-20",
}: FolkArtBannerProps) {
  const imageSrc = STRIP_IMAGES[variant] || STRIP_IMAGES.krishna;

  return (
    <div
      className={`w-full overflow-hidden select-none border-y-2 border-[#2A1810] shadow-md relative ${className}`}
      aria-hidden="true"
    >
      <div
        className={`w-full ${heightClass} bg-repeat-x bg-contain bg-center`}
        style={{
          backgroundImage: `url('${imageSrc}')`,
          backgroundSize: "auto 100%",
        }}
      />
    </div>
  );
}
