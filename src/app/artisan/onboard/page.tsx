"use client";

import React, { useState } from "react";
import KannadaVoiceRecorder from "@/components/voice/KannadaVoiceRecorder";
import AiPhotoCraftScanner from "@/components/voice/AiPhotoCraftScanner";
import FolkArtBanner from "@/components/shared/FolkArtBanner";
import FolkArtBorder from "@/components/shared/FolkArtBorder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { ExtractedCraftListing } from "@/lib/voice/kannadaKeywords";
import {
  Mic,
  Camera,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  Plus,
  Minus,
  RefreshCw,
  UserCheck,
  Award,
  PackageCheck,
  Store,
  ShoppingBag,
  Eye,
  Sun
} from "lucide-react";
import Link from "next/link";
import { numberToKannadaWords, toKannadaDigits } from "@/lib/voice/kannadaNumbers";

const CRAFT_IMAGE_MAP: Record<string, string> = {
  Kasuti: "/assets/craft-kasuti.jpg",
  Pottery: "/assets/craft-belagavi-terracotta.jpg",
  Beedu: "/assets/craft-beedu.jpg",
  Bidriware: "/assets/craft-bidri.jpg",
  "Channapatna Toys": "/assets/craft-channapatna.jpg",
  "Yakshagana Regalia": "/assets/craft-yakshagana.jpg",
  Yakshagana: "/assets/craft-yakshagana.jpg",
  "Udupi Sarees": "/assets/craft-udupi-saree.jpg",
  "Udupi Saree": "/assets/craft-udupi-saree.jpg",
  Handloom: "/assets/craft-udupi-saree.jpg",
  Woodcraft: "/assets/craft-channapatna.jpg",
};

interface CraftClusterInfo {
  clusterKn: string;
  clusterEn: string;
  artisanKn: string;
  artisanEn: string;
  artisanTcy?: string;
  giBadgeKn: string;
  giBadgeEn: string;
  verifiedCategory: string;
  avatarLetter: string;
}

