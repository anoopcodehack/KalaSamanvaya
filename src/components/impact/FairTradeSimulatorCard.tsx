"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  Users,
  Clock,
  Coins,
  Receipt,
  HeartHandshake,
  Building2,
  CheckCircle2,
  ArrowRight,
  PieChart,
  RefreshCw,
  Scale,
  Sparkles
} from "lucide-react";

export interface CraftPreset {
  id: string;
  name: string;
  kannadaName: string;
  category: string;
  unitPriceINR: number;
  traditionalMiddlemanPayINR: number;
  handcraftHours: number;
  cluster: string;
  district: string;
}

export const CRAFT_PRESETS: CraftPreset[] = [
  {
    id: "kasuti-shawl",
    name: "Dharwad Heritage Kasuti Silk Shawl",
    kannadaName: "ಧಾರವಾಡ ಕಸೂತಿ ರೇಷ್ಮೆ ಶಾಲು",
    category: "Kasuti Embroidery",
    unitPriceINR: 1850,
    traditionalMiddlemanPayINR: 300,
    handcraftHours: 38,
    cluster: "Dharwad Mahila Sangha",
    district: "Dharwad",
  },
  {
    id: "beedu-basket",
    name: "Udupi Beedu Wildgrass Storage Basket",
    kannadaName: "ಉಡುಪಿ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿ",
    category: "Eco-Friendly Basketry",
    unitPriceINR: 650,
    traditionalMiddlemanPayINR: 120,
    handcraftHours: 14,
    cluster: "Kalyanpura Women's SHG",
    district: "Udupi",
  },
  {
    id: "khanapur-pottery",
    name: "Khanapur Red Clay Terracotta Urn",
    kannadaName: "ಖಾನಾಪುರ ಕೆಂಪು ಮಣ್ಣಿನ ಹೂಜಿ",
    category: "Riverbed Terracotta",
    unitPriceINR: 850,
    traditionalMiddlemanPayINR: 180,
    handcraftHours: 18,
    cluster: "Malaprabha Kumbara Sangha",
    district: "Belagavi",
  },
  {
    id: "bidriware-platter",
    name: "Bidar Damascene Silver Inlay Platter",
    kannadaName: "ಬೀದರ್ ಬೆಳ್ಳಿ ಕೆತ್ತನೆಯ ತಟ್ಟೆ",
    category: "Bidriware Metalwork",
    unitPriceINR: 3200,
    traditionalMiddlemanPayINR: 650,
    handcraftHours: 48,
    cluster: "Bidar Crafts Guild",
    district: "Bidar",
  },
];

interface FairTradeSimulatorProps {
  initialUnits?: number;
  className?: string;
  hideHeader?: boolean;
}

