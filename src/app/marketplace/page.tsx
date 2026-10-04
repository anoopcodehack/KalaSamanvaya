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
  QrCode,
  Mic,
  MicOff,
  SlidersHorizontal,
  RotateCcw,
  X
} from "lucide-react";
import Link from "next/link";

type CraftFilterType = "ALL" | "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Woodcraft";
type SortOption = "featured" | "hours-high" | "payout-high" | "price-low" | "price-high";

export default function MarketplacePage() {
  const [productsList, setProductsList] = useState<ArtisanProduct[]>(ARTISAN_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<CraftFilterType>("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");
  const [giOnly, setGiOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
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

  // Voice Search (Native Web Speech API kn-IN & fallback)
  const recognitionRef = React.useRef<any>(null);

  const toggleVoiceSearch = () => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is supported on Chrome, Edge, and Safari browsers.");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          // ignore stop error
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "kn-IN"; // Native Kannada speech recognition
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (e: any) => {
        console.warn("Speech recognition error:", e);
        setIsListening(false);
      };
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((r: any) => r[0].transcript)
          .join("");
        if (transcript) {
          setSearchQuery(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.error("Speech recognition start failed", e);
      setIsListening(false);
    }
  };

  // Dynamic counts for category tabs
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: productsList.length };
    productsList.forEach((p) => {
      counts[p.craftType] = (counts[p.craftType] || 0) + 1;
    });
    return counts;
  }, [productsList]);

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("ALL");
    setSelectedDistrict("ALL");
    setGiOnly(false);
    setSearchQuery("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "ALL" ||
    selectedDistrict !== "ALL" ||
    giOnly ||
    searchQuery.trim() !== "" ||
    sortBy !== "featured";

  // Filter products by category, district, GI tag, search, and sort
  const filteredProducts = useMemo(() => {
    let list = productsList.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.craftType === selectedCategory;
      const matchesDistrict =
        selectedDistrict === "ALL" || product.artisanDistrict === selectedDistrict;
      const matchesGI = !giOnly || product.badge === "GI Tagged Heritage";
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        product.title.toLowerCase().includes(q) ||
        product.kannadaTitle.includes(q) ||
        product.artisanName.toLowerCase().includes(q) ||
        product.artisanCluster.toLowerCase().includes(q) ||
        product.artisanDistrict.toLowerCase().includes(q);

      return matchesCategory && matchesDistrict && matchesGI && matchesSearch;
    });

    if (sortBy === "hours-high") {
      list = [...list].sort((a, b) => b.breakdown.handcraftHours - a.breakdown.handcraftHours);
    } else if (sortBy === "payout-high") {
      list = [...list].sort((a, b) => b.breakdown.artisanSharePercent - a.breakdown.artisanSharePercent);
    } else if (sortBy === "price-low") {
      list = [...list].sort((a, b) => a.priceINR - b.priceINR);
    } else if (sortBy === "price-high") {
      list = [...list].sort((a, b) => b.priceINR - a.priceINR);
    }

    return list;
  }, [productsList, selectedCategory, selectedDistrict, giOnly, searchQuery, sortBy]);

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
        <ScrollReveal direction="up" className="space-y-6 mb-8">
          
          {/* Header & Search/Sort Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 bg-white p-6 rounded-2xl border border-amber-900/15 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 border border-amber-800/20 text-[#C85A32] text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>ಕರ್ನಾಟಕ ಕರಕುಶಲ ಭಂಡಾರ • Verified Heritage Clusters</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A1810] mt-2 tracking-tight">
                Handcrafted Product Catalogue
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Browse authentic GI-tagged masterpieces direct from Karnataka rural artisan collectives with transparent wage breakdowns.
              </p>
            </div>

            {/* Buyer Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Voice-Enabled Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Kasuti, Bidri, Belagavi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-16 py-2.5 bg-[#FAF7F2] rounded-xl border border-stone-300 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white transition-all shadow-inner"
                />

                {/* Clear Search Button */}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-9 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700"
                    title="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Kannada Voice Search Mic Button */}
                <button
                  type="button"
                  onClick={toggleVoiceSearch}
                  title="ಧ್ವನಿ ಹುಡುಕಾಟ (Kannada Voice Search)"
                  className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse shadow-md"
                      : "bg-amber-100 hover:bg-amber-200 text-[#C85A32]"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="w-3.5 h-3.5" />
                  ) : (
                    <Mic className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative sm:w-56">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-[#FAF7F2] rounded-xl border border-stone-300 text-xs text-stone-700">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#C85A32] flex-shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    aria-label="Sort craft catalogue"
                    className="w-full bg-transparent text-xs font-semibold text-[#2A1810] focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured (ಜನಪ್ರಿಯ)</option>
                    <option value="hours-high">Most Handcraft Hours (ಹೆಚ್ಚು ಕೆಲಸ)</option>
                    <option value="payout-high">Highest Direct Wage % (ನೇರ ಕೂಲಿ)</option>
                    <option value="price-low">Price: Low to High (ಕಡಿಮೆ ಬೆಲೆ)</option>
                    <option value="price-high">Price: High to Low (ಹೆಚ್ಚಿನ ಬೆಲೆ)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Voice Search Listening Toast Indicator with Instant Quick Speak Test Chips */}
          {isListening && (
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-[#2A1810] text-xs font-semibold space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-red-600">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="font-bold">ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ... (Listening in Kannada speech):</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsListening(false)}
                  className="text-stone-400 hover:text-stone-700 text-xs"
                >
                  ✕ Close
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                <span className="text-stone-500 font-normal">Or click spoken craft preset:</span>
                <button
                  type="button"
                  onClick={() => { setSearchQuery("ಕಸೂತಿ"); setIsListening(false); }}
                  className="px-2.5 py-1 rounded-md bg-white border border-amber-400 text-[#C85A32] hover:bg-amber-100 font-bold shadow-2xs"
                >
                  &quot;ಕಸೂತಿ ಶಾಲು&quot; (Kasuti)
                </button>
                <button
                  type="button"
                  onClick={() => { setSearchQuery("ಬಿದ್ರಿ"); setIsListening(false); }}
                  className="px-2.5 py-1 rounded-md bg-white border border-amber-400 text-[#C85A32] hover:bg-amber-100 font-bold shadow-2xs"
                >
                  &quot;ಬಿದ್ರಿ ಬೆಳ್ಳಿ&quot; (Bidriware)
                </button>
                <button
                  type="button"
                  onClick={() => { setSearchQuery("ಖಾನಾಪುರ"); setIsListening(false); }}
                  className="px-2.5 py-1 rounded-md bg-white border border-amber-400 text-[#C85A32] hover:bg-amber-100 font-bold shadow-2xs"
                >
                  &quot;ಖಾನಾಪುರ ಮಡಿಕೆ&quot; (Belagavi Pottery)
                </button>
              </div>
            </div>
          )}

          {/* Craft Category Tabs with Dynamic Item Count Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-500 mr-2 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Craft:</span>
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
            ).map((cat) => {
              const count = categoryCounts[cat.id] || 0;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#C85A32] text-white shadow-sm"
                      : "bg-white text-stone-700 border border-stone-300 hover:bg-amber-50"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      isSelected ? "bg-white/25 text-white" : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Secondary Faceted Filters: Cluster / District & GI Tagged Heritage */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-900/10 text-xs">
            {/* GI Tagged Badge Toggle */}
            <button
              onClick={() => setGiOnly(!giOnly)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                giOnly
                  ? "bg-emerald-800 text-white border-emerald-900 shadow-sm"
                  : "bg-white text-stone-700 border-stone-300 hover:bg-emerald-50 hover:border-emerald-300"
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${giOnly ? "text-emerald-200" : "text-emerald-700"}`} />
              <span>GI-Tagged Heritage Only</span>
            </button>

            <span className="text-stone-300">|</span>

            <div className="flex items-center gap-1.5 text-stone-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Cluster:</span>
            </div>

            {(
              [
                { id: "ALL", label: "All Districts" },
                { id: "Dharwad", label: "Dharwad" },
                { id: "Bidar", label: "Bidar" },
                { id: "Belagavi", label: "Belagavi" },
                { id: "Udupi", label: "Udupi" },
                { id: "Ramanagara", label: "Ramanagara" }
              ] as const
            ).map((dist) => (
              <button
                key={dist.id}
                onClick={() => setSelectedDistrict(dist.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  selectedDistrict === dist.id
                    ? "bg-amber-900 text-white shadow-xs font-bold"
                    : "bg-white text-stone-600 border border-stone-200 hover:bg-amber-50"
                }`}
              >
                {dist.label}
              </button>
            ))}

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="ml-auto inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-100/70 hover:bg-amber-200 text-[#C85A32] text-xs font-bold transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters (ತೆರವುಗೊಳಿಸಿ)</span>
              </button>
            )}
          </div>

          {/* Active Results Summary */}
          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <p>
              Showing <span className="font-bold text-[#2A1810]">{filteredProducts.length}</span> of{" "}
              <span className="font-bold text-[#2A1810]">{productsList.length}</span> authentic Karnataka craft treasures
              {selectedCategory !== "ALL" && (
                <span className="ml-1 text-[#C85A32] font-semibold">• Filtered by {selectedCategory}</span>
              )}
              {selectedDistrict !== "ALL" && (
                <span className="ml-1 text-amber-900 font-semibold">• {selectedDistrict} Cluster</span>
              )}
              {giOnly && (
                <span className="ml-1 text-emerald-800 font-semibold">• GI Tagged</span>
              )}
            </p>

            <span className="text-[11px] text-stone-400 hidden sm:inline">
              100% Direct-from-Artisan • Guaranteed 75%+ Maker Wage Payout
            </span>
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
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-3">
            <p className="text-stone-700 font-bold text-sm">
              No craft masterpieces found matching your active filters.
            </p>
            <p className="text-stone-500 text-xs max-w-sm mx-auto">
              Try clearing your search query or selecting &quot;All Crafts&quot; to discover more Karnataka artisan collections.
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#C85A32] text-white text-xs font-bold shadow-sm hover:bg-[#a84420] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters (ಎಲ್ಲಾ ಮರುಹೊಂದಿಸಿ)</span>
            </button>
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
