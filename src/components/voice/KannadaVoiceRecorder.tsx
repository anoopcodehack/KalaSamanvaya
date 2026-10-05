"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, AlertCircle, RefreshCw, Send, Radio } from "lucide-react";
import { parseKannadaTranscript, ExtractedCraftListing } from "@/lib/voice/kannadaKeywords";
import { playSpeech, stopSpeech } from "@/lib/voice/playSpeech";

interface KannadaVoiceRecorderProps {
  onListingExtracted: (listing: ExtractedCraftListing) => void;
  language: "kn" | "en";
}

// Authentic bilingual presets matching the top language toggle
const DEMO_PRESETS = {
  kn: [
    {
      label: "೮೦ ಕಸೂತಿ ಶಾಲುಗಳು",
      transcript: "ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಒಂದಕ್ಕೆ 600 ರೂಪಾಯಿ, 15 ದಿನಗಳಲ್ಲಿ ನೀಡುತ್ತೇನೆ",
      craft: "Kasuti"
    },
    {
      label: "೫೦ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳು",
      transcript: "ನಮ್ಮ ಸಂಘದಲ್ಲಿ 50 ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳಿವೆ, ಬೆಲೆ 450 ರೂಪಾಯಿ, 10 ದಿನಗಳಲ್ಲಿ ತಯಾರಿಸುತ್ತೇವೆ",
      craft: "Beedu"
    },
    {
      label: "೪೦ ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆಗಳು",
      transcript: "ನನ್ನ ಬಳಿ 40 ಮಡಿಕೆ ಜಗ್ಗುಗಳಿವೆ, ಒಂದಕ್ಕೆ 350 ರೂಪಾಯಿ, 7 ದಿನಗಳಲ್ಲಿ ಕೊಡಬಹುದು",
      craft: "Pottery"
    },
    {
      label: "೨೫ ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ ಕುಂಡಗಳು",
      transcript: "ನನ್ನ ಬಳಿ ಬೆಳಗಾವಿ ಖಾನಾಪುರದ 25 ಟೆರಾಕೋಟಾ ಮಣ್ಣಿನ ಕುಂಡಗಳಿವೆ, ಒಂದಕ್ಕೆ 1200 ರೂಪಾಯಿ, 10 ದಿನಗಳಲ್ಲಿ ಕಳುಹಿಸುತ್ತೇನೆ",
      craft: "Pottery"
    },
    {
      label: "೧೫ ಉಡುಪಿ ಹತ್ತಿ ಸೀರೆಗಳು",
      transcript: "ನಮ್ಮ ಬಳಿ 15 ಉಡುಪಿ ಕೈಮಗ್ಗದ ನೈಸರ್ಗಿಕ ಹತ್ತಿ ಸೀರೆಗಳಿವೆ, ಒಂದಕ್ಕೆ 2350 ರೂಪಾಯಿ, 8 ದಿನಗಳಲ್ಲಿ ಕೊಡುತ್ತೇವೆ",
      craft: "Udupi Sarees"
    }
  ],
  en: [
    {
      label: "80 Kasuti Silk Shawls",
      transcript: "I have 80 Kasuti silk shawls, 600 rupees each, delivery in 15 days",
      craft: "Kasuti"
    },
    {
      label: "50 Beedu Grass Baskets",
      transcript: "Our cluster has 50 Beedu grass baskets, price 450 rupees, 10 days",
      craft: "Beedu"
    },
    {
      label: "40 Terracotta Water Jugs",
      transcript: "I have 40 terracotta water jugs, 350 rupees each, delivery in 7 days",
      craft: "Pottery"
    },
    {
      label: "25 Khanapur Terracotta Urns",
      transcript: "We have 25 Belagavi Khanapur terracotta garden urns, 1200 rupees each, dispatch in 10 days",
      craft: "Pottery"
    },
    {
      label: "15 Udupi Handloom Sarees",
      transcript: "I have 15 authentic GI tagged Udupi cotton sarees, 2350 rupees each, delivery in 8 days",
      craft: "Udupi Sarees"
    }
  ]
};

