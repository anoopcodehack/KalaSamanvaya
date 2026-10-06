"use client";

import React, { useState } from "react";
import Link from "next/link";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import TiltCard from "@/components/shared/TiltCard";
import { ARTISAN_PRODUCTS, ArtisanProduct } from "@/lib/db/products";
import WhyThisPriceModal from "@/components/marketplace/WhyThisPriceModal";
import MockCheckoutModal from "@/components/marketplace/MockCheckoutModal";
import CraftPassportModal from "@/components/marketplace/CraftPassportModal";
import FairWageShieldModal from "@/components/marketplace/FairWageShieldModal";
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
  Building2,
  Users,
  QrCode,
  Scale,
} from "lucide-react";

export default function HomePage() {
  const [activeStoryProduct, setActiveStoryProduct] = useState<ArtisanProduct | null>(null);
  const [activeCheckoutProduct, setActiveCheckoutProduct] = useState<ArtisanProduct | null>(null);
  const [activePassportProduct, setActivePassportProduct] = useState<ArtisanProduct | null>(null);
  const [activeFairWageProduct, setActiveFairWageProduct] = useState<ArtisanProduct | null>(null);

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

              <button
                onClick={() => setActivePassportProduct(ARTISAN_PRODUCTS[0])}
                className="px-6 py-3.5 rounded-full border border-amber-500/60 bg-amber-950/50 hover:bg-amber-900/60 text-amber-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <QrCode className="w-4 h-4 text-[#E67E22]" />
                <span>GI Craft Passport (QR & ಧ್ವನಿ)</span>
              </button>

              <button
                onClick={() => setActiveFairWageProduct(ARTISAN_PRODUCTS[0])}
                className="px-6 py-3.5 rounded-full border border-emerald-500/60 bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2 backdrop-blur-sm"
              >
                <Scale className="w-4 h-4 text-emerald-400" />
                <span>Fair-Wage Shield (ಕೂಲಿ ರಕ್ಷಕ)</span>
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

      {/* ── 3. HERITAGE IMPACT & ARTISAN HONOR BAR (Warm Authentic Craft Strip) ── */}
      <section className="bg-[#20120A] border-b border-amber-950/80 py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal direction="up" delayMs={50}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-amber-900/30">
              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E67E22] block mb-1">
                  Living Traditions
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">4 Craft Clusters</div>
                <div className="text-xs text-stone-300 mt-1">Dharwad, Bidar, Belagavi & Udupi</div>
              </div>

              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Direct Maker Share
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">75%+ Direct Pay</div>
                <div className="text-xs text-stone-300 mt-1">Fair wages direct to artisan accounts</div>
              </div>

              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#E67E22] block mb-1">
                  GI Heritage Certified
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">100% Handcrafted</div>
                <div className="text-xs text-stone-300 mt-1">Zero synthetic powerloom replicas</div>
              </div>

              <div className="pt-2 lg:pt-0">
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Direct Market Access
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Zero Middlemen</div>
                <div className="text-xs text-stone-300 mt-1">From artisan hands to conscious patrons</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. OUR FAIR-TRADE CRAFT COMMITMENT (Authentic Heritage Narrative & Model) ── */}
      <section className="bg-[#1A0E08] py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-950/80">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ನಮ್ಮ ಧ್ಯೇಯ • Our Fair-Trade Craft Commitment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
              Direct from Artisan Hands: Preserving Karnataka&apos;s Living Arts
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2 rounded-full" />
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed pt-2">
              Centuries-old Karnataka craft traditions are dying not from lack of artistic mastery, but because conventional trade intermediaries extract 80% margins and sell machine counterfeits. Here is how KalaSamanvaya restores dignity, transparency, and sustainable livelihoods to rural master makers.
            </p>
          </ScrollReveal>

          {/* 4 Cultural Heritage & Fair-Trade Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            
            {/* Pillar 1: Fair Wages */}
            <ScrollReveal direction="up" delayMs={50} className="bg-[#24130A] rounded-2xl p-6 sm:p-7 border border-amber-900/40 shadow-xl hover:border-[#E67E22]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-amber-900/40 border border-amber-700/40 text-[#E67E22] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Receipt className="w-5 h-5 text-[#E67E22]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    75%+ Direct Wage
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    Eliminating the 80% Middleman Margin
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    In conventional trade, rural Kasuti and Beedu crafters receive barely ₹150–₹250 for works resold at ₹2,500+ in urban luxury boutiques.
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-900/30 space-y-2 text-xs">
                  <div className="text-stone-300 flex items-start gap-2">
                    <span className="text-[#E67E22] font-bold">The Solution:</span>
                    <span>Direct digital wage disbursements into rural women&apos;s bank accounts with zero broker cuts.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-900/30">
                <Link
                  href="/impact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E67E22] hover:text-amber-200 transition-colors"
                >
                  <span>Simulate 75% Fair-Trade &amp; 8% Platform Model</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Pillar 2: Provenance & GI Protection */}
            <ScrollReveal direction="up" delayMs={100} className="bg-[#24130A] rounded-2xl p-6 sm:p-7 border border-amber-900/40 shadow-xl hover:border-[#E67E22]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-amber-900/40 border border-amber-700/40 text-[#E67E22] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5 text-[#E67E22]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    GI Authenticity
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    Protecting 38-Hour Handwork from Machine Counterfeits
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    Cheap 4-minute synthetic powerloom prints flood city stalls, misleading buyers and driving authentic hand-stitch traditions to extinction.
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-900/30 space-y-2 text-xs">
                  <div className="text-stone-300 flex items-start gap-2">
                    <span className="text-[#E67E22] font-bold">The Solution:</span>
                    <span>Every piece features verified GI cluster provenance, artisan biographies, and stitch-level authenticity cards.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-900/30">
                <Link
                  href="/marketplace"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E67E22] hover:text-amber-200 transition-colors"
                >
                  <span>Explore certified craft stories</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Pillar 3: Voice Onboarding */}
            <ScrollReveal direction="up" delayMs={150} className="bg-[#24130A] rounded-2xl p-6 sm:p-7 border border-amber-900/40 shadow-xl hover:border-[#E67E22]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-amber-900/40 border border-amber-700/40 text-[#E67E22] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mic className="w-5 h-5 text-[#E67E22]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    Voice Inclusion
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    Breaking English & Digital Form Barriers
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    Rural women crafters cannot navigate complex English e-commerce forms, multi-step portals, or typing-heavy software.
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-900/30 space-y-2 text-xs">
                  <div className="text-stone-300 flex items-start gap-2">
                    <span className="text-[#E67E22] font-bold">The Solution:</span>
                    <span>Spoken Kannada voice technology parses spoken audio into verified product catalog entries—zero typing required.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-900/30">
                <Link
                  href="/artisan/onboard"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E67E22] hover:text-amber-200 transition-colors"
                >
                  <span>Experience Kannada Voice Portal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Pillar 4: B2B Multi-Cluster Fulfilment */}
            <ScrollReveal direction="up" delayMs={200} className="bg-[#24130A] rounded-2xl p-6 sm:p-7 border border-amber-900/40 shadow-xl hover:border-[#E67E22]/60 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-amber-900/40 border border-amber-700/40 text-[#E67E22] flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5 text-[#E67E22]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                    Multi-Cluster Scale
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-200 transition-colors">
                    Coordinated 200+ Unit Corporate Fulfilment
                  </h3>
                  <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                    Corporate gifting buyers avoid rural artisans because a single artisan&apos;s illness or material shortage can cause order default.
                  </p>
                </div>

                <div className="pt-3 border-t border-amber-900/30 space-y-2 text-xs">
                  <div className="text-stone-300 flex items-start gap-2">
                    <span className="text-[#E67E22] font-bold">The Solution:</span>
                    <span>Our multi-cluster coordination engine divides bulk quotas across self-help groups with automated standby cluster balancing.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-amber-900/30">
                <Link
                  href="/b2b"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E67E22] hover:text-amber-200 transition-colors"
                >
                  <span>Open B2B Fulfillment Console</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
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

          {/* 5 Authentic Karnataka Craft Cluster Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {/* Cluster 1: Dharwad Kasuti */}
            <ScrollReveal direction="up" delayMs={0}>
              <TiltCard className="h-full">
                <Link
                  href="/marketplace?category=Kasuti"
                  className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src="/assets/craft-kasuti.jpg"
                      alt="Dharwad Kasuti Embroidery Handloom"
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
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E67E22]" />
                          <span className="group-hover:hidden">Dharwad District</span>
                          <span className="hidden group-hover:inline text-amber-300">ಧಾರವಾಡ ಜಿಲ್ಲೆ</span>
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-stone-400 group-hover:text-amber-300 transition-colors">
                          <span className="group-hover:hidden">Hover for ಕನ್ನಡ</span>
                          <span className="hidden group-hover:inline text-[#E67E22] font-bold">ಕನ್ನಡ</span>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                        <span className="group-hover:hidden">Kasuti Handloom Silk</span>
                        <span className="hidden group-hover:inline text-amber-200 font-serif font-bold">ಕಸೂತಿ ಕೈಮಗ್ಗ ರೇಷ್ಮೆ ಕಲೆ</span>
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        <span className="group-hover:hidden">38 hours of counted-thread needlework with zero visible knots, inspired by Chalukyan temple art.</span>
                        <span className="hidden group-hover:inline text-amber-100/90 font-serif">ಚಾಲುಕ್ಯರ ದೇವಾಲಯದ ಕಲೆಯ ಸ್ಪೂರ್ತಿ, ಗಂಟುಗಳಿಲ್ಲದ ೩೮ ಗಂಟೆಗಳ ಸೂಕ್ಷ್ಮ ಸೂಜಿಯ ಕೈಕೆಲಸ.</span>
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                      <span className="group-hover:hidden">Explore Kasuti</span>
                      <span className="hidden group-hover:inline text-amber-300">ಕಸೂತಿ ಅನ್ವೇಷಿಸಿ</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>

            {/* Cluster 2: Bidar Bidriware */}
            <ScrollReveal direction="up" delayMs={80}>
              <TiltCard className="h-full">
                <Link
                  href="/marketplace?category=Bidriware"
                  className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src="/assets/craft-bidri.jpg"
                      alt="Bidar Bidriware Pure Silver Inlay"
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
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E67E22]" />
                          <span className="group-hover:hidden">Bidar District</span>
                          <span className="hidden group-hover:inline text-amber-300">ಬೀದರ್ ಜಿಲ್ಲೆ</span>
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-stone-400 group-hover:text-amber-300 transition-colors">
                          <span className="group-hover:hidden">Hover for ಕನ್ನಡ</span>
                          <span className="hidden group-hover:inline text-[#E67E22] font-bold">ಕನ್ನಡ</span>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                        <span className="group-hover:hidden">Bidri Silver Metalcraft</span>
                        <span className="hidden group-hover:inline text-amber-200 font-serif font-bold">ಬಿದ್ರಿ ಬೆಳ್ಳಿ ಕೆತ್ತನೆ ಕಲೆ</span>
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        <span className="group-hover:hidden">Centuries-old blackened zinc alloy intricately inlaid with pure silver floral motifs.</span>
                        <span className="hidden group-hover:inline text-amber-100/90 font-serif">ಶುದ್ಧ ಬೆಳ್ಳಿಯ ತಂತಿಯಿಂದ ಕಪ್ಪು ಮಿಶ್ರಲೋಹದ ಮೇಲೆ ಕೆತ್ತಲಾದ ಶತಮಾನಗಳ ಐತಿಹಾಸಿಕ ಕಲೆ.</span>
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                      <span className="group-hover:hidden">Explore Bidriware</span>
                      <span className="hidden group-hover:inline text-amber-300">ಬಿದ್ರಿ ಕಲೆ ಅನ್ವೇಷಿಸಿ</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>

            {/* Cluster 3: Khanapur Terracotta */}
            <ScrollReveal direction="up" delayMs={160}>
              <TiltCard className="h-full">
                <Link
                  href="/marketplace?category=Pottery"
                  className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src="/assets/craft-pottery.jpg"
                      alt="Khanapur Terracotta River Clay Pottery"
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
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E67E22]" />
                          <span className="group-hover:hidden">Belagavi District</span>
                          <span className="hidden group-hover:inline text-amber-300">ಬೆಳಗಾವಿ ಜಿಲ್ಲೆ</span>
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-stone-400 group-hover:text-amber-300 transition-colors">
                          <span className="group-hover:hidden">Hover for ಕನ್ನಡ</span>
                          <span className="hidden group-hover:inline text-[#E67E22] font-bold">ಕನ್ನಡ</span>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                        <span className="group-hover:hidden">Khanapur Terracotta</span>
                        <span className="hidden group-hover:inline text-amber-200 font-serif font-bold">ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ ಮಣ್ಣಿನ ಕಲೆ</span>
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        <span className="group-hover:hidden">Wheel-thrown natural earthenware crafted from Malaprabha riverbed clay and wood fired.</span>
                        <span className="hidden group-hover:inline text-amber-100/90 font-serif">ಮಲಪ್ರಭಾ ನದಿಯ ಕೆಂಪು ಜೇಡಿಮಣ್ಣಿನಿಂದ ಚಕ್ರದ ಮೇಲೆ ನೈಸರ್ಗಿಕವಾಗಿ ತಯಾರಿಸಿದ ಕುಂಬಾರಿಕೆ.</span>
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                      <span className="group-hover:hidden">Explore Pottery</span>
                      <span className="hidden group-hover:inline text-amber-300">ಕುಂಬಾರಿಕೆ ಅನ್ವೇಷಿಸಿ</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>

            {/* Cluster 4: Udupi Beedu Basketry */}
            <ScrollReveal direction="up" delayMs={240}>
              <TiltCard className="h-full">
                <Link
                  href="/marketplace?category=Beedu"
                  className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src="/assets/craft-beedu.jpg"
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
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E67E22]" />
                          <span className="group-hover:hidden">Udupi Coastal Belt</span>
                          <span className="hidden group-hover:inline text-amber-300">ಉಡುಪಿ ಕರಾವಳಿ</span>
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-stone-400 group-hover:text-amber-300 transition-colors">
                          <span className="group-hover:hidden">Hover for ಕನ್ನಡ</span>
                          <span className="hidden group-hover:inline text-[#E67E22] font-bold">ಕನ್ನಡ</span>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                        <span className="group-hover:hidden">Beedu Grass Basketry</span>
                        <span className="hidden group-hover:inline text-amber-200 font-serif font-bold">ಬೀಡು ನೈಸರ್ಗಿಕ ಹುಲ್ಲಿನ ಬುಟ್ಟಿ</span>
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        <span className="group-hover:hidden">Sun-cured riverside wildgrass plaited by coastal women&apos;s self-help groups without chemicals.</span>
                        <span className="hidden group-hover:inline text-amber-100/90 font-serif">ಕರಾವಳಿ ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳಿಂದ ರಾಸಾಯನಿಕವಿಲ್ಲದೆ ಹೆಣೆದ ನೈಸರ್ಗಿಕ ಹುಲ್ಲಿನ ಬುಟ್ಟಿ.</span>
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                      <span className="group-hover:hidden">Explore Basketry</span>
                      <span className="hidden group-hover:inline text-amber-300">ಬುಟ್ಟಿ ಹೆಣಿಗೆ ಅನ್ವೇಷಿಸಿ</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>

            {/* Cluster 5: Channapatna Lacquer Woodcraft */}
            <ScrollReveal direction="up" delayMs={320}>
              <TiltCard className="h-full">
                <Link
                  href="/marketplace?category=Woodcraft"
                  className="group bg-[#24130A] rounded-2xl overflow-hidden border border-amber-900/50 shadow-lg hover:border-[#E67E22]/80 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src="/assets/craft-channapatna.jpg"
                      alt="Channapatna Wooden Toys and Lacquerware"
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
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#E67E22]" />
                          <span className="group-hover:hidden">Ramanagara District</span>
                          <span className="hidden group-hover:inline text-amber-300">ರಾಮನಗರ ಜಿಲ್ಲೆ</span>
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-950/70 border border-amber-800/40 text-stone-400 group-hover:text-amber-300 transition-colors">
                          <span className="group-hover:hidden">Hover for ಕನ್ನಡ</span>
                          <span className="hidden group-hover:inline text-[#E67E22] font-bold">ಕನ್ನಡ</span>
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-[#E67E22] transition-colors">
                        <span className="group-hover:hidden">Channapatna Toys</span>
                        <span className="hidden group-hover:inline text-amber-200 font-serif font-bold">ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ</span>
                      </h3>
                      <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                        <span className="group-hover:hidden">Non-toxic ivory wood lacquerware hand-turned with natural turmeric & kumkum vegetable dyes.</span>
                        <span className="hidden group-hover:inline text-amber-100/90 font-serif">ನೈಸರ್ಗಿಕ ಅರಿಶಿನ, ಕುಂಕುಮ ಮತ್ತು ಆಲೆಮರದಿಂದ ಮಾಡಿದ ವಿಷಮುಕ್ತ ಮರದ ಆಟಿಕೆಗಳು.</span>
                      </p>
                    </div>
                    <div className="pt-2 border-t border-amber-900/40 text-xs font-semibold text-[#E67E22] flex items-center justify-between">
                      <span className="group-hover:hidden">Explore Woodcraft</span>
                      <span className="hidden group-hover:inline text-amber-300">ಮರದ ಆಟಿಕೆ ಅನ್ವೇಷಿಸಿ</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
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

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveStoryProduct(ARTISAN_PRODUCTS[0])}
                  className="px-6 py-3 rounded-full border border-amber-500/60 bg-amber-950/40 hover:bg-amber-950/80 text-amber-200 font-bold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <Receipt className="w-4 h-4 text-[#E67E22]" />
                  <span>See Honest Cost & Wage Breakdown (ಬೆಲೆ ವಿವರ)</span>
                </button>

                <button
                  onClick={() => setActivePassportProduct(ARTISAN_PRODUCTS[0])}
                  className="px-6 py-3 rounded-full border border-amber-500/60 bg-amber-900/50 hover:bg-amber-800/60 text-amber-200 font-bold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
                >
                  <QrCode className="w-4 h-4 text-[#E67E22]" />
                  <span>GI Passport & Voice Blessing (ಪ್ರಮಾಣಪತ್ರ)</span>
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
                <TiltCard className="h-full">
                  <div className="group bg-[#2A1810] rounded-xl overflow-hidden border border-amber-900/40 shadow-lg flex flex-col justify-between hover:border-[#E67E22]/60 transition-all duration-300 h-full">
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
                          <span className="group-hover:hidden">{idx === 0 ? "New Arrival" : "EXCLUSIVE PRODUCT"}</span>
                          <span className="hidden group-hover:inline">{idx === 0 ? "ಹೊಸ ಕಲಾಕೃತಿ" : "ವಿಶೇಷ ಕಲಾಕೃತಿ"}</span>
                        </span>
                      </div>

                      {/* Quick View Hover Button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => setActiveStoryProduct(product)}
                          className="px-4 py-2 rounded-md bg-white/90 backdrop-blur-sm text-stone-900 font-bold text-xs shadow-lg hover:bg-white flex items-center gap-1.5 transition-transform hover:scale-105"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#E67E22]" />
                          <span>ವಿವರ ನೋಡಿ (View Story)</span>
                        </button>
                      </div>
                    </div>

                    {/* Card Bottom Content */}
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[9px] text-stone-400 mb-1">
                          <span className="group-hover:hidden font-mono uppercase tracking-wider text-amber-400/90">{product.craftType}</span>
                          <span className="hidden group-hover:inline font-bold text-amber-300 font-serif">{product.categoryLabel}</span>
                          <span className="px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-800/40 text-[9px] text-stone-400 group-hover:text-amber-300 transition-colors">
                            <span className="group-hover:hidden">Hover for ಕನ್ನಡ</span>
                            <span className="hidden group-hover:inline text-[#E67E22] font-bold">ಕನ್ನಡ</span>
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-[#E67E22] transition-colors">
                          <span className="group-hover:hidden">{product.title}</span>
                          <span className="hidden group-hover:inline text-amber-200 font-serif font-bold">{product.kannadaTitle || product.title}</span>
                        </h3>
                        <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                          <span className="group-hover:hidden">By {product.artisanName} • {product.artisanCluster}</span>
                          <span className="hidden group-hover:inline text-amber-300/90 font-serif">ಕುಶಲಕರ್ಮಿ: {product.artisanKannadaName || product.artisanName} • {product.artisanDistrict}</span>
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
                            onClick={() => setActivePassportProduct(product)}
                            title="GI Craft Passport & Scannable QR (ಪ್ರಮಾಣಪತ್ರ)"
                            className="p-1.5 rounded-lg border border-amber-700/50 hover:bg-amber-900/40 text-amber-300 text-xs transition-colors hover:scale-105"
                          >
                            <QrCode className="w-3.5 h-3.5 text-amber-300" />
                          </button>

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
                            <span className="group-hover:hidden">Buy</span>
                            <span className="hidden group-hover:inline font-bold">ಖರೀದಿಸಿ</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
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

      {/* ── 9. TRADITIONAL FOLK ART CELEBRATION STRIP ── */}
      <FolkArtBanner variant="madhubani" />

      {/* ── 10. BESPOKE & CORPORATE BULK GIFTING (Traditional Karnataka Handloom Backdrop) ── */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-amber-950 overflow-hidden bg-[#180E07]">
        {/* Authentic Karnataka Handloom & Kasuti Heritage Background - Bright & Clearly Visible */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-100 contrast-105 transition-transform duration-1000"
          style={{
            backgroundImage: "url('/assets/karnataka-craft-bg.jpg')",
            backgroundPosition: "center 45%",
          }}
        />
        {/* Soft subtle tint so the gorgeous golden zari & terracotta silk are clearly visible */}
        <div className="absolute inset-0 bg-black/35" />

        <ScrollReveal direction="up" className="relative z-10 max-w-4xl mx-auto">
          <div className="bg-[#180E07]/85 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-amber-500/50 shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/90 border border-amber-500/60 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-lg">
              <Gift className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>ಸಾಂಸ್ಥಿಕ ಉಡುಗೊರೆಗಳು • Handcrafted Bulk Gifting</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide">
              Looking for Custom Handloom or Corporate Bulk Gifting?
            </h2>

            <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
              Celebrate festive occasions, conferences, and milestone moments with authentic Karnataka handicraft hampers. We coordinate directly with rural women&apos;s self-help groups and artisan cooperatives across Karnataka to fulfill custom bulk orders with guaranteed delivery timelines and zero quality compromise.
            </p>

            <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
              <Link
                href="/b2b"
                className="px-8 py-3.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-sm shadow-xl shadow-amber-950/50 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 inline-flex items-center gap-2"
              >
                <span>Inquire for Corporate Gifting</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/marketplace"
                className="px-6 py-3.5 rounded-full border border-amber-500/70 bg-black/40 hover:bg-black/60 text-amber-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm shadow-md"
              >
                <span>Browse Catalog</span>
              </Link>
            </div>
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

      <CraftPassportModal
        product={activePassportProduct}
        isOpen={Boolean(activePassportProduct)}
        onClose={() => setActivePassportProduct(null)}
      />

      <FairWageShieldModal
        product={activeFairWageProduct}
        isOpen={Boolean(activeFairWageProduct)}
        onClose={() => setActiveFairWageProduct(null)}
        onProceedToCheckout={(p) => setActiveCheckoutProduct(p)}
      />
    </div>
  );
}
