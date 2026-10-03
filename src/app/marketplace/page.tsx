"use client";

import React, { useState, useMemo } from "react";
import { ARTISAN_PRODUCTS, ArtisanProduct } from "@/lib/db/products";
import ProductCard from "@/components/marketplace/ProductCard";
import WhyThisPriceModal from "@/components/marketplace/WhyThisPriceModal";
import MockCheckoutModal from "@/components/marketplace/MockCheckoutModal";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import { Sparkles, ShieldCheck, HeartHandshake, Filter, ArrowRight, Award, Search } from "lucide-react";
import Link from "next/link";

type CraftFilterType = "ALL" | "Kasuti" | "Beedu" | "Pottery" | "Bidriware";

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<CraftFilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStoryProduct, setActiveStoryProduct] = useState<ArtisanProduct | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ArtisanProduct | null>(null);

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return ARTISAN_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.craftType === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.kannadaTitle.includes(searchQuery) ||
        product.artisanName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artisanCluster.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1810]">
      {/* ── 1. HERO SECTION (Truly Tribal & Tribes India Style) ── */}
      <section className="relative bg-[#23170F] text-[#FAF6F0] overflow-hidden pt-8 pb-16 sm:pb-24">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A32]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D9822B]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
                <span>Where Tradition Meets Ethical Market Access</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Gifts That Tell <br />
                <span className="text-[#D9822B]">Karnataka&apos;s Story.</span>
              </h1>

              <p className="text-sm sm:text-base text-amber-100/80 leading-relaxed max-w-xl">
                Authentic Kasuti embroidery, Beedu basketry, and coastal terracotta pottery crafted by rural women collectives and master artisans. Transparent pricing, direct fair payouts, and zero middlemen exploitation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalog"
                  className="px-6 py-3 rounded-full bg-[#D9822B] hover:bg-[#b86d22] text-white font-bold text-sm shadow-lg shadow-amber-900/40 transition-all hover:scale-105 flex items-center gap-2"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                  className="px-6 py-3 rounded-full border border-amber-400/40 hover:bg-amber-900/30 text-amber-200 font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D9822B]" />
                  <span>Why This Price? (ಬೆಲೆ ವಿವರ)</span>
                </button>
              </div>

              {/* Trust Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-900/60 text-xs text-amber-200/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D9822B] flex-shrink-0" />
                  <span>GI-Tagged Heritage</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#D9822B] flex-shrink-0" />
                  <span>75% Direct Maker Payout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D9822B] flex-shrink-0" />
                  <span>Counted-Thread Authenticity</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Featured Showcase Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-amber-600/30 shadow-2xl bg-[#2A1810] p-3">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
                    alt="Featured Kasuti Craft"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C85A32]">
                      Featured Craft Spotlight
                    </span>
                    <h3 className="text-base font-bold mt-1 text-amber-50">
                      Dharwad Heritage Kasuti Silk Shawl
                    </h3>
                    <p className="text-xs text-amber-200/80">
                      Hand-stitched by Savita Naik • 38 Hours of Needlework
                    </p>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between text-xs text-amber-100">
                  <div>
                    <span className="text-stone-400 text-[11px]">Fair Direct Price: </span>
                    <span className="text-base font-bold text-amber-300">₹1,850</span>
                    <span className="ml-1 text-[11px] text-stone-400 line-through">₹2,400</span>
                  </div>
                  <button
                    onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 text-xs font-semibold border border-amber-400/30 flex items-center gap-1.5 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#D9822B]" />
                    <span>Cost Breakdown</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative Traditional Folk Border */}
      <FolkArtBorder variant="gold" />

      {/* ── 2. OUR OFFERINGS & STORY SECTION (Matching Image 2) ── */}
      <section className="bg-[#2A1810] text-[#FAF6F0] py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D9822B]">
              ಪಾರಂಪರಿಕ ಕರಕುಶಲ ಕಲೆಗಳು
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Our Offerings & Living Traditions
            </h2>
            <div className="w-20 h-1 bg-[#D9822B] mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Story Text */}
            <div className="md:col-span-7 space-y-4 text-amber-100/80 text-sm sm:text-base leading-relaxed">
              <p>
                Step into the living heritage of Karnataka, where our unwavering dedication revolves around the revival and fair valuation of traditional artisan art forms.
              </p>
              <p>
                From the 7th-century counted-thread <strong>Kasuti embroidery of Dharwad</strong> to the sustainable wildgrass <strong>Beedu basketry of coastal Udupi</strong> and the burnished river-silt pottery of Dakshina Kannada—each creation carries generations of cultural memory.
              </p>
              <p>
                Beyond meeting home and corporate gifting needs, every purchase directly empowers rural women makers, guaranteeing that over <strong>75% of the purchase price</strong> reaches the artisan&apos;s household with zero intermediary deduction.
              </p>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href="/b2b"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-semibold transition-colors"
                >
                  <span>Need Bulk Quantities? Open B2B Fulfilment Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Offerings Feature Card */}
            <div className="md:col-span-5 bg-[#23170F] p-4 rounded-2xl border border-amber-800/40 shadow-xl">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-[#2A1810] rounded-xl border border-amber-900/60">
                  <div className="w-7 h-7 rounded-lg bg-[#C85A32]/30 text-[#D9822B] flex items-center justify-center font-bold text-xs mb-2">
                    01
                  </div>
                  <h4 className="text-xs font-bold text-white">Kasuti Embroidery</h4>
                  <p className="text-[11px] text-amber-200/70 mt-1">Dharwad & Navalgund GI clusters</p>
                </div>

                <div className="p-3 bg-[#2A1810] rounded-xl border border-amber-900/60">
                  <div className="w-7 h-7 rounded-lg bg-[#C85A32]/30 text-[#D9822B] flex items-center justify-center font-bold text-xs mb-2">
                    02
                  </div>
                  <h4 className="text-xs font-bold text-white">Beedu Basketry</h4>
                  <p className="text-[11px] text-amber-200/70 mt-1">Wildgrass coastal plaiting</p>
                </div>

                <div className="p-3 bg-[#2A1810] rounded-xl border border-amber-900/60">
                  <div className="w-7 h-7 rounded-lg bg-[#C85A32]/30 text-[#D9822B] flex items-center justify-center font-bold text-xs mb-2">
                    03
                  </div>
                  <h4 className="text-xs font-bold text-white">Coastal Pottery</h4>
                  <p className="text-[11px] text-amber-200/70 mt-1">Netravati riverbed silt & agate burnish</p>
                </div>

                <div className="p-3 bg-[#2A1810] rounded-xl border border-amber-900/60">
                  <div className="w-7 h-7 rounded-lg bg-[#C85A32]/30 text-[#D9822B] flex items-center justify-center font-bold text-xs mb-2">
                    04
                  </div>
                  <h4 className="text-xs font-bold text-white">Bidri Silver Inlay</h4>
                  <p className="text-[11px] text-amber-200/70 mt-1">99.9% fine silver wire on blackened alloy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Border */}
      <FolkArtBorder variant="terracotta" />

      {/* ── 3. STOREFRONT PRODUCT CATALOG (Truly Tribal "Our Shop") ── */}
      <section id="catalog" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
              ಕರ್ನಾಟಕ ಕರಕುಶಲ ಭಂಡಾರ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A1810] mt-1">
              Handcrafted Product Catalogue
            </h2>
            <p className="text-xs text-stone-600 mt-1">
              Select any craft to view maker profiles, handcraft hours, and the transparent &quot;Why This Price?&quot; breakdown.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search craft, maker or cluster..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-amber-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 mr-2 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Filter Craft:</span>
          </div>

          {(
            [
              { id: "ALL", label: "All Crafts (ಎಲ್ಲಾ)" },
              { id: "Kasuti", label: "Kasuti Embroidery (ಕಸೂತಿ)" },
              { id: "Beedu", label: "Beedu Basketry (ಬೀಡು ಬುಟ್ಟಿ)" },
              { id: "Pottery", label: "Coastal Pottery (ಕರಾವಳಿ ಮಡಿಕೆ)" },
              { id: "Bidriware", label: "Bidri Metalcraft (ಬಿದ್ರಿ ಕಲೆ)" }
            ] as const
          ).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#C85A32] text-white shadow-md"
                  : "bg-white text-stone-700 border border-amber-200 hover:bg-amber-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenWhyThisPrice={(p) => setActiveStoryProduct(p)}
                onOpenCheckout={(p) => setActiveCheckoutProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-amber-200 p-8">
            <p className="text-stone-500 text-sm">
              No products found matching &quot;{searchQuery}&quot;. Try selecting &quot;All Crafts&quot;.
            </p>
          </div>
        )}
      </section>

      {/* Floating Trust Badge (like Truly Tribal bottom-left) */}
      <div className="fixed bottom-5 left-5 z-40 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-xl border border-amber-300 text-xs flex items-center gap-3 hidden sm:flex">
        <div className="p-1 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center">
          <img src="/logo.png" alt="KalaSamanvaya" className="w-10 h-10 object-contain" />
        </div>
        <div>
          <div className="font-bold text-[#2A1810]">Local Crafts • Global Hands</div>
          <div className="text-[11px] text-stone-500">75% Direct Artisan Earnings Guarantee</div>
        </div>
      </div>

      {/* ── 4. INTERACTIVE MODALS ── */}
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