const CRAFT_METADATA: Record<string, CraftClusterInfo> = {
  channapatna: {
    clusterKn: "ರಾಮನಗರ ಚನ್ನಪಟ್ಟಣ ಆಟಿಕೆ ಸಂಘ",
    clusterEn: "Ramanagara Channapatna Toy Artisans Guild",
    artisanKn: "ಸುಬ್ಬಣ್ಣ ಆಚಾರ್ (ರಾಮನಗರ)",
    artisanEn: "Subbanna Achar (Ramanagara)",
    giBadgeKn: "ಜಿ.ಐ. ಚನ್ನಪಟ್ಟಣ ನೋಂದಣಿ #23",
    giBadgeEn: "GI Channapatna Application #23",
    verifiedCategory: "GI Woodcraft",
    avatarLetter: "ಸು",
  },
  woodcraft: {
    clusterKn: "ರಾಮನಗರ ಚನ್ನಪಟ್ಟಣ ಆಟಿಕೆ ಸಂಘ",
    clusterEn: "Ramanagara Channapatna Toy Artisans Guild",
    artisanKn: "ಸುಬ್ಬಣ್ಣ ಆಚಾರ್ (ರಾಮನಗರ)",
    artisanEn: "Subbanna Achar (Ramanagara)",
    giBadgeKn: "ಜಿ.ಐ. ಚನ್ನಪಟ್ಟಣ ನೋಂದಣಿ #23",
    giBadgeEn: "GI Channapatna Application #23",
    verifiedCategory: "GI Woodcraft",
    avatarLetter: "ಸು",
  },
  kasuti: {
    clusterKn: "ಧಾರವಾಡ ಕಸೂತಿ ಸಂಘ (Dharwad Cluster)",
    clusterEn: "Dharwad Kasuti Craft Guild",
    artisanKn: "ಸವಿತಾ ನಾಯ್ಕ್ (ಧಾರವಾಡ)",
    artisanEn: "Savita Naik (Dharwad)",
    giBadgeKn: "ಜಿ.ಐ. ಧಾರವಾಡ ಕಸೂತಿ ನೋಂದಣಿ #85",
    giBadgeEn: "GI Dharwad Application #85",
    verifiedCategory: "GI Embroidery",
    avatarLetter: "ಸ",
  },
  beedu: {
    clusterKn: "ಉಡುಪಿ ಬೀಡು ಕರಕುಶಲ ಸಂಘ (Udupi Beedu)",
    clusterEn: "Udupi Beedu Craft Society",
    artisanKn: "ಜಾನಕಿ ಪೂಜಾರಿ (ಪಡುಬಿದ್ರಿ - ಉಡುಪಿ)",
    artisanEn: "Janaki Poojary (Padubidri - Udupi)",
    artisanTcy: "ಜಾನಕಿ ಪೂಜಾರಿ (ಪಡುಬಿದ್ರಿ - ಕರಾವಳಿ)",
    giBadgeKn: "ಜಿ.ಐ. ಉಡುಪಿ ಕರಾವಳಿ ಕರಕುಶಲ #142",
    giBadgeEn: "GI Coastal Craft #142",
    verifiedCategory: "Eco-Basketry",
    avatarLetter: "ಜ",
  },
  udupi: {
    clusterKn: "ಉಡುಪಿ ಪ್ರಾಥಮಿಕ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘ (Udupi Handloom)",
    clusterEn: "Udupi Handloom Weavers Co-operative Society",
    artisanKn: "ಶೇಖರ್ ದೇವಾಡಿಗ (ಉಡುಪಿ)",
    artisanEn: "Shekhar Devadiga (Udupi)",
    artisanTcy: "ಶೇಖರ್ ದೇವಾಡಿಗ (ಉಡುಪಿ - ಕರಾವಳಿ)",
    giBadgeKn: "ಜಿ.ಐ. ಉಡುಪಿ ಸೀರೆ ನೋಂದಣಿ #2016",
    giBadgeEn: "GI Udupi Saree Application #2016",
    verifiedCategory: "GI Handloom",
    avatarLetter: "ಶೇ",
  },
  handloom: {
    clusterKn: "ಉಡುಪಿ ಪ್ರಾಥಮಿಕ ನೇಕಾರರ ಸಹಕಾರ ಸಂಘ (Udupi Handloom)",
    clusterEn: "Udupi Handloom Weavers Co-operative Society",
    artisanKn: "ಶೇಖರ್ ದೇವಾಡಿಗ (ಉಡುಪಿ)",
    artisanEn: "Shekhar Devadiga (Udupi)",
    artisanTcy: "ಶೇಖರ್ ದೇವಾಡಿಗ (ಉಡುಪಿ - ಕರಾವಳಿ)",
    giBadgeKn: "ಜಿ.ಐ. ಉಡುಪಿ ಸೀರೆ ನೋಂದಣಿ #2016",
    giBadgeEn: "GI Udupi Saree Application #2016",
    verifiedCategory: "GI Handloom",
    avatarLetter: "ಶೇ",
  },
  pottery: {
    clusterKn: "ಖಾನಾಪುರ / ಬೆಳಗಾವಿ ಕುಂಬಾರಿಕೆ ಕ್ಲಸ್ಟರ್ (Khanapur Terracotta)",
    clusterEn: "Khanapur Belagavi Terracotta Guild",
    artisanKn: "ಬಸವರಾಜ್ ಕುಂಬಾರ್ (ಖಾನಾಪುರ)",
    artisanEn: "Basavaraj Kumbar (Khanapur)",
    giBadgeKn: "ಜಿ.ಐ. ಬೆಳಗಾವಿ ಮಡಿಕೆ ನೋಂದಣಿ #047",
    giBadgeEn: "GI Belagavi Pottery Application #047",
    verifiedCategory: "Terracotta",
    avatarLetter: "ಬ",
  },
  bidri: {
    clusterKn: "ಬೀದರ್ ಬಿದ್ರಿ ಕಲೆ ಒಕ್ಕೂಟ (Bidar Cluster)",
    clusterEn: "Bidar Bidriware Guild",
    artisanKn: "ಮೊಹಮ್ಮದ್ ರಫೀಕ್ (ಬೀದರ್ ಕೋಟೆ)",
    artisanEn: "Mohammed Rafeeq (Bidar Fort)",
    giBadgeKn: "ಜಿ.ಐ. ಬೀದರ್ ಬಿದ್ರಿ ನೋಂದಣಿ #012",
    giBadgeEn: "GI Bidriware Application #012",
    verifiedCategory: "GI Metalcraft",
    avatarLetter: "ಮೊ",
  },
  bidriware: {
    clusterKn: "ಬೀದರ್ ಬಿದ್ರಿ ಕಲೆ ಒಕ್ಕೂಟ (Bidar Cluster)",
    clusterEn: "Bidar Bidriware Guild",
    artisanKn: "ಮೊಹಮ್ಮದ್ ರಫೀಕ್ (ಬೀದರ್ ಕೋಟೆ)",
    artisanEn: "Mohammed Rafeeq (Bidar Fort)",
    giBadgeKn: "ಜಿ.ಐ. ಬೀದರ್ ಬಿದ್ರಿ ನೋಂದಣಿ #012",
    giBadgeEn: "GI Bidriware Application #012",
    verifiedCategory: "GI Metalcraft",
    avatarLetter: "ಮೊ",
  },
  yakshagana: {
    clusterKn: "ಉಡುಪಿ & ಹೊನ್ನಾವರ ಯಕ್ಷಗಾನ ಕಲಾ ಮಂಡಳಿ (Udupi & Honnavar)",
    clusterEn: "Udupi & Honnavar Yakshagana Artisan Guild",
    artisanKn: "ಗಣಪತಿ ಹೆಗಡೆ (ಹೊನ್ನಾವರ)",
    artisanEn: "Ganapati Hegde (Honnavar)",
    artisanTcy: "ಗಣಪತಿ ಹೆಗಡೆ (ಹೊನ್ನಾವರ - ಕರಾವಳಿ)",
    giBadgeKn: "ಜಿ.ಐ. ಕರಾವಳಿ ಜಾನಪದ ರಂಗಭೂಮಿ #108",
    giBadgeEn: "GI Coastal Theatre Regalia #108",
    verifiedCategory: "Folk Theatre Regalia",
    avatarLetter: "ಗ",
  },
};

