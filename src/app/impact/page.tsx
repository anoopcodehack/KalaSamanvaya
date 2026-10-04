"use client";

import React, { useState } from "react";
import Link from "next/link";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import FairTradeSimulatorCard from "@/components/impact/FairTradeSimulatorCard";
import {
  Scale,
  TrendingUp,
  ShieldCheck,
  Building2,
  Users,
  Coins,
  Receipt,
  HeartHandshake,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronRight,
  PieChart,
  Award,
  Clock,
  Sparkles,
  HelpCircle,
  Globe
} from "lucide-react";

export default function ImpactAndMonetizationPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why is an 8% platform fee sustainable compared to traditional 25-35% e-commerce commissions?",
      a: "Traditional e-commerce platforms spend 20%+ of revenue on predatory paid customer acquisition ads, heavy warehousing overheads, and bloated corporate margins. KalaSamanvaya operates as a lean, coordinated digital clearinghouse directly connecting artisan self-help groups (SHGs) with enterprise buyers and conscious patrons. Our 8% fee covers server infrastructure, Web Speech Kannada voice recognition, logistics coordination, and GI compliance—making the model 100% operationally self-sufficient without requiring charitable grants.",
    },
    {
      q: "How does the 12% Raw Material Advance fund protect rural women from debt?",
      a: "Rural crafters frequently take loans at 36-60% annual interest from local moneylenders to purchase expensive raw silk, cotton, or metal alloys before starting a large order. Under KalaSamanvaya, 12% of the total order value is disbursed upfront directly to verified raw material suppliers, completely insulating artisans from high-interest debt cycles.",
    },
    {
      q: "How do you guarantee that 75% goes directly to the artisan and not to middlemen?",
      a: "All payments are executed via direct bank transfers (DBT) directly linked to the individual artisan's Aadhaar-verified bank account upon quality clearance by the local SHG cluster lead. Every transaction generates a transparent digital UTR receipt visible in the artisan's personal inbox (/artisan/inbox).",
    },
    {
      q: "How does the platform scale from a pilot to statewide coverage across Karnataka?",
      a: "KalaSamanvaya's multi-cluster coordination engine is built on modular district clusters (Dharwad Kasuti, Udupi Beedu, Khanapur Pottery, Bidriware, Channapatna Toys). As new craft clusters onboard via vernacular voice, our deterministic allocation algorithm dynamically partitions demand across active and standby SHGs without adding operational headcount.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#1F130B] text-[#FAF6F0] selection:bg-[#E67E22] selection:text-white">
      
      {/* ── 1. HERO SECTION ── */}
      <section className="relative w-full py-16 sm:py-20 bg-[#150B05] overflow-hidden border-b border-amber-950">
        <div className="absolute inset-0 bg-gradient-to-r from-[#120803] via-[#120803]/90 to-[#120803]/70" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 space-y-6">
          <ScrollReveal direction="up" className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-600/50 text-amber-300 text-xs font-bold tracking-wider uppercase shadow-lg">
              <Scale className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>ನ್ಯಾಯಯುತ ವ್ಯಾಪಾರ &amp; ಸುಸ್ಥಿರತೆ • Fair-Trade &amp; Self-Sustaining Model</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              75% to Rural Makers. <br />
              <span className="text-[#E67E22]">Zero Middlemen Exploitation.</span>
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              For decades, rural Karnataka artisans have been trapped in exploitative supply chains where city traders pocket 65% margins while paying makers sub-living wages. KalaSamanvaya reimagines craft commerce through a transparent <strong>75% maker payout architecture sustained by a lean 8% operational fee</strong>.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold text-amber-200">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2A1810] border border-amber-800/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>75% Guaranteed Direct Payout</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2A1810] border border-amber-800/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>8% Lean Platform Fee (Self-Sustaining)</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#2A1810] border border-amber-800/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>12% Upfront Material Debt-Shield</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Decorative Elephant Folk Art Motif */}
      <FolkArtBanner variant="elephant" />

      {/* ── 2. INTERACTIVE SIMULATOR SECTION ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        <ScrollReveal direction="up">
          <FairTradeSimulatorCard />
        </ScrollReveal>

        {/* ── 3. 3-WAY COMPARISON MATRIX: MIDDLEMEN VS BIG TECH VS KALASAMANVAYA ── */}
        <ScrollReveal direction="up" delayMs={100} className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ಮಾದರಿಗಳ ಹೋಲಿಕೆ • Architectural Benchmark
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Why Traditional Supply Chains Fail Rural Artisans
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2 rounded-full" />
            <p className="text-xs text-stone-300">
              A transparent comparison across maker share, working capital debt, and fulfillment reliability.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-amber-900/50 shadow-2xl bg-[#1C0F08]">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#120703] border-b border-amber-900/60 text-stone-400 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-4 px-6">Economic &amp; Operational Dimension</th>
                  <th className="py-4 px-6 text-red-400">Traditional City Trader / Middleman</th>
                  <th className="py-4 px-6 text-amber-400">Generic Big-Tech Marketplace</th>
                  <th className="py-4 px-6 text-emerald-400 bg-emerald-950/30 border-l border-emerald-800/40">
                    KalaSamanvaya Coordinated Engine
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-900/30 text-stone-200">
                
                {/* Metric 1 */}
                <tr className="hover:bg-amber-950/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">
                    Artisan Net Payout Share
                  </td>
                  <td className="py-4 px-6 text-red-300">
                    <strong>15% – 20%</strong> (Sub-living wage ₹300/shawl)
                  </td>
                  <td className="py-4 px-6 text-stone-300">
                    <strong>35% – 45%</strong> (High return fees &amp; commissions)
                  </td>
                  <td className="py-4 px-6 font-extrabold text-emerald-300 bg-emerald-950/20 border-l border-emerald-800/40">
                    <strong>75% Direct Guaranteed</strong> (₹1,387/shawl)
                  </td>
                </tr>

                {/* Metric 2 */}
                <tr className="hover:bg-amber-950/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">
                    Platform Fee / Intermediary Cut
                  </td>
                  <td className="py-4 px-6 text-red-300">
                    <strong>65% – 70%</strong> pocketed by brokers
                  </td>
                  <td className="py-4 px-6 text-stone-300">
                    <strong>25% – 35%</strong> seller fee + ads + logistics
                  </td>
                  <td className="py-4 px-6 font-extrabold text-[#E67E22] bg-emerald-950/20 border-l border-emerald-800/40">
                    <strong>8% Lean Sustainability Fee</strong>
                  </td>
                </tr>

                {/* Metric 3 */}
                <tr className="hover:bg-amber-950/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">
                    Raw Material Financing
                  </td>
                  <td className="py-4 px-6 text-red-300">
                    Artisans take 36% loan from moneylenders
                  </td>
                  <td className="py-4 px-6 text-stone-300">
                    Maker absorbs 100% upfront financial risk
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-300 bg-emerald-950/20 border-l border-emerald-800/40">
                    <strong>12% Upfront Pre-funded</strong> (Zero debt)
                  </td>
                </tr>

                {/* Metric 4 */}
                <tr className="hover:bg-amber-950/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">
                    Maker Onboarding Barrier
                  </td>
                  <td className="py-4 px-6 text-stone-300">
                    Physical exploitation; no digital presence
                  </td>
                  <td className="py-4 px-6 text-red-300">
                    Complex English forms &amp; GST spreadsheets
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-300 bg-emerald-950/20 border-l border-emerald-800/40">
                    <strong>Vernacular Spoken Kannada Voice</strong> (kn-IN)
                  </td>
                </tr>

                {/* Metric 5 */}
                <tr className="hover:bg-amber-950/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">
                    Counterfeit Protection
                  </td>
                  <td className="py-4 px-6 text-red-300">
                    Sells fake 4-minute powerloom copies as handloom
                  </td>
                  <td className="py-4 px-6 text-stone-300">
                    Zero stitch-level provenance verification
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-300 bg-emerald-950/20 border-l border-emerald-800/40">
                    <strong>Official GI Hangtags + Scannable Audio QR</strong>
                  </td>
                </tr>

                {/* Metric 6 */}
                <tr className="hover:bg-amber-950/20 transition-colors">
                  <td className="py-4 px-6 font-bold text-white">
                    B2B Large Quota Failure Handling
                  </td>
                  <td className="py-4 px-6 text-red-300">
                    Order default if single artisan falls sick
                  </td>
                  <td className="py-4 px-6 text-red-300">
                    Seller penalty and order cancellation
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-300 bg-emerald-950/20 border-l border-emerald-800/40">
                    <strong>Automatic Multi-Cluster Standby Re-Routing</strong>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </ScrollReveal>

        {/* ── 4. MONETIZATION & GROWTH STRATEGY (HACKATHON CRITERIA 5) ── */}
        <ScrollReveal direction="up" delayMs={150} className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ವ್ಯವಹಾರ &amp; ಸುಸ್ಥಿರತೆ • Revenue &amp; Business Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How KalaSamanvaya Sustains &amp; Scales Long-Term
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2 rounded-full" />
            <p className="text-xs text-stone-300">
              A diversified enterprise model ensuring the platform remains financially viable, self-funding, and scalable without grant reliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Revenue Stream 1 */}
            <div className="bg-[#24130A] rounded-2xl p-6 border border-amber-900/50 shadow-xl space-y-4 flex flex-col justify-between group hover:border-[#E67E22]/60 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-900/30 border border-amber-700/40 text-[#E67E22] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Receipt className="w-6 h-6 text-[#E67E22]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-wider block">
                    Core Stream • 8% Fee
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    B2B &amp; Retail Fulfillment Margin
                  </h3>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Charged on gross merchandise value (GMV). Covers cloud compute, Kannada Web Speech API costs, automated logistics coordination, and banking DBT gateways.
                </p>
              </div>

              <div className="pt-3 border-t border-amber-900/40 text-xs font-semibold text-amber-200">
                <span>Unit Yield: ₹148 per Kasuti Shawl</span>
              </div>
            </div>

            {/* Revenue Stream 2 */}
            <div className="bg-[#24130A] rounded-2xl p-6 border border-amber-900/50 shadow-xl space-y-4 flex flex-col justify-between group hover:border-[#E67E22]/60 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-900/30 border border-amber-700/40 text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Building2 className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                    High Margin • 5% Service
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    Corporate Hamper Customization
                  </h3>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Premium white-labeled gifting solutions for Bengaluru IT corridors, tech summits, and MNC festivals. Includes bespoke engraved wooden boxes and co-branded GI certificates.
                </p>
              </div>

              <div className="pt-3 border-t border-amber-900/40 text-xs font-semibold text-indigo-300">
                <span>Enterprise Service Markup: +5% on Bulk</span>
              </div>
            </div>

            {/* Revenue Stream 3 */}
            <div className="bg-[#24130A] rounded-2xl p-6 border border-amber-900/50 shadow-xl space-y-4 flex flex-col justify-between group hover:border-[#E67E22]/60 transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-900/30 border border-amber-700/40 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Institutional API • B2B SaaS
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    Verified GI Provenance Registry
                  </h3>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Licensing our scannable QR provenance database and anti-counterfeiting verification API to luxury craft exporters, state emporiums, and tourism boards.
                </p>
              </div>

              <div className="pt-3 border-t border-amber-900/40 text-xs font-semibold text-emerald-300">
                <span>Annual API Licensing: ₹25,000 / cluster</span>
              </div>
            </div>

          </div>

          {/* Scale Projection Roadmap */}
          <div className="bg-[#1A0C06] p-6 sm:p-8 rounded-3xl border border-amber-900/50 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  3-Stage Financial Sustainability &amp; Impact Projections
                </h3>
                <p className="text-xs text-stone-400">
                  Target milestones demonstrating path from prototype to statewide operational profitability.
                </p>
              </div>
              <span className="text-xs font-bold text-[#E67E22] bg-amber-950/80 px-3 py-1 rounded-full border border-amber-700/50 self-start sm:self-auto">
                Conservative 8% Take-Rate Model
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="p-5 rounded-2xl bg-[#24130A] border border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-900/40 text-amber-300 text-[10px] font-bold uppercase">
                    Stage 1: Pilot Cluster
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Months 1–3</span>
                </div>
                <div className="text-xl font-black text-white">
                  500 Units / Mo
                </div>
                <div className="space-y-1 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>Monthly GMV:</span>
                    <strong className="text-stone-100">₹9.25 Lakhs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Artisan Direct Pay:</span>
                    <strong className="text-emerald-400">₹6.93 Lakhs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>8% Platform Revenue:</span>
                    <strong className="text-[#E67E22]">₹74,000 / mo</strong>
                  </div>
                </div>
                <div className="text-[11px] text-stone-400 pt-2 border-t border-amber-900/30">
                  ✓ Breakeven on cloud servers, APIs, and logistics.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#24130A] border-2 border-amber-600/60 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-[#E67E22] text-[10px] font-bold uppercase">
                    Stage 2: Karnataka State
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Months 4–12</span>
                </div>
                <div className="text-xl font-black text-white">
                  5,000 Units / Mo
                </div>
                <div className="space-y-1 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>Monthly GMV:</span>
                    <strong className="text-stone-100">₹92.5 Lakhs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Artisan Direct Pay:</span>
                    <strong className="text-emerald-400">₹69.3 Lakhs</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>8% Platform Revenue:</span>
                    <strong className="text-[#E67E22]">₹7.4 Lakhs / mo</strong>
                  </div>
                </div>
                <div className="text-[11px] text-emerald-400 pt-2 border-t border-amber-900/30">
                  ✓ Operationally profitable; supports 400+ artisan households.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#24130A] border border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-900/40 text-indigo-300 text-[10px] font-bold uppercase">
                    Stage 3: National &amp; Export
                  </span>
                  <span className="text-xs text-stone-400 font-mono">Year 2+</span>
                </div>
                <div className="text-xl font-black text-white">
                  20,000 Units / Mo
                </div>
                <div className="space-y-1 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>Monthly GMV:</span>
                    <strong className="text-stone-100">₹3.70 Crores</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Artisan Direct Pay:</span>
                    <strong className="text-emerald-400">₹2.77 Crores</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>8% Platform Revenue:</span>
                    <strong className="text-[#E67E22]">₹29.6 Lakhs / mo</strong>
                  </div>
                </div>
                <div className="text-[11px] text-stone-400 pt-2 border-t border-amber-900/30">
                  ✓ Expansion to Bidriware, Sandalwood &amp; Kinhal Toys.
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* ── 5. ETHICAL QUESTIONS & FAQS ── */}
        <ScrollReveal direction="up" delayMs={200} className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E67E22]">
              ಸ್ಪಷ್ಟೀಕರಣ • Governance &amp; Trust
            </span>
            <h2 className="text-2xl font-bold text-white">
              Frequently Asked Questions on Economic Governance
            </h2>
            <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-amber-900/40 bg-[#24130A] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-amber-200 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-[#E67E22] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-stone-300 leading-relaxed border-t border-amber-900/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        {/* ── 6. BOTTOM CALL TO ACTION ── */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="bg-gradient-to-r from-[#2A1810] via-[#1A0C06] to-[#2A1810] rounded-3xl p-8 sm:p-10 border border-amber-900/60 shadow-2xl text-center space-y-6">
            <div className="inline-flex items-center gap-2 text-[#E67E22] text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Partner with Rural Women Collectives</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white max-w-xl mx-auto">
              Empower Living Heritage While Sustaining Scalable Impact
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Explore how your organization can procure verified GI-tagged corporate gifts with guaranteed production quotas and zero middleman inflation.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
              <Link
                href="/b2b"
                className="px-8 py-3.5 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white font-bold text-sm shadow-xl transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 flex items-center gap-2"
              >
                <span>Launch B2B Allocation Console</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/marketplace"
                className="px-6 py-3.5 rounded-full border border-amber-500/60 bg-white/5 hover:bg-white/10 text-amber-200 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explore Storefront</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

      </section>

      {/* Traditional Golden Folk Art Footer Border */}
      <FolkArtBorder variant="gold" />
    </div>
  );
}
