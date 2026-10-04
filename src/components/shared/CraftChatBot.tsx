"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Mic,
  MicOff,
  ShoppingBag,
  Building2,
  RotateCcw,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  Info
} from "lucide-react";
import { playSpeech, stopSpeech } from "@/lib/voice/playSpeech";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionLink?: {
    label: string;
    href: string;
    icon?: string;
  };
}

const INITIAL_MESSAGES: Record<"kn" | "en", ChatMessage[]> = {
  kn: [
    {
      id: "msg-welcome-kn",
      sender: "bot",
      text: "ನಮಸ್ಕಾರ! ಕಲಾ ಸಮನ್ವಯಕ್ಕೆ ಸ್ವಾಗತ. ನಾನು ನಿಮ್ಮ ಕರಕುಶಲ ಮತ್ತು ನೇರ ಗ್ರಾಹಕ ಮಾರ್ಗದರ್ಶಿ. ಕಸೂತಿ ಶಾಲುಗಳು, ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳು ಅಥವಾ ಬೃಹತ್ ಕಾರ್ಪೊರೇಟ್ ಉಡುಗೊರೆಗಳ ಬಗ್ಗೆ ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
      timestamp: "Just now",
      actionLink: {
        label: "ಕರಕುಶಲ ಮಳಿಗೆ ನೋಡಿ",
        href: "/marketplace",
        icon: "shop",
      },
    },
  ],
  en: [
    {
      id: "msg-welcome-en",
      sender: "bot",
      text: "Namaskara! Welcome to KalaSamanvaya. I am your Karnataka Craft & Fair-Trade Concierge. Ask me anything about our authentic GI handlooms, transparent 74.6% direct artisan payouts, or bespoke corporate gifting!",
      timestamp: "Just now",
      actionLink: {
        label: "Explore Handcrafted Store",
        href: "/marketplace",
        icon: "shop",
      },
    },
  ],
};

const SUGGESTED_QUESTIONS = {
  kn: [
    { label: "ಕಸೂತಿ ಬೆಲೆ ಏಕೆ ₹1,850?", query: "ಧಾರವಾಡ ಕಸೂತಿ ಶಾಲಿನ ಬೆಲೆ ಏಕೆ ₹1,850 ಮತ್ತು ಕುಶಲಕರ್ಮಿಗೆ ಎಷ್ಟು ಸಿಗುತ್ತದೆ?" },
    { label: "ಕುಶಲಕರ್ಮಿಗಳಿಗೆ ನೇರ ಪಾವತಿ ಹೇಗೆ?", query: "ಕುಶಲಕರ್ಮಿಗಳಿಗೆ ನೇರ ಬ್ಯಾಂಕ್ ಜಮಾ (DBT) ಹೇಗೆ ತಲುಪುತ್ತದೆ?" },
    { label: "200 ಬೃಹತ್ ಉಡುಗೊರೆಗಳು", query: "200 ಬೃಹತ್ ಕಾರ್ಪೊರೇಟ್ ಉಡುಗೊರೆಗಳನ್ನು ಆರ್ಡರ್ ಮಾಡುವುದು ಹೇಗೆ?" },
    { label: "ಧ್ವನಿ ನೊಂದಣಿ ಎಲ್ಲಿದೆ?", query: "ಗ್ರಾಮೀಣ ಕುಶಲಕರ್ಮಿಗಳ ಧ್ವನಿ ನೊಂದಣಿ ಪೋರ್ಟಲ್ ಎಲ್ಲಿದೆ?" },
    { label: "ಉಡುಪಿ ಬೀಡು ಬುಟ್ಟಿ ವಿವರ", query: "ಉಡುಪಿಯ ಸಾಂಪ್ರದಾಯಿಕ ಬೀಡು ಹುಲ್ಲಿನ ಬುಟ್ಟಿಗಳ ವಿಶೇಷತೆ ಏನು?" },
  ],
  en: [
    { label: "Why does Kasuti cost ₹1,850?", query: "Why does the Dharwad Kasuti silk shawl cost ₹1,850 and how much goes to the artisan?" },
    { label: "How do artisans get paid?", query: "How does the direct 74.6% DBT bank payout work for artisans?" },
    { label: "Need 200 bulk corporate gifts", query: "How does the multi-cluster 200 bulk allocation work for corporate gifting?" },
    { label: "Where is Artisan Voice Portal?", query: "Where is the voice listing portal for rural makers?" },
    { label: "What is Beedu wildgrass craft?", query: "Tell me about Udupi Beedu wildgrass basketry." },
  ],
};

