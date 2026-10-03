"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  MessageCircle,
  X,
  Send,
  Info,
  Mic,
  MicOff,
  ShoppingBag,
  Building2,
  Receipt,
  RotateCcw,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  kannadaText?: string;
  timestamp: string;
  actionLink?: {
    label: string;
    href: string;
    icon?: "shop" | "voice" | "b2b" | "info";
  };
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-welcome",
    sender: "bot",
    text: "ನಮಸ್ಕಾರ! Welcome to KalaSamanvaya. I am your Karnataka Craft & Fair-Trade Guide. How can I assist you with authentic handlooms, artisan fair-wages, or bespoke corporate gifting?",
    timestamp: "Just now",
  },
];

const SUGGESTED_QUESTIONS = [
  {
    label: "Why does Kasuti cost ₹1,850?",
    query: "Why does the Dharwad Kasuti silk shawl cost ₹1,850?",
  },
  {
    label: "Where is Artisan Voice Portal?",
    query: "Where is the separate voice listing portal for rural artisans?",
  },
  {
    label: "Need 200 bulk corporate gifts",
    query: "How can I order 200 handcrafted items for corporate gifting?",
  },
  {
    label: "What is Beedu wildgrass craft?",
    query: "Tell me about Udupi Beedu wildgrass basketry.",
  },
];

