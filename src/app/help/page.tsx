"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  PackageCheck,
  ShieldCheck,
  FileText,
  Building2,
  Truck,
  RotateCcw,
  Lock,
  EyeOff,
  Scale,
  Award,
  Users,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  PhoneCall,
  Mail,
  MapPin
} from "lucide-react";

type TabKey = "shipping" | "privacy" | "terms" | "bulk";

function HelpPageContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabKey) || "shipping";
  const [activeTab, setActiveTab] = useState<TabKey>(initialTab);

  // Sync state if URL query changes
  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabKey;
    if (tabParam && ["shipping", "privacy", "terms", "bulk"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Bulk Enquiry Form state
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    craft: "Kasuti Embroidery (ಧಾರವಾಡ)",
    quantity: "200 units (Corporate Benchmark)",
    deadlineDays: "20 days",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1810]">
      {/* ── 1. HERO HEADER BANNER ── */}
      <section className="bg-[#F5EFEB] pt-10 pb-10 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-6xl mx-auto space-y-4">
          <ScrollReveal direction="up" className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[#C85A32] text-xs font-semibold uppercase shadow-xs">
              <Scale className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>ಸಹಾಯ &amp; ನೀತಿ ಕೇಂದ್ರ • Help &amp; Policy Center</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2A1810] tracking-tight">
              Customer Care &amp; Cluster Policies
              <span className="block text-[#C85A32] text-xl sm:text-2xl font-semibold mt-1">
                ಪಾರದರ್ಶಕತೆ, ಸುರಕ್ಷತೆ ಮತ್ತು ನ್ಯಾಯಯುತ ವ್ಯಾಪಾರ
              </span>
            </h1>

            <p className="text-sm sm:text-base text-stone-600 max-w-2xl leading-relaxed">
              Clear, transparent guidelines for rural cluster shipping, handcrafted return guarantees, vernacular data privacy, fair wage ethics, and corporate bulk enquiries.
            </p>

            {/* Quick Metrics Strip */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Dispatch Partners</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">India Post / DNK</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Return Window</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">7-Day Transit Safe</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Direct Maker Wage</div>
                <div className="text-sm font-bold text-emerald-700 mt-0.5">75% Guaranteed</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs">
                <div className="text-xs text-stone-500 font-medium">Data Privacy</div>
                <div className="text-sm font-bold text-stone-900 mt-0.5">100% Ad-Free &amp; DBT</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Decorative Traditional Border Strip */}
      <FolkArtBanner variant="elephant" />

      {/* ── 2. MAIN CONTENT AREA WITH TAB SELECTOR ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Interactive Tab Navigation */}
        <div className="flex flex-wrap gap-2 pb-8 border-b border-stone-200">
          <button
            onClick={() => setActiveTab("shipping")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              activeTab === "shipping"
                ? "bg-[#C85A32] text-white shadow-sm ring-2 ring-[#C85A32]/20 font-semibold"
                : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Shipping &amp; Returns</span>
            <span className="hidden md:inline opacity-80 text-xs font-normal">(ವಿತರಣೆ &amp; ವಾಪಸಾತಿ)</span>
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              activeTab === "privacy"
                ? "bg-[#C85A32] text-white shadow-sm ring-2 ring-[#C85A32]/20 font-semibold"
                : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
            <span className="hidden md:inline opacity-80 text-xs font-normal">(ಗೌಪ್ಯತೆ ನೀತಿ)</span>
          </button>

          <button
            onClick={() => setActiveTab("terms")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              activeTab === "terms"
                ? "bg-[#C85A32] text-white shadow-sm ring-2 ring-[#C85A32]/20 font-semibold"
                : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Terms &amp; Conditions</span>
            <span className="hidden md:inline opacity-80 text-xs font-normal">(ನಿಯಮ ಮತ್ತು ಷರತ್ತುಗಳು)</span>
          </button>

          <button
            onClick={() => setActiveTab("bulk")}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
              activeTab === "bulk"
                ? "bg-[#C85A32] text-white shadow-sm ring-2 ring-[#C85A32]/20 font-semibold"
                : "bg-white text-stone-700 hover:bg-stone-50 border border-stone-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Bulk Enquiry</span>
            <span className="hidden md:inline opacity-80 text-xs font-normal">(ಸಗಟು ವಿಚಾರಣೆ)</span>
          </button>
        </div>

        {/* ── TAB 1: SHIPPING & RETURNS ── */}
        {activeTab === "shipping" && (
          <ScrollReveal direction="up" className="pt-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
                  <PackageCheck className="w-3.5 h-3.5" />
                  <span>Cluster Hub Delivery Network</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2A1810]">
                  Shipping Policy &amp; Handcrafted Transit Protection
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  How handcrafted orders move from remote village homes into safe, trackable delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center font-bold">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">Cluster Hub Dispatch</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Crafts are collected from artisan homes and inspected at regional Self-Help Group (SHG) aggregation centers in Dharwad, Udupi, or Belagavi within 48 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">Transit Timelines</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Dispatched via India Post Speed Post and regional logistics partners. Metro orders arrive in 3–5 days; regional Karnataka orders arrive in 2–4 days.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-2">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-stone-900">Tamper-Evident GI Seal</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Every authentic piece is sealed with a physical GI Craft Passport hangtag and tamper-resistant serial badge verifying authentic maker origin.
                  </p>
                </div>
              </div>

              {/* Returns Section */}
              <div className="border-t border-stone-100 pt-6 space-y-4">
                <h3 className="text-lg font-bold text-[#2A1810] flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-[#C85A32]" />
                  <span>7-Day Handcrafted Return &amp; Replacement Guarantee</span>
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                  <p>
                    Because each item is meticulously hand-embroidered, wheel-thrown, or hand-loomed, subtle variations in stitch tension, clay hue, or weave texture are signatures of human craftsmanship, not defects.
                  </p>
                  <p>
                    <strong>Transit Damage / Quality Defect:</strong> If your craft piece arrives broken, stained, or torn during transit, we offer a <strong>100% free cluster replacement or full refund</strong> within 7 days of delivery.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-stone-500">
                    <li>Report transit damage within 7 days of package delivery with 2 photos of the parcel.</li>
                    <li>Refunds are initiated directly to the original payment source within 3–5 business days.</li>
                    <li>For custom-commissioned bulk enterprise batches, quality inspections occur at the cluster hub prior to final dispatch.</li>
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── TAB 2: PRIVACY POLICY ── */}
        {activeTab === "privacy" && (
          <ScrollReveal direction="up" className="pt-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Ethical Rural Data Governance</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2A1810]">
                  Privacy Policy &amp; Vernacular Data Protection
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  How we protect rural artisan voice recordings, banking credentials, and institutional buyer data.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                    <EyeOff className="w-4 h-4 text-[#C85A32]" />
                    <span>Vernacular Speech Privacy (kn-IN &amp; Tulu)</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Spoken Kannada and Coastal Tulu voice listings captured via the browser Web Speech API are processed transiently to extract craft slots (item name, units, fair price). <strong>Audio streams are never recorded for commercial surveillance or sold to third-party ad networks.</strong>
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 font-bold text-sm">
                    <Lock className="w-4 h-4 text-[#C85A32]" />
                    <span>Artisan DBT &amp; Banking Confidentiality</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Aadhaar-linked bank accounts and UPI VPA handles of rural artisans are strictly isolated. Bank details are utilized solely for direct wage payouts (75% maker earnings) and raw material advances, ensuring full financial dignity.
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-100 pt-6 space-y-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <h3 className="font-bold text-stone-900 text-base">Key Privacy Principles</h3>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Zero Ad-Tech Trackers:</strong> KalaSamanvaya does not run cross-site behavioural trackers or monetize rural community data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Enterprise Buyer Confidentiality:</strong> Corporate gifting requirements and custom embroidery motifs are kept strictly confidential.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Right to Erasure:</strong> Any artisan or buyer can request the complete removal of their contact record from cluster databases upon request.</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── TAB 3: TERMS & CONDITIONS ── */}
        {activeTab === "terms" && (
          <ScrollReveal direction="up" className="pt-8 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
              <div className="border-b border-stone-100 pb-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-semibold mb-2">
                  <Scale className="w-3.5 h-3.5" />
                  <span>Fair-Trade Marketplace Charter</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#2A1810]">
                  Terms &amp; Conditions: 100% Authentic Heritage Code
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Binding rules to protect genuine craftspeople and eliminate synthetic powerloom fakes.
                </p>
              </div>

              <div className="space-y-5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200">
                  <h3 className="font-bold text-amber-900 text-sm mb-1 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#C85A32]" />
                    <span>Strict Anti-Powerloom &amp; Anti-Replica Policy</span>
                  </h3>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    KalaSamanvaya exclusively lists verified hand-embroidery, handloom, and artisanal terracotta crafts. Any vendor attempting to pass machine-printed synthetic polyester as handmade Kasuti or factory plastic as Channapatna woodcraft will have their account permanently suspended.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-bold text-stone-900 text-sm">1. Fair Wage &amp; Cost Transparency Pledge</h3>
                  <p className="text-xs">
                    Every transaction processed on KalaSamanvaya guarantees our fair economic formula:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-medium text-xs">
                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                      <span className="block font-bold text-emerald-700 text-sm">75%</span>
                      <span className="text-stone-500 text-[11px]">Direct Maker Pay</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                      <span className="block font-bold text-amber-700 text-sm">12%</span>
                      <span className="text-stone-500 text-[11px]">Material Advance</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                      <span className="block font-bold text-stone-700 text-sm">5%</span>
                      <span className="text-stone-500 text-[11px]">SHG Quality Lead</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200">
                      <span className="block font-bold text-[#C85A32] text-sm">8%</span>
                      <span className="text-stone-500 text-[11px]">Platform Ops</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-stone-900 text-sm">2. Multi-Artisan Coordinated Fulfillment Rule</h3>
                  <p className="text-xs">
                    In high-volume B2B orders (50–500+ units), production is split across verified cluster members using our Match Scoring Index (MSI). If any maker suffers an unforeseen capacity shock, our dynamic standby buffer rebalances production to ensure delivery without contract default.
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-bold text-stone-900 text-sm">3. Transparent Dispute Resolution</h3>
                  <p className="text-xs">
                    Disputes are mediated with human SHG cluster leads at Dharwad and Udupi. If an institutional order faces an unavoidable regional delay, buyers are notified immediately with transparent timeline extension options rather than silent cancellations.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* ── TAB 4: BULK ENQUIRY ── */}
        {activeTab === "bulk" && (
          <ScrollReveal direction="up" className="pt-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Why Bulk on KalaSamanvaya (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#C85A32]/10 text-[#C85A32] text-xs font-semibold">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Enterprise &amp; Institutional Gifting</span>
                  </div>

                  <h2 className="text-xl font-bold text-[#2A1810]">
                    Bulk Corporate Orders Without Delivery Failure
                  </h2>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    Single artisans produce 30–50 units per month. When your company requires 200, 300, or 500 hand-crafted units for an annual summit or festive gifting, our <strong>algorithmic allocation engine</strong> splits and coordinates production across verified rural clusters.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zero Single-Point Bottlenecks:</strong> Coordinated across 3–5 certified makers with standby reserves.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>100% GI Authentic:</strong> Every unit comes with an official GI provenance QR tag and artisan story.</span>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Corporate ESG &amp; CSR Compliance:</strong> Verifiable 75% direct wage payout for ethical procurement.</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <Link
                      href="/b2b"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2A1810] hover:bg-[#3A1F0D] text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>Launch Live B2B Allocation Console</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <p className="text-[11px] text-stone-500 text-center mt-2">
                      Test our live deterministic allocation engine with 200 Kasuti Shawls
                    </p>
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="bg-[#F5EFEB] p-5 rounded-2xl border border-stone-200 text-xs text-stone-700 space-y-2.5">
                  <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">Direct Desk Contact</h3>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>+91 91138 09951 (Cluster Coordination Desk)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>info@kalasamanvaya.in</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Dharwad &amp; Udupi Cluster Coordination Hubs</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Bulk Enquiry Form (7 cols) */}
              <div className="lg:col-span-7">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#2A1810]">
                      Submit Institutional Bulk Request
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      Our cluster coordination leads will calculate feasibility and provide a multi-artisan delivery schedule within 24 hours.
                    </p>
                  </div>

                  {isSubmitted ? (
                    <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-emerald-900">
                        ಧನ್ಯವಾದಗಳು! Enquiry Submitted Successfully
                      </h4>
                      <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                        We have logged your bulk requirement for <strong>{formData.quantity}</strong> of <strong>{formData.craft}</strong>. Our cluster hub manager will reach out via email/phone shortly with a verified multi-artisan fulfillment quote.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-3 px-4 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-medium hover:bg-emerald-800 transition-colors"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Ramesh Hegde"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Organization / Company *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Infosys Gifting / Tech Summit 2026"
                            value={formData.organization}
                            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="e.g. procurement@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                          />
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Craft Tradition *
                          </label>
                          <select
                            value={formData.craft}
                            onChange={(e) => setFormData({ ...formData, craft: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                          >
                            <option>Kasuti Embroidery (ಧಾರವಾಡ)</option>
                            <option>Udupi Handloom Sarees (ಉಡುಪಿ)</option>
                            <option>Coastal Beedu Wildgrass (ಕರಾವಳಿ)</option>
                            <option>Khanapur Terracotta Pottery (ಬೆಳಗಾವಿ)</option>
                            <option>Bidar Bidriware Silver Inlay (ಬೀದರ್)</option>
                            <option>Channapatna Wooden Toys (ರಾಮನಗರ)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Batch Quantity *
                          </label>
                          <select
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                          >
                            <option>50 units (Pilot Batch)</option>
                            <option>100 units (Cluster Batch)</option>
                            <option>200 units (Corporate Benchmark)</option>
                            <option>500 units (Mass Festival Gifting)</option>
                            <option>1,000+ units (Multi-Cluster)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-stone-700 font-semibold mb-1">
                            Delivery Deadline *
                          </label>
                          <select
                            value={formData.deadlineDays}
                            onChange={(e) => setFormData({ ...formData, deadlineDays: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                          >
                            <option>15 days (Express Multi-Cluster)</option>
                            <option>20 days (Standard Benchmark)</option>
                            <option>30 days (Relaxed Crafting)</option>
                            <option>45+ days (Masterpiece Custom)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-stone-700 font-semibold mb-1">
                          Customization / Packaging Requirements
                        </label>
                        <textarea
                          rows={3}
                          placeholder="e.g. Need individual heritage gift boxes with custom corporate brass logo tag and GI certificate cards."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32] text-xs bg-[#FAF7F2]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#C85A32] hover:bg-[#b04b27] text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Bulk Enquiry for Cluster Coordination</span>
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </ScrollReveal>
        )}

      </section>
    </div>
  );
}

export default function HelpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 border-2 border-[#C85A32] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs text-stone-600 font-medium">Loading Help &amp; Policies...</p>
          </div>
        </div>
      }
    >
      <HelpPageContent />
    </Suspense>
  );
}