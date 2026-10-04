"use client";

import React, { useState, useEffect } from "react";
import { ArtisanProduct } from "@/lib/db/products";
import { playSpeech, stopSpeech } from "@/lib/voice/playSpeech";
import {
  X,
  Award,
  ShieldCheck,
  Volume2,
  VolumeX,
  Printer,
  MapPin,
  CheckCircle2,
  Clock,
  Fingerprint,
  QrCode,
  Share2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

interface CraftPassportModalProps {
  product: ArtisanProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CraftPassportModal({
  product,
  isOpen,
  onClose,
}: CraftPassportModalProps) {
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Audio speech synthesis in native Kannada
  const playArtisanGreeting = () => {
    if (isPlayingVoice) {
      stopSpeech();
      setIsPlayingVoice(false);
      return;
    }

    const kannadaGreeting =
      product?.craftType === "Kasuti"
        ? "ನಮಸ್ಕಾರ! ನನ್ನ ಹೆಸರು ಸವಿತಾ ನಾಯಕ್. ಧಾರವಾಡದ ನಮ್ಮ ಕಸೂತಿ ಸಂಘದಿಂದ 38 ಗಂಟೆಗಳ ಕಾಲ ಸೂಕ್ಷ್ಮವಾಗಿ ಕೈಯಿಂದಲೇ ಹೊಲಿದು ಈ ರೇಷ್ಮೆ ಶಾಲನ್ನು ಸಿದ್ಧಪಡಿಸಿದ್ದೇನೆ. ನಮ್ಮ ಕಲಾ ಪರಂಪರೆ ಗೌರವಿಸಿ ಖರೀದಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು."
        : product?.craftType === "Beedu"
        ? "ನಮಸ್ಕಾರ! ನನ್ನ ಹೆಸರು ಪಾರ್ವತಿ ಮಡಿವಾಳ. ಉಡುಪಿಯ ನದೀತೀರದ ಕಾಡುಹುಲ್ಲನ್ನು ಮೂರು ವಾರ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ, ಕೈಯಿಂದ ಹೆಣೆದು ಈ ಬುಟ್ಟಿಯನ್ನು ತಯಾರಿಸಿದ್ದೇನೆ. ನಮ್ಮ ಕರಾವಳಿ ಪರಂಪರೆ ಬೆಂಬಲಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು."
        : "ನಮಸ್ಕಾರ! ಖಾನಾಪುರದ ಕೆಂಪು ಮಣ್ಣಿನಿಂದ ಚಕ್ರದ ಮೇಲೆ ಕೈಯಿಂದಲೇ ತಿರುಗಿಸಿ, ಸಾಂಪ್ರದಾಯಿಕ ಕಟ್ಟಿಗೆ ಭಟ್ಟಿಯಲ್ಲಿ ಬೇಯಿಸಿ ಈ ಕಲಾಕೃತಿ ರೂಪಿಸಿದ್ದೇನೆ. ಧನ್ಯವಾದಗಳು.";

    playSpeech(
      kannadaGreeting,
      "kn",
      () => setIsPlayingVoice(true),
      () => setIsPlayingVoice(false)
    );
  };

  // Stop audio if modal closes
  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      setIsPlayingVoice(false);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  // Real mock GI registration numbers per craft
  const giNumber =
    product.craftType === "Kasuti"
      ? "GI-AP-KASUTI-2006-089"
      : product.craftType === "Beedu"
      ? "GI-UDUPI-BEEDU-2018-142"
      : "GI-BELAGAVI-POTTERY-2012-074";

  const coordinates =
    product.craftType === "Kasuti"
      ? "15.4589° N, 75.0078° E (Hubballi-Dharwad)"
      : product.craftType === "Beedu"
      ? "13.3409° N, 74.7421° E (Udupi Coastal)"
      : "15.6322° N, 74.5147° E (Khanapur Belt)";

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `https://kalasamanvaya.org/provenance/${product.id}`
      );
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#FAF6F0] rounded-3xl shadow-2xl border-2 border-amber-900/30 overflow-hidden text-[#2A1810]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-[#24130A] text-[#FAF6F0] px-6 py-4 flex items-center justify-between border-b border-amber-800/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E67E22] text-white flex items-center justify-center shadow-md">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold tracking-wide">
                  GI Craft Passport & Provenance Certificate
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-700/50">
                  ಅಧಿಕೃತ ಪ್ರಮಾಣಪತ್ರ
                </span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                Karnataka Geographical Indication Registry • 100% Handcrafted Authenticity Guarantee
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close passport"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 max-h-[82vh] overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* ── LEFT COLUMN: PRINTABLE PHYSICAL HANGTAG (Perforated Seal Design) ── */}
            <div className="lg:col-span-5 bg-[#FDFBF7] p-5 sm:p-6 rounded-2xl border-2 border-dashed border-amber-800/40 shadow-sm relative space-y-5 print:shadow-none print:border-solid">
              
              {/* Top Perforated String Hole Motif */}
              <div className="w-5 h-5 rounded-full bg-[#FAF6F0] border-2 border-amber-800/40 mx-auto -mt-2 shadow-inner flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#24130A]" />
              </div>

              {/* Tag Branding */}
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-[#E67E22] uppercase tracking-widest block">
                  ಕಲಾ ಸಮನ್ವಯ • KalaSamanvaya
                </span>
                <h4 className="text-base font-extrabold text-[#2A1810] leading-snug">
                  Artisan Provenance Tag
                </h4>
                <p className="text-[10px] text-stone-500">
                  Attach to physical craft packaging
                </p>
              </div>

              {/* Scannable QR Code Canvas */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col items-center justify-center space-y-2 shadow-xs">
                {/* Clean Scalable QR Representation */}
                <div className="relative p-2 bg-white rounded-lg border-2 border-stone-900">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://kalasamanvaya.org/provenance/${product.id}&color=42-24-16&bgcolor=255-255-255`}
                    alt={`Provenance QR Code for ${product.title}`}
                    className="w-36 h-36 object-contain"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="w-7 h-7 rounded-md bg-[#24130A] text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                      ಕಲಾ
                    </span>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <span className="font-mono text-[11px] font-bold text-[#C85A32] block">
                    ID: {product.id.toUpperCase()}
                  </span>
                  <span className="text-[9px] text-stone-400">
                    Scan with any smartphone camera
                  </span>
                </div>
              </div>

              {/* Official Seal & Certificate Stamp */}
              <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 text-center space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-900 block tracking-wider">
                  Karnataka GI Registration No.
                </span>
                <span className="font-mono text-xs font-extrabold text-[#2A1810] block">
                  {giNumber}
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>100% Genuine Living Craft</span>
                </span>
              </div>

              {/* Print Action Button */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#2A1810] hover:bg-[#3D2318] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Printer className="w-4 h-4 text-amber-300" />
                  <span>ಪ್ರಮಾಣಪತ್ರ ಮುದ್ರಿಸಿ (Print Hangtag)</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="w-full py-2 px-3 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Link Copied! ✓" : "Copy Digital Certificate Link"}</span>
                </button>
              </div>

            </div>

            {/* ── RIGHT COLUMN: INTERACTIVE PROVENANCE & VOICE GREETING ── */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* 1. Artisan Audio Greeting Feature */}
              <div className="bg-white p-5 rounded-2xl border-2 border-amber-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#E67E22] uppercase tracking-wider">
                      ಕಲಾಕಾರರ ಧ್ವನಿ ಆಶೀರ್ವಾದ • Artisan Audio Blessing
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">
                    15s • Spoken Kannada
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-stone-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#E67E22] text-white font-bold text-lg flex items-center justify-center shadow-xs flex-shrink-0">
                      {product.artisanName.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-stone-900 text-sm">
                        {product.artisanName}
                      </h5>
                      <p className="text-xs text-stone-500">
                        {product.artisanCluster} ({product.artisanDistrict})
                      </p>
                    </div>
                  </div>

                  {/* Play Voice Button */}
                  <button
                    type="button"
                    onClick={playArtisanGreeting}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs ${
                      isPlayingVoice
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-[#E67E22] hover:bg-[#cf6d17] text-white active:scale-95"
                    }`}
                  >
                    {isPlayingVoice ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>ವಿರಾಮ ನೀಡಿ (Stop Audio)</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>ಧ್ವನಿ ಕೇಳಿ (Play Voice Note)</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Kannada Audio Transcript Box */}
                <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 text-xs leading-relaxed text-stone-800 italic">
                  &ldquo;
                  {product.craftType === "Kasuti"
                    ? "ನಮಸ್ಕಾರ! ನನ್ನ ಹೆಸರು ಸವಿತಾ ನಾಯಕ್. ಧಾರವಾಡದ ನಮ್ಮ ಕಸೂತಿ ಸಂಘದಿಂದ 38 ಗಂಟೆಗಳ ಕಾಲ ಸೂಕ್ಷ್ಮವಾಗಿ ಕೈಯಿಂದಲೇ ಹೊಲಿದು ಈ ರೇಷ್ಮೆ ಶಾಲನ್ನು ಸಿದ್ಧಪಡಿಸಿದ್ದೇನೆ. ನಮ್ಮ ಕಲಾ ಪರಂಪರೆ ಗೌರವಿಸಿ ಖರೀದಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು."
                    : product.craftType === "Beedu"
                    ? "ನಮಸ್ಕಾರ! ನನ್ನ ಹೆಸರು ಪಾರ್ವತಿ ಮಡಿವಾಳ. ಉಡುಪಿಯ ನದೀತೀರದ ಕಾಡುಹುಲ್ಲನ್ನು ಮೂರು ವಾರ ಬಿಸಿಲಿನಲ್ಲಿ ಒಣಗಿಸಿ, ಕೈಯಿಂದ ಹೆಣೆದು ಈ ಬುಟ್ಟಿಯನ್ನು ತಯಾರಿಸಿದ್ದೇನೆ. ನಮ್ಮ ಕರಾವಳಿ ಪರಂಪರೆ ಬೆಂಬಲಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು."
                    : "ನಮಸ್ಕಾರ! ಖಾನಾಪುರದ ಕೆಂಪು ಮಣ್ಣಿನಿಂದ ಚಕ್ರದ ಮೇಲೆ ಕೈಯಿಂದಲೇ ತಿರುಗಿಸಿ, ಸಾಂಪ್ರದಾಯಿಕ ಕಟ್ಟಿಗೆ ಭಟ್ಟಿಯಲ್ಲಿ ಬೇಯಿಸಿ ಈ ಕಲಾಕೃತಿ ರೂಪಿಸಿದ್ದೇನೆ. ಧನ್ಯವಾದಗಳು."}
                  &rdquo;
                </div>
              </div>

              {/* 2. Verifiable Provenance Specification Grid */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center gap-2">
                  <Fingerprint className="w-4 h-4 text-[#C85A32]" />
                  <span>Stitch-Level Technical Provenance</span>
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Geographic Cluster & GPS
                    </span>
                    <strong className="text-stone-900 block">
                      {product.artisanCluster}
                    </strong>
                    <span className="text-[11px] text-[#C85A32] font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{coordinates}</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Handwork Hours Count
                    </span>
                    <strong className="text-stone-900 block">
                      {product.craftType === "Kasuti" ? "38 Hours Needlework" : "18 Hours Handcrafting"}
                    </strong>
                    <span className="text-[11px] text-stone-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#E67E22]" />
                      <span>Counted-Thread Gavanti & Murgi</span>
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Raw Material Tracing
                    </span>
                    <strong className="text-stone-900 block">
                      Pure Mulberry Silk & Khadi Cotton
                    </strong>
                    <span className="text-[11px] text-emerald-800 font-medium">
                      Natural Vegetable Dyes (No synthetics)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-stone-200 space-y-1">
                    <span className="text-[10px] text-stone-500 uppercase font-semibold block">
                      Artisan Direct Compensation
                    </span>
                    <strong className="text-emerald-700 text-sm block">
                      ₹{product.breakdown.artisanDirectPayoutINR.toLocaleString("en-IN")} ({product.breakdown.artisanSharePercent}% Payout)
                    </strong>
                    <span className="text-[11px] text-stone-600">
                      Direct DBT Aadhaar bank deposit
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Anti-Counterfeit Machine Contrast Badge */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-stone-700 space-y-0.5">
                  <strong className="text-[#2A1810] block text-sm">
                    Why Machine Replicas Fail This Test:
                  </strong>
                  <p className="leading-relaxed">
                    Powerloom synthetic prints take 4 minutes and leave ugly thread knots on the reverse side. An authentic Dharwad Kasuti piece uses reversible counted stitches where both sides look identical with zero knots.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF7F2] px-6 py-3.5 border-t border-stone-200 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            Certified by KalaSamanvaya Provenance Engine
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2A1810] hover:bg-[#3D2318] text-white font-bold transition-colors"
          >
            Close Passport
          </button>
        </div>
      </div>
    </div>
  );
}
