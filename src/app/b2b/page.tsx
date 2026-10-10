"use client";

import React, { useState } from "react";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  Building2,
  Layers,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  TrendingUp,
  Users,
  ShieldCheck,
  Clock,
  MapPin,
  PackageCheck,
  AlertTriangle,
  FileCheck,
  Scale,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

interface ClusterAllocation {
  id: string;
  name: string;
  kannadaName: string;
  cluster: string;
  district: string;
  score: number;
  initialUnits: number;
  simulatedUnits: number;
  shortfallUnits: number;
  maxCapacity: number;
  status: "primary" | "absorbed" | "standby-activated" | "reduced" | "shortfall-capped";
}

export default function B2BFulfillmentPage() {
  const [benchmarkMode, setBenchmarkMode] = useState<"primary" | "recovery" | "shortfall">("primary");
  const [isLoading, setIsLoading] = useState(false);

  const initialClusters: ClusterAllocation[] = [
    {
      id: "art-kasuti-01",
      name: "Savita Naik",
      kannadaName: "ಸವಿತಾ ನಾಯಕ್",
      cluster: "Dharwad Kasuti Mahila Kendra",
      district: "Dharwad",
      score: 0.94,
      initialUnits: 80,
      simulatedUnits: 40,
      shortfallUnits: 60,
      maxCapacity: 80,
      status: "reduced",
    },
    {
      id: "art-kasuti-02",
      name: "Manjula Patil",
      kannadaName: "ಮಂಜುಳಾ ಪಾಟೀಲ್",
      cluster: "Kalghatgi Artisan Sangha",
      district: "Dharwad",
      score: 0.88,
      initialUnits: 70,
      simulatedUnits: 70,
      shortfallUnits: 50,
      maxCapacity: 70,
      status: "primary",
    },
    {
      id: "art-kasuti-03",
      name: "Girija Kulkarni",
      kannadaName: "ಗಿರಿಜಾ ಕುಲಕರ್ಣಿ",
      cluster: "Karkala Heritage Weavers",
      district: "Udupi",
      score: 0.81,
      initialUnits: 50,
      simulatedUnits: 60,
      shortfallUnits: 50,
      maxCapacity: 60,
      status: "absorbed",
    },
    {
      id: "art-kasuti-04",
      name: "Renuka Badiger",
      kannadaName: "ರೇಣುಕಾ ಬಡಿಗೇರ",
      cluster: "Bagalkot Craft Guild",
      district: "Bagalkot",
      score: 0.72,
      initialUnits: 0,
      simulatedUnits: 30,
      shortfallUnits: 0,
      maxCapacity: 40,
      status: "standby-activated",
    },
  ];

  const handleSetMode = (mode: "primary" | "recovery" | "shortfall") => {
    setIsLoading(true);
    setTimeout(() => {
      setBenchmarkMode(mode);
      setIsLoading(false);
    }, 250);
  };

  const totalUnits =
    benchmarkMode === "recovery"
      ? initialClusters.reduce((sum, c) => sum + c.simulatedUnits, 0)
      : benchmarkMode === "shortfall"
      ? initialClusters.reduce((sum, c) => sum + c.shortfallUnits, 0)
      : initialClusters.reduce((sum, c) => sum + c.initialUnits, 0);

  const shortfallAmount = Math.max(0, 200 - totalUnits);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1810]">
      {/* ── HEADER BANNER ── */}
      <section className="bg-[#F5EFEB] pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <ScrollReveal direction="up" className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[#C85A32] text-xs font-semibold uppercase shadow-sm">
              <Building2 className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>ಸಾಂಸ್ಥಿಕ ಬೃಹತ್ ಪೂರೈಕೆ • B2B Fulfillment Console</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A1810]">
              Multi-Cluster Artisan Bulk Fulfillment
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl">
              Fulfill high-volume handcrafted orders of 200+ units with delivery timeline certainty by dividing quotas across verified Karnataka artisan self-help groups.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="left" delayMs={100} className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="px-4 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Browse Retail Store
            </Link>
            <Link
              href="/artisan/onboard"
              className="px-4 py-2.5 rounded-full bg-[#C85A32] hover:bg-[#a84420] text-white text-xs font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5"
            >
              Artisan Voice Portal
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Decorative Folk Art Banner */}
      <FolkArtBanner variant="elephant" />

      {/* ── MAIN DASHBOARD ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Order Specification Card */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Live Production Batch • Evaluation Presets
                </span>
                <div className="text-lg font-bold text-[#2A1810] flex items-center gap-2 mt-0.5">
                  <span>Order #ORD-2026-KASUTI</span>
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded border transition-colors ${
                      shortfallAmount > 0
                        ? "bg-red-100 text-red-800 border-red-300 animate-pulse"
                        : "bg-emerald-100 text-emerald-800 border-emerald-300"
                    }`}
                  >
                    {shortfallAmount > 0 ? `🚨 Shortfall: -${shortfallAmount} Units` : `Target: 200 Units (100% Fulfilled)`}
                  </span>
                </div>
              </div>

              {/* 3 Benchmark Scenarios Switcher (Matches Slide 5 of PPT) */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 self-start lg:self-auto">
                <button
                  type="button"
                  onClick={() => handleSetMode("primary")}
                  disabled={isLoading}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    benchmarkMode === "primary"
                      ? "bg-white text-stone-900 shadow-xs border border-stone-300"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                  title="Scenario 1: Initial 200-unit sequential allocation"
                >
                  1. Primary (200 Units)
                </button>

                <button
                  type="button"
                  onClick={() => handleSetMode("recovery")}
                  disabled={isLoading}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    benchmarkMode === "recovery"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "text-amber-800 hover:text-amber-950"
                  }`}
                  title="Scenario 2: Artisan A drops 80 -> 40, standby recovers to 200"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>2. Recovery (A: 80➔40)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSetMode("shortfall")}
                  disabled={isLoading}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    benchmarkMode === "shortfall"
                      ? "bg-red-600 text-white shadow-xs"
                      : "text-red-700 hover:text-red-900"
                  }`}
                  title="Scenario 3: Cluster capacity capped at 160 units, detects 40 shortfall (Slide 5)"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>3. Shortfall Test (160/200)</span>
                </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Item Name</span>
                <span className="font-bold text-[#2A1810] text-sm mt-0.5 block">Dharwad Kasuti Shawl</span>
                <span className="text-[10px] text-[#C85A32]">Pure Mulberry Silk</span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Required Quantity</span>
                <span className="font-bold text-[#2A1810] text-sm mt-0.5 block">200 Units</span>
                <span
                  className={`text-[10px] font-semibold block ${
                    shortfallAmount > 0 ? "text-red-600 font-bold" : "text-emerald-700"
                  }`}
                >
                  {shortfallAmount > 0
                    ? `⚠️ ${totalUnits}/200 Allocated (${shortfallAmount} Shortfall)`
                    : `100% Allocated (${totalUnits}/200)`}
                </span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Lead Time Window</span>
                <span className="font-bold text-[#2A1810] text-sm mt-0.5 block">30 Calendar Days</span>
                <span className="text-[10px] text-stone-500">Destination: Bengaluru</span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Active Maker Groups</span>
                <span className="font-bold text-[#2A1810] text-sm mt-0.5 block">
                  {benchmarkMode === "recovery"
                    ? "4 Craft Clusters"
                    : benchmarkMode === "shortfall"
                    ? "3 Clusters (Capped)"
                    : "3 Craft Clusters"}
                </span>
                <span className="text-[10px] text-stone-500">Zero Middlemen Commission</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Recovery Simulation Alert Banner (Scenario 2) */}
        {benchmarkMode === "recovery" && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 shadow-sm space-y-2 animate-fadeIn text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Slide 5 Recovery Scenario: Artisan A (Savita Naik) capacity reduced from 80 to 40 units</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              <strong>Automated Reallocation Executed:</strong> Shortfall of 40 units was reallocated instantly.
              Cluster C (Girija Kulkarni) absorbed +10 units buffer (50 → 60), and verified Standby Cluster D (Renuka Badiger) was activated for the remaining 30 units (0 → 30).
              <strong> Order total preserved at 200/200 units with 0 days delivery delay.</strong>
            </p>
          </div>
        )}

        {/* Shortfall Detection Alert Banner (Scenario 3 - Slide 5 PPT) */}
        {benchmarkMode === "shortfall" && (
          <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-5 shadow-sm space-y-3 animate-fadeIn text-xs text-red-950">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 animate-bounce" />
              <span>Slide 5 Shortfall Detection Test: Compatible Cluster Capacity Capped at 160 Units</span>
            </div>
            <p className="text-red-800 leading-relaxed">
              <strong>🚨 40-Unit Shortfall Detected:</strong> Total compatible cluster capacity (160 units) is insufficient for order demand (200 units).
              <strong> Rather than silently rejecting the order, the engine flags an instant institutional buyer alert:</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[11px]">
              <div className="p-3 bg-white/95 rounded-xl border border-red-200 space-y-1">
                <strong className="block text-stone-800 font-bold">Recommendation 1: Delivery Extension</strong>
                <span className="text-stone-600 leading-relaxed block">
                  Extend delivery deadline by +7 calendar days to allow 2nd batch completion by Dharwad clusters.
                </span>
              </div>
              <div className="p-3 bg-white/95 rounded-xl border border-red-200 space-y-1">
                <strong className="block text-stone-800 font-bold">Recommendation 2: Auxiliary Cluster Sourcing</strong>
                <span className="text-stone-600 leading-relaxed block">
                  Auto-requisition remaining 40 units from North Karnataka auxiliary Bagalkot Craft Guild.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Multi-Cluster Allocation Table & Breakdown */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-stone-200 bg-[#FAF7F2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C85A32]" />
                <h3 className="font-bold text-sm text-[#2A1810]">
                  Coordinated Multi-Cluster Allocation Grid
                </h3>
              </div>
              <span className="text-xs text-stone-500">
                Evaluation Scenario: PS 4.2 Bulk Fulfillment
              </span>
            </div>

            <div className="divide-y divide-stone-200 text-xs">
              {initialClusters.map((cluster) => {
                const currentUnits =
                  benchmarkMode === "recovery"
                    ? cluster.simulatedUnits
                    : benchmarkMode === "shortfall"
                    ? cluster.shortfallUnits
                    : cluster.initialUnits;
                const percent = Math.round((currentUnits / 200) * 100);

                const isRecoveryReduced = benchmarkMode === "recovery" && cluster.status === "reduced";
                const isRecoveryAbsorbed = benchmarkMode === "recovery" && cluster.status === "absorbed";
                const isRecoveryActivated = benchmarkMode === "recovery" && cluster.status === "standby-activated";
                const isShortfallCapped = benchmarkMode === "shortfall" && currentUnits > 0;

                return (
                  <div
                    key={cluster.id}
                    className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                      isRecoveryActivated
                        ? "bg-emerald-50/50"
                        : isRecoveryReduced
                        ? "bg-amber-50/40"
                        : benchmarkMode === "shortfall" && currentUnits === 0
                        ? "bg-stone-50/60 opacity-60"
                        : "hover:bg-stone-50"
                    }`}
                  >
                    <div className="space-y-1 md:w-1/3">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#2A1810]">{cluster.name}</span>
                        <span className="text-stone-500 text-[11px]">({cluster.kannadaName})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500 text-[11px]">
                        <MapPin className="w-3 h-3 text-stone-400" />
                        <span>{cluster.cluster} • {cluster.district}</span>
                      </div>
                      <div className="text-[10px] text-stone-400">
                        Match Score: <strong className="text-stone-700">{cluster.score}</strong> | Max Capacity: {cluster.maxCapacity} units
                      </div>
                    </div>

                    {/* Progress Bar & Status Pill */}
                    <div className="flex-1 max-w-xs space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-stone-500">Allocated Quota:</span>
                        <span className="font-bold text-[#2A1810]">
                          {currentUnits} units ({percent}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            currentUnits === 0
                              ? "bg-transparent"
                              : isRecoveryActivated
                              ? "bg-emerald-500"
                              : isRecoveryReduced
                              ? "bg-amber-500"
                              : benchmarkMode === "shortfall"
                              ? "bg-red-500/80"
                              : "bg-[#C85A32]"
                          }`}
                          style={{ width: `${(currentUnits / 80) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="md:w-44 text-right">
                      {benchmarkMode === "shortfall" ? (
                        currentUnits > 0 ? (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200 text-[11px] font-semibold">
                            Capped: {currentUnits} units
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 border border-stone-200 text-[11px] font-medium">
                            Auxiliary Standby (0)
                          </span>
                        )
                      ) : currentUnits === 0 ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-semibold">
                          Standby Pool (0)
                        </span>
                      ) : isRecoveryActivated ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold">
                          Standby Activated (+30)
                        </span>
                      ) : isRecoveryReduced ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold">
                          Capacity Drop (80 → 40)
                        </span>
                      ) : isRecoveryAbsorbed ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[11px] font-bold">
                          Absorbed Buffer (50 → 60)
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                          Active ({currentUnits} units)
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Table Footer */}
            <div className="p-4 bg-[#FAF7F2] border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-stone-600">
                {shortfallAmount > 0 ? (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    <span className="text-red-700 font-semibold">
                      Shortfall Alert: {shortfallAmount} units unfulfilled due to cluster capacity caps.
                    </span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Full 200/200 units assigned with zero unfulfilled backlog.</span>
                  </>
                )}
              </div>
              <div className="font-bold text-[#2A1810]">
                Total Production Payout:{" "}
                <span className="text-[#C85A32]">
                  ₹{(totalUnits * 600).toLocaleString("en-IN")}
                </span>{" "}
                (75% to Artisans)
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── B2B FAIR-WAGE & QUOTE BREAKDOWN (Clean Heritage UI) ── */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                  <Scale className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Fair-Wage Standard Guarantee • ಕನಿಷ್ಠ ನ್ಯಾಯಯುತ ಕೂಲಿ ರಕ್ಷಣೆ</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#2A1810]">
                  Corporate Order Payout & Wage Protection
                </h3>
                <p className="text-xs text-stone-600 max-w-xl">
                  Every B2B contract enforces Karnataka rural handcraft wage standards (75% direct maker payout + 12% upfront material advance), providing an official ESG Fair-Trade audit trail.
                </p>
              </div>

              <Link
                href="/impact"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-stone-300 bg-[#FAF7F2] hover:bg-stone-100 text-stone-800 text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
              >
                <span>Interactive Cost Simulator</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C85A32]" />
              </Link>
            </div>

            {/* 3 Summary Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 block">Direct Maker Payout</span>
                <span className="text-lg font-bold text-emerald-700 block">75% (₹1,380+ / unit)</span>
                <span className="text-[11px] text-stone-500">Transferred directly to artisan bank accounts</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 block">Raw Material Pre-Funding</span>
                <span className="text-lg font-bold text-amber-800 block">12% Advance</span>
                <span className="text-[11px] text-stone-500">Silk and cotton pre-funded without loan debt</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-stone-200">
                <span className="text-[11px] font-medium text-stone-500 block">Lean Coordination Fee</span>
                <span className="text-lg font-bold text-[#C85A32] block">8% Platform Fee</span>
                <span className="text-[11px] text-stone-500">Includes packaging, GI tags & batch dispatch</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Corporate Trust Pillars with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <ScrollReveal direction="up" delayMs={0}>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-2 text-xs hover:-translate-y-1 transition-transform h-full">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C85A32] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[#2A1810] text-sm">Quality Consistency Guarantee</h4>
              <p className="text-stone-600 leading-relaxed">
                Every participating self-help group follows standardized thread counts, certified vegetable dyes, and GI cluster authenticity norms.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={100}>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-2 text-xs hover:-translate-y-1 transition-transform h-full">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C85A32] flex items-center justify-center font-bold">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[#2A1810] text-sm">Automated Buffer Balancing</h4>
              <p className="text-stone-600 leading-relaxed">
                If any village maker faces illness or seasonal farm harvest delays, standby artisan networks absorb shortfalls immediately.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delayMs={200}>
            <div className="p-5 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-2 text-xs hover:-translate-y-1 transition-transform h-full">
              <div className="w-8 h-8 rounded-lg bg-amber-50 text-[#C85A32] flex items-center justify-center font-bold">
                <PackageCheck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-[#2A1810] text-sm">Consolidated Dispatch</h4>
              <p className="text-stone-600 leading-relaxed">
                Individual artisan cluster deliveries are batched at Dharwad and Udupi nodal hubs for seamless single-invoice corporate delivery.
              </p>
            </div>
          </ScrollReveal>
        </div>

      </div>

      {/* Decorative Golden Folk Art Border */}
      <FolkArtBorder variant="gold" />
    </div>
  );
}
