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
  Scale
} from "lucide-react";
import Link from "next/link";
import FairTradeSimulatorCard from "@/components/impact/FairTradeSimulatorCard";

interface ClusterAllocation {
  id: string;
  name: string;
  kannadaName: string;
  cluster: string;
  district: string;
  score: number;
  initialUnits: number;
  simulatedUnits: number;
  maxCapacity: number;
  status: "primary" | "absorbed" | "standby-activated" | "reduced";
}

export default function B2BFulfillmentPage() {
  const [isSimulated, setIsSimulated] = useState(false);
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
      maxCapacity: 40,
      status: "standby-activated",
    },
  ];

  const handleSimulate = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSimulated(true);
      setIsLoading(false);
    }, 400);
  };

  const handleReset = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSimulated(false);
      setIsLoading(false);
    }, 200);
  };

  const totalUnits = isSimulated
    ? initialClusters.reduce((sum, c) => sum + c.simulatedUnits, 0)
    : initialClusters.reduce((sum, c) => sum + c.initialUnits, 0);

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div>
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                  Live Production Batch
                </span>
                <div className="text-lg font-bold text-[#2A1810] flex items-center gap-2">
                  <span>Order #ORD-2026-KASUTI</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Target: 200 Units
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isSimulated ? (
                  <button
                    onClick={handleSimulate}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Simulate Cluster Capacity Drop (-40 Units)</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    disabled={isLoading}
                    className="px-4 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 active:scale-95 text-stone-700 font-semibold text-xs shadow-sm flex items-center gap-1.5 transition-all duration-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Allocation</span>
                  </button>
                )}
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
                <span className="text-[10px] text-emerald-700 font-semibold">100% Allocated ({totalUnits}/200)</span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Lead Time Window</span>
                <span className="font-bold text-[#2A1810] text-sm mt-0.5 block">30 Calendar Days</span>
                <span className="text-[10px] text-stone-500">Destination: Bengaluru</span>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[11px] block">Active Maker Groups</span>
                <span className="font-bold text-[#2A1810] text-sm mt-0.5 block">
                  {isSimulated ? "4 Craft Clusters" : "3 Craft Clusters"}
                </span>
                <span className="text-[10px] text-stone-500">Zero Middlemen Commission</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Dynamic Recovery Simulation Alert Banner */}
        {isSimulated && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 shadow-sm space-y-2 animate-fadeIn text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <span>Simulated Event: Artisan A (Savita Naik) capacity reduced from 80 to 40 units</span>
            </div>
            <p className="text-amber-800 leading-relaxed">
              <strong>Automated Reallocation Executed:</strong> Shortfall of 40 units was reallocated instantly.
              Cluster C (Girija Kulkarni) absorbed +10 units buffer (50 → 60), and verified Standby Cluster D (Renuka Badiger) was activated for the remaining 30 units (0 → 30).
              <strong> Order total preserved at 200/200 units with 0 days delivery delay.</strong>
            </p>
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
                const currentUnits = isSimulated ? cluster.simulatedUnits : cluster.initialUnits;
                const percent = Math.round((currentUnits / 200) * 100);

                return (
                  <div
                    key={cluster.id}
                    className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                      isSimulated && cluster.status === "standby-activated"
                        ? "bg-emerald-50/50"
                        : isSimulated && cluster.status === "reduced"
                        ? "bg-amber-50/40"
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
                              : isSimulated && cluster.status === "standby-activated"
                              ? "bg-emerald-500"
                              : isSimulated && cluster.status === "reduced"
                              ? "bg-amber-500"
                              : "bg-[#C85A32]"
                          }`}
                          style={{ width: `${(currentUnits / 80) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="md:w-44 text-right">
                      {currentUnits === 0 ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-[11px] font-semibold">
                          Standby Standby Pool
                        </span>
                      ) : isSimulated && cluster.status === "standby-activated" ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[11px] font-bold">
                          Standby Activated (+30)
                        </span>
                      ) : isSimulated && cluster.status === "reduced" ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-[11px] font-bold">
                          Capacity Drop (80 → 40)
                        </span>
                      ) : isSimulated && cluster.status === "absorbed" ? (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300 text-[11px] font-bold">
                          Absorbed Buffer (50 → 60)
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                          Active Production (70)
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
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Full 200/200 units assigned with zero unfulfilled backlog.</span>
              </div>
              <div className="font-bold text-[#2A1810]">
                Total Production Payout: <span className="text-[#C85A32]">₹1,20,000</span> (75% to Artisans)
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── FAIR-TRADE IMPACT & 8% SUSTAINABILITY SIMULATOR ── */}
        <ScrollReveal direction="up" delayMs={50}>
          <FairTradeSimulatorCard initialUnits={200} />
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