export default function CraftChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"kn" | "en">("kn");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES.kn);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Clean audio on close
  useEffect(() => {
    if (!isOpen) {
      stopSpeech();
      setSpeakingMsgId(null);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      setIsListening(false);
    }
  }, [isOpen]);

  // Switch initial messages if switched when at start
  const handleSwitchLanguage = (newLang: "kn" | "en") => {
    setLanguage(newLang);
    stopSpeech();
    setSpeakingMsgId(null);
    if (messages.length <= 1) {
      setMessages(INITIAL_MESSAGES[newLang]);
    }
  };

  // Voice speech synthesis for bot messages
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (speakingMsgId === msgId) {
      stopSpeech();
      setSpeakingMsgId(null);
      return;
    }

    const hasKannada = /[\u0C80-\u0CFF]/.test(text);
    const audioLang = hasKannada ? "kn" : "en";

    playSpeech(
      text,
      audioLang,
      () => setSpeakingMsgId(msgId),
      () => setSpeakingMsgId(null)
    );
  };

  // Voice speech-to-text input (Mic button)
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        language === "kn"
          ? "ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ."
          : "Speech recognition is not supported in this browser. Please type your query."
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === "kn" ? "kn-IN" : "en-IN";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        handleSend(transcript);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (_) {
      setIsListening(false);
    }
  };

  // Send message to backend Gemini /api/chat
  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText) return;

    // Detect language of question
    if (/[\u0C80-\u0CFF]/.test(messageText)) {
      setLanguage("kn");
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.response || "Welcome to KalaSamanvaya!",
          timestamp: "Just now",
          actionLink: data.actionLink,
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error("Chat request failed");
      }
    } catch (err) {
      // Local fallback
      const fallbackText =
        language === "kn"
          ? "ಕಲಾ ಸಮನ್ವಯವು ಕರ್ನಾಟಕದ ನೈಜ ಕರಕುಶಲಕರ್ಮಿಗಳನ್ನು (ಧಾರವಾಡ ಕಸೂತಿ, ಉಡುಪಿ ಬೀಡು, ಖಾನಾಪುರ ಮಡಿಕೆ) ನೇರವಾಗಿ ಗ್ರಾಹಕರಿಗೆ ಸಂಪರ್ಕಿಸುತ್ತದೆ. ಶೇಕಡಾ 75 ಕ್ಕೂ ಹೆಚ್ಚು ನೇರ ಕೂಲಿ ಹಣ ಕುಶಲಕರ್ಮಿಗಳ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಆಗುತ್ತದೆ."
          : "KalaSamanvaya directly connects Karnataka master craftswomen (Dharwad Kasuti, Udupi Beedu, Khanapur Terracotta) with conscious patrons, ensuring 74.6% direct artisan payouts and GI provenance.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: fallbackText,
        timestamp: "Just now",
        actionLink: {
          label: language === "kn" ? "ಮಳಿಗೆ ನೋಡಿ" : "Browse Store",
          href: "/marketplace",
          icon: "shop",
        },
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    stopSpeech();
    setSpeakingMsgId(null);
    setMessages(INITIAL_MESSAGES[language]);
  };

  const currentSuggestions = SUGGESTED_QUESTIONS[language];

  return (
    <>
      {/* ── 1. FLOATING CHAT BUBBLE BUTTON ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/90 group ${
            isOpen ? "rotate-90 bg-stone-900" : ""
          }`}
          aria-label={isOpen ? "Close Craft Concierge" : "Open Craft Concierge"}
          title="KalaSamanvaya Craft Concierge & Buyer Assistant"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* ── 2. CHAT DRAWER WINDOW ── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[600px] h-[540px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fadeIn text-[#2A1810]">
          
          {/* Header */}
          <div className="bg-[#2A1810] text-[#FAF6F0] p-4 flex items-center justify-between border-b border-amber-900/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E67E22] text-white flex items-center justify-center font-bold text-xs shadow-md border border-amber-300">
                ಕಲಾ
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                  <span>Craft Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-amber-200/80">
                  {language === "kn" ? "ಕರ್ನಾಟಕ ಕಲಾ & ಗ್ರಾಹಕ ಸಹಾಯಕ" : "Heritage Guide & Buyer Assistant"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Language Switcher Pill */}
              <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-amber-700/50 text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => handleSwitchLanguage("kn")}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    language === "kn" ? "bg-[#E67E22] text-white" : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  ಕನ್ನಡ
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchLanguage("en")}
                  className={`px-2 py-0.5 rounded-full transition-colors ${
                    language === "en" ? "bg-[#E67E22] text-white" : "text-amber-200/70 hover:text-white"
                  }`}
                >
                  Eng
                </button>
              </div>

              <button
                onClick={resetChat}
                title={language === "kn" ? "ಹೊಸ ಸಂಭಾಷಣೆ" : "Reset Conversation"}
                className="p-1.5 rounded-lg text-amber-200/70 hover:text-white hover:bg-white/10 transition-colors text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-amber-200/70 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#FAF7F2] text-xs">
            {messages.map((msg) => {
              const isSpeakingThis = speakingMsgId === msg.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[88%] p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#C85A32] text-white rounded-br-none"
                        : "bg-white text-stone-800 border border-stone-200/80 rounded-bl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {/* Bot Voice Speaker Icon */}
                    {msg.sender === "bot" && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleToggleSpeak(msg.id, msg.text)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border ${
                            isSpeakingThis
                              ? "bg-red-50 text-red-700 border-red-300 animate-pulse"
                              : "bg-amber-50 hover:bg-amber-100 text-[#C85A32] border-amber-200"
                          }`}
                          title="Listen in authentic audio"
                        >
                          {isSpeakingThis ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-red-600" />
                              <span>{language === "kn" ? "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ" : "Stop Voice"}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#C85A32]" />
                              <span>{language === "kn" ? "ಧ್ವನಿಯಲ್ಲಿ ಕೇಳಿ" : "Listen in Audio"}</span>
                            </>
                          )}
                        </button>

                        {/* Action Link inside Bot Bubble */}
                        {msg.actionLink && (
                          <Link
                            href={msg.actionLink.href}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#C85A32] hover:underline"
                          >
                            <span>{msg.actionLink.label}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-white rounded-2xl border border-stone-200 w-24">
                <span className="text-[11px] text-stone-400 font-semibold mr-1">
                  {language === "kn" ? "ಉತ್ತರ..." : "Typing..."}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-bounce [animation-delay:0.3s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-white border-t border-stone-200 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {currentSuggestions.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(s.query)}
                className="px-2.5 py-1 rounded-full bg-[#FAF7F2] hover:bg-amber-100/70 border border-stone-200 text-stone-700 text-[10px] font-medium whitespace-nowrap transition-colors flex-shrink-0"
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-stone-200 flex items-center gap-2">
            {/* Mic Button for Voice input */}
            <button
              type="button"
              onClick={toggleListening}
              className={`p-2.5 rounded-xl transition-all ${
                isListening
                  ? "bg-red-500 text-white animate-pulse shadow-md"
                  : "bg-stone-100 hover:bg-amber-100 text-[#C85A32] border border-amber-200"
              }`}
              title={
                isListening
                  ? language === "kn"
                    ? "ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ..."
                    : "Listening..."
                  : language === "kn"
                  ? "ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ ಕೇಳಿ"
                  : "Speak question in English or Kannada"
              }
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder={
                language === "kn"
                  ? "ಕನ್ನಡದಲ್ಲಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಕೇಳಿ..."
                  : "Ask in Kannada or English..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 py-2 px-3 text-xs bg-[#FAF7F2] rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] text-stone-800 placeholder-stone-400"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="p-2.5 rounded-xl bg-[#C85A32] hover:bg-[#a84420] disabled:opacity-40 text-white transition-colors flex-shrink-0"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
