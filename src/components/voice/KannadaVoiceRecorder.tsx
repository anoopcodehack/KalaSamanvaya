"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { parseKannadaTranscript, ExtractedCraftListing } from "@/lib/voice/kannadaKeywords";

interface KannadaVoiceRecorderProps {
  onListingExtracted: (listing: ExtractedCraftListing) => void;
  language: "kn" | "en";
}

// Sample authentic rural Kannada voice prompts for live testing & demonstrations
const SAMPLE_KANNADA_PROMPTS = [
  {
    label: "Kasuti Shawls (80 Units)",
    kannadaLabel: "೮೦ ಕಸೂತಿ ಶಾಲುಗಳು",
    transcript: "ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಒಂದಕ್ಕೆ 600 ರೂಪಾಯಿ, 15 ದಿನಗಳಲ್ಲಿ ನೀಡುತ್ತೇನೆ",
    craft: "Kasuti"
  },
  {
    label: "Beedu Grass Baskets (50 Units)",
    kannadaLabel: "೫೦ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳು",
    transcript: "ನಮ್ಮ ಸಂಘದಲ್ಲಿ 50 ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳಿವೆ, ಬೆಲೆ 450 ರೂಪಾಯಿ, 10 ದಿನಗಳಲ್ಲಿ ತಯಾರಿಸುತ್ತೇವೆ",
    craft: "Beedu"
  },
  {
    label: "Terracotta Water Jugs (40 Units)",
    kannadaLabel: "೪೦ ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆಗಳು",
    transcript: "ನನ್ನ ಬಳಿ 40 ಮಡಿಕೆ ಜಗ್ಗುಗಳಿವೆ, ಒಂದಕ್ಕೆ 350 ರೂಪಾಯಿ, 7 ದಿನಗಳಲ್ಲಿ ಕೊಡಬಹುದು",
    craft: "Pottery"
  }
];

