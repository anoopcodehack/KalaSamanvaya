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
                        text: language === "en"
                          ? `You are an expert English speech-to-text transcriber and craft assistant for KalaSamanvaya.
Listen to this voice recording spoken in English.
1. Transcribe the exact spoken words into "rawTranscript" strictly in ENGLISH.
2. Extract the craft listing: craft, quantity, and price.

Return ONLY a valid JSON object matching this schema without markdown code blocks:
{
  "rawTranscript": "spoken words in English",
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys" | "Udupi Sarees" | "Yakshagana Regalia" | "Belagavi Terracotta" | "General",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ" | "ಉಡುಪಿ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ" | "ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ" | "ಸಾಮಾನ್ಯ",
  "itemName": "English Item Title",
  "quantity": 1,
  "pricePerUnitINR": 0,
  "totalValueINR": 0,
  "material": "Authentic cluster material",
  "leadTimeDays": 7,
  "confidence": 0.98
}`
                          : language === "tcy"
                          ? `You are an expert Tulu language (ತುಳು ಬಾಸೆ) speech-to-text transcriber and craft assistant for KalaSamanvaya.
Listen to this voice recording spoken by a coastal artisan from Udupi or Mangaluru in TULU language.
1. Transcribe the exact spoken Tulu words into authentic Kannada script (Tulu is written in Kannada script, e.g. "ಯೆಂಕುಲೆಡ ೫೦ ಬೀಡುದ ಬುಟ್ಟಿ ಉಂಡು, ಒಂಜೆಕ್ ೪೫೦ ರುಪಾಯಿ, ೧೦ ದಿನೊಟು ಕೊರ್ಪ").
2. Extract the coastal craft (Beedu, Udupi Handloom Sarees, Yakshagana Regalia, Pottery), quantity, and price.

Return ONLY a valid JSON object matching this schema without markdown code blocks:
{
  "rawTranscript": "ತುಳು ವಾಕ್ಯ ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ",
  "craft": "Beedu" | "Udupi Sarees" | "Yakshagana Regalia" | "Pottery" | "Kasuti" | "General",
  "craftKannada": "ಬೀಡು ಬುಟ್ಟಿ (ಉಡುಪಿ)" | "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ / ಮುಟ್ಟಾಲೆ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಕಸೂತಿ ಕಲೆ" | "ಸಾಮಾನ್ಯ",
  "itemName": "ವಸ್ತುವಿನ ತುಳು/ಕನ್ನಡ ಹೆಸರು (ಉದಾ: ಬೀಡುದ ಹುಲ್ಲಿನ ಬುಟ್ಟಿ)",
  "quantity": 1,
  "pricePerUnitINR": 0,
  "totalValueINR": 0,
  "material": "ಕರಾವಳಿ ನೈಸರ್ಗಿಕ ವಸ್ತು ಸಾಮಗ್ರಿ",
  "leadTimeDays": 7,
  "confidence": 0.98
}`
                          : `You are an expert Kannada speech-to-text transcriber and craft assistant for KalaSamanvaya (ಕಲಾ ಸಮನ್ವಯ), a Karnataka craft platform.
Listen to this voice recording spoken by an artisan.

CRITICAL SCRIPT & LANGUAGE RULES:
1. If the speaker spoke in Kannada, Kanglish, or regional Kannada dialects:
   You MUST transcribe into authentic KANNADA SCRIPT (ಕನ್ನಡ ಲಿಪಿಯಲ್ಲಿ ಬರೆಯಿರಿ, e.g. "ನನ್ನ ಬಳಿ ೮೦ ಕಸೂತಿ ಶಾಲುಗಳಿವೆ").
   NEVER write Kannada in English/Latin letters like "na Badi Kasuti" or "nanna bali". Write ONLY native Kannada letters!
2. If this is a craft listing (e.g. "80 kasuti shawls 600 rupees"), extract craft, quantity, and price.

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
                        text: language === "en"
                          ? `You are an assistant for KalaSamanvaya. Parse this English artisan listing: "${transcript}"
Extract into pure JSON without code fences:
{
  "craft": "Kasuti" | "Beedu" | "Pottery" | "Bidriware" | "Channapatna Toys" | "Udupi Sarees" | "Yakshagana Regalia" | "Belagavi Terracotta",
  "craftKannada": "ಕಸೂತಿ ಕಲೆ" | "ಬೀಡು ಬುಟ್ಟಿ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಬಿದ್ರಿ ಕಲೆ" | "ಚನ್ನಪಟ್ಟಣದ ಬಣ್ಣದ ಆಟಿಕೆ" | "ಉಡುಪಿ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ" | "ಖಾನಾಪುರ ಟೆರಾಕೋಟಾ",
  "itemName": "English Item Title",
  "quantity": number,
  "pricePerUnitINR": number,
  "totalValueINR": number,
  "material": "Authentic Craft Materials",
  "leadTimeDays": number,
  "rawTranscript": "${transcript}",
  "confidence": 0.98
}`
                          : language === "tcy"
                          ? `You are an expert Tulu language (ತುಳು ಬಾಸೆ) assistant for KalaSamanvaya. Parse this coastal Udupi/Mangaluru artisan transcript: "${transcript}"

CRITICAL RULES FOR TULU (ತುಳು):
1. Keep "rawTranscript" in native Kannada script (e.g., "ಯೆಂಕುಲೆಡ ೫೦ ಬೀಡುದ ಬುಟ್ಟಿ ಉಂಡು, ಒಂಜೆಕ್ ೪೫೦ ರುಪಾಯಿ, ೧೦ ದಿನೊಟು ಕೊರ್ಪ").
2. Extract the coastal craft (Beedu, Udupi Sarees, Yakshagana Regalia, Pottery), quantity, and price.

Extract into pure JSON without code fences:
{
  "craft": "Beedu" | "Udupi Sarees" | "Yakshagana Regalia" | "Pottery" | "Kasuti",
  "craftKannada": "ಬೀಡು ಬುಟ್ಟಿ (ಉಡುಪಿ)" | "ಉಡುಪಿ ಕೈಮಗ್ಗ ಸೀರೆ" | "ಯಕ್ಷಗಾನ ಕಿರೀಟ / ಮುಟ್ಟಾಲೆ" | "ಜೇಡಿಮಣ್ಣಿನ ಮಡಿಕೆ" | "ಕಸೂತಿ ಕಲೆ",
  "itemName": "ವಸ್ತುವಿನ ತುಳು/ಕನ್ನಡ ಹೆಸರು (ಉದಾ: ಬೀಡುದ ಹುಲ್ಲಿನ ಬುಟ್ಟಿಲು)",
  "quantity": number,
  "pricePerUnitINR": number,
  "totalValueINR": number,
  "material": "ಕರಾವಳಿ ವಸ್ತು ಸಾಮಗ್ರಿ",
  "leadTimeDays": number,
  "rawTranscript": "${transcript}",
  "confidence": 0.98
}`
                          : `You are an expert Kannada assistant for KalaSamanvaya. Parse this rural artisan transcript: "${transcript}"

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
              if (language === "kn" || language === "tcy") {
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

    const extracted = parseKannadaTranscript(transcript, language as "kn" | "en" | "tcy");

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