function findCraftMeta(craftStr: string, itemName: string = ""): CraftClusterInfo {
  const query = `${craftStr} ${itemName}`.toLowerCase();
  if (query.includes("channapatna") || query.includes("toy") || query.includes("wood") || query.includes("ಆಟಿಕೆ") || query.includes("ಕುದುರೆ")) {
    return CRAFT_METADATA.channapatna;
  }
  if (query.includes("kasuti") || query.includes("embroidery") || query.includes("ಕಸೂತಿ") || query.includes("ಶಾಲು")) {
    return CRAFT_METADATA.kasuti;
  }
  if (query.includes("beedu") || query.includes("basket") || query.includes("ಬೀಡು") || query.includes("ಬುಟ್ಟಿ")) {
    return CRAFT_METADATA.beedu;
  }
  if (query.includes("udupi") || query.includes("saree") || query.includes("handloom") || query.includes("ಕೈಮಗ್ಗ") || query.includes("ಸೀರೆ")) {
    return CRAFT_METADATA.udupi;
  }
  if (query.includes("pottery") || query.includes("terracotta") || query.includes("clay") || query.includes("ಕುಂಬಾರ") || query.includes("ಮಡಿಕೆ") || query.includes("ಖಾನಾಪುರ") || query.includes("ಬೆಳಗಾವಿ")) {
    return CRAFT_METADATA.pottery;
  }
  if (query.includes("bidri") || query.includes("silver") || query.includes("ಬಿದ್ರಿ") || query.includes("ಬೆಳ್ಳಿ")) {
    return CRAFT_METADATA.bidri;
  }
  if (query.includes("yaksha") || query.includes("kireeta") || query.includes("ಮುಟ್ಟಾಲೆ") || query.includes("ಕಿರೀಟ")) {
    return CRAFT_METADATA.yakshagana;
  }
  return CRAFT_METADATA.kasuti;
}

