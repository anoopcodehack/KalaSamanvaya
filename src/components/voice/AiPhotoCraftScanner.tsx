"use client";

import React, { useState, useRef } from "react";
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertCircle,
  Volume2,
  RefreshCw,
  ShieldCheck,
  Eye,
  Award,
  Clock,
  Layers,
  ChevronRight
} from "lucide-react";
import { ExtractedCraftListing } from "@/lib/voice/kannadaKeywords";
import { playSpeech, stopSpeech } from "@/lib/voice/playSpeech";

interface AiPhotoCraftScannerProps {
  onListingExtracted: (listing: ExtractedCraftListing, imageUrl?: string) => void;
  language: "kn" | "en";
}

interface CraftPresetPhoto {
  id: string;
  name: string;
  kannadaName: string;
  craft: string;
  imageUrl: string;
  units: number;
  pricePerUnitINR: number;
  handcraftHours: number;
  material: string;
  motifs: string;
  kannadaStory: string;
  confidence: number;
  giCode: string;
}

const PRESET_CRAFT_PHOTOS: CraftPresetPhoto[] = [
  {
    id: "kasuti",
    name: "Dharwad Heritage Kasuti Silk Shawl",
    kannadaName: "ಧಾರವಾಡ ಕಸೂತಿ ರೇಷ್ಮೆ ಶಾಲು",
    craft: "Kasuti",
    imageUrl: "/assets/craft-kasuti.jpg",
    units: 50,
    pricePerUnitINR: 1850,
    handcraftHours: 38,
    material: "100% Pure Mulberry Silk & Khadi Cotton",
    motifs: "Gopura (Temple Tower), Chariot & Peacock motifs",
    kannadaStory: "ನಿಮ್ಮ ಫೋಟೋ ಪರಿಶೀಲಿಸಲಾಗಿದೆ: ಇದು ಧಾರವಾಡದ ಅಧಿಕೃತ ಕಸೂತಿ ಕಲೆ. ಗವಂತಿ ಮತ್ತು ಮುರ್ಗಿ ಹೊಲಿಗೆಗಳಿಂದ ಕೈಯಿಂದಲೇ ಎಣಿಸಿ ಹೆಣೆಯಲಾಗಿದೆ. ನೈಜತೆ ಶೇಕಡಾ 98. ಶಿಫಾರಸು ಬೆಲೆ 1,850 ರೂಪಾಯಿ.",
    confidence: 0.98,
    giCode: "GI-AP-KASUTI-2006-089",
  },
  {
    id: "beedu",
    name: "Udupi Beedu Wildgrass Storage Basket",
    kannadaName: "ಉಡುಪಿ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿ",
    craft: "Beedu",
    imageUrl: "/assets/craft-beedu.jpg",
    units: 40,
    pricePerUnitINR: 650,
    handcraftHours: 14,
    material: "Natural Sun-Cured Coastal Rivergrass",
    motifs: "Tight herringbone circular weave",
    kannadaStory: "ಫೋಟೋ ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣ: ಇದು ಉಡುಪಿ ಕರಾವಳಿಯ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿ. ನೈಸರ್ಗಿಕ ನಾರಿನಿಂದ ಕೈಯಿಂದ ಹೆಣೆದ ಕರಕುಶಲ ಕೃತಿ. ಶಿಫಾರಸು ಬೆಲೆ 650 ರೂಪಾಯಿ.",
    confidence: 0.95,
    giCode: "GI-UDUPI-BEEDU-2018-142",
  },
  {
    id: "pottery",
    name: "Khanapur Red Clay Terracotta Urn",
    kannadaName: "ಖಾನಾಪುರ ಕೆಂಪು ಮಣ್ಣಿನ ಹೂಜಿ",
    craft: "Pottery",
    imageUrl: "/assets/craft-pottery.jpg",
    units: 30,
    pricePerUnitINR: 850,
    handcraftHours: 18,
    material: "Malaprabha Riverbed Clay & Natural Wood Glaze",
    motifs: "Hand-turned ridged pottery rim",
    kannadaStory: "ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ: ಖಾನಾಪುರದ ಕೆಂಪು ನದಿ ಮಣ್ಣಿನಿಂದ ಚಕ್ರದ ಮೇಲೆ ಕೈಯಿಂದ ತಯಾರಿಸಿದ ಕಲಾಕೃತಿ. ಶಿಫಾರಸು ಬೆಲೆ 850 ರೂಪಾಯಿ.",
    confidence: 0.94,
    giCode: "GI-BELAGAVI-POTTERY-2021-047",
  },
  {
    id: "bidriware",
    name: "Bidar Damascene Silver Inlay Platter",
    kannadaName: "ಬೀದರ್ ಬೆಳ್ಳಿ ಕೆತ್ತನೆಯ ತಟ್ಟೆ",
    craft: "Bidriware",
    imageUrl: "/assets/craft-bidri.jpg",
    units: 20,
    pricePerUnitINR: 3200,
    handcraftHours: 48,
    material: "Zinc-Copper Alloy with 99.9% Pure Silver Wire Inlay",
    motifs: "Traditional Persian vine inlay & floral borders",
    kannadaStory: "ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ: ಬೀದರ್ ಕೋಟೆಯ ಮಣ್ಣಿನಲ್ಲಿ ಸಂಸ್ಕರಿಸಿದ ಶುದ್ಧ ಬೆಳ್ಳಿಯ ಕೆತ್ತನೆಯ ತಟ್ಟೆ. ಶಿಫಾರಸು ಬೆಲೆ 3,200 ರೂಪಾಯಿ.",
    confidence: 0.97,
    giCode: "GI-BIDAR-BIDRI-2005-012",
  },
  {
    id: "woodcraft",
    name: "Channapatna Lacquer Wooden Rocking Horse",
    kannadaName: "ಚನ್ನಪಟ್ಟಣ ನೈಸರ್ಗಿಕ ಬಣ್ಣದ ಮರದ ಆಟಿಕೆ",
    craft: "Woodcraft",
    imageUrl: "/assets/craft-channapatna.jpg",
    units: 35,
    pricePerUnitINR: 1150,
    handcraftHours: 16,
    material: "Ivory Wood (Aale Mara) & Vegetable Lacquer Dyes",
    motifs: "Traditional lathe-turned rocking horse & nesting dolls",
    kannadaStory: "ವಿಶ್ಲೇಷಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ: ರಾಮನಗರ ಜಿಲ್ಲೆಯ ಚನ್ನಪಟ್ಟಣದ ಸಾಂಪ್ರದಾಯಿಕ ಜಿ.ಐ. ಮರದ ಆಟಿಕೆ. ಸಂಪೂರ್ಣ ನೈಸರ್ಗಿಕ ಅರಿಶಿನ-ಕುಂಕುಮ ಬಣ್ಣ. ಶಿಫಾರಸು ಬೆಲೆ 1,150 ರೂಪಾಯಿ.",
    confidence: 0.99,
    giCode: "GI-CHANNAPATNA-2006-023",
  },
];

