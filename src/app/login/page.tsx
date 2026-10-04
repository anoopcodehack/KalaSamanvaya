"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import {
  User,
  ShieldCheck,
  Building2,
  ShoppingBag,
  Mic,
  ArrowRight,
  Phone,
  KeyRound,
  CheckCircle2,
  Volume2,
  ChevronRight,
  PackageCheck
} from "lucide-react";

type UserRole = "artisan" | "enterprise" | "patron";

interface DemoUser {
  id: string;
  role: UserRole;
  name: string;
  nameKn: string;
  title: string;
  titleKn: string;
  badge: string;
  phone: string;
  avatarChar: string;
  defaultRoute: string;
}

const DEMO_PERSONAS: DemoUser[] = [
  {
    id: "user-artisan-01",
    role: "artisan",
    name: "Savita Naik",
    nameKn: "ಸವಿತಾ ನಾಯಕ್",
    title: "GI Kasuti Master Artisan & SHG Lead",
    titleKn: "ಕಸೂತಿ ಕರಕುಶಲಕರ್ಮಿ • ಸಂಘದ ಮುಖ್ಯಸ್ಥೆ",
    badge: "Dharwad Cluster Head",
    phone: "+91 94812 34567",
    avatarChar: "ಸ",
    defaultRoute: "/artisan/inbox",
  },
  {
    id: "user-enterprise-01",
    role: "enterprise",
    name: "Kavita Sundaram",
    nameKn: "ಕವಿತಾ ಸುಂದರಂ",
    title: "Corporate Gifting & ESG Procurement Lead",
    titleKn: "ಕಾರ್ಪೊರೇಟ್ ಬಿ2ಬಿ ಖರೀದಿ ಮುಖ್ಯಸ್ಥೆ",
    badge: "Bengaluru Tech Park",
    phone: "+91 98450 11223",
    avatarChar: "K",
    defaultRoute: "/b2b",
  },
  {
    id: "user-patron-01",
    role: "patron",
    name: "Dr. Sandeep Hegde",
    nameKn: "ಡಾ. ಸಂದೀಪ್ ಹೆಗಡೆ",
    title: "Conscious Craft Patron & Collector",
    titleKn: "ಕರಕುಶಲ ಕಲಾ ಪ್ರೇಮಿ ಮತ್ತು ಗ್ರಾಹಕ",
    badge: "Verified Retail Buyer",
    phone: "+91 94481 23456",
    avatarChar: "S",
    defaultRoute: "/marketplace",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<"kn" | "en">("kn");
  const [selectedPersona, setSelectedPersona] = useState<DemoUser>(DEMO_PERSONAS[0]);

  // Phone OTP Flow State
  const [phoneNumber, setPhoneNumber] = useState("+91 94812 34567");
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedSuccess, setVerifiedSuccess] = useState(false);

  // Switch persona handler
  const handleSelectPersona = (persona: DemoUser) => {
    setSelectedPersona(persona);
    setPhoneNumber(persona.phone);
    setOtpSent(false);
    setOtpValue("");
    setVerifiedSuccess(false);
  };

  // 1-Click Fast Login for Judges / Presentation
  const handleFastLogin = (persona: DemoUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("kala_active_user", JSON.stringify(persona));
      window.dispatchEvent(new Event("kala-user-changed"));
    }
    router.push(persona.defaultRoute);
  };

  // Send OTP simulation
  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpValue("1234"); // Auto-fill demo OTP for convenience
  };

  // Verify OTP & Login
  const handleVerifyOtp = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedSuccess(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("kala_active_user", JSON.stringify(selectedPersona));
        window.dispatchEvent(new Event("kala-user-changed"));
      }
      setTimeout(() => {
        router.push(selectedPersona.defaultRoute);
      }, 700);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2A1810]">
      {/* ── TOP ANNOUNCEMENT STRIP ── */}
      <div className="bg-[#24130A] text-amber-200/90 text-xs py-2 px-4 border-b border-amber-900/40">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E67E22]" />
            <span className="font-semibold text-white">
              {language === "kn"
                ? "ಸುರಕ್ಷಿತ ಪ್ರವೇಶ • ಆಧಾರ್ ಲಿಂಕ್ಡ್ ನೇರ ಪಾವತಿ ಖಾತೆ"
                : "Secure Access • Aadhaar-Linked DBT Direct Artisan Accounts"}
            </span>
          </div>

          <button
            onClick={() => setLanguage(language === "kn" ? "en" : "kn")}
            className="text-xs font-bold text-amber-300 hover:text-white underline"
          >
            {language === "kn" ? "English ಗೆ ಬದಲಿಸಿ" : "ಕನ್ನಡಕ್ಕೆ ಬದಲಿಸಿ"}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* ── HEADER ── */}
        <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[#C85A32] text-xs font-bold uppercase shadow-xs">
            <User className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{language === "kn" ? "ಕಲಾ ಸಮನ್ವಯ ಪ್ರವೇಶ ದ್ವಾರ" : "Role-Based Platform Access"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A1810] tracking-tight">
            {language === "kn" ? "ಲಾಗಿನ್ ಮತ್ತು ಡೆಮೊ ಪಾತ್ರಗಳ ಆಯ್ಕೆ" : "Sign In & Demo Persona Switcher"}
          </h1>

          <div className="w-16 h-1 bg-[#E67E22] mx-auto mt-2 rounded-full" />

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
            {language === "kn"
              ? "ನ್ಯಾಯಾಧೀಶರು ಮತ್ತು ಸಂದರ್ಶಕರಿಗಾಗಿ: ಕೆಳಗಿನ 3 ಪಾತ್ರಗಳಲ್ಲಿ ಒಂದನ್ನು 1-ಕ್ಲಿಕ್‌ನಲ್ಲಿ ಆರಿಸಿ, ಅಥವಾ ಗ್ರಾಮೀಣ ಮೊಬೈಲ್ OTP ಮೂಲಕ ಪ್ರವೇಶಿಸಿ."
              : "For Hackathon Judges & Patrons: Select one of the 3 personas below for instant 1-click evaluation, or test the rural phone OTP flow."}
          </p>
        </ScrollReveal>

        {/* ── 1. 1-CLICK DEMO PERSONA SWITCHER (THE JUDGING WINNER) ── */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-[#E67E22] uppercase tracking-wider block">
                  {language === "kn" ? "ವೇಗದ ಡೆಮೊ ಪರೀಕ್ಷೆ (1-ಕ್ಲಿಕ್)" : "Evaluation Mode (1-Click Switch)"}
                </span>
                <h2 className="text-lg font-bold text-[#2A1810] mt-0.5">
                  {language === "kn" ? "ನಿಮ್ಮ ವೀಕ್ಷಣಾ ಪಾತ್ರವನ್ನು ಆರಿಸಿ" : "Choose Your Demonstration Perspective"}
                </h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-50 text-[#C85A32] text-xs font-bold border border-amber-300">
                Live Interactive Demo
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {DEMO_PERSONAS.map((persona) => {
                const isSelected = selectedPersona.id === persona.id;
                return (
                  <div
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona)}
                    className={`rounded-2xl p-5 border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? "border-[#E67E22] bg-amber-50/40 shadow-sm -translate-y-1"
                        : "border-stone-200 hover:border-stone-300 bg-white hover:bg-stone-50/60"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shadow-xs text-white ${
                            persona.role === "artisan"
                              ? "bg-[#E67E22]"
                              : persona.role === "enterprise"
                              ? "bg-[#2A1810]"
                              : "bg-emerald-700"
                          }`}
                        >
                          {persona.avatarChar}
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isSelected
                              ? "bg-[#E67E22] text-white"
                              : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          {persona.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-extrabold text-stone-900 text-base">
                          {language === "kn" ? persona.nameKn : persona.name}
                        </h3>
                        <p className="text-xs text-stone-600 mt-0.5 leading-snug">
                          {language === "kn" ? persona.titleKn : persona.title}
                        </p>
                      </div>

                      <div className="text-[11px] text-stone-500 font-mono bg-stone-100/70 px-2.5 py-1 rounded-lg inline-block">
                        {persona.phone}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-200/80">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFastLogin(persona);
                        }}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                          isSelected
                            ? "bg-[#E67E22] hover:bg-[#cf6d17] text-white shadow-xs"
                            : "bg-stone-900 hover:bg-[#2A1810] text-white"
                        }`}
                      >
                        <span>
                          {language === "kn"
                            ? `${persona.nameKn} ಆಗಿ ಪ್ರವೇಶಿಸಿ`
                            : `Launch as ${persona.name.split(" ")[0]}`}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* ── 2. RURAL ARTISAN MOBILE OTP AUTHENTICATION ── */}
        <ScrollReveal direction="up" delayMs={100}>
          <div className="bg-white rounded-3xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-bold text-[#C85A32] uppercase tracking-wider block">
                  {language === "kn" ? "ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳಿಗೆ ಮೊಬೈಲ್ ಪ್ರವೇಶ" : "Inclusive Rural Mobile Authentication"}
                </span>
                <h2 className="text-lg font-bold text-[#2A1810] mt-0.5">
                  {language === "kn" ? "ಪಾಸ್‌ವರ್ಡ್ ರಹಿತ ಮೊಬೈಲ್ OTP ಲಾಗಿನ್" : "Passwordless SMS OTP Verification"}
                </h2>
              </div>
              <div className="text-xs text-stone-500 flex items-center gap-1.5 bg-[#FAF7F2] px-3 py-1.5 rounded-xl border border-stone-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero English Typing Required</span>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-5 pt-2">
              
              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-700 block">
                  {language === "kn" ? "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ (Phone Number)" : "Registered Mobile Number"}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 94812 34567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-300 bg-[#FAF7F2] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#E67E22] text-stone-900"
                  />
                </div>
              </div>

              {/* Action Button: Send OTP */}
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#2A1810] hover:bg-[#3D2318] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <KeyRound className="w-4 h-4 text-amber-300" />
                  <span>
                    {language === "kn" ? "OTP ಕಳುಹಿಸಿ (Send Verification Code)" : "Send SMS Verification OTP"}
                  </span>
                </button>
              )}

              {/* OTP Input & Verify Simulation */}
              {otpSent && (
                <div className="space-y-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-300 animate-fadeIn">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-700">
                      {language === "kn" ? "4-ಅಂಕಿಯ OTP ನಮೂದಿಸಿ:" : "Enter 4-Digit SMS Code:"}
                    </span>
                    <span className="text-[11px] text-[#C85A32] font-bold">
                      Demo Auto-Filled (1234)
                    </span>
                  </div>

                  <div className="flex justify-center gap-3">
                    {["1", "2", "3", "4"].map((digit, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-14 rounded-xl bg-white border-2 border-[#E67E22] flex items-center justify-center font-mono font-extrabold text-xl text-stone-900 shadow-xs"
                      >
                        {digit}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={isVerifying || verifiedSuccess}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
                      verifiedSuccess
                        ? "bg-emerald-600 text-white"
                        : "bg-[#E67E22] hover:bg-[#cf6d17] text-white active:scale-95"
                    }`}
                  >
                    {isVerifying ? (
                      <span>{language === "kn" ? "ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..." : "Verifying..."}</span>
                    ) : verifiedSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>{language === "kn" ? "ಯಶಸ್ವಿ ಪ್ರವೇಶ ✓" : "Verified Successfully ✓"}</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>
                          {language === "kn"
                            ? `${selectedPersona.nameKn} ಆಗಿ ದೃಢೀಕರಿಸಿ (Verify & Enter)`
                            : `Verify & Sign In as ${selectedPersona.name}`}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>
          </div>
        </ScrollReveal>

      </div>

      <FolkArtBorder variant="gold" />
    </div>
  );
}