export default function ArtisanOnboardPage() {
  const [language, setLanguage] = useState<"kn" | "en" | "tcy">("kn");
  const [artisanName, setArtisanName] = useState("ಸವಿತಾ ನಾಯ್ಕ್ (Savita Naik)");
  const [clusterRegion, setClusterRegion] = useState("ಧಾರವಾಡ ಕಸೂತಿ ಸಂಘ (Dharwad Cluster)");
  const [avatarLetter, setAvatarLetter] = useState("ಸ");
  const [giBadge, setGiBadge] = useState("GI Dharwad Application #85");
  const [verifiedCategory, setVerifiedCategory] = useState("GI Embroidery");

  // Extracted craft listing state
  const [listing, setListing] = useState<ExtractedCraftListing>({
    craft: "Kasuti",
    craftKannada: "ಕಸೂತಿ ಕಲೆ",
    itemName: "Dharwad Heritage Kasuti Silk Shawl",
    quantity: 80,
    pricePerUnitINR: 600,
    totalValueINR: 48000,
    material: "100% Pure Mulberry Silk Thread & Handloom Khadi Cotton",
    leadTimeDays: 15,
    rawTranscript: "ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಒಂದಕ್ಕೆ 600 ರೂಪಾಯಿ, 15 ದಿನಗಳಲ್ಲಿ ನೀಡುತ್ತೇನೆ",
    confidence: 0.94
  });

  const [onboardingMode, setOnboardingMode] = useState<"photo" | "voice">("photo");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>(
    "/assets/craft-kasuti.jpg"
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isStudioPolished, setIsStudioPolished] = useState(false);

  // Sync listing and update matching craft photo & cluster details
  const handleListingExtracted = (extracted: ExtractedCraftListing, img?: string, polished?: boolean) => {
    setListing(extracted);
    if (typeof polished === "boolean") {
      setIsStudioPolished(polished);
    }
    if (img) {
      setUploadedImageUrl(img);
    } else {
      const imgKey = Object.keys(CRAFT_IMAGE_MAP).find(
        (k) => k.toLowerCase() === extracted.craft.toLowerCase() || extracted.craft.toLowerCase().includes(k.toLowerCase())
      );
      if (imgKey && CRAFT_IMAGE_MAP[imgKey]) {
        setUploadedImageUrl(CRAFT_IMAGE_MAP[imgKey]);
      }
    }

    const meta = findCraftMeta(extracted.craft, extracted.itemName);
    setClusterRegion(language === "en" ? meta.clusterEn : meta.clusterKn);
    setArtisanName(
      language === "en"
        ? meta.artisanEn
        : language === "tcy" && meta.artisanTcy
        ? meta.artisanTcy
        : meta.artisanKn
    );
    setAvatarLetter(meta.avatarLetter);
    setGiBadge(language === "en" ? meta.giBadgeEn : meta.giBadgeKn);
    setVerifiedCategory(meta.verifiedCategory);
  };

  // Touch adjustment handlers (Zero typing needed!)
  const updateQuantity = (delta: number) => {
    setListing((prev) => {
      const newQty = Math.max(5, prev.quantity + delta);
      return {
        ...prev,
        quantity: newQty,
        totalValueINR: newQty * prev.pricePerUnitINR
      };
    });
  };

  const updatePrice = (delta: number) => {
    setListing((prev) => {
      const newPrice = Math.max(100, prev.pricePerUnitINR + delta);
      return {
        ...prev,
        pricePerUnitINR: newPrice,
        totalValueINR: prev.quantity * newPrice
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: listing.itemName || `${clusterRegion} Handcrafted ${listing.craft}`,
          kannadaTitle: listing.craftKannada ? `${clusterRegion} ${listing.craftKannada}` : `${clusterRegion} ಕೈಯಿಂದ ಮಾಡಿದ ${listing.craft}`,
          craftType: listing.craft,
          priceINR: listing.pricePerUnitINR,
          quantity: listing.quantity,
          artisanName,
          artisanKannadaName: artisanName,
          artisanCluster: clusterRegion,
          artisanDistrict: listing.craft.toLowerCase().includes("yaksha") || listing.craft.toLowerCase().includes("udupi") ? "Udupi & Honnavar" : listing.craft.toLowerCase().includes("pottery") ? "Belagavi" : listing.craft.toLowerCase().includes("bidri") ? "Bidar" : "Dharwad",
          leadTimeDays: listing.leadTimeDays,
          imageUrl: uploadedImageUrl,
          shortDescription: listing.material,
          craftStory: `${clusterRegion} - ಪರಿಶೀಲಿಸಲ್ಪಟ್ಟ ನೈಜ ಕರಕುಶಲ ಕೃತಿ. 75% ನೇರ ಕೂಲಿ ಖಾತರಿ.`,
        }),
      });
    } catch (err) {
      console.error("Failed to persist product to backend", err);
    } finally {
      setIsPublishing(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2A1810]">
      {/* ── ARTISAN PORTAL SUB-NAV TABS ── */}
      <div className="bg-[#24130A] border-b border-amber-900/40 text-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 sm:gap-4 text-xs font-semibold">
              <Link
                href="/artisan/onboard"
                className="px-3.5 py-1.5 rounded-lg bg-[#E67E22] text-white font-bold shadow-xs flex items-center gap-1.5"
              >
                <Mic className="w-3.5 h-3.5 text-white" />
                <span>{language === "kn" ? "ಧ್ವನಿ ನೊಂದಣಿ" : "Voice Listing"}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </Link>

              <Link
                href="/artisan/inbox"
                className="px-3 py-1.5 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
              >
                <PackageCheck className="w-3.5 h-3.5 text-[#E67E22]" />
                <span>{language === "kn" ? "ಆರ್ಡರ್ ಇನ್‌ಬಾಕ್ಸ್" : "Order Inbox"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── HEADER BANNER ── */}
      <section className="bg-[#F5EFEB] pt-10 pb-8 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <ScrollReveal direction="up" className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[#C85A32] text-xs font-semibold uppercase shadow-xs">
              <Mic className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>
                {language === "kn"
                  ? "ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳ ವೇದಿಕೆ"
                  : language === "tcy"
                  ? "ಕರಾವಳಿ ತುಳುನಾಡ್ ಕುಶಲಕರ್ಮಿಗಳ ವೇದಿಕೆ (Dakshina Kannada & Udupi)"
                  : "Rural Artisan Voice Listing Portal"}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A1810]">
              {language === "kn"
                ? "ಕನ್ನಡ ಧ್ವನಿ ಆಧಾರಿತ ಸರಕು ನೊಂದಣಿ"
                : language === "tcy"
                ? "ತುಳು & ಕನ್ನಡ ಧ್ವನಿ ಆಧಾರಿತ ಸರಕು ನೊಂದಣಿ"
                : "Voice-Assisted Craft Inventory Listing"}
            </h1>
            <p className="text-xs text-stone-600">
              {language === "kn"
                ? "ಟೈಪ್ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ • ಮಾತನಾಡಿ, ಪರಿಶೀಲಿಸಿ, ನೇರವಾಗಿ ಪ್ರಕಟಿಸಿ"
                : language === "tcy"
                ? "ಟೈಪ್ ಮಲ್ಪುನ ಅಗತ್ಯ ಇಜ್ಜಿ • ಪಾತೆರ್ಲೆ, ತೂಲೆ, ಪ್ರಕಟ ಮಲ್ಪುಲೆ"
                : "Zero typing friction • Speak in Kannada or Tulu, review high-contrast cards, and publish"}
            </p>
          </ScrollReveal>

          {/* Vernacular Language Switcher: Kannada | Tulu | English */}
          <ScrollReveal direction="left" delayMs={50} className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-stone-300 shadow-xs self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setLanguage("kn")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                language === "kn"
                  ? "bg-[#C85A32] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#C85A32]"
              }`}
            >
              ಕನ್ನಡ
            </button>
            <button
              type="button"
              onClick={() => setLanguage("tcy")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                language === "tcy"
                  ? "bg-[#C85A32] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#C85A32]"
              }`}
            >
              ತುಳು (Tulu)
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                language === "en"
                  ? "bg-[#C85A32] text-white shadow-xs"
                  : "text-stone-700 hover:text-[#C85A32]"
              }`}
            >
              English
            </button>
          </ScrollReveal>
        </div>
      </section>

      {/* Decorative Tribal Warli Folk Art Strip */}
      <FolkArtBanner variant="warli" />

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Artisan Profile Card */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#C85A32] text-white flex items-center justify-center font-bold text-lg shadow-sm">
                {avatarLetter}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-[#2A1810] text-sm">
                  <span>{artisanName}</span>
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-stone-500 text-[11px]">{clusterRegion}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
                {language === "kn" ? "ಪರಿಶೀಲಿತ ಸದಸ್ಯೆ" : "Verified Maker"}
              </span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                {giBadge}
              </span>
            </div>
          </div>
        </ScrollReveal>

        {isSubmitted ? (
          /* ── SUCCESS REGISTRATION STATE ── */
          <ScrollReveal direction="up" delayMs={50}>
            <div className="bg-white p-8 sm:p-12 rounded-3xl border border-emerald-200 shadow-lg text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-emerald-700 font-bold">
                  {language === "kn" ? "ಸರಕು ಯಶಸ್ವಿಯಾಗಿ ನೊಂದಾಯಿಸಲಾಗಿದೆ!" : "Inventory Registered Successfully!"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2A1810]">
                  {listing.quantity} {listing.craftKannada} {language === "kn" ? "ಕ್ಲಸ್ಟರ್ ಸಂಗ್ರಹಕ್ಕೆ ಸೇರಿಸಲಾಗಿದೆ" : "Units Active in Cluster"}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
                  {language === "kn"
                    ? "ನಿಮ್ಮ ಸರಕು ಈಗ ಬಿ2ಬಿ ಬೃಹತ್ ಪೂರೈಕೆ ಮತ್ತು ನೇರ ಮಾರಾಟ ಮಳಿಗೆಯಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿದೆ."
                    : "Your units are now registered in the Dharwad cluster pool for B2B enterprise allocation and retail showcase."}
                </p>
              </div>

              {/* Verified Craft Photo Snapshot */}
              <div className="max-w-xs mx-auto aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md relative group">
                <img
                  src={uploadedImageUrl}
                  alt={listing.itemName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 p-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-[10px] text-amber-200 font-bold flex items-center justify-between">
                  <span>GI Certified Handcraft</span>
                  <span className="text-emerald-400">98.4% Match ✓</span>
                </div>
              </div>

              {/* Registered Batch Summary */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 max-w-md mx-auto text-left text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">{language === "kn" ? "ಕುಶಲಕರ್ಮಿ:" : "Artisan:"}</span>
                  <span className="font-bold text-[#2A1810]">{artisanName}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-stone-200">
                  <span className="text-stone-500">{language === "kn" ? "ಕರಕುಶಲ ಪ್ರಕಾರ:" : "Craft Type:"}</span>
                  <span className="font-bold text-[#C85A32]">{listing.craft} ({listing.craftKannada})</span>
                </div>
                <div className="flex justify-between items-baseline pb-2 border-b border-stone-200">
                  <span className="text-stone-500">{language === "kn" ? "ಒಟ್ಟು ಯೂನಿಟ್‌ಗಳು:" : "Registered Quantity:"}</span>
                  <div className="text-right">
                    <span className="font-bold text-[#2A1810]">{listing.quantity} units</span>
                    {language === "kn" && (
                      <div className="text-[10px] font-semibold text-[#C85A32]">
                        ({numberToKannadaWords(listing.quantity)} ಯೂನಿಟ್‌ಗಳು)
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-baseline pb-2 border-b border-stone-200">
                  <span className="text-stone-500">{language === "kn" ? "ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆ:" : "Unit Price:"}</span>
                  <div className="text-right">
                    <span className="font-bold text-[#2A1810]">₹{listing.pricePerUnitINR}</span>
                    {language === "kn" && (
                      <div className="text-[10px] font-semibold text-emerald-800">
                        ({numberToKannadaWords(listing.pricePerUnitINR)} ರೂ.)
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-stone-500">{language === "kn" ? "ನಿರೀಕ್ಷಿತ ಒಟ್ಟು ಆದಾಯ:" : "Total Expected Inflow:"}</span>
                  <div className="text-right">
                    <span className="font-bold text-emerald-700 text-sm">₹{listing.totalValueINR.toLocaleString("en-IN")}</span>
                    {language === "kn" && (
                      <div className="text-[10px] font-semibold text-emerald-800">
                        ({numberToKannadaWords(listing.totalValueINR)} ರೂಪಾಯಿಗಳು)
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Next Action Gateways */}
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href="/marketplace"
                  className="px-6 py-3 rounded-full bg-[#2A1810] hover:bg-[#3D2318] text-amber-300 font-bold text-xs shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2 border border-amber-600/40"
                >
                  <Store className="w-4 h-4 text-[#E67E22]" />
                  <span>{language === "kn" ? "ಮಳಿಗೆಯಲ್ಲಿ ಹೊಸ ಸರಕು ನೋಡಿ" : "View Live in Storefront"}</span>
                </Link>

                <Link
                  href="/b2b"
                  className="px-6 py-3 rounded-full bg-[#C85A32] hover:bg-[#a84420] text-white font-bold text-xs shadow-md transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <Layers className="w-4 h-4" />
                  <span>{language === "kn" ? "ಬಿ2ಬಿ ಹಂಚಿಕೆ ಕನ್ಸೋಲ್" : "B2B Allocation"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-700 font-semibold text-xs transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>{language === "kn" ? "ಇನ್ನೊಂದು ಸರಕು ನೊಂದಾಯಿಸಿ" : "List Another Batch"}</span>
                </button>
              </div>
            </div>
          </ScrollReveal>
        ) : (
          /* ── MAIN ONBOARDING FLOW ── */
          <div className="space-y-8">
            
            {/* Step 1: Multi-Modal Onboarding Switcher (AI Camera Photo OR Kannada Voice) */}
            <ScrollReveal direction="up" delayMs={50} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <h3 className="text-base font-bold text-[#2A1810]">
                    {language === "kn"
                      ? "ಹಂತ ೧: ನೊಂದಣಿ ವಿಧಾನ ಆರಿಸಿ (ಕ್ಯಾಮೆರಾ ಅಥವಾ ಧ್ವನಿ)"
                      : "Step 1: Choose Listing Method (Craft Photo or Spoken Voice)"}
                  </h3>
                </div>

                {/* Mode Switcher Tabs */}
                <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-stone-200 shadow-sm self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setOnboardingMode("photo")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      onboardingMode === "photo"
                        ? "bg-[#C85A32] text-white shadow-md scale-105"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{language === "kn" ? "ಕ್ಯಾಮೆರಾ ಫೋಟೋ ತಪಾಸಣೆ" : "Craft Photo Scanner"}</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-[9px] font-extrabold uppercase">
                      New
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setOnboardingMode("voice")}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      onboardingMode === "voice"
                        ? "bg-[#C85A32] text-white shadow-md scale-105"
                        : "text-stone-600 hover:text-stone-900"
                    }`}
                  >
                    <Mic className="w-3.5 h-3.5" />
                    <span>{language === "kn" ? "ಧ್ವನಿ ಮೂಲಕ ನೊಂದಣಿ" : "Voice Listing"}</span>
                  </button>
                </div>
              </div>

              {/* Render active input mode */}
              {onboardingMode === "photo" ? (
                <AiPhotoCraftScanner
                  language={language === "tcy" ? "kn" : language}
                  onListingExtracted={(extracted, img, polished) => handleListingExtracted(extracted, img, polished)}
                />
              ) : (
                <KannadaVoiceRecorder
                  language={language}
                  onListingExtracted={(extracted) => handleListingExtracted(extracted)}
                />
              )}
            </ScrollReveal>

            {/* Step 2: Touch-First Visual Review Card */}
            <ScrollReveal direction="up" delayMs={100}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <h3 className="text-base font-bold text-[#2A1810]">
                    {language === "kn" ? "ಹಂತ ೨: ವಿವರಗಳ ಪರಿಶೀಲನೆ (ಸ್ಪರ್ಶ ನಿಯಂತ್ರಣ)" : "Step 2: Touch-First Review & Confirmation"}
                  </h3>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
                  
                  {/* Photo Snapshot & Verification Badge Strip */}
                  <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 w-full sm:w-auto">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-300 shadow-sm flex-shrink-0">
                        <img
                          src={uploadedImageUrl}
                          alt="Craft photo"
                          style={isStudioPolished ? { filter: "brightness(1.18) contrast(1.08) saturate(1.12)" } : undefined}
                          className="w-full h-full object-cover transition-all duration-300"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-sm text-[#2A1810]">
                          <span>{listing.itemName}</span>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </div>
                        <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                          {listing.material}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                      {isStudioPolished && (
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-[#C85A32] border border-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                          <Sun className="w-3.5 h-3.5 text-[#C85A32]" />
                          <span>{language === "kn" ? "ಸ್ಟುಡಿಯೋ ಬೆಳಕು ಸಕ್ರಿಯ" : "Studio Lighting Active"}</span>
                        </span>
                      )}
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{((listing.confidence || 0.984) * 100).toFixed(1)}% {verifiedCategory} Verified</span>
                      </span>
                    </div>
                  </div>

                  {/* 4 Big High-Contrast Touch Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Card 1: Craft Type */}
                    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-2">
                      <span className="text-[11px] text-stone-500 font-semibold uppercase">
                        {language === "kn" ? "ಕರಕುಶಲ ಪ್ರಕಾರ" : "Detected Craft"}
                      </span>
                      <div>
                        <div className="text-lg sm:text-xl font-bold text-[#2A1810] leading-tight">{listing.craft}</div>
                        <p className="text-xs text-[#C85A32] font-semibold mt-0.5">{listing.craftKannada}</p>
                      </div>
                      <span className="text-[10px] text-stone-400">Auto-extracted</span>
                    </div>

                    {/* Card 2: Quantity with Touch Plus/Minus & Kannada Words */}
                    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-2">
                      <span className="text-[11px] text-stone-500 font-semibold uppercase">
                        {language === "kn" ? "ಲಭ್ಯ ಪ್ರಮಾಣ (ಯೂನಿಟ್)" : "Quantity (Units)"}
                      </span>
                      <div>
                        <div className="text-2xl font-black text-[#2A1810]">
                          {listing.quantity} <span className="text-xs font-normal text-stone-500">units</span>
                        </div>
                        {language === "kn" && (
                          <div className="text-[11px] font-bold text-[#C85A32] mt-0.5">
                            ({numberToKannadaWords(listing.quantity)} ಯೂನಿಟ್‌ಗಳು)
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(-10)}
                          className="flex-1 py-1.5 bg-white hover:bg-stone-100 rounded-lg border border-stone-300 text-stone-700 font-bold flex items-center justify-center text-xs transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => updateQuantity(10)}
                          className="flex-1 py-1.5 bg-[#C85A32] hover:bg-[#a84420] rounded-lg text-white font-bold flex items-center justify-center text-xs transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card 3: Price in INR with Touch Controls & Kannada Words */}
                    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-2">
                      <span className="text-[11px] text-stone-500 font-semibold uppercase">
                        {language === "kn" ? "ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆ (ರೂ.)" : "Unit Price (INR)"}
                      </span>
                      <div>
                        <div className="text-2xl font-black text-emerald-700">
                          ₹{listing.pricePerUnitINR}
                        </div>
                        {language === "kn" && (
                          <div className="text-[11px] font-bold text-emerald-800 mt-0.5">
                            ({numberToKannadaWords(listing.pricePerUnitINR)} ರೂ.)
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => updatePrice(-50)}
                          className="flex-1 py-1.5 bg-white hover:bg-stone-100 rounded-lg border border-stone-300 text-stone-700 font-bold flex items-center justify-center text-xs transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          -₹50
                        </button>
                        <button
                          type="button"
                          onClick={() => updatePrice(50)}
                          className="flex-1 py-1.5 bg-[#C85A32] hover:bg-[#a84420] rounded-lg text-white font-bold flex items-center justify-center text-xs transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          +₹50
                        </button>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium">
                        {language === "kn" ? "✓ ಕ್ಲಸ್ಟರ್ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆ ಅನ್ವಯಿಸಿದೆ" : "✓ Cluster fair-market floor applied"}
                      </span>
                    </div>

                    {/* Card 4: Lead Time */}
                    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-2">
                      <span className="text-[11px] text-stone-500 font-semibold uppercase">
                        {language === "kn" ? "ಪೂರೈಕೆ ಸಮಯ (ದಿನಗಳು)" : "Lead Time"}
                      </span>
                      <div>
                        <div className="text-xl font-bold text-[#2A1810] flex items-center gap-1.5">
                          <Clock className="w-5 h-5 text-[#C85A32]" />
                          <span>{listing.leadTimeDays} {language === "kn" ? "ದಿನಗಳು" : "Days"}</span>
                        </div>
                        {language === "kn" && (
                          <div className="text-[11px] font-bold text-stone-600 mt-0.5">
                            ({numberToKannadaWords(listing.leadTimeDays)} ದಿನಗಳು)
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400">Based on craft type</span>
                    </div>

                  </div>

                  {/* Total Value & Direct Payout Guarantee */}
                  <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                      <div>
                        <div className="font-bold text-[#2A1810]">
                          {language === "kn" ? "೭೫% ನೇರ ಕುಶಲಕರ್ಮಿ ಕೂಲಿ ಖಾತರಿ" : "75% Direct Artisan Payout Guarantee"}
                        </div>
                        <p className="text-stone-500 text-[11px]">
                          {language === "kn"
                            ? "ಮಧ್ಯವರ್ತಿಗಳ ಕಮಿಷನ್ ಇಲ್ಲದೆ ನೇರವಾಗಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಜಮಾ (೭೫% ಕೂಲಿ + ೧೨% ಕಚ್ಚಾವಸ್ತು ಮುಂಗಡ)"
                            : "Direct bank transfer upon batch dispatch with zero middlemen deductions (75% wage + 12% material advance)."}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-stone-500 uppercase tracking-wider block">
                        {language === "kn" ? "ನಿರೀಕ್ಷಿತ ಒಟ್ಟು ಆದಾಯ" : "Total Batch Value"}
                      </span>
                      <span className="text-lg font-black text-emerald-700">
                        ₹{listing.totalValueINR.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Submit / Commit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isPublishing}
                      className="w-full py-4 rounded-2xl bg-[#C85A32] hover:bg-[#a84420] disabled:opacity-50 text-white font-extrabold text-sm sm:text-base shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                    >
                      {isPublishing ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>{language === "kn" ? "ಸರ್ವರ್‌ಗೆ ನೊಂದಾಯಿಸಲಾಗುತ್ತಿದೆ..." : "Publishing to Marketplace Database..."}</span>
                        </span>
                      ) : (
                        <>
                          <span>
                            {language === "kn"
                              ? `ಸರಕನ್ನು ನೊಂದಾಯಿಸಿ (${listing.quantity} ಯೂನಿಟ್‌ಗಳು • ₹${listing.totalValueINR.toLocaleString("en-IN")})`
                              : `Commit Batch to Cluster Inventory (${listing.quantity} Units • ₹${listing.totalValueINR.toLocaleString("en-IN")})`}
                          </span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </ScrollReveal>
          </div>
        )}

      </div>

      {/* Decorative Bottom Border */}
      <FolkArtBorder variant="gold" />
    </div>
  );
}
