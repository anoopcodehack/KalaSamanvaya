"use client";

import React, { useState, useMemo } from "react";
import { ARTISAN_PRODUCTS, ArtisanProduct } from "@/lib/db/products";
import ProductCard from "@/components/marketplace/ProductCard";
import WhyThisPriceModal from "@/components/marketplace/WhyThisPriceModal";
import MockCheckoutModal from "@/components/marketplace/MockCheckoutModal";
import CraftPassportModal from "@/components/marketplace/CraftPassportModal";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  ShieldCheck,
  HeartHandshake,
  Filter,
  ArrowRight,
  Award,
  Search,
  Info,
  Receipt,
  MapPin,
  Clock,
  QrCode
} from "lucide-react";
import Link from "next/link";

type CraftFilterType = "ALL" | "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Woodcraft";

export default function MarketplacePage() {
  const [productsList, setProductsList] = useState<ArtisanProduct[]>(ARTISAN_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<CraftFilterType>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStoryProduct, setActiveStoryProduct] = useState<ArtisanProduct | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ArtisanProduct | null>(null);
  const [activePassportProduct, setActivePassportProduct] = useState<ArtisanProduct | null>(null);

  // Fetch updated catalog from backend API
  React.useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.error("Failed to load products from API", err));
  }, []);

  // Filter products by category and search
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
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
  }, [productsList, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1810]">
      {/* ── 1. HERO SECTION (Warm Handcrafted Artisanal Canvas) ── */}
      <section className="relative bg-[#F5EFEB] border-b border-amber-900/15 overflow-hidden pt-10 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Column */}
            <ScrollReveal direction="up" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-amber-800/20 text-[#C85A32] text-xs font-semibold tracking-wider uppercase shadow-sm">
                <Award className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>Authentic Karnataka Heritage Handlooms & Crafts</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#2A1810] leading-tight">
                Gifts That Tell <br />
                <span className="text-[#C85A32]">Karnataka&apos;s Story.</span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                Authentic Kasuti embroidery, Beedu basketry, and coastal terracotta pottery crafted by rural women collectives and master artisans. Transparent pricing, direct fair payouts, and zero middlemen exploitation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#catalog"
                  className="px-6 py-3 rounded-full bg-[#C85A32] hover:bg-[#a84420] text-white font-bold text-sm shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                  className="px-6 py-3 rounded-full border border-stone-300 bg-white hover:bg-amber-50 text-[#2A1810] font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-sm"
                >
                  <Info className="w-4 h-4 text-[#C85A32]" />
                  <span>Why This Price? (ಬೆಲೆ ವಿವರ)</span>
                </button>
              </div>

              {/* Trust Pillars */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-stone-300 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C85A32] flex-shrink-0" />
                  <span>GI-Tagged Heritage</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#C85A32] flex-shrink-0" />
                  <span>75% Direct Maker Payout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C85A32] flex-shrink-0" />
                  <span>Counted-Thread Authenticity</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Hero Column: Featured Showcase Card */}
            <ScrollReveal direction="left" delayMs={150} className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-amber-900/15 shadow-xl bg-white p-3.5">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <img
                    src="/assets/craft-kasuti.jpg"
                    alt="Featured Kasuti Craft"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#C85A32]">
                      Featured Craft Spotlight
                    </span>
                    <h3 className="text-base font-bold mt-1 text-white">
                      Dharwad Heritage Kasuti Silk Shawl
                    </h3>
                    <p className="text-xs text-stone-200">
                      Hand-stitched by Savita Naik • 38 Hours of Needlework
                    </p>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between text-xs text-[#2A1810]">
                  <div>
                    <span className="text-stone-500 text-[11px]">Fair Direct Price: </span>
                    <span className="text-base font-bold text-[#C85A32]">₹1,850</span>
                    <span className="ml-1 text-[11px] text-stone-400 line-through">₹2,400</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActivePassportProduct(ARTISAN_PRODUCTS[0])}
                      className="px-3 py-1.5 rounded-lg bg-[#24130A] hover:bg-stone-900 text-amber-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                      title="View GI Craft Passport & Voice Tag"
                    >
                      <Award className="w-3.5 h-3.5 text-amber-300" />
                      <span>GI Passport (QR)</span>
                    </button>
                    <button
                      onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                      className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#2A1810] text-xs font-semibold border border-amber-300 flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5"
                    >
                      <Receipt className="w-3.5 h-3.5 text-[#C85A32]" />
                      <span>Cost Breakdown</span>
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Authentic Indian Folk Art Divider Strip (Madhubani / Mithila Heritage) */}
      <FolkArtBanner variant="madhubani" />

      {/* ── 2. OUR OFFERINGS & STORY SECTION ── */}
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C85A32]">
              ಪಾರಂಪರಿಕ ಕರಕುಶಲ ಕಲೆಗಳು
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2A1810] mt-1">
              Our Offerings & Living Traditions
            </h2>
            <div className="w-16 h-1 bg-[#C85A32] mx-auto mt-3 rounded-full" />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Story Text */}
            <ScrollReveal direction="right" delayMs={100} className="md:col-span-7 space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed">
              <p>
                Step into the living heritage of Karnataka, where our unwavering dedication revolves around the revival and fair valuation of traditional artisan art forms.
              </p>
              <p>
                From the 7th-century counted-thread <strong>Kasuti embroidery of Dharwad</strong> to the sustainable wildgrass <strong>Beedu basketry of coastal Udupi</strong> and the burnished river-silt pottery of Belagavi—each creation carries generations of cultural memory.
              </p>
              <p>
                Beyond meeting home and corporate gifting needs, every purchase directly empowers rural women makers, guaranteeing that over <strong>75% of the purchase price</strong> reaches the artisan&apos;s household with zero intermediary deduction.
              </p>

              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href="/b2b"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FAF7F2] hover:bg-amber-50 text-[#2A1810] border border-stone-300 text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span>Need Bulk Quantities? Open B2B Fulfilment Console</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C85A32]" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Offerings Feature Grid */}
            <ScrollReveal direction="left" delayMs={150} className="md:col-span-5 bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#C85A32] flex items-center justify-center font-bold text-xs mb-2">
                    01
                  </div>
                  <h4 className="text-xs font-bold text-[#2A1810]">Kasuti Embroidery</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Dharwad & Navalgund GI clusters</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#C85A32] flex items-center justify-center font-bold text-xs mb-2">
                    02
                  </div>
                  <h4 className="text-xs font-bold text-[#2A1810]">Beedu Basketry</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Wildgrass coastal plaiting</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#C85A32] flex items-center justify-center font-bold text-xs mb-2">
                    03
                  </div>
                  <h4 className="text-xs font-bold text-[#2A1810]">Coastal Pottery</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Netravati riverbed silt & agate burnish</p>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 hover:border-amber-400 transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-[#C85A32] flex items-center justify-center font-bold text-xs mb-2">
                    04
                  </div>
                  <h4 className="text-xs font-bold text-[#2A1810]">Bidri Silver Inlay</h4>
                  <p className="text-[11px] text-stone-500 mt-1">99.9% fine silver wire on blackened alloy</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Royal Elephant Mural Folk Art Banner */}
      <FolkArtBanner variant="elephant" />

      {/* Decorative Border */}
      <FolkArtBorder variant="terracotta" />

      {/* ── 3. STOREFRONT PRODUCT CATALOG (Truly Tribal "Our Shop") ── */}
      <section id="catalog" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
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
              className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-stone-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
            />
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal direction="up" delayMs={50}>
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
                { id: "Bidriware", label: "Bidri Metalcraft (ಬಿದ್ರಿ ಕಲೆ)" },
                { id: "Woodcraft", label: "Channapatna Woodcraft (ಚನ್ನಪಟ್ಟಣ ಮರ)" }
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                  selectedCategory === cat.id
                    ? "bg-[#C85A32] text-white shadow-sm"
                    : "bg-white text-stone-700 border border-stone-300 hover:bg-amber-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Product Grid with Staggered Scroll Reveal */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product, idx) => (
              <ScrollReveal key={product.id} direction="up" delayMs={(idx % 6) * 80}>
                <ProductCard
                  product={product}
                  onOpenWhyThisPrice={(p) => setActiveStoryProduct(p)}
                  onOpenCheckout={(p) => setActiveCheckoutProduct(p)}
                  onOpenPassport={(p) => setActivePassportProduct(p)}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8">
            <p className="text-stone-500 text-sm">
              No products found matching &quot;{searchQuery}&quot;. Try selecting &quot;All Crafts&quot;.
            </p>
          </div>
        )}
      </section>

      {/* Tribal Warli Folk Art Strip */}
      <FolkArtBanner variant="warli" />

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

      <CraftPassportModal
        product={activePassportProduct}
        isOpen={Boolean(activePassportProduct)}
        onClose={() => setActivePassportProduct(null)}
      />
    </div>
  );
}