export default function CraftChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  // Voice speech-to-text support inside chat
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please type your question.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "kn-IN"; // Supports Kannada & English
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
    } catch (e) {
      setIsListening(false);
    }
  };

  const getBotResponse = (query: string): ChatMessage => {
    const q = query.toLowerCase();

    // 1. Pricing & Fair Wage Questions
    if (q.includes("price") || q.includes("cost") || q.includes("1850") || q.includes("why") || q.includes("ಬೆಲೆ")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "At KalaSamanvaya, 75%+ of the price (₹1,380 out of ₹1,850) goes directly to the master artisan woman's bank account. A traditional Kasuti shawl requires 38 hours of counted-thread needlework without knots, compared to a 4-minute synthetic factory print. Our 'Why This Price?' feature ensures zero middleman exploitation.",
        timestamp: "Just now",
        actionLink: {
          label: "View Fair Price Breakdown in Store",
          href: "/marketplace",
          icon: "shop",
        },
      };
    }

    // 2. Voice Listing & Rural Artisan Onboarding
    if (q.includes("voice") || q.includes("kannada") || q.includes("artisan") || q.includes("list") || q.includes("onboard") || q.includes("ಧ್ವನಿ")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "For rural artisans, we built a separate, dedicated Voice Portal (/artisan/onboard). Artisans don't need to type English forms or chat — they simply speak in native Kannada (e.g., 'ನನ್ನ ಬಳಿ 80 ಕಸೂತಿ ಶಾಲುಗಳಿವೆ, ಬೆಲೆ 600 ರೂಪಾಯಿ') and our system auto-populates their product listings!",
        timestamp: "Just now",
        actionLink: {
          label: "Open Dedicated Voice Portal",
          href: "/artisan/onboard",
          icon: "voice",
        },
      };
    }

    // 3. Corporate Bulk Gifting & B2B
    if (q.includes("bulk") || q.includes("corporate") || q.includes("b2b") || q.includes("200") || q.includes("order") || q.includes("gift") || q.includes("ಸಂಸ್ಥೆ")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "For orders of 200+ units, our Coordinated Multi-Cluster Fulfillment Engine divides quotas across self-help groups (e.g., Cluster A: 80, B: 70, C: 50 = 200 units). If an artisan faces illness, our automated simulator reallocates to standby clusters with zero delivery delay!",
        timestamp: "Just now",
        actionLink: {
          label: "Open B2B Fulfillment Console",
          href: "/b2b",
          icon: "b2b",
        },
      };
    }

    // 4. Kasuti Craft
    if (q.includes("kasuti") || q.includes("dharwad") || q.includes("ಕಸೂತಿ")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Kasuti is an intricate 7th-century Chalukyan hand-counted embroidery from Dharwad and Navalgund with GI protection. It uses Gavanti (double running) and Murgi (zig-zag) stitches where both sides of the pure mulberry silk appear identical with zero visible knots.",
        timestamp: "Just now",
        actionLink: {
          label: "Explore Kasuti Collection",
          href: "/marketplace?category=Kasuti",
          icon: "shop",
        },
      };
    }

    // 5. Beedu Wildgrass Basketry
    if (q.includes("beedu") || q.includes("basket") || q.includes("grass") || q.includes("udupi") || q.includes("ಬೀಡು")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Beedu is an indigenous coastal craft from Udupi. Artisans harvest riverside wildgrass, sun-cure the stalks for three weeks, and plait them tightly into durable, moisture-resistant hampers without synthetic coatings.",
        timestamp: "Just now",
        actionLink: {
          label: "Explore Beedu Hampers",
          href: "/marketplace?category=Beedu",
          icon: "shop",
        },
      };
    }

    // 6. Pottery & Terracotta
    if (q.includes("pottery") || q.includes("clay") || q.includes("terracotta") || q.includes("khanapur") || q.includes("ಮಡಿಕೆ")) {
      return {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: "Khanapur and coastal Karnataka pottery is crafted using native riverbed clay. The carafes and water jugs are wheel-thrown, agate-burnished, and fired in traditional wood kilns, naturally keeping water chilled and alkaline.",
        timestamp: "Just now",
        actionLink: {
          label: "Explore Terracotta Crafts",
          href: "/marketplace?category=Pottery",
          icon: "shop",
        },
      };
    }

    // Default Fallback
    return {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: "KalaSamanvaya directly connects rural Karnataka artisan clusters (Dharwad Kasuti, Udupi Beedu, Belagavi Pottery, Bidar Bidriware) to conscious patrons and corporate gifting buyers. How can I help you explore our collections or fair-trade model?",
      timestamp: "Just now",
      actionLink: {
        label: "Browse Handcrafted Storefront",
        href: "/marketplace",
        icon: "shop",
      },
    };
  };

  const handleSend = (textToSend?: string) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(messageText);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <>
      {/* ── 1. FLOATING CHAT BUBBLE BUTTON (Tactile & Accessible) ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full bg-[#E67E22] hover:bg-[#cf6d17] text-white shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/90 group ${
            isOpen ? "rotate-90 bg-stone-900" : ""
          }`}
          aria-label={isOpen ? "Close Craft Concierge" : "Open Craft Concierge"}
          title="KalaSamanvaya Craft Concierge & Buyer Support"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
          )}
        </button>
      </div>

      {/* ── 2. CHAT DRAWER WINDOW (High-End Indian Craft Aesthetic) ── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] max-h-[580px] h-[520px] bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-fadeIn text-[#2A1810]">
          
          {/* Header */}
          <div className="bg-[#2A1810] text-[#FAF6F0] p-4 flex items-center justify-between border-b border-amber-900/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#E67E22] text-white flex items-center justify-center font-bold text-xs shadow-md">
                ಕಲಾ
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm tracking-wide">
                  <span>Craft Concierge</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] text-amber-200/80">
                  Heritage Guide & Buyer Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                title="Reset Conversation"
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
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl shadow-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#C85A32] text-white rounded-br-none"
                      : "bg-white text-stone-800 border border-stone-200/80 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional Action Button Link inside Bot Bubble */}
                  {msg.actionLink && (
                    <div className="mt-2.5 pt-2 border-t border-stone-100">
                      <Link
                        href={msg.actionLink.href}
                        onClick={() => setIsOpen(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#C85A32] font-bold text-[11px] border border-amber-300 transition-colors"
                      >
                        {msg.actionLink.icon === "voice" && <Mic className="w-3.5 h-3.5 text-[#C85A32]" />}
                        {msg.actionLink.icon === "b2b" && <Building2 className="w-3.5 h-3.5 text-[#C85A32]" />}
                        {msg.actionLink.icon === "shop" && <ShoppingBag className="w-3.5 h-3.5 text-[#C85A32]" />}
                        <span>{msg.actionLink.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#C85A32]" />
                      </Link>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-stone-400 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-white rounded-2xl border border-stone-200 w-20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-bounce [animation-delay:0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-bounce [animation-delay:0.3s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-white border-t border-stone-200 overflow-x-auto scrollbar-none flex items-center gap-1.5">
            {SUGGESTED_QUESTIONS.map((s, idx) => (
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
              className={`p-2 rounded-xl transition-all ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-stone-100 hover:bg-amber-100 text-[#C85A32]"
              }`}
              title={isListening ? "Listening in Kannada..." : "Speak your question (Kannada / English)"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              placeholder="Ask in Kannada or English..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 py-2 px-3 text-xs bg-[#FAF7F2] rounded-xl border border-stone-300 focus:outline-none focus:ring-1 focus:ring-[#C85A32] text-stone-800 placeholder-stone-400"
            />

            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="p-2 rounded-xl bg-[#C85A32] hover:bg-[#a84420] disabled:opacity-40 text-white transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