export default function KannadaVoiceRecorder({
  onListingExtracted,
  language
}: KannadaVoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [interimText, setInterimText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [manualInput, setManualInput] = useState("");

  const speechLang = language === "kn" ? "kn-IN" : "en-IN";

  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const capturedTextRef = useRef<string>("");
  const isRecordingRef = useRef<boolean>(false);
  const accumulatedFinalRef = useRef<string>("");

  useEffect(() => {
    // Reset any ongoing speech or text when user switches top language toggle
    setTranscript("");
    setInterimText("");
    setErrorMessage("");
    stopSpeech();
  }, [language]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleExtractedResult = (extracted: ExtractedCraftListing) => {
    if (extracted && extracted.craft) {
      onListingExtracted(extracted);
    }
  };

  const sendForParsing = async (text: string, audioBlob?: Blob) => {
    if (!text && (!audioBlob || audioBlob.size === 0)) {
      setErrorMessage(
        language === "kn"
          ? "ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮೈಕ್ ಹತ್ತಿರ ಮತ್ತೊಮ್ಮೆ ಮಾತನಾಡಿ ಅಥವಾ ಕೆಳಗಿನ ಸ್ಯಾಂಪಲ್ ಒತ್ತಿ."
          : "No speech detected. Please speak closer to the mic or click a preset below."
      );
      return;
    }

    setIsParsing(true);
    setErrorMessage("");

    // Immediate local heuristic update for 0ms lag
    if (text && text.trim()) {
      const local = parseKannadaTranscript(text);
      handleExtractedResult(local);
    }

    try {
      let audioBase64: string | undefined;
      let mimeType: string | undefined;

      if (audioBlob && audioBlob.size > 0) {
        mimeType = audioBlob.type || "audio/webm";
        audioBase64 = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const res = reader.result as string;
            resolve(res.includes(",") ? res.split(",")[1] : res);
          };
          reader.readAsDataURL(audioBlob);
        });
      }

      const res = await fetch("/api/voice-parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transcript: text,
          audioBase64,
          mimeType,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.extracted) {
          if (data.extracted.rawTranscript) {
            setTranscript(data.extracted.rawTranscript);
          }
          handleExtractedResult(data.extracted);
        }
      }
    } catch (err) {
      console.warn("Server voice-parse error:", err);
    } finally {
      setIsParsing(false);
    }
  };

  const startRecording = async () => {
    stopSpeech();
    setErrorMessage("");
    setTranscript("");
    setInterimText("");
    capturedTextRef.current = "";
    accumulatedFinalRef.current = "";
    isRecordingRef.current = true;
    setIsRecording(true);
    audioChunksRef.current = [];

    // Always start MediaRecorder audio buffer for 100% reliable Gemini Multimodal transcription
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
        });
        streamRef.current = audioStream;

        let options: MediaRecorderOptions = {};
        if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          options = { mimeType: "audio/webm;codecs=opus" };
        } else if (MediaRecorder.isTypeSupported("audio/webm")) {
          options = { mimeType: "audio/webm" };
        }

        const recorder = new MediaRecorder(audioStream, options);
        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        recorder.start(250);
        mediaRecorderRef.current = recorder;
      }
    } catch (micErr: any) {
      console.warn("Microphone access notice:", micErr);
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        if (recognitionRef.current) {
          try { recognitionRef.current.abort(); } catch (_) {}
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = speechLang;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          let sessionFinal = "";
          let sessionInterim = "";

          for (let i = 0; i < event.results.length; i++) {
            const item = event.results[i];
            if (item.isFinal) {
              sessionFinal += item[0].transcript + " ";
            } else {
              sessionInterim += item[0].transcript;
            }
          }

          const combinedFinal = (accumulatedFinalRef.current + " " + sessionFinal).trim();
          const liveDisplay = (combinedFinal + " " + sessionInterim).trim();

          if (sessionInterim) {
            setInterimText(sessionInterim);
          } else {
            setInterimText("");
          }

          if (liveDisplay) {
            capturedTextRef.current = liveDisplay;
            setTranscript(liveDisplay);
            // Instant heuristic preview as full sentence emerges
            if (liveDisplay.length > 8) {
              const preview = parseKannadaTranscript(liveDisplay);
              if (preview && preview.craft) {
                handleExtractedResult(preview);
              }
            }
          }

          if (sessionFinal.trim()) {
            accumulatedFinalRef.current = combinedFinal;
          }
        };

        recognition.onerror = (event: any) => {
          console.warn("Web Speech API notice:", event.error);
          if (event.error === "not-allowed" || event.error === "permission-denied") {
            setErrorMessage(
              language === "kn"
                ? "ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ನಿರಾಕರಿಸಲಾಗಿದೆ. ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್ಸ್‌ನಲ್ಲಿ ಅನುಮತಿಸಿ."
                : "Microphone permission denied. Please allow microphone access in your browser settings."
            );
            stopRecording();
          }
        };

        // Crucial: keep listening across natural pauses so full sentence is captured
        recognition.onend = () => {
          if (isRecordingRef.current) {
            try {
              recognition.start();
            } catch (_) {}
          }
        };

        recognition.start();
      } catch (e) {
        console.warn("SpeechRecognition start notice:", e);
      }
    }
  };

  const stopRecording = () => {
    isRecordingRef.current = false;
    setIsRecording(false);
    setAudioLevel(0);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (_) {}
      recognitionRef.current = null;
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.onstop = () => {
        const mimeType = mediaRecorderRef.current?.mimeType || "audio/webm";
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        const textToSend = (capturedTextRef.current || interimText || transcript).trim();
        sendForParsing(textToSend, audioBlob);
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };
      try {
        mediaRecorderRef.current.stop();
      } catch (_) {}
    } else {
      const textToSend = (capturedTextRef.current || interimText || transcript).trim();
      sendForParsing(textToSend);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Play audio sample strictly in the selected language
  const simulateSample = (sample: (typeof DEMO_PRESETS.kn)[0]) => {
    setErrorMessage("");
    setInterimText("");

    playSpeech(sample.transcript, language);

    // Typewriter animation
    let charIdx = 0;
    const fullText = sample.transcript;
    setTranscript("");

    const interval = setInterval(() => {
      charIdx += 2;
      if (charIdx >= fullText.length) {
        clearInterval(interval);
        setTranscript(fullText);
        sendForParsing(fullText);
      } else {
        setTranscript(fullText.slice(0, charIdx));
      }
    }, 25);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInput.trim()) return;
    setTranscript(manualInput);
    sendForParsing(manualInput);
    setManualInput("");
  };

  const currentPresets = language === "kn" ? DEMO_PRESETS.kn : DEMO_PRESETS.en;

  return (
    <div className="bg-[#2A1810] text-[#FAF6F0] p-6 sm:p-8 rounded-3xl border border-amber-800/40 shadow-2xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E67E22]/20 border border-[#E67E22]/40 text-[#E67E22] text-xs font-bold uppercase tracking-wider">
          <Radio className="w-3.5 h-3.5" />
          <span>{language === "kn" ? "ಧ್ವನಿ ಮೂಲಕ ನೇರ ನೊಂದಣಿ" : "Voice-Assisted Craft Listing"}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white">
          {language === "kn"
            ? "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ ನಿಮ್ಮ ಸರಕನ್ನು ನೊಂದಾಯಿಸಿ"
            : "Speak to List Your Craft Inventory"}
        </h3>
        <p className="text-xs text-amber-200/80 max-w-md mx-auto leading-relaxed">
          {language === "kn"
            ? "ಕರಕುಶಲ ಪ್ರಕಾರ, ಪ್ರಮಾಣ (ಸಂಖ್ಯೆ) ಮತ್ತು ಪ್ರತಿ ಯೂನಿಟ್ ಬೆಲೆಯನ್ನು ಸರಳವಾಗಿ ಹೇಳಿ."
            : "Simply mention your craft type, quantity (e.g., 40 water jugs), and price in INR."}
        </p>
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

        {/* Live Audio Level Meter when Recording */}
        {isRecording && (
          <div className="mt-3 flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <div className="w-32 sm:w-44 h-2 bg-stone-800 rounded-full overflow-hidden border border-amber-900/60">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-[#E67E22] transition-all duration-75"
                style={{ width: `${Math.max(8, audioLevel)}%` }}
              />
            </div>
            <span className="text-[10px] text-emerald-400 font-mono font-bold">
              {audioLevel > 15 ? (language === "kn" ? "ಧ್ವನಿ ಗ್ರಹಿಸಲಾಗಿದೆ" : "Voice detected") : (language === "kn" ? "ಮೈಕ್ ಸಕ್ರಿಯ" : "Mic listening")}
            </span>
          </div>
        )}

        {/* Status Text Indicator */}
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isRecording ? "bg-red-500 animate-ping" : "bg-emerald-500"
            }`}
          />
          <span className="text-amber-100">
            {isRecording
              ? language === "kn"
                ? "ಆಲಿಸಲಾಗುತ್ತಿದೆ... ಮಾತನಾಡಿ 'ನಿಲ್ಲಿಸಿ' ಒತ್ತಿ"
                : "Listening to your voice... Speak now, then click Stop"
              : isParsing
              ? language === "kn"
                ? "ಕರಕುಶಲ ವಿವರ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ..."
                : "Processing craft details..."
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
            <span>{language === "kn" ? "ಧ್ವನಿ ವಿವರ:" : "Spoken Voice Transcript:"}</span>
          </div>
          {isParsing && (
            <span className="text-[10px] text-amber-400 flex items-center gap-1 animate-pulse">
              <RefreshCw className="w-2.5 h-2.5 animate-spin" />
              {language === "kn" ? "ವಿಶ್ಲೇಷಣೆ..." : "Extracting..."}
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
              ? "ಉದಾಹರಣೆಗೆ: 'ನನ್ನ ಬಳಿ 40 ಮಡಿಕೆ ಜಗ್ಗುಗಳಿವೆ, ಒಂದಕ್ಕೆ 350 ರೂಪಾಯಿ, 7 ದಿನಗಳಲ್ಲಿ ನೀಡುತ್ತೇನೆ...'"
              : "Example: 'I have 40 terracotta water jugs, 350 rupees each, delivery in 7 days...'"}
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
                ? "ಸಲಹೆ: ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಮೈಕ್ ಅನುಮತಿಸಲು ವಿಳಾಸ ಪಟ್ಟಿಯ ಲಾಕ್ ಐಕಾನ್ ಒತ್ತಿ ಅಥವಾ ಕೆಳಗಿನ ೧-ಕ್ಲಿಕ್ ಮಾದರಿ ಬಳಸಿ."
                : "Tip: Make sure you allowed microphone access or click one of the 1-click presets below."}
            </p>
          </div>
        </div>
      )}

      {/* 1-Click Demo Voice Presets (Strictly in the active language!) */}
      <div className="pt-2 border-t border-amber-900/40 space-y-2.5">
        <div className="flex items-center justify-between text-xs text-stone-400">
          <span className="font-semibold text-amber-300">
            {language === "kn" ? "ತ್ವರಿತ ಮಾದರಿ ಧ್ವನಿಗಳು (೧-ಕ್ಲಿಕ್ ಪರೀಕ್ಷೆ):" : "Demo Speech Presets (1-Click Test & Audio):"}
          </span>
          <span className="text-[10px] text-amber-300/80 flex items-center gap-1 font-semibold">
            <Volume2 className="w-3.5 h-3.5 text-[#E67E22]" />
            {language === "kn" ? "ಧ್ವನಿ ಮಾದರಿ" : "Spoken Audio Samples"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {currentPresets.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => simulateSample(sample)}
              className="p-3 bg-[#1F130B] hover:bg-[#351D0F] rounded-xl border border-amber-900/50 text-left transition-all hover:scale-[1.02] group"
            >
              <div className="text-xs font-bold text-amber-200 group-hover:text-white flex items-center justify-between">
                <span>{sample.label}</span>
                <Volume2 className="w-3.5 h-3.5 text-[#E67E22] group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-[10px] text-stone-400 line-clamp-1 mt-1 font-serif">
                &quot;{sample.transcript}&quot;
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Quick-Test Input */}
      <form onSubmit={handleManualSubmit} className="pt-2 border-t border-amber-900/40 flex items-center gap-2">
        <input
          type="text"
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          placeholder={
            language === "kn"
              ? "ಅಥವಾ ವಾಕ್ಯವನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ ಪರೀಕ್ಷಿಸಿ (ಉದಾ: 40 ಮಡಿಕೆ ಜಗ್ಗು 350 ರೂ)..."
              : "Or test by typing here (e.g., 40 water jugs 350 rs 7 days)..."
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
