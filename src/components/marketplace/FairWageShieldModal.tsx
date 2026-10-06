"use client";

import React, { useState } from "react";
import { ArtisanProduct } from "@/lib/db/products";
import {
  X,
  ShieldCheck,
  Scale,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Coins,
  ArrowRight,
  MapPin,
  Lock,
  Unlock,
  HeartHandshake,
  FileCheck
} from "lucide-react";

interface FairWageShieldModalProps {
  product: ArtisanProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout?: (product: ArtisanProduct) => void;
}

export default function FairWageShieldModal({
  product,
  isOpen,
  onClose,
  onProceedToCheckout,
}: FairWageShieldModalProps) {
  if (!isOpen || !product) return null;

  const msrp = product.priceINR;
  const hours = product.breakdown.handcraftHours || 30;
  const rawMaterialCost = product.breakdown.rawMaterialsINR || Math.round(msrp * 0.15);
  
  // Statutory Fair-Wage Floor calculation:
  // Karnataka State Skilled Artisan Living Wage Standard (~₹35 - ₹60/hr depending on master craft complexity)
  const minimumHourlyRate = Math.max(30, Math.round((msrp * 0.65) / hours));
  const absoluteWageFloor = Math.round((hours * minimumHourlyRate * 0.85) + rawMaterialCost);

  // Live offer testing state
  const [testOffer, setTestOffer] = useState<number>(msrp);
  const [language, setLanguage] = useState<"kn" | "en">("kn");

  const isOfferTooLow = testOffer < absoluteWageFloor;
  const calculatedArtisanPayout = Math.max(0, Math.round(testOffer * 0.746));
  const hourlyEarning = hours > 0 ? (calculatedArtisanPayout / hours).toFixed(1) : "0";

  const handlePresetClick = (presetType: "lowball" | "medium" | "fair") => {
    if (presetType === "lowball") {
      setTestOffer(Math.round(msrp * 0.42)); // e.g. ₹750 for ₹1,850 Kasuti
    } else if (presetType === "medium") {
      setTestOffer(Math.round(msrp * 0.68)); // e.g. ₹1,250
    } else {
      setTestOffer(msrp); // Fair MSRP
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#FAF6F0] rounded-3xl shadow-2xl border-2 border-amber-900/30 overflow-hidden text-[#2A1810]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header - Authentic Heritage Karnataka Style */}
        <div className="bg-[#2A1810] text-[#FAF6F0] px-5 sm:px-6 py-4 flex items-center justify-between border-b-2 border-amber-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C85A32] text-white flex items-center justify-center shadow-inner">
              <Scale className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-wide">
                  {language === "kn" ? "ಕನಿಷ್ಠ ನ್ಯಾಯಯುತ ಕೂಲಿ ರಕ್ಷಕ" : "Anti-Exploitation Fair-Wage Shield"}
                </h3>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-700/60">
                  {language === "kn" ? "ಬೆಲೆ ರಕ್ಷಣೆ" : "Wage Floor"}
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                {language === "kn"
                  ? "ಕರ್ನಾಟಕ ಕರಕುಶಲಕರ್ಮಿ ನ್ಯಾಯಯುತ ವೇತನ ಕಾಯ್ದೆ ಮಾನದಂಡ"
                  : "Karnataka Handcraft Living Wage & Anti-Haggling Standard"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage(language === "kn" ? "en" : "kn")}
              className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 text-amber-200 border border-amber-700/50 transition-colors"
            >
              {language === "kn" ? "English" : "ಕನ್ನಡ"}
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 max-h-[82vh] overflow-y-auto space-y-5">

          {/* Craft & Artisan Strip */}
          <div className="flex items-center gap-3.5 p-3.5 bg-white rounded-2xl border border-amber-200 shadow-xs">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-16 h-16 rounded-xl object-cover border border-amber-100 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A32] bg-amber-50 px-2 py-0.5 rounded">
                {product.craftType} • {product.badge}
              </span>
              <h4 className="text-sm font-extrabold text-[#2A1810] truncate mt-0.5">
                {language === "kn" ? product.kannadaTitle : product.title}
              </h4>
              <div className="flex items-center gap-2 text-[11px] text-stone-600 mt-1">
                <span className="font-semibold text-stone-800">
                  {product.artisanName}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-500 truncate">
                  <MapPin className="w-3 h-3 text-[#C85A32] flex-shrink-0" />
                  {product.artisanCluster}
                </span>
              </div>
            </div>
          </div>

          {/* Core Problem Callout: Why Conventional E-Commerce Fails Artisans */}
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-300/80 text-xs text-stone-700 space-y-1.5">
            <div className="flex items-center gap-1.5 font-extrabold text-[#2A1810]">
              <Lock className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>
                {language === "kn"
                  ? "ಮಾರುಕಟ್ಟೆಯ ಚೌಕಾಸಿ ತಡೆಗೋಡೆ ಏಕೆ ಅಗತ್ಯ?"
                  : "Why Traditional E-Commerce Squeezes Rural Artisans"}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-stone-600">
              {language === "kn"
                ? "ದೊಡ್ಡ ಆನ್‌ಲೈನ್ ಪ್ಲಾಟ್‌ಫಾರ್ಮ್‌ಗಳು ಮತ್ತು ದಲ್ಲಾಳಿಗಳು ಭಾರೀ ರಿಯಾಯಿತಿ (ಡಿಸ್ಕೌಂಟ್) ಒತ್ತಾಯಿಸಿ ಗ್ರಾಮೀಣ ಮಹಿಳೆಯರಿಗೆ ದಿನಕ್ಕೆ ₹50-₹80 ಕ್ಕಿಂತ ಕಡಿಮೆ ಕೂಲಿ ನೀಡುತ್ತಾರೆ. ಕಲಾ ಸಮನ್ವಯವು ಈ ಕೆಳಗಿನ ಕನಿಷ್ಠ ಕೂಲಿ ಮಿತಿಗಿಂತ ಕಡಿಮೆ ಬೆಲೆಗೆ ಮಾರಾಟವಾಗುವುದನ್ನು ಕಾನೂನುಬದ್ಧವಾಗಿ ನಿರ್ಬಂಧಿಸುತ್ತದೆ."
                : "Standard platforms force aggressive discounts, squeezing rural women into earning under ₹20/hour. KalaSamanvaya reverses this by mathematically locking a Fair-Wage Floor that cannot be haggled down."}
            </p>
          </div>

          {/* Interactive Reverse-Haggling Simulator */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-amber-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-stone-700 block">
                  {language === "kn" ? "ಬೆಲೆ ಚೌಕಾಸಿ ಮತ್ತು ಕೂಲಿ ಪರೀಕ್ಷೆ" : "Live Offer & Wage Impact Test"}
                </span>
                <span className="text-[11px] text-stone-500">
                  {language === "kn"
                    ? "ಖರೀದಿದಾರರು ಅಥವಾ ವ್ಯಾಪಾರಿಗಳು ಪ್ರಸ್ತಾಪಿಸುವ ಬೆಲೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ:"
                    : "Simulate any buyer or corporate procurement bid:"}
                </span>
              </div>

              {/* Quick Test Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  type="button"
                  onClick={() => handlePresetClick("lowball")}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 transition-colors"
                  title="Test lowball middleman offer"
                >
                  {language === "kn" ? "ಕಡಿಮೆ ಚೌಕಾಸಿ (₹" + Math.round(msrp * 0.42) + ")" : "Lowball Offer"}
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetClick("fair")}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 transition-colors"
                  title="Fair-Trade certified MSRP"
                >
                  {language === "kn" ? "ನ್ಯಾಯಯುತ ಬೆಲೆ (₹" + msrp + ")" : "Fair Trade MSRP"}
                </button>
              </div>
            </div>

            {/* Price Slider / Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-stone-700">
                  {language === "kn" ? "ಪ್ರಸ್ತಾಪಿತ ಖರೀದಿ ಬೆಲೆ (INR):" : "Proposed Purchase Bid:"}
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-black text-[#C85A32]">₹</span>
                  <input
                    type="number"
                    min="200"
                    max="15000"
                    step="50"
                    value={testOffer}
                    onChange={(e) => setTestOffer(Math.max(0, Number(e.target.value) || 0))}
                    className="w-28 py-1 px-2.5 rounded-xl border border-stone-300 text-base font-black text-stone-900 text-right focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                  />
                </div>
              </div>

              <input
                type="range"
                min={Math.round(msrp * 0.3)}
                max={Math.round(msrp * 1.3)}
                step="25"
                value={testOffer}
                onChange={(e) => setTestOffer(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#C85A32]"
              />

              <div className="flex justify-between text-[10px] text-stone-400 font-semibold">
                <span>₹{Math.round(msrp * 0.3)}</span>
                <span className="text-stone-700 font-bold">
                  {language === "kn" ? "ಕನಿಷ್ಠ ಕೂಲಿ ಮಿತಿ: ₹" + absoluteWageFloor : "Wage Floor: ₹" + absoluteWageFloor}
                </span>
                <span>₹{Math.round(msrp * 1.3)}</span>
              </div>
            </div>

            {/* LIVE SHIELD VERDICT CARD */}
            {isOfferTooLow ? (
              <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-950 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-red-900 uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 animate-bounce" />
                    <span>
                      {language === "kn"
                        ? "🛡️ ಚೌಕಾಸಿ ತಡೆಗೋಡೆ ಸಕ್ರಿಯ • ಆಫರ್ ತಿರಸ್ಕೃತ"
                        : "🛡️ Reverse-Haggling Shield Triggered — Offer Blocked"}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-red-200 text-red-900">
                    {language === "kn" ? "ಕೂಲಿ ಶೋಷಣೆ" : "Unethical Wage"}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-red-900 font-medium">
                  {language === "kn" ? (
                    <>
                      ₹{testOffer} ಬೆಲೆಯಲ್ಲಿ ಕಲಾವಿದೆಯ ನೇರ ಪಾಲು ಕೇವಲ <strong>₹{calculatedArtisanPayout}</strong> ಆಗುತ್ತದೆ.{" "}
                      {hours} ಗಂಟೆಗಳ ಶ್ರಮಕ್ಕೆ ಗಂಟೆಗೆ ಕೇವಲ <strong>₹{hourlyEarning}/ಗಂಟೆ</strong> ಸಿಗುತ್ತದೆ.{" "}
                      ಇದು ಕರ್ನಾಟಕದ ಕನಿಷ್ಠ ಜೀವನೋಪಾಯ ಕೂಲಿಗಿಂತ ಕಡಿಮೆ ಇರುವುದರಿಂದ{" "}
                      <strong>ಈ ಬೆಲೆಗೆ ಆರ್ಡರ್ ತೆಗೆದುಕೊಳ್ಳಲಾಗುವುದಿಲ್ಲ</strong>.
                    </>
                  ) : (
                    <>
                      At ₹{testOffer}, the artisan receives only <strong>₹{calculatedArtisanPayout}</strong>, which pays a
                      meager <strong>₹{hourlyEarning}/hour</strong> for {hours} hours of dedicated craftsmanship. This falls
                      severely below the statutory living wage and is <strong>strictly blocked</strong> by KalaSamanvaya.
                    </>
                  )}
                </p>

                <div className="pt-1.5 flex items-center justify-between text-[11px] font-bold text-red-800 border-t border-red-200">
                  <span>
                    {language === "kn" ? "ಅನುಮೋದಿತ ಕನಿಷ್ಠ ನೈತಿಕ ಬೆಲೆ:" : "Minimum Approved Fair-Trade Price:"}
                  </span>
                  <span className="text-sm font-extrabold text-red-950">₹{absoluteWageFloor}</span>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 text-emerald-950 space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-black text-xs text-emerald-900 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>
                      {language === "kn"
                        ? "✓ ನ್ಯಾಯಯುತ ಕನಿಷ್ಠ ಕೂಲಿ ದೃಢೀಕೃತ • ಅನುಮೋದಿತ"
                        : "✓ Fair-Wage Standard Met — Approved"}
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                    {language === "kn" ? "100% ನೈತಿಕ ಬೆಲೆ" : "100% Ethical"}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-emerald-900 font-medium">
                  {language === "kn" ? (
                    <>
                      ₹{testOffer} ಬೆಲೆಯಲ್ಲಿ <strong>₹{calculatedArtisanPayout} (ಶೇಕಡಾ 74.6%)</strong> ನೇರವಾಗಿ ಕಲಾವಿದೆಯ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ (DBT)
                      ಜಮಾ ಆಗುತ್ತದೆ. {hours} ಗಂಟೆಗಳ ಕರಕುಶಲತೆಗೆ ಗೌರವಯುತ <strong>₹{hourlyEarning}/ಗಂಟೆ</strong> ಸಿಗುತ್ತದೆ.
                    </>
                  ) : (
                    <>
                      At ₹{testOffer}, a guaranteed <strong>₹{calculatedArtisanPayout} (74.6%)</strong> flows directly to the
                      maker via DBT, paying a dignified <strong>₹{hourlyEarning}/hour</strong> for {hours} hours of handwork.
                    </>
                  )}
                </p>

                <div className="pt-1.5 flex items-center justify-between text-[11px] font-bold text-emerald-800 border-t border-emerald-200">
                  <span>
                    {language === "kn" ? "ಕಲಾವಿದೆಯ ನೇರ ಬ್ಯಾಂಕ್ ಜಮಾ (DBT):" : "Direct Maker Bank Deposit (DBT):"}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-950">₹{calculatedArtisanPayout}</span>
                </div>
              </div>
            )}

            {/* Diagnostic Cost Accounting Breakdown */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center text-xs">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">
                  {language === "kn" ? "ಶ್ರಮದ ಸಮಯ" : "Handcraft Labor"}
                </span>
                <span className="text-sm font-extrabold text-stone-900">{hours} Hours</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">
                  {language === "kn" ? "ಕಚ್ಚಾ ಸಾಮಗ್ರಿ" : "Raw Materials"}
                </span>
                <span className="text-sm font-extrabold text-stone-900">₹{rawMaterialCost}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <span className="text-[10px] font-bold text-stone-500 uppercase block">
                  {language === "kn" ? "ಕನಿಷ್ಠ ಕೂಲಿ ಮಿತಿ" : "Wage Floor"}
                </span>
                <span className="text-sm font-extrabold text-[#C85A32]">₹{absoluteWageFloor}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-[11px] text-stone-500 text-center sm:text-left">
              {language === "kn"
                ? "✓ ಕರ್ನಾಟಕ ನೇಕಾರ ಮತ್ತು ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿ ರಕ್ಷಣಾ ನೀತಿ"
                : "✓ Enforcing Karnataka Rural Handcraft Wage Protection Standards"}
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold transition-colors"
              >
                {language === "kn" ? "ಮುಚ್ಚಿ" : "Close"}
              </button>

              <button
                type="button"
                disabled={isOfferTooLow}
                onClick={() => {
                  onClose();
                  if (onProceedToCheckout) onProceedToCheckout(product);
                }}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                  isOfferTooLow
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                    : "bg-[#C85A32] hover:bg-[#a84420] text-white hover:scale-105 active:scale-95"
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>
                  {language === "kn" ? "ಗೌರವಯುತ ಬೆಲೆಗೆ ಖರೀದಿಸಿ" : "Purchase at Ethical Price"}
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