export default function FairTradeSimulatorCard({
  initialUnits = 200,
  className = "",
  hideHeader = false,
}: FairTradeSimulatorProps) {
  const [selectedCraftId, setSelectedCraftId] = useState("kasuti-shawl");
  const [units, setUnits] = useState(initialUnits);
  const [buyerType, setBuyerType] = useState<"b2b" | "retail">("b2b");

  const craft = CRAFT_PRESETS.find((c) => c.id === selectedCraftId) || CRAFT_PRESETS[0];

  // Financial Calculations
  const gmv = units * craft.unitPriceINR;
  
  // The 8% Platform Sustainability Fee Model:
  // 75% Direct Artisan Pay
  // 12% Raw Material Advance & Tamper-Evident GI Hangtag Packaging
  // 5% Local SHG Cluster Lead Coordination & Needlework Inspection
  // 8% KalaSamanvaya Platform Operations, Kannada Speech Engine & Multi-Cluster Routing
  const artisanPayout = Math.round(gmv * 0.75);
  const rawMaterialPackaging = Math.round(gmv * 0.12);
  const shgClusterCoordination = Math.round(gmv * 0.05);
  const platformSustainability = Math.round(gmv * 0.08);

  // Social Impact Metrics
  const totalHandcraftHours = units * craft.handcraftHours;
  const livelihoodDaysCreated = Math.round(totalHandcraftHours / 8);
  const artisanWomenSupported = Math.max(1, Math.ceil(units / 40)); // Approx 40-50 units per artisan per bulk cycle
  
  // Traditional Middleman Comparison
  const middlemanTotalPay = units * craft.traditionalMiddlemanPayINR;
  const middlemanCommissionAbsorbed = gmv - middlemanTotalPay;
  const additionalDirectIncome = artisanPayout - middlemanTotalPay;

  return (
    <div className={`bg-[#24130A] rounded-3xl border border-amber-900/60 shadow-2xl p-6 sm:p-8 space-y-8 ${className}`}>
      
      {/* ── CARD HEADER ── */}
      {!hideHeader && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-900/40">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-700/50 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>Transparent Economic Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2">
              Fair-Trade Impact &amp; 8% Platform Sustainability Simulator
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-2xl">
              Simulate order volumes to see how our economic architecture distributes gross order value directly to rural makers while remaining fully self-sustaining.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#1A0C06] p-1.5 rounded-2xl border border-amber-900/50 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setBuyerType("b2b")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                buyerType === "b2b"
                  ? "bg-[#C85A32] text-white shadow-md"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Enterprise B2B
            </button>
            <button
              type="button"
              onClick={() => setBuyerType("retail")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                buyerType === "retail"
                  ? "bg-[#C85A32] text-white shadow-md"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              Retail Storefront
            </button>
          </div>
        </div>
      )}

      {/* ── 1. INTERACTIVE SIMULATION CONTROLS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#1A0C06] p-6 rounded-2xl border border-amber-900/40">
        
        {/* Craft Selector Pills */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-amber-200 uppercase tracking-wider block">
            Select Karnataka Craft Tradition:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CRAFT_PRESETS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCraftId(c.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedCraftId === c.id
                    ? "bg-[#C85A32]/20 border-[#E67E22] text-white shadow-md"
                    : "bg-[#2A1810]/60 border-amber-900/30 text-stone-300 hover:border-amber-700/50"
                }`}
              >
                <div className="text-xs font-bold text-amber-100 line-clamp-1">{c.name}</div>
                <div className="text-[11px] text-[#E67E22] font-semibold mt-0.5">{c.kannadaName}</div>
                <div className="flex items-center justify-between text-[10px] text-stone-400 mt-2 pt-1 border-t border-amber-900/30">
                  <span>₹{c.unitPriceINR.toLocaleString("en-IN")}/unit</span>
                  <span>{c.handcraftHours}h handwork</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Units Range Slider & Quick Presets */}
        <div className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-amber-200 uppercase tracking-wider">
                Production Order Quantity:
              </label>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-[#E67E22]">{units}</span>
                <span className="text-xs text-stone-400 font-semibold">Units</span>
              </div>
            </div>

            {/* Slider */}
            <input
              type="range"
              min={10}
              max={1000}
              step={10}
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#E67E22] mt-3"
            />

            <div className="flex justify-between text-[10px] text-stone-500 font-mono mt-1">
              <span>10 units (Batch)</span>
              <span>200 (B2B Benchmark)</span>
              <span>500</span>
              <span>1,000 (State Order)</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Quick Benchmark Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "25 Retail", val: 25 },
                { label: "80 Cluster Quota", val: 80 },
                { label: "200 Corporate Benchmark", val: 200 },
                { label: "500 Mass Festive", val: 500 },
              ].map((p) => (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => setUnits(p.val)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    units === p.val
                      ? "bg-amber-500/20 border-amber-400 text-amber-200 font-bold"
                      : "bg-[#24130A] border-amber-900/40 text-stone-400 hover:text-stone-200"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Gross Order Summary */}
          <div className="p-3 bg-[#24130A] rounded-xl border border-amber-900/40 flex items-center justify-between text-xs">
            <span className="text-stone-300">Total Order GMV ({units} × ₹{craft.unitPriceINR}):</span>
            <span className="text-lg font-black text-white">
              ₹{gmv.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

      </div>

      {/* ── 2. THE 8% SUSTAINABILITY ALLOCATION BREAKDOWN ── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-[#E67E22]" />
              <span>Transparent Order Revenue Distribution Architecture</span>
            </h3>
            <p className="text-xs text-stone-300">
              100% of order value is audited and disbursed across 4 transparent tiers.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700/60 font-bold self-start sm:self-auto">
            Zero Hidden Middleman Cuts
          </span>
        </div>

        {/* Visual Allocation Proportion Bar */}
        <div className="h-6 w-full rounded-xl overflow-hidden flex bg-stone-900 border border-amber-900/60 shadow-inner">
          <div
            style={{ width: "75%" }}
            className="bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center justify-center text-[11px] font-bold text-white"
            title="75% Direct Artisan Wage Payout"
          >
            75% Maker Payout
          </div>
          <div
            style={{ width: "12%" }}
            className="bg-amber-600 hover:bg-amber-500 transition-colors flex items-center justify-center text-[10px] font-bold text-white"
            title="12% Raw Materials & GI Packaging"
          >
            12% Raw
          </div>
          <div
            style={{ width: "5%" }}
            className="bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center text-[9px] font-bold text-white"
            title="5% Local SHG Cluster Inspection"
          >
            5% SHG
          </div>
          <div
            style={{ width: "8%" }}
            className="bg-[#C85A32] hover:bg-[#E67E22] transition-colors flex items-center justify-center text-[10px] font-bold text-white"
            title="8% KalaSamanvaya Platform Sustainability"
          >
            8% Fee
          </div>
        </div>

        {/* 4 Financial Distribution Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Tier 1: 75% Direct Wage */}
          <div className="bg-[#1C0F08] p-4 rounded-2xl border-2 border-emerald-600/60 shadow-lg space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  75% Share
                </span>
                <Coins className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-xs font-bold text-white">Direct Artisan Wage</h4>
              <p className="text-[11px] text-stone-300 leading-snug">
                Direct Aadhaar DBT transfer to rural maker bank accounts.
              </p>
            </div>
            <div className="pt-2 border-t border-amber-900/40">
              <div className="text-xl font-black text-emerald-400">
                ₹{artisanPayout.toLocaleString("en-IN")}
              </div>
              <span className="text-[10px] text-stone-400">
                ₹{Math.round(craft.unitPriceINR * 0.75)}/unit guaranteed
              </span>
            </div>
          </div>

          {/* Tier 2: 12% Raw Materials & Packaging */}
          <div className="bg-[#1C0F08] p-4 rounded-2xl border border-amber-700/50 shadow-md space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded">
                  12% Fund
                </span>
                <Receipt className="w-4 h-4 text-[#E67E22]" />
              </div>
              <h4 className="text-xs font-bold text-white">Materials &amp; GI Tagging</h4>
              <p className="text-[11px] text-stone-300 leading-snug">
                Pre-funded pure silk, vegetable dyes &amp; physical QR hangtags.
              </p>
            </div>
            <div className="pt-2 border-t border-amber-900/40">
              <div className="text-xl font-black text-amber-300">
                ₹{rawMaterialPackaging.toLocaleString("en-IN")}
              </div>
              <span className="text-[10px] text-stone-400">
                Zero artisan debt for raw inputs
              </span>
            </div>
          </div>

          {/* Tier 3: 5% SHG Cluster Lead */}
          <div className="bg-[#1C0F08] p-4 rounded-2xl border border-indigo-700/50 shadow-md space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded">
                  5% Quota
                </span>
                <Users className="w-4 h-4 text-indigo-400" />
              </div>
              <h4 className="text-xs font-bold text-white">SHG Quality Inspection</h4>
              <p className="text-[11px] text-stone-300 leading-snug">
                Compensates cluster leads for thread counting &amp; packing.
              </p>
            </div>
            <div className="pt-2 border-t border-amber-900/40">
              <div className="text-xl font-black text-indigo-300">
                ₹{shgClusterCoordination.toLocaleString("en-IN")}
              </div>
              <span className="text-[10px] text-stone-400">
                Grassroots self-help group income
              </span>
            </div>
          </div>

          {/* Tier 4: 8% Platform Sustainability Fee */}
          <div className="bg-[#1C0F08] p-4 rounded-2xl border-2 border-[#E67E22] shadow-lg space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E67E22] bg-amber-950 px-2 py-0.5 rounded">
                  8% Model
                </span>
                <TrendingUp className="w-4 h-4 text-[#E67E22]" />
              </div>
              <h4 className="text-xs font-bold text-white">Platform Sustainability</h4>
              <p className="text-[11px] text-stone-300 leading-snug">
                Kannada Speech AI, server hosting &amp; cluster re-routing.
              </p>
            </div>
            <div className="pt-2 border-t border-amber-900/40">
              <div className="text-xl font-black text-[#E67E22]">
                ₹{platformSustainability.toLocaleString("en-IN")}
              </div>
              <span className="text-[10px] text-stone-400">
                100% operationally sustainable
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. TANGIBLE SOCIAL IMPACT METRICS ── */}
      <div className="bg-[#1A0C06] p-6 rounded-2xl border border-amber-900/50 space-y-4">
        <h3 className="text-sm font-bold text-amber-200 uppercase tracking-wider flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-[#E67E22]" />
          <span>Real-World Social Impact Generated by this {units}-Unit Order</span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#24130A] border border-amber-900/40">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Handcraft Labor
            </span>
            <div className="text-2xl font-black text-white mt-1">
              {totalHandcraftHours.toLocaleString("en-IN")}{" "}
              <span className="text-xs font-normal text-stone-400">Hrs</span>
            </div>
            <p className="text-[11px] text-amber-300/80 mt-1">
              Authentic counted-thread handwork
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#24130A] border border-amber-900/40">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Dignified Livelihood
            </span>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {livelihoodDaysCreated}{" "}
              <span className="text-xs font-normal text-stone-400">Days</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-1">
              Living wage working days created
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#24130A] border border-amber-900/40">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Makers Supported
            </span>
            <div className="text-2xl font-black text-indigo-300 mt-1">
              {artisanWomenSupported}{" "}
              <span className="text-xs font-normal text-stone-400">Artisans</span>
            </div>
            <p className="text-[11px] text-indigo-300/80 mt-1">
              Rural women craft families
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#24130A] border border-amber-900/40">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Middleman Cut Saved
            </span>
            <div className="text-2xl font-black text-amber-400 mt-1">
              ₹{additionalDirectIncome.toLocaleString("en-IN")}
            </div>
            <p className="text-[11px] text-amber-300/80 mt-1">
              Retained in Karnataka villages
            </p>
          </div>
        </div>
      </div>

      {/* ── 4. TRADITIONAL TRADER VS KALASAMANVAYA BENCHMARK ── */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/30 via-[#1C0F08] to-emerald-950/30 border border-amber-900/40 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        
        {/* Exploitative Middleman Model */}
        <div className="space-y-1 max-w-sm text-center md:text-left">
          <div className="text-red-400 font-bold uppercase tracking-wider text-[10px]">
            Predatory Middleman / City Agent
          </div>
          <div className="text-stone-300">
            Pays maker only <strong>₹{craft.traditionalMiddlemanPayINR}/unit</strong> (Total ₹{middlemanTotalPay.toLocaleString("en-IN")}), pockets <strong>65% commission</strong>, provides zero GI provenance, and delays payment by 90 days.
          </div>
        </div>

        {/* Arrow Transition */}
        <div className="flex flex-col items-center justify-center px-4 py-2 rounded-xl bg-black/40 border border-amber-800/40 text-amber-300 font-bold text-xs flex-shrink-0">
          <span>+₹{Math.round(craft.unitPriceINR * 0.75 - craft.traditionalMiddlemanPayINR)} / unit</span>
          <span className="text-[10px] text-emerald-400 font-semibold">Net Maker Lift</span>
        </div>

        {/* KalaSamanvaya Fair-Trade Engine */}
        <div className="space-y-1 max-w-sm text-center md:text-right">
          <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
            KalaSamanvaya Coordinated Engine
          </div>
          <div className="text-stone-300">
            Disburses <strong>₹{Math.round(craft.unitPriceINR * 0.75)}/unit</strong> directly via DBT (Total ₹{artisanPayout.toLocaleString("en-IN")}), pre-funds raw silk, issues GI QR hangtags, and sustains on an <strong>8% fee</strong>.
          </div>
        </div>

      </div>

      {/* ── 5. ACTION LINKS ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-amber-900/40 text-xs">
        <span className="text-stone-400">
          Need a formal bulk proposal with GST invoice and multi-cluster delivery schedule?
        </span>

        <div className="flex items-center gap-3">
          <Link
            href="/b2b"
            className="px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#cf6d17] text-white font-bold transition-all flex items-center gap-1.5 shadow-md hover:scale-105"
          >
            <span>Open B2B Allocation Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

    </div>
  );
}
