"use client";

import React, { useState } from "react";
import Link from "next/link";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { ARTISAN_PRODUCTS, ArtisanProduct } from "@/lib/db/products";
import WhyThisPriceModal from "@/components/marketplace/WhyThisPriceModal";
import MockCheckoutModal from "@/components/marketplace/MockCheckoutModal";
import {
  ArrowRight,
  Info,
  Award,
  Receipt,
  ShoppingBag,
  Eye,
  HeartHandshake,
  ShieldCheck,
  ChevronRight,
  Mic,
  Gift,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const [activeStoryProduct, setActiveStoryProduct] = useState<ArtisanProduct | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ArtisanProduct | null>(null);

  const featuredShopProducts = ARTISAN_PRODUCTS.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#1F130B] text-[#FAF6F0] selection:bg-[#E67E22] selection:text-white">
      {/* ── 1. HERO SECTION (Grand Traditional Indian Craft Banner) ── */}
      <section className="relative w-full min-h-[600px] sm:min-h-[680px] flex items-center bg-[#150B05] overflow-hidden">
        {/* Full high-definition traditional craft background */}
        <div
          className="absolute inset-0 bg-cover bg-center sm:bg-right opacity-90 filter brightness-95"
          style={{
            backgroundImage: `url('/hero-crafts.jpg')`,
            backgroundPosition: "center 30%",
          }}
        />

        {/* Natural gradient vignette: deep on left for text legibility, revealing traditional craft on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120803] via-[#120803]/85 sm:via-[#120803]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F130B] via-transparent to-black/30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 z-10 w-full">
          <ScrollReveal direction="up" durationMs={800} className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-lg">
              <Award className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>ಕಲಾ ಸಮನ್ವಯ • Handcrafted in Karnataka</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF6F0] tracking-tight leading-tight">
              Handcrafted Treasures, <br />
              <span className="text-[#E67E22]">Rooted in Karnataka&apos;s Soul.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-normal">
              From the 38-hour counted-thread silk Kasuti of Dharwad to the centuries-old silver inlay of Bidar—every masterpiece is crafted by hand by rural artisan collectives, bringing living heritage directly to your home with 75% direct maker payout.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/marketplace"
                className="group px-8 py-3.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-sm shadow-xl shadow-amber-950/50 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
              >
                <span>Explore Curated Shop</span>
                <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                className="px-6 py-3.5 rounded-full border border-amber-500/60 bg-black/40 hover:bg-black/60 text-amber-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <Info className="w-4 h-4 text-[#E67E22]" />
                <span>Fair Price Promise (ಬೆಲೆ ವಿವರ)</span>
              </button>
            </div>

            {/* Traditional Trust Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-amber-900/60 text-xs text-amber-200/90">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <span>100% Handcrafted</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <span>75% Direct Maker Pay</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <span>GI Heritage Clusters</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E67E22] flex-shrink-0" />
                <span>Zero Intermediaries</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 2. VIBRANT KALAMKARI KRISHNA & PEACOCKS FOLK ART BANNER ── */}
      <FolkArtBanner variant="krishna" />

      {/* ── 3. HERITAGE IMPACT & ARTISAN HONOR BAR (Scroll Reveal Animation) ── */}
      <section className="bg-[#180E07] border-b border-amber-950/80 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delayMs={50}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-amber-900/40">
              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E67E22] block mb-1">
                  Living Traditions
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">4 Craft Clusters</div>
                <div className="text-xs text-stone-400 mt-1">Dharwad, Bidar, Belagavi & Udupi</div>
              </div>

              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                  Direct Maker Earnings
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">₹1,24,500+</div>
                <div className="text-xs text-stone-400 mt-1">Directly disbursed to artisan families</div>
              </div>

              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Fair Living Wage
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-300">75% Direct Pay</div>
                <div className="text-xs text-stone-400 mt-1">Transparent breakdown on every piece</div>
              </div>

              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                  Fair-Trade Guarantee
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Zero Middlemen</div>
                <div className="text-xs text-stone-400 mt-1">From artisan hands to your home</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. THE RURAL ARTISAN CRISIS & OUR 4-PILLAR SOLUTION (Problem vs. Solution) ── */}
      <section className="bg-[#180E07] py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-950/80">
        <div className="max-w-6xl mx-auto space-y-10">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ಸಮಸ್ಯೆ ಮತ್ತು ಪರಿಹಾರ • The Artisan Reality & Our Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why Karnataka&apos;s Artisans Need KalaSamanvaya
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-stone-300">
              Centuries-old Karnataka craft traditions are dying not from lack of artistic mastery, but because conventional trade channels exploit rural makers. Here is how we bridge the gap.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Column 1: The Broken Middleman System (The Problem) */}
            <ScrollReveal direction="right" delayMs={50} className="bg-[#24130A] rounded-2xl p-6 sm:p-8 border border-red-900/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-amber-900/30">
                <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/40 text-red-400 flex items-center justify-center font-bold">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider block">
                    The Reality Faced by Rural Artisans
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    The Broken Middleman Trap
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">70–80% Margin Lost to Intermediaries</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Artisans receive barely ₹150–₹250 for a Kasuti shawl that is resold for ₹2,500+ in urban luxury stores.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">Synthetic Machine Replicas & Counterfeits</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      4-minute synthetic powerloom prints flood city retail stalls, masquerading as 38-hour authentic handlooms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">Digital & Language Literacy Barriers</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Rural women cannot navigate complex English forms, GST portals, or typing-heavy e-commerce apps.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">Single-Maker Bulk Capacity Bottleneck</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Corporate buyers shun rural artisans for 200+ unit orders because a single illness causes order default.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Column 2: The KalaSamanvaya Model (Our Solution) */}
            <ScrollReveal direction="left" delayMs={100} className="bg-[#24130A] rounded-2xl p-6 sm:p-8 border border-emerald-900/40 shadow-xl space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-amber-900/30">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                    The KalaSamanvaya Fair-Trade Platform
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Our 4-Pillar Living Solution
                  </h3>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">75%+ Direct Payout into Artisan Accounts</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Direct fair-trade disbursements to rural women&apos;s bank accounts with zero middlemen deductions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">Transparent Cost Breakdown: &quot;Why This Price?&quot;</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Every product discloses handcraft hours, material source, and educates patrons on why true handwork is worth it.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">Kannada Voice-First Inventory Listing</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Artisans speak naturally in Kannada to register crafts—zero English, zero typing, instant cataloguing.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-stone-200 block text-sm">Multi-Cluster B2B Bulk Fulfillment Engine</strong>
                    <p className="text-stone-400 mt-0.5 leading-relaxed">
                      Pools orders of 200+ units across coordinated SHGs with automated standby buffer balancing.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 5. EXPLORE BY CRAFT TRADITION (Staggered Scroll Animation) ── */}
      <section className="wood-texture py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-950/60">
        <div className="max-w-6xl mx-auto space-y-10">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ಕರ್ನಾಟಕದ ಪರಂಪರೆ • Living Traditions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Explore Karnataka&apos;s Craft Clusters
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2.5 rounded-full" />
            <p className="text-xs sm:text-sm text-stone-300 mt-3">
              Generations of indigenous artistry preserved across regional women&apos;s collectives and family guilds.
            </p>
          </ScrollReveal>

          {/* 4 Category Cards with Staggered Scroll Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Cluster 1: Dharwad Kasuti */}
            <ScrollReveal direction="up" delayMs={0}>
              <Link
                href="/marketplace?category=Kasuti"
                className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80"
                    alt="Dharwad Kasuti Embroidery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2.5 py-1 bg-[#E67E22] text-white text-[10px] font-bold rounded-md uppercase tracking-wider shadow">
                      GI Tagged
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E67E22]" />
                      <span>Dharwad District</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                      Kasuti Handloom Silk
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      38 hours of counted-thread needlework with zero visible knots, inspired by Chalukyan temple art.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                    <span>Explore Kasuti</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Cluster 2: Bidar Bidriware */}
            <ScrollReveal direction="up" delayMs={100}>
              <Link
                href="/marketplace?category=Bidriware"
                className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80"
                    alt="Bidar Bidriware Metalwork"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2.5 py-1 bg-[#E67E22] text-white text-[10px] font-bold rounded-md uppercase tracking-wider shadow">
                      GI Tagged
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E67E22]" />
                      <span>Bidar District</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                      Bidri Silver Metalcraft
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Centuries-old blackened zinc alloy intricately inlaid with pure silver floral motifs.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                    <span>Explore Bidriware</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Cluster 3: Khanapur Terracotta */}
            <ScrollReveal direction="up" delayMs={200}>
              <Link
                href="/marketplace?category=Pottery"
                className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=600&q=80"
                    alt="Khanapur Terracotta Pottery"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2.5 py-1 bg-amber-700 text-white text-[10px] font-bold rounded-md uppercase tracking-wider shadow">
                      River Clay
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E67E22]" />
                      <span>Belagavi District</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                      Khanapur Terracotta
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Wheel-thrown natural earthenware crafted from Malaprabha riverbed clay and wood fired.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                    <span>Explore Pottery</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>

            {/* Cluster 4: Udupi Beedu Basketry */}
            <ScrollReveal direction="up" delayMs={300}>
              <Link
                href="/marketplace?category=Beedu"
                className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 hover:-translate-y-1.5 flex flex-col h-full"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80"
                    alt="Udupi Beedu Wildgrass Baskets"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2.5 py-1 bg-emerald-700 text-white text-[10px] font-bold rounded-md uppercase tracking-wider shadow">
                      Eco-Friendly
                    </span>
                  </div>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E67E22]" />
                      <span>Udupi Coastal Belt</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                      Beedu Grass Basketry
                    </h3>
                    <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                      Sun-cured riverside wildgrass plaited by coastal women&apos;s self-help groups without chemicals.
                    </p>
                  </div>
                  <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                    <span>Explore Basketry</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          </div>

          {/* Warm Artisan Voice Portal Invitation (Scroll Reveal Animation) */}
          <ScrollReveal direction="up" delayMs={150}>
            <div className="bg-[#2A170F] rounded-2xl p-6 sm:p-8 border border-amber-900/60 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-amber-700/60 transition-colors">
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 text-[#E67E22] text-xs font-bold uppercase tracking-wider">
                  <Mic className="w-4 h-4" />
                  <span>ಕುಶಲಕರ್ಮಿಗಳಿಗೆ • For Karnataka Artisans</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Speak in Kannada to List Your Craft
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                  Rural artisans don&apos;t need to type English forms. Simply describe your handicraft by voice in your mother tongue, and our platform will create your listing instantly.
                </p>
              </div>
              <Link
                href="/artisan/onboard"
                className="group px-6 py-3 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-xs shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 flex-shrink-0"
              >
                <Mic className="w-4 h-4 transition-transform group-hover:rotate-12" />
                <span>Launch Voice Portal</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 5. ROYAL ELEPHANT MURAL FOLK ART BANNER ── */}
      <FolkArtBanner variant="elephant" />

      {/* ── 6. THE STORY BEHIND EVERY CRAFT (Scroll Reveal Animation) ── */}
      <section className="bg-[#180E07] py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-950">
        <div className="max-w-6xl mx-auto space-y-10">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ಕೈಮಗ್ಗದ ಪವಿತ್ರತೆ • Why Handcrafted Matters
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Handmade With Devotion, Not Mass-Produced by Machines
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2.5 rounded-full" />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Story Text */}
            <ScrollReveal direction="left" delayMs={100} className="space-y-4 text-xs sm:text-sm text-stone-300 leading-relaxed">
              <p>
                In a world inundated with synthetic machine replicas, each piece at <strong>KalaSamanvaya</strong> preserves the soul, heritage, and generational knowledge of Karnataka&apos;s village craft traditions.
              </p>
              <p>
                Take a traditional Dharwad Kasuti silk shawl—it requires over <strong>38 hours of painstaking needlework</strong> without tracing, counting every warp and weft thread individually so both sides look identical with zero visible knots. A powerloom prints a synthetic replica in under 4 minutes.
              </p>
              <p>
                When you choose authentic handlooms over powerloom imitations, you are directly paying fair wages to rural women, sustaining village households, and preventing these century-old art forms from fading away.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs font-semibold text-amber-200">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#24130A] border border-amber-900/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>38 Hours Handwork vs 4m Machine</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#24130A] border border-amber-900/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>75% Direct Maker Payout</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#24130A] border border-amber-900/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Pure Silk, Bamboo & River Clay</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#24130A] border border-amber-900/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Zero Middlemen Commission</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                  className="px-6 py-3 rounded-full border border-amber-500/60 bg-amber-950/40 hover:bg-amber-950/80 text-amber-200 font-bold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <Receipt className="w-4 h-4 text-[#E67E22]" />
                  <span>See Honest Cost & Wage Breakdown (ಬೆಲೆ ವಿವರ)</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Showcase Visual with Scroll Reveal */}
            <ScrollReveal direction="right" delayMs={100} className="rounded-2xl overflow-hidden border-2 border-amber-900/50 shadow-2xl bg-[#24130A] p-2.5 group">
              <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                <img
                  src="/hero-crafts.jpg"
                  alt="Traditional Handcrafted Karnataka Treasures"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-bold text-amber-300 text-sm block">Generations of Craftsmanship</span>
                  <p className="text-[11px] text-stone-300 mt-0.5">
                    Mysore inlay craft, sandalwood jali carving, and hand-beaten temple brassware.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── 7. GOLDEN OCHRE MITHILA / MADHUBANI FOLK ART BANNER ── */}
      <FolkArtBanner variant="madhubani" />

      {/* ── 8. OUR SHOP (Scroll Reveal Product Cards) ── */}
      <section className="wood-texture py-20 px-4 sm:px-6 lg:px-8 border-y border-amber-950/60">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Centered Heading */}
          <ScrollReveal direction="up" className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ವಿಶೇಷ ಕಲಾಕೃತಿಗಳು • Curated Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-wide mt-1">
              Our Shop
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2.5 rounded-full" />
            <p className="text-xs text-stone-300 mt-2">
              Karnataka Handcrafted Masterpieces • Direct from Rural Artisan Collectives
            </p>
          </ScrollReveal>

          {/* Product Cards Row with Staggered Scroll Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredShopProducts.map((product, idx) => (
              <ScrollReveal key={product.id} direction="up" delayMs={idx * 100}>
                <div className="group bg-[#2A1810] rounded-xl overflow-hidden border border-amber-900/40 shadow-lg flex flex-col justify-between hover:border-[#E67E22]/60 hover:-translate-y-1.5 transition-all duration-300 h-full">
                  {/* Image Container with Orange Ribbon */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Ribbon Badge */}
                    <div className="absolute top-0 left-0">
                      <span className="inline-block px-3 py-1 bg-[#E67E22] text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        {idx === 0 ? "New Arrival" : "EXCLUSIVE PRODUCT"}
                      </span>
                    </div>

                    {/* Quick View Hover Button */}
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
                      <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
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

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setActiveStoryProduct(product)}
                          title="Why This Price?"
                          className="p-1.5 rounded-lg border border-amber-700/50 hover:bg-amber-900/40 text-amber-300 text-xs transition-colors hover:scale-105"
                        >
                          <Info className="w-3.5 h-3.5 text-[#E67E22]" />
                        </button>

                        <button
                          onClick={() => setActiveCheckoutProduct(product)}
                          className="px-3 py-1.5 rounded-lg bg-[#E67E22] hover:bg-[#cf6d17] active:scale-95 text-white text-xs font-semibold transition-all flex items-center gap-1 shadow-sm"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          <span>Buy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* View Entire Collection Link */}
          <ScrollReveal direction="up" delayMs={150} className="text-center pt-4">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-amber-600/60 hover:bg-[#2A1810] text-amber-200 font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 hover:scale-105"
            >
              <span>Explore All Products in Storefront</span>
              <ArrowRight className="w-4 h-4 text-[#E67E22]" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 9. TRIBAL WARLI FOLK ART CELEBRATION STRIP ── */}
      <FolkArtBanner variant="warli" />

      {/* ── 10. BESPOKE & CORPORATE BULK GIFTING (Scroll Reveal Animation) ── */}
      <section className="bg-[#180E07] py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-950">
        <ScrollReveal direction="up" className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-[#E67E22]" />
            <span>ಸಾಂಸ್ಥಿಕ ಉಡುಗೊರೆಗಳು • Handcrafted Bulk Gifting</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
            Looking for Custom Handloom or Corporate Bulk Gifting?
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Celebrate festive occasions, conferences, and milestone moments with authentic Karnataka handicraft hampers. We coordinate directly with rural women&apos;s self-help groups and artisan cooperatives across Karnataka to fulfill custom bulk orders with guaranteed delivery timelines and zero quality compromise.
          </p>

          <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
            <Link
              href="/b2b"
              className="px-8 py-3.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Inquire for Corporate Gifting</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/marketplace"
              className="px-6 py-3.5 rounded-full border border-amber-500/60 bg-white/5 hover:bg-white/10 text-amber-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              <span>Browse Catalog</span>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── 11. TRADITIONAL GOLDEN FOLK ART FOOTER BORDER ── */}
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
