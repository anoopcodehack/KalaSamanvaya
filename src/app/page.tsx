"use client";

import React, { useState } from "react";
import Link from "next/link";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import { ARTISAN_PRODUCTS, ArtisanProduct } from "@/lib/db/products";
import WhyThisPriceModal from "@/components/marketplace/WhyThisPriceModal";
import MockCheckoutModal from "@/components/marketplace/MockCheckoutModal";
import { ArrowRight, Sparkles, ShoppingBag, Eye, HeartHandshake, ShieldCheck, ChevronRight } from "lucide-react";

export default function HomePage() {
  const [activeStoryProduct, setActiveStoryProduct] = useState<ArtisanProduct | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ArtisanProduct | null>(null);

  const featuredShopProducts = ARTISAN_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#1F130B] text-[#FAF6F0] selection:bg-[#E67E22] selection:text-white">
      {/* ── 1. HERO SECTION (Full Traditional Indian Craft Background) ── */}
      <section className="relative w-full min-h-[640px] sm:min-h-[720px] flex items-center bg-[#150B05] overflow-hidden">
        {/* Full high-definition traditional craft background */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-right opacity-85 filter brightness-95 transform scale-100 transition-transform duration-1000"
          style={{
            backgroundImage: `url('/hero-crafts.jpg')`,
            backgroundPosition: "center 30%",
          }}
        />

        {/* Cinematic contrast gradient: dark on left for text legibility, transparent on right so the traditional craft is fully visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 sm:via-black/55 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F130B] via-transparent to-black/40" />

        {/* Ambient warm light highlights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E67E22]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Glass Panel: Text & CTAs */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-6 bg-black/45 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/50 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />
                <span>ಕಲಾ ಸಮನ್ವಯ • Authentic Karnataka Heritage</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                Gifts That Tell <br />
                <span className="text-[#E67E22]">Karnataka&apos;s Story.</span>
              </h1>

              <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
                Exquisite hand-carved rosewood jali elephants, hand-painted temple mural art, Mysore inlay craftsmanship, and pure Kasuti embroidery—crafted by indigenous master artisan families across Karnataka with transparent fair-trade payouts.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/marketplace"
                  className="px-8 py-3.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-sm shadow-xl shadow-amber-950/50 transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  <span>Explore Collection</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                  className="px-6 py-3.5 rounded-full border border-amber-400/50 bg-white/5 hover:bg-white/15 text-amber-200 font-semibold text-sm transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#E67E22]" />
                  <span>Why This Price? (ಬೆಲೆ ವಿವರ)</span>
                </button>
              </div>

              {/* Traditional Trust Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-amber-900/60 text-xs text-amber-200/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                  <span>100% Handcrafted</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                  <span>75% Direct Payout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                  <span>GI Heritage Clusters</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Heritage Spotlight Pill */}
            <div className="lg:col-span-5 xl:col-span-6 hidden lg:flex flex-col justify-end items-end h-full">
              <div className="bg-black/55 backdrop-blur-md p-4 rounded-2xl border border-amber-500/30 text-right shadow-2xl max-w-sm space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-end gap-2 text-[#E67E22] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Master Craftsmen Heritage</span>
                </div>
                <div className="text-sm font-bold text-white">
                  Karnataka Traditional Treasures
                </div>
                <p className="text-[11px] text-stone-300 leading-snug">
                  Temple mural brass art, rosewood lattice elephants, and traditional Mysore lacquerware inlay boxes.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Floating Google Review Badge */}
        <div className="absolute bottom-4 left-6 z-20 bg-white/95 text-stone-900 rounded-xl px-3.5 py-2 shadow-2xl border border-stone-200 text-xs hidden sm:flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center text-xs border border-blue-100">
            G
          </div>
          <div>
            <div className="flex items-center gap-1 font-bold text-xs text-stone-900">
              <span>5.0</span>
              <span className="text-amber-500">★★★★★</span>
            </div>
            <div className="text-[9px] text-stone-500 font-medium">48 VERIFIED PATRON REVIEWS</div>
          </div>
        </div>
      </section>

      {/* ── 2. VIBRANT INDIAN FOLK ART BANNER (Krishna & Peacocks Kalamkari Strip) ── */}
      <FolkArtBanner variant="krishna" />

      {/* ── 3. OUR OFFERINGS SECTION (Truly Tribal Screenshot 2) ── */}
      <section className="wood-texture py-20 px-4 sm:px-6 lg:px-8 border-y border-amber-950/60">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Centered Heading */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Our Offerings
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Story Text Left Column */}
            <div className="lg:col-span-7 space-y-5 text-stone-300 text-sm sm:text-base leading-relaxed">
              <p>
                Step into the vibrant realm of <strong>KalaSamanvaya</strong>, where our unwavering dedication revolves around the revival and conservation of traditional Karnataka craft forms.
              </p>
              <p>
                Immerse yourself in the allure of our captivating regional treasures, meticulously crafted by skilled rural artisans—true custodians preserving the essence of timeless art. Beyond merely meeting consumer needs, your support becomes a meaningful contribution to our mission of safeguarding Karnataka&apos;s rich cultural tapestry.
              </p>
              <p>
                Our offerings extend beyond the aesthetic, providing tailored solutions for various occasions, from corporate gifting to intentional home decor.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-200">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#E67E22]" />
                  <span>Dharwad Kasuti GI Cluster</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#E67E22]" />
                  <span>75% Direct Artisan Earning</span>
                </div>
              </div>
            </div>

            {/* Offerings Hamper Photography Right Column */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-900/40 shadow-2xl bg-[#160D07] p-2.5 group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                  <img
                    src="/hero-crafts.jpg"
                    alt="Karnataka Traditional Heritage Craft Treasures"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white text-xs">
                    <span className="font-bold text-amber-300">Karnataka Masterpiece Hamper</span>
                    <p className="text-[11px] text-stone-300">Mysore Inlay, Sandalwood Jali & Traditional Folk Art</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ROYAL ELEPHANT MURAL FOLK ART BANNER ── */}
      <FolkArtBanner variant="elephant" />

      {/* ── 5. OUR SHOP SECTION (Truly Tribal Screenshot 3) ── */}
      <section className="wood-texture py-20 px-4 sm:px-6 lg:px-8 border-y border-amber-950/60">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Centered Heading */}
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">
              Our Shop
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-3 rounded-full" />
            <p className="text-xs text-stone-400 mt-2">
              Karnataka Handcrafted Masterpieces • Direct from Rural Artisan Collectives
            </p>
          </div>

          {/* Product Cards Row (Screenshot 3 Style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredShopProducts.map((product, idx) => (
              <div
                key={product.id}
                className="group bg-[#2A1810] rounded-xl overflow-hidden border border-amber-900/40 shadow-lg flex flex-col justify-between hover:border-[#E67E22]/60 transition-all duration-300"
              >
                {/* Image Container with Orange Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Ribbon Badge (Matching Screenshot 3 "EXCLUSIVE PRODUCT" / "New Arrival") */}
                  <div className="absolute top-0 left-0">
                    <span className="inline-block px-3 py-1 bg-[#E67E22] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      {idx === 0 ? "New Arrival" : "EXCLUSIVE PRODUCT"}
                    </span>
                  </div>

                  {/* Quick View Hover Button (Matching Screenshot 3) */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setActiveStoryProduct(product)}
                      className="px-4 py-2 rounded-md bg-white/90 backdrop-blur-sm text-stone-900 font-bold text-xs shadow-lg hover:bg-white flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#E67E22]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Bottom Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#E67E22] transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-stone-400 line-clamp-1">
                      By {product.artisanName} • {product.artisanCluster}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-amber-900/40 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-[#E67E22]">
                        ₹{product.priceINR.toLocaleString("en-IN")}
                      </span>
                      <span className="ml-1.5 text-xs text-stone-500 line-through">
                        ₹{product.compareAtPriceINR.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <button
                      onClick={() => setActiveCheckoutProduct(product)}
                      className="px-3 py-1.5 rounded-lg bg-[#E67E22] hover:bg-[#cf6d17] text-white text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Entire Collection Link */}
          <div className="text-center pt-4">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-600/60 hover:bg-[#2A1810] text-amber-200 font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
            >
              <span>Explore All Products in Storefront</span>
              <ArrowRight className="w-4 h-4 text-[#E67E22]" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRIBAL WARLI FOLK ART CELEBRATION STRIP ── */}
      <FolkArtBanner variant="warli" />

      {/* ── 6. CRAFT SPOTLIGHT BANNER (Truly Tribal Screenshot 4) ── */}
      <section className="wood-texture relative py-20 px-4 sm:px-6 lg:px-8 border-t border-amber-950">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block p-2 bg-[#2A1810] rounded-xl border border-amber-900/60 shadow-inner">
            <img
              src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=700&q=80"
              alt="Kasuti Embroidery Heritage"
              className="w-full max-h-72 object-cover rounded-lg shadow-md"
            />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Looking for Custom Handloom or Corporate Bulk Gifting?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
            From 200 Kasuti shawls for corporate celebrations to bespoke artisanal gift boxes, our deterministic multi-artisan fulfilment engine ensures lead-time certainty with zero quality compromise.
          </p>

          <div className="pt-2">
            <Link
              href="/b2b"
              className="px-8 py-3.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-sm shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Get In Touch (B2B Bulk Fulfilment)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. WARLI / FOLK ART FOOTER BORDER (Screenshot 4 & 5 Bottom) ── */}
      <FolkArtBorder variant="gold" />

      {/* Modals */}
      <WhyThisPriceModal
        product={activeStoryProduct}
        isOpen={Boolean(activeStoryProduct)}
        onClose={() => setActiveStoryProduct(null)}
        onProceedToCheckout={(p) => setActiveCheckoutProduct(p)}
      />

      <MockCheckoutModal
        product={activeCheckoutProduct}
        isOpen={Boolean(activeCheckoutProduct)}
        onClose={() => setActiveCheckoutProduct(null)}
      />
    </div>
  );
}
