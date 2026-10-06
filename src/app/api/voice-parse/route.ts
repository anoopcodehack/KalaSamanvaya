import { NextResponse } from "next/server";
import { parseKannadaTranscript, transliterateKanglishToKannada } from "@/lib/voice/kannadaKeywords";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    status: "online",
    service: "KalaSamanvaya Voice Parsing Engine",
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { transcript, audioBase64, mimeType, language = "kn" } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    const isGeminiAvailable = apiKey && apiKey !== "your_gemini_api_key_here" && apiKey.trim().length > 10;

    // SCENARIO 1: Direct Audio Recording passed with Gemini API Key
    if (audioBase64 && isGeminiAvailable) {
      const modelsToTry = ["gemini-flash-lite-latest", "gemini-3.5-flash-lite", "gemini-flash-latest"];
      const cleanBase64 = audioBase64.includes(",")
        ? audioBase64.split(",")[1].trim()
        : audioBase64.replace(/^data:audio\/[^;]+;base64,/, "").trim();
      let audioMime = (mimeType || "audio/webm").split(";")[0].trim().toLowerCase();
      if (!audioMime.startsWith("audio/")) {
        audioMime = "audio/webm";
      }

      for (const model of modelsToTry) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        inlineData: {
                          mimeType: audioMime,
                          data: cleanBase64,
                        },
                      },
                      {
                        text: `You are an expert Kannada speech-to-text transcriber and craft assistant for KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ), a Karnataka craft platform.
Listen to this voice recording spoken by an artisan.

CRITICAL SCRIPT & LANGUAGE RULES:
1. If the speaker spoke in Kannada, Kanglish, or regional Kannada dialects:
   You MUST transcribe into authentic KANNADA SCRIPT (ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಬರೆಯಿರಿ, e.g. "ನನ್ನ ಬಳಿ ೮೦ ಕಸೂತಿ ಶಾಲುಗಳಿವೆ").
   NEVER write Kannada in English/Latin letters like "na Badi Kasuti" or "nanna bali". Write ONLY native Kannada letters!
2. If the speaker spoke completely in English, transcribe in English.
3. If this is a craft listing (e.g. "80 kasuti shawls 600 rupees"), extract craft, quantity, and price.

Return ONLY a valid JSON object matching this schema without markdown code blocks:
{
  "rawTranscript": "ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಪೂರ್ಣ ವಾಕ್ಯ",
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys" | "Udupi Sarees" | "Yakshagana Regalia" | "Belagavi Terracotta" | "General",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ" | "ಉಡುಪಿ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ" | "ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ" | "ಸಾಮಾನ್ಯ",
  "itemName": "ವಸ್ತುವಿನ ಹೆಸರು (ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್)",
  "quantity": 1,
  "pricePerUnitINR": 0,
  "totalValueINR": 0,
  "material": "ಕರಕುಶಲ ವಸ್ತು ಸಾಮಗ್ರಿ",
  "leadTimeDays": 7,
  "confidence": 0.98
}`,
                      },
                    ],
                  },
                ],
              }),
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
            const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
            let parsed: any = {};
            try {
              parsed = JSON.parse(cleaned);
            } catch (_) {
              parsed = { rawTranscript: cleaned };
            }
            if (parsed && (parsed.rawTranscript || parsed.itemName)) {
              let finalScript = parsed.rawTranscript || rawText;
              if (language === "kn") {
                finalScript = transliterateKanglishToKannada(finalScript);
              }
              return NextResponse.json({
                success: true,
                extracted: {
                  ...parsed,
                  rawTranscript: finalScript,
                },
                source: `Google Gemini Multimodal (${model})`,
              });
            }
          }
        } catch (err) {
          console.warn(`Direct audio Gemini model ${model} notice:`, err);
        }
      }
    }

    // SCENARIO 2: Transcript text passed with Gemini API Key
    if (transcript && isGeminiAvailable) {
      const modelsToTry = ["gemini-flash-lite-latest", "gemini-3.5-flash-lite", "gemini-flash-latest"];
      for (const model of modelsToTry) {
        try {
          const geminiRes = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [
                      {
                        text: `You are an expert Kannada assistant for KalaSamanvaya. Parse this rural artisan transcript: "${transcript}"

CRITICAL SCRIPT MANDATE:
1. If this text is in Kannada, or Kanglish (Kannada spoken or written in English/Latin letters, such as "na Badi Gammathu Kasuti" or "nanna bali 80 kasuti"):
   Convert "rawTranscript" strictly into authentic KANNADA SCRIPT (ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ, e.g. "ನನ್ನ ಬಳಿ ೯ ಕಸೂತಿ" or "ನನ್ನ ಬಳಿ ೮೦ ಕಸೂತಿ ಶಾಲುಗಳಿವೆ").
   NEVER leave Kannada words in English/Latin letters!
2. Extract the craft, quantity, and price.

Extract into pure JSON without code fences:
{
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys" | "Udupi Sarees" | "Yakshagana Regalia" | "Belagavi Terracotta",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ" | "ಉಡುಪಿ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ" | "ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ",
  "itemName": "ಕನ್ನಡ ಹೆಸರು ಅಥವಾ ವಿವರಣೆ",
  "quantity": number,
  "pricePerUnitINR": number,
  "totalValueINR": number,
  "material": "ಕರಕುಶಲ ಸಾಮಗ್ರಿ ವಿವರ",
  "leadTimeDays": number,
  "rawTranscript": "ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ವಾಕ್ಯ",
  "confidence": 0.98
}`,
                      },
                    ],
                  },
                ],
              }),
            }
          );

          if (geminiRes.ok) {
            const data = await geminiRes.json();
            const rawText = data?.candidates?.[0]?.content?.parts?.find((p: any) => p.text)?.text || "";
            const cleaned = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
            let parsed: any = {};
            try {
              parsed = JSON.parse(cleaned);
            } catch (_) {
              parsed = { rawTranscript: cleaned };
            }
            if (parsed && (parsed.rawTranscript || parsed.itemName || parsed.craft)) {
              let finalScript = parsed.rawTranscript || transcript;
              if (language === "kn") {
                finalScript = transliterateKanglishToKannada(finalScript);
              }
              return NextResponse.json({
                success: true,
                extracted: {
                  ...parsed,
                  rawTranscript: finalScript,
                },
                source: `Google Gemini Text NLP (${model})`,
              });
            }
          }
        } catch (err) {
          console.warn(`Gemini transcript model ${model} notice:`, err);
        }
      }
    }

    // SCENARIO 3: Rule-Based Bilingual Heuristic Fallback
    if (!transcript || !transcript.trim()) {
      return NextResponse.json(
        { error: "No speech recognized. Please speak closer to the mic or select a 1-click preset." },
        { status: 400 }
      );
    }

    const extracted = parseKannadaTranscript(transcript);

    return NextResponse.json({
      success: true,
      extracted,
      source: "kn-IN Web Speech API + Enhanced Rule-based Heuristic Extractor",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process audio or transcript", details: String(error) },
      { status: 500 }
    );
  }
}