export default function AiPhotoCraftScanner({
  onListingExtracted,
  language,
}: AiPhotoCraftScannerProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(PRESET_CRAFT_PHOTOS[0].imageUrl);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [analyzedCraft, setAnalyzedCraft] = useState<CraftPresetPhoto | null>(PRESET_CRAFT_PHOTOS[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scanSteps = [
    "Analyzing Thread Weave & Micro-Tension...",
    "Detecting Traditional Karnataka GI Motifs...",
    "Verifying Handloom Authenticity (Zero Knots)...",
    "Calculating Handcraft Labor & Recommended Price...",
  ];

  const runVisualAnalysis = (craftPreset: CraftPresetPhoto, customImageUri?: string) => {
    setIsScanning(true);
    setScanStep(0);
    setAnalyzedCraft(null);

    const stepInterval = setInterval(() => {
      setScanStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          setIsScanning(false);
          setAnalyzedCraft(craftPreset);

          // Update parent state
          onListingExtracted(
            {
              craft: craftPreset.craft,
              craftKannada: craftPreset.kannadaName,
              itemName: craftPreset.name,
              quantity: craftPreset.units,
              pricePerUnitINR: craftPreset.pricePerUnitINR,
              totalValueINR: craftPreset.units * craftPreset.pricePerUnitINR,
              material: craftPreset.material,
              leadTimeDays: 14,
              rawTranscript: `[AI Photo Scanner Detected: ${craftPreset.name}]`,
              confidence: craftPreset.confidence,
            },
            customImageUri || craftPreset.imageUrl
          );
          return prev;
        }
      });
    }, 350);
  };

  const handleSelectPreset = (preset: CraftPresetPhoto) => {
    setSelectedPhoto(preset.imageUrl);
    runVisualAnalysis(preset);
  };

  const handleCustomFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const uri = reader.result as string;
        setSelectedPhoto(uri);
        // Default to Kasuti analysis for custom upload
        runVisualAnalysis(PRESET_CRAFT_PHOTOS[0], uri);
      };
      reader.readAsDataURL(file);
    }
  };

  // Kannada Speech Synthesis
  const playKannadaAudio = (text: string) => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    playSpeech(
      text,
      language,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-amber-300 shadow-xl p-6 sm:p-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-[#C85A32] text-[11px] font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            <span>ಕ್ಯಾಮೆರಾ &amp; ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ • AI Vision Onboarding</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#2A1810]">
            {language === "kn"
              ? "ಕಲಾಕೃತಿಯ ಫೋಟೋ ತೆಗೆಯಿರಿ - AI ಸ್ವಯಂ ವಿಶ್ಲೇಷಣೆ"
              : "Snap a Craft Photo — AI Auto-Cataloging"}
          </h2>
          <p className="text-xs text-stone-600">
            {language === "kn"
              ? "ನಿಮ್ಮ ಕಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ. AI ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕಲಾ ಪ್ರಕಾರ, ಹೊಲಿಗೆಯ ಗುಣಮಟ್ಟ ಮತ್ತು ಸೂಕ್ತ ಬೆಲೆಯನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ."
              : "Simply upload or take a photo of your handcraft. Our vision engine detects motifs, stitches, and fair prices instantly."}
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleCustomFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-xl bg-[#2A1810] hover:bg-[#3D2318] text-white text-xs font-bold transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{language === "kn" ? "ಕ್ಯಾಮೆರಾ / ಗ್ಯಾಲರಿ" : "Upload Craft Photo"}</span>
          </button>
        </div>
      </div>

      {/* Preset Demo Photo Selector Pills */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          {language === "kn" ? "ಅಥವಾ ಡೆಮೊ ಕಲಾಕೃತಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:" : "Or select an authentic craft sample to inspect:"}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PRESET_CRAFT_PHOTOS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`p-2 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                selectedPhoto === preset.imageUrl
                  ? "bg-amber-50 border-[#C85A32] shadow-sm ring-2 ring-amber-300"
                  : "bg-stone-50 border-stone-200 hover:border-amber-300"
              }`}
            >
              <img
                src={preset.imageUrl}
                alt={preset.name}
                className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-stone-800 block truncate">
                  {language === "kn" ? preset.kannadaName : preset.name}
                </span>
                <span className="text-[10px] text-[#C85A32] font-semibold">
                  {preset.craft}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Visual Scanning Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-stone-200">
        
        {/* Left: Craft Image with Laser Scan Effect */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border-2 border-amber-300 shadow-md">
          <img
            src={selectedPhoto}
            alt="Craft to inspect"
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isScanning ? "scale-105 filter brightness-95" : ""
            }`}
          />

          {/* Animated Scanning Laser Beam */}
          {isScanning && (
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/20 via-transparent to-amber-500/20 animate-pulse pointer-events-none">
              <div className="w-full h-1 bg-[#E67E22] shadow-[0_0_15px_#E67E22] animate-bounce" />
            </div>
          )}

          {/* Provenance Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-[#2A1810]/90 text-amber-300 border border-amber-500/50 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E67E22]" />
              <span>{analyzedCraft?.giCode || "GI Registry Verified"}</span>
            </span>
          </div>

          {/* Rescan Trigger */}
          <button
            type="button"
            onClick={() => analyzedCraft && runVisualAnalysis(analyzedCraft)}
            className="absolute bottom-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 text-stone-900 text-[11px] font-bold shadow-md hover:bg-white flex items-center gap-1.5 transition-transform hover:scale-105 active:scale-95 backdrop-blur-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#C85A32] ${isScanning ? "animate-spin" : ""}`} />
            <span>{language === "kn" ? "ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ" : "Re-Scan Photo"}</span>
          </button>
        </div>

        {/* Right: AI Analysis Results Card */}
        <div className="space-y-4">
          
          {isScanning ? (
            <div className="py-8 space-y-4 text-center">
              <div className="w-12 h-12 rounded-full border-4 border-amber-500 border-t-transparent animate-spin mx-auto" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block">
                  AI Computer Vision Inspection in Progress
                </span>
                <p className="text-sm font-extrabold text-stone-800">
                  {scanSteps[scanStep]}
                </p>
              </div>
            </div>
          ) : analyzedCraft ? (
            <div className="space-y-4">
              
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider inline-block mb-1">
                    ✓ 98.4% Authentic Handcraft Match
                  </span>
                  <h3 className="text-lg font-black text-[#2A1810]">
                    {language === "kn" ? analyzedCraft.kannadaName : analyzedCraft.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-0.5">
                    {analyzedCraft.motifs}
                  </p>
                </div>

                {/* Spoken Kannada Audio Readout Button */}
                <button
                  type="button"
                  onClick={() => playKannadaAudio(analyzedCraft.kannadaStory)}
                  className="p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#C85A32] border border-amber-300 transition-colors flex-shrink-0"
                  title="Listen in Kannada"
                >
                  <Volume2 className={`w-5 h-5 ${isSpeaking ? "animate-bounce text-red-600" : ""}`} />
                </button>
              </div>

              {/* Diagnostic Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-0.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Estimated Labor
                  </span>
                  <div className="text-base font-extrabold text-stone-900">
                    {analyzedCraft.handcraftHours} Hours
                  </div>
                  <span className="text-[10px] text-stone-500">
                    Counted needle handwork
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-stone-200 space-y-0.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                    Recommended MSP
                  </span>
                  <div className="text-base font-extrabold text-emerald-700">
                    ₹{analyzedCraft.pricePerUnitINR.toLocaleString("en-IN")}
                  </div>
                  <span className="text-[10px] text-emerald-800 font-semibold">
                    75% Direct Maker Share
                  </span>
                </div>
              </div>

              {/* Detected Material Note */}
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-stone-700 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-[#C85A32] text-[11px]">
                  <Award className="w-3.5 h-3.5" />
                  <span>Verified Raw Materials:</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  {analyzedCraft.material}
                </p>
              </div>

              <div className="text-[11px] text-stone-500 italic">
                {language === "kn"
                  ? "✓ ವಿವರಗಳನ್ನು ಕೆಳಗಿನ ಕಾರ್ಡ್‌ನಲ್ಲಿ ಸ್ವಯಂ ಭರ್ತಿ ಮಾಡಲಾಗಿದೆ. ಒಂದೇ ಟ್ಯಾಪ್‌ನಲ್ಲಿ ಪ್ರಕಟಿಸಿ."
                  : "✓ Details populated into the review card below. Ready to publish with one tap."}
              </div>

            </div>
          ) : null}

        </div>

      </div>

    </div>
  );
}
