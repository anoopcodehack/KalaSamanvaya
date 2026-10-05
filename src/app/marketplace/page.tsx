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

type CraftFilterType = "ALL" | "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Woodcraft" | "Handloom" | "Yakshagana";
type SortOption = "featured" | "hours-high" | "payout-high" | "price-low" | "price-high";

export default function MarketplacePage() {
  const [productsList, setProductsList] = useState<ArtisanProduct[]>(ARTISAN_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<CraftFilterType>("ALL");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("ALL");
  const [giOnly, setGiOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceLang, setVoiceLang] = useState<"en-IN" | "kn-IN">("en-IN");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [activeStoryProduct, setActiveStoryProduct] = useState<ArtisanProduct | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ArtisanProduct | null>(null);
  const [activePassportProduct, setActivePassportProduct] = useState<ArtisanProduct | null>(null);

  const recognitionRef = React.useRef<any>(null);
  const mediaStreamRef = React.useRef<MediaStream | null>(null);

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

  // Voice Search (Native Web Speech API with bilingual en-IN / kn-IN support)
  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    setIsListening(false);
    setInterimTranscript("");
  };

  const startListening = async (lang: "en-IN" | "kn-IN" = voiceLang) => {
    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceNotice("Voice search requires a Web Speech API browser (Chrome, Edge, or Safari).");
      return;
    }

    setVoiceNotice(null);
    setInterimTranscript("");

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = lang;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceNotice(null);
      };

      recognition.onresult = (event: any) => {
        let interim = "";
        let final = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const text = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += text;
          } else {
            interim += text;
          }
        }
        if (interim) {
          setInterimTranscript(interim);
          const liveText = interim.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
          if (liveText.length > 1) {
            setSearchQuery(liveText);
          }
        }
        if (final) {
          const cleaned = final.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
          setSearchQuery(cleaned);
          setInterimTranscript("");
        }
      };

      recognition.onerror = (e: any) => {
        console.warn("Speech recognition notice:", e.error);
        if (e.error === "no-speech") {
          setVoiceNotice("No voice detected. Please speak clearly into your microphone.");
        } else if (e.error === "not-allowed" || e.error === "permission-denied") {
          setVoiceNotice("Microphone access was denied. Please allow microphone access in your browser settings.");
        } else if (e.error !== "aborted") {
          setVoiceNotice(`Speech notice: ${e.error}. Type or click a suggestion below.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e: any) {
      console.error("Speech recognition start failed", e);
      setVoiceNotice("Could not start voice search. Please click a suggestion below or type.");
      setIsListening(false);
    }
  };

  const toggleVoiceSearch = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(voiceLang);
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
    setVoiceNotice(null);
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

      if (!q) {
        return matchesCategory && matchesDistrict && matchesGI;
      }

      // Comprehensive multi-field and bilingual matching
      const matchesSearch =
        product.title.toLowerCase().includes(q) ||
        product.kannadaTitle.toLowerCase().includes(q) ||
        product.artisanName.toLowerCase().includes(q) ||
        (product.artisanKannadaName && product.artisanKannadaName.toLowerCase().includes(q)) ||
        product.artisanCluster.toLowerCase().includes(q) ||
        product.artisanDistrict.toLowerCase().includes(q) ||
        product.craftType.toLowerCase().includes(q) ||
        product.categoryLabel.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.tags.some((t) => t.toLowerCase().includes(q)) ||
        // Kannada synonyms & phonetics
        ((q.includes("ಮಡಿಕೆ") || q.includes("ಕುಂಬಾರ") || q.includes("pot") || q.includes("clay") || q.includes("jug")) && product.craftType === "Pottery") ||
        ((q.includes("ಕಸೂತಿ") || q.includes("ಶಾಲು") || q.includes("ಸೀರೆ") || q.includes("shawl") || q.includes("sari")) && product.craftType === "Kasuti") ||
        ((q.includes("ಬುಟ್ಟಿ") || q.includes("ಬೀಡು") || q.includes("ಹುಲ್ಲು") || q.includes("basket")) && product.craftType === "Beedu") ||
        ((q.includes("ಬಿದ್ರಿ") || q.includes("ಬೆಳ್ಳಿ") || q.includes("silver") || q.includes("vase")) && product.craftType === "Bidriware") ||
        ((q.includes("ಆಟಿಕೆ") || q.includes("ಮರ") || q.includes("toy") || q.includes("horse")) && product.craftType === "Woodcraft") ||
        ((q.includes("ಸೀರೆ") || q.includes("ಕೈಮಗ್ಗ") || q.includes("ಹತ್ತಿ") || q.includes("saree") || q.includes("sari") || q.includes("handloom")) && product.craftType === "Handloom") ||
        ((q.includes("ಯಕ್ಷಗಾನ") || q.includes("ಕಿರೀಟ") || q.includes("ರಂಗ") || q.includes("crown") || q.includes("yakshagana") || q.includes("regalia")) && product.craftType === "Yakshagana");

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
                  <h4 className="text-xs font-bold text-[#2A1810]">Khanapur Terracotta</h4>
                  <p className="text-[11px] text-stone-500 mt-1">Belagavi Malaprabha riverbed pottery & urns</p>
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

          {/* Voice Search Listening Toast Indicator with Live Transcript & Bilingual Toggle */}
          {isListening && (
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-900 to-[#2A1810] text-white text-xs font-semibold space-y-2.5 shadow-lg border border-amber-700/50 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                  <div>
                    <span className="font-bold text-amber-200">
                      Listening in {voiceLang === "en-IN" ? "English (Indian)" : "ಕನ್ನಡ (Kannada)"}...
                    </span>
                    <span className="text-stone-300 ml-2 text-[11px] font-normal">
                      {interimTranscript ? (
                        <span className="text-white font-medium bg-black/30 px-2 py-0.5 rounded">
                          &quot;{interimTranscript}&quot;
                        </span>
                      ) : (
                        "Speak clearly into your mic (e.g., 'Belagavi pottery', 'Kasuti shawl', 'ಖಾನಾಪುರ')"
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const nextLang = voiceLang === "en-IN" ? "kn-IN" : "en-IN";
                      setVoiceLang(nextLang);
                      stopListening();
                      setTimeout(() => startListening(nextLang), 100);
                    }}
                    className="px-2.5 py-1 rounded bg-amber-800/80 hover:bg-amber-700 text-amber-100 text-[11px] font-bold border border-amber-600 transition-colors"
                    title="Switch voice recognition language"
                  >
                    Switch to {voiceLang === "en-IN" ? "ಕನ್ನಡ" : "English"}
                  </button>
                  <button
                    type="button"
                    onClick={stopListening}
                    className="px-2.5 py-1 rounded bg-red-700 hover:bg-red-600 text-white text-[11px] font-bold shadow-xs"
                  >
                    Done / Stop
                  </button>
                </div>
              </div>

              {/* Quick Spoken Voice Shortcuts */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-800/50 text-[11px]">
                <span className="text-amber-200/80 font-normal">Or click test phrase:</span>
                {[
                  { label: "🥻 'Udupi Saree'", query: "Udupi Saree" },
                  { label: "🎭 'Yakshagana'", query: "Yakshagana" },
                  { label: "🏺 'Khanapur Terracotta'", query: "Khanapur Terracotta" },
                  { label: "🧵 'Kasuti Silk Shawl'", query: "Kasuti Silk Shawl" },
                  { label: "✨ 'Bidriware'", query: "Bidri" },
                  { label: "📍 'Belagavi'", query: "Belagavi" },
                  { label: "🧺 'Beedu Basket'", query: "Beedu" },
                  { label: "🏺 'ಖಾನಾಪುರ ಮಡಿಕೆ'", query: "ಖಾನಾಪುರ" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item.query);
                      stopListening();
                    }}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-amber-100 text-[11px] transition-colors border border-amber-700/60"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Voice Search Error / Notice Banner */}
          {voiceNotice && !isListening && (
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 flex items-center justify-between">
              <span>⚠️ {voiceNotice}</span>
              <button
                type="button"
                onClick={() => setVoiceNotice(null)}
                className="text-stone-500 hover:text-stone-800 text-xs font-bold px-2 py-0.5"
              >
                ✕ Dismiss
              </button>
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
                { id: "Handloom", label: "Udupi Handloom (ಕೈಮಗ್ಗ ಸೀರೆ)" },
                { id: "Beedu", label: "Beedu Basketry (ಬೀಡು ಬುಟ್ಟಿ)" },
                { id: "Yakshagana", label: "Yakshagana Regalia (ಯಕ್ಷಗಾನ ಕಲೆ)" },
                { id: "Pottery", label: "Terracotta & Pottery (ಮಣ್ಣಿನ ಕಲೆ)" },
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
                { id: "Udupi", label: "Udupi" },
                { id: "Uttara Kannada", label: "Uttara Kannada" },
                { id: "Belagavi", label: "Belagavi" },
                { id: "Bidar", label: "Bidar" },
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