export default function KannadaVoiceRecorder({
  onListingExtracted,
  language
}: KannadaVoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "kn-IN"; // Native Kannada Speech Recognition
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMessage("");
        setInterimText("");
      };

      recognition.onresult = (event: any) => {
        let currentInterim = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            currentInterim += item[0].transcript;
          }
        }

        if (currentInterim) {
          setInterimText(currentInterim);
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          setInterimText("");
          // Parse and notify
          const extracted = parseKannadaTranscript(finalTranscript);
          onListingExtracted(extracted);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        if (event.error === "not-allowed") {
          setErrorMessage(
            language === "kn"
              ? "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಅನುಮತಿಸಿ ಅಥವಾ ಕೆಳಗಿನ ಸ್ಯಾಂಪಲ್ ವಾಕ್ಯವನ್ನು ಆರಿಸಿ."
              : "Microphone permission denied. Please allow microphone access or choose a sample prompt below."
          );
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.error("Web Speech API initialization failed:", e);
      setIsSupported(false);
    }
  }, [language, onListingExtracted]);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setTranscript("");
      setInterimText("");
      setErrorMessage("");
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
        // Fallback simulation
        simulateSample(SAMPLE_KANNADA_PROMPTS[0]);
      }
    }
  };

  const simulateSample = (sample: typeof SAMPLE_KANNADA_PROMPTS[0]) => {
    setTranscript(sample.transcript);
    setInterimText("");
    const extracted = parseKannadaTranscript(sample.transcript);
    onListingExtracted(extracted);
  };

  return (
    <div className="bg-[#2A1810] text-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-2xl space-y-6">
      {/* Mic Title & Vernacular Instructions */}
      <div className="text-center space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#E67E22] font-bold">
          {language === "kn" ? "ಧ್ವನಿ ಮೂಲಕ ನೇರ ನೊಂದಣಿ" : "Browser-Based Voice Recognition (kn-IN)"}
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {language === "kn"
            ? "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ ನಿಮ್ಮ ಸರಕನ್ನು ನೊಂದಾಯಿಸಿ"
            : "Speak in Kannada to List Your Craft Inventory"}
        </h3>
        <p className="text-xs text-amber-200/80 max-w-md mx-auto leading-relaxed">
          {language === "kn"
            ? "ಕರಕುಶಲ ಪ್ರಕಾರ, ಪ್ರಮಾಣ (ಸಂಖ್ಯೆ) ಮತ್ತು ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆಯನ್ನು ಸರಳವಾಗಿ ಹೇಳಿ."
            : "Simply mention your craft type, quantity (e.g., 80 shawls), and price in INR."}
        </p>
      </div>

      {/* Big Animated Microphone Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4">
        <div className="relative">
          {/* Pulsing Animated Wave Rings when recording */}
          {isRecording && (
            <>
              <div className="absolute inset-0 rounded-full bg-[#E67E22]/30 animate-ping duration-1000 scale-150" />
              <div className="absolute inset-0 rounded-full bg-[#E67E22]/20 animate-pulse duration-700 scale-125" />
            </>
          )}

          <button
            type="button"
            onClick={toggleRecording}
            className={`relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-95 ${
              isRecording
                ? "bg-[#C85A32] text-white ring-8 ring-[#E67E22]/40 animate-pulse"
                : "bg-gradient-to-br from-[#E67E22] to-[#C85A32] hover:from-[#cf6d17] hover:to-[#A34828] text-white hover:scale-105"
            }`}
            aria-label={isRecording ? "Stop recording" : "Start speaking"}
          >
            {isRecording ? (
              <>
                <MicOff className="w-10 h-10 mb-1" />
                <span className="text-[11px] font-bold tracking-wide">
                  {language === "kn" ? "ನಿಲ್ಲಿಸಿ" : "Stop"}
                </span>
              </>
            ) : (
              <>
                <Mic className="w-10 h-10 mb-1" />
                <span className="text-[11px] font-bold tracking-wide">
                  {language === "kn" ? "ಮಾತನಾಡಿ" : "Tap to Speak"}
                </span>
              </>
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isRecording ? "bg-red-500 animate-ping" : "bg-emerald-500"
            }`}
          />
          <span className="text-amber-100">
            {isRecording
              ? language === "kn"
                ? "ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಕನ್ನಡದಲ್ಲಿ ಹೇಳಿ"
                : "Listening to native Kannada audio..."
              : language === "kn"
              ? "ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ಮಾತನಾಡಿ"
              : "Ready • Tap button above"}
          </span>
        </div>
      </div>

      {/* Live Transcript Bubble */}
      <div className="bg-[#1C0E07] rounded-2xl p-4 sm:p-5 border border-amber-900/60 min-h-[90px] flex flex-col justify-center">
        <div className="text-[11px] text-[#E67E22] font-semibold mb-1 flex items-center gap-1.5">
          <Volume2 className="w-3.5 h-3.5" />
          <span>{language === "kn" ? "ಧ್ವನಿ ಇನ್‌ಪುಟ್ (kn-IN):" : "Spoken Kannada Transcript:"}</span>
        </div>

        {transcript || interimText ? (
          <p className="text-base sm:text-lg font-medium text-white leading-relaxed font-serif">
            {transcript} <span className="text-amber-400 italic">{interimText}</span>
          </p>
        ) : (
          <p className="text-xs text-stone-500 italic">
            {language === "kn"
              ? "ಉದಾಹರಣೆಗೆ: 'ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಒಂದಕ್ಕೆ 600 ರೂಪಾಯಿ...'"
              : "Speak or choose a sample prompt below to auto-extract craft fields."}
          </p>
        )}
      </div>

      {/* Error message fallback */}
      {errorMessage && (
        <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-700/60 text-xs text-amber-200 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Fast Demo Sample Chips (Allows instant demonstration even without active mic) */}
      <div className="pt-2 border-t border-amber-900/40 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="font-semibold text-amber-300">
            {language === "kn" ? "ತ್ವರಿತ ಮಾದರಿ ಧ್ವನಿಗಳು (ಡೆಮೊ):" : "Demo Speech Presets (1-Click Test):"}
          </span>
          <span className="text-[10px] text-stone-500">Heuristic Extraction</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_KANNADA_PROMPTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => simulateSample(sample)}
              className="p-2.5 bg-[#1F130B] hover:bg-[#351D0F] rounded-xl border border-amber-900/50 text-left transition-all hover:scale-[1.02] group"
            >
              <div className="text-xs font-bold text-amber-200 group-hover:text-white flex items-center justify-between">
                <span>{language === "kn" ? sample.kannadaLabel : sample.label}</span>
                <Sparkles className="w-3 h-3 text-[#E67E22]" />
              </div>
              <p className="text-[10px] text-stone-400 line-clamp-1 mt-1 font-serif">
                &quot;{sample.transcript}&quot;
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
