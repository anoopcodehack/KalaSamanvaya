"use client";

import React from "react";
import { ArtisanProduct } from "@/lib/db/products";
import { X, Clock, Receipt, ArrowRight, ShieldCheck, HeartHandshake, AlertCircle, MapPin, CheckCircle2 } from "lucide-react";

interface WhyThisPriceModalProps {
  product: ArtisanProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (product: ArtisanProduct) => void;
}

export default function WhyThisPriceModal({
  product,
  isOpen,
  onClose,
  onProceedToCheckout
}: WhyThisPriceModalProps) {
  if (!isOpen || !product) return null;

  const { breakdown } = product;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#FAF6F0] rounded-2xl shadow-2xl border border-amber-900/20 overflow-hidden text-[#2A1810]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header with Indian Decorative Strip */}
        <div className="bg-[#2A1810] text-[#FAF6F0] px-6 py-4 flex items-center justify-between border-b border-amber-800/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#D9822B] text-white flex items-center justify-center font-bold">
              <Receipt className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold tracking-wide">Why This Price?</h3>
                <span className="text-xs font-medium text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/50">
                  ಬೆಲೆಯ ಹಿಂದಿನ ಶ್ರಮ
                </span>
              </div>
              <p className="text-xs text-amber-200/80">
                Transparent Craft Economics & Fair Artisan Wage Breakdown
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          {/* Product & Artisan Profile Strip */}
          <div className="flex flex-col sm:flex-row gap-5 p-4 bg-white rounded-xl border border-amber-200/70 shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full sm:w-32 h-32 object-cover rounded-lg border border-amber-100 shadow-inner"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-amber-100 text-[#C85A32] rounded">
                  {product.badge}
                </span>
                <span className="text-xs text-stone-500">• {product.categoryLabel}</span>
              </div>
              <h4 className="text-base font-bold text-[#2A1810]">{product.title}</h4>
              <p className="text-xs text-stone-600 mb-2">{product.kannadaTitle}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-stone-700 pt-2 border-t border-amber-100">
                <div className="flex items-center gap-1 font-medium text-[#C85A32]">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Made by {product.artisanName}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-600">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{product.artisanCluster} ({product.artisanDistrict})</span>
                </div>
                <div className="flex items-center gap-1 text-amber-800 font-semibold bg-amber-50 px-2 py-0.5 rounded">
                  <Clock className="w-3.5 h-3.5 text-[#D9822B]" />
                  <span>{breakdown.handcraftHours} Hours of Needlework</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transparent Cost Breakdown Section */}
          <div className="bg-white p-5 rounded-xl border border-amber-200/70 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-bold text-sm text-[#2A1810] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C85A32]" />
                Where Every Rupee Goes (Total: ₹{product.priceINR.toLocaleString("en-IN")})
              </h5>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                {breakdown.artisanSharePercent}% Directly to Artisan
              </span>
            </div>

            {/* Visual Stacked Progress Bar */}
            <div className="w-full h-4 rounded-full overflow-hidden flex bg-stone-200 mb-4 shadow-inner">
              <div
                style={{ width: `${breakdown.artisanSharePercent}%` }}
                className="bg-[#C85A32] h-full"
                title={`Artisan Wage: ₹${breakdown.artisanDirectPayoutINR}`}
              />
              <div
                style={{ width: `${Math.round((breakdown.rawMaterialsINR / product.priceINR) * 100)}%` }}
                className="bg-[#D9822B] h-full"
                title={`Raw Materials: ₹${breakdown.rawMaterialsINR}`}
              />
              <div
                style={{ width: `${Math.round((breakdown.clusterPackagingLogisticsINR / product.priceINR) * 100)}%` }}
                className="bg-[#8B5E3C] h-full"
                title={`Logistics: ₹${breakdown.clusterPackagingLogisticsINR}`}
              />
              <div
                style={{ width: `${Math.round((breakdown.platformCoordinationFeeINR / product.priceINR) * 100)}%` }}
                className="bg-[#5C3D2E] h-full"
                title={`Platform: ₹${breakdown.platformCoordinationFeeINR}`}
              />
            </div>

            {/* 4 Cost Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/50">
                <div className="flex items-center gap-1.5 text-[#C85A32] font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
                  <span>Artisan Earnings</span>
                </div>
                <div className="text-base font-bold text-[#2A1810]">
                  ₹{breakdown.artisanDirectPayoutINR.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Direct fair wage for {breakdown.handcraftHours} hours
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/50">
                <div className="flex items-center gap-1.5 text-[#D9822B] font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#D9822B]" />
                  <span>Raw Materials</span>
                </div>
                <div className="text-base font-bold text-[#2A1810]">
                  ₹{breakdown.rawMaterialsINR.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Authentic natural threads & dyes
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/50">
                <div className="flex items-center gap-1.5 text-[#8B5E3C] font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#8B5E3C]" />
                  <span>Cluster Logistics</span>
                </div>
                <div className="text-base font-bold text-[#2A1810]">
                  ₹{breakdown.clusterPackagingLogisticsINR.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Packaging, QC & rural shipping
                </p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-lg border border-amber-200/50">
                <div className="flex items-center gap-1.5 text-[#5C3D2E] font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#5C3D2E]" />
                  <span>Platform Fee</span>
                </div>
                <div className="text-base font-bold text-[#2A1810]">
                  ₹{breakdown.platformCoordinationFeeINR.toLocaleString("en-IN")}
                </div>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  3.8% infrastructure maintenance
                </p>
              </div>
            </div>
          </div>

          {/* Craft Heritage & Technique Note */}
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs space-y-2">
            <div className="font-bold text-sm text-[#2A1810] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D9822B]" />
              Craft Heritage & Technique: {breakdown.techniqueName}
            </div>
            <p className="text-stone-700 leading-relaxed">
              {product.craftStory}
            </p>
            <div className="pt-2 text-[11px] text-stone-600 flex items-center gap-1.5 font-medium border-t border-amber-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <span>{breakdown.regionalHeritageNote}</span>
            </div>
          </div>

          {/* Authentic Handmade vs Factory Machine Comparison Table */}
          <div className="bg-white p-5 rounded-xl border border-amber-200/70 shadow-sm">
            <h5 className="font-bold text-sm text-[#2A1810] mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Why Avoid Cheap Machine Replicas?
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Authentic Handmade Column */}
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-emerald-900 text-sm">Authentic Handmade</span>
                  <span className="px-2 py-0.5 bg-emerald-200 text-emerald-950 font-bold rounded">
                    ₹{product.priceINR.toLocaleString("en-IN")}
                  </span>
                </div>
                <ul className="space-y-1.5 text-emerald-950 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span><strong>{breakdown.handcraftHours} hours</strong> of counted thread needlework.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Front & back identical; zero knots visible.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span><strong>₹{breakdown.artisanDirectPayoutINR}</strong> directly supports {product.artisanName}&apos;s household.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <span>Natural organic dyes and pure mulberry silk.</span>
                  </li>
                </ul>
              </div>

              {/* Machine Powerloom Replica Column */}
              <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-rose-900 text-sm">Powerloom Mill Copy</span>
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-900 font-bold rounded">
                    ~₹{breakdown.powerloomMachinePrintCompareINR}
                  </span>
                </div>
                <ul className="space-y-1.5 text-rose-950 text-[11px]">
                  <li className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span><strong>{breakdown.powerloomMachineMinutes} minutes</strong> automated machine print.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Messy backside with loose polyester threads.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span><strong>₹0</strong> goes to rural artisans; profits factory mill owners.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <X className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>Synthetic chemical nylon / polyester yarns.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-[#2A1810]/5 px-6 py-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-600 text-center sm:text-left">
            <span>Authenticity Guarantee • Handcrafted in {product.artisanDistrict}, Karnataka</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-amber-300 text-stone-700 bg-white hover:bg-stone-50 font-medium text-xs transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout(product);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-[#C85A32] hover:bg-[#A34828] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Support {product.artisanName} (₹{product.priceINR.toLocaleString("en-IN")})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
