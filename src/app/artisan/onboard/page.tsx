"use client";

import React, { useState } from "react";
import KannadaVoiceRecorder from "@/components/voice/KannadaVoiceRecorder";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import { ExtractedCraftListing } from "@/lib/voice/kannadaKeywords";
import {
  Sparkles,
  CheckCircle2,
  Package,
  Clock,
  Layers,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Plus,
  Minus,
  RefreshCw,
  UserCheck
} from "lucide-react";
import Link from "next/link";

export default function ArtisanOnboardPage() {
  const [language, setLanguage] = useState<"kn" | "en">("kn");
  const [artisanName, setArtisanName] = useState("ಸವಿತಾ ನಾಯ್ಕ್ (Savita Naik)");
  const [clusterRegion, setClusterRegion] = useState("ಧಾರವಾಡ ಕಸೂತಿ ಸಂಘ (Dharwad Cluster)");

  // Extracted craft listing state
  const [listing, setListing] = useState<ExtractedCraftListing>({
    craft: "Kasuti",
    craftKannada: "ಕಸೂತಿ ಕಲೆ",
    itemName: "Dharwad Heritage Kasuti Silk Shawl",
    quantity: 80,
    pricePerUnitINR: 600,
    totalValueINR: 48000,
    material: "100% Pure Mulberry Silk Thread & Handloom Khadi Cotton",
    leadTimeDays: 15,
    rawTranscript: "ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಒಂದಕ್ಕೆ 600 ರೂಪಾಯಿ, 15 ದಿನಗಳಲ್ಲಿ ನೀಡುತ್ತೇನೆ",
    confidence: 0.94
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Touch adjustment handlers (Zero typing needed!)
  const updateQuantity = (delta: number) => {
    setListing((prev) => {
      const newQty = Math.max(5, prev.quantity + delta);
      return {
        ...prev,
        quantity: newQty,
        totalValueINR: newQty * prev.pricePerUnitINR
      };
    });
  };

  const updatePrice = (delta: number) => {
    setListing((prev) => {
      const newPrice = Math.max(100, prev.pricePerUnitINR + delta);
      return {
        ...prev,
        pricePerUnitINR: newPrice,
        totalValueINR: prev.quantity * newPrice
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `${clusterRegion} Handcrafted ${listing.craft}`,
          kannadaTitle: `${clusterRegion} ಕೈಯಿಂದ ಮಾಡಿದ ${listing.craftKannada}`,
          craftType: listing.craft,
          priceINR: listing.pricePerUnitINR,
          quantity: listing.quantity,
          artisanName,
          artisanKannadaName: language === "kn" ? "ಶಾಂತವ್ವ ಹೊಸಮನಿ" : artisanName,
          artisanCluster: clusterRegion,
          artisanDistrict: "Dharwad",
          leadTimeDays: listing.leadTimeDays,
        }),
      });
    } catch (err) {
      console.error("Failed to persist product to backend", err);
    } finally {
      setIsPublishing(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#1F130B] text-[#FAF6F0] selection:bg-[#E67E22] selection:text-white">
      {/* ── HEADER BANNER ── */}
      <section className="bg-[#150B05] pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-amber-950">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>{language === "kn" ? "ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳ ವೇದಿಕೆ" : "Rural Artisan Voice Listing Portal"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {language === "kn" ? "ಕನ್ನಡ ಧ್ವನಿ ಆಧಾರಿತ ಸರಕು ನೊಂದಣಿ" : "Kannada Voice-Assisted Inventory Listing"}
            </h1>
            <p className="text-xs text-amber-200/80">
              {language === "kn"
                ? "ಟೈಪ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ • ಮಾತನಾಡಿ, ಪರಿಶೀಲಿಸಿ, ನೇರವಾಗಿ ಪ್ರಕಟಿಸಿ"
                : "Zero typing friction • Speak in Kannada, review high-contrast cards, and publish"}
            </p>
          </div>

          {/* Vernacular Language Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#2A1810] rounded-xl border border-amber-800/60 self-start sm:self-auto">
            <button
              onClick={() => setLanguage("kn")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === "kn"
                  ? "bg-[#E67E22] text-white shadow-md"
                  : "text-amber-200 hover:text-white"
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                language === "en"
                  ? "bg-[#E67E22] text-white shadow-md"
                  : "text-amber-200 hover:text-white"
              }`}
            >
              English
            </button>
          </div>
        </div>
      </section>

      {/* Decorative Tribal Warli Folk Art Strip */}
      <FolkArtBanner variant="warli" />

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Artisan Profile Card */}
        <div className="bg-[#2A1810] p-4 sm:p-5 rounded-2xl border border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E67E22] to-[#C85A32] text-white flex items-center justify-center font-bold text-lg shadow-md">
              ಸ
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                <span>{artisanName}</span>
                <UserCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-amber-200/70 text-[11px]">{clusterRegion}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-600/40">
              {language === "kn" ? "ಪರಿಶೀಲಿತ ಸದಸ್ಯೆ" : "Verified Maker"}
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-600/40">
              GI Dharwad Application #85
            </span>
          </div>
        </div>

        {isSubmitted ? (
          /* ── SUCCESS REGISTRATION STATE ── */
          <div className="bg-[#2A1810] p-8 sm:p-12 rounded-3xl border border-emerald-500/40 shadow-2xl text-center space-y-6 animate-fadeIn">
            <div className="w-20 h-20 bg-emerald-900/60 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-400 shadow-xl">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                {language === "kn" ? "ಸರಕು ಯಶಸ್ವಿಯಾಗಿ ನೊಂದಾಯಿಸಲಾಗಿದೆ!" : "Inventory Registered Successfully!"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {listing.quantity} {listing.craftKannada} {language === "kn" ? "ಕ್ಲಸ್ಟರ್ ಸಂಗ್ರಹಕ್ಕೆ ಸೇರಿಸಲಾಗಿದೆ" : "Units Active in Cluster"}
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
                {language === "kn"
                  ? "ನಿಮ್ಮ ಸರಕು ಈಗ ಬಿ2ಬಿ ಬೃಹತ್ ಪೂರೈಕೆ ಮತ್ತು ನೇರ ಮಾರಾಟ ಮಳಿಗೆಯಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿದೆ."
                  : "Your units are now registered in the Dharwad cluster pool for B2B enterprise allocation and retail showcase."}
              </p>
            </div>

            {/* Registered Batch Summary */}
            <div className="bg-[#1F130B] p-5 rounded-2xl border border-amber-900/60 max-w-md mx-auto text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-amber-900/40">
                <span className="text-stone-400">{language === "kn" ? "ಕುಶಲಕರ್ಮಿ:" : "Artisan:"}</span>
                <span className="font-bold text-white">{artisanName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-amber-900/40">
                <span className="text-stone-400">{language === "kn" ? "ಕರಕುಶಲ ಪ್ರಕಾರ:" : "Craft Type:"}</span>
                <span className="font-bold text-[#E67E22]">{listing.craft} ({listing.craftKannada})</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-amber-900/40">
                <span className="text-stone-400">{language === "kn" ? "ಒಟ್ಟು ಯೂನಿಟ್‌ಗಳು:" : "Registered Quantity:"}</span>
                <span className="font-bold text-white">{listing.quantity} units</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-amber-900/40">
                <span className="text-stone-400">{language === "kn" ? "ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆ:" : "Unit Price:"}</span>
                <span className="font-bold text-amber-300">₹{listing.pricePerUnitINR}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">{language === "kn" ? "ನಿರೀಕ್ಷಿತ ಒಟ್ಟು ಆದಾಯ:" : "Total Expected Inflow:"}</span>
                <span className="font-bold text-emerald-400 text-sm">₹{listing.totalValueINR.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Next Action Gateways */}
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/b2b"
                className="px-6 py-3 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>{language === "kn" ? "ಬಿ2ಬಿ ಹಂಚಿಕೆ ಕನ್ಸೋಲ್ ಪರಿಶೀಲಿಸಿ" : "View B2B Allocation Console"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 rounded-full border border-amber-400/40 hover:bg-white/10 text-amber-200 font-semibold text-xs transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{language === "kn" ? "ಇನ್ನೊಂದು ಸರಕು ನೊಂದಾಯಿಸಿ" : "List Another Batch"}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ── MAIN ONBOARDING FLOW ── */
          <div className="space-y-8">
            
            {/* Step 1: Kannada Voice Input Recorder */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-[#E67E22] text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <h3 className="text-base font-bold text-white">
                  {language === "kn" ? "ಹಂತ ೧: ಧ್ವನಿ ಇನ್‌ಪುಟ್ (ಮಾತನಾಡಿ)" : "Step 1: Speak Your Inventory"}
                </h3>
              </div>

              <KannadaVoiceRecorder
                language={language}
                onListingExtracted={(extracted) => setListing(extracted)}
              />
            </div>

            {/* Step 2: Touch-First Visual Review Card (Zero Typing Needed!) */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#E67E22] text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <h3 className="text-base font-bold text-white">
                  {language === "kn" ? "ಹಂತ ೨: ವಿವರಗಳ ಪರಿಶೀಲನೆ (ಸ್ಪರ್ಶ ನಿಯಂತ್ರಣ)" : "Step 2: Touch-First Review & Confirmation"}
                </h3>
              </div>

              <div className="bg-[#2A1810] rounded-3xl p-6 sm:p-8 border border-amber-800/40 shadow-xl space-y-6">
                
                {/* 4 Big High-Contrast Touch Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: Craft Type */}
                  <div className="bg-[#1C0E07] p-5 rounded-2xl border border-amber-900/60 flex flex-col justify-between space-y-2">
                    <span className="text-[11px] text-stone-400 font-semibold uppercase">
                      {language === "kn" ? "ಕರಕುಶಲ ಪ್ರಕಾರ" : "Detected Craft"}
                    </span>
                    <div>
                      <div className="text-xl font-bold text-white">{listing.craft}</div>
                      <p className="text-xs text-[#E67E22] font-semibold">{listing.craftKannada}</p>
                    </div>
                    <span className="text-[10px] text-stone-500">Auto-extracted</span>
                  </div>

                  {/* Card 2: Quantity with Touch Plus/Minus */}
                  <div className="bg-[#1C0E07] p-5 rounded-2xl border border-amber-900/60 flex flex-col justify-between space-y-2">
                    <span className="text-[11px] text-stone-400 font-semibold uppercase">
                      {language === "kn" ? "ಲಭ್ಯ ಪ್ರಮಾಣ (ಯೂನಿಟ್)" : "Quantity (Units)"}
                    </span>
                    <div className="text-2xl font-black text-amber-300">
                      {listing.quantity} <span className="text-xs font-normal text-stone-400">units</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(-10)}
                        className="flex-1 py-1.5 bg-[#2A1810] hover:bg-[#3D2517] rounded-lg border border-amber-800/60 text-white font-bold flex items-center justify-center text-xs transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => updateQuantity(10)}
                        className="flex-1 py-1.5 bg-[#E67E22] hover:bg-[#cf6d17] rounded-lg text-white font-bold flex items-center justify-center text-xs transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card 3: Price in INR with Touch Controls */}
                  <div className="bg-[#1C0E07] p-5 rounded-2xl border border-amber-900/60 flex flex-col justify-between space-y-2">
                    <span className="text-[11px] text-stone-400 font-semibold uppercase">
                      {language === "kn" ? "ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆ (ರೂ.)" : "Unit Price (INR)"}
                    </span>
                    <div className="text-2xl font-black text-emerald-400">
                      ₹{listing.pricePerUnitINR}
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => updatePrice(-50)}
                        className="flex-1 py-1.5 bg-[#2A1810] hover:bg-[#3D2517] rounded-lg border border-amber-800/60 text-white font-bold flex items-center justify-center text-xs transition-colors"
                      >
                        -₹50
                      </button>
                      <button
                        type="button"
                        onClick={() => updatePrice(50)}
                        className="flex-1 py-1.5 bg-[#E67E22] hover:bg-[#cf6d17] rounded-lg text-white font-bold flex items-center justify-center text-xs transition-colors"
                      >
                        +₹50
                      </button>
                    </div>
                  </div>

                  {/* Card 4: Lead Time */}
                  <div className="bg-[#1C0E07] p-5 rounded-2xl border border-amber-900/60 flex flex-col justify-between space-y-2">
                    <span className="text-[11px] text-stone-400 font-semibold uppercase">
                      {language === "kn" ? "ಪೂರೈಕೆ ಸಮಯ (ದಿನಗಳು)" : "Lead Time"}
                    </span>
                    <div className="text-xl font-bold text-white flex items-center gap-1.5">
                      <Clock className="w-5 h-5 text-[#E67E22]" />
                      <span>{listing.leadTimeDays} {language === "kn" ? "ದಿನಗಳು" : "Days"}</span>
                    </div>
                    <span className="text-[10px] text-stone-500">Based on craft type</span>
                  </div>

                </div>

                {/* Total Value & Direct Payout Guarantee */}
                <div className="p-4 bg-[#1C0E07] rounded-2xl border border-amber-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="font-bold text-white">
                        {language === "kn" ? "೯೫% ನೇರ ಕುಶಲಕರ್ಮಿ ಪಾವತಿ ಖಾತರಿ" : "95% Direct Artisan Payout Guarantee"}
                      </div>
                      <p className="text-stone-400 text-[11px]">
                        {language === "kn"
                          ? "ಮಧ್ಯವರ್ತಿಗಳ ಕಮಿಷನ್ ಇಲ್ಲದೆ ನೇರವಾಗಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಜಮಾ"
                          : "Direct bank transfer upon batch dispatch with zero middlemen deductions."}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                      {language === "kn" ? "ನಿರೀಕ್ಷಿತ ಒಟ್ಟು ಆದಾಯ" : "Total Batch Value"}
                    </span>
                    <span className="text-lg font-black text-emerald-400">
                      ₹{listing.totalValueINR.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Submit / Commit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isPublishing}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#E67E22] to-[#C85A32] hover:from-[#cf6d17] hover:to-[#A34828] disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-2xl transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                  >
                    {isPublishing ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>{language === "kn" ? "ಸರ್ವರ್‌ಗೆ ನೊಂದಾಯಿಸಲಾಗುತ್ತಿದೆ..." : "Publishing to Marketplace Database..."}</span>
                      </span>
                    ) : (
                      <>
                        <span>
                          {language === "kn"
                            ? `ಸರಕನ್ನು ನೊಂದಾಯಿಸಿ (${listing.quantity} ಯೂನಿಟ್‌ಗಳು • ₹${listing.totalValueINR.toLocaleString("en-IN")})`
                            : `Commit Batch to Cluster Inventory (${listing.quantity} Units • ₹${listing.totalValueINR.toLocaleString("en-IN")})`}
                        </span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Decorative Bottom Border */}
      <FolkArtBorder variant="gold" />
    </div>
  );
}
