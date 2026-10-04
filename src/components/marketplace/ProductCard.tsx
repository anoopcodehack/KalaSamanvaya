"use client";

import React from "react";
import { ArtisanProduct } from "@/lib/db/products";
import { Info, MapPin, ShoppingBag, Clock, Award, QrCode } from "lucide-react";

interface ProductCardProps {
  product: ArtisanProduct;
  onOpenWhyThisPrice: (product: ArtisanProduct) => void;
  onOpenCheckout: (product: ArtisanProduct) => void;
  onOpenPassport?: (product: ArtisanProduct) => void;
}

export default function ProductCard({
  product,
  onOpenWhyThisPrice,
  onOpenCheckout,
  onOpenPassport
}: ProductCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: Number((y * -9).toFixed(2)), // rotateX: tilts up/down
      y: Number((x * 9).toFixed(2)),  // rotateY: tilts left/right
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: tilt.active ? "transform 0.08s ease-out" : "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="group relative bg-[#FAF6F0] rounded-2xl overflow-hidden border border-amber-900/15 shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col will-change-transform"
    >
      {/* Subtle Handcrafted Light Sheen following cursor */}
      {tilt.active && (
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-2xl transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${(tilt.y / 9 + 0.5) * 100}% ${(-tilt.x / 9 + 0.5) * 100}%, rgba(255, 255, 255, 0.18) 0%, transparent 60%)`,
          }}
        />
      )}
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded bg-[#D9822B] text-white shadow-md">
            {product.badge}
          </span>
        </div>

        {/* Floating Quick Action overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            onClick={() => onOpenWhyThisPrice(product)}
            className="px-3.5 py-2 rounded-full bg-white text-[#2A1810] text-xs font-bold shadow-lg hover:bg-amber-50 flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Info className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Why This Price?</span>
          </button>
        </div>

        {/* Lead time pill on bottom right of image */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-300" />
          <span>{product.breakdown.handcraftHours}h Needlework</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#FAF6F0]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="font-medium text-[#C85A32]">{product.categoryLabel}</span>
            <div className="flex items-center gap-1 text-amber-600 font-semibold">
              <span>★ {product.rating}</span>
              <span className="text-stone-400 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-sm text-[#2A1810] leading-snug line-clamp-1 group-hover:text-[#C85A32] transition-colors">
            {product.title}
          </h3>
          <p className="text-[11px] text-stone-600 line-clamp-1 mt-0.5 font-medium">
            {product.kannadaTitle}
          </p>

          {/* Maker Profile */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-2.5 pt-2 border-t border-amber-900/10">
            <span className="w-5 h-5 rounded-full bg-[#C85A32] text-white flex items-center justify-center text-[10px] font-bold">
              {product.artisanName.charAt(0)}
            </span>
            <span className="font-medium text-[#2A1810]">{product.artisanName}</span>
            <span className="text-stone-400">•</span>
            <div className="flex items-center gap-0.5 text-stone-500 text-[11px] truncate">
              <MapPin className="w-3 h-3 text-stone-400 flex-shrink-0" />
              <span className="truncate">{product.artisanCluster}</span>
            </div>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2 border-t border-amber-900/10 space-y-2.5">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-base font-extrabold text-[#C85A32]">
                ₹{product.priceINR.toLocaleString("en-IN")}
              </span>
              <span className="ml-2 text-xs text-stone-400 line-through">
                ₹{product.compareAtPriceINR.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              Artisan gets ₹{product.breakdown.artisanDirectPayoutINR}
            </span>
          </div>

          {onOpenPassport && (
            <button
              type="button"
              onClick={() => onOpenPassport(product)}
              className="w-full py-1.5 px-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[#C85A32] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <QrCode className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>GI Passport & Voice QR (ಪ್ರಮಾಣಪತ್ರ)</span>
            </button>
          )}

          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              onClick={() => onOpenWhyThisPrice(product)}
              className="w-full px-2.5 py-2 rounded-lg border border-[#D9822B]/60 text-[#2A1810] hover:bg-amber-100/70 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-[#D9822B]" />
              <span>Why This Price?</span>
            </button>

            <button
              onClick={() => onOpenCheckout(product)}
              className="w-full px-3 py-2 rounded-lg bg-[#C85A32] hover:bg-[#A34828] text-white text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Buy Direct</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
