"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, AlertCircle, RefreshCw, Sparkles, Send, Globe } from "lucide-react";
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
  const [speechLang, setSpeechLang] = useState<"kn-IN" | "en-IN">("kn-IN");
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [manualInput, setManualInput] = useState("");

  const recognitionInstanceRef = useRef<any>(null);
  const latestInterimRef = useRef<string>("");

  useEffect(() => {
    // Check Web Speech API browser availability
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  // Process and extract listing details
  const processTranscript = async (rawText: string) => {
    if (!rawText || !rawText.trim()) return;

    setIsParsing(true);
    // Instant heuristic local fallback for 0ms lag
    const localExtracted = parseKannadaTranscript(rawText);
    onListingExtracted(localExtracted);

    // Call server API for optional Gemini 1.5 Flash parsing
    try {
      const res = await fetch("/api/voice-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: rawText })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.extracted) {
          onListingExtracted(data.extracted);
        }
      }
    } catch (e) {
      console.warn("Server voice-parse fallback to local heuristic", e);
    } finally {
      setIsParsing(false);
    }
  };

  const startListening = () => {
    setErrorMessage("");
    setTranscript("");
    setInterimText("");
    latestInterimRef.current = "";

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      setErrorMessage(
        language === "kn"
          ? "ನಿಮ್ಮ ಬ್ರೌಸರ್ Web Speech API ಬೆಂಬಲಿಸುವುದಿಲ್ಲ. Google Chrome ಬಳಸಿ ಅಥವಾ ಕೆಳಗಿನ ಸ್ಯಾಂಪಲ್ ಒತ್ತಿರಿ."
          : "Web Speech API is not supported in this browser. Please use Google Chrome or a 1-click sample below."
      );
      return;
    }

    try {
      // Create a FRESH recognition instance to avoid stale state bugs
      if (recognitionInstanceRef.current) {
        try {
          recognitionInstanceRef.current.abort();
        } catch (_) {}
      }

      const recognition = new SpeechRecognition();
      recognition.lang = speechLang;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setErrorMessage("");
      };

      recognition.onresult = (event: any) => {
        let currentInterim = "";
        let finalChunk = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const item = event.results[i];
          if (item.isFinal) {
            finalChunk += item[0].transcript;
          } else {
            currentInterim += item[0].transcript;
          }
        }

        if (currentInterim) {
          setInterimText(currentInterim);
          latestInterimRef.current = currentInterim;
        }

        if (finalChunk) {
          setTranscript(finalChunk);
          setInterimText("");
          latestInterimRef.current = "";
          processTranscript(finalChunk);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition error:", event.error);
        setIsRecording(false);

        if (event.error === "not-allowed" || event.error === "service-not-allowed") {
          setErrorMessage(
            language === "kn"
              ? "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಅಡ್ರೆಸ್ ಬಾರ್‌ನಲ್ಲಿರುವ ಲಾಕ್/ಕ್ಯಾಮೆರಾ ಐಕಾನ್ ಕ್ಲಿಕ್ ಮಾಡಿ ಅನುಮತಿಸಿ."
              : "Microphone permission denied. Click the lock/tune icon near your browser address bar to allow microphone."
          );
        } else if (event.error === "no-speech") {
          // If we had interim text before no-speech, use it!
          if (latestInterimRef.current) {
            const captured = latestInterimRef.current;
            setTranscript(captured);
            setInterimText("");
            processTranscript(captured);
          } else {
            setErrorMessage(
              language === "kn"
                ? "ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ಮೈಕ್ ಹತ್ತಿರ ಸ್ವಲ್ಪ ಜೋರಾಗಿ ಮಾತನಾಡಿ ಅಥವಾ ಕೆಳಗಿನ ಸ್ಯಾಂಪಲ್ ಆಯ್ಕೆಮಾಡಿ."
                : "No speech detected. Please speak closer to the mic or choose a 1-click preset below."
            );
          }
        } else if (event.error === "network") {
          setErrorMessage(
            language === "kn"
              ? "ನೆಟ್‌ವರ್ಕ್ ಅಥವಾ ಬ್ರೌಸರ್ ಸ್ಪೀಚ್ ಸರ್ವರ್ ಸಮಸ್ಯೆ. ಭಾಷೆಯನ್ನು 'English (en-IN)' ಗೆ ಬದಲಾಯಿಸಿ ಅಥವಾ Google Chrome ನಲ್ಲಿ ಪರೀಕ್ಷಿಸಿ."
              : "Speech network issue in this browser. Try switching language to 'English (en-IN)' or use Google Chrome."
          );
        } else {
          setErrorMessage(
            language === "kn"
              ? `ಧ್ವನಿ ದೋಷ (${event.error}). ಕೆಳಗಿನ ಸ್ಯಾಂಪಲ್ ವಾಕ್ಯವನ್ನು ಒತ್ತಿ ಪರೀಕ್ಷಿಸಿ.`
              : `Microphone notice (${event.error}). You can use the 1-click presets or manual box below.`
          );
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
        // Fallback: If onresult had interim text but was not marked isFinal before stopping
        if (!transcript && latestInterimRef.current) {
          const captured = latestInterimRef.current;
          setTranscript(captured);
          setInterimText("");
          latestInterimRef.current = "";
          processTranscript(captured);
        }
      };

      recognitionInstanceRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("SpeechRecognition start failed:", e);
      setIsRecording(false);
      setErrorMessage(
        language === "kn"
          ? "ಮೈಕ್ ಪ್ರಾರಂಭಿಸಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುಟವನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ ಅಥವಾ ಸ್ಯಾಂಪಲ್ ಬಳಸಿ."
          : "Could not initialize microphone. Please refresh or use the 1-click samples below."
      );
    }
  };

  const stopListening = () => {
    if (recognitionInstanceRef.current) {
      try {
        recognitionInstanceRef.current.stop();
      } catch (_) {}
    }
    setIsRecording(false);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopListening();
    } else {
      startListening();
    }
  };

  // Play audio sample using browser TTS and populate
  const simulateSample = (sample: typeof SAMPLE_KANNADA_PROMPTS[0]) => {
    setTranscript(sample.transcript);
    setInterimText("");
    setErrorMessage("");

    // Read out loud with SpeechSynthesis if available
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(sample.transcript);
        utterance.lang = "kn-IN";
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      } catch (_) {}
    }

    processTranscript(sample.transcript);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setTranscript(manualInput);
    processTranscript(manualInput);
    setManualInput("");
  };

  return (
    <div className="bg-[#2A1810] text-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-2xl space-y-6">
      {/* Header & Language Selection */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E67E22]/20 border border-[#E67E22]/40 text-[#E67E22] text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === "kn" ? "ಧ್ವನಿ ಆಧಾರಿತ ನೊಂದಣಿ" : "Multimodal Voice Recognition"}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {language === "kn"
            ? "ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಮಾತನಾಡಿ ನಿಮ್ಮ ಸರಕನ್ನು ನೊಂದಾಯಿಸಿ"
            : "Speak in Kannada or English to List Your Craft Inventory"}
        </h3>
        <p className="text-xs text-amber-200/80 max-w-md mx-auto leading-relaxed">
          {language === "kn"
            ? "ಕರಕುಶಲ ಪ್ರಕಾರ, ಪ್ರಮಾಣ (ಸಂಖ್ಯೆ) ಮತ್ತು ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆಯನ್ನು ಸರಳವಾಗಿ ಹೇಳಿ."
            : "Simply mention your craft type, quantity (e.g., 80 shawls), and price in INR."}
        </p>

        {/* Acoustic Speech Model Selector */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <span className="text-[11px] text-stone-400 font-semibold flex items-center gap-1">
            <Globe className="w-3 h-3 text-[#E67E22]" />
            {language === "kn" ? "ಧ್ವನಿ ಭಾಷೆ:" : "Speech Language:"}
          </span>
          <button
            type="button"
            onClick={() => setSpeechLang("kn-IN")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              speechLang === "kn-IN"
                ? "bg-[#E67E22] text-white shadow-sm"
                : "bg-white/10 text-stone-300 hover:text-white hover:bg-white/20"
            }`}
          >
            ಕನ್ನಡ (kn-IN)
          </button>
          <button
            type="button"
            onClick={() => setSpeechLang("en-IN")}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              speechLang === "en-IN"
                ? "bg-[#E67E22] text-white shadow-sm"
                : "bg-white/10 text-stone-300 hover:text-white hover:bg-white/20"
            }`}
          >
            English / Kanglish (en-IN)
          </button>
        </div>
      </div>

      {/* Big Animated Microphone Button */}
      <div className="flex flex-col items-center justify-center pt-2 pb-2">
        <div className="relative">
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

        {/* Live Audio Status */}
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isRecording ? "bg-red-500 animate-ping" : "bg-emerald-500"
            }`}
          />
          <span className="text-amber-100">
            {isRecording
              ? language === "kn"
                ? `ಆಲಿಸಲಾಗುತ್ತಿದೆ (${speechLang})... ಈಗ ಮಾತನಾಡಿ`
                : `Listening (${speechLang})... Speak clearly now`
              : isParsing
              ? language === "kn"
                ? "AI ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ..."
                : "Extracting craft data with AI..."
              : language === "kn"
              ? "ಮೈಕ್ ಬಟನ್ ಒತ್ತಿ ಮಾತನಾಡಿ"
              : "Ready • Tap button above to speak"}
          </span>
        </div>
      </div>

      {/* Live Transcript Bubble */}
      <div className="bg-[#1C0E07] rounded-2xl p-4 sm:p-5 border border-amber-900/60 min-h-[90px] flex flex-col justify-center">
        <div className="text-[11px] text-[#E67E22] font-semibold mb-1 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5" />
            <span>{language === "kn" ? `ಧ್ವನಿ ಇನ್‌ಪುಟ್ (${speechLang}):` : `Spoken Voice Transcript (${speechLang}):`}</span>
          </div>
          {isParsing && (
            <span className="text-[10px] text-amber-400 flex items-center gap-1 animate-pulse">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
              Parsing...
            </span>
          )}
        </div>

        {transcript || interimText ? (
          <p className="text-base sm:text-lg font-medium text-white leading-relaxed font-serif">
            {transcript} <span className="text-amber-400 italic">{interimText}</span>
          </p>
        ) : (
          <p className="text-xs text-stone-500 italic">
            {language === "kn"
              ? "ಉದಾಹರಣೆಗೆ: 'ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಒಂದಕ್ಕೆ 600 ರೂಪಾಯಿ, 15 ದಿನಗಳಲ್ಲಿ ನೀಡುತ್ತೇನೆ...'"
              : "Example: 'I have 80 kasuti shawls, 600 rupees each, delivery in 15 days...'"}
          </p>
        )}
      </div>

      {/* Error Message Box */}
      {errorMessage && (
        <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-700/60 text-xs text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold">{errorMessage}</p>
            <p className="text-[11px] text-stone-400">
              {language === "kn"
                ? "ಸಲಹೆ: ಕೆಳಗಿನ 1-ಕ್ಲಿಕ್ ಮಾದರಿ ವಾಕ್ಯಗಳನ್ನು ಬಳಸಿ ಅಥವಾ ನೇರವಾಗಿ ವಾಕ್ಯವನ್ನು ಟೈಪ್ ಮಾಡಿ ಪರೀಕ್ಷಿಸಿ."
                : "Tip: You can use the 1-click presets or manual test box below to verify."}
            </p>
          </div>
        </div>
      )}

      {/* 1-Click Demo Voice Presets */}
      <div className="pt-2 border-t border-amber-900/40 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="font-semibold text-amber-300">
            {language === "kn" ? "ತ್ವರಿತ ಮಾದರಿ ಧ್ವನಿಗಳು (1-ಕ್ಲಿಕ್ ಪರೀಕ್ಷೆ):" : "Demo Speech Presets (1-Click Test & Audio):"}
          </span>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <Sparkles className="w-3 h-3" />
            Instant Voice TTS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {SAMPLE_KANNADA_PROMPTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => simulateSample(sample)}
              className="p-3 bg-[#1F130B] hover:bg-[#351D0F] rounded-xl border border-amber-900/50 text-left transition-all hover:scale-[1.02] group"
            >
              <div className="text-xs font-bold text-amber-200 group-hover:text-white flex items-center justify-between">
                <span>{language === "kn" ? sample.kannadaLabel : sample.label}</span>
                <Volume2 className="w-3.5 h-3.5 text-[#E67E22] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[10px] text-stone-400 line-clamp-1 mt-1 font-serif">
                &quot;{sample.transcript}&quot;
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Quick-Test Input (Guaranteed Testing Safeguard) */}
      <form onSubmit={handleManualSubmit} className="pt-2 border-t border-amber-900/40 flex items-center gap-2">
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder={
            language === "kn"
              ? "ಅಥವಾ ವಾಕ್ಯವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ ಪರೀಕ್ಷಿಸಿ (ಉದಾ: 80 ಕಸೂತಿ ಶಾಲು 600 ರೂ)..."
              : "Or test by typing here (e.g., 80 kasuti shawls 600 rs 15 days)..."
          }
          className="flex-1 bg-[#1A0E07] text-white text-xs px-3.5 py-2.5 rounded-xl border border-amber-900/60 focus:outline-hidden focus:border-[#E67E22] placeholder:text-stone-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-[#E67E22] hover:bg-[#cf6d17] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <span>{language === "kn" ? "ಪರಿಶೀಲಿಸಿ" : "Extract"}</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}
