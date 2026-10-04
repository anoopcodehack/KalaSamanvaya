"use client";

import React, { useState } from "react";
import Link from "next/link";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  PackageCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building2,
  Volume2,
  Receipt,
  UserCheck,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Truck,
  Landmark,
  Mic
} from "lucide-react";

export default function ArtisanInboxPage() {
  const [language, setLanguage] = useState<"kn" | "en">("kn");

  // Savita Naik's Active B2B Commitment State
  const [b2bCommitment, setB2bCommitment] = useState({
    orderId: "B2B-BLR-2026",
    title: "Bengaluru IT Park Corporate Gift Order",
    titleKn: "ಬೆಂಗಳೂರು ಐಟಿ ಪಾರ್ಕ್ ಕಾರ್ಪೊರೇಟ್ ಉಡುಗೊರೆ ಆರ್ಡರ್",
    craft: "Dharwad Heritage Kasuti Silk Shawl",
    craftKn: "ಧಾರವಾಡ ಕಸೂತಿ ರೇಷ್ಮೆ ಶಾಲು",
    allocatedUnits: 80,
    originalUnits: 80,
    unitPayoutINR: 600,
    totalPayoutINR: 48000,
    deadlineDays: 14,
    status: "PENDING" as "PENDING" | "ACCEPTED" | "CAPACITY_DROPPED",
    reallocationTriggered: false,
  });

  // Retail Consumer Orders State (from /marketplace)
  const [retailOrders, setRetailOrders] = useState([
    {
      id: "KS-892104",
      customerName: "Dr. Sandeep Hegde",
      destination: "Indiranagar, Bengaluru",
      item: "Dharwad Kasuti Mulberry Silk Shawl",
      itemKn: "ಧಾರವಾಡ ಕಸೂತಿ ರೇಷ್ಮೆ ಶಾಲು",
      quantity: 1,
      artisanPayoutINR: 1380,
      retailPriceINR: 1850,
      payoutPercent: "75%",
      status: "PACKED" as "PENDING" | "PACKED" | "DISPATCHED",
      date: "Today, 10:30 AM",
    },
    {
      id: "KS-749120",
      customerName: "Ananya Rao",
      destination: "Jayanagar, Bengaluru",
      item: "Navalgund Kasuti Border Fabric",
      itemKn: "ನವಲಗುಂದ ಕಸೂತಿ ಬಾರ್ಡರ್ ವಸ್ತ್ರ",
      quantity: 2,
      artisanPayoutINR: 2760,
      retailPriceINR: 3700,
      payoutPercent: "75%",
      status: "PENDING" as "PENDING" | "PACKED" | "DISPATCHED",
      date: "Yesterday, 4:15 PM",
    },
  ]);

  // Audio speech synthesis in Kannada/English
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speakText = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "kn" ? "kn-IN" : "en-IN";
    utterance.rate = 0.9;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  // One-tap Accept Handler
  const handleAcceptB2B = () => {
    setB2bCommitment((prev) => ({
      ...prev,
      status: "ACCEPTED",
    }));

    const text =
      language === "kn"
        ? "ಧನ್ಯವಾದಗಳು ಸವಿತಾ ಅವರೇ! 80 ಕಸೂತಿ ಶಾಲುಗಳ ಕಾರ್ಪೊರೇಟ್ ಆರ್ಡರ್ ಯಶಸ್ವಿಯಾಗಿ ಒಪ್ಪಿಕೊಳ್ಳಲಾಗಿದೆ. ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ 48,000 ರೂಪಾಯಿ ನೇರ ಜಮಾ ಆಗಲಿದೆ."
        : "Thank you Savita! 80 Kasuti shawls corporate order accepted. Direct payout of 48,000 rupees will be disbursed to your account.";
    speakText(text);
  };

  // One-tap Capacity Drop Simulation Handler (80 -> 40 units)
  const handleReportCapacityDrop = () => {
    setB2bCommitment((prev) => ({
      ...prev,
      allocatedUnits: 40,
      totalPayoutINR: 40 * prev.unitPayoutINR,
      status: "CAPACITY_DROPPED",
      reallocationTriggered: true,
    }));

    const text =
      language === "kn"
        ? "ಗಮನಿಸಿ: ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯ ಕಡಿತ ದಾಖಲಾಗಿದೆ (40 ಶಾಲುಗಳು). ಕಲಾ ಸಮನ್ವಯ ವ್ಯವಸ್ಥೆಯು ಬಾಕಿ 40 ಶಾಲುಗಳನ್ನು ಹೆಚ್ಚುವರಿ ಗಿರಿಜಾ ಮತ್ತು ರೇಣುಕಾ ಸಂಘಕ್ಕೆ ಯಶಸ್ವಿಯಾಗಿ ಮರುಹಂಚಿಕೆ ಮಾಡಿದೆ."
        : "Notice: Your capacity drop to 40 shawls is recorded. KalaSamanvaya Coordinated Engine has seamlessly reallocated remaining 40 shawls to standby clusters.";
    speakText(text);
  };

  // Mark Retail Order as Packed
  const toggleRetailOrderPacked = (orderId: string) => {
    setRetailOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: o.status === "PENDING" ? "PACKED" : "DISPATCHED",
            }
          : o
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1810]">
      {/* ── 1. ARTISAN PORTAL SUB-NAV TABS ── */}
      <div className="bg-[#24130A] border-b border-amber-900/40 text-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Tabs */}
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
              <Link
                href="/artisan/onboard"
                className="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <Mic className="w-3.5 h-3.5 text-[#E67E22]" />
                <span>{language === "kn" ? "ಧ್ವನಿ ನೊಂದಣಿ" : "Voice Listing"}</span>
              </Link>

              <Link
                href="/artisan/inbox"
                className="px-3.5 py-1.5 rounded-lg bg-[#E67E22] text-white font-bold shadow-xs flex items-center gap-1.5"
              >
                <PackageCheck className="w-3.5 h-3.5 text-white" />
                <span>{language === "kn" ? "ಆರ್ಡರ್ ಇನ್‌ಬಾಕ್ಸ್" : "Order Inbox"}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </Link>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLanguage(language === "kn" ? "en" : "kn")}
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-xs text-amber-200 font-bold border border-amber-600/40 transition-colors"
              >
                {language === "kn" ? "English ಗೆ ಬದಲಾಯಿಸಿ" : "ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. ARTISAN PROFILE & DBT HEADER ── */}
      <section className="bg-white border-b border-stone-200 py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Artisan Identity */}
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-[#E67E22] text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-amber-200">
                ಸ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-[#2A1810]">
                    {language === "kn" ? "ಸವಿತಾ ನಾಯಕ್" : "Savita Naik"}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#C85A32] text-[11px] font-bold border border-amber-300">
                    GI Kasuti Master
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-0.5">
                  {language === "kn"
                    ? "ಧಾರವಾಡ ಕಸೂತಿ ಮಹಿಳಾ ಕೇಂದ್ರ • ಸಂಘದ ಮುಖ್ಯಸ್ಥೆ"
                    : "Dharwad Kasuti Mahila Kendra • Cluster Head"}
                </p>
              </div>
            </div>

            {/* Direct Benefit Transfer (DBT) Badge */}
            <div className="flex items-center gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-emerald-700" />
              </div>
              <div className="text-xs">
                <span className="text-[10px] text-stone-500 font-semibold uppercase tracking-wider block">
                  {language === "kn" ? "ನೇರ ಬ್ಯಾಂಕ್ ಜಮಾ (DBT ಖಾತೆ)" : "Direct Bank Transfer (DBT)"}
                </span>
                <span className="font-bold text-stone-800">
                  SBI A/c •••• 4892 (Aadhaar Linked)
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Active & Verified" />
            </div>

          </div>
        </div>
      </section>

      {/* ── 3. METRICS OVERVIEW (EARNINGS & CAPACITY) ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Metric 1: Committed Units */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {language === "kn" ? "ಸಕ್ರಿಯ ಆರ್ಡರ್ ಪ್ರಮಾಣ" : "Active Committed Units"}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#2A1810] mt-1">
                {b2bCommitment.allocatedUnits}{" "}
                <span className="text-xs font-normal text-stone-500">
                  {language === "kn" ? "ಶಾಲುಗಳು" : "Shawls"}
                </span>
              </div>
              <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold mt-2 inline-block">
                {language === "kn" ? "ಕಾರ್ಪೊರೇಟ್ ಬಿ2ಬಿ ಹಂಚಿಕೆ" : "Corporate B2B Quota"}
              </span>
            </div>

            {/* Metric 2: Guaranteed Fair Payout */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {language === "kn" ? "ನಿರೀಕ್ಷಿತ ನೇರ ಆದಾಯ" : "Direct Wage Earnings"}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-1">
                ₹{b2bCommitment.totalPayoutINR.toLocaleString("en-IN")}
              </div>
              <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold mt-2 inline-block">
                ₹600 / {language === "kn" ? "ಶಾಲು ನೇರ ಕೂಲಿ" : "Unit Direct Pay"}
              </span>
            </div>

            {/* Metric 3: Delivery Deadline */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {language === "kn" ? "ವಿತರಣಾ ಗಡುವು" : "Delivery Window"}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C85A32] mt-1">
                {b2bCommitment.deadlineDays}{" "}
                <span className="text-xs font-normal text-stone-500">
                  {language === "kn" ? "ದಿನಗಳು ಬಾಕಿ" : "Days Left"}
                </span>
              </div>
              <span className="text-[10px] text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md font-semibold mt-2 inline-block">
                {language === "kn" ? "ವೇಳಾಪಟ್ಟಿ ಪ್ರಕಾರ" : "On Schedule"}
              </span>
            </div>

            {/* Metric 4: Quality & Reliability Score */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {language === "kn" ? "ವಿಶ್ವಾಸಾರ್ಹತೆ ರೇಟಿಂಗ್" : "Reliability Score"}
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">
                0.94 <span className="text-xs font-normal text-stone-500">/ 1.0</span>
              </div>
              <span className="text-[10px] text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md font-semibold mt-2 inline-block">
                Top Kasuti Cluster Rank
              </span>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* ── 4. MAIN INBOX WORKFLOW SECTION ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ── A. CORPORATE B2B ALLOCATION COMMITMENT CARD ── */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-lg p-6 sm:p-8 space-y-6">
            
            {/* Card Header with Read-Aloud Voice Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-[#C85A32] flex items-center justify-center border border-amber-300">
                  <Building2 className="w-6 h-6 text-[#C85A32]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-[#C85A32] text-[10px] font-bold uppercase tracking-wider">
                      {language === "kn" ? "ದೊಡ್ಡ ಸಂಸ್ಥೆಯ ಬೃಹತ್ ಆರ್ಡರ್" : "Corporate Bulk Order"}
                    </span>
                    <span className="text-xs font-bold text-stone-400">
                      #{b2bCommitment.orderId}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#2A1810] mt-1">
                    {language === "kn" ? b2bCommitment.titleKn : b2bCommitment.title}
                  </h2>
                </div>
              </div>

              {/* Kannada Read Aloud Mic Button */}
              <button
                type="button"
                onClick={() =>
                  speakText(
                    language === "kn"
                      ? `${b2bCommitment.titleKn}. ನಿಮಗೆ 80 ಕಸೂತಿ ಶಾಲುಗಳ ಜವಾಬ್ದಾರಿ ಹಂಚಿಕೆಯಾಗಿದೆ. ಒಟ್ಟು ಆದಾಯ 48,000 ರೂಪಾಯಿಗಳು. ಗಡುವು 14 ದಿನಗಳು.`
                      : `${b2bCommitment.title}. You have an allocation of 80 Kasuti shawls. Total direct wage payout 48,000 rupees. Delivery deadline 14 days.`
                  )
                }
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C85A32] text-xs font-bold border border-amber-300 transition-colors self-start sm:self-auto"
                title="Read aloud in Kannada"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? "animate-bounce text-red-600" : ""}`} />
                <span>{language === "kn" ? "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ" : "Listen in Kannada"}</span>
              </button>
            </div>

            {/* Commitment Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200">
              
              {/* Col 1: Craft Specification */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  {language === "kn" ? "ಕಲಾ ಪ್ರಕಾರ ಮತ್ತು ವಿವರ" : "Craft & Details"}
                </span>
                <p className="text-sm font-bold text-[#2A1810]">
                  {language === "kn" ? b2bCommitment.craftKn : b2bCommitment.craft}
                </p>
                <p className="text-xs text-stone-600">
                  Gavanti & Murgi Stitches • Pure Mulberry Silk on Cotton
                </p>
              </div>

              {/* Col 2: Quota & Multi-Cluster Context */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  {language === "kn" ? "ನಿಮ್ಮ ಗುಂಪು ಹಂಚಿಕೆ" : "Allocated Batch Share"}
                </span>
                <p className="text-sm font-bold text-[#2A1810]">
                  {b2bCommitment.allocatedUnits} / 200{" "}
                  <span className="text-xs font-normal text-stone-500">
                    ({language === "kn" ? "ಒಟ್ಟು ಬೃಹತ್ ಬೇಡಿಕೆ" : "Total Demand"})
                  </span>
                </p>
                <p className="text-xs text-stone-600">
                  {language === "kn"
                    ? "ಮಂಜುಳಾ (70) ಮತ್ತು ಗಿರಿಜಾ (50) ರವರ ಜೊತೆ ಸಂಯೋಜಿಸಲಾಗಿದೆ"
                    : "Coordinated with Manjula (70) & Girija (50)"}
                </p>
              </div>

              {/* Col 3: Direct Payment Security */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                  {language === "kn" ? "ನೇರ ಕೂಲಿ ಪಾವತಿ" : "Guaranteed Wage"}
                </span>
                <p className="text-sm font-extrabold text-emerald-700">
                  ₹{b2bCommitment.totalPayoutINR.toLocaleString("en-IN")}{" "}
                  <span className="text-xs font-normal text-stone-600">
                    (₹{b2bCommitment.unitPayoutINR}/unit)
                  </span>
                </p>
                <p className="text-xs text-emerald-800 flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Direct DBT Guarantee</span>
                </p>
              </div>

            </div>

            {/* Dynamic Status Notification Alert */}
            {b2bCommitment.status === "ACCEPTED" && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div className="text-xs">
                  <strong className="block text-sm">
                    {language === "kn" ? "ಆರ್ಡರ್ ಒಪ್ಪಿಕೊಳ್ಳಲಾಗಿದೆ!" : "Commitment Accepted & Locked!"}
                  </strong>
                  <span>
                    {language === "kn"
                      ? "ನಿಮ್ಮ ಧಾರವಾಡ ಕೇಂದ್ರದ 80 ಶಾಲುಗಳ ಹಂಚಿಕೆ ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ. ಕಚ್ಚಾ ವಸ್ತುಗಳ ಮುಂಗಡ ₹12,000 ಬಿಡುಗಡೆಯಾಗಿದೆ."
                      : "Your cluster commitment of 80 shawls is locked. Raw material advance of ₹12,000 has been released."}
                  </span>
                </div>
              </div>
            )}

            {b2bCommitment.status === "CAPACITY_DROPPED" && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-2">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="block text-sm text-[#C85A32]">
                      {language === "kn"
                        ? "ಸಾಮರ್ಥ್ಯ ಕಡಿತ ದಾಖಲಾಗಿದೆ: 80 ರಿಂದ 40 ಶಾಲುಗಳಿಗೆ ಬದಲಾಗಿದೆ"
                        : "Capacity Drop Recorded: Reduced from 80 ➔ 40 Units"}
                    </strong>
                    <p className="text-stone-700 mt-1 leading-relaxed">
                      {language === "kn"
                        ? "ಚಿಂತಿಸಬೇಡಿ! ಕಲಾ ಸಮನ್ವಯ ಸಂಯೋಜನಾ ಎಂಜಿನ್ ಉಳಿದ 40 ಶಾಲುಗಳನ್ನು ಹೆಚ್ಚುವರಿ ಗಿರಿಜಾ ಕುಲಕರ್ಣಿ (+10) ಮತ್ತು ರೇಣುಕಾ ಬಡಿಗೇರ (+30) ಅವರಿಗೆ ಯಶಸ್ವಿಯಾಗಿ ವರ್ಗಾಯಿಸಿದೆ. ಕಾರ್ಪೊರೇಟ್ ಡೆಲಿವರಿ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಪೂರ್ಣಗೊಳ್ಳಲಿದೆ."
                        : "Zero buyer disruption! KalaSamanvaya's multi-cluster engine seamlessly rerouted the remaining 40 units to Girija Kulkarni (+10) and Standby Cluster Renuka Badiger (+30)."}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <Link
                    href="/b2b"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24130A] hover:bg-stone-900 text-amber-300 text-xs font-bold transition-colors"
                  >
                    <span>{language === "kn" ? "ಬಿ2ಬಿ ಮರುಹಂಚಿಕೆ ಕನ್ಸೋಲ್ ನೋಡಿ" : "View Live B2B Allocation Console"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Interactive Action Buttons (Large Touch Targets for Rural Makers) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              
              {/* Accept Button */}
              <button
                type="button"
                onClick={handleAcceptB2B}
                disabled={b2bCommitment.status === "ACCEPTED"}
                className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 border-2 ${
                  b2bCommitment.status === "ACCEPTED"
                    ? "bg-emerald-600 border-emerald-600 text-white cursor-default"
                    : "bg-[#2A1810] hover:bg-[#3D2318] text-white border-stone-800 hover:scale-[1.02] active:scale-95"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  {b2bCommitment.status === "ACCEPTED"
                    ? language === "kn"
                      ? "ಒಪ್ಪಿಕೊಳ್ಳಲಾಗಿದೆ ✓"
                      : "Accepted & Confirmed ✓"
                    : language === "kn"
                    ? "ಆರ್ಡರ್ ಒಪ್ಪಿಕೊಳ್ಳಿ (Accept 80 Units)"
                    : "Accept Commitment (80 Units)"}
                </span>
              </button>

              {/* Report Capacity Drop Button (Evaluation Simulation) */}
              <button
                type="button"
                onClick={handleReportCapacityDrop}
                disabled={b2bCommitment.status === "CAPACITY_DROPPED"}
                className={`py-3.5 px-6 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 border-2 ${
                  b2bCommitment.status === "CAPACITY_DROPPED"
                    ? "bg-stone-100 border-stone-300 text-stone-400 cursor-not-allowed"
                    : "bg-amber-50 hover:bg-amber-100 border-amber-300 text-[#C85A32] hover:border-amber-400 active:scale-95"
                }`}
                title="Simulate capacity drop (80 -> 40 units) to demonstrate multi-cluster re-routing"
              >
                <RefreshCw className="w-4 h-4 text-[#C85A32]" />
                <span>
                  {b2bCommitment.status === "CAPACITY_DROPPED"
                    ? language === "kn"
                      ? "ಕಡಿತ ದಾಖಲಾಗಿದೆ (40 Units)"
                      : "Drop Logged (40 Units)"
                    : language === "kn"
                    ? "ಸಾಮರ್ಥ್ಯ ಕಡಿತ ತಿಳಿಸಿ (Report Drop 80➔40)"
                    : "Report Capacity Drop (80➔40)"}
                </span>
              </button>

            </div>

          </div>
        </ScrollReveal>

        {/* ── B. RETAIL CONSUMER DIRECT ORDERS (FROM MARKETPLACE STORE) ── */}
        <ScrollReveal direction="up" delayMs={100} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#2A1810]">
                {language === "kn" ? "ನೇರ ಗ್ರಾಹಕರ ಆರ್ಡರ್‌ಗಳು (ಮಳಿಗೆ)" : "Direct Retail Orders (Storefront)"}
              </h3>
              <p className="text-xs text-stone-500">
                {language === "kn"
                  ? "ಗ್ರಾಹಕರು ನೇರವಾಗಿ ಮಳಿಗೆಯಲ್ಲಿ ಖರೀದಿಸಿದ ಕರಕುಶಲ ವಸ್ತುಗಳು (75% ನೇರ ಪಾವತಿ)"
                  : "Orders purchased directly by patrons on the marketplace (75% Direct Artisan Share)"}
              </p>
            </div>

            <Link
              href="/marketplace"
              className="text-xs font-bold text-[#C85A32] hover:underline flex items-center gap-1"
            >
              <span>{language === "kn" ? "ಮಳಿಗೆ ನೋಡಿ" : "View Store"}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {retailOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-stone-500">
                      {order.id}
                    </span>
                    <span className="text-[10px] text-stone-400">{order.date}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {language === "kn" ? order.itemKn : order.item}
                    </h4>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {language === "kn" ? "ಗ್ರಾಹಕರು:" : "Buyer:"}{" "}
                      <strong className="text-stone-800">{order.customerName}</strong> • {order.destination}
                    </p>
                  </div>

                  {/* Wage Breakdown Box */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        {language === "kn" ? "ನಿಮ್ಮ ನೇರ ಗಳಿಕೆ" : "Your Direct Earnings"}
                      </span>
                      <strong className="text-emerald-700 text-sm">
                        ₹{order.artisanPayoutINR.toLocaleString("en-IN")}
                      </strong>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        {language === "kn" ? "ಮಳಿಗೆ ಬೆಲೆ" : "Retail Price"}
                      </span>
                      <span className="text-stone-700 font-semibold">
                        ₹{order.retailPriceINR} ({order.payoutPercent} {language === "kn" ? "ಪಾಲು" : "Share"})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status Action */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      order.status === "DISPATCHED"
                        ? "bg-stone-100 text-stone-600"
                        : order.status === "PACKED"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-[#C85A32]"
                    }`}
                  >
                    {order.status === "DISPATCHED"
                      ? language === "kn" ? "ರವಾನಿಸಲಾಗಿದೆ" : "Dispatched"
                      : order.status === "PACKED"
                      ? language === "kn" ? "ಪ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ ✓" : "Packed & Ready"
                      : language === "kn" ? "ಪ್ಯಾಕ್ ಮಾಡಲು ಬಾಕಿ" : "Ready to Pack"}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleRetailOrderPacked(order.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-[#C85A32] text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>
                      {order.status === "PENDING"
                        ? language === "kn" ? "ಪ್ಯಾಕಿಂಗ್ ಮಾಡಿ" : "Mark Packed"
                        : language === "kn" ? "ರವಾನೆ ದೃಢೀಕರಿಸಿ" : "Confirm Dispatch"}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ── C. AADHAAR DBT PAYOUT HISTORY ── */}
        <ScrollReveal direction="up" delayMs={150}>
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <Receipt className="w-5 h-5 text-[#E67E22]" />
                <h3 className="text-sm font-bold text-[#2A1810]">
                  {language === "kn" ? "ಇತ್ತೀಚಿನ ನೇರ ಬ್ಯಾಂಕ್ ಜಮಾ ಇತಿಹಾಸ" : "Recent Direct Bank Transfers (DBT)"}
                </h3>
              </div>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Zero Middlemen Deductions
              </span>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <strong className="text-stone-800 block text-xs">
                    SBI DBT: ₹32,000 (Hubballi Corporate Order Milestone 1)
                  </strong>
                  <span className="text-stone-500 text-[11px]">UTR: SBI9481028471 • 28 Sep 2026</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  PAID ✓
                </span>
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <strong className="text-stone-800 block text-xs">
                    SBI DBT: ₹14,500 (Dharwad Heritage Shawls Retail Batch)
                  </strong>
                  <span className="text-stone-500 text-[11px]">UTR: SBI8103928174 • 15 Sep 2026</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                  PAID ✓
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </section>

      {/* Decorative Traditional Border above Footer */}
      <FolkArtBorder variant="gold" />
    </div>
  );
}
