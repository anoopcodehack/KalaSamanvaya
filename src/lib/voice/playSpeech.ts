/**
 * Universal speech audio player for KalaSamanvaya
 * 
 * Plays authentic native Kannada audio (using /api/tts) without relying on Windows'
 * missing Kannada voice packs. In English mode, plays clear English audio.
 */

let activeAudio: HTMLAudioElement | null = null;

export function playSpeech(
  text: string,
  lang: "kn" | "en",
  onStart?: () => void,
  onEnd?: () => void
): () => void {
  if (typeof window === "undefined") return () => {};

  // Cancel any existing audio / speech
  stopSpeech();

  const trimmedText = text.trim();
  if (!trimmedText) return () => {};

  // Primary Path: Use high-fidelity /api/tts for genuine native Kannada or English
  const ttsUrl = `/api/tts?lang=${lang}&text=${encodeURIComponent(trimmedText)}`;
  const audio = new Audio(ttsUrl);
  activeAudio = audio;

  let started = false;

  audio.onplay = () => {
    started = true;
    onStart?.();
  };

  audio.onended = () => {
    activeAudio = null;
    onEnd?.();
  };

  audio.onerror = () => {
    // Fallback to browser SpeechSynthesis if network fails
    fallbackBrowserSpeech(trimmedText, lang, onStart, onEnd);
  };

  audio.play().catch(() => {
    // If autoplay was blocked or audio failed, try SpeechSynthesis
    fallbackBrowserSpeech(trimmedText, lang, onStart, onEnd);
  });

  return () => {
    stopSpeech();
    onEnd?.();
  };
}

export function stopSpeech() {
  if (activeAudio) {
    try {
      activeAudio.pause();
      activeAudio.currentTime = 0;
    } catch (_) {}
    activeAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  }
}

function fallbackBrowserSpeech(
  text: string,
  lang: "kn" | "en",
  onStart?: () => void,
  onEnd?: () => void
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    if (lang === "kn") {
      const kannadaVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().startsWith("kn") ||
          v.name.toLowerCase().includes("kannada") ||
          v.lang.toLowerCase().includes("kn-in")
      );
      if (kannadaVoice) {
        utterance.voice = kannadaVoice;
        utterance.lang = "kn-IN";
      } else {
        // Do not speak in English voice if language is Kannada and no voice pack exists
        onEnd?.();
        return;
      }
    } else {
      const englishVoice = voices.find((v) => v.lang.startsWith("en") || v.lang.includes("en-IN"));
      if (englishVoice) utterance.voice = englishVoice;
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.9;
    utterance.onstart = () => onStart?.();
    utterance.onend = () => onEnd?.();
    utterance.onerror = () => onEnd?.();
    window.speechSynthesis.speak(utterance);
  } catch (_) {
    onEnd?.();
  }
}
