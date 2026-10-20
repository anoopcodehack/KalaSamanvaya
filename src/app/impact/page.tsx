"use client";

import React, { useState } from "react";
import Link from "next/link";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FairTradeSimulatorCard from "@/components/impact/FairTradeSimulatorCard";
import {
  Scale,
  Building2,
  Receipt,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronRight,
  Globe,
  Coins,
  ShieldCheck,
  PackageCheck
} from "lucide-react";

export default function ImpactAndMonetizationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why is an 8% platform fee enough to sustain operations?",
      a: "KalaSamanvaya does not hold expensive centralized inventory or burn cash on paid consumer ads. We operate as a direct fulfillment coordinator between artisan SHGs and buyers. The 8% fee funds cloud infrastructure, speech APIs, cluster logistics coordination, and banking gateways.",
    },
    {
      q: "How does the 12% material advance stop moneylender debt?",
      a: "Rural crafters often borrow money at 36-60% interest to buy silk, cotton, or clay before starting work. On KalaSamanvaya, 12% of the total order is disbursed upfront directly for raw materials, protecting the artisan from high-interest debt.",
    },
    {
      q: "How do buyers know 75% actually reaches the maker?",
      a: "Every payout goes directly to the artisan's Aadhaar-linked bank account (DBT/UPI) with a digital transaction receipt, accompanied by physical GI tags and provenance records.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1810]">
      {/* ── 1. HEADER HERO BANNER (COMPACT & ACTION-FOCUSED) ── */}
      <section className="bg-[#F5EFEB] pt-6 pb-6 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[#C85A32] text-xs font-semibold uppercase shadow-xs">
                <Scale className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>ನ್ಯಾಯಯುತ ವ್ಯಾಪಾರ & ಸುಸ್ಥಿರತೆ • Fair Trade & Business Model</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A1810] tracking-tight mt-1">
                75% Direct Maker Wage. <span className="text-[#C85A32]">8% Platform Fee.</span>
              </h1>
            </div>
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-100/80 border border-amber-300 text-amber-900 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive Economic Simulator Live Below</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                75%
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 leading-tight">Direct Maker Payout</div>
                <div className="text-[10px] text-stone-500">₹1,380 / Kasuti shawl</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                12%
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 leading-tight">Upfront Material Advance</div>
                <div className="text-[10px] text-stone-500">Zero moneylender debt</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                5%
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 leading-tight">SHG Lead Coordination</div>
                <div className="text-[10px] text-stone-500">Local QC & aggregation</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-xs flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center flex-shrink-0 font-bold text-xs">
                8%
              </div>
              <div>
                <div className="text-xs font-bold text-stone-900 leading-tight">Platform Sustainability</div>
                <div className="text-[10px] text-stone-500">Self-sustaining operations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Traditional Border Strip */}
      <FolkArtBanner variant="elephant" />

      {/* ── 2. INTERACTIVE SIMULATOR (PROMINENT AT TOP) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <ScrollReveal direction="up">
          <FairTradeSimulatorCard />
        </ScrollReveal>

        {/* ── 3. REALITY CHECK: TRADITIONAL MIDDLEMAN VS KALASAMANVAYA ── */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2A1810]">
                The Ground Reality: How We Compare
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                Traditional trade relies on multiple layers of intermediaries, while KalaSamanvaya coordinates direct fulfillment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Traditional Trap */}
              <div className="bg-white rounded-2xl border border-red-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Traditional Middleman Supply Chain</span>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span><strong>15% – 20% Maker Share:</strong> Artisans receive only ₹250–₹350 for pieces that take 40+ hours of handwork.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span><strong>High-Interest Debt:</strong> Artisans borrow raw material money from village moneylenders at 36%+ annual interest.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span><strong>No Capacity Coordination:</strong> When a corporate buyer asks for 200 shawls, one artisan cannot take it and the order is lost to factory polyester.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span><strong>Zero Provenance:</strong> City buyers pay premium prices without knowing who made it or if it is genuine GI craft.</span>
                  </li>
                </ul>
              </div>

              {/* KalaSamanvaya */}
              <div className="bg-[#FAF4ED] rounded-2xl border border-stone-300 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
                  <span>KalaSamanvaya Coordinated Model</span>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span><strong>75% Direct Payout:</strong> Artisans earn ₹1,380+ per shawl transferred directly via bank or UPI.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span><strong>12% Upfront Material Advance:</strong> Raw materials are pre-funded upfront so artisans never need high-interest loans.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span><strong>Multi-Artisan Coordination:</strong> Algorithmic engine divides large orders across 3–5 cluster artisans with standby backup.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span><strong>Verified GI Tag & Audio Story:</strong> Scannable QR code connects the buyer to the artisan’s voice and certified heritage origin.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 4. REVENUE & FINANCIAL SUSTAINABILITY ── */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2A1810]">
                How the Platform Sustains Itself
              </h2>
              <p className="text-xs text-stone-600 mt-1">
                KalaSamanvaya does not depend on government grants or donations to keep running. Three revenue streams maintain long-term operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Stream 1 */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] text-[#C85A32] flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-[#C85A32]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#C85A32] uppercase">Core Model • 8% Fee</span>
                  <h3 className="text-sm font-bold text-[#2A1810] mt-0.5">Retail & B2B Orders</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  A lean 8% fee applied to each completed order covers cloud servers, Web Speech API audio processing, and automated banking coordination.
                </p>
              </div>

              {/* Stream 2 */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] text-stone-800 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-stone-700" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-700 uppercase">Enterprise • +5% Service</span>
                  <h3 className="text-sm font-bold text-[#2A1810] mt-0.5">Corporate Hamper Customization</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  For corporate gifting and summits requiring customized co-branding, custom packaging boxes, and consolidated multi-cluster shipping.
                </p>
              </div>

              {/* Stream 3 */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF4ED] text-stone-800 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-stone-700" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-700 uppercase">Provenance • Verification</span>
                  <h3 className="text-sm font-bold text-[#2A1810] mt-0.5">GI Verification Registry</h3>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Scannable QR craft passports and authenticity registries for verified handlooms and terracotta exporters.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 5. GOVERNANCE FAQS (Concise & Human) ── */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="text-xl sm:text-2xl font-bold text-[#2A1810]">
                Common Questions
              </h2>
            </div>

            <div className="space-y-2.5">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-stone-200 shadow-xs overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full py-3.5 px-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-[#2A1810] hover:text-[#C85A32] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronRight
                        className={`w-4 h-4 text-[#C85A32] flex-shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* ── 6. CALL TO ACTION ── */}
        <ScrollReveal direction="up">
          <div className="bg-[#FAF4ED] rounded-2xl p-6 sm:p-8 border border-stone-300 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-bold text-[#2A1810]">
                Ready to explore the working MVP?
              </h3>
              <p className="text-xs text-stone-600">
                Test the multi-artisan corporate bulk console or browse authentic crafts on the storefront.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Link
                href="/b2b"
                className="px-5 py-2.5 rounded-full bg-[#C85A32] hover:bg-[#a34421] text-white font-semibold text-xs shadow-xs transition-all duration-200 flex items-center gap-1.5"
              >
                <span>B2B Fulfillment Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/marketplace"
                className="px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs shadow-xs transition-all duration-200"
              >
                <span>Browse Storefront</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Footer Folk Art Border */}
      <FolkArtBorder variant="gold" />
    </div>
  );
}
